<template>
  <div v-show="show">
    <div class="grid form-b py-20">
      <div class="mb-10">
        <Input v-model="personalInfo.first_name" type="text" name="First Name" />
      </div>
      <div class="mb-10">
        <Input v-model="personalInfo.last_name" type="text" name="Last Name" />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">Gender</label>
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
      </div>
      <div class="mb-12">
        <Input v-model="personalInfo.primary_email" type="email" name="Email Address (Optional)" optional />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">Present Address</label>
      </div>
      <div />
      <div class="mb-12">
        <div class="mb-6">
          <Input
            v-model="personalInfo.residential_address"
            type="text"
            placeholder="Residential Address"
          />
        </div>
        <div>
          <Select v-model="region" first="Region" :items="regions" />
        </div>
      </div>
      <div class="mb-12">
        <div class="mb-6">
          <Input v-model="personalInfo.town" type="text" placeholder="Town" />
        </div>
        <div>
          <Select v-model="personalInfo.district" first="District" :items="districts" />
        </div>
      </div>
      <div class="mb-12">
        <Input
          v-model="personalInfo.phone_number"
          type="text"
          name="Main Phone Number"
          regex="0[2-5]{1}[0-9]{7,8}$"
        />
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
        <label class="block text-gray-900 text-sm font-bold mb-2">Date of Birth</label>
        <input v-model="personalInfo.dob" type="date" name>
      </div>
      <!-- <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Applicant ID Type</label>
        <Select v-model="personalInfo.id_type" :items="idType" />
      </div>
      <div class="mb-12">
        <Input
          v-model="personalInfo.id_number"
          type="text"
          name="Applicant's ID (passport, driver's license, Voters Id)"
          :regex="regex"
        />
      </div> -->
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Input from './Input'
import Select from './Select'
export default {
  components: {
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
    idType () {
      return this.$store.getters['pages/idTypes']
    },
    regions () {
      return this.$store.getters['pages/regions']
    },
    districts () {
      return this.$store.getters['pages/districts']
    },
    residenceStatus () {
      return this.$store.getters['pages/residenceStatus']
    },
    applicationObject () {
      return this.$store.state.pages.application_object
    },
    currentTab () {
      return this.$store.state.pages.currentTab
    }
  },
  validations: {
    personalInfo: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      gender: {
        required
      },
      residential_address: {
        required
      },
      town: {
        required
      },
      district: {
        required
      },
      phone_number: {
        required
      },
      dob: {
        required
      }
    },
    region: {
      required
    }

  },
  watch: {
    region (value) {
      this.$store.commit('pages/SET_DISTRICTS', value)
    },
    show (value) {
      // this.$v.$touch()
      // eslint-disable-next-line no-console
      // console.log(this.$v)
      // if (this.$v.$invalid) {
      //   // alert(this.$v.)
      //   this.$store.commit('pages/SET_FORM_ERRORS', 'please fill all fields before moving to next page')
      // } else {
      //   this.$store.commit('pages/SET_FORM_ERRORS', '')
      // }
      const data = Object.assign({}, this.personalInfo)
      data.region = this.region
      if (value === false) {
        this.$store.commit('api/SET_GENERAL_DATA', data)
        this.$store.commit('api/SET_ID', this.applicationObject)
      }
    },
    personalInfo: {
      handler (value) {
        if (value.id_type === '3') {
          this.regex = '[A-Z]{3}-[0-9]{4}-[0-9]{4}-[0-9]{4}$'
        } else if (value.id_type === '1') {
          this.regex = '[0-9]{10}$'
        } else if (value.id_type === '2') {
          this.regex = '[A-Z]{1}[0-9]{9}$'
        }
      },
      deep: true
    }
  },
  beforeUpdate () {
    this.$v.$touch()
    if (this.$v.$invalid && this.currentTab === 1) {
      this.$store.commit(
        'pages/SET_FORM_ERRORS',
        'please fill all fields on personal info before moving to next page'
      )
    } else {
      this.$store.commit('pages/SET_FORM_ERRORS', '')
    }
  }
  // updated () {
  //   // eslint-disable-next-line no-console
  //   console.log('personal is updated')
  // }
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
