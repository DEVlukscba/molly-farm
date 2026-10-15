export const ACTIVITIES = [
  {
    id: 'math',
    label: { es: 'Matemáticas', en: 'Math' },
    emoji: '🔢',
    color: '#2E7D32',
    tileBackground: '#E8F5E9',
    sub: { es: 'Números, sumas y más', en: 'Numbers, sums and more' },
    render(root) {
      root.innerHTML = `
        <div class="placeholder">
          <div class="ph-emoji">🔢</div>
          <h2>Matemáticas / Math</h2>
          <p>¡Próximamente! / Coming soon!</p>
        </div>`;
    }
  },
  {
    id: 'touch',
    label: { es: 'La Granja', en: 'The Farm' },
    emoji: '🐄',
    color: '#C8452F',
    tileBackground: '#FDECEA',
    sub: { es: 'Trazar, contar y explorar', en: 'Trace, count and explore' },
    render(root) {
      root.innerHTML = `
        <div class="placeholder">
          <div class="ph-emoji">🐄</div>
          <h2>La Granja / The Farm</h2>
          <p>¡Próximamente! / Coming soon!</p>
        </div>`;
    }
  }
];

const homeRoot     = document.getElementById('home-root');
const activityRoot = document.getElementById('activity-root');

function parseHash() {
  const hash = location.hash.replace(/^#\/?/, '');
  return hash || null;
}

function showHome() {
  activityRoot.hidden = true;
  homeRoot.hidden = false;
}

function showActivity(id) {
  const activity = ACTIVITIES.find(a => a.id === id);
  if (!activity) {
    location.hash = '#/';
    return;
  }
  homeRoot.hidden = true;
  activityRoot.hidden = false;
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

  window.addEventListener('hashchange', route);
  route();
}
