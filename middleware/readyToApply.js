import Utils from '@/utils/services'

export default function ({ store, redirect }) {
  if (Utils.present(store.state.pages.application_object) || store.state.auth.loggedIn) {
    return true
  } else {
    return redirect('/apply')
  }
}
