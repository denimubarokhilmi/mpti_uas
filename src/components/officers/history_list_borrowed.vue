<template>
  <div class="dashboard-container min-vh-100 p-4 p-md-5">
    <section>
      <div class="row mb-5 align-items-center">
        <div class="col-md-6">
          <h1 class="display-3 fw-light text-secondary mb-0">RIWAYAT</h1>
          <!-- <h1 class="display-4 fw-bold text-dark-blue mt-n2"></h1> -->
        </div>
        <div class="col-md-6 text-end d-none d-md-block">
          <div class="header-line"></div>
        </div>
      </div>
      <div class="d-flex justify-content-end gap-4 mb-4">
        <!-- <button
          @click="activeCategory = 'facility'"
          :class="[
            'btn filter-btn px-4 py-2',
            activeCategory === 'facility' ? 'btn-orange' : 'btn-dark-blue',
          ]"
        >
          FASILITAS
        </button>
        <button
          @click="activeCategory = 'room'"
          :class="[
            'btn filter-btn px-4 py-2',
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

      <div class="table-responsive shadow-sm rounded-4">
        <table class="table table-bordered text-center custom-table m-0">
          <thead>
            <tr>
              <th>NO</th>
              <th>NAMA</th>
              <!-- <th>BAGIAN</th> -->
              <th>NIM/NIPN</th>
              <th>
                {{
                  activeCategory === "facility"
                    ? "NAMA FASILITAS (JML)"
                    : "NAMA RUANGAN"
                }}
              </th>
              <th>RINCIAN</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in filteredList" :key="index">
              <td class="align-middle fw-bold">{{ index + 1 }}</td>
              <td class="align-middle text-uppercase">{{ data.user_id }}</td>
              <!-- <td></td> -->
              <td class="align-middle">
                {{ data.nim || "12345" }}
              </td>
              <td class="align-middle text-uppercase">
                {{ data.item.name }}
                {{ data.quantity > 0 ? "(" + data.quantity + ")" : "" }}
              </td>
              <td class="align-middle">
                <button
                  class="btn btn-link text-dark p-0"
                  @click="openDetail(data)"
                >
                  <i class="bi bi-eye fs-4"></i>
                </button>
              </td>
              <td>
                {{
                  data.item.status.approved
                    ? "Disetujui"
                    : data.item.status.rejected
                      ? "Ditolak"
                      : ""
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="modal fade" id="modalDetail" tabindex="-1">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 bg-gray-custom p-4">
          <div class="modal-header border-0 pb-0">
            <button
              type="button"
              class="btn text-dark fw-bold border-0"
              data-bs-dismiss="modal"
            >
              KEMBALI
            </button>
          </div>
          <div class="modal-body">
            <div class="row align-items-start">
              <div class="col-lg-8">
                <div class="row g-3">
                  <div class="col-12">
                    <label class="fw-bold small">NAMA</label>
                    <div class="custom-input">{{ selectedData?.user_id }}</div>
                  </div>
                  <div class="col-12">
                    <label class="fw-bold small">NIM/NIPN</label>
                    <div class="custom-input">
                      {{ selectedData?.nim || "12345" }}
                    </div>
                  </div>
                  <!-- <div class="col-12">
                    <label class="fw-bold small">BAGIAN</label>
                    <div class="custom-input">MAHASISWA</div>
                  </div> -->
                  <div class="col-12">
                    <label class="fw-bold small">BARANG YANG DIPINJAM</label>
                    <div class="d-flex align-items-center gap-2 mb-2">
                      <div class="custom-input flex-grow-1 text-uppercase">
                        {{ selectedData?.item.name }}
                      </div>
                      <div class="qty-box">
                        {{ selectedData?.quantity }}
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="fw-bold small">TANGGAL PEMINJAMAN</label>
                    <div class="d-flex gap-2 flex-wrap">
                      <div class="custom-input text-center flex-grow-1">
                        {{ selectedData?.start_date }}
                      </div>
                      <div class="custom-input text-center flex-grow-1">
                        {{ selectedData?.end_date }}
                      </div>
                      <div class="custom-input text-center flex-grow-1">
                        {{ selectedData?.start_time }}
                      </div>
                      <div class="custom-input text-center flex-grow-1">
                        {{ selectedData?.end_time }}
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="fw-bold small">ALASAN</label>
                    <div class="custom-input min-h-80">
                      {{ selectedData?.alasan }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div
                class="col-lg-4 mt-4 mt-lg-0"
                v-if="selectedData?.item.status.pending"
              >
                <div class="d-flex gap-2 mb-3">
                  <button
                    @click="confirmAction('setuju')"
                    class="btn btn-success w-50 py-2 fw-bold rounded-pill"
                  >
                    SETUJU
                  </button>
                  <button
                    @click="confirmAction('tidak')"
                    class="btn btn-danger w-50 py-2 fw-bold rounded-pill"
                  >
                    TIDAK
                  </button>
                </div>
                <div class="mb-3">
                  <label class="fw-bold small">ALASAN (JIKA TIDAK)</label>
                  <textarea
                    class="custom-input min-h-150 text-muted small"
                    name="alasan_penolakan"
                    id="tolak"
                    v-model="reason_for_rejection"
                  ></textarea>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { callAPI } from "@/store/helper.js";
// import {
//   sweet_alert_response_error,
//   sweet_alert_response_success,
// } from "@/store/helper.js";

const borrowedList = ref([]);
const activeCategory = ref("facility");
const selectedData = ref(null);

// const reason_for_rejection = ref("");

const fetchData = async () => {
  try {
    const res = await callAPI("/borrowed_items", "", "GET");
    borrowedList.value = res.result.borrowed_list || [];
  } catch (error) {
    console.error(error);
  }
};

const filteredList = computed(() => {
  return borrowedList.value.filter((i) => i.item.type === activeCategory.value);
});

const openDetail = (item) => {
  selectedData.value = item;
  const modal = new bootstrap.Modal(document.getElementById("modalDetail"));
  modal.show();
};

// const confirmAction = async (type) => {
//   try {
//     if (type == "tidak" && reason_for_rejection.value.length == 0) {
//       window.Swal.fire({
//         title: "Info!",
//         text: `silahkan isi alasan penolakan`,
//         icon: "info",
//         confirmButtonText: "Oke",
//       });
//       return;
//     }
//     const isApprove = type === "setuju";

//     window.Swal.fire({
//       title: isApprove ? "Setujui Peminjaman?" : "Tolak Peminjaman?",
//       text: `Apakah Anda yakin ingin ${isApprove ? "menyetujui" : "menolak"} pengajuan ini?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: isApprove ? "#198754" : "#dc3545",
//       cancelButtonColor: "#6c757d",
//       confirmButtonText: "Ya, Lanjutkan!",
//       cancelButtonText: "Batal",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const items_id =
//           selectedData.value.item.id_facility ||
//           selectedData.value.item.id_room;
//         const res = await callAPI(
//           "/officer/borrowed_items_receive",
//           { items_id },
//           "PUT",
//         );
//         sweet_alert_response_success(res.result.message);
//       }
//     });
//   } catch (error) {
//     const err = await error.json();
//     sweet_alert_response_error(err.error);
//   }
//   const modalElement = document.getElementById("modalDetail");
//   const modalInstance = bootstrap.Modal.getInstance(modalElement);

//   if (modalInstance) {
//     modalInstance.hide();
//   }
// };

onMounted(fetchData);
</script>

<style scoped>
.dashboard-container {
  background-color: #f8f9fa;
  background-image: radial-gradient(#ced4da 0.8px, transparent 0.8px);
  background-size: 20px 20px;
}

.text-dark-blue {
  color: #11162c;
}
.text-orange {
  color: #ff8400;
}
.header-line {
  height: 2px;
  background: #11162c;
  width: 100%;
  margin-top: 10px;
}
th {
  background-color: var(--primary-dark);
  color: white;
}

/* Cards */
.stat-card {
  background: #d9d9d9;
  border: 2px solid #11162c;
  border-radius: 15px;
}

/* Filter & Tables */
.btn-dark-blue {
  background: #11162c;
  color: white;
  border: none;
}
.btn-orange {
  background: #ff8400;
  color: white;
  border: none;
}
.custom-table thead {
  background: #11162c;
  color: white;
}
.custom-table tr {
  background: #d9d9d9;
}

/* Modal & Detail (Gambar d59f8c) */
.bg-gray-custom {
  background: #d9d9d9 !important;
}
.custom-input {
  background: white;
  padding: 10px 15px;
  border-radius: 10px;
  min-height: 45px;
  display: flex;
  align-items: center;
}
.qty-box {
  background: white;
  padding: 10px;
  border-radius: 8px;
  min-width: 45px;
  text-align: center;
  font-weight: bold;
}
.min-h-80 {
  min-height: 80px;
  align-items: flex-start;
}
.min-h-150 {
  min-height: 150px;
  align-items: flex-start;
  padding-top: 15px;
}

.map-placeholder {
  height: 200px;
  background: #d9d9d9;
  border: 1px dashed #11162c;
}
</style>
