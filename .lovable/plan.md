

## PDF-Praesentation: FP&A Reifegrad (Hochformat)

### Inhalt

Portrait-PDF basierend auf den 6 Dimensionen und 5 Reifegraden aus `maturityData.ts`. Visuelles Design im Stil der bestehenden App (dunkle Slate/Teal-Palette, Montserrat + JetBrains Mono, Glassmorphismus-Aesthetik).

### Seitenstruktur (8 Seiten)

1. **Titelseite** — "FP&A Reifegrad" gross, minimalistisch, dunkler Hintergrund mit Teal-Akzent
2. **Uebersicht** — 5 Level (L1–L5) mit Farbskala und Kurzbeschreibung, visuell als vertikale Progression
3. **Reporting** — Dimension-Deep-Dive: alle 5 Level mit Short-Text, Constraint, Graduate
4. **Analysis** — gleiche Struktur
5. **Forecasting** — gleiche Struktur
6. **Consulting** — gleiche Struktur
7. **Talent** — gleiche Struktur
8. **Data / Tools** — gleiche Struktur

### Visuelles Konzept

- **Farbpalette**: Dunkler Hintergrund (#151C2C), Teal-Akzent (#64B5C6), Gold (#D4A843), Level-Farben (Coral→Gruen)
- **Typografie**: Montserrat (Titel), JetBrains Mono oder aehnlich (Labels/Badges)
- **Layout**: Jede Dimension-Seite zeigt 5 Level als vertikale Karten/Bloecke mit farbigen Seitenakzenten
- **Stil**: Geometrische Formen, subtile Linien, grosszuegiger Whitespace auf dunklem Grund

### Technische Umsetzung

- Python-Script mit `reportlab` fuer PDF-Erzeugung
- Google Fonts (Montserrat, JetBrains Mono) von Skill-Fonts oder als Download
- Output nach `/mnt/documents/fpa-reifegrad.pdf`
- QA via `pdftoppm` + visueller Inspektion

### Dateien

| Artifact | Pfad |
|---|---|
| PDF | `/mnt/documents/fpa-reifegrad.pdf` |

