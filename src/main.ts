import { createApp } from 'vue'

import { getParams } from './assets/utils'

console.log('main 1')

const APP = await import(getParams().m ? './AppM.vue' : './App.vue')
const app = createApp(APP.default)
app.config.performance = true
app.mount('#app')

console.log('main 2') 
