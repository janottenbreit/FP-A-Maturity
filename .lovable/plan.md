

## Fix: Kaputte Umlaute und Emojis im HTML-Export

### Ursache

`atob()` dekodiert Base64 als **Latin-1** (ISO-8859-1), nicht als UTF-8. Deutsche Umlaute (ä, ü, ö), Gedankenstriche (—) und Emojis (📋, 💡, ⚠, ↗) werden dadurch als Mojibake dargestellt.

### Loesung

In `ExportButton.tsx` die Base64-Dekodierung durch eine UTF-8-kompatible Variante ersetzen:

```ts
// Statt: const html = atob(base64);
const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
const html = new TextDecoder("utf-8").decode(bytes);
```

### Dateien

| Datei | Aenderung |
|---|---|
| `src/components/ExportButton.tsx` | `atob` → `Uint8Array` + `TextDecoder("utf-8")` |

Eine Zeile Aenderung, keine weiteren Dateien betroffen.

