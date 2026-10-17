// app/activities/touch.js — Touch Farm Nivel 3

const CSS_ID = 'molly-touch-css';
const CSS = `
#touch-root {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: var(--sky);
  font-family: var(--body);
}
#touch-root .t-bar {
  display: flex; align-items: center; gap: 10px; padding: 10px 16px;
  background: var(--barn); color: #FFF8EC;
  box-shadow: 0 3px 0 rgba(0,0,0,.12);
}
#touch-root .t-bar h2 { font-family: var(--display); font-size: 1.2rem; margin: 0; flex: 1; font-weight: 800; }
#touch-root .t-round { font-size: .9rem; font-weight: 700; background: rgba(255,255,255,.18); border-radius: 999px; padding: 2px 11px; white-space: nowrap; }
#touch-root .t-icon-btn { width: 44px; height: 44px; border-radius: 12px; border: none; background: rgba(255,255,255,.2); font-size: 1.4rem; display: grid; place-items: center; cursor: pointer; color: #FFF8EC; }

#touch-root .t-scr { flex: 1; display: flex; flex-direction: column; padding: 12px 14px 18px; gap: 11px; max-width: 560px; width: 100%; margin: 0 auto; }

/* HOME */
#touch-root .t-hero { text-align: center; padding-top: 5px; }
#touch-root .t-hero .t-molly { font-size: 4.2rem; line-height: 1; display: inline-block; animation: tBob 2.4s ease-in-out infinite; }
#touch-root .t-hero h2 { font-family: var(--display); font-size: 1.9rem; margin: 3px 0 0; font-weight: 800; color: var(--barn); }
#touch-root .t-hero p  { margin: 2px 0 0; color: var(--muted); font-size: 1rem; }
#touch-root .t-hero p em { color: var(--grass-d); }
#touch-root .t-tiles { display: grid; gap: 11px; }
#touch-root .t-tile { display: flex; align-items: center; gap: 13px; text-align: left; width: 100%; padding: 13px 15px; border-radius: 22px; border: none; cursor: pointer; background: var(--paper); box-shadow: 0 5px 0 var(--line); transition: transform .12s; }
#touch-root .t-tile:active { transform: translateY(3px); box-shadow: 0 2px 0 var(--line); }
#touch-root .t-ti  { font-size: 2.6rem; width: 60px; height: 60px; display: grid; place-items: center; border-radius: 18px; flex-shrink: 0; }
#touch-root .t-ti.trace  { background: #FFF1C9; }
#touch-root .t-ti.corral { background: #E3F4D4; }
#touch-root .t-ti.path   { background: #DDEBFA; }
#touch-root .t-tt { font-family: var(--display); font-size: 1.28rem; font-weight: 800; line-height: 1.1; }
#touch-root .t-ts { font-size: .92rem; color: var(--muted); line-height: 1.2; }
#touch-root .t-ts em { color: var(--grass-d); }
#touch-root .t-home-note { text-align: center; font-size: .88rem; color: var(--muted); }
#touch-root .t-speak { border: none; background: var(--paper); border-radius: 999px; padding: 5px 13px; font-size: .97rem; box-shadow: 0 3px 0 var(--line); cursor: pointer; margin-top: 5px; font-weight: 700; }
@keyframes tBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

/* PROMPT */
#touch-root .t-prompt { text-align: center; }
#touch-root .t-prompt .t-big { font-family: var(--display); font-size: 1.5rem; font-weight: 800; line-height: 1.15; }
#touch-root .t-prompt .t-en  { color: var(--grass-d); font-style: italic; font-size: 1rem; }

/* GUIDE */
#touch-root details.t-guide { background: #FFF7DC; border-radius: 16px; padding: 7px 13px; font-size: .93rem; line-height: 1.4; }
#touch-root details.t-guide summary { cursor: pointer; font-weight: 700; color: var(--soil); }
#touch-root details.t-guide p { margin: 5px 0 0; max-width: 65ch; }

/* TRACE */
#touch-root .t-trace-wrap { position: relative; width: 100%; max-width: 420px; margin: 0 auto; aspect-ratio: 1/1; max-height: 56vh; }
#touch-root .t-trace-wrap svg { width: 100%; height: 100%; display: block; touch-action: none; background: var(--paper); border-radius: 28px; box-shadow: 0 6px 0 var(--line); }
#touch-root .t-trace-hint { position: absolute; left: 0; right: 0; bottom: 9px; text-align: center; font-size: 1.75rem; pointer-events: none; }
#touch-root .t-word-bar { display: flex; gap: 7px; justify-content: center; }
#touch-root .t-wl { width: 44px; height: 50px; border-radius: 12px; background: var(--paper); box-shadow: 0 3px 0 var(--line); display: grid; place-items: center; font-family: var(--display); font-size: 1.7rem; font-weight: 800; color: var(--muted); }
#touch-root .t-wl.ok  { background: #E3F4D4; color: var(--grass-d); }
#touch-root .t-wl.now { background: var(--wheat); color: var(--ink); }
#touch-root .t-wl-emoji { font-size: 1.9rem; display: grid; place-items: center; margin-left: 3px; }

/* CORRAL */
#touch-root .t-field { position: relative; width: 100%; flex: 1; min-height: 360px; border-radius: 28px; overflow: hidden; touch-action: none; background: linear-gradient(var(--grass) 0 0) top/100% 100% no-repeat; box-shadow: 0 6px 0 var(--grass-d); }
#touch-root .t-pen { position: absolute; left: 50%; bottom: 13px; transform: translateX(-50%); width: 64%; height: 36%; border: 6px solid var(--soil); border-top-style: dashed; border-radius: 16px; background: rgba(255,255,255,.18); display: flex; align-items: flex-start; justify-content: center; }
#touch-root .t-pen.t-pen0, #touch-root .t-pen.t-pen1 { width: 46%; height: 38%; transform: none; left: auto; }
#touch-root .t-pen.t-pen0 { left: 2.5%; border-color: #B5523B; }
#touch-root .t-pen.t-pen1 { right: 2.5%; border-color: #3B6FB5; }
#touch-root .t-pen-count { margin-top: -20px; background: var(--soil); color: #FFF8EC; font-family: var(--display); font-weight: 800; font-size: 1rem; border-radius: 999px; padding: 0 14px; line-height: 1.6; white-space: nowrap; }
#touch-root .t-pen.t-pen0 .t-pen-count { background: #B5523B; }
#touch-root .t-pen.t-pen1 .t-pen-count { background: #3B6FB5; }
#touch-root .t-critter { position: absolute; font-size: 2.5rem; line-height: 1; width: 52px; height: 52px; display: grid; place-items: center; cursor: grab; touch-action: none; transition: transform .1s; filter: drop-shadow(0 3px 0 rgba(0,0,0,.18)); }
#touch-root .t-critter.drag { transform: scale(1.25); z-index: 3; cursor: grabbing; }
#touch-root .t-done-btn { border: none; border-radius: 20px; padding: 13px; font-size: 1.35rem; font-weight: 800; font-family: var(--display); background: var(--wheat); color: var(--ink); box-shadow: 0 5px 0 #C99A1E; cursor: pointer; }
#touch-root .t-done-btn:active { transform: translateY(3px); box-shadow: 0 2px 0 #C99A1E; }

/* PATH */
#touch-root .t-grid { display: grid; gap: 5px; width: 100%; max-width: 370px; margin: 0 auto; padding: 7px; border-radius: 22px; background: var(--grass-d); }
#touch-root .t-cell { aspect-ratio: 1/1; background: var(--grass); border-radius: 11px; display: grid; place-items: center; font-size: 1.9rem; position: relative; }
#touch-root .t-cell.trail::after { content: ''; position: absolute; width: 22%; height: 22%; border-radius: 50%; background: rgba(255,255,255,.65); }
#touch-root .t-program { min-height: 60px; background: var(--paper); border-radius: 18px; box-shadow: 0 4px 0 var(--line); display: flex; flex-wrap: wrap; gap: 5px; padding: 7px; align-items: center; }
#touch-root .t-program .t-empty { color: var(--muted); font-size: .97rem; padding-left: 5px; }
#touch-root .t-chip { font-size: 1.55rem; width: 42px; height: 42px; border-radius: 12px; background: #EEF6FF; display: grid; place-items: center; }
#touch-root .t-chip.now { background: var(--wheat); transform: scale(1.12); }
#touch-root .t-block { position: relative; font-size: 1.4rem; min-width: 44px; height: 44px; padding: 0 5px; border-radius: 12px; background: #EEF6FF; display: flex; align-items: center; gap: 2px; }
#touch-root .t-block.now { background: var(--wheat); transform: scale(1.1); }
#touch-root .t-times { font-family: var(--display); font-weight: 800; font-size: 1.05rem; color: var(--soil); }
#touch-root .t-bag { margin-top: 3px; font-weight: 800; font-size: 1.05rem; color: var(--soil); }
#touch-root .t-pad { display: grid; grid-template-columns: repeat(4,1fr); gap: 9px; }
#touch-root .t-pad button { border: none; border-radius: 18px; background: var(--paper); box-shadow: 0 5px 0 var(--line); font-size: 2rem; height: 68px; cursor: pointer; }
#touch-root .t-pad button:active { transform: translateY(3px); box-shadow: 0 2px 0 var(--line); }
#touch-root .t-rep { display: grid; grid-template-columns: auto repeat(4,1fr); gap: 7px; align-items: center; }
#touch-root .t-rep span { font-size: 1.75rem; }
#touch-root .t-rep button { border: none; border-radius: 16px; height: 52px; font-size: 1.35rem; font-weight: 800; font-family: var(--display); background: #FFF1C9; color: var(--soil); box-shadow: 0 4px 0 #E6CF8A; cursor: pointer; }
#touch-root .t-rep button:disabled { opacity: .45; }
#touch-root .t-rep button:active { transform: translateY(3px); box-shadow: 0 1px 0 #E6CF8A; }
#touch-root .t-run-row { display: grid; grid-template-columns: 1fr 2fr; gap: 9px; }
#touch-root .t-run-row button { border: none; border-radius: 18px; height: 62px; font-size: 1.25rem; font-weight: 800; font-family: var(--display); cursor: pointer; }
#touch-root .t-btn-undo { background: #F3E6E1; color: var(--barn); box-shadow: 0 5px 0 #DCC6BE; }
#touch-root .t-btn-run  { background: var(--ok); color: #fff; box-shadow: 0 5px 0 #1F7438; }
#touch-root .t-run-row button:disabled { opacity: .5; }

/* TOAST */
#touch-root .t-toast { position: fixed; inset: 0; display: grid; place-items: center; z-index: 20; background: rgba(58,42,28,.35); padding: 15px; }
#touch-root .t-toast[hidden] { display: none!important; }
#touch-root .t-toast-card { background: var(--paper); border-radius: 28px; padding: 20px 24px; text-align: center; max-width: 330px; width: 100%; box-shadow: 0 8px 0 var(--line); animation: tPop .35s ease; }
#touch-root .t-toast-card .t-te { font-size: 3.8rem; line-height: 1; }
#touch-root .t-toast-card .t-tm { font-family: var(--display); font-size: 1.5rem; font-weight: 800; margin-top: 5px; }
#touch-root .t-toast-card .t-tm2 { color: var(--grass-d); font-style: italic; }
#touch-root .t-toast-card button { margin-top: 13px; border: none; border-radius: 18px; padding: 11px 24px; font-size: 1.25rem; font-weight: 800; font-family: var(--display); background: var(--ok); color: #fff; box-shadow: 0 5px 0 #1F7438; cursor: pointer; }
#touch-root .t-toast-card.oops button { background: var(--barn); box-shadow: 0 5px 0 #8E2E1E; }
@keyframes tPop { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
@keyframes tPulse { 0%,100%{r:4} 50%{r:6.5} }
`;

function injectCSS() {
  if (document.getElementById(CSS_ID)) return;
  const s = document.createElement('style');
  s.id = CSS_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}

// ─── TTS ─────────────────────────────────────────────────────────────────────
let _voices = [], _HAS_TTS = ('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window);
function _loadVoices() { try { _voices = speechSynthesis.getVoices() || []; } catch (e) {} }
if (_HAS_TTS) { try { _loadVoices(); speechSynthesis.addEventListener('voiceschanged', _loadVoices); } catch (e) {} }
function _pickVoice(lang) {
  const L = lang.toLowerCase(), pre = L.slice(0, 2);
  return _voices.find(v => (v.lang||'').toLowerCase().replace('_','-') === L)
      || _voices.find(v => (v.lang||'').toLowerCase().indexOf(pre) === 0 && v.localService)
      || _voices.find(v => (v.lang||'').toLowerCase().indexOf(pre) === 0);
}
function _utter(text, lang) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang; u.rate = .9; u.pitch = 1.1; u.volume = 1;
  const v = _pickVoice(lang); if (v) u.voice = v;
  return u;
}
let _speakTimer = null;
function _speakList(list) {
  if (!_HAS_TTS) return;
  try { speechSynthesis.cancel(); } catch (e) {}
  clearTimeout(_speakTimer);
  _speakTimer = setTimeout(() => {
    try {
      if (!_voices.length) _loadVoices();
      list.forEach(it => { if (it[0]) speechSynthesis.speak(_utter(it[0], it[1])); });
      speechSynthesis.resume();
    } catch (e) {}
  }, 120);
}
function say(text, lang) { _speakList([[text, lang || 'es-AR']]); }
function sayBoth(es, en) { _speakList([[es,'es-AR'],[en,'en-US']]); }

const NUM_ES = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez'];
const NUM_EN = ['zero','one','two','three','four','five','six','seven','eight','nine','ten'];

// ─── MAIN RENDER ─────────────────────────────────────────────────────────────
export function render(root) {
  injectCSS();
  try { speechSynthesis.cancel(); } catch (e) {}

  root.innerHTML = `
<div id="touch-root">
  <div class="t-bar">
    <button class="t-icon-btn" id="t-home-btn" hidden>🏠</button>
    <h2 id="t-bar-title">🐄 Touch Farm · Nivel 3</h2>
    <span class="t-round" id="t-round" hidden></span>
  </div>

  <!-- HOME -->
  <section class="t-scr" id="t-home">
    <div class="t-hero">
      <span class="t-molly">🐄</span>
      <h2>¡Nivel 3, Elena!</h2>
      <p>¡Ahora sos una experta! · <em>You are an expert now!</em></p>
    </div>
    <div class="t-tiles">
      <button class="t-tile" data-go="trace">
        <span class="t-ti trace">✍️</span>
        <span><span class="t-tt">Trazar con el dedo</span><br><span class="t-ts">El 10 y palabras: PIG, DOG, SUN · <em>Write words</em></span></span>
      </button>
      <button class="t-tile" data-go="corral">
        <span class="t-ti corral">🐑</span>
        <span><span class="t-tt">Dos corrales</span><br><span class="t-ts">Separá y repartí en partes iguales · <em>Sort &amp; share</em></span></span>
      </button>
      <button class="t-tile" data-go="path">
        <span class="t-ti path">🧭</span>
        <span><span class="t-tt">El camino de Molly</span><br><span class="t-ts">Usá el bloque REPETIR 🔁 · <em>Use loops!</em></span></span>
      </button>
    </div>
    <div class="t-home-note">
      <button class="t-speak" id="t-sound-test">🔊 Probar sonido</button>
      <div id="t-sound-msg" style="margin-top:5px"></div>
    </div>
  </section>

  <!-- TRACE -->
  <section class="t-scr" id="t-trace" hidden>
    <div class="t-prompt">
      <div class="t-big" id="t-tr-prompt"></div>
      <div class="t-en" id="t-tr-prompt-en"></div>
      <button class="t-speak" id="t-tr-speak">🔊 Escuchar</button>
    </div>
    <div class="t-word-bar" id="t-tr-word" hidden></div>
    <div class="t-trace-wrap">
      <svg id="t-tr-svg" viewBox="0 0 100 100" aria-label="Zona para trazar"></svg>
      <div class="t-trace-hint" id="t-tr-hint"></div>
    </div>
    <div class="t-run-row">
      <button class="t-btn-undo" id="t-tr-reset">↺ Borrar</button>
      <button class="t-btn-run" id="t-tr-skip" style="background:var(--wheat);color:var(--ink);box-shadow:0 5px 0 #C99A1E">Saltar ▶</button>
    </div>
    <details class="t-guide">
      <summary>👨‍👩‍👧 Para papá y mamá</summary>
      <p><strong>Números de dos cifras y palabras con curvas.</strong> Ahora escribe el 10 y palabras con letras curvas: P, G, D, S, U.</p>
      <p>💡 La S es la más difícil: "arriba como una C, abajo como una C dada vuelta".</p>
    </details>
  </section>

  <!-- CORRAL -->
  <section class="t-scr" id="t-corral" hidden>
    <div class="t-prompt">
      <div class="t-big" id="t-co-prompt"></div>
      <div class="t-en" id="t-co-prompt-en"></div>
      <button class="t-speak" id="t-co-speak">🔊 Escuchar</button>
    </div>
    <div class="t-field" id="t-co-field">
      <div class="t-pen t-pen0" id="t-co-pen0"><span class="t-pen-count" id="t-co-count0">0</span></div>
      <div class="t-pen t-pen1" id="t-co-pen1"><span class="t-pen-count" id="t-co-count1">0</span></div>
    </div>
    <button class="t-done-btn" id="t-co-done">¡Listo! ✅</button>
    <details class="t-guide">
      <summary>👨‍👩‍👧 Para papá y mamá</summary>
      <p><strong>Clasificar en dos grupos y repartir en partes iguales.</strong> Dos corrales: separa por tipo, después cuenta, y al final reparte en partes iguales (primera idea de división).</p>
      <p>💡 Para repartir: "una para vos, una para mí" — un animal a cada corral por turnos.</p>
    </details>
  </section>

  <!-- PATH -->
  <section class="t-scr" id="t-path" hidden>
    <div class="t-prompt">
      <div class="t-big">Llegá al pasto 🌾 con pocos bloques</div>
      <div class="t-en">Flecha + 🔁 cuántas veces · Arrow + repeat</div>
      <div class="t-bag" id="t-pa-bag"></div>
    </div>
    <div class="t-grid" id="t-pa-grid"></div>
    <div class="t-program" id="t-pa-program"></div>
    <div class="t-pad" id="t-pad">
      <button data-d="L" aria-label="Izquierda">⬅️</button>
      <button data-d="U" aria-label="Arriba">⬆️</button>
      <button data-d="D" aria-label="Abajo">⬇️</button>
      <button data-d="R" aria-label="Derecha">➡️</button>
    </div>
    <div class="t-rep" id="t-rep">
      <span>🔁</span>
      <button data-n="2">×2</button><button data-n="3">×3</button><button data-n="4">×4</button><button data-n="5">×5</button>
    </div>
    <div class="t-run-row">
      <button class="t-btn-undo" id="t-pa-undo">⌫ Borrar</button>
      <button class="t-btn-run" id="t-pa-run">▶ ¡Andá, Molly!</button>
    </div>
    <details class="t-guide">
      <summary>👨‍👩‍👧 Para papá y mamá</summary>
      <p><strong>Loops: el bloque REPETIR.</strong> Cada ronda permite pocos bloques. Hay que usar 🔁: "➡️ ×4" en vez de cuatro flechas. Es el concepto de bucle de programación.</p>
      <p>💡 Primero que cuente los pasos con el dedo sobre la grilla, después que arme el bloque: tocar ➡️ y luego ×4.</p>
    </details>
  </section>

  <div class="t-toast" id="t-toast" hidden>
    <div class="t-toast-card" id="t-toast-card">
      <div class="t-te" id="t-toast-e"></div>
      <div class="t-tm" id="t-toast-m"></div>
      <div class="t-tm2" id="t-toast-m2"></div>
      <button id="t-toast-btn">Seguir ▶</button>
    </div>
  </div>
</div>`;

  // ── NAVIGATION ───────────────────────────────────────────────────────────
  const SCREENS = ['t-home','t-trace','t-corral','t-path'];
  const TITLES = {
    't-home':   '🐄 Touch Farm · Nivel 3',
    't-trace':  '✍️ Trazar',
    't-corral': '🐑 Dos corrales',
    't-path':   '🧭 El camino de Molly'
  };

  function show(id) {
    SCREENS.forEach(s => document.getElementById(s).hidden = (s !== id));
    document.getElementById('t-bar-title').textContent = TITLES[id];
    document.getElementById('t-home-btn').hidden = (id === 't-home');
    document.getElementById('t-round').hidden = (id === 't-home');
    root.scrollTop = 0; window.scrollTo(0, 0);
    if (id === 't-trace')  trStart();
    if (id === 't-corral') coStart();
    if (id === 't-path')   paStart();
  }

  function setRound(i, n) {
    const el = document.getElementById('t-round');
    el.hidden = false; el.textContent = (i+1) + ' / ' + n;
  }

  document.querySelectorAll('[data-go]').forEach(b =>
    b.addEventListener('click', () => show('t-' + b.dataset.go))
  );
  document.getElementById('t-home-btn').addEventListener('click', () => {
    try { speechSynthesis.cancel(); } catch (e) {}
    show('t-home');
  });

  // ── TOAST ────────────────────────────────────────────────────────────────
  let toastCb = null;
  function toast(ok, emoji, msg, msg2, btn, cb) {
    const card = document.getElementById('t-toast-card');
    card.classList.toggle('oops', !ok);
    document.getElementById('t-toast-e').textContent = emoji;
    document.getElementById('t-toast-m').textContent = msg;
    document.getElementById('t-toast-m2').textContent = msg2 || '';
    document.getElementById('t-toast-btn').textContent = btn || 'Seguir ▶';
    toastCb = cb;
    document.getElementById('t-toast').hidden = false;
  }
  document.getElementById('t-toast-btn').addEventListener('click', () => {
    document.getElementById('t-toast').hidden = true;
    const cb = toastCb; toastCb = null; if (cb) cb();
  });

  function finish(game, emoji) {
    toast(true,'🏆','¡Terminaste! ¡Muy bien, Elena!','You did it! ' + emoji,'🏠 Volver', () => show('t-home'));
    sayBoth('¡Terminaste! ¡Muy bien, Elena!','Great job!');
  }

  // ── SOUND TEST ───────────────────────────────────────────────────────────
  document.getElementById('t-sound-test').addEventListener('click', () => {
    const m = document.getElementById('t-sound-msg');
    if (!_HAS_TTS) { m.innerHTML = '🔇 Este navegador no tiene voz. Usá <strong>Chrome</strong>.'; return; }
    _loadVoices();
    sayBoth('¡Hola Elena! Soy Molly', 'Hello! I am Molly');
    const es = _pickVoice('es-AR'), en = _pickVoice('en-US');
    m.textContent = 'Voces: '+(es?'español ✅':'español ❌')+' · '+(en?'inglés ✅':'inglés ❌');
  });
  document.getElementById('t-tr-speak').addEventListener('click', () => {
    const R = TRACE_ROUNDS[tr.i];
    sayBoth(R.isNum ? 'Escribí el diez. Ahora el '+(curGlyph()==='1'?'uno':'cero') : 'Escribí '+R.es+'. Ahora la letra '+curGlyph(), R.isNum ? 'ten' : R.en+'. '+curGlyph());
  });
  document.getElementById('t-co-speak').addEventListener('click', () => {
    const t = coTexts(CORRAL[co.i]); sayBoth(t[2], t[1]);
  });

  // ════════════════════════════════════════════════════════════════════════════
  // 1. TRACE
  // ════════════════════════════════════════════════════════════════════════════
  function arc(cx,cy,r,a0,a1){ return ell(cx,cy,r,r,a0,a1); }
  function ell(cx,cy,rx,ry,a0,a1){
    const pts=[], step=a1>a0?12:-12;
    for(let a=a0; (step>0?a<=a1:a>=a1); a+=step){ const t=a*Math.PI/180; pts.push([cx+rx*Math.cos(t), cy+ry*Math.sin(t)]); }
    const t1=a1*Math.PI/180; pts.push([cx+rx*Math.cos(t1), cy+ry*Math.sin(t1)]);
    return pts;
  }
  const SHAPES = {
    '1': [[[38,28],[52,15],[52,86]]],
    '0': [ell(50,50,24,35,270,-90)],
    'P': [[[30,86],[30,16],[50,16]].concat(arc(50,34,18,-90,90).slice(1)).concat([[30,52]])],
    'I': [[[50,16],[50,86]]],
    'G': [arc(52,51,32,318,42).concat([[76,56],[58,56]])],
    'D': [[[30,16],[30,86]],[[30,16],[44,16]].concat(arc(44,51,35,-90,90).slice(1)).concat([[30,86]])],
    'O': [arc(50,50,32,270,-90)],
    'S': [arc(50,32,18,330,90).concat(arc(50,68,18,270,510).slice(1))],
    'U': [[[28,16],[28,62]].concat(arc(50,62,22,180,0).slice(1)).concat([[72,16]])],
    'N': [[[28,84],[28,16],[72,84],[72,16]]],
  };
  const TRACE_ROUNDS = [
    {word:'10',  emoji:'🔟', es:'diez',     en:'ten', isNum:true},
    {word:'PIG', emoji:'🐷', es:'chanchito', en:'pig'},
    {word:'DOG', emoji:'🐶', es:'perro',    en:'dog'},
    {word:'SUN', emoji:'☀️', es:'sol',      en:'sun'},
  ];
  function densify(pl, gap) {
    const out=[pl[0]];
    for(let i=1;i<pl.length;i++){
      const a=pl[i-1], b=pl[i], d=Math.hypot(b[0]-a[0],b[1]-a[1]), n=Math.max(1,Math.round(d/gap));
      for(let k=1;k<=n;k++) out.push([a[0]+(b[0]-a[0])*k/n, a[1]+(b[1]-a[1])*k/n]);
    }
    return out;
  }
  const svgNS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs) { const e=document.createElementNS(svgNS,tag); for(const k in attrs) e.setAttribute(k,attrs[k]); return e; }
  function ptsStr(p) { return p.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' '); }

  const tr = {i:0, li:0, stroke:0, idx:0, pts:[], drawing:false, done:false};
  function curGlyph() { return TRACE_ROUNDS[tr.i].word[tr.li]; }

  function trStart() { tr.i=0; tr.li=0; trRender(); }

  function trWordBar() {
    const R=TRACE_ROUNDS[tr.i], w=document.getElementById('t-tr-word');
    w.hidden=false;
    w.innerHTML=R.word.split('').map((ch,k)=>
      `<span class="t-wl${k<tr.li?' ok':''}${k===tr.li?' now':''}">${k<=tr.li?ch:'_'}</span>`
    ).join('')+`<span class="t-wl-emoji">${R.emoji}</span>`;
  }

  function trRender(announce) {
    const R=TRACE_ROUNDS[tr.i], g=curGlyph();
    setRound(tr.i, TRACE_ROUNDS.length);
    tr.stroke=0; tr.idx=0; tr.done=false; tr.donePath=null;
    tr.pts=SHAPES[g].map(s=>densify(s,6));
    if(R.isNum){
      document.getElementById('t-tr-prompt').textContent='Escribí el número '+R.word+' · ahora el '+g;
      document.getElementById('t-tr-prompt-en').textContent='Write number ten — '+(g==='1'?'one':'zero');
    } else {
      document.getElementById('t-tr-prompt').textContent='Escribí '+R.word+' '+R.emoji+' · letra '+g;
      document.getElementById('t-tr-prompt-en').textContent='Write the word '+R.en+' — '+R.es+' · letter '+g;
    }
    trWordBar();
    const svg=document.getElementById('t-tr-svg'); svg.innerHTML='';
    SHAPES[g].forEach(s=>{
      svg.appendChild(svgEl('polyline',{points:ptsStr(s),fill:'none',stroke:'#EFE6D2','stroke-width':14,'stroke-linecap':'round','stroke-linejoin':'round'}));
    });
    tr.pts.forEach((p,si)=>{
      p.forEach(q=>svg.appendChild(svgEl('circle',{cx:q[0],cy:q[1],r:1.3,fill:'#C9B99A'})));
      svg.appendChild(svgEl('circle',{cx:p[0][0],cy:p[0][1],r:5.2,fill:si===0?'#2E9E4F':'#9CCFA9'}));
      const t=svgEl('text',{x:p[0][0],y:p[0][1]+2.1,'text-anchor':'middle','font-size':'6','font-weight':'800',fill:'#fff','font-family':'Arial'}); t.textContent=si+1; svg.appendChild(t);
    });
    tr.layer=svgEl('g',{}); svg.appendChild(tr.layer);
    tr.inkG=svgEl('g',{}); svg.appendChild(tr.inkG);
    tr.target=svgEl('circle',{cx:0,cy:0,r:4,fill:'#F6C445',stroke:'#C99A1E','stroke-width':1});
    tr.target.style.animation='tPulse 1s infinite';
    svg.appendChild(tr.target);
    tr.doneSoFar=[];
    trUpdateTarget();
    document.getElementById('t-tr-hint').textContent='👆';
    if(announce!==false){
      if(tr.li===0) sayBoth(R.isNum?'Vamos a escribir el diez: un uno y un cero':'Vamos a escribir '+R.es+'. '+R.word.split('').join(', '), R.en);
      else say(R.isNum?'Ahora el cero':g, R.isNum?'es-AR':'en-US');
    }
  }

  function trUpdateTarget() {
    const p=tr.pts[tr.stroke];
    if(!p){ tr.target.setAttribute('r',0); return; }
    const q=p[Math.min(tr.idx,p.length-1)];
    tr.target.setAttribute('cx',q[0]); tr.target.setAttribute('cy',q[1]);
  }

  function trPoint(ev) {
    const r=document.getElementById('t-tr-svg').getBoundingClientRect();
    return [(ev.clientX-r.left)/r.width*100, (ev.clientY-r.top)/r.height*100];
  }

  function trAdvance(p) {
    if(tr.done) return;
    let pts=tr.pts[tr.stroke], moved=true;
    while(moved && pts){
      moved=false;
      for(let look=0; look<3 && tr.idx+look<pts.length; look++){
        const q=pts[tr.idx+look];
        if(Math.hypot(p[0]-q[0],p[1]-q[1])<9){
          for(let k=0;k<=look;k++) tr.doneSoFar.push(pts[tr.idx+k]);
          tr.idx+=look+1; moved=true; break;
        }
        if(tr.idx===0) break;
      }
      if(tr.idx>=pts.length){
        tr.stroke++; tr.idx=0; tr.doneSoFar.push(null);
        pts=tr.pts[tr.stroke];
        if(!pts){ trComplete(); return; }
        moved=false;
      }
    }
    const segs=[[]]; tr.doneSoFar.forEach(q=>{ if(q===null) segs.push([]); else segs[segs.length-1].push(q); });
    const d=segs.filter(s=>s.length).map(s=>'M'+s.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L')).join(' ');
    if(!tr.donePath){ tr.donePath=svgEl('path',{d:'',fill:'none',stroke:'#7BC043','stroke-width':11,'stroke-linecap':'round','stroke-linejoin':'round'}); tr.layer.appendChild(tr.donePath); }
    tr.donePath.setAttribute('d',d);
    trUpdateTarget();
  }

  function trNextRound() {
    if(tr.i>=TRACE_ROUNDS.length-1) finish('trace','✍️');
    else { tr.i++; tr.li=0; trRender(); }
  }

  function trComplete() {
    tr.done=true; trUpdateTarget();
    const R=TRACE_ROUNDS[tr.i];
    document.getElementById('t-tr-hint').textContent='⭐';
    if(tr.li<R.word.length-1){ tr.li++; trWordBar(); setTimeout(()=>trRender(), 500); return; }
    tr.li=R.word.length; trWordBar();
    setTimeout(()=>{
      const last=tr.i>=TRACE_ROUNDS.length-1, btn=last?'🏆 Terminar':'Seguir ▶';
      if(R.isNum){
        toast(true,'🔟','¡Escribiste el 10!','ten! 1 + 0',btn,trNextRound);
        sayBoth('¡Muy bien! Diez: un uno y un cero','ten');
      } else {
        toast(true,R.emoji,'¡Escribiste '+R.word+'!',R.en+' = '+R.es,btn,trNextRound);
        sayBoth('¡Muy bien! '+R.es, R.word.split('').join(', ')+'. '+R.en);
      }
    },300);
  }

  (()=>{
    const svg=document.getElementById('t-tr-svg');
    svg.addEventListener('pointerdown', ev=>{
      ev.preventDefault(); try{svg.setPointerCapture(ev.pointerId);}catch(e){}
      tr.drawing=true; document.getElementById('t-tr-hint').textContent='';
      const p=trPoint(ev);
      tr.ink=svgEl('polyline',{points:ptsStr([p]),fill:'none',stroke:'#3B82C4','stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round',opacity:.75});
      tr.inkG.appendChild(tr.ink); tr.inkPts=[p]; trAdvance(p);
    });
    svg.addEventListener('pointermove', ev=>{
      if(!tr.drawing) return; ev.preventDefault();
      const list=ev.getCoalescedEvents?ev.getCoalescedEvents():[ev];
      list.forEach(e=>{ const p=trPoint(e); tr.inkPts.push(p); trAdvance(p); });
      if(tr.ink) tr.ink.setAttribute('points',ptsStr(tr.inkPts));
    });
    const up=()=>{ tr.drawing=false; };
    svg.addEventListener('pointerup',up); svg.addEventListener('pointercancel',up);
  })();

  document.getElementById('t-tr-reset').addEventListener('click', ()=>trRender(false));
  document.getElementById('t-tr-skip').addEventListener('click', trNextRound);

  // ════════════════════════════════════════════════════════════════════════════
  // 2. CORRAL
  // ════════════════════════════════════════════════════════════════════════════
  const ANIMALS = {'🐑':['ovejas','sheep'],'🐔':['gallinas','hens'],'🐷':['chanchitos','pigs'],'🐄':['vaquitas','cows'],'🦆':['patitos','ducks']};
  const CORRAL = [
    { mode:'sort',  mix:{'🐑':4,'🐷':3}, pens:['🐑','🐷'] },
    { mode:'count', mix:{'🐑':5,'🐔':6,'🐄':2}, pens:['🐑','🐔'], n:[3,4] },
    { mode:'share', mix:{'🐔':6}, a:'🐔' },
    { mode:'share', mix:{'🐷':8}, a:'🐷' },
  ];
  const co = {i:0};

  function coStart() { co.i=0; coRender(); }

  function coTexts(R) {
    if(R.mode==='sort'){
      const a=ANIMALS[R.pens[0]], b=ANIMALS[R.pens[1]];
      return ['Todas las '+a[0]+' '+R.pens[0]+' a la izquierda y todos los '+b[0]+' '+R.pens[1]+' a la derecha',
              'Sort them: '+a[1]+' left, '+b[1]+' right',
              'Separá los animales. Todas las '+a[0]+' en la izquierda y todos los '+b[0]+' en la derecha'];
    }
    if(R.mode==='count'){
      const a=ANIMALS[R.pens[0]], b=ANIMALS[R.pens[1]];
      return [R.n[0]+' '+a[0]+' '+R.pens[0]+' a la izquierda y '+R.n[1]+' '+b[0]+' '+R.pens[1]+' a la derecha',
              NUM_EN[R.n[0]]+' '+a[1]+' left, '+NUM_EN[R.n[1]]+' '+b[1]+' right',
              'Meté '+NUM_ES[R.n[0]]+' '+a[0]+' en la izquierda y '+NUM_ES[R.n[1]]+' '+b[0]+' en la derecha'];
    }
    const t=R.mix[R.a], nm=ANIMALS[R.a];
    return ['Repartí las '+t+' '+nm[0]+' '+R.a+': ¡los dos corrales con la misma cantidad!',
            'Share '+NUM_EN[t]+' '+nm[1]+' equally',
            'Repartí las '+NUM_ES[t]+' '+nm[0]+' en los dos corrales iguales'];
  }

  function coRender() {
    const R=CORRAL[co.i]; setRound(co.i,CORRAL.length);
    const t=coTexts(R);
    document.getElementById('t-co-prompt').textContent=t[0];
    document.getElementById('t-co-prompt-en').textContent=t[1];
    const f=document.getElementById('t-co-field');
    f.querySelectorAll('.t-critter').forEach(c=>c.remove());
    const list=[];
    Object.keys(R.mix).forEach(a=>{ for(let k=0;k<R.mix[a];k++) list.push(a); });
    list.sort(()=>Math.random()-.5);
    requestAnimationFrame(()=>{
      const W=f.clientWidth, H=f.clientHeight, top=H*0.52, placed=[];
      list.forEach(a=>{
        let x,y,tries=0;
        do{ x=6+Math.random()*(W-58); y=6+Math.random()*(top-58); tries++; }
        while(tries<90 && placed.some(p=>Math.hypot(p[0]-x,p[1]-y)<52));
        placed.push([x,y]);
        f.appendChild(makeCritter(a,x,y));
      });
      coCount();
    });
    sayBoth(t[2],t[1]);
  }

  function makeCritter(a,x,y){
    const c=document.createElement('div');
    c.className='t-critter'; c.textContent=a; c.dataset.a=a; c.dataset.pen='-1';
    c.style.left=x+'px'; c.style.top=y+'px'; coDrag(c); return c;
  }

  function coTally(){
    const t={'-1':{},'0':{},'1':{}};
    document.querySelectorAll('#t-co-field .t-critter').forEach(c=>{
      const p=c.dataset.pen; t[p][c.dataset.a]=(t[p][c.dataset.a]||0)+1;
    });
    return t;
  }
  function sumPen(o){ return Object.keys(o).reduce((s,k)=>s+o[k],0); }

  function coCount(){
    const R=CORRAL[co.i], t=coTally();
    [0,1].forEach(p=>{
      let lbl;
      if(R.mode==='share') lbl=R.a+' '+sumPen(t[p]);
      else if(R.mode==='count') lbl=R.pens[p]+' '+(t[p][R.pens[p]]||0)+' / '+R.n[p];
      else lbl=R.pens[p]+' '+(t[p][R.pens[p]]||0);
      document.getElementById('t-co-count'+p).textContent=lbl;
    });
  }

  function penOf(c){
    const r=c.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
    for(let p=0;p<2;p++){
      const b=document.getElementById('t-co-pen'+p).getBoundingClientRect();
      if(cx>b.left && cx<b.right && cy>b.top && cy<b.bottom) return p;
    }
    return -1;
  }

  function coDrag(c){
    let sx,sy,ox,oy;
    c.addEventListener('pointerdown', ev=>{
      ev.preventDefault(); try{c.setPointerCapture(ev.pointerId);}catch(e){}
      sx=ev.clientX; sy=ev.clientY; ox=c.offsetLeft; oy=c.offsetTop; c.classList.add('drag');
    });
    c.addEventListener('pointermove', ev=>{
      if(!c.classList.contains('drag')) return;
      const f=document.getElementById('t-co-field');
      c.style.left=Math.max(0,Math.min(f.clientWidth-52, ox+ev.clientX-sx))+'px';
      c.style.top=Math.max(0,Math.min(f.clientHeight-52, oy+ev.clientY-sy))+'px';
    });
    function drop(){
      if(!c.classList.contains('drag')) return;
      c.classList.remove('drag');
      const was=+c.dataset.pen, now=penOf(c);
      if(now===was) return;
      c.dataset.pen=String(now); coCount();
      if(now<0) return;
      const R=CORRAL[co.i], t=coTally();
      if(R.mode!=='share' && c.dataset.a!==R.pens[now]){
        say('¡Ups! Ese corral es para '+ANIMALS[R.pens[now]][0],'es-AR');
      } else {
        const n=R.mode==='share'?sumPen(t[now]):(t[now][c.dataset.a]||0);
        say(NUM_ES[n]||String(n),'es-AR');
      }
    }
    c.addEventListener('pointerup',drop); c.addEventListener('pointercancel',drop);
  }

  function coCheck(R,t){
    if(R.mode==='sort'){
      const outside=sumPen(t['-1']);
      const wrong=(sumPen(t[0])-(t[0][R.pens[0]]||0))+(sumPen(t[1])-(t[1][R.pens[1]]||0));
      if(wrong) return ['🙈','Hay un animal en el corral equivocado','Wrong pen!','Hay un animal en el corral equivocado'];
      if(outside) return ['🤔','Todavía quedan animales afuera','Some are still outside!','Todavía quedan animales afuera'];
      return null;
    }
    if(R.mode==='count'){
      for(let p=0;p<2;p++){
        const a=R.pens[p], ok=t[p][a]||0, bad=sumPen(t[p])-ok, side=p?'derecha':'izquierda';
        if(bad) return ['🙈','En el corral de la '+side+' hay un animal que no va','Wrong animal!','En el corral de la '+side+' hay un animal que no va'];
        if(ok!==R.n[p]) return [ok<R.n[p]?'🤔':'😅','En la '+side+' hay '+ok+' y pedimos '+R.n[p],ok<R.n[p]?'Need more!':'Too many!','En la '+side+' hay '+(NUM_ES[ok]||ok)+' y pedimos '+NUM_ES[R.n[p]]];
      }
      return null;
    }
    const a0=sumPen(t[0]), a1=sumPen(t[1]), out=sumPen(t['-1']);
    if(out) return ['🤔','Quedan '+out+' afuera: ¡hay que repartir todas!','Share them all!','Todavía quedan animales afuera'];
    if(a0!==a1) return ['⚖️','Un corral tiene '+a0+' y el otro '+a1+': no es igual','Not the same!','Un corral tiene '+NUM_ES[a0]+' y el otro '+NUM_ES[a1]+'. Tienen que ser iguales'];
    return null;
  }

  document.getElementById('t-co-done').addEventListener('click', ()=>{
    const R=CORRAL[co.i], t=coTally(), last=co.i>=CORRAL.length-1, err=coCheck(R,t);
    if(err){ toast(false,err[0],err[1],err[2],'Probar de nuevo',null); say(err[3],'es-AR'); return; }
    let e, m1, m2, v;
    if(R.mode==='share'){
      const half=R.mix[R.a]/2;
      e=Array(half).fill(R.a).join('')+' | '+Array(half).fill(R.a).join('');
      m1='¡Repartiste justo! '+half+' y '+half; m2=R.mix[R.a]+' = '+half+' + '+half;
      v='¡Perfecto! '+NUM_ES[half]+' y '+NUM_ES[half]+'. ¡Lo mismo en los dos!';
    } else {
      e=R.pens[0]+' | '+R.pens[1]; m1='¡Perfecto! Cada uno en su corral'; m2='Great sorting!';
      v='¡Perfecto! Cada animal en su corral';
    }
    toast(true,e,m1,m2,last?'🏆 Terminar':'Seguir ▶', ()=>{ if(last) finish('corral','🐑'); else { co.i++; coRender(); } });
    say(v,'es-AR');
  });

  // ════════════════════════════════════════════════════════════════════════════
  // 3. PATH
  // ════════════════════════════════════════════════════════════════════════════
  const N=6;
  const PATHS=[
    { start:[0,2], goal:[4,2], carrots:[],      rocks:[],                                             max:1 },
    { start:[0,5], goal:[3,2], carrots:[],      rocks:[[1,5],[1,4]],                                  max:2 },
    { start:[0,0], goal:[4,4], carrots:[[4,0]], rocks:[[1,1],[2,2],[3,3]],                            max:2 },
    { start:[0,5], goal:[5,5], carrots:[[3,1]], rocks:[[2,2],[2,3],[2,4],[2,5],[3,2],[3,3],[3,4],[3,5]], max:3 },
    { start:[0,0], goal:[5,0], carrots:[[0,3],[3,0]], rocks:[[1,0],[1,1],[1,2],[4,1],[4,2],[4,3]],   max:4 },
  ];
  const DIRS={U:[0,-1,'⬆️','arriba','up'],D:[0,1,'⬇️','abajo','down'],L:[-1,0,'⬅️','izquierda','left'],R:[1,0,'➡️','derecha','right']};
  const pa={i:0, prog:[], pos:null, trail:[], got:[], running:false};

  function paStart(){ pa.i=0; paRender(); }
  function paReset(){ const P=PATHS[pa.i]; pa.pos=P.start.slice(); pa.trail=[]; pa.got=[]; }

  function paRender(){
    const P=PATHS[pa.i]; setRound(pa.i,PATHS.length);
    pa.prog=[]; pa.running=false; paReset();
    paDraw(); paDrawProg(-1);
    sayBoth('Llevá a Molly al pasto usando como máximo '+NUM_ES[P.max]+(P.max===1?' bloque':' bloques')+'. Usá el botón repetir','Use the repeat button!');
  }

  function atCell(list,x,y){ return list.some(r=>r[0]===x&&r[1]===y); }

  function paDraw(){
    const P=PATHS[pa.i], g=document.getElementById('t-pa-grid');
    g.style.gridTemplateColumns='repeat('+N+',1fr)';
    let h='';
    for(let y=0;y<N;y++) for(let x=0;x<N;x++){
      let c='', cls='t-cell';
      if(atCell(pa.trail,x,y)) cls+=' trail';
      if(x===P.goal[0]&&y===P.goal[1]) c='🌾';
      if(atCell(P.carrots,x,y) && !atCell(pa.got,x,y)) c='🥕';
      if(atCell(P.rocks,x,y)) c='🪨';
      if(x===pa.pos[0]&&y===pa.pos[1]) c='🐄';
      h+=`<div class="${cls}">${c}</div>`;
    }
    g.innerHTML=h;
    const bag=P.carrots.length?'🧺 '+pa.got.length+' / '+P.carrots.length+' 🥕 · ':'';
    document.getElementById('t-pa-bag').textContent=bag+'🧱 bloques: '+pa.prog.length+' / '+P.max;
  }

  function paDrawProg(now){
    const p=document.getElementById('t-pa-program');
    if(!pa.prog.length){ p.innerHTML='<span class="t-empty">Tocá una flecha y después cuántas veces · Arrow, then how many</span>'; }
    else p.innerHTML=pa.prog.map((b,i)=>
      `<span class="t-block${i===now?' now':''}">${DIRS[b.d][2]}${b.n>1?`<span class="t-times">×${b.n}</span>`:''}</span>`
    ).join('');
    document.getElementById('t-pa-run').disabled=pa.running||!pa.prog.length;
    document.getElementById('t-pa-undo').disabled=pa.running||!pa.prog.length;
    document.querySelectorAll('#t-rep button').forEach(b=>b.disabled=pa.running||!pa.prog.length);
    const P=PATHS[pa.i];
    document.getElementById('t-pa-bag').textContent=(P.carrots.length?'🧺 '+pa.got.length+' / '+P.carrots.length+' 🥕 · ':'')+'🧱 bloques: '+pa.prog.length+' / '+P.max;
  }

  document.querySelectorAll('#t-pad button').forEach(b=>{
    b.addEventListener('click', ()=>{
      if(pa.running) return;
      const P=PATHS[pa.i];
      if(pa.prog.length>=P.max){
        toast(false,'🧱','¡Solo podés usar '+P.max+(P.max===1?' bloque':' bloques')+'!','Use repeat ×2 ×3…','Entendido',null);
        say('Solo podés usar '+NUM_ES[P.max]+(P.max===1?' bloque':' bloques')+'. Usá el botón de repetir','es-AR');
        return;
      }
      pa.prog.push({d:b.dataset.d, n:1}); paDrawProg(-1);
      say(DIRS[b.dataset.d][3],'es-AR');
    });
  });

  document.querySelectorAll('#t-rep button').forEach(b=>{
    b.addEventListener('click', ()=>{
      if(pa.running||!pa.prog.length) return;
      const n=+b.dataset.n; pa.prog[pa.prog.length-1].n=n; paDrawProg(-1);
      say(DIRS[pa.prog[pa.prog.length-1].d][3]+', '+NUM_ES[n]+' veces','es-AR');
    });
  });

  document.getElementById('t-pa-undo').addEventListener('click', ()=>{ if(!pa.running){ pa.prog.pop(); paDrawProg(-1); } });

  document.getElementById('t-pa-run').addEventListener('click', ()=>{
    if(pa.running||!pa.prog.length) return;
    const P=PATHS[pa.i]; pa.running=true; paReset(); pa.trail=[P.start.slice()]; paDraw();
    const steps=[]; pa.prog.forEach((b,bi)=>{ for(let r=0;r<b.n;r++) steps.push([b.d,bi]); });
    let k=0;
    function atGoal(){ return pa.pos[0]===P.goal[0]&&pa.pos[1]===P.goal[1]; }
    function step(){
      if(k>=steps.length) return end(atGoal()?'nocarrot':'short');
      paDrawProg(steps[k][1]);
      const d=DIRS[steps[k][0]], nx=pa.pos[0]+d[0], ny=pa.pos[1]+d[1];
      if(nx<0||ny<0||nx>=N||ny>=N) return end('out');
      if(atCell(P.rocks,nx,ny)) return end('rock');
      pa.pos=[nx,ny]; pa.trail.push([nx,ny]);
      if(atCell(P.carrots,nx,ny)&&!atCell(pa.got,nx,ny)){ pa.got.push([nx,ny]); say('¡Zanahoria!','es-AR'); }
      paDraw();
      if(atGoal()&&pa.got.length===P.carrots.length) return setTimeout(()=>end('win'),350);
      k++; setTimeout(step,480);
    }
    function end(r){
      pa.running=false; paDrawProg(-1);
      const last=pa.i>=PATHS.length-1;
      if(r==='win'){
        const total=steps.slice(0,k+1).length;
        toast(true,'🐄🌾','¡Llegó con '+pa.prog.length+(pa.prog.length===1?' bloque':' bloques')+'!',total+' pasos con '+pa.prog.length+' bloques · loops rock!',last?'🏆 Terminar':'Seguir ▶',()=>{
          if(last) finish('path','🧭'); else { pa.i++; paRender(); }
        });
        sayBoth('¡Muy bien! Molly caminó '+(NUM_ES[total]||total)+' pasos con solo '+NUM_ES[pa.prog.length]+(pa.prog.length===1?' bloque':' bloques'),'Great coding!');
        return;
      }
      const msg={
        rock:    ['🪨','¡Ups! Molly chocó con una piedra','Oops, a rock!'],
        out:     ['🚧','¡Ups! Molly se salió de la granja','Oops, out of the farm!'],
        nocarrot:['🥕','Llegó al pasto, pero le faltan zanahorias','Get all the carrots first!'],
        short:   ['🤔','Molly no llegó. ¿Hay que repetir más veces?','Not there yet!']
      }[r];
      toast(false,msg[0],msg[1],msg[2]+' — cambiá el programa','Volver a intentar',()=>{ paReset(); paDraw(); });
      say(msg[1],'es-AR');
    }
    step();
  });
}
