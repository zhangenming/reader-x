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
        return (arg) => {
          if (arg == '1') {
            if (showOne) {
              console.log('first:', this)
              showOne = false
            }
          }
          return this
        }
      },
    },
  })
})()
