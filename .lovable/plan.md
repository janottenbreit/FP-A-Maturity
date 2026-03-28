

## PDF v7: Matrix-Schrift +2.5pt

### Einzige Änderung

Matrix-Seite (Landscape, Seite 2): Zellen-Schrift von 8pt auf **10.5pt**, Header/Dimension-Labels entsprechend auf ~13pt. `textwrap.wrap` Width von 28 auf ~20 reduzieren, damit der größere Text in die Zellen passt.

### Rest bleibt identisch

- Titelseite (konzeptionell mit Mini-Matrix) — wie v6
- 6 Dimensionsseiten (9.5pt, vollständige Texte) — wie v6

### Technisch

- Python-Script neu generieren (da `/tmp` geleert), v6-Logik mit angepasster Matrix-Font-Size
- Output: `/mnt/documents/fpa-reifegrad_v7.pdf`
- QA aller 8 Seiten

| Artifact | Pfad |
|---|---|
| PDF | `/mnt/documents/fpa-reifegrad_v7.pdf` |

