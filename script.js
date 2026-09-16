const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let slideInterval;

function updateSlider(index) {
    // Memastikan index berputar melingkar ke depan secara terus-menerus (0 -> 1 -> 2 -> 0 -> dst)
    currentIndex = (index + slides.length) % slides.length;

    // Menggeser track ke kiri (yang menyebabkan visual banner bergeser ke kanan/maju terus)
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Memperbarui titik indikator (dots) yang aktif
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    updateSlider(currentIndex + 1); // Selalu bertambah maju ke depan
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 3500); // Geser otomatis tiap 3.5 detik
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Mulai slider otomatis saat halaman dimuat
startAutoSlide();

// Fungsi jika titik (dot) diklik manual
function currentSlide(index) {
    updateSlider(index);
    stopAutoSlide();
    startAutoSlide();
}

