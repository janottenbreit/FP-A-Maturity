

## PDF v9: Fix white bar on page 2

### Problem
Page 2 (landscape matrix) has a white bar at the top. This is caused by the background rectangle not covering the full landscape page dimensions — likely the portrait height is used instead of the landscape height, or the rect is drawn after a translate that shifts it down.

### Fix
In the Python generation script, ensure that when drawing page 2:
1. `c.setPageSize(landscape(letter))` is called
2. `w, h = landscape(letter)` is used for the background rect
3. `c.rect(0, 0, w, h, stroke=0, fill=1)` is drawn **first** before any other content on that page

### Everything else unchanged
- All content remains English (v8)
- Layout, fonts, colors identical
- Output: `/mnt/documents/fpa-reifegrad_v9.pdf`
- QA all 8 pages

| Artifact | Path |
|---|---|
| PDF | `/mnt/documents/fpa-reifegrad_v9.pdf` |

