import { createApp } from 'vue'

import App from './App.vue'

console.log('main 1')

const app = createApp(App)
app.config.performance = true
app.mount('#app')

console.log('main 2')

// dbg
;(() => {
  let showOne = true
  Object.defineProperties(Object.prototype, {
    xx: {
      get() {
        if (this instanceof String) {
          console.log(String(this))
        } else {
          console.log(this)
        }
        return this
      },
    },
    xxx: {
      get() {
        return (arg: any) => {
          if (arg === 'one') {
            if (showOne) {
              console.log(this)
              showOne = false
            }
          }
          return this
        }
      },
    },
  })
})()
