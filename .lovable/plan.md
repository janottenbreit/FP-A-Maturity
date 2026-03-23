

## Fix: HTML-Export — Dunkler Bildschirm ohne Inhalt

### Ursache

Der Export-Build funktioniert und die Datei wird heruntergeladen (CSS funktioniert, daher der dunkelblaue Hintergrund). Aber **der JavaScript-Code wird nicht ausgefuehrt**, weil:

1. Vite gibt standardmaessig **ESM-Format** aus (`import`/`export`-Syntax)
2. Die Middleware fuegt das JS in ein normales `<script>`-Tag ein (ohne `type="module"`)
3. ESM-Syntax in einem Nicht-Modul-Script ist ein Syntax-Fehler → nichts rendert
4. Zusaetzlich: Falls im JS-Code `</script>` als String vorkommt, bricht das HTML-Parsing ab

### Loesung

Die Vite-Build-Konfiguration in der Middleware anpassen:

1. **JS-Entry direkt** statt HTML-Entry verwenden (`src/export-entry.tsx`)
2. **Output-Format auf `iife`** setzen — kein `import`/`export`, laeuft in jedem `<script>`-Tag
3. **HTML-Template manuell bauen** statt ueber Vite's HTML-Processing
4. **`</script>` im JS escapen** um HTML-Parser-Probleme zu vermeiden

### Aenderungen

#### `vite.config.ts` — Middleware ueberarbeiten

```text
viteBuild({
  ...
  build: {
    rollupOptions: {
      input: "src/export-entry.tsx",   // JS-Entry direkt
      output: {
        format: "iife",                // Kein ESM
        inlineDynamicImports: true,
      },
    },
    ...
  },
})
```

Nach dem Build:
- HTML-Template manuell zusammenbauen (nicht aus Vite-Output nehmen)
- JS-Code: `</script>` durch `<\/script>` ersetzen
- Google Fonts, CSS und JS inline einbetten
- `class="dark"` auf `<html>` setzen

Keine Aenderungen an anderen Dateien noetig.

