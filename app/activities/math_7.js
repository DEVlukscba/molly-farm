import { markDone } from '../progress.js';
import { getChildName } from '../profiles.js';

const ACTS = [
  {
    id: 'tens', type: 'tens',
    badge: '🔢 Matemáticas · Decenas y Unidades',
    title: '¡Paquetes de 10 y sueltos! / Tens and ones!',
    sub: '¿Qué número es? / What number is it?',
    guide: {
      concept: '<strong>Valor posicional: decenas y unidades.</strong> Un número como 23 son "2 paquetes de 10 y 3 sueltos". Es la base para sumar y restar números más grandes.',
      tip: '"Primero contamos los paquetes de 10: diez, veinte... ¡y después de a uno con los sueltos: veintiuno, veintidós!" Con palitos atados con gomita (paquetes de 10) y palitos sueltos se puede hacer en la mesa.'
    },
    questions: [
      { tens: 1, ones: 2, opts: [21, 12, 11] },
      { tens: 1, ones: 5, opts: [15, 51, 14] },
      { tens: 2, ones: 3, opts: [32, 22, 23] },
      { tens: 3, ones: 1, opts: [13, 31, 30] },
    ]
  },
  {
    id: 'add20', type: 'add',
    badge: '➕ Matemáticas · Suma hasta 20',
    title: '¡Llegan más animales! / More animals arrive!',
    sub: '¿Cuántos hay ahora? / How many are there now?',
    guide: {
      concept: '<strong>Suma con totales hasta 20.</strong> Estrategia de "contar a partir de": no hace falta empezar desde 1. Guardamos el primer número en la cabeza y seguimos desde ahí.',
      tip: '"Ya hay 8 vaquitas. ¡Guardamos el 8 en la cabeza! Ahora seguimos las que llegan: nueve, diez, once, doce." Contar desde el número más grande es clave.'
    },
    questions: [
      { animal: '🐄', a: 8,  b: 4, opts: [11, 12, 13], ans: 12 },
      { animal: '🐷', a: 9,  b: 5, opts: [13, 14, 15], ans: 14 },
      { animal: '🐑', a: 10, b: 6, opts: [15, 16, 17], ans: 16 },
      { animal: '🐔', a: 7,  b: 6, opts: [12, 13, 14], ans: 13 },
    ]
  },
  {
    id: 'clockhalf', type: 'clockhalf',
    badge: '🕧 Matemáticas · Reloj y Media',
    title: '¿Qué hora es? / What time is it?',
    sub: 'En punto o y media / O\'clock or half past',
    guide: {
      concept: '<strong>Reloj en punto y "y media".</strong> Aguja larga arriba (12) = en punto. Aguja larga abajo (6) = y media. La aguja corta en la y media queda entre dos números: elegimos el que ya pasó.',
      tip: '"Primero miramos la aguja LARGA: ¿arriba o abajo? Arriba = en punto. Abajo = y media." Como una pizza: la aguja larga dio media vuelta = media hora.'
    },
    questions: [
      { h: 4, m: 0,  opts: ['4:00', '4:30', '2:00'], ans: 0 },
      { h: 2, m: 30, opts: ['2:00', '2:30', '3:30'], ans: 1 },
      { h: 6, m: 30, opts: ['5:30', '6:00', '6:30'], ans: 2 },
      { h: 9, m: 0,  opts: ['9:00', '9:30', '3:00'], ans: 0 },
      { h: 8, m: 30, opts: ['8:30', '9:30', '8:00'], ans: 0 },
    ]
  },
  {
    id: 'change', type: 'change',
    badge: '🪙 Finanzas · El Vuelto',
    title: '¡Molly compra en la tiendita! / Molly buys at the shop!',
    sub: '¿Cuántas monedas le quedan? / How many coins are left?',
    guide: {
      concept: '<strong>El vuelto: lo que queda después de pagar.</strong> Si le alcanza, ¿cuánto le queda? Es una resta aplicada a la vida real: tengo − cuesta = me queda.',
      tip: '"Molly tiene 7 monedas. Paga 4 (las tachamos ❌). ¿Cuántas le quedan sin tachar?" Jugar a la tiendita con monedas reales es lo mejor.'
    },
    questions: [
      { have: 7,  item: '🥕 Zanahoria / Carrot', cost: 4, opts: [2, 3, 4], ans: 3 },
      { have: 9,  item: '🍎 Manzana / Apple',    cost: 5, opts: [3, 4, 5], ans: 4 },
      { have: 10, item: '🍦 Helado / Ice cream', cost: 6, opts: [4, 5, 6], ans: 4 },
      { have: 8,  item: '🌻 Flor / Flower',      cost: 8, opts: [0, 1, 2], ans: 0 },
    ]
  },
  {
    id: 'goal', type: 'goal',
    badge: '🐷 Finanzas · ¿Cuánto falta?',
    title: '¡Molly quiere juntar para un juguete! / Molly is saving for a toy!',
    sub: '¿Cuántas monedas le faltan? / How many more coins does she need?',
    guide: {
      concept: '<strong>Ahorro con meta: ¿cuánto falta?</strong> Hay una META y preguntamos cuánto falta para llegar. Los círculos vacíos ⚪ hacen visible lo que falta.',
      tip: '"La alcancía tiene lugar para 10. ¿Cuántos lugares vacíos ⚪ quedan?" Con una meta real (un juguete, un helado) el ahorro cobra sentido.'
    },
    questions: [
      { have: 7, goal: 10, prize: '🧸 Osito / Teddy',   opts: [2, 3, 4], ans: 3 },
      { have: 6, goal: 10, prize: '⚽ Pelota / Ball',    opts: [3, 4, 5], ans: 4 },
      { have: 8, goal: 10, prize: '🪁 Barrilete / Kite', opts: [1, 2, 3], ans: 2 },
      { have: 9, goal: 12, prize: '🚲 Bici / Bike',      opts: [2, 3, 4], ans: 3 },
    ]
  },
  {
    id: 'whichword', type: 'whichword',
    badge: '🔤 Lectura · ¿Qué palabra empieza con...?',
    title: '¡Buscá la palabra! / Find the word!',
    sub: '¿Cuál empieza con esta letra? / Which one starts with this letter?',
    guide: {
      concept: '<strong>Conciencia fonológica — al revés.</strong> En el N6 veíamos una palabra y elegíamos su primera letra. Ahora damos la letra y hay que encontrar la palabra. Obliga a "probar" el primer sonido de varias palabras.',
      tip: '"Esta es la B, suena /b/. Digamos cada palabra despacito: BBB-ee... CCC-ow... PPP-ig... ¿Cuál empezó con /b/?" Buena trampa en la última: PIG termina en G pero no empieza con G.'
    },
    questions: [
      { letter: 'B', opts: [{e:'🐄',w:'COW'}, {e:'🐝',w:'BEE'},  {e:'🐷',w:'PIG'}],    ans: 1 },
      { letter: 'D', opts: [{e:'🐶',w:'DOG'}, {e:'🐱',w:'CAT'},  {e:'🐟',w:'FISH'}],   ans: 0 },
      { letter: 'F', opts: [{e:'🦆',w:'DUCK'},{e:'🐴',w:'HORSE'},{e:'🐸',w:'FROG'}],   ans: 2 },
      { letter: 'M', opts: [{e:'🥛',w:'MILK'},{e:'🐑',w:'SHEEP'},{e:'🥚',w:'EGG'}],    ans: 0 },
      { letter: 'G', opts: [{e:'🐷',w:'PIG'}, {e:'🐐',w:'GOAT'}, {e:'🐄',w:'COW'}],   ans: 1 },
    ]
  },
  {
    id: 'params', type: 'params',
    badge: '⚙️ Programación · Funciones con número',
    title: '¡La función recibe un número! / The function gets a number!',
    sub: 'El número entre ( ) dice cuántas veces / The number in ( ) says how many',
    guide: {
      concept: '<strong>Parámetros: funciones que reciben un dato.</strong> REGAR(3) riega 3 flores, REGAR(5) riega 5. La misma función, resultado distinto según el número que le pasamos. En programación eso se llama "parámetro".',
      tip: '"¡APLAUDIR(3)!" → Elena aplaude 3 veces. Que ella te dé órdenes a vos: SALTAR(2), GIRAR(1)… ¡Le encanta mandar!'
    },
    questions: [
      {
        func: { name: '🌱 REGAR', param: 'n', steps: [{emoji:'💧', text:'Regar n flores / Water n flowers'}] },
        call: 'REGAR', arg: 3,
        ask: '¿Cuántas flores riega Molly? / How many flowers?',
        opts: [{emoji:'🌻🌻', label:'2'}, {emoji:'🌻🌻🌻', label:'3'}, {emoji:'🌻🌻🌻🌻', label:'4'}],
        ans: 1
      },
      {
        func: { name: '🌽 DAR_MAÍZ', param: 'n', steps: [{emoji:'🐔', text:'Dar maíz a n gallinas / Feed n hens'}] },
        call: 'DAR_MAÍZ', arg: 4,
        ask: '¿A cuántas gallinas les da maíz? / How many hens get corn?',
        opts: [{emoji:'🐔🐔🐔🐔', label:'4'}, {emoji:'🐔🐔🐔', label:'3'}, {emoji:'🐔🐔🐔🐔🐔', label:'5'}],
        ans: 0
      },
      {
        func: { name: '🐸 SALTAR', param: 'n', steps: [{emoji:'⬆️', text:'Saltar n veces / Jump n times'}] },
        call: 'SALTAR', arg: 2,
        ask: '¿Cuántos saltos hace la ranita? / How many jumps?',
        opts: [{emoji:'⬆️', label:'1'}, {emoji:'⬆️⬆️⬆️', label:'3'}, {emoji:'⬆️⬆️', label:'2'}],
        ans: 2
      },
      {
        func: { name: '🥚 JUNTAR', param: 'n', steps: [{emoji:'🧺', text:'Juntar n huevos / Collect n eggs'}] },
        call: null, picture: '🧺 🥚🥚🥚🥚🥚',
        ask: 'Molly juntó estos huevos. ¿Qué función llamó? / Which call did Molly make?',
        opts: [{emoji:'🥚', label:'JUNTAR(3)'}, {emoji:'🥚', label:'JUNTAR(5)'}, {emoji:'🥚', label:'JUNTAR(4)'}],
        ans: 1
      },
    ]
  },
  {
    id: 'extra', type: 'extra',
    badge: '🕵️ Programación · El Paso que Sobra',
    title: '¡Hay un paso que no va! / One step doesn\'t belong!',
    sub: 'Tocá el paso que sobra / Tap the extra step',
    guide: {
      concept: '<strong>Depuración (debug): encontrar el error.</strong> En el N6 faltaba un paso. Ahora sobra uno que no corresponde, como un "bicho" (bug) metido en el programa.',
      tip: '"Leamos todos los pasos en voz alta. ¿Hay alguno que te haga reír porque no tiene sentido?" Si duda, leer la secuencia SIN ese paso y preguntar: "¿así funciona?"'
    },
    questions: [
      {
        prompt: '🧃 Hacer un jugo / Make juice:',
        steps: [
          {emoji:'🍎', text:'Tomar la fruta / Take fruit'},
          {emoji:'✂️', text:'Cortarla / Cut it'},
          {emoji:'🛏️', text:'Irse a dormir / Go to sleep'},
          {emoji:'🌀', text:'Licuar / Blend'},
          {emoji:'🥤', text:'Servir en el vaso / Pour in glass'},
        ],
        ans: 2
      },
      {
        prompt: '🙌 Lavarse las manos / Wash hands:',
        steps: [
          {emoji:'🚿', text:'Abrir el agua / Turn on water'},
          {emoji:'🧼', text:'Jabonarse / Lather up'},
          {emoji:'💧', text:'Enjuagar / Rinse'},
          {emoji:'🍕', text:'Comer pizza / Eat pizza'},
          {emoji:'🧺', text:'Secarse / Dry off'},
        ],
        ans: 3
      },
      {
        prompt: '🌱 Plantar una semilla / Plant a seed:',
        steps: [
          {emoji:'🧦', text:'Ponerse medias / Put on socks'},
          {emoji:'🕳️', text:'Hacer un pocito / Dig a hole'},
          {emoji:'🌰', text:'Poner la semilla / Drop the seed'},
          {emoji:'🤎', text:'Tapar con tierra / Cover with soil'},
          {emoji:'💧', text:'Regar / Water it'},
        ],
        ans: 0
      },
      {
        prompt: '🥛 Ordeñar a Molly / Milk Molly:',
        steps: [
          {emoji:'🪣', text:'Tomar el balde / Get the bucket'},
          {emoji:'🪑', text:'Sentarse junto a Molly / Sit by Molly'},
          {emoji:'🥛', text:'Ordeñar / Milk'},
          {emoji:'🏊', text:'Nadar en la pileta / Swim in the pool'},
          {emoji:'🏠', text:'Llevar la leche a casa / Take milk home'},
        ],
        ans: 3
      },
    ]
  },
];

function clockHalfSVG(h, m) {
  const cx = 110, cy = 110, r = 90;
  const hourPos = h + (m === 30 ? 0.5 : 0);
  const ha = (hourPos * 30 - 90) * Math.PI / 180;
  const hx = (cx + 52 * Math.cos(ha)).toFixed(1);
  const hy = (cy + 52 * Math.sin(ha)).toFixed(1);
  const ma = (m * 6 - 90) * Math.PI / 180;
  const mx2 = (cx + 76 * Math.cos(ma)).toFixed(1);
  const my2 = (cy + 76 * Math.sin(ma)).toFixed(1);
  let nums = '', ticks = '';
  for (let n = 1; n <= 12; n++) {
    const a = (n * 30 - 90) * Math.PI / 180;
    nums += `<text x="${(cx + 70 * Math.cos(a)).toFixed(1)}" y="${(cy + 70 * Math.sin(a)).toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="15" font-weight="bold" fill="#555" font-family="Arial">${n}</text>`;
  }
  for (let t = 0; t < 60; t++) {
    const ta = (t * 6 - 90) * Math.PI / 180;
    const inner = t % 5 === 0 ? r - 13 : r - 6;
    ticks += `<line x1="${(cx + r * Math.cos(ta)).toFixed(1)}" y1="${(cy + r * Math.sin(ta)).toFixed(1)}" x2="${(cx + inner * Math.cos(ta)).toFixed(1)}" y2="${(cy + inner * Math.sin(ta)).toFixed(1)}" stroke="#DDD" stroke-width="${t % 5 === 0 ? 2 : 1}"/>`;
  }
  return `<svg width="220" height="220" viewBox="0 0 220 220" style="display:block;margin:10px auto">`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#9FA8DA" stroke-width="5"/>`
    + ticks + nums
    + `<line x1="${cx}" y1="${cy}" x2="${mx2}" y2="${my2}" stroke="#555" stroke-width="3" stroke-linecap="round"/>`
    + `<line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#283593" stroke-width="7" stroke-linecap="round"/>`
    + `<circle cx="${cx}" cy="${cy}" r="6" fill="#333"/>`
    + `</svg>`;
}

function injectCSS() {
  if (document.getElementById('molly-math7-css')) return;
  const s = document.createElement('style');
  s.id = 'molly-math7-css';
  s.textContent = `
#m7-root { font-family:'Arial Rounded MT Bold','Comic Sans MS',Arial,sans-serif; max-width:780px; margin:0 auto; padding:0 16px 40px; }
.m7-screen { display:none; }
.m7-active { display:block; }

.m7-card { background:white; border-radius:24px; padding:28px 24px; box-shadow:0 6px 24px rgba(0,0,0,.1); text-align:center; position:relative; overflow:hidden; margin-bottom:16px; }
.m7-card::before { content:''; position:absolute; top:0; left:0; right:0; height:6px; background:linear-gradient(90deg,#1A237E,#3F51B5); }
.m7-act-tens       .m7-card::before { background:linear-gradient(90deg,#004D40,#26A69A); }
.m7-act-add20      .m7-card::before { background:linear-gradient(90deg,#1B5E20,#66BB6A); }
.m7-act-clockhalf  .m7-card::before { background:linear-gradient(90deg,#1A237E,#7986CB); }
.m7-act-change     .m7-card::before { background:linear-gradient(90deg,#BF360C,#FF7043); }
.m7-act-goal       .m7-card::before { background:linear-gradient(90deg,#880E4F,#F06292); }
.m7-act-whichword  .m7-card::before { background:linear-gradient(90deg,#1565C0,#42A5F5); }
.m7-act-params     .m7-card::before { background:linear-gradient(90deg,#4A148C,#AB47BC); }
.m7-act-extra      .m7-card::before { background:linear-gradient(90deg,#E65100,#FFA000); }

.m7-level-badge { position:absolute; top:14px; right:16px; background:linear-gradient(135deg,#1A237E,#3F51B5); color:white; border-radius:12px; padding:4px 12px; font-size:.78em; font-weight:bold; }
.m7-act-badge { display:inline-block; padding:6px 18px; border-radius:20px; font-size:.85em; font-weight:bold; color:white; margin-bottom:10px; background:#283593; }
.m7-act-tens       .m7-act-badge { background:#004D40; }
.m7-act-add20      .m7-act-badge { background:#1B5E20; }
.m7-act-clockhalf  .m7-act-badge { background:#1A237E; }
.m7-act-change     .m7-act-badge { background:#BF360C; }
.m7-act-goal       .m7-act-badge { background:#880E4F; }
.m7-act-whichword  .m7-act-badge { background:#1565C0; }
.m7-act-params     .m7-act-badge { background:#4A148C; }
.m7-act-extra      .m7-act-badge { background:#E65100; }

.m7-progress-bar  { background:#EEE; border-radius:10px; height:10px; margin:10px 0 18px; overflow:hidden; }
.m7-progress-fill { height:100%; background:linear-gradient(90deg,#3F51B5,#FDD835); border-radius:10px; transition:width .4s; }

.m7-question-text { margin-bottom:16px; }
.m7-q-es { font-size:1.2em; color:#333; line-height:1.4; }
.m7-q-en { font-size:1.0em; color:#283593; margin-top:4px; font-style:italic; }

.m7-options { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:16px; }
.m7-opt-btn { padding:14px 20px; font-size:1.4em; border-radius:16px; border:3px solid transparent; cursor:pointer; transition:all .18s; background:#FFFDE7; min-width:80px; font-family:inherit; }
.m7-opt-btn:hover { transform:scale(1.08); box-shadow:0 4px 12px rgba(0,0,0,.15); }
.m7-opt-btn.correct { background:#C8E6C9!important; border-color:#388E3C!important; transform:scale(1.06); }
.m7-opt-btn.wrong   { background:#FFCDD2!important; border-color:#C62828!important; }
.m7-opt-btn:disabled { cursor:default; }

/* TENS */
.m7-tens-box { display:inline-flex; gap:18px; align-items:flex-end; justify-content:center; flex-wrap:wrap; background:#E0F2F1; border:3px solid #80CBC4; border-radius:18px; padding:16px 20px; margin:10px 0; }
.m7-tens-group { text-align:center; }
.m7-tens-label { font-size:.8em; color:#00695C; font-weight:bold; margin-top:6px; }
.m7-ten-bar { display:inline-flex; flex-direction:column; gap:1px; margin:0 3px; font-size:1em; line-height:1.05; background:white; border:2px solid #4DB6AC; border-radius:10px; padding:3px 4px; }
.m7-ones { font-size:1.9em; letter-spacing:2px; line-height:1.3; max-width:180px; }
.m7-tens-hint { font-size:.8em; color:#888; font-style:italic; margin:4px 0; }

/* ADD */
.m7-add-wrap  { display:flex; gap:12px; justify-content:center; align-items:center; flex-wrap:wrap; margin:12px 0; }
.m7-add-group { background:#E8F5E9; border:3px solid #A5D6A7; border-radius:16px; padding:10px 14px; max-width:300px; }
.m7-add-group.m7-arriving { background:#FFF8E1; border:3px dashed #FFB300; }
.m7-add-label   { font-size:.8em; font-weight:bold; color:#555; margin-bottom:4px; }
.m7-add-animals { font-size:1.9em; line-height:1.3; }
.m7-add-plus    { font-size:2em; color:#2E7D32; font-weight:bold; }

/* CHANGE */
.m7-change-row   { display:flex; gap:14px; justify-content:center; align-items:center; flex-wrap:wrap; margin:12px 0; }
.m7-change-box   { background:#FBE9E7; border:3px solid #FFAB91; border-radius:18px; padding:12px 16px; min-width:150px; }
.m7-change-item  { background:#FFFDE7; border-color:#FFE082; }
.m7-change-title { font-size:.82em; color:#888; font-weight:bold; margin-bottom:6px; }
.m7-change-coins { font-size:1.7em; line-height:1.4; max-width:220px; margin:0 auto; }
.m7-coin         { display:inline-block; position:relative; }
.m7-coin-paid    { opacity:.25; }
.m7-coin-paid::after { content:'❌'; position:absolute; top:-4px; right:-4px; font-size:.45em; }
.m7-change-amount { font-size:1em; color:#555; font-weight:bold; margin-top:4px; }

/* GOAL */
.m7-goal-box    { background:#FCE4EC; border:3px solid #F48FB1; border-radius:18px; padding:14px 18px; margin:12px auto; max-width:460px; }
.m7-goal-title  { font-size:1.05em; font-weight:bold; color:#C2185B; margin-bottom:8px; }
.m7-goal-slots  { font-size:1.9em; line-height:1.4; letter-spacing:2px; }
.m7-goal-legend { font-size:.8em; color:#777; margin-top:6px; }

/* WHICHWORD */
.m7-big-letter { font-size:5em; font-weight:bold; color:#1565C0; background:#E3F2FD; border:4px solid #90CAF9; border-radius:24px; display:inline-block; padding:4px 34px; margin:8px 0; }
.m7-word-opts  { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:12px; }
.m7-word-btn   { background:white; border:3px solid #90CAF9; border-radius:16px; padding:10px 16px; cursor:pointer; font-family:inherit; min-width:110px; transition:all .18s; }
.m7-word-btn:hover { transform:scale(1.06); border-color:#1565C0; }
.m7-word-emoji { font-size:2.4em; display:block; }
.m7-word-text  { font-size:1.15em; font-weight:bold; color:#5D4037; letter-spacing:3px; }
.m7-word-btn.correct { background:#C8E6C9!important; border-color:#388E3C!important; }
.m7-word-btn.wrong   { background:#FFCDD2!important; border-color:#C62828!important; }
.m7-word-btn:disabled { cursor:default; }

/* PARAMS */
.m7-func-block       { background:#F3E5F5; border:3px solid #CE93D8; border-radius:18px; padding:14px 18px; margin:10px auto; text-align:left; max-width:460px; }
.m7-func-block-title { display:inline-block; background:#6A1B9A; color:white; padding:4px 16px; border-radius:12px; font-size:.95em; font-weight:bold; margin-bottom:10px; }
.m7-param      { background:#FFD54F; color:#4A148C; border-radius:8px; padding:0 8px; }
.m7-func-step-row   { display:flex; align-items:center; gap:8px; margin:5px 0; }
.m7-func-step-emoji { font-size:1.4em; }
.m7-func-step-text  { font-size:.92em; color:#333; }
.m7-call-line  { display:inline-block; margin:8px 0; background:#4A148C; color:white; padding:8px 18px; border-radius:14px; font-size:1.15em; font-family:'Courier New',monospace; font-weight:bold; }
.m7-result-pic { font-size:2em; background:#FFF8E1; border:3px dashed #FFB300; border-radius:16px; display:inline-block; padding:8px 18px; margin:8px 0; }
.m7-func-opts  { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:12px; }
.m7-func-opt   { background:white; border:3px solid #CE93D8; border-radius:14px; padding:12px 16px; cursor:pointer; transition:all .18s; font-family:inherit; min-width:110px; text-align:center; }
.m7-func-opt:hover { transform:scale(1.06); border-color:#6A1B9A; }
.m7-fo-emoji   { font-size:1.5em; display:block; }
.m7-fo-label   { font-size:.85em; color:#555; margin-top:4px; font-family:'Courier New',monospace; font-weight:bold; }
.m7-func-opt.correct { background:#C8E6C9!important; border-color:#388E3C!important; }
.m7-func-opt.wrong   { background:#FFCDD2!important; border-color:#C62828!important; }
.m7-func-opt:disabled { cursor:default; }

/* EXTRA STEP */
.m7-ex-steps { display:flex; flex-direction:column; gap:8px; margin:12px auto; max-width:480px; }
.m7-ex-step  { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:12px; background:#FFFDE7; border:2px solid #FFE082; cursor:pointer; font-family:inherit; text-align:left; transition:all .18s; width:100%; }
.m7-ex-step:hover { transform:scale(1.03); border-color:#E65100; }
.m7-ex-num   { background:#FF8F00; color:white; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:.85em; font-weight:bold; flex-shrink:0; }
.m7-ex-emoji { font-size:1.6em; }
.m7-ex-text  { font-size:.95em; color:#333; flex:1; }
.m7-ex-step.correct { background:#C8E6C9!important; border-color:#388E3C!important; }
.m7-ex-step.wrong   { background:#FFCDD2!important; border-color:#C62828!important; }
.m7-ex-step:disabled { cursor:default; pointer-events:none; }

/* GUIDE */
.m7-guide-toggle { display:inline-flex; align-items:center; gap:6px; background:#FFF8E1; border:2px solid #FFD54F; border-radius:12px; padding:7px 16px; font-size:.88em; color:#5D4037; cursor:pointer; margin-bottom:10px; font-family:inherit; transition:all .18s; }
.m7-guide-toggle:hover { background:#FFE082; }
.m7-guide-box { background:#FFFDE7; border:2px solid #FFD54F; border-radius:16px; padding:14px 16px; margin-bottom:14px; text-align:left; font-size:.87em; line-height:1.55; color:#4E342E; display:none; }
.m7-guide-box.m7-guide-open { display:block; }
.m7-guide-box strong { color:#E65100; }
.m7-guide-tip { margin-top:8px; padding:8px 12px; background:#E8F5E9; border-left:4px solid #388E3C; border-radius:0 10px 10px 0; color:#1B5E20; font-style:italic; }

/* FEEDBACK */
.m7-feedback { font-size:1.3em; font-weight:bold; padding:12px 20px; border-radius:14px; margin:14px 0; display:none; animation:m7popIn .3s ease; text-align:center; }
.m7-feedback.correct { background:#C8E6C9; color:#2E7D32; }
.m7-feedback.wrong   { background:#FFCDD2; color:#B71C1C; }
@keyframes m7popIn { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }

/* NAV */
.m7-nav-row { display:flex; gap:12px; justify-content:center; margin-top:18px; }
.m7-nav-btn { padding:12px 28px; font-size:1.0em; font-weight:bold; border-radius:14px; border:none; cursor:pointer; font-family:inherit; transition:all .18s; }
.m7-nav-btn:hover { transform:translateY(-2px); box-shadow:0 4px 10px rgba(0,0,0,.15); }
.m7-btn-next    { background:#283593; color:white; }
.m7-btn-prev    { background:#EEE; color:#555; }
.m7-btn-restart { background:#F9A825; color:#5D4037; }
.m7-btn-next:disabled { background:#CCC; cursor:default; transform:none; box-shadow:none; }

#m7-header { background:linear-gradient(90deg,#1A237E,#3F51B5); color:white; padding:10px 20px; border-radius:16px; margin-bottom:16px; text-align:right; font-weight:bold; font-size:1.1em; }

.m7-welcome-title { font-size:2.2em; color:#283593; margin-bottom:6px; }
.m7-level-pill    { display:inline-block; background:linear-gradient(135deg,#1A237E,#3F51B5); color:white; border-radius:20px; padding:6px 20px; font-size:1em; margin:8px 0 14px; }
.m7-act-list  { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:16px 0; text-align:left; }
.m7-act-item  { padding:10px 14px; border-radius:14px; font-size:.93em; color:#333; }
.m7-start-btn { background:linear-gradient(135deg,#1A237E,#3F51B5); color:white; border:none; padding:18px 50px; font-size:1.35em; font-weight:bold; border-radius:20px; cursor:pointer; margin-top:10px; font-family:inherit; transition:all .2s; box-shadow:0 4px 14px rgba(26,35,126,.35); }
.m7-start-btn:hover { transform:scale(1.05); }

.m7-final-title { font-size:2em; font-weight:bold; color:#283593; }
.m7-medals      { font-size:2.4em; letter-spacing:8px; margin:14px 0; }
.m7-final-msg   { font-size:1.1em; color:#5D4037; margin:10px 0; }
.m7-ask { font-size:.95em; color:#555; margin:8px 0; }
`;
  document.head.appendChild(s);
}

export function render(root) {
  injectCSS();
  document.getElementById('m7-confetti')?.remove();
  const name = getChildName();
  root.innerHTML = `
<div id="m7-root">
  <div id="m7-welcome" class="m7-screen m7-active">
    <div class="m7-card" style="background:linear-gradient(135deg,#E8EAF6,#FFFDE7,#E8F5E9)">
      <div class="m7-welcome-title">🐄 ¡Nivel 7, ${name}! 🌙</div>
      <div class="m7-level-pill">🌙 NIVEL 7 / LEVEL 7 🌙</div>
      <div style="font-size:.95em;color:#5D4037;margin-bottom:8px">¡Seguimos creciendo en la granja! / We keep growing on the farm!</div>
      <span style="font-size:3.2em;display:block;margin:8px 0">🐄🌙🐷🌙🐑🌙🐔🌙🐴</span>
      <div class="m7-act-list">
        <div class="m7-act-item" style="background:#E0F2F1">🔢 Decenas y unidades <span style="font-size:.8em;color:#888">nuevo</span></div>
        <div class="m7-act-item" style="background:#E8F5E9">➕ Suma hasta 20 <span style="font-size:.8em;color:#888">+difícil</span></div>
        <div class="m7-act-item" style="background:#E8EAF6">🕧 Reloj y media <span style="font-size:.8em;color:#888">+difícil</span></div>
        <div class="m7-act-item" style="background:#FBE9E7">🪙 El vuelto <span style="font-size:.8em;color:#888">+difícil</span></div>
        <div class="m7-act-item" style="background:#FCE4EC">🐷 ¿Cuánto falta? <span style="font-size:.8em;color:#888">+difícil</span></div>
        <div class="m7-act-item" style="background:#E3F2FD">🔤 ¿Qué palabra empieza con...? <span style="font-size:.8em;color:#888">+difícil</span></div>
        <div class="m7-act-item" style="background:#F3E5F5">⚙️ Funciones con número <span style="font-size:.8em;color:#888">+difícil</span></div>
        <div class="m7-act-item" style="background:#FFF3E0">🕵️ El paso que sobra <span style="font-size:.8em;color:#888">+difícil</span></div>
      </div>
      <button class="m7-start-btn" data-action="start">¡Empezar Nivel 7! 🚀🌙</button>
    </div>
  </div>

  <div id="m7-game" class="m7-screen">
    <div id="m7-header">⭐ 0 / 0</div>
    <div id="m7-act-container"></div>
    <div id="m7-feedback" class="m7-feedback"></div>
    <div class="m7-nav-row">
      <button class="m7-nav-btn m7-btn-prev" data-action="prev-act">◀ Atrás</button>
      <button class="m7-nav-btn m7-btn-next" id="m7-next-btn" data-action="next-q" disabled>Siguiente ▶</button>
    </div>
  </div>

  <div id="m7-final" class="m7-screen">
    <div class="m7-card" style="background:linear-gradient(135deg,#E8EAF6,#C8E6C9,#FFF9C4)">
      <div style="font-size:4em;margin:10px 0">🏆🌙🏆</div>
      <div class="m7-final-title">¡NIVEL 7 COMPLETADO! 🌙</div>
      <div class="m7-level-pill">🌙 LEVEL 7 COMPLETE 🌙</div>
      <div class="m7-medals" id="m7-medals">⭐⭐⭐⭐⭐⭐⭐⭐</div>
      <div class="m7-final-msg" id="m7-final-msg"></div>
      <span style="font-size:3em;display:block;margin:14px 0">🐄🌙🐷🌙🐑🌙🐔🌙🐴🌙🐰</span>
      <div style="font-size:1em;color:#5D4037">¡Molly está súper orgullosa de vos! 🐄🌙<br><em>Molly is so proud of you!</em></div>
      <div class="m7-nav-row" style="margin-top:20px">
        <button class="m7-nav-btn m7-btn-restart" data-action="restart">🔄 Jugar de nuevo</button>
      </div>
    </div>
  </div>
</div>`;

  let curAct = 0, curQ = 0, score = 0, total = 0, answered = false;

  function show(id) {
    root.querySelectorAll('.m7-screen').forEach(s => s.classList.remove('m7-active'));
    root.querySelector('#' + id).classList.add('m7-active');
  }

  function updateScore() {
    root.querySelector('#m7-header').textContent = `⭐ ${score} / ${total}`;
  }

  function showFeedback(ok, msg) {
    const fb = root.querySelector('#m7-feedback');
    fb.textContent = (ok ? '✅ ' : '❌ ') + msg;
    fb.className = 'm7-feedback ' + (ok ? 'correct' : 'wrong');
    fb.style.display = 'block';
    if (ok) score++;
    total++;
    answered = true;
    root.querySelector('#m7-next-btn').disabled = false;
    updateScore();
  }

  function clearFeedback() {
    const fb = root.querySelector('#m7-feedback');
    fb.style.display = 'none';
    fb.className = 'm7-feedback';
  }

  function renderGuide(g) {
    if (!g) return '';
    return `<button class="m7-guide-toggle" data-action="toggle-guide">👨‍👩‍👧 Para papá y mamá ▼</button>`
      + `<div class="m7-guide-box" id="m7-guide-box"><div>${g.concept}</div><div class="m7-guide-tip">💡 ${g.tip}</div></div>`;
  }

  function renderTens(q) {
    const ans = q.tens * 10 + q.ones;
    let bars = '';
    for (let t = 0; t < q.tens; t++) {
      bars += `<span class="m7-ten-bar">${Array(10).fill('🔵').join('<br>')}</span>`;
    }
    const ones = Array(q.ones).fill('🟡').join('');
    const opts = q.opts.map(o =>
      `<button class="m7-opt-btn" data-action="pick-val" data-val="${o}" data-ans="${ans}">${o}</button>`
    ).join('');
    return `<div class="m7-tens-box">`
      + `<div class="m7-tens-group"><div>${bars}</div><div class="m7-tens-label">${q.tens} × 10</div></div>`
      + `<div class="m7-tens-group"><div class="m7-ones">${ones || '—'}</div><div class="m7-tens-label">${q.ones} sueltos / ones</div></div>`
      + `</div><div class="m7-tens-hint">Cada columna 🔵 = 10 &nbsp;·&nbsp; 🟡 = 1</div>`
      + `<div class="m7-options">${opts}</div>`;
  }

  function renderAdd(q) {
    const opts = q.opts.map(o =>
      `<button class="m7-opt-btn" data-action="pick-val" data-val="${o}" data-ans="${q.ans}">${o}</button>`
    ).join('');
    return `<div class="m7-add-wrap">`
      + `<div class="m7-add-group"><div class="m7-add-label">Ya están / Already here: ${q.a}</div><div class="m7-add-animals">${q.animal.repeat(q.a)}</div></div>`
      + `<div class="m7-add-plus">+</div>`
      + `<div class="m7-add-group m7-arriving"><div class="m7-add-label">✨ Llegan / Arriving: ${q.b}</div><div class="m7-add-animals">${q.animal.repeat(q.b)}</div></div>`
      + `</div><div class="m7-ask">¿Cuántos hay en total? / How many in total?</div>`
      + `<div class="m7-options">${opts}</div>`;
  }

  function renderClockHalf(q) {
    const opts = q.opts.map((o, i) =>
      `<button class="m7-opt-btn" data-action="pick-clock-idx" data-idx="${i}" data-ans="${q.ans}">${o}</button>`
    ).join('');
    return `<div style="text-align:center;margin:10px 0">${clockHalfSVG(q.h, q.m)}</div>`
      + `<div style="font-size:.88em;color:#888;margin:6px 0">Aguja larga gris = minutos · Aguja corta azul = hora<br><em>Long grey = minutes · Short blue = hour</em></div>`
      + `<div class="m7-options">${opts}</div>`;
  }

  function renderChange(q) {
    let coins = '';
    for (let i = 0; i < q.have; i++) {
      coins += `<span class="m7-coin${i < q.cost ? ' m7-coin-paid' : ''}">🪙</span>`;
    }
    const opts = q.opts.map(o =>
      `<button class="m7-opt-btn" data-action="pick-val" data-val="${o}" data-ans="${q.ans}">🪙×${o}</button>`
    ).join('');
    return `<div class="m7-change-row">`
      + `<div class="m7-change-box m7-change-item"><div class="m7-change-title">🏷️ ${q.item}</div><div class="m7-change-coins">${'🪙'.repeat(q.cost)}</div><div class="m7-change-amount">Cuesta ${q.cost} / Costs ${q.cost}</div></div>`
      + `<div class="m7-change-box"><div class="m7-change-title">💰 Molly tenía ${q.have} y paga ${q.cost} ❌</div><div class="m7-change-coins">${coins}</div><div class="m7-change-amount">Had ${q.have} · pays ${q.cost}</div></div>`
      + `</div><div class="m7-ask">¿Cuántas monedas le quedan? / How many coins are left?</div>`
      + `<div class="m7-options">${opts}</div>`;
  }

  function renderGoal(q) {
    let slots = '';
    for (let i = 0; i < q.goal; i++) {
      slots += i < q.have ? '🪙' : '⚪';
      if (i === 4 && q.goal > 5) slots += ' ';
    }
    const opts = q.opts.map(o =>
      `<button class="m7-opt-btn" data-action="pick-val" data-val="${o}" data-ans="${q.ans}">🪙×${o}</button>`
    ).join('');
    return `<div class="m7-goal-box">`
      + `<div class="m7-goal-title">🐷 Meta / Goal: ${q.prize} = ${q.goal} 🪙</div>`
      + `<div class="m7-goal-slots">${slots}</div>`
      + `<div class="m7-goal-legend">🪙 = ya ahorró / saved (${q.have}) &nbsp;·&nbsp; ⚪ = falta / missing</div>`
      + `</div><div class="m7-ask">¿Cuántas monedas le faltan? / How many more?</div>`
      + `<div class="m7-options">${opts}</div>`;
  }

  function renderWhichWord(q) {
    const opts = q.opts.map((o, i) =>
      `<button class="m7-word-btn" data-action="pick-word" data-idx="${i}" data-ans="${q.ans}"><span class="m7-word-emoji">${o.e}</span><span class="m7-word-text">${o.w}</span></button>`
    ).join('');
    return `<div class="m7-big-letter">${q.letter}</div>`
      + `<div class="m7-ask">¿Qué palabra empieza con <strong>${q.letter}</strong>? / Which word starts with <strong>${q.letter}</strong>?</div>`
      + `<div class="m7-word-opts">${opts}</div>`;
  }

  function renderParams(q) {
    const f = q.func;
    const steps = f.steps.map(s =>
      `<div class="m7-func-step-row"><span class="m7-func-step-emoji">${s.emoji}</span><span class="m7-func-step-text">${s.text.replace(/\bn\b/g, '<span class="m7-param">n</span>')}</span></div>`
    ).join('');
    let html = `<div class="m7-func-block"><div class="m7-func-block-title">⚙️ ${f.name}(<span class="m7-param">${f.param}</span>)</div>${steps}</div>`;
    if (q.call) {
      html += `<div style="font-size:.9em;color:#555;margin:6px 0">Molly llama / Molly calls:</div>`
        + `<div class="m7-call-line">${q.call}(<span class="m7-param">${q.arg}</span>)</div>`;
    } else {
      html += `<div class="m7-result-pic">${q.picture}</div>`;
    }
    const opts = q.opts.map((o, i) =>
      `<button class="m7-func-opt" data-action="pick-param" data-idx="${i}" data-ans="${q.ans}"><span class="m7-fo-emoji">${o.emoji}</span><span class="m7-fo-label">${o.label}</span></button>`
    ).join('');
    return `${html}<div class="m7-ask"><strong>${q.ask}</strong></div><div class="m7-func-opts">${opts}</div>`;
  }

  function renderExtra(q) {
    const steps = q.steps.map((s, i) =>
      `<button class="m7-ex-step" data-action="pick-extra" data-idx="${i}" data-ans="${q.ans}"><span class="m7-ex-num">${i + 1}</span><span class="m7-ex-emoji">${s.emoji}</span><span class="m7-ex-text">${s.text}</span></button>`
    ).join('');
    return `<div style="font-size:1.05em;font-weight:bold;color:#555;margin-bottom:6px">${q.prompt}</div>`
      + `<div class="m7-ex-steps">${steps}</div>`;
  }

  function renderAct() {
    const act = ACTS[curAct], q = act.questions[curQ];
    const pct = ((curQ / act.questions.length) * 100).toFixed(0);
    let html = `<div class="m7-card m7-act-${act.id}">`
      + `<span class="m7-level-badge">🌙 Nivel 7</span>`
      + `<span class="m7-act-badge">${act.badge}</span>`
      + `<div class="m7-progress-bar"><div class="m7-progress-fill" style="width:${pct}%"></div></div>`
      + renderGuide(act.guide)
      + `<div class="m7-question-text"><div class="m7-q-es">${act.title}</div><div class="m7-q-en">${act.sub}</div></div>`;
    switch (act.type) {
      case 'tens':      html += renderTens(q);       break;
      case 'add':       html += renderAdd(q);        break;
      case 'clockhalf': html += renderClockHalf(q);  break;
      case 'change':    html += renderChange(q);     break;
      case 'goal':      html += renderGoal(q);       break;
      case 'whichword': html += renderWhichWord(q);  break;
      case 'params':    html += renderParams(q);     break;
      case 'extra':     html += renderExtra(q);      break;
    }
    html += '</div>';
    root.querySelector('#m7-act-container').innerHTML = html;
    root.querySelector('#m7-next-btn').disabled = true;
    answered = false;
    clearFeedback();
  }

  function showFinal() {
    show('m7-final');
    root.querySelector('#m7-medals').textContent = '⭐'.repeat(Math.min(score, 8));
    root.querySelector('#m7-final-msg').textContent = score >= total * 0.75
      ? `¡Excelente! / Excellent! 🌟 ${score}/${total} correctas`
      : `¡Muy bien! / Great job! 🌈 ${score}/${total} correctas`;
    launchConfetti();
  }

  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'm7-confetti';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = Array.from({length: 120}, () => ({
      x: Math.random() * canvas.width, y: -20,
      r: Math.random() * 10 + 4,
      color: `hsl(${Math.floor(Math.random() * 360)},90%,60%)`,
      vx: (Math.random() - 0.5) * 6, vy: Math.random() * 4 + 2, alpha: 1
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.globalAlpha = Math.max(p.alpha, 0); ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        p.x += p.vx; p.y += p.vy; p.alpha -= 0.008;
      });
      if (pieces.some(p => p.alpha > 0)) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

  root.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    if (action === 'start') {
      curAct = 0; curQ = 0; score = 0; total = 0; answered = false;
      updateScore(); show('m7-game'); renderAct();
      return;
    }
    if (action === 'restart') { show('m7-welcome'); return; }

    if (action === 'toggle-guide') {
      const box = root.querySelector('#m7-guide-box');
      const open = box.classList.toggle('m7-guide-open');
      el.textContent = `👨‍👩‍👧 Para papá y mamá ${open ? '▲' : '▼'}`;
      return;
    }

    if (action === 'prev-act') {
      if (curAct > 0) { curAct--; curQ = 0; renderAct(); }
      else show('m7-welcome');
      return;
    }

    if (action === 'next-q') {
      if (!answered) return;
      const act = ACTS[curAct];
      curQ++;
      if (curQ >= act.questions.length) {
        markDone('math', 7, act.id);
        curAct++; curQ = 0;
        if (curAct >= ACTS.length) { showFinal(); return; }
      }
      renderAct();
      return;
    }

    if (answered) return;

    if (action === 'pick-val') {
      const val = +el.dataset.val, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-val"]').forEach(b => {
        b.disabled = true;
        if (+b.dataset.val === ans) b.classList.add('correct');
      });
      if (val !== ans) el.classList.add('wrong');
      showFeedback(val === ans, val === ans ? `¡Correcto! ${ans} 🌟` : `Casi... la respuesta era ${ans}`);
      return;
    }

    if (action === 'pick-clock-idx') {
      const idx = +el.dataset.idx, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-clock-idx"]').forEach((b, i) => {
        b.disabled = true;
        if (i === ans) b.classList.add('correct');
      });
      if (idx !== ans) el.classList.add('wrong');
      const q = ACTS[curAct].questions[curQ];
      const c = q.opts[ans];
      const extra = q.m === 30 ? ' (y media / half past)' : ' (en punto / o\'clock)';
      showFeedback(idx === ans,
        idx === ans ? `¡Correcto! Son las ${c}${extra} 🌟` : `Casi... eran las ${c}${extra}`);
      return;
    }

    if (action === 'pick-word') {
      const idx = +el.dataset.idx, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-word"]').forEach((b, i) => {
        b.disabled = true;
        if (i === ans) b.classList.add('correct');
      });
      if (idx !== ans) el.classList.add('wrong');
      const q = ACTS[curAct].questions[curQ];
      const c = q.opts[ans];
      showFeedback(idx === ans,
        idx === ans ? `¡Correcto! ${c.e} ${c.w} empieza con ${q.letter} 🌟` : `Casi... ${c.e} ${c.w} empieza con ${q.letter}`);
      return;
    }

    if (action === 'pick-param') {
      const idx = +el.dataset.idx, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-param"]').forEach((b, i) => {
        b.disabled = true;
        if (i === ans) b.classList.add('correct');
      });
      if (idx !== ans) el.classList.add('wrong');
      const q = ACTS[curAct].questions[curQ];
      const c = q.opts[ans];
      const why = q.call ? `${q.call}(${q.arg}) → ${c.emoji}` : `${c.label} → ${q.picture}`;
      showFeedback(idx === ans,
        idx === ans ? `¡Correcto! ${why} 🌟` : `Casi... ${why}`);
      return;
    }

    if (action === 'pick-extra') {
      const idx = +el.dataset.idx, ans = +el.dataset.ans;
      const allSteps = root.querySelectorAll('[data-action="pick-extra"]');
      allSteps.forEach(b => b.disabled = true);
      allSteps[ans].classList.add('correct');
      if (idx !== ans) el.classList.add('wrong');
      const q = ACTS[curAct].questions[curQ];
      const c = q.steps[ans];
      const name = `${c.emoji} ${c.text.split('/')[0].trim()}`;
      showFeedback(idx === ans,
        idx === ans ? `¡Correcto! ${name} no va acá 🐛🌟` : `Casi... el paso que sobraba era ${name}`);
      return;
    }
  });
}
