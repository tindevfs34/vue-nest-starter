// -- Constants --
import { ROUTER_NAME, ROUTER_PATH } from "@/common/constants/router.constant";

const MainRoutes = {
  path: "",
  meta: {
    requiresAuth: true,
  },
  component: () => import("@/layouts/dashboard/DashboardLayout.vue"),
  children: [
    // Dashboard
    {
      name: ROUTER_NAME.DASHBOARD,
      path: ROUTER_PATH.DASHBOARD,
      component: () => import("@/views/dashboard/ListPage.vue"),
    },
  ],
};

export default MainRoutes;
