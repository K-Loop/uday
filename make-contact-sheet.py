from PIL import Image, ImageDraw
from pathlib import Path
import math

folder = Path("public/art")
files = sorted([
    p for p in folder.iterdir()
    if p.is_file() and p.suffix.lower() in
    {".jpg", ".jpeg", ".png", ".webp"}
])

cw, ch, cols = 260, 230, 4
rows = math.ceil(len(files) / cols)
sheet = Image.new("RGB", (cw * cols, ch * rows), "#f4f0e8")
draw = ImageDraw.Draw(sheet)

for i, path in enumerate(files):
    img = Image.open(path).convert("RGB")
    img.thumbnail((cw - 16, 175))
    x, y = (i % cols) * cw, (i // cols) * ch
    sheet.paste(img, (x + (cw - img.width) // 2, y + 5))
    draw.text((x + 8, y + 184), f"{i+1}. {path.name}", fill="#181816")

out = Path("artwork-contact-sheet.jpg")
sheet.save(out, quality=90)
print(f"\nSUCCESS: {out.resolve()}")
print(f"Total images: {len(files)}")
