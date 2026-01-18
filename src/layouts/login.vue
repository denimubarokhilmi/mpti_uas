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
import { APIURL } from "@/main.js";
import { useRouter } from "vue-router";
import role_store from "@/store/role_store.js";
const role = role_store.use_role_page_store();

import {
  sweet_alert_response_error,
  sweet_alert_response_success,
} from "@/store/helper";

const form = ref({
  username: "",
  password: "",
});

const router = useRouter();
const handleLogin = async () => {
  try {
    const res = await fetch(`${APIURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.value.username,
        password: form.value.password,
      }),
    });
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    document.cookie = `Bearer=${
      data.result.token
    }; path=/; max-age=${7200}; SameSite=Strict`;
    sweet_alert_response_success(data.result.message);

    if (data.result.role === "admin") {
      setTimeout(() => {
        router.push("/admin_page");
      }, 1500);
      return;
    }
    if (data.result.role === "user") {
      setTimeout(() => {
        router.push("/mahasiswa_page");
      }, 1500);
      return;
    }
    console.log(data.result);
    setTimeout(() => {
      router.push("/officer_page");
    }, 1500);
    return;
  } catch (error) {
    const err = await error.json();
    sweet_alert_response_error(err.error);
  }
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
