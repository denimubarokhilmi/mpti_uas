<template>
  <div
    class="login-page d-flex align-items-center justify-content-center min-vh-100 bg-light"
  >
    <div class="container text-center">
      <h1 class="display-4 fw-bold mb-0 text-dark">TEMAN SIPUS</h1>
      <p class="fs-4 text-secondary mb-5">MASUK AKUN</p>

      <div class="row justify-content-center">
        <div class="col-11 col-md-6 col-lg-5">
          <div class="login-card p-5 shadow-lg">
            <form @submit.prevent="handleLogin">
              <div class="mb-5 text-start">
                <label class="text-white small mb-1">NIP/NIM</label>
                <input
                  type="text"
                  class="form-control input-underlined"
                  placeholder="MASUKKAN NIP/NIM"
                  v-model="form.username"
                />
              </div>

              <div class="mb-5 text-start">
                <label class="text-white small mb-1">KATA SANDI</label>
                <input
                  type="password"
                  class="form-control input-underlined"
                  placeholder="MASUKKAN KATA SANDI"
                  v-model="form.password"
                />
              </div>

              <button type="submit" class="btn btn-orange px-5 mt-2">
                MASUK
              </button>

              <div class="mt-4">
                <a href="#" class="text-white-50 text-decoration-none small">
                  LUPA KATA SANDI?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  username: "",
  password: "",
});

const handleLogin = () => {
  console.log("Logging in with:", form.value);
  // Integrasikan dengan Pinia store Anda di sini
};
</script>

<style scoped>
.login-page {
  /* Background bertekstur atau putih bersih sesuai gambar */
  background-image: radial-gradient(circle, #ffffff 0%, #e9ecef 100%);
}

.login-card {
  /* Menggunakan warna yang Anda berikan */
  background-color: #11162c;
  border-radius: 25px;
  min-height: 400px;
}

h1 {
  letter-spacing: 3px;
}
</style>
