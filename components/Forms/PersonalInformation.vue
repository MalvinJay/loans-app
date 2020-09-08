<template>
  <div v-show="show">
    <ValidationObserver v-slot="{ handleSubmit, valid }">
      <form @submit.prevent="handleSubmit(moveNext)">
        <div class="grid form-b py-20">
          <div class="mb-10">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input
                v-model="personalInfo.first_name"
                tooltip="Enter your name. Make sure it is the same first name on the ID you are using."
                type="text"
                name="First Name"
                regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                required
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-10">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input
                v-model="personalInfo.last_name"
                tooltip=" Enter your Surname or Family Name. Make sure it is the same surname on the ID you are using."
                type="text"
                name="Last Name"
                regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                required
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div>
            <div class="flex items-center mb-2">
              <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">Gender <span class="text-red-600">*</span></label>

              <div
                v-tooltip="'Select Male if you are a Man and Female if you are Woman.'"
                class="ml-4 tooltip-btn flex items-center justify-center"
              >
                ?
              </div>
            </div>

            <ValidationProvider v-slot="{ errors }" rules="required">
              <div class="flex justify-start">
                <label class="checkbox">
                  Male
                  <input
                    id="yes"
                    v-model="personalInfo.gender"
                    type="checkbox"
                    true-value="male"
                    false-value="female"
                  >
                  <span class="checkmark" />
                </label>
                <label class="checkbox">
                  Female
                  <input
                    id="no"
                    v-model="personalInfo.gender"
                    type="checkbox"
                    true-value="female"
                    false-value="male"
                  >
                  <span class="checkmark" />
                </label>
              </div>
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <Input v-model="personalInfo.primary_email" tooltip=" Enter your personal E-mail address if you have one" type="email" name="Email Address (Optional)" optional />
          </div>
          <div>
            <div class="flex">
              <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">Present Address <span class="text-red-600">*</span></label>

              <div
                v-tooltip="' Enter your home or house location address with your Street Name and not Post-office address. Also select your region and district.'"
                class="ml-4 tooltip-btn flex items-center justify-center"
              >
                ?
              </div>
            </div>
          </div>
          <div />
          <div class="mb-12">
            <div class="mb-6">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Input
                  v-model="personalInfo.residential_address"
                  type="text"
                  placeholder="Residential Address"
                />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Select v-model="region" first="Region" :items="regions" />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
          </div>
          <div class="mb-12">
            <div class="mb-6">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Input v-model="personalInfo.town" type="text" placeholder="Town" />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Select v-model="personalInfo.district" required first="District" :items="districts" />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
          </div>
          <div class="mb-12">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input
                v-model="personalInfo.phone_number"
                type="text"
                name="Main Mobile Phone Number"
                regex="0[2-5]{1}[0-9]{1}[0-9]{6,7}$"
                required
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <Input
              v-model="personalInfo.other_phone_number"
              type="text"
              name="Other Phone Number (Optional)"
              regex="0[2-5]{1}[0-9]{1}[0-9]{6,7}$"
            />
          </div>
          <div class="mb-12">
            <Input
              v-model="personalInfo.personal_digital_address_code"
              tooltip="Generate your Digital Address from the Ghana Post (GPS) app or use the Digital Address that is close to you if you can’t generate one on your own."
              type="text"
              name="Nearest Digital Address Code (Optional)"
              placeholder="GA-xxx-xxxx"
              regex="[A-Z]{2}-[0-9]{3,4}-[0-9]{4}$"
              optional
            />
          </div>
          <div class="mb-12">
            <div class="flex">
              <label class="block text-gray-900 text-sm font-bold mb-2">Date of Birth <span class="text-red-600">*</span></label>
              <div
                v-tooltip="'Enter the date you were born. Make sure it is the birth date on the ID you are using.'"
                class="ml-4 tooltip-btn flex items-center justify-center"
              >
                ?
              </div>
            </div>

            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                id="dob"
                v-model="personalInfo.dob"
                type="date"
                name
                min="1920-01-01"
                max="2004-12-12"
              >
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
        </div>
        <div class="nav-buttons">
          <template v-if="!valid">
            <div class="py-2">
              <span class="text-red-500 ">Complete all * fields to proceed</span>
            </div>
          </template>
          <div class="flex flex-wrap gap-8">
            <button type="submit" class="next">
              Next
            </button>
            <button type="button" class="previous" @click="movePrevious">
              Previous
            </button>
            <!-- <button class="previous small" type="button" @click="save">
              Save
            </button> -->
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Input from './Input'
import Select from './Select'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Input,
    Select
  },
  props: {
    active: Boolean,
    submit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: this.active,
      personalInfo: {},
      regex: '',
      region: null
    }
  },
  computed: {
    ...mapGetters({
      idType: 'pages/idTypes',
      regions: 'pages/regions',
      districts: 'pages/personalDistricts',
      residenceStatus: 'pages/residenceStatus'
    }),
    ...mapState({
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
        this.personalInfo = value
        if (value.region) {
          this.region = value.region
        }
      },
      deep: true
    },
    region (value) {
      // eslint-disable-next-line no-console
      this.$store.commit('pages/SET_PERSONAL_DISTRICTS', value)
    },
    regions (value) {
      // for continuing applications: if region exists get districts
      if (this.region) {
        this.$store.commit('pages/SET_PERSONAL_DISTRICTS', this.region)
      }
    },
    show (value) {
      const data = this.aggregate()
      if (value === false) {
        this.$store.commit('api/SET_GENERAL_DATA', data)
        // Update existing application
        if (this.pendingApplication !== null) {
          this.$store.commit('api/MERGE_DATA', data)
        }
      }
    },
    personalInfo: {
      handler (value) {
        if (value.phone_number) {
          this.personalInfo.business_phone_number = value.phone_number
        }
      },
      deep: true
    }
  },
  methods: {
    aggregate () {
      const data = Object.assign({}, this.personalInfo)
      data.region = this.region
      return data
    },
    moveNext () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 2)
    },
    movePrevious () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 0)
    },
    save () {
      this.$store.commit('api/SET_GENERAL_DATA', this.aggregate())
      this.$store.commit('pages/SET_SAVE_MODAL', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-b {
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
  }
}
@include for-phone-only {
  .grid {
    grid-template-columns: 100%;
  }
  .form-b {
    width: 100%;
  }
  input[type="date"] {
    width: 100%;
  }
}
@include for-tablet-portrait-only {
  .form-b {
    width: 100%;
  }
  input[type="date"] {
    width: 100%;
  }
}
@include for-tablet-landscape-only {
  .form-b {
    width: 100%;
  }
  input[type="date"] {
    width: 100%;
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
