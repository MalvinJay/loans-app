<template>
  <div>
    <NavBar alt />
    <BaseCard>
      <div class="main py-12">
        <p class="text-xl font-medium">
          Welcome to the NBSSI Mastercard Foundation COVID19 Application. Please provide us your
          Business TIN number and Annual Sales as of December 31, 2019 in order to help us assess your business. If
          you don't have a Business TIN then provide your personal TIN number.
        </p>
        <div class="mt-10">
          <form class="grid">
            <div class="mb-4">
              <label class="block text-gray-900 text-sm mb-2">Applicant ID Type</label>
              <Select :items="idType" small />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
              >2019 Annual Sales or 2019 Annual Turnover</label>
              <Input
                v-model.number="sales"
                type="number"
                placeholder="e.g 1,000"
                small
                required
                money
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-900 text-sm mb-2">Applicant's ID (passport, driver's license, Voters Id)</label>
              <Input
                type="text"
                :regex="regex"
                small
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
              >Tax Identification Number (TIN)</label>
              <Input v-model="tin_number" type="text" small regex="([A-Z]{1})([0-9]{10})$" />
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
      sales: null,
      tin_number: '',
      showSubmit: true
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
      if (this.tin_number === null || this.sales === null || this.tin_number === '' || this.sales === '') {
        this.$toasted.error('Some fields are empty', {
          theme: 'toasted-primary',
          position: 'top-right',
          duration: 5000
        })
      } else {
        const applyObject = {
          annual_sales: this.sales,
          tin_number: this.tin_number
        }
        // this.$toast.show('Logging in...')
        this.$toasted.show('Verifying tin Number', {
          theme: 'toasted-primary',
          position: 'top-right',
          duration: 5000
        })

        this.$store.dispatch('api/verifyApplication', applyObject).then((res) => {
          window.location = '/loans/0/form'
        })
          .catch(() => {
            this.$toast.error('Wrong TIN number')
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
