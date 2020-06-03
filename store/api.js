export const state = () => ({
  general: {},
  covidProofOfMay20: {}
})

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
  SET_COVID_PROOF_OF_MAY (state, data) {
    state.covidProofOfMay20 = data
  }
}

export const actions = {
  async verifyApplication ({ commit }, data) {
    const url = 'http://35.224.152.25/api/verify'
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const result = await this.$axios.$post(url, data, config)
    if (process.browser) {
      localStorage.setItem('application_object', JSON.stringify(result.data))
    }
  },
  async uploadMedia ({ commit }, data) {
    const formData = new FormData()
    formData.append('file', data.file)
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const url = 'http://35.224.152.25/api/upload-media'
    const result = await this.$axios.$post(url, formData, config)
    commit('SET_MEDIA_PATH', { path: result.data.path, name: data.name })
  },
  async submitApplication ({ state, commit }) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const url = 'http://35.224.152.25/api/loan-applications'
    const result = await this.$axios.$post(url, state.general, config)
    commit('SET_APPLICATION_RESPONSE', result.data)
  }
}
