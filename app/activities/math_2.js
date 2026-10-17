import { markDone } from '../progress.js';

function injectCSS() {
  if (document.getElementById('molly-math2-css')) return;
  const s = document.createElement('style');
  s.id = 'molly-math2-css';
  s.textContent = `
#m2-root .m2-scr { display:none }
#m2-root .m2-scr--on { display:block }
#m2-root .m2-screen { max-width:700px; margin:18px auto; padding:0 14px }

/* card */
#m2-root .m2-card { background:#fff; border-radius:22px; padding:22px 18px;
  box-shadow:0 6px 20px rgba(0,0,0,.1); text-align:center; position:relative; overflow:hidden }
#m2-root .m2-card::before { content:''; position:absolute; top:0; left:0; right:0; height:6px }
#m2-root .m2-card--patterns::before  { background:linear-gradient(90deg,#E91E63,#FF9800) }
#m2-root .m2-card--howmany::before   { background:linear-gradient(90deg,#1565C0,#0288D1) }
#m2-root .m2-card--space::before     { background:linear-gradient(90deg,#2E7D32,#66BB6A) }
#m2-root .m2-card--sums::before      { background:linear-gradient(90deg,#E65100,#FFA000) }
#m2-root .m2-card--sequence::before  { background:linear-gradient(90deg,#6A1B9A,#AB47BC) }
#m2-root .m2-card--loops::before     { background:linear-gradient(90deg,#00695C,#26A69A) }
#m2-root .m2-card--truefalse::before { background:linear-gradient(90deg,#C2185B,#F06292) }
#m2-root .m2-card--debug::before     { background:linear-gradient(90deg,#B71C1C,#EF5350) }

/* badge */
#m2-root .m2-badge { display:inline-block; padding:5px 14px; border-radius:20px;
  font-size:.82rem; font-weight:700; color:#fff; margin-bottom:8px }
#m2-root .m2-card--patterns  .m2-badge { background:#E91E63 }
#m2-root .m2-card--howmany   .m2-badge { background:#1565C0 }
#m2-root .m2-card--space     .m2-badge { background:#2E7D32 }
#m2-root .m2-card--sums      .m2-badge { background:#E65100 }
#m2-root .m2-card--sequence  .m2-badge { background:#6A1B9A }
#m2-root .m2-card--loops     .m2-badge { background:#00695C }
#m2-root .m2-card--truefalse .m2-badge { background:#C2185B }
#m2-root .m2-card--debug     .m2-badge { background:#B71C1C }

/* progress bar */
#m2-root .m2-pbar  { background:#EEE; border-radius:10px; height:8px; margin:8px 0 6px; overflow:hidden }
#m2-root .m2-pfill { height:100%; background:linear-gradient(90deg,#AB47BC,#FDD835); border-radius:10px; transition:width .4s }

/* question text */
#m2-root .m2-qtitle { font-size:1.2rem; color:#333; font-weight:700; margin-bottom:4px }
#m2-root .m2-qsub   { font-size:.88rem; color:var(--muted); margin-bottom:12px }

/* emoji */
#m2-root .m2-emoji-row { font-size:2.4rem; letter-spacing:4px; margin:12px 0; line-height:1.4 }
#m2-root .m2-blank { display:inline-block; width:52px; height:52px; background:#FFFDE7;
  border:3px dashed #F9A825; border-radius:12px; vertical-align:middle;
  line-height:52px; color:#AAA; font-size:.85rem }
#m2-root .m2-op { font-size:.65em; color:#888; vertical-align:middle }

/* option buttons */
#m2-root .m2-opts { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:14px }
#m2-root .m2-opt  { padding:12px 20px; font-size:1.4rem; border-radius:14px;
  border:3px solid transparent; cursor:pointer; background:#FFFDE7;
  font-family:inherit; transition:transform .15s; min-width:70px }
#m2-root .m2-opt:hover:not(:disabled) { transform:scale(1.08) }
#m2-root .m2-opt:disabled { cursor:default }
#m2-root .m2-opt--num { font-size:1.8rem; font-weight:700 }
#m2-root .m2-ok { background:#C8E6C9 !important; border-color:#388E3C !important }
#m2-root .m2-no { background:#FFCDD2 !important; border-color:#C62828 !important }

/* feedback */
#m2-root .m2-fb { font-size:1.2rem; font-weight:700; padding:10px 16px; border-radius:12px;
  margin:12px 0; animation:m2pop .3s }
#m2-root .m2-fb--ok { background:#C8E6C9; color:#2E7D32 }
#m2-root .m2-fb--no { background:#FFCDD2; color:#B71C1C }
@keyframes m2pop { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }

/* nav */
#m2-root .m2-nav { display:flex; gap:10px; justify-content:center; margin-top:16px }
#m2-root .m2-nav-btn { padding:10px 26px; font-size:1rem; font-weight:700; border-radius:12px;
  border:none; cursor:pointer; font-family:inherit; transition:all .15s }
#m2-root .m2-nav-btn:hover { transform:translateY(-2px); box-shadow:0 4px 10px rgba(0,0,0,.15) }
#m2-root .m2-btn-next    { background:#6A1B9A; color:#fff }
#m2-root .m2-btn-next:disabled { background:#CCC; cursor:default; transform:none; box-shadow:none }
#m2-root .m2-btn-prev    { background:#EEE; color:#555 }
#m2-root .m2-btn-restart { background:#F9A825; color:#5D4037 }

/* stars */
#m2-root .m2-stars-row { display:flex; align-items:center; justify-content:flex-end;
  gap:2px; padding:6px 0 }
#m2-root .m2-score { font-size:.9rem; color:var(--muted); margin-left:6px }

/* welcome */
#m2-root .m2-welcome-title { font-family:var(--display); font-size:2rem; color:#6A1B9A; margin:0 0 6px }
#m2-root .m2-welcome-sub   { color:var(--muted); margin:0 0 14px; font-size:.95rem }
#m2-root .m2-act-list { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin:12px 0; text-align:left }
#m2-root .m2-act-item { padding:8px 12px; border-radius:12px; font-size:.88rem; color:#333 }
#m2-root .m2-act-new  { font-size:.72rem; color:#888; margin-left:4px }
#m2-root .m2-start { background:linear-gradient(135deg,#6A1B9A,#AB47BC); color:#fff; border:none;
  padding:16px 40px; font-size:1.3rem; font-weight:800; border-radius:18px; cursor:pointer;
  font-family:var(--display); margin-top:8px; transition:transform .2s }
#m2-root .m2-start:hover { transform:scale(1.05) }

/* howmany */
#m2-root .m2-howmany-groups { display:flex; gap:14px; justify-content:center; align-items:center; flex-wrap:wrap; margin:10px 0 }
#m2-root .m2-group-box { padding:14px 12px; background:#E3F2FD; border:3px solid #90CAF9;
  border-radius:16px; font-size:2rem; line-height:1.4; min-width:120px; text-align:center }
#m2-root .m2-group-label { font-size:.38em; color:#555; display:block; font-weight:700; margin-bottom:4px }
#m2-root .m2-group-count { font-size:.38em; color:#1565C0; display:block; font-weight:700; margin-top:4px }
#m2-root .m2-vs { font-size:2rem; color:#888 }
#m2-root .m2-howmany-q { font-size:1rem; color:#333; margin:8px 0; font-weight:600 }

/* space scene */
#m2-root .m2-space-scene { position:relative; width:260px; height:180px; margin:10px auto;
  background:#E3F2FD; border:3px solid #90CAF9; border-radius:18px; overflow:visible }
#m2-root .m2-space-obj { position:absolute; font-size:2.8rem; line-height:1 }

/* math display */
#m2-root .m2-math-display { font-size:3rem; font-weight:700; color:#6A1B9A;
  background:#F3E5F5; border-radius:18px; padding:14px 28px; display:inline-block; margin:12px 0 }

/* true/false buttons */
#m2-root .m2-stmt    { font-size:1.1rem; color:#333; margin:8px 0 2px; font-weight:600 }
#m2-root .m2-stmt-en { font-size:.88rem; color:var(--muted); margin-bottom:10px }
#m2-root .m2-tf { padding:16px 28px; font-size:1.35rem; font-weight:700; border-radius:18px;
  border:3px solid transparent; cursor:pointer; font-family:inherit; min-width:138px; transition:all .15s }
#m2-root .m2-tf:hover:not(:disabled) { transform:scale(1.06) }
#m2-root .m2-tf--t { background:#E8F5E9; color:#2E7D32; border-color:#2E7D32 }
#m2-root .m2-tf--f { background:#FFEBEE; color:#B71C1C; border-color:#B71C1C }

/* sequence */
#m2-root .m2-seq-prompt { font-size:1rem; color:#555; margin:6px 0 10px }
#m2-root .m2-seq-items  { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin:10px 0 }
#m2-root .m2-seq { width:90px; background:#F3E5F5; border:3px solid #CE93D8;
  border-radius:16px; padding:10px 6px; cursor:pointer; font-size:2.2rem;
  text-align:center; transition:all .15s; position:relative }
#m2-root .m2-seq:hover { transform:scale(1.06); border-color:#6A1B9A }
#m2-root .m2-seq-num { position:absolute; top:-10px; right:-10px; background:#6A1B9A;
  color:#fff; width:26px; height:26px; border-radius:50%; font-size:.75rem;
  display:flex; align-items:center; justify-content:center; font-weight:700 }
#m2-root .m2-seq-num:empty { display:none }
#m2-root .m2-seq-lbl { font-size:.62rem; color:#555; margin-top:4px; display:block }
#m2-root .m2-seq--sel { border-color:#6A1B9A }
#m2-root .m2-seq--ok  { background:#C8E6C9; border-color:#2E7D32 }
#m2-root .m2-seq--no  { background:#FFCDD2; border-color:#B71C1C }

/* loops */
#m2-root .m2-loop-box    { display:inline-block; background:#E0F2F1; border:3px solid #00695C;
  border-radius:14px; padding:10px 18px; font-size:1.3rem; margin:8px 0 }
#m2-root .m2-loop-times  { font-size:1.8rem; color:#00695C; font-weight:700; margin:4px 0 }
#m2-root .m2-loop-prompt { font-size:.9rem; color:#555; margin-bottom:8px }

/* debug */
#m2-root .m2-dbg-prompt { font-size:1rem; color:#555; margin:6px 0 10px; text-align:left }
#m2-root .m2-dbg-steps  { display:flex; flex-direction:column; gap:8px; margin:10px 0; text-align:left }
#m2-root .m2-dbg { display:flex; align-items:center; gap:10px; padding:10px 14px;
  background:#FFF3E0; border:3px solid #FFCC80; border-radius:12px; cursor:pointer; transition:all .15s }
#m2-root .m2-dbg:hover { border-color:#E65100; transform:translateX(3px) }
#m2-root .m2-dbg-num   { font-size:1.2rem; font-weight:700; color:#E65100; min-width:24px }
#m2-root .m2-dbg-emoji { font-size:1.7rem }
#m2-root .m2-dbg-text  { flex:1; color:#333; font-size:.95rem }
#m2-root .m2-dbg.m2-ok { background:#C8E6C9; border-color:#2E7D32 }
#m2-root .m2-dbg.m2-no { background:#FFCDD2; border-color:#B71C1C }

/* hint */
#m2-root .m2-hint { font-size:.82rem; color:var(--muted); margin-top:6px }

/* parent guide */
#m2-root .m2-guide-toggle { display:inline-flex; align-items:center; gap:6px; background:#FFF8E1;
  border:2px solid #FFD54F; border-radius:12px; padding:7px 14px; font-size:.82rem;
  color:#5D4037; cursor:pointer; margin-bottom:8px; font-family:inherit; transition:background .15s }
#m2-root .m2-guide-toggle:hover { background:#FFE082 }
#m2-root .m2-guide-box { background:#FFFDE7; border:2px solid #FFD54F; border-radius:14px;
  padding:12px 14px; margin-bottom:10px; text-align:left; font-size:.83rem;
  line-height:1.5; color:#4E342E; display:none }
#m2-root .m2-guide-box.open { display:block }
#m2-root .m2-guide-tip { margin-top:8px; padding:8px 10px; background:#E8F5E9;
  border-left:4px solid #388E3C; border-radius:0 10px 10px 0; color:#1B5E20; font-style:italic }

/* final */
#m2-root .m2-final-card { background:linear-gradient(135deg,#F3E5F5,#C8E6C9,#E1F5FE) }
#m2-root .m2-final-trophy { font-size:3.5rem; display:block; margin:8px 0 }
#m2-root .m2-final-title  { font-family:var(--display); font-size:1.8rem; font-weight:800; color:#6A1B9A }
#m2-root .m2-final-medals { font-size:2.2rem; letter-spacing:6px; margin:12px 0 }
#m2-root .m2-final-sub    { font-size:1.1rem; color:var(--muted); margin:8px 0 }
`;
  document.head.appendChild(s);
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const ACTS = [
  {
    id:'patterns', type:'patterns',
    badge:'🔴 Matemáticas · Patrones ABC',
    title:'¿Qué sigue?',
    sub:'¡Ahora el patrón tiene 3 partes! · Now the pattern has 3 parts!',
    guide:{ concept:'Reconocer patrones es la base de la matemática y la programación. Ahora hay 3 elementos diferentes (A-B-C).', tip:'Leé el patrón en voz alta juntos antes de hacer clic: "rojo, azul, amarillo... rojo, azul... ¿qué sigue?"' },
    questions:[
      { seq:['🔴','🔵','🟡','🔴','🔵'], opts:['🟡','🔴','🔵'], ans:0 },
      { seq:['🐄','🐷','🐑','🐄','🐷'], opts:['🐑','🐄','🐷'], ans:0 },
      { seq:['⭐','🌙','☀️','⭐','🌙'],  opts:['☀️','⭐','🌙'],  ans:0 },
      { seq:['🍎','🍌','🍊','🍎','🍌'], opts:['🍊','🍎','🍌'], ans:0 },
    ]
  },
  {
    id:'howmany', type:'howmany',
    badge:'➖ Matemáticas · ¿Cuántas MÁS?',
    title:'¿Cuántas MÁS tiene el Grupo A?',
    sub:'Contá la diferencia entre los dos grupos · Count the difference',
    guide:{ concept:'La diferencia entre grupos introduce la resta de forma visual, sin usar el símbolo "−" todavía.', tip:'Pedile que cuente con el dedo: "¿Cuántas vacas tiene el Grupo A que el Grupo B no tiene?"' },
    questions:[
      { a:['🐄','🐄','🐄','🐄'],      b:['🐄','🐄'],           opts:[1,2,3], ans:2 },
      { a:['🐷','🐷','🐷','🐷','🐷'], b:['🐷','🐷'],           opts:[2,3,4], ans:3 },
      { a:['🐑','🐑','🐑'],           b:['🐑'],                opts:[1,2,3], ans:2 },
      { a:['🐔','🐔','🐔','🐔'],      b:['🐔','🐔','🐔'],      opts:[1,2,3], ans:1 },
    ]
  },
  {
    id:'space', type:'truefalse',
    badge:'↕️ Matemáticas · Posiciones',
    title:'¿Verdadero o Falso?',
    sub:'¿Dónde está el objeto? · Where is the object?',
    guide:{ concept:'Avanzamos de adentro/afuera hacia las cuatro direcciones: arriba, abajo, izquierda, derecha.', tip:'Izquierda y derecha suelen ser las más difíciles. Truco: recordale que la mano con la que escribe es la derecha.' },
    questions:[
      { visual:'above', obj:'🍎', ref:'📦', stmt:'La manzana está ARRIBA de la caja',        en:'The apple is ABOVE the box',            ans:true  },
      { visual:'below', obj:'🦆', ref:'☁️', stmt:'El pato está ARRIBA de la nube',           en:'The duck is ABOVE the cloud',           ans:false },
      { visual:'left',  obj:'🐄', ref:'🏠', stmt:'La vaca está a la IZQUIERDA',             en:'The cow is on the LEFT',                ans:true  },
      { visual:'right', obj:'🌸', ref:'🌳', stmt:'La flor está a la IZQUIERDA del árbol',   en:'The flower is to the LEFT of the tree', ans:false },
    ]
  },
  {
    id:'sums', type:'sums',
    badge:'➕ Matemáticas · Sumas hasta 10',
    title:'¿Cuántos hay en total?',
    sub:'Contá los dos grupos y sumalos · Count both groups and add them',
    guide:{ concept:'Consolidamos la suma con números más grandes que antes (hasta 10). Lo importante es el proceso de juntar y contar.', tip:'Si Elena duda, animala a contar con los dedos o señalar cada emoji. No hay apuro en llegar a la respuesta de memoria.' },
    questions:[
      { a:['🐄','🐄','🐄'],           b:['🐄','🐄'],            opts:[4,5,6], ans:5 },
      { a:['🐷','🐷','🐷'],           b:['🐷','🐷','🐷'],       opts:[5,6,7], ans:6 },
      { a:['🐑','🐑','🐑','🐑'],      b:['🐑','🐑','🐑'],       opts:[6,7,8], ans:7 },
      { a:['🐔','🐔','🐔','🐔'],      b:['🐔','🐔','🐔','🐔'],  opts:[7,8,9], ans:8 },
    ]
  },
  {
    id:'sequence', type:'sequence',
    badge:'🔢 Programación · Secuencias de 4 pasos',
    title:'Poné los 4 pasos en orden',
    sub:'Hacé clic de PRIMERO a CUARTO · Click from FIRST to FOURTH',
    guide:{ concept:'Pasar de 3 a 4 pasos multiplica las combinaciones posibles y exige más razonamiento lógico.', tip:'Hablá los pasos en voz alta antes de hacer clic: que Elena cuente la historia con sus palabras primero.' },
    questions:[
      {
        prompt:'🌱 ¿Cómo crece y se come una fruta? / How does fruit grow and get eaten?',
        items:[
          { emoji:'🌰', label:'1. Semilla/Seed' },
          { emoji:'😋', label:'4. Comer/Eat' },
          { emoji:'🌱', label:'2. Brote/Sprout' },
          { emoji:'🍎', label:'3. Fruta/Fruit' },
        ],
        correct:[0,2,3,1]
      },
      {
        prompt:'🥤 ¿Cómo hacer jugo de naranja? / How to make orange juice?',
        items:[
          { emoji:'🥤', label:'4. Tomar/Drink' },
          { emoji:'🍊', label:'1. Agarrar/Pick' },
          { emoji:'🍹', label:'3. Exprimir/Squeeze' },
          { emoji:'🧼', label:'2. Lavar/Wash' },
        ],
        correct:[1,3,2,0]
      },
      {
        prompt:'🐔 ¿Cómo crece un pollito? / How does a chick grow?',
        items:[
          { emoji:'🐣', label:'2. Nace/Hatches' },
          { emoji:'🥚', label:'1. Huevo/Egg' },
          { emoji:'🐔', label:'4. Gallina/Hen' },
          { emoji:'🐥', label:'3. Pollito/Chick' },
        ],
        correct:[1,0,3,2]
      },
    ]
  },
  {
    id:'loops', type:'loops',
    badge:'🔁 Programación · Loops ×3 ×4',
    title:'¿Cuántas veces en total?',
    sub:'¡Ahora con más repeticiones! · Now with more repetitions!',
    guide:{ concept:'Calcular cuántas veces ocurre algo en total es la base de la multiplicación: 3 MOOs × 3 veces = 9 MOOs.', tip:'Hacelo físico: decí "MOO MOO MOO" juntos, aplaudí una vez, y repetí. Después contá todos los MOOs.' },
    questions:[
      { animal:'🐄', sound:'MOO!',  soundCount:3, times:3, prompt:'Molly dice 🐄 MOO! MOO! MOO! — Lo hace 3 veces.', opts:[6,7,8,9],  ans:9 },
      { animal:'🐕', sound:'WOOF!', soundCount:2, times:4, prompt:'🐕 dice WOOF! WOOF! — Lo hace 4 veces.',          opts:[6,7,8,9],  ans:8 },
      { animal:'🐈', sound:'MEOW!', soundCount:3, times:3, prompt:'🐈 dice MEOW! MEOW! MEOW! — Lo hace 3 veces.',   opts:[7,8,9,10], ans:9 },
    ]
  },
  {
    id:'truefalse', type:'truefalse',
    badge:'✅ Programación · Comparaciones',
    title:'¿Verdadero o Falso?',
    sub:'Matemáticas y comparaciones · Math and comparisons',
    guide:{ concept:'En código, casi toda decisión se basa en una condición verdadera o falsa. Introducimos comparaciones numéricas (3 > 2) y sumas como afirmaciones (2+2=5).', tip:'"Mayor que" puede ser difícil. Truco: el símbolo > es una boca que se come al número más grande. Para las sumas, animá a Elena a contar con los dedos.' },
    questions:[
      { visual:'math', inner:'3 > 2', ref:'', stmt:'3 es MAYOR que 2',  en:'3 is GREATER THAN 2', ans:true  },
      { visual:'math', inner:'5 < 4', ref:'', stmt:'5 es MENOR que 4',  en:'5 is LESS THAN 4',    ans:false },
      { visual:'math', inner:'2+2=5', ref:'', stmt:'2 + 2 = 5',         en:'2 + 2 = 5',           ans:false },
      { visual:'math', inner:'4+1=5', ref:'', stmt:'4 + 1 = 5',         en:'4 + 1 = 5',           ans:true  },
    ]
  },
  {
    id:'debug', type:'debug',
    badge:'🐛 Programación · Debug',
    title:'¡Encontrá el paso equivocado!',
    sub:'Un paso está en el lugar incorrecto · One step is in the wrong place',
    guide:{ concept:'Los errores ahora son más sutiles: ya no son absurdos (volar a la luna) sino lógicamente incorrectos o fuera de orden.', tip:'Leé los pasos en voz alta y preguntá: "¿Tiene sentido hacer esto acá?" Si dice que todos están bien, preguntá: "¿Podés tomar el jugo antes de exprimirlo?"' },
    questions:[
      {
        prompt:'🍊 Pasos para hacer jugo:',
        steps:[
          { emoji:'🍊', text:'Agarrar la naranja / Pick the orange',  wrong:false },
          { emoji:'🥤', text:'¡Tomar el jugo! / Drink the juice!',    wrong:true  },
          { emoji:'🍹', text:'Exprimir la naranja / Squeeze orange',  wrong:false },
          { emoji:'🫙', text:'Verter en vaso / Pour into glass',      wrong:false },
        ]
      },
      {
        prompt:'👕 Pasos para vestirse:',
        steps:[
          { emoji:'🚿', text:'Bañarse / Take a shower',               wrong:false },
          { emoji:'👕', text:'Ponerse la remera / Put on shirt',       wrong:false },
          { emoji:'👟', text:'Ponerse los zapatos / Put on shoes',     wrong:false },
          { emoji:'🛁', text:'Llenar la bañera / Fill the bathtub',    wrong:true  },
        ]
      },
      {
        prompt:'🌱 Pasos para plantar:',
        steps:[
          { emoji:'🌰', text:'Poner la semilla / Place the seed',        wrong:false },
          { emoji:'💧', text:'Regar / Water it',                         wrong:false },
          { emoji:'🌷', text:'¡Ya tiene flor! / It has a flower!',       wrong:true  },
          { emoji:'⏳', text:'Esperar que crezca / Wait for it to grow', wrong:false },
        ]
      },
    ]
  },
];

// ─── CONFETTI ────────────────────────────────────────────────────────────────
function launchConfetti() {
  document.getElementById('m2-confetti')?.remove();
  const canvas = document.createElement('canvas');
  canvas.id = 'm2-confetti';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const pieces = Array.from({length:140}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*-canvas.height,
    r: Math.random()*8+4, c:`hsl(${Math.random()*360},90%,60%)`,
    speed: Math.random()*4+2, angle: Math.random()*360, spin:(Math.random()-.5)*5,
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
  document.getElementById('m2-confetti')?.remove();

  root.innerHTML = `<div id="m2-root">

    <!-- WELCOME -->
    <div class="m2-scr m2-scr--on m2-screen" id="m2-welcome">
      <div class="m2-card" style="background:linear-gradient(135deg,#F3E5F5,#FFFDE7)">
        <div class="m2-welcome-title">🐑 ¡Nivel 2, Elena!</div>
        <div class="m2-welcome-sub">¡Seguimos aprendiendo con Molly! · Let's keep learning! 🌟</div>
        <span style="font-size:3rem;display:block;margin:8px 0">🐄🌾🐷🌟🐑</span>
        <div class="m2-act-list">
          <div class="m2-act-item" style="background:#FCE4EC">🔴 Patrones ABC <span class="m2-act-new">+difícil</span></div>
          <div class="m2-act-item" style="background:#E3F2FD">➖ ¿Cuántas MÁS? <span class="m2-act-new">nuevo</span></div>
          <div class="m2-act-item" style="background:#E8F5E9">↕️ Arriba / Abajo <span class="m2-act-new">nuevo</span></div>
          <div class="m2-act-item" style="background:#FFF3E0">➕ Sumas hasta 10 <span class="m2-act-new">+difícil</span></div>
          <div class="m2-act-item" style="background:#F3E5F5">🔢 4 pasos <span class="m2-act-new">+difícil</span></div>
          <div class="m2-act-item" style="background:#E0F2F1">🔁 Loops ×3 ×4 <span class="m2-act-new">+difícil</span></div>
          <div class="m2-act-item" style="background:#FCE4EC">✅ 3&gt;2 / 2+2=5? <span class="m2-act-new">nuevo</span></div>
          <div class="m2-act-item" style="background:#FFEBEE">🐛 Errores de orden <span class="m2-act-new">+difícil</span></div>
        </div>
        <button class="m2-start" id="m2-start">¡Empezar Nivel 2! 🚀</button>
      </div>
    </div>

    <!-- GAME -->
    <div class="m2-scr m2-screen" id="m2-game">
      <div class="m2-stars-row" id="m2-stars"></div>
      <div id="m2-container"></div>
      <div class="m2-fb" id="m2-feedback" hidden></div>
      <div class="m2-nav">
        <button class="m2-nav-btn m2-btn-prev" id="m2-prev">◀ Atrás</button>
        <button class="m2-nav-btn m2-btn-next" id="m2-next" disabled>Siguiente ▶</button>
      </div>
    </div>

    <!-- FINAL -->
    <div class="m2-scr m2-screen" id="m2-final">
      <div class="m2-card m2-final-card">
        <span class="m2-final-trophy">🏆🌟🏆</span>
        <div class="m2-final-title">¡INCREÍBLE! / AMAZING!</div>
        <div class="m2-final-medals" id="m2-medals"></div>
        <div class="m2-final-sub" id="m2-finalmsg"></div>
        <span style="font-size:2.5rem;display:block;margin:12px 0">🐄🌟🐷🌟🐑🌟🐔🌟🐴</span>
        <div class="m2-final-sub">¡Molly está súper orgullosa de vos! 🐄❤️</div>
        <div class="m2-nav">
          <button class="m2-nav-btn m2-btn-restart" id="m2-restart">🔄 Jugar de nuevo</button>
        </div>
      </div>
    </div>

  </div>`;

  // ── State ──
  let curAct = 0, curQ = 0, score = 0, total = 0, answered = false;
  let seqSelected = [], seqOrder = [];

  // ── DOM ──
  const $ = id => document.getElementById(id);
  const welcome   = $('m2-welcome');
  const game      = $('m2-game');
  const finalScr  = $('m2-final');
  const container = $('m2-container');
  const feedback  = $('m2-feedback');
  const nextBtn   = $('m2-next');
  const starsEl   = $('m2-stars');

  function showScr(name) {
    [welcome, game, finalScr].forEach(s => s.classList.remove('m2-scr--on'));
    ({ welcome, game, final:finalScr })[name]?.classList.add('m2-scr--on');
  }

  function updateStars() {
    starsEl.innerHTML = Array.from({length:8}, (_,i) =>
      `<span style="font-size:1.3rem;filter:${i<score?'none':'grayscale(1) opacity(.35)'};transition:filter .3s">⭐</span>`
    ).join('') + `<span class="m2-score">${score}/${total}</span>`;
  }

  function showFeedback(ok, msg) {
    feedback.textContent = (ok ? '✅ ' : '❌ ') + msg;
    feedback.className   = 'm2-fb ' + (ok ? 'm2-fb--ok' : 'm2-fb--no');
    feedback.hidden = false;
    if (ok) score++;
    total++; answered = true; nextBtn.disabled = false;
    updateStars();
  }

  function clearFeedback() {
    feedback.hidden = true; feedback.textContent = ''; feedback.className = 'm2-fb';
  }

  // ── Render activity ──
  function renderAct() {
    const act = ACTS[curAct], q = act.questions[curQ];
    const pct = Math.round(curQ / act.questions.length * 100);
    let body = '';
    if (act.type === 'patterns')  body = renderPatterns(q);
    if (act.type === 'howmany')   body = renderHowMany(q);
    if (act.type === 'truefalse') body = renderTF(q, act.id);
    if (act.type === 'sums')      body = renderSums(q);
    if (act.type === 'sequence')  body = renderSeq(q);
    if (act.type === 'loops')     body = renderLoops(q);
    if (act.type === 'debug')     body = renderDebug(q);

    const guide = act.guide ? `
      <button class="m2-guide-toggle" data-action="guide-toggle">👨‍👩‍👧 Para papá y mamá ▼</button>
      <div class="m2-guide-box">
        <div>${act.guide.concept}</div>
        <div class="m2-guide-tip">💡 ${act.guide.tip}</div>
      </div>` : '';

    container.innerHTML = `
      <div class="m2-card m2-card--${act.id}">
        <span class="m2-badge">${act.badge}</span>
        <div class="m2-pbar"><div class="m2-pfill" style="width:${pct}%"></div></div>
        ${guide}
        <div class="m2-qtitle">${act.title}</div>
        <div class="m2-qsub">${act.sub}</div>
        ${body}
      </div>`;
  }

  // ── Renderers ──
  function renderPatterns(q) {
    const seq  = q.seq.join(' ') + ' <span class="m2-blank">?</span>';
    const opts = q.opts.map((o,i) =>
      `<button class="m2-opt" data-action="pattern" data-idx="${i}">${o}</button>`
    ).join('');
    return `<div class="m2-emoji-row">${seq}</div><div class="m2-opts">${opts}</div>`;
  }

  function renderHowMany(q) {
    const opts = q.opts.map(o =>
      `<button class="m2-opt m2-opt--num" data-action="howmany" data-val="${o}">${o}</button>`
    ).join('');
    return `
      <div class="m2-howmany-groups">
        <div class="m2-group-box">
          <span class="m2-group-label">Grupo A / Group A</span>${q.a.join(' ')}
          <span class="m2-group-count">${q.a.length} animales</span>
        </div>
        <span class="m2-vs">vs</span>
        <div class="m2-group-box">
          <span class="m2-group-label">Grupo B / Group B</span>${q.b.join(' ')}
          <span class="m2-group-count">${q.b.length} animales</span>
        </div>
      </div>
      <div class="m2-howmany-q">A tiene __ MÁS que B / A has __ MORE than B</div>
      <div class="m2-opts">${opts}</div>`;
  }

  function renderTF(q) {
    let visual = '';
    if (q.visual === 'above') {
      visual = `<div class="m2-space-scene">
        <span class="m2-space-obj" style="top:20px;left:50%;transform:translateX(-50%)">${q.obj}</span>
        <span class="m2-space-obj" style="bottom:20px;left:50%;transform:translateX(-50%)">${q.ref}</span>
      </div>`;
    } else if (q.visual === 'below') {
      visual = `<div class="m2-space-scene">
        <span class="m2-space-obj" style="top:20px;left:50%;transform:translateX(-50%)">${q.ref}</span>
        <span class="m2-space-obj" style="bottom:20px;left:50%;transform:translateX(-50%)">${q.obj}</span>
      </div>`;
    } else if (q.visual === 'left') {
      visual = `<div class="m2-space-scene">
        <span class="m2-space-obj" style="left:20px;top:50%;transform:translateY(-50%)">${q.obj}</span>
        <span class="m2-space-obj" style="right:20px;top:50%;transform:translateY(-50%)">${q.ref}</span>
      </div>`;
    } else if (q.visual === 'right') {
      visual = `<div class="m2-space-scene">
        <span class="m2-space-obj" style="left:20px;top:50%;transform:translateY(-50%)">${q.ref}</span>
        <span class="m2-space-obj" style="right:20px;top:50%;transform:translateY(-50%)">${q.obj}</span>
      </div>`;
    } else if (q.visual === 'math') {
      visual = `<div class="m2-math-display">${q.inner}</div>`;
    } else {
      visual = `<div style="font-size:4.5rem;margin:10px 0">${q.inner}</div>`;
    }
    return `${visual}
      <div class="m2-stmt">"${q.stmt}"</div>
      <div class="m2-stmt-en">"${q.en}"</div>
      <div class="m2-opts">
        <button class="m2-tf m2-tf--t" data-action="tf" data-val="true">✅ VERDADERO<br><small>TRUE</small></button>
        <button class="m2-tf m2-tf--f" data-action="tf" data-val="false">❌ FALSO<br><small>FALSE</small></button>
      </div>`;
  }

  function renderSums(q) {
    const opts = q.opts.map(o =>
      `<button class="m2-opt m2-opt--num" data-action="sum" data-val="${o}">${o}</button>`
    ).join('');
    return `<div class="m2-emoji-row">${q.a.join('')} <span class="m2-op">+</span> ${q.b.join('')} <span class="m2-op">=</span> <span class="m2-blank">?</span></div>
      <div class="m2-opts">${opts}</div>`;
  }

  function renderSeq(q) {
    seqSelected = []; seqOrder = q.correct;
    const items = q.items.map((it,i) =>
      `<div class="m2-seq" data-action="seq" data-idx="${i}" id="m2s${i}">
        <span class="m2-seq-num" id="m2sn${i}"></span>
        ${it.emoji}
        <span class="m2-seq-lbl">${it.label}</span>
      </div>`
    ).join('');
    return `<div class="m2-seq-prompt">${q.prompt}</div>
      <div class="m2-seq-items">${items}</div>
      <div class="m2-hint">Clic en orden: 1°, 2°, 3°, 4°</div>`;
  }

  function renderLoops(q) {
    const sounds = Array(q.soundCount).fill(q.sound).join(' ');
    const opts   = q.opts.map(o =>
      `<button class="m2-opt m2-opt--num" data-action="loop" data-val="${o}">${o}</button>`
    ).join('');
    return `
      <div class="m2-loop-prompt">${q.prompt}</div>
      <div class="m2-loop-box">${q.animal} → ${sounds}</div>
      <div class="m2-loop-times">× ${q.times}</div>
      <div class="m2-qsub">¿Cuántas veces en total? / How many total?</div>
      <div class="m2-opts">${opts}</div>`;
  }

  function renderDebug(q) {
    const steps = q.steps.map((s,i) =>
      `<div class="m2-dbg" data-action="debug" data-idx="${i}">
        <span class="m2-dbg-num">${i+1}</span>
        <span class="m2-dbg-emoji">${s.emoji}</span>
        <span class="m2-dbg-text">${s.text}</span>
      </div>`
    ).join('');
    return `<div class="m2-dbg-prompt">${q.prompt}</div>
      <div class="m2-dbg-steps">${steps}</div>
      <div class="m2-hint">🖱️ Hacé clic en el paso equivocado</div>`;
  }

  // ── Answer handlers ──
  function answerPattern(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="pattern"]').forEach((b,i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add('m2-ok');
      else if (i === idx) b.classList.add('m2-no');
    });
    showFeedback(idx === q.ans, idx === q.ans ? '¡Correcto! 🌟' : `La respuesta era ${q.opts[q.ans]}`);
  }

  function answerHowMany(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="howmany"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m2-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m2-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.a.length} - ${q.b.length} = ${q.ans} 🌟` : `La diferencia era ${q.ans}`);
  }

  function answerTF(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="tf"]').forEach(b => {
      b.disabled = true;
      const bv = b.dataset.val === 'true';
      if (bv === q.ans) b.classList.add('m2-ok');
      else if (bv === val && !ok) b.classList.add('m2-no');
    });
    showFeedback(ok, ok ? '¡Correcto! 🌟' : `Era ${q.ans ? 'VERDADERO ✅' : 'FALSO ❌'}`);
  }

  function answerSum(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="sum"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m2-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m2-no');
    });
    showFeedback(ok, ok ? '¡Correcto! 🌟' : `La respuesta era ${q.ans}`);
  }

  function clickSeq(idx) {
    if (seqSelected.includes(idx)) return;
    seqSelected.push(idx);
    const numEl = document.getElementById(`m2sn${idx}`);
    if (numEl) numEl.textContent = seqSelected.length;
    document.getElementById(`m2s${idx}`)?.classList.add('m2-seq--sel');
    if (seqSelected.length < seqOrder.length) return;
    const ok = seqSelected.every((v,i) => v === seqOrder[i]);
    seqSelected.forEach((v,i) =>
      document.getElementById(`m2s${v}`)?.classList.add(v === seqOrder[i] ? 'm2-seq--ok' : 'm2-seq--no')
    );
    showFeedback(ok, ok ? '¡Orden perfecto! 🌟' : '¡Casi! El orden correcto está marcado.');
  }

  function answerLoop(val) {
    const q = ACTS[curAct].questions[curQ];
    const ok = val === q.ans;
    container.querySelectorAll('[data-action="loop"]').forEach(b => {
      b.disabled = true;
      if (+b.dataset.val === q.ans) b.classList.add('m2-ok');
      else if (+b.dataset.val === val && !ok) b.classList.add('m2-no');
    });
    showFeedback(ok, ok ? `¡Correcto! ${q.soundCount} × ${q.times} = ${q.ans} 🌟` : `La respuesta era ${q.ans}`);
  }

  function answerDebug(idx) {
    const q = ACTS[curAct].questions[curQ];
    container.querySelectorAll('[data-action="debug"]').forEach((el,i) => {
      el.style.pointerEvents = 'none';
      if (q.steps[i].wrong) el.classList.add('m2-ok');
      else if (i === idx)   el.classList.add('m2-no');
    });
    showFeedback(q.steps[idx].wrong, q.steps[idx].wrong ? '¡Encontraste el error! 🐛✅' : '¡Casi! El paso equivocado está marcado.');
  }

  // ── Event delegation ──
  container.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const { action, idx, val } = el.dataset;
    if (action === 'guide-toggle') {
      const box = container.querySelector('.m2-guide-box');
      if (box) { box.classList.toggle('open'); el.textContent = box.classList.contains('open') ? '👨‍👩‍👧 Para papá y mamá ▲' : '👨‍👩‍👧 Para papá y mamá ▼'; }
      return;
    }
    if (answered) return;
    if (action === 'pattern') answerPattern(+idx);
    else if (action === 'howmany') answerHowMany(+val);
    else if (action === 'tf')      answerTF(val === 'true');
    else if (action === 'sum')     answerSum(+val);
    else if (action === 'seq')     clickSeq(+idx);
    else if (action === 'loop')    answerLoop(+val);
    else if (action === 'debug')   answerDebug(+idx);
  });

  // ── Navigation ──
  $('m2-start').addEventListener('click', () => {
    curAct = 0; curQ = 0; score = 0; total = 0; answered = false;
    updateStars(); clearFeedback(); nextBtn.disabled = true;
    showScr('game'); renderAct();
  });

  $('m2-prev').addEventListener('click', () => {
    if (curAct > 0) {
      curAct--; curQ = 0; answered = false; clearFeedback(); nextBtn.disabled = true; renderAct();
    } else { showScr('welcome'); }
  });

  nextBtn.addEventListener('click', () => {
    if (!answered) return;
    curQ++; answered = false; clearFeedback(); nextBtn.disabled = true;
    const act = ACTS[curAct];
    if (curQ >= act.questions.length) {
      markDone('math', 2, act.id);
      curAct++; curQ = 0;
      if (curAct >= ACTS.length) { showFinal(); return; }
    }
    renderAct();
  });

  $('m2-restart').addEventListener('click', () => showScr('welcome'));

  function showFinal() {
    showScr('final');
    const stars = total > 0 ? Math.round(score / total * 8) : 0;
    $('m2-medals').textContent = '⭐'.repeat(stars);
    $('m2-finalmsg').textContent = score >= total * 0.75
      ? `¡Excelente! ${score}/${total} correctas 🌟`
      : `¡Muy bien! ${score}/${total} correctas 🌈`;
    launchConfetti();
  }

  updateStars();
  showScr('welcome');
}
