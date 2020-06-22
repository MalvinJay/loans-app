export const state = () => ({
  general: {},
  covidProofOfMay20: {},
  errors: {},
  pendingApplication: null
})

export const getters = {
  GET_ERRORS (state) {
    for (const i in state.errors.errors) {
      // eslint-disable-next-line no-console
      return state.errors.errors[i][0]
    }
  },
  requestedLoanAmount (state) {
    if (state.general.requested_loan_amount !== undefined) {
      return state.general.requested_loan_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  loanAppication (state) {
    if (state.pendingApplication !== null) {
      return state.pendingApplication.loan_application
    }
  }
}

export const mutations = {
  SET_GENERAL_DATA (state, data) {
    state.general = { ...state.general, ...data }
  },
  SET_MEDIA_PATH (state, data) {
    state.general[data.name] = data.path
  },
  SET_ID_FILE_NAME (state, data) {
    state.general.id_file_name = data
  },
  SET_SSNIT_FILE_NAME (state, data) {
    state.general.ssnit_file_name = data
  },
  SET_PAYE_FILE_NAME (state, data) {
    state.general.paye_file_name = data
  },
  SET_COVID_PROOF_OF_MAY (state, data) {
    state.covidProofOfMay20 = data
  },
  SET_ERRORS (state, data) {
    state.errors = data
  },
  SET_APPLICATION_OBJECT (state, data) {
    state.general.id_type = data.id_type
    state.general.id_number = data.id_number
    state.general.business_scale = data.business_scale
    state.general.annual_sales = data.annual_sales
    state.general.years_in_business = data.years_in_business
    state.general.is_startup = data.is_startup
  },
  SET_PENDING_APPLICATION (state, data) {
    state.pendingApplication = data
  }
}

export const actions = {
  setApplicationObject ({ commit }) {
    const data = JSON.parse(localStorage.getItem('application_object')) || {}
    commit('SET_APPLICATION_OBJECT', data)
  },
  verifyApplication ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const url = 'https://mcftest.plendifyloans.com/api/verify-id'
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$axios.$post(url, data, config)
        .then((result) => {
          localStorage.setItem('application_object', JSON.stringify(result.data))
          resolve(result.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  uploadMedia ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', data.file)
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const url = 'https://mcftest.plendifyloans.com/api/upload-media'
      this.$axios.$post(url, formData, config)
        .then((result) => {
          commit('SET_MEDIA_PATH', { path: result.data.path, name: data.name })
          resolve(true)
        }).catch((error) => {
          reject(error)
        })
    })
  },
  submitApplication ({ state, commit }) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const url = 'https://mcftest.plendifyloans.com/api/loan-applications'
      this.$axios.$post(url, state.general, config)
        .then((result) => {
          commit('SET_APPLICATION_RESPONSE', result.data)
          resolve(result)
        })
        .catch((error) => {
          const errors = JSON.parse(error.request.response)
          commit('SET_ERRORS', errors)
          reject(errors)
        })
    })
  },
  saveApplication ({ rootState, state, commit }) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          Authorization: 'Bearer ' + rootState.local.token,
          'Content-Type': 'application/json'
        }
      }
      let url
      if (rootState.local.token) {
        url = `https://mcftest.plendifyloans.com/api/unfinished/loan-applications/update/${state.pendingApplication.id}`
      } else {
        url = 'https://mcftest.plendifyloans.com/api/unfinished/loan-applications/save-continue'
      }
      this.$axios.$post(url, state.general, config)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          const errors = JSON.parse(error.request.response)
          commit('SET_ERRORS', errors)
          reject(errors)
        })
    })
  },
  getPendingApplications ({ rootState, state, commit }) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          Authorization: 'Bearer ' + rootState.local.token,
          'Content-Type': 'application/json'
        }
      }
      const url = 'https://mcftest.plendifyloans.com/api/unfinished/loan-applications'
      this.$axios.$get(url, config)
        .then((result) => {
          commit('SET_PENDING_APPLICATION', result.data)
        })
        .catch((error) => {
          const errors = JSON.parse(error.request.response)
          commit('SET_ERRORS', errors)
          reject(errors)
        })
    })
  }
}
