window.addEventListener("load", () => {
	const track = document.getElementById("track");
	const speed = 0.8;
	let offset = 0;

	// Клонуємо слайди для безперервного ефекту
	const slides = Array.from(track.children);
	slides.forEach((slide) => {
		const clone = slide.cloneNode(true);
		track.appendChild(clone);
	});

	// Розрахунок ширини контенту
	const totalWidth = slides.reduce(
		(sum, slide) => sum + slide.offsetWidth + 24,
		0
	); // 24px gap

	function animate() {
		offset += speed;
		if (offset >= totalWidth) offset = 0;
		track.style.transform = `translateX(-${offset}px)`;
		requestAnimationFrame(animate);
	}

	animate();
});
