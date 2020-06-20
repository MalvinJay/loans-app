// import Utils from '../utils/services'
// export default function (ctx) {
//   if (!isAuth(ctx)) {
//     return ctx.redirect('/app/registration/login')
//   }
//   if (!isComplete(ctx)) {
//     return ctx.redirect('/app/loanapplication')
//   }
// }
// function isAuth ({ store, route, redirect }) {
//   if (Utils.present(store.state.auth.token)) {
//     return true
//   } else {
//     return false
//   }
// }
// function isComplete ({ store, route, redirect }) {
//   if (store.state.loan.loandetails.status === 'complete') {
//     return true
//   } else {
//     return false
//   }
// }
// This bad boy won't work. sigh!
import Utils from '../utils/services'
export default function ({ store }) {
  store.app.router.beforeEach((to, from, next) => {
    if (Utils.present(store.state.auth.token)) {
      next()
    } else if (store.state.loan.loandetails.status !== 'complete') {
      next({
        path: '/app/loanapplication'
      })
    } else {
      next({
        path: '/app/registration/login'
      })
    }
  })
}
