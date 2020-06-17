export const state = () => ({
  token: '',
  errors: {}
})
export const getters = {

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
    state.token = ''
  }
}
export const actions = {
  verifyOTP ({ commit }, phone) {
    return new Promise((resolve, reject) => {
      const url = 'https://mcftest.plendifyloans.com/api/generate-otp'
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const data = {
        phone_number: phone
      }
      this.$axios.$post(url, data, config)
        .then((response) => {
          // console.log('Success', response)
          commit('SET_SUCCESS', response)
          resolve(response)
        }).catch((error) => {
          // console.log('Error from VUEX', error.error)
          commit('SET_ERROR', error)
          reject(error)
        })
    })
  },
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const url = 'https://mcftest.plendifyloans.com/api/login'
      this.$axios.$post(url, data, config)
        .then((response) => {
          // console.log('Response:', response)
          commit('SET_TOKEN', response.response.data.data.access_token)
          resolve(response)
        }).catch((error) => {
          // console.log('Error from VUEX', error.response.data.error)
          reject(error)
        })
    })
  }
}
