<template>
  <div class="navbar" :class="{ pink: alt}">
    <div class="uppercase nav nav-margin text-sm">
      <ul>
        <li><a href="">Eligibility Criteria</a></li>
        <li><a href="">Faq</a></li>
        <li><a href="">Covid-19 business tips</a></li>
        <li><a href="">About the Programme</a></li>
      </ul>
      <a href="/" class="logo logo-margin flex rem-margin">
        <img src="@/assets/img/menu.png" alt="logo">
        <img src="@/assets/img/logo.png" alt="logo">
      </a>
      <p class="r-s uppercase logo-margin text-sm rem-margin">
        <a href="/apply"> <input type="button" value="Apply Now" class="uppercase button-small mr-2"></a>
        <span>Sign in</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    alt: {
      type: Boolean,
      required: false,
      default: false
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
ul {
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
    &:first-child {
      display: none;
    }
    &:last-child {
      max-width: 13rem;
      height: auto;
    }
  }
}
.r-s {
  position: absolute;
  right: 77px;
  top: 0;
}
@include for-tablet-portrait-only {
  ul {
    display: none;
  }
  .logo {
    left: 2rem;
    img {
      &:first-child {
        display: block;
      }
    }
  }
}
@include for-phone-only {
  .navbar {
    height: 62px;
    .nav {
      margin-top: 0px;
    }
  }
  ul {
    display: none;
  }
  .logo {
    left: 1.5rem;
    img {
      height: 2rem;
      &:first-child {
        display: block;
        width: 2rem;
        height: 2rem;
        margin-right: 1rem;
      }
    }
  }
  .r-s {
    right: 1.5rem;
    input {
      height: 2rem;
      padding-top: 7px;
    }
  }
  .rem-margin {
    margin-top: 20px;
  }
}
</style>
