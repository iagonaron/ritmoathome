/* =====================================================================================
   (21-nov-2026, Iago 17:22-17:36) RITMO AT HOME (4.º GE) · REPARTO DE PENTAGRAMAS AL COMBINAR MUNDOS — provisional
   · 5 pentagramas. Por mundo: 2 mundos → 3 + 2 · 3 mundos → 2 + 2 + 1 · 4 mundos → 2 + 1 + 1 + 1 · 5 mundos → 1 cada uno ·
     6 mundos → el 1 y el 3 comparten pentagrama (conviven en 6/8).
   · Los que «acaparan» (mundos 1 y 5) se llevan los pentagramas de más; entre iguales, al azar.
   · Cada pentagrama sale de las cartas de SU mundo (varias cartas mezcladas). La carta 4.3 (dosillo y cuatrillo, 6/8)
     puede entrar en los pentagramas de 6/8 del 1 y del 3 si el mundo 4 está marcado. El 2 (blanca) y el 6 van aislados.
   · Nunca más de 2 pentagramas seguidos con el mismo compás; la blanca y el 5/8 nunca seguidos; no se empieza en blanca.
   · Mundos 1 + 2 juntos: NO pasa por aquí (forma del examen, como estaba).
   · Claves (Iago 17:39): 3 sol + 2 fa, al azar pero fáciles: en fa, mejor un mundo que tenga otro pentagrama en sol, y si no es
     el 2, ritmo sencillo; el mundo 2 en sol, con miga (corcheas, negra con puntillo-corchea, síncopa o tresillo).
   Quitar este fichero deja el reparto de antes (geCombPlan).
   ===================================================================================== */
function geCombPlan2(worldIds, rand){
  const pick = pickF(rand), N = 5;
  const isBlanca = t => t.endsWith('/2');
  const isDisp = t => { const [n, d] = t.split('/').map(Number); return d === 8 && n % 3 !== 0; };
  const isNegra = t => t.endsWith('/4');
  const isTern = t => { const [n, d] = t.split('/').map(Number); return d === 8 && n % 3 === 0; };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const usable = w => (gp1World(w) ? gp1World(w).cards : []).filter(gp1CombUsableCard);
  const sig = {}; worldIds.forEach(w => { const st = new Set(); usable(w).forEach(c => (c.cells || []).forEach(cell => { if (cell.ts && !cell.equiv && !cell.extra) st.add(cell.ts); })); sig[w] = [...st]; });
  const freq = t => worldIds.filter(w => sig[w].includes(t)).length;
  const c43 = worldIds.includes('m4') ? usable('m4').filter(c => c.id === 'c4_3') : [];
  // 1) unidades: un mundo cada una; con 6, el 1 y el 3 juntos
  let units = worldIds.map(w => [w]);
  if (units.length > N) { const i1 = units.findIndex(u => u[0] === 'm1'), i3 = units.findIndex(u => u[0] === 'm3');
    if (i1 >= 0 && i3 >= 0) { units[i1] = ['m1', 'm3']; units.splice(i3, 1); } }
  while (units.length > N) { const libres = units.map((u, i) => i).filter(i => !units[i].includes('m2') && !units[i].includes('m6'));
    if (libres.length < 2) { units[units.length - 2] = units[units.length - 2].concat(units.pop()); continue; }
    const [a, b] = libres.slice(-2); units[a] = units[a].concat(units[b]); units.splice(b, 1); }
  // 2) cuántos pentagramas por unidad: los que acaparan (1 y 5) primero
  const REP = { 1: [5], 2: [3, 2], 3: [2, 2, 1], 4: [2, 1, 1, 1], 5: [1, 1, 1, 1, 1] }[units.length] || [1, 1, 1, 1, 1];
  const prio = u => (u.includes('m1') || u.includes('m5')) ? 0 : 1;
  const ordenU = shuffle(units).sort((a, b) => prio(a) - prio(b));
  // 3) compases de cada unidad (el característico primero; luego otros suyos, para que haya variedad)
  const cartasDe = (u, t) => { let cs = []; u.forEach(w => usable(w).forEach(c => { if (cardCanSound(c, [t])) cs.push(c); }));
    if (isTern(t) && (u.includes('m1') || u.includes('m3'))) c43.forEach(c => { if (cardCanSound(c, [t]) && !cs.includes(c)) cs.push(c); });
    return cs; };
  const fam = t => t === '2/4' ? ['2/4', '3/4', '4/4'] : t === '6/8' ? ['6/8', '9/8', '12/8'] : [t];
  const slots = [], usoT = {};
  const libre = cs => { const l = cs.filter(t => (usoT[t] || 0) < 2); return l.length ? l : cs; };   // un compás, en 2 pentagramas como mucho
  ordenU.forEach((u, ui) => {
    const n = REP[ui];
    let pool = [...new Set(u.flatMap(w => sig[w]))];
    let todos = [...new Set(pool.flatMap(fam))].filter(t => cartasDe(u, t).length);
    if (!todos.length) todos = pool.length ? pool : ['2/4'];
    const peso = t => cartasDe(u, t).filter(c => !(c.id === 'c4_3' && !u.includes('m4'))).length;   // cartas del propio mundo que suenan en ese compás
    const esp = todos.filter(t => isBlanca(t) || isDisp(t));
    let base = esp.length ? esp : pool.filter(t => todos.includes(t)); if (!base.length) base = todos;
    if (!esp.length) { const mx = Math.max(...base.map(peso)); base = base.filter(t => peso(t) === mx); }   // donde el mundo tiene más cartas
    const minF = Math.min(...base.map(freq));
    let cand = base.filter(t => freq(t) === minF);
    if (cand.every(t => (usoT[t] || 0) >= 2)) { const alt = todos.filter(t => (usoT[t] || 0) < 2 && peso(t) > 0); if (alt.length) cand = alt; }   // ese compás ya está 2 veces: otro de los suyos (6/8 → 9/8, 12/8…)
    const primero = pick(cand);
    const elegidos = [primero];
    const sorteo = cs => { const tot = cs.reduce((a, t) => a + Math.max(1, peso(t)), 0); let r = rand() * tot; for (const t of cs) { r -= Math.max(1, peso(t)); if (r <= 0) return t; } return cs[cs.length - 1]; };
    for (let k = 1; k < n; k++) {
      const nuevos = libre(todos.filter(t => !elegidos.includes(t)));
      const mx = nuevos.length ? Math.max(...nuevos.map(peso)) : 0;
      const buenos = nuevos.filter(t => peso(t) * 2 >= mx);   // compases donde el mundo tiene bastantes cartas
      let t = buenos.length ? sorteo(buenos) : pick(todos);
      if (!buenos.length) { const e = combExpandMeter(t, rand); if (cartasDe(u, e).length) t = e; }
      elegidos.push(t);
    }
    elegidos.forEach(t => { usoT[t] = (usoT[t] || 0) + 1; slots.push({ owners: u.slice(), time: t, cards: cartasDe(u, t) }); });
  });
  // 4) claves (Iago 17:39): 2 en fa, al azar pero fáciles; mejor de un mundo que tenga otro pentagrama en sol.
  //    En fa, si el mundo no es el 2 y tiene más pentagramas, ritmo sencillo (sin compás de sus cartas). El 2 en sol: con miga.
  const porUnidad = u => slots.filter(x => x.owners.join() === u.join()).length;
  const bassFirst = rand() < 0.5;
  const enFa = new Set(); const cupo = new Map();
  shuffle(slots).forEach(x => { if (enFa.size >= 2) return; const k = x.owners.join(); const usados = cupo.get(k) || 0;
    if (porUnidad(x.owners) - usados >= 2) { enFa.add(x); cupo.set(k, usados + 1); } });
  shuffle(slots).forEach(x => { if (enFa.size < 2 && !enFa.has(x)) enFa.add(x); });   // todos de un pentagrama: cualquiera
  slots.forEach(x => { x.fa = enFa.has(x); x.solo = !x.fa || porUnidad(x.owners) === 1; });
  const sol = slots.filter(x => !x.fa), fa = slots.filter(x => x.fa);
  // 5) orden: el mejor de muchos al azar (los de fa, juntos al principio o al final)
  const score = seq => { let p = 0;
    for (let i = 0; i < seq.length - 1; i++) { const a = seq[i].time, b = seq[i + 1].time;
      if ((isBlanca(a) && isDisp(b)) || (isDisp(a) && isBlanca(b))) p += 100; }
    for (let i = 2; i < seq.length; i++) if (seq[i].time === seq[i - 1].time && seq[i].time === seq[i - 2].time) p += 60;
    const bi = seq.findIndex(s => isBlanca(s.time)), di = seq.findIndex(s => isDisp(s.time));
    if (bi >= 0 && di >= 0) { const lo = Math.min(bi, di), hi = Math.max(bi, di); if (!seq.slice(lo + 1, hi).some(s => isNegra(s.time))) p += 40; }
    if (seq.length && isBlanca(seq[0].time)) p += 20;
    for (let i = 1; i < seq.length; i++) if (seq[i].time === seq[i - 1].time) p += 2;   // mejor variar
    return p; };
  const arma = () => { const a = shuffle(sol), b = shuffle(fa); return bassFirst ? b.concat(a) : a.concat(b); };
  let best = arma(), bestP = score(best);
  for (let t = 0; t < 300 && bestP > 0; t++) { const o = arma(); const p = score(o); if (p < bestP) { bestP = p; best = o; } }
  const phraseTime = [], owners = [], cards = [], blockTimes = [], blockSplit = [], clefs = [], hard = [];
  best.forEach(s => { phraseTime.push(s.time); cards.push(s.cards); clefs.push(s.fa ? 'bass' : 'treble');
    const esDos = s.owners.includes('m2');
    owners.push((s.fa && !esDos && !s.solo) ? [] : s.owners.slice());   // en fa con otros pentagramas en sol: solo ritmo sencillo
    hard.push(!s.fa && esDos && isBlanca(s.time));
    if (blockTimes.length && blockTimes[blockTimes.length - 1] === s.time) blockSplit[blockSplit.length - 1]++; else { blockTimes.push(s.time); blockSplit.push(1); } });
  geCombPlan2.ultimo = best.map(s => s.owners.slice());
  return { phraseTime, owners, cards, blockTimes, blockSplit, clefs, hard, unidad: geCombPlan2.ultimo };
}
/* mundo 2 en clave de sol: cada compás «con miga» (corcheas, negra con puntillo-corchea, síncopa o tresillo) */
(function(){
  if (typeof genMeasureFromCards !== 'function') return;
  const orig = genMeasureFromCards;
  const conMiga = m => { const d = (m.notes || []).map(n => n.dur);
    if (m.groupInfo || (m.tuplets && m.tuplets.length)) return true;
    if (d.some(x => x === '8' || x === '8d' || x === '16' || x === 'qd')) return true;
    for (let i = 0; i + 2 < d.length; i++) if (d[i] === 'q' && d[i + 1] === 'h' && d[i + 2] === 'q') return true;   // síncopa
    return false; };
  const firma = m => (m.notes || []).map(n => n.dur + (n.rest ? 'r' : '')).join(' ');
  let prev = '', prevTipo = '';
  genMeasureFromCards = function(time, cards, pick, opts){
    if (!opts || !opts.difBlanca) return orig.apply(this, arguments);
    const TIPOS = ['qd8', 'cor', 'sinc', 'trip'];
    const deTipo = (aunqueRepita) => { const orden = TIPOS.filter(x => x !== prevTipo).sort(() => pick([-1, 1])).concat(prevTipo ? [prevTipo] : []);
      for (const t of orden) { try { const mb = geBlancaMeasure(time, pick, t);
        if (mb && validateMeasure(mb) && (aunqueRepita || firma(mb) !== prev)) { prevTipo = t; return mb; } } catch (e) {} }
      return null; };
    let m = null, igual = null;
    if (pick([true, false, false])) m = deTipo(false);   // a veces, directamente una de las dificultades del pulso de blanca
    for (let t = 0; !m && t < 14; t++) { const c = orig.call(this, time, cards, pick, opts);
      if (c && validateMeasure(c) && conMiga(c)) { if (firma(c) !== prev) m = c; else igual = igual || c; } }
    if (!m) m = deTipo(false) || igual || deTipo(true) || orig.call(this, time, cards, pick, opts);
    prev = firma(m); return m; };
})();
/* si la melodía no cuadra en una semilla (pasaba de vez en cuando también antes), se prueba la siguiente: misma semilla → misma lección.
   El examen (mundos 1 + 2) no se toca. */
(function(){
  if (typeof genLessonComb !== 'function') return;
  const orig = genLessonComb;
  genLessonComb = function(worldIds, seed){
    const P = (typeof geCombPlan2 === 'function') ? geCombPlan2 : {};
    P.ultimo = null; let L = orig.apply(this, arguments); L.__unidad = P.ultimo;
    const ex12 = worldIds.length === 2 && worldIds.includes('m1') && worldIds.includes('m2');
    if (L.valid || ex12) return L;
    for (let k = 1; k <= 6; k++) { const L2 = orig.call(this, worldIds, seed + k * 7919); if (L2.valid) { L2.__unidad = P.ultimo; return L2; } }
    return L; };
})();
