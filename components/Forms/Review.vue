<template>
  <div v-show="show">
    <div class="grid review grid-cols-2 gap-10 pt-5">
      <div class="card">
        <div class="mb-5">
          <p class="text-lg">
            Fund Details
          </p>
        </div>
        <div class="grid grid-cols-2 gap-5 text-sm">
          <p class="font-bold">
            Amount Requested
          </p>
          <p>GHS {{ requestedLoanAmount }}</p>
        </div>
        <div class="mt-10">
          <p class="uppercase mt-5 edit cursor-pointer" @click="editInfo">
            EDIT
          </p>
        </div>
      </div>
      <div class="card">
        <div class="mb-5">
          <p class="text-lg">
            Personal Information
          </p>
        </div>
        <div class="grid grid-cols-2 gap-5 text-sm">
          <p class="font-bold">
            Full Name
          </p>
          <p>{{ general.first_name + " " + general.last_name }}</p>
          <p class="font-bold">
            Present Address
          </p>
          <p>{{ general.residential_address }}</p>
          <p class="font-bold">
            Phone Number
          </p>
          <p>{{ general.phone_number }}</p>
          <p class="font-bold">
            Email Address
          </p>
          <p v-if="general.primary_email !== undefined" class="emailAddress">
            {{ general.primary_email }}
          </p>
          <p v-else>
            N/A
          </p>
        </div>
        <div class="mt-10">
          <p class="uppercase mt-5 edit cursor-pointer" @click="editPersonal">
            EDIT
          </p>
        </div>
      </div>
      <div class="card">
        <div class="mb-5">
          <p class="text-lg">
            Business Information
          </p>
        </div>
        <div class="grid grid-cols-2 gap-5 text-sm">
          <p class="font-bold">
            Business Name
          </p>
          <p>{{ general.business_name }}</p>
          <p class="font-bold">
            Business Address
          </p>
          <p>{{ general.business_address }}</p>
          <p class="font-bold">
            Business Email
          </p>
          <p v-if="general.business_email !== undefined" class="emailAddress">
            {{ general.business_email }}
          </p>
          <p v-else>
            N/A
          </p>
          <p class="font-bold">
            Business Number
          </p>
          <p>{{ general.business_phone_number }}</p>
          <p class="font-bold">
            Years in Operation
          </p>
          <p>{{ general.years_in_business }}</p>
        </div>
        <div class="mt-10">
          <p class="uppercase mt-5 edit cursor-pointer" @click="editBusiness">
            EDIT
          </p>
        </div>
      </div>
      <div class="card">
        <div class="mb-5">
          <p class="text-lg">
            Document Upload
          </p>
        </div>
        <div class="grid grid-cols-2 gap-5 text-sm">
          <p class="font-bold">
            Photo ID
          </p>
          <p v-if="general.paye_file_name !== undefined">
            {{ general.id_file_name }}
          </p>
          <p v-else>
            N/A
          </p>
          <p class="font-bold">
            Proof of PAYE
          </p>
          <p v-if="general.paye_file_name !== undefined">
            {{ general.paye_file_name }}
          </p>
          <p v-else>
            N/A
          </p>
          <p class="font-bold">
            SSNIT Statement 2019
          </p>
          <p v-if="general.ssnit_file_name !== undefined">
            {{ general.ssnit_file_name }}
          </p>
          <p v-else>
            N/A
          </p>
        </div>
        <div class="mt-10">
          <p class="uppercase mt-5 edit cursor-pointer" @click="editDocs">
            EDIT
          </p>
        </div>
      </div>
    </div>
    <div class="nav-buttons">
      <div class="flex flex-wrap gap-8">
        <button class="next" @click="confirmModal=true">
          Submit
        </button>
        <button class="previous" type="button" @click="movePrevious">
          Previous
        </button>
        <button class="previous small" type="button" @click="save">
          Save
        </button>
      </div>
    </div>
    <Modal v-if="confirmModal" @close="confirmModal=false">
      <div>
        <div class="h-d mb-10">
          <p class="text-center text-lg font-bold">
            Declaration Section of Application
          </p>
        </div>
        <div>
          <div>
            <p class="text-center text-sm">
              1. Is any shareholder of the applicant organization who owns 20% or
              more of the organisation a subject to criminal investigation or is
              presently incarcerated, or on probation or parole? (Y/N)
            </p>
          </div>
          <div class="flex justify-center mt-5">
            <label class="checkbox">
              Yes
              <input id="yes" v-model="crime" type="checkbox" true-value="true" false-value="false">
              <span class="checkmark" />
            </label>
            <label class="checkbox">
              No
              <input id="no" v-model="crime" type="checkbox" false-value="true" true-value="false">
              <span class="checkmark" />
            </label>
          </div>
          <div class="mt-10">
            <p
              class="text-center text-sm"
            >
              2. Was the applicant organization in a liquidation process on or before March 1, 2020?
            </p>
          </div>
          <div class="flex checks justify-center mt-5">
            <label class="checkbox">
              Yes
              <input id="yes" v-model="liquidation" type="checkbox" true-value="true" false-value="false">
              <span class="checkmark" />
            </label>
            <label class="checkbox">
              No
              <input id="no" v-model="liquidation" type="checkbox" false-value="true" true-value="false">
              <span class="checkmark" />
            </label>
          </div>
        </div>
        <div class="mt-16">
          <p
            class="text-center text-sm"
          >
            I hereby declare that all the information submitted by me in this form is correct, true and valid. I also declare that I have read thoroughly and understood the terms and conditions of this application and have given my consent by virtue of my signature on this form.
          </p>
        </div>
        <div class="sig">
          <label class="block text-gray-900 text-sm font-bold mb-2">Input your Yes/No to accept or decline</label>
          <Input v-model="signature" small type="text" />
        </div>
        <div class="nav-buttons c-b flex gap-5">
          <button v-if="signature.toLowerCase() === 'yes' && liquidation=='false' && crime=='false'" class="button-small next" @click="submitAll">
            Finish
          </button>
          <button class="button-small previous" @click="confirmModal=false">
            Return
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from '../Misc/Modal.vue'
import Input from '../Forms/Input.vue'
export default {
  components: {
    Modal,
    Input
  },
  props: {
    active: Boolean
  },
  data () {
    return {
      show: this.active,
      purpose: null,
      confirmModal: false,
      signature: '',
      liquidation: null,
      crime: null
    }
  },
  computed: {
    general () {
      return this.$store.state.api.general
    },
    requestedLoanAmount () {
      return this.$store.getters['api/requestedLoanAmount']
    },
    fundRoles () {
      return this.$store.getters['pages/fundRoles']
    }
  },
  methods: {
    movePrevious () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 3)
    },
    submitAll () {
      this.$emit('submitted', true)
      this.$toasted.show('Submitting...', {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 5000
      })
      this.$store.dispatch('api/submitApplication')
        .then((result) => {
          window.location = '/loans/submitted'
        })
        .catch((errors) => {
          // get errors from api if any
          for (const error in errors.errors) {
            this.$toasted.show(`${errors.errors[error][0]}`, {
              theme: 'toasted-primary',
              position: 'top-right',
              duration: 5000
            })
          }
        })
    },
    editInfo () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 0)
    },
    editPersonal () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 1)
    },
    editBusiness () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 2)
    },
    editDocs () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 3)
    },
    save () {
      this.$store.commit('pages/SET_SAVE_MODAL', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.sig {
  width: 20%;
  margin: 3rem auto;
  text-align: center;
}
.review {
  grid-template-columns: repeat(2, 1fr);
  width: 70%;
}
.card {
  padding: 20px;
  background-color: #fbfbfb;
}
.edit {
  color: $color-secondary;
  width: 50%;
}
p.emailAddress {
  word-break: break-word;
}
@include for-phone-only {
  .sig {
    width: 100%;
  }
  .review {
    grid-template-columns: 100%;
    width: 100%;
  }
}
@include for-tablet-portrait-only {
  .review {
    width: 100%;
  }
}
@include for-tablet-landscape-only {
  .review {
    width: 80%;
  }
}
</style>
