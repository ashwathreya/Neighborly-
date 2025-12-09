# Graphics & Visuals Guide for Presentation

## Detailed Graphics Specifications

This guide provides specific instructions for creating or sourcing all graphics needed for your Neighborly presentation.

---

## 1. SCREENSHOTS

### Homepage Screenshot
**What to Capture:**
- Full hero section with collage banner
- Search bar prominently displayed
- Service category buttons
- Clean, professional appearance

**Specifications:**
- Resolution: 1920x1080 (or 1440x900)
- Format: PNG (high quality)
- Browser: Chrome (latest)
- Device: Desktop view
- Show: Both logged-out and logged-in states

**Annotations Needed:**
- Arrow pointing to search bar: "Unified Search"
- Highlight category buttons: "7+ Service Categories"

---

### Search Results Page
**What to Capture:**
- Filter sidebar expanded (left side)
- Platform filter tabs (top)
- Provider cards in grid (3-4 columns)
- Animated background visible
- Results count visible

**Specifications:**
- Resolution: 1920x1080
- Format: PNG
- Show: Multiple providers visible
- Highlight: Filter sidebar, platform tabs, provider cards

**Annotations Needed:**
- Arrow to filter sidebar: "8+ Filter Types"
- Arrow to platform tabs: "35+ Platforms"
- Highlight provider card: "Click for Details"

---

### Provider Detail Modal
**What to Capture:**
- Modal open with Overview tab active
- Header with provider info
- All 4 tabs visible in navigation
- Content area showing overview information
- Footer with pricing and CTA

**Specifications:**
- Resolution: 1920x1080
- Format: PNG
- Show: Modal centered on page
- Background: Slightly blurred page behind

**Additional Screenshots Needed:**
- Experience tab content
- Portfolio tab (grid of 6 images)
- Reviews tab (list of reviews)

**Annotations Needed:**
- Highlight tabs: "4 Information Tabs"
- Arrow to content: "Comprehensive Provider Info"

---

### Mobile Views
**What to Capture:**
- Homepage on mobile (portrait)
- Search results on mobile
- Filter sidebar as overlay
- Provider modal on mobile

**Specifications:**
- Resolution: 375x812 (iPhone) or 390x844
- Format: PNG
- Device: Use browser DevTools responsive mode
- Show: Touch-optimized layout

**Annotations Needed:**
- Highlight: "Mobile-First Design"
- Show: Touch targets (44px minimum)

---

## 2. DIAGRAMS

### Architecture Diagram
**What to Show:**
```
┌─────────────┐
│   Client    │
│  (Next.js)  │
└──────┬──────┘
       │ HTTP/REST
┌──────▼──────┐
│   Backend   │
│ (Express.js)│
└──────┬──────┘
       │
   ┌───┴───┬─────────┬──────────┐
   │       │         │          │
┌──▼──┐ ┌─▼──┐  ┌───▼──┐  ┌───▼──┐
│Maps │ │OAuth│  │Unsplash│ │Geocode│
└─────┘ └────┘  └───────┘ └──────┘
```

**Style:**
- Clean, modern boxes
- Arrows showing data flow
- Color-coded (Frontend: Blue, Backend: Green, APIs: Orange)
- Use tools: Draw.io, Figma, or PowerPoint shapes

---

### User Flow Diagram
**What to Show:**
```
Homepage → Search → Results → Filter → Provider Card → Modal → Contact
```

**Style:**
- Horizontal flow
- Icons for each step
- Arrows between steps
- Highlight key decision points

**Icons Needed:**
- Home icon
- Search icon
- Filter icon
- Card icon
- Modal icon
- Contact icon

---

### Information Architecture Tree
**What to Show:**
```
Neighborly
├── Homepage
│   ├── Hero
│   ├── Categories
│   └── Testimonials
├── Search
│   ├── Filters
│   ├── Results
│   └── Provider Modal
│       ├── Overview
│       ├── Experience
│       ├── Portfolio
│       └── Reviews
└── Dashboard (Logged In)
```

**Style:**
- Tree structure
- Indented hierarchy
- Icons for each section
- Color-coded by level

---

### Design Process Flow
**What to Show:**
```
Empathize → Define → Ideate → Prototype → Test & Iterate
```

**Style:**
- Circular or linear flow
- Icons for each phase
- Color gradient (light to dark)
- Arrows showing progression

**Icons:**
- Empathize: User icon
- Define: Target icon
- Ideate: Lightbulb
- Prototype: Mockup icon
- Test: Checkmark/Test tube

---

## 3. CHARTS & GRAPHS

### User Satisfaction Chart
**Type:** Bar Chart (Before/After)

**Data:**
- Overall Satisfaction: 6.5 → 8.5
- Ease of Use: 6.0 → 8.5
- Mobile Experience: 5.5 → 8.0
- Feature Completeness: 7.0 → 8.5

**Style:**
- Side-by-side bars (Before: Light gray, After: Purple gradient)
- Y-axis: 0-10 scale
- Clear labels
- Highlight improvement

**Tools:** Excel, Google Sheets, or PowerPoint charts

---

### Task Completion Rate
**Type:** Progress Bar or Pie Chart

**Data:**
- Before: 75%
- After: 95%
- Improvement: +20%

**Style:**
- Two progress bars side-by-side
- Before: Red/Orange
- After: Green
- Large percentage numbers

---

### Time Savings Visualization
**Type:** Comparison Chart

**Data:**
- Before: 2-4 hours
- After: 20-30 minutes
- Savings: 70-85%

**Style:**
- Two clocks or time icons
- Before: Large clock (2-4 hours)
- After: Small clock (20-30 min)
- Percentage savings highlighted

---

### Performance Metrics
**Type:** Gauge Charts or Progress Bars

**Data:**
- First Contentful Paint: < 1.5s ✅
- Time to Interactive: < 3s ✅
- Lighthouse Score: > 90 ✅
- API Response: < 200ms ✅

**Style:**
- Gauge charts showing targets
- Green for achieved
- Clear labels
- Target lines visible

---

## 4. ICONS & LOGOS

### Platform Logos (35+)
**Sources:**
- Official platform websites
- Brand asset libraries
- SimpleIcon (simpleicons.org)
- Flaticon

**Platforms Needed:**
- Rover, Wag!, Care.com, Sittercity
- Thumbtack, TaskRabbit, Handy
- Wyzant, Varsity Tutors
- And 25+ more

**Style:**
- Consistent size (64x64px or 128x128px)
- Square or circular frames
- Same background color (white or transparent)
- Arrange in grid

---

### Service Category Icons
**Icons Needed:**
- 🐕 Pet Care
- 🏠 Home Services
- 📚 Tutoring
- 👶 Childcare
- 🎉 Event Planning
- 🧹 Cleaning
- 📦 Moving

**Style:**
- Large, colorful icons
- Consistent style
- Can use emoji or custom icons

---

### Filter Type Icons
**Icons Needed:**
- 🔍 Search/Keywords
- 💰 Price
- ⭐ Rating
- ✅ Specialties
- 👤 Name
- 🛡️ Verification
- 🏷️ Platform
- 📍 Location

**Style:**
- Simple, recognizable
- Consistent size
- Color-coded

---

### Technology Stack Icons
**Icons Needed:**
- Next.js logo
- React logo
- TypeScript logo
- Express.js logo
- Node.js logo
- Google Maps icon
- OAuth icon

**Sources:**
- Official brand assets
- DevIcon (devicon.dev)
- SimpleIcon

---

## 5. VISUAL ELEMENTS

### Color Palette Swatches
**What to Show:**
- Primary gradient: Indigo → Purple → Pink
- Platform colors (sample of 10-15)
- Neutral colors
- Status colors

**Style:**
- Color squares (100x100px)
- Hex codes labeled
- Organized in grid
- Gradient shown as bar

---

### Typography Scale
**What to Show:**
- H1: 48px, Bold
- H2: 32px, Bold
- H3: 24px, Bold
- Body: 16px, Regular
- Small: 14px, Regular

**Style:**
- Visual type scale
- Show actual text samples
- Font name (Inter)
- Weights displayed

---

### Component Library
**What to Show:**
- Button examples (Primary, Secondary, Ghost)
- Card example
- Input field example
- Badge example
- Modal example

**Style:**
- Screenshots or mockups
- Labeled components
- Show states (default, hover, active)

---

## 6. ANIMATIONS & INTERACTIONS

### GIFs to Create
**Tools:** ScreenToGif, Loom, or Kap

**GIFs Needed:**
1. **Search Interaction**
   - Typing in search bar
   - Results appearing
   - Filters updating

2. **Filter Sidebar**
   - Opening/closing animation
   - Filters being applied
   - Results updating

3. **Provider Modal**
   - Opening animation
   - Tab switching
   - Scrolling through content

4. **Mobile Interactions**
   - Swipe gestures
   - Touch interactions
   - Responsive layout changes

**Specifications:**
- Duration: 3-5 seconds
- Loop: Yes
- Size: Optimized (under 5MB)
- Format: GIF or MP4

---

## 7. BEFORE/AFTER COMPARISONS

### Platform Fragmentation
**Before:**
- Screenshot of 5 different platform websites side-by-side
- Show confusion, different styles
- Multiple browser tabs

**After:**
- Clean Neighborly interface
- Single platform
- Unified design

**Style:**
- Split screen
- Before on left (messy)
- After on right (clean)
- Arrow showing improvement

---

### Mobile Experience
**Before:**
- Small, cramped mobile view
- Hard to use filters
- Poor touch targets

**After:**
- Clean mobile layout
- Overlay sidebar
- Large touch targets

---

## 8. INFOGRAPHICS

### Statistics Infographic
**What to Show:**
- 35+ Platforms
- 7+ Categories
- 8+ Filters
- 4 Tabs
- 70-85% Time Savings

**Style:**
- Large numbers
- Icons for each stat
- Colorful, engaging
- Easy to read

---

### Feature Comparison
**What to Show:**
- Neighborly vs. Individual Platforms
- Comparison table
- Checkmarks for features

**Features to Compare:**
- Multi-platform search
- Advanced filtering
- Unified interface
- Comparison tools
- Mobile experience

---

## 9. MOCKUPS & WIREFRAMES

### Wireframes (If Available)
- Initial sketches
- Low-fidelity mockups
- Design iterations

**Style:**
- Simple line drawings
- Show evolution
- Annotated

---

### Design Iterations
- Version 1: Basic
- Version 2: Enhanced
- Version 3: Advanced
- Final: Polished

**Style:**
- Side-by-side comparison
- Show progression
- Highlight improvements

---

## 10. TOOLS FOR CREATING GRAPHICS

### Screenshots:
- Browser DevTools
- Lightshot
- Snagit
- Mac Screenshot (Cmd+Shift+4)

### Diagrams:
- Draw.io (free)
- Figma (free tier)
- PowerPoint shapes
- Lucidchart

### Charts:
- Excel/Google Sheets
- PowerPoint charts
- Canva (free)
- Chart.js (for web)

### Icons:
- SimpleIcon (simpleicons.org)
- Flaticon (free tier)
- Font Awesome
- Material Icons

### GIFs:
- ScreenToGif (Windows, free)
- Kap (Mac, free)
- Loom (easy sharing)
- OBS Studio (advanced)

### Image Editing:
- Figma (free)
- Canva (free tier)
- GIMP (free)
- Photoshop (if available)

---

## GRAPHICS CHECKLIST

### Screenshots:
- [ ] Homepage (desktop)
- [ ] Homepage (mobile)
- [ ] Search results (full page)
- [ ] Filter sidebar (expanded)
- [ ] Provider modal (all 4 tabs)
- [ ] Mobile views (all key screens)
- [ ] Tablet view
- [ ] Authentication flow

### Diagrams:
- [ ] Architecture diagram
- [ ] User flow diagram
- [ ] Information architecture
- [ ] Design process flow
- [ ] Challenge → Solution flows

### Charts:
- [ ] User satisfaction (before/after)
- [ ] Task completion rates
- [ ] Time savings visualization
- [ ] Performance metrics
- [ ] Feature adoption

### Icons:
- [ ] Platform logos (35+)
- [ ] Service category icons
- [ ] Filter type icons
- [ ] Tab icons
- [ ] Technology stack icons

### Visuals:
- [ ] Color palette
- [ ] Typography scale
- [ ] Component library
- [ ] Before/after comparisons
- [ ] Statistics infographic

### Animations:
- [ ] Search interaction GIF
- [ ] Filter animation GIF
- [ ] Modal animation GIF
- [ ] Mobile interaction GIF

---

**All graphics should be:**
- High resolution (at least 1920x1080 for screenshots)
- Consistent style
- Professional appearance
- Optimized file sizes
- Properly labeled and organized


