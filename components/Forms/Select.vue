<template>
  <div
    class="flex relative w-64 container"
    :class="{small: small}"
  >
    <select @change="selected">
      <option disabled value="" selected="true">
        {{ first }}
      </option>
      <option v-for="(item , i) in items" :key="i" :value="item.val">
        {{ item.name }}
      </option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    first: {
      type: String,
      required: false,
      default: 'Select one'
    },
    small: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  methods: {
    selected (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 469px;
    &.small {
    width: 100%;
    select {
      width: 100%;
    }
  }
}
select {
  padding-left: 1rem;
  height: 50px;
  border-radius: $button-border-radius;
  border: 1px solid $color-gray-alt;
  // padding: 17px;
  width: 469px;
  background-color: $white;
  -moz-appearance: none;
  -webkit-appearance:none;
  &:focus {
    outline: none;
  }
}
@include for-phone-only {
  .container {
    width: 100%;
    select {
      width: 100%;
    }
  }
}
@include for-tablet-portrait-only {
  .container {
    width: 100%;
    select {
      width: 100%;
    }
  }
}
@include for-tablet-landscape-only {
  .container {
    width: 100%;
    select {
      width: 100%;
    }
  }
}
</style>
