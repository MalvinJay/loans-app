<template>
  <div>
    <Modal v-if="showModal" :flex="true">
      <div class="flex flex-col">
        <div class="text-3xl text-center">
          <i>** <span class="font-bold">TIPS</span> **</i>
        </div>
        <div class="flex justify-between items-center pt-8">
          <p class="flex flex-col pr-6">
            <span>Have you read the Eligibility Criteria section?</span>
            <nuxt-link to="eligibility-criteria">
              <span class="font-bold text-sm text-blue"><i>Get info here -></i></span>
            </nuxt-link>
          </p>
          <input v-model="initialChecks.eligibility" name="eligibility" type="checkbox" @change="confirmKnowledge">
        </div>
        <div class="flex justify-between items-center pt-8">
          <p class="flex flex-col pr-6">
            <span>Have you read the FAQs section?</span>
            <nuxt-link to="faqs">
              <span class="font-bold text-sm text-blue"><i>Get info here -></i></span>
            </nuxt-link>
          </p>
          <input v-model="initialChecks.faqs" name="eligibility" type="checkbox" @change="confirmKnowledge">
        </div>
      </div>
    </Modal>
    <NavBar alt />
    <BaseCard>
      <div class="main py-12">
        <p class="text-xl font-medium">
          Welcome to the  Mastercard Foundation COVID-19 Recovery and Resilience Program in partnership with NBSSI. Please provide the requested pre-application information below and also thoroughly complete the funding application to the best of your ability.  We will use the information from the submitted funding application to assess your business and provide you with a funding decision.
        </p>
        <div class="mt-10">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <!-- <form ref="form" @submit.prevent="handleSubmit(submit)"> -->
            <form ref="form" @submit.prevent="handleSubmit(onSubmit)">
              <div class="grid">
                <div class="mb-4">
                  <label class="block text-gray-900 text-sm mb-2">Applicant ID Type <span class="text-red-600">*</span></label>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Select v-model="id_type" :items="idType" small @input="onChange" />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-4">
                  <div class="flex">
                    <label
                      class="block text-gray-700 text-sm font-normal mb-2"
                    >2019 Annual Sales or 2019 Annual Turnover <span class="text-red-600">*</span></label>
                    <div
                      v-tooltip="'Insert the total sales or revenue your company made from January to December 2019'"
                      class="ml-4 tooltip-btn flex items-center justify-center"
                    >
                      ?
                    </div>
                  </div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Input
                      v-model.number="annual_sales"
                      type="number"
                      placeholder="e.g 1,000"
                      small
                      money
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-4">
                  <div class="flex">
                    <label class="block text-gray-900 text-sm mb-2">
                      Applicant's ID Number(passport, driver's license, Voters Id) <span class="text-red-600">*</span>
                    </label>
                    <div
                      v-tooltip="'You cannot apply without an ID. Any of the following is acceptable: <br /> Passport, <br /> Voters ID  and <br /> Driver’s License'"
                      class="ml-4 tooltip-btn flex items-center justify-center"
                    >
                      ?
                    </div>
                  </div>
                  <ValidationProvider ref="idNum" v-slot="{ errors }" rules="required">
                    <Input
                      v-model="id_number"
                      type="text"
                      :regex="regex"
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-4">
                  <div class="flex">
                    <label
                      class="block text-gray-700 text-sm font-normal mb-2"
                    >Years in Business <span class="text-red-600">*</span></label>
                    <div
                      v-tooltip="'Indicate the number of years you have operated your business until 2020. E.g. if you started your business in 2015 then enter 5 years.'"
                      class="ml-4 tooltip-btn flex items-center justify-center"
                    >
                      ?
                    </div>
                  </div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Input v-model.number="years_in_business" type="text" small />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
              </div>
              <div class="mb-4 w-full">
                <recaptcha @error="onError" @success="onSuccess" @expired="onExpired" />
                <small class="text-sm text-red-700 font-bold">{{ recaptchError }}</small>
              </div>
              <div class="nav-buttons mt-10">
                <div>
                  <button
                    class="button-small"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </BaseCard>
    <Footer />
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar/NavBarDefault.vue'
import BaseCard from '@/components/Misc/ApplicationCard.vue'
import Input from '@/components/Forms/Input.vue'
import Select from '@/components/Forms/Select.vue'
import Footer from '@/components/Footer/FooterAlt.vue'
import Modal from '@/components/Misc/Modal.vue'
export default {
  layout: 'homeLayout',
  components: {
    NavBar,
    BaseCard,
    Input,
    Select,
    Footer,
    ValidationProvider,
    ValidationObserver,
    Modal
  },
  data () {
    return {
      annual_sales: null,
      id_type: null,
      id_number: null,
      years_in_business: null,
      showSubmit: true,
      regex: '',
      initialChecks: {
        eligibility: null,
        faqs: null
      },
      ApplicantReader: JSON.parse(localStorage.getItem('userReader')) || false,
      image_url: '/icon.png',
      url: 'https://nbssimastercard-staging.wl.r.appspot.com/apply',
      title: 'Apply For Funding',
      description: 'All Ghanaian Micro, Small and Medium-sized Enterprises (MSMEs) that qualify are encouraged to apply for the Emergency Relief Funding Programme.',
      recaptchError: null
    }
  },
  computed: {
    idType () {
      return this.$store.getters['pages/idTypes']
    },
    ...mapState({
      showModal: state => state.pages.applicantReadiness
    })
  },
  watch: {
    id_type (value) {
      if (value === '3') {
        // this.regex = '[A-Z]{3,4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$'
        this.regex = ''
      } else if (value === '1') {
        this.regex = '[0-9]{10}$'
      } else if (value === '2') {
        this.regex = '[A-Z]{1}[0-9]{7}$'
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('pages/getDropDowns')
  },
  methods: {
    onChange (val) {
      if (val === '3') {
        this.$nextTick(() => {
          this.$refs.idNum.reset()
          // this.$refs.observer.reset()
        })
      }
    },
    onError (error) {
      // eslint-disable-next-line no-console
      console.log('Error happened:', error)
    },
    async onSubmit () {
      try {
        const token = await this.$recaptcha.getResponse()
        this.recaptchError = null
        // Token available
        if (token) {
          this.submit()
        }
      } catch (error) {
        this.$toast.error('Kindly check & complete recaptcha')
        this.recaptchError = 'Kindly check & complete recaptcha'
      }
    },
    onSuccess (token) {
      this.recaptchError = null
      // eslint-disable-next-line no-console
      console.log('Not a robot')
    },
    onExpired () {
      this.$toast.error('Verification Expired, Try again')
    },
    confirmKnowledge () {
      if (this.initialChecks.eligibility && this.initialChecks.faqs) {
        localStorage.setItem('userReader', true)
        this.$store.commit('pages/SET_APPLICANT_READINESS', false)
      }
    },
    submit () {
      const applyObject = {
        annual_sales: this.annual_sales,
        id_type: this.id_type,
        id_number: this.id_number,
        years_in_business: this.years_in_business
      }
      // this.$toast.show('Logging in...')
      this.$toasted.show('Please wait...', {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 10000
      })

      this.$store.dispatch('api/verifyApplication', applyObject)
        .then((res) => {
          // Reset token
          // this.$recaptcha.reset()
          window.location = '/loans/0/form'
        })
        .catch(() => {
          this.$toast.error('Could not verify ID')
          this.$toast.error('Please make sure you enter a valid ID')
        })
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'title', content: this.title },
        { hid: 'description', name: 'description', content: this.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.url },
        { property: 'og:title', content: this.title },
        { property: 'og:description', content: this.description },
        { property: 'og:image', content: this.image_url },
        { property: 'twitter:url', content: this.url },
        { property: 'twitter:title', content: this.title },
        { property: 'twitter:description', content: this.description },
        { property: 'twitter:image', content: this.image_url }

      ]
    }
  }
}
</script>
<style lang="scss" scoped>
input[type=checkbox] {
  zoom: 2;
  background-color: red!important;
  &:checked::after, &:checked::before  {
    background-color: $color-primary
  }
}
.grid {
  grid-template-columns: repeat(2, 1fr);
  column-gap: 3%;
}
.buttons {
  column-gap: 20%;
  button {
    height: 50px;
    width: 279px;
  }
}
.main {
  padding-left: 10%;
  padding-right: 10%;
}
@include for-phone-only {
  .grid {
    grid-template-columns: 100%;
    &>div{
      &:nth-child(2) {
        order: 2;
      }
      &:nth-child(4) {
        order: 4;
      }
    }
  }
.buttons {
  button {
    height: 50px;
    width: 100%;
    }
  }
}

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: #C49000;
    color: white;
    border-radius: 5px;
    padding: 10px;
    max-width: 300px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #C49000;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 10px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 10px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 10px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 10px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: #C49000;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(#C49000, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}

</style>
