const track = document.getElementById('sliderTrack');
const slides = track.children;
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const totalRealSlides = 3; // Jumlah asli slide (tanpa klon)

function nextSlide() {
    currentIndex++;
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dot indikator
    let activeDot = currentIndex % totalRealSlides;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeDot);
    });

    // Kalau sudah sampai di slide klon paling belakang (index 3)
    if (currentIndex === totalRealSlides) {
        setTimeout(() => {
            track.style.transition = "none"; // Matikan animasi biar gak kelihatan lompat
            currentIndex = 0;
            track.style.transform = `translateX(0%)`;
        }, 600); // Pas banget pas durasi animasi selesai
    }
}

// Jalankan otomatis tiap 3.5 detik
setInterval(nextSlide, 3500);

