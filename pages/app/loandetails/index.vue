<template>
  <div>
    <div class="app">
      <template v-if="tabView==='details'">
        <div class="pt-10 mb-5">
          <p class="text-xl block font-semibold">
            Loan # {{ loanDetails.loan_identifier }}
          </p>
        </div>
        <!-- ==============================================================
        ==========================PAYMENT SECTION====================
        ==============================================================-->
        <section id="payment">
          <div class="my-6">
            <ProgressBar :max="0" :value="0" />
          </div>
          <div class="schedule flex gap-10">
            <div class="box p-6 pl-12 bg-white cursor-pointer text-left">
              <div class="mt-2">
                <p>
                  Payment Schedule
                </p>
              </div>
              <div class="mt-3">
                <p class="amount">
                  0 GHC
                </p>
              </div>
              <div>
                <p>
                  / week
                </p>
              </div>
              <div class="mt-3">
                <p class="edit">
                  EDIT
                </p>
              </div>
            </div>
            <div class="box p-6 mx-5 bg-white cursor-pointer text-center">
              <div class="mt-2">
                <p>
                  Next Payment On
                </p>
              </div>
              <div class="mt-3">
                <p>
                  TBD
                </p>
              </div>
              <div class="mt-5">
                <button class="button-sec" @click="toggleView">
                  Payment History
                </button>
              </div>
            </div>
          </div>
        </section>
        <!-- ==============================================================
        ==========================AGREEMENT SECTION====================
        ==============================================================-->
        <section id="agreement" class="my-5">
          <div class="mb-5 mt-10">
            <p class="text-xl font-semibold">
              Agreement and Details
            </p>
          </div>
          <div class="flex c-grid">
            <div class="relative box bg-white cursor-pointer text-white file_area">
              <template v-if="agreement" @click="getPDF('agreement')">
                <span class="tooltip absolute py-1 px-2 bg-black text-white text-xs w-auto rounded-xs hidden"> Click to Dowloand</span>
                <img src="@/assets/img/pdf.png" alt srcset>
                <p class="text-center">
                  Loan Agreement
                </p>
              </template>
              <template v-else>
                <div class="flex flex-col items-center text-center cursor-not-allowed h-full">
                  <!-- <img src="@/assets/img/close-w.svg" class="w-6 h-6" alt=""> -->
                  <img src="@/assets/img/pdf.png" alt srcset>
                  <span class="md:px-4">No Loan Agreement Available</span>
                </div>
              </template>
            </div>
            <div class="flex flex-col md:flex-row md:items-center info_area">
              <div class="md:ml-10 flex flex-row items-center md:items-start md:flex-col">
                <p>Total Repayment Amount</p>
                <p class="text-3xl font-semibold">
                  0 GHC
                </p>
              </div>
              <div class="md:ml-16 flex flex-row items-center md:items-start md:flex-col">
                <p>Interest Rate</p>
                <p class="text-3xl font-semibold">
                  0%
                </p>
              </div>
              <div class="md:ml-16 flex flex-row items-center md:items-start md:flex-col">
                <p>Start Date</p>
                <p class="text-3xl font-semibold">
                  TBD
                </p>
              </div>
            </div>
            <div class="ml-10 mt-10 buttons buttons_area">
              <button :class="[{'cursor-not-allowed': !agreement}, 'button-sec']">
                Download
              </button>
              <button :class="[{'cursor-not-allowed': !agreement}, 'button-sec print']">
                Print
              </button>
            </div>
          </div>
        </section>
      </template>
      <template v-else>
        <PaymentHistory />
      </template>
      <!--  -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import EventBus from '../../../event-bus'
import PaymentHistory from './paymentHistory.vue'
import ProgressBar from '@/components/Forms/ProgressBar.vue'
export default {
  layout: 'appLayout',
  middleware: 'auth',
  components: {
    ProgressBar,
    PaymentHistory
  },
  data () {
    return {
      tabView: 'details',
      image_url: '/icon.png',
      url: 'https://nbssi-post-deploy.wl.r.appspot.com/app/registration/login',
      title: 'Loan Details | Client Portal',
      description: 'Client portal to view loan application status and also to chat directly with backOffice'
    }
  },
  computed: {
    ...mapGetters({
      loanDetails: 'loan/loanDetails',
      loansState: 'loan/loanDetailState'
    }),
    state () {
      return this.loansState === 'LOADING'
    },
    agreement () {
      if (this.loanDetails.status_number === '1' || this.loanDetails.status_number === '5' || this.loanDetails.status_number === '6') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    if (this.$store.state.loan.loandetails.status !== 'complete') {
      this.$router.push('/app/loanapplication')
    }
  },
  mounted () {
    this.tabView = 'details'
    EventBus.$on('goBack', () => {
      // eslint-disable-next-line no-console
      console.log('Event called')
      this.tabView = 'details'
    })
  },
  methods: {
    toggleView () {
      this.tabView = 'history'
    },
    getPDF (url) {
      this.$toasted.show('Downloading document ....', {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 3000
      })
      this.$store.dispatch('loan/getPDF', url)
        .then((response) => {
          const link = document.createElement('a')
          link.href = response
          link.target = '_blank'
          link.click()
        })
        .catch((err) => {
          this.$toasted.error(err.error)
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
.app {
  background-color: $color-white-alt;
  padding: 0 73px 73px ;
}
.box {
  width: 16rem;
  height: 12.65rem;
  &:hover {
    .tooltip {
      display: block!important;
    }
  }
  img {
    margin: 2rem auto;
  }
  p {
    font-weight: 500;
    &.amount {
      font-size: 2rem;
      color: $color-secondary;
    }
    &.edit {
      color: $color-secondary;
    }
  }
}
.button-sec {
  background: #ffffff;
  border: 1px solid $color-secondary;
  box-sizing: border-box;
  border-radius: 5px;
  color: $color-secondary;
  width: 162px;
  height: 40px;
  font-size: 0.8rem;
}
.buttons {
  button {
    &:first-child {
      margin-right: 1.5rem;
    }

    &:last-child {
      border: 1px solid #C49000;
      color: #C49000;
    }
  }
}
.cursor-not-allowed {
  cursor: not-allowed!important;
}
#agreement {
  .box {
    background: #5a8ff2;
  }
  .c-grid {
    display: grid;
    // grid-template-columns: 200px 1fr;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
    grid-template: "file_area info_area"
    "file_area buttons_area";
  }
  .file_area {
    grid-area: file_area;
  }
  .info_area {
    grid-area: info_area;
  }
  .buttons_area {
    grid-area: buttons_area;
  }
}

@include for-phone-only {
  .app {
    padding: 0 20px!important;
    .overview p {
      font-size: 25px;
    }
  }
  .box {
    padding: 12px;
    .button-sec {
      width: 100%;
      height: 34px;
      font-size: 10px;
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  #agreement {
    .c-grid {
      grid-template-columns: 1fr 1fr!important;
      grid-template: "file_area buttons_area"
      "info_area info_area";
    }
    .box {
      width: 100%;
    }
    .file_area {
      img {
        margin: 1rem auto;
        margin-bottom: 15px;
      }
    }
    .buttons_area {
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;

      button {
        margin: 0;
        width: 80%;
      }
    }
    .info_area {
      div {
        padding-top: 5px;
        p {
          &:nth-child(1) {
            width: 60%;
          }
          &:nth-child(2) {
            width: auto;
          }
        }
      }
    }
  }
}

@include for-tablet-portrait-only {
  .app {
    padding: 0 20px!important;
    .overview p {
      font-size: 25px;
    }
  }
}
</style>
