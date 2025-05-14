
  const translations = {
		EN: {
			title: "Welcome",
			desc: "Choose your preferred language",
		},
		HU: {
			title: "Üdvözlet",
			desc: "Válassza ki a kívánt nyelvet",
		},
		PT: {
			title: "Bem-vindo",
			desc: "Escolha o seu idioma preferido",
		},
		RU: {
			title: "Добро пожаловать",
			desc: "Выберите предпочитаемый язык",
		},
		CZ: {
			title: "Vítejte",
			desc: "Vyberte preferovaný jazyk",
		},
		"en-CA": {
			title: "Hoşgeldiniz",
			desc: "Tercih ettiğiniz dili seçin",
		},
	};

  const btn = document.getElementById("lang-btn");
  const dropdown = document.getElementById("lang-dropdown");
  const currentLang = document.getElementById("current-lang");

  const applyLanguage = (lang) => {
    if (!translations[lang]) return;
    document.getElementById("main-title").textContent = translations[lang].title;
    document.getElementById("main-desc").textContent = translations[lang].desc;
    currentLang.textContent = lang;
    localStorage.setItem("selectedLang", lang);
  };

  // Toggle dropdown
  btn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
    btn.classList.toggle("open");
  });

  // Handle selection
  dropdown.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang;
      applyLanguage(lang);
      dropdown.classList.add("hidden");
      btn.classList.remove("open");
    });
  });

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
      btn.classList.remove("open");
    }
  });

  // Load saved language
  window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLang") || "EN";
    applyLanguage(savedLang);
  });