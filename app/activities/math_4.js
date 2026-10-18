import { markDone } from '../progress.js';
import { getChildName } from '../profiles.js';

function injectCSS() {
  if (document.getElementById('molly-math4-css')) return;
  const s = document.createElement('style');
  s.id = 'molly-math4-css';
  s.textContent = `
#m4-root .m4-scr { display:none }
#m4-root .m4-scr--on { display:block }
#m4-root .m4-screen { max-width:700px; margin:18px auto; padding:0 14px }

/* card */
#m4-root .m4-card { background:#fff; border-radius:22px; padding:22px 18px;
  box-shadow:0 6px 20px rgba(0,0,0,.1); text-align:center; position:relative; overflow:hidden }
#m4-root .m4-card::before { content:''; position:absolute; top:0; left:0; right:0; height:6px }
#m4-root .m4-card--skip2::before   { background:linear-gradient(90deg,#4A148C,#AB47BC) }
#m4-root .m4-card--sub10::before   { background:linear-gradient(90deg,#BF360C,#FF7043) }
#m4-root .m4-card--compare::before { background:linear-gradient(90deg,#1565C0,#42A5F5) }
#m4-root .m4-card--doubles::before { background:linear-gradient(90deg,#2E7D32,#66BB6A) }
#m4-root .m4-card--ifelseB::before { background:linear-gradient(90deg,#E65100,#FFA000) }
#m4-root .m4-card--loops2::before  { background:linear-gradient(90deg,#00695C,#26A69A) }
#m4-root .m4-card--or::before      { background:linear-gradient(90deg,#C2185B,#F06292) }
#m4-root .m4-card--order::before   { background:linear-gradient(90deg,#6A1B9A,#CE93D8) }

/* badge */
#m4-root .m4-badge { display:inline-block; padding:5px 14px; border-radius:20px;
  font-size:.82rem; font-weight:700; color:#fff; margin-bottom:8px }
#m4-root .m4-card--skip2   .m4-badge { background:#6A1B9A }
#m4-root .m4-card--sub10   .m4-badge { background:#BF360C }
#m4-root .m4-card--compare .m4-badge { background:#1565C0 }
#m4-root .m4-card--doubles .m4-badge { background:#2E7D32 }
#m4-root .m4-card--ifelseB .m4-badge { background:#E65100 }
#m4-root .m4-card--loops2  .m4-badge { background:#00695C }
#m4-root .m4-card--or      .m4-badge { background:#C2185B }
#m4-root .m4-card--order   .m4-badge { background:#6A1B9A }

/* progress bar */
#m4-root .m4-pbar  { background:#EEE; border-radius:10px; height:8px; margin:8px 0 6px; overflow:hidden }
#m4-root .m4-pfill { height:100%; background:linear-gradient(90deg,#AB47BC,#FDD835); border-radius:10px; transition:width .4s }

/* question text */
#m4-root .m4-qtitle { font-size:1.2rem; color:#333; font-weight:700; margin-bottom:4px }
#m4-root .m4-qsub   { font-size:.88rem; color:var(--muted); margin-bottom:12px }

/* option buttons */
#m4-root .m4-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:14px }
#m4-root .m4-opt  { padding:12px 20px; font-size:1.4rem; border-radius:14px;
  border:3px solid transparent; cursor:pointer; background:#FFFDE7;
  font-family:inherit; transition:transform .15s; min-width:70px }
#m4-root .m4-opt:hover:not(:disabled) { transform:scale(1.08) }
#m4-root .m4-opt:disabled { cursor:default }
#m4-root .m4-opt--num { font-size:1.8rem; font-weight:700 }
#m4-root .m4-ok { background:#C8E6C9 !important; border-color:#388E3C !important }
#m4-root .m4-no { background:#FFCDD2 !important; border-color:#C62828 !important }

/* feedback */
#m4-root .m4-fb { font-size:1.2rem; font-weight:700; padding:10px 16px; border-radius:12px;
  margin:12px 0; animation:m4pop .3s }
#m4-root .m4-fb--ok { background:#C8E6C9; color:#2E7D32 }
#m4-root .m4-fb--no { background:#FFCDD2; color:#B71C1C }
@keyframes m4pop { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }

/* nav */
#m4-root .m4-nav { display:flex; gap:10px; justify-content:center; margin-top:16px }
#m4-root .m4-nav-btn { padding:10px 26px; font-size:1rem; font-weight:700; border-radius:12px;
  border:none; cursor:pointer; font-family:inherit; transition:all .15s }
#m4-root .m4-nav-btn:hover { transform:translateY(-2px); box-shadow:0 4px 10px rgba(0,0,0,.15) }
#m4-root .m4-btn-next    { background:#6A1B9A; color:#fff }
#m4-root .m4-btn-next:disabled { background:#CCC; cursor:default; transform:none; box-shadow:none }
#m4-root .m4-btn-prev    { background:#EEE; color:#555 }
#m4-root .m4-btn-restart { background:#F9A825; color:#5D4037 }

/* stars */
#m4-root .m4-stars-row { display:flex; align-items:center; justify-content:flex-end;
  gap:2px; padding:6px 0 }
#m4-root .m4-score { font-size:.9rem; color:var(--muted); margin-left:6px }

/* welcome */
#m4-root .m4-welcome-title { font-family:var(--display); font-size:2rem; color:#6A1B9A; margin:0 0 6px }
#m4-root .m4-welcome-sub   { color:var(--muted); margin:0 0 14px; font-size:.95rem }
#m4-root .m4-act-list { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin:12px 0; text-align:left }
#m4-root .m4-act-item { padding:8px 12px; border-radius:12px; font-size:.88rem; color:#333 }
#m4-root .m4-act-new  { font-size:.72rem; color:#888; margin-left:4px }
#m4-root .m4-start { background:linear-gradient(135deg,#4A148C,#AB47BC); color:#fff; border:none;
  padding:16px 40px; font-size:1.3rem; font-weight:800; border-radius:18px; cursor:pointer;
  font-family:var(--display); margin-top:8px; transition:transform .2s }
#m4-root .m4-start:hover { transform:scale(1.05) }

/* true/false buttons */
#m4-root .m4-stmt    { font-size:1.1rem; color:#333; margin:8px 0 2px; font-weight:600 }
#m4-root .m4-stmt-en { font-size:.88rem; color:var(--muted); margin-bottom:10px }
#m4-root .m4-tf { padding:16px 28px; font-size:1.35rem; font-weight:700; border-radius:18px;
  border:3px solid transparent; cursor:pointer; font-family:inherit; min-width:138px; transition:all .15s }
#m4-root .m4-tf:hover:not(:disabled) { transform:scale(1.06) }
#m4-root .m4-tf--t { background:#E8F5E9; color:#2E7D32; border-color:#2E7D32 }
#m4-root .m4-tf--f { background:#FFEBEE; color:#B71C1C; border-color:#B71C1C }

/* growing patterns */
#m4-root .m4-grow-seq  { display:flex; gap:8px; justify-content:center; align-items:flex-end; flex-wrap:wrap; margin:12px 0 }
#m4-root .m4-grow-box  { background:#F3E5F5; border:2px solid #CE93D8; border-radius:12px;
  padding:8px 10px; font-size:1.5rem; min-width:50px; text-align:center; line-height:1.4;
  word-break:break-all; max-width:120px }
#m4-root .m4-grow-box.blank { background:#FFFDE7; border:3px dashed #F9A825; color:#AAA;
  font-size:.9rem; line-height:3.5; min-width:54px }
#m4-root .m4-grow-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:12px }
#m4-root .m4-grow-opt  { background:#F3E5F5; border:3px solid #CE93D8; border-radius:12px;
  padding:8px 14px; font-size:1.4rem; cursor:pointer; font-family:inherit; transition:all .15s;
  word-break:break-all; max-width:150px; line-height:1.3 }
#m4-root .m4-grow-opt:hover:not(:disabled) { transform:scale(1.06); border-color:#6A1B9A }
#m4-root .m4-grow-opt:disabled { cursor:default }

/* subtract */
#m4-root .m4-sub-box   { background:#FFEBEE; border:3px solid #EF9A9A; border-radius:14px;
  padding:12px 16px; display:inline-block; margin:8px 0 }
#m4-root .m4-sub-label { font-size:.82rem; color:#B71C1C; font-weight:700; margin-bottom:6px }
#m4-root .m4-sub-row   { display:flex; gap:5px; justify-content:center; flex-wrap:wrap;
  font-size:2rem; line-height:1.3; margin:4px 0 }
#m4-root .m4-sub-animal { display:inline-block; transition:opacity .3s }
#m4-root .m4-sub-animal.leaving { opacity:.2 }

/* compare */
#m4-root .m4-compare-wrap { display:flex; gap:16px; justify-content:center; align-items:center;
  flex-wrap:wrap; margin:12px 0 }
#m4-root .m4-compare-group { background:#E3F2FD; border:3px solid #90CAF9; border-radius:16px;
  padding:12px 16px; font-size:1.7rem; line-height:1.4; text-align:center;
  min-width:90px; word-break:break-all }
#m4-root .m4-compare-label { font-size:.78rem; color:#888; margin-top:4px }
#m4-root .m4-compare-vs { font-size:1.8rem; color:#BBB }
#m4-root .m4-cmp-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:14px }
#m4-root .m4-cmp-btn { padding:12px 16px; font-size:1rem; font-weight:700; border-radius:14px;
  border:3px solid #90CAF9; cursor:pointer; background:#E3F2FD;
  font-family:inherit; min-width:100px; color:#1565C0; transition:all .15s }
#m4-root .m4-cmp-btn:hover:not(:disabled) { transform:scale(1.06); border-color:#1565C0 }
#m4-root .m4-cmp-btn:disabled { cursor:default }

/* doubles */
#m4-root .m4-doubles-row { display:flex; gap:12px; justify-content:center; align-items:center;
  flex-wrap:wrap; margin:12px 0; font-size:1.9rem }
#m4-root .m4-doubles-group { background:#E8F5E9; border:3px solid #A5D6A7; border-radius:14px;
  padding:10px 14px; line-height:1.4; text-align:center; word-break:break-all }
#m4-root .m4-doubles-op { font-size:1em; color:#2E7D32; font-weight:700 }
#m4-root .m4-doubles-blank { background:#FFFDE7; border:3px dashed #F9A825;
  border-radius:14px; padding:10px 18px; color:#AAA; font-size:.7em;
  min-width:60px; text-align:center; line-height:2.5 }

/* ifelse-B */
#m4-root .m4-ifB-block { background:#FFF3E0; border:3px solid #FFCC80; border-radius:18px;
  padding:14px 18px; margin:10px 0 }
#m4-root .m4-ifB-situation { font-size:1.15rem; font-weight:700; color:#E65100;
  text-align:center; margin-bottom:8px }
#m4-root .m4-ifB-condlabel { font-size:.85rem; color:#777; margin-bottom:10px; text-align:center }
#m4-root .m4-ifB-row { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:8px }
#m4-root .m4-ifB-btn { background:#fff; border:3px solid #FFCC80; border-radius:14px;
  padding:12px 16px; min-width:120px; text-align:center; cursor:pointer;
  font-family:inherit; transition:all .15s }
#m4-root .m4-ifB-btn:hover:not(:disabled) { transform:scale(1.06); border-color:#E65100 }
#m4-root .m4-ifB-btn:disabled { cursor:default }
#m4-root .m4-ifB-kw { font-size:.78rem; font-weight:700; color:#fff; padding:3px 10px;
  border-radius:8px; margin-bottom:6px; display:inline-block }
#m4-root .m4-kw-then { background:#E65100 }
#m4-root .m4-kw-else { background:#1565C0 }
#m4-root .m4-ifB-emoji { font-size:2.2rem; display:block; margin:4px 0 }
#m4-root .m4-ifB-label { font-size:.78rem; color:#555 }

/* loops */
#m4-root .m4-loop-grid   { display:flex; flex-direction:column; gap:5px; margin:10px 0 }
#m4-root .m4-loop-row    { display:flex; align-items:center; gap:6px; background:#E0F2F1;
  border:2px solid #80CBC4; border-radius:10px; padding:7px 12px }
#m4-root .m4-loop-iter   { font-size:.82rem; color:#00695C; font-weight:700; min-width:24px }
#m4-root .m4-loop-sounds { font-size:1rem; letter-spacing:2px }
#m4-root .m4-loop-total  { background:#00695C; color:white; border-radius:10px;
  padding:8px 12px; font-weight:700; font-size:.95rem;
  display:flex; align-items:center; gap:6px; justify-content:center }

/* OR connector */
#m4-root .m4-or-box       { display:flex; gap:10px; justify-content:center; align-items:center; flex-wrap:wrap; margin:12px 0 }
#m4-root .m4-cond-pill    { background:#FCE4EC; border:3px solid #F48FB1; border-radius:12px;
  padding:8px 14px; font-size:1.3rem; font-weight:700; color:#C2185B }
#m4-root .m4-or-connector { background:#C2185B; color:white; border-radius:8px;
  padding:5px 12px; font-size:.88rem; font-weight:700 }

/* order steps */
#m4-root .m4-order-steps { display:flex; flex-direction:column; gap:8px; margin:10px 0; text-align:left }
#m4-root .m4-order-step { display:flex; align-items:center; gap:10px;
  padding:10px 14px; background:#F3E5F5; border:3px solid #CE93D8;
  border-radius:12px; cursor:pointer; transition:all .15s; user-select:none }
#m4-root .m4-order-step:hover:not(.clicked):not(.m4-ok):not(.m4-no) { border-color:#6A1B9A; transform:translateX(4px) }
#m4-root .m4-order-step.clicked { border-color:#6A1B9A; background:#EDE7F6 }
#m4-root .m4-order-badge { font-size:1rem; font-weight:700; color:#AAA;
  background:#fff; border:2px solid #CE93D8; border-radius:50%;
  width:32px; height:32px; display:flex; align-items:center; justify-content:center;
  flex-shrink:0; transition:all .2s }
#m4-root .m4-order-badge.selected { background:#6A1B9A; color:#fff; border-color:#6A1B9A }
#m4-root .m4-order-emoji { font-size:1.7rem }
#m4-root .m4-order-text  { flex:1; color:#333; font-size:.9rem }
#m4-root .m4-order-hint  { font-size:.8rem; color:var(--muted); margin-bottom:8px; font-style:italic }

/* parent guide */
#m4-root .m4-guide-toggle { display:inline-flex; align-items:center; gap:6px; background:#FFF8E1;
  border:2px solid #FFD54F; border-radius:12px; padding:7px 14px; font-size:.82rem;
  color:#5D4037; cursor:pointer; margin-bottom:8px; font-family:inherit; transition:background .15s }
#m4-root .m4-guide-toggle:hover { background:#FFE082 }
#m4-root .m4-guide-box { background:#FFFDE7; border:2px solid #FFD54F; border-radius:14px;
  padding:12px 14px; margin-bottom:10px; text-align:left; font-size:.83rem;
  line-height:1.5; color:#4E342E; display:none }
#m4-root .m4-guide-box.open { display:block }
#m4-root .m4-guide-tip { margin-top:8px; padding:8px 10px; background:#E8F5E9;
  border-left:4px solid #388E3C; border-radius:0 10px 10px 0; color:#1B5E20; font-style:italic }

/* hint */
#m4-root .m4-hint { font-size:.82rem; color:var(--muted); margin-top:6px }

/* final */
#m4-root .m4-final-card  { background:linear-gradient(135deg,#F3E5F5,#C8E6C9,#E1F5FE) }
#m4-root .m4-final-trophy { font-size:3.5rem; display:block; margin:8px 0 }
#m4-root .m4-final-title  { font-family:var(--display); font-size:1.8rem; font-weight:800; color:#6A1B9A }
#m4-root .m4-final-medals { font-size:2.2rem; letter-spacing:6px; margin:12px 0 }
#m4-root .m4-final-sub    { font-size:1.1rem; color:var(--muted); margin:8px 0 }
`;
  document.head.appendChild(s);
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const ACTS = [
  {
    id:'skip2', type:'growing',
    badge:'📈 Matemáticas · Saltos de 2',
    title:'¡El patrón salta de 2 en 2!',
    sub:'¿Cuántos vienen ahora? · How many come next?',
    guide:{
      concept:'<strong>Conteo de 2 en 2 (Skip counting).</strong> Mientras los patrones del Nivel 3 crecían de 1 en 1, ahora damos saltos de 2. Esto es la base directa de la tabla del 2 y del concepto de "pares". Reconocer que 2, 4, 6, 8... sigue una regla es el primer paso hacia la multiplicación.',
      tip:'"Mirá: 2 vacas, luego 4, luego 6. ¿Cuánto sumamos cada vez? ¡2! ¿Entonces cuántas vienen ahora?" Ayudá a contar los del último cuadro y sumar 2 con los dedos antes de buscar la opción.',
    },
    questions:[
      { seq:['🐄🐄','🐄🐄🐄🐄','🐄🐄🐄🐄🐄🐄'],
        opts:['🐄🐄🐄🐄🐄🐄🐄🐄','🐄🐄🐄🐄🐄🐄🐄','🐄🐄🐄🐄🐄🐄🐄🐄🐄🐄'], ans:0 },
      { seq:['⭐⭐','⭐⭐⭐⭐','⭐⭐⭐⭐⭐⭐'],
        opts:['⭐⭐⭐⭐⭐⭐⭐⭐','⭐⭐⭐⭐⭐⭐⭐','⭐⭐⭐⭐⭐⭐⭐⭐⭐'], ans:0 },
      { seq:['🍎','🍎🍎🍎','🍎🍎🍎🍎🍎'],
        opts:['🍎🍎🍎🍎🍎🍎🍎','🍎🍎🍎🍎🍎🍎','🍎🍎🍎🍎🍎🍎🍎🍎'], ans:0 },
      { seq:['🔵🔵','🔵🔵🔵🔵','🔵🔵🔵🔵🔵🔵','🔵🔵🔵🔵🔵🔵🔵🔵'],
        opts:['🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵','🔵🔵🔵🔵🔵🔵🔵🔵🔵','🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵'], ans:0 },
    ],
  },

  {
    id:'sub10', type:'subtract',
    badge:'➖ Matemáticas · Resta hasta 10',
    title:'¿Cuántos quedan? / How many are left?',
    sub:'Números más grandes... ¡vos podés!',
    guide:{
      concept:'<strong>Resta con números hasta 10.</strong> En el Nivel 3 restábamos con totales de hasta 8. Ahora llegamos a 10, el límite natural de los dedos y del sistema decimal. La habilidad de restar visualmente hasta 10 sienta las bases del sistema posicional.',
      tip:'"Había [total] animales. Se fueron [leaving] (señalá los que tienen ❌). ¿Cuántos tienen todavía la cara feliz?" Si necesita ayuda, que cuente SOLO los que no tienen ❌.',
    },
    questions:[
      { animal:'🐄', total:9,  leaving:4, opts:[4,5,6],   ans:5 },
      { animal:'🐷', total:10, leaving:3, opts:[6,7,8],   ans:7 },
      { animal:'🐑', total:8,  leaving:5, opts:[2,3,4],   ans:3 },
      { animal:'🐔', total:10, leaving:6, opts:[3,4,5],   ans:4 },
    ],
  },

  {
    id:'compare', type:'compare',
    badge:'⚖️ Matemáticas · Mayor o Menor',
    title:'¿Cuál grupo tiene MÁS?',
    sub:'Mirá los dos grupos y compará · Look at both groups and compare',
    guide:{
      concept:'<strong>Comparar cantidades.</strong> Los símbolos > y < son fundamentales en matemáticas Y en programación (los usamos en cada IF). Antes de aprender los símbolos, Elena debe dominar la idea de "más que" y "menos que" de forma intuitiva.',
      tip:'"Mirá el Grupo A: ¿cuántos hay? Ahora el Grupo B: ¿cuántos hay? ¿Cuál tiene más?" Si empatan: "¡Son iguales!" Usá los dedos para contar cada grupo antes de comparar.',
    },
    questions:[
      { emA:'🐄', cntA:3, emB:'🐄', cntB:5, opts:['MAYOR >','IGUAL =','MENOR <'], ans:2 },
      { emA:'🐷', cntA:7, emB:'🐷', cntB:4, opts:['MAYOR >','IGUAL =','MENOR <'], ans:0 },
      { emA:'🐑', cntA:5, emB:'🐑', cntB:5, opts:['MAYOR >','IGUAL =','MENOR <'], ans:1 },
      { emA:'🐔', cntA:2, emB:'🐔', cntB:8, opts:['MAYOR >','IGUAL =','MENOR <'], ans:2 },
      { emA:'🐴', cntA:6, emB:'🐴', cntB:3, opts:['MAYOR >','IGUAL =','MENOR <'], ans:0 },
    ],
  },

  {
    id:'doubles', type:'doubles',
    badge:'✌️ Matemáticas · ¡Dobles!',
    title:'¡Los dos grupos son iguales!',
    sub:'¿Cuántos hay en total? · How many in total?',
    guide:{
      concept:'<strong>La suma "doble".</strong> Sumar un número consigo mismo (2+2, 3+3...) es una de las estrategias de cálculo mental más potentes. Los "doubles" son la puerta de entrada a la tabla del 2 y más adelante al concepto de multiplicar: 3×2 = 3+3.',
      tip:'"Los dos grupos tienen exactamente lo mismo. Son... ¡dobles! ¿Cuántos hay en total?" Si duda, que cuente todos los emojis de ambos grupos. Con el tiempo empezará a recordar los pares sin necesidad de contar.',
    },
    questions:[
      { emoji:'🐄', n:2, opts:[3,4,5],    ans:4  },
      { emoji:'🐷', n:3, opts:[5,6,7],    ans:6  },
      { emoji:'🐑', n:4, opts:[7,8,9],    ans:8  },
      { emoji:'🐔', n:5, opts:[8,9,10],   ans:10 },
    ],
  },

  {
    id:'ifelseB', type:'ifelse-else',
    badge:'🔀 Programación · SI...SINO Completo',
    title:'¿Qué hace Molly? / What does Molly do?',
    sub:'SI verdadero → ENTONCES · SI NO → SINO',
    guide:{
      concept:'<strong>IF/ELSE con la rama SINO explícita.</strong> En el Nivel 3 solo veíamos la rama SI (THEN). Ahora aparece la rama SINO (ELSE): el camino alternativo cuando la condición NO se cumple. Todo programa tiene decenas de estos IF/ELSE.',
      tip:'"Primero: ¿la situación que ves es verdadera o falsa? Luego: si es verdadera, Molly va por ENTONCES. Si es falsa, va por SINO." Podés actuarlo físicamente con la nena.',
    },
    questions:[
      {
        situation:'🌧️ Ahora ESTÁ lloviendo / It IS raining now',
        condText:'¿Está lloviendo? / Is it raining?',
        condTrue:true,
        thenEmoji:'☂️', thenLabel:'Usar paraguas\nUse umbrella',
        elseEmoji:'🕶️', elseLabel:'Ponerse lentes\nWear sunglasses',
      },
      {
        situation:'☀️ Ahora HAY SOL / It\'s SUNNY now',
        condText:'¿Está lloviendo? / Is it raining?',
        condTrue:false,
        thenEmoji:'☂️', thenLabel:'Usar paraguas\nUse umbrella',
        elseEmoji:'🕶️', elseLabel:'Ponerse lentes\nWear sunglasses',
      },
      {
        situation:'❄️ Hace FRÍO / It\'s COLD now',
        condText:'¿Hace frío? / Is it cold?',
        condTrue:true,
        thenEmoji:'🧥', thenLabel:'Ponerse abrigo\nWear a coat',
        elseEmoji:'👙', elseLabel:'Traje de baño\nWear swimsuit',
      },
      {
        situation:'🌤️ Hace CALOR / It\'s WARM now',
        condText:'¿Hace frío? / Is it cold?',
        condTrue:false,
        thenEmoji:'🧥', thenLabel:'Ponerse abrigo\nWear a coat',
        elseEmoji:'👙', elseLabel:'Traje de baño\nWear swimsuit',
      },
    ],
  },

  {
    id:'loops2', type:'loops',
    badge:'🔁 Programación · Loops × 3 (más difícil)',
    title:'¿Cuántas veces en total? / How many in total?',
    sub:'¡Ahora los loops son más largos! / Now the loops are longer!',
    guide:{
      concept:'<strong>Loops con conteos más grandes.</strong> En el Nivel 3 los totales eran hasta 10. Ahora llegamos a 15. El principio es idéntico: contar cuántas veces se repite algo. También desarrolla la atención sostenida.',
      tip:'Recorré la grilla fila por fila con el dedo: "Vuelta 1: [cuenta]. Vuelta 2: [cuenta]..." No hay problema en tomarse el tiempo necesario. La paciencia en el conteo es una habilidad matemática fundamental.',
    },
    questions:[
      { animal:'🐄', sound:'MOO!',   soundCount:3, times:4, opts:[10,11,12,13], ans:12 },
      { animal:'🐕', sound:'WOOF!',  soundCount:4, times:3, opts:[10,11,12,13], ans:12 },
      { animal:'🐸', sound:'CROAK!', soundCount:3, times:5, opts:[13,14,15,16], ans:15 },
    ],
  },

  {
    id:'or', type:'or',
    badge:'🔗 Programación · O (OR) Lógico',
    title:'¿ALGUNA de las dos es verdadera?',
    sub:'O (OR): VERDADERO si UNA sola es verdadera · OR: TRUE if even ONE is true',
    guide:{
      concept:'<strong>¿Qué es el OR lógico?</strong> Mientras AND requiere que las DOS condiciones sean verdaderas, OR solo necesita que UNA lo sea. Es FALSO solo cuando las DOS son falsas. OR es fundamental para filtros y múltiples condiciones en programas.',
      tip:'"Con O (OR), si UNA sola está bien, ya es VERDADERO. Solo es FALSO si las DOS están mal." Ejemplo: "¿Tenés hambre O tenés sed? Si tenés alguna de las dos, vas a la cocina."',
    },
    questions:[
      { c1:'2 > 1', c2:'5 < 3', stmt:'2 > 1  O  5 < 3', en:'2 > 1  OR  5 < 3', ans:true  },
      { c1:'4 < 2', c2:'3 < 1', stmt:'4 < 2  O  3 < 1', en:'4 < 2  OR  3 < 1', ans:false },
      { c1:'1+1=3', c2:'3+2=5', stmt:'1+1=3  O  3+2=5', en:'1+1=3  OR  3+2=5', ans:true  },
      { c1:'6 > 8', c2:'2+2=5', stmt:'6 > 8  O  2+2=5', en:'6 > 8  OR  2+2=5', ans:false },
    ],
  },

  {
    id:'order', type:'order',
    badge:'🧩 Programación · Ordenar Pasos',
    title:'¡Tocá los pasos en orden! / Tap the steps in order!',
    sub:'Del primero al último · From first to last',
    guide:{
      concept:'<strong>Secuenciar instrucciones.</strong> En el Nivel 3 encontrábamos el paso equivocado. Ahora el desafío es mayor: ordenar todos los pasos desde cero. Esto requiere entender la lógica completa de un proceso — la habilidad central del pensamiento computacional.',
      tip:'"Primero pensemos juntos: ¿qué tiene que pasar antes de todo? Luego, ¿qué sigue?" Ayudá a pensar en voz alta ANTES de tocar la pantalla. La planificación antes de la ejecución es lo que hacen los programadores.',
    },
    questions:[
      {
        prompt:'🥚 Hacer un huevo frito / Fry an egg:',
        steps:[
          { emoji:'🔥', text:'Prender el fuego / Light the stove', pos:1 },
          { emoji:'🥚', text:'Romper el huevo / Crack the egg',    pos:3 },
          { emoji:'🍳', text:'Poner la sartén / Put on the pan',   pos:2 },
          { emoji:'🍽️', text:'¡Servir y comer! / Serve and eat!', pos:4 },
        ],
      },
      {
        prompt:'🌱 Plantar una semilla / Plant a seed:',
        steps:[
          { emoji:'💧', text:'Regar la tierra / Water the soil',   pos:4 },
          { emoji:'🕳️', text:'Hacer un hoyo / Dig a hole',        pos:2 },
          { emoji:'🌍', text:'Buscar la maceta / Get the pot',     pos:1 },
          { emoji:'🌱', text:'Poner la semilla / Place the seed',  pos:3 },
        ],
      },
      {
        prompt:'🛁 Bañarse / Take a bath:',
        steps:[
          { emoji:'👗', text:'Ponerse la ropa / Get dressed',     pos:4 },
          { emoji:'🚿', text:'¡Bañarse! / Take the bath!',        pos:2 },
          { emoji:'🧺', text:'Buscar toalla / Get a towel',       pos:1 },
          { emoji:'🧴', text:'Secarse / Dry off',                 pos:3 },
        ],
      },
      {
        prompt:'📚 Leer un libro / Read a book:',
        steps:[
          { emoji:'📖', text:'Abrir el libro / Open the book',     pos:2 },
          { emoji:'📚', text:'Elegir el libro / Choose a book',    pos:1 },
          { emoji:'😴', text:'Cerrar los ojos / Close your eyes',  pos:4 },
          { emoji:'📑', text:'Pasar las páginas / Turn the pages', pos:3 },
        ],
      },
    ],
  },
];

// ─── CONFETTI ────────────────────────────────────────────────────────────────
function launchConfetti() {
  document.getElementById('m4-confetti')?.remove();
  const canvas = document.createElement('canvas');
  canvas.id = 'm4-confetti';
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
  document.getElementById('m4-confetti')?.remove();

  root.innerHTML = `<div id="m4-root">

    <!-- WELCOME -->
    <div class="m4-scr m4-scr--on m4-screen" id="m4-welcome">
      <div class="m4-card" style="background:linear-gradient(135deg,#F3E5F5,#FFFDE7,#E8F5E9)">
        <div class="m4-welcome-title">🐄 ¡Nivel 4, ${getChildName()}! 🌟</div>
        <div class="m4-welcome-sub">¡Molly tiene nuevos desafíos para vos! · Molly has new challenges for you!</div>
        <span style="font-size:3rem;display:block;margin:8px 0">🐄🌟🐷🌟🐑🌟🐔🌟🐴</span>
        <div class="m4-act-list">
          <div class="m4-act-item" style="background:#F3E5F5">📈 Saltos de 2 <span class="m4-act-new">+difícil</span></div>
          <div class="m4-act-item" style="background:#FFEBEE">➖ Resta hasta 10 <span class="m4-act-new">+difícil</span></div>
          <div class="m4-act-item" style="background:#E3F2FD">⚖️ Mayor o Menor <span class="m4-act-new">nuevo</span></div>
          <div class="m4-act-item" style="background:#E8F5E9">✌️ ¡Dobles! <span class="m4-act-new">nuevo</span></div>
          <div class="m4-act-item" style="background:#FFF3E0">🔀 SI...SINO Completo <span class="m4-act-new">+difícil</span></div>
          <div class="m4-act-item" style="background:#E0F2F1">🔁 Loops × 3 <span class="m4-act-new">+difícil</span></div>
          <div class="m4-act-item" style="background:#FCE4EC">🔗 O (OR) Lógico <span class="m4-act-new">nuevo</span></div>
          <div class="m4-act-item" style="background:#F3E5F5">🧩 Ordenar Pasos <span class="m4-act-new">nuevo</span></div>
        </div>
        <button class="m4-start" id="m4-start">¡Empezar Nivel 4! 🚀🌟</button>
      </div>
    </div>

    <!-- GAME -->
    <div class="m4-scr m4-screen" id="m4-game">
      <div class="m4-stars-row" id="m4-stars"></div>
      <div id="m4-container"></div>
      <div class="m4-fb" id="m4-feedback" hidden></div>
      <div class="m4-nav">
        <button class="m4-nav-btn m4-btn-prev" id="m4-prev">◀ Atrás</button>
        <button class="m4-nav-btn m4-btn-next" id="m4-next" disabled>Siguiente ▶</button>
      </div>
    </div>

    <!-- FINAL -->
    <div class="m4-scr m4-screen" id="m4-final">
      <div class="m4-card m4-final-card">
        <span class="m4-final-trophy">🏆🌟🏆</span>
        <div class="m4-final-title">¡NIVEL 4 COMPLETADO! 🌟</div>
        <div class="m4-final-medals" id="m4-medals"></div>
        <div class="m4-final-sub" id="m4-finalmsg"></div>
        <span style="font-size:2.5rem;display:block;margin:12px 0">🐄🌟🐷🌟🐑🌟🐔🌟🐴🌟🐰</span>
        <div class="m4-final-sub">¡Molly está súper orgullosa de vos! 🐄🌟</div>
        <div class="m4-nav">
          <button class="m4-nav-btn m4-btn-restart" id="m4-restart">🔄 Jugar de nuevo</button>
        </div>
      </div>
    </div>

  </div>`;

  // ── State ──
  let curAct = 0, curQ = 0, score = 0, total = 0, answered = false;
  let orderClicks = [];

  // ── DOM ──
  const $ = id => document.getElementById(id);
  const welcome   = $('m4-welcome');
  const game      = $('m4-game');
  const finalScr  = $('m4-final');
  const container = $('m4-container');
  const feedback  = $('m4-feedback');
  const nextBtn   = $('m4-next');
  const starsEl   = $('m4-stars');

  function showScr(name) {
    [welcome, game, finalScr].forEach(s => s.classList.remove('m4-scr--on'));
    ({ welcome, game, final:finalScr })[name]?.classList.add('m4-scr--on');
  }

  function updateStars() {
    starsEl.innerHTML = Array.from({length:8}, (_,i) =>
      `<span style="font-size:1.3rem;filter:${i<score?'none':'grayscale(1) opacity(.35)'};transition:filter .3s">⭐</span>`
    ).join('') + `<span class="m4-score">${score}/${total}</span>`;
  }

  function showFeedback(ok, msg) {
    feedback.textContent = (ok ? '✅ ' : '❌ ') + msg;
    feedback.className   = 'm4-fb ' + (ok ? 'm4-fb--ok' : 'm4-fb--no');
    feedback.hidden = false;
    if (ok) score++;
    total++; answered = true; nextBtn.disabled = false;
    updateStars();
  }

  function clearFeedback() {
    feedback.hidden = true; feedback.textContent = ''; feedback.className = 'm4-fb';
  }

  // ── Render activity ──
  function renderAct() {
    const act = ACTS[curAct], q = act.questions[curQ];
    const pct = Math.round(curQ / act.questions.length * 100);

    const guide = act.guide ? `
      <button class="m4-guide-toggle" data-action="guide-toggle">👨‍👩‍👧 Para papá y mamá ▼</button>
      <div class="m4-guide-box">
        <div>${act.guide.concept}</div>
        <div class="m4-guide-tip">💡 ${act.guide.tip}</div>
      </div>` : '';

    let body = '';
    if (act.type === 'growing')    body = renderGrowing(q);
    if (act.type === 'subtract')   body = renderSubtract(q);
    if (act.type === 'compare')    body = renderCompare(q);
    if (act.type === 'doubles')    body = renderDoubles(q);
    if (act.type === 'ifelse-else') body = renderIfElseB(q);
    if (act.type === 'loops')      body = renderLoops(q);
    if (act.type === 'or')         body = renderOr(q);
    if (act.type === 'order')      body = renderOrder(q);

    container.innerHTML = `
      <div class="m4-card m4-card--${act.id}">
        <span class="m4-badge">${act.badge}</span>
        <div class="m4-pbar"><div class="m4-pfill" style="width:${pct}%"></div></div>
        ${guide}
        <div class="m4-qtitle">${act.title}</div>
        <div class="m4-qsub">${act.sub}</div>
        ${body}
      </div>`;
  }

  // ── Renderers ──
  function renderGrowing(q) {
    const boxes = q.seq.map(s => `<div class="m4-grow-box">${s}</div>`).join('');
    const opts  = q.opts.map((o,i) =>
      `<button class="m4-grow-opt" data-action="growing" data-idx="${i}">${o}</button>`
    ).join('');
    return `<div class="m4-grow-seq">${boxes}<div class="m4-grow-box blank">?</div></div>
      <div class="m4-grow-opts">${opts}</div>`;
  }

  function renderSubtract(q) {
    const animals = Array.from({length:q.total}, (_,i) =>
      `<span class="m4-sub-animal${i < q.leaving ? ' leaving' : ''}">${q.animal}</span>`
    ).join('');
    const opts = q.opts.map(o =>
      `<button class="m4-opt m4-opt--num" data-action="subtract" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m4-sub-box">
        <div class="m4-sub-label">❌ Se van ${q.leaving} / ${q.leaving} leave</div>
        <div class="m4-sub-row">${animals}</div>
      </div>
      <div class="m4-qsub" style="margin-top:8px">¿Cuántos ${q.animal} quedan? / How many are left?</div>
      <div class="m4-opts">${opts}</div>`;
  }

  function renderCompare(q) {
    const gA = Array(q.cntA).fill(q.emA).join('');
    const gB = Array(q.cntB).fill(q.emB).join('');
    const opts = q.opts.map((o,i) =>
      `<button class="m4-cmp-btn" data-action="compare" data-idx="${i}">${o}</button>`
    ).join('');
    return `<div class="m4-compare-wrap">
        <div>
          <div class="m4-compare-group">${gA}</div>
          <div class="m4-compare-label">Grupo A (${q.cntA})</div>
        </div>
        <div class="m4-compare-vs">vs</div>
        <div>
          <div class="m4-compare-group">${gB}</div>
          <div class="m4-compare-label">Grupo B (${q.cntB})</div>
        </div>
      </div>
      <div class="m4-qsub">Grupo A es... / Group A is...</div>
      <div class="m4-cmp-opts">${opts}</div>`;
  }

  function renderDoubles(q) {
    const g = Array(q.n).fill(q.emoji).join('');
    const opts = q.opts.map(o =>
      `<button class="m4-opt m4-opt--num" data-action="doubles" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m4-doubles-row">
        <div class="m4-doubles-group">${g}</div>
        <div class="m4-doubles-op">➕</div>
        <div class="m4-doubles-group">${g}</div>
        <div class="m4-doubles-op">=</div>
        <div class="m4-doubles-blank">?</div>
      </div>
      <div class="m4-opts">${opts}</div>`;
  }

  function renderIfElseB(q) {
    const ans = q.condTrue ? 0 : 1;
    return `<div class="m4-ifB-block">
        <div class="m4-ifB-situation">${q.situation}</div>
        <div class="m4-ifB-condlabel">Condición / Condition: <strong>${q.condText}</strong></div>
        <div class="m4-ifB-row">
          <button class="m4-ifB-btn" data-action="ifelseB" data-idx="0" data-ans="${ans}">
            <span class="m4-ifB-kw m4-kw-then">ENTONCES / THEN</span>
            <span class="m4-ifB-emoji">${q.thenEmoji}</span>
            <span class="m4-ifB-label">${q.thenLabel.replace(/\n/g,'<br>')}</span>
          </button>
          <button class="m4-ifB-btn" data-action="ifelseB" data-idx="1" data-ans="${ans}">
            <span class="m4-ifB-kw m4-kw-else">SINO / ELSE</span>
            <span class="m4-ifB-emoji">${q.elseEmoji}</span>
            <span class="m4-ifB-label">${q.elseLabel.replace(/\n/g,'<br>')}</span>
          </button>
        </div>
      </div>`;
  }

  function renderLoops(q) {
    const rows = Array.from({length:q.times}, (_,i) =>
      `<div class="m4-loop-row">
        <span class="m4-loop-iter">${i+1}.</span>
        <span class="m4-loop-sounds">${Array(q.soundCount).fill(q.animal + ' ' + q.sound).join('  ')}</span>
      </div>`
    ).join('');
    const opts = q.opts.map(o =>
      `<button class="m4-opt m4-opt--num" data-action="loop" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m4-loop-grid">${rows}
        <div class="m4-loop-total">🔢 Total de "${q.sound}" = ?</div>
      </div>
      <div class="m4-opts">${opts}</div>`;
  }

  function renderOr(q) {
    return `<div class="m4-or-box">
        <div class="m4-cond-pill">${q.c1}</div>
        <div class="m4-or-connector">O / OR</div>
        <div class="m4-cond-pill">${q.c2}</div>
      </div>
      <div class="m4-stmt">"${q.stmt}"</div>
      <div class="m4-stmt-en">"${q.en}"</div>
      <div class="m4-opts">
        <button class="m4-tf m4-tf--t" data-action="tf" data-val="true">✅ VERDADERO<br><small>TRUE</small></button>
        <button class="m4-tf m4-tf--f" data-action="tf" data-val="false">❌ FALSO<br><small>FALSE</small></button>
      </div>`;
  }

  function renderOrder(q) {
    const steps = q.steps.map((s,i) =>
      `<div class="m4-order-step" data-action="order" data-idx="${i}" id="m4ostep-${i}">
        <div class="m4-order-badge" id="m4obadge-${i}">?</div>
        <span class="m4-order-emoji">${s.emoji}</span>
        <span class="m4-order-text">${s.text}</span>
      </div>`
    ).join('');
    return `<div class="m4-qsub" style="font-weight:700;margin-bottom:4px">${q.prompt}</div>
      <div class="m4-order-hint">Tocá los pasos del primero al último / Tap steps from first to last</div>
      <div class="m4-order-steps">${steps}</div>`;
  }

  // ── Answer handlers ──
  function answerGrowing(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="growing"]').forEach((b,i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add('m4-ok');
      else if (i === idx) b.classList.add('m4-no');
    });
    showFeedback(idx === q.ans,
      idx === q.ans ? '¡Patrón correcto! El patrón salta de 2 📈' : `La respuesta era: ${q.opts[q.ans]}`);
  }

  function answerSubtract(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="subtract"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m4-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m4-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.total} − ${q.leaving} = ${q.ans} 🌟` : `La respuesta era ${q.ans}`);
  }

  function answerCompare(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="compare"]').forEach((b,i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add('m4-ok');
      else if (i === idx) b.classList.add('m4-no');
    });
    const labels = ['MAYOR >','IGUAL =','MENOR <'];
    showFeedback(idx === q.ans,
      idx === q.ans
        ? `¡Correcto! Grupo A es ${labels[idx]} que Grupo B 🌟`
        : `No... Grupo A es ${labels[q.ans]} que Grupo B`);
  }

  function answerDoubles(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="doubles"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m4-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m4-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.n}+${q.n} = ${q.ans} 🌟` : `La respuesta era ${q.ans}`);
  }

  function answerIfElseB(idx, ans) {
    container.querySelectorAll('[data-action="ifelseB"]').forEach(b => {
      b.disabled = true;
      const i = +b.dataset.idx;
      if (i === ans) b.classList.add('m4-ok');
      else if (i === idx) b.classList.add('m4-no');
    });
    const branch = idx === 0 ? 'ENTONCES (THEN)' : 'SINO (ELSE)';
    const correct = idx === ans;
    showFeedback(correct,
      correct ? `¡Correcto! Molly va por el camino ${branch} 🌟`
              : `No... Molly debe ir por ${idx === 0 ? 'SINO (ELSE)' : 'ENTONCES (THEN)'}`);
  }

  function answerLoop(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="loop"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m4-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m4-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.soundCount} × ${q.times} = ${q.ans} 🌟` : `La respuesta era ${q.ans} (${q.soundCount} × ${q.times})`);
  }

  function answerTF(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="tf"]').forEach(b => {
      b.disabled = true;
      const bv = b.dataset.val === 'true';
      if (bv === q.ans) b.classList.add('m4-ok');
      else if (bv === val && !ok) b.classList.add('m4-no');
    });
    showFeedback(ok, ok
      ? `¡Correcto! Con OR, ${val ? 'al menos una es verdadera' : 'ninguna es verdadera'} 🌟`
      : `No... El resultado es ${q.ans ? 'VERDADERO (al menos una es verdadera)' : 'FALSO (ninguna es verdadera)'}`);
  }

  function answerOrder(idx) {
    if (answered) return;
    if (orderClicks.includes(idx)) return;
    orderClicks.push(idx);
    const badge = document.getElementById('m4obadge-' + idx);
    badge.textContent = orderClicks.length;
    badge.classList.add('selected');
    document.getElementById('m4ostep-' + idx).classList.add('clicked');
    if (orderClicks.length === 4) checkOrder();
  }

  function checkOrder() {
    const q = ACTS[curAct].questions[curQ];
    let correct = true;
    orderClicks.forEach((stepIdx, clickPos) => {
      if (q.steps[stepIdx].pos !== clickPos + 1) correct = false;
    });
    orderClicks.forEach((stepIdx, clickPos) => {
      const el = document.getElementById('m4ostep-' + stepIdx);
      el.classList.remove('clicked');
      el.classList.add(q.steps[stepIdx].pos === clickPos + 1 ? 'm4-ok' : 'm4-no');
    });
    showFeedback(correct,
      correct ? '¡Orden perfecto! / Perfect order! 🎉🌟' : 'El orden no era correcto / The order wasn\'t right ❌');
  }

  // ── Event delegation ──
  container.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const { action, idx, val, ans } = el.dataset;
    if (action === 'guide-toggle') {
      const box = container.querySelector('.m4-guide-box');
      if (box) { box.classList.toggle('open'); el.textContent = box.classList.contains('open') ? '👨‍👩‍👧 Para papá y mamá ▲' : '👨‍👩‍👧 Para papá y mamá ▼'; }
      return;
    }
    if (answered) return;
    if (action === 'growing')   answerGrowing(+idx);
    else if (action === 'subtract')  answerSubtract(+val);
    else if (action === 'compare')   answerCompare(+idx);
    else if (action === 'doubles')   answerDoubles(+val);
    else if (action === 'ifelseB')   answerIfElseB(+idx, +ans);
    else if (action === 'loop')      answerLoop(+val);
    else if (action === 'tf')        answerTF(val === 'true');
    else if (action === 'order')     answerOrder(+idx);
  });

  // ── Navigation ──
  $('m4-start').addEventListener('click', () => {
    curAct = 0; curQ = 0; score = 0; total = 0; answered = false; orderClicks = [];
    updateStars(); clearFeedback(); nextBtn.disabled = true;
    showScr('game'); renderAct();
  });

  $('m4-prev').addEventListener('click', () => {
    if (curAct > 0) {
      curAct--; curQ = 0; answered = false; orderClicks = []; clearFeedback(); nextBtn.disabled = true; renderAct();
    } else { showScr('welcome'); }
  });

  nextBtn.addEventListener('click', () => {
    if (!answered) return;
    curQ++; answered = false; orderClicks = []; clearFeedback(); nextBtn.disabled = true;
    const act = ACTS[curAct];
    if (curQ >= act.questions.length) {
      markDone('math', 4, act.id);
      curAct++; curQ = 0;
      if (curAct >= ACTS.length) { showFinal(); return; }
    }
    renderAct();
  });

  $('m4-restart').addEventListener('click', () => showScr('welcome'));

  function showFinal() {
    showScr('final');
    const stars = total > 0 ? Math.round(score / total * 8) : 0;
    $('m4-medals').textContent = '⭐'.repeat(stars);
    $('m4-finalmsg').textContent = score >= total * 0.75
      ? `¡Excelente! ${score}/${total} correctas 🌟`
      : `¡Muy bien! ${score}/${total} correctas 🌈`;
    launchConfetti();
  }

  updateStars();
  showScr('welcome');
}
