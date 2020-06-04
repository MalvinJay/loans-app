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
<<<<<<< HEAD
    const url = 'https://mcftest.plendifyloans.com/api/verify'
=======
    const url = 'http://mcftest.plendifyloans.com/api/verify'
>>>>>>> e270a32dd765cc01ec31fbb523a2bb0088b3c001
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const result = await this.$axios.$post(url, data, config)
    if (process.browser) {
      localStorage.setItem('application_object', JSON.stringify(result.data))
    }
    return result.data
  },
  async uploadMedia ({ commit }, data) {
    const formData = new FormData()
    formData.append('file', data.file)
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
<<<<<<< HEAD
    const url = 'https://mcftest.plendifyloans.com/api/upload-media'
=======
    const url = 'http://mcftest.plendifyloans.com/api/upload-media'
>>>>>>> e270a32dd765cc01ec31fbb523a2bb0088b3c001
    const result = await this.$axios.$post(url, formData, config)
    commit('SET_MEDIA_PATH', { path: result.data.path, name: data.name })
  },
  submitApplication ({ state, commit }) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
<<<<<<< HEAD
      const url = 'https://mcftest.plendifyloans.com/api/loan-applications'
=======
      const url = 'http://mcftest.plendifyloans.com/api/loan-applications'
>>>>>>> e270a32dd765cc01ec31fbb523a2bb0088b3c001
      this.$axios.$post(url, state.general, config)
        .then((result) => {
          commit('SET_APPLICATION_RESPONSE', result.data)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
