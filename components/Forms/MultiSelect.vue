<template>
  <div>
    <div class="flex relative w-64 container" @click="showDropdown=true">
      <div class="select flex flex-col justify-center">
        Select all that's applicable
      </div>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
    <div class="relative dropdown-container">
      <!-- hello -->
      <div v-if="showDropdown" v-click-outside="toggleDropdown" class="dropdown">
        <div v-for="(item, i) in list" :key="i">
          <input
            :id="item.name"
            v-model="selected"
            type="checkbox"
            :value="item.val"
            @change="addValue"
          >
          <label for="person">{{ item.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    list: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      selected: [],
      showDropdown: false
    }
  },
  methods: {
    addValue (e) {
      // this.selected.push(e.target.value)
      this.$emit('selected', this.selected)
    },
    toggleDropdown () {
      this.showDropdown = !this.showDropdown
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 469px;
}
.select {
  height: 50px;
  border-radius: $button-border-radius;
  border: 1px solid $color-gray-alt;
  padding-left: 1rem;
  // padding: 17px;
  width: 469px;
  background-color: $white;
  -moz-appearance: none;
  -webkit-appearance:none;
  &:focus {
    outline: none;
  }
}
.dropdown {
  border: 1px solid $color-black;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  margin-top: 10px;
  height: 100%;
  bottom: 0;
  background-color: white;
  top: 0;
  padding: 10px;
  border-radius: 6px;
}
.dropdown-container {
  position: absolute;
  z-index: 999;
  background: white;
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
