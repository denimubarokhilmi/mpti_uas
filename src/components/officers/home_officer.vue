<template>
  <div class="dashboard-wrapper min-vh-100 p-4 p-md-5">
    <header class="mb-5 d-flex justify-content-between align-items-center">
      <div>
        <h2 class="welcome-text mb-0">SELAMAT DATANG,</h2>
        <h1 class="user-name display-5 fw-bold text-uppercase">
          {{ current_name }}
        </h1>
      </div>
      <div class="header-line"></div>
    </header>

    <div class="container-fluid px-0">
      <div class="row g-4 justify-content-center">
        <div
          v-for="(stat, index) in mainStats"
          :key="index"
          class="col-12 col-md-4"
        >
          <div class="stat-card shadow-sm p-4 text-center">
            <div class="stat-icon-wrapper mb-2">
              <i :class="stat.icon" class="fs-1 text-dark-blue"></i>
            </div>
            <div class="stat-value display-3 fw-bold text-orange">
              {{ stat.count }}
            </div>
            <div class="stat-label fw-bold text-dark-blue text-uppercase">
              {{ stat.label }}
            </div>
          </div>
        </div>

        <div
          v-for="(subStat, idx) in subStats"
          :key="'sub-' + idx"
          class="col-12 col-md-4"
        >
          <div class="stat-card shadow-sm p-4 text-center">
            <div class="stat-icon-wrapper mb-2">
              <i :class="subStat.icon" class="fs-1 text-dark-blue"></i>
            </div>
            <div class="stat-value display-3 fw-bold text-orange">
              {{ subStat.count }}
            </div>
            <div class="stat-label fw-bold text-dark-blue text-uppercase">
              {{ subStat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div
      class="map-section mt-5 rounded-4 d-flex align-items-center justify-content-center shadow-sm"
    >
      <p class="text-secondary fw-medium m-0">opsional map kampus</p>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { callAPI } from "@/store/helper.js";
import role_store from "@/store/role_store.js";

const role = role_store.use_role_page_store();
const borrowedData = ref([]);
const current_name = ref("");

const fetchData = async () => {
  try {
    await role.get_current_user("/officers", "", "GET");
    current_name.value = role.role_page;
    const res = await callAPI("/borrowed_items", "", "GET");
    borrowedData.value = res.result.borrowed_list || [];
  } catch (error) {
    console.error("Gagal load data landing page", error);
  }
};

const mainStats = computed(() => [
  {
    label: "Belum Disetujui",
    count: borrowedData.value.filter((i) => i.item.status.pending).length,
    icon: "bi  bi-clock-history",
  },
  {
    label: "Telah Disetujui",
    count: borrowedData.value.filter((i) => i.item.status.approved).length,
    icon: "bi bi-check-circle-fill",
  },
  {
    label: "Ditolak",
    count: borrowedData.value.filter((i) => i.item.status.rejected).length,
    icon: "bi bi-x-circle-fill",
  },
  {
    label: "Total Peminjaman",
    count: borrowedData.value.length,
    icon: "bi bi-card-list",
  },
]);

const subStats = computed(() => [
  {
    label: "Jumlah Ruangan",
    count: borrowedData.value.filter((i) => i.item.type === "room").length,
    icon: "bi bi-door-closed",
  },
  {
    label: "Fasilitas Yang Dipinjam",
    count: borrowedData.value.filter((i) => i.item.type === "facility").length,
    icon: "bi bi-box-seam",
  },
]);

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.dashboard-wrapper {
  background-color: #f8f9fa;
  background-image: url("@/assets/img/bg_mpti.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
}

.text-dark-blue {
  color: #11162c;
}
.header-line {
  height: 2px;
  background-color: #11162c;
  width: 50%;
  margin-top: 8px;
  opacity: 0.8;
}

.stat-card {
  background-color: #d9d9d9;
  border: 2px solid #11162c;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.text-orange {
  color: #ff8400;
}

.stat-icon-wrapper i {
  color: #11162c;
}

.map-section {
  background-color: #d9d9d9;
  height: 250px;
  border: 1px dashed #11162c;
  width: 100%;
}

@media (max-width: 768px) {
  .user-name {
    font-size: 2rem;
  }
  .stat-value {
    font-size: 2.5rem;
  }
}
</style>
