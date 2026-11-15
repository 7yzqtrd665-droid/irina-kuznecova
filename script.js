document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".request-card")];
  const hint = document.getElementById("selectionHint");
  const contactTopic = document.getElementById("contactTopic");
  const contactButton = document.getElementById("contactButton");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const baseTelegramUrl = "https://t.me/kuznetsova1239";

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const alreadySelected = card.getAttribute("aria-pressed") === "true";

      cards.forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-pressed", "false");
        const label = item.querySelector(".card-select");
        if (label) label.textContent = "Выбрать тему →";
      });

      if (alreadySelected) {
        if (hint) {
          hint.textContent = "Выбор темы необязателен — можно начать с того, что важно именно вам.";
        }
        if (contactTopic) {
          contactTopic.textContent = "Тема обращения не выбрана";
        }
        if (contactButton) {
          contactButton.href = baseTelegramUrl;
        }
        return;
      }

      const selectedTopic = card.dataset.topic || "";
      card.classList.add("is-selected");
      card.setAttribute("aria-pressed", "true");
      const label = card.querySelector(".card-select");
      if (label) label.textContent = "Тема выбрана ✓";

      if (hint) {
        hint.textContent = `Вы выбрали: «${selectedTopic}». Можно обсудить эту тему на первой встрече.`;
      }
      if (contactTopic) {
        contactTopic.textContent = `Тема обращения: ${selectedTopic}`;
      }
      if (contactButton) {
        contactButton.href = `${baseTelegramUrl}?text=${encodeURIComponent("Здравствуйте! Хотел(а) бы обсудить тему: " + selectedTopic)}`;
      }
    });
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      navMenu.classList.toggle("is-open", !open);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      });
    });
  }
});
