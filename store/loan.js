import Utils from '../utils/services'
export const state = () => ({
  loandetails: {
    data: {},
    status: localStorage.getItem('loanStatus') || null,
    state: 'DATA',
    documents: []
  },
  errors: {}
})
export const getters = {
  loanDetails: state => state.loandetails.data,
  loanDetailState: state => state.loandetails.state,
  loanStatusErrors: state => state.errors,
  loanStatus: state => state.loandetails.status,
  loanDocuments: state => state.loandetails.documents
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
  },
  SET_LOAN_DOCUMENTS (state, payload) {
    state.loandetails.documents = payload
  }
}
export const actions = {
  fetchLoanDetails ({ commit, rootState }) {
    commit('SET_STATE', 'LOADING')
    return new Promise((resolve, reject) => {
      const url = '/loan-applications'
      this.$axios.$get(url)
        .then((response) => {
          commit('SET_LOANDETAILS', response.data)
          if (Utils.present(response.data)) {
            localStorage.setItem('loanStatus', 'complete')
            commit('SET_LOAN_STATUS', 'complete')
          } else {
            localStorage.setItem('loanStatus', 'incomplete')
          }
          commit('SET_LOAN_DOCUMENTS', response.data.loan_documents)
          commit('SET_STATE', 'DATA')
          resolve(response)
        }).catch((error) => {
          localStorage.setItem('loanStatus', 'incomplete')
          commit('SET_ERROR', error.response.data)
          reject(error.response.data)
        })
    })
  },
  uploadDocument ({ commit, dispatch }, data) {
    commit('SET_STATE', 'LOADING')
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('file_type', data.file_type)
      const url = `/auth/loan-applications/${data.loanID}/upload-media`
      this.$axios.$post(url, formData)
        .then((response) => {
          // const document = {
          //   id: data.file_type,
          //   filePath: response.data.path
          // }
          // commit('SET_LOAN_DOCUMENTS', document)
          dispatch('fetchLoanDetails')
          // commit('SET_STATE', 'DATA')
          resolve(response.data)
        }).catch((error) => {
          commit('SET_STATE', 'DATA')
          reject(error)
        })
    })
  },
  getPDF ({ commit }) {
    commit('SET_STATE', 'LOADING')
    return new Promise((resolve, reject) => {
      const url = '/current_application'
      const config = {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf'
        }
      }

      this.$axios.$get(url, config)
        .then((response) => {
          commit('SET_LOANDETAILS', response.data)
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
