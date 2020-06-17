<template>
  <div>
    <div :class="[{hidden: !state}, 'loading']">
      <img src="@/assets/img/loading.svg" class="w-12 h-full" alt="">
    </div>
    <div class="app">
      <div class="overview pt-10 pb-5">
        <p class="text-xl block font-semibold">
          Overview
        </p>
      </div>
      <!-- ==============================================================
      ==========================PAYMENTS SECTION====================
      ==============================================================-->
      <section id="payment">
        <p class="text-xl">
          Loan #123 Payments
        </p>
        <div class="my-5">
          <ProgressBar :max="50000" :value="20000" />
        </div>
        <p class="text-2xl md:text-xl block font-semibold">
          Payment Method
        </p>
        <div class="my-3">
          <p
            class
          >
            Repayment isn't due until 13-11-2020 but you can choose to start repaying at anytime
          </p>
        </div>

        <div class="payment-structure flex">
          <div class="box bg-white cursor-pointer">
            <img src="@/assets/img/onetime.png" alt srcset>
            <p class="text-center">
              One Time
            </p>
          </div>
          <div class="flex justify-center flex-col px-2 md:px-10">
            <div class="text-xl font-semibold">
              OR
            </div>
          </div>
          <div class="box bg-white cursor-pointer">
            <img src="@/assets/img/calender.png" alt srcset>
            <p class="text-center">
              One Time
            </p>
          </div>
        </div>
      </section>
      <!-- ==============================================================
      ==========================DOCUMENTS SECTION====================
      ==============================================================-->
      <section id="docs" class="my-5">
        <p class="text-2xl md:text-xl">
          Application and Documents
        </p>
        <div class="docs grid text-white gap-10 my-5">
          <div class="box bg-white cursor-pointer">
            <img src="@/assets/img/google-docs.png" alt srcset>
            <p class="text-center">
              One Time
            </p>
          </div>
          <div class="box bg-white cursor-pointer">
            <img src="@/assets/img/pdf.png" alt srcset>
            <p class="text-center">
              Loan Agreement
            </p>
          </div>
          <div class="box bg-white cursor-pointer">
            <img src="@/assets/img/pdf.png" alt srcset>
            <p class="text-center">
              Application ID
            </p>
          </div>
        </div>
        <div>
          <p class="text-2xl md:text-xl block font-semibold">
            Documents Upload
          </p>
          <div class="uploadfiles md:flex gap-10 my-5">
            <div class="md:pr-10 py-4">
              <label class="block text-gray-900 mb-5 h-10 text-lg">
                Proof of PAYE Payments
                <br>(last 3 months)
              </label>
              <div class="box d-i border border-gray-900 py-5 bg-white">
                <div class="img">
                  <img src="@/assets/img/docs.png" alt>
                </div>
                <div class="my-6">
                  <p class="text-center text-sm">
                    Drag & Drop file here (max: 5MB)
                  </p>
                </div>
                <div class="u-b">
                  <label>
                    <input type="file">
                    <span>Browse Files</span>
                  </label>
                </div>
                <div class="mt-6">
                  <p class="text-center text-sm">
                    {{ applicatonIdFile }}
                  </p>
                  <p v-if="loading" class="text-center text-sm">
                    Please wait....
                  </p>
                </div>
              </div>
            </div>
            <div class="md:pr-10 py-4">
              <label class="block text-gray-900 mb-5 h-10 text-lg">
                SSNIT Statement (2019)
              </label>
              <div class="box d-i border border-gray-900 py-5 bg-white">
                <div class="img">
                  <img src="@/assets/img/docs.png" alt>
                </div>
                <div class="my-6">
                  <p class="text-center text-sm">
                    Drag & Drop file here (max: 5MB)
                  </p>
                </div>
                <div class="u-b">
                  <label>
                    <input type="file">
                    <span>Browse Files</span>
                  </label>
                </div>
                <div class="mt-6">
                  <p class="text-center text-sm">
                    {{ applicatonIdFile }}
                  </p>
                  <p v-if="loading" class="text-center text-sm">
                    Please wait....
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- ==============================================================
      ==========================MESSAGING SECTION====================
      ==============================================================-->
      <section id="messaging" class="my-10">
        <div class="flex justify-between w-full">
          <p class="text-xl">
            Messages
          </p>
          <div class="flex gap-3">
            <button>Submit an inquiry</button>
            <div class="table h-full">
              <p class="table-cell font-semibold text-sm pl-8">
                <nuxt-link to="messages">
                  View All
                </nuxt-link>
              </p>
            </div>
          </div>
        </div>
        <Accordion />
        <Accordion />
        <Accordion />
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProgressBar from '@/components/Forms/ProgressBar.vue'
import Accordion from '@/components/Misc/Accordion.vue'
export default {
  layout: 'appLayout',
  components: {
    ProgressBar,
    Accordion
  },
  // middleware: 'auth',
  data () {
    return {
      applicatonIdFile: null,
      loading: false
    }
  },
  mounted () {
    // console.log('loanDetailsState', this.loansState)
    this.$store.dispatch('loan/fetchLoanDetails')
    // .then((response) => {
    //   console.log('LoanDetails', this.loanDetails)
    // })
    // .catch(() => {
    // })
  },
  computed: {
    ...mapGetters({
      loanDetails: 'loan/loanDetails',
      loansState: 'loan/loanDetailState'
    }),
    state () {
      return this.loansState === 'LOADING'
    }
  }
}
</script>
<style lang="scss" scoped>
.hidden {
  display: none!important;
}
.loading {
  position: absolute;
  z-index: 2000;
  background-color: hsla(0,0%,100%,.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity .3s;
  display: flex;
  justify-content: center;
  img {
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
.app {
  background-color: $color-white-alt;
  padding: 0 73px;
}
.box {
  width: 16rem;
  height: 12.65rem;
  border-radius: 5px;
  img {
    margin: 2rem auto;
  }
}
.payment-structure {
  color: $color-secondary;
}
.docs {
  grid-template-columns: 16rem 16rem 16rem 16rem;
  .box {
    img {
      margin-bottom: 3rem;
    }
    &:first-child {
      background: linear-gradient(
        90deg,
        rgba(255, 58, 45, 0.8) 0%,
        rgba(255, 69, 48, 0.8) 100%
      );
    }
    &:nth-child(2) {
      background: #5a8ff2;
    }
    &:nth-child(3) {
      background: #394777;
    }
  }
}
.d-i {
  border: 1px solid #848484;
  border-radius: 5px;
  img {
    margin: 0 auto;
  }
}
.u-b {
  text-align: center;
  label input[type="file"] {
    display: none;
  }
  label span {
    cursor: pointer;
    background-color: white;
    color: $color-secondary;
    border: 1px solid $color-secondary;
    border-radius: 4px;
    padding: 6px 15px;
    font-size: 14px;
  }
}
.uploadfiles {
}
#messaging {
  button {
    background: #ffffff;
    border: 1px solid $color-secondary;
    box-sizing: border-box;
    border-radius: 5px;
    color: $color-secondary;
    width: 162px;
    height: 40px;
    font-size: 0.8rem;
  }
  .table-cell {
    vertical-align: middle;
    color: $color-secondary;
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
}
</style>
