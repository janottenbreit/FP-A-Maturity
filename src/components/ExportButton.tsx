import { Download, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";

export default function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/__export");
      if (!res.ok) throw new Error(`Export failed: ${res.status}`);
      const html = await res.text();

      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `TOM-Export-${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export failed:", e);
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
