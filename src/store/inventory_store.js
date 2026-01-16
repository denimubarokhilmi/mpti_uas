import { defineStore } from "pinia";
import { ref } from "vue";
import { callAPI } from "./helper.js";

const use_inventory = defineStore("inventory_store", () => {
  const inventory = ref("");
  const get_inventory = async (path, payload, methods) => {
    try {
      inventory.value = await callAPI(path, payload, methods);
      return;
    } catch (error) {
      throw error;
    }
  };
  return {
    inventory,
    get_inventory,
  };
});

export default {
  use_inventory,
};
