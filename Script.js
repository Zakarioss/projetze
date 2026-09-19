const body = document.body;
const paletteButton = document.querySelector('.palette-toggle');
const colorArt = document.querySelector('.color-art');
const featureCards = document.querySelectorAll('.feature-card');
const themes = ['', 'sunset', 'mint'];
let themeIndex = 0;

paletteButton.addEventListener('click', () => {
	themeIndex = (themeIndex + 1) % themes.length;
	const theme = themes[themeIndex];

	if (theme) {
		body.dataset.theme = theme;
	} else {
		delete body.dataset.theme;
	}
});

if (window.matchMedia('(pointer: fine)').matches) {
	colorArt.addEventListener('pointermove', (event) => {
		const bounds = colorArt.getBoundingClientRect();
		const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
		const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
		colorArt.style.setProperty('--art-x', `${x}px`);
		colorArt.style.setProperty('--art-y', `${y}px`);
	});

	colorArt.addEventListener('pointerleave', () => {
		colorArt.style.setProperty('--art-x', '0px');
		colorArt.style.setProperty('--art-y', '0px');
	});
}

const cardObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		}
	});
}, { threshold: 0.2 });

featureCards.forEach((card, index) => {
	card.style.transitionDelay = `${index * 100}ms`;
	cardObserver.observe(card);
});
