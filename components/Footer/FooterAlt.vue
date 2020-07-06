<template>
  <footer class="mt-16">
    <div class="flex justify-between footer">
      <div class="flex justify-between flex-row-reverse">
        <p class="text-sm italic font-bold plendify">
          <a href="https://plendifyloans.com/our-why#scroll" target="_blank" class="hover:underline">
            <!-- Powered by Plendify -->
            <img src="@/assets/img/Powered by-purple version.png" class="w-32" alt="">
          </a>
        </p>
        <p class="font-normal text-sm flex mobile">
          <img src="@/assets/img/lock-alt.png" class="h-5" alt="" srcset=""> You are on a secure page
        </p>
      </div>
      <div class="py-4">
        <p class="text-sm font-normal flex qs-tc">
          Questions? <img src="@/assets/img/smartphone.png" class="h-5" alt="" srcset=""> <span class="font-bold">Call us (030) 274 7777</span>
        </p>
      </div>
      <div class="desktop py-4">
        <p class="font-normal text-sm flex">
          <img src="@/assets/img/lock-alt.png" class="h-5" alt="" srcset=""> You are on a secure page
        </p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
footer {
  padding: 1.7rem 5%;
  img {
    margin: 0 5px;
    // height: 20px;
  }
  .plendify {
    color: $color-secondary;
  }
}
.h-5 {
  height: 20px!important;
}
.mobile {
  display: none;
}
@include for-phone-only {
  footer {
    &>div {
      flex-direction: column-reverse;
    }
  }
  .mobile {
    display: flex;
  }
  .desktop {
    display: none;
    text-align: center;
  }
  .qs-tc {
    justify-content: center;
    margin-bottom: 2rem;
  }
}
</style>
