export const state = () => ({
  loanAmount: null,
  years: null,
  startup: null
})

export const mutations = {
  SET_AMOUNT (state, data) {
    state.loanAmount = parseFloat(data)
  },
  SET_YEARS (state, data) {
    state.years = parseFloat(data)
  },
  SET_STARTUP (state, data) {
    state.startup = data
    // (data === true) ? state.startup = true : state.startup = false
  }
}
