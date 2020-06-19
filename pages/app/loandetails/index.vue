<template>
  <div>
    <div class="app">
      <template v-if="tabView==='details'">
        <div class="pt-10 mb-5">
          <p class="text-xl block font-semibold">
            Loan #123 Payments
          </p>
        </div>
        <!-- ==============================================================
        ==========================PAYMENT SECTION====================
        ==============================================================-->
        <section id="payment">
          <div class="my-6">
            <ProgressBar :max="loanDetails.requested_loan_amount" :value="0" />
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
                  50 GHC
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
                  July 27th, 2020
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
            <div class="box bg-white cursor-pointer text-white pt-2 file_area">
              <img src="@/assets/img/pdf.png" alt srcset>
              <p class="text-center">
                Loan Agreement
              </p>
            </div>
            <div class="flex flex-col md:flex-row md:items-center info_area">
              <div class="md:ml-10 flex flex-row items-center md:items-start md:flex-col">
                <p>Total Repayment Amount</p>
                <p class="text-3xl font-semibold">
                  500 GHC
                </p>
              </div>
              <div class="md:ml-16 flex flex-row items-center md:items-start md:flex-col">
                <p>Interest Rate</p>
                <p class="text-3xl font-semibold">
                  10%
                </p>
              </div>
              <div class="md:ml-16 flex flex-row items-center md:items-start md:flex-col">
                <p>Start Date</p>
                <p class="text-3xl font-semibold">
                  11/05/2020
                </p>
              </div>
            </div>
            <div class="ml-10 mt-10 buttons buttons_area">
              <button class="button-sec" @click="toggleView">
                Payment History
              </button>
              <button class="button-sec print">
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
  // middleware: 'auth',
  components: {
    ProgressBar,
    PaymentHistory
  },
  data () {
    return {
      tabView: 'details'
    }
  },
  computed: {
    ...mapGetters({
      loanDetails: 'loan/loanDetails',
      loansState: 'loan/loanDetailState'
    }),
    state () {
      return this.loansState === 'LOADING'
    }
  },
  mounted () {
    this.tabView = 'details'
    EventBus.$on('goBack', () => {
      this.tabView = 'details'
    })
  },
  methods: {
    toggleView () {
      this.tabView = 'history'
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
#agreement {
  .box {
    background: #5a8ff2;
  }
  .c-grid {
    display: grid;
    grid-template-columns: 200px 1fr;
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
  .docs {
    display: flex;
    flex-wrap: wrap;
    .box {
      width: calc(50% - 10px);
      margin: 0px 10px 10px 0px;
    }
  }
  .uploadfiles {
    .box {
      width: 24rem;
      img {
        width: 15%;
      }
    }
  }
  #messaging {
    button {
      width: 120px;
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
</style>
