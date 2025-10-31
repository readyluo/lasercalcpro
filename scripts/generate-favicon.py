#!/usr/bin/env python3
"""
Generate LaserCalcPro Favicon
Creates a professional favicon set for the LaserCalcPro website
"""

import os
import subprocess
from pathlib import Path

# Colors matching the brand
PRIMARY_COLOR = "#2563eb"  # Blue
ACCENT_COLOR = "#f59e0b"   # Orange (for laser beam)
BG_COLOR = "#ffffff"        # White background

def create_svg_icon():
    """Create the base SVG icon"""
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle -->
  <circle cx="256" cy="256" r="240" fill="{PRIMARY_COLOR}"/>
  
  <!-- Inner white circle -->
  <circle cx="256" cy="256" r="200" fill="white"/>
  
  <!-- Letter L with laser beam effect -->
  <g>
    <!-- Letter L -->
    <path d="M 180 160 L 220 160 L 220 310 L 310 310 L 310 350 L 180 350 Z" fill="{PRIMARY_COLOR}"/>
    
    <!-- Letter C -->
    <path d="M 350 200 Q 380 180 410 200 L 395 230 Q 380 220 365 230 L 365 280 Q 380 290 395 280 L 410 310 Q 380 330 350 310 Q 330 290 330 255 Q 330 220 350 200 Z" fill="{PRIMARY_COLOR}"/>
    
    <!-- Laser beam effect (diagonal line with glow) -->
    <line x1="140" y1="140" x2="280" y2="280" stroke="{ACCENT_COLOR}" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
    <line x1="140" y1="140" x2="280" y2="280" stroke="{ACCENT_COLOR}" stroke-width="4" stroke-linecap="round"/>
    
    <!-- Spark/cutting point -->
    <circle cx="280" cy="280" r="12" fill="{ACCENT_COLOR}"/>
    <circle cx="280" cy="280" r="8" fill="white" opacity="0.7"/>
  </g>
</svg>'''
    return svg

def generate_favicons():
    """Generate all favicon sizes"""
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    public_dir = project_root / "public"
    
    # Create temporary SVG file
    svg_file = public_dir / "temp-favicon.svg"
    svg_content = create_svg_icon()
    
    with open(svg_file, 'w') as f:
        f.write(svg_content)
    
    print("📝 Created SVG template...")
    
    # Generate PNG files using ImageMagick
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "icon-192.png": 192,
        "android-chrome-512x512.png": 512,
        "icon-512.png": 512,
    }
    
    for filename, size in sizes.items():
        output_file = public_dir / filename
        cmd = [
            "convert",
            "-background", "none",
            "-density", "300",
            str(svg_file),
            "-resize", f"{size}x{size}",
            str(output_file)
        ]
        subprocess.run(cmd, check=True)
        print(f"✓ Generated {filename} ({size}x{size})")
    
    # Generate favicon.ico (multi-size)
    ico_file = public_dir / "favicon.ico"
    cmd = [
        "convert",
        str(public_dir / "favicon-16x16.png"),
        str(public_dir / "favicon-32x32.png"),
        str(ico_file)
    ]
    subprocess.run(cmd, check=True)
    print(f"✓ Generated favicon.ico (multi-size)")
    
    # Clean up temporary file
    svg_file.unlink()
    print("\n✅ All favicons generated successfully!")
    print(f"📁 Output directory: {public_dir}")
    print("\n🎨 Favicon features:")
    print("   • Brand colors (Blue #2563eb + Orange #f59e0b)")
    print("   • LC letters for LaserCalc")
    print("   • Laser beam effect")
    print("   • Professional design")
    print("\n💡 Next steps:")
    print("   1. Check the generated icons in /public/")
    print("   2. Test in browser (clear cache if needed)")
    print("   3. Verify on mobile devices after deployment")

if __name__ == "__main__":
    generate_favicons()

