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
          <li
            class="nav-item"
            v-for="(item, index) in props_navbar.menu"
            :key="index"
          >
            <button
              type="button"
              class="nav-link"
              :class="{ active: isActive(item.component) }"
              @click="closeMenu(item.component)"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>

        <div class="d-flex justify-content-center">
          <div class="dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center text-white cursor-pointer"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle fs-4 me-2"></i>
              <span class="d-lg-none">PROFILE MENU</span>
            </a>

            <ul class="dropdown-menu dropdown-menu-end shadow border-0">
              <li v-for="(item, index) in props_navbar.sub_menu" :key="index">
                <template v-if="item.name">
                  <button
                    class="dropdown-item py-2 border-0 bg-transparent text-start"
                    @click="handleProfileClick(item.modals)"
                  >
                    {{ item.name }}
                  </button>
                </template>
              </li>

              <li><hr class="dropdown-divider" /></li>

              <li class="dropdown-item py-2">
                <a
                  href="#"
                  @click.prevent="logOut"
                  class="text-decoration-none text-dark"
                >
                  <i class="bi bi-box-arrow-right me-2"></i> Keluar Akun
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <comp_modal />
  <comp_modal_setting />
</template>

<script setup>
import { ref, onMounted } from "vue";
import component_store from "@/store/component_store.js";
import comp_modal from "./modals_comp/comp_modal_profile.vue";
import comp_modal_setting from "./modals_comp/comp_modal_setting.vue";
const store_component = component_store.use_component();

const props_navbar = defineProps({
  menu: {
    type: Array,
    required: true,
  },
  sub_menu: {
    type: Array,
    required: true,
  },
});

const isMenuOpen = ref(false);
let profileModalInstance = null;
let settingModalInstance = null;

// Inisialisasi modal saat komponen di-mount
onMounted(() => {
  const modalEl = document.getElementById("profileModal");
  const settingModalEl = document.getElementById("changePasswordModal");
  if (modalEl) {
    profileModalInstance = new bootstrap.Modal(modalEl);
  }
  if (settingModalEl) {
    settingModalInstance = new bootstrap.Modal(settingModalEl);
  }
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Fungsi ketika 'Kelola Profile' diklik
const handleProfileClick = (items) => {
  isMenuOpen.value = false; // Tutup menu mobile jika sedang terbuka
  if (profileModalInstance && items === "profile") {
    profileModalInstance.show(); // Munculkan modal
  } else if (settingModalInstance && items === "setting") {
    settingModalInstance.show(); // Munculkan modal pengaturan
  }
};

const closeMenu = (component) => {
  if (component) {
    store_component.change_component(component);
  }
  isMenuOpen.value = false;
};

const isActive = (component) => {
  return store_component.is_component === component;
};

const logOut = () => {
  window.Swal.fire({
    title: "Do you want to logout?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#ff8400",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      window.Swal.fire("Logout successfully!", "", "success");
      setTimeout(() => {
        document.cookie = "Bearer=; path=/; max-age=0; SameSite=Strict";
        window.location.href = "/login";
      }, 1500);
    }
  });
};
</script>

<style scoped>
.custom-navbar {
  background-color: #11162c;
  padding: 1rem 0;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500;
  margin: 0 10px;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.cursor-pointer {
  cursor: pointer;
}

.nav-link.active {
  color: #ff8400 !important;
  font-weight: 600;
}

.nav-link:hover {
  color: #ff8400 !important;
}

.dropdown-menu {
  border-radius: 12px;
  margin-top: 15px;
  min-width: 200px;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  transition: all 0.2s;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #11162c;
}

.dropdown-toggle::after {
  display: none;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    background-color: #11162c;
    padding: 20px;
    border-radius: 0 0 15px 15px;
  }

  .nav-item {
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
