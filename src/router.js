import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import RegistrationPage from "./components/RegistrationPage.vue";
import OffersPage from "./components/offersPage/OffersPage.vue";
import OfferDetailsPage from "./components/OfferDetailsPage.vue";
import JobOfferCreationPage from "./components/JobOfferCreationPage.vue";
import ApplicationCreationPage from "./components/ApplicationCreationPage.vue";
import JobOfferResponsesPage from "./components/JobOfferResponsesPage.vue";
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
    },
    {
      path: "/offers/:id",
      name: "offerDetails",
      component: OfferDetailsPage,
      meta: {
        title: 'Dados da Vaga | VenturaHR',
        requiresAuth: true
      }
    },
    {
      path: "/offers/:id/apply",
      name: "applicationCreation",
      component: ApplicationCreationPage,
      meta: {
        title: 'Responder Vaga | VenturaHR',
        requiresAuth: true
      }
    },
    {
      path: "/offers/:id/responses",
      name: "jobOfferResponses",
      component: JobOfferResponsesPage,
      meta: {
        title: 'Respostas da Vaga | VenturaHR',
        requiresAuth: true,
        allowedUserTypes: [ userTypes.corporation ]
      }
    }
  ]
});