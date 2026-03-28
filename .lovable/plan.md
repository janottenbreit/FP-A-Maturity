

## PDF v5: Schriftgrößen +2.5pt + vollständige Texte

### Änderungen gegenüber v4

1. **Schriftgrößen +2.5pt** auf allen Dimensionsseiten-Karten:
   - Level-Titel (short): 8.5 → 11pt
   - Beschreibung (desc): 7 → 9.5pt
   - Beispiele (examples): 7 → 9.5pt
   - Engpass/Next Level: 7 → 9.5pt

2. **Engpass und Next Level vollständig**: Kein `textwrap.shorten()` — kompletter `constraint`- und `graduate`-Text mit Zeilenumbruch via `textwrap.wrap()`.

3. **3 Beispiele statt 2** pro Level-Karte.

### Was bleibt gleich

- 8 Seiten: Titelseite (Portrait), Landscape-Matrix, 6 Dimensionsseiten (Portrait)
- Kartengrößen und -positionen identisch zu v4
- Dunkles Design (#111827), Level-Farben, Montserrat/JetBrains Mono
- Glassmorphismus-Karten mit farbigem Seitenakzent

### Machbarkeit

Pro Karte bei 9.5pt (~11pt Zeilenhöhe): Level-Titel (1 Zeile) + desc (2 Zeilen) + 3 Beispiele (3 Zeilen) + Engpass (1-2 Zeilen) + Graduate (1-2 Zeilen) = ~9 Zeilen = ~100pt. 5 Karten × 100pt = 500pt — passt in die ~750pt nutzbare Höhe auf A4.

### Technische Umsetzung

- Neues Python-Script (da `/tmp` geleert), alle Daten aus `maturityData.ts` als Python-Dict eingebettet
- Nur Font-Size-Konstanten und Wrapping-Logik geändert vs. v4-Logik
- Output: `/mnt/documents/fpa-reifegrad_v5.pdf`
- QA aller 8 Seiten via `pdftoppm` + visuelle Inspektion

| Artifact | Pfad |
|---|---|
| PDF | `/mnt/documents/fpa-reifegrad_v5.pdf` |

