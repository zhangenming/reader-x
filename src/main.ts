import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const x = createApp(App)
x.config.compilerOptions.isCustomElement = (tag) => tag === 'word'
x.mount('#app')
