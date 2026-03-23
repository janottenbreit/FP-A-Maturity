

## Fix: HTML-Export — Weisser Bildschirm

### Ursache

Die exportierte Datei enthaelt immer noch **externe Asset-Referenzen** statt inlintem Code:

```html
<script type="module" crossorigin src="/assets/index-IiIMmMk1.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-CNKqfShw.css">
```

Zwei Probleme:

1. **Lovable-Plattform injiziert Badge/OG-Tags** in die HTML-Antwort von `/__export` und ueberschreibt moeglicherweise den inlinten Inhalt
2. Der Export-Build produziert die korrekten Chunks, aber die Plattform-Transformation fuegt die externen Referenzen wieder ein

### Loesung

Den Export-Inhalt **nicht als HTML** zurueckgeben, sondern als **Base64-encodierten JSON-Payload**. So kann die Plattform den Inhalt nicht als HTML interpretieren und transformieren.

### Aenderungen

#### 1. `vite.config.ts` — Middleware anpassen

- Content-Type auf `application/json` aendern statt `text/html`
- Das fertige HTML als JSON-Objekt verpacken: `{ html: "<base64-encoded-html>" }`
- So umgeht man die Plattform-HTML-Injection komplett

#### 2. `src/components/ExportButton.tsx` — JSON-Response parsen

- Statt `res.text()` → `res.json()` und Base64 decodieren
- Rest bleibt gleich (Blob → Download)

#### 3. `export.html` — Google Fonts einbetten

- Google Fonts Link (`Montserrat`, `Inter`, `JetBrains Mono`) im `<head>` hinzufuegen, damit Schriften in der exportierten Datei geladen werden (diese kommen aktuell ueber `index.css` @import, was im Standalone-File funktionieren sollte, aber sicherheitshalber auch als `<link>` Tag)

#### 4. Lovable Badge entfernen

- In der Middleware nach dem Inlining: Badge-HTML (`<aside id="lovable-badge"...`) und zugehoerige Scripts/Styles per Regex entfernen, falls sie trotz JSON-Wrapper durchkommen

### Technische Details

```
// vite.config.ts Middleware — Antwort als JSON
const base64 = Buffer.from(htmlSource).toString("base64");
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify({ html: base64 }));

// ExportButton.tsx — Decode
const { html: base64 } = await res.json();
const html = atob(base64);
const blob = new Blob([html], { type: "text/html;charset=utf-8" });
```

### Dateien

| Datei | Aenderung |
|---|---|
| `vite.config.ts` | Middleware: JSON-Response statt HTML |
| `src/components/ExportButton.tsx` | Base64-Decode aus JSON |
| `export.html` | Google Fonts `<link>` Tags hinzufuegen |

