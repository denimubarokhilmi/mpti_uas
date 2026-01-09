import { createRouter, createWebHistory } from "vue-router";
import welcome from "@/layouts/welcome.vue";
import login from "@/layouts/login.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: welcome,
      meta: {
        title: "Welcome",
        hideLayout: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: { title: "Login", hideLayout: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // const token = document.cookie;
  // currentPage.value = to.name;
  document.title = to.meta.title;

  // if (to.meta.requiresAuth && token.length == 0) {
  //     return next("/admin/login");
  // }

  // if (to.path === "/admin/login" && token != 0) {
  //     return next("/admin/dashboard");
  // }

  next();
});
export default router;
