<template>
  <div>
    <NavBar alt />
    <Steps :current="current">
      <Content @current="viewCurrent" @submitted="submit">
        <LoanDetails :active="true" :submit="submitted" />
        <Info :submit="submitted" />
        <BusinessInfo :submit="submitted" />
        <Docs :submit="submitted" />
        <Review :submit="submitted" />
      </Content>
    </Steps>
    <Footer />
    <Modal v-if="showModal" flex>
      <div class="save-modal pb-32">
        <div class="relative flex justify-end">
          <img src="@/assets/img/Close.png" class="cursor-pointer" @click="closeModal">
        </div>
        <div class="logo mb-40">
          <img src="@/assets/img/logo.png" alt="logo">
        </div>
        <div>
          <p class="text-center text-lg font-medium">
            Save
          </p>
        </div>
        <div class="mt-5 text-center">
          <p>
            To save your application, please input your number
          </p>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="mt-5 px-32" @submit.prevent="handleSubmit(save)">
            <div class="input mx-auto">
              <small class=" text-xs">Same number provided for personal information</small>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Input
                  v-model="phoneNumber"
                  placeholder="Phone Number"
                  type="text"
                  regex="0[2-5]{1}[0-9]{1}[0-9]{6,7}$"
                />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
                <small v-if="error" class="text-sm text-red-700">Phone numbers do not match</small>
              </ValidationProvider>
              <div class="my-4">
                <button type="submit" class="w-full h-8">
                  SAVE
                </button>
              </div>
            </div>
            <p class="text-center">
              To complete your application, sign in with the same number
            </p>
          </form>
        </ValidationObserver>
      </div>
    </Modal>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapState } from 'vuex'
// import Utils from '@/utils/services'
import NavBar from '@/components/NavBar/NavBarDefault.vue'
import Steps from '@/components/Misc/PageSteps.vue'
import Content from '@/components/Misc/Content.vue'
import LoanDetails from '@/components/Forms/LoanDetails.vue'
import Info from '@/components/Forms/PersonalInformation.vue'
import BusinessInfo from '@/components/Forms/BusinessInformation.vue'
import Docs from '@/components/Forms/Docs.vue'
import Review from '@/components/Forms/Review.vue'
import Footer from '@/components/Footer/FooterAlt.vue'
import Modal from '@/components/Misc/Modal'
import Input from '@/components/Forms/Input.vue'
export default {
  middleware: ['readyToApply', 'checkBeforeLeave'],
  layout: 'homeLayout',
  components: {
    NavBar,
    Steps,
    LoanDetails,
    Content,
    Info,
    BusinessInfo,
    Docs,
    Review,
    Footer,
    Modal,
    Input,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      current: 0,
      micro: false,
      submitted: false,
      phoneNumber: '',
      error: false
    }
  },
  computed: mapState({
    showModal: state => state.pages.showSaveModal,
    general: state => state.api.general
  }),
  beforeCreate () {
    this.$store.dispatch('pages/getCountries')
    this.$store.dispatch('pages/getDropDowns')
  },
  created () {
    this.$store.dispatch('api/getPendingApplications')
    this.$store.dispatch('api/setApplicationObject')
  },
  mounted () {
    // window.onpopstate = function (event) {
    //   if (confirm('Are you sure you want to go back?')) {
    //     history.back()
    //   } else {
    //     return false
    //   }
    // }
    window.location = '/'
  },
  // beforeRouteLeave (to, from, next) {
  //   if (to.path !== '/loans/submitted') {
  //     if (confirm('Are you sure you want to go back?')) {
  //       next()
  //     } else {
  //       next(false)
  //     }
  //   }
  // },
  methods: {
    viewCurrent (value) {
      this.current = value
    },
    submit (value) {
      this.submitted = true
    },
    save () {
      if (this.phoneNumber !== this.general.phone_number) {
        this.error = true
      } else {
        this.$toasted.show('Please wait...', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 5000
        })
        this.$store.dispatch('api/saveApplication')
          .then(() => {
            this.$toasted.show('Saved', {
              theme: 'toasted-primary',
              position: 'top-center',
              duration: 5000
            })
            this.$store.commit('pages/SET_SAVE_MODAL', false)
            this.$router.push('/app/registration/login')
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
      }
    },
    closeModal () {
      this.$store.commit('pages/SET_SAVE_MODAL', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  img {
    width: 15rem;
    margin-left: auto;
    margin-right: auto;
  }
}
button {
  background-color: $color-secondary;
  border-radius: 5px;
  color: white;
}
.input {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
}
@include for-tablet-portrait-only {
  form {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}
@include for-phone-only {
  form {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .input {
    width: 100%;
  }
}
</style>
