<template>
  <div>
    <NavBar alt />
    <BaseCard>
      <div class="main py-12">
        <p class="text-xl font-medium">
          Welcome to the NBSSI Mastercard Foundation COVID19 Application. Please provide us your
          Business TIN number and Annual Sales at December 2019 to help us assess your business. If
          you don't have a Business TIN then provide your personal TIN number.
        </p>
        <div class="mt-10">
          <form class="grid">
            <div class="mb-4">
              <label class="block text-gray-700 text-lg font-normal mb-2">
                Tax Identification Number (TIN)
              </label>
              <Input type="text" small />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-lg font-normal mb-2">
                Annual Sales or Annual Turnover
              </label>
              <Input v-model="sales" type="text" placeholder="e.g 1,000" small />
            </div>
          </form>
          <div class="grid grid-cols-2 mt-4 buttons mt-20 mb-20">
            <div class="flex-1">
              <a :href="`/loans/${sales}/form`">
                <button class="button-small">
                  Submit
                </button>
              </a>
            </div>
            <div class="text-center">
              <button>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar/NavBarDefault.vue'
import BaseCard from '@/components/Misc/ApplicationCard.vue'
import Input from '@/components/Forms/Input.vue'
export default {
  layout: 'homeLayout',
  components: {
    NavBar,
    BaseCard,
    Input
  },
  data () {
    return {
      sales: null
    }
  }
}
</script>
<style lang="scss" scoped>
form {
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10%;
}
.buttons {
  column-gap: 20%;
}
.main {
  padding-left: 10%;
  padding-right: 10%;
}
@include for-phone-only {
  form {
    grid-template-columns: 100%;
  }
}
</style>
