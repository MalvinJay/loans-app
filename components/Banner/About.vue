<template>
  <div class="about relative">
    <p class="text-center mt-24 mb-20 text-4xl font-extrabold">
      How It Works
    </p>
    <div class="t-s flex justify-center mx-40">
      <div class="l-s mobile-order-2">
        <p class="text-5xl text-gray-500 font-extrabold mb-3">
          01
        </p>
        <p class="font-extrabold text-2xl mb-6">
          Complete Application Form
        </p>
        <p>
          We have built a seamless and simple funding application<br>
          process for you. Ensure that you have all relevant <br>
          information handy so you can sail through the application<br>
        </p>
      </div>
      <div class="r-s mobile-order-1">
        <img src="@/assets/img/doodle 1.png" alt="">
      </div>
    </div>
    <div class="m-s flex justify-center mx-40 my-48">
      <div class="l-s">
        <img src="@/assets/img/doodle 2.png" alt="">
      </div>
      <div class="r-s">
        <p class="text-5xl text-gray-500 font-extrabold mb-3">
          02
        </p>
        <p class="font-extrabold text-2xl mb-6">
          Application Review
        </p>
        <p>
          Upon completion of your funding application, you will<br>
          be shown a Review Page. Thoroughly review all your <br>
          inputted information before hitting submit. This will <br>
          enable us to serve you as quickly as possible
        </p>
      </div>
    </div>
    <div class="b-s flex justify-center mx-40">
      <div class="l-s mobile-order-2">
        <p class="text-5xl text-gray-500 font-extrabold mb-3">
          03
        </p>
        <p class="font-extrabold text-2xl mb-6">
          Receive Funds
        </p>
        <p>
          Upon submission, our team will review your application.<br>
          Once everything is satisfactory, you can expect to receive <br>
          your funds in the mobile wallet or bank account you selected <br>
          within 2 weeks. Sit tight while we work for you.
        </p>
      </div>
      <div class="r-s mobile-order-1">
        <img src="@/assets/img/doodle 3.png" alt="">
      </div>
    </div>
    <div class="vecs">
      <div>
        <img src="@/assets/img/vector 1.png" alt="">
      </div>
      <div>
        <img src="@/assets/img/vector 2.png" alt="">
      </div>
      <div>
        <img src="@/assets/img/vector 3.png" alt="">
      </div>
      <div>
        <img src="@/assets/img/vector 4.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.t-s, .b-s {
  img {
    max-width: 100%;
    height: auto;
  }
  .l-s{
    margin-right: 17%;
    p {
      &:nth-child(2) {
        color: $color-secondary;
      }
    }
  }
}
.m-s {
  .l-s{
    margin-right: 17%;
  }
  .r-s {
    p {
      &:nth-child(2) {
        color: $color-secondary;
      }
    }
  }
}
.b-s {
  margin-bottom: 10rem;
}
.vecs {
  div {
    position: absolute;
    &:first-child {
      top: 10rem;
    }
    &:nth-child(2) {
      top: 30rem;
      right: 0;
    }
    &:nth-child(3) {
      bottom: 30rem;
    }
    &:last-child {
      right: 0;
      bottom: 10rem;
    }
  }
}
@include for-tablet-portrait-only {
  .t-s, .b-s, .m-s {
    margin-right: 4rem;
    margin-left: 4rem;
  }
}
@include for-phone-only {
  .t-s, .b-s, .m-s {
    margin-right: 2rem;
    margin-left: 2rem;
    &.flex {
      flex-direction: column;
    }
    img {
      width: 219.06px;
      height: 159px;
      margin: 0 auto;
    }
  }
  .m-s {
    .l-s{
      margin-right: 0;
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
  }
  .t-s, .b-s {
    .l-s{
      margin-right: 0;
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
  }
.vecs {
    div {
      &:nth-child(3) {
      bottom: 40rem;
      }
      &:nth-child(2) {
      top: 40rem;
      }
    }
  }
}
</style>
