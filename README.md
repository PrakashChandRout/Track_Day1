# Track_Day1
# WeIntern Full Stack Webpage - Code Structure & Design Decisions

## 📁 File Structure

## 🧱 Code Structure

**1. HTML (index.html)**
- Uses semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Four main sections: Hero, About, Internships, CTA/Form
- Meaningful class names like `.hero-section`, `.track-card`, `.cta-btn`
- Google Fonts (Poppins + Inter) and Font Awesome icons included

**2. CSS (style.css)**
- CSS variables in `:root` for colors, shadows, and gradients
- Flexbox & Grid for modern, flexible layouts
- `@media (max-width: 768px)` query for mobile responsiveness
- Glassmorphism effects with `backdrop-filter`
- Hover animations and transition effects

**3. JavaScript (script.js)**
- Smooth scroll for all "Apply Now" buttons
- Mobile menu toggle functionality
- Form validation with user feedback message
- Event listeners for dynamic interactions

## 🎨 Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Dark Theme** | Modern, reduces eye strain, highlights CTA elements |
| **Neon Green Accent (#10B981)** | Represents growth, code, and action — perfect for tech brand |
| **Glassmorphism Header** | Sticky blurred header gives premium, professional feel |
| **Gradient Buttons** | Eye-catching, improves click-through rate |
| **Card Layout** | Makes internship tracks scannable and organized |
| **Hover Effects** | Provides visual feedback, enhances interactivity |
| **Mobile-First Media Queries** | Ensures perfect responsiveness on all devices |
| **Semantic HTML** | Better SEO and screen reader accessibility |

## 📱 Responsive Breakpoints

- **Desktop (>768px)**: 4-column grid, horizontal layout
- **Mobile (≤768px)**: Single column, stacked vertical sections
- Viewport meta tag ensures proper scaling on all devices

## 🔧 Key Features

- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Sticky navigation bar
- ✅ Interactive form with validation
- ✅ Smooth scroll navigation
- ✅ Mobile hamburger menu
- ✅ Hover animations on cards & buttons

**Submitted by: Prakash Chand Rouy Date: 19May 2026
Track: Full Stack Web Dev Intern

## 🌐 Browser Support

Tested on Chrome, Firefox, Safari, and Edge (latest versions).
