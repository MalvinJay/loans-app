<template>
  <div class="card shadow-md" :class="{ small: small}">
    <div v-if="header" class="header px-12 md:px-24 py-8 text-white text-4xl">
      <p>{{ name }}</p>
    </div>
    <div class="body bg-white">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: 'Pre-Application'
    },
    header: {
      type: Boolean,
      required: false,
      default: true
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  max-width: 90%;
  margin: -174px auto 0 auto;
  .header {
    height: 111px;
    background-color: $color-secondary-alt;
  }
  &.small {
    width: 70%;
  }
}
@include for-phone-only {
  .card {
    &.small {
      width: 90%;
    }
  }
}
@include for-tablet-portrait-only {
  .card {
    &.small {
      width: 90%;
    }
  }
}
</style>
