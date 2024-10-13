import { createApp } from 'vue'

import App from './App.vue'

console.log('main 1')

const app = createApp(App)
app.config.performance = true
app.mount('#app')

console.log('main 2')
