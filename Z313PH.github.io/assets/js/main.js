/* Elie Wamana — portfolio interactions (no dependencies) */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- theme toggle ---------- */
  var themeBtn = document.getElementById('themeToggle');
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'light' ? '#f6f7fb' : '#080c17');
    themeBtn.setAttribute('aria-label', t === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  }
  setTheme(root.getAttribute('data-theme') || 'dark');
  themeBtn.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  function closeMenu() {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    menuBtn.querySelector('use').setAttribute('href', '#i-menu');
  }
  menuBtn.addEventListener('click', function () {
    var open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1080) closeMenu(); });

  /* ---------- nav border + active section ---------- */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- stat count-up ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduceMotion) { el.textContent = target; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  /* ---------- project filters ---------- */
  var filters = document.querySelectorAll('.filter');
  var minis = document.querySelectorAll('#miniGrid .mini');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      minis.forEach(function (m) { m.hidden = !(f === 'all' || m.getAttribute('data-cat') === f); });
    });
  });

  /* ---------- repository archive ---------- */
  // Snapshot of github.com/Z313PH public repos (Oct 2026). Edit freely.
  var REPOS = [
    ['coh-kids-pos', 'Sunday school point-of-sale for kids ministry sales', 'JavaScript', 2026],
    ['bible-tree', 'Interactive family tree of Jesus (Matthew 1) with teacher mode', 'JavaScript', 2026],
    ['Stock-Market-Trend-Prediction-App', 'LSTM stock trend forecasting with a Streamlit UI', 'Jupyter Notebook', 2026],
    ['CSC-6210', 'Graduate coursework (Georgia State)', 'Python', 2026],
    ['CSC-8830', 'Computer Vision coursework (Georgia State)', 'Python', 2026],
    ['Java-Chatbot', 'Parallel Java chatbot using Levenshtein distance', 'Java', 2026],
    ['Robotics-Project', 'LaundroRover: autonomous laundry-transport robot', 'Python', 2025],
    ['AI-Research-Project', 'CO₂-aware DQN traffic-signal control in SUMO', 'Python', 2025],
    ['Porsche', 'Porsche GT2 RS / GT3 RS showcase site', 'HTML', 2025],
    ['ERC20-Token-Faucet', 'ERC-20 token faucet', '', 2025],
    ['finance-tracker', 'Rails 8 income & expense tracker', 'Ruby', 2025],
    ['password_generator_app', 'Rails password generator with RSpec tests', 'Ruby', 2025],
    ['Password-Generator', 'Password generator', '', 2025],
    ['GitTage-Prototype1', 'GitTage prototype', 'JavaScript', 2025, true],
    ['GPSTechnicalInterview', 'Technical interview for GoldPoint Systems', 'TypeScript', 2025, true],
    ['road-master', 'Road Master event website', '', 2025, true],
    ['react-portfolio-template', 'Modern React portfolio template', 'JavaScript', 2024, true],
    ['React-Portfolio', 'Personal portfolio in React', 'CSS', 2024],
    ['homework', 'Coursework', 'HTML', 2024],
    ['programmer-s-Calculator', "Programmer's calculator", 'HTML', 2024],
    ['Weather-Web-App', 'Weather web app', 'CSS', 2024],
    ['Virtual-Mate', 'Virtual Mate', 'HTML', 2024],
    ['My-Portfolio', 'Earlier personal portfolio', 'HTML', 2024],
    ['Business-Flights-tracking', 'Business flights tracking', '', 2024],
    ['Pomodoro-Timer', 'Pomodoro focus timer', 'JavaScript', 2024],
    ['Scrumdinger-iOS-App', 'SwiftUI daily-standup timer', 'Swift', 2024],
    ['Morse-Code-Translator', 'A Morse code translator using Arduino', 'C++', 2023],
    ['C-Calendar', 'Calendar program in C', 'C', 2023],
    ['Business-Venture', 'Business Venture', 'Python', 2023],
    ['Java-Rubicks-Cube', "Rubik's Cube in Java", 'Java', 2023],
    ['Business-Venture-GUI', 'Business Venture with a GUI', 'Python', 2023],
    ['Los-Santos-Radio', 'Los Santos Radio website', 'HTML', 2022],
    ['Narnes-and-Bobbles', 'Narnes & Bobbles website', 'HTML', 2022],
    ['Simon-Game', 'Simon memory game', 'Java', 2022],
    ['Java-Calculator-', 'Calculator in Java', 'Java', 2022],
    ['Temperature-and-Humidity-Station-', 'Arduino temperature & humidity station', 'C++', 2022],
    ['Remote-Controlled-Car-with-ESP-NOW', 'ESP32 RC car over ESP-NOW', 'C++', 2022],
    ['I2C-Communication', 'Arduino I²C communication', 'C++', 2022],
    ['Buttons-and-Interuupt', 'Arduino buttons & interrupts', 'C++', 2022],
    ['IR-Counter', 'Arduino IR counter', 'C++', 2022]
  ];
  var LANG_COLORS = {
    'JavaScript': '#f1e05a', 'TypeScript': '#3178c6', 'Python': '#3572A5', 'Java': '#b07219', 'C++': '#f34b7d',
    'C': '#8b9bb4', 'HTML': '#e34c26', 'CSS': '#7a5cff', 'Ruby': '#cc342d', 'Swift': '#F05138', 'Jupyter Notebook': '#DA5B0B'
  };

  var list = document.getElementById('repoList');
  var search = document.getElementById('repoSearch');
  var langSel = document.getElementById('repoLang');
  var count = document.getElementById('repoCount');

  var langs = {};
  REPOS.forEach(function (r) { if (r[2]) langs[r[2]] = (langs[r[2]] || 0) + 1; });
  Object.keys(langs).sort(function (a, b) { return langs[b] - langs[a]; }).forEach(function (l) {
    var o = document.createElement('option'); o.value = l; o.textContent = l + ' (' + langs[l] + ')'; langSel.appendChild(o);
  });

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }

  function render() {
    var q = search.value.trim().toLowerCase();
    var lang = langSel.value;
    var rows = REPOS.filter(function (r) {
      return (!lang || r[2] === lang) && (!q || (r[0] + ' ' + r[1]).toLowerCase().indexOf(q) !== -1);
    });
    count.textContent = rows.length + ' of ' + REPOS.length + ' repos';
    if (!rows.length) { list.innerHTML = '<p class="repo-empty">No repositories match that search.</p>'; return; }
    list.innerHTML = rows.map(function (r) {
      var color = LANG_COLORS[r[2]] || 'var(--border-strong)';
      return '<a class="repo" href="https://github.com/Z313PH/' + encodeURIComponent(r[0]) + '" target="_blank" rel="noopener">' +
        '<span class="repo-name">' + esc(r[0]) + (r[4] ? '<small>fork</small>' : '') + '<span class="repo-desc">' + esc(r[1]) + '</span></span>' +
        '<span class="repo-lang"><i style="background:' + color + '"></i>' + esc(r[2] || 'Mixed') + '</span>' +
        '<span class="repo-year">' + r[3] + '</span>' +
        '<svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"/></svg></a>';
    }).join('');
  }
  search.addEventListener('input', render);
  langSel.addEventListener('change', render);
  render();

  /* ---------- copy email ---------- */
  var copyBtn = document.getElementById('copyEmail');
  copyBtn.addEventListener('click', function () {
    var email = copyBtn.getAttribute('data-email');
    var label = copyBtn.querySelector('span');
    function done(msg) { label.textContent = msg; setTimeout(function () { label.textContent = email; }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () { done('Copied to clipboard'); }, function () { window.location.href = 'mailto:' + email; });
    } else { window.location.href = 'mailto:' + email; }
  });

  /* ---------- footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
