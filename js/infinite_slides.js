
document.addEventListener("DOMContentLoaded", () => {
	const track = document.querySelector(".infinite-track");
	if (!track) return;

	const slides = Array.from(track.children);
  console.log("Кількість оригінальних слайдів:", slides.length);
	// Якщо ще не клонували — дублюємо
	if (!track.dataset.cloned) {
		slides.forEach((slide) => {
			const clone = slide.cloneNode(true);
			clone.dataset.clone = "true";
			track.appendChild(clone);
		});
		track.dataset.cloned = "true";
  }
  
  console.log("Загальна кількість після клонування:", track.children.length);
});