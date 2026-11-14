/* Robyn's Realty forms -> Web3Forms (replaces Webflow form handling, which stopped working off Webflow).
   Submissions are emailed to the inbox the access key was created for (robynsrealty@gmail.com).
   The access key is public by design; Web3Forms only ever sends to the key's own inbox. */
(function () {
  var ACCESS_KEY = "WEB3FORMS_ACCESS_KEY";
  if (!ACCESS_KEY || ACCESS_KEY.indexOf("WEB3FORMS") === 0) return; // not configured yet

  function formName(form) {
    return form.getAttribute("data-name") || form.getAttribute("name") || "Website form";
  }

  // Capture phase on window runs before Webflow's own submit handlers, so they never fire.
  window.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || !form.closest || !form.closest(".w-form")) return;
    e.preventDefault();
    e.stopImmediatePropagation();

    var wrap = form.closest(".w-form");
    var done = wrap.querySelector(".w-form-done");
    var fail = wrap.querySelector(".w-form-fail");
    var btn = form.querySelector('[type="submit"]');
    var label = btn && btn.value;
    if (btn) { btn.disabled = true; if (btn.getAttribute("data-wait")) btn.value = btn.getAttribute("data-wait"); }

    var data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New " + formName(form) + " lead from robynsrealty.com");
    data.append("from_name", "Robyn's Realty website");
    data.append("Page", location.href);
    var email = form.querySelector('input[type="email"]');
    if (email && email.value) data.append("replyto", email.value);

    fetch("https://api.web3forms.com/submit", { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.success) throw new Error(res.message);
        form.style.display = "none";
        if (fail) fail.style.display = "none";
        if (done) done.style.display = "block";
      })
      .catch(function () {
        if (fail) fail.style.display = "block";
      })
      .then(function () {
        if (btn) { btn.disabled = false; btn.value = label; }
      });
  }, true);
})();
