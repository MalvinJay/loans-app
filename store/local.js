export const state = () => ({
  token: null,
  errors: {}
})
export const getters = {
  token: state => state.token
}
export const mutations = {
  SET_SUCCESS (state, payload) {
    state.errors = payload
  },
  SET_ERROR (state, payload) {
    state.errors = payload
  },
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  SET_LOGOUT (state) {
    localStorage.clear()
    state.token = null
  }
}
export const actions = {
  verifyOTP ({ commit }, phone) {
    return new Promise((resolve, reject) => {
      const url = '/generate-otp'
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }
      const data = {
        phone_number: phone
      }
      this.$axios.$post(url, data)
        .then((response) => {
          commit('SET_SUCCESS', response)
          resolve(response)
        }).catch((error) => {
          commit('SET_ERROR', error)
          reject(error)
        })
    })
  },
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const url = '/login'
      this.$axios.$post(url, data)
        .then((response) => {
          commit('SET_TOKEN', response.data.access_token)
          this.$auth.setToken('local', 'Bearer ' + response.data.access_token)
          this.$auth.setRefreshToken('local', response.data.refresh_token)
          this.$axios.setHeader('Authorization', 'Bearer ' + response.data.access_token)
          this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + response.data.access_token)
          resolve(response)
        }).catch((error) => {
          reject(error.response.data)
        })
    })
  },
  logout ({ commit }) {
    commit('SET_LOGOUT')
  }
}
