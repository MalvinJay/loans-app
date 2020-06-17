export const state = () => ({
  loandetails: {
    data: {},
    state: 'DATA'
  },
  errors: {}
})
export const getters = {
  loanDetails: state => state.loandetails.data,
  loanDetailState: state => state.loandetails.state
}
export const mutations = {
  SET_LOANDETAILS (state, payload) {
    state.loandetails.data = payload
  },
  SET_ERROR (state, payload) {
    state.errors = payload
  },
  SET_STATE (state, payload) {
    state.loandetails.state = payload
  }
}
export const actions = {
  fetchLoanDetails ({ commit, rootState }) {
    commit('SET_STATE', 'LOADING')
    return new Promise((resolve, reject) => {
      const url = 'https://mcftest.plendifyloans.com/api/loan-applications'
      const config = {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.token,
          'Content-Type': 'application/json'
        }
      }
      this.$axios.$get(url, config)
        .then((response) => {
          commit('SET_LOANDETAILS', response.data)
          resolve(response)
        }).catch((error) => {
          // console.log('Error from VUEX', error.error)
          commit('SET_ERROR', error)
          reject(error)
        })
    })
  }
}
