<template>
  <div class="accordion p-5 my-4">
    <div class="flex justify-between">
      <div class="title text-xl">
        Who is eligible to apply for funding
      </div>
      <div class="icon inset-y-0 items-center text-gray-700 px-5" :class="{active: active}" @click="active = !active">
        <svg class="fill-current h-4 w-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
    <div class="body w-full mt-3 overflow-y-hidden" :class="{ show: active }">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat laudantium pariatur quis nulla doloremque nostrum vitae rem voluptatibus itaque molestiae atque aperiam quas a, necessitatibus numquam. Deleniti rerum quos quasi!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae maxime quibusdam nemo tempore unde sed, asperiores voluptatibus ullam mollitia eos eligendi aperiam dolore ex perspiciatis similique laudantium voluptates nobis recusandae.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, nihil velit. Nemo nihil laboriosam blanditiis laborum esse distinctio. Dolorum quis nam laudantium enim nulla ratione iure dolor libero consectetur adipisci!
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem illum magnam excepturi consequatur quod enim reiciendis, at pariatur provident, in, odit velit eum accusamus veniam perferendis recusandae officiis hic error.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, enim sapiente. Nisi aspernatur quaerat id dolor odit qui earum quo suscipit cum adipisci deleniti sunt illo, tempore pariatur placeat maiores!
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
    max-height: 0;
    transition: max-height 0.15s ease-out;
    overflow: hidden;
    width: 100%;
    &.show {
    max-height: 10000px;
    transition: max-height 0.5s ease-in;
    }
  }
  .icon {
    transform: rotate(0deg);
    transition: transform .5s;
    &.active {
      transform: rotate(180deg);
    }
  }
}
</style>
