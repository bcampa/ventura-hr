import { createWebHistory, createRouter } from "vue-router";
import AppIndex from "./components/AppIndex.vue";
import UserRegistration from "./components/UserRegistration.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: AppIndex,
      meta: {
        title: 'VenturaHR - Index',
      }
    },
    {
      path: "/sign-up",
      name: "signup",
      component: UserRegistration,
      meta: {
        title: 'VenturaHR - Cadastrar Usuário',
      }
    }
  ]
});