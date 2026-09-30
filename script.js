/* ===== EDIT THESE TWO VALUES WHEN READY ===== */
const CONFIG = {
  PLAY_URL: "[GOOGLE_PLAY_URL]",   // e.g. https://play.google.com/store/apps/details?id=com.survival.flashlight
  EMAIL: "[SUPPORT_EMAIL]"         // e.g. support@example.com
};

(() => {
  const playReady = /^https?:\/\//.test(CONFIG.PLAY_URL);
  const emailReady = /@/.test(CONFIG.EMAIL) && !CONFIG.EMAIL.startsWith("[");

  // Google Play links: real link once set, otherwise fall back to the support section.
  document.querySelectorAll("[data-play]").forEach(a => {
    if (playReady) { a.href = CONFIG.PLAY_URL; a.target = "_blank"; a.rel = "noopener"; }
    else a.href = "#support";
  });
  // Support email
  document.querySelectorAll("[data-email]").forEach(a => {
    a.textContent = CONFIG.EMAIL;
    if (emailReady) a.href = "mailto:" + CONFIG.EMAIL;
  });

  // Mobile menu
  const btn = document.querySelector(".menu-btn"), nav = document.getElementById("menu");
  const setMenu = open => { nav.classList.toggle("open", open); btn.setAttribute("aria-expanded", open); };
  btn.addEventListener("click", () => setMenu(btn.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  // Highlight current section in nav
  const links = [...nav.querySelectorAll("a[href^='#']")];
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(l => { const s = document.querySelector(l.getAttribute("href")); if (s) io.observe(s); });
  }
})();
