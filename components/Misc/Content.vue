<template>
  <div>
    <slot />
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [],
      count: 0,
      confirmModal: false,
      signature: null,
      liquidation: null,
      crime: null
    }
  },
  computed: {
    currentTab () {
      return this.$store.state.pages.currentTab
    }
  },
  watch: {
    currentTab (value) {
      // alert(this.$store.state.pages.formErrors)
      this.items.forEach((item, i) => {
        if (i === this.currentTab) {
          // show page is page index equals count
          item.show = true
        } else {
          // hide page if page index is less than count
          item.show = false
        }
      })
      // pass current tab number to parent
      this.$emit('current', value)
      // set current tab number in store
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', value)
    }
  },
  beforeCreate () {
    // get all dropdowns
    this.$store.dispatch('pages/getDropDowns')
  },
  mounted () {
    this.items = this.$children
  }
}
</script>
<style lang="scss" scoped>
.nav-buttons {
  button {
    width: 279px;
    height: 50px;
    margin: 10px;
    &.previous {
      border: 1px solid $color-primary;
      color: $color-primary;
      background-color: white;
    }
    &:first-child {
      margin-bottom: 10px;
    }
  }
  &.c-b {
    width: 40%;
    margin: 0 auto;
    button {
      width: 100%;
    }
  }
}
.sig {
  width: 20%;
  margin: 3rem auto;
  text-align: center;
}
@include for-phone-only {
  .sig {
    width: 100%;
  }
}
@include for-tablet-landscape-up {
  .save {
    margin-left: rem;
  }
}
</style>
