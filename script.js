/**
 * ========================================================
 * DEVELOPER PORTFOLIO - MAIN JAVASCRIPT
 * Modern, Vanilla JS with Zero Dependencies
 * Includes:
 * 1. Theme Accent Switcher (LocalStorage persisted)
 * 2. Interactive Constellation Canvas Background
 * 3. Hero Typewriter Animation
 * 4. Interactive Terminal / CLI Simulator
 * 5. Project Filtering & Detail Lightbox Modal
 * 6. Animated Metrics Counter (IntersectionObserver)
 * 7. Copy-to-Clipboard Email with Tooltip
 * 8. Form Validation & Instant Feedback
 * 9. Mobile Navigation Drawer & ScrollSpy
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemePicker();
  initCanvas();
  initTypewriter();
  initTerminal();
  initProjectFilters();
  initProjectModal();
  initStatsCounter();
  initContactForm();
  initCopyEmail();
  initNavigation();
});

/* ========================================================
   1. THEME ACCENT PICKER
   ======================================================== */
function initThemePicker() {
  const themeDots = document.querySelectorAll('.color-dot');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'cyan';

  setTheme(savedTheme);

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const selectedColor = dot.getAttribute('data-color');
      setTheme(selectedColor);
      localStorage.setItem('portfolio-theme', selectedColor);
    });
  });

  function setTheme(color) {
    document.body.setAttribute('data-theme', color);
    themeDots.forEach(dot => {
      if (dot.getAttribute('data-color') === color) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

/* ========================================================
   2. INTERACTIVE CANVAS BACKGROUND (CONSTELLATION MESH)
   ======================================================== */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Mouse tracking
  const mouse = { x: null, y: null, radius: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Create particles
  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.speedY = (Math.random() - 0.5) * 0.7;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around edges
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Gentle reaction to cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 1.5;
          this.y -= (dy / distance) * force * 1.5;
        }
      }
    }

    draw(primaryRgb) {
      ctx.fillStyle = `rgba(${primaryRgb}, 0.6)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Read current CSS computed theme primary color
    const computedStyle = getComputedStyle(document.body);
    const primaryRgb = computedStyle.getPropertyValue('--primary-rgb').trim() || '56, 189, 248';

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(primaryRgb);

      // Connect particles with faint lines
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 110) {
          const alpha = 1 - dist / 110;
          ctx.strokeStyle = `rgba(${primaryRgb}, ${alpha * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ========================================================
   3. HERO TYPEWRITER ANIMATION
   ======================================================== */
function initTypewriter() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const words = [
    'Full-Stack Developer.',
    'Modern Web Specialist.',
    'Creative Problem Solver.',
    'Lifelong Learner.',
    'UI & UX Enthusiast.'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 120;

  function typeStep() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 60;
    } else {
      typedTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 110;
    }

    // Finished typing full word
    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400; // Pause before new word
    }

    setTimeout(typeStep, delay);
  }

  typeStep();
}

/* ========================================================
   4. INTERACTIVE TERMINAL / CLI
   ======================================================== */
function initTerminal() {
  const termOutput = document.getElementById('terminal-output');
  const termInput = document.getElementById('terminal-input');
  const clearBtn = document.getElementById('terminal-clear');
  const quickChips = document.querySelectorAll('.chip-btn');

  if (!termOutput || !termInput) return;

  // Command Registry
  const commands = {
    help: () => `Available commands:
  • about       - Read my background, bio & coding philosophy
  • skills      - List core technical proficiencies
  • projects    - Overview of featured development work
  • contact     - Display communication channels
  • theme <c>   - Change theme color (cyan, violet, emerald, rose)
  • clear       - Clear the terminal screen
  • whoami      - Check who is logged in
  • sudo        - Run elevated command (fun easter egg)
  • quote       - Receive an inspiring engineering quote`,

    about: () => `ALEX RIVERA // Full-Stack Developer
---------------------------------------------
Passionate about designing and deploying fast, accessible, and elegant web solutions.
Focused on modern JavaScript, clean component architectures, and responsive layouts.
Location: San Francisco, CA (Open to Remote opportunities worldwide).`,

    skills: () => `TECHNICAL SKILLS:
---------------------------------------------
[Frontend]  HTML5, CSS3, JavaScript (ES6+), React, Tailwind
[Backend]   Node.js, Express, REST APIs, PostgreSQL, MongoDB
[Tools]     Git, GitHub, VS Code, Vite, Vercel, Netlify`,

    projects: () => `FEATURED PROJECTS:
---------------------------------------------
1. DevFlow     - Agile Kanban & Project Board [React, Node.js]
2. WeatherPulse- Real-Time Meteorological Dashboard [Async JS, APIs]
3. GitMaster   - Interactive Git Branching & CLI Cheatsheet [Vanilla JS]
4. AuraUI      - Glassmorphic Design System & Components [CSS Variables]

Type 'contact' or scroll down to explore full previews!`,

    contact: () => `GET IN TOUCH:
---------------------------------------------
Email   : alex.rivera.dev@example.com
GitHub  : https://github.com
LinkedIn: https://linkedin.com
Status  : Available for hire & freelance inquiries!`,

    whoami: () => `guest@alex-rivera-portfolio (Curious Visitor exploring code)`,

    sudo: () => `Permission denied: You do not need root access to build great things! 🚀`,

    quote: () => {
      const quotes = [
        `"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra`,
        `"First, solve the problem. Then, write the code." — John Johnson`,
        `"Experience is the name everyone gives to their mistakes." — Oscar Wilde`,
        `"Code is like humor. When you have to explain it, it’s bad." — Cory House`
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    }
  };

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Append user command echo
    const echoLine = document.createElement('div');
    echoLine.className = 'term-line';
    echoLine.innerHTML = `<span class="term-prompt-echo">alex@portfolio:~$</span><span class="term-cmd-echo">${escapeHtml(trimmed)}</span>`;
    termOutput.appendChild(echoLine);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : '';

    if (mainCmd === 'clear') {
      termOutput.innerHTML = '';
    } else if (mainCmd === 'theme') {
      const validThemes = ['cyan', 'violet', 'emerald', 'rose'];
      if (validThemes.includes(arg)) {
        document.body.setAttribute('data-theme', arg);
        localStorage.setItem('portfolio-theme', arg);
        // update dots
        document.querySelectorAll('.color-dot').forEach(dot => {
          dot.classList.toggle('active', dot.getAttribute('data-color') === arg);
        });
        appendOutput(`Theme successfully switched to: [${arg.toUpperCase()}]`);
      } else {
        appendOutput(`Invalid theme. Available options: cyan, violet, emerald, rose`);
      }
    } else if (commands[mainCmd]) {
      const result = commands[mainCmd]();
      appendOutput(result);
    } else {
      appendOutput(`Command not found: '${trimmed}'. Type 'help' for a list of commands.`);
    }

    termInput.value = '';
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function appendOutput(text) {
    const resLine = document.createElement('div');
    resLine.className = 'term-line term-response';
    resLine.textContent = text;
    termOutput.appendChild(resLine);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Handle Enter key on input
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(termInput.value);
    }
  });

  // Handle Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      termOutput.innerHTML = '';
      termInput.focus();
    });
  }

  // Handle preset chips
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
      termInput.focus();
    });
  });
}

/* ========================================================
   5. PROJECT FILTERING
   ======================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Also enable Skills tabs filtering
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ========================================================
   6. PROJECT DETAIL MODAL (LIGHTBOX)
   ======================================================== */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');
  const viewBtns = document.querySelectorAll('.view-modal-btn');

  if (!modal || !modalBody) return;

  const projectDetails = {
    devflow: {
      category: 'Full-Stack Web App',
      year: '2026',
      title: 'DevFlow: Agile Kanban & Workflow Hub',
      desc: 'DevFlow solves team task fragmentation by providing an intuitive, drag-and-drop Kanban workflow interface. Designed for engineering sprints and creative projects with offline persistence and keyboard shortcuts.',
      features: [
        'Drag-and-drop column status cards with optimistic UI updates',
        'Persistent storage using indexedDB / LocalStorage fallback',
        'Custom task filtering, tags, and milestone deadlines',
        'Export and import board states in JSON format'
      ],
      tech: ['JavaScript (ES6)', 'React', 'Node.js', 'CSS Grid', 'LocalStorage API']
    },
    weatherpulse: {
      category: 'Frontend & API Integration',
      year: '2026',
      title: 'WeatherPulse: Live Meteorological Dashboard',
      desc: 'An interactive meteorological dashboard delivering real-time forecasts, air quality index, hourly precipitation graphs, and dynamic atmospheric background changes.',
      features: [
        'Geolocation lookup with instant autocomplete search',
        'Dynamic backdrop color shifts reflecting day/night & weather conditions',
        'Interactive UV index, humidity, wind direction, and air quality cards',
        'High-performance SVG weather iconography'
      ],
      tech: ['Vanilla JS', 'OpenWeatherMap API', 'Chart.js', 'CSS Custom Variables']
    },
    gitmaster: {
      category: 'Developer Tooling & Education',
      year: '2026',
      title: 'GitMaster: Git Workflow & Cheatsheet GUI',
      desc: 'An educational visualizer that helps beginners and junior developers intuitively understand Git branches, staging areas, commits, rebasing, and merge conflicts.',
      features: [
        'Interactive SVG branch tree that updates as mock commands run',
        'Copy-ready CLI snippets for everyday Git troubleshooting',
        'Searchable index of 40+ common Git commands and flags',
        'Beginner sandbox mode with guided scenarios'
      ],
      tech: ['HTML5 Canvas', 'SVG Graphics', 'JavaScript', 'Flexbox & Grid']
    },
    auraui: {
      category: 'UI / UX Design System',
      year: '2026',
      title: 'AuraUI: Glassmorphic Component Toolkit',
      desc: 'A lightweight, zero-dependency design system offering accessible glassmorphism UI components, fluid gradients, tactile micro-animations, and responsive layouts.',
      features: [
        'Modern CSS backdrop-filter cards, modals, navbars, and buttons',
        'Accessible keyboard focus styling and WCAG contrast compliant',
        'Dynamic runtime theme switching with CSS variables',
        'Under 10KB gzipped with zero external library dependencies'
      ],
      tech: ['CSS Custom Properties', 'Modern HTML5', 'Vanilla JavaScript', 'WAI-ARIA']
    }
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectDetails[key];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="modal-header-meta">
          <span class="modal-category">${data.category}</span>
          <span class="modal-category">• ${data.year}</span>
        </div>
        <h3 class="modal-title">${data.title}</h3>
        <p class="modal-desc">${data.desc}</p>
        
        <h4 class="modal-features-title">Key Highlights & Features:</h4>
        <ul class="modal-features-list">
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div class="project-tags" style="margin-bottom: 2rem;">
          ${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>

        <div class="modal-actions">
          <a href="#contact" class="btn btn-primary" onclick="document.getElementById('project-modal').classList.remove('open')">
            Discuss Similar Project
          </a>
          <button class="btn btn-secondary" onclick="document.getElementById('project-modal').classList.remove('open')">
            Close Preview
          </button>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ========================================================
   7. ANIMATED STATS COUNTER ON SCROLL
   ======================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target'), 10);
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic formula
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOutProgress * target);

            num.textContent = currentVal;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              num.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ========================================================
   8. COPY EMAIL TO CLIPBOARD WITH TOOLTIP
   ======================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailSpan = document.getElementById('email-address');
  const tooltip = document.getElementById('copy-tooltip');
  const toast = document.getElementById('toast');

  if (!copyBtn || !emailSpan) return;

  copyBtn.addEventListener('click', async () => {
    const email = emailSpan.textContent.trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Show tooltip
      if (tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
      }

      // Show toast
      showToast('Email address copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ========================================================
   9. CONTACT FORM VALIDATION & FEEDBACK
   ======================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');

  const errName = document.getElementById('error-name');
  const errEmail = document.getElementById('error-email');
  const errMessage = document.getElementById('error-message');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      errName.classList.add('show');
      isValid = false;
    } else {
      errName.classList.remove('show');
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      errEmail.classList.add('show');
      isValid = false;
    } else {
      errEmail.classList.remove('show');
    }

    // Validate Message
    if (messageInput.value.trim().length < 10) {
      errMessage.classList.add('show');
      isValid = false;
    } else {
      errMessage.classList.remove('show');
    }

    if (!isValid) return;

    // Simulating Form Submission
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      feedback.classList.remove('hidden');
      form.reset();

      showToast('Message sent successfully!');

      setTimeout(() => {
        feedback.classList.add('hidden');
      }, 5000);
    }, 1000);
  });
}

/* ========================================================
   10. NAVIGATION DRAWER & SCROLL SPY
   ======================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
}
