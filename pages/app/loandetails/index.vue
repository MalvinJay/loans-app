<template>
  <div>
    <div class="app">
      <div class="pt-10 mb-5">
        <p class="text-xl block font-semibold">
          Loan #123 Payments
        </p>
      </div>
      <!-- ==============================================================
      ==========================PAYMENT SECTION====================
      ==============================================================-->
      <section id="payment">
        <div class="my-5">
          <ProgressBar :max="50000" :value="20000" />
        </div>
        <div class="flex gap-10">
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
                /week
              </p>
            </div>
            <div class="mt-3">
              <p class="edit">
                EDIT
              </p>
            </div>
          </div>
          <div class="box p-6 bg-white cursor-pointer text-center">
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
              <button class="button-sec">
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
        <div class="flex">
          <div class="box bg-white cursor-pointer text-white pt-2">
            <img src="@/assets/img/pdf.png" alt srcset>
            <p class="text-center">
              Loan Agreement
            </p>
          </div>
          <div class="ml-10">
            <div>
              <p>Total Repayment Amount</p>
              <p class="text-3xl font-semibold">
                500 GHC
              </p>
            </div>
            <div class="mt-10 buttons">
              <button class="button-sec">
                Payment History
              </button>
              <button class="button-sec">
                Print
              </button>
            </div>
          </div>
          <div class="ml-16">
            <div>
              <p>Interest Rate</p>
              <p class="text-3xl font-semibold">
                10%
              </p>
            </div>
          </div>
          <div class="ml-16">
            <div>
              <p>Start Date</p>
              <p class="text-3xl font-semibold">
                11/05/2020
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import ProgressBar from '@/components/Forms/ProgressBar.vue'
export default {
  layout: 'appLayout',
  components: {
    ProgressBar
  }

}
</script>
<style lang="scss" scoped>
.app {
  background-color: $color-white-alt;
  padding: 0 73px;
}
.box {
  width: 16rem;
  height: 12.65rem;
  img {
    margin: 2rem auto;
  }
  p {
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
  }
}
#agreement {
  .box {
    background: #5a8ff2;
  }
}
</style>
