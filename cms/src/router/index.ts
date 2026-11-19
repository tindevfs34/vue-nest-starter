// -- Core Framework --
import { createRouter, createWebHistory } from "vue-router";

// -- Internal Routes --
import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";

// -- Composables & Stores --
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/error/Error404Page.vue"),
    },
    {
      name: "Error 404",
      path: "/error",
      component: () => import("@/views/error/Error404Page.vue"),
    },
    {
      name: "Error 500",
      path: "/error500",
      component: () => import("@/views/error/Error500Page.vue"),
    },
    {
      name: "Error 503",
      path: "/error503",
      component: () => import("@/views/error/Error503Page.vue"),
    },
    AuthRoutes,
    {
      path: "/",
      redirect: "/dashboard",
      children: [MainRoutes],
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const uiStore = useUIStore();
  uiStore.isLoading = true;

  const publicPages = ["/login", "/error", "/error500", "/error503"];
  const isPublicPage = publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (!isPublicPage && !authStore.accessToken) {
    authStore.returnUrl = to.fullPath;
    return next("/login");
  }

  if (isPublicPage && to.path === "/login" && authStore.accessToken) {
    return next("/dashboard");
  }

  return next();
});

router.afterEach(() => {
  const uiStore = useUIStore();
  uiStore.isLoading = false;
});
