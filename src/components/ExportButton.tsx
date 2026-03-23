import { Download, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import TOMPyramid from "./TOMPyramid";
import MaturityHeatmap from "./MaturityHeatmap";

function collectStyles(): string {
  const styles: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        styles.push(rule.cssText);
      }
    } catch {
      // cross-origin stylesheet — skip
    }
  }
  return styles.join("\n");
}

function renderComponentToHTML(
  Component: React.ComponentType,
): Promise<string> {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "1200px";
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<Component />);

    // Give React time to render
    setTimeout(() => {
      const html = container.innerHTML;
      root.unmount();
      document.body.removeChild(container);
      resolve(html);
    }, 500);
  });
}

function buildExportHTML(pyramidHTML: string, heatmapHTML: string, css: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TOM & FP&A Reifegrad — Export</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
${css}

/* Export tab navigation */
.export-nav {
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 20px 16px 8px;
}
.export-nav-inner {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 9999px;
  background: hsla(210, 22%, 11%, 0.8);
  backdrop-filter: blur(24px);
  border: 1px solid hsla(210, 20%, 16%, 0.5);
}
.export-tab-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.05em;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: hsla(210, 15%, 52%, 1);
}
.export-tab-btn:hover {
  color: hsl(195, 40%, 93%);
}
.export-tab-btn.active {
  background: hsla(190, 45%, 58%, 0.15);
  color: hsl(190, 45%, 58%);
  border-color: hsla(190, 45%, 58%, 0.3);
}
.export-section { display: none; }
.export-section.active { display: block; }

.export-footer {
  text-align: center;
  padding: 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: hsla(210, 15%, 52%, 0.5);
  letter-spacing: 0.1em;
}
</style>
</head>
<body style="margin:0; background: hsl(210, 25%, 8%); color: hsl(195, 40%, 93%);">

<nav class="export-nav">
  <div class="export-nav-inner">
    <button class="export-tab-btn active" onclick="switchTab('pyramid')">TOM Pyramide</button>
    <button class="export-tab-btn" onclick="switchTab('maturity')">FP&A Reifegrad</button>
  </div>
</nav>

<div id="section-pyramid" class="export-section active">
${pyramidHTML}
</div>

<div id="section-maturity" class="export-section">
${heatmapHTML}
</div>

<div class="export-footer">
  Exportiert am ${new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
</div>

<script>
function switchTab(tab) {
  document.querySelectorAll('.export-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.export-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('section-' + tab).classList.add('active');
  const btns = document.querySelectorAll('.export-tab-btn');
  if (tab === 'pyramid') btns[0].classList.add('active');
  else btns[1].classList.add('active');
}
</script>
</body>
</html>`;
}

export default function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = useCallback(async () => {
    setLoading(true);
    try {
      const css = collectStyles();
      const [pyramidHTML, heatmapHTML] = await Promise.all([
        renderComponentToHTML(TOMPyramid),
        renderComponentToHTML(MaturityHeatmap),
      ]);

      const html = buildExportHTML(pyramidHTML, heatmapHTML, css);
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
