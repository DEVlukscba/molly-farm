// app/activities/math.js — Math Farm Nivel 8

const CSS_ID = 'molly-math-css';
const CSS = `
#math-root {
  font-family: 'Baloo 2','Arial Rounded MT Bold','Comic Sans MS',Arial,sans-serif;
  background: linear-gradient(135deg,#EFEBE9 0%,#FFFDE7 50%,#F1F8E9 100%);
  min-height: 100%;
  padding-bottom: 40px;
}
#math-root .m-hdr {
  background: linear-gradient(90deg,#3E2723,#A1662F);
  color: white; padding: 10px 16px;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;
  box-shadow: 0 3px 8px rgba(0,0,0,.22);
  position: sticky; top: 0; z-index: 100;
}
#math-root .m-hdr h2 { font-size: 1em; margin: 0; }
#math-root .m-stars { display: flex; gap: 3px; align-items: center; }
#math-root .m-star  { font-size: 1.35em; filter: grayscale(1) opacity(.4); transition: all .3s; }
#math-root .m-star.lit { filter: none; transform: scale(1.2); }
#math-root .m-score { color: #FFE0B2; font-size: .82em; margin-left: 5px; }

#math-root .m-scr { display: none; max-width: 780px; margin: 20px auto; padding: 0 14px; }
#math-root .m-scr.active { display: block; }

#math-root .m-card {
  background: white; border-radius: 24px; padding: 22px 18px;
  box-shadow: 0 6px 24px rgba(0,0,0,.1); text-align: center; position: relative; overflow: hidden;
}
#math-root .m-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; }
#math-root .m-card.act-tens2::before   { background: linear-gradient(90deg,#004D40,#26A69A); }
#math-root .m-card.act-mixed::before   { background: linear-gradient(90deg,#1B5E20,#66BB6A); }
#math-root .m-card.act-clock1h::before { background: linear-gradient(90deg,#1A237E,#7986CB); }
#math-root .m-card.act-basket::before  { background: linear-gradient(90deg,#BF360C,#FF7043); }
#math-root .m-card.act-days::before    { background: linear-gradient(90deg,#880E4F,#F06292); }
#math-root .m-card.act-missletter::before { background: linear-gradient(90deg,#1565C0,#42A5F5); }
#math-root .m-card.act-params2::before { background: linear-gradient(90deg,#4A148C,#AB47BC); }
#math-root .m-card.act-swap::before    { background: linear-gradient(90deg,#E65100,#FFA000); }

#math-root .m-act-badge {
  display: inline-block; padding: 5px 15px; border-radius: 20px;
  font-size: .8em; font-weight: bold; color: white; margin-bottom: 8px;
}
#math-root .m-card.act-tens2   .m-act-badge { background: #004D40; }
#math-root .m-card.act-mixed   .m-act-badge { background: #1B5E20; }
#math-root .m-card.act-clock1h .m-act-badge { background: #1A237E; }
#math-root .m-card.act-basket  .m-act-badge { background: #BF360C; }
#math-root .m-card.act-days    .m-act-badge { background: #880E4F; }
#math-root .m-card.act-missletter .m-act-badge { background: #1565C0; }
#math-root .m-card.act-params2 .m-act-badge { background: #4A148C; }
#math-root .m-card.act-swap    .m-act-badge { background: #E65100; }

#math-root .m-lvl-badge {
  position: absolute; top: 12px; right: 14px;
  background: linear-gradient(135deg,#3E2723,#A1662F); color: white;
  border-radius: 12px; padding: 3px 10px; font-size: .74em; font-weight: bold;
}
#math-root .m-progress { background: #EEE; border-radius: 10px; height: 10px; margin: 7px 0 14px; overflow: hidden; }
#math-root .m-progress-fill { height: 100%; background: linear-gradient(90deg,#A1662F,#FDD835); border-radius: 10px; transition: width .4s; }

#math-root .m-qtxt { font-size: 1.12em; color: #333; margin-bottom: 12px; line-height: 1.4; }
#math-root .m-qtxt .es { color: #5D4037; }
#math-root .m-qtxt .en { color: #6D4C41; font-size: .85em; font-style: italic; }
#math-root .m-ask { font-size: .91em; color: #555; margin: 7px 0; }

#math-root .m-opts { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 12px; }
#math-root .m-opt {
  padding: 11px 16px; font-size: 1.3em; border-radius: 16px; border: 3px solid transparent;
  cursor: pointer; transition: all .18s; background: #FFFDE7; min-width: 68px; font-family: inherit;
}
#math-root .m-opt:hover  { transform: scale(1.08); box-shadow: 0 4px 12px rgba(0,0,0,.15); }
#math-root .m-opt.correct, #math-root .m-pick.correct { background: #C8E6C9!important; border-color: #388E3C!important; transform: scale(1.04); }
#math-root .m-opt.wrong,   #math-root .m-pick.wrong   { background: #FFCDD2!important; border-color: #C62828!important; }
#math-root .m-opt:disabled, #math-root .m-pick:disabled { cursor: default; }

/* Tens2 */
#math-root .m-tens-box { display: inline-flex; gap: 14px; align-items: flex-end; justify-content: center; flex-wrap: wrap; background: #E0F2F1; border: 3px solid #80CBC4; border-radius: 18px; padding: 12px 16px; margin: 7px 0; }
#math-root .m-tens-grp { text-align: center; }
#math-root .m-tens-lbl { font-size: .76em; color: #00695C; font-weight: bold; margin-top: 4px; }
#math-root .m-ten-bar { display: inline-flex; flex-direction: column; gap: 1px; margin: 0 2px; font-size: .88em; line-height: 1.05; background: white; border: 2px solid #4DB6AC; border-radius: 10px; padding: 2px 3px; }
#math-root .m-ones { font-size: 1.75em; letter-spacing: 2px; line-height: 1.3; max-width: 170px; }
#math-root .m-tens-hint { font-size: .76em; color: #888; font-style: italic; margin: 3px 0; }
#math-root .m-big-num { font-size: 3.6em; font-weight: bold; color: #00695C; background: #E0F2F1; border: 4px solid #80CBC4; border-radius: 24px; display: inline-block; padding: 2px 26px; margin: 6px 0; }
#math-root .m-rep-btn { background: white; border: 3px solid #80CBC4; border-radius: 16px; padding: 7px 11px; cursor: pointer; font-family: inherit; transition: all .18s; min-width: 120px; }
#math-root .m-rep-btn:hover { transform: scale(1.05); border-color: #00695C; }
#math-root .m-rep-tens { font-size: 1.35em; line-height: 1.3; }
#math-root .m-rep-ones { font-size: 1.15em; line-height: 1.3; }
#math-root .m-rep-cap  { font-size: .71em; color: #777; margin-top: 2px; }

/* Mixed */
#math-root .m-mx-wrap { display: flex; gap: 9px; justify-content: center; align-items: center; flex-wrap: wrap; margin: 9px 0; }
#math-root .m-mx-grp { background: #E8F5E9; border: 3px solid #A5D6A7; border-radius: 16px; padding: 8px 11px; max-width: 280px; }
#math-root .m-mx-grp.arriving { background: #FFF8E1; border: 3px dashed #FFB300; }
#math-root .m-mx-grp.leaving  { background: #FFEBEE; border: 3px solid #EF9A9A; }
#math-root .m-mx-lbl  { font-size: .81em; font-weight: bold; color: #555; margin-bottom: 2px; }
#math-root .m-mx-animals { font-size: 1.75em; line-height: 1.3; }
#math-root .m-mx-sign  { font-size: 1.9em; font-weight: bold; }
#math-root .m-mx-sign.plus  { color: #2E7D32; }
#math-root .m-mx-sign.minus { color: #B71C1C; }
#math-root .m-animal { display: inline-block; position: relative; }
#math-root .m-animal.gone { opacity: .25; }
#math-root .m-animal.gone::after { content: '❌'; position: absolute; top: -4px; right: -4px; font-size: .42em; }

/* Clock */
#math-root .m-clock-wrap { text-align: center; margin: 7px 0; }
#math-root .m-plus1 { display: inline-block; background: #E8EAF6; border: 3px dashed #7986CB; color: #1A237E; border-radius: 14px; padding: 5px 13px; font-weight: bold; margin: 4px 0; }

/* Basket */
#math-root .m-basket-row { display: flex; gap: 9px; justify-content: center; align-items: center; flex-wrap: wrap; margin: 9px 0; }
#math-root .m-basket-item { background: #FFFDE7; border: 3px solid #FFE082; border-radius: 18px; padding: 9px 13px; min-width: 120px; }
#math-root .m-basket-name  { font-size: .85em; color: #555; font-weight: bold; margin-bottom: 4px; }
#math-root .m-basket-coins { font-size: 1.45em; line-height: 1.4; }
#math-root .m-basket-price { font-size: .9em; color: #555; font-weight: bold; margin-top: 2px; }
#math-root .m-basket-plus  { font-size: 1.9em; color: #E65100; font-weight: bold; }

/* Days */
#math-root .m-days-box { background: #FCE4EC; border: 3px solid #F48FB1; border-radius: 18px; padding: 11px 14px; margin: 9px auto; max-width: 440px; }
#math-root .m-days-title  { font-size: .97em; font-weight: bold; color: #C2185B; margin-bottom: 5px; }
#math-root .m-days-rule   { font-size: .9em; color: #555; margin-bottom: 7px; }
#math-root .m-days-slots  { font-size: 1.65em; line-height: 1.4; }
#math-root .m-day-grp     { display: inline-block; border: 2px dashed #F06292; border-radius: 12px; padding: 2px 4px; margin: 2px; background: white; }
#math-root .m-days-legend { font-size: .76em; color: #777; margin-top: 4px; }

/* MissLetter */
#math-root .m-ml-emoji { font-size: 4.5em; display: block; }
#math-root .m-ml-word  { display: flex; gap: 6px; justify-content: center; margin: 7px 0; }
#math-root .m-ml-cell  { width: 54px; height: 64px; border-radius: 14px; background: #E3F2FD; border: 3px solid #90CAF9; display: flex; align-items: center; justify-content: center; font-size: 2.1em; font-weight: bold; color: #5D4037; }
#math-root .m-ml-cell.gap { background: #FFFDE7; border: 3px dashed #F9A825; color: #CCC; }
#math-root .m-letter-btn { padding: 11px 20px; font-size: 1.8em; font-weight: bold; border-radius: 16px; border: 3px solid #90CAF9; background: #E3F2FD; color: #1565C0; cursor: pointer; transition: all .18s; font-family: inherit; min-width: 68px; }
#math-root .m-letter-btn:hover { transform: scale(1.1); border-color: #1565C0; }

/* Params2 */
#math-root .m-func-block { background: #F3E5F5; border: 3px solid #CE93D8; border-radius: 18px; padding: 11px 14px; margin: 7px auto; text-align: left; max-width: 440px; }
#math-root .m-func-title { display: inline-block; background: #6A1B9A; color: white; padding: 3px 13px; border-radius: 12px; font-size: .9em; font-weight: bold; margin-bottom: 7px; }
#math-root .m-param    { background: #FFD54F; color: #4A148C; border-radius: 8px; padding: 0 6px; margin: 0 1px; }
#math-root .m-param.p2 { background: #80DEEA; color: #004D40; }
#math-root .m-func-step-row { display: flex; align-items: center; gap: 6px; margin: 3px 0; }
#math-root .m-func-step-emoji { font-size: 1.25em; }
#math-root .m-func-step-text  { font-size: .88em; color: #333; }
#math-root .m-call-line { display: inline-block; margin: 5px 0; background: #4A148C; color: white; padding: 6px 14px; border-radius: 14px; font-size: 1.05em; font-family: 'Courier New',monospace; font-weight: bold; }
#math-root .m-result-pic { font-size: 1.8em; background: #FFF8E1; border: 3px dashed #FFB300; border-radius: 16px; display: inline-block; padding: 6px 14px; margin: 6px 0; }
#math-root .m-func-opts { display: flex; gap: 9px; justify-content: center; flex-wrap: wrap; margin-top: 9px; }
#math-root .m-func-opt { background: white; border: 3px solid #CE93D8; border-radius: 14px; padding: 9px 13px; cursor: pointer; transition: all .18s; font-family: inherit; min-width: 95px; }
#math-root .m-func-opt:hover { transform: scale(1.06); border-color: #6A1B9A; }
#math-root .m-fo-emoji { font-size: 1.35em; display: block; }
#math-root .m-fo-label { font-size: .8em; color: #555; margin-top: 3px; font-family: 'Courier New',monospace; font-weight: bold; }

/* Swap */
#math-root .m-sw-steps { display: flex; flex-direction: column; gap: 6px; margin: 9px auto; max-width: 440px; }
#math-root .m-sw-step  { display: flex; align-items: center; gap: 8px; padding: 8px 11px; border-radius: 12px; background: #FFFDE7; border: 2px solid #FFE082; cursor: pointer; font-family: inherit; text-align: left; transition: all .18s; width: 100%; }
#math-root .m-sw-step:hover { transform: scale(1.02); border-color: #E65100; }
#math-root .m-sw-step.selected { background: #FFE0B2; border: 3px solid #E65100; }
#math-root .m-sw-num   { background: #FF8F00; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: .8em; font-weight: bold; flex-shrink: 0; }
#math-root .m-sw-emoji { font-size: 1.45em; }
#math-root .m-sw-text  { font-size: .9em; color: #333; flex: 1; }

/* Guide */
#math-root .m-guide-btn { display: inline-flex; align-items: center; gap: 5px; background: #FFF8E1; border: 2px solid #FFD54F; border-radius: 12px; padding: 5px 13px; font-size: .84em; color: #5D4037; cursor: pointer; margin-bottom: 7px; font-family: inherit; transition: all .18s; }
#math-root .m-guide-btn:hover { background: #FFE082; }
#math-root .m-guide-box { background: #FFFDE7; border: 2px solid #FFD54F; border-radius: 16px; padding: 11px 13px; margin-bottom: 10px; text-align: left; font-size: .83em; line-height: 1.5; color: #4E342E; display: none; }
#math-root .m-guide-box.open { display: block; }
#math-root .m-guide-box strong { color: #E65100; }
#math-root .m-tip { margin-top: 6px; padding: 6px 9px; background: #E8F5E9; border-left: 4px solid #388E3C; border-radius: 0 10px 10px 0; color: #1B5E20; font-style: italic; }

/* Feedback */
#math-root .m-feedback { font-size: 1.2em; font-weight: bold; padding: 9px 16px; border-radius: 14px; margin: 10px 0; display: none; animation: mPop .3s ease; text-align: center; }
#math-root .m-feedback.correct { background: #C8E6C9; color: #2E7D32; }
#math-root .m-feedback.wrong   { background: #FFCDD2; color: #B71C1C; }
@keyframes mPop { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }

/* Nav */
#math-root .m-nav-row { display: flex; gap: 9px; justify-content: center; margin-top: 14px; }
#math-root .m-nav-btn { padding: 10px 24px; font-size: .96em; font-weight: bold; border-radius: 14px; border: none; cursor: pointer; font-family: inherit; transition: all .18s; }
#math-root .m-nav-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,.15); }
#math-root .m-btn-next    { background: #6D4C41; color: white; }
#math-root .m-btn-prev    { background: #EEE; color: #555; }
#math-root .m-btn-restart { background: #F9A825; color: #5D4037; }
#math-root .m-btn-next:disabled { background: #CCC; cursor: default; transform: none; box-shadow: none; }

/* Welcome */
#math-root .m-welcome-card { background: linear-gradient(135deg,#EFEBE9,#FFFDE7,#F1F8E9); }
#math-root .m-welcome-title { font-size: 1.9em; color: #6D4C41; margin-bottom: 4px; }
#math-root .m-lvl-pill { display: inline-block; background: linear-gradient(135deg,#3E2723,#A1662F); color: white; border-radius: 20px; padding: 4px 16px; font-size: .95em; margin: 5px 0 11px; }
#math-root .m-act-list { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin: 12px 0; text-align: left; }
#math-root .m-act-item { padding: 8px 11px; border-radius: 14px; font-size: .89em; color: #333; }
#math-root .m-start-btn { background: linear-gradient(135deg,#3E2723,#A1662F); color: white; border: none; padding: 14px 40px; font-size: 1.25em; font-weight: bold; border-radius: 20px; cursor: pointer; margin-top: 7px; font-family: inherit; transition: all .2s; box-shadow: 0 4px 14px rgba(62,39,35,.35); }
#math-root .m-start-btn:hover { transform: scale(1.05); }

/* Final */
#math-root .m-final-card  { background: linear-gradient(135deg,#EFEBE9,#C8E6C9,#FFF9C4); }
#math-root .m-final-big   { font-size: 3.6em; margin: 7px 0; }
#math-root .m-final-title { font-size: 1.8em; font-weight: bold; color: #6D4C41; }
#math-root .m-final-sub   { font-size: 1.02em; color: #5D4037; margin: 7px 0; }
#math-root .m-medals      { font-size: 2.1em; letter-spacing: 5px; margin: 10px 0; }

@media (max-width:520px) {
  #math-root .m-act-list { grid-template-columns: 1fr; }
  #math-root .m-card { padding: 18px 11px; }
  #math-root .m-lvl-badge { position: static; display: inline-block; margin-bottom: 5px; }
  #math-root .m-ml-cell { width: 46px; height: 56px; font-size: 1.85em; }
}
`;

function injectCSS() {
  if (document.getElementById(CSS_ID)) return;
  const s = document.createElement('style');
  s.id = CSS_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const MATH_ACTS = [
  {
    id:'tens2', type:'tens2',
    badge:'🔢 Matemáticas · Decenas hasta 50',
    title:'¡Paquetes de 10 y sueltos!', sub:'Tens and ones!',
    guide:{ concept:'<strong>Valor posicional hasta 50.</strong> Mirá los paquetes y decí el número, o al revés: dado el número, elegí el dibujo.', tip:'Para el camino inverso: "En el 34, el 3 dice cuántos paquetes de 10 y el 4 cuántos sueltos." Señalá cada cifra con el dedo.' },
    questions:[
      { mode:'read',  tens:2, ones:7, opts:[72,27,26], ans:27 },
      { mode:'read',  tens:4, ones:2, opts:[42,24,41], ans:42 },
      { mode:'build', num:34, opts:[{t:4,o:3},{t:3,o:4},{t:3,o:3}], ans:1 },
      { mode:'build', num:45, opts:[{t:4,o:5},{t:5,o:4},{t:4,o:4}], ans:0 },
    ]
  },
  {
    id:'mixed', type:'mixed',
    badge:'➕➖ Matemáticas · Suma y Resta hasta 20',
    title:'¿Llegan o se van?', sub:'Arriving or leaving?',
    guide:{ concept:'<strong>Suma y resta mezcladas.</strong> Elena tiene que mirar primero si los animales LLEGAN (+) o SE VAN (−).', tip:'Antes de contar, preguntá: "¿Llegan o se van? ¿Va a haber más o menos?"' },
    questions:[
      { animal:'🐄', start:9,  op:'+', n:4, opts:[5,12,13], ans:13 },
      { animal:'🐷', start:15, op:'-', n:6, opts:[9,10,21], ans:9  },
      { animal:'🐑', start:11, op:'+', n:7, opts:[4,17,18], ans:18 },
      { animal:'🐔', start:18, op:'-', n:9, opts:[8,9,10],  ans:9  },
    ]
  },
  {
    id:'clock1h', type:'clock1h',
    badge:'⏰ Matemáticas · ¿Qué hora será?',
    title:'¿Qué hora será en 1 hora?', sub:'What time will it be in 1 hour?',
    guide:{ concept:'<strong>Leer la hora y avanzar 1 hora.</strong> Repasamos leer horas en punto y media, y ahora también sumamos 1 hora.', tip:'"La aguja larga no cambia. Solo la aguja corta avanza un número."' },
    questions:[
      { h:3,  m:30, mode:'now',   opts:['3:30','4:30','3:00'],   ans:0 },
      { h:10, m:0,  mode:'now',   opts:['10:00','10:30','2:00'], ans:0 },
      { h:5,  m:0,  mode:'plus1', opts:['5:00','6:00','7:00'],   ans:1 },
      { h:7,  m:30, mode:'plus1', opts:['7:30','8:00','8:30'],   ans:2 },
    ]
  },
  {
    id:'basket', type:'basket',
    badge:'🧺 Finanzas · Dos Compras',
    title:'¡Molly compra dos cosas!', sub:'How much in total?',
    guide:{ concept:'<strong>Sumar precios.</strong> La canasta tiene DOS cosas y hay que sumar los precios para saber cuánto se paga.', tip:'"La zanahoria cuesta 3 y la manzana cuesta 4. Juntamos las monedas y las contamos."' },
    questions:[
      { items:[{n:'🥕 Zanahoria',p:3},{n:'🍎 Manzana',p:4}], opts:[6,7,8], ans:7 },
      { items:[{n:'🥚 Huevo',p:2},{n:'🥛 Leche',p:5}],      opts:[7,8,3], ans:7 },
      { items:[{n:'🌽 Choclo',p:4},{n:'🍐 Pera',p:4}],      opts:[8,9,4], ans:8 },
      { items:[{n:'🍦 Helado',p:6},{n:'🍪 Galleta',p:3}], have:8, mode:'enough', opts:['yes','no'], ans:'no' },
    ]
  },
  {
    id:'days', type:'days',
    badge:'📅 Finanzas · ¿En cuántos días?',
    title:'¡Molly ahorra todos los días lo mismo!', sub:'How many days to reach the goal?',
    guide:{ concept:'<strong>Ahorro constante.</strong> Molly guarda la misma cantidad cada día. ¿Cuántos días tarda?', tip:'"Cada cajita punteada es un día. Contá los grupos."' },
    questions:[
      { per:2, goal:6,  prize:'🧸 Osito',   opts:[2,3,4], ans:3 },
      { per:2, goal:8,  prize:'⚽ Pelota',   opts:[3,4,5], ans:4 },
      { per:5, goal:10, prize:'🪁 Barrilete', opts:[1,2,3], ans:2 },
      { per:3, goal:9,  prize:'🚲 Bici',      opts:[2,3,4], ans:3 },
    ]
  },
  {
    id:'missletter', type:'missletter',
    badge:'🔤 Lectura · La Letra que Falta',
    title:'¡Falta una letra!', sub:'Which letter completes the word?',
    guide:{ concept:'<strong>Completar palabras.</strong> Primera letra y letra del medio (una vocal).', tip:'"Decí la palabra despacito estirando cada sonido." Las vocales del medio son más difíciles.' },
    questions:[
      { emoji:'🐄', word:'COW', gap:0, opts:['K','C','S'], ans:1 },
      { emoji:'🐷', word:'PIG', gap:0, opts:['P','B','D'], ans:0 },
      { emoji:'🐶', word:'DOG', gap:1, opts:['A','I','O'], ans:2 },
      { emoji:'🐱', word:'CAT', gap:1, opts:['A','E','U'], ans:0 },
      { emoji:'🐔', word:'HEN', gap:1, opts:['O','E','A'], ans:1 },
    ]
  },
  {
    id:'params2', type:'params2',
    badge:'⚙️ Programación · Funciones con 2 datos',
    title:'¡La función recibe QUÉ y CUÁNTOS!', sub:'First = what · Second = how many',
    guide:{ concept:'<strong>Funciones con dos parámetros.</strong> DAR(🥕, 3) da 3 zanahorias; DAR(🌽, 2) da 2 choclos.', tip:'Usá colores: "El dato amarillo dice QUÉ, el celeste dice CUÁNTOS."' },
    questions:[
      { func:{name:'🍽️ DAR',p1:'qué',p2:'cuántos',steps:[{emoji:'🐴',text:'Darle al caballo <span class="m-param p2">cuántos</span> de <span class="m-param">qué</span>'}]}, call:['DAR','🥕',3], ask:'¿Qué le da Molly al caballo?', opts:[{emoji:'🥕🥕🥕',label:'🥕 × 3'},{emoji:'🌽🌽🌽',label:'🌽 × 3'},{emoji:'🥕🥕',label:'🥕 × 2'}], ans:0 },
      { func:{name:'🌱 PLANTAR',p1:'qué',p2:'cuántos',steps:[{emoji:'🕳️',text:'Plantar <span class="m-param p2">cuántos</span> de <span class="m-param">qué</span>'}]}, call:['PLANTAR','🌷',4], ask:'¿Qué plantó Molly?', opts:[{emoji:'🌻🌻🌻🌻',label:'🌻 × 4'},{emoji:'🌷🌷🌷',label:'🌷 × 3'},{emoji:'🌷🌷🌷🌷',label:'🌷 × 4'}], ans:2 },
      { func:{name:'🧺 JUNTAR',p1:'qué',p2:'cuántos',steps:[{emoji:'🧺',text:'Juntar <span class="m-param p2">cuántos</span> de <span class="m-param">qué</span>'}]}, call:['JUNTAR','🍎',2], ask:'¿Qué hay en la canasta?', opts:[{emoji:'🍎🍎',label:'🍎 × 2'},{emoji:'🥚🥚',label:'🥚 × 2'},{emoji:'🍎🍎🍎🍎',label:'🍎 × 4'}], ans:0 },
      { func:{name:'🍽️ DAR',p1:'qué',p2:'cuántos',steps:[{emoji:'🐔',text:'Darle a la gallina <span class="m-param p2">cuántos</span> de <span class="m-param">qué</span>'}]}, call:null, picture:'🐔 🌽🌽🌽🌽🌽', ask:'La gallina recibió esto. ¿Qué función llamó Molly?', opts:[{emoji:'🍽️',label:'DAR(🥕, 5)'},{emoji:'🍽️',label:'DAR(🌽, 5)'},{emoji:'🍽️',label:'DAR(🌽, 4)'}], ans:1 },
    ]
  },
  {
    id:'swap', type:'swap',
    badge:'🔄 Programación · Pasos Cambiados',
    title:'¡Dos pasos están cambiados de lugar!', sub:'Tap the 2 steps to swap',
    guide:{ concept:'<strong>Depuración de orden.</strong> Todos los pasos están, pero DOS están en el lugar equivocado.', tip:'"Leamos en orden. ¿En qué paso te da risa porque no se puede hacer todavía?"' },
    questions:[
      { prompt:'🧃 Hacer un jugo / Make juice:', steps:[{emoji:'🍎',text:'Tomar la fruta'},{emoji:'🥤',text:'Servir en el vaso'},{emoji:'🌀',text:'Licuar'},{emoji:'😋',text:'¡Tomar el jugo!'}], swap:[1,2] },
      { prompt:'👟 Ponerse las zapatillas:', steps:[{emoji:'👟',text:'Ponerse las zapatillas'},{emoji:'🧦',text:'Ponerse las medias'},{emoji:'🎀',text:'Atar los cordones'},{emoji:'🏃',text:'¡Salir a jugar!'}], swap:[0,1] },
      { prompt:'🌱 Plantar una semilla:', steps:[{emoji:'🕳️',text:'Hacer un pocito'},{emoji:'🌰',text:'Poner la semilla'},{emoji:'💧',text:'Regar'},{emoji:'🤎',text:'Tapar con tierra'}], swap:[2,3] },
      { prompt:'🥛 Ordeñar a Molly:', steps:[{emoji:'🪣',text:'Tomar el balde'},{emoji:'🏠',text:'Llevar la leche a casa'},{emoji:'🥛',text:'Ordeñar'},{emoji:'🪑',text:'Sentarse junto a Molly'}], swap:[1,3] },
    ]
  }
];

// ─── MAIN RENDER ─────────────────────────────────────────────────────────────
export function render(root) {
  injectCSS();

  // remove stale confetti canvas
  document.getElementById('m-confetti')?.remove();

  root.innerHTML = `
<div id="math-root">
  <div class="m-hdr">
    <h2>🐄 Molly's Math &amp; Code Farm — 🌻 Nivel 8</h2>
    <div class="m-stars">
      <span class="m-star" id="m-s1">⭐</span><span class="m-star" id="m-s2">⭐</span>
      <span class="m-star" id="m-s3">⭐</span><span class="m-star" id="m-s4">⭐</span>
      <span class="m-star" id="m-s5">⭐</span><span class="m-star" id="m-s6">⭐</span>
      <span class="m-star" id="m-s7">⭐</span><span class="m-star" id="m-s8">⭐</span>
      <span id="m-score" class="m-score">0 / 0</span>
    </div>
  </div>

  <div id="m-welcome" class="m-scr active">
    <div class="m-card m-welcome-card">
      <div class="m-welcome-title">🐄 ¡Nivel 8, Elena! 🌻</div>
      <div class="m-lvl-pill">🌻 NIVEL 8 / LEVEL 8 🌻</div>
      <div style="font-size:.91em;color:#5D4037;margin-bottom:6px">¡La granja está en plena cosecha! / Harvest time on the farm!</div>
      <span style="font-size:2.8em;display:block;margin:6px 0">🐄🌻🐷🌻🐑🌻🐔🌻🐴</span>
      <div class="m-act-list">
        <div class="m-act-item" style="background:#E0F2F1">🔢 Decenas hasta 50</div>
        <div class="m-act-item" style="background:#E8F5E9">➕➖ ¿Llegan o se van?</div>
        <div class="m-act-item" style="background:#E8EAF6">⏰ ¿Qué hora será?</div>
        <div class="m-act-item" style="background:#FBE9E7">🧺 Dos compras</div>
        <div class="m-act-item" style="background:#FCE4EC">📅 ¿En cuántos días?</div>
        <div class="m-act-item" style="background:#E3F2FD">🔤 La letra que falta</div>
        <div class="m-act-item" style="background:#F3E5F5">⚙️ Funciones con 2 datos</div>
        <div class="m-act-item" style="background:#FFF3E0">🔄 Pasos cambiados</div>
      </div>
      <button class="m-start-btn" id="m-start-btn">¡Empezar Nivel 8! 🚀🌻</button>
    </div>
  </div>

  <div id="m-game" class="m-scr">
    <div id="m-act-container"></div>
    <div id="m-feedback" class="m-feedback"></div>
    <div class="m-nav-row">
      <button class="m-nav-btn m-btn-prev" id="m-btn-prev">◀ Atrás</button>
      <button class="m-nav-btn m-btn-next" id="m-btn-next" disabled>Siguiente ▶</button>
    </div>
  </div>

  <div id="m-final" class="m-scr">
    <div class="m-card m-final-card">
      <div class="m-final-big">🏆🌻🏆</div>
      <div class="m-final-title">¡NIVEL 8 COMPLETADO! 🌻</div>
      <div class="m-lvl-pill">🌻 LEVEL 8 COMPLETE 🌻</div>
      <div class="m-medals" id="m-medals"></div>
      <div class="m-final-sub" id="m-final-msg"></div>
      <span style="font-size:2.6em;display:block;margin:10px 0">🐄🌻🐷🌻🐑🌻🐔🌻🐴🌻🐰</span>
      <div class="m-final-sub">¡Molly está súper orgullosa de vos! 🐄🌻<br><em>Molly is so proud of you!</em></div>
      <div class="m-nav-row">
        <button class="m-nav-btn m-btn-restart" id="m-btn-restart">🔄 Jugar de nuevo</button>
      </div>
    </div>
  </div>
</div>`;

  // ── STATE ─────────────────────────────────────────────────────────────────
  let curAct = 0, curQ = 0, score = 0, total = 0, answered = false;
  let swapSel = [];

  // ── HELPERS ───────────────────────────────────────────────────────────────
  function totalQ() { return MATH_ACTS.reduce((s, a) => s + a.questions.length, 0); }

  function updateStars() {
    const lit = Math.round(score / totalQ() * 8);
    for (let i = 1; i <= 8; i++)
      document.getElementById('m-s' + i).classList.toggle('lit', i <= lit);
    document.getElementById('m-score').textContent = score + ' / ' + total;
  }

  function showScreen(id) {
    ['m-welcome','m-game','m-final'].forEach(s =>
      document.getElementById(s).classList.toggle('active', s === id)
    );
    root.scrollTop = 0; window.scrollTo(0, 0);
  }

  function clearFeedback() {
    const f = document.getElementById('m-feedback');
    f.style.display = 'none'; f.className = 'm-feedback';
  }

  function showFeedback(ok, msg) {
    const f = document.getElementById('m-feedback');
    f.textContent = (ok ? '✅ ' : '❌ ') + msg;
    f.className = 'm-feedback ' + (ok ? 'correct' : 'wrong');
    f.style.display = 'block';
    if (ok) score++;
    total++; answered = true; updateStars();
    document.getElementById('m-btn-next').disabled = false;
  }

  function markBtns(sel, btn, ok, ansIdx) {
    const all = document.querySelectorAll(sel);
    all.forEach(b => b.disabled = true);
    btn.classList.add(ok ? 'correct' : 'wrong');
    if (!ok && all[ansIdx]) all[ansIdx].classList.add('correct');
  }

  // ── NAVIGATION ────────────────────────────────────────────────────────────
  function startGame() {
    curAct = 0; curQ = 0; score = 0; total = 0; answered = false;
    updateStars(); showScreen('m-game'); renderActivity();
  }

  function prevActivity() {
    if (curAct > 0) { curAct--; curQ = 0; answered = false; clearFeedback(); renderActivity(); }
    else showScreen('m-welcome');
  }

  function nextQuestion() {
    if (!answered) return;
    curQ++; answered = false; clearFeedback();
    document.getElementById('m-btn-next').disabled = true;
    const act = MATH_ACTS[curAct];
    if (curQ >= act.questions.length) {
      curAct++; curQ = 0;
      if (curAct >= MATH_ACTS.length) { showFinal(); return; }
    }
    renderActivity();
  }

  function restartGame() { showScreen('m-welcome'); }

  function showFinal() {
    showScreen('m-final');
    document.getElementById('m-medals').textContent = '⭐'.repeat(Math.max(1, Math.round(score / totalQ() * 8)));
    document.getElementById('m-final-msg').textContent = score >= total * .8
      ? '¡Excelente! / Excellent! 🌟 ' + score + '/' + total + ' correctas'
      : '¡Muy bien! / Great job! 🌈 ' + score + '/' + total + ' correctas';
    launchConfetti();
  }

  // ── GUIDE ────────────────────────────────────────────────────────────────
  function renderGuide(g) {
    if (!g) return '';
    return `<button class="m-guide-btn" id="m-guide-btn">👨‍👩‍👧 Para papá y mamá ▼</button>
<div class="m-guide-box" id="m-guide-box"><div>${g.concept}</div><div class="m-tip">💡 ${g.tip}</div></div>`;
  }

  function toggleGuide() {
    const box = document.getElementById('m-guide-box');
    const btn = document.getElementById('m-guide-btn');
    const open = box.classList.toggle('open');
    btn.textContent = '👨‍👩‍👧 Para papá y mamá ' + (open ? '▲' : '▼');
  }

  // ── RENDER ACTIVITY ──────────────────────────────────────────────────────
  function renderActivity() {
    const act = MATH_ACTS[curAct], q = act.questions[curQ];
    swapSel = [];
    const pct = ((curQ / act.questions.length) * 100).toFixed(0);
    let html = `<div class="m-card act-${act.id}">
<span class="m-lvl-badge">🌻 Nivel 8</span>
<span class="m-act-badge">${act.badge}</span>
<div class="m-progress"><div class="m-progress-fill" style="width:${pct}%"></div></div>
${renderGuide(act.guide)}
<div class="m-qtxt"><div class="es">${act.title}</div><div class="en">${act.sub}</div></div>`;

    switch (act.type) {
      case 'tens2':      html += renderTens2(q);      break;
      case 'mixed':      html += renderMixed(q);      break;
      case 'clock1h':    html += renderClock1h(q);    break;
      case 'basket':     html += renderBasket(q);     break;
      case 'days':       html += renderDays(q);       break;
      case 'missletter': html += renderMissLetter(q); break;
      case 'params2':    html += renderParams2(q);    break;
      case 'swap':       html += renderSwap(q);       break;
    }
    html += '</div>';
    document.getElementById('m-act-container').innerHTML = html;

    document.getElementById('m-guide-btn')?.addEventListener('click', toggleGuide);
  }

  // ── NUMERIC OPTIONS ──────────────────────────────────────────────────────
  function numOpts(opts, ans, prefix) {
    return '<div class="m-opts">' + opts.map((o, i) =>
      `<button class="m-opt" data-action="pickVal" data-idx="${i}" data-val="${o}" data-ans="${ans}">${(prefix||'')+o}</button>`
    ).join('') + '</div>';
  }

  // ── 1. TENS2 ─────────────────────────────────────────────────────────────
  function tenBars(t) {
    let b = '';
    for (let i = 0; i < t; i++) b += '<span class="m-ten-bar">' + Array(10).fill('🔵').join('<br>') + '</span>';
    return b;
  }

  function renderTens2(q) {
    if (q.mode === 'read') {
      return `<div class="m-tens-box">
<div class="m-tens-grp"><div>${tenBars(q.tens)}</div><div class="m-tens-lbl">${q.tens} × 10</div></div>
<div class="m-tens-grp"><div class="m-ones">${Array(q.ones).fill('🟡').join('')}</div><div class="m-tens-lbl">${q.ones} sueltos / ones</div></div>
</div>
<div class="m-tens-hint">Cada columna 🔵 = 10 &nbsp;·&nbsp; 🟡 = 1</div>
<div class="m-ask">¿Qué número es? / What number is it?</div>`
        + numOpts(q.opts, q.ans);
    }
    const opts = q.opts.map((o, i) =>
      `<button class="m-rep-btn m-pick" data-action="pickRep" data-idx="${i}" data-ans="${q.ans}">
<div class="m-rep-tens">${Array(o.t).fill('🔟').join('')}</div>
<div class="m-rep-ones">${Array(o.o).fill('🟡').join('')}</div>
<div class="m-rep-cap">${o.t} paquetes · ${o.o} sueltos</div></button>`
    ).join('');
    return `<div class="m-ask">¿Qué dibujo forma este número? / Which picture makes this number?</div>
<div class="m-big-num">${q.num}</div>
<div class="m-tens-hint">🔟 = paquete de 10 / pack of 10 &nbsp;·&nbsp; 🟡 = 1</div>
<div class="m-opts">${opts}</div>`;
  }

  // ── 2. MIXED ─────────────────────────────────────────────────────────────
  function renderMixed(q) {
    let html = '<div class="m-mx-wrap">';
    if (q.op === '+') {
      html += `<div class="m-mx-grp"><div class="m-mx-lbl">Están / Here: ${q.start}</div><div class="m-mx-animals">${Array(q.start).fill(q.animal).join('')}</div></div>
<div class="m-mx-sign plus">+</div>
<div class="m-mx-grp arriving"><div class="m-mx-lbl">✨ Llegan / Arriving: ${q.n}</div><div class="m-mx-animals">${Array(q.n).fill(q.animal).join('')}</div></div>`;
    } else {
      let a = '';
      for (let i = 0; i < q.start; i++) a += `<span class="m-animal${i < q.n ? ' gone' : ''}">${q.animal}</span>`;
      html += `<div class="m-mx-grp leaving"><div class="m-mx-lbl">Había ${q.start} <span class="m-mx-sign minus" style="font-size:1.1em">−</span> 👋 Se van: ${q.n}</div><div class="m-mx-animals">${a}</div></div>`;
    }
    html += '</div><div class="m-ask">¿Cuántos hay ahora? / How many now?</div>';
    return html + numOpts(q.opts, q.ans);
  }

  // ── 3. CLOCK ─────────────────────────────────────────────────────────────
  function clockSVG(h, m) {
    const cx = 110, cy = 110, r = 90;
    const hourPos = h + (m === 30 ? 0.5 : 0);
    const ha = (hourPos * 30 - 90) * Math.PI / 180;
    const hx = (cx + 52 * Math.cos(ha)).toFixed(1), hy = (cy + 52 * Math.sin(ha)).toFixed(1);
    const ma = (m * 6 - 90) * Math.PI / 180;
    const mx = (cx + 76 * Math.cos(ma)).toFixed(1), my = (cy + 76 * Math.sin(ma)).toFixed(1);
    let nums = '', ticks = '';
    for (let n = 1; n <= 12; n++) {
      const a = (n * 30 - 90) * Math.PI / 180;
      nums += `<text x="${(cx+70*Math.cos(a)).toFixed(1)}" y="${(cy+70*Math.sin(a)).toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="15" font-weight="bold" fill="#555" font-family="Arial">${n}</text>`;
    }
    for (let t = 0; t < 60; t++) {
      const ta = (t * 6 - 90) * Math.PI / 180, inner = t % 5 === 0 ? r - 13 : r - 6;
      ticks += `<line x1="${(cx+r*Math.cos(ta)).toFixed(1)}" y1="${(cy+r*Math.sin(ta)).toFixed(1)}" x2="${(cx+inner*Math.cos(ta)).toFixed(1)}" y2="${(cy+inner*Math.sin(ta)).toFixed(1)}" stroke="#DDD" stroke-width="${t%5===0?2:1}"/>`;
    }
    return `<svg width="220" height="220" viewBox="0 0 220 220" style="display:block;margin:8px auto">
<circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#BCAAA4" stroke-width="5"/>
${ticks}${nums}
<line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="#555" stroke-width="3" stroke-linecap="round"/>
<line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#283593" stroke-width="7" stroke-linecap="round"/>
<circle cx="${cx}" cy="${cy}" r="6" fill="#333"/>
</svg>`;
  }

  function renderClock1h(q) {
    const ask = q.mode === 'plus1'
      ? '<div class="m-plus1">⏩ + 1 hora / + 1 hour</div><div class="m-ask">¿Qué hora será? / What time will it be?</div>'
      : '<div class="m-ask">¿Qué hora es ahora? / What time is it now?</div>';
    const opts = q.opts.map((o, i) =>
      `<button class="m-opt" data-action="pickClock" data-idx="${i}" data-ans="${q.ans}">${o}</button>`
    ).join('');
    return `<div class="m-clock-wrap">${clockSVG(q.h, q.m)}</div>
<div style="font-size:.83em;color:#888;margin:3px 0">Aguja larga gris = minutos · Aguja corta azul = hora</div>
${ask}<div class="m-opts">${opts}</div>`;
  }

  // ── 4. BASKET ────────────────────────────────────────────────────────────
  function renderBasket(q) {
    const box = it =>
      `<div class="m-basket-item"><div class="m-basket-name">${it.n}</div>
<div class="m-basket-coins">${Array(it.p).fill('🪙').join('')}</div>
<div class="m-basket-price">${it.p} 🪙</div></div>`;
    const row = `<div class="m-basket-row">${box(q.items[0])}<div class="m-basket-plus">+</div>${box(q.items[1])}</div>`;
    if (q.mode === 'enough') {
      return row
        + `<div class="m-ask">🐄 Molly tiene / has: <strong>${Array(q.have).fill('🪙').join('')} (${q.have})</strong></div>
<div class="m-ask">¿Le alcanza para las DOS cosas? / Enough for BOTH?</div>
<div class="m-opts">
<button class="m-opt" style="font-size:1em" data-action="pickEnough" data-val="yes">✅ Sí alcanza<br><small>Yes</small></button>
<button class="m-opt" style="font-size:1em" data-action="pickEnough" data-val="no">❌ No alcanza<br><small>No</small></button>
</div>`;
    }
    return row + '<div class="m-ask">¿Cuánto paga en total? / How much in total?</div>' + numOpts(q.opts, q.ans, '🪙×');
  }

  // ── 5. DAYS ──────────────────────────────────────────────────────────────
  function renderDays(q) {
    let groups = '';
    for (let d = 0; d < q.goal / q.per; d++)
      groups += '<span class="m-day-grp">' + Array(q.per).fill('⚪').join('') + '</span>';
    return `<div class="m-days-box">
<div class="m-days-title">🐷 Meta / Goal: ${q.prize} = ${q.goal} 🪙</div>
<div class="m-days-rule">Cada día guarda / Every day she saves: <strong>${Array(q.per).fill('🪙').join('')} (${q.per})</strong></div>
<div class="m-days-slots">${groups}</div>
<div class="m-days-legend">Cada cajita punteada = 1 día / Each dotted box = 1 day</div>
</div>
<div class="m-ask">¿En cuántos días llega? / How many days?</div>`
      + numOpts(q.opts, q.ans, '📅 ');
  }

  // ── 6. MISS LETTER ───────────────────────────────────────────────────────
  function renderMissLetter(q) {
    const cells = q.word.split('').map((ch, i) =>
      i === q.gap ? '<div class="m-ml-cell gap">?</div>' : `<div class="m-ml-cell">${ch}</div>`
    ).join('');
    const opts = q.opts.map((l, i) =>
      `<button class="m-letter-btn m-pick" data-action="pickMiss" data-idx="${i}" data-ans="${q.ans}">${l}</button>`
    ).join('');
    return `<span class="m-ml-emoji">${q.emoji}</span>
<div class="m-ml-word">${cells}</div>
<div class="m-ask">¿Qué letra falta? / Which letter is missing?</div>
<div class="m-opts">${opts}</div>`;
  }

  // ── 7. PARAMS2 ───────────────────────────────────────────────────────────
  function renderParams2(q) {
    const f = q.func;
    const steps = f.steps.map(s =>
      `<div class="m-func-step-row"><span class="m-func-step-emoji">${s.emoji}</span><span class="m-func-step-text">${s.text}</span></div>`
    ).join('');
    let html = `<div class="m-func-block">
<div class="m-func-title">⚙️ ${f.name}(<span class="m-param">${f.p1}</span>, <span class="m-param p2">${f.p2}</span>)</div>${steps}</div>`;
    if (q.call) {
      html += `<div>Molly llama / Molly calls:</div>
<div class="m-call-line">${q.call[0]}(<span class="m-param">${q.call[1]}</span>, <span class="m-param p2">${q.call[2]}</span>)</div>`;
    } else {
      html += `<div class="m-result-pic">${q.picture}</div>`;
    }
    const opts = q.opts.map((o, i) =>
      `<button class="m-func-opt m-pick" data-action="pickParam2" data-idx="${i}" data-ans="${q.ans}">
<span class="m-fo-emoji">${o.emoji}</span><span class="m-fo-label">${o.label}</span></button>`
    ).join('');
    return html
      + `<div style="font-size:1.02em;color:#5D4037;margin:10px 0 5px"><strong>${q.ask}</strong></div>
<div class="m-func-opts">${opts}</div>`;
  }

  // ── 8. SWAP ──────────────────────────────────────────────────────────────
  function renderSwap(q) {
    const steps = q.steps.map((s, i) =>
      `<button class="m-sw-step m-pick" data-action="pickSwap" data-idx="${i}">
<span class="m-sw-num">${i+1}</span><span class="m-sw-emoji">${s.emoji}</span><span class="m-sw-text">${s.text}</span></button>`
    ).join('');
    return `<div style="font-size:1.02em;font-weight:bold;color:#555;margin-bottom:5px">${q.prompt}</div>
<div class="m-sw-steps" id="m-sw-steps">${steps}</div>
<div class="m-sw-hint" id="m-sw-hint">Elegí el primero… / Pick the first one…</div>`;
  }

  // ── EVENT DELEGATION ─────────────────────────────────────────────────────
  document.getElementById('m-act-container').addEventListener('click', e => {
    if (answered) return;
    const btn = e.target.closest('[data-action]');
    if (!btn || btn.disabled) return;
    const action = btn.dataset.action;
    const act = MATH_ACTS[curAct];
    const q = act.questions[curQ];

    if (action === 'pickVal') {
      const val = Number(btn.dataset.val), ans = Number(btn.dataset.ans);
      markBtns('.m-opt', btn, val === ans, q.opts.indexOf(ans));
      showFeedback(val === ans, val === ans ? '¡Correcto! ' + ans + ' 🌟' : 'Casi… la respuesta era ' + ans);

    } else if (action === 'pickRep') {
      const idx = Number(btn.dataset.idx), ans = Number(btn.dataset.ans);
      const ok = idx === ans, c = q.opts[ans];
      markBtns('.m-rep-btn', btn, ok, ans);
      const why = q.num + ' = ' + c.t + ' paquetes de 10 y ' + c.o + ' sueltos';
      showFeedback(ok, ok ? '¡Correcto! ' + why + ' 🌟' : 'Casi… ' + why);

    } else if (action === 'pickClock') {
      const idx = Number(btn.dataset.idx), ans = Number(btn.dataset.ans);
      const ok = idx === ans, c = q.opts[ans];
      markBtns('.m-opt', btn, ok, ans);
      const now = q.h + ':' + (q.m === 30 ? '30' : '00');
      const msg = q.mode === 'plus1' ? 'Ahora son las ' + now + ' → en 1 hora serán las ' + c : 'Son las ' + c;
      showFeedback(ok, ok ? '¡Correcto! ' + msg + ' 🌟' : 'Casi… ' + msg);

    } else if (action === 'pickEnough') {
      const ch = btn.dataset.val, ok = ch === q.ans;
      document.querySelectorAll('[data-action="pickEnough"]').forEach(b => b.disabled = true);
      btn.classList.add(ok ? 'correct' : 'wrong');
      const tot = q.items[0].p + q.items[1].p;
      const why = 'Las dos cuestan ' + q.items[0].p + ' + ' + q.items[1].p + ' = ' + tot + ' y Molly tiene ' + q.have;
      showFeedback(ok, ok ? '¡Correcto! ' + why + ' 🌟' : 'Casi… ' + why);

    } else if (action === 'pickMiss') {
      const idx = Number(btn.dataset.idx), ans = Number(btn.dataset.ans);
      const ok = idx === ans;
      markBtns('.m-letter-btn', btn, ok, ans);
      const cell = document.querySelector('.m-ml-cell.gap');
      if (cell) { cell.textContent = q.opts[ans]; cell.style.color = '#2E7D32'; }
      showFeedback(ok, ok ? '¡Correcto! ' + q.emoji + ' ' + q.word + ' 🌟' : 'Casi… es ' + q.emoji + ' ' + q.word);

    } else if (action === 'pickParam2') {
      const idx = Number(btn.dataset.idx), ans = Number(btn.dataset.ans);
      const ok = idx === ans, c = q.opts[ans];
      markBtns('.m-func-opt', btn, ok, ans);
      const why = q.call ? q.call[0] + '(' + q.call[1] + ', ' + q.call[2] + ') → ' + c.emoji : c.label + ' → ' + q.picture;
      showFeedback(ok, ok ? '¡Correcto! ' + why + ' 🌟' : 'Casi… ' + why);

    } else if (action === 'pickSwap') {
      const i = Number(btn.dataset.idx);
      if (swapSel.includes(i)) {
        swapSel = swapSel.filter(x => x !== i);
        btn.classList.remove('selected');
        document.getElementById('m-sw-hint').textContent = 'Elegí el primero… / Pick the first one…';
        return;
      }
      swapSel.push(i); btn.classList.add('selected');
      if (swapSel.length < 2) {
        document.getElementById('m-sw-hint').textContent = '¿Con cuál se cambia? / Swap with which one?';
        return;
      }
      const [a, b] = q.swap;
      const ok = swapSel.includes(a) && swapSel.includes(b);
      document.querySelectorAll('.m-sw-step').forEach(x => { x.disabled = true; x.classList.remove('selected'); });
      const fixed = q.steps.slice(); const tmp = fixed[a]; fixed[a] = fixed[b]; fixed[b] = tmp;
      document.getElementById('m-sw-steps').innerHTML = fixed.map((s, k) => {
        const moved = k === a || k === b;
        return `<div class="m-sw-step${moved ? ' m-pick correct' : ''}"><span class="m-sw-num">${k+1}</span><span class="m-sw-emoji">${s.emoji}</span><span class="m-sw-text">${s.text}</span></div>`;
      }).join('');
      document.getElementById('m-sw-hint').textContent = 'Así queda en orden / This is the right order';
      showFeedback(ok, ok ? '¡Correcto! Los cambiamos y ahora funciona 🐛🌟' : 'Casi… los cambiados eran el ' + (a+1) + ' y el ' + (b+1));
    }
  });

  document.getElementById('m-start-btn').addEventListener('click', startGame);
  document.getElementById('m-btn-next').addEventListener('click', nextQuestion);
  document.getElementById('m-btn-prev').addEventListener('click', prevActivity);
  document.getElementById('m-btn-restart').addEventListener('click', restartGame);

  updateStars();
}

// ── CONFETTI ─────────────────────────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'm-confetti';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const pieces = Array.from({length:120}, () => ({
    x: Math.random() * canvas.width, y: -20,
    r: Math.random() * 10 + 4,
    color: 'hsl(' + Math.floor(Math.random() * 360) + ',90%,60%)',
    vx: (Math.random() - .5) * 6, vy: Math.random() * 4 + 2, alpha: 1
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.globalAlpha = Math.max(p.alpha, 0); ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      p.x += p.vx; p.y += p.vy; p.alpha -= 0.008;
    });
    if (pieces.some(p => p.alpha > 0)) requestAnimationFrame(draw);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.remove(); }
  }
  draw();
}
