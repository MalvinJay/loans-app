export const state = () => ({
  loanAmount: null,
  years: null,
  startup: null,
  dropdowns: null,
  districts: null,
  mediaResponse: null,
  formErrors: '',
  application_object: process.browser ? JSON.parse(localStorage.getItem('application/object')) : null || null
})

export const getters = {
  idTypes (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.id_types.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  regions (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.regions.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  districts (state) {
    if (state.districts !== null) {
      return state.districts.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  residenceStatus (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.residence_status.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  businessAssociation (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.business_association.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  industry (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.industry.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  businessScale (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.business_scale.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  legalOrganization (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.legal_organization.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  bankPartner (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.financial_institutions.filter(item => item.type !== 'mm').map((item) => {
        return {
          name: item.bank_name,
          val: item.id
        }
      })
    }
  },
  covidImpacts (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.covid_impacts.map((item) => {
        return {
          name: item.name,
          val: item.id.toString()
        }
      })
    }
  },
  fundRoles (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.fund_purposes.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  momo (state) {
    if (state.dropdowns) {
      return state.dropdowns.financial_institutions.filter(item => item.type === 'mm')
    }
  }
}

export const mutations = {
  SET_FORM_ERRORS (state, data) {
    state.formErrors = data
  },
  SET_AMOUNT (state, data) {
    state.loanAmount = parseFloat(data)
  },
  SET_YEARS (state, data) {
    state.years = parseFloat(data)
  },
  SET_STARTUP (state, data) {
    state.startup = data
  },
  SET_DROPDOWNS (state, data) {
    state.dropdowns = data
  },
  SET_DISTRICTS (state, data) {
    const districts = state.dropdowns.districts.filter(item => item.region_id === parseInt(data))
    state.districts = districts
  }
}

export const actions = {
  async getDropDowns ({ commit }) {
    const dropdowns = await this.$axios.$get('https://mcftest.plendifyloans.com/api/dropdowns')
    commit('SET_DROPDOWNS', dropdowns.data)
  }
}
