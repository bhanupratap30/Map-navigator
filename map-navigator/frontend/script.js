// LPU Campus Navigator - script.js
// This file handles: map drawing, dropdown menus, calling the C++ backend

const API = 'http://localhost:8080';

// ── NODE DATA (positions for map drawing) ──────────────────────
// id, num (label), name, short (map label), x/y (SVG position), zone
const NODES = [
  {id:0,  num:'MG', name:'Main Gate (NH-1)',    short:'GATE',  x:490,y:790, z:'z-f'},
  {id:1,  num:'01', name:'LIM',                 short:'LIM',   x:490,y:730, z:'z-a'},
  {id:2,  num:'02', name:'Campus Cafe',          short:'CAFE',  x:390,y:720, z:'z-f'},
  {id:3,  num:'03', name:'Auditorium S',         short:'AUD-S', x:300,y:700, z:'z-f'},
  {id:4,  num:'04', name:'LIT Engineering',      short:'LIT-E', x:210,y:680, z:'z-a'},
  {id:5,  num:'05', name:'LIT Pharmacy',         short:'LIT-P', x:140,y:660, z:'z-a'},
  {id:6,  num:'06', name:'LIT Architecture',     short:'LIT-A', x:140,y:730, z:'z-a'},
  {id:7,  num:'07', name:'LIT Pharmacy 2',       short:'LIT-P2',x:240,y:755, z:'z-a'},
  {id:8,  num:'08', name:'BR Mittal Hospital',   short:'HOSP',  x:310,y:640, z:'z-m'},
  {id:9,  num:'09', name:'Girls Hostel 1',       short:'GH-1',  x:400,y:630, z:'z-g'},
  {id:10, num:'10', name:'Girls Hostel 2',       short:'GH-2',  x:470,y:615, z:'z-g'},
  {id:11, num:'11', name:'Girls Hostel 3',       short:'GH-3',  x:540,y:625, z:'z-g'},
  {id:12, num:'12', name:'Girls Hostel 4',       short:'GH-4',  x:545,y:695, z:'z-g'},
  {id:13, num:'13', name:'LIT Polytechnic',      short:'POLY',  x:430,y:690, z:'z-a'},
  {id:14, num:'14', name:'Business Block',       short:'BIZ',   x:155,y:590, z:'z-a'},
  {id:15, num:'15', name:'Lovely Mall',          short:'MALL',  x:220,y:570, z:'z-f'},
  {id:16, num:'16', name:'Hotel Management',     short:'HM',    x:300,y:560, z:'z-a'},
  {id:17, num:'17', name:'Law Block',            short:'LAW',   x:185,y:510, z:'z-a'},
  {id:18, num:'18', name:'Education Block',      short:'EDU',   x:340,y:520, z:'z-a'},
  {id:19, num:'19', name:'Auditorium Mid',       short:'AUD-M', x:490,y:545, z:'z-f'},
  {id:20, num:'20', name:'LSB',                  short:'LSB',   x:570,y:520, z:'z-a'},
  {id:21, num:'21', name:'Girls Hostel 5',       short:'GH-5',  x:680,y:440, z:'z-g'},
  {id:22, num:'22', name:'Girls Hostel 6',       short:'GH-6',  x:745,y:500, z:'z-g'},
  {id:23, num:'23', name:'Block 23',             short:'B-23',  x:490,y:460, z:'z-a'},
  {id:24, num:'24', name:'Block 24',             short:'B-24',  x:560,y:455, z:'z-a'},
  {id:25, num:'25', name:'Engineering 25',       short:'E-25',  x:635,y:390, z:'z-a'},
  {id:26, num:'26', name:'Engineering 26',       short:'E-26',  x:565,y:380, z:'z-a'},
  {id:27, num:'27', name:'Engineering 27',       short:'E-27',  x:500,y:378, z:'z-a'},
  {id:28, num:'28', name:'Engineering 28',       short:'E-28',  x:435,y:378, z:'z-a'},
  {id:29, num:'29', name:'Engineering 29',       short:'E-29',  x:435,y:445, z:'z-a'},
  {id:30, num:'30', name:'Chancellor Office',    short:'CHANC', x:365,y:435, z:'z-d'},
  {id:31, num:'31', name:'Admin Block 31',       short:'ADM31', x:300,y:420, z:'z-d'},
  {id:32, num:'32', name:'Admin Block 32',       short:'ADM32', x:235,y:415, z:'z-d'},
  {id:33, num:'33', name:'Engineering 33',       short:'E-33',  x:195,y:375, z:'z-a'},
  {id:34, num:'34', name:'Engineering 34',       short:'E-34',  x:195,y:320, z:'z-a'},
  {id:35, num:'35', name:'Engineering 35',       short:'E-35',  x:278,y:335, z:'z-a'},
  {id:36, num:'36', name:'Engineering 36',       short:'E-36',  x:340,y:308, z:'z-a'},
  {id:37, num:'37', name:'Engineering 37',       short:'E-37',  x:408,y:308, z:'z-a'},
  {id:38, num:'38', name:'Engineering 38',       short:'E-38',  x:470,y:318, z:'z-a'},
  {id:39, num:'39', name:'Girls Hostel 7',       short:'GH-7',  x:400,y:250, z:'z-g'},
  {id:40, num:'40', name:'Sports Complex',       short:'SPORT', x:330,y:218, z:'z-f'},
  {id:41, num:'41', name:'Apartment 41',         short:'APT-1', x:600,y:290, z:'z-b'},
  {id:42, num:'42', name:'Staff Residence 42',   short:'STAF',  x:540,y:258, z:'z-b'},
  {id:43, num:'43', name:'Boys Hostel 1',        short:'BH-1',  x:635,y:218, z:'z-b'},
  {id:44, num:'44', name:'Boys Hostel 2',        short:'BH-2',  x:698,y:218, z:'z-b'},
  {id:45, num:'45', name:'Boys Hostel 3',        short:'BH-3',  x:758,y:218, z:'z-b'},
  {id:46, num:'46', name:'Boys Hostel 4',        short:'BH-4',  x:698,y:158, z:'z-b'},
  {id:47, num:'47', name:'Boys Hostel 5',        short:'BH-5',  x:210,y:158, z:'z-b'},
  {id:48, num:'48', name:'Boys Hostel 6',        short:'BH-6',  x:285,y:138, z:'z-b'},
  {id:49, num:'49', name:'Agriculture Block 1',  short:'AGR-1', x:390,y:118, z:'z-a'},
  {id:50, num:'50', name:'Agriculture Block 2',  short:'AGR-2', x:315,y:98,  z:'z-a'},
  {id:51, num:'51', name:'Polytechnic Block',    short:'POLY',  x:230,y:98,  z:'z-a'},
  {id:52, num:'52', name:'Boys Hostel 7',        short:'BH-7',  x:550,y:138, z:'z-b'},
];

// Roads (just pairs of node IDs, for drawing lines on the map)
const ROADS = [
  [0,1],[0,2],[0,7],[1,2],[1,13],[2,3],[2,7],[2,13],[3,4],[3,8],
  [4,5],[4,8],[5,6],[5,14],[6,7],[7,13],[8,9],[8,15],[8,16],[9,10],
  [9,13],[10,11],[10,13],[10,19],[11,12],[11,19],[11,20],[12,13],[13,16],
  [14,15],[14,17],[15,16],[15,17],[16,17],[16,18],[16,30],[17,31],[18,19],
  [18,29],[18,30],[19,20],[19,23],[19,29],[20,21],[20,22],[20,24],[21,22],
  [21,25],[22,25],[23,24],[23,29],[24,25],[24,26],[25,26],[25,41],[26,27],
  [26,41],[27,28],[27,30],[28,29],[28,30],[29,30],[30,31],[30,35],[30,36],
  [31,32],[31,34],[32,33],[32,34],[33,34],[34,35],[34,40],[35,36],[35,40],
  [36,37],[36,39],[37,38],[37,39],[37,41],[37,42],[38,39],[38,41],[38,42],
  [39,40],[39,42],[39,49],[40,48],[40,49],[40,50],[41,42],[41,43],[42,43],
  [42,49],[43,44],[43,46],[44,45],[44,46],[45,46],[46,49],[47,48],[47,51],
  [48,49],[48,50],[48,51],[49,50],[50,51],
  // New roads
  [40,44],        // Sports Complex → Boys Hostel 2
  [49,52],[52,46] // Boys Hostel 7 between Agriculture Block 1 and Boys Hostel 4
];

// ── PAN & ZOOM STATE ───────────────────────────────────────────
let scale = 1, px = 0, py = 0, dragging = false, drag0 = {}, pan0 = {};

// ── DRAW MAP ──────────────────────────────────────────────────
function drawMap() {
  const EL = document.getElementById('edges');
  const NL = document.getElementById('nodes');
  const svg = document.getElementById('map');

  // Draw roads
  ROADS.forEach(([a, b]) => {
    const na = NODES[a], nb = NODES[b];
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.id = `e${a}-${b}`;
    line.setAttribute('x1', na.x); line.setAttribute('y1', na.y);
    line.setAttribute('x2', nb.x); line.setAttribute('y2', nb.y);
    line.setAttribute('class', 'edge');
    EL.appendChild(line);
  });

  // Draw nodes (circles + labels)
  NODES.forEach(n => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.id = `n${n.id}`;
    c.setAttribute('cx', n.x); c.setAttribute('cy', n.y); c.setAttribute('r', 18);
    c.setAttribute('class', `node ${n.z}`);
    c.addEventListener('mouseenter', e => showTip(e, n));
    c.addEventListener('mouseleave', hideTip);
    c.addEventListener('click', () => pickNode(n.id));

    const num = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    num.setAttribute('x', n.x); num.setAttribute('y', n.y - 7);
    num.setAttribute('class', 'node-num'); num.textContent = n.num;

    const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lbl.setAttribute('x', n.x); lbl.setAttribute('y', n.y + 5);
    lbl.setAttribute('class', 'node-lbl'); lbl.textContent = n.short;

    g.appendChild(c); g.appendChild(num); g.appendChild(lbl);
    NL.appendChild(g);
  });

  // Pan with mouse drag
  svg.addEventListener('mousedown', e => {
    if (['line','circle','text'].includes(e.target.tagName)) return;
    dragging = true;
    drag0 = {x: e.clientX, y: e.clientY};
    pan0  = {x: px, y: py};
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    px = pan0.x + e.clientX - drag0.x;
    py = pan0.y + e.clientY - drag0.y;
    applyTransform();
  });
  window.addEventListener('mouseup', () => dragging = false);

  // Zoom with scroll wheel
  svg.addEventListener('wheel', e => {
    e.preventDefault();
    zoom(e.deltaY < 0 ? 1.1 : 0.9);
  }, {passive: false});

  // Move tooltip with mouse
  document.querySelector('.map-wrap').addEventListener('mousemove', e => {
    const r = document.querySelector('.map-wrap').getBoundingClientRect();
    const t = document.getElementById('tip');
    t.style.left = (e.clientX - r.left + 14) + 'px';
    t.style.top  = (e.clientY - r.top  - 10) + 'px';
  });
}

function applyTransform() {
  ['edges','nodes'].forEach(id => {
    document.getElementById(id).setAttribute('transform', `translate(${px},${py}) scale(${scale})`);
  });
}

function zoom(f) {
  scale = Math.min(5, Math.max(0.3, scale * f));
  applyTransform();
}

function resetView() { scale = 1; px = 0; py = 0; applyTransform(); }

// ── DROPDOWNS ─────────────────────────────────────────────────
function fillDropdowns() {
  const groups = {
    'Facilities': [0,2,3,15,19,40],
    'Academic':   [1,4,5,6,7,13,14,16,17,18,20,23,24,25,26,27,28,29,33,34,35,36,37,38,49,50,51],
    'Admin':      [30,31,32],
    'Medical':    [8],
    'Girls Hostels': [9,10,11,12,21,22,39],
    'Boys Hostels':  [41,42,43,44,45,46,47,48,52],
  };

  ['src','dst'].forEach(id => {
    const sel = document.getElementById(id);
    Object.keys(groups).forEach(group => {
      const og = document.createElement('optgroup');
      og.label = group;
      groups[group].forEach(nid => {
        const o = document.createElement('option');
        o.value = nid;
        o.textContent = `[${NODES[nid].num}] ${NODES[nid].name}`;
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
  });
}

// ── NODE CLICK ON MAP ─────────────────────────────────────────
function pickNode(id) {
  const s = document.getElementById('src');
  const d = document.getElementById('dst');
  // First click sets source, second sets destination
  if (!s.value || (s.value && d.value)) { s.value = id; d.value = ''; }
  else d.value = id;
  highlightSelected();
}

function highlightSelected() {
  const sv = document.getElementById('src').value;
  const dv = document.getElementById('dst').value;
  // Reset all node colours
  NODES.forEach(n => {
    document.getElementById(`n${n.id}`).className.baseVal = `node ${n.z}`;
  });
  if (sv) document.getElementById(`n${sv}`).className.baseVal = 'node start';
  if (dv) document.getElementById(`n${dv}`).className.baseVal = 'node end';
}

// ── FIND PATH (calls C++ backend) ─────────────────────────────
async function findPath() {
  const src = document.getElementById('src').value;
  const dst = document.getElementById('dst').value;
  const err = document.getElementById('error');
  const res = document.getElementById('result');
  err.className = 'error'; res.className = 'result';

  if (!src || !dst) { return showError('Please select both source and destination.'); }
  if (src === dst)  { return showError('Source and destination are the same.'); }

  try {
    const r = await fetch(`${API}/navigate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({src: +src, dst: +dst})
    });
    const data = await r.json();
    if (data.error) return showError(data.error);
    showResult(data);
    highlightPath(data.path.map(n => n.id));
  } catch {
    showError('Cannot reach C++ backend. Is server.exe running?');
  }
}

function showError(msg) {
  document.getElementById('error').textContent = '⚠ ' + msg;
  document.getElementById('error').className = 'error show';
}

function showResult(data) {
  document.getElementById('dist').textContent = data.distance;
  document.getElementById('time').textContent = data.walkTime;
  const steps = document.getElementById('steps');
  steps.innerHTML = '';
  data.path.forEach((n, i) => {
    const d = document.createElement('div');
    d.className = 'step';
    d.innerHTML = `<span class="step-n">${String(i+1).padStart(2,'0')}</span>
                   ${i > 0 ? '<span class="step-arrow">→</span>' : ''}
                   <span>[${n.num}] ${n.name}</span>`;
    steps.appendChild(d);
  });
  document.getElementById('result').className = 'result show';
}

function highlightPath(pathIds) {
  // Reset edges
  ROADS.forEach(([a,b]) => {
    const e = document.getElementById(`e${a}-${b}`) || document.getElementById(`e${b}-${a}`);
    if (e) e.className.baseVal = 'edge';
  });
  // Reset nodes
  NODES.forEach(n => {
    document.getElementById(`n${n.id}`).className.baseVal = `node ${n.z}`;
  });
  // Highlight path edges
  for (let i = 0; i < pathIds.length - 1; i++) {
    const a = pathIds[i], b = pathIds[i+1];
    const e = document.getElementById(`e${a}-${b}`) || document.getElementById(`e${b}-${a}`);
    if (e) e.className.baseVal = 'edge edge-path';
  }
  // Highlight path nodes
  pathIds.forEach((id, i) => {
    const cls = i === 0 ? 'start' : i === pathIds.length-1 ? 'end' : 'active';
    document.getElementById(`n${id}`).className.baseVal = `node ${cls}`;
  });
}

function clearAll() {
  document.getElementById('src').value = '';
  document.getElementById('dst').value = '';
  document.getElementById('error').className = 'error';
  document.getElementById('result').className = 'result';
  ROADS.forEach(([a,b]) => {
    const e = document.getElementById(`e${a}-${b}`) || document.getElementById(`e${b}-${a}`);
    if (e) e.className.baseVal = 'edge';
  });
  NODES.forEach(n => {
    document.getElementById(`n${n.id}`).className.baseVal = `node ${n.z}`;
  });
}

// ── TOOLTIP ───────────────────────────────────────────────────
function showTip(e, n) {
  const t = document.getElementById('tip');
  t.textContent = `[${n.num}] ${n.name}`;
  t.className = 'tip show';
}
function hideTip() { document.getElementById('tip').className = 'tip'; }

// ── BACKEND STATUS ────────────────────────────────────────────
async function checkStatus() {
  const dot  = document.getElementById('dot');
  const text = document.getElementById('status-text');
  try {
    const r = await fetch(`${API}/health`, {signal: AbortSignal.timeout(2000)});
    if (r.ok) { dot.className = 'dot on'; text.textContent = 'C++ Backend Online'; return; }
  } catch {}
  dot.className = 'dot off'; text.textContent = 'Backend Offline';
}

// ── START ─────────────────────────────────────────────────────
drawMap();
fillDropdowns();
checkStatus();
setInterval(checkStatus, 5000);
