import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import RegistrationPage from "./components/RegistrationPage.vue";
import OffersPage from "./components/offersPage/OffersPage.vue";
import JobOfferCreationPage from "./components/JobOfferCreationPage.vue";
import { userTypes } from "./constants";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: LoginPage,
      meta: {
        title: 'VenturaHR',
      }
    },
    {
      path: "/sign-up",
      name: "signup",
      component: RegistrationPage,
      meta: {
        title: 'Cadastrar Usuário | VenturaHR',
      }
    },
    {
      path: "/offers",
      name: "offers",
      component: OffersPage,
      meta: {
        title: 'Ofertas | VenturaHR',
        requiresAuth: true,
      }
    },
    {
      path: "/offers/create",
      name: "offerCreation",
      component: JobOfferCreationPage,
      meta: {
        title: 'Criar Oferta | VenturaHR',
        requiresAuth: true,
        allowedUserTypes: [ userTypes.corporation ]
      }
    }
  ]
});