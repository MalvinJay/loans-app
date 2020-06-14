<template>
  <div class="accordion p-5 my-4">
    <div class="title font-semibold">
      Name of Message
    </div>
    <div class="body flex justify-between w-full mt-3 overflow-y-hidden" :class="{ show: active }">
      <div class="text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat laudantium pariatur quis nulla doloremque nostrum vitae rem voluptatibus itaque molestiae atque aperiam quas a, necessitatibus numquam. Deleniti rerum quos quasi!
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae maxime quibusdam nemo tempore unde sed, asperiores voluptatibus ullam mollitia eos eligendi aperiam dolore ex perspiciatis similique laudantium voluptates nobis recusandae.
      </div>
      <div class="inset-y-0 items-center text-gray-700 px-5" @click="active = !active">
        <svg class="fill-current h-4 w-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Accordion',
  data () {
    return {
      active: false
    }
  }
}
</script>
<style lang="scss" scoped>
.accordion {
  background-color: white;
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
