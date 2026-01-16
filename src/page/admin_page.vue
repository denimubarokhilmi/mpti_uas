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
import { reactive, shallowRef, markRaw } from "vue";
import home_admin from "@/components/admin/home_admin.vue";
import calendars from "@/layouts/calendars.vue";
import component_store from "@/store/component_store.js";
import facility_rooms from "@/components/admin/facility_rooms.vue";
import manage_user from "@/components/admin/manage_user.vue";

const activeComponent = shallowRef(home_admin);

const change_router = "/admin/profile";
const profile_router = "/admin";
const store_component = component_store.use_component();
store_component.is_component = home_admin;

store_component.$subscribe((mutation, state) => {
  if (state.is_component) {
    activeComponent.value = state.is_component;
  }
});

const menus = reactive([
  {
    name: "Halaman Utama",
    component: markRaw(home_admin),
  },
  {
    name: "Kalender",
    component: markRaw(calendars),
  },
  {
    name: "Ruangan dan Fasilitas",
    component: markRaw(facility_rooms),
  },
  {
    name: "Kelola Pengguna",
    component: markRaw(manage_user),
  },
]);

const sub_menus = reactive([
  { name: "Kelola Profile", modals: "profile" },
  { name: "Pengaturan", modals: "setting" },
]);
</script>
