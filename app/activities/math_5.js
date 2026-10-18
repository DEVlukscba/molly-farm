import { markDone } from '../progress.js';
import { getChildName } from '../profiles.js';

function injectCSS() {
  if (document.getElementById('molly-math5-css')) return;
  const s = document.createElement('style');
  s.id = 'molly-math5-css';
  s.textContent = `
#m5-root .m5-scr { display:none }
#m5-root .m5-scr--on { display:block }
#m5-root .m5-screen { max-width:700px; margin:18px auto; padding:0 14px }

/* card */
#m5-root .m5-card { background:#fff; border-radius:22px; padding:22px 18px;
  box-shadow:0 6px 20px rgba(0,0,0,.1); text-align:center; position:relative; overflow:hidden }
#m5-root .m5-card::before { content:''; position:absolute; top:0; left:0; right:0; height:6px }
#m5-root .m5-card--skip5::before    { background:linear-gradient(90deg,#004D40,#26A69A) }
#m5-root .m5-card--sub15::before    { background:linear-gradient(90deg,#BF360C,#FF7043) }
#m5-root .m5-card--halves::before   { background:linear-gradient(90deg,#880E4F,#F06292) }
#m5-root .m5-card--ordinals::before { background:linear-gradient(90deg,#1565C0,#42A5F5) }
#m5-root .m5-card--not::before      { background:linear-gradient(90deg,#E65100,#FFA000) }
#m5-root .m5-card--variable::before { background:linear-gradient(90deg,#2E7D32,#66BB6A) }
#m5-root .m5-card--nestedif::before { background:linear-gradient(90deg,#4A148C,#AB47BC) }
#m5-root .m5-card--debug5::before   { background:linear-gradient(90deg,#F57F17,#FDD835) }

/* badge */
#m5-root .m5-badge { display:inline-block; padding:5px 14px; border-radius:20px;
  font-size:.82rem; font-weight:700; color:#fff; margin-bottom:8px }
#m5-root .m5-card--skip5    .m5-badge { background:#004D40 }
#m5-root .m5-card--sub15    .m5-badge { background:#BF360C }
#m5-root .m5-card--halves   .m5-badge { background:#880E4F }
#m5-root .m5-card--ordinals .m5-badge { background:#1565C0 }
#m5-root .m5-card--not      .m5-badge { background:#E65100 }
#m5-root .m5-card--variable .m5-badge { background:#2E7D32 }
#m5-root .m5-card--nestedif .m5-badge { background:#4A148C }
#m5-root .m5-card--debug5   .m5-badge { background:#F57F17; color:#333 }

/* progress bar */
#m5-root .m5-pbar  { background:#EEE; border-radius:10px; height:8px; margin:8px 0 6px; overflow:hidden }
#m5-root .m5-pfill { height:100%; background:linear-gradient(90deg,#26A69A,#FDD835); border-radius:10px; transition:width .4s }

/* question text */
#m5-root .m5-qtitle { font-size:1.2rem; color:#333; font-weight:700; margin-bottom:4px }
#m5-root .m5-qsub   { font-size:.88rem; color:var(--muted); margin-bottom:12px }

/* option buttons */
#m5-root .m5-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:14px }
#m5-root .m5-opt  { padding:12px 20px; font-size:1.4rem; border-radius:14px;
  border:3px solid transparent; cursor:pointer; background:#FFFDE7;
  font-family:inherit; transition:transform .15s; min-width:70px }
#m5-root .m5-opt:hover:not(:disabled) { transform:scale(1.08) }
#m5-root .m5-opt:disabled { cursor:default }
#m5-root .m5-opt--num { font-size:1.8rem; font-weight:700 }
#m5-root .m5-ok { background:#C8E6C9 !important; border-color:#388E3C !important }
#m5-root .m5-no { background:#FFCDD2 !important; border-color:#C62828 !important }

/* feedback */
#m5-root .m5-fb { font-size:1.2rem; font-weight:700; padding:10px 16px; border-radius:12px;
  margin:12px 0; animation:m5pop .3s }
#m5-root .m5-fb--ok { background:#C8E6C9; color:#2E7D32 }
#m5-root .m5-fb--no { background:#FFCDD2; color:#B71C1C }
@keyframes m5pop { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }

/* nav */
#m5-root .m5-nav { display:flex; gap:10px; justify-content:center; margin-top:16px }
#m5-root .m5-nav-btn { padding:10px 26px; font-size:1rem; font-weight:700; border-radius:12px;
  border:none; cursor:pointer; font-family:inherit; transition:all .15s }
#m5-root .m5-nav-btn:hover { transform:translateY(-2px); box-shadow:0 4px 10px rgba(0,0,0,.15) }
#m5-root .m5-btn-next    { background:#00695C; color:#fff }
#m5-root .m5-btn-next:disabled { background:#CCC; cursor:default; transform:none; box-shadow:none }
#m5-root .m5-btn-prev    { background:#EEE; color:#555 }
#m5-root .m5-btn-restart { background:#F9A825; color:#5D4037 }

/* stars */
#m5-root .m5-stars-row { display:flex; align-items:center; justify-content:flex-end;
  gap:2px; padding:6px 0 }
#m5-root .m5-score { font-size:.9rem; color:var(--muted); margin-left:6px }

/* welcome */
#m5-root .m5-welcome-title { font-family:var(--display); font-size:2rem; color:#00695C; margin:0 0 6px }
#m5-root .m5-welcome-sub   { color:var(--muted); margin:0 0 14px; font-size:.95rem }
#m5-root .m5-act-list { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin:12px 0; text-align:left }
#m5-root .m5-act-item { padding:8px 12px; border-radius:12px; font-size:.88rem; color:#333 }
#m5-root .m5-act-new  { font-size:.72rem; color:#888; margin-left:4px }
#m5-root .m5-start { background:linear-gradient(135deg,#004D40,#00897B); color:#fff; border:none;
  padding:16px 40px; font-size:1.3rem; font-weight:800; border-radius:18px; cursor:pointer;
  font-family:var(--display); margin-top:8px; transition:transform .2s }
#m5-root .m5-start:hover { transform:scale(1.05) }

/* true/false buttons */
#m5-root .m5-tf { padding:16px 28px; font-size:1.35rem; font-weight:700; border-radius:18px;
  border:3px solid transparent; cursor:pointer; font-family:inherit; min-width:138px; transition:all .15s }
#m5-root .m5-tf:hover:not(:disabled) { transform:scale(1.06) }
#m5-root .m5-tf--t { background:#E8F5E9; color:#2E7D32; border-color:#2E7D32 }
#m5-root .m5-tf--f { background:#FFEBEE; color:#B71C1C; border-color:#B71C1C }

/* numseq (skip5) */
#m5-root .m5-numseq-row { display:flex; gap:8px; justify-content:center; align-items:flex-end;
  flex-wrap:wrap; margin:12px 0 }
#m5-root .m5-numseq-box { background:#E0F2F1; border:3px solid #80CBC4; border-radius:14px;
  padding:8px 12px; text-align:center; min-width:64px }
#m5-root .m5-numseq-box.blank { background:#FFFDE7; border:3px dashed #F9A825;
  display:flex; align-items:center; justify-content:center; min-height:64px }
#m5-root .m5-numseq-num   { font-size:1.8rem; font-weight:700; color:#00695C; line-height:1 }
#m5-root .m5-numseq-stars { font-size:.8rem; line-height:1.6; margin-top:4px }
#m5-root .m5-numseq-q     { font-size:1.8rem; color:#CCC }

/* subtract */
#m5-root .m5-sub-box   { background:#FFEBEE; border:3px solid #EF9A9A; border-radius:14px;
  padding:12px 16px; display:inline-block; margin:8px 0 }
#m5-root .m5-sub-label { font-size:.82rem; color:#B71C1C; font-weight:700; margin-bottom:6px }
#m5-root .m5-sub-row   { display:flex; gap:4px; justify-content:center; flex-wrap:wrap;
  font-size:1.7rem; line-height:1.3; margin:4px 0 }
#m5-root .m5-sub-animal { display:inline-block }
#m5-root .m5-sub-animal.leaving { opacity:.2 }

/* halves */
#m5-root .m5-half-total { font-size:1.7rem; word-break:break-all; max-width:300px;
  margin:8px auto; text-align:center; background:#FCE4EC; border:3px solid #F48FB1;
  border-radius:14px; padding:10px; line-height:1.5 }
#m5-root .m5-halves-wrap { display:flex; gap:14px; justify-content:center; align-items:center;
  flex-wrap:wrap; margin:10px 0 }
#m5-root .m5-half-box { background:#fff; border:3px dashed #F48FB1; border-radius:16px;
  padding:16px 20px; font-size:1.8rem; color:#CCC; min-width:80px;
  text-align:center; line-height:2 }
#m5-root .m5-half-lbl { font-size:.78rem; color:#888; font-weight:700; margin-top:4px }

/* ordinals */
#m5-root .m5-race { display:flex; gap:10px; justify-content:center; align-items:flex-end;
  margin:12px 0; padding:12px; background:#F5F5F5; border-radius:16px;
  border:2px solid #DDD; flex-wrap:wrap }
#m5-root .m5-race-animal { text-align:center; padding:4px 8px }
#m5-root .m5-race-medal  { font-size:1.6rem; display:block }
#m5-root .m5-race-emoji  { font-size:2.4rem; display:block }
#m5-root .m5-race-pos    { font-size:.75rem; color:#888; font-weight:700; margin-top:2px }
#m5-root .m5-ord-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:12px }
#m5-root .m5-ord-btn { padding:12px 16px; font-size:1.6rem; font-weight:700; border-radius:14px;
  border:3px solid #90CAF9; cursor:pointer; background:#E3F2FD;
  font-family:inherit; transition:all .15s }
#m5-root .m5-ord-btn:hover:not(:disabled) { transform:scale(1.06); border-color:#1565C0 }
#m5-root .m5-ord-btn:disabled { cursor:default }

/* not logic */
#m5-root .m5-not-fact { background:#FFF3E0; border:3px solid #FFCC80; border-radius:16px;
  padding:14px 18px; margin:10px 0; font-size:1.15rem; font-weight:700; color:#E65100 }
#m5-root .m5-not-q { background:#FFF8E1; border:3px solid #FFD54F; border-radius:16px;
  padding:12px 16px; margin:10px 0; font-size:.95rem; color:#555 }
#m5-root .m5-not-kw { display:inline-block; background:#E65100; color:#fff;
  padding:2px 10px; border-radius:8px; font-size:1rem; font-weight:700; margin:0 4px }

/* variable */
#m5-root .m5-var-box { display:inline-block; background:#E8F5E9; border:4px solid #388E3C;
  border-radius:18px; padding:12px 20px; margin:10px auto; position:relative; max-width:280px }
#m5-root .m5-var-label { position:absolute; top:-13px; left:50%; transform:translateX(-50%);
  background:#388E3C; color:#fff; padding:2px 12px; border-radius:8px;
  font-size:.8rem; font-weight:700; white-space:nowrap }
#m5-root .m5-var-content { font-size:1.8rem; line-height:1.5; word-break:break-all; text-align:center }
#m5-root .m5-var-content.empty { font-size:2rem; color:#CCC; min-width:70px; min-height:44px;
  display:flex; align-items:center; justify-content:center }
#m5-root .m5-var-op-row { font-size:1rem; color:#2E7D32; font-weight:700; margin:6px 0 }
#m5-root .m5-var-arrow  { font-size:1.5rem; color:#2E7D32; margin:4px 0 }

/* nested if */
#m5-root .m5-nested-tree { background:#FFF8E1; border:3px solid #FFD54F; border-radius:18px;
  padding:14px 18px; margin:10px 0; text-align:left; font-size:.9rem }
#m5-root .m5-tree-row { display:flex; align-items:center; gap:6px; margin:4px 0; flex-wrap:wrap }
#m5-root .m5-kw { display:inline-block; padding:2px 8px; border-radius:6px;
  font-size:.78rem; font-weight:700; color:#fff; flex-shrink:0 }
#m5-root .m5-kw-if   { background:#E65100 }
#m5-root .m5-kw-then { background:#00695C }
#m5-root .m5-kw-else { background:#1565C0 }
#m5-root .m5-tree-cond   { color:#333 }
#m5-root .m5-tree-action { font-size:1.1rem }
#m5-root .m5-nested-sit { background:#FFF3E0; border:3px solid #FFCC80; border-radius:12px;
  padding:10px 14px; margin:10px 0; font-size:.95rem; font-weight:700; color:#E65100; text-align:center }
#m5-root .m5-nested-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:12px }
#m5-root .m5-nested-opt { background:#fff; border:3px solid #FFCC80; border-radius:14px;
  padding:12px 16px; min-width:100px; text-align:center; cursor:pointer;
  font-family:inherit; transition:all .15s }
#m5-root .m5-nested-opt:hover:not(:disabled) { transform:scale(1.06); border-color:#E65100 }
#m5-root .m5-nested-opt:disabled { cursor:default }
#m5-root .m5-nested-emoji { font-size:1.9rem; display:block; margin:4px 0 }
#m5-root .m5-nested-lbl  { font-size:.75rem; color:#555; line-height:1.3 }

/* order steps (5) */
#m5-root .m5-order-steps { display:flex; flex-direction:column; gap:8px; margin:10px 0; text-align:left }
#m5-root .m5-order-step { display:flex; align-items:center; gap:10px;
  padding:10px 14px; background:#E0F2F1; border:3px solid #80CBC4;
  border-radius:12px; cursor:pointer; transition:all .15s; user-select:none }
#m5-root .m5-order-step:hover:not(.clicked):not(.m5-ok):not(.m5-no) { border-color:#00695C; transform:translateX(4px) }
#m5-root .m5-order-step.clicked { border-color:#00695C; background:#B2DFDB }
#m5-root .m5-order-badge { font-size:.95rem; font-weight:700; color:#AAA;
  background:#fff; border:2px solid #80CBC4; border-radius:50%;
  width:30px; height:30px; display:flex; align-items:center; justify-content:center;
  flex-shrink:0; transition:all .2s }
#m5-root .m5-order-badge.selected { background:#00695C; color:#fff; border-color:#00695C }
#m5-root .m5-order-emoji { font-size:1.6rem }
#m5-root .m5-order-text  { flex:1; color:#333; font-size:.88rem }
#m5-root .m5-order-hint  { font-size:.8rem; color:var(--muted); margin-bottom:8px; font-style:italic }

/* parent guide */
#m5-root .m5-guide-toggle { display:inline-flex; align-items:center; gap:6px; background:#FFF8E1;
  border:2px solid #FFD54F; border-radius:12px; padding:7px 14px; font-size:.82rem;
  color:#5D4037; cursor:pointer; margin-bottom:8px; font-family:inherit; transition:background .15s }
#m5-root .m5-guide-toggle:hover { background:#FFE082 }
#m5-root .m5-guide-box { background:#FFFDE7; border:2px solid #FFD54F; border-radius:14px;
  padding:12px 14px; margin-bottom:10px; text-align:left; font-size:.83rem;
  line-height:1.5; color:#4E342E; display:none }
#m5-root .m5-guide-box.open { display:block }
#m5-root .m5-guide-tip { margin-top:8px; padding:8px 10px; background:#E8F5E9;
  border-left:4px solid #388E3C; border-radius:0 10px 10px 0; color:#1B5E20; font-style:italic }

/* final */
#m5-root .m5-final-card  { background:linear-gradient(135deg,#E0F2F1,#C8E6C9,#E1F5FE) }
#m5-root .m5-final-trophy { font-size:3.5rem; display:block; margin:8px 0 }
#m5-root .m5-final-title  { font-family:var(--display); font-size:1.8rem; font-weight:800; color:#00695C }
#m5-root .m5-final-medals { font-size:2.2rem; letter-spacing:6px; margin:12px 0 }
#m5-root .m5-final-sub    { font-size:1.1rem; color:var(--muted); margin:8px 0 }
`;
  document.head.appendChild(s);
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const ACTS = [
  {
    id:'skip5', type:'numseq',
    badge:'📈 Matemáticas · Saltos de 5',
    title:'¡El patrón salta de 5 en 5!',
    sub:'¿Qué número viene después? · What comes next?',
    guide:{
      concept:'<strong>Conteo de 5 en 5 (Skip counting by 5).</strong> Después de los saltos de 2 del Nivel 4, ahora contamos de 5 en 5. Es fundamental para leer el reloj (cada número = 5 minutos) y es la base de la tabla del 5. ¡Una mano completa siempre son 5 dedos!',
      tip:'"Levantemos las manos juntos: una mano = 5... dos manos = 10... cerremos y abramos: 15!" Contar con manos completas hace los saltos de 5 concretos y memorables.',
    },
    questions:[
      { seq:[5,10],       opts:[12,15,18], ans:1 },
      { seq:[5,10,15],    opts:[18,20,22], ans:1 },
      { seq:[10,15,20],   opts:[23,25,27], ans:1 },
      { seq:[5,10,15,20], opts:[22,25,28], ans:1 },
    ],
  },

  {
    id:'sub15', type:'subtract',
    badge:'➖ Matemáticas · Resta hasta 15',
    title:'¿Cuántos quedan? / How many are left?',
    sub:'¡Números más grandes! / Bigger numbers!',
    guide:{
      concept:'<strong>Resta con números hasta 15.</strong> En el Nivel 4 restábamos hasta 10. Ahora llegamos a 15, el siguiente umbral natural. Restar siempre es "quitar y contar lo que queda", independientemente del tamaño del número.',
      tip:'"Había [total] animales. Se fueron [leaving] (señalá los que tienen ❌). ¿Cuántos tienen todavía la cara feliz?" Para números grandes, contar SOLO los sin ❌ señalando con el dedo uno por uno.',
    },
    questions:[
      { animal:'🐄', total:11, leaving:4, opts:[6,7,8], ans:7 },
      { animal:'🐷', total:13, leaving:5, opts:[7,8,9], ans:8 },
      { animal:'🐑', total:12, leaving:7, opts:[4,5,6], ans:5 },
      { animal:'🐔', total:14, leaving:6, opts:[7,8,9], ans:8 },
    ],
  },

  {
    id:'halves', type:'halves',
    badge:'½ Matemáticas · ¡Mitades!',
    title:'¡Partimos en dos partes iguales!',
    sub:'¿Cuántos hay en CADA mitad? · How many in EACH half?',
    guide:{
      concept:'<strong>La fracción ½ — la mitad.</strong> La mitad es la primera fracción que aprenden los niños porque es intuitiva: partir algo en dos partes IGUALES. Aparece constantemente en la vida diaria y es la puerta de entrada al concepto de división.',
      tip:'"Hay [total] manzanas. Las vamos a repartir entre DOS. ¿Cuántas le toca a cada uno si les damos lo mismo?" Si duda, repartir físicamente objetos reales: "Una para vos, una para mí..." hasta terminar.',
    },
    questions:[
      { emoji:'🍎', total:4,  opts:[1,2,3], ans:2 },
      { emoji:'🌟', total:6,  opts:[2,3,4], ans:3 },
      { emoji:'🐄', total:8,  opts:[3,4,5], ans:4 },
      { emoji:'🍪', total:10, opts:[4,5,6], ans:5 },
    ],
  },

  {
    id:'ordinals', type:'ordinals',
    badge:'🏅 Matemáticas · Números Ordinales',
    title:'¿Quién llegó en ese lugar?',
    sub:'1ro, 2do, 3ro, 4to... / 1st, 2nd, 3rd, 4th...',
    guide:{
      concept:'<strong>Números ordinales.</strong> Los ordinales describen POSICIÓN, no cantidad. "Primero, segundo, tercero..." son fundamentales para secuenciar eventos y en programación para acceder a elementos de una lista por su índice.',
      tip:'"Mirá la carrera: el que está MÁS A LA IZQUIERDA llegó PRIMERO. ¿Y el que está justo después? Ese llegó SEGUNDO." Señalá de izquierda a derecha con el dedo.',
    },
    questions:[
      { lineup:['🐴','🐄','🐷','🐑'], ask:'PRIMERO / 1st',  opts:['🐴','🐷','🐑'], correctOpt:0 },
      { lineup:['🐔','🐰','🐸','🐮'], ask:'SEGUNDO / 2nd',  opts:['🐔','🐰','🐮'], correctOpt:1 },
      { lineup:['🦁','🐘','🦊','🐧'], ask:'TERCERO / 3rd',  opts:['🦁','🦊','🐧'], correctOpt:1 },
      { lineup:['🐴','🐄','🐷','🐑'], ask:'CUARTO / 4th',   opts:['🐄','🐷','🐑'], correctOpt:2 },
    ],
  },

  {
    id:'not', type:'not-logic',
    badge:'❌ Programación · NOT (No lógico)',
    title:'NOT cambia el resultado / NOT flips the answer',
    sub:'NOT VERDADERO = FALSO · NOT FALSO = VERDADERO',
    guide:{
      concept:'<strong>El operador NOT — Negación lógica.</strong> NOT invierte el valor de verdad. NOT VERDADERO = FALSO, y NOT FALSO = VERDADERO. En programación: "mientras NO llegues a la meta, seguí corriendo". Junto con AND y OR que vimos antes, NOT completa los tres operadores lógicos fundamentales.',
      tip:'"NOT significa LO CONTRARIO." Juego del contrario: "Yo digo algo y vos decís lo opuesto. YO: está de día → VOS: NO está de día." Practicar oralmente antes de mirar la pantalla ayuda mucho.',
    },
    questions:[
      { factEmoji:'🌧️', factText:'Está lloviendo / It IS raining',        notStatement:'NOT está lloviendo / NOT raining',        ans:false },
      { factEmoji:'☀️', factText:'NO está lloviendo / It is NOT raining', notStatement:'NOT está lloviendo / NOT raining',        ans:true  },
      { factEmoji:'🍎', factText:'SÍ hay manzanas / There ARE apples',    notStatement:'NOT hay manzanas / NOT there are apples', ans:false },
      { factEmoji:'🚫', factText:'NO hay manzanas / There are NO apples', notStatement:'NOT hay manzanas / NOT there are apples', ans:true  },
    ],
  },

  {
    id:'variable', type:'variable',
    badge:'📦 Programación · Variables',
    title:'La caja guarda un valor / The box stores a value',
    sub:'¿Cuánto hay en la caja? / How much is in the box?',
    guide:{
      concept:'<strong>¿Qué es una variable?</strong> Una variable es como una caja con nombre que guarda información. Tiene un nombre ("manzanas") y un valor (cuántas hay). En programación, las variables permiten que los programas "recuerden" cosas. Cambiar el valor se llama "actualizar la variable".',
      tip:'Hacé una caja real en casa (una cajita de cartón). Poné objetos adentro: "Esta es la variable MANZANAS. Tiene 3. ¡Pusimos 2 más! ¿Cuántas hay ahora?" Nombrar la caja con una etiqueta hace el concepto muy concreto.',
    },
    questions:[
      { varName:'🍎 manzanas', startEmoji:'🍎', startVal:3, op:null,     opVal:0, opts:[2,3,4], ans:3 },
      { varName:'⭐ estrellas', startEmoji:'⭐', startVal:4, op:'add',    opVal:2, opts:[5,6,7], ans:6 },
      { varName:'🐄 vacas',    startEmoji:'🐄', startVal:6, op:'remove', opVal:2, opts:[3,4,5], ans:4 },
      { varName:'🎈 globos',   startEmoji:'🎈', startVal:5, op:'add',    opVal:3, opts:[7,8,9], ans:8 },
    ],
  },

  {
    id:'nestedif', type:'nested-if',
    badge:'🔀 Programación · SI dentro de SI',
    title:'¡Un SI dentro de otro SI! / An IF inside an IF!',
    sub:'Seguí el árbol paso a paso · Follow the tree step by step',
    guide:{
      concept:'<strong>IF anidado (nested IF).</strong> Un IF anidado es cuando dentro de una rama ENTONCES hay OTRO SI. Primero se evalúa la condición exterior; si es verdadera, se evalúa la interior. Es la base de algoritmos con múltiples pasos de decisión.',
      tip:'Recorré el árbol con el dedo ANTES de buscar la respuesta: "¿Molly tiene hambre? SÍ → entonces, ¿hay comida? SÍ → entonces come." Ir despacio, pregunta por pregunta, es exactamente como rastrean bugs los programadores.',
    },
    questions:[
      {
        treeType:'hunger',
        situationText:'🍽️ Molly tiene hambre ✅<br>🥕 Hay comida ✅',
        opts:[
          { emoji:'😋', label:'¡Comer!\nEat!' },
          { emoji:'😔', label:'Esperar\nWait' },
          { emoji:'🎮', label:'¡Jugar!\nPlay!' },
        ],
        ans:0,
      },
      {
        treeType:'hunger',
        situationText:'🍽️ Molly tiene hambre ✅<br>🥕 No hay comida ❌',
        opts:[
          { emoji:'😋', label:'¡Comer!\nEat!' },
          { emoji:'😔', label:'Esperar\nWait' },
          { emoji:'🎮', label:'¡Jugar!\nPlay!' },
        ],
        ans:1,
      },
      {
        treeType:'hunger',
        situationText:'🍽️ Molly NO tiene hambre ❌',
        opts:[
          { emoji:'😋', label:'¡Comer!\nEat!' },
          { emoji:'😔', label:'Esperar\nWait' },
          { emoji:'🎮', label:'¡Jugar!\nPlay!' },
        ],
        ans:2,
      },
      {
        treeType:'sleep',
        situationText:'😴 Molly tiene sueño ✅<br>🌙 Es de noche ✅',
        opts:[
          { emoji:'😴', label:'¡Dormir!\nSleep!' },
          { emoji:'🛋️', label:'Descansar\nRest' },
          { emoji:'🎮', label:'¡Seguir jugando!\nKeep playing!' },
        ],
        ans:0,
      },
    ],
  },

  {
    id:'debug5', type:'order',
    badge:'🧩 Programación · Ordenar 5 Pasos',
    title:'¡5 pasos en orden! / 5 steps in order!',
    sub:'Del primero al último · From first to last',
    guide:{
      concept:'<strong>Secuenciar 5 instrucciones.</strong> En el Nivel 4 ordenábamos 4 pasos. Ahora hay 5, lo que requiere retener más pasos en la memoria de trabajo y planificar más antes de actuar — exactamente lo que hacen los programadores con pseudocódigo.',
      tip:'Antes de tocar la pantalla: "¿Cuál es el PRIMERO de todo? ¿Y el SEGUNDO?" Pedile que te cuente los pasos a vos primero, como si fuera la maestra, y luego ejecutarlos en la pantalla.',
    },
    questions:[
      {
        prompt:'🥪 Hacer un sándwich / Make a sandwich:',
        steps:[
          { emoji:'🧀', text:'Poner el queso / Add cheese',        pos:3 },
          { emoji:'🍞', text:'Tomar el pan / Take the bread',      pos:1 },
          { emoji:'🍽️', text:'¡Servir y comer! / Serve and eat!', pos:5 },
          { emoji:'🧈', text:'Untar manteca / Spread butter',      pos:2 },
          { emoji:'🥬', text:'Poner lechuga / Add lettuce',        pos:4 },
        ],
      },
      {
        prompt:'🌱 Hacer un jardín / Make a garden:',
        steps:[
          { emoji:'💧', text:'Regar las plantas / Water the plants',        pos:5 },
          { emoji:'🪴', text:'Buscar la maceta / Get the pot',              pos:2 },
          { emoji:'🌞', text:'Buscar un lugar con sol / Find a sunny spot', pos:1 },
          { emoji:'🌱', text:'Plantar las semillas / Plant seeds',          pos:4 },
          { emoji:'🪣', text:'Llenar con tierra / Fill with soil',          pos:3 },
        ],
      },
      {
        prompt:'🎂 Hacer una torta / Make a cake:',
        steps:[
          { emoji:'🥣', text:'Mezclar todo / Mix everything',          pos:3 },
          { emoji:'🎂', text:'¡Decorar y comer! / Decorate and eat!', pos:5 },
          { emoji:'🥚', text:'Romper los huevos / Break eggs',         pos:2 },
          { emoji:'🌡️', text:'Meter al horno / Put in oven',          pos:4 },
          { emoji:'🛒', text:'Comprar ingredientes / Buy ingredients', pos:1 },
        ],
      },
    ],
  },
];

// ─── CONFETTI ────────────────────────────────────────────────────────────────
function launchConfetti() {
  document.getElementById('m5-confetti')?.remove();
  const canvas = document.createElement('canvas');
  canvas.id = 'm5-confetti';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const pieces = Array.from({length:140}, () => ({
    x:Math.random()*canvas.width, y:Math.random()*-canvas.height,
    r:Math.random()*8+4, c:`hsl(${Math.random()*360},90%,60%)`,
    speed:Math.random()*4+2, angle:Math.random()*360, spin:(Math.random()-.5)*5,
  }));
  let frame = 0;
  (function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.angle*Math.PI/180);
      ctx.fillStyle=p.c; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.5); ctx.restore();
      p.y+=p.speed; p.angle+=p.spin; if(p.y>canvas.height) p.y=-20;
    });
    if(++frame<220) requestAnimationFrame(draw); else canvas.remove();
  })();
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
export function render(root) {
  injectCSS();
  document.getElementById('m5-confetti')?.remove();

  root.innerHTML = `<div id="m5-root">

    <!-- WELCOME -->
    <div class="m5-scr m5-scr--on m5-screen" id="m5-welcome">
      <div class="m5-card" style="background:linear-gradient(135deg,#E0F2F1,#FFFDE7,#E8F5E9)">
        <div class="m5-welcome-title">🐄 ¡Nivel 5, ${getChildName()}! 🌟</div>
        <div class="m5-welcome-sub">¡Más aventuras con Molly! · More adventures with Molly!</div>
        <span style="font-size:3rem;display:block;margin:8px 0">🐄🌟🐷🌟🐑🌟🐔🌟🐴</span>
        <div class="m5-act-list">
          <div class="m5-act-item" style="background:#E0F2F1">📈 Saltos de 5 <span class="m5-act-new">+difícil</span></div>
          <div class="m5-act-item" style="background:#FFEBEE">➖ Resta hasta 15 <span class="m5-act-new">+difícil</span></div>
          <div class="m5-act-item" style="background:#FCE4EC">½ ¡Mitades! <span class="m5-act-new">nuevo</span></div>
          <div class="m5-act-item" style="background:#E3F2FD">🏅 Ordinales <span class="m5-act-new">nuevo</span></div>
          <div class="m5-act-item" style="background:#FFF3E0">❌ NOT Lógico <span class="m5-act-new">nuevo</span></div>
          <div class="m5-act-item" style="background:#E8F5E9">📦 Variables <span class="m5-act-new">nuevo</span></div>
          <div class="m5-act-item" style="background:#F3E5F5">🔀 SI dentro de SI <span class="m5-act-new">nuevo</span></div>
          <div class="m5-act-item" style="background:#FFFDE7">🧩 Ordenar 5 Pasos <span class="m5-act-new">+difícil</span></div>
        </div>
        <button class="m5-start" id="m5-start">¡Empezar Nivel 5! 🚀🌟</button>
      </div>
    </div>

    <!-- GAME -->
    <div class="m5-scr m5-screen" id="m5-game">
      <div class="m5-stars-row" id="m5-stars"></div>
      <div id="m5-container"></div>
      <div class="m5-fb" id="m5-feedback" hidden></div>
      <div class="m5-nav">
        <button class="m5-nav-btn m5-btn-prev" id="m5-prev">◀ Atrás</button>
        <button class="m5-nav-btn m5-btn-next" id="m5-next" disabled>Siguiente ▶</button>
      </div>
    </div>

    <!-- FINAL -->
    <div class="m5-scr m5-screen" id="m5-final">
      <div class="m5-card m5-final-card">
        <span class="m5-final-trophy">🏆🌟🏆</span>
        <div class="m5-final-title">¡NIVEL 5 COMPLETADO! 🌟</div>
        <div class="m5-final-medals" id="m5-medals"></div>
        <div class="m5-final-sub" id="m5-finalmsg"></div>
        <span style="font-size:2.5rem;display:block;margin:12px 0">🐄🌟🐷🌟🐑🌟🐔🌟🐴🌟🐰</span>
        <div class="m5-final-sub">¡Molly está súper orgullosa de vos! 🐄🌟</div>
        <div class="m5-nav">
          <button class="m5-nav-btn m5-btn-restart" id="m5-restart">🔄 Jugar de nuevo</button>
        </div>
      </div>
    </div>

  </div>`;

  // ── State ──
  let curAct = 0, curQ = 0, score = 0, total = 0, answered = false;
  let orderClicks = [];

  // ── DOM ──
  const $ = id => document.getElementById(id);
  const welcome   = $('m5-welcome');
  const game      = $('m5-game');
  const finalScr  = $('m5-final');
  const container = $('m5-container');
  const feedback  = $('m5-feedback');
  const nextBtn   = $('m5-next');
  const starsEl   = $('m5-stars');

  function showScr(name) {
    [welcome, game, finalScr].forEach(s => s.classList.remove('m5-scr--on'));
    ({ welcome, game, final:finalScr })[name]?.classList.add('m5-scr--on');
  }

  function updateStars() {
    starsEl.innerHTML = Array.from({length:8}, (_,i) =>
      `<span style="font-size:1.3rem;filter:${i<score?'none':'grayscale(1) opacity(.35)'};transition:filter .3s">⭐</span>`
    ).join('') + `<span class="m5-score">${score}/${total}</span>`;
  }

  function showFeedback(ok, msg) {
    feedback.textContent = (ok ? '✅ ' : '❌ ') + msg;
    feedback.className   = 'm5-fb ' + (ok ? 'm5-fb--ok' : 'm5-fb--no');
    feedback.hidden = false;
    if (ok) score++;
    total++; answered = true; nextBtn.disabled = false;
    updateStars();
  }

  function clearFeedback() {
    feedback.hidden = true; feedback.textContent = ''; feedback.className = 'm5-fb';
  }

  // ── Render activity ──
  function renderAct() {
    const act = ACTS[curAct], q = act.questions[curQ];
    const pct = Math.round(curQ / act.questions.length * 100);

    const guide = act.guide ? `
      <button class="m5-guide-toggle" data-action="guide-toggle">👨‍👩‍👧 Para papá y mamá ▼</button>
      <div class="m5-guide-box">
        <div>${act.guide.concept}</div>
        <div class="m5-guide-tip">💡 ${act.guide.tip}</div>
      </div>` : '';

    let body = '';
    if (act.type === 'numseq')    body = renderNumSeq(q);
    if (act.type === 'subtract')  body = renderSubtract(q);
    if (act.type === 'halves')    body = renderHalves(q);
    if (act.type === 'ordinals')  body = renderOrdinals(q);
    if (act.type === 'not-logic') body = renderNot(q);
    if (act.type === 'variable')  body = renderVariable(q);
    if (act.type === 'nested-if') body = renderNestedIf(q);
    if (act.type === 'order')     body = renderOrder(q);

    container.innerHTML = `
      <div class="m5-card m5-card--${act.id}">
        <span class="m5-badge">${act.badge}</span>
        <div class="m5-pbar"><div class="m5-pfill" style="width:${pct}%"></div></div>
        ${guide}
        <div class="m5-qtitle">${act.title}</div>
        <div class="m5-qsub">${act.sub}</div>
        ${body}
      </div>`;
  }

  // ── Renderers ──
  function starsForNum(n) {
    let out = '';
    const rows = Math.ceil(n / 5);
    for (let r = 0; r < rows; r++) {
      const count = Math.min(5, n - r * 5);
      out += '⭐'.repeat(count) + (r < rows - 1 ? '<br>' : '');
    }
    return out;
  }

  function renderNumSeq(q) {
    const boxes = q.seq.map(n =>
      `<div class="m5-numseq-box">
        <div class="m5-numseq-num">${n}</div>
        <div class="m5-numseq-stars">${starsForNum(n)}</div>
      </div>`
    ).join('') + `<div class="m5-numseq-box blank"><div class="m5-numseq-q">?</div></div>`;
    const opts = q.opts.map((o,i) =>
      `<button class="m5-opt m5-opt--num" data-action="numseq" data-idx="${i}">${o}</button>`
    ).join('');
    return `<div class="m5-numseq-row">${boxes}</div>
      <div class="m5-opts">${opts}</div>`;
  }

  function renderSubtract(q) {
    const animals = Array.from({length:q.total}, (_,i) =>
      `<span class="m5-sub-animal${i < q.leaving ? ' leaving' : ''}">${q.animal}</span>`
    ).join('');
    const opts = q.opts.map(o =>
      `<button class="m5-opt m5-opt--num" data-action="subtract" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m5-sub-box">
        <div class="m5-sub-label">❌ Se van ${q.leaving} / ${q.leaving} leave</div>
        <div class="m5-sub-row">${animals}</div>
      </div>
      <div class="m5-qsub" style="margin-top:8px">¿Cuántos ${q.animal} quedan? / How many are left?</div>
      <div class="m5-opts">${opts}</div>`;
  }

  function renderHalves(q) {
    const display = Array(q.total).fill(q.emoji).join('');
    const opts = q.opts.map(o =>
      `<button class="m5-opt m5-opt--num" data-action="halves" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m5-qsub">Total: <strong>${q.total}</strong></div>
      <div class="m5-half-total">${display}</div>
      <div style="font-size:1.2rem;margin:6px 0;color:#888">✂️ ÷ 2</div>
      <div class="m5-halves-wrap">
        <div><div class="m5-half-box">?</div><div class="m5-half-lbl">½ Mitad A / Half A</div></div>
        <div style="font-size:1.6rem;color:#888">➕</div>
        <div><div class="m5-half-box">?</div><div class="m5-half-lbl">½ Mitad B / Half B</div></div>
      </div>
      <div class="m5-opts">${opts}</div>`;
  }

  function renderOrdinals(q) {
    const medals = ['🥇','🥈','🥉','🎀'];
    const posLabels = ['1ro','2do','3ro','4to'];
    const raceHtml = q.lineup.map((animal, i) =>
      `<div class="m5-race-animal">
        <span class="m5-race-medal">${medals[i]}</span>
        <span class="m5-race-emoji">${animal}</span>
        <span class="m5-race-pos">${posLabels[i]}</span>
      </div>`
    ).join('');
    const opts = q.opts.map((o,i) =>
      `<button class="m5-ord-btn" data-action="ordinals" data-idx="${i}">${o}</button>`
    ).join('');
    return `<div class="m5-qsub">¿Quién llegó <strong>${q.ask}</strong>? / Who finished <strong>${q.ask}</strong>?</div>
      <div class="m5-race">${raceHtml}</div>
      <div class="m5-ord-opts">${opts}</div>`;
  }

  function renderNot(q) {
    return `<div class="m5-not-fact">${q.factEmoji} ${q.factText}</div>
      <div class="m5-not-q">¿Es <span class="m5-not-kw">VERDADERO</span> que...<br><strong>${q.notStatement}?</strong></div>
      <div class="m5-opts">
        <button class="m5-tf m5-tf--t" data-action="tf" data-val="true">✅ SÍ, VERDADERO<br><small>TRUE</small></button>
        <button class="m5-tf m5-tf--f" data-action="tf" data-val="false">❌ NO, FALSO<br><small>FALSE</small></button>
      </div>`;
  }

  function renderVariable(q) {
    const startItems = Array(q.startVal).fill(q.startEmoji).join('');
    const opts = q.opts.map(o =>
      `<button class="m5-opt m5-opt--num" data-action="variable" data-val="${o}">${o}</button>`
    ).join('');
    if (!q.op) {
      return `<div class="m5-qsub">📦 La variable <strong>${q.varName}</strong> tiene:</div>
        <div style="text-align:center;margin:10px 0">
          <div class="m5-var-box">
            <div class="m5-var-label">${q.varName}</div>
            <div class="m5-var-content">${startItems}</div>
          </div>
        </div>
        <div class="m5-qsub">¿Cuánto hay en la caja? / How much is in the box?</div>
        <div class="m5-opts">${opts}</div>`;
    }
    const opLabel = q.op === 'add'
      ? `Agregamos ${q.opVal} más ${q.startEmoji} / We add ${q.opVal} more`
      : `Quitamos ${q.opVal} ${q.startEmoji} / We remove ${q.opVal}`;
    const opIcon = q.op === 'add' ? '➕' : '➖';
    return `<div style="text-align:center;margin:10px 0">
        <div class="m5-var-box">
          <div class="m5-var-label">${q.varName}</div>
          <div class="m5-var-content">${startItems}</div>
        </div>
        <div class="m5-var-op-row">${opIcon} ${opLabel}</div>
        <div class="m5-var-arrow">⬇️</div>
        <div class="m5-var-box">
          <div class="m5-var-label">${q.varName}</div>
          <div class="m5-var-content empty">?</div>
        </div>
      </div>
      <div class="m5-opts">${opts}</div>`;
  }

  function renderNestedIf(q) {
    const isHunger = q.treeType === 'hunger';
    const outerCond = isHunger ? '🍽️ Molly tiene hambre' : '😴 Molly tiene sueño';
    const innerCond = isHunger ? '🥕 Hay comida'         : '🌙 Es de noche';
    const tree = `<div class="m5-nested-tree">
        <div class="m5-tree-row"><span class="m5-kw m5-kw-if">SI / IF</span><span class="m5-tree-cond">${outerCond}</span></div>
        <div class="m5-tree-row" style="margin-left:18px"><span class="m5-kw m5-kw-then">ENTONCES</span><span class="m5-tree-cond">SI / IF ${innerCond}</span></div>
        <div class="m5-tree-row" style="margin-left:36px"><span class="m5-kw m5-kw-then">→</span><span class="m5-tree-action">${q.opts[0].emoji} ${q.opts[0].label.split('\n')[0]}</span></div>
        <div class="m5-tree-row" style="margin-left:36px"><span class="m5-kw m5-kw-else">SINO →</span><span class="m5-tree-action">${q.opts[1].emoji} ${q.opts[1].label.split('\n')[0]}</span></div>
        <div class="m5-tree-row" style="margin-left:18px"><span class="m5-kw m5-kw-else">SINO →</span><span class="m5-tree-action">${q.opts[2].emoji} ${q.opts[2].label.split('\n')[0]}</span></div>
      </div>`;
    const opts = q.opts.map((o,i) =>
      `<button class="m5-nested-opt" data-action="nested" data-idx="${i}">
        <span class="m5-nested-emoji">${o.emoji}</span>
        <span class="m5-nested-lbl">${o.label.replace(/\n/g,'<br>')}</span>
      </button>`
    ).join('');
    return `${tree}
      <div class="m5-nested-sit">🔍 Situación / Situation:<br>${q.situationText}</div>
      <div class="m5-nested-opts">${opts}</div>`;
  }

  function renderOrder(q) {
    const steps = q.steps.map((s,i) =>
      `<div class="m5-order-step" data-action="order" data-idx="${i}" id="m5ostep-${i}">
        <div class="m5-order-badge" id="m5obadge-${i}">?</div>
        <span class="m5-order-emoji">${s.emoji}</span>
        <span class="m5-order-text">${s.text}</span>
      </div>`
    ).join('');
    return `<div class="m5-qsub" style="font-weight:700;margin-bottom:4px">${q.prompt}</div>
      <div class="m5-order-hint">Tocá los pasos del primero al último / Tap steps from first to last</div>
      <div class="m5-order-steps">${steps}</div>`;
  }

  // ── Answer handlers ──
  function answerNumSeq(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="numseq"]').forEach((b,i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add('m5-ok');
      else if (i === idx) b.classList.add('m5-no');
    });
    showFeedback(idx === q.ans,
      idx === q.ans ? `¡Correcto! ¡${q.opts[q.ans]}! 🌟` : `No... el siguiente era ${q.opts[q.ans]}`);
  }

  function answerSubtract(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="subtract"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m5-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m5-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.total} − ${q.leaving} = ${q.ans} 🌟` : `La respuesta era ${q.ans}`);
  }

  function answerHalves(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="halves"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m5-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m5-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.ans} en cada mitad 🌟` : `No... hay ${q.ans} en cada mitad`);
  }

  function answerOrdinals(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="ordinals"]').forEach((b,i) => {
      b.disabled = true;
      if (i === q.correctOpt) b.classList.add('m5-ok');
      else if (i === idx) b.classList.add('m5-no');
    });
    showFeedback(idx === q.correctOpt,
      idx === q.correctOpt ? '¡Correcto! 🌟' : `No... era ${q.opts[q.correctOpt]}`);
  }

  function answerTF(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="tf"]').forEach(b => {
      b.disabled = true;
      const bv = b.dataset.val === 'true';
      if (bv === q.ans) b.classList.add('m5-ok');
      else if (bv === val && !ok) b.classList.add('m5-no');
    });
    showFeedback(ok,
      ok ? '¡Correcto! NOT invierte el resultado 🌟'
         : `No... NOT da ${q.ans ? 'VERDADERO / TRUE' : 'FALSO / FALSE'}`);
  }

  function answerVariable(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="variable"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m5-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m5-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.ans} 🌟` : `La respuesta era ${q.ans}`);
  }

  function answerNested(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="nested"]').forEach((b,i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add('m5-ok');
      else if (i === idx) b.classList.add('m5-no');
    });
    showFeedback(idx === q.ans,
      idx === q.ans ? '¡Correcto! Molly va por el camino correcto 🌟'
                    : `No... Molly debe ${q.opts[q.ans].emoji}`);
  }

  function answerOrder(idx) {
    if (answered) return;
    if (orderClicks.includes(idx)) return;
    orderClicks.push(idx);
    const badge = document.getElementById('m5obadge-' + idx);
    badge.textContent = orderClicks.length;
    badge.classList.add('selected');
    document.getElementById('m5ostep-' + idx).classList.add('clicked');
    if (orderClicks.length === ACTS[curAct].questions[curQ].steps.length) checkOrder();
  }

  function checkOrder() {
    const q = ACTS[curAct].questions[curQ];
    let correct = true;
    orderClicks.forEach((stepIdx, clickPos) => {
      if (q.steps[stepIdx].pos !== clickPos + 1) correct = false;
    });
    orderClicks.forEach((stepIdx, clickPos) => {
      const el = document.getElementById('m5ostep-' + stepIdx);
      el.classList.remove('clicked');
      el.classList.add(q.steps[stepIdx].pos === clickPos + 1 ? 'm5-ok' : 'm5-no');
    });
    showFeedback(correct,
      correct ? '¡Orden perfecto! / Perfect order! 🎉🌟' : 'El orden no era correcto / The order wasn\'t right ❌');
  }

  // ── Event delegation ──
  container.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const { action, idx, val } = el.dataset;
    if (action === 'guide-toggle') {
      const box = container.querySelector('.m5-guide-box');
      if (box) { box.classList.toggle('open'); el.textContent = box.classList.contains('open') ? '👨‍👩‍👧 Para papá y mamá ▲' : '👨‍👩‍👧 Para papá y mamá ▼'; }
      return;
    }
    if (answered) return;
    if (action === 'numseq')    answerNumSeq(+idx);
    else if (action === 'subtract') answerSubtract(+val);
    else if (action === 'halves')   answerHalves(+val);
    else if (action === 'ordinals') answerOrdinals(+idx);
    else if (action === 'tf')       answerTF(val === 'true');
    else if (action === 'variable') answerVariable(+val);
    else if (action === 'nested')   answerNested(+idx);
    else if (action === 'order')    answerOrder(+idx);
  });

  // ── Navigation ──
  $('m5-start').addEventListener('click', () => {
    curAct = 0; curQ = 0; score = 0; total = 0; answered = false; orderClicks = [];
    updateStars(); clearFeedback(); nextBtn.disabled = true;
    showScr('game'); renderAct();
  });

  $('m5-prev').addEventListener('click', () => {
    if (curAct > 0) {
      curAct--; curQ = 0; answered = false; orderClicks = []; clearFeedback(); nextBtn.disabled = true; renderAct();
    } else { showScr('welcome'); }
  });

  nextBtn.addEventListener('click', () => {
    if (!answered) return;
    curQ++; answered = false; orderClicks = []; clearFeedback(); nextBtn.disabled = true;
    const act = ACTS[curAct];
    if (curQ >= act.questions.length) {
      markDone('math', 5, act.id);
      curAct++; curQ = 0;
      if (curAct >= ACTS.length) { showFinal(); return; }
    }
    renderAct();
  });

  $('m5-restart').addEventListener('click', () => showScr('welcome'));

  function showFinal() {
    showScr('final');
    const stars = total > 0 ? Math.round(score / total * 8) : 0;
    $('m5-medals').textContent = '⭐'.repeat(stars);
    $('m5-finalmsg').textContent = score >= total * 0.75
      ? `¡Excelente! ${score}/${total} correctas 🌟`
      : `¡Muy bien! ${score}/${total} correctas 🌈`;
    launchConfetti();
  }

  updateStars();
  showScr('welcome');
}
