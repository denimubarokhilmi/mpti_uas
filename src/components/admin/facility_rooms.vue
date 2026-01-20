<template>
  <div class="facility-room-admin container-fluid p-2">
    <div class="container mt-5">
      <div class="row align-items-center mb-5">
        <div class="col-md-6">
          <h1 class="display-4 fw-normal text-primary-dark m-0">
            FASILITAS & RUANGAN
          </h1>
        </div>
        <div
          class="col-md-6 d-flex justify-content-end align-items-center gap-4 mt-3 mt-md-0"
        >
          <a
            href="#"
            class="btn-add d-flex align-items-center"
            @click.prevent="openAddModal"
          >
            <i class="bi bi-plus-lg me-1"></i> TAMBAHKAN
          </a>

          <div class="dropdown">
            <div
              class="filter-icon"
              id="filterDropdown"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-sliders"></i>
            </div>

            <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-2">
              <li><h6 class="dropdown-header">Filter Berdasarkan:</h6></li>
              <li>
                <a
                  class="dropdown-item rounded"
                  href="#"
                  @click="filterType = 'facility'"
                  >Fasilitas</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item rounded"
                  href="#"
                  @click="filterType = 'room'"
                  >Ruangan</a
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item rounded"
                  href="#"
                  @click="filterType = 'semua'"
                  >Tampilkan Semua</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 mt-2">
          <hr class="border-dark border-1 opacity-25" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-lg-10 mx-auto">
          <div
            v-for="item in filteredList"
            :key="item.id_room || item.id_facility"
            class="facility-item d-flex align-items-center shadow-lg"
          >
            <div class="facility-img-wrapper me-4">
              <img
                :src="`${path_image}${item.image}`"
                class="w-100 h-100 object-fit-cover"
                :alt="item.name"
              />
            </div>
            <div class="flex-grow-1">
              <h2 class="facility-name m-0">{{ item.name }}</h2>
              <small class="text-secondary text-uppercase">{{
                item.type
              }}</small>
            </div>
            <div class="d-flex gap-3 align-items-center">
              <div
                class="text-white action-icon p-2 rounded-circle d-flex align-items-center"
                @click="showDetail(item)"
              >
                <i class="bi bi-eye fs-5"></i>
              </div>
              <div
                class="text-white action-icon p-2 rounded-circle d-flex align-items-center"
                @click="openEditModal(item)"
              >
                <i class="bi bi-pencil-square fs-5 text-warning"></i>
              </div>
              <div
                class="text-white action-icon p-2 rounded-circle d-flex align-items-center"
                @click="deleteItem(item)"
              >
                <i class="bi bi-trash fs-5 text-danger"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="detailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content custom-modal-content">
          <div class="modal-header justify-content-end p-2 border-0">
            <button
              type="button"
              class="btn-close-custom px-3"
              data-bs-dismiss="modal"
            >
              X
            </button>
          </div>
          <div class="modal-body px-4 px-md-5 pb-5">
            <div class="modal-img-container mb-4 shadow">
              <img
                :src="
                  selectedItem.image.startsWith('http')
                    ? selectedItem.image
                    : `${path_image}${selectedItem.image}`
                "
                class="w-100"
              />
            </div>
            <div class="detail-info fs-5">
              <div class="row mb-2">
                <div class="col-4 col-md-3 fw-bold">NAMA</div>
                <div class="col-8">: {{ selectedItem.name }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4 col-md-3 fw-bold">TERSEDIA</div>
                <div class="col-8">: {{ selectedItem.quantity_available }}</div>
              </div>
              <div class="row">
                <div class="col-4 col-md-3 fw-bold">DESKRIPSI</div>
                <div class="col-8">: {{ selectedItem.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content custom-modal-content p-4">
          <div class="modal-header border-0 pb-0">
            <button
              type="button"
              class="btn-link border-0 rounded p-3 text-dark text-decoration-none fw-bold"
              data-bs-dismiss="modal"
            >
              KEMBALI
            </button>
          </div>
          <div class="modal-body">
            <h4 class="fw-bold mb-4">{{ isEdit ? "EDIT" : "TAMBAH" }} DATA</h4>
            <form enctype="multipart/form-data" @submit.prevent="saveItem">
              <div class="mb-4">
                <label class="fw-bold mb-2">KATEGORI</label>
                <select
                  class="form-select custom-input"
                  v-model="formAdd.type"
                  required
                  v-show="!isEdit"
                  :disabled="isEdit"
                >
                  <option value="" disabled>PILIH KATEGORI</option>
                  <option value="room">RUANGAN</option>
                  <option value="facility">FASILITAS</option>
                </select>
              </div>

              <div v-if="formAdd.type">
                <div class="mb-4">
                  <div
                    class="upload-box d-flex align-items-center justify-content-center flex-column text-center w-100"
                    @click="$refs.fileInput.click()"
                  >
                    <div
                      v-if="!review_image"
                      class="d-flex flex-column align-items-center"
                    >
                      <i class="bi bi-plus-lg fs-1"></i>
                      <span class="fw-bold mt-2">TAMBAHKAN FOTO +</span>
                    </div>

                    <img
                      v-else
                      :src="review_image"
                      class="w-100 h-100 object-fit-cover rounded-3"
                    />

                    <input
                      type="file"
                      ref="fileInput"
                      name="image"
                      @change="handleFileUpload"
                      accept="image/*"
                      class="d-none"
                    />
                  </div>
                  <small v-if="isEdit" class="text-muted"
                    >*Kosongkan jika tidak ingin mengubah foto</small
                  >
                </div>

                <div class="mb-4">
                  <label class="fw-bold mb-2"
                    >NAMA {{ formAdd.type.toUpperCase() }}</label
                  >
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="formAdd.name"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label class="fw-bold mb-2">{{
                    formAdd.type === "facility" ? "JUMLAH" : "KAPASITAS"
                  }}</label>
                  <input
                    type="number"
                    :readonly="formAdd.type == 'room'"
                    class="form-control custom-input w-25"
                    v-model="formAdd.quantity_available"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label class="fw-bold mb-2">DESKRIPSI</label>
                  <textarea
                    class="form-control custom-input"
                    rows="4"
                    v-model="formAdd.desc"
                    required
                  ></textarea>
                </div>

                <div class="d-flex justify-content-end gap-3 mt-4">
                  <button type="submit" class="btn btn-simpan px-5">
                    SIMPAN
                  </button>
                  <button
                    type="button"
                    class="btn btn-batal px-5"
                    data-bs-dismiss="modal"
                  >
                    BATAL
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  callAPI,
  sweet_alert_response_error,
  sweet_alert_response_success,
} from "@/store/helper.js";
import { path_image } from "@/main.js";
import inventory_store from "@/store/inventory_store.js";
import { storeToRefs } from "pinia";

const filterType = ref("semua");
const review_image = ref("");
const isEdit = ref(false);
const currentId = ref(null);

const selectedItem = ref({
  name: "",
  image: "",
  quantity_available: 0,
  desc: "",
  type: "",
});
const formAdd = ref({
  type: "",
  name: "",
  quantity_available: 1,
  desc: "",
  image: null,
});

const store_inventory = inventory_store.use_inventory();
const { inventory } = storeToRefs(store_inventory);
const allData = ref([]);

let detailModal = null;
let addModal = null;

const filteredList = computed(() => {
  if (filterType.value === "semua") return allData.value;
  return allData.value.filter((i) => i.type === filterType.value);
});

const binding_data = async () => {
  try {
    await store_inventory.get_inventory("/inventory", "", "GET");
    allData.value = []; // Reset array sebelum push
    if (inventory.value?.result?.room)
      allData.value.push(...inventory.value.result.room);
    if (inventory.value?.result?.facility)
      allData.value.push(...inventory.value.result.facility);
  } catch (error) {
    console.log(error);
  }
  return;
};

const showDetail = (item) => {
  selectedItem.value = { ...item };
  detailModal.show();
};

const openAddModal = () => {
  isEdit.value = false;
  review_image.value = "";
  formAdd.value = {
    type: "",
    name: "",
    quantity_available: 1,
    desc: "",
    image: null,
  };
  addModal.show();
};

const openEditModal = (item) => {
  isEdit.value = true;
  currentId.value = item.id_room || item.id_facility;

  formAdd.value = {
    type: item.type === "room" ? "room" : "facility",
    name: item.name,
    quantity_available: item.quantity_available,
    desc: item.desc,
    image: null,
  };

  review_image.value = `${path_image}${item.image}`;
  addModal.show();
};

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    review_image.value = URL.createObjectURL(file);
    formAdd.value.image = file;
  }
};

const saveItem = async () => {
  try {
    const typeRoute = formAdd.value.type;
    const formData = new FormData();

    formData.append("name", formAdd.value.name);
    formData.append("quantity_available", formAdd.value.quantity_available);
    formData.append("desc", formAdd.value.desc);
    if (formAdd.value.image) {
      formData.append("image", formAdd.value.image);
    }
    let res;
    if (isEdit.value) {
      // Tambahkan ID ke body untuk update
      const idKey = typeRoute === "room" ? "id_room" : "id_facility";
      formData.append(idKey, currentId.value);

      res = await callAPI(`/admin/inventory/${typeRoute}`, formData, "PUT");
    } else {
      formData.append("type", typeRoute);
      res = await callAPI(`/admin/inventory/${typeRoute}`, formData, "POST");
    }

    sweet_alert_response_success(res.result.message);
    await binding_data();
    addModal.hide();
  } catch (error) {
    const err = await error.json();
    sweet_alert_response_error(err.error || "Terjadi kesalahan");
  }
};

const deleteItem = async (item) => {
  const payload = {};
  const idKey =
    item.type === "room"
      ? (payload.id_room = item.id_room)
      : (payload.id_facility = item.id_facility);
  const typeRoute = item.type === "room" ? "room" : "facility";
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
        // Mengirim ID via query params atau body sesuai kebutuhan API anda
        const res = await callAPI(
          `/admin/inventory/${typeRoute}`,
          payload,
          "DELETE",
        );
        sweet_alert_response_success(res.result.message);
        await binding_data();
      } catch (error) {
        sweet_alert_response_error(error.error || "Gagal menghapus");
      }
    }
  });
};

onMounted(async () => {
  await binding_data();
  detailModal = new bootstrap.Modal(document.getElementById("detailModal"));
  addModal = new bootstrap.Modal(document.getElementById("addModal"));
});
</script>

<style scoped>
.facility-room-admin {
  background-image: url("@/assets/img/bg_mpti.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
}
.text-primary-dark {
  color: #11162c;
  letter-spacing: 1px;
}
.facility-item {
  background-color: #11162c;
  border-radius: 20px;
  padding: 12px 25px;
  margin-bottom: 15px;
  transition: 0.3s;
}
.facility-item:hover {
  background-color: #1a2142;
  transform: translateX(10px);
}
.facility-img-wrapper {
  width: 120px;
  height: 70px;
  border-radius: 15px;
  overflow: hidden;
}
.facility-name {
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
}
.action-icon {
  cursor: pointer;
  transition: 0.2s;
}
.action-icon:hover {
  transform: scale(1.1);
}

.custom-modal-content {
  background-color: #d9d9d9 !important;
  border-radius: 25px !important;
  border: 2px solid #11162c !important;
}
.btn-close-custom {
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1.2rem;
}
.modal-img-container {
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid #11162c;
}
.custom-input {
  border: none !important;
  border-radius: 10px !important;
  padding: 10px 15px;
}
/* Tambahkan atau perbarui bagian ini di dalam <style scoped> */

.upload-box {
  background-color: white;
  border-radius: 15px;
  height: 200px;
  border: 2px dashed #bbb;
  cursor: pointer;
  overflow: hidden;
  position: relative; /* Menjaga konteks posisi */
  transition: border-color 0.2s;
}

.upload-box:hover {
  border-color: #11162c;
}

/* Memastikan input file benar-benar tidak terlihat dan tidak mengganggu layout */
input[type="file"] {
  display: none;
}

/* Tambahan agar gambar pratinjau mengisi kotak dengan sempurna tanpa celah */
.upload-box img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
.btn-simpan {
  background-color: #28a745;
  color: white;
  border-radius: 20px;
  font-weight: bold;
}
.btn-batal {
  background-color: #ff0000;
  color: white;
  border-radius: 20px;
  font-weight: bold;
}
.btn-add {
  color: #11162c;
  font-weight: bold;
  text-decoration: none;
}
.filter-icon {
  font-size: 1.6rem;
  color: #11162c;
  cursor: pointer;
}

/* Subtles for buttons */
.bg-info-subtle {
  background-color: rgba(13, 202, 240, 0.2);
}
.bg-warning-subtle {
  background-color: rgba(255, 193, 7, 0.2);
}
.bg-danger-subtle {
  background-color: rgba(220, 53, 69, 0.2);
}
</style>
