const track = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const totalSlides = 3; // Jumlah asli slide (tidak termasuk klon)

function updateDots(index) {
    let activeIndex = index % totalSlides;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

function nextSlide() {
    currentIndex++;
    
    // Geser mulus pakai CSS transition
    track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    updateDots(currentIndex);

    // Kalau sudah menyentuh slide klon di paling ujung (index 3)
    if (currentIndex === totalSlides) {
        setTimeout(() => {
            // Matikan transisi seketika, lalu kembalikan ke index 0 secara instan tanpa animasi
            track.style.transition = "none";
            currentIndex = 0;
            track.style.transform = `translateX(0%)`;
            updateDots(0);
        }, 600); // Harus pas 600ms sama durasi CSS transition di atas
    }
}

// Jalankan pergeseran otomatis tiap 3.5 detik
let slideInterval = setInterval(nextSlide, 3500);

// Reset interval kalau disentuh atau diklik biar tidak nabrak
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3500);
}

function switchTab(tabName) {
    const buttons = document.querySelectorAll('.sub-tab-btn');
    const panes = document.querySelectorAll('.tab-pane');

    buttons.forEach(btn => btn.classList.remove('active'));
    panes.forEach(pane => pane.classList.remove('active'));

    if (tabName === 'products') {
        buttons[0].classList.add('active');
        document.getElementById('products-content').classList.add('active');
    } else if (tabName === 'guide') {
        buttons[1].classList.add('active');
        document.getElementById('guide-content').classList.add('active');
    }
}
function switchBottomNav(element, menuName) {
    const items = document.querySelectorAll('.bottom-nav-item');
    items.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    console.log("Menu dipilih: " + menuName);
}
