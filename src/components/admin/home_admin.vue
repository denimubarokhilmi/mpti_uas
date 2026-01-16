<template>
  <div class="dashboard-wrapper min-vh-100 bg-white">
    <div class="container mt-5">
      <div class="row mb-5">
        <div class="col-12">
          <h1 class="display-4 fw-bold text-primary-dark">
            SELAMAT DATANG,<br />{{ current_name }}
          </h1>
          <hr class="w-25 border-dark border-2 opacity-100" />
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-6">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="stat-card shadow-sm">
                <div class="stat-icon-box">
                  <i class="bi bi-archive-fill"></i>
                </div>
                <div class="stat-number">{{ count_facility.length }}</div>
                <div class="stat-label">Jumlah Fasilitas</div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="stat-card shadow-sm">
                <div class="stat-icon-box">
                  <i class="bi bi-door-closed-fill"></i>
                </div>
                <div class="stat-number">{{ count_room.length }}</div>
                <div class="stat-label">Jumlah Ruangan</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div
            class="p-5 rounded-4 h-100 d-flex align-items-center justify-content-center border border-dashed text-secondary"
          >
            <canvas id="myChart" style="width: 100%; max-width: 600px"></canvas>
          </div>
        </div>
      </div>

      <div class="row mt-5 pt-4 pb-5 justify-content-end">
        <div class="col-auto d-flex align-items-center me-4">
          <span
            class="circle-indicator me-2"
            style="background-color: #11162c"
          ></span>
          <div>
            <small class="d-block text-secondary fw-bold">TOTAL PETUGAS</small>
            <span class="fw-bold text-warning">{{ count_officer.length }}</span>
          </div>
        </div>
        <div class="col-auto d-flex align-items-center me-4">
          <span
            class="circle-indicator me-2"
            style="background-color: #ff8400"
          ></span>
          <div>
            <small class="d-block text-secondary fw-bold"
              >TOTAL MAHASISWA</small
            >
            <span class="fw-bold text-warning">{{ count_users.length }}</span>
          </div>
        </div>
        <div class="col-auto d-flex align-items-center">
          <span
            class="circle-indicator me-2"
            style="background-color: red"
          ></span>
          <div>
            <small class="d-block text-secondary fw-bold">TOTAL PENGGUNA</small>
            <span class="fw-bold text-warning">{{
              count_users.length + count_officer.length
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import home_admin_store from "@/store/home_admin_store";
import role_store from "@/store/role_store.js";
const role = role_store.use_role_page_store();

const store_home_admin = home_admin_store.use_home();
const { home_store } = storeToRefs(store_home_admin);

const count_facility = reactive([]);
const count_room = reactive([]);
const count_users = reactive([]);
const count_officer = reactive([]);

const xValues = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const current_name = ref("");
const getCountPerYear = (dataArray, years) => {
  return years.map((year) => {
    return dataArray.filter((item) => item.date_of_entry == year).length;
  });
};

onMounted(async () => {
  try {
    await role.get_current_user("/admin", "", "GET");
    current_name.value = role.role_page;
    await store_home_admin.get_home_store_inventory("/inventory", "", "GET");
    await store_home_admin.get_home_store_officer_and_user(
      "/users_and_officer",
      "",
      "GET"
    );

    const result = home_store.value;
    count_facility.push(...result.inventory.result.facility);
    count_room.push(...result.inventory.result.room);
    count_users.push(...result.officer_and_user.result.user);
    count_officer.push(...result.officer_and_user.result.officer);

    const userDataForChart = getCountPerYear(count_users, xValues);
    const officerDataForChart = getCountPerYear(count_officer, xValues);
    const totalDataForChart = xValues.map(
      (_, i) => userDataForChart[i] + officerDataForChart[i]
    );

    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: "Mahasiswa",
            data: userDataForChart,
            borderColor: "#11162C",
            backgroundColor: "#11162C",
            pointRadius: 4,
            tension: 0.4,
          },
          {
            label: "Petugas",
            data: officerDataForChart,
            borderColor: "#FF8400",
            backgroundColor: "#FF8400",
            pointRadius: 4,
            tension: 0.4,
          },
          {
            label: "Total Pengguna",
            data: totalDataForChart,
            borderColor: "red",
            backgroundColor: "red",
            pointRadius: 4,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error loading chart data:", error);
  }
});
</script>

<style scoped>
.text-primary-dark {
  color: #11162c;
}

.border-dashed {
  border: 2px dashed #dee2e6 !important;
}
/* Card Statistik Dashboard */
.stat-card {
  background-color: #d9d9d9; /* Warna abu-abu sesuai gambar */
  border: 2px solid #11162c;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: transform 0.2s;
}

.stat-icon-box {
  background-color: #11162c;
  color: white;
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 1.5rem;
}

.stat-number {
  color: #ff8400; /* Warna oranye */
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1;
}

.stat-label {
  color: #11162c;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 5px;
}

/* Footer Statistik Bulat */
.circle-indicator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-block;
}
</style>
