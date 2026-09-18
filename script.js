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
   // Fungsi untuk memberikan efek pilih pada card produk
    function selectCard(element) {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => card.classList.remove('selected'));
        element.classList.add('selected');
    }

// Fungsi untuk membuka pop-up modal dengan deskripsi produk
function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBodyContent');
    
    let namaProduk = "";
    let deskripsiProduk = "";

    // Memilih deskripsi berdasarkan produk
    if (productId === 1) {
        namaProduk = "Advance Server Lev 3 | 1s";
        deskripsiProduk = "Login via Moonton, untuk change email / cara ganti email bisa kalian akses lewat website mail.tm/en/. ( Support android only )";
    } else if (productId === 2) {
        namaProduk = "Advance Server Lev 3 | 5s";
        deskripsiProduk = "Kalian akan dapat 1 akun dengan isi 5 server di dalamnya. Login via Moonton, untuk change email / cara ganti email bisa kalian akses lewat website mail.tm/en/. ( Support android only )";
    }

    // Memasukkan ke dalam modal (tanpa harga)
    modalBody.innerHTML = `
        <div style="margin-bottom: 12px;">
            <strong style="color: #f3f4f6; display: block; font-size: 15px; margin-bottom: 4px;">${namaProduk}</strong>
        </div>
        <p style="color: #c9d1d9; font-size: 13px; line-height: 1.6; margin: 0;">${deskripsiProduk}</p>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup pop-up modal dan membuka kunci layar
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
