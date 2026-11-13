
// Membuat tombol kembali ke atas

const tombolAtas = document.createElement("button");

tombolAtas.innerHTML = "↑";
tombolAtas.className = "back-to-top";

document.body.appendChild(tombolAtas);

// Fungsi animasi scroll ke atas
function scrollKeAtas() {
    const posisiAwal = window.scrollY;
    const durasi = 1200;
    let waktuMulai = null;

    function animasiScroll(waktuSekarang) {
        if (waktuMulai === null) {
            waktuMulai = waktuSekarang;
        }

        const waktuBerjalan = waktuSekarang - waktuMulai;
        const progress = Math.min(waktuBerjalan / durasi, 1);

        // Efek gerakan smooth (ease in out)
        const easing = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, posisiAwal * (1 - easing));

        if (progress < 1) {
            requestAnimationFrame(animasiScroll);
        }
    }

    requestAnimationFrame(animasiScroll);
}

// Jalankan animasi ketika tombol diklik
tombolAtas.addEventListener("click", scrollKeAtas);

// Tampilkan tombol ketika halaman digulir
window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        tombolAtas.style.display = "block";
    } else {
        tombolAtas.style.display = "none";
    }
});



// Memilih elemen yang akan diberi animasi
const elemenReveal = document.querySelectorAll(
    "section, .info-card, .skill-card, .project-card, .contact-box"
);

// Mengamati elemen ketika masuk dan keluar layar
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {

        if (entry.isIntersecting) {
            // Menjalankan animasi
            entry.target.classList.add("active");

        } else {
            // Mengulang animasi ketika elemen masuk kembali
            entry.target.classList.remove("active");
        }

    });
}, {
    threshold: 0.15
});

// Mengaktifkan animasi pada setiap elemen
elemenReveal.forEach(function(elemen) {
    elemen.classList.add("reveal");
    observer.observe(elemen);
});


// TYPING ANIMATION

const typingText = document.getElementById("typing-text");

const daftarTeks = [
    "Mahasiswa Sistem Informasi",
    "Web Developer Pemula",
    "UI/UX Enthusiast"
];

let indexTeks = 0;
let indexKarakter = 0;
let sedangMenghapus = false;

function jalankanTyping() {
    const teksSekarang = daftarTeks[indexTeks];

    if (sedangMenghapus) {
        indexKarakter--;
    } else {
        indexKarakter++;
    }

    typingText.textContent = teksSekarang.substring(
        0,
        indexKarakter
    );

    let kecepatan = sedangMenghapus ? 50 : 100;

    if (!sedangMenghapus && indexKarakter === teksSekarang.length) {
        sedangMenghapus = true;
        kecepatan = 1500;
    } else if (sedangMenghapus && indexKarakter === 0) {
        sedangMenghapus = false;
        indexTeks = (indexTeks + 1) % daftarTeks.length;
        kecepatan = 500;
    }

    setTimeout(jalankanTyping, kecepatan);
}

// Jalankan animasi
if (typingText) {
    jalankanTyping();
}


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Membuka dan menutup menu
menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("active");

    const menuTerbuka = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", menuTerbuka);
    menuToggle.setAttribute(
        "aria-label",
        menuTerbuka ? "Tutup menu navigasi" : "Buka menu navigasi"
    );

    menuToggle.innerHTML = menuTerbuka ? "✕" : "☰";
});

// Menutup menu setelah salah satu link diklik
const semuaLink = navLinks.querySelectorAll("a");

semuaLink.forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");

        menuToggle.innerHTML = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    });
});


// ACTIVE NAVIGATION

const semuaSection = document.querySelectorAll("main section");
const semuaNavLink = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

    let sectionAktif = "";

    semuaSection.forEach(function(section) {

        const posisiSection = section.offsetTop;
        const tinggiSection = section.offsetHeight;

        if (window.scrollY >= posisiSection - 200) {
            sectionAktif = section.getAttribute("id");
        }

    });

    semuaNavLink.forEach(function(link) {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + sectionAktif) {
            link.classList.add("active-link");
        }

    });
}

// Jalankan ketika halaman digulir
window.addEventListener("scroll", updateActiveNavigation);

// Jalankan ketika halaman pertama kali dibuka
updateActiveNavigation();


// =====================================
// EMAILJS CONFIGURATION
// =====================================

// Menghubungkan website dengan akun EmailJS
emailjs.init({
    publicKey: "K1VOQ8KrPVu64K599"
});


// =====================================
// CONTACT FORM INTEGRATION
// =====================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        // Mencegah halaman melakukan refresh
        event.preventDefault();

        // Mengambil data dari formulir
        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim();
        const pesan = document.getElementById("pesan").value.trim();

        // Mengambil elemen pesan error
        const errorNama = document.getElementById("error-nama");
        const errorEmail = document.getElementById("error-email");
        const errorPesan = document.getElementById("error-pesan");
        const formStatus = document.getElementById("form-status");

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        // Menghapus pesan validasi sebelumnya
        errorNama.textContent = "";
        errorEmail.textContent = "";
        errorPesan.textContent = "";
        formStatus.textContent = "";

        let valid = true;

        // VALIDASI NAMA
        if (nama === "") {
            errorNama.textContent = "Nama wajib diisi.";
            valid = false;
        }

        // VALIDASI EMAIL
        const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            errorEmail.textContent = "Email wajib diisi.";
            valid = false;
        } else if (!polaEmail.test(email)) {
            errorEmail.textContent = "Format email tidak valid.";
            valid = false;
        }

        // VALIDASI PESAN
        if (pesan === "") {
            errorPesan.textContent = "Pesan wajib diisi.";
            valid = false;
        }

        // Menghentikan proses jika data tidak valid
        if (!valid) {
            return;
        }

        // Menampilkan status pengiriman
        submitButton.disabled = true;
        submitButton.textContent = "Mengirim...";
        formStatus.textContent = "Sedang mengirim pesan...";
        formStatus.style.color = "#06b6d4";

        // Menyiapkan data untuk EmailJS
        const templateParams = {
            nama: nama,
            email: email,
            pesan: pesan
        };

        try {
            console.log("EmailJS:", typeof emailjs);
            console.log("Service ID:", "service_g6i49uk");
            console.log("Template ID:", "template_10py6y8");
            console.log("Data formulir:", templateParams);

            // Mengirim email melalui EmailJS
            await emailjs.send(
                "service_g6i49uk",
                "template_10py6y8",
                templateParams
            );

            // Jika pengiriman berhasil
            formStatus.textContent =
                "Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.";

            formStatus.style.color = "#22c55e";

            // Mengosongkan formulir
            contactForm.reset();

        } catch (error) {

            // Jika pengiriman gagal
            console.error("EmailJS Error:", error);

            formStatus.textContent =
                "Pesan gagal dikirim. Silakan coba kembali.";

            formStatus.style.color = "#ef4444";

        } finally {

            // Mengaktifkan kembali tombol
            submitButton.disabled = false;
            submitButton.textContent = "Kirim Pesan";

        }

    });

}


