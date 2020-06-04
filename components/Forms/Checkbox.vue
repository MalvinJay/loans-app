<template>
  <label class="container"><slot />
    <input v-model="checked" type="checkbox" :value="val" @change="onChange">
    <span class="checkmark" />
  </label>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'val'],
  data () {
    return {
      checkedProxy: false
    }
  },
  computed: {
    checked: {
      get () {
        return this.value
      },
      set (val) {
        this.checkedProxy = val
      }
    }
  },
  methods: {
    onChange (e) {
      this.$emit('input', this.checkedProxy)
    }
  }
}
</script>
<style lang="scss" scoped>
 /* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 2rem;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100px;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.4rem;
  width: 1.4rem;
  border: 0.5px solid $color-black;
  border-radius: 5px;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 3px;
  width: 8px;
  height: 13px;
  border: solid $color-black;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
@include for-tablet-portrait-only {
  .container {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    font-size: 0.8rem;
  }
}
</style>
