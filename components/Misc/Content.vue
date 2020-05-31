<template>
  <div>
    <slot />
    <div class="buttons flex gap-5">
      <button class="button-small" @click="moveNext">
        Next
      </button>
      <button class="button-small" @click="moveNext">
        Save
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [],
      count: 0
    }
  },
  mounted () {
    this.items = this.$children
  },
  methods: {
    moveNext () {
      if (this.count < this.items.length - 1) {
        this.count += 1
        this.$emit('current', this.count)
      }
      this.items.forEach((item, i) => {
        if (i === this.count) {
          item.show = true
        } else {
          item.show = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .buttons {
    button {
    width: 279px;
    &:last-child {
      border: 1px solid $color-primary;
      color: $color-primary;
      background-color: white;
    }
  }
}
</style>
