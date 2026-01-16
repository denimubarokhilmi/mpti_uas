import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { callAPI } from "./helper.js";
const use_role_page_store = defineStore("role_page_store", () => {
  const role_page = ref("");
  const profile_route = ref("");
  const changes_route = ref("");
  let data_current = reactive({});
  const get_current_user = async (path, payload, method) => {
    try {
      const res = await callAPI(path, payload, method);
      Object.assign(data_current, res?.result);
      role_page.value = res?.result?.name;
      const { role } = res?.result;
      if (role == "user") {
        profile_route.value = "/users";
        changes_route.value = "/admin/users";
      }
      if (role == "officer") {
        profile_route.value = "/officers";
        changes_route.value = "/admin/officers";
      } else {
        profile_route.value = "/admin";
        changes_route.value = "/admin/profile";
      }
    } catch (error) {
      throw error;
    }
  };
  return {
    role_page,
    profile_route,
    changes_route,
    data_current,
    get_current_user,
  };
});

export default {
  use_role_page_store,
};
