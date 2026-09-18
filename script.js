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
        deskripsiProduk = "Login via Moonton, untuk change email / cara ganti email bisa kalian akses lewat website <b>mail.tm</b>.";
    } else if (productId === 2) {
        namaProduk = "Advance Server Lev 3 | 5s";
        deskripsiProduk = "Kalian akan dapat 1 akun dengan isi 5 server di dalamnya. Login via Moonton, untuk change email / cara ganti email bisa kalian akses lewat website <b>mail.tm</b>.";
    }

    // Memasukkan ke dalam modal (tanpa harga)
    modalBody.innerHTML = `
        <div style="margin-bottom: 12px;">
            <strong style="color: #f3f4f6; display: block; font-size: 15px; margin-bottom: 4px;">${namaProduk}</strong>
        </div>
        <p style="color: #8b949e; font-size: 13px; line-height: 1.6; margin: 0;">${deskripsiProduk}</p>
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

// Fungsi untuk membuka dan menutup dropdown metode pembayaran
function togglePaymentDropdown() {
    const list = document.getElementById('paymentOptionsList');
    if (list.style.display === 'none' || list.style.display === '') {
        list.style.display = 'block';
        setTimeout(() => {
            list.style.opacity = '1';
            list.style.transform = 'translateY(0)';
        }, 10);
    } else {
        list.style.opacity = '0';
        list.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            list.style.display = 'none';
        }, 250);
    }
}

// 1. Fungsi saat produk diklik di katalog (Memunculkan ringkasan & geser halus ke form)
function selectProduct(productName, productServer, productPrice, productImage) {
    const container = document.getElementById('selectedProductCardContainer');
    document.getElementById('summaryProductName').innerText = productName;
    document.getElementById('summaryProductServer').innerText = "Server: " + productServer;
    document.getElementById('summaryProductPrice').innerText = productPrice;
    document.getElementById('summaryProductImg').src = productImage;

    // Tampilkan kotak produk pilihan
    container.style.display = 'block';

    // Efek scrolling halus otomatis menuju ke form pembayaran
    document.getElementById('formCheckoutCard').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// 2. Tombol Silang untuk menyembunyikan kembali produk pilihan
function removeSelectedProduct() {
    document.getElementById('selectedProductCardContainer').style.display = 'none';
}

// 3. Fungsi Buka/Tutup Dropdown Metode Pembayaran + Geser halus ke area pembayaran
function togglePaymentDropdown() {
    const optionsList = document.getElementById('paymentOptionsList');
    
    if (optionsList.style.display === 'none' || optionsList.style.display === '') {
        optionsList.style.display = 'block';
        
        // Geser halus otomatis ke area metode pembayaran agar terlihat jelas
        document.getElementById('paymentSection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    } else {
        optionsList.style.display = 'none';
    }
}

// 4. Fungsi ketika salah satu metode pembayaran dipilih
function selectPayment(methodName, element) {
    document.getElementById('selectedPaymentText').innerText = methodName;
    document.getElementById('selectedPaymentText').style.color = '#f3f4f6';

    // Reset semua ikon lingkaran kembali abu-abu
    const allCircles = document.querySelectorAll('.radio-circle');
    allCircles.forEach(circle => {
        circle.style.borderColor = '#8b949e';
        circle.style.backgroundColor = 'transparent';
        circle.innerHTML = '';
    });

    // Ubah ikon lingkaran pada pilihan yang diklik menjadi warna oranye khas TUMBASAKUN
    const activeCircle = element.querySelector('.radio-circle');
    if (activeCircle) {
        activeCircle.style.borderColor = '#E94014';
        activeCircle.style.backgroundColor = '#E94014';
        activeCircle.innerHTML = '<div style="width: 6px; height: 6px; background-color: #ffffff; border-radius: 50%;"></div>';
    }

    // Tutup dropdown
    togglePaymentDropdown();

    // Kembalikan fokus geseran halus secara otomatis kembali ke form utama
    document.getElementById('formCheckoutCard').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// 5. Fungsi Otomatis untuk Mengisi Ringkasan Produk dari Katalog
function updateCheckoutSummary(productName, productServer, productPrice, productImage) {
    const nameEl = document.getElementById('summaryProductName');
    const serverEl = document.getElementById('summaryProductServer');
    const priceEl = document.getElementById('summaryProductPrice');
    const imgEl = document.getElementById('summaryProductImg');

    if (nameEl) nameEl.innerText = productName;
    if (serverEl) serverEl.innerText = "Server: " + productServer;
    if (priceEl) priceEl.innerText = productPrice;
    if (imgEl && productImage) imgEl.src = productImage;
}

// 6. Fungsi saat Tombol "PESAN SEKARANG" diklik
function processCheckout() {
    const whatsapp = document.getElementById('buyerWhatsapp').value;
    const promo = document.getElementById('promoCode').value;
    const paymentMethod = document.getElementById('selectedPaymentText').innerText;

    // Validasi sederhana
    if (!whatsapp) {
        alert("Mohon masukkan nomor WhatsApp terlebih dahulu!");
        return;
    }
    if (paymentMethod === "Pilih Metode Pembayaran") {
        alert("Mohon pilih metode pembayaran terlebih dahulu!");
        return;
    }

    // Lanjut proses pesanan
    alert("Pesanan berhasil diproses! Menghubungkan ke pembayaran...");
}

