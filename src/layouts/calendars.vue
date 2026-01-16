<template>
  <div class="bg-texture">
    <div class="container-fluid px-5 mt-4">
      <h1 class="display-3 fw-normal text-primary-dark mb-0">KALENDER</h1>

      <div class="text-center mb-4">
        <span
          class="badge bg-light text-primary-dark px-4 py-2 fs-5 shadow-sm border"
        >
          {{ monthName }}
        </span>
      </div>

      <div
        class="table-responsive shadow-sm bg-white bg-opacity-50 rounded-4 overflow-hidden"
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
            }"
          >
            {{ date.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();

const monthName = computed(() =>
  today.toLocaleString("en-US", { month: "long" })
);

const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
const startOffset = (firstDayOfMonth + 6) % 7;

const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

const calendarDates = computed(() => {
  const dates = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    dates.push({
      value: daysInPrevMonth - i,
      muted: true,
      active: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    dates.push({
      value: d,
      muted: false,
      active: d === currentDate,
    });
  }

  while (dates.length % 7 !== 0) {
    dates.push({
      value: dates.length,
      muted: true,
      active: false,
    });
  }

  return dates;
});
</script>

<style scoped>
.text-primary-dark {
  color: #11162c;
  letter-spacing: 2px;
}
.bg-texture {
  background-image: url("path-ke-gambar-background-anda.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: transparent;
}

.calendar-day-header {
  font-weight: bold;
  color: #11162c;
  padding: 15px;
  text-align: center;
}

.calendar-date {
  aspect-ratio: 1 / 0.8;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #2e2f3e;
  font-weight: 500;
  transition: all 0.2s;
}

.date-active {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.date-muted {
  background-color: #d9d9d9;
  color: #11162c;
}

@media (max-width: 768px) {
  .calendar-date {
    padding: 10px;
    font-size: 0.8rem;
  }
  .calendar-day-header {
    padding: 5px;
    font-size: 0.7rem;
  }
  .display-3 {
    font-size: 2.5rem;
  }
}
</style>
