<template>
  <div class="bg-texture min-vh-100 pb-5">
    <div class="container mt-5">
      <div class="row align-items-center mb-4">
        <div class="col-md-6">
          <h1 class="display-5 fw-normal text-primary-dark m-0">
            KELOLA {{ currentTab.toUpperCase() }}
          </h1>
        </div>
        <div
          class="col-md-6 d-flex justify-content-end align-items-center gap-3"
        >
          <div class="btn-group">
            <button
              @click="currentTab = 'user'"
              :class="[
                'btn btn-sm',
                currentTab === 'user' ? 'btn-dark' : 'btn-outline-dark',
              ]"
            >
              USER
            </button>
            <button
              @click="currentTab = 'officer'"
              :class="[
                'btn btn-sm',
                currentTab === 'officer' ? 'btn-dark' : 'btn-outline-dark',
              ]"
            >
              OFFICER
            </button>
          </div>
          <button
            @click="openAddModal"
            class="btn btn-primary btn-sm rounded-pill px-4"
          >
            + TAMBAHKAN
          </button>
        </div>
        <div class="col-12 mt-2">
          <hr class="border-dark opacity-25" />
        </div>
      </div>

      <div class="table-responsive shadow-sm rounded-3 overflow-hidden">
        <table class="table table-bordered m-0 bg-white">
          <thead class="bg-dark-blue text-white text-center">
            <tr>
              <th class="py-3">NAMA</th>
              <th class="py-3">NIM/NIP</th>
              <th class="py-3">EMAIL</th>
              <th class="py-3">RINCIAN</th>
              <th class="py-3">AKSI</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="item in currentListData"
              :key="item.id_user || item.id_officer"
            >
              <td class="py-3 align-middle">{{ item.name }}</td>
              <td class="py-3 align-middle">{{ item.nim }}</td>
              <td class="py-3 align-middle">{{ item.email }}</td>
              <td class="py-3 align-middle">
                <i
                  class="bi bi-eye fs-5 text-dark cursor-pointer"
                  @click="showDetail(item)"
                ></i>
              </td>
              <td class="py-3 align-middle">
                <i
                  class="bi bi-pencil-square fs-5 text-primary me-3 cursor-pointer"
                  @click="openEditModal(item)"
                ></i>
                <i
                  class="bi bi-trash fs-5 text-danger cursor-pointer"
                  @click="deleteData(item)"
                ></i>
              </td>
            </tr>
            <tr v-if="currentListData.length === 0">
              <td colspan="5" class="py-4 text-muted">Data Kosong</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="userFormModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content custom-modal-content p-4">
          <div class="modal-header border-0 pb-0">
            <button
              type="button"
              class="btn-link text-dark text-decoration-none fw-bold"
              data-bs-dismiss="modal"
            >
              KEMBALI
            </button>
          </div>
          <div class="modal-body">
            <h4 class="fw-bold mb-4 text-center">
              {{ isEdit ? "EDIT" : "TAMBAH" }} {{ currentTab.toUpperCase() }}
            </h4>
            <form @submit.prevent="submitForm">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="fw-bold small mb-1">NAMA LENGKAP</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="formData.name"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="fw-bold small mb-1">NIM/NIP</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="formData.nim"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="fw-bold small mb-1">USERNAME</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="formData.username"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="fw-bold small mb-1"
                    >PASSWORD
                    {{ isEdit ? "(Kosongkan jika tidak ganti)" : "" }}</label
                  >
                  <input
                    type="password"
                    class="form-control custom-input"
                    v-model="formData.password"
                    :required="!isEdit"
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="fw-bold small mb-1">TEMPAT LAHIR</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="formData.place"
                  />
                </div>
                <div class="col-md-8 mb-3">
                  <label class="fw-bold small mb-1">TANGGAL LAHIR</label>
                  <input
                    type="date"
                    class="form-control custom-input"
                    v-model="formData.date"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="fw-bold small mb-1">JENIS KELAMIN</label>
                  <select
                    class="form-select custom-input"
                    v-model="formData.gender"
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="fw-bold small mb-1">AGAMA</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="formData.religion"
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label class="fw-bold small mb-1">ALAMAT</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="formData.address"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="fw-bold small mb-1">NO TELEPON</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="formData.phone_number"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="fw-bold small mb-1">EMAIL</label>
                  <input
                    type="email"
                    class="form-control custom-input"
                    v-model="formData.email"
                    required
                  />
                </div>
                <div class="col-md-12 mb-3" v-if="currentTab === 'user'">
                  <label class="fw-bold small mb-1">PROGRAM STUDI</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="formData.study_program"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-end gap-3 mt-4">
                <button
                  type="submit"
                  class="btn btn-success px-5 rounded-pill fw-bold"
                >
                  SIMPAN
                </button>
                <button
                  type="button"
                  class="btn btn-danger px-5 rounded-pill fw-bold"
                  data-bs-dismiss="modal"
                >
                  BATAL
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="detailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content custom-modal-content p-5">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold m-0 text-uppercase">
              DETAIL {{ selectedUser.role }}
            </h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="detail-info">
            <p><strong>NAMA:</strong> {{ selectedUser.name }}</p>
            <p><strong>NIM/NIP:</strong> {{ selectedUser.nim }}</p>
            <p>
              <strong>TTL:</strong> {{ selectedUser.place }},
              {{ selectedUser.date }}
            </p>
            <p>
              <strong>JENIS KELAMIN:</strong>
              {{ selectedUser.gender === "male" ? "Laki-laki" : "Perempuan" }}
            </p>
            <p><strong>ALAMAT:</strong> {{ selectedUser.address }}</p>
            <p><strong>AGAMA:</strong> {{ selectedUser.religion }}</p>
            <p><strong>NO TELEPON:</strong> {{ selectedUser.phone_number }}</p>
            <p><strong>EMAIL:</strong> {{ selectedUser.email }}</p>
            <p v-if="selectedUser.study_program">
              <strong>PRODI:</strong> {{ selectedUser.study_program }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import home_admin_store from "@/store/home_admin_store";
import { storeToRefs } from "pinia";
import {
  callAPI,
  sweet_alert_response_error,
  sweet_alert_response_success,
} from "@/store/helper.js";

const store_home_admin = home_admin_store.use_home();
const { home_store } = storeToRefs(store_home_admin);

// State
let formModal = null;
let detailModal = null;
const isEdit = ref(false);
const currentTab = ref("user"); // 'user' atau 'officer'
const currentId = ref(null);

const formData = ref({
  name: "",
  nim: "",
  place: "",
  date: "",
  gender: "male",
  address: "",
  religion: "",
  phone_number: "",
  email: "",
  username: "",
  password: "",
  study_program: "",
});

const selectedUser = ref({});

// Computed untuk memisahkan data dari store
const currentListData = computed(() => {
  const result = home_store.value?.officer_and_user?.result;
  return currentTab.value === "user"
    ? result?.user || []
    : result?.officer || [];
});

const binding_data = async () => {
  await store_home_admin.get_home_store_officer_and_user(
    "/users_and_officer",
    "",
    "GET",
  );
};

onMounted(async () => {
  formModal = new bootstrap.Modal(document.getElementById("userFormModal"));
  detailModal = new bootstrap.Modal(document.getElementById("detailModal"));
  await binding_data();
});

const openAddModal = () => {
  isEdit.value = false;
  formData.value = {
    name: "",
    nim: "",
    place: "",
    date: "",
    gender: "male",
    address: "",
    religion: "",
    phone_number: "",
    email: "",
    username: "",
    password: "",
    study_program: "",
  };
  formModal.show();
};

const openEditModal = (item) => {
  isEdit.value = true;
  currentId.value = item.id_user || item.id_officer;
  formData.value = { ...item, password: "" };
  formModal.show();
};

const showDetail = (item) => {
  selectedUser.value = item;
  detailModal.show();
};

const submitForm = async () => {
  try {
    const endpoint =
      currentTab.value === "user" ? "/admin/users" : "/admin/officers";
    const method = isEdit.value ? "PUT" : "POST";

    // Mapping payload agar sesuai backend
    const payload = { ...formData.value };
    if (isEdit.value) {
      if (currentTab.value === "user") payload.id_user = currentId.value;
      else payload.id_officer = currentId.value;
    }

    const res = await callAPI(endpoint, payload, method);
    sweet_alert_response_success(res.result.message);
    await binding_data();
    formModal.hide();
  } catch (error) {
    sweet_alert_response_error(error.error || "Gagal menyimpan data");
  }
};

const deleteData = async (item) => {
  window.Swal.fire({
    title: "Apakah anda yakin?",
    text: "Data yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#ff0000",
    confirmButtonText: "Ya, Hapus!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const endpoint =
          currentTab.value === "user" ? "/admin/users" : "/admin/officers";
        const idKey = currentTab.value === "user" ? "id_user" : "id_officer";
        const payload = { [idKey]: item[idKey] };
        console.log(payload);
        const res = await callAPI(endpoint, payload, "DELETE");
        sweet_alert_response_success(res.result.message);
        await binding_data();
      } catch (error) {
        sweet_alert_response_error(error.error || "Gagal menghapus");
      }
    }
  });
};
</script>

<style scoped>
.bg-dark-blue {
  background-color: #11162c;
}
.text-primary-dark {
  color: #11162c;
  letter-spacing: 1px;
}
.btn-add-text {
  background: none;
  border: none;
  font-weight: bold;
  color: #11162c;
}
.cursor-pointer {
  cursor: pointer;
  transition: opacity 0.2s;
}
.cursor-pointer:hover {
  opacity: 0.7;
}

/* Modal & Input Styles */
.custom-modal-content {
  background-color: #d9d9d9 !important;
  border-radius: 25px !important;
}
.custom-input {
  border: none !important;
  border-radius: 10px !important;
  background-color: white !important;
  padding: 10px 15px;
}

.detail-info p {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  margin: 0;
}
</style>
