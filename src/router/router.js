import { createRouter, createWebHistory } from "vue-router";
import welcome from "@/layouts/welcome.vue";
import login from "@/layouts/login.vue";
import admin_page from "@/page/admin_page.vue";
import user_page from "@/page/user_page.vue";
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
    {
      path: "/admin_page",
      name: "admin",
      component: admin_page,
      meta: { title: "Admin", requiresAuth: true },
    },
    {
      path: "/mahasiswa_page",
      name: "mhasiswa",
      component: user_page,
      meta: { title: "Mahasiswa", requiresAuth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const token = document.cookie;
  // currentPage.value = to.name;
  document.title = to.meta.title;

  if (to.meta.requiresAuth && token.length == 0) {
    return next("/login");
  }

  // if (token != 0) {
  //   return next("/");
  // }

  next();
});
export default router;
