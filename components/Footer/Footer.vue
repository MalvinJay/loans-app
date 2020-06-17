<template>
  <div>
    <div class="banner flex py-16 justify-between px-16">
      <p class="text-3xl b-b">
        Are you ready to fund your business?
      </p>
      <div class="h-full flex flex-col justify-center">
        <a href="/apply">
          <input type="button" value="Apply Now" class="uppercase button-small mr-2">
        </a>
      </div>
    </div>
    <footer class="flex py-24 justify-center">
      <div class="l-s h-t">
        <div class="logo mb-10">
          <img src="@/assets/img/logo.png" alt="" srcset="">
        </div>
        <p class="b-b text-sm">
          This is a blurb about the company <br>
          Lorem, ipsum dolor sit amet consectetur <br>
          adipisicing elit. Dolorem itaque, cupiditate <br>
        </p>
        <div class="icons flex justify mt-10">
          <img src="@/assets/img/facebook.png" alt="" srcset="">
          <img src="@/assets/img/twitter.png" alt="" srcset="">
          <img src="@/assets/img/instagram.png" alt="" srcset="">
        </div>
      </div>
      <div class="m-s h-t">
        <div class="r-s mb-10">
          <p class="text-sm b-b font-bold uppercase">
            Explore Links
          </p>
        </div>
        <ul class="text-sm b-b font-bold flex justify-center">
          <li><a href="">About</a></li>
          <li><a href="">Services</a></li>
          <li><a href="">FAQs</a></li>
        </ul>
      </div>
      <div class="r-s h-t">
        <div class="mb-10">
          <p class="text-sm font-bold b-b uppercase mb-10">
            Contact
          </p>
        </div>
        <p class="flex">
          <img src="@/assets/img/location.png" alt="" srcset=""> Lorem Ipsum dolor sit amet, <br>
          consectetur adipisicing elit ut
        </p>
        <p class="flex">
          <img src="@/assets/img/smartphone.png" alt="" srcset=""> (000) 100-100 <br>
        </p>
        <p class="flex">
          <img src="@/assets/img/mail.png" alt="" srcset=""> info@company.com
        </p>
        <p class="flex">
          <img src="@/assets/img/timer.png" alt="" srcset=""> Mon - Sat: 7:00am - 6:00pm
        </p>
      </div>
    </footer>
    <div class="copyright flex justify-center py-10 text-white">
      <p>Powered by Plendify</p>
      <p class="font-light">
        &copy; 2020 Company. <span class="font-bold">Privacy Policy</span> | <span class="font-bold">Terms & Conditions</span>
      </p>
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
  p {
    &:first-child {
      margin-right: 40%;
    }
  }
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
    padding: 5rem;
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
