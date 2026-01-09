<template>
  <div class="hero-container container-fluid p-0">
    <div class="row g-0 min-vh-100">
      <div
        class="col-md-6 d-flex align-items-center justify-content-center bg-white-pattern p-5"
      >
        <div class="content-wrapper text-start">
          <h1 class="display-3 fw-bold custom-title">
            SELAMAT <br />
            DATANG DI <br />
            TEMAN SIPUS
          </h1>
          <button @click="get_started" class="btn btn-custom mt-4 px-5 py-3">
            MULAI SEKARANG
          </button>
        </div>
      </div>

      <div class="col-md-6 hero-image-box">
        <img
          src="@/assets/img/gedung.jpeg"
          alt="Kampus Building"
          class="img-fluid h-100 w-100 object-fit-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const get_started = () => {
  router.push("/login");
};
</script>
<style scoped>
.hero-container {
  overflow-x: hidden;
}

.custom-title {
  color: var(--primary-dark);
  letter-spacing: 2px;
  line-height: 1.2;
}

.btn-custom {
  background-color: var(--primary-dark);
  color: white;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-custom:hover {
  background-color: var(--accent-blue);
  transform: translateY(-2px);
}

.bg-white-pattern {
  background-color: #ffffff;
}

.hero-image-box img {
  min-height: 100vh;
  object-fit: cover;
}

@media (max-width: 768px) {
  .custom-title {
    font-size: 2.5rem;
  }
  .hero-image-box img {
    min-height: 50vh;
  }
}
</style>
