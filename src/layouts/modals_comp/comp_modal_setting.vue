<template>
  <div
    class="modal fade"
    id="changePasswordModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content auth-modal-content border-0">
        <div class="modal-header border-0 p-4 pb-0">
          <button type="button" class="btn-back" data-bs-dismiss="modal">
            KEMBALI
          </button>
        </div>

        <div class="modal-body p-4 p-md-5">
          <div class="row align-items-center">
            <div class="col-md-8">
              <h4 class="text-white fw-bold mb-4">GANTI KATA SANDI</h4>

              <form @submit.prevent="handleUpdatePassword">
                <div class="mb-3">
                  <label class="text-white small fw-bold mb-1"
                    >KATA SANDI LAMA</label
                  >
                  <input
                    type="password"
                    class="form-control custom-auth-input"
                    v-model="passwordData.old_pass"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label class="text-white small fw-bold mb-1"
                    >KATA SANDI BARU</label
                  >
                  <input
                    type="password"
                    class="form-control custom-auth-input"
                    v-model="passwordData.new_pass"
                    required
                  />
                </div>

                <div class="d-flex gap-3 mt-4">
                  <button
                    type="submit"
                    class="btn btn-success px-4 rounded-pill fw-bold"
                  >
                    SIMPAN
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger px-4 rounded-pill fw-bold"
                    data-bs-dismiss="modal"
                  >
                    BATAL
                  </button>
                </div>
              </form>
            </div>

            <div class="col-md-4 text-center mt-4 mt-md-0">
              <div class="lock-icon-container mx-auto">
                <i class="bi bi-lock-fill text-white display-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
});

const passwordData = ref({
  old_pass: "",
  new_pass: "",
});

const handleUpdatePassword = async () => {
  try {
    const res = await callAPI(
      routes_props.changes_route,
      passwordData.value,
      "PUT"
    );
    sweet_alert_response_success(res.result.message);
    passwordData.value.new_pass = "";
    passwordData.value.old_pass = "";
  } catch (error) {
    const err = await error.json();
    sweet_alert_response_error(err.error);
  }
};
</script>

<style scoped>
/* Background Gelap sesuai Tema */
.auth-modal-content {
  background-color: #11162c !important;
  border-radius: 25px !important;
}

.btn-back {
  background: white;
  color: #11162c;
  border: none;
  padding: 5px 20px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.8rem;
}

/* Input Putih Melengkung */
.custom-auth-input {
  border: none !important;
  border-radius: 12px !important;
  background-color: white !important;
  padding: 12px 15px;
}

.lock-icon-container {
  width: 140px;
  height: 140px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
