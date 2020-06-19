export const state = () => ({
  general: {},
  covidProofOfMay20: {},
  errors: {}
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
  SET_ID (state, data) {
    state.general.id_type = data.id_type
    state.general.id_number = data.id_number
  }
}

export const actions = {
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
          if (process.browser) {
            localStorage.setItem('application_object', JSON.stringify(result.data))
          }
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
  saveApplication ({ state, commit }) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const url = 'https://mcftest.plendifyloans.com/api/unfinished/loan-applications/save-continue'
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
  }
}
