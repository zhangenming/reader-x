import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

const x = createApp(App)
// x.config.compilerOptions.isCustomElement = (tag) => tag === 'word'
x.mount('#app')
