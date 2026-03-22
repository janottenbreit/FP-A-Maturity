

## TOM Pyramid — Content Enrichment v2

Erweiterung der Datenstruktur und des Detail-Modals gemaess der Spec. Die Pyramide selbst bleibt unveraendert.

### 1. Datenstruktur aendern (`src/components/TOMPyramid.tsx`)

**Layer Interface erweitern:**
- `details: string[]` — 6-8 Kernelemente pro Schicht
- `finance` und `marketing` von `string` zu `{ intro: string; items: string[]; kpis: string[] }`

**Alle 6 Layer** mit den vollstaendigen Inhalten aus Abschnitt 4 der Spec befuellen (neue descriptions, details-Arrays, finance/marketing-Objekte mit intro, items, kpis).

### 2. Neue UI-Helfer (inline in gleicher Datei)

**BulletItem:** Flex-Zeile mit farbigem 5x5px Dot + Text (13px, #B8C4D0, line-height 1.6). Dot vertikal zentriert zur ersten Textzeile (margin-top 7px).

**KPIBadge:** Inline-Badge mit monospace-Font (10px, JetBrains Mono), Hintergrund `#1E2A3680`, Border `#2C3E50`, Textfarbe `#64B5C6`.

### 3. Detail-Modal Anpassungen

**Modal-Container:** `maxHeight: 88vh`, Scrollbar auf den Content-Bereich.

**Sticky Header:** Header-Block (Icon + Titel + Tabs) wird `sticky top-0 z-10` mit solidem Hintergrund (`#151F28`), damit Tabs beim Scrollen sichtbar bleiben. Tabs werden aus dem Content- in den Header-Bereich verschoben (unter die Titelzeile, mt-4).

**Tab "Uebersicht":**
1. `layer.description` als Absatz
2. Label "KERNELEMENTE" (JetBrains Mono, 9px, tracking 0.12em, Farbe #5D7186)
3. BulletItem-Liste aus `layer.details[]` mit `color = layer.color`

**Tab "Finance" / "Marketing":**
1. `data.intro` als Einleitungsabsatz
2. Label "FINANCE-DETAILS" / "MARKETING-DETAILS" (Finance: #4CAF7A, Marketing: #E5A84B)
3. BulletItem-Liste aus `data.items[]` mit jeweiliger Label-Farbe
4. Trennlinie (`border-top: 1px solid #1E2A36`, mt-4, pt-3.5)
5. Label "RELEVANTE KPIs" (9px, #5D7186)
6. Flex-Wrap Container mit KPIBadge-Komponenten aus `data.kpis[]`

### 4. Keine Aenderungen

Pyramide (Layout, Hover, Arrows, Legend, Subtitles) bleibt komplett unveraendert. Nur die Daten und das Modal werden erweitert.

