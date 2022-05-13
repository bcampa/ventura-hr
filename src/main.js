import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import requests from './requests'

createApp(App).use(store).use(router).mount('#app')

const DEFAULT_TITLE = "VenturaHR";
router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  })
})
router.beforeEach(async (to) => {
  return await redirectIfCannotAccess(to);
})

async function redirectIfCannotAccess(destination) {
  const loginPage = { name: 'index' };

  if (!destination.meta.requiresAuth) {
    return true;
  }

  const token = localStorage.getItem("bearerToken");
  if (token == null) {
    return loginPage;
  }

  const response = await requests.user.getLoggedUser();
  if (response.ok) {
    const responseBody = await response.json();
    store.commit("setCurrentUser", responseBody);
    if (destination.meta.allowedUserTypes?.length > 0) {
      return destination.meta.allowedUserTypes.includes(responseBody.type);
    }
    return true;
  }
  else if (response.status === 401) {
    localStorage.removeItem("bearerToken");
    store.commit("setCurrentUser", null);
    return loginPage;
  }
  else {
    console.log("Ocorreu um erro ao obter o usuário");
    return false;
  }
}
