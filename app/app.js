import { Router, LEVELS } from './router.js';
import { isUnlocked, getProgress } from './progress.js';

const homeRoot = document.getElementById('home-root');

function levelTileHTML(branch, meta) {
  const unlocked = isUnlocked(branch, meta.level);
  const { done, total } = getProgress(branch, meta.level);
  const complete = unlocked && done.length >= total;
  const pct      = total > 0 ? Math.round((done.length / total) * 100) : 0;
  const icon     = !unlocked ? '🔒' : complete ? '✅' : meta.emoji;

  return `
    <button class="level-tile${unlocked ? '' : ' locked'}${complete ? ' complete' : ''}"
            data-branch="${branch}" data-level="${meta.level}"
            ${unlocked ? '' : 'disabled'}>
      <span class="lv-icon">${icon}</span>
      <div class="lv-body">
        <div class="lv-name">${meta.label.es}</div>
        <div class="lv-desc">${unlocked ? `${done.length}/${total} · ${meta.sub.es}` : meta.sub.es}</div>
        ${unlocked ? `<div class="lv-bar"><div class="lv-fill" style="width:${pct}%"></div></div>` : ''}
      </div>
    </button>`;
}

function renderHome() {
  homeRoot.innerHTML = `
    <div class="screen">
      <div class="hero">
        <span class="molly">🐄</span>
        <h2>¡Hola! Soy Molly</h2>
        <p>¿Qué aprendemos hoy? / <em>What do we learn today?</em></p>
      </div>
      <div class="branches">
        <section class="branch">
          <h3 class="branch-title">🔢 Matemáticas / <em>Math</em></h3>
          <div class="branch-grid">
            ${LEVELS.math.map(l => levelTileHTML('math', l)).join('')}
          </div>
        </section>
        <section class="branch">
          <h3 class="branch-title">🐄 La Granja / <em>The Farm</em></h3>
          <div class="branch-grid">
            ${LEVELS.touch.map(l => levelTileHTML('touch', l)).join('')}
          </div>
        </section>
      </div>
    </div>`;

  homeRoot.querySelectorAll('.level-tile:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = `#/${btn.dataset.branch}/${btn.dataset.level}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  Router(renderHome);
});
