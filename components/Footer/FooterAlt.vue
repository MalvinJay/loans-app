<template>
  <footer class="mt-16">
    <div class="flex justify-between footer">
      <div class="flex justify-between flex-row-reverse">
        <div class="inline-flex">
          <a href="https://app.plendify.com" class="hover:underline" target="_blank">
            <div>
              <img src="@/assets/img/Powered by-purple version.png" class="w-32" alt="">
            </div>
          </a>
          <a href="https://nbssi.gov.gh" class="hover:underline" target="_blank">
            <div>
              <img src="@/assets/img/nkosuo.png" class="w-40 ml-4" alt="">
            </div>
          </a>
        </div>
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
