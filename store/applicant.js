export const state = () => ({
  applicant: {
    data: {},
    state: 'DATA'
  },
  errors: {}
})
export const getters = {
  applicantDetails: state => state.applicant.data,
  applicantState: state => state.applicant.state
}
export const mutations = {
  SET_APPLICANT (state, payload) {
    state.applicant.data = payload
  },
  SET_ERROR (state, payload) {
    state.errors = payload
  },
  SET_STATE (state, payload) {
    state.applicant.state = payload
  }
}
export const actions = {
  fetchApplicant ({ commit, rootState }) {
    commit('SET_STATE', 'LOADING')
    return new Promise((resolve, reject) => {
      const url = 'https://mcftest.plendifyloans.com/api/applicant-details'
      // const config = {
      //   headers: {
      //     Authorization: 'Bearer ' + rootState.auth.token,
      //     'Content-Type': 'application/json'
      //   }
      // }
      this.$axios.$get(url)
        .then((response) => {
          this.$auth.setUser(response.data)
          commit('SET_APPLICANT', response.data)
          commit('SET_STATE', 'DATA')
          resolve(response)
        }).catch((error) => {
          commit('SET_STATE', 'ERROR')
          commit('SET_ERROR', error)
          reject(error.response.data)
        })
    })
  }
}
