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
import home_user from "@/components/users/home_user.vue";
import borrowed from "@/components/users/borrowed.vue";
import borrowed_history from "@/components/users/borrowed_history.vue";

const change_router = "/admin/users";
const profile_router = "/users";
const activeComponent = shallowRef(home_user);
const store_component = component_store.use_component();
store_component.is_component = home_user;

store_component.$subscribe((mutation, state) => {
  if (state.is_component) {
    activeComponent.value = state.is_component;
  }
});

const menus = reactive([
  {
    name: "Halaman Utama",
    component: markRaw(home_user),
  },
  {
    name: "Kalender",
    component: markRaw(calendars),
  },
  {
    name: "Peminjaman",
    component: markRaw(borrowed),
  },
  {
    name: "Riwayat",
    component: markRaw(borrowed_history),
  },
]);

const sub_menus = reactive([
  { name: "Kelola Profile", modals: "profile" },
  { name: "Pengaturan", modals: "setting" },
]);
</script>
<style scoped></style>
