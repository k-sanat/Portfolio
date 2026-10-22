/**
 * ========================================================
 * SANAT KUMAR HANSDA - DEVELOPER & CYBERSECURITY PORTFOLIO
 * Modern Vanilla JS with Zero External Dependencies
 * Features:
 * 1. Theme Accent Switcher (Emerald, Cyan, Violet, Rose)
 * 2. Constellation & Cyber Particle Canvas
 * 3. Typewriter Headline Loop
 * 4. Interactive Cyber CLI Terminal
 * 5. Certificate & Course Filter & Lightbox Previews
 * 6. Project Modal Details
 * 7. Live Interactive Resume Builder (Editable & PDF Print)
 * 8. Metrics Counter on Scroll
 * 9. Email Copy & Form Feedback
 * 10. Navigation ScrollSpy & Mobile Drawer
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberBootloader();
  initThemePicker();
  initSoundFX();
  initCanvas();
  initTypewriter();
  initTerminal();
  initCertificatesAndProjects();
  initResumeBuilder();
  initStatsCounter();
  initContactForm();
  initCopyEmail();
  initNavigation();
});

/* ========================================================
   0. FUTURISTIC CYBER AUDIO SYNTHESIZER (Web Audio API)
   ======================================================== */
const CyberAudio = (() => {
  let ctx = null;
  let enabled = localStorage.getItem('sanat-sound-fx') === 'true';

  function getAudioCtx() {
    if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctx;
  }

  function playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!enabled) return;
    try {
      const audioCtx = getAudioCtx();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  return {
    click: () => playTone(820, 'sine', 0.05, 0.04),
    openModal: () => {
      playTone(420, 'triangle', 0.07, 0.05);
      setTimeout(() => playTone(680, 'sine', 0.12, 0.05), 45);
    },
    switchSlide: () => playTone(560, 'sine', 0.05, 0.035),
    zoom: () => playTone(940, 'triangle', 0.04, 0.03),
    typeKey: () => playTone(1100 + Math.random() * 200, 'sine', 0.02, 0.015),
    toggleSound: () => {
      enabled = !enabled;
      localStorage.setItem('sanat-sound-fx', enabled ? 'true' : 'false');
      if (enabled) playTone(880, 'sine', 0.12, 0.08);
      return enabled;
    },
    isEnabled: () => enabled
  };
})();

function initSoundFX() {
  const soundToggle = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  if (!soundToggle || !soundIcon) return;

  function updateSoundUI(isOn) {
    if (isOn) {
      soundToggle.classList.add('sound-on');
      soundIcon.textContent = '🔊';
      soundToggle.setAttribute('title', 'Futuristic Cyber Audio: ON (Click to Mute)');
    } else {
      soundToggle.classList.remove('sound-on');
      soundIcon.textContent = '🔇';
      soundToggle.setAttribute('title', 'Futuristic Cyber Audio: MUTED (Click to Enable)');
    }
  }

  updateSoundUI(CyberAudio.isEnabled());

  soundToggle.addEventListener('click', () => {
    const isNowOn = CyberAudio.toggleSound();
    updateSoundUI(isNowOn);
  });
}

/* ========================================================
   CYBER SYSTEM BOOTLOADER (TECH SAVVY OPENING ANIMATION)
   ======================================================== */
function initCyberBootloader() {
  const bootScreen = document.getElementById('cyber-boot-screen');
  const skipBtn = document.getElementById('boot-skip-btn');
  const logBody = document.getElementById('boot-log-body');
  const progressFill = document.getElementById('boot-progress-fill');
  const statusText = document.getElementById('boot-status-text');
  const percentText = document.getElementById('boot-percent-text');
  const rebootTrigger = document.getElementById('reboot-trigger');

  if (!bootScreen) return;

  let isDismissed = false;
  let timerId = null;

  const bootLogs = [
    { text: '> [SYS-INIT] Booting Secure Kernel v5.19-SEC [x86_64]...', class: 'cyan', pct: 18, status: 'CHECKING CRYPTOGRAPHIC KERNEL...' },
    { text: '> [AUTHENTICATION] Identity verified: Sanat Kumar Hansda', class: 'green', pct: 45, status: 'VERIFYING CYBER SCHOLAR ID...' },
    { text: '> [MODULES] Mounting 14 verified certificates & academic degrees...', class: 'cyan', pct: 72, status: 'INDEXING CREDENTIAL VAULT...' },
    { text: '> [DEFENSE] Launching Istudio Internship & Project modules...', class: 'green', pct: 90, status: 'ESTABLISHING DEFENSE PROTOCOLS...' },
    { text: '> [200 OK] ACCESS GRANTED. Welcome to Sanat\'s Portfolio Hub.', class: 'success', pct: 100, status: 'SYSTEM READY // ALL PROTOCOLS NOMINAL' }
  ];

  function dismissBootloader() {
    if (isDismissed) return;
    isDismissed = true;
    if (timerId) clearTimeout(timerId);

    CyberAudio.openModal(); // Futuristic sound on access granted
    bootScreen.classList.add('dismissed');
    document.body.style.overflow = '';

    setTimeout(() => {
      bootScreen.style.display = 'none';
    }, 600);
  }

  function runSequence() {
    isDismissed = false;
    bootScreen.style.display = 'flex';
    bootScreen.classList.remove('dismissed');
    document.body.style.overflow = 'hidden';

    if (logBody) logBody.innerHTML = '';
    if (progressFill) progressFill.style.width = '0%';
    if (percentText) percentText.textContent = '0%';
    if (statusText) statusText.textContent = 'INITIALIZING SEC-CORE...';

    let currentStep = 0;

    function step() {
      if (isDismissed) return;

      if (currentStep < bootLogs.length) {
        const item = bootLogs[currentStep];

        // Append log line
        if (logBody) {
          const lineEl = document.createElement('div');
          lineEl.className = `boot-log-line ${item.class}`;
          lineEl.textContent = item.text;
          logBody.appendChild(lineEl);
          logBody.scrollTop = logBody.scrollHeight;
        }

        // Update progress
        if (progressFill) progressFill.style.width = `${item.pct}%`;
        if (percentText) percentText.textContent = `${item.pct}%`;
        if (statusText) statusText.textContent = item.status;

        CyberAudio.typeKey();

        currentStep++;
        const delays = [320, 380, 400, 380, 450];
        timerId = setTimeout(step, delays[currentStep - 1] || 380);
      } else {
        // Finished all steps
        timerId = setTimeout(() => {
          dismissBootloader();
        }, 350);
      }
    }

    timerId = setTimeout(step, 180);
  }

  // Bind Skip & ESC
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissBootloader();
    });
  }

  bootScreen.addEventListener('click', () => {
    dismissBootloader();
  });

  document.addEventListener('keydown', (e) => {
    if (!isDismissed && (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter')) {
      dismissBootloader();
    }
  });

  // Re-run trigger (click status badge in hero or terminal command)
  if (rebootTrigger) {
    rebootTrigger.addEventListener('click', () => {
      CyberAudio.click();
      runSequence();
    });
  }

  // Start sequence on page load
  runSequence();

  // Expose global for terminal command
  window.replayCyberBoot = runSequence;
}

/* ========================================================
   1. THEME ACCENT PICKER
   ======================================================== */
function initThemePicker() {
  const themeDots = document.querySelectorAll('.color-dot');
  const savedTheme = localStorage.getItem('sanat-portfolio-theme') || 'emerald';

  setTheme(savedTheme);

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const selectedColor = dot.getAttribute('data-color');
      setTheme(selectedColor);
      localStorage.setItem('sanat-portfolio-theme', selectedColor);
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
   2. INTERACTIVE CANVAS BACKGROUND
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

  const mouse = { x: null, y: null, radius: 130 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((width * height) / 13000), 75);
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

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

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
      ctx.fillStyle = `rgba(${primaryRgb}, 0.65)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const computedStyle = getComputedStyle(document.body);
    const primaryRgb = computedStyle.getPropertyValue('--primary-rgb').trim() || '16, 185, 129';

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(primaryRgb);

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 115) {
          const alpha = 1 - dist / 115;
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
   3. TYPEWRITER SUBTITLE
   ======================================================== */
function initTypewriter() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const words = [
    'MCA in Cybersecurity (Manipal University).',
    'Istudio 6-Month Tech & Security Intern.',
    'Computer Science & Engineering Graduate.',
    'Freelance Designer & Data Specialist.',
    'Python & Machine Learning Enthusiast.',
    'Creative Digital Problem Solver.'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 110;

  function typeStep() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 55;
    } else {
      typedTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1900;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(typeStep, delay);
  }

  typeStep();
}

/* ========================================================
   4. INTERACTIVE CYBER CLI TERMINAL
   ======================================================== */
function initTerminal() {
  const termOutput = document.getElementById('terminal-output');
  const termInput = document.getElementById('terminal-input');
  const clearBtn = document.getElementById('terminal-clear');
  const quickChips = document.querySelectorAll('.chip-btn');

  if (!termOutput || !termInput) return;

  const commands = {
    help: () => `Available Terminal Commands:
  • boot          - Replay the Cyber System Diagnostic Bootloader
  • education     - Summary of academic studies and degrees
  • internships   - Overview of Istudio, VCodez, Magnion & Freelance roles
  • certs         - List of verified certifications & completed courses
  • cyber         - Details on MCA Cybersecurity specialization
  • skills        - Technical arsenal (Python, ML, Canva, MS Office, Web)
  • contact       - Direct contact channels (WhatsApp, Email, LinkedIn, GitHub)
  • resume        - Guidance on printing & editing the live resume
  • clear         - Clear the terminal console
  • whoami        - System user identity`,

    education: () => `ACADEMIC STUDIES & DEGREES:
-----------------------------------------------------------
1. MCA in Cybersecurity (2025–Present)
   Institution: Manipal University | Currently Pursuing
2. B.E. in Computer Science & Engineering (2021–2025)
   Institution: Mount Zion College (Anna University) | CGPA: 7.4
3. Senior Secondary School (Class XII) (2019–2021)
   Institution: E.D. Thomas Memorial HSS | CGPA: 8.5 (Tamil Nadu Board)
4. Secondary School (Class X) (2018–2019)
   Institution: Ramakrishna Vivekananda Sarada Vidyapith | CGPA: 7.1 (ICSE)`,

    internships: () => `INTERNSHIPS & WORK EXPERIENCE:
-----------------------------------------------------------
1. Istudio (Oct 2026 – Present)
   Role: Tech & Cybersecurity Intern (6-Month Ongoing Internship)
2. Freelance Designer & Specialist (Jan 2026 – Present)
   Role: Canva poster design, Resume/CV creation, data entry & MS Office
3. VCodez (March 2025 – June 2025)
   Role: Machine Learning Intern | Dataset analysis & ML models in Python
4. Magnion Technology (March 2023 – May 2023)
   Role: Content Writer Intern | Tourist destinations research & SEO articles`,

    certs: () => `VERIFIED CREDENTIALS & CERTIFICATIONS (14):
-----------------------------------------------------------
[Cybersecurity]
• IBM: Cybersecurity with Kali Linux [PDF]
• IBM: Cybersecurity Fundamentals [PDF]
• LaunchEd: Cybersecurity Professional Course [PDF]
• Ethical Hacking Internship Offer Letter [PDF]

[AI & Machine Learning]
• IBM: Artificial Intelligence [PDF]
• VCodez: Machine Learning Internship Completion [PDF]
• VCodez: ML Project Completion Certificate [PDF]

[Academic & Degrees]
• Anna University: B.E. CSE Provisional Degree [PDF]
• Class 12 Higher Secondary Marksheet (8.5 CGPA) [JPG]
• Class 10 ICSE Marksheet (7.1 CGPA) [JPG]
• Coincent: Web Development Certification [PDF]

[Internships & Industry]
• Magnion Technology: Content Writer Internship [PDF]
• Magnion Technology: Content Offer Letter [PDF]
• Technical Training Completion Credential [PDF]`,

    cyber: () => `CYBERSECURITY SPECIALIZATION:
-----------------------------------------------------------
Degree  : MCA in Cybersecurity (Manipal University)
Course  : LaunchEd Cybersecurity Professional Course
Focus   : Network Defense, Cryptography, Vulnerability Assessment,
          Threat Modeling, Ethical Hacking & Incident Prevention.`,

    skills: () => `CORE TECHNICAL ARSENAL:
-----------------------------------------------------------
• Languages     : Python, JavaScript, HTML5, CSS3, SQL
• Core Tech     : Machine Learning, Cybersecurity Principles, Data Preprocessing
• Creative/Docs : Canva Pro, Social Media Design, Resume/CV Creation
• Productivity  : MS Word, MS Excel, Data Entry & Typing
• Languages     : English, Hindi, Santhali, Bengali, Tamil`,

    contact: () => `DIRECT CONTACT DETAILS:
-----------------------------------------------------------
• Phone/WhatsApp: +91 8122378449
• Email         : hansdaworks@gmail.com
• LinkedIn      : https://www.linkedin.com/in/sanat-freelancer
• GitHub        : https://github.com/k-sanat
• Location      : Dhalbhumgarh, Jharkhand, India`,

    resume: () => `LIVE RESUME BUILDER TIP:
-----------------------------------------------------------
Scroll to the 'Resume' section to view your formatted CV.
Click 'Enable Edit Mode' to change any text on-screen, or click
'Print / Save as PDF' to export a clean 1-page document!`,

    boot: () => {
      if (typeof window.replayCyberBoot === 'function') {
        window.replayCyberBoot();
        return `[SYSTEM] Replaying Cyber Security Diagnostic Bootloader...`;
      }
      return `[SYSTEM] Boot sequence already initialized.`;
    },

    reboot: () => {
      if (typeof window.replayCyberBoot === 'function') {
        window.replayCyberBoot();
        return `[SYSTEM] Rebooting Cyber Security Diagnostic Core...`;
      }
      return `[SYSTEM] Boot sequence already initialized.`;
    },

    whoami: () => `guest@sanat-vault (Exploring Sanat Kumar Hansda's Credentials)`
  };

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const echoLine = document.createElement('div');
    echoLine.className = 'term-line';
    echoLine.innerHTML = `<span class="term-prompt-echo">sanat@cyber:~$</span><span class="term-cmd-echo">${escapeHtml(trimmed)}</span>`;
    termOutput.appendChild(echoLine);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();

    if (mainCmd === 'clear') {
      termOutput.innerHTML = '';
    } else if (commands[mainCmd]) {
      appendOutput(commands[mainCmd]());
    } else {
      appendOutput(`Command not recognized: '${trimmed}'. Type 'help' to see valid commands.`);
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

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(termInput.value);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      termOutput.innerHTML = '';
      termInput.focus();
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      executeCommand(chip.getAttribute('data-cmd'));
      termInput.focus();
    });
  });
}

/* ========================================================
   5. CERTIFICATES & PROJECTS FILTERING + SAME-TAB MODAL
   ======================================================== */
function initCertificatesAndProjects() {
  // Modal Elements
  const modal = document.getElementById('project-modal');
  const modalDialog = modal ? modal.querySelector('.modal-dialog') : null;
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  // Certificate Array (All 14 Verified Credentials with Real Image Previews)
  const certsList = [
    {
      id: 'ibmkali',
      category: 'cyber',
      categoryLabel: 'Cybersecurity • IBM Credential',
      year: 'Certified',
      title: 'IBM: Cybersecurity with Kali Linux',
      issuer: 'Issued by: IBM',
      image: 'assets/certificates/courses/ibm-cybersecurity-kali-linux.jpg',
      file: 'assets/certificates/courses/ibm-cybersecurity-kali-linux.pdf',
      desc: 'Specialized credential validating hands-on proficiency in penetration testing, security auditing, vulnerability assessment, and Linux-based cyber defense utilities using Kali Linux.',
      features: [
        'Hands-on Kali Linux security tools and penetration testing methodologies',
        'Vulnerability scanning, port enumeration, and network reconnaissance',
        'Official credential issued by IBM'
      ]
    },
    {
      id: 'ibmcyber',
      category: 'cyber',
      categoryLabel: 'Cybersecurity • IBM Credential',
      year: 'Certified',
      title: 'IBM: Cybersecurity Fundamentals',
      issuer: 'Issued by: IBM',
      image: 'assets/certificates/courses/ibm-cybersecurity-fundamentals.jpg',
      file: 'assets/certificates/courses/ibm-cybersecurity-fundamentals.pdf',
      desc: 'Foundational certification demonstrating mastery of core cybersecurity concepts, threat intelligence, encryption standards, authentication models, and cyber hygiene.',
      features: [
        'Principles of confidentiality, integrity, and availability (CIA triad)',
        'Network security architecture, firewall management, and cryptography',
        'Official credential issued by IBM'
      ]
    },
    {
      id: 'launched',
      category: 'cyber',
      categoryLabel: 'Cybersecurity Course',
      year: 'Certified',
      title: 'LaunchEd: Cybersecurity Professional Course',
      issuer: 'Issued by: LaunchEd',
      image: 'assets/certificates/courses/launched-cybersecurity-training.jpg',
      file: 'assets/certificates/courses/launched-cybersecurity-training.pdf',
      desc: 'Comprehensive training covering cybersecurity fundamentals, network defense strategies, vulnerability concepts, digital threat prevention, and incident workflows.',
      features: [
        'Network security architecture and protocol protection',
        'Vulnerability identification and threat surface analysis',
        'Verified completion credential from LaunchEd'
      ]
    },
    {
      id: 'ethicaloffer',
      category: 'cyber',
      categoryLabel: 'Cybersecurity • Internship',
      year: 'Offer Letter',
      title: 'Ethical Hacking Internship Offer Letter',
      issuer: 'Technical Appointment & Selection',
      image: 'assets/certificates/offer-letters/ethical-hacking-internship-offer.jpg',
      file: 'assets/certificates/offer-letters/ethical-hacking-internship-offer.pdf',
      desc: 'Official appointment letter confirming selection and onboarding into an industry ethical hacking and cybersecurity internship program.',
      features: [
        'Selected for industry-level ethical hacking engagement',
        'Security testing, system auditing, and digital problem solving',
        'Official documented selection letter'
      ]
    },
    {
      id: 'ibmai',
      category: 'ai',
      categoryLabel: 'AI & Machine Learning • IBM',
      year: 'Certified',
      title: 'IBM: Artificial Intelligence Credential',
      issuer: 'Issued by: IBM',
      image: 'assets/certificates/courses/ibm-artificial-intelligence.jpg',
      file: 'assets/certificates/courses/ibm-artificial-intelligence.pdf',
      desc: 'Certification validating foundational concepts in Artificial Intelligence, predictive algorithms, neural structures, natural language processing, and AI workflows.',
      features: [
        'Artificial Intelligence core concepts and machine learning taxonomy',
        'Data-driven decision making and automation algorithms',
        'Official credential issued by IBM'
      ]
    },
    {
      id: 'vcodez',
      category: 'ai',
      categoryLabel: 'Machine Learning Internship',
      year: 'Completed',
      title: 'VCodez: Machine Learning Internship Certificate',
      issuer: 'Issued by: VCodez',
      image: 'assets/certificates/internships/vcodez-ml-internship-completion.jpg',
      file: 'assets/certificates/internships/vcodez-ml-internship-completion.pdf',
      desc: 'Certificate issued by VCodez acknowledging hands-on contributions in dataset preparation, data cleaning, exploratory data analysis, and predictive model training in Python.',
      features: [
        'Exploratory Data Analysis (EDA) on real-world datasets',
        'Data cleaning, missing value handling, and feature selection',
        'Supervised machine learning algorithms in Python and Scikit-Learn'
      ]
    },
    {
      id: 'vcodezproj',
      category: 'ai',
      categoryLabel: 'Machine Learning Project',
      year: 'Completed',
      title: 'VCodez: ML Project Completion Certificate',
      issuer: 'Issued by: VCodez',
      image: 'assets/certificates/courses/vcodez-project-completion.jpg',
      file: 'assets/certificates/courses/vcodez-project-completion.pdf',
      desc: 'Credential awarded upon the successful development, testing, and deployment of a Python-based machine learning data science project.',
      features: [
        'End-to-end Python machine learning pipeline implementation',
        'Feature engineering and accuracy optimization',
        'Verified project completion by VCodez mentors'
      ]
    },
    {
      id: 'degree',
      category: 'academic',
      categoryLabel: 'Academic Degree',
      year: '7.4 CGPA',
      title: 'Bachelor of Engineering in Computer Science & Engineering',
      issuer: 'Anna University / Mount Zion College of Engineering',
      image: 'assets/certificates/education/anna-university-be-cse-provisional-degree.jpg',
      file: 'assets/certificates/education/anna-university-be-cse-provisional-degree.pdf',
      desc: 'Official Provisional Degree Certificate from Mount Zion College of Engineering and Technology, affiliated with Anna University, graduating with a 7.4 cumulative CGPA.',
      features: [
        '4-year Bachelor of Engineering curriculum in Computer Science',
        'Core foundations: Algorithms, Operating Systems, DBMS, Networks, and AI',
        'Graduated with 7.4 CGPA from Anna University'
      ]
    },
    {
      id: 'twelfth',
      category: 'academic',
      categoryLabel: 'Higher Secondary School',
      year: '8.5 CGPA',
      title: 'Class XII Higher Secondary Marksheet',
      issuer: 'Tamil Nadu State Board',
      image: 'assets/certificates/education/class-12-higher-secondary-marksheet.jpg',
      file: 'assets/certificates/education/class-12-higher-secondary-marksheet.jpg',
      desc: 'Official marksheet certifying completion of Higher Secondary education under the Tamil Nadu State Board with a strong 8.5 CGPA.',
      features: [
        'Tamil Nadu State Board Higher Secondary Certificate',
        'Scored 8.5 CGPA with distinction in sciences and mathematics',
        'E.D. Thomas Memorial Higher Secondary School, Kudikadu'
      ]
    },
    {
      id: 'tenth',
      category: 'academic',
      categoryLabel: 'Secondary School',
      year: '7.1 CGPA',
      title: 'Class X ICSE Board Marksheet',
      issuer: 'ICSE Board',
      image: 'assets/certificates/education/class-10-icse-marksheet.jpg',
      file: 'assets/certificates/education/class-10-icse-marksheet.jpg',
      desc: 'Official matriculation statement of marks certifying 7.1 CGPA under the Council for the Indian School Certificate Examinations (ICSE).',
      features: [
        'ICSE Board Certification and Statement of Marks',
        'Completed at Ramakrishna Vivekananda Sarada Vidyapith, Fulpal',
        'Scored 7.1 CGPA'
      ]
    },
    {
      id: 'magnion',
      category: 'internship',
      categoryLabel: 'Content Writing Internship',
      year: 'Completed',
      title: 'Magnion Technology: Content Writer Internship',
      issuer: 'Issued by: Magnion Technology',
      image: 'assets/certificates/internships/magnion-content-internship-completion.jpg',
      file: 'assets/certificates/internships/magnion-content-internship-completion.pdf',
      desc: 'Certificate of completion honoring research across tourist destinations in India and creating publication-grade digital articles under strict deadlines.',
      features: [
        'Tourist destinations research and synthesis across India',
        'SEO-optimized digital storytelling and article structuring',
        'Delivered 100% of deliverables within deadlines'
      ]
    },
    {
      id: 'magnionoffer',
      category: 'internship',
      categoryLabel: 'Internship Offer',
      year: 'Offer Letter',
      title: 'Magnion Technology: Internship Offer Letter',
      issuer: 'Issued by: Magnion Technology',
      image: 'assets/certificates/offer-letters/magnion-content-internship-offer.jpg',
      file: 'assets/certificates/offer-letters/magnion-content-internship-offer.pdf',
      desc: 'Official appointment letter confirming selection and onboarding as a Content Writer Intern at Magnion Technology.',
      features: [
        'Selection confirmation for digital content team',
        'Documented terms of internship and responsibilities'
      ]
    },
    {
      id: 'techtraining',
      category: 'internship',
      categoryLabel: 'Technical Training',
      year: 'Certified',
      title: 'Technical Training Completion Credential',
      issuer: 'Professional Training Organization',
      image: 'assets/certificates/internships/technical-training-completion.jpg',
      file: 'assets/certificates/internships/technical-training-completion.pdf',
      desc: 'Certificate of training completion certifying practical proficiency in software engineering, technical workflows, and digital solution delivery.',
      features: [
        'Comprehensive professional technical training curriculum',
        'Verified certificate of practical completion'
      ]
    },
    {
      id: 'coincent',
      category: 'academic',
      categoryLabel: 'Web Development',
      year: 'Certified',
      title: 'Coincent: Web Development Certification',
      issuer: 'Issued by: Coincent',
      image: 'assets/certificates/courses/coincent-web-development.jpg',
      file: 'assets/certificates/courses/coincent-web-development.pdf',
      desc: 'Official course completion certificate in web development covering responsive layouts, modern HTML5/CSS3, JavaScript, and dynamic web applications.',
      features: [
        'Full-stack and frontend development principles',
        'Responsive layout engineering and interface styling',
        'Verified completion credential by Coincent'
      ]
    }
  ];

  // Quick lookup dictionary by ID
  const certMap = {};
  certsList.forEach((c, idx) => {
    c.index = idx;
    certMap[c.id] = c;
  });

  // Project Modal Details Dictionary
  const projectDetails = {
    symposium: {
      category: 'Web Portal & Event System',
      year: 'College Project',
      title: 'Website for College Symposium',
      desc: 'Engineered an interactive event web portal for the departmental college symposium at Mount Zion College of Engineering and Technology. Streamlined attendee registrations, event timelines, and rule guidelines.',
      features: [
        'Responsive layout accessible on mobile phones, tablets, and laptops',
        'Event schedule tables, rules, and departmental announcements',
        'Clean registration interface for participating students'
      ]
    },
    mlanalysis: {
      category: 'Machine Learning',
      year: 'VCodez Internship',
      title: 'ML Predictive Data Analysis Pipeline',
      desc: 'Data science and machine learning pipeline developed using Python. Processed complex multi-feature datasets, conducted statistical analysis, handled outliers, and evaluated regression and classification models.',
      features: [
        'Data preprocessing using Pandas and NumPy',
        'Feature scaling, encoding, and exploratory visualization',
        'Model training and accuracy evaluation metrics'
      ]
    },
    designmedia: {
      category: 'Graphic Design & Freelance',
      year: 'Freelance Practice',
      title: 'Social Media Creatives & Brand Posters',
      desc: 'Client-focused creative design suite developed using Canva Pro. Designed high-impact promotional posters, social media banners, event creatives, and structured professional resumes.',
      features: [
        'Tailored visual branding for social media accounts',
        'Modern layout balancing typography, colors, and visual hierarchy',
        'Professional ATS-optimized Resume & CV layouts'
      ]
    }
  };

  // State
  let currentCertIndex = 0;
  let currentZoom = 1.0;
  let isCertModalOpen = false;

  // --- RENDER CERTIFICATE MODAL (SAME-TAB INTERACTIVE LIGHTBOX) ---
  function openCertModal(index) {
    if (index < 0) index = certsList.length - 1;
    if (index >= certsList.length) index = 0;

    currentCertIndex = index;
    currentZoom = 1.0;
    const cert = certsList[currentCertIndex];
    if (!cert || !modal || !modalBody) return;

    if (!isCertModalOpen) {
      CyberAudio.openModal();
    } else {
      CyberAudio.switchSlide();
    }
    isCertModalOpen = true;

    if (modalDialog) {
      modalDialog.classList.add('cert-mode');
    }

    // Build Filmstrip items
    const filmstripHTML = certsList.map((item, idx) => `
      <div class="filmstrip-item ${idx === currentCertIndex ? 'active' : ''}" data-index="${idx}" title="${item.title}">
        <img src="${item.image}" alt="${item.title}">
      </div>
    `).join('');

    modalBody.innerHTML = `
      <!-- Top Controls Toolbar -->
      <div class="modal-toolbar">
        <div class="toolbar-left">
          <span class="modal-counter-badge">${currentCertIndex + 1} / ${certsList.length}</span>
          <span class="modal-category">${cert.categoryLabel}</span>
        </div>

        <div class="toolbar-controls">
          <button class="zoom-btn" id="cert-zoom-out" title="Zoom Out (–)">–</button>
          <button class="zoom-btn" id="cert-zoom-reset" title="Reset Zoom">100%</button>
          <button class="zoom-btn" id="cert-zoom-in" title="Zoom In (+)">+</button>
          <a href="${cert.file}" download class="btn btn-sm btn-primary" title="Download Document" style="margin-left: 0.5rem; text-decoration: none;">
            <span>⬇ Download</span>
          </a>
        </div>
      </div>

      <!-- Main Stage with Interactive Navigation Arrows -->
      <div class="cert-viewer-stage">
        <button class="cert-nav-arrow cert-arrow-prev" id="cert-nav-prev" aria-label="Previous Certificate" title="Previous Certificate (Left Arrow)">&#10094;</button>
        
        <div class="cert-zoom-viewport" id="cert-viewport">
          <img src="${cert.image}" alt="${cert.title}" class="cert-lightbox-img" id="cert-lightbox-img" title="Click to zoom in / reset">
        </div>

        <button class="cert-nav-arrow cert-arrow-next" id="cert-nav-next" aria-label="Next Certificate" title="Next Certificate (Right Arrow)">&#10095;</button>
      </div>

      <!-- Metadata & Highlights Details -->
      <div class="cert-modal-meta">
        <h3 class="modal-title">${cert.title}</h3>
        <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); margin-bottom: 0.6rem;">${cert.issuer}</p>
        <p class="modal-desc">${cert.desc}</p>
        
        <h4 class="modal-features-title">Highlights:</h4>
        <ul class="modal-features-list">
          ${cert.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div class="modal-actions" style="margin-top: 1rem;">
          <a href="${cert.file}" download class="btn btn-primary">
            <span>Download Verified File</span>
          </a>
          <button class="btn btn-secondary" id="cert-close-action-btn">
            Close Viewer
          </button>
        </div>
      </div>

      <!-- Interactive Mini Filmstrip Carousel -->
      <div class="cert-filmstrip-wrap">
        <div class="filmstrip-title">Browse All Credentials (Click to Jump):</div>
        <div class="cert-filmstrip" id="cert-filmstrip">
          ${filmstripHTML}
        </div>
      </div>
    `;

    // Bind In-Modal Events
    const imgEl = document.getElementById('cert-lightbox-img');
    const zoomInBtn = document.getElementById('cert-zoom-in');
    const zoomOutBtn = document.getElementById('cert-zoom-out');
    const zoomResetBtn = document.getElementById('cert-zoom-reset');
    const prevBtn = document.getElementById('cert-nav-prev');
    const nextBtn = document.getElementById('cert-nav-next');
    const closeActionBtn = document.getElementById('cert-close-action-btn');

    function applyZoom() {
      if (!imgEl) return;
      imgEl.style.transform = `scale(${currentZoom})`;
      if (currentZoom > 1) {
        imgEl.classList.add('zoomed');
      } else {
        imgEl.classList.remove('zoomed');
      }
      if (zoomResetBtn) {
        zoomResetBtn.textContent = `${Math.round(currentZoom * 100)}%`;
      }
    }

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        currentZoom = Math.min(currentZoom + 0.25, 2.5);
        CyberAudio.zoom();
        applyZoom();
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        currentZoom = Math.max(currentZoom - 0.25, 0.75);
        CyberAudio.zoom();
        applyZoom();
      });
    }

    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', () => {
        currentZoom = 1.0;
        CyberAudio.zoom();
        applyZoom();
      });
    }

    if (imgEl) {
      imgEl.addEventListener('click', () => {
        currentZoom = currentZoom === 1.0 ? 1.6 : 1.0;
        CyberAudio.zoom();
        applyZoom();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCertModal(currentCertIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCertModal(currentCertIndex + 1);
      });
    }

    if (closeActionBtn) {
      closeActionBtn.addEventListener('click', closeModal);
    }

    // Bind filmstrip items
    modalBody.querySelectorAll('.filmstrip-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetIdx = parseInt(item.getAttribute('data-index'), 10);
        if (!isNaN(targetIdx)) {
          openCertModal(targetIdx);
        }
      });
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // --- BIND CERTIFICATE CARDS CLICKS ---
  document.querySelectorAll('.view-cert-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = btn.getAttribute('data-cert');
      const item = certMap[certId];
      if (item) {
        openCertModal(item.index);
      }
    });
  });

  // --- BIND PROJECT MODALS ---
  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project');
      const data = projectDetails[key];
      if (!data) return;

      CyberAudio.openModal();
      isCertModalOpen = false;

      if (modalDialog) {
        modalDialog.classList.remove('cert-mode');
      }

      modalBody.innerHTML = `
        <div class="modal-header-meta">
          <span class="modal-category">${data.category}</span>
          <span class="modal-category">• ${data.year}</span>
        </div>
        <h3 class="modal-title">${data.title}</h3>
        <p class="modal-desc">${data.desc}</p>
        
        <h4 class="modal-features-title">Key Highlights:</h4>
        <ul class="modal-features-list">
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div class="modal-actions">
          <a href="https://github.com/k-sanat" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            Visit My GitHub Profile
          </a>
          <button class="btn btn-secondary" id="proj-close-btn">
            Close
          </button>
        </div>
      `;

      const projCloseBtn = document.getElementById('proj-close-btn');
      if (projCloseBtn) projCloseBtn.addEventListener('click', closeModal);

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Modal Helper
  function closeModal() {
    CyberAudio.click();
    modal.classList.remove('open');
    if (modalDialog) {
      modalDialog.classList.remove('cert-mode');
    }
    document.body.style.overflow = '';
    isCertModalOpen = false;
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard Navigation: Left/Right arrow and Escape
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (isCertModalOpen && e.key === 'ArrowLeft') {
      e.preventDefault();
      openCertModal(currentCertIndex - 1);
    } else if (isCertModalOpen && e.key === 'ArrowRight') {
      e.preventDefault();
      openCertModal(currentCertIndex + 1);
    }
  });

  // --- CERTIFICATE SEARCH & FILTER SYSTEM ---
  const searchInput = document.getElementById('cert-search-input');
  const searchClearBtn = document.getElementById('cert-search-clear');
  const searchCountBadge = document.getElementById('search-count-badge');
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');
  const certsGrid = document.getElementById('certs-grid');

  let activeFilter = 'all';

  function applyFilterAndSearch() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    certCards.forEach(card => {
      const cardCat = card.getAttribute('data-category') || '';
      const cardTitle = (card.getAttribute('data-title') || '').toLowerCase();
      const cardText = card.textContent.toLowerCase();

      const matchesCat = (activeFilter === 'all' || cardCat === activeFilter);
      const matchesSearch = !query || cardTitle.includes(query) || cardText.includes(query);

      if (matchesCat && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Update clear button
    if (searchClearBtn) {
      if (query.length > 0) {
        searchClearBtn.classList.add('visible');
      } else {
        searchClearBtn.classList.remove('visible');
      }
    }

    // Update count badge
    if (searchCountBadge) {
      if (query.length === 0) {
        if (activeFilter === 'all') {
          searchCountBadge.textContent = `Showing all 14 credentials`;
        } else {
          searchCountBadge.textContent = `Showing ${visibleCount} credential${visibleCount === 1 ? '' : 's'} in category`;
        }
      } else {
        searchCountBadge.textContent = `Found ${visibleCount} credential${visibleCount === 1 ? '' : 's'} matching "${query}"`;
      }
    }

    // Handle No Results placeholder
    const existingNoResults = document.getElementById('certs-no-results-box');
    if (visibleCount === 0) {
      if (!existingNoResults && certsGrid) {
        const noResBox = document.createElement('div');
        noResBox.id = 'certs-no-results-box';
        noResBox.className = 'certs-no-results glass-panel';
        noResBox.innerHTML = `
          <h4>No Credentials Found</h4>
          <p style="margin-bottom: 1rem; color: var(--text-dim);">No certificates match your query "${query}". Try searching "IBM", "Python", "Kali", or "ICSE".</p>
          <button class="btn btn-sm btn-secondary" id="reset-search-btn">Reset Search Filter</button>
        `;
        certsGrid.appendChild(noResBox);

        const resetBtn = document.getElementById('reset-search-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            activeFilter = 'all';
            certFilterBtns.forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.cert-filter-btn[data-filter="all"]');
            if (allBtn) allBtn.classList.add('active');
            applyFilterAndSearch();
          });
        }
      }
    } else if (existingNoResults) {
      existingNoResults.remove();
    }
  }

  // Bind Search Input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      CyberAudio.typeKey();
      applyFilterAndSearch();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      CyberAudio.click();
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      applyFilterAndSearch();
    });
  }

  // Bind Filter Tabs
  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      CyberAudio.click();
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      applyFilterAndSearch();
    });
  });
}

/* ========================================================
   6. LIVE RESUME BUILDER & PRINT-TO-PDF EXPORTER
   ======================================================== */
function initResumeBuilder() {
  const resumeDoc = document.getElementById('resume-document');
  const printBtn = document.getElementById('btn-print-resume');
  const editBtn = document.getElementById('btn-toggle-edit-mode');
  const resetBtn = document.getElementById('btn-reset-resume');
  const editLabel = document.getElementById('edit-mode-label');

  if (!resumeDoc || !printBtn) return;

  // Cache original HTML content for reset
  const initialResumeHTML = resumeDoc.innerHTML;
  let isEditing = false;

  // Print as PDF
  printBtn.addEventListener('click', () => {
    window.print();
  });

  // Toggle Edit Mode
  if (editBtn && editLabel) {
    editBtn.addEventListener('click', () => {
      isEditing = !isEditing;
      resumeDoc.contentEditable = isEditing ? 'true' : 'false';
      resumeDoc.classList.toggle('editing', isEditing);

      if (isEditing) {
        editLabel.textContent = 'Disable Edit Mode (Save Changes)';
        showToast('Edit Mode Enabled: Click any text on the resume to edit it!');
      } else {
        editLabel.textContent = 'Enable Edit Mode (Click Text to Edit)';
        showToast('Changes saved on screen!');
      }
    });
  }

  // Reset to original
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resumeDoc.innerHTML = initialResumeHTML;
      if (isEditing) {
        resumeDoc.contentEditable = 'false';
        resumeDoc.classList.remove('editing');
        isEditing = false;
        editLabel.textContent = 'Enable Edit Mode (Click Text to Edit)';
      }
      showToast('Resume reset to original details!');
    });
  }
}

/* ========================================================
   7. STATS COUNTER ON SCROLL
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
          const duration = 1500;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
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
  if (statsSection) observer.observe(statsSection);
}

/* ========================================================
   8. COPY EMAIL TO CLIPBOARD
   ======================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailLink = document.getElementById('email-address');
  const tooltip = document.getElementById('copy-tooltip');

  if (!copyBtn || !emailLink) return;

  copyBtn.addEventListener('click', async () => {
    const email = emailLink.textContent.trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
      }

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
   9. CONTACT FORM
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim()) {
      errName.classList.add('show');
      isValid = false;
    } else {
      errName.classList.remove('show');
    }

    if (!validateEmail(emailInput.value.trim())) {
      errEmail.classList.add('show');
      isValid = false;
    } else {
      errEmail.classList.remove('show');
    }

    if (messageInput.value.trim().length < 10) {
      errMessage.classList.add('show');
      isValid = false;
    } else {
      errMessage.classList.remove('show');
    }

    if (!isValid) return;

    const endpoint = form.getAttribute('action');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    // Real submission if an action endpoint is configured (e.g. Formspree)
    if (endpoint && endpoint.startsWith('http')) {
      try {
        const formData = new FormData(form);
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          feedback.classList.remove('hidden');
          form.reset();
          showToast('Message sent! I will reply to your email promptly.');
        } else {
          showToast('Error sending message. Please try again or reach out on WhatsApp.');
        }
      } catch (err) {
        console.error('Submission error:', err);
        showToast('Network error. Feel free to message me directly on WhatsApp!');
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        setTimeout(() => feedback.classList.add('hidden'), 6000);
      }
    } else {
      // Simulated fallback mode when no endpoint is configured
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        feedback.classList.remove('hidden');
        form.reset();
        showToast('Demo submission recorded! Connect Formspree for inbox delivery.');
        setTimeout(() => feedback.classList.add('hidden'), 5000);
      }, 900);
    }
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

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

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

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
}
