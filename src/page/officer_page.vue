<template>
  <navbar
    v-if="!$route.meta.hideLayout"
    :menu="menus"
    :sub_menu="sub_menus"
    :changes_routess="change_router"
    :profile_routess="profile_router"
  />

  <component :is="activeComponent" />
</template>
<script setup>
import component_store from "@/store/component_store.js";

import { reactive, shallowRef, markRaw, onMounted } from "vue";
import calendars from "@/layouts/calendars.vue";
import home_officer from "@/components/officers/home_officer.vue";
import list_borrowed from "@/components/officers/list_borrowed.vue";
import history_list_borrowed from "@/components/officers/history_list_borrowed.vue";
const change_router = "/admin/officers";
const profile_router = "/officers";
const activeComponent = shallowRef(home_officer);
const store_component = component_store.use_component();
store_component.is_component = home_officer;

store_component.$subscribe((mutation, state) => {
  if (state.is_component) {
    activeComponent.value = state.is_component;
  }
});

const menus = reactive([
  {
    name: "Halaman Utama",
    component: markRaw(home_officer),
  },
  {
    name: "Kalender",
    component: markRaw(calendars),
  },
  {
    name: "Daftar Peminjaman",
    component: markRaw(list_borrowed),
  },
  {
    name: "Riwayat",
    component: markRaw(history_list_borrowed),
  },
]);

const sub_menus = reactive([
  { name: "Kelola Profile", modals: "profile" },
  { name: "Pengaturan", modals: "setting" },
]);
</script>
<style scoped></style>
