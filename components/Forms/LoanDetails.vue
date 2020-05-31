<template>
  <div v-show="show">
    <div class="grid form-a py-20">
      <div class="mb-10">
        <Input v-model="loanAmount" name="Funding Amount" />
      </div>
      <div class="mb-10">
        <Input v-model="years" name="Years in Operation" />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold" for="username">
          Are you a startup?
        </label>
        <div class="flex justify-start">
          <label class="checkbox">Yes
            <input id="yes" v-model="startup" type="checkbox" true-value="true" false-value="false">
            <span class="checkmark" />
          </label>
          <label class="checkbox">No
            <input id="no" v-model="startup" type="checkbox" false-value="true" true-value="false">
            <span class="checkmark" />
          </label>
        </div>
      </div>
      <div class="mb-12">
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold" for="username">
          How has COVID-19 impacted your business
        </label>
        <MultiSelect @selected="selected" />
      </div>
      <div class="mb-12">
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold" for="username">
          Can you provide proof COVID-19 of impact
        </label>
        <div class="flex justify-start">
          <Checkbox>Yes</Checkbox>
          <Checkbox>No</Checkbox>
        </div>
      </div>
      <div class="mb-12">
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold" for="username">
          Repayment Account Details
        </label>
        <div class="flex justify-start ac-dc">
          <Checkbox>MTN</Checkbox>
          <Checkbox>Vodafone</Checkbox>
          <Checkbox>AirtelTigo</Checkbox>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold" for="username">
          Proof of COVID-19 Impact
        </label>
        <button class="i-t-b" @click="modal1 = true">
          Click to Fill in Template
        </button>
        <label class="block text-gray-900 text-sm font-normal mb-2 mt-8" for="username">
          What will you use the funds for
        </label>
        <Select :items="fundRole" />
        <label class="block text-gray-900 text-sm font-normal mb-2 mt-8" for="username">
          If other, fill this field
        </label>
        <Input />
      </div>
      <div class="mb-4">
        <label class="block text-gray-900 text-sm font-normal mb-2" for="username">
          Mobile Wallet Number (must use your own mobile wallet account)
        </label>
        <Input />
        <div class="mb-8">
          <label class="block text-gray-900 text-sm font-normal mb-2 mt-8" for="username">
            Bank Partner
          </label>
          <Select />
        </div>
        <label class="block text-gray-900 text-sm font-normal mb-2" for="username">
          Bank Account Number
        </label>
        <Input />
      </div>
    </div>
    <Modal v-if="modal1" @close="modal1 = false">
      <div class="income-info">
        <div class="h-d">
          <p class="text-center text-lg">
            Income Statement
          </p>
        </div>
        <div class="grid grid-cols-5 gap-8 b-d">
          <div />
          <div><label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">March</label> </div>
          <div><label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">April</label></div>
          <div><label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">May</label></div>
          <div><label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">Total</label></div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Outstanding Invoice</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Demand Notice</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Outstanding Rent</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Unpaid Salaries</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Unpaid Utility Bills</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Reduced Sales</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Reduced Productivity</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-bold mb-2">Increased Raw Material Cost</label></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">March</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">April</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">May</label><Input placeholder="GHC" small /></div>
          <div><label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total</label><Input placeholder="GHC" small /></div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
// import Multiselect from 'vue-multiselect'
import Modal from '../Misc/Modal'
import Input from './Input'
import Checkbox from './Checkbox'
import Select from './Select'
import MultiSelect from './MultiSelect'
export default {
  components: {
    Input,
    Checkbox,
    Select,
    Modal,
    MultiSelect
  },
  props: {
    active: Boolean
  },
  data () {
    return {
      show: this.active,
      fundRole: [
        'Purchase Inventory',
        'Pay Bill',
        'Invest in new equipment',
        'Pay staff',
        'Hire more staff',
        'Renovation',
        'Tax payment',
        'Marketing expenses',
        'Other (complete next field)'
      ],
      modal1: false,
      micro: false,
      details: {
      },
      loanAmount: null,
      years: null,
      startup: null,
      startupYes: null,
      startupNo: null,
      covidImpact: []
    }
  },
  watch: {
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
    }
  },
  created () {
    if (this.$route.params.amount < 145000) {
      this.micro = true
    }
  },
  methods: {
    toggleModal1 () {
      this.modal1 = false
    },
    customLabel (option) {
      return `${option.library} - ${option.language}`
    },
    selected (value) {
      // eslint-disable-next-line no-console
      console.log(value)
      this.covidImpact = value
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
@include for-phone-only {
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
