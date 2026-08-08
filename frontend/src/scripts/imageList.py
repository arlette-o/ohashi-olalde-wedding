"""
generate_image_list.py

Scans a folder of images, reads each image's real pixel dimensions,
and writes out an imagelist.ts where `rows`/`cols` are derived from
the image's actual aspect ratio instead of being random.

Usage:
    1. pip install Pillow --break-system-packages   (if not already installed)
    2. python generate_image_list.py

Adjust CONFIG below to match your project's folder structure.
"""

import os
import re
from pathlib import Path
from PIL import Image

# ---------- CONFIG ----------
IMAGE_DIR = "public/mosaicpics"          # folder to scan (relative to project root)
OUTPUT_FILE = "src/assets/imageList.ts"  # where to write the result
VALID_EXT = {".jpg", ".jpeg", ".png", ".webp"}
DEFAULT_TITLE = "Filler title"
# -----------------------------


def ratio_to_shape(ratio: float) -> dict:
    """
    Bucket an aspect ratio (width / height) into a {rows, cols} shape.
    Tune these thresholds to taste — they control how "extreme" ratios
    need to be before they get a bigger/taller cell.
    """
    if ratio >= 1.8:
        return {"rows": 1, "cols": 3}   # very wide (panorama-ish)
    if ratio >= 1.3:
        return {"rows": 1, "cols": 2}   # landscape
    if ratio <= 0.55:
        return {"rows": 3, "cols": 1}   # very tall (phone portrait)
    if ratio <= 0.8:
        return {"rows": 2, "cols": 1}   # portrait
    return {"rows": 1, "cols": 1}       # roughly square


def load_existing_titles(path: str) -> dict:
    """
    Best-effort: if an imagelist.ts already exists, preserve any titles
    the user has hand-edited, keyed by image path.
    """
    titles = {}
    if not os.path.exists(path):
        return titles

    try:
        content = Path(path).read_text(encoding="utf-8")
        pattern = re.compile(
            r'img:\s*"([^"]+)"[^}]*?title:\s*"([^"]*)"', re.DOTALL
        )
        for match in pattern.finditer(content):
            titles[match.group(1)] = match.group(2)
    except Exception:
        # ignore parse failures, just fall back to defaults
        pass
    return titles


def main():
    existing_titles = load_existing_titles(OUTPUT_FILE)

    image_dir = Path(IMAGE_DIR)
    if not image_dir.is_dir():
        print(f"Image directory not found: {IMAGE_DIR}")
        return

    files = sorted(
        f for f in os.listdir(image_dir)
        if Path(f).suffix.lower() in VALID_EXT
    )

    items = []

    for file in files:
        full_path = image_dir / file
        img_path = f"{IMAGE_DIR}/{file}"

        try:
            with Image.open(full_path) as img:
                width, height = img.size
        except Exception as err:
            print(f"Skipping {file}: could not read dimensions ({err})")
            continue

        ratio = width / height
        shape = ratio_to_shape(ratio)

        items.append({
            "img": img_path,
            "title": existing_titles.get(img_path, DEFAULT_TITLE),
            "rows": shape["rows"],
            "cols": shape["cols"],
        })

    body_lines = []
    for item in items:
        body_lines.append(
            "  {\n"
            f'    img: "{item["img"]}",\n'
            f'    title: "{item["title"]}",\n'
            f'    rows: {item["rows"]},\n'
            f'    cols: {item["cols"]},\n'
            "  },"
        )

    output = "export const imageList = [\n" + "\n".join(body_lines) + "\n];\n"

    output_path = Path(OUTPUT_FILE)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(output, encoding="utf-8")

    print(f"Wrote {len(items)} items to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()