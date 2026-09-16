const track = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const totalSlides = 3; // Jumlah asli slide

function updateDots(index) {
    let activeIndex = index % totalSlides;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

function nextSlide() {
    currentIndex++;
    
    // Gunakan transisi halus
    track.style.transition = "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    updateDots(currentIndex);

    // Begitu animasi geser ke slide klon selesai, langsung reset instan tanpa kedip
    if (currentIndex === totalSlides) {
        track.addEventListener('transitionend', function handler() {
            // Hapus event listener-nya supaya tidak menumpuk
            track.removeEventListener('transitionend', handler);
            
            // Matikan transisi seketika dan balikin ke index 0 (slide 1 asli)
            track.style.transition = "none";
            currentIndex = 0;
            track.style.transform = `translateX(0%)`;
            updateDots(0);
        }, { once: true });
    }
}

// Jalankan otomatis tiap 3.5 detik
setInterval(nextSlide, 3500);

