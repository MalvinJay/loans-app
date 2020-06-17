// import axios from 'axios';
export default function (ctx) {
  if (!isAuth(ctx)) {
    return ctx.redirect('/app/registration/login')
  }
}
function isAuth ({ store, route, redirect }) {
  // If the user is not authenticated
  console.log('Middleware store:', store.state)
  if (store.state.auth.token !== '') {
    return true
  } else {
    return false
  }
}
