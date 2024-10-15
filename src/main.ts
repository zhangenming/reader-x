import { createApp } from 'vue'

import { getParams } from './assets/utils'

console.log('main 1')

const { s, p } = getParams()
const APP = await import(s ? './AppS.vue' : p ? './AppP.vue' : './App.vue')
const app = createApp(APP.default)
app.config.performance = true
app.mount('#app')

console.log('main 2')
