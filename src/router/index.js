import { createRouter, createWebHistory } from "vue-router";
import DropolinoHome from "@/views/DropolinoHome.vue";

const routes = [
  {
    path: "/",
    name: "DropolinoHome",
    component: DropolinoHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
