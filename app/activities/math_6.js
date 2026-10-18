import { markDone } from '../progress.js';
import { getChildName } from '../profiles.js';

const ACTS = [
  {
    id: 'skip10', type: 'numseq10',
    badge: '📈 Matemáticas · Saltos de 10',
    title: '¡El patrón salta de 10 en 10! / Jumps by 10!',
    sub: '¿Qué número viene después? / What comes next?',
    guide: {
      concept: '<strong>Conteo de 10 en 10.</strong> La base del sistema decimal: los números terminan siempre en 0. Conecta con billetes y monedas (10 pesos, 20 pesos…).',
      tip: '"¡Contemos con los dedos de LOS DOS! Diez... veinte... treinta…" Usar billetes de juguete hace la actividad más concreta.'
    },
    questions: [
      { seq: [10, 20],          opts: [25, 30, 35],    ans: 1 },
      { seq: [10, 20, 30],      opts: [35, 40, 45],    ans: 1 },
      { seq: [20, 30, 40],      opts: [45, 50, 55],    ans: 1 },
      { seq: [10, 20, 30, 40],  opts: [45, 50, 55],    ans: 1 },
    ]
  },
  {
    id: 'sub20', type: 'subtract',
    badge: '➖ Matemáticas · Resta hasta 20',
    title: '¿Cuántos quedan? / How many are left?',
    sub: '¡Llegamos a 20! / We reach 20!',
    guide: {
      concept: '<strong>Resta con números hasta 20.</strong> Progresión: hasta 8 (N3) → hasta 10 (N4) → hasta 15 (N5) → hasta 20 (N6). Abre la puerta al pensamiento posicional.',
      tip: '"Cubrí con el dedo los que tienen ❌ y contá solo los que quedan felices." Señalar uno por uno en voz alta es el proceso correcto.'
    },
    questions: [
      { animal: '🐄', total: 14, leaving: 6,  opts: [7, 8, 9],   ans: 8 },
      { animal: '🐷', total: 17, leaving: 9,  opts: [7, 8, 9],   ans: 8 },
      { animal: '🐑', total: 16, leaving: 7,  opts: [8, 9, 10],  ans: 9 },
      { animal: '🐔', total: 15, leaving: 8,  opts: [6, 7, 8],   ans: 7 },
    ]
  },
  {
    id: 'clock', type: 'clock',
    badge: '🕐 Matemáticas · Reloj en Punto',
    title: '¿Qué hora es? / What time is it?',
    sub: 'El minutero apunta al 12 / The minute hand points to 12',
    guide: {
      concept: '<strong>Leer el reloj en punto.</strong> La aguja larga al 12 = en punto. La aguja corta indica qué hora es. Conexión con saltos de 5 que ya conoce.',
      tip: '"La aguja LARGA siempre apunta arriba al 12. La aguja CORTA nos dice QUÉ hora es." Practicar con un reloj físico es muy efectivo.'
    },
    questions: [
      { hour: 3,  opts: [1, 3, 5, 9],    ans: 3  },
      { hour: 7,  opts: [5, 7, 9, 11],   ans: 7  },
      { hour: 12, opts: [10, 11, 12, 1], ans: 12 },
      { hour: 5,  opts: [4, 5, 6, 7],    ans: 5  },
    ]
  },
  {
    id: 'shop', type: 'shop',
    badge: '🏪 Finanzas · ¿Le alcanza?',
    title: '¡La tiendita de Molly! / Molly\'s little shop!',
    sub: '¿Tiene suficientes monedas? / Does she have enough coins?',
    guide: {
      concept: '<strong>Educación financiera: comparar precio vs dinero disponible.</strong> Si tenemos suficiente: ¡compramos! Si no: ahorramos más.',
      tip: '"Contemos las monedas de Molly... ahora contemos el precio... ¿cuál número es más grande?" Usar monedas reales es mucho más poderoso.'
    },
    questions: [
      { have: 5,  item: '🥕 Zanahoria / Carrot',  cost: 3, ans: true  },
      { have: 4,  item: '🍦 Helado / Ice cream',   cost: 6, ans: false },
      { have: 8,  item: '🍎 Manzana / Apple',      cost: 8, ans: true  },
      { have: 3,  item: '🎂 Torta / Cake',         cost: 7, ans: false },
      { have: 10, item: '🌻 Flor / Flower',        cost: 6, ans: true  },
    ]
  },
  {
    id: 'piggybank', type: 'piggybank',
    badge: '🐷 Finanzas · La Alcancía',
    title: '¡Molly ahorra monedas! / Molly saves coins!',
    sub: '¿Cuánto ahorró en total? / How much did she save in total?',
    guide: {
      concept: '<strong>Ahorro y suma acumulada.</strong> Guardar un poco cada día para juntar más. La intuición fundamental detrás del ahorro.',
      tip: '"El lunes guardó 3 monedas. El martes 2 más. ¿Cuántas tiene en total?" Hacer esto con una cajita de ahorro real hace el ahorro divertido.'
    },
    questions: [
      { days: [{day:'🌅 Lunes/Mon', coins:3},{day:'🌤️ Martes/Tue', coins:2}], opts:[4,5,6], ans:5 },
      { days: [{day:'🌅 Lunes/Mon', coins:2},{day:'🌤️ Martes/Tue', coins:3},{day:'☀️ Miér./Wed', coins:2}], opts:[6,7,8], ans:7 },
      { days: [{day:'🌅 Lunes/Mon', coins:5},{day:'🌤️ Martes/Tue', coins:4}], opts:[8,9,10], ans:9 },
      { days: [{day:'🌅 Lunes/Mon', coins:2},{day:'🌤️ Martes/Tue', coins:3},{day:'☀️ Miér./Wed', coins:3}], opts:[7,8,9], ans:8 },
    ]
  },
  {
    id: 'firstletter', type: 'firstletter',
    badge: '🔤 Lectura · Primera Letra',
    title: '¿Con qué letra empieza? / What letter does it start with?',
    sub: '¡Mirá la palabra! / Look at the word!',
    guide: {
      concept: '<strong>Conciencia fonológica — primera letra.</strong> Reconocer la primera letra de una palabra. Usamos palabras en inglés: cortas, fonéticas y fáciles.',
      tip: '"Di el nombre en inglés lentamente: C... O... W. ¿Qué sonido escuchás primero?" Exagerar el primer sonido ayuda mucho.'
    },
    questions: [
      { emoji: '🐄', word: 'COW',   opts: ['C','A','K'], ans: 0 },
      { emoji: '🥚', word: 'EGG',   opts: ['I','E','O'], ans: 1 },
      { emoji: '🐴', word: 'HORSE', opts: ['B','H','R'], ans: 1 },
      { emoji: '🌻', word: 'SUN',   opts: ['S','N','T'], ans: 0 },
      { emoji: '🐷', word: 'PIG',   opts: ['B','G','P'], ans: 2 },
    ]
  },
  {
    id: 'functions', type: 'function',
    badge: '⚙️ Programación · Funciones',
    title: '¡Una función es una receta con nombre! / A function is a named recipe!',
    sub: 'Definís los pasos una vez y la llamás cuando la necesitás',
    guide: {
      concept: '<strong>¿Qué es una función?</strong> Un bloque de pasos con un nombre. En vez de repetir los mismos pasos, los agrupamos y les ponemos nombre. Así podemos "llamar" a la función cuando la necesitamos.',
      tip: '"Una función es como una receta: tiene nombre y pasos. Cuando querés hacerla, la \'llamás\' por su nombre." Inventar funciones de la vida real: DESAYUNO, CEPILLARSE, etc.'
    },
    questions: [
      {
        funcs: [{
          name: '🌅 DESPERTAR / WAKE UP',
          steps: [
            {emoji:'👀', text:'Abrir los ojos / Open eyes'},
            {emoji:'🙂', text:'Sonreír / Smile'},
            {emoji:'👋', text:'Decir hola / Say hello'},
          ]
        }],
        ask: 'Molly acaba de despertar. ¿Qué función usa? / Which function?',
        opts: [
          {emoji:'🌅', label:'DESPERTAR\nWAKE UP'},
          {emoji:'🌙', label:'DORMIR\nSLEEP'},
          {emoji:'🍽️', label:'COMER\nEAT'},
        ],
        ans: 0
      },
      {
        funcs: [{
          name: '🍽️ COMER / EAT',
          steps: [
            {emoji:'🪑', text:'Sentarse / Sit down'},
            {emoji:'🥄', text:'Tomar la cuchara / Take spoon'},
            {emoji:'😋', text:'¡Comer! / Eat!'},
            {emoji:'💧', text:'Tomar agua / Drink water'},
          ]
        }],
        ask: '¿Cuántos pasos tiene la función COMER? / How many steps does EAT have?',
        opts: [
          {emoji:'3️⃣', label:'3 pasos\n3 steps'},
          {emoji:'4️⃣', label:'4 pasos\n4 steps'},
          {emoji:'5️⃣', label:'5 pasos\n5 steps'},
        ],
        ans: 1
      },
      {
        funcs: [
          {
            name: '🌱 REGAR / WATER',
            steps: [
              {emoji:'🪣', text:'Tomar el balde / Get bucket'},
              {emoji:'💧', text:'Echar agua / Pour water'},
            ]
          },
          {
            name: '🧹 LIMPIAR / CLEAN',
            steps: [
              {emoji:'🧹', text:'Barrer el piso / Sweep floor'},
              {emoji:'🗑️', text:'Tirar la basura / Throw trash'},
            ]
          },
        ],
        ask: 'Las plantas tienen sed. ¿Qué función llama Molly? / Plants are thirsty. Which function?',
        opts: [
          {emoji:'🌱', label:'REGAR\nWATER'},
          {emoji:'🧹', label:'LIMPIAR\nCLEAN'},
        ],
        ans: 0
      },
      {
        funcs: [{
          name: '🌙 DORMIR / SLEEP',
          steps: [
            {emoji:'😁', text:'Cepillarse los dientes / Brush teeth'},
            {emoji:'👗', text:'Ponerse pijama / Put on PJs'},
            {emoji:'🧸', text:'Tomar el oso / Get teddy'},
            {emoji:'💤', text:'¡Dormir! / Sleep!'},
          ]
        }],
        ask: '¿Qué hace Molly PRIMERO en la función DORMIR? / What does Molly do FIRST in SLEEP?',
        opts: [
          {emoji:'💤', label:'¡Dormir!\nSleep!'},
          {emoji:'😁', label:'Cepillarse\nBrush teeth'},
          {emoji:'🧸', label:'Tomar oso\nGet teddy'},
        ],
        ans: 1
      },
    ]
  },
  {
    id: 'missing', type: 'missing-step',
    badge: '🔍 Programación · Paso Faltante',
    title: '¿Cuál es el paso que falta? / Which step is missing?',
    sub: 'Encontrá el hueco en la secuencia / Find the gap in the sequence',
    guide: {
      concept: '<strong>Completar una secuencia — pensamiento algorítmico.</strong> Analizar qué paso falta para que la secuencia tenga sentido. Razonamiento inverso que los programadores usan todo el tiempo.',
      tip: '"Leamos los pasos que SÍ están. ¿Qué viene antes del ???... y qué viene después?" El proceso de pensar en voz alta es más valioso que acertar.'
    },
    questions: [
      {
        prompt: '🧃 Hacer un jugo / Make juice:',
        steps: [
          {emoji:'🍎', text:'Tomar la fruta / Take fruit'},
          {emoji:'✂️', text:'Cortarla / Cut it'},
          {missing: true},
          {emoji:'🥤', text:'Servir en el vaso / Pour in glass'},
        ],
        opts: [
          {emoji:'🧃', text:'Licuar / Blend'},
          {emoji:'🛏️', text:'Ir a dormir / Go to sleep'},
          {emoji:'🧂', text:'Agregar sal / Add salt'},
        ],
        ans: 0
      },
      {
        prompt: '🙌 Lavarse las manos / Wash hands:',
        steps: [
          {emoji:'🚿', text:'Abrir el agua / Turn on water'},
          {missing: true},
          {emoji:'💧', text:'Enjuagar / Rinse'},
          {emoji:'🧺', text:'Secarse / Dry off'},
        ],
        opts: [
          {emoji:'🍕', text:'Comer pizza / Eat pizza'},
          {emoji:'🧼', text:'Jabonarse / Lather up'},
          {emoji:'🎮', text:'Jugar / Play games'},
        ],
        ans: 1
      },
      {
        prompt: '📚 Leer un libro / Read a book:',
        steps: [
          {emoji:'📚', text:'Elegir el libro / Choose book'},
          {missing: true},
          {emoji:'📑', text:'Pasar las páginas / Turn pages'},
          {emoji:'📕', text:'Cerrarlo / Close it'},
        ],
        opts: [
          {emoji:'🎵', text:'Cantar / Sing'},
          {emoji:'📖', text:'Abrirlo / Open it'},
          {emoji:'🏃', text:'Correr / Run'},
        ],
        ans: 1
      },
      {
        prompt: '🌙 Irse a dormir / Go to sleep:',
        steps: [
          {emoji:'😁', text:'Cepillarse los dientes / Brush teeth'},
          {emoji:'👗', text:'Ponerse el pijama / Put on PJs'},
          {missing: true},
          {emoji:'💤', text:'¡Dormir! / Sleep!'},
        ],
        opts: [
          {emoji:'🏊', text:'Nadar / Swim'},
          {emoji:'🧸', text:'Tomar el oso / Get teddy'},
          {emoji:'🍕', text:'Comer pizza / Eat pizza'},
        ],
        ans: 1
      },
    ]
  },
];

function clockSVG(h) {
  const cx = 110, cy = 110, r = 90;
  const hAngleRad = (h * 30 - 90) * Math.PI / 180;
  const hLen = 58;
  const hx = (cx + hLen * Math.cos(hAngleRad)).toFixed(1);
  const hy = (cy + hLen * Math.sin(hAngleRad)).toFixed(1);
  const mx = cx, my = cy - 74;
  let nums = '';
  for (let n = 1; n <= 12; n++) {
    const a = (n * 30 - 90) * Math.PI / 180;
    const nx = (cx + 72 * Math.cos(a)).toFixed(1);
    const ny = (cy + 72 * Math.sin(a)).toFixed(1);
    nums += `<text x="${nx}" y="${ny}" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="bold" fill="#555" font-family="Arial">${n}</text>`;
  }
  let ticks = '';
  for (let t = 0; t < 60; t++) {
    const ta = (t * 6 - 90) * Math.PI / 180;
    const inner = t % 5 === 0 ? r - 13 : r - 6;
    const x1 = (cx + r * Math.cos(ta)).toFixed(1);
    const y1 = (cy + r * Math.sin(ta)).toFixed(1);
    const x2 = (cx + inner * Math.cos(ta)).toFixed(1);
    const y2 = (cy + inner * Math.sin(ta)).toFixed(1);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#DDD" stroke-width="${t % 5 === 0 ? 2 : 1}"/>`;
  }
  return `<svg width="220" height="220" viewBox="0 0 220 220" style="display:block;margin:10px auto">`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#FFAB91" stroke-width="5"/>`
    + ticks + nums
    + `<line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="#555" stroke-width="3" stroke-linecap="round"/>`
    + `<line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#BF360C" stroke-width="6" stroke-linecap="round"/>`
    + `<circle cx="${cx}" cy="${cy}" r="6" fill="#333"/>`
    + `</svg>`;
}

function injectCSS() {
  if (document.getElementById('molly-math6-css')) return;
  const s = document.createElement('style');
  s.id = 'molly-math6-css';
  s.textContent = `
#m6-root { font-family:'Arial Rounded MT Bold','Comic Sans MS',Arial,sans-serif; max-width:780px; margin:0 auto; padding:0 16px 40px; }
.m6-screen { display:none; }
.m6-active { display:block; }

.m6-card { background:white; border-radius:24px; padding:28px 24px; box-shadow:0 6px 24px rgba(0,0,0,.1); text-align:center; position:relative; overflow:hidden; margin-bottom:16px; }
.m6-card::before { content:''; position:absolute; top:0; left:0; right:0; height:6px; background:linear-gradient(90deg,#870000,#E64A19); }
.m6-act-skip10      .m6-card::before { background:linear-gradient(90deg,#004D40,#26A69A); }
.m6-act-sub20       .m6-card::before { background:linear-gradient(90deg,#BF360C,#FF7043); }
.m6-act-clock       .m6-card::before { background:linear-gradient(90deg,#870000,#FF8F00); }
.m6-act-shop        .m6-card::before { background:linear-gradient(90deg,#1B5E20,#66BB6A); }
.m6-act-piggybank   .m6-card::before { background:linear-gradient(90deg,#880E4F,#F06292); }
.m6-act-firstletter .m6-card::before { background:linear-gradient(90deg,#1565C0,#42A5F5); }
.m6-act-functions   .m6-card::before { background:linear-gradient(90deg,#4A148C,#AB47BC); }
.m6-act-missing     .m6-card::before { background:linear-gradient(90deg,#E65100,#FFA000); }

.m6-level-badge { position:absolute; top:14px; right:16px; background:linear-gradient(135deg,#870000,#E64A19); color:white; border-radius:12px; padding:4px 12px; font-size:.78em; font-weight:bold; }
.m6-act-badge { display:inline-block; padding:6px 18px; border-radius:20px; font-size:.85em; font-weight:bold; color:white; margin-bottom:10px; background:#BF360C; }
.m6-act-skip10      .m6-act-badge { background:#004D40; }
.m6-act-sub20       .m6-act-badge { background:#BF360C; }
.m6-act-clock       .m6-act-badge { background:#870000; }
.m6-act-shop        .m6-act-badge { background:#1B5E20; }
.m6-act-piggybank   .m6-act-badge { background:#880E4F; }
.m6-act-firstletter .m6-act-badge { background:#1565C0; }
.m6-act-functions   .m6-act-badge { background:#4A148C; }
.m6-act-missing     .m6-act-badge { background:#E65100; }

.m6-progress-bar  { background:#EEE; border-radius:10px; height:10px; margin:10px 0 18px; overflow:hidden; }
.m6-progress-fill { height:100%; background:linear-gradient(90deg,#FF8F00,#FDD835); border-radius:10px; transition:width .4s; }

.m6-question-text { margin-bottom:16px; }
.m6-q-es { font-size:1.2em; color:#333; line-height:1.4; }
.m6-q-en { font-size:1.0em; color:#BF360C; margin-top:4px; }

.m6-options { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:16px; }
.m6-opt-btn { padding:14px 20px; font-size:1.4em; border-radius:16px; border:3px solid transparent; cursor:pointer; transition:all .18s; background:#FFFDE7; min-width:80px; font-family:inherit; }
.m6-opt-btn:hover { transform:scale(1.08); box-shadow:0 4px 12px rgba(0,0,0,.15); }
.m6-opt-btn.correct { background:#C8E6C9!important; border-color:#388E3C!important; transform:scale(1.1); }
.m6-opt-btn.wrong   { background:#FFCDD2!important; border-color:#C62828!important; }
.m6-opt-btn:disabled { cursor:default; }

.m6-numseq-row  { display:flex; gap:10px; justify-content:center; align-items:flex-end; flex-wrap:wrap; margin:14px 0; }
.m6-numseq-box  { background:#E0F2F1; border:3px solid #80CBC4; border-radius:16px; padding:10px 14px; text-align:center; min-width:72px; }
.m6-numseq-blank { background:#FFFDE7; border:3px dashed #F9A825; display:flex; align-items:center; justify-content:center; min-height:70px; }
.m6-numseq-num  { font-size:2em; font-weight:bold; color:#00695C; line-height:1; }
.m6-numseq-vis  { font-size:.95em; line-height:1.6; margin-top:4px; letter-spacing:1px; }
.m6-numseq-blank-label { font-size:2em; color:#CCC; }
.m6-numseq-hint { font-size:.78em; color:#888; margin:4px 0 8px; font-style:italic; }

.m6-sub-box          { background:#FFEBEE; border:3px solid #EF9A9A; border-radius:16px; padding:14px 20px; display:inline-block; margin:10px 0; }
.m6-sub-leaving-label { font-size:.85em; color:#B71C1C; font-weight:bold; margin-bottom:4px; }
.m6-sub-row          { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin:6px 0; font-size:2.2em; line-height:1.2; }
.m6-sub-animal       { transition:all .3s; }
.m6-leaving          { opacity:.25; position:relative; }
.m6-leaving::after   { content:'❌'; position:absolute; top:-6px; right:-6px; font-size:.5em; }
.m6-sub-arrow        { font-size:1.4em; color:#B71C1C; margin:6px 0; }

.m6-shop-container { display:flex; gap:16px; justify-content:center; align-items:center; flex-wrap:wrap; margin:14px 0; }
.m6-shop-wallet { background:#E8F5E9; border:3px solid #A5D6A7; border-radius:18px; padding:14px 18px; text-align:center; min-width:130px; }
.m6-shop-item   { background:#FFFDE7; border:3px solid #FFE082; border-radius:18px; padding:14px 18px; text-align:center; min-width:130px; }
.m6-shop-label  { font-size:.82em; color:#888; margin-bottom:8px; font-weight:bold; }
.m6-shop-coins  { font-size:1.7em; line-height:1.5; word-break:break-all; max-width:160px; text-align:center; }
.m6-shop-amount { font-size:1.05em; color:#555; font-weight:bold; margin-top:4px; }
.m6-shop-vs     { font-size:1.8em; color:#BBB; }
.m6-shop-btn    { padding:16px 22px; font-size:1.1em; font-weight:bold; border-radius:20px; border:3px solid transparent; cursor:pointer; transition:all .18s; font-family:inherit; min-width:140px; }
.m6-shop-btn:hover { transform:scale(1.07); }
.m6-shop-yes { background:#E8F5E9; color:#2E7D32; border-color:#2E7D32; }
.m6-shop-no  { background:#FFEBEE; color:#B71C1C; border-color:#B71C1C; }
.m6-shop-btn.correct { background:#C8E6C9!important; border-color:#388E3C!important; color:#1B5E20!important; }
.m6-shop-btn.wrong   { background:#FFCDD2!important; border-color:#C62828!important; }
.m6-shop-btn:disabled { cursor:default; }

.m6-piggy-container { background:#FCE4EC; border:3px solid #F48FB1; border-radius:18px; padding:16px 20px; margin:14px 0; text-align:left; }
.m6-piggy-title  { font-size:1.15em; font-weight:bold; color:#C2185B; margin-bottom:12px; text-align:center; }
.m6-piggy-row    { display:flex; align-items:center; gap:10px; margin:8px 0; }
.m6-piggy-label  { font-size:.88em; color:#555; min-width:100px; }
.m6-piggy-coins  { font-size:1.5em; line-height:1.4; }
.m6-piggy-count  { font-size:.82em; color:#888; margin-left:4px; }
.m6-piggy-divider { border:none; border-top:2px dashed #F48FB1; margin:10px 0; }

.m6-letter-display { text-align:center; margin:14px 0; }
.m6-letter-emoji { font-size:5em; display:block; }
.m6-letter-word  { font-size:2.4em; font-weight:bold; color:#5D4037; letter-spacing:8px; margin-top:4px; }
.m6-letter-opts  { display:flex; gap:14px; justify-content:center; margin-top:16px; flex-wrap:wrap; }
.m6-letter-btn   { padding:16px 24px; font-size:2em; font-weight:bold; border-radius:16px; border:3px solid #90CAF9; background:#E3F2FD; color:#1565C0; cursor:pointer; transition:all .18s; font-family:inherit; min-width:80px; }
.m6-letter-btn:hover  { transform:scale(1.1); border-color:#1565C0; }
.m6-letter-btn.correct { background:#C8E6C9!important; border-color:#388E3C!important; color:#1B5E20!important; }
.m6-letter-btn.wrong   { background:#FFCDD2!important; border-color:#C62828!important; }
.m6-letter-btn:disabled { cursor:default; }

.m6-func-block       { background:#F3E5F5; border:3px solid #CE93D8; border-radius:18px; padding:14px 18px; margin:10px 0; text-align:left; }
.m6-func-block-title { display:inline-block; background:#6A1B9A; color:white; padding:4px 16px; border-radius:12px; font-size:.95em; font-weight:bold; margin-bottom:10px; }
.m6-func-step-row    { display:flex; align-items:center; gap:8px; margin:5px 0; }
.m6-func-step-num    { background:#6A1B9A; color:white; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:.8em; font-weight:bold; flex-shrink:0; }
.m6-func-step-emoji  { font-size:1.4em; }
.m6-func-step-text   { font-size:.9em; color:#333; }
.m6-func-opts { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:14px; }
.m6-func-opt  { background:white; border:3px solid #CE93D8; border-radius:14px; padding:12px 16px; cursor:pointer; transition:all .18s; font-family:inherit; text-align:center; min-width:100px; }
.m6-func-opt:hover { transform:scale(1.06); border-color:#6A1B9A; }
.m6-fo-emoji  { font-size:1.6em; display:block; }
.m6-fo-label  { font-size:.82em; color:#555; margin-top:4px; line-height:1.3; }
.m6-func-opt.correct { background:#C8E6C9!important; border-color:#388E3C!important; }
.m6-func-opt.wrong   { background:#FFCDD2!important; border-color:#C62828!important; }
.m6-func-opt:disabled { cursor:default; }

.m6-ms-steps    { display:flex; flex-direction:column; gap:8px; margin:12px 0; }
.m6-ms-step-row { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:12px; }
.m6-ms-normal   { background:#FFFDE7; border:2px solid #FFE082; }
.m6-ms-missing  { background:#FFF3E0; border:2px dashed #E65100; }
.m6-ms-step-num { background:#FF8F00; color:white; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:.85em; font-weight:bold; flex-shrink:0; }
.m6-ms-step-emoji    { font-size:1.6em; }
.m6-ms-step-text     { font-size:.9em; color:#333; flex:1; }
.m6-ms-missing-label { color:#E65100; font-size:1.05em; font-weight:bold; }
.m6-ms-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:14px; }
.m6-ms-opt  { background:white; border:3px solid #FFCC80; border-radius:14px; padding:12px 16px; cursor:pointer; transition:all .18s; font-family:inherit; text-align:center; min-width:110px; }
.m6-ms-opt:hover { transform:scale(1.06); border-color:#E65100; }
.m6-mo-emoji { font-size:1.6em; display:block; }
.m6-mo-text  { font-size:.8em; color:#555; margin-top:4px; line-height:1.3; }
.m6-ms-opt.correct { background:#C8E6C9!important; border-color:#388E3C!important; }
.m6-ms-opt.wrong   { background:#FFCDD2!important; border-color:#C62828!important; }
.m6-ms-opt:disabled { cursor:default; }

.m6-guide-toggle { display:inline-flex; align-items:center; gap:6px; background:#FFF8E1; border:2px solid #FFD54F; border-radius:12px; padding:7px 16px; font-size:.88em; color:#5D4037; cursor:pointer; margin-bottom:10px; font-family:inherit; transition:all .18s; }
.m6-guide-toggle:hover { background:#FFE082; }
.m6-guide-box { background:#FFFDE7; border:2px solid #FFD54F; border-radius:16px; padding:14px 16px; margin-bottom:14px; text-align:left; font-size:.87em; line-height:1.55; color:#4E342E; display:none; }
.m6-guide-box.m6-guide-open { display:block; }
.m6-guide-box strong { color:#E65100; }
.m6-guide-tip { margin-top:8px; padding:8px 12px; background:#E8F5E9; border-left:4px solid #388E3C; border-radius:0 10px 10px 0; color:#1B5E20; font-style:italic; }

.m6-feedback { font-size:1.3em; font-weight:bold; padding:12px 20px; border-radius:14px; margin:14px 0; display:none; animation:m6popIn .3s ease; }
.m6-feedback.correct { background:#C8E6C9; color:#2E7D32; }
.m6-feedback.wrong   { background:#FFCDD2; color:#B71C1C; }
@keyframes m6popIn { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }

.m6-nav-row { display:flex; gap:12px; justify-content:center; margin-top:18px; }
.m6-nav-btn { padding:12px 28px; font-size:1.0em; font-weight:bold; border-radius:14px; border:none; cursor:pointer; font-family:inherit; transition:all .18s; }
.m6-nav-btn:hover { transform:translateY(-2px); box-shadow:0 4px 10px rgba(0,0,0,.15); }
.m6-btn-next    { background:#BF360C; color:white; }
.m6-btn-prev    { background:#EEE; color:#555; }
.m6-btn-restart { background:#F9A825; color:#5D4037; }
.m6-btn-next:disabled { background:#CCC; cursor:default; transform:none; box-shadow:none; }

#m6-header { background:linear-gradient(90deg,#870000,#E64A19); color:white; padding:10px 20px; border-radius:16px; margin-bottom:16px; text-align:right; font-weight:bold; font-size:1.1em; }

.m6-welcome-title { font-size:2.2em; color:#BF360C; margin-bottom:6px; }
.m6-level-pill    { display:inline-block; background:linear-gradient(135deg,#870000,#E64A19); color:white; border-radius:20px; padding:6px 20px; font-size:1em; margin:8px 0 14px; }
.m6-act-list  { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:16px 0; text-align:left; }
.m6-act-item  { padding:10px 14px; border-radius:14px; font-size:.93em; color:#333; }
.m6-start-btn { background:linear-gradient(135deg,#870000,#E64A19); color:white; border:none; padding:18px 50px; font-size:1.35em; font-weight:bold; border-radius:20px; cursor:pointer; margin-top:10px; font-family:inherit; transition:all .2s; box-shadow:0 4px 14px rgba(135,0,0,.35); }
.m6-start-btn:hover { transform:scale(1.05); }

.m6-final-title { font-size:2em; font-weight:bold; color:#BF360C; }
.m6-medals      { font-size:2.4em; letter-spacing:8px; margin:14px 0; }
.m6-final-msg   { font-size:1.1em; color:#5D4037; margin:10px 0; }
`;
  document.head.appendChild(s);
}

export function render(root) {
  injectCSS();
  document.getElementById('m6-confetti')?.remove();
  const name = getChildName();
  root.innerHTML = `
<div id="m6-root">
  <div id="m6-welcome" class="m6-screen m6-active">
    <div class="m6-card" style="background:linear-gradient(135deg,#FBE9E7,#FFFDE7,#E8F5E9)">
      <div class="m6-welcome-title">🐄 ¡Nivel 6, ${name}! 🌟</div>
      <div class="m6-level-pill">🌟 NIVEL 6 / LEVEL 6 🌟</div>
      <div style="font-size:.95em;color:#5D4037;margin-bottom:8px">¡Hay cosas nuevas esperándote! / New things are waiting for you!</div>
      <span style="font-size:3.2em;display:block;margin:8px 0">🐄🌟🐷🌟🐑🌟🐔🌟🐴</span>
      <div class="m6-act-list">
        <div class="m6-act-item" style="background:#E0F2F1">📈 Saltos de 10 <span style="font-size:.8em;color:#888">+difícil</span></div>
        <div class="m6-act-item" style="background:#FFEBEE">➖ Resta hasta 20 <span style="font-size:.8em;color:#888">+difícil</span></div>
        <div class="m6-act-item" style="background:#FBE9E7">🕐 Reloj en punto <span style="font-size:.8em;color:#888">nuevo</span></div>
        <div class="m6-act-item" style="background:#E8F5E9">🏪 ¿Le alcanza? <span style="font-size:.8em;color:#888">nuevo</span></div>
        <div class="m6-act-item" style="background:#FCE4EC">🐷 La alcancía <span style="font-size:.8em;color:#888">nuevo</span></div>
        <div class="m6-act-item" style="background:#E3F2FD">🔤 Primera letra <span style="font-size:.8em;color:#888">nuevo</span></div>
        <div class="m6-act-item" style="background:#F3E5F5">⚙️ Funciones <span style="font-size:.8em;color:#888">nuevo</span></div>
        <div class="m6-act-item" style="background:#FFF3E0">🔍 Paso faltante <span style="font-size:.8em;color:#888">nuevo</span></div>
      </div>
      <button class="m6-start-btn" data-action="start">¡Empezar Nivel 6! 🚀🌟</button>
    </div>
  </div>

  <div id="m6-game" class="m6-screen">
    <div id="m6-header">⭐ 0 / 0</div>
    <div id="m6-act-container"></div>
    <div id="m6-feedback" class="m6-feedback"></div>
    <div class="m6-nav-row">
      <button class="m6-nav-btn m6-btn-prev" data-action="prev-act">◀ Atrás</button>
      <button class="m6-nav-btn m6-btn-next" id="m6-next-btn" data-action="next-q" disabled>Siguiente ▶</button>
    </div>
  </div>

  <div id="m6-final" class="m6-screen">
    <div class="m6-card" style="background:linear-gradient(135deg,#FBE9E7,#C8E6C9,#FFF9C4)">
      <div style="font-size:4em;margin:10px 0">🏆🌟🏆</div>
      <div class="m6-final-title">¡NIVEL 6 COMPLETADO! 🌟</div>
      <div class="m6-level-pill">🌟 NIVEL 6 COMPLETE 🌟</div>
      <div class="m6-medals" id="m6-medals">⭐⭐⭐⭐⭐⭐⭐⭐</div>
      <div class="m6-final-msg" id="m6-final-msg"></div>
      <span style="font-size:3em;display:block;margin:14px 0">🐄🌟🐷🌟🐑🌟🐔🌟🐴🌟🐰</span>
      <div style="font-size:1em;color:#5D4037">¡Molly está súper orgullosa de vos! 🐄🌟<br><em>Molly is so proud of you!</em></div>
      <div class="m6-nav-row" style="margin-top:20px">
        <button class="m6-nav-btn m6-btn-restart" data-action="restart">🔄 Jugar de nuevo</button>
      </div>
    </div>
  </div>
</div>`;

  let curAct = 0, curQ = 0, score = 0, total = 0, answered = false;

  function show(id) {
    root.querySelectorAll('.m6-screen').forEach(s => s.classList.remove('m6-active'));
    root.querySelector('#' + id).classList.add('m6-active');
  }

  function updateScore() {
    root.querySelector('#m6-header').textContent = `⭐ ${score} / ${total}`;
  }

  function showFeedback(ok, msg) {
    const fb = root.querySelector('#m6-feedback');
    fb.textContent = (ok ? '✅ ' : '❌ ') + msg;
    fb.className = 'm6-feedback ' + (ok ? 'correct' : 'wrong');
    fb.style.display = 'block';
    if (ok) score++;
    total++;
    answered = true;
    root.querySelector('#m6-next-btn').disabled = false;
    updateScore();
  }

  function clearFeedback() {
    const fb = root.querySelector('#m6-feedback');
    fb.style.display = 'none';
    fb.className = 'm6-feedback';
  }

  function renderGuide(g) {
    if (!g) return '';
    return `<button class="m6-guide-toggle" data-action="toggle-guide">👨‍👩‍👧 Para papá y mamá ▼</button>`
      + `<div class="m6-guide-box" id="m6-guide-box"><div>${g.concept}</div><div class="m6-guide-tip">💡 ${g.tip}</div></div>`;
  }

  function renderNumSeq10(q) {
    const boxes = q.seq.map(n =>
      `<div class="m6-numseq-box"><div class="m6-numseq-num">${n}</div><div class="m6-numseq-vis">${'🔵 '.repeat(n / 10).trim()}</div></div>`
    ).join('') + `<div class="m6-numseq-box m6-numseq-blank"><div class="m6-numseq-blank-label">?</div></div>`;
    const opts = q.opts.map((o, i) =>
      `<button class="m6-opt-btn" data-action="pick-numseq" data-idx="${i}" data-ans="${q.ans}">${o}</button>`
    ).join('');
    return `<div class="m6-numseq-row">${boxes}</div><div class="m6-numseq-hint">🔵 = 10</div><div class="m6-options">${opts}</div>`;
  }

  function renderSubtract(q) {
    const animals = Array.from({length: q.total}, (_, i) =>
      `<span class="m6-sub-animal${i < q.leaving ? ' m6-leaving' : ''}">${q.animal}</span>`
    ).join('');
    const opts = q.opts.map(o =>
      `<button class="m6-opt-btn" data-action="pick-sub" data-val="${o}" data-ans="${q.ans}">${o}</button>`
    ).join('');
    return `<div class="m6-sub-box"><div class="m6-sub-leaving-label">${q.leaving} se van / ${q.leaving} leaving 👋</div><div class="m6-sub-row">${animals}</div></div>`
      + `<div class="m6-sub-arrow">⬇️</div><div style="font-size:1em;color:#555;margin:6px 0">¿Cuántos quedan? / How many stay?</div>`
      + `<div class="m6-options">${opts}</div>`;
  }

  function renderClock(q) {
    const opts = q.opts.map(o =>
      `<button class="m6-opt-btn" data-action="pick-clock" data-val="${o}" data-ans="${q.ans}">${o}:00</button>`
    ).join('');
    return `<div style="text-align:center;margin:10px 0">${clockSVG(q.hour)}</div>`
      + `<div style="font-size:.9em;color:#888;margin:6px 0">⬆️ = minutero / minute hand &nbsp;|&nbsp; 🔴 = horario / hour hand</div>`
      + `<div class="m6-options">${opts}</div>`;
  }

  function renderShop(q) {
    const ansVal = q.ans ? '1' : '0';
    return `<div class="m6-shop-container">`
      + `<div class="m6-shop-wallet"><div class="m6-shop-label">💰 Molly tiene / has</div><div class="m6-shop-coins">${'🪙'.repeat(q.have)}</div><div class="m6-shop-amount">${q.have} monedas / coins</div></div>`
      + `<div class="m6-shop-vs">vs</div>`
      + `<div class="m6-shop-item"><div class="m6-shop-label">🏷️ ${q.item}</div><div class="m6-shop-coins">${'🪙'.repeat(q.cost)}</div><div class="m6-shop-amount">${q.cost} monedas / coins</div></div>`
      + `</div><div style="font-size:.95em;color:#555;margin:8px 0">¿Le alcanza el dinero? / Does she have enough?</div>`
      + `<div class="m6-options">`
      + `<button class="m6-shop-btn m6-shop-yes" data-action="pick-shop" data-val="1" data-ans="${ansVal}">✅ ¡Sí le alcanza!<br><small>Yes, enough!</small></button>`
      + `<button class="m6-shop-btn m6-shop-no"  data-action="pick-shop" data-val="0" data-ans="${ansVal}">❌ No le alcanza<br><small>Not enough!</small></button>`
      + `</div>`;
  }

  function renderPiggy(q) {
    const rows = q.days.map(d =>
      `<div class="m6-piggy-row"><span class="m6-piggy-label">${d.day}</span><span class="m6-piggy-coins">${'🪙'.repeat(d.coins)}</span><span class="m6-piggy-count">(${d.coins})</span></div>`
    ).join('');
    const opts = q.opts.map(o =>
      `<button class="m6-opt-btn" data-action="pick-piggy" data-val="${o}" data-ans="${q.ans}">🪙×${o}</button>`
    ).join('');
    return `<div class="m6-piggy-container"><div class="m6-piggy-title">🐷 La alcancía de Molly / Molly's Piggy Bank</div>${rows}<hr class="m6-piggy-divider"><div style="font-size:.88em;color:#555;text-align:center">¿Cuántas monedas en total? / How many coins total?</div></div><div class="m6-options">${opts}</div>`;
  }

  function renderFirstLetter(q) {
    const btns = q.opts.map((l, i) =>
      `<button class="m6-letter-btn" data-action="pick-letter" data-idx="${i}" data-ans="${q.ans}">${l}</button>`
    ).join('');
    return `<div class="m6-letter-display"><span class="m6-letter-emoji">${q.emoji}</span><span class="m6-letter-word">${q.word}</span></div>`
      + `<div style="font-size:.9em;color:#555;margin:8px 0">¿Con qué letra empieza? / What letter does it start with?</div>`
      + `<div class="m6-letter-opts">${btns}</div>`;
  }

  function renderFunction(q) {
    const funcsHtml = q.funcs.map(f => {
      const steps = f.steps.map((s, i) =>
        `<div class="m6-func-step-row"><div class="m6-func-step-num">${i + 1}</div><span class="m6-func-step-emoji">${s.emoji}</span><span class="m6-func-step-text">${s.text}</span></div>`
      ).join('');
      return `<div class="m6-func-block"><div class="m6-func-block-title">⚙️ ${f.name}</div>${steps}</div>`;
    }).join('');
    const opts = q.opts.map((o, i) =>
      `<button class="m6-func-opt" data-action="pick-func" data-idx="${i}" data-ans="${q.ans}"><span class="m6-fo-emoji">${o.emoji}</span><span class="m6-fo-label">${o.label.replace(/\n/g, '<br>')}</span></button>`
    ).join('');
    return `${funcsHtml}<div style="font-size:1.05em;color:#5D4037;margin:12px 0 6px"><strong>${q.ask}</strong></div><div class="m6-func-opts">${opts}</div>`;
  }

  function renderMissing(q) {
    const stepsHtml = q.steps.map((s, i) => {
      if (s.missing) {
        return `<div class="m6-ms-step-row m6-ms-missing"><div class="m6-ms-step-num">${i + 1}</div><span class="m6-ms-step-emoji">❓</span><span class="m6-ms-missing-label">??? — ¿qué va acá? / what goes here?</span></div>`;
      }
      return `<div class="m6-ms-step-row m6-ms-normal"><div class="m6-ms-step-num">${i + 1}</div><span class="m6-ms-step-emoji">${s.emoji}</span><span class="m6-ms-step-text">${s.text}</span></div>`;
    }).join('');
    const opts = q.opts.map((o, i) =>
      `<button class="m6-ms-opt" data-action="pick-missing" data-idx="${i}" data-ans="${q.ans}"><span class="m6-mo-emoji">${o.emoji}</span><span class="m6-mo-text">${o.text}</span></button>`
    ).join('');
    return `<div style="font-size:1.05em;font-weight:bold;color:#555;margin-bottom:6px">${q.prompt}</div><div class="m6-ms-steps">${stepsHtml}</div><div style="font-size:.88em;color:#888;margin-bottom:8px">¿Cuál es el paso que falta? / Which step is missing?</div><div class="m6-ms-opts">${opts}</div>`;
  }

  function renderAct() {
    const act = ACTS[curAct], q = act.questions[curQ];
    const pct = ((curQ / act.questions.length) * 100).toFixed(0);
    let html = `<div class="m6-card m6-act-${act.id}">`
      + `<span class="m6-level-badge">🌟 Nivel 6</span>`
      + `<span class="m6-act-badge">${act.badge}</span>`
      + `<div class="m6-progress-bar"><div class="m6-progress-fill" style="width:${pct}%"></div></div>`
      + renderGuide(act.guide)
      + `<div class="m6-question-text"><div class="m6-q-es">${act.title}</div><div class="m6-q-en">${act.sub}</div></div>`;
    switch (act.type) {
      case 'numseq10':     html += renderNumSeq10(q);    break;
      case 'subtract':     html += renderSubtract(q);    break;
      case 'clock':        html += renderClock(q);       break;
      case 'shop':         html += renderShop(q);        break;
      case 'piggybank':    html += renderPiggy(q);       break;
      case 'firstletter':  html += renderFirstLetter(q); break;
      case 'function':     html += renderFunction(q);    break;
      case 'missing-step': html += renderMissing(q);     break;
    }
    html += '</div>';
    root.querySelector('#m6-act-container').innerHTML = html;
    root.querySelector('#m6-next-btn').disabled = true;
    answered = false;
    clearFeedback();
  }

  function showFinal() {
    show('m6-final');
    root.querySelector('#m6-medals').textContent = '⭐'.repeat(Math.min(score, 8));
    root.querySelector('#m6-final-msg').textContent = score >= total * 0.75
      ? `¡Excelente! / Excellent! 🌟 ${score}/${total} correctas`
      : `¡Muy bien! / Great job! 🌈 ${score}/${total} correctas`;
    launchConfetti();
  }

  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'm6-confetti';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = Array.from({length: 120}, () => ({
      x: Math.random() * canvas.width, y: -20,
      r: Math.random() * 10 + 4,
      color: `hsl(${Math.floor(Math.random() * 360)},90%,60%)`,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      alpha: 1
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
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
      updateScore();
      show('m6-game');
      renderAct();
      return;
    }
    if (action === 'restart') { show('m6-welcome'); return; }

    if (action === 'toggle-guide') {
      const box = root.querySelector('#m6-guide-box');
      const open = box.classList.toggle('m6-guide-open');
      el.textContent = `👨‍👩‍👧 Para papá y mamá ${open ? '▲' : '▼'}`;
      return;
    }

    if (action === 'prev-act') {
      if (curAct > 0) { curAct--; curQ = 0; renderAct(); }
      else show('m6-welcome');
      return;
    }

    if (action === 'next-q') {
      if (!answered) return;
      const act = ACTS[curAct];
      curQ++;
      if (curQ >= act.questions.length) {
        markDone('math', 6, act.id);
        curAct++; curQ = 0;
        if (curAct >= ACTS.length) { showFinal(); return; }
      }
      renderAct();
      return;
    }

    if (answered) return;

    if (action === 'pick-numseq') {
      const idx = +el.dataset.idx, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-numseq"]').forEach(b => b.disabled = true);
      el.classList.add(idx === ans ? 'correct' : 'wrong');
      const correct = ACTS[curAct].questions[curQ].opts[ans];
      showFeedback(idx === ans,
        idx === ans ? `¡Correcto! ¡${correct}! 🌟` : `No... el siguiente era ${correct}`);
      return;
    }

    if (action === 'pick-sub') {
      const val = +el.dataset.val, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-sub"]').forEach(b => b.disabled = true);
      el.classList.add(val === ans ? 'correct' : 'wrong');
      showFeedback(val === ans,
        val === ans ? `¡Correcto! Quedan ${ans} 🌟` : `No... quedaban ${ans}`);
      return;
    }

    if (action === 'pick-clock') {
      const val = +el.dataset.val, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-clock"]').forEach(b => b.disabled = true);
      el.classList.add(val === ans ? 'correct' : 'wrong');
      showFeedback(val === ans,
        val === ans ? `¡Correcto! Son las ${ans}:00 🌟` : `No... eran las ${ans}:00`);
      return;
    }

    if (action === 'pick-shop') {
      const val = el.dataset.val === '1', ans = el.dataset.ans === '1';
      root.querySelectorAll('[data-action="pick-shop"]').forEach(b => b.disabled = true);
      el.classList.add(val === ans ? 'correct' : 'wrong');
      const q = ACTS[curAct].questions[curQ];
      showFeedback(val === ans,
        val === ans
          ? (ans ? `¡Correcto! Tiene ${q.have} y cuesta ${q.cost} ✅ 🌟` : `¡Correcto! Tiene ${q.have} pero cuesta ${q.cost} ❌ 🌟`)
          : (ans ? `No... sí le alcanza (tiene ${q.have}, cuesta ${q.cost})` : `No... no le alcanza (tiene ${q.have}, cuesta ${q.cost})`));
      return;
    }

    if (action === 'pick-piggy') {
      const val = +el.dataset.val, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-piggy"]').forEach(b => b.disabled = true);
      el.classList.add(val === ans ? 'correct' : 'wrong');
      showFeedback(val === ans,
        val === ans ? `¡Correcto! ${ans} monedas en total 🌟` : `No... el total era ${ans}`);
      return;
    }

    if (action === 'pick-letter') {
      const idx = +el.dataset.idx, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-letter"]').forEach(b => b.disabled = true);
      el.classList.add(idx === ans ? 'correct' : 'wrong');
      const q = ACTS[curAct].questions[curQ];
      showFeedback(idx === ans,
        idx === ans ? `¡Correcto! ${q.word} empieza con ${q.opts[ans]} 🌟` : `No... ${q.word} empieza con ${q.opts[ans]}`);
      return;
    }

    if (action === 'pick-func') {
      const idx = +el.dataset.idx, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-func"]').forEach(b => b.disabled = true);
      el.classList.add(idx === ans ? 'correct' : 'wrong');
      const correct = ACTS[curAct].questions[curQ].opts[ans];
      showFeedback(idx === ans,
        idx === ans ? `¡Correcto! 🌟` : `No... la respuesta era ${correct.emoji} ${correct.label.split('\n')[0]}`);
      return;
    }

    if (action === 'pick-missing') {
      const idx = +el.dataset.idx, ans = +el.dataset.ans;
      root.querySelectorAll('[data-action="pick-missing"]').forEach(b => b.disabled = true);
      el.classList.add(idx === ans ? 'correct' : 'wrong');
      const correct = ACTS[curAct].questions[curQ].opts[ans];
      showFeedback(idx === ans,
        idx === ans
          ? `¡Correcto! ${correct.emoji} ${correct.text.split('/')[0].trim()} 🌟`
          : `No... el paso faltante era ${correct.emoji} ${correct.text.split('/')[0].trim()}`);
      return;
    }
  });
}
