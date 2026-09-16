const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let slideInterval;

function updateSlider(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    updateSlider(currentIndex + 1);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 3500); // Geser otomatis tiap 3.5 detik
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Jalankan otomatis saat halaman dibuka
startAutoSlide();

// Fungsi ketika titik (dot) diklik manual
function currentSlide(index) {
    updateSlider(index);
    stopAutoSlide();
    startAutoSlide();
}

