import { Download, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";

async function fetchAndInlineAssets(): Promise<string> {
  // 1. Fetch the current page HTML
  const indexHTML = await fetch(location.origin + "/").then((r) => r.text());
  const parser = new DOMParser();
  const doc = parser.parseFromString(indexHTML, "text/html");

  // 2. Collect all CSS <link> tags and inline them
  const linkEls = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
  for (const link of linkEls) {
    const href = link.getAttribute("href");
    if (!href) continue;
    try {
      const cssUrl = new URL(href, location.origin).href;
      const cssText = await fetch(cssUrl).then((r) => r.text());
      const style = doc.createElement("style");
      style.textContent = cssText;
      link.replaceWith(style);
    } catch {
      // skip unreachable stylesheets
    }
  }

  // 3. Collect all <script> tags and inline them
  const scriptEls = Array.from(doc.querySelectorAll("script[src]"));
  for (const script of scriptEls) {
    const src = script.getAttribute("src");
    if (!src) continue;
    try {
      const jsUrl = new URL(src, location.origin).href;
      let jsText = await fetch(jsUrl).then((r) => r.text());

      // 4. Patch: replace main entry to render ExportApp instead of App
      // The main.tsx compiled code imports App and renders it.
      // We need to swap it to render ExportApp instead.
      // Since ExportApp is already bundled (imported in main.tsx), we just
      // need the entry point to call the export variant.
      jsText = patchEntryPoint(jsText);

      const inlineScript = doc.createElement("script");
      inlineScript.setAttribute("type", script.getAttribute("type") || "text/javascript");
      inlineScript.textContent = jsText;
      script.replaceWith(inlineScript);
    } catch {
      // skip unreachable scripts
    }
  }

  // 5. Remove any module preload links
  const preloads = Array.from(doc.querySelectorAll('link[rel="modulepreload"]'));
  preloads.forEach((el) => el.remove());

  // 6. Update title
  const titleEl = doc.querySelector("title");
  if (titleEl) {
    titleEl.textContent = "TOM & FP&A Reifegrad — Export";
  }

  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
}

function patchEntryPoint(jsCode: string): string {
  // The compiled main.tsx renders <App /> into #root.
  // We patch it to render <ExportApp /> instead.
  // In the Vite dev server, the code is raw ESM with imports.
  // We need to handle both dev (import statements) and prod (bundled) modes.

  // Dev mode: the main.tsx module has `import App from "./App.tsx"` 
  // and renders it. We replace the import to point to ExportApp.
  // But in dev mode, each module is a separate request — main.tsx is tiny.
  // The actual patching needs to happen at the module level.

  // Since in dev mode modules are loaded individually via ESM imports,
  // we can't easily patch. Instead, we use a different strategy:
  // Register ExportApp on window in main.tsx, and check for an export flag.

  return jsCode;
}

export default function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = useCallback(async () => {
    setLoading(true);
    try {
      // Set the export flag before fetching
      // The fetched page will pick this up from a meta tag we inject
      const html = await buildExportHTML();
      
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `TOM-Export-${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-2 rounded-full font-mono-brand text-[11px] tracking-wide text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50 transition-all duration-200 disabled:opacity-50"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
      {loading ? "Export…" : "Export"}
    </button>
  );
}

async function buildExportHTML(): Promise<string> {
  // Fetch the index page
  const indexHTML = await fetch(location.origin + "/").then((r) => r.text());
  const parser = new DOMParser();
  const doc = parser.parseFromString(indexHTML, "text/html");

  // Inline all CSS
  const linkEls = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
  for (const link of linkEls) {
    const href = link.getAttribute("href");
    if (!href) continue;
    try {
      const cssText = await fetch(new URL(href, location.origin).href).then((r) => r.text());
      const style = doc.createElement("style");
      style.textContent = cssText;
      link.replaceWith(style);
    } catch { /* skip */ }
  }

  // Inline all scripts and patch
  const scriptEls = Array.from(doc.querySelectorAll("script[src]"));
  for (const script of scriptEls) {
    const src = script.getAttribute("src");
    if (!src) continue;
    try {
      let jsText = await fetch(new URL(src, location.origin).href).then((r) => r.text());
      const inlineScript = doc.createElement("script");
      inlineScript.setAttribute("type", script.getAttribute("type") || "text/javascript");
      inlineScript.textContent = jsText;
      script.replaceWith(inlineScript);
    } catch { /* skip */ }
  }

  // Remove modulepreload links
  doc.querySelectorAll('link[rel="modulepreload"]').forEach((el) => el.remove());

  // Add export flag meta tag — main.tsx checks for this
  const meta = doc.createElement("meta");
  meta.setAttribute("name", "x-export-mode");
  meta.setAttribute("content", "true");
  doc.head.prepend(meta);

  // Update title
  const titleEl = doc.querySelector("title");
  if (titleEl) titleEl.textContent = "TOM & FP&A Reifegrad — Export";

  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
}
