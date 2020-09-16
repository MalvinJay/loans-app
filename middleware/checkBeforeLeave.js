
export default function ({ store }) {
  let setup = false
  if (!setup) {
    store.app.router.beforeEach((to, from, next) => {
      setup = true
      // eslint-disable-next-line no-console
      console.log('STORE - guarding', store)
      next()
    })
  }
}
