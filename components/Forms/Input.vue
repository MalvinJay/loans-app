<template>
  <div>
    <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">{{ name }}</label>
    <input
      v-if="visible && type==='number'"
      :type="type"
      :placeholder="placeholder"
      :class="{small: small, error:error, textRight:money }"
      :value="value"
      :disabled="disabled"
      @input="validateSend"
      @blur="onBlurNumber"
    >
    <!-- v-if="type!=='number'" -->
    <input
      v-else
      v-model="amount"
      type="text"
      :placeholder="placeholder"
      :class="{small: small, error:error, textRight:money }"
      :disabled="disabled"
      @input="validateSend"
      @focus="onFocusText"
    >
    <small v-if="error" class="text-sm text-red-700 block">{{ errorMessage }}</small>
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
    money: {
      type: Boolean,
      required: false,
      default: false
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    },
    disabled: {
      required: false,
      default: false,
      type: Boolean
    },
    regex: {
      required: false,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      error: false,
      amount: null,
      temp: null,
      visible: true,
      // regex: '([A-Z]{1})([0-9]{10})',
      errorMessage: ''
    }
  },
  methods: {
    // ([A-Z]{1})([0-9]{10})
    validateSend (e) {
      const val = e.target.value
      if (this.type === 'number') {
        if (!isNaN(parseFloat(val)) || val === '') {
          this.error = false
          this.$emit('input', val)
        } if (isNaN(parseFloat(val))) {
          this.errorMessage = 'please enter a valid number'
          this.error = true
        }
      } else if (this.type === 'text' && this.regex !== null && this.regex !== '') {
        const regex = RegExp(this.regex)
        if (regex.test(val)) {
          this.error = false
          this.$emit('input', val)
        } else {
          this.errorMessage = 'Invalid input '
          this.error = true
        }
      } else if (this.type === 'email') {
        // eslint-disable-next-line no-useless-escape
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/
        if (regex.test(val)) {
          this.error = false
          this.$emit('input', val)
        } else {
          this.errorMessage = 'Invalid email '
          this.error = true
        }
      } else {
        this.$emit('input', val)
      }
      // this.$emit('input', val)
    },
    onBlurNumber (e) {
      this.amount = this.thousandSeprator(e.target.value)
      this.visible = false
    },
    onFocusText () {
      this.visible = true
    },
    thousandSeprator (amount) {
      if (amount !== '' || amount !== undefined || amount !== 0 || amount !== '0' || amount !== null) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return amount
      }
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
  &.textRight {
    text-align: right;
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
