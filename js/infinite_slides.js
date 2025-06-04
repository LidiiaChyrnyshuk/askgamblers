document.addEventListener("DOMContentLoaded", () => {
	const track = document.getElementById("infiniteTrack");
	const slider = document.querySelector(".infinite-slider");
	const speed = 0.8; // пікселів за кадр
	let offset = 0;

	// 1. Клонуємо вміст 3 рази для безперервності
	const originalSlides = Array.from(track.children);
	for (let i = 0; i < 3; i++) {
		originalSlides.forEach((slide) => {
			const clone = slide.cloneNode(true);
			track.appendChild(clone);
		});
	}

	// 2. Анімація
	function animate() {
		offset += speed;
		track.style.transform = `translateX(-${offset}px)`;

		if (offset >= track.scrollWidth / 3) {
			// Скидаємо, не видно бо дублікати є
			offset = 0;
			track.style.transform = `translateX(0)`;
		}

		requestAnimationFrame(animate);
	}

	animate();
});
