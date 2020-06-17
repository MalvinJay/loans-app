<template>
  <main>
    <div class="sidebar pt-32 pl-4">
      <div class="links">
        <ul>
          <li>
            <nuxt-link to="dashboard">
              <img src="@/assets/img/app-home.png" alt=""> Home
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="loandetails">
              <img src="@/assets/img/app-loan-details.png" alt=""> Loan Details
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="loanapplication">
              <img src="@/assets/img/app-docs.png" alt=""> Loan Applcation
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="messages">
              <img src="@/assets/img/app-messages.png" alt=""> Message
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="notifications">
              <img src="@/assets/img/app-notifications.svg" alt=""> Notifications
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="top-bar flex justify-between">
        <div class="logo">
          <img src="@/assets/img/logo.png" alt="">
        </div>
        <div class="r-s flex">
          <div class="profile">
            Ni
          </div>
          <button class="button-small" @click="logout">
            <nuxt-link to="registration/login">
              SIGN OUT
            </nuxt-link>
          </button>
        </div>
      </div>
      <div class="content">
        <nuxt />
      </div>
    </div>
  </main>
</template>
<script>
export default {
  middleware: 'auth',
  data () {
    return {
      data: null
    }
  },
  methods: {
    logout () {
      this.$store.commit('auth/SET_LOGOUT')
      this.$router.push('/app/registration/login')
    }
  }
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  // width: 100vw;
}
.sidebar {
  background-color: $color-secondary;
  height: 100vh;
  width: 13rem;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
}
.links {
  ul {
    li {
      padding-bottom: 2.0rem;
      a {
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
        // font-size: 0.8rem;
        color: $white;
        width: 100%;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 22px;
        img {
          margin-right: 14px;
          width: 30px;
          height: auto;
        }
      }
    }
  }
}
.right {
  width: calc(100% - 13rem);
  margin-left: 13rem;
}
.top-bar {
  background-color: $white;
  width: inherit;
  height: 100px;
  padding: 25px 0;
  position: fixed;
  top: 0;
  z-index: 100;
  .logo {
    margin-left: 73px;
    width: 10rem;
    height: auto;
  }
  .r-s {
    margin-right: 62px;
    .profile {
      border-radius: 9999px;
      background-color: transparent;
      color: $color-secondary;
      border: 1px solid $color-secondary;
      height: 40px;
      width: 40px;
      padding: 10px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 10px;
    }
    button {
      background-color: $color-secondary;
      height: 40px;
      margin: 10px;
    }
  }
}
.content {
  margin-top: 100px;
}
@include for-tablet-portrait-only {
  .sidebar {
    width: 0;
    display: none;
  }
  .right {
    margin-left: 0 !important;
  }
}
</style>
