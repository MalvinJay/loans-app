import Utils from '../utils/services'
export const state = () => ({
  loandetails: {
    data: {},
    status: localStorage.getItem('loanStatus'),
    state: 'DATA'
  },
  errors: {}
})
export const getters = {
  loanDetails: state => state.loandetails.data,
  loanDetailState: state => state.loandetails.state,
  loanStatusErrors: state => state.errors,
  loanStatus: state => state.loandetails.status
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
  },
  SET_LOAN_STATUS (state, payload) {
    state.loandetails.status = payload
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
          if (Utils.present(response.data)) {
            localStorage.setItem('loanStatus', 'complete')
            commit('SET_LOAN_STATUS', 'complete')
          } else {
            localStorage.setItem('loanStatus', 'incomplete')
          }
          commit('SET_STATE', 'DATA')
          resolve(response)
        }).catch((error) => {
          localStorage.setItem('loanStatus', 'incomplete')
          commit('SET_ERROR', error.response.data)
          reject(error.response.data)
        })
    })
  }
}
