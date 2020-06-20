export const state = () => ({
  loanAmount: null,
  years: null,
  startup: null,
  dropdowns: null,
  districts: null,
  mediaResponse: null,
  formErrors: '',
  application_object: JSON.parse(localStorage.getItem('application_object')) || null,
  currentTab: 0,
  countries: null,
  showSaveModal: false,
  applicantReadiness: true
})

export const getters = {
  countries (state) {
    if (state.countries !== null) {
      return state.countries.map((item) => {
        return {
          name: item.name,
          val: item.name
        }
      })
    }
  },
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
    if (state.application_object) {
      return state.application_object.business_scale
    }
  },
  isStartup (state) {
    if (state.application_object) {
      return state.application_object.is_startup
    }
  },
  yearsInBusiness (state, getters, rootState) {
    if (state.application_object) {
      return state.application_object.years_in_business
    } if (rootState.api.pendingApplication) {
      return rootState.api.pendingApplication.loan_application.years_in_business
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
  SET_CURRENT_TAB_NUMBER (state, data) {
    state.currentTab = data
  },
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
  SET_COUNTRIES (state, data) {
    state.countries = data
  },
  SET_DISTRICTS (state, data) {
    const districts = state.dropdowns.districts.filter(item => item.region_id === parseInt(data))
    state.districts = districts
  },
  SET_SAVE_MODAL (state, data) {
    state.showSaveModal = data
  },
  SET_APPLICANT_READINESS (state, data) {
    state.applicantReadiness = data
  }
}
export const actions = {
  async getDropDowns ({ commit }) {
    const dropdowns = await this.$axios.$get('https://mcftest.plendifyloans.com/api/dropdowns')
    const countries = await this.$axios.$get('https://restcountries.eu/rest/v2/all')
    commit('SET_DROPDOWNS', dropdowns.data)
    commit('SET_COUNTRIES', countries)
  }
}
