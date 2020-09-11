// import axios from 'axios'
import { countryList } from './countries'
export const state = () => ({
  loanAmount: null,
  years: null,
  startup: null,
  dropdowns: null,
  personalDistricts: null,
  businessDistricts: null,
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
  personalDistricts (state) {
    if (state.personalDistricts !== null) {
      return state.personalDistricts.map((item) => {
        return {
          name: item.name,
          val: item.id
        }
      })
    }
  },
  businessDistricts (state) {
    if (state.businessDistricts !== null) {
      return state.businessDistricts.map((item) => {
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
  businessScale (state, getters, rootState) {
    // eslint-disable-next-line no-debugger
    if (state.application_object) {
      return state.application_object.business_scale
    } else if (rootState.api.pendingApplication) {
      return rootState.api.pendingApplication.loan_application.business_scale
    }
  },
  isStartup (state, getters, rootState) {
    if (state.application_object) {
      return state.application_object.is_startup
    } else if (rootState.api.pendingApplication) {
      if (rootState.api.pendingApplication.loan_application.is_startup === '1') {
        return true
      } else {
        return false
      }
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
  nonFinancialSupport (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.non_financial_supports.map((item) => {
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
  },
  rcbanks (state) {
    if (state.dropdowns !== null) {
      return state.dropdowns.rcbs.map((item) => {
        return {
          name: item.bank,
          val: item.id,
          region: item.region.toLowerCase()
        }
      })
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
  SET_BUSINESS_DISTRICTS (state, data) {
    if (state.dropdowns) {
      const districts = state.dropdowns.districts.filter(item => item.region_id === parseInt(data))
      state.businessDistricts = districts
    }
  },
  SET_PERSONAL_DISTRICTS (state, data) {
    if (state.dropdowns) {
      const districts = state.dropdowns.districts.filter(item => item.region_id === parseInt(data))
      state.personalDistricts = districts
    }
  },
  SET_SAVE_MODAL (state, data) {
    state.showSaveModal = data
  },
  SET_APPLICANT_READINESS (state, data) {
    state.applicantReadiness = data
  }
}
export const actions = {
  getDropDowns ({ commit }) {
    this.$axios.$get('https://mcftest.plendifyloans.com/api/dropdowns')
      .then((response) => {
        commit('SET_DROPDOWNS', response.data)
      })
  },
  getCountries ({ commit }) {
    // axios.get('https://restcountries.eu/rest/v2/all')
    // axios({
    //   method: 'GET',
    //   url: 'https://restcountries-v1.p.rapidapi.com/all',
    //   headers: {
    //     'content-type': 'application/octet-stream',
    //     'x-rapidapi-host': 'restcountries-v1.p.rapidapi.com',
    //     'x-rapidapi-key': 'b625a5022bmshe3f5ace2e19a571p12f017jsndd4d5446d4a9',
    //     useQueryString: true
    //   }
    // })
    //   .then((response) => {
    //     // eslint-disable-next-line no-console
    //     console.log('Countries:', response)
    //     commit('SET_COUNTRIES', response.data)
    //   })
    // eslint-disable-next-line no-console
    // console.log('Countries', countryList)
    commit('SET_COUNTRIES', countryList)
  }
}
