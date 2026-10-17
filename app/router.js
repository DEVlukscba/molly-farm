import { render as renderMath  } from './activities/math.js';
import { render as renderTouch } from './activities/touch.js';

export const ACTIVITIES = [
  {
    id: 'math',
    label: { es: 'Matemáticas', en: 'Math' },
    emoji: '🔢',
    color: '#2E7D32',
    tileBackground: '#E8F5E9',
    sub: { es: 'Números, sumas y más', en: 'Numbers, sums and more' },
    render: renderMath,
  },
  {
    id: 'touch',
    label: { es: 'La Granja', en: 'The Farm' },
    emoji: '🐄',
    color: '#C8452F',
    tileBackground: '#FDECEA',
    sub: { es: 'Trazar, contar y explorar', en: 'Trace, count and explore' },
    render: renderTouch,
  }
];

const homeRoot     = document.getElementById('home-root');
const activityRoot = document.getElementById('activity-root');
const backBtn      = document.getElementById('back-btn');

function parseHash() {
  const hash = location.hash.replace(/^#\/?/, '');
  return hash || null;
}

function showHome() {
  activityRoot.hidden = true;
  homeRoot.hidden = false;
  if (backBtn) backBtn.hidden = true;
}

function showActivity(id) {
  const activity = ACTIVITIES.find(a => a.id === id);
  if (!activity) {
    location.hash = '#/';
    return;
  }
  homeRoot.hidden = true;
  activityRoot.hidden = false;
  if (backBtn) backBtn.hidden = false;
  activity.render(activityRoot);
}

export function Router(renderHome) {
  function route() {
    const id = parseHash();
    if (!id) {
      showHome();
      renderHome();
    } else {
      showActivity(id);
    }
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => { location.hash = '#/'; });
  }

  window.addEventListener('hashchange', route);
  route();
}
