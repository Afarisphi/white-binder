import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router' 
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';
import App from './App.vue';

createApp(App).use(createPinia()).use(router).mount('#app');

window.addEventListener('load', () => {
  const splash = document.getElementById('splash')
  if (splash) {
    splash.classList.add('fade-out')
    setTimeout(() => splash.remove(), 600)
  }
})