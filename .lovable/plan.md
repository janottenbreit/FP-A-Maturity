

## Subtitles fuer die oberen Layer sichtbar machen

### Problem

Die Breiten-Bedingungen filtern die Subtitles bei den oberen Layern heraus:
- Layer 0 (Strategie): `widthPercent = 25%` -- sowohl Question (`> 40`) als auch Subtitle (`> 35`) werden ausgeblendet
- Layer 1 (Service Delivery): `widthPercent = 40%` -- Question (`> 40`) wird ausgeblendet, Subtitle (`> 35`) gerade so sichtbar

### Loesung in `src/components/TOMPyramid.tsx`

1. **Subtitle immer anzeigen**: Die Bedingung `widthPercent > 35` entfernen, sodass der Subtitle auf allen Layern sichtbar ist
2. **Question-Bedingung lockern**: Von `widthPercent > 40` auf `widthPercent > 30` aendern, damit auch Layer 1 die Question-Zeile zeigt (Layer 0 bei 25% zeigt sie weiterhin nicht -- dort ist der Subtitle aber ausreichend)

Damit werden "Richtung & Ambition" (Strategie) und "Leistungsversprechen" (Service Delivery) auf allen Layern sichtbar. Die Question-Zeile ("WOHIN?", "WAS & FUER WEN?") bleibt als sekundaerer Kontext-Hinweis.

