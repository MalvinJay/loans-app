<template>
  <div>
    <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">
      {{ name }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      :class="{small: small}"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    small: {
      required: false,
      type: Boolean,
      default: false
    },
    type: {
      required: true,
      type: String,
      default: 'text'
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
input[type=text].small {
  width: 100%;
}
@include for-phone-only {
    input[type=text]{
    width: 100%;
  }
}
@include for-tablet-portrait-only {
    input[type=text]{
    width: 100%;
  }
}
@include for-tablet-landscape-only {
    input[type=text]{
    width: 100%;
  }
}
</style>
