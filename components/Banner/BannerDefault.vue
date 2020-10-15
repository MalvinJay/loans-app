<template>
  <div class="banner flex justify-evenly relative">
    <div class="l-s pt-20">
      <div class="text-center text-5xl text-white absolute inset-x-0 top-i">
        <!-- Application Ended -->
      </div>
      <div>
        <p class="text-white">
          Complete your COVID-19
          Emergency Relief Funding Application
        </p>
        <p class="text-white">
          Welcome to the Mastercard Foundation and National Board for
          Small Scale Industries (NBSSI) application portal.
          Thank you for visiting
        </p>
      </div>
      <div class="mt-12">
        <!-- <a href="/">
          <button class="button-medium" disabled>
            Apply Now
          </button>
        </a> -->
      </div>
    </div>
    <div class="r-s flex justify-center items-center">
      <img src="@/assets/img/1_2.png" class="w-10/12" alt srcset>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: true
    }
  }
}
</script>
<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.top-i {
  top: 1rem
}
.text-sm {
  font-size: 1rem!important;
}
.banner {
  padding: 5% 0;
  padding-left: 7%;
  height: 800px;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgb(13, 36, 125) 0%,
    rgb(13, 35, 125) 0%,
    rgba(196, 144, 0, 1) 100%
  );
  p {
    &:first-child {
      font-size: 2.625rem;
    }
    font-size: 1.25rem;
    margin-top: 25px;
  }
}
.r-s {
  position: relative;
  width: 60%;
}
@include for-desktop-up {
  .l-s {
    width: 40%;
  }
  .r-s {
    width: 50%;
  }
}
@include for-tablet-landscape-only {
  .l-s {
    width: 50%;
  }
}
@include for-tablet-portrait-only {
  .banner {
    height: 578px;
    padding: 100px 0 108px 10px;
    box-sizing: border-box;
      p {
      &:first-child {
        padding-top: 0;
        font-size: 2rem;
        font-weight: bold;
      }
      &:last-child {
        font-size: 1.1rem;
      }
    }
      .r-s {
        width: 50%;
      }
    .l-s {
      padding-top: 0;
      width: 50%;
    }
  }
  img {
    width: 432px;
  }
}
@include for-phone-only {
  .banner {
    height: 100%;
    padding: 0 2rem 2rem 2rem;
      div {
        &:first-child {
          padding-top: 0;
        }
      }
      p {
      &:first-child {
        font-size: 1.5625rem;
        font-weight: bold;
      }
      &:last-child {
        font-size: 1.14rem;
      }
    }
  }
  .r-s {
    display: none;
  }
  .l-s {
    width: 100%;
  }
  .button-medium {
    height: 2.35rem;
    width: 8.21rem;
  }
}
</style>
