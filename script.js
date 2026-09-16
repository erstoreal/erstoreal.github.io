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
    
    // Kecepatan 0.55s dengan ease-in-out (pas: tidak kelamaan, tidak kaget)
    track.style.transition = "transform 0.55s ease-in-out";
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    updateDots(currentIndex);

    // Reset instan saat sampai di slide klon ujung
    if (currentIndex === totalSlides) {
        setTimeout(() => {
            track.style.transition = "none";
            currentIndex = 0;
            track.style.transform = `translateX(0%)`;
            updateDots(0);
        }, 550); // Harus sinkron sama durasi 0.55s di atas (550 milidetik)
    }
}

// Jeda antar slide 3.5 detik biar pas
setInterval(nextSlide, 3500);

