"use strict";

// Mobile navigation menu
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Buka menu navigasi");
    mainNav.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Buka menu navigasi" : "Tutup menu navigasi");
    mainNav.classList.toggle("is-open", !isOpen);
  });

  // Close the mobile menu after a navigation link is selected.
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Return to the standard navigation state when the viewport becomes wide.
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 761px)").matches) closeMenu();
  });

  // Close the menu with Escape for keyboard users.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

// Keep the footer year up to date automatically.
const currentYear = String(new Date().getFullYear());
document.querySelectorAll(".current-year").forEach((element) => {
  element.textContent = currentYear;
});

// Smoothly reveal a friendly visual response when a same-page anchor is used.
// Native anchor navigation remains available if JavaScript is disabled.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (window.history && window.history.replaceState) window.history.replaceState(null, "", targetId);
    }
  });
});
