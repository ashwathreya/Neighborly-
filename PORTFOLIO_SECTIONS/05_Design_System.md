# Design System Elements

## Complete Design System Documentation

This section provides a comprehensive overview of the design system used in Neighborly, ready to include in your portfolio.

---

## Color Palette

### Primary Colors

**Gradient Palette:**
```
Primary Gradient: #6366f1 → #8b5cf6 → #ec4899
- Start: #6366f1 (Indigo)
- Mid: #8b5cf6 (Purple)
- End: #ec4899 (Pink)
```

**Usage:**
- Hero sections
- Call-to-action buttons
- Brand elements
- Logo text
- Accent highlights

---

### Platform Colors (35+ Platforms)

**Pet Care Platforms:**
- Rover: `#00B9B4` (Teal)
- Wag!: `#FF6B6B` (Coral Red)
- Care.com: `#4A90E2` (Blue)
- Sittercity: `#8B5CF6` (Purple)
- PetBacker: `#FF9800` (Orange)
- Holidog: `#9C27B0` (Deep Purple)
- TrustedHousesitters: `#4CAF50` (Green)

**Home Services Platforms:**
- Thumbtack: `#009688` (Teal)
- TaskRabbit: `#00C853` (Green)
- Handy: `#FF5722` (Deep Orange)
- Angi: `#E91E63` (Pink)
- HomeAdvisor: `#FF6F00` (Amber)
- Porch: `#00BCD4` (Cyan)
- Takl: `#3F51B5` (Indigo)

**Tutoring Platforms:**
- Wyzant: `#00A8E8` (Blue)
- Varsity Tutors: `#1E88E5` (Blue)
- Preply: `#00D4AA` (Teal)
- Tutor.com: `#FF6B35` (Orange)

*[Continue with all 35+ platforms]*

**Usage:**
- Platform badges
- Filter tab highlights
- Card borders on hover
- Provider detail modal headers

---

### Neutral Colors

**Backgrounds:**
```
White: #ffffff
Light Gray: #f9fafb
Subtle Gray: #f3f4f6
```

**Text Colors:**
```
Primary Text: #111827 (Dark Gray)
Secondary Text: #6b7280 (Medium Gray)
Tertiary Text: #9ca3af (Light Gray)
```

**Borders:**
```
Light Border: #e5e7eb
Medium Border: #d1d5db
Dark Border: #374151
```

**Status Colors:**
```
Success: #10b981 (Green)
Error: #ef4444 (Red)
Warning: #f59e0b (Amber)
Info: #3b82f6 (Blue)
```

---

## Typography

### Font Family

**Primary Font:** Inter (Google Fonts)
- **Weights Available:** 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

**Why Inter?**
- Excellent readability at all sizes
- Modern, clean aesthetic
- Great for UI/UX design
- Optimized for screens

---

### Type Scale

**Headings:**

```
H1 - Hero Titles
- Size: 48px
- Weight: 800 (Extra-bold)
- Line Height: 1.2
- Letter Spacing: -0.02em
- Usage: Main page titles, hero headlines

H2 - Section Titles
- Size: 32px
- Weight: 700 (Bold)
- Line Height: 1.3
- Letter Spacing: -0.01em
- Usage: Section headers, major headings

H3 - Subsection Titles
- Size: 24px
- Weight: 700 (Bold)
- Line Height: 1.4
- Usage: Card titles, modal headers, subsection titles

H4 - Card Titles
- Size: 20px
- Weight: 600 (Semi-bold)
- Line Height: 1.4
- Usage: Provider names, card headings
```

**Body Text:**

```
Body Large
- Size: 18px
- Weight: 400 (Regular)
- Line Height: 1.6
- Usage: Important descriptions, intro text

Body Regular
- Size: 16px
- Weight: 400 (Regular)
- Line Height: 1.6
- Usage: Main content, paragraphs

Body Small
- Size: 14px
- Weight: 400 (Regular)
- Line Height: 1.5
- Usage: Secondary information, captions

Body Extra Small
- Size: 12px
- Weight: 400 (Regular)
- Line Height: 1.4
- Usage: Labels, fine print, metadata
```

**Special Text:**

```
Button Text
- Size: 15px
- Weight: 600 (Semi-bold)
- Line Height: 1.5
- Usage: All button labels

Label Text
- Size: 13px
- Weight: 600 (Semi-bold)
- Line Height: 1.4
- Usage: Form labels, filter labels

Badge Text
- Size: 11px-12px
- Weight: 700 (Bold)
- Line Height: 1.2
- Usage: Platform badges, count badges
```

---

## Spacing System

### Base Unit: 4px

All spacing values are multiples of 4px for consistency and alignment.

**Scale:**
```
4px   - XS (Extra Small)
8px   - S (Small)
12px  - SM (Small Medium)
16px  - M (Medium)
20px  - ML (Medium Large)
24px  - L (Large)
32px  - XL (Extra Large)
40px  - 2XL
48px  - 3XL
64px  - 4XL
80px  - 5XL
```

**Usage Examples:**
- **Card Padding**: 16px-24px
- **Section Spacing**: 32px-64px
- **Component Gaps**: 12px-20px
- **Button Padding**: 12px 24px (vertical horizontal)
- **Input Padding**: 12px 16px
- **Modal Padding**: 32px

---

## Component Library

### Buttons

**Primary Button:**
```css
Background: Linear gradient (#6366f1 → #8b5cf6 → #ec4899)
Text Color: #ffffff
Padding: 12px 24px
Border Radius: 10px-12px
Font Size: 15px
Font Weight: 600
Border: None
Shadow: 0 4px 12px rgba(99, 102, 241, 0.3)
Hover: Transform translateY(-2px), Shadow intensifies
Active: Scale(0.98)
```

**Secondary Button:**
```css
Background: #ffffff
Text Color: #374151
Padding: 12px 24px
Border Radius: 10px
Font Size: 15px
Font Weight: 600
Border: 2px solid #e5e7eb
Shadow: None
Hover: Border color changes to primary, Text color changes
```

**Ghost Button:**
```css
Background: Transparent
Text Color: #6b7280
Padding: 8px 16px
Border: None
Hover: Background #f3f4f6, Text color darkens
```

---

### Cards

**Provider Card:**
```css
Background: #ffffff
Border: 2px solid #e5e7eb
Border Radius: 16px
Padding: 16px
Shadow: 0 4px 12px rgba(0,0,0,0.08)
Hover: 
  - Transform: translateY(-4px)
  - Border Color: Platform color
  - Shadow: 0 12px 32px [platform-color]30
Transition: all 0.3s ease
```

**Stat Card:**
```css
Background: #f9fafb
Border Radius: 12px
Padding: 16px
Border: None
```

---

### Input Fields

**Text Input:**
```css
Background: #ffffff
Border: 2px solid #e5e7eb
Border Radius: 10px
Padding: 12px 16px
Font Size: 15px
Focus:
  - Border Color: Primary gradient
  - Outline: None
  - Shadow: 0 0 0 3px rgba(99, 102, 241, 0.1)
```

**Search Input:**
```css
Background: #ffffff
Border: 2px solid #e5e7eb
Border Radius: 12px
Padding: 14px 20px 14px 48px (left padding for icon)
Font Size: 16px
Icon: Left-aligned, 20px from left edge
```

---

### Modals

**Modal Container:**
```css
Background: rgba(0, 0, 0, 0.6)
Backdrop Filter: blur(4px)
Position: Fixed, Full Screen
Z-index: 1000
Animation: fadeIn 0.3s ease-out
```

**Modal Content:**
```css
Background: #ffffff
Border Radius: 24px
Max Width: 900px
Max Height: 90vh
Shadow: 0 20px 60px rgba(0,0,0,0.3)
Animation: slideUp 0.3s ease-out
```

**Modal Header:**
```css
Background: Linear gradient (platform color)
Padding: 24px 32px
Color: #ffffff
Border Radius: 24px 24px 0 0
```

---

### Badges

**Platform Badge:**
```css
Background: Platform color
Color: #ffffff
Padding: 4px 10px
Border Radius: 8px
Font Size: 10px-12px
Font Weight: 700
Display: inline-flex
Gap: 4px (icon + text)
```

**Count Badge:**
```css
Background: rgba(255,255,255,0.3) or Platform color
Color: #ffffff
Padding: 2px 8px
Border Radius: 6px
Font Size: 11px
Font Weight: 700
```

---

### Tabs

**Tab Container:**
```css
Background: #f9fafb
Border Bottom: 2px solid #e5e7eb
Display: flex
Overflow-x: auto
```

**Tab Button:**
```css
Background: none
Border: none
Border Bottom: 3px solid transparent
Padding: 16px 24px
Color: #6b7280
Font Weight: 500
Font Size: 15px
Active:
  - Border Bottom Color: Platform color
  - Color: Platform color
  - Font Weight: 700
Hover:
  - Color: Platform color
  - Background: #f3f4f6
```

---

## Iconography

### Icon Style
- **Type**: Emoji-based icons for platform badges
- **Size**: 16px-24px for inline icons, 48px+ for feature icons
- **Usage**: Platform identification, category representation

### Icon Library
- 🐕 Pet Care
- 🏠 Home Services
- 📚 Tutoring
- 👶 Childcare
- 🎉 Event Planning
- 🧹 Cleaning
- 📦 Moving
- ⭐ Ratings
- ✓ Verification
- 📍 Location
- 💰 Pricing
- ⏰ Time/Response

---

## Shadows & Elevation

**Elevation Levels:**
```
Level 0 (Flat):
- Shadow: none

Level 1 (Cards):
- Shadow: 0 4px 12px rgba(0,0,0,0.08)

Level 2 (Hovered Cards):
- Shadow: 0 12px 32px rgba(0,0,0,0.12)

Level 3 (Modals):
- Shadow: 0 20px 60px rgba(0,0,0,0.3)

Level 4 (Floating Elements):
- Shadow: 0 24px 48px rgba(0,0,0,0.4)
```

---

## Border Radius

**Scale:**
```
4px   - Small elements (badges, small buttons)
8px   - Medium elements (cards, inputs)
10px  - Buttons, inputs
12px  - Cards, containers
16px  - Large cards
20px  - Modals, large containers
24px  - Modal containers, hero sections
```

---

## Animations

### Timing Functions
```
Ease Out: ease-out (default)
Ease In: ease-in
Ease In Out: ease-in-out
Linear: linear
```

### Duration
```
Fast: 0.15s (micro-interactions)
Medium: 0.3s (default transitions)
Slow: 0.5s (page transitions)
Very Slow: 1s+ (background animations)
```

### Keyframe Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide Up:**
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Float (Background Icons):**
```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
```

---

## Responsive Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Large Desktop: > 1440px
```

---

## Accessibility Standards

### Color Contrast
- **Text on Background**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio

### Focus States
```css
Outline: 2px solid primary color
Outline Offset: 2px
Border Radius: matches element
```

### Touch Targets
- **Minimum Size**: 44px x 44px
- **Spacing**: 8px minimum between targets

---

## Design Tokens (Code Format)

```javascript
const designTokens = {
  colors: {
    primary: {
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
      start: '#6366f1',
      mid: '#8b5cf6',
      end: '#ec4899'
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af'
    },
    background: {
      white: '#ffffff',
      light: '#f9fafb',
      subtle: '#f3f4f6'
    }
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    sizes: {
      h1: '48px',
      h2: '32px',
      h3: '24px',
      body: '16px',
      small: '14px'
    }
  },
  spacing: {
    base: '4px',
    scale: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80]
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    xl: '24px'
  },
  shadows: {
    sm: '0 4px 12px rgba(0,0,0,0.08)',
    md: '0 12px 32px rgba(0,0,0,0.12)',
    lg: '0 20px 60px rgba(0,0,0,0.3)'
  }
};
```

---

*This design system ensures consistency, scalability, and maintainability across the entire Neighborly platform.*


