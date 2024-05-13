import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/techItems",
    name: "techItems",
    component: () => import("./components/TechItemList")
  },
  {
    path: "/techItems/:id",
    name: "techItem-details",
    component: () => import("./components/TechItem")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTechItem")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;