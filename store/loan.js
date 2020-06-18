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
          // console.log('Response:', response)
          commit('SET_LOANDETAILS', response.data)
          if (response.data.loan_identifier != null) {
            localStorage.setItem('loanStatus', 'complete')
          } else {
            localStorage.setItem('loanStatus', 'incomplete')
          }
          commit('SET_STATE', 'DATA')
          resolve(response)
        }).catch((error) => {
          // console.log('Error from VUEX', error.response.data)
          commit('SET_STATE', 'ERROR')
          commit('SET_ERROR', error.response.data)
          reject(error.response.data)
        })
    })
  }
}
