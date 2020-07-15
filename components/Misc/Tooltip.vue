<template>
  <div
    :v-tooltip="msg"
    class="tooltip-btn w-8 h-8 border rounded-full"
  >
    ?
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true,
      default: 'null'
    }
  }
}
</script>

<style lang="scss" scoped>
  .tooltip-btn {
    color: $button-primary-color;
    border-color: $button-primary-color;
  }
</style>
