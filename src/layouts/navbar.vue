<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">
        <i class="bi bi-building-check me-2"></i>TEMAN SIPUS
      </a>

      <button
        class="navbar-toggler border-0 shadow-none"
        type="button"
        @click="toggleMenu"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i
          :class="['bi', isMenuOpen ? 'bi-x-lg' : 'bi-list', 'fs-2 text-white']"
        ></i>
      </button>

      <div
        :class="['collapse navbar-collapse', { show: isMenuOpen }]"
        id="navbarNav"
      >
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="closeMenu"
              >HOME</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/kalender" class="nav-link" @click="closeMenu"
              >KALENDER</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/peminjaman" class="nav-link" @click="closeMenu"
              >PEMINJAMAN</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/riwayat" class="nav-link" @click="closeMenu"
              >RIWAYAT</router-link
            >
          </li>
        </ul>

        <div class="d-flex justify-content-center">
          <div class="dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center text-white"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle fs-4 me-2"></i>
              <span class="d-lg-none">PROFILE MENU</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow border-0">
              <li>
                <a class="dropdown-item py-2" href="#" @click="closeMenu">
                  <i class="bi bi-person-gear me-2"></i>Manage Profile
                </a>
              </li>
              <li>
                <a class="dropdown-item py-2" href="#" @click="closeMenu">
                  <i class="bi bi-gear me-2"></i>Settings
                </a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item py-2 text-danger"
                  href="#"
                  @click="closeMenu"
                >
                  <i class="bi bi-box-arrow-right me-2"></i>Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

// State untuk mengontrol ikon hamburger
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Fungsi untuk menutup menu saat link diklik (terutama di mobile)
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
.custom-navbar {
  background-color: var(--primary-dark); /* Mengambil dari root style.css */
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500;
  margin: 0 10px;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.nav-link:hover,
.router-link-active {
  color: #ff8400 !important; /* Warna orange yang kita pakai sebelumnya */
}

/* Styling Dropdown agar lebih modern */
.dropdown-menu {
  border-radius: 12px;
  margin-top: 15px;
  min-width: 200px;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: var(--primary-dark);
}

/* Menghilangkan panah bawaan bootstrap jika diinginkan */
.dropdown-toggle::after {
  display: none;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    background-color: var(--primary-dark);
    padding: 20px;
    border-radius: 0 0 15px 15px;
  }

  .nav-item {
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
