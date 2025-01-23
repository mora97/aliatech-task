import './assets/main.scss'
import './assets/stylesheets/fonts.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = router;
});

app.use(pinia)
app.use(router)

app.mount('#app')
