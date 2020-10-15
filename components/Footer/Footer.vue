<template>
  <div>
    <div class="banner flex justify-between py-8 px-10 md:p-16">
      <p class="text-3xl b-b">
        Are you ready to fund your business?
      </p>
      <div class="h-full flex flex-col justify-center">
        <!-- <a href="/">
          <input type="button" value="Apply Now" class="uppercase button-small mr-2" disabled>
        </a> -->
      </div>
    </div>
    <footer class="flex justify-between p-8 md:py-24 md:px-64">
      <div class="l-s h-t">
        <div class="logo mb-10">
          <img src="@/assets/img/logo.png" alt="" srcset="">
        </div>
        <p class="b-b text-sm">
          Recovery and Resilience Program <br>
          for MSMEs Against Impacts of Coronavirus.
        </p>
        <div class="icons flex justify mt-10">
          <a target="_blank" href="https://www.facebook.com/nbssighana/">
            <img src="@/assets/img/facebook.png" alt="" srcset="">
          </a>
          <a target="_blank" href="https://twitter.com/NBSSIGhana?s=09">
            <img src="@/assets/img/twitter.png" alt="" srcset="">
          </a>
          <a target="_blank" href="https://instagram.com/nbssighana?igshid=1lbc3e98woz2d">
            <img src="@/assets/img/instagram.png" alt="" srcset="">
          </a>
        </div>
      </div>
      <div class="r-s h-t">
        <div class="mb-10">
          <p class="text-sm font-bold b-b uppercase mb-10">
            Contact
          </p>
        </div>
        <p class="flex">
          <img src="@/assets/img/location.png" alt="" srcset=""> Visit the nearest NBSSI Business <br> Advisory Centre (BAC) across Ghana
        </p>
        <p class="flex">
          <img src="@/assets/img/smartphone.png" alt="" srcset=""> <a href="tel:0302747777">0302 747 777</a> <br>
        </p>
        <p class="flex">
          <img src="@/assets/img/timer.png" alt="" srcset=""> Mon - Sat: 8:00am - 5:00pm
        </p>
      </div>
    </footer>
    <div class="copyright flex flex-col sm:flex-row justify-between py-10 text-white px-10 gap-10">
      <div class="text-sm italic font-bold plendify py-4">
        <div class="inline-flex">
          <a href="https://app.plendify.com" class="hover:underline" target="_blank">
            <div>
              <img src="@/assets/img/Powered by-white version.png.png" class="w-32" alt="">
            </div>
          </a>
          <a href="https://nbssi.gov.gh" class="hover:underline" target="_blank">
            <div>
              <img src="@/assets/img/nkosuo.png" class="w-40 ml-4" alt="">
            </div>
          </a>
        </div>
      </div>
      <div class="flex items-center font-light py-4">
        &copy; National Board for Small Scale Industries. All rights reserved.
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.logo {
  img {
      max-width: 13rem;
      height: auto;
  }
}
footer {
  background-color: $color-gray;
  position: relative;
  height: 450px;
}
.m-s {
  margin: 0 10%;
}
.h-t {
  margin-bottom: 30px;
  margin-top: 40px;
}
ul {
  li {
    margin-right: 4rem;
  }
}
.banner {
  width: 68%;
  // margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  background-color: $color-mild-pink;
  margin-top: -75px;
  z-index: 99999;
}
.icons {
  img {
    margin-right: 10px;
    height: 20px;
  }
}
.r-s {
  img {
    height: 20px;
    margin-right: 1.125rem;
  }
  p {
    margin: 17px 0;
  }
}
.copyright {
  background-color: $color-secondary-alt;
  // p {
  //   &:first-child {
  //     margin-right: 40%;
  //   }
  // }
}

@include for-tablet-portrait-only {
  .banner {
    width: 100%;
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      margin-top: 2rem;
      margin-right: 0rem;
    }
  }
  footer {
    padding: 4rem 3rem;
    .copyright {
      p {
        font-size: 0.7rem;
      }
    }
  }
}

@include for-tablet-landscape-only {
  .banner {
    width: 90%;
  }
}
@include for-phone-only {
  .banner {
    width: 100%;
    height: 111px;
    p {
      font-size: 1.2rem;
    }
  }
  footer {
    height: 100%;
    flex-direction: column;
    // padding: 5rem;
    text-align: left;
    ul {
      justify-content: left;
      li {
        margin-right: 1rem;
      }
    }
    .m-s {
      margin: 0;
    }
  }
}

</style>
