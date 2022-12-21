<template>
  <nav class="navbar" :class="{ pink: alt}">
    <div class="uppercase nav nav-margin text-sm">
      <ul class="desktop-links">
        <li><a href="/eligibility-criteria">Eligibility Criteria</a></li>
        <li><a href="/faqs">Faq</a></li>
        <li><a href="/business-tips">Covid-19 business tips</a></li>
        <li><a href="/#about-the-programme">About the Programme</a></li>
      </ul>
      <div class="menu" @click="open=true">
        <img src="@/assets/img/menu.png" alt="logo">
      </div>
      <a href="/" class="logo mt-6 md:mt-8 flex rem-margin">
        <img src="@/assets/img/logo.png" alt="logo">
      </a>
      <p class="r-s uppercase logo-margin text-sm rem-margin">
        <a href="/apply" :class="{invisible: !redundant}"> <input type="button" value="Apply Now" class="uppercase button-small mr-2 cursor-pointer"></a>
        <a href="/app/registration/login"><span class="ml-2">Sign in</span></a>
      </p>
    </div>
    <div class="mobile-nav" :class="{open}">
      <div class="nav-mask">
        <nav v-scroll-lock="open" class="h-screen px-6 py-8 bg-white" :class="{open}">
          <div @click="open=false">
            <img src="@/assets/img/Close.png">
          </div>
          <div class="mt-8 uppercase">
            <ul>
              <li class="my-8">
                <a href="/">Home</a>
              </li>
              <li class="my-8">
                <a href="/eligibility-criteria">Eligibility Criteria</a>
              </li>
              <li class="my-8">
                <a href="/faqs">FAQ</a>
              </li>
              <li class="my-8">
                <a href="/business-tips">COVID-19 Business tips</a>
              </li>
              <li class="my-8">
                <a href="/#about-the-programme">About the Programme</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    token () {
      return this.$store.state.auth.loggedIn
    },
    redundant () {
      const current = this.$router.currentRoute.name
      if (current === 'apply') {
        return false
      } else if (current === 'loans-amount-form') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 100px;
  display: flex;
  flex-direction: column;
  &.pink {
    background-color: $color-mild-pink;
    height: 274px;
  }
}
.nav-mask {
  background-attachment: fixed;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  // height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.mobile-nav {
  display: none;
  nav {
    max-width: 0px;
    overflow: hidden;
    transition: max-width 0.5s;
    &.open {
      max-width: -webkit-max-content;
      max-width: -moz-max-content;
      max-width: max-content;
      transition: max-width 0.5s;
    };
  }
  &.open {
    display: block;
  }
}
.desktop-links {
    text-align: center;
  li {
    display: inline-block;
    margin: 0 1%;
  }
}
.logo {
  position: absolute;
  top: 0;
  left: 77px;
  img {
    max-width: 18rem;
    height: auto;
  }
}
.menu {
  display: none;
  img {
    width: 3rem;
    height: auto;
  }
  margin-left: 1rem;
}
.r-s {
  position: absolute;
  right: 77px;
  top: 0;
}
@media (min-width: 1200px) and (max-width: 1440px) {
  .logo {
    img {
      max-width: 13rem !important;
    }
  }
}
// @media (min-width: 901px) and (max-width: 1023px) {
//   .logo {
//     img {
//       max-width: 12rem !important;
//     }
//   }
// }
@include for-tablet-portrait-only {
  .desktop-links {
    display: none;
  }
  .logo {
    left: 5rem;
    margin-top: 42px;
    img {
      height: 30px;
    }
  }
  .r-s {
    margin-top: 2.5rem;
    right: 2rem;
  }
  .menu {
    display: block;
    margin-top: -.5rem;
  }
}
@include for-tablet-landscape-only {
  .desktop-links {
    font-size: .8rem;
  }
  .logo {
    left: 1.7rem;
    img {
      max-width: 10rem !important;
    }
  }
  .r-s {
    right: 1.7rem;
  }
}
@include for-phone-only {
  .navbar {
    height: 62px;
    .nav {
      margin-top: 0px;
    }
  }
  .desktop-links {
    display: none;
  }
  .logo {
    left: 4.5rem;
    height: auto;
    // margin-left: 3rem;
    img {
      height: 30px;
      // max-width: 8rem !important;
    }
  }
  .menu {
    display: block;
    margin-top: 1.5rem;
    width: 2rem;
  }
  .r-s {
    right: 1.5rem;
    line-height: 20px;
    input {
      height: 2rem;
      padding-top: 7px;
      display: none;
    }
  }
  .rem-margin {
    margin-top: 15px;
  }
}
@media (max-width: 320px) {
  .logo {
    img {
      height: 20px;
    }
  }
}
</style>
