export const state = () => ({
  notifications: {
    data: [],
    state: 'DATA'
  },
  errors: {}
})
export const getters = {
  notifications: state => state.notifications.data,
  notificationsState: state => state.notifications.state
}
export const mutations = {
  SET_NOTIFICATIONS (state, payload) {
    state.notifications.data = payload
  },
  SET_ERROR (state, payload) {
    state.errors = payload
  },
  SET_STATE (state, payload) {
    state.notifications.state = payload
  }
}
export const actions = {
  getNotifications ({ commit }) {
    commit('SET_STATE', 'LOADING')
    return new Promise((resolve, reject) => {
      const url = '/notifications'
      // const config = {
      //   headers: {
      //     Authorization: 'Bearer ' + rootState.auth.token,
      //     'Content-Type': 'application/json'
      //   }
      // }
      this.$axios.$get(url)
        .then((response) => {
          commit('SET_NOTIFICATIONS', response.data.notifications)
          commit('SET_STATE', 'DATA')
          resolve(response)
        }).catch((error) => {
          commit('SET_ERROR', error.response.data)
          reject(error.response.data)
        })
    })
  },
  makeInquiry ({ commit, rootState }, body) {
    commit('SET_STATE', 'LOADING')
    return new Promise((resolve, reject) => {
      const url = 'https://mcftest.plendifyloans.com/api/queries'
      // const config = {
      //   headers: {
      //     Authorization: 'Bearer ' + rootState.auth.token,
      //     'Content-Type': 'application/json'
      //   }
      // }
      const data = {
        body
      }
      this.$axios.$post(url, data)
        .then((response) => {
          commit('SET_NOTIFICATIONS', response.data)
          commit('SET_STATE', 'DATA')
          resolve(response)
        }).catch((error) => {
          commit('SET_STATE', 'ERROR')
          commit('SET_ERROR', error.response.data)
          reject(error.response.data)
        })
    })
  }
}
