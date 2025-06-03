
  const translations = {
		EN: {
			title: "welcome BONUS",
			promoSubtext: "up to",
			promoCurrency: "7000 USDT",
			modalPromoCurrency: "7000 USDT",
			bonus: "+ 50 Free spins",
			modalBonus: "+ 50 Free spins",
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
			checkbox:
				"By ticking this box to register for this website, the user declares to be over 18 years old and to have read, understood and accepted",
			terms: "the Terms and Conditions",
			modalBtn: "Create an account",
		},
		HU: {
			title: "Üdvözlő bónusz",
			promoSubtext: "up to",
			modalPromoSubtext: "up to",
			percent: "350%",
			modalPercent: "350%",
			promoCurrency: "2 800 000 HUF",
			modalPromoCurrency: "2 800 000 HUF",
			bonus: "+ 50 ingyenes pörgetés",
			modalBonus: "+ 50 ingyenes pörgetés",
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
			checkbox:
				"A jelölőnégyzet kipipálásával a felhasználó kijelenti, hogy elmúlt 18 éves, és elolvasta, megértette és elfogadta",
			terms: "a Felhasználási feltételeket",
			modalBtn: "Fiók létrehozása",
		},
		PT: {
			title: "Bónus de boas-vindas",
			promoSubtext: "up to",
			promoCurrency: "6 800 EUR",
			modalPromoCurrency: "6 800 EUR",
			bonus: "+ 50 rodadas grátis",
			modalBonus: "+ 50 rodadas grátis",
			deposit: "sem depósito",
			btnRegistration: "Regista-te",
			titleBenefits: "Recomendado por Askgamblers",
			benefitsTop: "TOP 10",
			benefitsBest: "melhores casinos",
			benefitsYear: "de 2024",
			casinoRank: "Casino Rank",
			great: "Ótimo",
			playerRating: "Classificação do jogador",
			reviews: "817 avaliações",
			gamesTitel: "Mais de 8 000 jogos",
			btnPlay: "Joga",
			checkbox:
				"Ao marcar esta caixa para se registar neste site, o utilizador declara ser maior de 18 anos e ter lido, compreendido e aceite",
			terms: "os Termos e Condições",
			modalBtn: "Criar uma conta",
		},
		RU: {
			title: "welcome BONUS",
			promoSubtext: "up to",
			promoCurrency: "700 000 RUB",
			modalPromoCurrency: "700 000 RUB",
			bonus: "+ 50 фриспинов",
			modalBonus: "+ 50 фриспинов",
			deposit: "без депозита",
			btnRegistration: "Регистрация",
			titleBenefits: "Askgamblers рекомендует",
			benefitsTop: "ТОП 10",
			benefitsBest: "лучших казино",
			benefitsYear: "2024",
			casinoRank: "Casino Rank",
			great: "Отлично",
			playerRating: " Рейтинг игроков",
			reviews: "817 отзывов",
			gamesTitel: "Более 8000+ игр",
			btnPlay: "Играть",
			checkbox:
				"Ставя галочку в этом поле для регистрации на сайте, пользователь подтверждает, что ему больше 18 лет, и что он прочитал, понял и принял",
			terms: "Условия и положения",
			modalBtn: "Cоздать акаунт",
		},
		CZ: {
			title: "Uvítací bonus",
			promoSubtext: "up to",
			promoCurrency: "6 800 EUR",
			modalPromoCurrency: "6 800 EUR",
			bonus: "+ 50 roztočení zdarma",
			modalBonus: "+ 50 roztočení zdarma",
			deposit: "bez vkladu",
			btnRegistration: "Registrovat",
			titleBenefits: "Doporučeno Askgamblers",
			benefitsTop: "TOP 10",
			benefitsBest: "nejlepších kasin",
			benefitsYear: "2024",
			casinoRank: "Casino Rank",
			great: "Skvělé",
			playerRating: "Hodnocení hráčů",
			reviews: "817 recenzí",
			gamesTitel: "Více než 8 000 her",
			btnPlay: "Hrát",
			checkbox:
				"Zaškrtnutím tohoto políčka pro registraci na webu uživatel potvrzuje, že je mu více než 18 let, a že si přečetl, pochopil a přijal",
			terms: "Podmínky použití",
			modalBtn: "Vytvořit účet",
		},
		CA: {
			title: "welcome BONUS",
			promoSubtext: "up to",
			promoCurrency: "10 000 CAD",
			modalPromoCurrency: "10 000 CAD",
			bonus: "+50 Free spins",
			modalBonus: "+ 50 Free spins",
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
			checkbox:
				"By ticking this box to register for this website, the user declares to be over 18 years old and to have read, understood and accepted",
			terms: "the Terms and Conditions",
			modalBtn: "Create an account",
		},
	};

  const btn = document.getElementById("lang-btn");
	const dropdown = document.getElementById("lang-dropdown");
	const currentLang = document.getElementById("current-lang");

	const fallbackLang = "EN";

	const applyLanguage = (lang) => {
		if (!translations[lang]) return;

		document.body.className = `lang-${lang}`;

		document.querySelectorAll("[data-translate]").forEach((el) => {
			const key = el.dataset.translate;
			const fallbackLang = "EN";
			const translation =
				translations[lang][key] ?? translations[fallbackLang][key];

			if (translation !== undefined) {
				el.textContent = translation;
			}
		});

		currentLang.textContent = lang;
		localStorage.setItem("selectedLang", lang);

		// Активна мова — підсвітка
		document.querySelectorAll("#lang-dropdown li").forEach((li) => {
			if (li.dataset.lang === lang) {
				li.classList.add("active");
			} else {
				li.classList.remove("active");
			}
		});
	};

	// Відкриття / закриття списку мов
	btn.addEventListener("click", () => {
		dropdown.classList.toggle("hidden");
		btn.classList.toggle("open");
	});

	// Обробка кліку по мові
	dropdown.querySelectorAll("li").forEach((item) => {
		item.addEventListener("click", () => {
			const lang = item.dataset.lang;
			applyLanguage(lang);
			dropdown.classList.add("hidden");
			btn.classList.remove("open");
		});
	});

	// Закриття випадаючого списку при кліку поза ним
	document.addEventListener("click", (e) => {
		if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
			dropdown.classList.add("hidden");
			btn.classList.remove("open");
		}
	});

	// Завантаження мови при відкритті сторінки
	window.addEventListener("DOMContentLoaded", () => {
		const savedLang = localStorage.getItem("selectedLang") || "EN";
		applyLanguage(savedLang);
	});

	