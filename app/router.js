import { render as renderMath1  } from './activities/math_1.js';
import { render as renderMath2  } from './activities/math_2.js';
import { render as renderMath3  } from './activities/math_3.js';
import { render as renderMath4  } from './activities/math_4.js';
import { render as renderMath5  } from './activities/math_5.js';
import { render as renderMath6  } from './activities/math_6.js';
import { render as renderMath7  } from './activities/math_7.js';
import { render as renderMath8  } from './activities/math_8.js';
import { render as renderTouch1 } from './activities/touch_1.js';
import { render as renderTouch2 } from './activities/touch_2.js';
import { render as renderTouch3 } from './activities/touch_3.js';
import { isUnlocked } from './progress.js';

export const LEVELS = {
  math: [
    { level:1, emoji:'🌱', label:{es:'Nivel 1',en:'Level 1'}, sub:{es:'Patrones y contar',   en:'Patterns & counting'},   totalActs:8, render:renderMath1  },
    { level:2, emoji:'🐑', label:{es:'Nivel 2',en:'Level 2'}, sub:{es:'Comparar y sumar',    en:'Compare & add'},          totalActs:8, render:renderMath2  },
    { level:3, emoji:'🐷', label:{es:'Nivel 3',en:'Level 3'}, sub:{es:'Restar y posiciones', en:'Subtract & positions'},   totalActs:8, render:renderMath3  },
    { level:4, emoji:'🐔', label:{es:'Nivel 4',en:'Level 4'}, sub:{es:'Saltos y lógica',     en:'Skip & logic'},           totalActs:8, render:renderMath4  },
    { level:5, emoji:'🥕', label:{es:'Nivel 5',en:'Level 5'}, sub:{es:'Mitades y variables', en:'Halves & variables'},     totalActs:8, render:renderMath5  },
    { level:6, emoji:'🕐', label:{es:'Nivel 6',en:'Level 6'}, sub:{es:'Reloj y dinero',      en:'Clock & money'},          totalActs:8, render:renderMath6  },
    { level:7, emoji:'🧮', label:{es:'Nivel 7',en:'Level 7'}, sub:{es:'Decenas y funciones', en:'Tens & functions'},       totalActs:8, render:renderMath7  },
    { level:8, emoji:'🔢', label:{es:'Nivel 8',en:'Level 8'}, sub:{es:'Avanzado',            en:'Advanced'},               totalActs:8, render:renderMath8  },
  ],
  touch: [
    { level:1, emoji:'✏️', label:{es:'Touch 1',en:'Touch 1'}, sub:{es:'Trazar números',      en:'Trace numbers'},          totalActs:3, render:renderTouch1 },
    { level:2, emoji:'🐮', label:{es:'Touch 2',en:'Touch 2'}, sub:{es:'Curvas y objetivos',  en:'Curves & goals'},         totalActs:3, render:renderTouch2 },
    { level:3, emoji:'🔄', label:{es:'Touch 3',en:'Touch 3'}, sub:{es:'Palabras y loops',    en:'Words & loops'},          totalActs:3, render:renderTouch3 },
  ],
};

const homeRoot     = document.getElementById('home-root');
const activityRoot = document.getElementById('activity-root');
const backBtn      = document.getElementById('back-btn');

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  if (!raw) return null;
  const [branch, lvStr] = raw.split('/');
  const level = parseInt(lvStr, 10);
  if (!branch || !level) return null;
  return { branch, level };
}

function showHome(renderHome) {
  activityRoot.hidden = true;
  homeRoot.hidden = false;
  if (backBtn) backBtn.hidden = true;
  renderHome();
}

function showActivity(branch, level) {
  const meta = (LEVELS[branch] || []).find(l => l.level === level);
  if (!meta || !isUnlocked(branch, level)) { location.hash = '#/'; return; }
  homeRoot.hidden = true;
  activityRoot.hidden = false;
  if (backBtn) backBtn.hidden = false;
  meta.render(activityRoot);
}

export function Router(renderHome) {
  function route() {
    const parsed = parseHash();
    if (!parsed) { showHome(renderHome); } else { showActivity(parsed.branch, parsed.level); }
  }

  if (backBtn) backBtn.addEventListener('click', () => { location.hash = '#/'; });
  window.addEventListener('hashchange', route);
  route();
}
