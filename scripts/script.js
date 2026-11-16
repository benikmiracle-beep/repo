const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

document.querySelectorAll('[data-fallback-hide]').forEach((img) => {
  img.addEventListener('error', () => {
    img.classList.add('is-missing');
  });
});

if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'A') {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

const root = document.documentElement;
const tbtn = document.querySelector('.theme-btn');

function syncToggle() {
  if (!tbtn) return;

  const dark = root.getAttribute('data-theme') === 'dark';
  tbtn.setAttribute('aria-pressed', String(dark));
  tbtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}

if (tbtn) {
  tbtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);

    try {
      localStorage.setItem('theme', next);
    } catch (error) {
      console.warn('Theme preference could not be saved.', error);
    }

    syncToggle();
  });
}

syncToggle();
