window.addEventListener("load", () => {
	const track = document.getElementById("track");
	const speed = 0.8;
	let offset = 0;

	const computedStyle = window.getComputedStyle(track);
	const gap = parseFloat(computedStyle.columnGap || computedStyle.gap || 24);

	const slides = Array.from(track.children);
	slides.forEach((slide) => {
		const clone = slide.cloneNode(true);
		track.appendChild(clone);
	});

	const totalWidth = slides.reduce(
		(sum, slide) => sum + slide.offsetWidth + gap,
		0
	);

	function animate() {
		offset += speed;
		if (offset >= totalWidth) offset = 0;
		track.style.transform = `translateX(-${offset}px)`;
		requestAnimationFrame(animate);
	}

	animate();
});
