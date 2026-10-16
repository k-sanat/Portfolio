# 🛡️ Sanat Kumar Hansda — Developer, Freelancer & Cybersecurity Scholar Portfolio

A cutting-edge, high-performance personal portfolio, verified credential showcase, and interactive resume generator built with vanilla HTML5, CSS3, and JavaScript (Zero external libraries, instant load time).

---

## 🌟 What's New & Upgraded

1. **Visual Certificate Showcase (All 14 Converted to High-Resolution Images)**:
   - All 12 PDF certificates and 2 JPG marksheets have been converted into 150 DPI high-definition `.jpg` images stored inside organized folders under `assets/certificates/`.
   - Each certificate card features real thumbnail previews, cyber green badges, and quick view buttons.

2. **Same-Tab Interactive Lightbox Viewer (No More New Tab Disruptions!)**:
   - Clicking any certificate opens an interactive, in-page viewer right on the portfolio.
   - **Zoom Controls**: Zoom In (`+`), Zoom Out (`-`), and Reset (`100%`), plus click-to-zoom on the document image.
   - **Carousel Slideshow**: Floating Left (`‹`) and Right (`›`) navigation arrows to slide through all 14 certificates.
   - **Quick Filmstrip**: A clickable bottom thumbnail carousel allowing 1-click jumps to any credential.
   - **Keyboard Navigation**: Press `Left Arrow` / `Right Arrow` to flip between certificates, and `Escape` to close.
   - **Direct Download**: Download the original high-res file directly to your computer without blank tab popups.

3. **Live Real-Time Certificate Search Bar**:
   - Instant search across all 14 credentials by title, skill, issuer, or keyword (e.g. *IBM*, *Kali*, *Python*, *LaunchEd*, *ICSE*, *Anna University*).
   - Dynamic counter badge updating live (e.g. *"Found 3 credentials matching 'IBM'"*).
   - 1-click clear search button (`✕`) and categorized filter tabs.

4. **Real Profile Photo Integration**:
   - High-definition profile photo loaded from `assets/images/profile.jpg`.
   - Embedded into the top navigation bar, the About Me profile card with cyber glow, and the printable Resume header.

5. **Futuristic Cyber Audio Synthesizer (Web Audio API)**:
   - Synthesizes subtle futuristic click, blip, and modal whoosh audio tones on buttons, search, and navigation.
   - User-toggleable via the sound button (`🔊` / `🔇`) in the navbar, with persistent state stored in `localStorage`.

6. **Interactive Resume Builder & PDF Exporter**:
   - ATS-friendly executive 1-page resume template featuring your real photo.
   - **Enable Edit Mode**: Allows clicking and editing any text directly on screen.
   - **Print / Save as PDF**: Formatted exclusively with clean print CSS (hides web canvas and navigation for a crisp document).

---

## 📁 Project Structure

```text
portfolio/
├── index.html                                 # Complete website markup & text
├── styles.css                                 # Cyber themes, animations, glassmorphism & print CSS
├── script.js                                  # Audio synth, search filter, same-tab modal & canvas
├── README.md                                  # Complete documentation & edit guide
└── assets/
    ├── images/
    │   └── profile.jpg                        # Sanat's profile picture
    └── certificates/
        ├── courses/                           # IBM Kali, IBM Cyber, IBM AI, LaunchEd, Coincent, VCodez
        ├── education/                         # Anna Univ BE Degree, Class 12 & 10 Marksheets
        ├── internships/                       # VCodez ML, Magnion Content, Tech Training
        └── offer-letters/                     # Ethical Hacking Offer, Magnion Offer
```

---

## 🚀 How to Run Locally

1. Open File Explorer and navigate to:
   `C:\Users\hansd\.gemini\antigravity\scratch\portfolio`
2. **Double-click `index.html`**:
   It opens directly in your default browser (Chrome, Edge, Firefox, Brave) with full functionality, zero setup required!
3. Alternatively, run a local Python server:
   ```powershell
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## ✏️ Future Edits: Exact Lines & How to Update

When you achieve new certificates, complete degrees, or add new projects, here is where to edit:

### 1. Adding a New Certificate:
- **Image**: Add your certificate image to `assets/certificates/courses/` (or `internships/`).
- **HTML (`index.html`)**: Under `<div class="certs-grid" id="certs-grid">`, duplicate one of the `.cert-card` blocks and change the title and image path.
- **JavaScript (`script.js`)**: In `initCertificatesAndProjects()`, add a new entry to the `certsList` array:
  ```javascript
  {
    id: 'my-new-cert',
    category: 'cyber', // 'cyber', 'ai', 'internship', or 'academic'
    categoryLabel: 'Cybersecurity Credential',
    year: '2026',
    title: 'New Certificate Title',
    issuer: 'Issued by: Organization Name',
    image: 'assets/certificates/courses/my-new-cert.jpg',
    file: 'assets/certificates/courses/my-new-cert.pdf',
    desc: 'Description of what you learned...',
    features: ['Key highlight 1', 'Key highlight 2']
  }
  ```

### 2. Changing Contact Info:
- **Lines in `index.html`**:
  - Phone / WhatsApp: Search for `8122378449`
  - Email: Search for `hansdaworks@gmail.com`
  - LinkedIn: Search for `linkedin.com/in/sanat-freelancer`
  - GitHub: Search for `github.com/k-sanat`
- **Lines in `script.js`**: In the `commands` object (around line 300) under `contact: () => ...`.

### 3. Updating Profile Photo:
- Simply replace `assets/images/profile.jpg` with a new square image saved as `profile.jpg`!

---

## 🌐 Deploying to GitHub Pages

1. Open PowerShell inside your portfolio folder:
   ```powershell
   cd C:\Users\hansd\.gemini\antigravity\scratch\portfolio
   ```
2. Commit your updates:
   ```powershell
   git add .
   git commit -m "Add real certificate images, profile photo, and same-tab lightbox"
   ```
3. Push to your GitHub repository:
   ```powershell
   git push -u origin main
   ```
4. On GitHub, go to your repository **Settings** > **Pages** > Select **Deploy from branch `main`** > Save.
   Your site will be live at:
   `https://k-sanat.github.io/portfolio` (or your repository name)!
