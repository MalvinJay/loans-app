<template>
  <div>
    <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">{{ name }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :class="{small: small, error:error }"
      :value="value"
      :disabled="disabled"
      @input="validateSend"
    >
    <small v-if="error" class="text-sm text-red-700 block">please enter a valid number</small>
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
    },
    disabled: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      error: false
    }
  },
  methods: {
    // ([A-Z]{1})([0-9]{10})
    validateSend (e) {
      const val = e.target.value
      if (this.type === 'number') {
        if (!isNaN(parseFloat(val)) || val === '') {
          this.error = false
          this.$emit('input', parseFloat(val))
        } if (isNaN(parseFloat(val))) {
          this.error = true
        }
      }
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss" scoped>
input {
  border-color: $color-black;
  &.small {
    width: 100%;
  }
  &.error {
    border-color: red !important;
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
@include for-phone-only {
  input{
    width: 100%;
  }
}
@include for-tablet-portrait-only {
  input {
    width: 100%;
  }
}
@include for-tablet-landscape-only {
  input {
    width: 100%;
  }
}
</style>
