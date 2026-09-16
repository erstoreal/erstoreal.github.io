const track = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const totalSlides = 3; // Jumlah asli slide (tanpa klon)
let isAnimating = false;

function updateDots(index) {
    let activeIndex = index % totalSlides;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

function nextSlide() {
    if (isAnimating) return; // Cegah tombol/timer numpuk pas lagi transisi
    isAnimating = true;

    currentIndex++;
    
    track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    updateDots(currentIndex);

    // Cek kalau udah nyampe di slide klon ujung
    if (currentIndex === totalSlides) {
        // Tunggu pas banget animasi gesernya selesai
        setTimeout(() => {
            track.style.transition = "none"; // Matikan animasi biar ga kelihatan lompat
            currentIndex = 0;
            track.style.transform = `translateX(0%)`;
            updateDots(0);
            isAnimating = false;
        }, 600); // Harus sinkron dengan 0.6s di atas
    } else {
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
}

// Eksekusi otomatis tiap 4 detik (aman, nunggu selesai dulu baru jalan lagi)
setInterval(nextSlide, 4000);

