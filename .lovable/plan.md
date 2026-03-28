

## PDF v4: Querformat-Matrix + vollstaendige Beschreibungen

### Zwei Aenderungen

**1. Neue erste Seite (Querformat / Landscape)**
Eine horizontale Seite direkt nach der Titelseite, die die komplette 6×5 Heatmap-Matrix zeigt:
- Zeilen = 6 Dimensionen (Reporting, Analysis, Forecasting, Consulting, Talent, Data/Tools)
- Spalten = 5 Level (L1–L5)
- Jede Zelle zeigt den `short`-Text in der jeweiligen Level-Farbe
- Farbige Zellen-Hintergruende analog zur Web-App

**2. Detailseiten: `desc` statt `short`**
Auf den 6 Dimensionsseiten wird statt dem kurzen `short`-Text die vollstaendige `desc`-Beschreibung als Haupttext pro Level verwendet. Schriftgroesse ggf. leicht reduziert (7pt), damit alles auf eine Seite passt.

### Seitenstruktur (9 Seiten)

1. Titelseite (Hochformat)
2. **NEU: Heatmap-Matrix (Querformat/Landscape)**
3. Reporting (Hochformat, mit `desc`)
4. Analysis
5. Forecasting
6. Consulting
7. Talent
8. Data / Tools
9. (optional: Uebersicht L1–L5 aus v3 kann entfallen oder ans Ende)

### Technische Umsetzung

- reportlab unterstuetzt gemischte Seitenformate: `c.setPageSize(landscape(A4))` fuer Seite 2, sonst `A4`
- Matrix-Seite: 6 Zeilen × 5 Spalten, farbige Zellen mit `short`-Text, Wortumbruch
- Detailseiten: `desc` ersetzt `short` als Hauptbeschreibung, Rest (examples, constraint, graduate) bleibt
- Output: `/mnt/documents/fpa-reifegrad_v4.pdf`
- QA aller 9 Seiten

| Artifact | Pfad |
|---|---|
| PDF | `/mnt/documents/fpa-reifegrad_v4.pdf` |

