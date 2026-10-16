# 🌟 Personal Developer Portfolio

A modern, high-performance, and responsive personal portfolio website built with pure HTML5, CSS3, and JavaScript (Zero Dependencies).

## ✨ Features Included

- **🌌 Interactive Constellation Canvas**: Particle mesh background that subtly shifts and connects with faint glowing lines, responding dynamically to mouse movements.
- **🎨 4 Live Accent Themes**: Instant theme switching between Cyan, Violet, Emerald, and Rose (saved automatically in browser `localStorage`).
- **💻 Interactive CLI Terminal**: An in-browser developer terminal mockup where visitors can type commands (`about`, `skills`, `projects`, `contact`, `theme <color>`, `quote`, `help`, `clear`) or tap quick chips.
- **⚡ Typing Headline Animation**: Dynamic typewriter cycling through developer roles and specialties.
- **📊 Animated Stats Counter**: Eased numeric counter that starts automatically when scrolled into view using the modern `IntersectionObserver` API.
- **🗂️ Interactive Project Filter & Lightbox**: Filter projects by categories (Full-Stack, Frontend, Dev Tools) and click "View Details" to view a deep-dive popup modal.
- **📋 Copy-to-Clipboard & Form Feedback**: One-click email copying with a tooltip and responsive contact form with input validation.
- **📱 Fully Mobile Responsive**: Slide-out navigation drawer and fluid CSS layout tested for smartphones, tablets, and 4K displays.

---

## 📁 File Structure

```text
portfolio/
├── index.html        # Main webpage structure and content
├── styles.css        # Styling, CSS variables, glassmorphism, animations
├── script.js         # Interactivity, canvas, terminal, typewriter, modals
└── README.md         # Documentation & guide
```

---

## 🛠️ How to Customize for Yourself

1. **Change Name & Bio**: Open `index.html` and search for `Alex Rivera` to replace it with your own name.
2. **Update Contact Details**: Replace `alex.rivera.dev@example.com` and social links (GitHub, LinkedIn, Twitter/X) in `index.html`.
3. **Customize Projects**: Update the titles, descriptions, and tags in the `<section class="projects-section">` in `index.html` and in the `projectDetails` object in `script.js`.
4. **Change Typing Words**: In `script.js`, find the `words` array inside `initTypewriter()` to add your desired roles or skills.

---

## 🚀 How to Run Locally

You don't need to install anything!
Simply **double-click `index.html`** in your file manager to open it in any browser (Chrome, Edge, Firefox, Safari).
