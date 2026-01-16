import { defineStore } from "pinia";
import { shallowRef } from "vue";

const use_component = defineStore("component_store", () => {
  const is_component = shallowRef(null);

  const change_component = (component) => {
    is_component.value = component;
  };

  return {
    is_component,
    change_component,
  };
});

export default {
  use_component,
};
