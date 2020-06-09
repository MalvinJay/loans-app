<template>
  <div v-show="show">
    <div class="grid form-a py-20">
      <div class="mb-10">
        <Input v-model.number="loanAmount" name="Amount Requested" type="number" money />
      </div>
      <div class="mb-10">
        <Input v-model.number="years" name="Years in Operation" type="number" disabled />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
          Are you a startup?
        </label>
        <div class="flex justify-start mb-12">
          <label class="checkbox">Yes
            <input id="yes" v-model="startup" type="checkbox" true-value="true" false-value="false">
            <span class="checkmark" />
          </label>
          <label class="checkbox">No
            <input id="no" v-model="startup" type="checkbox" false-value="true" true-value="false">
            <span class="checkmark" />
          </label>
        </div>
        <div class="mb-12">
          <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
            Can you provide proof of COVID-19 impact?
          </label>
          <div class="flex justify-start">
            <label class="checkbox">Yes
              <input id="yes" v-model="proofOfImpact" type="checkbox" true-value="true" false-value="false">
              <span class="checkmark" />
            </label>
            <label class="checkbox">No
              <input id="no" v-model="proofOfImpact" type="checkbox" false-value="true" true-value="false">
              <span class="checkmark" />
            </label>
          </div>
        </div>
      </div>
      <div class="mb-12">
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
          How has COVID-19 impacted your business?
        </label>
        <MultiSelect :list="covidImpacts" @selected="selected" />
        <div v-if="otherSelected" class="mt-5">
          <textarea v-model="general.other_covid_impact" name="" rows="10" placeholder="Please write down the impact" />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
          Proof of COVID-19 Impact Template
        </label>
        <button class="i-t-b" @click="modal1 = true">
          Click to Fill in Template
        </button>
        <label class="block text-gray-900 text-sm font-normal mb-2 mt-8 font-bold">
          What will you use the funds for?
        </label>
        <MultiSelect :list="fundRoles" @selected="selectedFunds" />
        <label v-if="fundOtherSelected" class="block text-gray-900 text-sm font-normal mb-2 mt-8">
          If other, fill this field
        </label>
        <Input v-if="fundOtherSelected" v-model="general.other_fund_purpose" type="text" />
      </div>
      <div class="mb-4">
        <div>
          <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
            Repayment Account Details
          </label>
          <div v-if="loanAmount<=2000" class="flex justify-start ac-dc">
            <div class="flex justify-start gap-5 loan-argin">
              <label v-for="(item, i) in momo" :key="i" class="checkbox momo">{{ item.bank_name.split(' ')[0] }}
                <input :id="item.name" v-model="general.financial_institution_id" type="checkbox" :true-value="item.id">
                <span class="checkmark" />
              </label>
            </div>
          </div>
        </div>
        <label v-if="loanAmount <= 2000" class="block text-gray-900 text-sm font-normal mb-2">
          Mobile Wallet Number (must use your own mobile wallet)
        </label>
        <Input v-if="loanAmount<= 2000" v-model="general.account_no" type="text" regex="0[2,3,5]{1}[0-9]{8}$" />
        <div v-else>
          <div class="mb-8">
            <label class="block text-gray-900 text-sm font-normal mb-2">
              Your Selected Bank
            </label>
            <Select v-model="general.financial_institution_id" :items="bankPartner" />
          </div>
          <label class="block text-gray-900 text-sm font-normal mb-2">
            Bank Account Number
          </label>
          <Input v-model="general.account_no" type="text" />
        </div>
      </div>
    </div>
    <!-- ===================================================================================
    =================================COVID TEMPLATE MODAL============================== -->
    <Modal v-if="modal1" @close="modal1 = false">
      <div class="income-info">
        <div class="h-d">
          <p class="text-center text-lg">
            Proof of Covid-19 Impact (2020)
          </p>
          <p class="text-center text-sm">
            (Please provide proof of COVID-19 impact on your business, enter amounts as applicable )
          </p>
        </div>
        <!--   Other (add field for applicant to type in what item)  -->
        <div class="grid grid-cols-5 gap-8 b-d">
          <div />
          <div><label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">March 2020</label> </div>
          <div><label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">April 2020</label></div>
          <div><label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">May 2020</label></div>
          <div><label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">Total</label></div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Amount owed to Company from Customers </label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March 2020</label><Input v-model.number="covid_proof_of_march_20.outstanding_invoice" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label><Input v-model.number="covid_proof_of_april_20.outstanding_invoice" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label><Input v-model.number="covid_proof_of_may_20.outstanding_invoice" type="number" placeholder="GHS" money small /></div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input
              v-model.number="total.outstanding_invoice"
              type="number"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Amount owed by Company </label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input v-model.number="covid_proof_of_march_20.demand_notice" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label><Input v-model.number="covid_proof_of_april_20.demand_notice" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label><Input v-model.number="covid_proof_of_may_20.demand_notice" type="number" placeholder="GHS" money small /></div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input
              v-model.number="total.demand_notice"
              type="number"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Unpaid Salaries</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input v-model.number="covid_proof_of_march_20.outstanding_rent" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label><Input v-model.number="covid_proof_of_april_20.outstanding_rent" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label><Input v-model.number="covid_proof_of_may_20.outstanding_rent" type="number" placeholder="GHS" money small /></div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input
              v-model="total.outstanding_rent"
              type="number"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Unpaid Utility Bills</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input v-model.number="covid_proof_of_march_20.unpaid_salaries" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label><Input v-model.number="covid_proof_of_april_20.unpaid_salaries" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label><Input v-model.number="covid_proof_of_may_20.unpaid_salaries" type="number" placeholder="GHS" money small /></div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input
              v-model.number="total.unpaid_salaries"
              type="number"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Reduced Sales </label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input v-model.number="covid_proof_of_march_20.unpaid_utility_bills" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label><Input v-model.number="covid_proof_of_april_20.unpaid_utility_bills" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label><Input v-model.number="covid_proof_of_may_20.unpaid_utility_bills" type="number" placeholder="GHS" money small /></div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input
              v-model.number="total.unpaid_utility_bills"
              type="number"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Other</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input v-model.number="covid_proof_of_march_20.reduced_productivity" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label><Input v-model.number="covid_proof_of_april_20.reduced_productivity" type="number" placeholder="GHS" money small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label><Input v-model.number="covid_proof_of_may_20.reduced_productivity" type="number" placeholder="GHS" money small /></div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input
              v-model.number="total.reduced_productivity"
              type="number"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
        </div>
      </div>
      <div class="my-20">
        <button class="button-small" @click="modal1= false">
          Done
        </button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'
import Modal from '../Misc/Modal'
import Input from './Input'
import Select from './Select'
import MultiSelect from './MultiSelect'
export default {
  components: {
    Input,
    Select,
    Modal,
    MultiSelect
  },
  props: {
    active: Boolean,
    submit: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      show: this.active,
      mobileWallet: null,
      modal1: false,
      micro: false,
      loanAmount: null,
      startup: null,
      covidImpact: [],
      proofOfImpact: null,
      covid_proof_of_march_20: {},
      covid_proof_of_april_20: {},
      covid_proof_of_may_20: {},
      total: {
        outstanding_invoice: 0
      },
      general: {},
      otherSelected: false,
      fundOtherSelected: false,
      fund_purposes: null
    }
  },
  validations: {
    general: {
      account_no: {
        required
      },
      financial_institution_id: {
        required
      }
    },
    fund_purposes: {
      required
    },
    loanAmount: {
      required,
      minValue: minValue(4)
    }
  },
  computed: {
    years () {
      return 3
    },
    bankPartner () {
      return this.$store.getters['pages/bankPartner']
    },
    covidImpacts () {
      return this.$store.getters['pages/covidImpacts']
    },
    fundRoles () {
      return this.$store.getters['pages/fundRoles']
    },
    momo () {
      return this.$store.getters['pages/momo']
    }
  },
  watch: {
    fund_purposes: {
      handler (value) {
        this.fundOtherSelected = value.includes(9)
      },
      deep: true
    },
    loanAmount (value) {
      this.$store.commit('pages/SET_AMOUNT', value)
    },
    years (value) {
      this.$store.commit('pages/SET_YEARS', value)
    },
    startup (value) {
      this.$store.commit('pages/SET_STARTUP', value)
      if (value === 'true') {
        this.$store.commit('pages/SET_STARTUP', true)
      } else {
        this.$store.commit('pages/SET_STARTUP', false)
      }
    },
    show (value) {
      const data = Object.assign({}, this.general) // create copy general object

      // merge general object with necessary data
      data.covid_impact = this.covidImpact
      // clone all neccessary data
      const covidProofOfMarch = Object.assign({}, this.covid_proof_of_march_20)
      const covidProofOfApril = Object.assign({}, this.covid_proof_of_april_20)
      const covidProofOfMay = Object.assign({}, this.covid_proof_of_may_20)
      const fundPurposes = JSON.parse(JSON.stringify(this.fund_purposes))

      // merge data
      data.fund_purposes = fundPurposes
      data.covid_proof_mar_20 = covidProofOfMarch
      data.covid_proof_apr_20 = covidProofOfApril
      data.covid_proof_may_20 = covidProofOfMay
      data.years_in_business = this.years
      data.requested_loan_amount = this.loanAmount
      this.startup === 'true' ? data.is_startup = '1' : data.is_startup = '0'
      // Once show value changes, commit to store
      if (value === false) {
        this.$store.commit('api/SET_GENERAL_DATA', data)
      }
    },
    covidImpact: {
      handler (value) {
        this.otherSelected = value.includes('11')
      },
      deep: true
    },
    covid_proof_of_may_20: {
      handler (value) {
        // calculate total outstanding invoie
        this.total.outstanding_invoice = this.parseNumber(this.covid_proof_of_march_20.outstanding_invoice) +
        this.parseNumber(this.covid_proof_of_april_20.outstanding_invoice) +
        this.parseNumber(this.covid_proof_of_may_20.outstanding_invoice)

        this.total.demand_notice = this.parseNumber(this.covid_proof_of_march_20.demand_notice) +
        this.parseNumber(this.covid_proof_of_april_20.demand_notice) +
        this.parseNumber(this.covid_proof_of_may_20.demand_notice)

        this.total.outstanding_rent = this.parseNumber(this.covid_proof_of_march_20.outstanding_rent) +
        this.parseNumber(this.covid_proof_of_april_20.outstanding_rent) +
        this.parseNumber(this.covid_proof_of_may_20.outstanding_rent)

        this.total.unpaid_salaries = this.parseNumber(this.covid_proof_of_march_20.unpaid_salaries) +
        this.parseNumber(this.covid_proof_of_april_20.unpaid_salaries) +
        this.parseNumber(this.covid_proof_of_may_20.unpaid_salaries)

        this.total.unpaid_utility_bills = this.parseNumber(this.covid_proof_of_march_20.unpaid_utility_bills) +
        this.parseNumber(this.covid_proof_of_april_20.unpaid_utility_bills) +
        this.parseNumber(this.covid_proof_of_may_20.unpaid_utility_bills)

        this.total.reduced_productivity = this.parseNumber(this.covid_proof_of_march_20.reduced_productivity) +
        this.parseNumber(this.covid_proof_of_april_20.reduced_productivity) +
        this.parseNumber(this.covid_proof_of_may_20.reduced_productivity)

        // calculate total demand notce
      },
      deep: true
    },
    covid_proof_of_april_20: {
      handler (value) {
        // calculate total outstanding invoie
        this.total.outstanding_invoice = this.parseNumber(this.covid_proof_of_march_20.outstanding_invoice) +
        this.parseNumber(this.covid_proof_of_april_20.outstanding_invoice) +
        this.parseNumber(this.covid_proof_of_may_20.outstanding_invoice)

        this.total.demand_notice = this.parseNumber(this.covid_proof_of_march_20.demand_notice) +
        this.parseNumber(this.covid_proof_of_april_20.demand_notice) +
        this.parseNumber(this.covid_proof_of_may_20.demand_notice)

        this.total.outstanding_rent = this.parseNumber(this.covid_proof_of_march_20.outstanding_rent) +
        this.parseNumber(this.covid_proof_of_april_20.outstanding_rent) +
        this.parseNumber(this.covid_proof_of_may_20.outstanding_rent)

        this.total.unpaid_salaries = this.parseNumber(this.covid_proof_of_march_20.unpaid_salaries) +
        this.parseNumber(this.covid_proof_of_april_20.unpaid_salaries) +
        this.parseNumber(this.covid_proof_of_may_20.unpaid_salaries)

        this.total.unpaid_utility_bills = this.parseNumber(this.covid_proof_of_march_20.unpaid_utility_bills) +
        this.parseNumber(this.covid_proof_of_april_20.unpaid_utility_bills) +
        this.parseNumber(this.covid_proof_of_may_20.unpaid_utility_bills)

        this.total.reduced_productivity = this.parseNumber(this.covid_proof_of_march_20.reduced_productivity) +
        this.parseNumber(this.covid_proof_of_april_20.reduced_productivity) +
        this.parseNumber(this.covid_proof_of_may_20.reduced_productivity)

        // calculate total demand notce
      },
      deep: true
    },
    covid_proof_of_march_20: {
      handler (value) {
        // calculate total outstanding invoice
        this.total.outstanding_invoice = this.parseNumber(this.covid_proof_of_march_20.outstanding_invoice) +
        this.parseNumber(this.covid_proof_of_april_20.outstanding_invoice) +
        this.parseNumber(this.covid_proof_of_may_20.outstanding_invoice)

        // calculate total demand notice
        this.total.demand_notice = this.parseNumber(this.covid_proof_of_march_20.demand_notice) +
        this.parseNumber(this.covid_proof_of_april_20.demand_notice) +
        this.parseNumber(this.covid_proof_of_may_20.demand_notice)

        // calculate total outstanding rent
        this.total.outstanding_rent = this.parseNumber(this.covid_proof_of_march_20.outstanding_rent) +
        this.parseNumber(this.covid_proof_of_april_20.outstanding_rent) +
        this.parseNumber(this.covid_proof_of_may_20.outstanding_rent)

        // calculate total unpaid salaries
        this.total.unpaid_salaries = this.parseNumber(this.covid_proof_of_march_20.unpaid_salaries) +
        this.parseNumber(this.covid_proof_of_april_20.unpaid_salaries) +
        this.parseNumber(this.covid_proof_of_may_20.unpaid_salaries)

        // calculate total unpaid utility bills
        this.total.unpaid_utility_bills = this.parseNumber(this.covid_proof_of_march_20.unpaid_utility_bills) +
        this.parseNumber(this.covid_proof_of_april_20.unpaid_utility_bills) +
        this.parseNumber(this.covid_proof_of_may_20.unpaid_utility_bills)

        // calculate total reduced productivity
        this.total.reduced_productivity = this.parseNumber(this.covid_proof_of_march_20.reduced_productivity) +
        this.parseNumber(this.covid_proof_of_april_20.reduced_productivity) +
        this.parseNumber(this.covid_proof_of_may_20.reduced_productivity)
      },
      deep: true
    }

  },
  created () {
    if (this.$route.params.amount < 145000) {
      this.micro = true
    }
  },
  beforeUpdate () {
    this.$v.$touch()
    // eslint-disable-next-line no-console
    // console.log(this.$v)
    if (this.$v.$invalid) {
      this.$store.commit('pages/SET_FORM_ERRORS', 'please fill all fields before moving to next page')
    } else {
      this.$store.commit('pages/SET_FORM_ERRORS', '')
    }
  },
  methods: {
    toggleModal1 () {
      this.modal1 = false
    },
    selected (value) {
      this.covidImpact = value
    },
    selectedFunds (value) {
      this.fund_purposes = value
    },
    parseNumber (value) {
      const val = parseFloat(value)
      if (isNaN(val)) {
        return 0
      } else {
        return val
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-a {
  grid-template-columns: repeat(2, 1fr);
  width: 73%;
  column-gap: 3rem;
  .ac-dc {
    >label {
      margin-right: 30px;
    }
  }
  .i-t-b {
    width: 469px;
    border-radius: 5px;
    border: 1px solid $color-secondary;
    color: $color-secondary;
    height: 50px;
    column-gap: 35px;
    &:focus {
      outline: none;
    }
  }
}

.financial-info {
  .b-d {
    width: 70%;
  }
}
.c-f {
  grid-template-columns: 22% 22% 10% 10% 10% 10%;
}
label.mobile {
  display: none;
}
@include for-phone-only {
  label.mobile {
    display: block;
  }
  .not-mobile {
    display: none;
  }
  .form-a {
    width: 100%;
    .i-t-b {
      width: 100%;
    }
  }
  .grid {
    grid-template-columns: 100%;
  }
  .financial-info {
    .b-d {
      width: 100%;
    }
  }
  .button-small {
    margin-bottom: 70px;
  }
}
.momo:nth-child(2) {
  margin-right: 20px;
}
@include for-tablet-portrait-only {
  .form-a {
    width: 100%;
    .i-t-b {
      width: 100%;
    }
  }
  .financial-info {
    .b-d {
      width: 100%;
    }
  }
  .button-small {
    margin-bottom: 70px;
  }
  .c-f {
    grid-template-columns: repeat(3, 1fr);
  }
}
@include for-tablet-landscape-only {
  .form-a {
    width: 100%;
    .i-t-b {
      width: 100%;
    }
  }
  .c-f {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
