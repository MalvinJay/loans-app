<template>
  <section class="py-40 px-32">
    <p class="text-center text-2xl">
      Mastercard Foundation / National Board for Small Scale Industries: COVID-19 Relief Fund
    </p>
    <p class="text-center text-4xl font-medium mt-5">
      Frequently Asked Questions
    </p>
    <div class="mt-20">
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
    </div>
  </section>
</template>
<script>
import Accordion from '@/components/Misc/Accordion-alt.vue'
export default {
  layout: 'default',
  components: {
    Accordion
  }
}
</script>
<style lang="scss" scoped>
section {
  background-color: $color-white-alt;
}
@include for-tablet-landscape-only {
  section {
    padding-left: 5rem;
    padding-right: 5rem;
  }
}
@include for-tablet-portrait-only {
  section {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}
@include for-phone-only {
  section {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
