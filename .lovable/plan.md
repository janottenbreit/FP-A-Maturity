

## Subtitles in den Pyramid Layers anzeigen

### Aenderungen an `src/components/TOMPyramid.tsx`

#### 1. Subtitles direkt in den Layer-Bars anzeigen

Unter dem Label und der Question-Zeile wird ein neuer Subtitle-Text eingeblendet – groesser und farblich kontrastreicher als die bisherige Question-Zeile.

- **Strategie-Layer**: Subtitle "Wohin?" sichtbar im Layer-Block, Label "Strategie & Zielbild" umbrechend (Zeilenumbruch erlauben statt `truncate`)
- **Service Delivery Layer**: Subtitle "Fuer Wen?" sichtbar im Layer-Block

#### 2. Subtitle-Styling

- Schriftgroesse: `text-xs` (12px) statt der bisherigen 10px Question-Zeile
- Farbe: Die jeweilige Layer-Akzentfarbe (`layer.color`) mit hoher Deckkraft fuer starken Kontrast
- Beim Top-Layer (Strategie): dunklere Variante passend zum hellen Hintergrund

#### 3. Label-Umbruch beim Strategie-Layer

- `truncate` entfernen, damit "Strategie & Zielbild" bei Bedarf umbrechen kann
- `whitespace-normal` und `text-center` beibehalten

### Technische Details

- In der `PyramidLayer`-Komponente wird `layer.subtitle` als zusaetzliche Zeile unterhalb der Question gerendert
- Bedingung: Nur anzeigen wenn `widthPercent > 35` (damit es auf schmalen Layern nicht gequetscht wird)
- Layer-Hoehe von 76px auf ~82px erhoehen fuer den zusaetzlichen Text
- Die Question-Zeile und Subtitle werden beide angezeigt – Question bleibt als Kontext-Label, Subtitle als prominenterer Text darunter

