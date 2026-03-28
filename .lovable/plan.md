

## PDF v3: Eine Seite pro Dimension

### Aenderung gegenueber v2

Jede Dimension (Reporting, Analysis, etc.) wird auf **eine Seite** komprimiert statt zwei. Ergibt **8 Seiten** total (Titel + Uebersicht + 6 Dimensionen).

### Wie der Inhalt gekuerzt wird

- **desc** → entfaellt, nur `short` als Level-Titel
- **examples** → max. 2 Bullets statt 3–5, gekuerzt
- **constraint** → 1 Zeile, Kurzfassung
- **graduate** → 1 Zeile, Kurzfassung
- Schriftgroesse etwas kleiner (7–8pt statt 8–9pt)
- Karten kompakter, weniger Padding

### Seitenstruktur (8 Seiten)

1. Titelseite
2. Uebersicht (L1–L5)
3. Reporting (5 Level auf einer Seite)
4. Analysis
5. Forecasting
6. Consulting
7. Talent
8. Data / Tools

### Visuelles Design

Unveraendert: dunkler Hintergrund, Level-Farben, Montserrat/JetBrains Mono, Glassmorphismus-Karten.

### Technisch

- Angepasstes Python-Script, gleiche Bibliotheken
- Output: `/mnt/documents/fpa-reifegrad_v3.pdf`
- QA aller 8 Seiten

| Artifact | Pfad |
|---|---|
| PDF | `/mnt/documents/fpa-reifegrad_v3.pdf` |

