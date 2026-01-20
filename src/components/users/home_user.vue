<template>
  <div class="landing-page min-vh-100 p-4 p-md-5">
    <div class="container-fluid py-4">
      <div class="row mb-5 align-items-center">
        <div class="col-md-6">
          <h1 class="display-5 fw-light text-secondary mb-0">
            SELAMAT DATANG,
          </h1>
          <h1 class="display-4 fw-bold text-dark-blue mt-n2">
            {{ current_name }}
          </h1>
        </div>
        <div class="col-md-6 text-end d-none d-md-block">
          <div class="header-line"></div>
        </div>
      </div>

      <div class="row g-4 mb-5 justify-content-center">
        <div class="col-12 col-md-4">
          <div class="stat-card shadow-sm h-100 text-center p-4">
            <div class="icon-wrapper mb-3">
              <i class="bi bi-clock-history"></i>
              <!-- <UserIcon class="icon-dark" :size="48" /> -->
            </div>
            <div class="stat-value display-3 fw-bold text-orange">
              {{ count_borrrowed.pending }}
            </div>

            <div class="stat-label fw-bold text-secondary text-uppercase">
              Belum<br />Disetujui
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="stat-card shadow-sm h-100 text-center p-4">
            <div class="icon-wrapper mb-3">
              <i
                class="bi bi-check-circle-fill"
                style="font-size: 3rem; color: var(--primary-dark)"
              ></i>
              <!-- <UserIcon class="icon-dark" :size="48" /> -->
            </div>
            <div class="stat-value display-3 fw-bold text-orange">
              {{ count_borrrowed.approved }}
            </div>
            <div class="stat-label fw-bold text-secondary text-uppercase">
              Disetujui
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="stat-card shadow-sm h-100 text-center p-4">
            <div class="icon-wrapper mb-3">
              <i
                class="bi bi-card-list"
                style="font-size: 3rem; color: var(--primary-dark)"
              ></i>
              <!-- <UserIcon class="icon-dark" :size="48" /> -->
            </div>
            <div class="stat-value display-3 fw-bold text-orange">
              {{ count_borrrowed.total }}
            </div>
            <div class="stat-label fw-bold text-secondary text-uppercase">
              Total Pengajuan
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="stat-card shadow-sm h-100 text-center p-4">
            <div class="icon-wrapper mb-3">
              <i
                class="bi bi-x-circle-fill"
                style="font-size: 3rem; color: var(--primary-dark)"
              ></i>
              <!-- <UserIcon class="icon-dark" :size="48" /> -->
            </div>
            <div class="stat-value display-3 fw-bold text-orange">
              {{ count_borrrowed.rejected }}
            </div>
            <div class="stat-label fw-bold text-secondary text-uppercase">
              Ditolak
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import role_store from "@/store/role_store.js";
import { onMounted, ref, reactive } from "vue";
import { callAPI } from "@/store/helper.js";
const role = role_store.use_role_page_store();
const current_name = ref("");
const count_borrrowed = reactive({
  approved: "",
  pending: "",
  rejected: "",
  total: "",
});
onMounted(async () => {
  try {
    await role.get_current_user("/users", "", "GET");
    current_name.value = role.role_page;
    const res = await callAPI("/borrowed_items", "", "GET");
    const temp = res.result.borrowed_list.filter((el) => {
      return el.user_id == role.data_current.id_user;
    });
    count_borrrowed.total = temp.length;
    const temp_pending = temp.filter((el) => el.item.status.pending == true);
    const temp_approved = temp.filter((el) => el.item.status.approved == true);
    const temp_rejected =
      temp.filter((el) => el.item.status?.rejected == true) || 0;
    count_borrrowed.approved = temp_approved.length;
    count_borrrowed.pending = temp_pending.length;
    count_borrrowed.rejected = temp_rejected.length;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.bi-clock-history {
  color: var(--primary-dark);
  font-size: 3rem;
}
/* Color Palette */
.text-dark-blue {
  color: #11162c;
}

.text-orange {
  color: #ff8400;
}

/* Background Page (Berdasarkan gambar salju/putih bertekstur) */
.landing-page {
  background-image: url("@/assets/img/bg_mpti.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
}

/* Header Line */
.header-line {
  height: 2px;
  background: linear-gradient(to right, #dee2e6, #11162c);
  width: 100%;
}

/* Stat Cards */
.stat-card {
  background-color: #d9d9d9;
  border: 2px solid #11162c;
  border-radius: 25px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.icon-dark {
  color: #11162c;
}

.stat-label {
  letter-spacing: 1px;
  line-height: 1.2;
}

/* Map Placeholder */
.map-placeholder {
  background-color: #d9d9d9;
  min-height: 350px;
  border: 1px solid #dee2e6;
}

/* Utilitas Margin */
.mt-n2 {
  margin-top: -0.5rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2.5rem;
  }
  .stat-value {
    font-size: 3rem;
  }
}
</style>
