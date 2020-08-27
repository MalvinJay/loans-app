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
      <div v-if="businessScale !== '1' && businessScale !== '2' && isStartup === false" class="card">
        <div class="mb-5">
          <p class="text-lg">
            Document Upload
          </p>
        </div>
        <div class="grid grid-cols-2 gap-5 text-sm">
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
      <div class="flex flex-wrap gap-8 mt-8">
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
      <div class="mb-32">
        <div class="h-d mb-10">
          <p class="text-center text-lg font-bold">
            Declaration Section of Application
          </p>
          <p class="text-red-600 text-sm text-center">
            * Ensure all information you have provided is correct <br>
            * Select <b>YES</b> or <b>NO</b> on the applicable questions. <br>
            * Read the terms and conditions information provided carefully. <br>
            * Sign by Entering <b>Agree/Disagree</b> to the text information read. Then click <b>Finish</b>.
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
            By signing this application, I certify that all of the information in this application form is true to the best of my knowledge.
            Further, I understand that this information and other information held by NBSSI may be reported to Mastercard Foundation and its partner institutions, and be used for evaluation and other program purposes.
            I understand that the information may be stored both in Canada and Ghana. I also understand that NBSSI and Mastercard Foundation will keep all of my information in strict confidence and will not release it in any way that would permit individual identification without my permission.
            I authorize release and use of this information, as described above, to Mastercard Foundation.
            I understand that by signing this declaration, I permit NBSSI to: release to any project sponsor, participating financial institutions, and/or vendors, my name, address, email address, and telephone number; release to participating financial institutions, the information provided in this application; use all such information to prepare presentations, publications, and marketing  and promotional materials.
            I understand that my personal information will be shared with third parties such as credit bureaus in accordance with Bank of Ghana regulations.
            I declare that I have read thoroughly and understood the terms and conditions of this application, and hereby give my consent to the foregoing by signing below.
          </p>
        </div>
        <div class="sig">
          <label class="block text-gray-900 text-sm font-bold mb-2">Type Agree/Disagree to accept or decline</label>
          <Input v-model="signature" small type="text" />
        </div>
        <div class="nav-buttons c-b flex gap-5">
          <button v-if="signature.toLowerCase() === 'agree' && liquidation=='false' && crime=='false'" class="button-small next" @click="reConfirm = true">
            Finish
          </button>
          <button class="button-small previous" @click="confirmModal=false">
            Return
          </button>
        </div>
      </div>
    </Modal>
    <Modal v-if="reConfirm" :flex="true">
      <div class="h-d mb-10 flex flex-col items-center justify-center">
        <p class="text-center text-xl font-bold py-4">
          Are you sure all information provided are accurate?
        </p>
        <p class="py-4">
          Note that inaccurate information provided can disqualify you from funding
        </p>
        <div class="nav-buttons c-b flex gap-5 py-4">
          <button class="button-small next" @click="submitAll">
            Proceed
          </button>
          <button class="button-small previous" @click="reConfirm=false">
            Go Back
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
      crime: null,
      reConfirm: false
    }
  },
  computed: {
    general () {
      return this.$store.state.api.general
    },
    ...mapGetters({
      requestedLoanAmount: 'api/requestedLoanAmount',
      fundRoles: 'pages/fundRoles',
      businessScale: 'pages/businessScale',
      isStartup: 'pages/isStartup'
    })
  },
  methods: {
    movePrevious () {
      if (this.businessScale !== '1' && this.businessScale !== '2' && this.isStartup === false) {
        this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 3)
      } else {
        this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 2)
      }
    },
    submitAll () {
      this.reConfirm = false
      this.$emit('submitted', true)
      this.$toasted.show('Submitting...', {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 5000
      })
      // Submit application
      this.$store.dispatch('api/submitApplication')
        .then((result) => {
          localStorage.removeItem('application_object')
          window.location = '/loans/submitted'
        })
        .catch((errors) => {
          this.$toasted.show('Error submitting application', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
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
