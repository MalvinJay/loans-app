<template>
  <div>
    <div class="app">
      <div class="pt-10 mb-5 flex justify-between w-full">
        <p class="text-xl font-semibold">
          Messages
        </p>
        <div class="flex gap-3">
          <button>Submit an inquiry</button>
        </div>
      </div>
      <div>
        <Accordion />
        <Accordion />
        <Accordion />
      </div>
    </div>
  </div>
</template>
<script>
import Accordion from '@/components/Misc/Accordion.vue'
export default {
  layout: 'appLayout',
  components: {
    Accordion
  }
}
</script>
<style lang="scss" scoped>
.app {
  background-color: $color-white-alt;
  padding: 0 73px;
}
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
</style>
