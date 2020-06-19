<template>
  <div :class="[{'hidden': show}, 'loading']">
    <img src="@/assets/img/loading.svg" class="w-10 md:w-12 h-full" alt="">
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      value: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.hidden {
  display: none!important;
}
.loading {
  position: fixed;
  z-index: 999;
  background-color: hsla(0,0%,100%,.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 13rem;
  transition: opacity .3s;
  display: flex;
  justify-content: center;
  img {
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
@include for-phone-only {
.loading {
  left: 0!important;
  top: 70px!important;
}
}
</style>
