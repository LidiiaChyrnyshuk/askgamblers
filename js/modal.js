import {
	getGlobalParams,
	sendRegistration,
	redirectToAuth,
	getApiConfiguration,
	DOMAIN_NOT_DEFINED,
	UNDEFINED_ERROR,
} from "./global-params-utils";

let notyf;

const refs = {
	openBtns: document.querySelectorAll("[data-modal-open]"),
	closeBtn: document.querySelector("[data-modal-close]"),
	backdrop: document.querySelector("[data-modal]"),
	form: document.getElementById("registrationForm"),
	email: document.querySelector("input[name='email']"),
	password: document.querySelector("input[name='password']"),
	checkbox: document.querySelector("input[name='terms']"),
	submitBtn: document.querySelector("form button[type='submit']"),
};

let startY = 0;

function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function validatePassword(password) {
	return password.length >= 6 && /\d/.test(password) && /[A-Z]/.test(password);
}

function validateField(input, validator) {
	const value = input.value.trim();
	const valid = validator(value);
	input.classList.toggle("valid", valid);
	input.classList.toggle("invalid", !valid);
	return valid;
}

function validateForm() {
	const emailValid = validateField(refs.email, validateEmail);
	const passValid = validateField(refs.password, validatePassword);
	const isChecked = refs.checkbox.checked;
	const captchaValue = document
		.querySelector("textarea[name='g-recaptcha-response']")
		?.value.trim();
	const captchaValid = captchaValue?.length > 0;

	refs.submitBtn.disabled = !(
		emailValid &&
		passValid &&
		isChecked &&
		captchaValid
	);
}

function clearForm() {
	refs.email.value = "";
	refs.password.value = "";
	refs.checkbox.checked = false;
	refs.email.classList.remove("valid", "invalid");
	refs.password.classList.remove("valid", "invalid");
	refs.submitBtn.disabled = true;
	if (window.grecaptcha) grecaptcha.reset();
}

function openModal() {
	refs.backdrop.classList.remove("is-hidden");
	document.body.style.overflow = "hidden";
	window.history.pushState({ modalOpen: true }, "");
}

function closeModal() {
	refs.backdrop.classList.add("is-hidden");
	document.body.style.overflow = "";
	clearForm();
	if (window.history.state?.modalOpen) window.history.back();
}

function handleEscClose(event) {
	if (event.key === "Escape" || event.target === refs.backdrop) closeModal();
}

function onTouchStart(e) {
	startY = e.touches[0].clientY;
}

function onTouchMove(e) {
	const delta = e.touches[0].clientY - startY;
	if (delta > 100) closeModal();
}

function renderCaptcha(siteKey) {
	if (!window.grecaptcha) {
		notyf.error("reCAPTCHA script not loaded");
		return;
	}

	const container = document.getElementById("captcha-container");
	if (!container) {
		notyf.error("Captcha container not found");
		return;
	}
	container.innerHTML = "";

	window.grecaptcha.render(container, {
		sitekey: siteKey,
		theme: "light",
		size: "normal",
	});
}

function loadRecaptchaScript(lang = "en") {
	return new Promise((resolve, reject) => {
		if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
			resolve();
			return;
		}

		if (document.querySelector('script[src*="google.com/recaptcha/api.js"]')) {
			const interval = setInterval(() => {
				if (
					window.grecaptcha &&
					typeof window.grecaptcha.render === "function"
				) {
					clearInterval(interval);
					resolve();
				}
			}, 100);

			setTimeout(() => {
				clearInterval(interval);
				reject(new Error("Timeout waiting for grecaptcha"));
			}, 10000);

			return;
		}

		const script = document.createElement("script");
		script.src = `https://www.google.com/recaptcha/api.js?hl=${lang}`;
		script.async = true;
		script.defer = true;
		script.onload = () => {
			const interval = setInterval(() => {
				if (
					window.grecaptcha &&
					typeof window.grecaptcha.render === "function"
				) {
					clearInterval(interval);
					resolve();
				}
			}, 100);

			setTimeout(() => {
				clearInterval(interval);
				reject(new Error("Timeout waiting for grecaptcha"));
			}, 10000);
		};
		script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"));

		document.head.appendChild(script);
	});
}

async function initCaptcha() {
	const lang = (navigator.language.split("-")[0] || "en").toLowerCase();

	try {
		const config = await getApiConfiguration();
		const siteKey = config?.siteKey;
		if (!siteKey) throw new Error("Sitekey not found");

		await loadRecaptchaScript(lang);
		renderCaptcha(siteKey);
	} catch (error) {
		notyf.error("Captcha init error:", error);
	}
}

async function submitForm(e) {
	e.preventDefault();
	if (refs.submitBtn.disabled) return;

	const email = refs.email.value.trim();
	const password = refs.password.value.trim();
	const captcha = document
		.querySelector("textarea[name='g-recaptcha-response']")
		?.value.trim();

	if (!email || !password || !captcha) {
		notyf.error("Please fill in all fields and pass the captcha.");
		return;
	}

	try {
		const token = await sendRegistration({ email, password, captcha });
		redirectToAuth(token);
	} catch (errors) {
		if (Array.isArray(errors)) {
			notyf.error(errors?.[0] || "Registration error.");
		} else {
			notyf.error("Something went wrong.");
		}
	}
}

function setupEvents() {
	refs.openBtns.forEach((btn) => btn.addEventListener("click", openModal));
	refs.closeBtn.addEventListener("click", closeModal);
	document.addEventListener("keydown", handleEscClose);
	document.addEventListener("click", handleEscClose);
	refs.email.addEventListener("input", validateForm);
	refs.password.addEventListener("input", validateForm);
	refs.checkbox.addEventListener("change", validateForm);
	refs.form.addEventListener("touchstart", onTouchStart);
	refs.form.addEventListener("touchmove", onTouchMove);
	refs.form.addEventListener("submit", submitForm);
	window.addEventListener(
		"popstate",
		() => !refs.backdrop.classList.contains("is-hidden") && closeModal()
	);
}

document.addEventListener("DOMContentLoaded", () => {
	notyf = new Notyf({ duration: 2000, position: { x: "center", y: "top" } });
	setupEvents();
	initCaptcha();
});
