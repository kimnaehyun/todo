import { createRouter, createWebHistory } from "vue-router";
const router = createRouter(
  {
    history: createWebHistory(""),
    routes: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/addUpdate",
        name: "addUpdate",
        component: () => import("../views/addUpdate.vue"),
      },
      {
        path: "/delete",
        name: "delete",
        component: () => import("../views/delete.vue"),
      },
    ],
  }
);
export default router;
