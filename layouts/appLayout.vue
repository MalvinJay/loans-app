<template>
  <main>
    <div :class="{ 'overlay': side }">
      <div :class="[{ 'block': side }, 'sidebar', 'pt-32', 'pl-4']">
        <div class="close hidden" @click="toggleSide">
          <img src="@/assets/img/close-w.svg" class="w-6 h-6" alt="">
        </div>
        <div :class="[{hidden: status},'w-full h-full absolute top-0 left-0 bg-gray-100 bg-opacity-50 flex justify-center items-center']">
          <img src="@/assets/img/lock.png" class="lock w-10 mt-24" alt="">
        </div>
        <div :class="[{'opacity-50': !status},'links']">
          <ul>
            <li @click="toggleSide">
              <nuxt-link to="dashboard">
                <img src="@/assets/img/app-home.png" alt=""> Home
              </nuxt-link>
            </li>
            <li @click="toggleSide">
              <nuxt-link to="loandetails">
                <img src="@/assets/img/app-loan-details.png" alt=""> Loan Details
              </nuxt-link>
            </li>
            <li @click="toggleSide">
              <nuxt-link to="loanapplication">
                <img src="@/assets/img/app-docs.png" alt=""> Loan Application
              </nuxt-link>
            </li>
            <li @click="toggleSide">
              <nuxt-link to="messages">
                <img src="@/assets/img/app-messages.png" alt=""> Message
              </nuxt-link>
            </li>
            <li @click="toggleSide">
              <nuxt-link to="notifications">
                <img src="@/assets/img/app-notifications.svg" alt=""> Notifications
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top-bar flex justify-between">
        <div class="logo">
          <img src="@/assets/img/menu.png" alt="logo" @click="toggleSide">
          <img src="@/assets/img/logo.png" alt="">
        </div>
        <div class="r-s flex items-center">
          <div class="profile flex justify-center items-center">
            <span>Hi, <span class="font-bold">{{ Details.first_name }}</span></span>
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
import { mapGetters } from 'vuex'
export default {
  // middleware: 'auth',
  data () {
    return {
      side: false,
      links: [
        {
          name: 'Home',
          to: 'dashboard',
          img: '../assets/img/app-home.png'
        },
        {
          name: 'Loan Details',
          to: 'dashboard',
          img: '../assets/img/app-loan-details.png'
        },
        {
          name: 'Loan Applcation',
          to: 'dashboard',
          img: '../assets/img/app-docs.png'
        },
        {
          name: 'Message',
          to: 'dashboard',
          img: '../assets/img/app-messages.png'
        },
        {
          name: 'Notifications',
          to: 'dashboard',
          img: '../assets/img/app-notifications.svg'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      Details: 'applicant/applicantDetails',
      sState: 'applicant/applicantState',
      loanStatus: 'loan/loanStatus'
    }),
    state () {
      return this.sState === 'LOADING'
    },
    status () {
      return this.loanStatus === 'complete'
    }
  },
  mounted () {
    this.$store.dispatch('applicant/fetchApplicant')
    this.$store.dispatch('loan/fetchLoanDetails')
      .then((response) => {
        return response
      })
      .catch((error) => {
        this.$toasted.error(error.error)
        if (error.error.includes('Token')) {
          this.$router.push('/app/registration/login')
        }
        if (error.error.includes('unfinished')) {
          this.$router.push('/app/loanapplication')
        }
      })
    this.$store.dispatch('queries/fetchQueries')
    if (this.$store.state.loan.loandetails.status !== 'complete') {
      this.$router.push('/app/loanapplication')
    }
  },
  methods: {
    logout () {
      this.$store.commit('auth/SET_LOGOUT')
      this.$router.push('/app/registration/login')
    },
    toggleSide () {
      this.side = !this.side
    }
  }
}
</script>
<style lang="scss" scoped>
.lock {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(82deg) brightness(102%) contrast(103%);
}
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
        &.nuxt-link-active {
          font-weight: 500;
        }
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
    img {
      &:nth-child(1) {
        display: none;
      }
    }
  }
  .r-s {
    margin-right: 62px;
    .profile {
      background-color: transparent;
      color: $color-secondary;
      padding: 10px;
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
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 4px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: grey;
}
@include for-phone-only {
  .overlay {
    background-attachment: fixed;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
  }
  .sidebar {
    z-index: 1000;
    margin-left: -14rem;
    transition: transform 0.3s ease;
    padding-left: 16px;
    .links {
      ul {
        li {
          font-size: 12px;
          a {
            img {
              width: 20px;
            }
          }
        }
      }
    }
  }
  .block {
    transform: translateX(14rem);
    width: 20rem;
    z-index: 1000;
    .close {
      display: block;
      position: absolute;
      width: 14px;
      height: 14px;
      left: 21px;
      top: 7%;
    }
  }
  .right {
    width: 100%;
    margin-left: 0 !important;
    .top-bar {
      padding: 10px 20px;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      // position: absolute;
      .logo {
        display: flex;
        align-items: center;
        width: 100%;
        margin-left: 0;
        img {
          width: 100px;
          padding-left: 10px;
          &:nth-child(1) {
            padding: 0;
            display: block;
            height: 30px;
            width: auto;
          }
        }
      }
      .r-s, .r-s button, .r-s .profile {
        margin: 0 auto;

        .button-small {
          width: 80px;
          height: 30px;
          padding: 7px 18px;
          margin-left: 10px;
        }
      }
      .profile {
        display: flex;
      }
    }
    .content {
      margin-top: 70px;
    }
  }
}
</style>
