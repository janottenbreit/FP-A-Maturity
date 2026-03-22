

## FP&A Maturity Heatmap — Zweite Seite

Neue Seite `/maturity` mit einer interaktiven 6x5 Heatmap-Matrix, angepasst an das bestehende Design-System (dunkles Theme, Glassmorphism, Montserrat/JetBrains Mono statt Bebas Neue/Inter, Teal-Akzentfarben).

### Neue Dateien

#### 1. `src/constants/maturityData.ts`
- Alle 6 Dimensionen (Reporting, Analysis, Forecasting, Consulting, Talent, Data/Tools) mit Lucide-Icons
- 5 Maturity Levels mit Farbrampe (Coral → Amber → Gold → Teal → Green)
- Zelldaten: `desc`, `constraint`, `graduate` fuer jede Dimension x Level Kombination
- Design-Token-Konstanten (Farben fuer Level-Tinting)

#### 2. `src/components/MaturityHeatmap.tsx`
Hauptkomponente mit:

**Header:** "Reifegrad in FP&A" als Titel in `font-display` (Montserrat) mit Teal-Akzent statt Gold (passend zum bestehenden Schema). Subtitle in `text-muted-foreground`.

**Legend Bar:** 5 farbige Badges horizontal, zeigen Level-Namen. Bei Column-Hover faden nicht-aktive Items.

**Heatmap Grid:** CSS Grid mit `140px` erster Spalte + `repeat(5, 1fr)`. Zellen mit Glassmorphism-Effekt (wie die Pyramid-Layer), Level-Farbe als subtiler Hintergrund-Tint (~12% Opacity). Hover: `scale(1.03)`, Border-Highlight. Klick: Zelle wird aktiv, Detail-Panel oeffnet sich.

**Detail Panel:** Erscheint unterhalb der Matrix mit Slide-In-Animation (`animate-tom-slide-up`). 3-Spalten-Layout: Beschreibung / Constraint (Coral) / Graduate (Teal). Glass-Card-Styling. Close-Button.

**Hint Text:** Sichtbar wenn keine Zelle ausgewaehlt. Italic, `text-muted-foreground`.

**Kein Footer mit Brandname** (wie gewuenscht).

#### 3. `src/pages/Maturity.tsx`
Rendert `<MaturityHeatmap />`.

### Bestehende Dateien anpassen

#### 4. `src/App.tsx`
- Route `/maturity` hinzufuegen
- Import der neuen Page

#### 5. Navigation
- Minimale Navigation auf beiden Seiten: Zwei Links oben (z.B. "TOM Pyramide" / "FP&A Reifegrad") als dezente Tab-Navigation im bestehenden Glassmorphism-Stil

#### 6. `src/index.css`
- Bebas Neue Font importieren fuer die Heatmap-Titel (optional, alternativ Montserrat beibehalten fuer Konsistenz)

### Design-Anpassungen gegenueber Spec

- **Kein Brandname** im Footer
- **Farben:** Spec-Gold (#D4A843) als Akzentfarbe fuer Headlines beibehalten, da es gut zum dunklen Theme passt. Level-Farbramp wie in Spec.
- **Fonts:** Montserrat statt Bebas Neue fuer Konsistenz mit der TOM-Pyramide. JetBrains Mono fuer Labels.
- **Glassmorphism:** Zellen und Detail-Panel nutzen `glass-card`-Effekt und `backdrop-blur` wie die Pyramid-Layer
- **Animationen:** Bestehende `animate-tom-reveal` und `animate-tom-slide-up` wiederverwenden

### Responsive Verhalten

- Desktop: Volles Grid sichtbar
- Tablet/Mobile: Horizontaler Scroll auf der Matrix, Detail-Panel wird 1-spaltig

