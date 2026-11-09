// ============================================================
// TITAN GUARD v1.0 - Protezione Motore
// Caricare PRIMA di titan_Global_Engine.js nell'HTML
// ============================================================

(function() {
  'use strict';

    // === 1. DOMAIN LOCK ===
  // Permette: titan-v64.com, localhost, e file locale (per test)
 var _d = ['bitter-cherry-5e0a.titan-cover.workers.dev', 'autumn-river-907c.titan-cover.workers.dev', 'localhost', '127.0.0.1', ''];


  var _h = window.location.hostname;
  if (_d.indexOf(_h) === -1) {
    document.body.innerHTML = '<div style="text-align:center;padding:80px;font-family:Arial;color:#333"><h2>⚠ Accesso non autorizzato</h2><p>Disponibile solo su titan-v64.com</p></div>';
    throw new Error();
  }


  // === 2. KEYBOARD BLOCKING ===
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 123 || e.key === 'F12') { e.preventDefault(); e.stopPropagation(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.key === 'I' || e.key === 'J' || e.key === 'i' || e.key === 'j')) { e.preventDefault(); e.stopPropagation(); return false; }
    if (e.ctrlKey && (e.keyCode === 85 || e.key === 'u' || e.key === 'U')) { e.preventDefault(); return false; }
  }, true);

  // === 3. ANTI-DEBUG ===
  var _blocked = false;
  function _kill() {
    if (_blocked) return;
    _blocked = true;
    if (typeof TITAN_ENGINE !== 'undefined') {
      try {
        Object.keys(TITAN_ENGINE).forEach(function(k) {
          if (typeof TITAN_ENGINE[k] === 'object' && TITAN_ENGINE[k]) {
            Object.keys(TITAN_ENGINE[k]).forEach(function(sk) {
              if (typeof TITAN_ENGINE[k][sk] === 'function') {
                TITAN_ENGINE[k][sk] = function() { return undefined; };
              }
            });
          }
          if (typeof TITAN_ENGINE[k] === 'function') {
            TITAN_ENGINE[k] = function() { return undefined; };
          }
        });
      } catch(e) {}
    }
    console.clear();
  }

  // Window size (DevTools docked)
  setInterval(function() {
    if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) { _kill(); }
  }, 2000);

  // Debugger timing
  setInterval(function() {
    var s = performance.now();
    debugger;
    if (performance.now() - s > 100) { _kill(); }
  }, 4000);

  // Console trap
  setInterval(function() {
    var img = new Image();
    Object.defineProperty(img, 'id', { get: function() { _kill(); return ''; } });
    console.log(img);
    console.clear();
  }, 5000);

  // === 4. SELF-DESTRUCT ===
  window.addEventListener('load', function() {
    setTimeout(function() {
      var scripts = document.querySelectorAll('script[src*="Engine"], script[src*="engine"], script[src*="titan_Global"]');
      scripts.forEach(function(s) { s.remove(); });
    }, 3000);
  });
})();
