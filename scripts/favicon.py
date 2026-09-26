"""Ritar sajtens favicon: vitt Playfair-B på terrakotta (--accent).

Glyfen hämtas ur det self-hostade typsnittet och skrivs ut som path, så att
SVG:n inte är beroende av något typsnitt. PNG och ICO rastreras från samma
SVG med headless Chrome, så att alla storlekar ser likadana ut.
Kör om efter ändring:  python3 scripts/favicon.py
Kräver fonttools, brotli, Pillow och Google Chrome.
"""
import subprocess
import tempfile
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image

ROT = Path(__file__).resolve().parent.parent
SRC = ROT / "src"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ACCENT = "#B5581F"
RUTA = 64          # viewBox-storlek
HOJD = 44          # versalhöjd för B i viewBox-enheter

font = TTFont(SRC / "fonter" / "playfair-display-700.woff2")
glyfer = font.getGlyphSet()
glyf = glyfer[font.getBestCmap()[ord("B")]]

# Centrera glyfen efter dess faktiska gränser. Fontens y går uppåt, SVG:ns nedåt.
bp = BoundsPen(glyfer)
glyf.draw(bp)
xmin, ymin, xmax, ymax = bp.bounds
skala = HOJD / (ymax - ymin)
dx = (RUTA - (xmax - xmin) * skala) / 2 - xmin * skala
dy = (RUTA + HOJD) / 2 + ymin * skala
pen = SVGPathPen(None, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
glyf.draw(TransformPen(pen, (skala, 0, 0, -skala, dx, dy)))
B = pen.getCommands()


def svg(hornradie):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {RUTA} {RUTA}">'
        f'<rect width="{RUTA}" height="{RUTA}" rx="{hornradie}" fill="{ACCENT}"/>'
        f'<path fill="#FFFFFF" d="{B}"/></svg>\n'
    )


def rastrera(svgtext, storlek=512):
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        (tmp / "ikon.svg").write_text(svgtext)
        (tmp / "sida.html").write_text(
            f'<body style="margin:0"><img src="ikon.svg" width="{storlek}" height="{storlek}"></body>'
        )
        subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
             "--allow-file-access-from-files", "--default-background-color=00000000",
             f"--window-size={storlek},{storlek}", f"--screenshot={tmp / 'ut.png'}",
             (tmp / "sida.html").as_uri()],
            check=True, capture_output=True,
        )
        return Image.open(tmp / "ut.png").convert("RGBA").crop((0, 0, storlek, storlek))


(SRC / "favicon.svg").write_text(svg(10))
rundad = rastrera(svg(10))
rundad.resize((512, 512), Image.LANCZOS).save(SRC / "icon-512.png", optimize=True)
rundad.resize((192, 192), Image.LANCZOS).save(SRC / "icon-192.png", optimize=True)
# Google visar favicon i sökresultaten och vill ha en multipel av 48 px.
rundad.save(SRC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
# Apple lägger på egna rundade hörn och vill ha en ogenomskinlig, fyrkantig ruta.
rastrera(svg(0)).resize((180, 180), Image.LANCZOS).convert("RGB").save(
    SRC / "apple-touch-icon.png", optimize=True
)
print("Klart: favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png")
