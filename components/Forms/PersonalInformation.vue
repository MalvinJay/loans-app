<template>
  <div v-show="show">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(moveNext)">
        <div class="grid form-b py-20">
          <div class="mb-10">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input v-model="personalInfo.first_name" type="text" name="First Name" regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$" required />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-10">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input v-model="personalInfo.last_name" type="text" name="Last Name" regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$" required />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">Gender <span class="text-red-600">*</span></label>
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
            <Input v-model="personalInfo.primary_email" type="email" name="Email Address (Optional)" optional />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">Present Address <span class="text-red-600">*</span></label>
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
                name="Main Phone Number"
                regex="0[2-5]{1}[0-9]{7,8}$"
                required
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <Input
              v-model="personalInfo.personal_digital_address_code"
              type="text"
              name="Nearest Digital Address Code (Optional)"
              placeholder="GA-xxx-xxxx"
              regex="[A-Z]{2}-[0-9]{3,4}-[0-9]{4}$"
              optional
            />
          </div>
          <div class="mb-12">
            <label class="block text-gray-900 text-sm font-bold mb-2">Date of Birth <span class="text-red-600">*</span></label>
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
      districts: 'pages/districts',
      residenceStatus: 'pages/residenceStatus'
    }),
    ...mapState({
      applicationObject: state => state.pages.application_object
    })
  },
  watch: {
    region (value) {
      this.$store.commit('pages/SET_DISTRICTS', value)
    },
    show (value) {
      const data = this.aggregate()
      if (value === false) {
        this.$store.commit('api/SET_GENERAL_DATA', data)
        this.$store.commit('api/SET_ID', this.applicationObject)
      }
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
</style>
