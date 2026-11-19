const AuthRoutes = {
  path: "/auth",
  component: () => import("@/layouts/blank/BlankLayout.vue"),
  meta: {
    middleware: [],
  },
  children: [
    {
      name: "authLogin",
      path: "/login",
      component: () => import("@/views/auth/LoginPage.vue"),
    },
  ],
};

export default AuthRoutes;
