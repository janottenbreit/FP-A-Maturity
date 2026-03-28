

## PDF v6: Matrix-Schrift vergroessern + neue Titelseite

### 1. Titelseite neu gestalten

Statt einer einfachen Titelseite wird ein konzeptionelles Layout erstellt, das das 6x5-Modell sofort greifbar macht:

- **Headline**: "FP&A Reifegrad-Modell" gross und zentral
- **Subline**: "6 Dimensionen × 5 Reifegrade — ein Framework das tiefer geht als eine Checkliste"
- **Visuelle Mini-Matrix**: Eine schematische 6×5-Gitter-Darstellung (ohne Text, nur farbige Bloecke) als visuelles Element, das die Struktur auf einen Blick zeigt
- **6 Dimensions-Labels** links neben der Mini-Matrix (Reporting, Analysis, Forecasting, Consulting, Talent, Data/Tools)
- **5 Level-Labels** oben (Ad Hoc → World-Class) mit Farbverlauf von Rot nach Gruen
- **Kernbotschaft** unten: "Jede Zelle definiert: Beschreibung · Beispiele · Engpass · Graduation" — zeigt die Tiefe des Modells (4 Ebenen pro Zelle statt nur ein Label)
- Dunkler Hintergrund, Level-Farben als Akzente

### 2. Matrix-Seite (Landscape): Schrift vergroessern

- Zellen-Schrift von ~5-6pt auf **8pt** erhoehen
- Zellen-Padding optimieren damit der `short`-Text die Zelle besser ausfuellt
- Dimension-Labels und Level-Header ebenfalls groesser (10-11pt)
- Wrap-Width anpassen an groessere Schrift (weniger Zeichen pro Zeile, mehr Zeilen)

### 3. Rest bleibt gleich

- 6 Dimensionsseiten mit 9.5pt Schrift, vollstaendigen Texten (wie v5)
- Dunkles Design, Level-Farben, Glassmorphismus

### Seitenstruktur (8 Seiten)

1. Titelseite (Portrait) — NEU: konzeptionell mit Mini-Matrix
2. Heatmap-Matrix (Landscape) — groessere Schrift
3-8. Dimensionsseiten (Portrait) — wie v5

### Technisch

- Neues Python-Script, Titelseite komplett neu gezeichnet mit reportlab Canvas
- Matrix-Zellen: Font-Size erhoehen, `textwrap.wrap` Width reduzieren
- Output: `/mnt/documents/fpa-reifegrad_v6.pdf`
- QA aller 8 Seiten

| Artifact | Pfad |
|---|---|
| PDF | `/mnt/documents/fpa-reifegrad_v6.pdf` |

