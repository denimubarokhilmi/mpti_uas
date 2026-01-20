<template>
  <div class="calendars bg-texture min-vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-9 p-4">
          <h1 class="display-3 fw-normal text-primary-dark mt-2 ms-3">
            KALENDER
          </h1>

          <div class="text-center mb-4">
            <span
              class="badge bg-dark text-primary-dark px-4 py-2 fs-5 shadow-sm border text-uppercase"
            >
              {{ monthName }} {{ currentYear }}
            </span>
          </div>

          <div
            class="table-responsive shadow-sm bg-white bg-opacity-50 rounded-4 overflow-hidden border"
          >
            <div class="calendar-grid">
              <div v-for="day in days" :key="day" class="calendar-day-header">
                {{ day }}
              </div>

              <div
                v-for="(date, index) in calendarDates"
                :key="index"
                class="calendar-date"
                :class="{
                  'date-active': date.active,
                  'date-muted': date.muted,
                  'has-booking': hasBorrowing(date),
                  'date-selected': getDateString(date) === selectedDate,
                }"
                @mouseenter="setHoveredDate(date)"
                @mouseleave="hoveredDate = null"
                @click="selectDate(date)"
              >
                <span class="date-number">{{ date.value }}</span>
                <div v-if="hasBorrowing(date)" class="booking-dot"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 p-0">
          <div class="data_borrowed shadow-lg p-4">
            <h4 class="mt-4 fw-bold">DETAIL PINJAMAN</h4>

            <div v-if="activeDateDisplay" class="mb-2">
              <span class="badge bg-warning text-dark me-2">
                {{ hoveredDate ? "Melihat" : "Terpilih" }}
              </span>
              <small class="text-white-50">{{ activeDateDisplay }}</small>
            </div>

            <hr class="border-white border-1 opacity-100 mt-1" />

            <div class="detail-container">
              <div v-if="activeItems.length > 0">
                <div
                  v-for="item in activeItems"
                  :key="item.borrowed_id"
                  class="borrow-card mb-3 animate-in"
                  v-show="item.item.status.approved"
                >
                  <div class="d-flex align-items-center mb-2">
                    <img
                      :src="`${path_image}${item.item.image}`"
                      class="thumb-img me-2"
                      alt="item"
                    />
                    <span
                      class="badge"
                      :class="
                        item.item.type === 'room' ? 'bg-info' : 'bg-warning'
                      "
                    >
                      {{ item.item.type.toUpperCase() }}
                    </span>
                  </div>
                  <h5 class="item-name text-white m-0">{{ item.item.name }}</h5>

                  <div class="time-info mt-2">
                    <div class="d-flex justify-content-between small">
                      <span
                        ><i class="bi bi-calendar-event me-1"></i> Mulai:</span
                      >
                      <span>{{ item.start_date }} ({{ item.start_time }})</span>
                    </div>
                    <div class="d-flex justify-content-between small">
                      <span
                        ><i class="bi bi-calendar-check me-1"></i>
                        Selesai:</span
                      >
                      <span>{{ item.end_date }} ({{ item.end_time }})</span>
                    </div>
                  </div>

                  <div class="reason-box mt-2">
                    <small class="fst-italic">"{{ item.alasan }}"</small>
                  </div>
                </div>
              </div>

              <div v-else class="empty-state text-center mt-5">
                <i class="bi bi-calendar2-range fs-1 opacity-25"></i>
                <p class="mt-3 opacity-50 italic">
                  {{
                    activeDateDisplay
                      ? "Tidak ada pinjaman pada tanggal ini"
                      : "Klik atau Hover pada tanggal untuk melihat detail"
                  }}
                </p>
              </div>
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
import { path_image } from "@/main.js";

// State
const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const borrowedList = ref([]);
const hoveredDate = ref(null);
const selectedDate = ref(null); // State baru untuk klik

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();

const monthName = computed(() =>
  today.toLocaleString("id-ID", { month: "long" }),
);

// Logika Kalender
const calendarDates = computed(() => {
  const dates = [];
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  for (let i = startOffset - 1; i >= 0; i--) {
    dates.push({ value: daysInPrevMonth - i, muted: true, active: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    dates.push({ value: d, muted: false, active: d === currentDate });
  }
  while (dates.length % 7 !== 0) {
    const nextDate = dates.length - (startOffset + daysInMonth) + 1;
    dates.push({ value: nextDate, muted: true, active: false });
  }
  return dates;
});

// Helper Formatting
const getDateString = (dateObj) => {
  if (dateObj.muted) return null;
  const month = String(currentMonth + 1).padStart(2, "0");
  const day = String(dateObj.value).padStart(2, "0");
  return `${currentYear}-${month}-${day}`;
};

// Actions
const setHoveredDate = (date) => {
  const ds = getDateString(date);
  if (ds) hoveredDate.value = ds;
};

const selectDate = (date) => {
  const ds = getDateString(date);
  if (ds) selectedDate.value = ds;
};

const hasBorrowing = (date) => {
  const ds = getDateString(date);
  if (!ds) return false;
  return borrowedList.value.some((b) => ds >= b.start_date && ds <= b.end_date);
};

// Computed: Tanggal yang aktif untuk ditampilkan keterangannya
const activeDateDisplay = computed(() => {
  return hoveredDate.value || selectedDate.value;
});

// Computed: Data yang tampil (Hover diprioritaskan, jika tidak ada hover tampilkan klik)
const activeItems = computed(() => {
  const targetDate = hoveredDate.value || selectedDate.value;
  if (!targetDate) return [];
  return borrowedList.value.filter(
    (b) => targetDate >= b.start_date && targetDate <= b.end_date,
  );
});

const fetch_data = async () => {
  try {
    const res = await callAPI("/borrowed_items", "", "GET");
    borrowedList.value = res.result.borrowed_list || [];
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
};

onMounted(() => {
  fetch_data();
});
</script>

<style scoped>
.calendars {
  background-image: url("@/assets/img/bg_mpti.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
}
.data_borrowed {
  background-color: #11162c;
  color: white;
  min-height: 100vh;
  position: sticky;
  top: 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
}

.calendar-day-header {
  font-weight: bold;
  color: #11162c;
  padding: 15px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #dee2e6;
}

.calendar-date {
  aspect-ratio: 1 / 0.8;
  padding: 10px;
  border: 0.5px solid #dee2e6;
  position: relative;
  transition: all 0.2s;
  cursor: pointer;
}

/* Hover effect */
.calendar-date:hover:not(.date-muted) {
  background-color: #1a2142;
  color: white;
  z-index: 5;
}

/* Highlight saat diklik */
.date-selected {
  background-color: var(--primary-dark) !important;
  color: white !important;
  border: 2px solid #11162c !important;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
}

.date-selected .date-number {
  font-weight: 800;
}

.date-selected .booking-dot {
  background-color: #11162c;
}

.date-number {
  font-weight: 500;
}
.date-muted {
  background-color: #f1f1f1;
  color: #bbb;
  cursor: default;
}
.date-active {
  background-color: rgba(17, 22, 44, 0.1);
  color: #11162c;
}

.booking-dot {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background-color: #ffc107;
  border-radius: 50%;
}

.borrow-card {
  background: rgba(255, 255, 255, 0.08);
  border-left: 4px solid #ffc107;
  padding: 15px;
  border-radius: 0 8px 8px 0;
}

.thumb-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.time-info {
  background: rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 5px;
}

.reason-box {
  color: #0dcaf0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 5px;
}

.animate-in {
  animation: fadeInRight 0.3s ease-out;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .calendar-date {
    padding: 5px;
    font-size: 0.8rem;
  }
  .data_borrowed {
    min-height: auto;
  }
}
</style>
