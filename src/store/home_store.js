import { defineStore } from "pinia";
import { ref } from "vue";
import { callAPI } from "./helper.js";

const use_home = defineStore("about_hero", () => {
  const home_store = ref(null);
  const get_home_store = async (path, HotPayload, methods) => {
    try {
      home_store.value = await callAPI(path, HotPayload, methods);
      return;
    } catch (error) {
      throw error;
    }
  };
  return {
    home_store,
    get_home_store,
  };
});

export default {
  use_home,
};
