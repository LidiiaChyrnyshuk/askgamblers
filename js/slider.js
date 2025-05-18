const swiper1 = new Swiper(".swiper-1", {
	speed: 1000,
	loop: true,
	spaceBetween: 10,
	freeMode: true,
	slidesPerView: 4,
	freeModeMomentum: false,
	autoplay: {
		delay: 0,
		disableOnInteraction: false,
	},
	breakpoints: {
		768: {
			slidesPerView: 8.5,
			spaceBetween: 32,
		},
		1024: {
			slidesPerView: 11,
			spaceBetween: 20,
		},
	},
});


const swiper3 = new Swiper(".swiper-3", {
	speed: 1000,
	loop: true,
	spaceBetween: 0,
	slidesPerView: 1.5,
	centeredSlides: true,
	grabCursor: true, // показує "лапку" при наведенні
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