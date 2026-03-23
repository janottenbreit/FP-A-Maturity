

## Fix: Export-Button tut nichts — Middleware laeuft nicht

### Ursache

Die Lovable Preview laeuft als **Production Build**, nicht als Vite Dev Server. Die `configureServer`-Middleware in `vite.config.ts` wird nur bei `vite dev` ausgefuehrt — in der Preview existiert der `/__export`-Endpoint nicht. Die Plattform liefert stattdessen die normale `index.html` zurueck (SPA-Fallback), daher der JSON-Parse-Fehler.

### Loesung: Rein clientseitiger Export

Statt serverseitigem Build werden die **bereits geladenen Assets** der laufenden App direkt im Browser eingesammelt und in eine HTML-Datei gepackt.

### Ablauf

1. Aktuelles Dokument parsen: `<script src>` und `<link rel="stylesheet" href>` Tags finden
2. Alle referenzierten JS/CSS-Dateien per `fetch()` herunterladen
3. HTML-Template bauen mit allem inline (`<style>` + `<script>`)
4. Eine `<meta name="x-export-mode">` einfuegen, damit `main.tsx` die Export-Variante rendert
5. Lovable-Badge und externe Platform-Scripts entfernen
6. Als `.html`-Datei herunterladen

### Dateiaenderungen

#### 1. `src/main.tsx`
- ExportApp importieren
- Pruefen ob `<meta name="x-export-mode">` vorhanden ist
- Wenn ja: ExportApp rendern, sonst: App rendern

#### 2. `src/components/ExportButton.tsx` — komplett neu (clientseitig)
- Kein `fetch("/__export")` mehr
- Stattdessen: DOM parsen, Assets fetchen, HTML zusammenbauen
- Badge-HTML, Platform-Scripts (`lovable.js`, `gpteng.co`) entfernen
- Export-Mode Meta-Tag einfuegen
- Download als Blob

#### 3. `vite.config.ts`
- `exportBuildPlugin()` entfernen (funktioniert nicht in Production)
- `import { build as viteBuild }` entfernen
- Aufgeraeumt und einfacher

#### 4. Aufraeum-Dateien (optional)
- `export.html` und `src/export-entry.tsx` werden nicht mehr benoetigt (koennen bleiben, schaden nicht)

### Technischer Ablauf im ExportButton

```text
1. scripts = document.querySelectorAll('script[src]')
2. styles  = document.querySelectorAll('link[rel="stylesheet"]')
3. Fuer jedes Asset: fetch(src) → text
4. HTML bauen:
   <!doctype html>
   <html lang="de" class="dark">
   <head>
     <meta name="x-export-mode" content="true">
     Google Fonts Links
     <style>...alle CSS inline...</style>
   </head>
   <body>
     <div id="root"></div>
     <script>...alle JS inline...</script>
   </body>
   </html>
5. Blob → Download
```

