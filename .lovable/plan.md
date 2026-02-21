

## Visuelle Aufwertung der TOM-Pyramide

Anpassungen an `src/components/TOMPyramid.tsx` in vier Bereichen:

### 1. Groessere Schrift und Lucide-Icons in den Pyramid Layers

- **Layer-Hoehe** von 64px auf 76px erhoehen fuer mehr Platz
- **Label-Schriftgroesse** von 10/13px auf 14/16px erhoehen
- **Question-Schriftgroesse** von 8px auf 10px
- **Icon-Groesse** von `text-base` auf `text-xl`
- Die Unicode-Icons (`◈`, `◎`, etc.) durch Lucide-React-Icons ersetzen:
  - Strategie: `Compass`
  - Service Delivery: `Target`
  - Governance: `Shield`
  - Organisation: `Users`
  - Prozesse: `Workflow`
  - Technologie: `Database`

### 2. Glass-Look fuer die Layer Bars

- Hintergrund der nicht-Top-Layer aendern zu: halbtransparenter Gradient mit `backdrop-blur-md`
- Hintergrund: `rgba(20, 30, 42, 0.55)` mit weissem Top-Inset-Shadow (`inset 0 1px 0 rgba(255,255,255,0.06)`)
- Staerkerer Border: `rgba(255,255,255,0.08)` statt dem aktuellen fast unsichtbaren Border
- Bei Hover: Border heller + staerkerer Glow, sodass ein Button/Kachel-Effekt entsteht

### 3. Hoehere Kontrast bei seitlichen Pfeilen

- "BOTTOM-UP" / "TOP-DOWN" Label von `text-[7px]` auf `text-[10px]`, Farbe von `text-muted-foreground/60` auf `text-muted-foreground`
- "UMSETZUNG" / "DESIGN" vertikale Labels von `text-[8px]` auf `text-[11px]`, Farbe von `/40` auf `/80`
- Pfeil-Linie dicker: von `w-px` auf `w-0.5`
- Pfeilspitzen groesser
- Breite der Seitenspalte von `w-11` auf `w-14`

### 4. Groessere Schrift im Detail-Modal

- DialogTitle von `text-base` auf `text-xl`
- DialogDescription von `text-[10px]` auf `text-xs`
- Icon-Box von `w-9 h-9` auf `w-11 h-11`, Icon-Groesse `text-xl`
- Tab-Trigger von `text-[11px]` auf `text-sm`
- Tab-Content von `text-sm` auf `text-base`
- Kategorie-Labels (FINANCE-BEISPIEL etc.) von `text-[9px]` auf `text-[11px]`
- Modal-Breite von `sm:max-w-[560px]` auf `sm:max-w-[620px]`

