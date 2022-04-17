import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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

  const response = await fetchLoggedUser(token);
  if (response.ok) {
    // store.commit()
    return true;
  }
  else if (response.status === 401) {
    localStorage.removeItem("bearerToken");
    return loginPage;
  }
  else {
    console.log("Ocorreu um erro ao obter o usuário");
    return false;
  }
}

function fetchLoggedUser(token) {
  const headers = new Headers();
  headers.append('Authorization', token);
  const request = new Request("http://localhost:5000/users/me", {
      method: 'GET',
      headers: headers
    }
  );
  return fetch(request);
}