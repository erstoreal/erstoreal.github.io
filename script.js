const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let slideInterval;

function updateSlider(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(currentIndex);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

startAutoSlide();

let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    stopAutoSlide();
}, {passive: true});

track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
    startAutoSlide();
}, {passive: true});

function handleSwipe() {
    let threshold = 50;
    if (touchStartX - touchEndX > threshold) {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    } else if (touchEndX - touchStartX > threshold) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(currentIndex);
    }
}

function currentSlide(index) {
    currentIndex = index;
    updateSlider(currentIndex);
    stopAutoSlide();
    startAutoSlide();
}

