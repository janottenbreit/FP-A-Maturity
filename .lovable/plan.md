

## PDF v2: Mehr Inhalt aus dem Reifegrad-Modell

### Aenderung gegenueber v1

Die bisherige PDF zeigte pro Dimension nur den **Short-Text** fuer jedes Level. Die neue Version nutzt **alle verfuegbaren Inhalte** aus `maturityData.ts`:

- **desc** (vollstaendige Beschreibung)
- **examples** (alle Beispiele als Bullet-Liste)
- **constraint** (Engpass/Limitation)
- **graduate** (Naechstes Level / Handlungsempfehlung)

### Seitenstruktur (14 Seiten)

1. **Titelseite** — "FP&A Reifegrad", minimalistisch
2. **Uebersicht** — 5 Level (L1–L5) mit Farbskala und Kurzname
3–4. **Reporting** (2 Seiten) — L1–L3 auf Seite 1, L4–L5 auf Seite 2
5–6. **Analysis** (2 Seiten)
7–8. **Forecasting** (2 Seiten)
9–10. **Consulting** (2 Seiten)
11–12. **Talent** (2 Seiten)
13–14. **Data / Tools** (2 Seiten)

### Inhalt pro Level-Block

Jeder Level-Block zeigt:
- **Farbiger Level-Badge** (L1 Ad Hoc ... L5 World-Class)
- **Beschreibung** (desc — vollstaendig)
- **Beispiele** (alle examples als ▸-Bullets)
- **⚠ Constraint** (farbig hervorgehoben)
- **↗ Graduate** (naechstes Level, Teal-Akzent)

### Visuelles Design (unveraendert)

- Dunkler Hintergrund (#111827), Level-Farben, Gold-Akzente
- Montserrat + JetBrains Mono
- Glassmorphismus-Karten mit abgerundeten Ecken
- Seitenakzent-Linie links in Level-Farbe

### Technische Umsetzung

- Python-Script mit `reportlab`, Fonts wie bisher
- Dynamische Seitenumbrueche: 2–3 Level pro Seite je nach Textlaenge
- Output: `/mnt/documents/fpa-reifegrad_v2.pdf`
- QA aller 14 Seiten via `pdftoppm`

| Artifact | Pfad |
|---|---|
| PDF | `/mnt/documents/fpa-reifegrad_v2.pdf` |

