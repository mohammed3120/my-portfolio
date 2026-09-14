/* ==========================================================================
   Mohammed Abduallah — Portfolio
   Vanilla JS: loader, cursor, particle network, reveals, counters,
   typing effect, skills/projects/tech rendering, filters, tilt, contact form.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------- Loader ---------------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    setTimeout(function () {
      if (loader) loader.classList.add('is-hidden');
    }, 700);
  });

  /* ---------------- Year ---------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Theme toggle ---------------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var THEME_KEY = 'ma-portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }
  (function initTheme() {
    var saved;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    applyTheme(saved === 'light' ? 'light' : 'dark');
  })();
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
  }
  window.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() === 't' && !/input|textarea/i.test(document.activeElement.tagName)) {
      themeToggle && themeToggle.click();
    }
  });

  /* ---------------- Nav scroll + mobile menu ---------------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }, { passive: true });

  if (burger) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger && burger.classList.remove('is-active');
      });
    });
  }

  /* ---------------- Scroll progress ---------------- */
  var progress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = pct + '%';
  }, { passive: true });

  /* ---------------- Back to top ---------------- */
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 600) backToTop.classList.add('is-visible');
    else backToTop.classList.remove('is-visible');
  }, { passive: true });
  backToTop && backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Custom cursor ---------------- */
  var cursor = document.getElementById('cursor');
  if (cursor && matchMedia('(hover:hover)').matches) {
    window.addEventListener('mousemove', function (e) {
      cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    });
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, .project-card, .tech-tile, input, textarea')) {
        cursor.classList.add('is-active');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('a, button, .project-card, .tech-tile, input, textarea')) {
        cursor.classList.remove('is-active');
      }
    });
  }

  /* ---------------- Particle / neural network background ---------------- */
  (function networkBackground() {
    var canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var W, H, DPR = Math.min(window.devicePixelRatio || 1, 2);
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      W = canvas.width = window.innerWidth * DPR;
      H = canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      var count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25 * DPR,
          vy: (Math.random() - 0.5) * 0.25 * DPR,
          r: (Math.random() * 1.4 + 0.6) * DPR
        });
      }
    }

    function isDark() { return root.getAttribute('data-theme') !== 'light'; }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      var lineColor = isDark() ? 'rgba(79,140,255,' : 'rgba(79,140,255,';
      var dotColor = isDark() ? 'rgba(0,212,255,0.7)' : 'rgba(79,140,255,0.45)';
      var maxDist = 140 * DPR;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.strokeStyle = lineColor + (1 - dist / maxDist) * 0.35 + ')';
            ctx.lineWidth = 0.6 * DPR;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', resize);
    tick();
    if (reduced) tick(); // draw a single static frame
  })();

  /* ---------------- Typing effect (hero role) ---------------- */
  (function typedRole() {
    var el = document.getElementById('typedRole');
    if (!el) return;
    var roles = ['AI Engineer', 'Backend Developer', 'Full Stack Developer', 'Computer Vision Engineer', 'LLM Engineer'];
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { el.textContent = roles[0]; return; }

    var ri = 0, ci = 0, deleting = false;
    function step() {
      var word = roles[ri];
      if (!deleting) {
        ci++;
        el.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; setTimeout(step, 1400); return; }
      } else {
        ci--;
        el.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(step, deleting ? 45 : 75);
    }
    step();
  })();

  /* ---------------- Scroll reveal ---------------- */
  (function scrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------- Animated counters ---------------- */
  (function counters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400, start = null;
        function frame(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------- Skills data + render ---------------- */
  var ICONS = {
    code: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg>',
    server: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><circle cx="7" cy="7" r=".8" fill="currentColor" stroke="none"/><circle cx="7" cy="17" r=".8" fill="currentColor" stroke="none"/></svg>',
    window: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>',
    db: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
    devops: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
    brain: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3a3 3 0 00-3 3 3 3 0 00-2 5 3.5 3.5 0 002 6 3 3 0 003 3M15 3a3 3 0 013 3 3 3 0 012 5 3.5 3.5 0 01-2 6 3 3 0 01-3 3M9 3v17M15 3v17"/></svg>',
    eye: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    chip: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>',
    link: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 15l6-6M8.5 12.5l-2 2a3.5 3.5 0 004.9 4.9l2.4-2.4M15.5 11.5l2-2a3.5 3.5 0 00-4.9-4.9l-2.4 2.4"/></svg>',
    shield: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l8 3v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/></svg>',
    blueprint: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h4v4H7zM13 13h4v4h-4zM7 15h2M15 7h2"/></svg>'
  };

  var SKILLS = [
    { title: 'Programming languages', icon: 'code', tags: ['Python', 'JavaScript', 'TypeScript', 'C / C++', 'C#', 'Java'] },
    { title: 'Backend', icon: 'server', tags: ['Django', 'FastAPI', 'Django REST', 'REST APIs', 'JWT', 'OAuth', 'WebSockets', 'MQTT', 'Microservices', 'Redis', 'RabbitMQ', 'Celery'] },
    { title: 'Frontend', icon: 'window', tags: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript'] },
    { title: 'Databases', icon: 'db', tags: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis'] },
    { title: 'DevOps', icon: 'devops', tags: ['Docker', 'Docker Compose', 'Kubernetes', 'Git', 'GitLab CI', 'Jenkins', 'Linux'] },
    { title: 'Artificial intelligence', icon: 'brain', tags: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch'] },
    { title: 'Computer vision', icon: 'eye', tags: ['OpenCV', 'YOLOv8', 'ByteTrack', 'DeepSORT', 'TensorRT', 'ONNX', 'RTSP', 'ROI Detection', 'Line Crossing', 'Event Analytics'] },
    { title: 'Embedded', icon: 'chip', tags: ['Jetson Nano', 'Raspberry Pi', 'Arduino', 'MQTT'] },
    { title: 'LLM & GenAI', icon: 'link', tags: ['LLMs', 'RAG', 'LangChain', 'Ollama', 'Weaviate', 'pgvector', 'Vector Databases', 'Prompt Engineering', 'AI Agents', 'n8n', 'Workflow Automation'] },
    { title: 'Testing', icon: 'shield', tags: ['pytest', 'unittest'] },
    { title: 'Software engineering', icon: 'blueprint', tags: ['System Design', 'API Design', 'Database Design', 'Performance Optimization', 'Agile', 'Documentation'] }
  ];

  (function renderSkills() {
    var grid = document.getElementById('skillsGrid');
    if (!grid) return;
    var html = SKILLS.map(function (s) {
      var tags = s.tags.map(function (t) {
        return '<span class="skill-tag"><span class="skill-tag__dot" aria-hidden="true"></span>' + t + '</span>';
      }).join('');
      return (
        '<div class="skill-card reveal">' +
          '<div class="skill-card__head">' +
            '<span class="skill-card__icon" aria-hidden="true">' + (ICONS[s.icon] || '') + '</span>' +
            '<h3 class="skill-card__title">' + s.title + '</h3>' +
          '</div>' +
          '<div class="skill-card__tags">' + tags + '</div>' +
        '</div>'
      );
    }).join('');
    grid.innerHTML = html;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
        });
      }, { threshold: 0.1 });
      grid.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      grid.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    }
  })();

  /* ---------------- Projects data + render + filter ---------------- */
  var PROJECTS = [
    {
      title: 'YOLO11 TensorRT Real-Time Object Detection', cat: 'cv', catLabel: 'Computer Vision',
      desc: 'TensorRT-accelerated YOLO11 detection for webcam and video streams, with adjustable confidence thresholds, FPS overlay and annotated output saving.',
      tech: ['YOLO11', 'TensorRT', 'Real-Time'], gradient: 'linear-gradient(135deg,#4F8CFF,#8B5CF6)',
      url: 'https://github.com/mohammed3120/yolo11_tensorRT_repo'
    },
    {
      title: 'Hand Gesture Recognition — 10 Classes', cat: 'cv', catLabel: 'Computer Vision',
      desc: 'CNN trained with image augmentation and normalization to classify ten hand gestures, from thumbs-up to rock-paper-scissors signs.',
      tech: ['CNN', 'TensorFlow', 'Image Augmentation'], gradient: 'linear-gradient(135deg,#10B981,#4F8CFF)',
      url: 'https://github.com/mohammed3120/hand_gesture_binary10classes'
    },
    {
      title: 'Human Emotion Detection', cat: 'cv', catLabel: 'Computer Vision',
      desc: 'Facial emotion classifier distinguishing angry, happy and sad expressions using CNN-based feature extraction and confusion-matrix evaluation.',
      tech: ['CNN', 'TensorFlow', 'Keras'], gradient: 'linear-gradient(135deg,#00D4FF,#4F8CFF)',
      url: 'https://github.com/mohammed3120/Human_Emotion'
    },
    {
      title: 'Malaria Diagnosis Using TensorFlow', cat: 'cv', catLabel: 'Computer Vision',
      desc: 'Medical image classifier distinguishing malaria-infected from uninfected blood-cell images across multiple CNN architectures.',
      tech: ['TensorFlow', 'CNN', 'Medical Imaging'], gradient: 'linear-gradient(135deg,#8B5CF6,#00D4FF)',
      url: 'https://github.com/mohammed3120/malaria_diagnosis'
    },
    {
      title: 'Handwritten Digit Recognizer Using Keras', cat: 'cv', catLabel: 'Computer Vision',
      desc: 'Fully-connected neural network classifying handwritten digits 0–9 through a 10-class softmax output.',
      tech: ['Keras', 'Neural Networks', 'Image Classification'], gradient: 'linear-gradient(135deg,#4F8CFF,#00D4FF)',
      url: 'https://github.com/mohammed3120/Digit_Recognizer_Keras'
    },
    {
      title: 'Fashion RAG Chatbot', cat: 'llm', catLabel: 'LLM',
      desc: 'E-commerce fashion assistant combining hybrid semantic and BM25 search over a Weaviate vector store with a Groq-powered LLM for recommendations, served via FastAPI.',
      tech: ['RAG', 'Weaviate', 'FastAPI', 'Groq'], gradient: 'linear-gradient(135deg,#8B5CF6,#4F8CFF)',
      url: 'https://github.com/mohammed3120/fashion-rag-chatbot'
    },
    {
      title: 'Real-Time Arabic Voice Assistant', cat: 'llm', catLabel: 'LLM',
      desc: 'Conversational Arabic voice assistant transcribing speech over WebSocket, generating replies via Gemini, and responding with GPU-accelerated text-to-speech.',
      tech: ['FastAPI', 'WebSocket', 'Gemini', 'Speech-to-Text'], gradient: 'linear-gradient(135deg,#00D4FF,#8B5CF6)',
      url: 'https://github.com/mohammed3120/real-time-arabic-voice-assistant'
    },
    {
      title: 'Car Price Prediction Using TensorFlow', cat: 'ai', catLabel: 'AI',
      desc: 'Regression model predicting vehicle resale price from age, mileage, condition and performance specs, comparing MAE, MSE and Huber loss.',
      tech: ['TensorFlow', 'Keras', 'Regression'], gradient: 'linear-gradient(135deg,#4F8CFF,#8B5CF6)',
      url: 'https://github.com/mohammed3120/Car_Price_Regression_using_Tensorflow'
    },
    {
      title: 'Customer Churn Classification', cat: 'ai', catLabel: 'AI',
      desc: 'End-to-end churn prediction system handling class imbalance, encoding and scaling, with a saved pipeline for predictions on new customers.',
      tech: ['TensorFlow', 'Keras', 'RandomOverSampler'], gradient: 'linear-gradient(135deg,#10B981,#8B5CF6)',
      url: 'https://github.com/mohammed3120/Customer_Churn_Classification'
    },
    {
      title: 'Bank Customer Subscription Prediction', cat: 'ai', catLabel: 'AI',
      desc: 'Binary classifier predicting bank service subscription from customer demographics, account details and campaign history.',
      tech: ['Keras', 'Class Balancing', 'Feature Encoding'], gradient: 'linear-gradient(135deg,#8B5CF6,#00D4FF)',
      url: 'https://github.com/mohammed3120/Customer_Churn_Classification'
    },
    {
      title: 'Spam Email Classifier Using Keras', cat: 'ai', catLabel: 'AI',
      desc: 'Spam detection pipeline using tokenization, stop-word removal and TF-IDF features feeding a Keras binary classifier, with word-cloud visualization.',
      tech: ['NLP', 'TF-IDF', 'Keras'], gradient: 'linear-gradient(135deg,#4F8CFF,#10B981)',
      url: 'https://github.com/mohammed3120/Spam_Email_Classifier_Keras'
    },
    {
      title: 'MeetMesh — Self-Hosted Video Meeting Platform', cat: 'fullstack', catLabel: 'Full Stack',
      desc: 'Self-hosted video conferencing app with peer-to-peer audio/video, screen sharing, mic/camera controls and chat, using Django Channels and Redis for real-time signaling.',
      tech: ['Django', 'Django Channels', 'Redis', 'WebRTC'], gradient: 'linear-gradient(135deg,#00D4FF,#4F8CFF)',
      url: 'https://github.com/mohammed3120/meetmesh'
    }
  ];

  function renderProjects(filter) {
    var grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = PROJECTS.map(function (p) {
      var hidden = (filter !== 'all' && p.cat !== filter) ? ' is-hidden' : '';
      var tech = p.tech.map(function (t) { return '<span class="chip">' + t + '</span>'; }).join('');
      return (
        '<article class="project-card reveal is-visible' + hidden + '" data-cat="' + p.cat + '">' +
          '<span class="project-card__frame" aria-hidden="true"><span class="tl"></span><span class="tr"></span><span class="bl"></span><span class="br"></span></span>' +
          '<div class="project-card__media" style="background:' + p.gradient + '"><span>' + p.title.toUpperCase() + '</span></div>' +
          '<div class="project-card__body">' +
            '<span class="project-card__cat">' + p.catLabel + '</span>' +
            '<h3 class="project-card__title">' + p.title + '</h3>' +
            '<p class="project-card__desc">' + p.desc + '</p>' +
            '<div class="project-card__tech">' + tech + '</div>' +
            '<div class="project-card__links">' +
              '<a href="' + (p.url || 'https://github.com/mohammed3120') + '" target="_blank" rel="noopener">GitHub</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
    attachTilt();
  }

  var filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });
  renderProjects('all');

  /* ---------------- 3D tilt on project cards ---------------- */
  function attachTilt() {
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---------------- Tech stack wall ---------------- */
  var TECH = [
    'Python', 'Django', 'FastAPI', 'React', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL',
    'OpenCV', 'TensorFlow', 'PyTorch', 'LangChain', 'Git', 'Linux', 'YOLO', 'Redis', 'RabbitMQ', 'Jenkins'
  ];
  function monogram(name) {
    var clean = name.replace(/[^A-Za-z]/g, '');
    return clean.length <= 2 ? clean.toUpperCase() : (clean[0] + clean[1]).toUpperCase();
  }
  (function renderTech() {
    var wall = document.getElementById('techWall');
    if (!wall) return;
    wall.innerHTML = TECH.map(function (name) {
      return (
        '<div class="tech-tile reveal is-visible" tabindex="0">' +
          '<span class="tech-tile__mono">' + monogram(name) + '</span>' +
          '<span class="tech-tile__name">' + name + '</span>' +
        '</div>'
      );
    }).join('');
  })();

  /* ---------------- Contact form (client-side only) ---------------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-message').value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        note.textContent = 'Please fill in your name, a valid email and a message.';
        note.style.color = 'var(--secondary)';
        return;
      }
      note.textContent = 'Thanks, ' + name.split(' ')[0] + ' — your message is ready. Opening your email client…';
      note.style.color = 'var(--success)';

      var subject = encodeURIComponent(document.getElementById('cf-subject').value.trim() || 'Portfolio contact');
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      setTimeout(function () {
        window.location.href = 'mailto:mohammedabduallah95@gmail.com?subject=' + subject + '&body=' + body;
      }, 900);
      form.reset();
    });
  }

})();
