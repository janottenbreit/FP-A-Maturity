

## FP&A Maturity Heatmap v2 — Upgrade

Upgrade der bestehenden Heatmap-Seite gemaess der neuen Spec v2. Zwei grosse Aenderungen: (1) reichere Zelldaten mit `short`, `examples`-Array und laengeren Texten, (2) Detail-Panel wird von 3-Spalten-Layout zu Accordion-basiertem Layout umgebaut.

### 1. Datenmodell erweitern — `src/constants/maturityData.ts`

- `CellData` Interface erweitern: neues `short`-Feld (kurzer Text fuer die Zelle) und `examples: string[]`-Array
- Bestehende `desc` bleibt als ausfuehrliche Beschreibung fuer das Detail-Panel
- Alle 30 Zellen mit den neuen Inhalten aus der Spec befuellen (laengere `desc`, konkrete `examples`, ausfuehrlichere `constraint`/`graduate`)

### 2. Heatmap-Zellen anpassen — `src/components/MaturityHeatmap.tsx`

- Zellen zeigen nur `short` statt `desc` an (max ~15 Woerter, Orientierung auf einen Blick)
- Zellen-Styling anpassen: `min-height: 64px`, `border-radius: 6px`, `gap: 4px`, Hover `scale(1.02)` statt `1.03`

### 3. Detail-Panel zu Accordion umbauen

Statt 3-Spalten-Layout wird das Panel ein Accordion mit 4 Sektionen (Radix Accordion bereits im Projekt vorhanden):

| # | Label | Farbe | Inhalt |
|---|---|---|---|
| 1 | BESCHREIBUNG | white | Voller `desc`-Text |
| 2 | BEISPIELE (n) | gold | Liste der `examples` mit ▸-Prefix |
| 3 | CONSTRAINT | coral | `constraint`-Text |
| 4 | GRADUATE — NAECHSTES LEVEL | teal | `graduate`-Text |

- Single-Expand-Modus (eine Sektion offen, Rest schliesst)
- Erste Sektion standardmaessig offen
- Chevron-Rotation bei open/close
- Panel-Container: `steel-blue` Hintergrund (`#2A3158`), `max-width: 860px`, `border-radius: 10px`
- Panel-Header: Dimension-Icon + Name (gold, Montserrat) + Level-Badge

### 4. Farb- und Styling-Anpassungen

- Beibehalten: Montserrat + JetBrains Mono (statt Bebas Neue/Inter fuer Konsistenz mit TOM-Pyramide)
- Beibehalten: Kein Footer mit Brandname
- Grid-Spalte 1: `120px` statt `140px`
- Column-Headers: Level-Nummer + Name, mit 2px Bottom-Border in Level-Farbe

### Nicht umgesetzt (bewusst)

- Kein Bebas Neue / Inter Fontwechsel (Konsistenz mit bestehender Seite)
- Kein Footer mit "EDELWORKS"
- Kein separates `designTokens.ts` File (Farben bleiben inline, wie bisher)
- Kein Aufsplitten in separate Component-Files (HeatmapCell, DetailPanel etc.) — alles bleibt in einer Datei fuer Einfachheit

