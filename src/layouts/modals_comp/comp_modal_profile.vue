<template>
  <div class="modal fade" id="profileModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content profile-modal-content border-0">
        <div class="modal-header border-0 p-4 pb-0">
          <button
            type="button"
            class="btn-link text-white text-decoration-none fw-bold border-0 bg-transparent"
            data-bs-dismiss="modal"
          >
            KEMBALI
          </button>
        </div>

        <div class="modal-body p-4 p-md-5">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <div class="mb-3">
                <label class="text-white small fw-bold mb-1">NAMA</label>
                <input
                  type="text"
                  class="w-100 profile-static-field"
                  v-model="profileData.name"
                />
                <label class="text-white small fw-bold mb-1">NIP/NIM</label>
                <input
                  type="text"
                  class="w-100 profile-static-field"
                  v-model="profileData.NIM"
                />
                <label class="text-white small fw-bold mb-1"
                  >TEMPAT LAHIR</label
                >
                <input
                  type="text"
                  class="w-100 profile-static-field"
                  v-model="profileData.place"
                />
                <label class="text-white small fw-bold mb-1"
                  >TANGGAL LAHIR</label
                >
                <input
                  type="text"
                  class="w-100 profile-static-field"
                  v-model="profileData.date"
                />
                <label class="text-white small fw-bold mb-1"
                  >JENIS KELAMIN</label
                >
                <input
                  type="text"
                  class="w-100 profile-static-field"
                  v-model="profileData.gender"
                />
                <label class="text-white small fw-bold mb-1">ALAMAT</label>
                <input
                  type="text"
                  class="w-100 profile-static-field"
                  v-model="profileData.address"
                />
                <label class="text-white small fw-bold mb-1">GENDER</label>
                <input
                  type="text"
                  class="w-100 profile-static-field"
                  v-model="profileData.religion"
                />
                <label class="text-white small fw-bold mb-1">EMAIL</label>
                <input
                  type="text"
                  class="w-100 profile-static-field"
                  v-model="profileData.email"
                />
                <label class="text-white small fw-bold mb-1"
                  >NOMOR TELEPON</label
                >
                <input
                  type="text"
                  class="w-100 profile-static-field"
                  v-model="profileData.phone_number"
                />
                <input
                  type="password"
                  class="w-100 profile-static-field d-none"
                  v-model="profileData.old_pass"
                />
              </div>
            </div>

            <div class="col-lg-4 text-center mt-4 mt-lg-0">
              <div class="profile-icon-container mx-auto shadow-lg">
                <i class="bi bi-person-fill text-dark display-1"></i>
              </div>
              <div class="d-flex justify-content-center gap-2 mt-4">
                <button
                  @click="change_profile"
                  class="btn btn-success px-4 rounded-pill fw-bold"
                >
                  SIMPAN
                </button>
                <button
                  class="btn btn-danger px-4 rounded-pill fw-bold"
                  data-bs-dismiss="modal"
                >
                  BATAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { callAPI } from "@/store/helper.js";

import {
  sweet_alert_response_error,
  sweet_alert_response_success,
} from "@/store/helper.js";

const routes_props = defineProps({
  changes_route: {
    type: String,
    required: true,
  },
  profile_route: {
    type: String,
    required: true,
  },
});

const profileData = ref({
  name: "",
  NIM: "",
  place: "",
  date: "",
  gender: "",
  address: "",
  religion: "",
  phone_number: "",
  email: "",
  old_pass: "",
});

const change_profile = async () => {
  try {
    const res = await callAPI(
      routes_props.changes_route,
      profileData.value,
      "PUT"
    );
    sweet_alert_response_success(res.result.message);
    await binding_data();
    return;
  } catch (error) {
    const err = await error.json();
    sweet_alert_response_error(err.error);
  }
  return;
};

const binding_data = async () => {
  try {
    const result = await callAPI(routes_props.profile_route, "", "GET");
    const {
      name,
      nim,
      place,
      date,
      gender,
      religion,
      email,
      phone_number,
      address,
    } = result.result;
    profileData.value.name = name;
    profileData.value.NIM = nim;
    profileData.value.place = place;
    profileData.value.date = date;
    profileData.value.gender =
      gender.toLowerCase() == "male" ? "Laki-Laki" : "Perempuan";
    profileData.value.address = address;
    profileData.value.religion = religion;
    profileData.value.phone_number = phone_number;
    profileData.value.email = email;
  } catch (error) {
    console.log(error);
  }
  return;
};

onMounted(async () => {
  try {
    await binding_data();
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
/* Layout Gelap sesuai Gambar Profile */
.profile-modal-content {
  background-color: #11162c !important;
  border-radius: 30px !important;
}

/* Kotak Input Putih Melengkung */
.profile-static-field {
  background-color: white;
  border-radius: 12px;
  padding: 10px 15px;
  min-height: 45px;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #11162c;
}

/* Wadah Icon Profile Bulat */
.profile-icon-container {
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #d9d9d9;
}
</style>
