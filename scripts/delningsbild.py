"""Ritar delningsbilden (og:image), 1200 x 630 px, i sajtens palett och typsnitt.

Sidan byggs som HTML med de self-hostade fonterna och rastreras med headless
Chrome. Loggan är samma B som i faviconen, så kör scripts/favicon.py först om
den har ändrats.  Kör:  python3 scripts/delningsbild.py
"""
import subprocess
import tempfile
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
SRC = ROT / "src"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FONTER = (SRC / "fonter").as_uri()

HTML = f"""<!DOCTYPE html>
<html lang="sv"><head><meta charset="UTF-8"><style>
@font-face {{ font-family: "Playfair Display"; font-weight: 700;
  src: url("{FONTER}/playfair-display-700.woff2") format("woff2"); }}
@font-face {{ font-family: "Source Sans 3"; font-weight: 400;
  src: url("{FONTER}/source-sans-3-400.woff2") format("woff2"); }}
@font-face {{ font-family: "Source Sans 3"; font-weight: 700;
  src: url("{FONTER}/source-sans-3-700.woff2") format("woff2"); }}
* {{ margin: 0; box-sizing: border-box; }}
body {{
  width: 1200px; height: 630px; overflow: hidden;
  background: #F7F5F2; color: #181614;
  font-family: "Source Sans 3", sans-serif;
  padding: 72px 90px 0;
  border-left: 16px solid #B5581F;
}}
.avsandare {{
  display: flex; align-items: center; gap: 18px;
  padding-bottom: 26px; border-bottom: 2px solid #181614;
}}
.avsandare img {{ width: 56px; height: 56px; }}
.avsandare span {{
  font-family: "Playfair Display", serif; font-weight: 700;
  font-size: 34px; letter-spacing: -0.01em;
}}
h1 {{
  font-family: "Playfair Display", serif; font-weight: 700;
  font-size: 84px; line-height: 1.08; letter-spacing: -0.015em;
  margin-top: 64px;
}}
.streck {{ width: 120px; height: 6px; background: #B5581F; margin: 40px 0 30px; }}
p {{ font-size: 32px; line-height: 1.4; color: #6b6459; }}
</style></head><body>
<div class="avsandare"><img src="{(SRC / 'favicon.svg').as_uri()}" alt=""><span>Barnprylsdoktorn</span></div>
<h1>Rätt bilbarnstol,<br>utan researchen.</h1>
<div class="streck"></div>
<p>Guider om i-Size, isofix och bakåtvänt — förklarat på svenska.</p>
</body></html>
"""

with tempfile.TemporaryDirectory() as tmp:
    sida = Path(tmp) / "delningsbild.html"
    sida.write_text(HTML)
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
         "--allow-file-access-from-files", "--window-size=1200,630",
         "--virtual-time-budget=2000",  # vänta in typsnitten
         f"--screenshot={SRC / 'bilder' / 'delningsbild.png'}", sida.as_uri()],
        check=True, capture_output=True,
    )
print("Klart: src/bilder/delningsbild.png")
