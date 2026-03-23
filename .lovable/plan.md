

## HTML-Export — Beide Seiten als selbststaendige HTML-Datei

### Ansatz

Ein Export-Button oben rechts in der Navigation, der den gesamten aktuellen DOM-Inhalt (beide Seiten) als eine selbststaendige HTML-Datei herunterlaed. Die Datei enthaelt alle Styles inline und ist ohne Server lauffaehig.

### Umsetzung

#### 1. Neue Komponente `src/components/ExportButton.tsx`

- Button mit Download-Icon, positioniert rechts in der AppNav-Leiste
- Bei Klick:
  1. Klont das `document.documentElement` 
  2. Sammelt alle computed Styles aus den `<style>`-Tags und Stylesheets
  3. Inlinet alle CSS in ein `<style>`-Tag im `<head>`
  4. Entfernt den Export-Button und die Navigation aus dem Klon
  5. Fuegt eine einfache Tab-Navigation (reines HTML/JS) hinzu, die zwischen den beiden Seiten wechselt
  6. Erzeugt einen Blob und triggert den Download als `.html`-Datei

**Herausforderung:** Beide Seiten muessen im exportierten HTML vorhanden sein, obwohl React-Router immer nur eine rendert.

**Loesung:** Der Export rendert beide Komponenten (`TOMPyramid` + `MaturityHeatmap`) temporaer in ein unsichtbares Container-Element, extrahiert deren HTML, und baut daraus eine statische HTML-Datei mit eigenem Tab-Switching (vanilla JS).

#### 2. Export-Logik (Kernschritte)

1. Beide Komponenten in ein offscreen-`div` rendern (via `createRoot`)
2. Gesamtes CSS aus dem Dokument einsammeln (Tailwind, Custom Styles, Google Fonts)
3. HTML-Template bauen:
   - `<head>`: Google Fonts Link + gesammelte Styles
   - `<body>`: Tab-Navigation + Container fuer beide Seiten + vanilla JS Tab-Switcher
4. Als `Blob` → `URL.createObjectURL` → automatischer Download

#### 3. `src/components/AppNav.tsx` anpassen

- ExportButton rechts neben der Tab-Navigation platzieren
- Layout: `justify-between` statt `justify-center`, mit leerem Spacer links fuer Zentrierung

#### 4. Einschraenkungen

- Interaktive Features (Klick auf Zellen, Modal-Dialoge) funktionieren im Export **nicht** — es ist ein statischer Snapshot
- Alternativ: Der Export koennte die gesamte App als self-contained SPA exportieren, aber das waere extrem komplex

### Offene Frage

Die interaktiven Features (Heatmap-Klick, Pyramiden-Modal) gehen bei einem statischen HTML-Export verloren. Zwei Optionen:

**Option A — Statischer Snapshot:** Schnell umsetzbar, zeigt beide Seiten als Read-Only-Ansicht. Kein JavaScript noetig ausser Tab-Switching.

**Option B — Vollstaendige Kopie:** Exportiert den gesamten gebauten App-Code (JS-Bundle + CSS + HTML) als ZIP. Vollstaendig interaktiv, aber groesser (~500KB+) und komplexer.

Ich empfehle **Option A** fuer den ersten Wurf — clean, leichtgewichtig, teilbar.

