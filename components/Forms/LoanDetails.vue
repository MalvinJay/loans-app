<template>
  <div v-show="show">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(moveNext)">
        <div class="grid form-a py-20">
          <div class="mb-10">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input
                v-model.number="general.requested_loan_amount"
                name="Amount Requested"
                type="number"
                money
                required
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-10">
            <Input v-model.number="years" name="Years in Operation" type="number" disabled />
          </div>
          <div>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
                Are you a startup (i.e. between 0 and 2 years' old)?
                <span class="text-red-600">*</span>
              </label>
              <div class="flex justify-start">
                <label class="checkbox">
                  Yes
                  <input
                    id="yes"
                    v-model="general.is_startup"
                    type="checkbox"
                    true-value="1"
                    false-value="0"
                  >
                  <span class="checkmark" />
                </label>
                <label class="checkbox">
                  No
                  <input
                    id="no"
                    v-model="general.is_startup"
                    type="checkbox"
                    false-value="1"
                    true-value="0"
                  >
                  <span class="checkmark" />
                </label>
              </div>
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
            <div class="mb-12 mt-12">
              <!-- <ValidationProvider v-slot="{ errors }" rules="required"> -->
              <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
                Can you provide proof of COVID-19 impact?
                <span class="text-red-600">*</span>
              </label>
              <div class="flex justify-start">
                <label class="checkbox">
                  Yes
                  <input
                    id="yes"
                    v-model="proofOfImpact"
                    type="checkbox"
                    true-value="true"
                    false-value="false"
                  >
                  <span class="checkmark" />
                </label>
                <label class="checkbox">
                  No
                  <input
                    id="no"
                    v-model="proofOfImpact"
                    type="checkbox"
                    false-value="true"
                    true-value="false"
                  >
                  <span class="checkmark" />
                </label>
              </div>
              <!-- <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider> -->
            </div>
          </div>
          <div class="mb-12">
            <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
              How has COVID-19 impacted your business?
              <span class="text-red-600">*</span>
            </label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <MultiSelect v-model="general.covid_impact" :list="covidImpacts" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
            <div v-if="otherSelected" class="mt-5">
              <textarea
                v-model="general.other_covid_impact"
                name
                rows="10"
                placeholder="Please write down the impact"
              />
            </div>
          </div>
          <div class="mb-12">
            <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
              Do you require any non-financial support?
              <span class="text-red-600">*</span>
            </label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <MultiSelect v-model="general.non_financial_supports" :list="nonFinancialSupport" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
            <div v-if="nonFinancialOtherSelected" class="mt-5">
              <label
                v-if="nonFinancialOtherSelected"
                class="block text-gray-900 text-sm font-normal mb-2 mt-8"
              >
                If other, fill this field
                <span class="text-red-600">*</span>
              </label>
              <Input
                v-model="general.other_non_financial_support"
                type="text"
                placeholder="Please write down the impact"
              />
            </div>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-normal mb-2 font-bold"
            >Proof of COVID-19 Impact Template</label>
            <button class="i-t-b" type="button" :class="{done: checkModal1}" @click="modal1 = true">
              Click to Fill in Template
              <span v-if="checkModal1">&#10003;</span>
            </button>
            <label class="block text-gray-900 text-sm font-normal mb-2 mt-8 font-bold">
              What will you use the funds for?
              <span class="text-red-600">*</span>
            </label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <MultiSelect v-model="general.fund_purposes" :list="fundRoles" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
            <label
              v-if="fundOtherSelected"
              class="block text-gray-900 text-sm font-normal mb-2 mt-8"
            >
              If other, fill this field
              <span class="text-red-600">*</span>
            </label>
            <Input v-if="fundOtherSelected" v-model="general.other_fund_purpose" type="text" />
          </div>
          <div class="mb-4">
            <div>
              <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
                Payment Account Details
                <span class="text-red-600">*</span>
              </label>
              <div v-if="general.requested_loan_amount<=2000" class="grid justify-start ac-dc">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <div class="grid grid-cols-2 gap-5">
                    <label v-for="(item, i) in momo" :key="i" class="checkbox momo">
                      {{ item.bank_name.split(' ')[0] }}
                      <input
                        :id="item.name"
                        v-model="general.financial_institution_id"
                        type="checkbox"
                        :true-value="item.id"
                      >
                      <span class="checkmark" />
                    </label>
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </div>
                </ValidationProvider>
              </div>
            </div>
            <label v-if="general.requested_loan_amount <= 2000" class="block text-gray-900 text-sm font-normal mb-2">
              Mobile Wallet Number (must use your own mobile wallet)
              <span
                class="text-red-600 font-bold"
              >*</span>
            </label>
            <div v-if="general.requested_loan_amount<= 2000">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Input v-model="general.account_no" type="text" regex="0[2,3,5]{1}[0-9]{8}$" />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div v-else>
              <div class="mb-8">
                <label class="block text-gray-900 text-sm font-normal mb-2">Your Selected Bank</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Select v-model="general.financial_institution_id" :items="bankPartner" />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <label class="block text-gray-900 text-sm font-normal mb-2">Bank Account Number</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Input v-model="general.account_no" type="text" regex="[0-9]{5}" />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
          </div>
        </div>
        <div class="nav-buttons">
          <div class="flex">
            <button type="submit" class="next">
              Next
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>

    <!-- ===================================================================================
    =================================COVID TEMPLATE MODAL==============================-->
    <Modal v-if="modal1" @close="modal1 = false">
      <div class="income-info">
        <div class="h-d">
          <p class="text-center text-lg">
            Proof of Covid-19 Impact (2020)
          </p>
          <p
            class="text-center text-sm"
          >
            (Please provide proof of COVID-19 impact on your business, enter amounts as applicable )
          </p>
        </div>
        <!--   Other (add field for applicant to type in what item)  -->
        <div class="grid grid-cols-5 gap-8 b-d">
          <div />
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >March 2020</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >April 2020</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >May 2020</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">Total</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Amount owed to Company from Customers</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">March 2020</label>
            <Input
              v-model.number="covid_proof_of_march_20.outstanding_invoice"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label>
            <Input
              v-model.number="covid_proof_of_april_20.outstanding_invoice"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label>
            <Input
              v-model.number="covid_proof_of_may_20.outstanding_invoice"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label>
            <Input
              v-model="total.outstanding_invoice"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Amount owed by Company</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label>
            <Input
              v-model.number="covid_proof_of_march_20.demand_notice"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label>
            <Input
              v-model.number="covid_proof_of_april_20.demand_notice"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label>
            <Input
              v-model.number="covid_proof_of_may_20.demand_notice"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label>
            <Input
              v-model="total.demand_notice"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Unpaid Salaries</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label>
            <Input
              v-model.number="covid_proof_of_march_20.outstanding_rent"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label>
            <Input
              v-model.number="covid_proof_of_april_20.outstanding_rent"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label>
            <Input
              v-model.number="covid_proof_of_may_20.outstanding_rent"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label>
            <Input
              v-model="total.outstanding_rent"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Unpaid Utility Bills</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label>
            <Input
              v-model.number="covid_proof_of_march_20.unpaid_salaries"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label>
            <Input
              v-model.number="covid_proof_of_april_20.unpaid_salaries"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label>
            <Input
              v-model.number="covid_proof_of_may_20.unpaid_salaries"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label>
            <Input
              v-model="total.unpaid_salaries"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Reduced Sales</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label>
            <Input
              v-model.number="covid_proof_of_march_20.unpaid_utility_bills"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label>
            <Input
              v-model.number="covid_proof_of_april_20.unpaid_utility_bills"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label>
            <Input
              v-model.number="covid_proof_of_may_20.unpaid_utility_bills"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label>
            <Input
              v-model="total.unpaid_utility_bills"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Other</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label>
            <Input
              v-model.number="covid_proof_of_march_20.reduced_productivity"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">April 2020</label>
            <Input
              v-model.number="covid_proof_of_april_20.reduced_productivity"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">May 2020</label>
            <Input
              v-model.number="covid_proof_of_may_20.reduced_productivity"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label>
            <Input
              v-model="total.reduced_productivity"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
        </div>
      </div>
      <div class="my-20 flex gap-3 buttons">
        <button class="button-small" @click="doneModal1">
          Done
        </button>
        <button class="button-small" @click="modal1 = false">
          Cancel
        </button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Modal from '../Misc/Modal'
import Input from './Input'
import Select from './Select'
import MultiSelect from './MultiSelect'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
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
      checkModal1: false,
      micro: false,
      // startup: null,
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
      nonFinancialOtherSelected: false
      // details: {}
    }
  },
  computed: {
    ...mapGetters({
      years: 'pages/yearsInBusiness',
      bankPartner: 'pages/bankPartner',
      covidImpacts: 'pages/covidImpacts',
      fundRoles: 'pages/fundRoles',
      momo: 'pages/momo',
      token: 'local/token',
      nonFinancialSupport: 'pages/nonFinancialSupport'
    }),
    ...mapState({
      currentTab: state => state.pages.currentTab,
      pendingApplication: state => state.api.pendingApplication
    }),
    details: {
      get () {
        if (this.pendingApplication) {
          return Object.assign({}, this.pendingApplication.loan_application)
        } else {
          return {}
        }
      }
    }
  },
  watch: {
    details: {
      handler (value) {
        this.general = { ...this.general, ...value }
        this.covid_proof_of_march_20 = { ...this.covid_proof_of_march_20, ...value.covid_proof_mar_20 }
        this.covid_proof_of_april_20 = { ...this.covid_proof_of_april_20, ...value.covid_proof_apr_20 }
        this.covid_proof_of_may_20 = { ...this.covid_proof_of_may_20, ...value.covid_proof_may_20 }
      },
      deep: true
    },
    general: {
      handler (value) {
        // eslint-disable-next-line no-console
        if (value.covid_impact) {
          this.otherSelected = value.covid_impact.includes('11')
        }

        if (value.fund_purposes) {
          this.fundOtherSelected = value.fund_purposes.includes(9)
        }

        if (value.non_financial_supports) {
          this.nonFinancialOtherSelected = value.non_financial_supports.includes(12)
        }
      },
      deep: true
    },
    show (value) {
      const data = Object.assign({}, this.general) // create copy general object

      const covidProofOfMarch = Object.assign({}, this.covid_proof_of_march_20)
      const covidProofOfApril = Object.assign({}, this.covid_proof_of_april_20)
      const covidProofOfMay = Object.assign({}, this.covid_proof_of_may_20)

      // merge data
      data.covid_proof_mar_20 = covidProofOfMarch
      data.covid_proof_apr_20 = covidProofOfApril
      data.covid_proof_may_20 = covidProofOfMay
      data.years_in_business = this.years
      data.requested_loan_amount = this.general.requested_loan_amount

      if (value === false) {
        this.$store.commit('api/SET_GENERAL_DATA', data)
        // Update pendingApplication
        if (this.pendingApplication !== null) {
          this.$store.commit('api/MERGE_DATA', data)
        }
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
        const data =
          this.parseNumber(this.covid_proof_of_march_20.outstanding_invoice) +
          this.parseNumber(this.covid_proof_of_april_20.outstanding_invoice) +
          this.parseNumber(this.covid_proof_of_may_20.outstanding_invoice)
        this.total.outstanding_invoice = this.thousandSeprator(data)

        const demandData =
          this.parseNumber(this.covid_proof_of_march_20.demand_notice) +
          this.parseNumber(this.covid_proof_of_april_20.demand_notice) +
          this.parseNumber(this.covid_proof_of_may_20.demand_notice)
        this.total.demand_notice = this.thousandSeprator(demandData)

        const rentData =
          this.parseNumber(this.covid_proof_of_march_20.outstanding_rent) +
          this.parseNumber(this.covid_proof_of_april_20.outstanding_rent) +
          this.parseNumber(this.covid_proof_of_may_20.outstanding_rent)
        this.total.outstanding_rent = this.thousandSeprator(rentData)

        const salariesData =
          this.parseNumber(this.covid_proof_of_march_20.unpaid_salaries) +
          this.parseNumber(this.covid_proof_of_april_20.unpaid_salaries) +
          this.parseNumber(this.covid_proof_of_may_20.unpaid_salaries)
        this.total.unpaid_salaries = this.thousandSeprator(salariesData)

        const utilitiesData =
          this.parseNumber(this.covid_proof_of_march_20.unpaid_utility_bills) +
          this.parseNumber(this.covid_proof_of_april_20.unpaid_utility_bills) +
          this.parseNumber(this.covid_proof_of_may_20.unpaid_utility_bills)
        this.total.unpaid_utility_bills = this.thousandSeprator(utilitiesData)

        const productivityData =
          this.parseNumber(this.covid_proof_of_march_20.reduced_productivity) +
          this.parseNumber(this.covid_proof_of_april_20.reduced_productivity) +
          this.parseNumber(this.covid_proof_of_may_20.reduced_productivity)
        this.total.reduced_productivity = this.thousandSeprator(
          productivityData
        )

        // calculate total demand notce
      },
      deep: true
    },
    covid_proof_of_april_20: {
      handler (value) {
        // calculate total outstanding invoie
        const invoiceData =
          this.parseNumber(this.covid_proof_of_march_20.outstanding_invoice) +
          this.parseNumber(this.covid_proof_of_april_20.outstanding_invoice) +
          this.parseNumber(this.covid_proof_of_may_20.outstanding_invoice)
        this.total.outstanding_invoice = this.thousandSeprator(invoiceData)

        const demandData =
          this.parseNumber(this.covid_proof_of_march_20.demand_notice) +
          this.parseNumber(this.covid_proof_of_april_20.demand_notice) +
          this.parseNumber(this.covid_proof_of_may_20.demand_notice)
        this.total.demand_notice = this.thousandSeprator(demandData)

        const rentData =
          this.parseNumber(this.covid_proof_of_march_20.outstanding_rent) +
          this.parseNumber(this.covid_proof_of_april_20.outstanding_rent) +
          this.parseNumber(this.covid_proof_of_may_20.outstanding_rent)
        this.total.outstanding_rent = this.thousandSeprator(rentData)

        const salariesData =
          this.parseNumber(this.covid_proof_of_march_20.unpaid_salaries) +
          this.parseNumber(this.covid_proof_of_april_20.unpaid_salaries) +
          this.parseNumber(this.covid_proof_of_may_20.unpaid_salaries)
        this.total.unpaid_salaries = this.thousandSeprator(salariesData)

        const utilitiesData =
          this.parseNumber(this.covid_proof_of_march_20.unpaid_utility_bills) +
          this.parseNumber(this.covid_proof_of_april_20.unpaid_utility_bills) +
          this.parseNumber(this.covid_proof_of_may_20.unpaid_utility_bills)
        this.total.unpaid_utility_bills = this.thousandSeprator(utilitiesData)

        const productivityData =
          this.parseNumber(this.covid_proof_of_march_20.reduced_productivity) +
          this.parseNumber(this.covid_proof_of_april_20.reduced_productivity) +
          this.parseNumber(this.covid_proof_of_may_20.reduced_productivity)
        this.total.reduced_productivity = this.thousandSeprator(
          productivityData
        )
        // calculate total demand notce
      },
      deep: true
    },
    covid_proof_of_march_20: {
      handler (value) {
        // calculate total outstanding invoice
        const invoiceData =
          this.parseNumber(this.covid_proof_of_march_20.outstanding_invoice) +
          this.parseNumber(this.covid_proof_of_april_20.outstanding_invoice) +
          this.parseNumber(this.covid_proof_of_may_20.outstanding_invoice)
        this.total.outstanding_invoice = this.thousandSeprator(invoiceData)

        // calculate total demand notice
        const demandData =
          this.parseNumber(this.covid_proof_of_march_20.demand_notice) +
          this.parseNumber(this.covid_proof_of_april_20.demand_notice) +
          this.parseNumber(this.covid_proof_of_may_20.demand_notice)
        this.total.demand_notice = this.thousandSeprator(demandData)

        // calculate total outstanding rent
        const rentData =
          this.parseNumber(this.covid_proof_of_march_20.outstanding_rent) +
          this.parseNumber(this.covid_proof_of_april_20.outstanding_rent) +
          this.parseNumber(this.covid_proof_of_may_20.outstanding_rent)
        this.total.outstanding_rent = this.thousandSeprator(rentData)

        // calculate total unpaid salaries
        const salariesData =
          this.parseNumber(this.covid_proof_of_march_20.unpaid_salaries) +
          this.parseNumber(this.covid_proof_of_april_20.unpaid_salaries) +
          this.parseNumber(this.covid_proof_of_may_20.unpaid_salaries)
        this.total.unpaid_salaries = this.thousandSeprator(salariesData)

        // calculate total unpaid utility bills
        const utilitiesData =
          this.parseNumber(this.covid_proof_of_march_20.unpaid_utility_bills) +
          this.parseNumber(this.covid_proof_of_april_20.unpaid_utility_bills) +
          this.parseNumber(this.covid_proof_of_may_20.unpaid_utility_bills)
        this.total.unpaid_utility_bills = this.thousandSeprator(utilitiesData)

        // calculate total reduced productivity
        const productivityData =
          this.parseNumber(this.covid_proof_of_march_20.reduced_productivity) +
          this.parseNumber(this.covid_proof_of_april_20.reduced_productivity) +
          this.parseNumber(this.covid_proof_of_may_20.reduced_productivity)
        this.total.reduced_productivity = this.thousandSeprator(
          productivityData
        )
      },
      deep: true
    }
  },
  created () {
    if (this.$route.params.amount < 145000) {
      this.micro = true
    }
  },
  mounted () {
    if (this.token && this.pendingApplication) {
      // this.general = this.pendingApplication.loan_application
    }
  },
  methods: {
    moveNext () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 1)
    },
    toggleModal1 () {
      this.modal1 = false
    },
    selected (value) {
      this.covidImpact = value
    },
    parseNumber (value) {
      const val = parseFloat(value)
      if (isNaN(val)) {
        return 0
      } else {
        return val
      }
    },
    doneModal1 (value) {
      this.checkModal1 = true
      this.modal1 = false
    },
    thousandSeprator (amount) {
      if (
        amount !== '' ||
        amount !== undefined ||
        amount !== 0 ||
        amount !== '0' ||
        amount !== null
      ) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return amount
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
    > label {
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
    &.done {
      color: rgb(31, 189, 17);
      border-color: rgb(31, 189, 17);
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
  .buttons {
    justify-content: space-between;
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
