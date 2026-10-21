"""Grow a small texture photo into a larger one without stretching it.

Image quilting (Efros & Freeman 2001): the output is stitched from real
patches of the source, each cut along the seam where it best matches its
neighbours. Used to turn the 736x1308 marble photo into a landscape
background, since `background-size: cover` blew the original up ~2.6x on
desktop.

    pip install numpy pillow
    python src/scripts/marbleQuilt.py photo-originals/marble.jpeg \
        /tmp/marble.png 1800 1100 3 440 140 0.3 1.0

Args: SRC OUT WIDTH HEIGHT [SEED] [BLOCK] [OVERLAP] [TOL] [REUSE]
Different seeds give different layouts; seed 3 with the args above produced
public/marble-bg.jpg (then saved as JPEG quality 90). Save the result
under a NEW filename — images are browser-cached for 30 days.
"""
import sys
import numpy as np
from PIL import Image

src_path, out_path = sys.argv[1], sys.argv[2]
W, H = int(sys.argv[3]), int(sys.argv[4])
seed = int(sys.argv[5]) if len(sys.argv) > 5 else 0
B = int(sys.argv[6]) if len(sys.argv) > 6 else 260
OV = int(sys.argv[7]) if len(sys.argv) > 7 else 80
CANDIDATES = 1500
# Pick randomly among patches within TOL of the best match, for variety.
TOL = float(sys.argv[8]) if len(sys.argv) > 8 else 0.25
REUSE = float(sys.argv[9]) if len(sys.argv) > 9 else 0.6

rng = np.random.default_rng(seed)
src = np.asarray(Image.open(src_path).convert("RGB"), dtype=np.float32)
sh, sw, _ = src.shape
step = B - OV
nx = int(np.ceil((W - OV) / step))
ny = int(np.ceil((H - OV) / step))
out = np.zeros((ny * step + OV, nx * step + OV, 3), np.float32)

# Source only, no mirrored copy: mirroring produced obvious symmetric
# "faces" in the marble.
sources = [src]
# How often each source spot has been used, on a coarse grid, so the same
# striking vein isn't stamped all over the output.
GRID = 40
usage = np.zeros((sh // GRID + 1, sw // GRID + 1))


def min_cut(err):
    """Lowest-cost vertical path through err (rows x cols). Returns mask
    where True = keep the NEW patch."""
    h, w = err.shape
    cost = err.copy()
    for i in range(1, h):
        left = np.r_[np.inf, cost[i - 1, :-1]]
        right = np.r_[cost[i - 1, 1:], np.inf]
        cost[i] += np.minimum(np.minimum(left, cost[i - 1]), right)
    path = np.zeros(h, int)
    path[-1] = int(np.argmin(cost[-1]))
    for i in range(h - 2, -1, -1):
        j = path[i + 1]
        lo, hi = max(j - 1, 0), min(j + 2, w)
        path[i] = lo + int(np.argmin(cost[i, lo:hi]))
    mask = np.zeros((h, w), bool)
    for i, j in enumerate(path):
        mask[i, j:] = True
    return mask


for by in range(ny):
    for bx in range(nx):
        y, x = by * step, bx * step
        if by == 0 and bx == 0:
            s = sources[0]
            yy, xx = rng.integers(0, sh - B), rng.integers(0, sw - B)
            out[y:y + B, x:x + B] = s[yy:yy + B, xx:xx + B]
            continue
        target = out[y:y + B, x:x + B]
        best = []
        for _ in range(CANDIDATES):
            s = sources[rng.integers(len(sources))]
            yy, xx = rng.integers(0, sh - B), rng.integers(0, sw - B)
            p = s[yy:yy + B, xx:xx + B]
            e = 0.0
            if bx > 0:
                e += ((p[:, :OV] - target[:, :OV]) ** 2).sum()
            if by > 0:
                e += ((p[:OV, :] - target[:OV, :]) ** 2).sum()
            used = usage[yy // GRID:(yy + B) // GRID + 1,
                         xx // GRID:(xx + B) // GRID + 1].mean()
            best.append((e * (1 + REUSE * used), p, yy, xx))
        errs = np.array([b[0] for b in best])
        ok = np.flatnonzero(errs <= errs.min() * (1 + TOL))
        _, patch, yy, xx = best[rng.choice(ok)]
        usage[yy // GRID:(yy + B) // GRID + 1, xx // GRID:(xx + B) // GRID + 1] += 1

        mask = np.ones((B, B), bool)
        if bx > 0:
            err = ((patch[:, :OV] - target[:, :OV]) ** 2).sum(2)
            mask[:, :OV] &= min_cut(err)
        if by > 0:
            err = ((patch[:OV, :] - target[:OV, :]) ** 2).sum(2)
            mask[:OV, :] &= min_cut(err.T).T
        # Soften the seam by a few pixels so it never reads as a hard edge.
        m = mask.astype(np.float32)
        for _ in range(3):
            # Edge-padded, not np.roll: rolling wraps the far edge of the
            # mask onto this one and draws faint lines along block borders.
            q = np.pad(m, 1, mode="edge")
            m = (q[1:-1, 1:-1] + q[:-2, 1:-1] + q[2:, 1:-1]
                 + q[1:-1, :-2] + q[1:-1, 2:]) / 5
        filled = np.zeros((B, B), bool)
        if bx > 0:
            filled[:, :OV] = True
        if by > 0:
            filled[:OV, :] = True
        # Never blend toward pixels that haven't been painted yet.
        m = np.where(filled, m, 1.0)
        m = m[..., None]
        out[y:y + B, x:x + B] = patch * m + target * (1 - m)

Image.fromarray(np.clip(out[:H, :W], 0, 255).astype(np.uint8)).save(out_path)
print("wrote", out_path, W, H)
