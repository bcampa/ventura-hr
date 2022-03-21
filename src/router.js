import { createWebHistory, createRouter } from "vue-router";
import AppIndex from "./components/AppIndex.vue";
import UserRegistration from "./components/UserRegistration.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: AppIndex
    },
    {
      path: "/sign-up",
      name: "signup",
      component: UserRegistration
    }
  ]
});