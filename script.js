// STARS
function generateStars() {
  const starsEl = document.getElementById('stars');
  for (let i = 0; i < 130; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${sz}px; height:${sz}px;
      top:${Math.random() * 65}%;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 4 + 2}s;
      animation-delay:${Math.random() * 5}s;
    `;
    starsEl.appendChild(s);
  }
}

// FALLING PETALS
function generatePetals() {
  const container = document.getElementById('petals');
  ['🌺', '🌸', '🌼'].forEach(emoji => {
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = emoji;
      const left     = Math.random() * 100;
      const duration = Math.random() * 14 + 8;
      const delay    = Math.random() * 25;
      const size     = Math.random() * 0.6 + 0.55;
      p.style.cssText = `
        left:${left}vw; top:-30px;
        font-size:${size}rem;
        animation-duration:${duration}s;
        animation-delay:${delay}s;
      `;
      container.appendChild(p);
    }
  });
}

// MUSIC PLAYER
let playing = false;
const MUSIC_SRC =
  'https://www.youtube.com/embed/videoseries' +
  '?list=PLhInj8lFHSbJ0-3oBQmJ5wT_bHSFR4a9S' +
  '&autoplay=1&loop=1' +
  '&playlist=PLhInj8lFHSbJ0-3oBQmJ5wT_bHSFR4a9S';

function toggleMusic() {
  const btn   = document.getElementById('music-btn');
  const icon  = document.getElementById('music-icon');
  const label = document.getElementById('music-label');
  const frame = document.getElementById('yt-frame');
  if (!playing) {
    frame.src = MUSIC_SRC;
    icon.textContent  = '■';
    label.textContent = 'Stop Music';
    btn.classList.add('playing');
    playing = true;
  } else {
    frame.src = 'about:blank';
    icon.textContent  = '▶';
    label.textContent = 'Play Music';
    btn.classList.remove('playing');
    playing = false;
  }
}

// TIMELINE SCROLL ANIMATIONS
function initTimelineAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.tl-item').forEach((el, i) => {
    el.style.cssText = `
      opacity:0; transform:translateX(-24px);
      transition: opacity .6s ${i * 0.14}s ease, transform .6s ${i * 0.14}s ease;
    `;
    observer.observe(el);
  });
}

// NAV ACTIVE HIGHLIGHT
function initNavHighlight() {
  window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('[id]').forEach(section => {
      if (window.scrollY >= section.offsetTop - 130) current = section.id;
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--neon-cyan)' : '';
    });
  });
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  generateStars();
  generatePetals();
  initTimelineAnimations();
  initNavHighlight();
});
