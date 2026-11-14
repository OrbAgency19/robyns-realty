/* Header menu panel + scrolled shadow */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".rr-menu-btn");
  var panel = document.getElementById("rr-panel");
  var scrim = document.querySelector(".rr-scrim");
  var header = document.querySelector(".rr-header");
  if (!btn || !panel) return;

  function setOpen(open) {
    root.classList.toggle("rr-open", open);
    document.body.classList.toggle("rr-lock", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    var label = btn.querySelector(".rr-menu-label");
    if (label) label.textContent = open ? "Close" : "Menu";
    if (open) { var first = panel.querySelector("a"); if (first) first.focus({ preventScroll: true }); }
  }
  btn.addEventListener("click", function () { setOpen(!root.classList.contains("rr-open")); });
  if (scrim) scrim.addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && root.classList.contains("rr-open")) { setOpen(false); btn.focus(); }
  });

  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
