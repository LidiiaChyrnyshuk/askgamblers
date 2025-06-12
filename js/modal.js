let notyf;

const refsModal = {
	openModalBtns: document.querySelectorAll("[data-modal-open]"),
	closeModalBtn: document.querySelector("[data-modal-close]"),
	backdrop: document.querySelector("[data-modal]"),
	form: document.getElementById("registrationForm"),
	emailInput: document.querySelector("input[name='email']"),
	passwordInput: document.querySelector("input[name='password']"),
	checkbox: document.querySelector("input[name='terms']"),
	submitBtn: document.querySelector("form button[type='submit']"),
};

let startY;

// --- Валідація ---
function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function validatePassword(password) {
	const hasMinLength = password.length >= 6;
	const hasDigit = /\d/.test(password);
	const hasUppercase = /[A-Z]/.test(password);
	return hasMinLength && hasDigit && hasUppercase;
}

function validateField(input, validationFn) {
	const isValid = validationFn(input.value.trim());
	if (input.value.trim() === "") {
		input.classList.remove("valid", "invalid");
	} else {
		input.classList.toggle("valid", isValid);
		input.classList.toggle("invalid", !isValid);
	}
	return isValid;
}

function validateForm() {
	const emailValid = validateField(refsModal.emailInput, validateEmail);
	const passwordValid = validateField(
		refsModal.passwordInput,
		validatePassword
	);
	const isChecked = refsModal.checkbox.checked;

	const captchaResponse = document.querySelector(
		"textarea[name='g-recaptcha-response']"
	);
	const captchaReady = captchaResponse && captchaResponse.value.trim() !== "";

	if (emailValid && passwordValid && isChecked && captchaReady) {
		enableButton();
	} else {
		disableButton();
	}
}

function clearForm() {
	refsModal.emailInput.value = "";
	refsModal.passwordInput.value = "";
	refsModal.emailInput.classList.remove("valid", "invalid");
	refsModal.passwordInput.classList.remove("valid", "invalid");
	refsModal.checkbox.checked = false;
	if (window.grecaptcha) {
		grecaptcha.reset();
	}
	disableButton();
}

function disableButton() {
	refsModal.submitBtn.disabled = true;
	refsModal.submitBtn.style.cursor = "not-allowed";
	refsModal.submitBtn.style.opacity = "0.6";
}

function enableButton() {
	refsModal.submitBtn.disabled = false;
	refsModal.submitBtn.style.cursor = "pointer";
	refsModal.submitBtn.style.opacity = "1";
}

// --- Обробники модалки ---
function handleOpenModal() {
	refsModal.backdrop.classList.remove("is-hidden");
	document.body.style.overflow = "hidden";
	window.history.pushState({ modalOpen: true }, "");
}

function handleCloseModal() {
	document.body.style.overflow = "";
	refsModal.backdrop.classList.add("is-hidden");
	clearForm();
	if (window.history.state && window.history.state.modalOpen) {
		window.history.back();
	}
}

function handleEscCloseModal(event) {
	if (
		event.target === refsModal.backdrop ||
		(event.type === "keydown" && event.key === "Escape")
	) {
		handleCloseModal();
	}
}

function handleTouchStart(event) {
	startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
	let deltaY = event.touches[0].clientY - startY;
	if (deltaY > 100) {
		handleCloseModal();
	}
}

function handleBackButton() {
	if (!refsModal.backdrop.classList.contains("is-hidden")) {
		handleCloseModal();
	}
}

// --- Статичний sitekey ---
const CAPTCHA_SITEKEY = "6LeXRK8oAAAAAFKKWxQjbXx3zlYEePOQN-0lm50i";

// --- Завантаження reCAPTCHA ---
function loadRecaptchaScript(lang = "en", callbackName = "onRecaptchaLoaded") {
	return new Promise((resolve, reject) => {
		if (window.grecaptcha) {
			resolve();
			return;
		}
		window[callbackName] = () => {
			resolve();
			delete window[callbackName];
		};

		const script = document.createElement("script");
		script.src = `https://www.google.com/recaptcha/api.js?hl=${lang}&onload=${callbackName}&render=explicit`;
		script.async = true;
		script.defer = true;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}

function renderCaptcha(sitekey) {
	grecaptcha.render("captcha-container", {
		sitekey: sitekey,
		callback: () => {
			window.onCaptchaCompleted();
		},
		"expired-callback": () => {
			window.onCaptchaCompleted();
		},
	});
}

window.onCaptchaCompleted = function () {
	validateForm();
};

// --- Відправка форми ---
async function submitRegistration(event) {
	event.preventDefault();
	if (refsModal.submitBtn.disabled) return;

	const email = refsModal.emailInput.value.trim();
	const password = refsModal.passwordInput.value.trim();
	const captchaResponseEl = document.querySelector(
		"textarea[name='g-recaptcha-response']"
	);
	const captchaResponse = captchaResponseEl
		? captchaResponseEl.value.trim()
		: "";

	if (!email || !password || !captchaResponse) {
		notyf.error("Будь ласка, заповніть усі поля і пройдіть капчу.");
		return;
	}

	const data = {
		email,
		password,
		language: "ru",
		partnerId: null,
		trackId: null,
		param1: null,
		param2: null,
		param3: null,
		param4: null,
		captchaResponse,
	};

	try {
		const response = await fetch(
			`https://weiss.bet/api/v3/auth/register/partners?captcha-response=${captchaResponse}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);

		const responseData = await response.json();

		if ("playerToken" in responseData) {
			clearForm();
			if (window.grecaptcha) grecaptcha.reset();
			window.location.href = `https://weiss.bet/api/v3/auth/partners-player-entry?playerToken=${responseData.playerToken}&deeplink=%2F`;
		} else if ("errors" in responseData) {
			console.error("Помилки при реєстрації:", responseData.errors);
			notyf.error(
				responseData.errors?.[0]?.message ||
					"Помилка реєстрації. Спробуйте пізніше."
			);
		} else {
			throw new Error("Невідома відповідь сервера.");
		}
	} catch (error) {
		console.error("❌ Помилка при запиті:", error);
		notyf.error("Щось пішло не так! Спробуйте знову.");
	}
}

// --- Ініціалізація і підключення подій ---
function initModalEvents() {
	refsModal.openModalBtns.forEach((btn) =>
		btn.addEventListener("click", handleOpenModal)
	);
	refsModal.closeModalBtn.addEventListener("click", handleCloseModal);
	document.addEventListener("keydown", handleEscCloseModal);
	document.addEventListener("click", handleEscCloseModal);
	refsModal.emailInput.addEventListener("input", validateForm);
	refsModal.passwordInput.addEventListener("input", validateForm);
	refsModal.checkbox.addEventListener("change", validateForm);
	refsModal.form.addEventListener("touchstart", handleTouchStart);
	refsModal.form.addEventListener("touchmove", handleTouchMove);
	refsModal.form.addEventListener("submit", submitRegistration);
	window.addEventListener("popstate", handleBackButton);

	disableButton();
}

document.addEventListener("DOMContentLoaded", async () => {
	notyf = new Notyf({
		duration: 2000,
		position: { x: "center", y: "top" },
	});

	const supportedLangs = ["ru", "en", "hu", "cs", "pt"];
	let lang = navigator.language.split("-")[0].toLowerCase();
	if (!supportedLangs.includes(lang)) lang = "en";

	try {
		await loadRecaptchaScript(lang);
		console.log("⚙️ Rendering captcha with key:", CAPTCHA_SITEKEY);
		renderCaptcha(CAPTCHA_SITEKEY);
	} catch {
		notyf.error("Error loading captcha");
	}

	initModalEvents();
});
