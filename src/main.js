import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

const DEFAULT_TITLE = "VenturaHR";
router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  })
})