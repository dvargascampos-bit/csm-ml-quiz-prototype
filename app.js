(function () {
  var Q = window.QUIZ;
  var LETTERS = ["A", "B", "C", "D"];
  var app = document.getElementById("app");

  // Flatten to a fixed six-question path.
  var questions = [];
  Q.lessons.forEach(function (l) {
    l.questions.forEach(function (q) { questions.push({ lesson: l, q: q }); });
  });

  var state;
  function reset() { state = { screen: "intro", idx: 0, answers: [], picked: null, checked: false, tab: "mine" }; }
  reset();

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function correctIndex(q) { return q.options.findIndex(function (o) { return o.correct; }); }
  function kindClass(o) { return o.correct ? "good" : (o.kind === "partial" ? "partial" : "warn"); }
  function kindLabel(o) { return o.correct ? "Correct understanding" : (o.kind === "partial" ? "Partial understanding" : "Misconception"); }

  function render(focus) {
    if (state.screen === "intro") app.innerHTML = introView();
    else if (state.screen === "quiz") app.innerHTML = quizView();
    else app.innerHTML = resultsView();
    bind();
    if (focus !== false) { app.focus({ preventScroll: true }); window.scrollTo(0, 0); }
  }

  function introView() {
    return '<div class="card">' +
      '<div class="eyebrow">' + esc(Q.title) + '</div>' +
      '<h1>Try the new end-of-lesson quiz</h1>' +
      '<p>You\'ll answer the six graded questions from our Grade 7 media literacy quizzes (two per lesson), the way a student would. It takes about five minutes.</p>' +
      '<ol class="steps">' +
      '<li><span class="n">1</span><span><b>Answer each question.</b> After you check an answer, you\'ll see feedback written for the answer you chose. The old quiz didn\'t do this.</span></li>' +
      '<li><span class="n">2</span><span><b>See your results.</b> You get a score, what each miss reflects, and what to practice.</span></li>' +
      '<li><span class="n">3</span><span><b>Flip to the Teacher view.</b> See how a teacher would see results grouped by misconception, with your answers included in a simulated class.</span></li>' +
      '</ol>' +
      '<button class="btn" id="start">Start the quiz</button>' +
      '</div>';
  }

  function quizView() {
    var item = questions[state.idx], q = item.q, o;
    var prog = questions.map(function (_, i) {
      return '<span class="' + (i < state.idx ? "done" : i === state.idx ? "now" : "") + '"></span>';
    }).join("");
    var ci = correctIndex(q);
    var opts = q.options.map(function (op, i) {
      var cls = "opt", tag = "";
      if (state.checked) {
        if (i === ci) { cls += " is-correct"; tag = '<span class="tag">Best answer</span>'; }
        else if (i === state.picked) { cls += " is-wrong"; tag = '<span class="tag">Your answer</span>'; }
      }
      var pressed = !state.checked && state.picked === i;
      return '<button class="' + cls + '" data-i="' + i + '" aria-pressed="' + pressed + '"' + (state.checked ? " disabled" : "") + '>' +
        '<span class="letter">' + LETTERS[i] + '</span><span>' + esc(op.text) + '</span>' + tag + '</button>';
    }).join("");

    var fb = "";
    if (state.checked) {
      var chosen = q.options[state.picked], right = chosen.correct;
      fb = '<div class="feedback ' + (right ? "ok" : "no") + '" role="status">' +
        '<h3>' + (right ? "Correct!" : "Not quite") + '</h3><p>' + esc(chosen.feedback) + '</p>' +
        (right ? "" : '<div class="best"><b>The best answer was ' + LETTERS[ci] + ':</b> ' + esc(q.options[ci].text) + '</div>') +
        '</div>';
    }
    var last = state.idx === questions.length - 1;
    var btn = state.checked
      ? '<button class="btn" id="next">' + (last ? "See my results" : "Next question") + '</button>'
      : '<button class="btn" id="check"' + (state.picked === null ? " disabled" : "") + '>Check answer</button>';

    return '<div class="progress" aria-hidden="true">' + prog + '</div>' +
      '<div class="card">' +
      '<div class="eyebrow">Question ' + (state.idx + 1) + ' of ' + questions.length + ' · Lesson ' + (Q.lessons.indexOf(item.lesson) + 1) + ': ' + esc(item.lesson.title) + '</div>' +
      (q.scenario ? '<div class="scenario">' + esc(q.scenario) + '</div>' : "") +
      '<div class="stem">' + esc(q.stem) + '</div>' +
      '<div class="options">' + opts + '</div>' + fb + btn + '</div>';
  }

  function score() { return state.answers.filter(function (a, i) { return questions[i].q.options[a].correct; }).length; }

  function resultsView() {
    return '<div class="tabs" role="tablist">' +
      '<button class="tab" role="tab" data-tab="mine" aria-selected="' + (state.tab === "mine") + '">My results</button>' +
      '<button class="tab" role="tab" data-tab="teacher" aria-selected="' + (state.tab === "teacher") + '">Teacher view</button></div>' +
      (state.tab === "mine" ? mineView() : teacherView());
  }

  function mineView() {
    var total = score(), n = questions.length, html = "";
    var msg = total === n ? "You got every question. Nice work." :
      total >= n / 2 ? "A solid start. Each miss below points to one idea worth another look." :
      "These are tricky ideas, and the feedback below shows where to focus next.";
    html += '<div class="card"><div class="score"><div class="big">' + total + ' / ' + n + '</div><div><h2>Your results</h2><p class="muted" style="margin:0">' + msg + '</p></div></div>';
    Q.lessons.forEach(function (l, li) {
      var got = 0, tot = 0;
      questions.forEach(function (it, i) { if (it.lesson === l) { tot++; if (questions[i].q.options[state.answers[i]].correct) got++; } });
      html += '<div class="lesson-row"><span>Lesson ' + (li + 1) + ': ' + esc(l.title) + '</span><span class="pill ' + (got === tot ? "good" : "warn") + '">' + got + ' of ' + tot + '</span></div>';
    });
    html += '</div>';

    questions.forEach(function (it, i) {
      var q = it.q, o = q.options[state.answers[i]], ci = correctIndex(q);
      html += '<div class="card qres ' + (o.correct ? "ok" : "no") + '">' +
        '<div class="head"><span class="pill type">' + esc(q.type) + '</span><span class="muted">Lesson ' + (Q.lessons.indexOf(it.lesson) + 1) + ' · ' + esc(q.skill) + '</span>' +
        '<span class="pill ' + (o.correct ? "good" : "warn") + '" style="margin-left:auto">' + (o.correct ? "Correct" : "Not quite") + '</span></div>' +
        '<p><b>' + esc(q.stem) + '</b></p>' +
        '<div class="kv"><b>You chose ' + LETTERS[state.answers[i]] + '</b>' + esc(o.text) + '</div>';
      if (o.correct) {
        html += '<div class="kv"><b>Why it works</b>' + esc(o.feedback) + '</div>';
      } else {
        html += '<div class="kv"><b>' + (o.kind === "partial" ? "Partial understanding" : "The idea behind that answer") + '</b>' + esc(o.misconception) + '</div>' +
          '<div class="kv"><b>Best answer (' + LETTERS[ci] + ')</b>' + esc(q.options[ci].text) + '</div>' +
          '<div class="practice"><b>What to practice:</b> ' + esc(o.practice) + '</div>';
      }
      html += '</div>';
    });
    html += '<div class="actions"><button class="btn" id="toTeacher">See the Teacher view</button><button class="btn secondary" id="restart">Start over</button></div>';
    return html;
  }

  // ---- Teacher view (simulated class + the participant as one student) ----
  // Students for a lesson: 24 simulated [abilityIdx, sensitivityIdx] pairs + the participant's own pair.
  function lessonStudents(li) {
    var l = Q.lessons[li], mine = [];
    questions.forEach(function (it, i) { if (it.lesson === l) mine.push(state.answers[i]); });
    return l.sim.concat([mine]);
  }
  function qIndexInLesson(i) { return questions[i].lesson.questions.indexOf(questions[i].q); }

  function distribution(i) {
    var q = questions[i].q, li = Q.lessons.indexOf(questions[i].lesson), k = qIndexInLesson(i);
    var studs = lessonStudents(li), total = studs.length;
    return q.options.map(function (o, oi) {
      var c = studs.filter(function (s) { return s[k] === oi; }).length;
      return { o: o, letter: LETTERS[oi], count: c, pct: Math.round(100 * c / total), you: state.answers[i] === oi };
    });
  }

  // Per lesson: how many students got both / one / neither right, and which misconceptions the others chose.
  function skillSummary(li) {
    var l = Q.lessons[li], studs = lessonStudents(li), total = studs.length;
    var levels = [0, 0, 0], miscs = {}, order = [];
    studs.forEach(function (s) {
      var right = 0;
      s.forEach(function (oi, k) { if (l.questions[k].options[oi].correct) right++; });
      levels[right]++;
      if (right < 2) {
        s.forEach(function (oi, k) {
          var o = l.questions[k].options[oi];
          if (o.correct) return;
          var key = k + "-" + oi;
          if (!miscs[key]) { miscs[key] = { o: o, type: l.questions[k].type, count: 0 }; order.push(key); }
          miscs[key].count++;
        });
      }
    });
    var list = order.map(function (k) { return miscs[k]; }).sort(function (a, b) { return b.count - a.count; });
    return { lesson: l, total: total, achieved: levels[2], partial: levels[1], notYet: levels[0], notFull: levels[1] + levels[0], miscs: list };
  }

  function teacherView() {
    var n = questions.length;
    var dists = questions.map(function (_, i) { return distribution(i); });
    var skills = Q.lessons.map(function (_, li) { return skillSummary(li); });
    var total = skills[0].total, correctTotal = 0;
    dists.forEach(function (d) { d.forEach(function (r) { if (r.o.correct) correctTotal += r.count; }); });
    var avg = (correctTotal / total).toFixed(1);

    var html = '<div class="sim-banner">Simulated report. This is what a teacher would see after a class finishes this quiz. The class is ' + Q.classSize + ' fictional students plus you.</div>' +
      '<div class="tiles">' +
      '<div class="tile"><div class="num">' + total + ' of ' + total + '</div>students completed</div>' +
      '<div class="tile"><div class="num">' + avg + ' / ' + n + '</div>average score</div></div>';

    // Target skills
    html += '<h2 class="section" style="margin-top:0">Target skills</h2>' +
      '<p class="muted">Each lesson has one target skill, checked by two questions. <b>Achieved</b> = both right, <b>Partly</b> = one right, <b>Not yet</b> = neither right. For students who did not fully achieve a skill, the breakdown shows the misconception behind each wrong answer.</p>';
    skills.forEach(function (sk, li) {
      var pc = function (v) { return Math.round(100 * v / sk.total); };
      html += '<div class="card"><div class="eyebrow">Lesson ' + (li + 1) + ': ' + esc(sk.lesson.title) + '</div>' +
        '<h3>' + esc(sk.lesson.skill) + '</h3>' +
        '<div class="stack" role="img" aria-label="' + sk.achieved + ' achieved, ' + sk.partial + ' partly, ' + sk.notYet + ' not yet">' +
        '<i class="good" style="width:' + pc(sk.achieved) + '%"></i><i class="part" style="width:' + pc(sk.partial) + '%"></i><i class="warn" style="width:' + pc(sk.notYet) + '%"></i></div>' +
        '<div class="legend"><span><i class="sw good"></i><b>Achieved</b> ' + sk.achieved + ' (' + pc(sk.achieved) + '%)</span>' +
        '<span><i class="sw part"></i><b>Partly</b> ' + sk.partial + ' (' + pc(sk.partial) + '%)</span>' +
        '<span><i class="sw warn"></i><b>Not yet</b> ' + sk.notYet + ' (' + pc(sk.notYet) + '%)</span></div>';
      if (sk.miscs.length) {
        html += '<h3 style="margin-top:16px">Where the ' + sk.notFull + ' students who did not fully achieve it got stuck</h3>' +
          '<p class="muted" style="margin-bottom:8px">Ranked by how many of those ' + sk.notFull + ' students chose each answer. A student who missed both questions appears twice.</p><div class="dist">';
        sk.miscs.forEach(function (m) {
          var p = Math.round(100 * m.count / sk.notFull);
          html += '<div class="row"><div class="static"><div class="top"><span class="label">' + esc(m.o.misconception) + '</span><span class="count">' + m.count + ' of ' + sk.notFull + ' (' + p + '%)</span></div>' +
            '<div class="bar"><i class="' + kindClass(m.o) + '" style="width:' + p + '%"></i></div>' +
            '<div class="meta"><span class="pill ' + kindClass(m.o) + '">' + kindLabel(m.o) + '</span><span class="pill type">' + esc(m.type) + ' question</span></div></div></div>';
        });
        html += '</div>';
      } else {
        html += '<p>Every student fully achieved this skill.</p>';
      }
      html += '</div>';
    });

    html += '<h2 class="section">Results by question</h2>';
    Q.lessons.forEach(function (l, li) {
      html += '<h3 style="margin:20px 0 10px">Lesson ' + (li + 1) + ': ' + esc(l.title) + '</h3>';
      questions.forEach(function (it, i) {
        if (it.lesson !== l) return;
        var q = it.q, d = dists[i];
        var right = d.filter(function (r) { return r.o.correct; })[0];
        var wrong = d.filter(function (r) { return !r.o.correct; }).sort(function (a, b) { return b.count - a.count; });
        var rows = [right].concat(wrong);
        html += '<div class="card"><div class="head" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px"><span class="pill type">' + esc(q.type) + '</span><span class="muted">' + esc(q.skill) + '</span></div>' +
          '<p><b>' + esc(q.stem) + '</b></p>' +
          '<p class="takeaway">' + right.pct + '% answered correctly. The most common misunderstanding: "' + esc(wrong[0].o.misconception) + '" (' + wrong[0].pct + '%).</p>' +
          '<div class="dist">';
        rows.forEach(function (r, k) {
          var id = "d-" + i + "-" + k;
          html += '<div class="row"><button aria-expanded="false" aria-controls="' + id + '" data-row="' + id + '">' +
            '<div class="top"><span class="label">' + (r.o.correct ? "Correct: " : "") + esc(r.o.correct ? r.o.text : r.o.misconception) + (r.you ? ' <span class="you">YOU</span>' : "") + '</span>' +
            '<span class="count">' + r.count + ' (' + r.pct + '%)</span></div>' +
            '<div class="bar"><i class="' + kindClass(r.o) + '" style="width:' + r.pct + '%"></i></div>' +
            '<div class="meta"><span class="pill ' + kindClass(r.o) + '">' + kindLabel(r.o) + '</span><span>Click for what students saw</span></div></button>' +
            '<div class="detail" id="' + id + '" hidden>' +
            '<div class="kv"><b>Option ' + r.letter + ' (what students saw)</b>' + esc(r.o.text) + '</div>' +
            '<div class="kv"><b>Feedback students received</b>' + esc(r.o.feedback) + '</div>' +
            (r.o.correct ? "" : '<div class="practice"><b>Practice suggested to students:</b> ' + esc(r.o.practice) + '</div>') +
            '</div></div>';
        });
        html += '</div></div>';
      });
    });
    html += '<div class="actions"><button class="btn secondary" id="backMine">Back to my results</button><button class="btn secondary" id="restart">Start over</button></div>';
    return html;
  }

  function bind() {
    var el;
    if ((el = document.getElementById("start"))) el.onclick = function () { state.screen = "quiz"; render(); };
    if ((el = document.getElementById("check"))) el.onclick = function () {
      state.checked = true; state.answers[state.idx] = state.picked; render(false);
      var fb = app.querySelector(".feedback"); if (fb) fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };
    if ((el = document.getElementById("next"))) el.onclick = function () {
      if (state.idx === questions.length - 1) { state.screen = "results"; state.tab = "mine"; }
      else { state.idx++; state.picked = null; state.checked = false; }
      render();
    };
    Array.prototype.forEach.call(app.querySelectorAll(".opt"), function (b) {
      b.onclick = function () {
        if (state.checked) return;
        state.picked = +b.getAttribute("data-i");
        render(false);
        var again = app.querySelector('.opt[data-i="' + state.picked + '"]'); if (again) again.focus();
      };
    });
    Array.prototype.forEach.call(app.querySelectorAll(".tab"), function (b) {
      b.onclick = function () { state.tab = b.getAttribute("data-tab"); render(); };
    });
    Array.prototype.forEach.call(app.querySelectorAll("[data-row]"), function (b) {
      b.onclick = function () {
        var d = document.getElementById(b.getAttribute("data-row")), open = d.hidden;
        d.hidden = !open; b.setAttribute("aria-expanded", String(open));
      };
    });
    if ((el = document.getElementById("toTeacher"))) el.onclick = function () { state.tab = "teacher"; render(); };
    if ((el = document.getElementById("backMine"))) el.onclick = function () { state.tab = "mine"; render(); };
    if ((el = document.getElementById("restart"))) el.onclick = function () { reset(); render(); };
  }

  render(false);
})();
