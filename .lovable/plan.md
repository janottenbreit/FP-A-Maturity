

## Interaktiver HTML-Export — Vollstaendige React-App als Single-File

### Problem

Der aktuelle Export extrahiert nur statisches HTML — keine Event-Handler, kein React-State, keine Interaktivitaet. Hover-Effekte, Klick-Dialoge und Accordions funktionieren nicht.

### Neuer Ansatz

Statt HTML-Snapshots zu extrahieren, wird die gesamte React-App zur Laufzeit als self-contained HTML-Datei gebaut. Der Trick: Vite's Build-Output (JS-Bundle + CSS) wird in eine einzige HTML-Datei inlined.

**Ablauf beim Klick auf "Export":**

1. Fetch der gebauten App-Assets vom Server: `/assets/*.js` und `/assets/*.css` (die Vite-Build-Artefakte, die bereits im Preview laufen)
2. CSS und JS inline in ein HTML-Template einbetten
3. Eine spezielle Export-Version der App rendern (ohne AppNav-Export-Button, mit eigenem Tab-Switching)
4. Als `.html`-Blob herunterladen

### Umsetzung

#### 1. `src/components/ExportApp.tsx` (neu)

Minimale App-Variante fuer den Export — ohne Router, ohne Export-Button:
- Eigener State fuer aktiven Tab (`pyramid` / `maturity`)
- Tab-Navigation im gleichen Glassmorphism-Stil
- Rendert `TOMPyramid` oder `MaturityHeatmap` je nach Tab
- Kein `BrowserRouter`, kein `QueryClientProvider` (nicht noetig)

#### 2. `src/export-entry.tsx` (neu)

Separater Vite Entry-Point fuer den Export-Build:
- Importiert `ExportApp` + `index.css`
- Rendert in `#root`

#### 3. `vite.config.export.ts` (neu)

Separate Vite-Config fuer den Export-Build:
- `build.rollupOptions.input`: zeigt auf eine `export.html` die `export-entry.tsx` laedt
- `build.cssCodeSplit: false` — alles in eine CSS-Datei
- `build.rollupOptions.output.manualChunks: undefined` — alles in ein JS-Bundle

#### 4. `ExportButton.tsx` ueberarbeiten

Neuer Ansatz — statt offscreen-Rendering:
1. Fetcht die aktuelle Seite (`/`) und extrahiert die `<script>` und `<link>` Tags
2. Fetcht alle referenzierten JS/CSS-Assets
3. Baut eine HTML-Datei mit inline `<script>` und `<style>` Tags
4. Ersetzt den Entry-Point so, dass `ExportApp` statt `App` gerendert wird

**Alternativ (einfacher):** Da wir keinen separaten Build-Schritt im Browser ausfuehren koennen, nutzen wir einen pragmatischeren Ansatz:

### Pragmatischer Ansatz (empfohlen)

Die aktuelle Preview-URL IST bereits die lauffaehige App. Der Export sammelt alle Assets der laufenden App und packt sie in eine einzelne HTML-Datei:

1. **Fetch `index.html`** von der aktuellen Origin
2. **Fetch alle `<script>` und `<link rel="stylesheet">` Assets** (die Vite-Build-Artefakte)
3. **Inline alles** in eine einzige HTML-Datei: CSS in `<style>`, JS in `<script>`
4. **Patch den JS-Code**: Ersetze den Router-basierten Ansatz durch eine Export-Variante (oder: lasse den Router drin, er funktioniert auch ohne Server via HashRouter)
5. **Download** als `.html`

#### Problem: BrowserRouter funktioniert nicht als lokale Datei

**Loesung:** Eine Export-spezifische App-Komponente (`ExportApp.tsx`) die ohne Router arbeitet und stattdessen einen simplen useState-Tab-Switcher nutzt. Der Export inlined diese Variante.

### Konkrete Dateiaenderungen

#### `src/components/ExportApp.tsx` (neu)
- Standalone App-Shell ohne Router
- useState-Tab-Navigation zwischen TOM Pyramide und FP&A Reifegrad
- Rendert `TooltipProvider` + die jeweilige Komponente
- Kein Export-Button sichtbar

#### `src/export-entry.tsx` (neu)  
- `createRoot(document.getElementById("root")!).render(<ExportApp />)`
- Importiert `index.css`

#### `export.html` (neu, im Root)
- Kopie von `index.html` mit `src="/src/export-entry.tsx"` statt `main.tsx`

#### `vite.config.ts` anpassen
- Neues npm-Script `build:export` das mit `--config vite.config.export.ts` baut
- Export-Config: Single-File Output (kein Code-Splitting)

#### `ExportButton.tsx` ueberarbeiten
- Bei Klick: Fuehrt `fetch('/export-bundle.html')` aus (oder baut es client-seitig)
- Da wir keinen Build-Step im Browser haben, Alternative:

### Finaler, realistischer Ansatz

Da wir im Browser keinen Vite-Build ausfuehren koennen, ist der pragmatischste Weg:

1. **ExportButton fetcht alle laufenden Assets** der aktuellen App
2. **Baut eine HTML-Datei** mit allen JS/CSS inline
3. **Patcht den Entry-Point** im inlined JS: statt `App` wird `ExportApp` gerendert (die ohne Router arbeitet)

Konkret:

#### `ExportButton.tsx` — komplett neu

```
async handleExport():
  1. const indexHTML = await fetch(location.origin).then(r => r.text())
  2. Parse alle <script src="..."> und <link href="..."> URLs
  3. Fetch jeden Asset-Inhalt
  4. Baue finales HTML:
     - Ersetze <link> mit <style>INHALT</style>
     - Ersetze <script src> mit <script>INHALT</script>  
     - Ersetze im JS: '/src/main.tsx' Referenz → rendere ExportApp
  5. Download als Blob
```

#### `src/components/ExportApp.tsx` (neu)

Standalone App ohne Router, mit Tab-State. Wird als globale Funktion registriert (`window.__renderExportApp`) die der gepatchte Entry-Point aufruft.

### Einschraenkung

Dieser Ansatz funktioniert nur in der **Development-/Preview-Umgebung** wo die Assets ueber HTTP erreichbar sind. Fuer eine Published-App muesste der Build-Schritt serverseitig laufen.

### Dateien

| Datei | Aktion |
|---|---|
| `src/components/ExportApp.tsx` | Neu — Router-freie App-Shell |
| `src/components/ExportButton.tsx` | Ueberarbeiten — Asset-Inlining statt HTML-Snapshot |
| `src/main.tsx` | Kleine Anpassung — Export-App als Alternative registrieren |

