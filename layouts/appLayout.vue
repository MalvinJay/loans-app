<template>
  <main>
    <div class="sidebar pt-32 px-2">
      <div class="links">
        <ul>
          <li>
            <a>
              <nuxt-link to="dashboard">
                <img src="@/assets/img/app-home.png" alt=""> Overview
              </nuxt-link>
            </a>
          </li>
          <li>
            <a>
              <nuxt-link to="loandetails">
                <img src="@/assets/img/app-loan-details.png" alt=""> Loan Details
              </nuxt-link>
            </a>
          </li>
          <li>
            <a>
              <nuxt-link to="">
                <img src="@/assets/img/app-docs.png" alt=""> Current Applcations
              </nuxt-link>
            </a>
          </li>
          <li>
            <a>
              <nuxt-link to="">
                <img src="@/assets/img/app-return.png" alt=""> Previous Applcations
              </nuxt-link>
            </a>
          </li>
          <li>
            <a>
              <nuxt-link to="messages">
                <img src="@/assets/img/app-messages.png" alt=""> Message
              </nuxt-link>
            </a>
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
          <button class="button-small">
            SIGN OUT
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

}
</script>
<style lang="scss" scoped>
main {
  display: flex;
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
      a {
        display: flex;
        font-size: 0.8rem;
        color: $white;
        margin-bottom: 1rem;
        img {
          margin-right: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
.right {
  width: 100%;
  margin-left: 13rem;
}
.top-bar {
  background-color: $white;
  width: 100%;
  height: 100px;
  padding: 25px 0;
  position: fixed;
  top: 0;
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
