"""
Script to download dance videos from YouTube as MP4 files.
Downloads 30-second clips at 480p for web-friendly file sizes.
Uses a local ffmpeg from ffmpeg-static.
"""

import subprocess
import os
import sys
import shutil

# Path to local ffmpeg
FFMPEG_PATH = r"C:\Users\kumar\projects\Culture-connect\node_modules\ffmpeg-static\ffmpeg.exe"

# All dance videos with their IDs and filenames
dances = [
    ("ko5sKNuSLbs", "kuchipudi"),
    ("JWhA3ldZcyY", "bharatanatyam"),
    ("cl9wNFQU2NI", "kathakali"),
    ("UBYqv21c0Yk", "kathak"),
    ("L-7apTiVAnQ", "odissi"),
    ("sMCHWwOfabA", "manipuri"),
    ("iF-DkJZX_L8", "sattriya"),
    ("5w4CwU6Ad1M", "garba"),
    ("ycTlIyQ2MHg", "bhangra"),
    ("_jejOrSkw1E", "lavani"),
    ("CU1tFtk_NFY", "ghoomar"),
    ("_P75MS4Semk", "bihu"),
    ("LNGZ1R8QjuY", "yakshagana"),
    ("L5euEKaS-yc", "chhau"),
    ("uwCH_WEYFTo", "cheraw"),
    ("Rkffm_S5zeY", "rouf"),
    ("5-6_Q2dhWqM", "bardo_chham"),
    ("lGNw3_CzbJM", "bidesiya"),
    ("T3wCV49kme0", "karma_naach"),
    ("hI_vjZOv5tE", "fugdi"),
    ("iqcwuo7b7uM", "phag_dance"),
    ("P-JUqOgSVYs", "nati"),
    ("zgWnde-o1dg", "matki_dance"),
    ("CG2PsfVyIbo", "laho"),
    ("AMbG9jRpHcw", "chang_lo"),
    ("a5MO__5jJtc", "singhi_chham"),
    ("AaFoB46BA4M", "perini"),
    ("9QRXh8_mHCQ", "hojagiri"),
    ("QICEtirs56A", "choliya"),
    ("1ZmILBX2Y1I", "shondol"),
    ("-P0XFHEI92c", "paika"),
    ("Z7N1EDvPBz4", "mohiniyattam"),
    ("M9whLct0Oag", "nicobari"),
    ("kTH6H2hikg4", "tarpa"),
    ("hrV-8zQjBS4", "kolkali"),
    ("Cy9tiiz9lAg", "garadi"),
]

OUTPUT_DIR = os.path.join("public", "videos", "dances")

def cleanup():
    """Removes partial files from previous failed runs."""
    if os.path.exists(OUTPUT_DIR):
        print(f"Cleaning up {OUTPUT_DIR}...")
        for f in os.listdir(OUTPUT_DIR):
            if not f.endswith('.mp4') or '.f' in f: # Remove non-mp4 and temp segment files
                os.remove(os.path.join(OUTPUT_DIR, f))

def download_video(video_id, filename):
    output_path = os.path.join(OUTPUT_DIR, f"{filename}.mp4")
    
    # Skip if already downloaded and valid size (> 1MB)
    if os.path.exists(output_path) and os.path.getsize(output_path) > 1000000:
        print(f"  [SKIP] {filename}.mp4 already exists")
        return True
    
    url = f"https://www.youtube.com/watch?v={video_id}"
    
    # ffmpeg is needed for --download-sections and merging
    cmd = [
        "yt-dlp",
        "--ffmpeg-location", FFMPEG_PATH,
        "--format", "bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/best[height<=480][ext=mp4]/best[height<=480]",
        "--merge-output-format", "mp4",
        "--download-sections", "*10-40", # 30s clip starting at 10s
        "--force-keyframes-at-cuts",
        "--output", output_path,
        "--no-playlist",
        "--quiet",
        "--no-warnings",
        url
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        if result.returncode == 0 and os.path.exists(output_path):
            size_mb = os.path.getsize(output_path) / (1024 * 1024)
            print(f"  [OK] {filename}.mp4 ({size_mb:.1f} MB)")
            return True
        else:
            print(f"  [FAIL] {filename}: {result.stderr[:200] if result.stderr else 'Unknown error'}")
            return False
    except subprocess.TimeoutExpired:
        print(f"  [TIMEOUT] {filename}")
        return False
    except Exception as e:
        print(f"  [ERROR] {filename}: {e}")
        return False

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    cleanup()
    
    print(f"Downloading {len(dances)} dance videos using FFmpeg at {FFMPEG_PATH}...\n")
    
    success = 0
    failed = []
    
    for i, (vid_id, name) in enumerate(dances, 1):
        print(f"[{i}/{len(dances)}] Downloading {name}...")
        if download_video(vid_id, name):
            success += 1
        else:
            failed.append(name)
    
    print(f"\n{'='*50}")
    print(f"Done! {success}/{len(dances)} videos downloaded.")
    if failed:
        print(f"Failed: {', '.join(failed)}")
