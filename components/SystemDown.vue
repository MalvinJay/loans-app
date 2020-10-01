<template>
  <Modal v-if="show" :flex="true" :allow="true">
    <div class="flex flex-col relative">
      <div class="absolute right-0 top-0 px-4">
        <img src="@/assets/img/Close.png" class="w-6 cursor-pointer" @click="show = false">
      </div>
      <div class="flex justify-center items-center text-3xl text-center">
        <span class="font-bold">Sorry</span>
        <svg class="w-8 mr-4" viewBox="0 0 490 490" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path d="M244.709 389.496C263.445 389.496 279.041 375.141 280.619 356.47L304.978 65.543C306.396 48.67 300.675 31.99 289.222 19.532C277.783 7.09 261.629 0 244.709 0C227.789 0 211.635 7.09 200.195 19.532C188.74 31.99 183.022 48.67 184.44 65.543L208.799 356.47C210.377 375.141 225.973 389.496 244.709 389.496Z" fill="black" />
            <path d="M244.709 410.908C223.025 410.908 205.453 428.479 205.453 450.164C205.453 471.847 223.025 489.418 244.709 489.418C266.393 489.418 283.965 471.847 283.965 450.164C283.965 428.479 266.393 410.908 244.709 410.908Z" fill="black" />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="489.418" height="489.418" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="flex flex-col pt-4 text-sm">
        <p>
          Sorry for any inconvenience caused.
        </p>
        <p>
          We are experiencing an issue with one of our technology partners.
        </p>
        <p>
          Please Try again a few hours from now.
        </p>
        <p>Thank you for your patience.</p>
      </div>
    </div>
  </Modal>
</template>
<script>
import Modal from '@/components/Misc/Modal.vue'
export default {
  components: {
    Modal
  },
  props: {
    close: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
