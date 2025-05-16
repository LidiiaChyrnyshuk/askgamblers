const swiper1 = new Swiper(".swiper-1", {
	speed: 1000,
	loop: true,
	spaceBetween: 0,

	slidesPerView:3,
	autoplay: {
		delay: 2000,
	},
	breakpoints: {
		768: {
			slidesPerView: 8,
		},
		1024: {
			slidesPerView: 9,
			spaceBetween: 20,
		},
	},
});

const swiper2 = new Swiper(".swiper-2", {
	speed: 1000,
	loop: true,
	spaceBetween: 0,
	centeredSlides: true,
	slidesPerView: 1.5,
	autoplay: {
		delay: 5000,
	},
	breakpoints: {
		768: {
			slidesPerView: 3,
		},
		
	},
});

const swiper3 = new Swiper(".swiper-3", {
	speed: 1000,
	loop: true,
	spaceBetween: 0,
	slidesPerView: 1.5,
	/* centeredSlides: true, */
	grid: { rows: 2 },
	

});

const swiper4 = new Swiper(".swiper-4", {
	speed: 1000,
	loop: true,
	spaceBetween: 0,
	slidesPerView: 4,
	autoplay: {
		delay: 2000,
	},
	breakpoints: {
		768: {
			slidesPerView: 6,
		},
		
	},
});

const swiper5 = new Swiper(".swiper-5", {
	speed: 1000,
	loop: true,
	spaceBetween: 0,
	slidesPerView: 1.5,
	centeredSlides: true,
	autoplay: {
		delay: 2000,
	},
	breakpoints: {
		768: {
			slidesPerView: 2,
			spaceBetween: 16,
		},
		1024: {
			slidesPerView: 2.6,
			spaceBetween: 16,
		},
	},
});