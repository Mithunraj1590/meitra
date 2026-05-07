import re

with open('style.css', 'r') as f:
    css = f.read()

# Make main logo bigger
css = re.sub(r'\.main-logo-svg\s*\{\s*height:\s*32px;', '.main-logo-svg {\n    height: 48px;', css)

# Doctor card style (like Image 2)
doctor_card_css = """
.doctor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 16px;
}

.doctor-card {
    position: relative;
    aspect-ratio: 4 / 5;
    border-radius: 16px;
    overflow: hidden;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.doctor-card .doc-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.doctor-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
    z-index: 2;
    pointer-events: none;
}

.doctor-card .doc-info {
    position: relative;
    z-index: 3;
    padding: 24px;
    color: white;
}

.doctor-card .doc-info h5 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.doctor-card .doc-info span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    display: block;
    margin-top: 4px;
    margin-bottom: 12px;
}

.doctor-card .doc-info .doc-desc {
    font-size: 12px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
}
"""

# Replace old doctor-card css if it exists, or append it
if '.doctor-card {' in css:
    # Just append since it's safer, but it's better to remove old .doctor-card
    css = re.sub(r'\.doctor-grid\s*\{.*?\}(?=\s*\.|\Z)', '', css, flags=re.DOTALL)
    css = re.sub(r'\.doctor-card\s*\{.*?\}(?=\s*\.|\Z)', '', css, flags=re.DOTALL)

css += doctor_card_css

# Nav bar styles
nav_bar_css = """
.top-nav .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(30, 20, 15, 0.85); /* Dark brown pill */
    backdrop-filter: blur(10px);
    border-radius: 50px;
    padding: 8px 24px;
    width: 100%;
}

.top-nav .nav-links {
    display: flex;
    gap: 32px;
}

.top-nav .nav-links a {
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: opacity 0.3s ease;
}

.top-nav .nav-links a:hover {
    opacity: 0.7;
}

@media (max-width: 768px) {
    .top-nav .nav-links {
        display: none;
    }
}
"""
css += nav_bar_css

# Footer styles
footer_css = """
.slide-category {
    background: #111;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: white;
}

.slide-category h2 {
    font-size: 36px;
    margin-bottom: 40px;
    font-family: 'Playfair Display', serif;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 800px;
}

.category-card {
    background: #222;
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    transition: transform 0.3s ease, background 0.3s ease;
    cursor: pointer;
}

.category-card:hover {
    transform: translateY(-5px);
    background: #333;
}

.category-card h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
}

.slide-footer {
    background: #0a0a0a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    padding: 40px;
}

.footer-content {
    max-width: 600px;
}

.footer-logo {
    margin-bottom: 30px;
}

.footer-links {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 30px;
}

.footer-links a {
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    font-size: 14px;
}

.footer-links a:hover {
    color: white;
}

.footer-copy {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
}
"""
css += footer_css

with open('style.css', 'w') as f:
    f.write(css)

