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
          console.log("[export] Building export bundle…");
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
                input: path.resolve(__dirname, "export.html"),
                output: {
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

          let htmlSource = "";
          const jsChunks: string[] = [];
          const cssChunks: string[] = [];

          for (const item of output.output) {
            if (item.fileName.endsWith(".html")) {
              htmlSource = typeof item.source === "string" ? item.source : new TextDecoder().decode(item.source as Uint8Array);
            } else if (item.type === "chunk") {
              jsChunks.push(item.code);
            } else if (item.fileName.endsWith(".css")) {
              const src = typeof item.source === "string" ? item.source : new TextDecoder().decode(item.source as Uint8Array);
              cssChunks.push(src);
            }
          }

          // Remove external references and inline everything
          htmlSource = htmlSource.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, "");
          htmlSource = htmlSource.replace(/<script[^>]*src=["'][^"']*["'][^>]*><\/script>/gi, "");
          htmlSource = htmlSource.replace(
            "</head>",
            `<style>\n${cssChunks.join("\n")}\n</style>\n</head>`
          );
          htmlSource = htmlSource.replace(
            "</body>",
            `<script>\n${jsChunks.join("\n")}\n</script>\n</body>`
          );

          console.log("[export] Build complete, sending HTML…");
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(htmlSource);
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
