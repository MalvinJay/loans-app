<template>
  <div class="accordion pl-4 md:pl-16 md:px-10 py-6 my-4">
    <div class="flex justify-between cursor-pointer" @click="active = !active">
      <div class="flex items-center">
        <div class="indicator status mr-4"></div>
        <div class="title text-xl">
          <span class="capitalize">
            {{ head }} - {{ id_prop }}
          </span>
        </div>
      </div>
      <div class="icon inset-y-0 items-center text-gray-700 px-5" :class="{active: active}">
        <svg class="fill-current h-4 w-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
    <div class="body w-full mt-3 overflow-y" :class="{ hidden: active }">
      <div class="text">
        {{body}}
      </div>
    </div>
    <!-- <div class="title font-semibold">
      <span class="capitalize">
        {{ head }}
      </span>
    </div>
    <div class="body flex justify-between w-full mt-3 overflow-y-hidden" :class="{ show: active }">
      <div class="text">
        {{body}}
      </div>
      <div class="inset-y-0 items-center text-gray-700 px-5" @click="active = !active">
        <svg class="fill-current h-4 w-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'Accordion',
  props: ['body', 'head', 'id_prop'],
  data () {
    return {
      active: true
    }
  }
}
</script>
<style lang="scss" scoped>
.accordion {
  background-color: white;
  border-radius: 5px;
  position: relative;
  .indicator {
    // position: absolute;
    width: 12px;
    height: 12px;
    background: #6A1B9A;
    border-radius: 100%;
    // left: 18px;
    // top: 32px;
}
  .body {
    height: 1.2rem;
    width: 100%;
    &.show {
      height: auto;
      transition: height 0.5s;
    }
  }
}
</style>
