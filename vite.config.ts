import { defineConfig, build as viteBuild } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Plugin } from "vite";

function exportBuildPlugin(): Plugin {
  return {
    name: "export-build-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/__export") return next();

        try {
          console.log("[export] Building IIFE export bundle…");
          const result = await viteBuild({
            configFile: false,
            root: path.resolve(__dirname),
            plugins: [react()],
            resolve: {
              alias: {
                "@": path.resolve(__dirname, "./src"),
              },
            },
            build: {
              write: false,
              rollupOptions: {
                input: path.resolve(__dirname, "src/export-entry.tsx"),
                output: {
                  format: "iife",
                  inlineDynamicImports: true,
                },
              },
              cssCodeSplit: false,
              assetsInlineLimit: 100_000_000,
              minify: true,
            },
            logLevel: "warn",
          });

          const output = Array.isArray(result) ? result[0] : result;
          if (!("output" in output)) throw new Error("Unexpected build result");

          let jsCode = "";
          const cssChunks: string[] = [];

          for (const item of output.output) {
            if (item.type === "chunk") {
              jsCode += item.code;
            } else if (item.type === "asset" && item.fileName.endsWith(".css")) {
              const cssSource = typeof item.source === "string" ? item.source : new TextDecoder().decode(item.source as Uint8Array);
              cssChunks.push(cssSource);
            }
          }

          // Escape </script> inside JS to prevent HTML parser breakage
          const safeJs = jsCode.replace(/<\/script>/gi, "<\\/script>");

          const htmlSource = `<!doctype html>
<html lang="de" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TOM Export</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet" />
  <style>
${cssChunks.join("\n")}
  </style>
</head>
<body>
  <div id="root"></div>
  <script>${safeJs}</script>
</body>
</html>`;

          console.log("[export] Build complete (" + Math.round(htmlSource.length / 1024) + " KB), sending as JSON…");
          const base64 = Buffer.from(htmlSource).toString("base64");
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ html: base64 }));
        } catch (err) {
          console.error("[export] Build failed:", err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.end(`Export build failed: ${err}`);
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/tom-presentation/" : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    exportBuildPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
