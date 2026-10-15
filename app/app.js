import { Router, ACTIVITIES } from './router.js';

const homeRoot = document.getElementById('home-root');

function renderHome() {
  homeRoot.innerHTML = `
    <div class="screen">
      <div class="hero">
        <span class="molly">🐄</span>
        <h2>¡Hola! Soy Molly</h2>
        <p>¿Qué aprendemos hoy? / <em>What do we learn today?</em></p>
      </div>
      <div class="tiles">
        ${ACTIVITIES.map(a => `
          <button class="tile" data-id="${a.id}" aria-label="${a.label.es} / ${a.label.en}">
            <div class="tile-icon" style="background:${a.tileBackground}">${a.emoji}</div>
            <div>
              <div class="tile-label">${a.label.es} / ${a.label.en}</div>
              <div class="tile-sub">${a.sub.es} / <em>${a.sub.en}</em></div>
            </div>
          </button>
        `).join('')}
      </div>
    </div>`;

  homeRoot.querySelectorAll('.tile').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = '#/' + btn.dataset.id;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  Router(renderHome);
});
