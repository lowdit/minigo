(function () {
  var plan = window.__LOWDIT_TEST_PLAN__;
  if (!plan) {
    var dataEl = document.getElementById('lowdit-test-plan-data');
    if (!dataEl) return;
    try {
      plan = JSON.parse(dataEl.textContent.trim());
      if (typeof plan === 'string') {
        plan = JSON.parse(plan);
      }
    } catch (e) {
      console.warn('lowdit test plan: JSON invalide', e);
      return;
    }
  }

  var aside = document.getElementById('lowdit-test-assist');
  var toggle = document.getElementById('lowdit-test-assist-toggle');
  if (!aside || !toggle) return;

  var storageKey = 'lowdit-test-checked:' + plan.path;

  function loadChecked() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (err) {
      return {};
    }
  }

  function saveChecked(map) {
    localStorage.setItem(storageKey, JSON.stringify(map));
  }

  function renderList(name, items) {
    var ul = aside.querySelector('[data-list="' + name + '"]');
    if (!ul) return;
    ul.innerHTML = '';
    var checked = loadChecked();
    (items || []).forEach(function (item) {
      var li = document.createElement('li');
      var id = item.id || item.label;
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = 'lowdit-test-' + name + '-' + id;
      cb.checked = !!checked[id];
      cb.addEventListener('change', function () {
        var map = loadChecked();
        map[id] = cb.checked;
        saveChecked(map);
      });
      var label = document.createElement('label');
      label.htmlFor = cb.id;
      label.innerHTML = '<span class="lowdit-test-assist__label">' + escapeHtml(item.label) + '</span>';
      if (item.manual) {
        var hint = document.createElement('span');
        hint.className = 'lowdit-test-assist__hint';
        hint.textContent = item.manual;
        label.appendChild(hint);
      }
      li.appendChild(cb);
      li.appendChild(label);
      ul.appendChild(li);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderTools(tools) {
    var ul = aside.querySelector('[data-list="tools"]');
    if (!ul) return;
    ul.innerHTML = '';
    (tools || []).forEach(function (tool) {
      var li = document.createElement('li');
      if (tool.type === 'inject_axe') {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = tool.label;
        btn.addEventListener('click', runAxe);
        li.appendChild(btn);
      } else if (tool.type === 'external' && tool.url) {
        var a = document.createElement('a');
        a.href = tool.url + encodeURIComponent(window.location.href);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = tool.label;
        li.appendChild(a);
      } else {
        var span = document.createElement('span');
        span.textContent = tool.label;
        li.appendChild(span);
      }
      if (tool.note) {
        var note = document.createElement('p');
        note.className = 'lowdit-test-assist__tool-note';
        note.textContent = tool.note;
        li.appendChild(note);
      }
      ul.appendChild(li);
    });
  }

  function runAxe() {
    var finish = function () {
      if (!window.axe) {
        console.warn('axe-core non chargé');
        return;
      }
      window.axe.run(document, { resultTypes: ['violations', 'incomplete'] }, function (err, results) {
        if (err) {
          console.error(err);
          return;
        }
        console.group('axe — ' + plan.path);
        console.log('Violations:', results.violations.length, results.violations);
        console.log('Incomplete (revue manuelle):', results.incomplete.length, results.incomplete);
        console.groupEnd();
        alert(
          'axe terminé : ' +
            results.violations.length +
            ' violation(s), ' +
            results.incomplete.length +
            ' à revoir. Détails dans la console (F12).'
        );
      });
    };
    if (window.axe) {
      finish();
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js';
    s.onload = finish;
    s.onerror = function () {
      alert('Impossible de charger axe-core (réseau ?). Utilisez l’extension axe DevTools.');
    };
    document.head.appendChild(s);
  }

  renderList('a11y', plan.a11y);
  renderList('qa', plan.qa);
  renderTools(plan.tools);

  toggle.addEventListener('click', function () {
    var open = aside.hidden;
    aside.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  var closeBtn = aside.querySelector('.lowdit-test-assist__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      aside.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
})();
