/* Testimonial carousel: arrows, dots, swipe, keyboard; slow auto-advance that pauses on hover/focus
   and is off for people who prefer reduced motion. */
(function () {
  var root = document.querySelector("[data-rr-carousel]");
  if (!root) return;
  var slides = root.querySelectorAll(".rr-t-slide");
  var dots = root.querySelectorAll(".rr-t-dot");
  var count = root.querySelector(".rr-t-count");
  var i = 0, timer = null, paused = false;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      var on = k === i;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.forEach(function (d, k) { d.setAttribute("aria-current", k === i ? "true" : "false"); });
    if (count) count.textContent = pad(i + 1) + " / " + pad(slides.length);
  }
  function start() {
    if (reduce) return;
    stop();
    timer = setInterval(function () { if (!paused) show(i + 1); }, 9000);
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }

  root.querySelector(".rr-t-prev").addEventListener("click", function () { show(i - 1); start(); });
  root.querySelector(".rr-t-next").addEventListener("click", function () { show(i + 1); start(); });
  dots.forEach(function (d, k) { d.addEventListener("click", function () { show(k); start(); }); });

  root.addEventListener("mouseenter", function () { paused = true; });
  root.addEventListener("mouseleave", function () { paused = false; });
  root.addEventListener("focusin", function () { paused = true; });
  root.addEventListener("focusout", function () { paused = false; });
  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { show(i - 1); start(); }
    if (e.key === "ArrowRight") { show(i + 1); start(); }
  });

  var x0 = null;
  root.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { show(dx < 0 ? i + 1 : i - 1); start(); }
    x0 = null;
  });

  show(0);
  start();
})();
