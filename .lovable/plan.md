

## Fix: Interaktiver HTML-Export — Weisser Bildschirm

### Ursache

Der Export ist kaputt, weil Vite im Dev-Modus **einzelne ESM-Module** ueber HTTP ausliefert (z.B. `/src/main.tsx`, `/src/App.tsx`, `/node_modules/.vite/deps/react.js`). Wenn man das Entry-Script inline in eine HTML-Datei packt, enthaelt es `import`-Statements die auf den Server zeigen — beim Oeffnen als lokale Datei gibt es keinen Server → alle Imports schlagen fehl → weisser Bildschirm.

### Loesung: Rekursives Module-Crawling

Der ExportButton muss **alle Module rekursiv vom Vite Dev Server fetchen** und sie als self-contained Script in die HTML-Datei einbetten. Der Vite Dev Server transformiert bereits TSX → JS — wir muessen nur die gesamte Import-Kette verfolgen und alles zusammenfuehren.

### Konkreter Ansatz

#### `src/components/ExportButton.tsx` — komplett neu

**Schritt 1: Rekursiver Module-Crawler**

Eine Funktion `crawlModules(entryUrl)` die:
1. Den Entry-Point `/src/main.tsx` vom Dev Server fetcht (Vite liefert transformiertes JS)
2. Alle `import`-Statements per Regex parst (sowohl statische als auch dynamische)
3. Jeden importierten Pfad aufloest (relativ → absolut, `@/` → `/src/`)
4. Rekursiv alle Abhaengigkeiten fetcht (lokale `/src/` Module UND npm-Module aus `/node_modules/.vite/deps/`)
5. Einen Dependency-Graph aufbaut (Map von URL → transformiertem JS-Code)

**Schritt 2: Module zu Blob-URLs konvertieren**

Da inline `<script type="module">` keine relativen Imports aufloesen kann:
1. Bottom-up durch den Dependency-Graph gehen (Blaetter zuerst)
2. Jedes Modul als `Blob` → `URL.createObjectURL` registrieren
3. Im Parent-Modul die Import-Pfade durch die Blob-URLs ersetzen
4. Resultat: Ein Entry-Modul dessen gesamte Import-Kette auf Blob-URLs zeigt

**Problem:** Blob-URLs funktionieren nicht in einer gespeicherten HTML-Datei (sie sind session-gebunden).

### Besserer Ansatz: Data-URI Module

Statt Blob-URLs werden Module als `data:text/javascript;base64,...` URIs eingebettet:
1. Gleicher rekursiver Crawl
2. Alle Imports werden bottom-up durch Data-URIs ersetzt
3. Das Entry-Modul wird als einzelnes `<script type="module">` mit rewrittenen Imports eingebettet

**Problem:** Manche Browser blockieren `import` von Data-URIs aus Sicherheitsgruenden.

### Pragmatischster Ansatz (empfohlen): Single IIFE Bundle

Statt das ESM-Format beizubehalten, konvertieren wir alle Module in ein **einziges IIFE-Script**:

1. **Crawl** alle Module rekursiv vom Vite Dev Server
2. **Registriere** jedes Modul in einem internen Module-System:
   ```
   const __modules = {};
   function __define(id, factory) { ... }
   function __require(id) { ... }
   ```
3. **Konvertiere** jedes ESM-Modul:
   - `import X from "Y"` → `const X = __require("Y")`
   - `export default Z` → `__modules[id].default = Z`
   - `export { A, B }` → `__modules[id].A = A; ...`
4. **Verpacke** alles in ein `<script>` (kein `type="module"` noetig)

#### Dateien

| Datei | Aenderung |
|---|---|
| `src/components/ExportButton.tsx` | Komplett neu — rekursiver Module-Crawler + IIFE-Bundler |
| `src/components/ExportApp.tsx` | Keine Aenderung (bereits korrekt) |
| `src/main.tsx` | Keine Aenderung (Export-Mode-Check bereits vorhanden) |

#### Einschraenkungen

- Der Crawl kann 5-15 Sekunden dauern (viele Module zu fetchen)
- Loading-Indikator mit Fortschritt (z.B. "Lade Module... 42/128")
- Funktioniert nur in der Lovable Preview-Umgebung (Vite Dev Server muss laufen)
- Exportierte Datei wird ~2-5 MB gross (gesamte React + Radix + App-Code)

