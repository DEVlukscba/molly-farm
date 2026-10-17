import { Router, LEVELS, BRANCH_META } from './router.js';
import { isUnlocked, getProgress, resetForProfile } from './progress.js';
import {
  getProfiles, getActiveProfile, setActiveProfile,
  addProfile, removeProfile, getParentPin, setParentPin, checkParentPin,
  EMOJI_OPTIONS,
} from './profiles.js';

const homeRoot = document.getElementById('home-root');

// ─── PIN pad helpers ──────────────────────────────────────────────────────────

function pinPadHTML(prefix) {
  return `
    <div class="pin-wrap">
      <div class="pin-dots" id="${prefix}-dots">
        <span class="pin-dot"></span>
        <span class="pin-dot"></span>
        <span class="pin-dot"></span>
        <span class="pin-dot"></span>
      </div>
      <div class="pin-pad">
        ${[1,2,3,4,5,6,7,8,9,'✕',0,'⌫'].map(k => `
          <button class="pin-key${k==='✕'?' pin-key-cancel':k==='⌫'?' pin-key-del':''}"
                  data-key="${k}">${k}</button>
        `).join('')}
      </div>
      <div class="pin-error" id="${prefix}-error" hidden>PIN incorrecto · Incorrect PIN</div>
    </div>`;
}

// onComplete(digits, onWrong) — called when 4 digits entered
// onCancel() — called when ✕ pressed
function wirePinPad(container, prefix, onComplete, onCancel) {
  let digits = '';
  const dots  = container.querySelector(`#${prefix}-dots`);
  const errEl = container.querySelector(`#${prefix}-error`);

  function updateDots() {
    dots.querySelectorAll('.pin-dot').forEach((d, i) => {
      d.classList.toggle('filled', i < digits.length);
    });
  }

  container.querySelectorAll('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.key;
      if (k === '✕') { onCancel?.(); return; }
      if (k === '⌫') { digits = digits.slice(0, -1); updateDots(); return; }
      if (digits.length >= 4) return;
      digits += k;
      updateDots();
      if (digits.length === 4) {
        setTimeout(() => onComplete(digits, () => {
          digits = '';
          updateDots();
          if (errEl) { errEl.hidden = false; setTimeout(() => { errEl.hidden = true; }, 1500); }
        }), 150);
      }
    });
  });
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function showSetup({ onDone, showBack = false } = {}) {
  let selectedEmoji = EMOJI_OPTIONS[0];

  homeRoot.innerHTML = `
    <div class="screen pf-screen">
      ${showBack ? '<button class="pf-back-btn" id="pf-back">◀ Volver</button>' : ''}
      <div class="hero">
        <span class="molly">🐄</span>
        <h2>¡Hola! Soy Molly</h2>
        <p>¿Cómo se llama el niño o niña?</p>
      </div>
      <div class="pf-form">
        <input class="pf-name-input" id="pf-name" type="text" maxlength="20"
               placeholder="Nombre..." autocomplete="off" autocorrect="off" spellcheck="false">
        <div class="pf-emoji-label">Elegí un emoji:</div>
        <div class="pf-emoji-grid">
          ${EMOJI_OPTIONS.map(e => `
            <button class="pf-emoji-btn${e === selectedEmoji ? ' selected' : ''}"
                    data-emoji="${e}">${e}</button>
          `).join('')}
        </div>
        <button class="pf-primary-btn" id="pf-submit" disabled>¡Listo!</button>
      </div>
    </div>`;

  const nameInput = homeRoot.querySelector('#pf-name');
  const submitBtn = homeRoot.querySelector('#pf-submit');

  homeRoot.querySelectorAll('.pf-emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedEmoji = btn.dataset.emoji;
      homeRoot.querySelectorAll('.pf-emoji-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  nameInput.addEventListener('input', () => {
    submitBtn.disabled = nameInput.value.trim().length < 2;
  });

  submitBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name.length < 2) return;
    onDone(name, selectedEmoji);
  });

  homeRoot.querySelector('#pf-back')?.addEventListener('click', () => showParentPanel());
  nameInput.focus();
}

function showPinSetup(name, emoji) {
  homeRoot.innerHTML = `
    <div class="screen pf-screen">
      <div class="hero">
        <span class="molly">${emoji}</span>
        <h2>¡Hola, ${name}!</h2>
        <p>Ahora elegí un PIN para papá y mamá</p>
      </div>
      ${pinPadHTML('ps')}
    </div>`;

  wirePinPad(homeRoot, 'ps', (digits) => {
    addProfile(name, emoji);
    setParentPin(digits);
    enterApp();
  });
}

function showSelector() {
  const profiles = getProfiles();

  homeRoot.innerHTML = `
    <div class="screen pf-screen">
      <div class="hero">
        <span class="molly">🐄</span>
        <h2>¿Quién soy?</h2>
        <p>Tocá tu nombre · Tap your name</p>
      </div>
      <div class="pf-cards">
        ${profiles.map(p => `
          <button class="pf-card" data-id="${p.id}">
            <span class="pf-card-emoji">${p.emoji}</span>
            <span class="pf-card-name">${p.name}</span>
          </button>
        `).join('')}
      </div>
      <div class="pf-footer">
        <button class="pf-parent-btn" id="pf-parent-btn">🔑 Papá / Mamá</button>
      </div>
    </div>`;

  homeRoot.querySelectorAll('.pf-card').forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveProfile(btn.dataset.id);
      enterApp();
    });
  });

  homeRoot.querySelector('#pf-parent-btn').addEventListener('click', () => {
    showParentPin(showParentPanel);
  });
}

function showParentPin(onSuccess) {
  if (!getParentPin()) { onSuccess(); return; }

  homeRoot.innerHTML = `
    <div class="screen pf-screen">
      <div class="hero">
        <span class="molly">🔑</span>
        <h2>Área de padres</h2>
        <p>Ingresá el PIN · Enter PIN</p>
      </div>
      ${pinPadHTML('pp')}
    </div>`;

  wirePinPad(
    homeRoot, 'pp',
    (digits, onWrong) => { checkParentPin(digits) ? onSuccess() : onWrong(); },
    () => checkProfiles(),
  );
}

function showParentPanel() {
  const profiles = getProfiles();
  const hasPin   = !!getParentPin();

  homeRoot.innerHTML = `
    <div class="screen pf-screen">
      <div class="panel-header">
        <button class="pf-back-btn" id="panel-back">◀ Volver</button>
        <span class="panel-title">⚙️ Panel de padres</span>
      </div>

      <div class="panel-section">
        <div class="panel-section-title">Perfiles</div>
        ${profiles.map(p => `
          <div class="panel-profile-row">
            <span class="panel-profile-emoji">${p.emoji}</span>
            <span class="panel-profile-name">${p.name}</span>
            <button class="panel-btn panel-btn-reset" data-id="${p.id}">Resetear</button>
            <button class="panel-btn panel-btn-del" data-id="${p.id}">🗑️</button>
          </div>
        `).join('')}
        <button class="pf-primary-btn pf-secondary-btn" id="panel-add">+ Agregar hijo/a</button>
      </div>

      <div class="panel-section">
        <div class="panel-section-title">PIN de acceso</div>
        <div class="panel-pin-row">
          <span class="panel-pin-status">${hasPin ? '🔒 PIN configurado' : '🔓 Sin PIN'}</span>
          <button class="panel-btn" id="panel-change-pin">${hasPin ? 'Cambiar' : 'Configurar'}</button>
          ${hasPin ? '<button class="panel-btn panel-btn-del" id="panel-remove-pin">Quitar</button>' : ''}
        </div>
      </div>
    </div>`;

  homeRoot.querySelector('#panel-back').addEventListener('click', () => checkProfiles());

  homeRoot.querySelectorAll('.panel-btn-reset').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = profiles.find(x => x.id === btn.dataset.id);
      if (confirm(`¿Resetear el progreso de ${p?.name}?`)) {
        resetForProfile(btn.dataset.id);
      }
    });
  });

  homeRoot.querySelectorAll('.panel-btn-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = profiles.find(x => x.id === btn.dataset.id);
      if (profiles.length === 1) { alert('No podés eliminar el único perfil.'); return; }
      if (confirm(`¿Eliminar a ${p?.name}?`)) {
        removeProfile(btn.dataset.id);
        showParentPanel();
      }
    });
  });

  homeRoot.querySelector('#panel-add').addEventListener('click', () => {
    showSetup({
      showBack: true,
      onDone: (name, emoji) => { addProfile(name, emoji); showParentPanel(); },
    });
  });

  homeRoot.querySelector('#panel-change-pin').addEventListener('click', () => showChangePinFlow());

  homeRoot.querySelector('#panel-remove-pin')?.addEventListener('click', () => {
    if (confirm('¿Quitar el PIN de padres? Cualquiera podrá acceder al panel.')) {
      setParentPin(null);
      showParentPanel();
    }
  });
}

function showChangePinFlow() {
  let firstPin = null;

  function step(isConfirm) {
    homeRoot.innerHTML = `
      <div class="screen pf-screen">
        <div class="hero">
          <span class="molly">🔑</span>
          <h2>${isConfirm ? 'Confirmá el PIN' : 'Nuevo PIN'}</h2>
          <p>${isConfirm ? 'Ingresalo de nuevo para confirmar' : 'Elegí 4 números'}</p>
        </div>
        ${pinPadHTML('cp')}
      </div>`;

    wirePinPad(
      homeRoot, 'cp',
      (digits, onWrong) => {
        if (!isConfirm) { firstPin = digits; step(true); }
        else if (digits === firstPin) { setParentPin(digits); showParentPanel(); }
        else { firstPin = null; onWrong(); setTimeout(() => step(false), 900); }
      },
      () => showParentPanel(),
    );
  }

  step(false);
}

// ─── Profile check (entry point) ─────────────────────────────────────────────

function checkProfiles() {
  const profiles = getProfiles();
  if (profiles.length === 0) {
    showSetup({ onDone: (name, emoji) => showPinSetup(name, emoji) });
  } else if (profiles.length === 1) {
    setActiveProfile(profiles[0].id);
    enterApp();
  } else {
    showSelector();
  }
}

// ─── Enter app ────────────────────────────────────────────────────────────────

let routerStarted = false;

function enterApp() {
  if (!routerStarted) {
    routerStarted = true;
    Router(renderHome);
  } else {
    location.hash = '#/';
  }
}

// ─── Home screen ─────────────────────────────────────────────────────────────

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
  const child = getActiveProfile();

  homeRoot.innerHTML = `
    <div class="screen">
      <div class="hero">
        <span class="molly">${child?.emoji ?? '🐄'}</span>
        <h2>¡Hola, ${child?.name ?? 'amigo'}!</h2>
        <p>¿Qué aprendemos hoy? / <em>What do we learn today?</em></p>
      </div>
      <div class="branches">
        ${['math','touch'].map(branch => {
          const m = BRANCH_META[branch];
          return `
          <section class="branch">
            <h3 class="branch-title">${m.emoji} ${m.label.es} / <em>${m.label.en}</em></h3>
            <div class="branch-grid">
              ${LEVELS[branch].map(l => levelTileHTML(branch, l)).join('')}
            </div>
          </section>`;
        }).join('')}
      </div>
      <div class="home-footer">
        <button class="home-settings-btn" id="home-settings">⚙️ Padres</button>
      </div>
    </div>`;

  homeRoot.querySelectorAll('.level-tile:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = `#/${btn.dataset.branch}/${btn.dataset.level}`;
    });
  });

  homeRoot.querySelector('#home-settings').addEventListener('click', () => {
    showParentPin(showParentPanel);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  checkProfiles();
});
