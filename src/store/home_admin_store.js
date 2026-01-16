import { defineStore } from "pinia";
import { ref } from "vue";
import { callAPI } from "./helper.js";

const use_home = defineStore("home_store_admin", () => {
  const home_store = ref({
    inventory: {},
    officer_and_user: {},
  });
  const get_home_store_inventory = async (path, payload, methods) => {
    try {
      home_store.value.inventory = await callAPI(path, payload, methods);
      return;
    } catch (error) {
      throw error;
    }
  };
  const get_home_store_officer_and_user = async (path, payload, methods) => {
    try {
      home_store.value.officer_and_user = await callAPI(path, payload, methods);
      return;
    } catch (error) {
      throw error;
    }
  };
  return {
    home_store,
    get_home_store_inventory,
    get_home_store_officer_and_user,
  };
});

export default {
  use_home,
};
