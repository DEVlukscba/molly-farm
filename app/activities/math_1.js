import { markDone } from '../progress.js';
import { getChildName } from '../profiles.js';

// ─── CSS ────────────────────────────────────────────────────────────────────
function injectCSS() {
  if (document.getElementById('molly-math1-css')) return;
  const s = document.createElement('style');
  s.id = 'molly-math1-css';
  s.textContent = `
#m1-root .m1-scr { display:none }
#m1-root .m1-scr--on { display:block }
#m1-root .m1-screen { max-width:700px; margin:18px auto; padding:0 14px }

/* card */
#m1-root .m1-card { background:#fff; border-radius:22px; padding:22px 18px;
  box-shadow:0 6px 20px rgba(0,0,0,.1); text-align:center; position:relative;
  overflow:hidden }
#m1-root .m1-card::before { content:''; position:absolute; top:0; left:0; right:0; height:6px }
#m1-root .m1-card--patterns::before  { background:linear-gradient(90deg,#E91E63,#FF9800) }
#m1-root .m1-card--compare::before   { background:linear-gradient(90deg,#1565C0,#0288D1) }
#m1-root .m1-card--space::before     { background:linear-gradient(90deg,#2E7D32,#66BB6A) }
#m1-root .m1-card--sums::before      { background:linear-gradient(90deg,#E65100,#FFA000) }
#m1-root .m1-card--sequence::before  { background:linear-gradient(90deg,#6A1B9A,#AB47BC) }
#m1-root .m1-card--loops::before     { background:linear-gradient(90deg,#00695C,#26A69A) }
#m1-root .m1-card--truefalse::before { background:linear-gradient(90deg,#C2185B,#F06292) }
#m1-root .m1-card--debug::before     { background:linear-gradient(90deg,#B71C1C,#EF5350) }

/* badge */
#m1-root .m1-badge { display:inline-block; padding:5px 14px; border-radius:20px;
  font-size:.82rem; font-weight:700; color:#fff; margin-bottom:8px }
#m1-root .m1-card--patterns  .m1-badge { background:#E91E63 }
#m1-root .m1-card--compare   .m1-badge { background:#1565C0 }
#m1-root .m1-card--space     .m1-badge { background:#2E7D32 }
#m1-root .m1-card--sums      .m1-badge { background:#E65100 }
#m1-root .m1-card--sequence  .m1-badge { background:#6A1B9A }
#m1-root .m1-card--loops     .m1-badge { background:#00695C }
#m1-root .m1-card--truefalse .m1-badge { background:#C2185B }
#m1-root .m1-card--debug     .m1-badge { background:#B71C1C }

/* progress bar */
#m1-root .m1-pbar  { background:#EEE; border-radius:10px; height:8px; margin:8px 0 14px; overflow:hidden }
#m1-root .m1-pfill { height:100%; background:linear-gradient(90deg,#66BB6A,#FDD835); border-radius:10px; transition:width .4s }

/* question text */
#m1-root .m1-qtitle { font-size:1.2rem; color:#333; font-weight:700; margin-bottom:4px }
#m1-root .m1-qsub   { font-size:.88rem; color:var(--muted); margin-bottom:12px }

/* emoji */
#m1-root .m1-emoji-row { font-size:2.4rem; letter-spacing:4px; margin:12px 0; line-height:1.4 }
#m1-root .m1-emoji-big { font-size:4.5rem; display:block; margin:10px 0 }
#m1-root .m1-blank { display:inline-block; width:52px; height:52px; background:#FFFDE7;
  border:3px dashed #F9A825; border-radius:12px; vertical-align:middle;
  line-height:52px; color:#AAA; font-size:.85rem }
#m1-root .m1-op { font-size:.65em; color:#888; vertical-align:middle }

/* option buttons */
#m1-root .m1-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:14px }
#m1-root .m1-opt  { padding:12px 20px; font-size:1.4rem; border-radius:14px;
  border:3px solid transparent; cursor:pointer; background:#FFFDE7;
  font-family:inherit; transition:transform .15s; min-width:70px }
#m1-root .m1-opt:hover:not(:disabled) { transform:scale(1.08) }
#m1-root .m1-opt:disabled { cursor:default }
#m1-root .m1-opt--num { font-size:1.8rem; font-weight:700 }
#m1-root .m1-opt--eq  { font-size:1.1rem; align-self:center; padding:14px 12px }
#m1-root .m1-ok  { background:#C8E6C9 !important; border-color:#388E3C !important }
#m1-root .m1-no  { background:#FFCDD2 !important; border-color:#C62828 !important }

/* feedback */
#m1-root .m1-fb { font-size:1.2rem; font-weight:700; padding:10px 16px; border-radius:12px;
  margin:12px 0; animation:m1pop .3s }
#m1-root .m1-fb--ok { background:#C8E6C9; color:#2E7D32 }
#m1-root .m1-fb--no { background:#FFCDD2; color:#B71C1C }
@keyframes m1pop { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }

/* nav */
#m1-root .m1-nav { display:flex; gap:10px; justify-content:center; margin-top:16px }
#m1-root .m1-nav-btn { padding:10px 26px; font-size:1rem; font-weight:700; border-radius:12px;
  border:none; cursor:pointer; font-family:inherit; transition:all .15s }
#m1-root .m1-nav-btn:hover { transform:translateY(-2px); box-shadow:0 4px 10px rgba(0,0,0,.15) }
#m1-root .m1-btn-next    { background:var(--ok); color:#fff }
#m1-root .m1-btn-next:disabled { background:#CCC; cursor:default; transform:none; box-shadow:none }
#m1-root .m1-btn-prev    { background:#EEE; color:#555 }
#m1-root .m1-btn-restart { background:#F9A825; color:#5D4037 }

/* stars */
#m1-root .m1-stars-row { display:flex; align-items:center; justify-content:flex-end;
  gap:2px; padding:6px 0 }
#m1-root .m1-score { font-size:.9rem; color:var(--muted); margin-left:6px }

/* welcome */
#m1-root .m1-welcome-title { font-family:var(--display); font-size:2rem; color:var(--ok); margin:0 0 6px }
#m1-root .m1-welcome-sub   { color:var(--muted); margin:0 0 14px; font-size:.95rem }
#m1-root .m1-act-list { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin:12px 0; text-align:left }
#m1-root .m1-act-item { padding:8px 12px; border-radius:12px; font-size:.9rem; color:#333 }
#m1-root .m1-start { background:var(--ok); color:#fff; border:none; padding:16px 40px;
  font-size:1.3rem; font-weight:800; border-radius:18px; cursor:pointer;
  font-family:var(--display); margin-top:8px; transition:transform .2s }
#m1-root .m1-start:hover { transform:scale(1.05) }

/* compare */
#m1-root .m1-compare-q { font-size:1rem; color:#555; margin:6px 0 10px }
#m1-root .m1-groups { display:flex; gap:12px; justify-content:center; align-items:stretch; flex-wrap:wrap }
#m1-root .m1-group { flex:1; max-width:180px; padding:14px 10px; background:#E3F2FD;
  border:3px solid #90CAF9; border-radius:16px; cursor:pointer; font-size:2rem;
  transition:all .15s; line-height:1.4; text-align:center }
#m1-root .m1-group:hover { transform:scale(1.04); border-color:#1565C0 }
#m1-root .m1-glabel { font-size:.4em; color:#555; display:block; margin-bottom:4px }
#m1-root .m1-gcount { font-size:.35em; color:#888; display:block; margin-top:4px }

/* space / true-false */
#m1-root .m1-space-wrap { position:relative; width:200px; height:200px; margin:10px auto;
  border:4px solid #90CAF9; border-radius:18px; background:#E3F2FD;
  display:flex; align-items:center; justify-content:center; overflow:visible }
#m1-root .m1-space-inner { width:120px; height:120px; background:#E8F5E9;
  border:4px solid #2E7D32; border-radius:14px;
  display:flex; align-items:center; justify-content:center; font-size:2.8rem }
#m1-root .m1-space-out { position:absolute; font-size:2.8rem; bottom:-18px; right:8px }
#m1-root .m1-stmt    { font-size:1.1rem; color:#333; margin:8px 0 2px; font-weight:600 }
#m1-root .m1-stmt-en { font-size:.88rem; color:var(--muted); margin-bottom:10px }
#m1-root .m1-tf { padding:16px 30px; font-size:1.35rem; font-weight:700; border-radius:18px;
  border:3px solid transparent; cursor:pointer; font-family:inherit; min-width:140px; transition:all .15s }
#m1-root .m1-tf:hover:not(:disabled) { transform:scale(1.06) }
#m1-root .m1-tf--t { background:#E8F5E9; color:#2E7D32; border-color:#2E7D32 }
#m1-root .m1-tf--f { background:#FFEBEE; color:#B71C1C; border-color:#B71C1C }

/* sequence */
#m1-root .m1-seq-prompt { font-size:1rem; color:#555; margin:6px 0 10px }
#m1-root .m1-seq-items  { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin:10px 0 }
#m1-root .m1-seq { width:100px; background:#F3E5F5; border:3px solid #CE93D8;
  border-radius:16px; padding:12px 6px; cursor:pointer; font-size:2.4rem;
  text-align:center; transition:all .15s; position:relative }
#m1-root .m1-seq:hover { transform:scale(1.06); border-color:#6A1B9A }
#m1-root .m1-seq-num { position:absolute; top:-10px; right:-10px; background:#6A1B9A;
  color:#fff; width:26px; height:26px; border-radius:50%; font-size:.75rem;
  display:flex; align-items:center; justify-content:center; font-weight:700 }
#m1-root .m1-seq-num:empty { display:none }
#m1-root .m1-seq-lbl { font-size:.65rem; color:#555; margin-top:4px; display:block }
#m1-root .m1-seq--sel { border-color:#6A1B9A }
#m1-root .m1-seq--ok  { background:#C8E6C9; border-color:#2E7D32 }
#m1-root .m1-seq--no  { background:#FFCDD2; border-color:#B71C1C }

/* loops */
#m1-root .m1-loop-box    { display:inline-block; background:#E0F2F1; border:3px solid #00695C;
  border-radius:14px; padding:10px 18px; font-size:1.3rem; margin:8px 0 }
#m1-root .m1-loop-times  { font-size:1.8rem; color:#00695C; font-weight:700; margin:4px 0 }
#m1-root .m1-loop-prompt { font-size:.9rem; color:#555; margin-bottom:8px }

/* debug */
#m1-root .m1-dbg-prompt { font-size:1rem; color:#555; margin:6px 0 10px; text-align:left }
#m1-root .m1-dbg-steps  { display:flex; flex-direction:column; gap:8px; margin:10px 0; text-align:left }
#m1-root .m1-dbg { display:flex; align-items:center; gap:10px; padding:10px 14px;
  background:#FFF3E0; border:3px solid #FFCC80; border-radius:12px; cursor:pointer; transition:all .15s }
#m1-root .m1-dbg:hover { border-color:#E65100; transform:translateX(3px) }
#m1-root .m1-dbg-num   { font-size:1.2rem; font-weight:700; color:#E65100; min-width:24px }
#m1-root .m1-dbg-emoji { font-size:1.7rem }
#m1-root .m1-dbg-text  { flex:1; color:#333; font-size:.95rem }
#m1-root .m1-dbg.m1-ok { background:#C8E6C9; border-color:#2E7D32 }
#m1-root .m1-dbg.m1-no { background:#FFCDD2; border-color:#B71C1C }

/* hint */
#m1-root .m1-hint { font-size:.82rem; color:var(--muted); margin-top:6px }

/* final */
#m1-root .m1-final-card { background:linear-gradient(135deg,#FFF9C4,#C8E6C9,#E1F5FE) }
#m1-root .m1-final-trophy { font-size:3.5rem; display:block; margin:8px 0 }
#m1-root .m1-final-title  { font-family:var(--display); font-size:1.8rem; font-weight:800; color:var(--ok) }
#m1-root .m1-final-medals { font-size:2.2rem; letter-spacing:6px; margin:12px 0 }
#m1-root .m1-final-sub    { font-size:1.1rem; color:var(--muted); margin:8px 0 }
`;
  document.head.appendChild(s);
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const ACTS = [
  {
    id: 'patterns', type: 'patterns',
    badge: '🔴 Matemáticas · Patrones',
    title: '¿Qué sigue?',
    sub: 'Mirá el patrón y elegí lo que falta · Look at the pattern and choose what\'s missing',
    questions: [
      { seq: ['🔴','🔵','🔴','🔵','🔴'], opts: ['🔵','🔴','🟡'], ans: 0 },
      { seq: ['🐄','🐷','🐄','🐷','🐄'], opts: ['🐷','🐄','🐑'], ans: 0 },
      { seq: ['⭐','🌙','⭐','🌙','⭐'],  opts: ['🌙','⭐','☀️'],  ans: 0 },
      { seq: ['🌸','🌻','🌸','🌻','🌸'], opts: ['🌻','🌸','🌹'], ans: 0 },
    ]
  },
  {
    id: 'compare', type: 'compare',
    badge: '⚖️ Matemáticas · Comparar',
    title: 'Compará los grupos',
    sub: '¿Cuál tiene MÁS? · Which has MORE? — o ¿son IGUALES? · or EQUAL?',
    questions: [
      { a: ['🐄','🐄','🐄'], b: ['🐄','🐄'],       q: '¿Cuál tiene MÁS? / Which has MORE?', ans: 'A' },
      { a: ['🐷','🐷'],      b: ['🐷','🐷'],       q: '¿Son IGUALES? / Are they EQUAL?',     ans: '=' },
      { a: ['🐑'],            b: ['🐑','🐑','🐑'],  q: '¿Cuál tiene MÁS? / Which has MORE?', ans: 'B' },
      { a: ['🐔','🐔','🐔'], b: ['🐔','🐔','🐔'],  q: '¿Son IGUALES? / Are they EQUAL?',     ans: '=' },
    ]
  },
  {
    id: 'space', type: 'truefalse',
    badge: '📍 Matemáticas · Espacios',
    title: 'Verdadero o Falso',
    sub: '¿Está ADENTRO o AFUERA? · Is it INSIDE or OUTSIDE?',
    questions: [
      { visual:'inside',  inner:'🐄', ref:'🏠', stmt:'La vaca está ADENTRO del granero',   en:'The cow is INSIDE the barn',   ans:true  },
      { visual:'outside', inner:'🐄', ref:'🏠', stmt:'La vaca está ADENTRO del granero',   en:'The cow is INSIDE the barn',   ans:false },
      { visual:'inside',  inner:'🍎', ref:'📦', stmt:'La manzana está ADENTRO de la caja', en:'The apple is INSIDE the box',  ans:true  },
      { visual:'outside', inner:'🦆', ref:'🌊', stmt:'El pato está ADENTRO del agua',      en:'The duck is INSIDE the water', ans:false },
    ]
  },
  {
    id: 'sums', type: 'sums',
    badge: '➕ Matemáticas · Sumas',
    title: '¿Cuántos hay en total?',
    sub: 'Contá los animales y sumá · Count the animals and add them up',
    questions: [
      { a: ['🐄'],            b: ['🐄'],            opts: [1,2,3], ans: 2 },
      { a: ['🐷','🐷'],       b: ['🐷'],            opts: [2,3,4], ans: 3 },
      { a: ['🐑','🐑'],       b: ['🐑','🐑'],       opts: [3,4,5], ans: 4 },
      { a: ['🐔','🐔','🐔'],  b: ['🐔','🐔'],       opts: [4,5,6], ans: 5 },
    ]
  },
  {
    id: 'sequence', type: 'sequence',
    badge: '🔢 Programación · Secuencias',
    title: 'Poné los pasos en orden',
    sub: 'Hacé clic en el PRIMERO, después el SEGUNDO y el TERCERO · Click FIRST, then SECOND, then THIRD',
    questions: [
      {
        prompt: '🌱 ¿Cómo crece una planta? / How does a plant grow?',
        items: [
          { emoji:'🌷', label:'3. Flor / Flower'  },
          { emoji:'🌰', label:'1. Semilla / Seed'  },
          { emoji:'🌱', label:'2. Brote / Sprout'  },
        ],
        correct: [1, 2, 0]
      },
      {
        prompt: '🥤 ¿Cómo hacer un jugo? / How to make juice?',
        items: [
          { emoji:'🥤', label:'3. Tomar / Drink'      },
          { emoji:'🍊', label:'1. Agarrar / Pick'      },
          { emoji:'🍹', label:'2. Exprimir / Squeeze'  },
        ],
        correct: [1, 2, 0]
      },
      {
        prompt: '🐣 ¿Cómo nace un pollito? / How does a chick hatch?',
        items: [
          { emoji:'🐔', label:'3. Gallina / Hen'    },
          { emoji:'🥚', label:'1. Huevo / Egg'      },
          { emoji:'🐣', label:'2. Nace / Hatches'   },
        ],
        correct: [1, 2, 0]
      },
    ]
  },
  {
    id: 'loops', type: 'loops',
    badge: '🔁 Programación · Loops',
    title: '¿Cuántas veces en total?',
    sub: 'Molly repite una acción muchas veces · Molly repeats an action. How many total?',
    questions: [
      { animal:'🐄', sound:'MOO!',   soundCount:2, times:2, prompt:'Molly dice 🐄 MOO! MOO! — Lo hace 2 veces.', opts:[2,3,4,5], ans:4 },
      { animal:'🐕', sound:'WOOF!',  soundCount:3, times:2, prompt:'🐕 dice WOOF! WOOF! WOOF! — Lo hace 2 veces.', opts:[4,5,6,7], ans:6 },
      { animal:'🦆', sound:'QUACK!', soundCount:2, times:3, prompt:'🦆 dice QUACK! QUACK! — Lo hace 3 veces.', opts:[4,5,6,7], ans:6 },
    ]
  },
  {
    id: 'truefalse', type: 'truefalse',
    badge: '✅ Programación · Verdadero / Falso',
    title: '¿Verdadero o Falso?',
    sub: 'Mirá la imagen y decidí · Look at the image and decide',
    questions: [
      { visual:'emoji-only', inner:'🐷', ref:'', stmt:'El cerdo es ROSA',       en:'The pig is PINK',         ans:true  },
      { visual:'emoji-only', inner:'🐄', ref:'', stmt:'La vaca tiene 2 patas',  en:'The cow has 2 legs',      ans:false },
      { visual:'emoji-only', inner:'🐑', ref:'', stmt:'La oveja dice QUACK',    en:'The sheep says QUACK',    ans:false },
      { visual:'emoji-only', inner:'☀️', ref:'', stmt:'El sol es AMARILLO',     en:'The sun is YELLOW',       ans:true  },
    ]
  },
  {
    id: 'debug', type: 'debug',
    badge: '🐛 Programación · Debug',
    title: '¡Encontrá el error!',
    sub: 'Uno de los pasos está MAL — ¡hacé clic en el paso equivocado! · One step is WRONG. Click it!',
    questions: [
      {
        prompt: '🌱 Molly quiere regar las plantas:',
        steps: [
          { emoji:'🪣', text:'Agarrar el regador / Take the watering can', wrong:false },
          { emoji:'💧', text:'Llenarlo de agua / Fill it with water',      wrong:false },
          { emoji:'🚀', text:'Volar a la luna / Fly to the moon',          wrong:true  },
          { emoji:'🌱', text:'Regar las plantas / Water the plants',       wrong:false },
        ]
      },
      {
        prompt: '😴 Molly se va a dormir:',
        steps: [
          { emoji:'🦷', text:'Cepillarse los dientes / Brush teeth',   wrong:false },
          { emoji:'👕', text:'Ponerse el pijama / Put on pajamas',      wrong:false },
          { emoji:'🍕', text:'¡Comer pizza! / Eat pizza!',              wrong:true  },
          { emoji:'😴', text:'Dormirse / Go to sleep',                  wrong:false },
        ]
      },
      {
        prompt: '🎨 Molly quiere dibujar:',
        steps: [
          { emoji:'📝', text:'Agarrar el lápiz / Pick up pencil',        wrong:false },
          { emoji:'📄', text:'Poner el papel / Put paper on table',      wrong:false },
          { emoji:'🏊', text:'Nadar en el río / Swim in the river',      wrong:true  },
          { emoji:'🎨', text:'Dibujar / Draw!',                          wrong:false },
        ]
      },
    ]
  },
];

// ─── CONFETTI ────────────────────────────────────────────────────────────────
function launchConfetti() {
  document.getElementById('m1-confetti')?.remove();
  const canvas = document.createElement('canvas');
  canvas.id = 'm1-confetti';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const pieces = Array.from({length:120}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*-canvas.height,
    r: Math.random()*8+4, c:`hsl(${Math.random()*360},90%,60%)`,
    speed: Math.random()*4+2, angle: Math.random()*360, spin: (Math.random()-.5)*5,
  }));
  let frame = 0;
  (function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.angle*Math.PI/180);
      ctx.fillStyle=p.c; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.5); ctx.restore();
      p.y+=p.speed; p.angle+=p.spin; if(p.y>canvas.height) p.y=-20;
    });
    if(++frame<200) requestAnimationFrame(draw); else canvas.remove();
  })();
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
export function render(root) {
  injectCSS();
  document.getElementById('m1-confetti')?.remove();

  root.innerHTML = `<div id="m1-root">

    <!-- WELCOME -->
    <div class="m1-scr m1-scr--on m1-screen" id="m1-welcome">
      <div class="m1-card" style="background:linear-gradient(135deg,#E8F5E9,#FFFDE7)">
        <div class="m1-welcome-title">🌱 ¡Nivel 1, ${getChildName()}!</div>
        <div class="m1-welcome-sub">¡Empezamos desde el principio! · Let's start from the beginning!</div>
        <span style="font-size:3rem;display:block;margin:8px 0">🐄🌾🐷🐑</span>
        <div class="m1-act-list">
          <div class="m1-act-item" style="background:#FCE4EC">🔴 Patrones</div>
          <div class="m1-act-item" style="background:#E3F2FD">⚖️ Comparar</div>
          <div class="m1-act-item" style="background:#E8F5E9">📍 Espacios</div>
          <div class="m1-act-item" style="background:#FFF3E0">➕ Sumas</div>
          <div class="m1-act-item" style="background:#F3E5F5">🔢 Secuencias</div>
          <div class="m1-act-item" style="background:#E0F2F1">🔁 Loops</div>
          <div class="m1-act-item" style="background:#FCE4EC">✅ Verdadero / Falso</div>
          <div class="m1-act-item" style="background:#FFEBEE">🐛 Debug</div>
        </div>
        <button class="m1-start" id="m1-start">¡Empezar! / Let's go! 🚀</button>
      </div>
    </div>

    <!-- GAME -->
    <div class="m1-scr m1-screen" id="m1-game">
      <div class="m1-stars-row" id="m1-stars"><!-- dynamic --></div>
      <div id="m1-container"></div>
      <div class="m1-fb" id="m1-feedback" hidden></div>
      <div class="m1-nav">
        <button class="m1-nav-btn m1-btn-prev" id="m1-prev">◀ Atrás</button>
        <button class="m1-nav-btn m1-btn-next" id="m1-next" disabled>Siguiente ▶</button>
      </div>
    </div>

    <!-- FINAL -->
    <div class="m1-scr m1-screen" id="m1-final">
      <div class="m1-card m1-final-card">
        <span class="m1-final-trophy">🏆</span>
        <div class="m1-final-title">¡WOW! ¡Lo lograste! / You did it!</div>
        <div class="m1-final-medals" id="m1-medals"></div>
        <div class="m1-final-sub" id="m1-finalmsg"></div>
        <span style="font-size:2.5rem;display:block;margin:12px 0">🐄🌟🐷🌟🐑🌟🐔</span>
        <div class="m1-final-sub">Molly está muy orgullosa de vos · Molly is so proud of you! 🐄❤️</div>
        <div class="m1-nav">
          <button class="m1-nav-btn m1-btn-restart" id="m1-restart">🔄 Jugar de nuevo</button>
        </div>
      </div>
    </div>

  </div>`;

  // ── State ──────────────────────────────────────────────────────────────────
  let curAct = 0, curQ = 0, score = 0, total = 0, answered = false;
  let seqSelected = [], seqOrder = [];

  // ── DOM refs ───────────────────────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const welcome  = $('m1-welcome');
  const game     = $('m1-game');
  const finalScr = $('m1-final');
  const container = $('m1-container');
  const feedback  = $('m1-feedback');
  const nextBtn   = $('m1-next');
  const starsEl   = $('m1-stars');

  // ── Screens ────────────────────────────────────────────────────────────────
  function showScr(name) {
    [welcome, game, finalScr].forEach(s => s.classList.remove('m1-scr--on'));
    ({ welcome, game, final: finalScr })[name]?.classList.add('m1-scr--on');
  }

  // ── Stars ──────────────────────────────────────────────────────────────────
  function updateStars() {
    starsEl.innerHTML = Array.from({length:8}, (_,i) =>
      `<span style="font-size:1.3rem;filter:${i<score?'none':'grayscale(1) opacity(.35)'};transition:filter .3s">⭐</span>`
    ).join('') + `<span class="m1-score">${score}/8</span>`;
  }

  // ── Feedback ───────────────────────────────────────────────────────────────
  function showFeedback(ok, msg) {
    feedback.textContent = (ok ? '✅ ' : '❌ ') + msg;
    feedback.className   = 'm1-fb ' + (ok ? 'm1-fb--ok' : 'm1-fb--no');
    feedback.hidden = false;
    if (ok) score++;
    total++;
    answered = true;
    nextBtn.disabled = false;
    updateStars();
  }

  function clearFeedback() {
    feedback.hidden = true;
    feedback.textContent = '';
    feedback.className = 'm1-fb';
  }

  // ── Render activity ────────────────────────────────────────────────────────
  function renderAct() {
    const act = ACTS[curAct];
    const q   = act.questions[curQ];
    const pct = Math.round(curQ / act.questions.length * 100);
    let body  = '';
    if (act.type === 'patterns')  body = renderPatterns(q);
    if (act.type === 'compare')   body = renderCompare(q);
    if (act.type === 'truefalse') body = renderTF(q);
    if (act.type === 'sums')      body = renderSums(q);
    if (act.type === 'sequence')  body = renderSeq(q);
    if (act.type === 'loops')     body = renderLoops(q);
    if (act.type === 'debug')     body = renderDebug(q);

    container.innerHTML = `
      <div class="m1-card m1-card--${act.id}">
        <span class="m1-badge">${act.badge}</span>
        <div class="m1-pbar"><div class="m1-pfill" style="width:${pct}%"></div></div>
        <div class="m1-qtitle">${act.title}</div>
        <div class="m1-qsub">${act.sub}</div>
        ${body}
      </div>`;
  }

  // ── Activity renderers ─────────────────────────────────────────────────────
  function renderPatterns(q) {
    const seq  = q.seq.join(' ') + ' <span class="m1-blank">?</span>';
    const opts = q.opts.map((o,i) =>
      `<button class="m1-opt" data-action="pattern" data-idx="${i}">${o}</button>`
    ).join('');
    return `<div class="m1-emoji-row">${seq}</div><div class="m1-opts">${opts}</div>`;
  }

  function renderCompare(q) {
    return `
      <div class="m1-compare-q">${q.q}</div>
      <div class="m1-groups">
        <div class="m1-group" data-action="compare" data-val="A">
          <span class="m1-glabel">Grupo A / Group A</span>${q.a.join(' ')}
          <span class="m1-gcount">${q.a.length} animales</span>
        </div>
        <button class="m1-opt m1-opt--eq" data-action="compare" data-val="=">🟰<br><small>IGUAL<br>EQUAL</small></button>
        <div class="m1-group" data-action="compare" data-val="B">
          <span class="m1-glabel">Grupo B / Group B</span>${q.b.join(' ')}
          <span class="m1-gcount">${q.b.length} animales</span>
        </div>
      </div>`;
  }

  function renderTF(q) {
    let visual = '';
    if (q.visual === 'inside') {
      visual = `<div class="m1-space-wrap"><div class="m1-space-inner">${q.inner}</div></div>`;
    } else if (q.visual === 'outside') {
      visual = `<div class="m1-space-wrap"><div class="m1-space-inner">${q.ref}</div><span class="m1-space-out">${q.inner}</span></div>`;
    } else {
      visual = `<div class="m1-emoji-big">${q.inner}</div>`;
    }
    return `${visual}
      <div class="m1-stmt">"${q.stmt}"</div>
      <div class="m1-stmt-en">"${q.en}"</div>
      <div class="m1-opts">
        <button class="m1-tf m1-tf--t" data-action="tf" data-val="true">✅ VERDADERO<br><small>TRUE</small></button>
        <button class="m1-tf m1-tf--f" data-action="tf" data-val="false">❌ FALSO<br><small>FALSE</small></button>
      </div>`;
  }

  function renderSums(q) {
    const opts = q.opts.map(o =>
      `<button class="m1-opt m1-opt--num" data-action="sum" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m1-emoji-row">${q.a.join('')} <span class="m1-op">+</span> ${q.b.join('')} <span class="m1-op">=</span> <span class="m1-blank">?</span></div>
      <div class="m1-opts">${opts}</div>`;
  }

  function renderSeq(q) {
    seqSelected = []; seqOrder = q.correct;
    const items = q.items.map((item,i) =>
      `<div class="m1-seq" data-action="seq" data-idx="${i}" id="m1s${i}">
        <span class="m1-seq-num" id="m1sn${i}"></span>
        ${item.emoji}
        <span class="m1-seq-lbl">${item.label}</span>
      </div>`
    ).join('');
    return `<div class="m1-seq-prompt">${q.prompt}</div>
      <div class="m1-seq-items">${items}</div>
      <div class="m1-hint">Hacé clic en el orden correcto (1°, 2°, 3°)</div>`;
  }

  function renderLoops(q) {
    const sounds = Array(q.soundCount).fill(q.sound).join(' ');
    const opts   = q.opts.map(o =>
      `<button class="m1-opt m1-opt--num" data-action="loop" data-val="${o}">${o}</button>`
    ).join('');
    return `
      <div class="m1-loop-prompt">${q.prompt}</div>
      <div class="m1-loop-box">${q.animal} → ${sounds}</div>
      <div class="m1-loop-times">× ${q.times}</div>
      <div class="m1-qsub">¿Cuántas veces en total? / How many total?</div>
      <div class="m1-opts">${opts}</div>`;
  }

  function renderDebug(q) {
    const steps = q.steps.map((s,i) =>
      `<div class="m1-dbg" data-action="debug" data-idx="${i}">
        <span class="m1-dbg-num">${i+1}</span>
        <span class="m1-dbg-emoji">${s.emoji}</span>
        <span class="m1-dbg-text">${s.text}</span>
      </div>`
    ).join('');
    return `<div class="m1-dbg-prompt">${q.prompt}</div>
      <div class="m1-dbg-steps">${steps}</div>
      <div class="m1-hint">🖱️ Hacé clic en el paso equivocado</div>`;
  }

  // ── Answer handlers ────────────────────────────────────────────────────────
  function answerPattern(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="pattern"]').forEach((b,i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add('m1-ok');
      else if (i === idx) b.classList.add('m1-no');
    });
    showFeedback(idx === q.ans,
      idx === q.ans ? '¡Correcto! 🌟' : `La respuesta era ${q.opts[q.ans]}`);
  }

  function answerCompare(val) {
    const q  = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="compare"]').forEach(el => {
      el.style.pointerEvents = 'none';
      if (el.dataset.val === q.ans) el.classList.add('m1-ok');
      else if (el.dataset.val === val && !ok) el.classList.add('m1-no');
    });
    showFeedback(ok, ok ? '¡Correcto! 🌟' :
      `Era: ${q.ans==='A'?'Grupo A tiene más':q.ans==='B'?'Grupo B tiene más':'¡Son iguales!'}`);
  }

  function answerTF(val) {
    const q  = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="tf"]').forEach(b => {
      b.disabled = true;
      const bv = b.dataset.val === 'true';
      if (bv === q.ans) b.classList.add('m1-ok');
      else if (bv === val && !ok) b.classList.add('m1-no');
    });
    showFeedback(ok, ok ? '¡Correcto! 🌟' : `Era ${q.ans?'VERDADERO ✅':'FALSO ❌'}`);
  }

  function answerSum(val) {
    const q  = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="sum"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m1-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m1-no');
    });
    showFeedback(ok, ok ? '¡Correcto! 🌟' : `La respuesta era ${q.ans}`);
  }

  function clickSeq(idx) {
    if (seqSelected.includes(idx)) return;
    seqSelected.push(idx);
    const numEl = document.getElementById(`m1sn${idx}`);
    if (numEl) numEl.textContent = seqSelected.length;
    document.getElementById(`m1s${idx}`)?.classList.add('m1-seq--sel');
    if (seqSelected.length < seqOrder.length) return;
    const ok = seqSelected.every((v,i) => v === seqOrder[i]);
    seqSelected.forEach((v,i) =>
      document.getElementById(`m1s${v}`)?.classList.add(v===seqOrder[i]?'m1-seq--ok':'m1-seq--no')
    );
    showFeedback(ok, ok ? '¡Perfecto orden! 🌟' : '¡Casi! El orden correcto está marcado.');
  }

  function answerLoop(val) {
    const q  = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="loop"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m1-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m1-no');
    });
    showFeedback(ok, ok ? '¡Correcto! 🌟' : `La respuesta era ${q.ans} (${q.soundCount} × ${q.times})`);
  }

  function answerDebug(idx) {
    const q  = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="debug"]').forEach((el,i) => {
      el.style.pointerEvents = 'none';
      if (q.steps[i].wrong) el.classList.add('m1-ok');
      else if (i === idx)   el.classList.add('m1-no');
    });
    showFeedback(q.steps[idx].wrong,
      q.steps[idx].wrong ? '¡Encontraste el error! 🐛✅' : '¡Casi! El paso equivocado está marcado.');
  }

  // ── Event delegation ───────────────────────────────────────────────────────
  container.addEventListener('click', e => {
    if (answered) return;
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const { action, idx, val } = el.dataset;
    if (action === 'pattern') answerPattern(+idx);
    else if (action === 'compare') answerCompare(val);
    else if (action === 'tf')      answerTF(val === 'true');
    else if (action === 'sum')     answerSum(+val);
    else if (action === 'seq')     clickSeq(+idx);
    else if (action === 'loop')    answerLoop(+val);
    else if (action === 'debug')   answerDebug(+idx);
  });

  // ── Navigation ─────────────────────────────────────────────────────────────
  $('m1-start').addEventListener('click', () => {
    curAct = 0; curQ = 0; score = 0; total = 0; answered = false;
    updateStars(); clearFeedback(); nextBtn.disabled = true;
    showScr('game'); renderAct();
  });

  $('m1-prev').addEventListener('click', () => {
    if (curAct > 0) {
      curAct--; curQ = 0; answered = false; clearFeedback(); nextBtn.disabled = true; renderAct();
    } else {
      showScr('welcome');
    }
  });

  nextBtn.addEventListener('click', () => {
    if (!answered) return;
    curQ++; answered = false; clearFeedback(); nextBtn.disabled = true;
    const act = ACTS[curAct];
    if (curQ >= act.questions.length) {
      markDone('math', 1, act.id);
      curAct++; curQ = 0;
      if (curAct >= ACTS.length) { showFinal(); return; }
    }
    renderAct();
  });

  $('m1-restart').addEventListener('click', () => showScr('welcome'));

  // ── Final ──────────────────────────────────────────────────────────────────
  function showFinal() {
    showScr('final');
    const stars = total > 0 ? Math.round(score / total * 8) : 0;
    $('m1-medals').textContent = '⭐'.repeat(stars);
    $('m1-finalmsg').textContent = score >= total * 0.75
      ? `¡Excelente! ${score}/${total} correctas 🌟`
      : `¡Muy bien! ${score}/${total} correctas 🌈`;
    launchConfetti();
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  updateStars();
  showScr('welcome');
}
