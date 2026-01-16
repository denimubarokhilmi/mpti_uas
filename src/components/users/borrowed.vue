<template>
  <div class="container py-5 min-vh-100">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex gap-2">
        <button
          @click="activeCategory = 'facility'"
          :class="[
            'btn fw-bold px-4 py-2',
            activeCategory === 'facility' ? 'btn-orange' : 'btn-dark-blue',
          ]"
        >
          FASILITAS
        </button>
        <button
          @click="activeCategory = 'room'"
          :class="[
            'btn fw-bold px-4 py-2',
            activeCategory === 'room' ? 'btn-orange' : 'btn-dark-blue',
          ]"
        >
          RUANGAN
        </button>
      </div>
      <button
        class="btn btn-outline-dark rounded-pill px-4"
        data-bs-toggle="modal"
        data-bs-target="#modalPinjam"
      >
        <i class="bi bi-list-check me-2"></i> PINJAM
      </button>
    </div>

    <div class="row g-4">
      <div
        v-for="item in filteredData"
        :key="item.id_facility || item.id_room"
        class="col-md-6"
      >
        <div
          v-if="item?.status?.available"
          class="item-card d-flex align-items-center p-3 shadow-sm"
        >
          <div class="image-wrapper me-3">
            <img
              :src="item.image"
              :alt="item.name"
              class="rounded-pill img-fluid shadow-sm"
            />
          </div>
          <div class="flex-grow-1">
            <h4 class="text-uppercase mb-0 text-white fw-bold">
              {{ item.name }}
            </h4>
          </div>
          <button class="btn text-white fs-4" @click="showDetail(item)">
            <i class="bi bi-eye"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalDetail" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content custom-modal-bg rounded-4 p-4 border-0">
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="text-center mb-3">
            <img
              :src="selectedItem.image"
              class="rounded-4 img-fluid detail-img shadow"
            />
          </div>
          <div class="info-text text-dark-blue px-3">
            <p class="mb-1"><strong>NAMA :</strong> {{ selectedItem.name }}</p>
            <p class="mb-1">
              <strong>TERSEDIA :</strong> {{ selectedItem.quantity_available }}
            </p>
            <p class="mb-0">
              <strong>DESKRIPSI :</strong> {{ selectedItem.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalPinjam" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content custom-modal-bg rounded-4 p-5 border-0">
          <h2 class="text-dark-blue fw-bold mb-4">PEMINJAMAN</h2>
          <form @submit.prevent="submitPeminjaman">
            <div class="mb-3">
              <label class="fw-bold">NAMA</label>
              <input
                v-model="data_currents.name"
                readonly
                type="text"
                class="form-control rounded-pill custom-input"
              />
            </div>
            <div class="mb-3">
              <label class="fw-bold">NIM/NIP</label>
              <input
                v-model="data_currents.nim"
                readonly
                type="text"
                class="form-control rounded-pill custom-input"
              />
            </div>
            <div class="mb-3">
              <label class="fw-bold">NO TELEPON</label>
              <input
                v-model="data_currents.phone_number"
                readonly
                type="text"
                class="form-control rounded-pill custom-input"
              />
            </div>
            <div class="mb-3">
              <label class="fw-bold"
                >PILIH {{ activeCategory.toUpperCase() }}</label
              >

              <select
                v-model="formPinjam.items_id"
                class="form-select rounded-pill custom-input"
              >
                <option
                  v-for="opt in filteredData"
                  :key="opt.id_facility || opt.id_room"
                  :value="opt.id_facility || opt.id_room"
                  v-show="opt.status.available"
                >
                  {{ opt.name }}
                </option>
              </select>
              <div v-if="activeCategory == 'facility'" class="mb-3">
                <label class="fw-bold">quantity</label>
                <input
                  v-model="formPinjam.quantity"
                  type="number"
                  class="form-control rounded-3 custom-input"
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-6 col-md-3">
                <label class="fw-bold small">TANGGAL MULAI</label>
                <input
                  v-model="formPinjam.start_date"
                  type="date"
                  class="form-control rounded-3 custom-input"
                />
              </div>
              <div class="col-6 col-md-3">
                <label class="fw-bold small">TANGGAL SELESAI</label>
                <input
                  v-model="formPinjam.end_date"
                  type="date"
                  class="form-control rounded-3 custom-input"
                />
              </div>
              <div class="col-6 col-md-3">
                <label class="fw-bold small">JAM MULAI</label>
                <input
                  v-model="formPinjam.start_time"
                  type="time"
                  class="form-control rounded-3 custom-input"
                />
              </div>
              <div class="col-6 col-md-3">
                <label class="fw-bold small">JAM SELESAI</label>
                <input
                  v-model="formPinjam.end_time"
                  type="time"
                  class="form-control rounded-3 custom-input"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="fw-bold">ALASAN PENGAJUAN</label>
              <textarea
                v-model="formPinjam.alasan"
                class="form-control rounded-3 custom-input"
                rows="3"
              ></textarea>
            </div>
            <div class="d-flex justify-content-center gap-3">
              <button
                type="submit"
                class="btn btn-success rounded-pill px-5 fw-bold"
              >
                AJUKAN
              </button>
              <button
                type="button"
                class="btn btn-danger rounded-pill px-5 fw-bold"
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
</template>

<script setup>
import { callAPI } from "@/store/helper.js";
import { reactive, ref, onMounted, computed } from "vue";
import role_store from "@/store/role_store.js";
import {
  sweet_alert_response_error,
  sweet_alert_response_success,
} from "@/store/helper.js";
const role = role_store.use_role_page_store();
const data_inventory = reactive({ facility: [], room: [] });
const activeCategory = ref("facility");
const selectedItem = ref({});
const formPinjam = reactive({
  items_id: "",
  start_date: "",
  end_date: "",
  start_time: "",
  quantity: 0,
  end_time: "",
  alasan: "",
});
const data_currents = ref({});
const binding_data = async () => {
  try {
    const result = await callAPI("/inventory", "", "GET");
    data_inventory.facility = result.result.facility;
    data_inventory.room = result.result.room;
  } catch (error) {
    console.log(error);
  }
  return;
};

const filteredData = computed(() => {
  return activeCategory.value === "facility"
    ? data_inventory.facility
    : data_inventory.room;
});

const showDetail = (item) => {
  selectedItem.value = item;
  const modal = new bootstrap.Modal(document.getElementById("modalDetail"));
  modal.show();
};

onMounted(async () => {
  try {
    await binding_data();
    data_currents.value.name = role.data_current.name;
    data_currents.value.nim = role.data_current.nim;
    data_currents.value.phone_number = role.data_current.phone_number;
  } catch (error) {
    console.log(error);
  }
});

const reset = () => {
  (formPinjam.alasan = ""),
    (formPinjam.end_date = ""),
    (formPinjam.end_time = ""),
    (formPinjam.items_id = ""),
    (formPinjam.quantity = 0),
    (formPinjam.start_date = ""),
    (formPinjam.start_time = "");
  return;
};
const submitPeminjaman = async () => {
  try {
    const res = await callAPI("/borrowed_items", formPinjam, "POST");
    sweet_alert_response_success(res.result.message);
    await binding_data();
    reset();
    const modalElement = document.getElementById("modalPinjam");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
    return;
  } catch (error) {
    const err = await error.json();
    console.log(err);
    sweet_alert_response_error(err.error);
  }
  return;
};
</script>

<style scoped>
.btn-dark-blue {
  background-color: #11162c;
  color: white;
}
.btn-orange {
  background-color: #ff8400;
  color: white;
}
.text-dark-blue {
  color: #11162c;
}

.item-card {
  background-color: #11162c;
  border-radius: 15px;
  min-height: 80px;
}

.image-wrapper img {
  width: 100px;
  height: 60px;
  object-fit: cover;
}

.custom-modal-bg {
  background-color: #d9d9d9 !important;
}

.detail-img {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border: 4px solid #11162c;
}

.custom-input {
  border: none !important;
  background-color: white !important;
  padding: 10px 20px;
  font-weight: 500;
}

label {
  color: #11162c;
  font-size: 0.9rem;
  margin-left: 5px;
  margin-bottom: 2px;
}
</style>
