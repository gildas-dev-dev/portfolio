/* ============================================================
   MAIN.JS — Interactions du portfolio
   Navigation, apparitions au scroll, machine à écrire
   Vanilla JS, aucune dépendance.
   ============================================================ */

(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const burger = document.querySelector(".nav-burger");
  const navLinks = document.querySelector(".nav-links");
  const toTop = document.querySelector("#to-top");
  const yearEl = document.querySelector("#year");

  /* ---------- Année automatique dans le footer ---------- */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header : état "scrollé" ---------- */
  function onScroll() {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle("is-scrolled", scrolled);
    toTop?.classList.toggle("is-visible", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile (burger) ---------- */
  function closeMenu() {
    burger?.classList.remove("is-open");
    navLinks?.classList.remove("is-open");
    burger?.setAttribute("aria-expanded", "false");
  }

  burger?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(Boolean(open)));
  });

  // Ferme le menu après un clic sur un lien
  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Ferme au clic en dehors
  document.addEventListener("click", (event) => {
    if (!navLinks?.contains(event.target) && !burger?.contains(event.target)) {
      closeMenu();
    }
  });

  // Ferme avec Échap
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  /* ---------- Apparition des éléments au scroll ---------- */
  const revealables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // une seule fois suffit
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    revealables.forEach((el) => observer.observe(el));
  } else {
    // Repli sans support : tout afficher directement
    revealables.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Lien de navigation actif selon la section visible ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navAnchors.forEach((a) => {
              a.classList.toggle(
                "is-active",
                a.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" } // la section qui traverse le milieu de l'écran
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Machine à écrire du hero ---------- */
  const typeTarget = document.querySelector("#typewriter");

  if (typeTarget) {
    const roles = [
      "Développeur Frontend Angular",
      "Contrôle Qualité logiciel",
      "Tests d'API & anomalies",
      "Vers le Full Stack & le mobile 🚀",
      "GICETECHA — tech × agropastoral 🌱",
    ];

    const TYPE_SPEED = 55; // ms par caractère
    const ERASE_SPEED = 30;
    const HOLD_TIME = 2200; // pause une fois la phrase affichée

    let roleIndex = 0;
    let charIndex = 0;
    let erasing = false;

    function tick() {
      const current = roles[roleIndex];

      if (!erasing) {
        charIndex++;
        typeTarget.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          erasing = true;
          setTimeout(tick, HOLD_TIME);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        typeTarget.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          erasing = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(tick, ERASE_SPEED);
      }
    }

    // Ne démarre que lorsque le hero est visible
    setTimeout(tick, 400);
  }

  /* ---------- Formulaire de contact : envoi sans quitter la page ----------
     Le formulaire reste un POST Netlify natif (data-netlify) : sans JavaScript,
     il part normalement vers /merci.html. Avec JavaScript, on l'envoie en
     arrière-plan et on affiche la confirmation directement dans la page. */
  const contactForm = document.querySelector(".contact-form");
  const formStatus = document.querySelector(".contact-form .form-status");

  function showFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = "form-status is-visible form-status--" + type;
  }

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitBtn = contactForm.querySelector(".form-submit");
      const initialLabel = submitBtn ? submitBtn.textContent : "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Envoi en cours…";
      }

      // `form-name` est injecté par Netlify au déploiement : il est donc déjà
      // présent dans le FormData au moment de l'envoi.
      const body = new URLSearchParams(new FormData(contactForm)).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      })
        .then(function (response) {
          if (!response.ok) throw new Error("HTTP " + response.status);
          contactForm.reset();
          showFormStatus(
            "Merci ! Votre message est bien arrivé — je réponds sous 24 à 48 h.",
            "success"
          );
        })
        .catch(function () {
          showFormStatus(
            "L'envoi a échoué. Écrivez-moi directement : mebadandzielouisgildas@gmail.com",
            "error"
          );
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = initialLabel;
          }
        });
    });
  }
})();
