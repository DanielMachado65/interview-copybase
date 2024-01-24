import { createRouter, createWebHistory } from "vue-router";
import FileView from "../views/FileView.vue";

const routes = [
  {
    path: "/",
    name: "fileUpload",
    component: FileView,
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
