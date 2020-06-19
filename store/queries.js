import Utils from '../utils/services'
export const state = () => ({
  queries: {
    data: [],
    state: 'DATA'
  },
  errors: {}
})
export const getters = {
  queries: state => state.queries.data,
  queriestate: state => state.queries.state
}
export const mutations = {
  SET_QUERIES (state, payload) {
    state.queries.data = payload
  },
  SET_ERROR (state, payload) {
    state.errors = payload
  },
  SET_STATE (state, payload) {
    state.queries.state = payload
  }
}
export const actions = {
  fetchQueries ({ commit, rootState }) {
    commit('SET_STATE', 'LOADING')
    return new Promise((resolve, reject) => {
      const url = 'https://mcftest.plendifyloans.com/api/queries'
      const config = {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.token,
          'Content-Type': 'application/json'
        }
      }
      this.$axios.$get(url, config)
        .then((response) => {
          commit('SET_QUERIES', response.data)
          if (Utils.present(response.data)) {
            localStorage.setItem('loanStatus', 'complete')
          } else {
            localStorage.setItem('loanStatus', 'incomplete')
          }
          commit('SET_STATE', 'DATA')
          resolve(response)
        }).catch((error) => {
          commit('SET_STATE', 'ERROR')
          commit('SET_ERROR', error.response.data)
          reject(error.response.data)
        })
    })
  },
  makeInquiry ({ commit, rootState }, body) {
    commit('SET_STATE', 'LOADING')
    return new Promise((resolve, reject) => {
      const url = 'https://mcftest.plendifyloans.com/api/queries'
      const config = {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.token,
          'Content-Type': 'application/json'
        }
      }
      const data = {
        body
      }
      this.$axios.$post(url, data, config)
        .then((response) => {
          commit('SET_QUERIES', response.data)
          commit('SET_STATE', 'DATA')
          resolve(response)
        }).catch((error) => {
          commit('SET_ERROR', error.response.data)
          reject(error.response.data)
        })
    })
  }
}
