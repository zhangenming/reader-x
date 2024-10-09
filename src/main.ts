import './debug'

import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { getParams } from './utils.js'

if (getParams().home) {
  document.documentElement.style.color = 'black'
}

createApp(App).mount('#app')
