<template>
  <div>
    <NavBar alt />
    <BaseCard>
      <div class="main py-12">
        <p class="text-xl font-medium">
          Welcome to the  Mastercard Foundation COVID-19 Recovery and Resilience Program in partnership with NBSSI. Please provide the requested pre-application information below and also thoroughly complete the funding application to the best of your ability.  We will use the information from the submitted funding application to assess your business and provide you with a funding decision.
        </p>
        <div class="mt-10">
          <form class="grid">
            <div class="mb-4">
              <label class="block text-gray-900 text-sm mb-2">Please select one</label>
              <Select v-model="id_type" :items="idType" small />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
              >2019 Annual Sales or 2019 Annual Turnover</label>
              <Input
                v-model.number="annual_sales"
                type="number"
                placeholder="e.g 1,000"
                small
                required
                money
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-900 text-sm mb-2">Applicant's ID Number(passport, driver's license, Voters Id)</label>
              <Input
                v-model="id_number"
                type="text"
                :regex="regex"
                small
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
              >Years in Business</label>
              <Input v-model.number="years_in_business" type="text" small />
            </div>
          </form>
          <div class="grid grid-cols-2 mt-4 buttons mt-20 mb-20">
            <div class="flex-1">
              <button
                class="button-small"
                @click="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
    <Footer />
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'
import NavBar from '@/components/NavBar/NavBarDefault.vue'
import BaseCard from '@/components/Misc/ApplicationCard.vue'
import Input from '@/components/Forms/Input.vue'
import Select from '@/components/Forms/Select.vue'
import Footer from '@/components/Footer/FooterAlt.vue'
export default {
  layout: 'homeLayout',
  components: {
    NavBar,
    BaseCard,
    Input,
    Select,
    Footer
  },
  data () {
    return {
      annual_sales: null,
      id_type: null,
      id_number: null,
      years_in_business: null,
      showSubmit: true
    }
  },
  validations: {
    annual_sales: {
      required,
      minValue: minValue(10)
    },
    id_type: {
      required
    },
    years_in_business: {
      required
    },
    id_number: {
      required
    }
  },
  computed: {
    idType () {
      return this.$store.getters['pages/idTypes']
    }
  },
  beforeCreate () {
    this.$store.dispatch('pages/getDropDowns')
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toasted.error('Some fields are empty', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 5000
        })
      } else {
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

        this.$store.dispatch('api/verifyApplication', applyObject).then((res) => {
          window.location = '/loans/0/form'
        })
          .catch(() => {
            this.$toast.error('Wrong Id number provided')
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
form {
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
  form {
    grid-template-columns: 100%;
  }
.buttons {
  button {
    height: 50px;
    width: 100%;
    }
  }
}
</style>
