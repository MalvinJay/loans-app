<template>
  <footer class="mt-16">
    <div class="flex justify-between footer">
      <div class="flex justify-between flex-row-reverse">
        <p class="text-sm italic font-bold plendify">
          Powered by Plendify
        </p>
        <p class="font-normal text-sm flex mobile">
          <img src="@/assets/img/lock-alt.png" alt="" srcset=""> You are on a secure page
        </p>
      </div>
      <div>
        <p class="text-sm font-normal flex qs-tc">
          Questions? <img src="@/assets/img/smartphone.png" alt="" srcset=""> <span class="font-bold">Call us (030) 274 7777</span>
        </p>
      </div>
      <div class="desktop">
        <p class="font-normal text-sm flex">
          <img src="@/assets/img/lock-alt.png" alt="" srcset=""> You are on a secure page
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
    height: 20px;
  }
  .plendify {
    color: $color-secondary;
  }
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
