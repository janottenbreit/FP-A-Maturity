

## PDF v8: English Translation

### Scope
Translate the entire FP&A Maturity PDF (currently v7, 8 pages) from German to English. All content embedded in the Python generation script will be translated.

### What changes

1. **Title page**: "FP&A Maturity Model" / "6 Dimensions x 5 Maturity Levels — a framework that goes deeper than a checklist" / depth indicators translated (Description, Examples, Constraint, Graduation)

2. **Matrix page (Landscape)**: All 30 `short` texts translated to English (e.g. "Inkonsistent, manuell..." → "Inconsistent, manual, month-end >2 weeks. Back-office.")

3. **6 Detail pages**: All content translated per cell:
   - `desc` (full description)
   - `examples` (3 per card)
   - `constraint` ("Constraint" label instead of "Engpass")
   - `graduate` ("Next Level" label stays, text translated)

4. **Labels**: Section headers like "Engpass" → "Constraint", "Nächstes Level" → "Next Level", "Beispiele" → "Examples", "Beschreibung" → "Description"

### What stays the same
- Layout, colors, font sizes (10.5pt matrix, 9.5pt/11pt detail pages), dark design — all identical to v7
- Page structure: 8 pages (title, matrix, 6 dimensions)
- Dimension and level names already English (Reporting, Analysis, etc.)

### Technical
- New Python script with all German text replaced by English translations
- Same reportlab logic as v7, only string content changes
- Output: `/mnt/documents/fpa-reifegrad_v8.pdf`
- QA all 8 pages

| Artifact | Path |
|---|---|
| PDF | `/mnt/documents/fpa-reifegrad_v8.pdf` |

