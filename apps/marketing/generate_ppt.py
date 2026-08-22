import collections
import collections.abc
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

# Define SANKALP colors
BG_COLOR = RGBColor(5, 8, 20) # Very dark blue/black
TEXT_PRIMARY = RGBColor(248, 250, 252) # Slate 50
TEXT_SECONDARY = RGBColor(148, 163, 184) # Slate 400

DOMAIN_COLORS = {
    "Explore": RGBColor(59, 130, 246), # Blue
    "Shape": RGBColor(139, 92, 246), # Violet
    "Insight": RGBColor(245, 158, 11), # Amber
    "Secure": RGBColor(16, 185, 129), # Emerald
    "Watch": RGBColor(244, 63, 94), # Rose
    "Connect": RGBColor(34, 211, 238), # Cyan
}

prs = Presentation()

# Make it 16:9
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

def create_slide_with_bg(prs, title_text, layout_index=6):
    slide_layout = prs.slide_layouts[layout_index] # 6 is usually blank
    slide = prs.slides.add_slide(slide_layout)
    
    # Add dark background
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = BG_COLOR
    
    if title_text:
        # Add title
        txBox = slide.shapes.add_textbox(Inches(1), Inches(0.5), Inches(11.333), Inches(1))
        tf = txBox.text_frame
        tf.text = title_text
        p = tf.paragraphs[0]
        p.font.size = Pt(44)
        p.font.bold = True
        p.font.color.rgb = TEXT_PRIMARY
        p.alignment = PP_ALIGN.LEFT
        
    return slide

def add_bullet_points(slide, top, text_lines, color=TEXT_SECONDARY, font_size=24):
    txBox = slide.shapes.add_textbox(Inches(1), top, Inches(11.333), Inches(4))
    tf = txBox.text_frame
    tf.word_wrap = True
    
    for line in text_lines:
        p = tf.add_paragraph()
        p.text = "• " + line
        p.font.size = Pt(font_size)
        p.font.color.rgb = color
        p.space_before = Pt(14)

# --- SLIDE 1: Title ---
slide = create_slide_with_bg(prs, "")
txBox = slide.shapes.add_textbox(Inches(1), Inches(2.5), Inches(11.333), Inches(2))
tf = txBox.text_frame
p = tf.paragraphs[0]
p.text = "SANKALP"
p.font.size = Pt(80)
p.font.bold = True
p.font.color.rgb = TEXT_PRIMARY
p.alignment = PP_ALIGN.CENTER

p2 = tf.add_paragraph()
p2.text = "AI-Powered Personal Intelligence & Decision-Support System"
p2.font.size = Pt(32)
p2.font.color.rgb = DOMAIN_COLORS["Connect"]
p2.alignment = PP_ALIGN.CENTER

# --- SLIDE 2: The Problem ---
slide = create_slide_with_bg(prs, "The Problem with 'AI Advice'")
add_bullet_points(slide, Inches(2), [
    "Generic chatbots put the cognitive load on the user.",
    "Students have siloed data: academics, career, cybersecurity.",
    "Information overload leads to decision paralysis.",
    "Users don't just need answers, they need PRIORITIES."
])

# --- SLIDE 3: The SANKALP Solution ---
slide = create_slide_with_bg(prs, "One Platform. Six Intelligence Domains.")
txBox = slide.shapes.add_textbox(Inches(1), Inches(2), Inches(11.333), Inches(4))
tf = txBox.text_frame
p = tf.paragraphs[0]
p.text = "We built a proactive intelligence system that tells you the Next Best Action."
p.font.size = Pt(28)
p.font.color.rgb = TEXT_SECONDARY

# Add colorful boxes for the 6 domains
left = 1
for i, (name, color) in enumerate(DOMAIN_COLORS.items()):
    shape = slide.shapes.add_shape(
        1, # msoShapeRectangle
        Inches(left), Inches(4), Inches(1.7), Inches(1.5)
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    
    tf = shape.text_frame
    tf.text = name
    p = tf.paragraphs[0]
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = BG_COLOR
    p.alignment = PP_ALIGN.CENTER
    left += 1.9

# --- SLIDE 4: The UI/UX Philosophy ---
slide = create_slide_with_bg(prs, "The 'Living Interface'")
add_bullet_points(slide, Inches(2), [
    "Semantic Color Theory: Each domain has a psychological color (Amber for Warning, Green for Safety).",
    "Tactile Motion: Micro-interactions that make cards and buttons feel responsive.",
    "Glassmorphism: Deep, space-like dark mode with subtle edge lighting.",
    "Premium Architecture: Six unique rooms, one cohesive building."
])

# --- SLIDE 5: Tech Stack ---
slide = create_slide_with_bg(prs, "Built for Scale & Performance")
add_bullet_points(slide, Inches(2), [
    "Frontend: Next.js 16, React, TypeScript, Tailwind CSS, Framer Motion",
    "Backend: Python, FastAPI, PostgreSQL",
    "Architecture: API-driven, strictly separating business logic from the UI.",
    "Next Best Action Engine: Contextual reasoning to find the highest priority task."
])

# --- SLIDE 6: Thank You ---
slide = create_slide_with_bg(prs, "")
txBox = slide.shapes.add_textbox(Inches(1), Inches(3), Inches(11.333), Inches(1.5))
tf = txBox.text_frame
p = tf.paragraphs[0]
p.text = "Thank You!"
p.font.size = Pt(72)
p.font.bold = True
p.font.color.rgb = DOMAIN_COLORS["Explore"]
p.alignment = PP_ALIGN.CENTER

prs.save(r'C:\Users\mehak\.gemini\antigravity-ide\brain\4458cc46-40d2-43cf-9d24-d6a67e220ce3\SANKALP_Pitch_Deck.pptx')
print("PPTX Created Successfully")
