<template>
  <div class="container-fluid py-5 min-vh-100 bg-light-texture">
    <div class="container">
      <div class="row mb-5 align-items-center">
        <div class="col-md-6">
          <h1 class="display-3 fw-light text-secondary mb-0">RIWAYAT</h1>
          <!-- <h1 class="display-4 fw-bold text-dark-blue mt-n2"></h1> -->
        </div>
        <div class="col-md-6 text-end d-none d-md-block">
          <div class="header-line"></div>
        </div>
      </div>
    </div>
    <div class="row mb-4 px-md-5">
      <div class="col-12 d-flex justify-content-end pe-4 gap-2">
        <!-- <button
          @click="activeCategory = 'facility'"
          :class="[
            'btn fw-bold px-4 py-2 rounded-3',
            activeCategory === 'facility' ? 'btn-orange' : 'btn-dark-blue',
          ]"
        >
          FASILITAS
        </button>
        <button
          @click="activeCategory = 'room'"
          :class="[
            'btn fw-bold px-4 py-2 rounded-3',
            activeCategory === 'room' ? 'btn-orange' : 'btn-dark-blue',
          ]"
        >
          RUANGAN
        </button> -->
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
                @click="activeCategory = 'facility'"
                >Fasilitas</a
              >
            </li>
            <li>
              <a
                class="dropdown-item rounded"
                href="#"
                @click="activeCategory = 'room'"
                >Ruangan</a
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <!-- <li>
              <a
                class="dropdown-item rounded"
                href="#"
                @click="filterType = 'semua'"
                >Tampilkan Semua</a
              >
            </li> -->
          </ul>
        </div>
      </div>
    </div>

    <div class="row px-md-5">
      <div class="col-12 overflow-auto">
        <table class="table table-bordered custom-table text-center shadow-sm">
          <thead>
            <tr>
              <th>NO</th>
              <th>
                NAMA
                {{ activeCategory === "facility" ? "FASILITAS" : "RUANGAN" }}
              </th>
              <th v-if="activeCategory === 'facility'">JUMLAH</th>
              <th>RINCIAN</th>
              <th>STATUS</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in filteredBorrowedList" :key="index">
              <td class="align-middle fw-bold">{{ index + 1 }}</td>
              <td class="align-middle">{{ data.item.name }}</td>
              <td v-if="activeCategory === 'facility'" class="align-middle">
                {{ data.quantity }}
              </td>
              <td class="align-middle">
                <button
                  class="btn btn-link text-dark"
                  @click="openDetail(data)"
                >
                  <i class="bi bi-eye fs-4"></i>
                </button>
              </td>
              <td class="align-middle text-capitalize">
                {{ getStatusLabel(data.item.status) }}
              </td>
              <td class="align-middle">
                <button
                  v-if="data.item.status.approved || data.item.status.pending"
                  class="btn btn-danger rounded-pill px-4 btn-sm fw-bold"
                  @click="handleCancel(data)"
                >
                  BATALKAN
                </button>
                <button
                  v-if="data.item.status.rejected"
                  class="btn btn-danger rounded-pill px-4 btn-sm fw-bold"
                  @click="handleCancel(data)"
                >
                  HAPUS
                </button>
              </td>
            </tr>
            <tr v-if="filteredBorrowedList.length === 0">
              <td
                :colspan="activeCategory === 'facility' ? 6 : 5"
                class="py-5 text-muted"
              >
                Tidak ada data peminjaman untuk kategori ini.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalDetailBorrowed"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content custom-modal-content border-0">
          <div class="modal-header border-0 pb-0">
            <button
              type="button"
              class="btn-link text-dark text-decoration-none fw-bold border-0 bg-transparent"
              data-bs-dismiss="modal"
            >
              KEMBALI
            </button>
          </div>
          <div class="modal-body p-4 p-md-5">
            <div class="row align-items-start">
              <div class="col-lg-8">
                <div class="mb-3">
                  <label class="fw-bold d-block mb-1">NAMA</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    :value="data_currents.name"
                    readonly
                  />
                </div>
                <div class="mb-3">
                  <label class="fw-bold d-block mb-1">NIM/NIPN</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    :value="data_currents.nim"
                    readonly
                  />
                </div>
                <div class="mb-3">
                  <label class="fw-bold d-block mb-1">NO TELEPON</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    :value="data_currents.phone_number"
                    readonly
                  />
                </div>
                <div class="mb-3">
                  <label class="fw-bold d-block mb-1">
                    {{
                      selectedData?.item?.type === "facility"
                        ? "FASILITAS"
                        : "RUANGAN"
                    }}
                    YANG DIPINJAM
                  </label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    :value="selectedData?.item?.name"
                    readonly
                  />
                </div>
                <div
                  class="mb-3"
                  v-if="selectedData?.item?.type === 'facility'"
                >
                  <label class="fw-bold d-block mb-1">JUMLAH PINJAM</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    :value="selectedData?.quantity"
                    readonly
                  />
                </div>
                <div class="mb-3">
                  <label class="fw-bold d-block mb-1">TANGGAL PEMINJAMAN</label>
                  <div class="d-flex align-items-center gap-2">
                    <input
                      type="text"
                      class="form-control custom-input text-center"
                      :value="selectedData?.start_date"
                      readonly
                    />
                    <span>-</span>
                    <input
                      type="text"
                      class="form-control custom-input text-center"
                      :value="selectedData?.end_date"
                      readonly
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label class="fw-bold d-block mb-1">WAKTU PEMINJAMAN</label>
                  <div class="d-flex align-items-center gap-2">
                    <input
                      type="text"
                      class="form-control custom-input text-center"
                      :value="selectedData?.start_time"
                      readonly
                    />
                    <span>-</span>
                    <input
                      type="text"
                      class="form-control custom-input text-center"
                      :value="selectedData?.end_time"
                      readonly
                    />
                  </div>
                </div>
                <div class="mb-0">
                  <label class="fw-bold d-block mb-1">ALASAN</label>
                  <textarea
                    class="form-control custom-input"
                    rows="3"
                    readonly
                    >{{ selectedData?.alasan }}</textarea
                  >
                </div>
              </div>

              <div class="col-lg-4 text-center mt-4 mt-lg-0">
                <div
                  v-show="status.pending"
                  class="status-badge py-2 px-4 rounded-pill mb-3 fw-bold text-white bg-secondary"
                >
                  Belum Disetujui
                </div>
                <div
                  v-show="status.approved"
                  class="status-badge py-2 px-4 rounded-pill mb-3 fw-bold text-white bg-success"
                >
                  Disetujui
                </div>
                <div
                  v-show="status.rejected"
                  class="status-badge py-2 px-4 rounded-pill mb-3 fw-bold text-white bg-danger"
                >
                  Ditolak
                </div>
                <p class="h5" v-show="status.rejected">Alasan Ditolak</p>
                <textarea
                  class="p-3"
                  readonly
                  v-show="selectedData?.reason_for_rejection"
                  :value="selectedData?.reason_for_rejection"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {
  callAPI,
  sweet_alert_response_error,
  sweet_alert_response_success,
} from "@/store/helper.js";
import role_store from "@/store/role_store.js";
const role = role_store.use_role_page_store();

const data_currents = ref({});

const borrowedList = ref([]);
const activeCategory = ref("facility"); // Default filter
const selectedData = ref(null);
const status = reactive({ approved: "", rejected: "", pending: "" });

// Ambil Data
const fetchData = async () => {
  try {
    const res = await callAPI("/borrowed_items", "", "GET");
    borrowedList.value = res.result.borrowed_list || [];
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// Filter Berdasarkan Tipe (Facility/Room)
const filteredBorrowedList = computed(() => {
  return borrowedList.value.filter(
    (item) => item.item.type === activeCategory.value,
  );
});

// Helper Label Status
const getStatusLabel = (status) => {
  if (status.approved) return "disetujui";
  if (status.pending) return "belum disetujui";
  return "ditolak";
};

// Fungsi Modal
const openDetail = (data) => {
  const { approved, pending, rejected } = data?.item.status;
  status.approved = approved || false;
  status.rejected = rejected || false;
  status.pending = pending;
  selectedData.value = data;
  const modal = new bootstrap.Modal(
    document.getElementById("modalDetailBorrowed"),
  );
  modal.show();
};

const handleCancel = async (data) => {
  try {
    const res = await callAPI("/borrowed_items", data, "DELETE");
    sweet_alert_response_success(res.result.message);
    await fetchData();
  } catch (error) {
    const err = await error.json();
    sweet_alert_response_error(err.error);
  }
  return;
};

onMounted(() => {
  data_currents.value.name = role.data_current.name;
  data_currents.value.nim = role.data_current.nim;
  data_currents.value.phone_number = role.data_current.phone_number;
  fetchData();
});
</script>

<style scoped>
.header-line {
  height: 2px;
  background: linear-gradient(to right, #dee2e6, #11162c);
  width: 100%;
}
.bg-light-texture {
  /* background-image: url("https://www.transparenttextures.com/patterns/white-wall-3.png"); */
  background-color: #f8f9fa;
}

/* Tombol Filter */
.btn-dark-blue {
  background-color: #11162c;
  color: white;
  border: none;
}
.btn-orange {
  background-color: #ff8400;
  color: white;
  border: none;
}

/* Tabel Styling */
.custom-table {
  border-radius: 10px;
  overflow: hidden;
  background: #d9d9d9;
}
.custom-table thead {
  background-color: #11162c;
  color: white;
}
.custom-table th,
.custom-table td {
  padding: 15px;
  border-color: #adb5bd !important;
}

/* Modal Styling */
.custom-modal-content {
  background-color: #d9d9d9;
  border-radius: 20px;
}
.custom-input {
  border: none;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
}
.status-badge {
  font-size: 1.1rem;
}

/* Background texture simulasi gambar */
.container-fluid {
  position: relative;
}
</style>
