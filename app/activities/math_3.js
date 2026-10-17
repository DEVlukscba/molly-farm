import { markDone } from '../progress.js';
import { getChildName } from '../profiles.js';

function injectCSS() {
  if (document.getElementById('molly-math3-css')) return;
  const s = document.createElement('style');
  s.id = 'molly-math3-css';
  s.textContent = `
#m3-root .m3-scr { display:none }
#m3-root .m3-scr--on { display:block }
#m3-root .m3-screen { max-width:700px; margin:18px auto; padding:0 14px }

/* card */
#m3-root .m3-card { background:#fff; border-radius:22px; padding:22px 18px;
  box-shadow:0 6px 20px rgba(0,0,0,.1); text-align:center; position:relative; overflow:hidden }
#m3-root .m3-card::before { content:''; position:absolute; top:0; left:0; right:0; height:6px }
#m3-root .m3-card--patterns::before  { background:linear-gradient(90deg,#E91E63,#FF9800) }
#m3-root .m3-card--subtract::before  { background:linear-gradient(90deg,#BF360C,#FF7043) }
#m3-root .m3-card--space::before     { background:linear-gradient(90deg,#2E7D32,#66BB6A) }
#m3-root .m3-card--mixed::before     { background:linear-gradient(90deg,#E65100,#FFA000) }
#m3-root .m3-card--ifelse::before    { background:linear-gradient(90deg,#1565C0,#7B1FA2) }
#m3-root .m3-card--loops::before     { background:linear-gradient(90deg,#00695C,#26A69A) }
#m3-root .m3-card--truefalse::before { background:linear-gradient(90deg,#C2185B,#F06292) }
#m3-root .m3-card--debug::before     { background:linear-gradient(90deg,#B71C1C,#EF5350) }

/* badge */
#m3-root .m3-badge { display:inline-block; padding:5px 14px; border-radius:20px;
  font-size:.82rem; font-weight:700; color:#fff; margin-bottom:8px }
#m3-root .m3-card--patterns  .m3-badge { background:#E91E63 }
#m3-root .m3-card--subtract  .m3-badge { background:#BF360C }
#m3-root .m3-card--space     .m3-badge { background:#2E7D32 }
#m3-root .m3-card--mixed     .m3-badge { background:#E65100 }
#m3-root .m3-card--ifelse    .m3-badge { background:#1565C0 }
#m3-root .m3-card--loops     .m3-badge { background:#00695C }
#m3-root .m3-card--truefalse .m3-badge { background:#C2185B }
#m3-root .m3-card--debug     .m3-badge { background:#B71C1C }

/* progress bar */
#m3-root .m3-pbar  { background:#EEE; border-radius:10px; height:8px; margin:8px 0 6px; overflow:hidden }
#m3-root .m3-pfill { height:100%; background:linear-gradient(90deg,#FF7043,#FDD835); border-radius:10px; transition:width .4s }

/* question text */
#m3-root .m3-qtitle { font-size:1.2rem; color:#333; font-weight:700; margin-bottom:4px }
#m3-root .m3-qsub   { font-size:.88rem; color:var(--muted); margin-bottom:12px }

/* option buttons */
#m3-root .m3-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:14px }
#m3-root .m3-opt  { padding:12px 20px; font-size:1.4rem; border-radius:14px;
  border:3px solid transparent; cursor:pointer; background:#FFFDE7;
  font-family:inherit; transition:transform .15s; min-width:70px }
#m3-root .m3-opt:hover:not(:disabled) { transform:scale(1.08) }
#m3-root .m3-opt:disabled { cursor:default }
#m3-root .m3-opt--num { font-size:1.8rem; font-weight:700 }
#m3-root .m3-ok { background:#C8E6C9 !important; border-color:#388E3C !important }
#m3-root .m3-no { background:#FFCDD2 !important; border-color:#C62828 !important }

/* blank slot */
#m3-root .m3-blank { display:inline-block; width:52px; height:52px; background:#FFFDE7;
  border:3px dashed #F9A825; border-radius:12px; vertical-align:middle;
  line-height:52px; color:#AAA; font-size:.85rem }

/* feedback */
#m3-root .m3-fb { font-size:1.2rem; font-weight:700; padding:10px 16px; border-radius:12px;
  margin:12px 0; animation:m3pop .3s }
#m3-root .m3-fb--ok { background:#C8E6C9; color:#2E7D32 }
#m3-root .m3-fb--no { background:#FFCDD2; color:#B71C1C }
@keyframes m3pop { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }

/* nav */
#m3-root .m3-nav { display:flex; gap:10px; justify-content:center; margin-top:16px }
#m3-root .m3-nav-btn { padding:10px 26px; font-size:1rem; font-weight:700; border-radius:12px;
  border:none; cursor:pointer; font-family:inherit; transition:all .15s }
#m3-root .m3-nav-btn:hover { transform:translateY(-2px); box-shadow:0 4px 10px rgba(0,0,0,.15) }
#m3-root .m3-btn-next    { background:#BF360C; color:#fff }
#m3-root .m3-btn-next:disabled { background:#CCC; cursor:default; transform:none; box-shadow:none }
#m3-root .m3-btn-prev    { background:#EEE; color:#555 }
#m3-root .m3-btn-restart { background:#F9A825; color:#5D4037 }

/* stars */
#m3-root .m3-stars-row { display:flex; align-items:center; justify-content:flex-end;
  gap:2px; padding:6px 0 }
#m3-root .m3-score { font-size:.9rem; color:var(--muted); margin-left:6px }

/* welcome */
#m3-root .m3-welcome-title { font-family:var(--display); font-size:2rem; color:#BF360C; margin:0 0 6px }
#m3-root .m3-welcome-sub   { color:var(--muted); margin:0 0 14px; font-size:.95rem }
#m3-root .m3-act-list { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin:12px 0; text-align:left }
#m3-root .m3-act-item { padding:8px 12px; border-radius:12px; font-size:.88rem; color:#333 }
#m3-root .m3-act-new  { font-size:.72rem; color:#888; margin-left:4px }
#m3-root .m3-start { background:linear-gradient(135deg,#BF360C,#FF7043); color:#fff; border:none;
  padding:16px 40px; font-size:1.3rem; font-weight:800; border-radius:18px; cursor:pointer;
  font-family:var(--display); margin-top:8px; transition:transform .2s }
#m3-root .m3-start:hover { transform:scale(1.05) }

/* true/false buttons */
#m3-root .m3-stmt    { font-size:1.1rem; color:#333; margin:8px 0 2px; font-weight:600 }
#m3-root .m3-stmt-en { font-size:.88rem; color:var(--muted); margin-bottom:10px }
#m3-root .m3-tf { padding:16px 28px; font-size:1.35rem; font-weight:700; border-radius:18px;
  border:3px solid transparent; cursor:pointer; font-family:inherit; min-width:138px; transition:all .15s }
#m3-root .m3-tf:hover:not(:disabled) { transform:scale(1.06) }
#m3-root .m3-tf--t { background:#E8F5E9; color:#2E7D32; border-color:#2E7D32 }
#m3-root .m3-tf--f { background:#FFEBEE; color:#B71C1C; border-color:#B71C1C }

/* growing patterns */
#m3-root .m3-grow-seq  { display:flex; gap:8px; justify-content:center; align-items:flex-end; flex-wrap:wrap; margin:12px 0 }
#m3-root .m3-grow-box  { background:#FCE4EC; border:2px solid #F48FB1; border-radius:12px;
  padding:8px 10px; font-size:1.6rem; min-width:50px; text-align:center; line-height:1.4 }
#m3-root .m3-grow-box.blank { background:#FFFDE7; border:3px dashed #F9A825; color:#AAA;
  font-size:.9rem; line-height:3.5; min-width:54px }
#m3-root .m3-grow-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:12px }
#m3-root .m3-grow-opt  { background:#FFFDE7; border:3px solid #FFD54F; border-radius:12px;
  padding:8px 14px; font-size:1.5rem; cursor:pointer; font-family:inherit; transition:all .15s }
#m3-root .m3-grow-opt:hover:not(:disabled) { transform:scale(1.06); border-color:#F9A825 }
#m3-root .m3-grow-opt:disabled { cursor:default }

/* subtraction */
#m3-root .m3-sub-box   { background:#FFEBEE; border:3px solid #EF9A9A; border-radius:14px;
  padding:12px 16px; display:inline-block; margin:8px 0 }
#m3-root .m3-sub-label { font-size:.82rem; color:#B71C1C; font-weight:700; margin-bottom:6px }
#m3-root .m3-sub-row   { display:flex; gap:6px; justify-content:center; flex-wrap:wrap;
  font-size:2.2rem; line-height:1.3; margin:4px 0 }
#m3-root .m3-sub-animal { display:inline-block; transition:opacity .3s }
#m3-root .m3-sub-animal.leaving { opacity:.2 }

/* position grid */
#m3-root .m3-grid-col-labels { display:grid; grid-template-columns:repeat(3,72px); gap:5px;
  margin:0 auto 3px; width:fit-content; text-align:center; font-size:.68rem; color:#888 }
#m3-root .m3-grid { display:grid; grid-template-columns:repeat(3,72px); grid-template-rows:repeat(3,62px);
  gap:5px; margin:0 auto 10px; width:fit-content }
#m3-root .m3-grid-cell { background:#E3F2FD; border:2px solid #90CAF9; border-radius:10px;
  display:flex; align-items:center; justify-content:center; font-size:2rem }
#m3-root .m3-grid-cell.active { background:#E8F5E9; border-color:#66BB6A }

/* mixed +/- */
#m3-root .m3-mixed-row { font-size:2rem; margin:12px 0 }
#m3-root .m3-op-plus   { color:#2E7D32; font-size:.7em; vertical-align:middle }
#m3-root .m3-op-minus  { color:#B71C1C; font-size:.7em; vertical-align:middle }
#m3-root .m3-op-eq     { color:#888;    font-size:.7em; vertical-align:middle }

/* if/else */
#m3-root .m3-if-label { font-size:.82rem; color:#888; margin-bottom:4px }
#m3-root .m3-if-cond  { background:#E3F2FD; border:3px solid #90CAF9; border-radius:16px;
  padding:14px 20px; font-size:1.2rem; font-weight:700; color:#1565C0; margin:10px 0; display:inline-block }
#m3-root .m3-if-opts  { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:12px }
#m3-root .m3-if-btn   { padding:14px 18px; font-size:1.1rem; border-radius:16px;
  border:3px solid #DDD; cursor:pointer; background:#FFFDE7; font-family:inherit;
  min-width:130px; transition:all .15s; line-height:1.4 }
#m3-root .m3-if-btn:hover:not(:disabled) { transform:scale(1.06); border-color:#FFD54F }
#m3-root .m3-if-btn:disabled { cursor:default }

/* loops grid */
#m3-root .m3-loop-grid   { display:flex; flex-direction:column; gap:5px; margin:10px 0 }
#m3-root .m3-loop-row    { display:flex; align-items:center; gap:6px; background:#E0F2F1;
  border:2px solid #80CBC4; border-radius:10px; padding:7px 12px }
#m3-root .m3-loop-iter   { font-size:.82rem; color:#00695C; font-weight:700; min-width:24px }
#m3-root .m3-loop-sounds { font-size:1.1rem; letter-spacing:2px }
#m3-root .m3-loop-total  { background:#00695C; color:white; border-radius:10px;
  padding:8px 12px; font-weight:700; font-size:.95rem;
  display:flex; align-items:center; gap:6px; justify-content:center }

/* AND connector */
#m3-root .m3-and-box       { display:flex; gap:10px; justify-content:center; align-items:center; flex-wrap:wrap; margin:12px 0 }
#m3-root .m3-cond-pill     { background:#F3E5F5; border:3px solid #CE93D8; border-radius:12px;
  padding:8px 14px; font-size:1.3rem; font-weight:700; color:#6A1B9A }
#m3-root .m3-and-connector { background:#6A1B9A; color:white; border-radius:8px;
  padding:5px 12px; font-size:.88rem; font-weight:700 }

/* debug */
#m3-root .m3-dbg-prompt { font-size:1rem; color:#555; margin:6px 0 10px; text-align:left }
#m3-root .m3-dbg-steps  { display:flex; flex-direction:column; gap:8px; margin:10px 0; text-align:left }
#m3-root .m3-dbg { display:flex; align-items:center; gap:10px; padding:10px 14px;
  background:#FFF3E0; border:3px solid #FFCC80; border-radius:12px; cursor:pointer; transition:all .15s }
#m3-root .m3-dbg:hover { border-color:#E65100; transform:translateX(3px) }
#m3-root .m3-dbg-num   { font-size:1.2rem; font-weight:700; color:#E65100; min-width:24px }
#m3-root .m3-dbg-emoji { font-size:1.7rem }
#m3-root .m3-dbg-text  { flex:1; color:#333; font-size:.95rem }
#m3-root .m3-dbg.m3-ok { background:#C8E6C9; border-color:#2E7D32 }
#m3-root .m3-dbg.m3-no { background:#FFCDD2; border-color:#B71C1C }

/* hint */
#m3-root .m3-hint { font-size:.82rem; color:var(--muted); margin-top:6px }

/* parent guide */
#m3-root .m3-guide-toggle { display:inline-flex; align-items:center; gap:6px; background:#FFF8E1;
  border:2px solid #FFD54F; border-radius:12px; padding:7px 14px; font-size:.82rem;
  color:#5D4037; cursor:pointer; margin-bottom:8px; font-family:inherit; transition:background .15s }
#m3-root .m3-guide-toggle:hover { background:#FFE082 }
#m3-root .m3-guide-box { background:#FFFDE7; border:2px solid #FFD54F; border-radius:14px;
  padding:12px 14px; margin-bottom:10px; text-align:left; font-size:.83rem;
  line-height:1.5; color:#4E342E; display:none }
#m3-root .m3-guide-box.open { display:block }
#m3-root .m3-guide-tip { margin-top:8px; padding:8px 10px; background:#E8F5E9;
  border-left:4px solid #388E3C; border-radius:0 10px 10px 0; color:#1B5E20; font-style:italic }

/* final */
#m3-root .m3-final-card  { background:linear-gradient(135deg,#FBE9E7,#C8E6C9,#E1F5FE) }
#m3-root .m3-final-trophy { font-size:3.5rem; display:block; margin:8px 0 }
#m3-root .m3-final-title  { font-family:var(--display); font-size:1.8rem; font-weight:800; color:#BF360C }
#m3-root .m3-final-medals { font-size:2.2rem; letter-spacing:6px; margin:12px 0 }
#m3-root .m3-final-sub    { font-size:1.1rem; color:var(--muted); margin:8px 0 }
`;
  document.head.appendChild(s);
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const ACTS = [
  {
    id:'patterns', type:'growing',
    badge:'📈 Matemáticas · Patrones Crecientes',
    title:'¿Cuántos vienen ahora?',
    sub:'El patrón crece con cada paso · The pattern grows each step',
    guide:{
      concept:'<strong>¿Qué es un patrón creciente?</strong> A diferencia de los patrones que repiten (🔴🔵🔴🔵), un patrón creciente agrega elementos en cada paso siguiendo una regla. Esto es la base de las series numéricas y de las tablas de multiplicar.',
      tip:'"Mirá, primero hay 1 vaca. Después hay 2. Después hay 3. ¿Qué está pasando? ¿Cuántas van a venir ahora?" Ayudá a verbalizar la regla antes de responder.',
    },
    questions:[
      { seq:['🐄','🐄🐄','🐄🐄🐄'],           opts:['🐄🐄🐄🐄','🐄🐄','🐄🐄🐄🐄🐄'],         ans:0 },
      { seq:['⭐','⭐⭐','⭐⭐⭐'],               opts:['⭐⭐⭐⭐','⭐⭐','⭐⭐⭐⭐⭐'],             ans:0 },
      { seq:['🍎','🍎🍎','🍎🍎🍎'],             opts:['🍎🍎🍎🍎','🍎','🍎🍎🍎🍎🍎'],           ans:0 },
      { seq:['🔴','🔴🔴','🔴🔴🔴','🔴🔴🔴🔴'], opts:['🔴🔴🔴🔴🔴','🔴🔴🔴','🔴🔴🔴🔴🔴🔴'],   ans:0 },
    ],
  },
  {
    id:'subtract', type:'subtract',
    badge:'➖ Matemáticas · Resta Visual',
    title:'¿Cuántos quedan? / How many are left?',
    sub:'Algunos animales se van... ¿cuántos se quedan?',
    guide:{
      concept:'<strong>La resta de forma visual.</strong> Antes de usar el símbolo "−", la resta se entiende como "quitar". Ver los animales que se van (tachados) y contar los que quedan es la manera más concreta de entender la sustracción.',
      tip:'"Había 5 vacas. Se fueron 2 (señalá las marcadas). ¿Cuántas se quedaron?" Si duda, pedile que cuente solo los animales brillantes. Usá "se fueron" o "se quitaron" — el lenguaje concreto antes del abstracto.',
    },
    questions:[
      { animal:'🐄', total:5, leaving:2, opts:[2,3,4], ans:3 },
      { animal:'🐷', total:6, leaving:4, opts:[1,2,3], ans:2 },
      { animal:'🐑', total:7, leaving:3, opts:[3,4,5], ans:4 },
      { animal:'🐔', total:8, leaving:5, opts:[2,3,4], ans:3 },
    ],
  },
  {
    id:'space', type:'grid',
    badge:'🗺️ Matemáticas · Grilla de Posiciones',
    title:'¿Dónde está Molly en la grilla?',
    sub:'Mirá la grilla y respondé · Look at the grid and answer',
    guide:{
      concept:'<strong>Las coordenadas.</strong> Una grilla es la forma más simple de introducir coordenadas (mapas, GPS, planillas). En este ejercicio se practica identificar posiciones en una cuadrícula 3×3.',
      tip:'Antes de arrancar, practicá con papel dibujando una grilla 3×3 y colocando un objeto. Hacelo paso a paso: primero fila (arriba/medio/abajo), luego columna (izquierda/centro/derecha).',
    },
    questions:[
      { grid:[[0,0,0],[0,1,0],[0,0,0]], q:'¿Está Molly en el CENTRO? / Is Molly in the CENTER?',                     ans:true  },
      { grid:[[1,0,0],[0,0,0],[0,0,0]], q:'¿Está Molly ARRIBA a la DERECHA? / Is Molly top-RIGHT?',                  ans:false },
      { grid:[[0,0,0],[0,0,0],[0,0,1]], q:'¿Está Molly ABAJO a la DERECHA? / Is Molly bottom-RIGHT?',                ans:true  },
      { grid:[[0,1,0],[0,0,0],[0,0,0]], q:'¿Está Molly ARRIBA en el CENTRO? / Is Molly top-CENTER?',                 ans:true  },
    ],
  },
  {
    id:'mixed', type:'mixed',
    badge:'➕➖ Matemáticas · Sumas y Restas',
    title:'Suma o resta / Add or subtract',
    sub:'Mirá el símbolo: ➕ es sumar, ➖ es restar · Watch the symbol',
    guide:{
      concept:'<strong>Combinar sumas y restas.</strong> El desafío cognitivo es leer el operador antes de actuar: ¿sumo o resto? Esta flexibilidad es fundamental para el razonamiento matemático.',
      tip:'Señalá el símbolo con el dedo antes de calcular: "¿Ves este signo? Es ➕, así que sumamos. ¿Cuántos hay en total?" Para la resta: "Este es ➖. ¿Cuántos quedan?" Que identifique el operador antes de resolver.',
    },
    questions:[
      { a:['🐄','🐄','🐄'],               op:'+', b:['🐄','🐄'],               opts:[4,5,6],  ans:5 },
      { a:['🐷','🐷','🐷','🐷','🐷'],     op:'−', b:['🐷','🐷'],               opts:[2,3,4],  ans:3 },
      { a:['🐑','🐑','🐑'],               op:'+', b:['🐑','🐑','🐑','🐑'],     opts:[6,7,8],  ans:7 },
      { a:['🐔','🐔','🐔','🐔','🐔','🐔'], op:'−', b:['🐔','🐔','🐔'],         opts:[2,3,4],  ans:3 },
    ],
  },
  {
    id:'ifelse', type:'ifelse',
    badge:'🔀 Programación · SI... ENTONCES (IF)',
    title:'SI la condición es verdadera, ¿qué hace Molly?',
    sub:'IF the condition is true, what should Molly do?',
    guide:{
      concept:'<strong>¿Qué es un IF/ELSE?</strong> Es la instrucción más fundamental de la programación: "SI pasa X, ENTONCES haz Y; SI NO, haz Z". Todo programa tiene miles de estas decisiones. A los 5 años se puede entender perfectamente: SI llueve → paraguas.',
      tip:'"Mirá la pantalla. ¿Qué pasa? (llueve / hay sol). Ahora, SI pasa eso, ¿qué debería hacer Molly?" Conectar la lógica del juego con la vida cotidiana refuerza el concepto.',
    },
    questions:[
      { cond:'☀️ Hace SOL / It\'s SUNNY',           prompt:'Molly debe llevar / Molly should bring:', opts:['🌂','🕶️'], labels:['paraguas\numbrella','lentes de sol\nsunglasses'], ans:1 },
      { cond:'❄️ Hay NIEVE / It\'s SNOWY',           prompt:'Molly debe ponerse / Molly should wear:', opts:['👙','🧥'], labels:['traje de baño\nswimsuit','abrigo\nwarm coat'],     ans:1 },
      { cond:'🔴 Semáforo en ROJO / Traffic RED',    prompt:'Molly debe / Molly should:',              opts:['🚶','✋'], labels:['seguir\nkeep walking','parar\nstop'],               ans:1 },
      { cond:'🌧️ Está LLOVIENDO / It\'s RAINING',   prompt:'Molly debe / Molly should:',              opts:['😎','☂️'], labels:['ponerse lentes\nsunglasses','usar paraguas\numbrella'], ans:1 },
    ],
  },
  {
    id:'loops', type:'loops',
    badge:'🔁 Programación · Loops con Grilla',
    title:'¿Cuántas veces en total? / How many in total?',
    sub:'La grilla te ayuda a ver las repeticiones · The grid helps you see the repetitions',
    guide:{
      concept:'<strong>Visualizar la multiplicación como grilla.</strong> Ver cada iteración del loop como una fila hace que la multiplicación sea concreta: 4 filas × 2 sonidos = 8 sonidos. Esta representación es la tabla de multiplicar vista como grilla.',
      tip:'Recorré la grilla con el dedo: "Fila 1: MOO, MOO. Fila 2: MOO, MOO..." Contar uno por uno está perfecto a esta edad. La automatización (multiplicar directamente) vendrá con la práctica.',
    },
    questions:[
      { animal:'🐄', sound:'MOO!',   soundCount:2, times:4, opts:[6,7,8,9],   ans:8  },
      { animal:'🐕', sound:'WOOF!',  soundCount:3, times:3, opts:[7,8,9,10],  ans:9  },
      { animal:'🦆', sound:'QUACK!', soundCount:2, times:5, opts:[8,9,10,11], ans:10 },
    ],
  },
  {
    id:'truefalse', type:'and',
    badge:'🔗 Programación · V/F con Y (AND)',
    title:'¿Las DOS condiciones son verdaderas?',
    sub:'Y (AND): solo es VERDADERO si los DOS son verdaderos · AND: only TRUE if BOTH are true',
    guide:{
      concept:'<strong>¿Qué es el AND lógico?</strong> En programación, AND (Y) conecta dos condiciones: el resultado es verdadero SOLO si las dos son verdaderas al mismo tiempo. Es la base de los filtros y de casi toda lógica de programas.',
      tip:'"Las dos tienen que ser verdaderas al mismo tiempo para que el resultado sea VERDADERO. Si una está mal, el resultado es FALSO." Evaluá cada parte por separado primero, luego combiná.',
    },
    questions:[
      { c1:'3 > 2', c2:'4 > 1', stmt:'3 > 2  Y  4 > 1', en:'3 > 2  AND  4 > 1', ans:true  },
      { c1:'5 > 6', c2:'3 > 1', stmt:'5 > 6  Y  3 > 1', en:'5 > 6  AND  3 > 1', ans:false },
      { c1:'2+3=5', c2:'1+1=3', stmt:'2+3=5  Y  1+1=3', en:'2+3=5  AND  1+1=3', ans:false },
      { c1:'4+1=5', c2:'6−2=4', stmt:'4+1=5  Y  6−2=4', en:'4+1=5  AND  6−2=4', ans:true  },
    ],
  },
  {
    id:'debug', type:'debug',
    badge:'🐛 Programación · Debug Lógico',
    title:'¡Encontrá el paso equivocado! / Find the wrong step!',
    sub:'El error es lógico: un paso que no corresponde al momento',
    guide:{
      concept:'<strong>Debug lógico.</strong> En este nivel los errores ya no son absurdos sino errores de lógica real: un paso fuera de lugar. Esto es lo que enfrentan los programadores todos los días: código correcto sintácticamente pero incorrecto en orden.',
      tip:'"Leamos todos los pasos juntos. Después de cada uno preguntate: ¿tiene sentido hacer esto en este momento?" Si no encuentra el error, guialo con preguntas concretas: "¿Se puede tomar la leche si todavía no ordeñamos a Molly?"',
    },
    questions:[
      {
        prompt:'🐄 Ordeñar a Molly / Milking Molly:',
        steps:[
          { emoji:'🧼', text:'Lavarse las manos / Wash your hands',  wrong:false },
          { emoji:'🐄', text:'Ir al establo / Go to the barn',       wrong:false },
          { emoji:'🥛', text:'¡Tomar la leche! / Drink the milk!',   wrong:true  },
          { emoji:'🤲', text:'Ordeñar a Molly / Milk Molly',         wrong:false },
        ],
      },
      {
        prompt:'🥚 Recoger huevos / Collecting eggs:',
        steps:[
          { emoji:'🏡', text:'Ir al gallinero / Go to the henhouse', wrong:false },
          { emoji:'🧺', text:'Poner en canasta / Put in basket',     wrong:true  },
          { emoji:'🔍', text:'Buscar los huevos / Look for the eggs',wrong:false },
          { emoji:'🚶', text:'Volver a casa / Go back home',         wrong:false },
        ],
      },
      {
        prompt:'🪣 Dar agua a los animales / Giving water:',
        steps:[
          { emoji:'🪣', text:'Buscar el balde / Find the bucket',    wrong:false },
          { emoji:'🐄', text:'¡Dar agua! / Give the water!',         wrong:true  },
          { emoji:'🚿', text:'Llenar el balde / Fill the bucket',    wrong:false },
          { emoji:'🏃', text:'Llevar al corral / Carry to the pen',  wrong:false },
        ],
      },
      {
        prompt:'🥕 Plantar zanahorias / Planting carrots:',
        steps:[
          { emoji:'🕳️', text:'Hacer hoyos / Dig the holes',          wrong:false },
          { emoji:'⏳', text:'¡Esperar que crezcan! / Wait to grow!', wrong:true  },
          { emoji:'🥕', text:'Poner las semillas / Plant the seeds',  wrong:false },
          { emoji:'💧', text:'Regar / Water the plants',              wrong:false },
        ],
      },
    ],
  },
];

// ─── CONFETTI ────────────────────────────────────────────────────────────────
function launchConfetti() {
  document.getElementById('m3-confetti')?.remove();
  const canvas = document.createElement('canvas');
  canvas.id = 'm3-confetti';
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
  document.getElementById('m3-confetti')?.remove();

  root.innerHTML = `<div id="m3-root">

    <!-- WELCOME -->
    <div class="m3-scr m3-scr--on m3-screen" id="m3-welcome">
      <div class="m3-card" style="background:linear-gradient(135deg,#FBE9E7,#FFFDE7)">
        <div class="m3-welcome-title">🐷 ¡Nivel 3, ${getChildName()}!</div>
        <div class="m3-welcome-sub">¡Seguimos creciendo con Molly! · Let's keep growing! 🔥</div>
        <span style="font-size:3rem;display:block;margin:8px 0">🐄🌟🐷🌟🐑🌟🐔</span>
        <div class="m3-act-list">
          <div class="m3-act-item" style="background:#FCE4EC">📈 Patrones Crecientes <span class="m3-act-new">nuevo</span></div>
          <div class="m3-act-item" style="background:#FFEBEE">➖ Resta Visual <span class="m3-act-new">nuevo</span></div>
          <div class="m3-act-item" style="background:#E8F5E9">🗺️ Grilla de Posiciones <span class="m3-act-new">nuevo</span></div>
          <div class="m3-act-item" style="background:#FFF3E0">➕➖ Sumas y Restas <span class="m3-act-new">nuevo</span></div>
          <div class="m3-act-item" style="background:#E3F2FD">🔀 SI... ENTONCES (IF) <span class="m3-act-new">nuevo</span></div>
          <div class="m3-act-item" style="background:#E0F2F1">🔁 Loops con Grilla <span class="m3-act-new">+difícil</span></div>
          <div class="m3-act-item" style="background:#FCE4EC">🔗 V/F con Y (AND) <span class="m3-act-new">nuevo</span></div>
          <div class="m3-act-item" style="background:#FFEBEE">🐛 Debug Lógico <span class="m3-act-new">+difícil</span></div>
        </div>
        <button class="m3-start" id="m3-start">¡Empezar Nivel 3! 🚀🔥</button>
      </div>
    </div>

    <!-- GAME -->
    <div class="m3-scr m3-screen" id="m3-game">
      <div class="m3-stars-row" id="m3-stars"></div>
      <div id="m3-container"></div>
      <div class="m3-fb" id="m3-feedback" hidden></div>
      <div class="m3-nav">
        <button class="m3-nav-btn m3-btn-prev" id="m3-prev">◀ Atrás</button>
        <button class="m3-nav-btn m3-btn-next" id="m3-next" disabled>Siguiente ▶</button>
      </div>
    </div>

    <!-- FINAL -->
    <div class="m3-scr m3-screen" id="m3-final">
      <div class="m3-card m3-final-card">
        <span class="m3-final-trophy">🏆🔥🏆</span>
        <div class="m3-final-title">¡NIVEL 3 COMPLETADO! 🔥</div>
        <div class="m3-final-medals" id="m3-medals"></div>
        <div class="m3-final-sub" id="m3-finalmsg"></div>
        <span style="font-size:2.5rem;display:block;margin:12px 0">🐄🌟🐷🌟🐑🌟🐔🌟🐴</span>
        <div class="m3-final-sub">¡Molly está súper orgullosa de vos! 🐄🔥</div>
        <div class="m3-nav">
          <button class="m3-nav-btn m3-btn-restart" id="m3-restart">🔄 Jugar de nuevo</button>
        </div>
      </div>
    </div>

  </div>`;

  // ── State ──
  let curAct = 0, curQ = 0, score = 0, total = 0, answered = false;

  // ── DOM ──
  const $ = id => document.getElementById(id);
  const welcome   = $('m3-welcome');
  const game      = $('m3-game');
  const finalScr  = $('m3-final');
  const container = $('m3-container');
  const feedback  = $('m3-feedback');
  const nextBtn   = $('m3-next');
  const starsEl   = $('m3-stars');

  function showScr(name) {
    [welcome, game, finalScr].forEach(s => s.classList.remove('m3-scr--on'));
    ({ welcome, game, final:finalScr })[name]?.classList.add('m3-scr--on');
  }

  function updateStars() {
    starsEl.innerHTML = Array.from({length:8}, (_,i) =>
      `<span style="font-size:1.3rem;filter:${i<score?'none':'grayscale(1) opacity(.35)'};transition:filter .3s">⭐</span>`
    ).join('') + `<span class="m3-score">${score}/${total}</span>`;
  }

  function showFeedback(ok, msg) {
    feedback.textContent = (ok ? '✅ ' : '❌ ') + msg;
    feedback.className   = 'm3-fb ' + (ok ? 'm3-fb--ok' : 'm3-fb--no');
    feedback.hidden = false;
    if (ok) score++;
    total++; answered = true; nextBtn.disabled = false;
    updateStars();
  }

  function clearFeedback() {
    feedback.hidden = true; feedback.textContent = ''; feedback.className = 'm3-fb';
  }

  // ── Render activity ──
  function renderAct() {
    const act = ACTS[curAct], q = act.questions[curQ];
    const pct = Math.round(curQ / act.questions.length * 100);

    const guide = act.guide ? `
      <button class="m3-guide-toggle" data-action="guide-toggle">👨‍👩‍👧 Para papá y mamá ▼</button>
      <div class="m3-guide-box">
        <div>${act.guide.concept}</div>
        <div class="m3-guide-tip">💡 ${act.guide.tip}</div>
      </div>` : '';

    let body = '';
    if (act.type === 'growing')  body = renderGrowing(q);
    if (act.type === 'subtract') body = renderSubtract(q);
    if (act.type === 'grid')     body = renderGrid(q);
    if (act.type === 'mixed')    body = renderMixed(q);
    if (act.type === 'ifelse')   body = renderIfElse(q);
    if (act.type === 'loops')    body = renderLoops(q);
    if (act.type === 'and')      body = renderAnd(q);
    if (act.type === 'debug')    body = renderDebug(q);

    container.innerHTML = `
      <div class="m3-card m3-card--${act.id}">
        <span class="m3-badge">${act.badge}</span>
        <div class="m3-pbar"><div class="m3-pfill" style="width:${pct}%"></div></div>
        ${guide}
        <div class="m3-qtitle">${act.title}</div>
        <div class="m3-qsub">${act.sub}</div>
        ${body}
      </div>`;
  }

  // ── Renderers ──
  function renderGrowing(q) {
    const boxes = q.seq.map(s => `<div class="m3-grow-box">${s}</div>`).join('');
    const opts  = q.opts.map((o,i) =>
      `<button class="m3-grow-opt" data-action="growing" data-idx="${i}">${o}</button>`
    ).join('');
    return `<div class="m3-grow-seq">${boxes}<div class="m3-grow-box blank">?</div></div>
      <div class="m3-grow-opts">${opts}</div>`;
  }

  function renderSubtract(q) {
    const animals = Array.from({length:q.total}, (_,i) =>
      `<span class="m3-sub-animal${i < q.leaving ? ' leaving' : ''}">${q.animal}</span>`
    ).join('');
    const opts = q.opts.map(o =>
      `<button class="m3-opt m3-opt--num" data-action="subtract" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m3-sub-box">
        <div class="m3-sub-label">❌ Se van ${q.leaving} / ${q.leaving} leave</div>
        <div class="m3-sub-row">${animals}</div>
      </div>
      <div class="m3-qsub" style="margin-top:8px">¿Cuántos ${q.animal} quedan? / How many are left?</div>
      <div class="m3-opts">${opts}</div>`;
  }

  function renderGrid(q) {
    const colLabels = ['IZQ / LEFT','CTR / CTR','DER / RIGHT'];
    let cells = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const active = q.grid[r][c] === 1;
      cells += `<div class="m3-grid-cell${active ? ' active' : ''}">${active ? '🐄' : ''}</div>`;
    }
    const colHdr = colLabels.map(l => `<div>${l}</div>`).join('');
    return `<div class="m3-grid-col-labels">${colHdr}</div>
      <div class="m3-grid">${cells}</div>
      <div class="m3-stmt">${q.q}</div>
      <div class="m3-opts">
        <button class="m3-tf m3-tf--t" data-action="tf" data-val="true">✅ VERDADERO<br><small>TRUE</small></button>
        <button class="m3-tf m3-tf--f" data-action="tf" data-val="false">❌ FALSO<br><small>FALSE</small></button>
      </div>`;
  }

  function renderMixed(q) {
    const aStr = q.a.join(''), bStr = q.b.join('');
    const opClass = q.op === '+' ? 'm3-op-plus' : 'm3-op-minus';
    const opts = q.opts.map(o =>
      `<button class="m3-opt m3-opt--num" data-action="mixed" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m3-mixed-row">${aStr} <span class="${opClass}">${q.op}</span> ${bStr} <span class="m3-op-eq">=</span> <span class="m3-blank">?</span></div>
      <div class="m3-opts">${opts}</div>`;
  }

  function renderIfElse(q) {
    const btns = q.opts.map((o,i) =>
      `<button class="m3-if-btn" data-action="ifelse" data-idx="${i}">
        <div style="font-size:1.8rem">${o}</div>
        <div style="font-size:.6rem;color:#555;margin-top:4px;white-space:pre-line">${q.labels[i]}</div>
      </button>`
    ).join('');
    return `<div class="m3-if-label">SI / IF:</div>
      <div class="m3-if-cond">${q.cond}</div>
      <div class="m3-qsub" style="margin:6px 0">${q.prompt}</div>
      <div class="m3-if-opts">${btns}</div>`;
  }

  function renderLoops(q) {
    const rows = Array.from({length:q.times}, (_,i) =>
      `<div class="m3-loop-row">
        <span class="m3-loop-iter">${i+1}.</span>
        <span class="m3-loop-sounds">${Array(q.soundCount).fill(q.animal + ' ' + q.sound).join('  ')}</span>
      </div>`
    ).join('');
    const opts = q.opts.map(o =>
      `<button class="m3-opt m3-opt--num" data-action="loop" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m3-loop-grid">${rows}
        <div class="m3-loop-total">🔢 Total de "${q.sound}" = ?</div>
      </div>
      <div class="m3-opts">${opts}</div>`;
  }

  function renderAnd(q) {
    return `<div class="m3-and-box">
        <div class="m3-cond-pill">${q.c1}</div>
        <div class="m3-and-connector">Y / AND</div>
        <div class="m3-cond-pill">${q.c2}</div>
      </div>
      <div class="m3-stmt">"${q.stmt}"</div>
      <div class="m3-stmt-en">"${q.en}"</div>
      <div class="m3-opts">
        <button class="m3-tf m3-tf--t" data-action="tf" data-val="true">✅ VERDADERO<br><small>TRUE</small></button>
        <button class="m3-tf m3-tf--f" data-action="tf" data-val="false">❌ FALSO<br><small>FALSE</small></button>
      </div>`;
  }

  function renderDebug(q) {
    const steps = q.steps.map((s,i) =>
      `<div class="m3-dbg" data-action="debug" data-idx="${i}">
        <span class="m3-dbg-num">${i+1}</span>
        <span class="m3-dbg-emoji">${s.emoji}</span>
        <span class="m3-dbg-text">${s.text}</span>
      </div>`
    ).join('');
    return `<div class="m3-dbg-prompt">${q.prompt}</div>
      <div class="m3-dbg-steps">${steps}</div>
      <div class="m3-hint">🖱️ Hacé clic en el paso equivocado</div>`;
  }

  // ── Answer handlers ──
  function answerGrowing(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="growing"]').forEach((b,i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add('m3-ok');
      else if (i === idx) b.classList.add('m3-no');
    });
    showFeedback(idx === q.ans, idx === q.ans ? '¡Correcto! El patrón sigue creciendo 📈' : `La respuesta era: ${q.opts[q.ans]}`);
  }

  function answerSubtract(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="subtract"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m3-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m3-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.total} − ${q.leaving} = ${q.ans} 🌟` : `La respuesta era ${q.ans}`);
  }

  function answerTF(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="tf"]').forEach(b => {
      b.disabled = true;
      const bv = b.dataset.val === 'true';
      if (bv === q.ans) b.classList.add('m3-ok');
      else if (bv === val && !ok) b.classList.add('m3-no');
    });
    showFeedback(ok, ok ? '¡Correcto! 🌟' : `Era ${q.ans ? 'VERDADERO ✅' : 'FALSO ❌'}`);
  }

  function answerMixed(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="mixed"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m3-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m3-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.a.length} ${q.op} ${q.b.length} = ${q.ans} 🌟` : `La respuesta era ${q.ans}`);
  }

  function answerIfElse(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="ifelse"]').forEach((b,i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add('m3-ok');
      else if (i === idx) b.classList.add('m3-no');
    });
    showFeedback(idx === q.ans, idx === q.ans ? '¡Correcto! / Correct! 🔀🌟' : '¡Casi! / Almost!');
  }

  function answerLoop(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="loop"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m3-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m3-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.soundCount} × ${q.times} = ${q.ans} 🌟` : `La respuesta era ${q.ans} (${q.soundCount} × ${q.times})`);
  }

  function answerDebug(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="debug"]').forEach((el,i) => {
      el.style.pointerEvents = 'none';
      if (q.steps[i].wrong) el.classList.add('m3-ok');
      else if (i === idx)   el.classList.add('m3-no');
    });
    showFeedback(q.steps[idx].wrong, q.steps[idx].wrong ? '¡Encontraste el error lógico! 🐛✅' : '¡Casi! El paso equivocado está marcado.');
  }

  // ── Event delegation ──
  container.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const { action, idx, val } = el.dataset;
    if (action === 'guide-toggle') {
      const box = container.querySelector('.m3-guide-box');
      if (box) { box.classList.toggle('open'); el.textContent = box.classList.contains('open') ? '👨‍👩‍👧 Para papá y mamá ▲' : '👨‍👩‍👧 Para papá y mamá ▼'; }
      return;
    }
    if (answered) return;
    if (action === 'growing')  answerGrowing(+idx);
    else if (action === 'subtract') answerSubtract(+val);
    else if (action === 'tf')       answerTF(val === 'true');
    else if (action === 'mixed')    answerMixed(+val);
    else if (action === 'ifelse')   answerIfElse(+idx);
    else if (action === 'loop')     answerLoop(+val);
    else if (action === 'debug')    answerDebug(+idx);
  });

  // ── Navigation ──
  $('m3-start').addEventListener('click', () => {
    curAct = 0; curQ = 0; score = 0; total = 0; answered = false;
    updateStars(); clearFeedback(); nextBtn.disabled = true;
    showScr('game'); renderAct();
  });

  $('m3-prev').addEventListener('click', () => {
    if (curAct > 0) {
      curAct--; curQ = 0; answered = false; clearFeedback(); nextBtn.disabled = true; renderAct();
    } else { showScr('welcome'); }
  });

  nextBtn.addEventListener('click', () => {
    if (!answered) return;
    curQ++; answered = false; clearFeedback(); nextBtn.disabled = true;
    const act = ACTS[curAct];
    if (curQ >= act.questions.length) {
      markDone('math', 3, act.id);
      curAct++; curQ = 0;
      if (curAct >= ACTS.length) { showFinal(); return; }
    }
    renderAct();
  });

  $('m3-restart').addEventListener('click', () => showScr('welcome'));

  function showFinal() {
    showScr('final');
    const stars = total > 0 ? Math.round(score / total * 8) : 0;
    $('m3-medals').textContent = '⭐'.repeat(stars);
    $('m3-finalmsg').textContent = score >= total * 0.75
      ? `¡Excelente! ${score}/${total} correctas 🌟`
      : `¡Muy bien! ${score}/${total} correctas 🌈`;
    launchConfetti();
  }

  updateStars();
  showScr('welcome');
}
