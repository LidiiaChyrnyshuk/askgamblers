
  const translations = {
		EN: {
			title: "welcome BONUS",
			promoSubtext: "up to",
			promoCurrency: "7000 USDT",
			bonus: "+50 Free spins",
			deposit: "without deposit",
			btnRegistration: "Registration",
			titleBenefits: "Recommended by Askgamblers",
			benefitsTop: "TOP 10",
			benefitsBest: "Вest Сasino",
			benefitsYear: "2024",
			casinoRank: "Casino Rank",
			great: "Great",
			playerRating: "Player Rating",
			reviews: "817 reviews",
			gamesTitel: "Over 8000+ games",
			btnPlay: "Play",
		},
		HU: {
			title: "Üdvözlő bónusz",
			promoSubtext: "up to",
			promoCurrency: "2 800 000 HUF",
			bonus: "+ 50 ingyenes pörgetés",
			deposit: "befizetés nélkül",
			btnRegistration: "Regisztráció",
			titleBenefits: "Askgamblers ajánlásával",
			benefitsTop: "A 10",
			benefitsBest: "legjobb kaszinó",
			benefitsYear: "2024-ben",
			casinoRank: "Casino Rank",
			great: "Nagyszerű",
			playerRating: "Játékosértékelés",
			reviews: "817 értékelés",
			gamesTitel: "Több mint 8000 játék",
			btnPlay: "Játssz!",
		},
		PT: {
			title: "welcome BONUS",
			promoSubtext: "up to",
			promoCurrency: "7000 USDT",
			bonus: "+50 Free spins",
			deposit: "without deposit",
			btnRegistration: "Registration",
			titleBenefits: "Recommended by Askgamblers",
			benefitsTop: "TOP 10",
			benefitsBest: "Вest Сasino",
			benefitsYear: "",
			casinoRank: "Casino Rank",
			great: "Great",
			playerRating: "Player Rating",
			reviews: "817 reviews",
			gamesTitel: "Over 8000+ games",
			btnPlay: "Play",
		},
		RU: {
			title: "welcome BONUS",
			promoSubtext: "up to",
			promoCurrency: "7000 USDT",
			bonus: "+50 Free spins",
			deposit: "without deposit",
			btnRegistration: "Registration",
			titleBenefits: "Recommended by Askgamblers",
			benefitsTop: "TOP 10",
			benefitsBest: "Вest Сasino",
			benefitsYear: "",
			casinoRank: "Casino Rank",
			great: "Great",
			playerRating: "Player Rating",
			reviews: "817 reviews",
			gamesTitel: "Over 8000+ games",
			btnPlay: "Play",
		},
		CZ: {
			title: "welcome BONUS",
			promoSubtext: "up to",
			promoCurrency: "7000 USDT",
			bonus: "+50 Free spins",
			deposit: "without deposit",
			btnRegistration: "Registration",
			titleBenefits: "Recommended by Askgamblers",
			benefitsTop: "TOP 10",
			benefitsBest: "Вest Сasino",
			benefitsYear: "",
			casinoRank: "Casino Rank",
			great: "Great",
			playerRating: "Player Rating",
			reviews: "817 reviews",
			gamesTitel: "Over 8000+ games",
			btnPlay: "Play",
		},
		"en-CA": {
			title: "welcome BONUS",
			promoSubtext: "up to",
			promoCurrency: "7000 USDT",
			bonus: "+50 Free spins",
			deposit: "without deposit",
			btnRegistration: "Registration",
			titleBenefits: "Recommended by Askgamblers",
			benefitsTop: "TOP 10",
			benefitsBest: "Вest Сasino",
			benefitsYear: "",
			casinoRank: "Casino Rank",
			great: "Great",
			playerRating: "Player Rating",
			reviews: "817 reviews",
			gamesTitel: "Over 8000+ games",
			btnPlay: "Play",
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