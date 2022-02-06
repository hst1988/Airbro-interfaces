import { createRouter, createWebHistory } from "vue-router";
import AirBrooHome from "@/views/AirBroHome.vue";

const routes = [
  {
    path: "/",
    name: "AirBrooHome",
    component: AirBrooHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
