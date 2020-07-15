<template>
  <div>
    <template v-if="tooltip">
      <div class="flex">
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">{{ name }} <span v-if="required" class="text-red-600">*</span> </label>
        <div
          v-tooltip="tooltip"
          class="ml-4 tooltip-btn flex items-center justify-center"
        >
          ?
        </div>
      </div>
    </template>
    <template v-else>
      <label class="block text-gray-700 text-sm font-normal mb-2 font-bold">{{ name }} <span v-if="required" class="text-red-600">*</span> </label>
    </template>
    <div v-if="type === 'number'">
      <input
        v-if="visible && type==='number'"
        :type="type"
        :placeholder="placeholder"
        :class="{small: small, error:error, textRight:money, grey:grey }"
        :value="value"
        :disabled="disabled || grey"
        lang="en"
        max="1000000000"
        @input="validateSend"
        @blur="onBlurNumber"
      >
      <!-- v-if="type!=='number'" -->
      <input
        v-else
        v-model="amount"
        type="text"
        :placeholder="placeholder"
        :class="{small: small, error:error, textRight:money, grey:grey }"
        :disabled="disabled || grey"
        @input="validateSend"
        @focus="onFocusText"
      >
    </div>
    <input
      v-else
      :type="type"
      :placeholder="placeholder"
      :class="{small: small, error:error, textRight:money, grey:grey }"
      :value="value"
      :disabled="grey || disabled"
      @input="validateSend"
      @blur="checkOptional"
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
    },
    optional: {
      required: false,
      default: false,
      type: Boolean
    },
    grey: {
      required: false,
      default: false,
      type: Boolean
    },
    required: {
      required: false,
      type: Boolean,
      default: false
    },
    tooltip: {
      required: false,
      type: String,
      default: null
    }
  },
  data () {
    return {
      error: false,
      amount: null,
      temp: '',
      visible: true,
      errorMessage: ''
    }
  },
  methods: {
    validateSend (e) {
      const val = e.target.value
      this.temp = val
      if (this.type === 'number') {
        if (!isNaN(parseFloat(val)) || val === '') {
          this.error = false
          this.$emit('input', val)
        } if (isNaN(parseFloat(val))) {
          this.errorMessage = 'please enter a valid number'
          this.error = true
        } if (parseFloat(val) > 1000000000) {
          this.errorMessage = 'Number too big'
          this.error = true
        }
      } else if (this.type === 'text' && this.regex !== '' && val !== '') {
        const regex = RegExp(this.regex)
        if (regex.test(val)) {
          this.error = false
          this.$emit('input', val)
        } else {
          // this.$emit('input', null)
          this.errorMessage = 'Invalid input '
          this.error = true
          this.$emit('input', val)
        }
      } else if (this.type === 'text' && this.regex === '') {
        const regex = RegExp(this.regex)
        if (regex.test(val)) {
          this.error = false
          this.errorMessage = null
          this.$emit('input', val)
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
          this.$emit('input', val)
        }
      } else {
        this.$emit('input', val)
      }
      // this.$emit('input', val)
    },
    onBlurNumber (e) {
      if (this.type === 'number') {
        this.amount = this.thousandSeprator(e.target.value)
        this.visible = false
      }
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
    },
    checkOptional () {
      if (this.optional === true && this.temp === '') {
        this.error = false
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
  &.grey {
    background-color: $color-gray-alt;
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
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: #C49000;
    color: white;
    border-radius: 5px;
    padding: 10px;
    max-width: 300px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #C49000;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 10px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 10px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 10px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 10px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: #C49000;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(#C49000, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
