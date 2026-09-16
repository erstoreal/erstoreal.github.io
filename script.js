const track = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const totalSlides = 3; // Jumlah asli slide (tanpa klon)
let slideInterval;

function updateDots(index) {
    let activeIndex = index % totalSlides;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

function moveToNextSlide() {
    currentIndex++;
    
    // Pastikan transisi CSS aktif dengan mulus
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    updateDots(currentIndex);

    // Jika sudah sampai di slide klon (index 3), tunggu sampai animasi gesernya 100% selesai, baru reset ke 0 tanpa kedip
    if (currentIndex === totalSlides) {
        setTimeout(() => {
            track.style.transition = "none"; // Matikan animasi seketika
            currentIndex = 0;
            track.style.transform = `translateX(0%)`;
            updateDots(0);
        }, 600); // Harus pas 600ms (sama dengan durasi 0.6s di atas)
    }
}

// Atur jeda waktu diam di tiap slide selama 4 detik, biar gambar sempat tampil penuh dan tidak ngebut
function startSlider() {
    slideInterval = setInterval(moveToNextSlide, 4000);
}

startSlider();

