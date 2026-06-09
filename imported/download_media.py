import os
import urllib.request
import urllib.error

BASE = "https://global.m.international"
DEST = "/storage/repos/m-internation.kz/imported"

files = [
    # Videos
    ("videos/liza-intro.mp4", "videos/liza-intro.mp4"),
    
    # Home banners
    ("images/products/main/banner/desktop/banner-1.jpg", "images/banners/banner-1.jpg"),
    ("images/products/main/banner/desktop/banner-2.jpg", "images/banners/banner-2.jpg"),
    ("images/products/main/banner/desktop/banner-3.jpg", "images/banners/banner-3.jpg"),
    ("images/products/main/banner/desktop/banner-4.jpg", "images/banners/banner-4.jpg"),
    ("images/products/main/banner/desktop/banner-5.jpg", "images/banners/banner-5.jpg"),
    ("images/products/main/banner/desktop/banner-6.jpg", "images/banners/banner-6.jpg"),
    ("images/products/main/banner/desktop/banner-7.jpg", "images/banners/banner-7.jpg"),
    ("images/products/main/banner/desktop/banner-8.jpg", "images/banners/banner-8.jpg"),
    ("images/products/main/banner/desktop/banner-9.jpg", "images/banners/banner-9.jpg"),
    ("images/products/main/banner/desktop/banner-10.jpg", "images/banners/banner-10.jpg"),
    ("images/products/main/banner/desktop/banner-11.jpg", "images/banners/banner-11.jpg"),
    ("images/products/main/banner/desktop/banner-12.jpg", "images/banners/banner-12.jpg"),
    ("images/products/main/banner/desktop/banner-13.jpg", "images/banners/banner-13.jpg"),
    ("images/products/main/banner/desktop/banner-14.jpg", "images/banners/banner-14.jpg"),
    ("images/products/main/banner/desktop/banner-15.jpg", "images/banners/banner-15.jpg"),
    ("images/products/main/banner/desktop/banner-16.jpg", "images/banners/banner-16.jpg"),
    
    # Category images
    ("images/products/main/supplement.png", "images/products/supplement-category.png"),
    ("images/products/main/personal.png", "images/products/personal-category.png"),
    ("images/products/main/lifestyle.png", "images/products/lifestyle-category.png"),
    
    # Supplement products
    ("images/products/main/supplement/blumax.png", "images/products/supplement/blumax.png"),
    ("images/products/main/supplement/mimax.png", "images/products/supplement/mimax.png"),
    ("images/products/main/supplement/greenmax.png", "images/products/supplement/greenmax.png"),
    ("images/products/main/supplement/fleximax.png", "images/products/supplement/fleximax.png"),
    ("images/products/main/supplement/micrystal.png", "images/products/supplement/micrystal.png"),
    ("images/products/main/supplement/machoman.png", "images/products/supplement/machoman.png"),
    ("images/products/main/supplement/nutrimax.png", "images/products/supplement/nutrimax.png"),
    ("images/products/main/supplement/mishroom.png", "images/products/supplement/mishroom.png"),
    
    # Personal Care products
    ("images/products/main/personal/mimask.png", "images/products/personal-care/mimask.png"),
    ("images/products/main/personal/miserum.png", "images/products/personal-care/miserum.png"),
    ("images/products/main/personal/magicare.png", "images/products/personal-care/magicare.png"),
    ("images/products/main/personal/yekaterina.png", "images/products/personal-care/yekaterina.png"),
    ("images/products/main/personal/mifresh.png", "images/products/personal-care/mifresh.png"),
    
    # Lifestyle products
    ("images/products/main/lifestyle/essential.png", "images/products/lifestyle/essential-oil.png"),
    ("images/products/main/lifestyle/mitown-cordyceps.png", "images/products/lifestyle/mitown-cordyceps.png"),
    ("images/products/main/lifestyle/relax.png", "images/products/lifestyle/relax.png"),
    ("images/products/main/lifestyle/miwellness.png", "images/products/lifestyle/miwellness.png"),
    ("images/products/main/lifestyle/shaker.png", "images/products/lifestyle/shaker.png"),
    
    # Certificates
    ("images/cert/certificate-halal-greenmax-2025.png", "images/certificates/halal-greenmax-2025.png"),
    ("images/cert/certificate-halal-macho-flexi-2025.png", "images/certificates/halal-macho-flexi-2025.png"),
    ("images/cert/certificate-halal-mitown-2025.png", "images/certificates/halal-mitown-2025.png"),
    ("images/cert/certificate-halal-mm-bm-nm-2026.png", "images/certificates/halal-mm-bm-nm-2026.png"),
    ("images/cert/certificate-halal-micrystal-2025.png", "images/certificates/halal-micrystal-2025.png"),
    ("images/cert/ajl-license-2025-2030.png", "images/certificates/ajl-license-2025-2030.png"),
    
    # Logo
    ("images/logo/logo-text.png", "images/logo/logo-text.png"),
    ("images/logo/dsam.png", "images/logo/dsam.png"),
]

# Business page video (Cloudflare Stream)
cf_video = "https://customer-sddi3o19ierd5n1w.cloudflarestream.com/a97ca274064c0ca00509866efa69e7f1/downloads/default.mp4"

success = 0
fail = 0

for src_path, dest_path in files:
    url = BASE + "/" + src_path if not src_path.startswith("http") else src_path
    full_dest = os.path.join(DEST, dest_path)
    os.makedirs(os.path.dirname(full_dest), exist_ok=True)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            with open(full_dest, "wb") as f:
                f.write(resp.read())
        print(f"OK: {dest_path}")
        success += 1
    except Exception as e:
        print(f"FAIL: {dest_path} - {e}")
        fail += 1

# Try Cloudflare video
try:
    cf_url = "https://customer-sddi3o19ierd5n1w.cloudflarestream.com/a97ca274064c0ca00509866efa69e7f1/downloads/default.mp4"
    full_dest = os.path.join(DEST, "videos/business-intro.mp4")
    req = urllib.request.Request(cf_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        with open(full_dest, "wb") as f:
            f.write(resp.read())
    print("OK: videos/business-intro.mp4")
    success += 1
except Exception as e:
    print(f"FAIL: videos/business-intro.mp4 - {e}")
    # Try manifest
    try:
        cf_url2 = "https://customer-sddi3o19ierd5n1w.cloudflarestream.com/a97ca274064c0ca00509866efa69e7f1/manifest/video.mpd"
        req2 = urllib.request.Request(cf_url2, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req2, timeout=30) as resp:
            with open(os.path.join(DEST, "videos/business-intro.mpd"), "wb") as f:
                f.write(resp.read())
        print("OK: videos/business-intro.mpd (manifest)")
        success += 1
    except Exception as e2:
        print(f"FAIL manifest: {e2}")
        fail += 1

print(f"\nDone: {success} OK, {fail} FAIL")
