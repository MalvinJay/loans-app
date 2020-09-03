<template>
  <div class="signin">
    <div class="main">
      <div class="signin-container">
        <div class="body md:flex md:justify-center">
          <div class="left">
            <img src="@/assets/img/sign_in.png" alt="">
          </div>
          <div class="right">
            <div class="logo">
              <nuxt-link to="/">
                <img src="@/assets/img/logo.png" alt="" srcset="">
              </nuxt-link>
            </div>
            <div v-if="!pinSent" class="r-c">
              <div class="mb-3">
                <p class="text-3xl leading-10 md:text-xl py-4 md:p-0 mb-16 md:tracking-wider font-semibold">
                  Sign In with Phone Number
                </p>
              </div>
              <div>
                <p class="texl-sm md:text-base pb-4 md:p-0">
                  For security reasons, please enter your mobile number and we will send you a One Time Password
                </p>
              </div>
              <form @submit.prevent="getOTP">
                <div class="mb-5">
                  <input v-model="phone" type="text" placeholder="Phone Number">
                </div>
                <div>
                  <button class="button-small" type="submit">
                    <template v-if="loading">
                      <div class="login-spinner flex justify-center w-full">
                        <img src="@/assets/img/refresh.svg" class="w-6 h-full" alt="">
                      </div>
                    </template>
                    <template v-else>
                      CONTINUE
                    </template>
                  </button>
                </div>
              </form>
            </div>
            <div v-else class="r-c">
              <div class="mb-3">
                <p class="text-3xl leading-10 md:text-xl py-4 md:p-0 mb-16 md:tracking-wider font-semibold">
                  One Time Password
                </p>
              </div>
              <div>
                <p class="texl-sm md:text-base pb-4 md:p-0">
                  Please enter the password that was sent to your number
                </p>
              </div>
              <form @submit.prevent="login">
                <div class="mb-5">
                  <input v-model="OTP" type="password" class="text-xl" placeholder="OTP">
                </div>
                <div>
                  <button class="button-small" type="submit">
                    <template v-if="loading">
                      <div class="login-spinner flex justify-center w-full">
                        <img src="@/assets/img/refresh.svg" class="w-6 h-full" alt="">
                      </div>
                    </template>
                    <template v-else>
                      SIGN IN
                    </template>
                  </button>
                </div>
              </form>
              <div class="resend pt-4 text-lg cursor-pointer" @click="pinSent = false">
                Resend Password
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'homeLayout',
  data () {
    return {
      pinSent: false,
      loading: false,
      OTP: null,
      phone: '',
      image_url: '/icon.png',
      url: 'https://nbssi-post-deploy.wl.r.appspot.com/apply',
      title: 'Sign In',
      description: 'Already submitted a funding request? Sign in now to check your progress'
    }
  },
  mounted () {
    this.$auth.logout()
    this.$store.commit('local/SET_LOGOUT')
  },
  methods: {
    login () {
      this.loading = true
      const data = {
        phone_number: this.phone,
        otp: this.OTP
      }
      this.$store.dispatch('local/login', data)
        .then((res) => {
          this.$toasted.show('Login Success', {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 5000
          })
          this.$store.dispatch('loan/fetchLoanDetails')
            .finally(() => {
              if (this.$store.state.loan.loandetails.status === 'complete') {
                window.location = '/app/dashboard'
              } else {
                window.location = '/app/loanapplication'
              }
            })
        })
        .catch((error) => {
          // console.log('Error:', error)
          // this.$toasted.error(error)
          this.$toasted.error(error.error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    getOTP () {
      this.loading = true
      this.$store.dispatch('local/verifyOTP', this.phone)
        .then((res) => {
          // console.log('OTP Verification', res)
          // this.$toast.success(res.success)
          this.$toasted.show(res.success, {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 5000
          })
          this.pinSent = true
        })
        .catch((error) => {
          switch (error.response.data.status) {
            case 400:
              this.$toasted.error(error.response.data.error)
              break
            default:
              break
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'title', content: this.title },
        { hid: 'description', name: 'description', content: this.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.url },
        { property: 'og:title', content: this.title },
        { property: 'og:description', content: this.description },
        { property: 'og:image', content: this.image_url },
        { property: 'twitter:url', content: this.url },
        { property: 'twitter:title', content: this.title },
        { property: 'twitter:description', content: this.description },
        { property: 'twitter:image', content: this.image_url }

      ]
    }
  }
}
</script>
<style lang="scss" scoped>
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
.signin {
  background: linear-gradient(90deg, #0d247d 0%, #C49000 100%);
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: table;
}
.main {
  display: table-cell;
  vertical-align: middle;
}
.signin-container {
  margin: 0px auto;
  margin: 53px 73px;
}
.body {
  height: 100%;
}
.left {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 800px;
  justify-content: center;

  img {
    max-height: 600px;
    animation: 300ms ease-out 0s 1 slideInFromLeft;
  }
}
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-1%);
  }
  100% {
    transform: translateX(0%);
  }
}
.right {
  height: 1000px;
  background-color: $color-mild-pink;
  width: 700px;
  height: 800px;
}
.logo {
  img {
    margin: 6rem auto 0;
    max-width: 15rem;
    // height: 65px;
  }
}
.r-c {
  margin: 200px 88px 0 88px;
  text-align: center;
  input {
    background-color: transparent;
    margin-top: 40px;
  }
  button {
    width: 469px;
    background-color: $color-secondary;
    min-height: 45px;
    font-size: 16px;
  }
  .resend {
    color: $color-secondary-alt;
  }
}
.login-spinner {
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
@include for-tablet-portrait-only {
  .signin-container {
    margin: 20px;

    .body {
      display: flex;
      flex-direction: row;
      .left {
        width: 50%;
        height: auto;
      }
      .right {
        padding: 20px 0;
        height: auto;
        width: 50%;
        .logo {
          img {
            margin: 1rem auto 5rem;
          }
        }
        .r-c {
          margin: 50px 20px;

          form {
            button {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 900px) and (max-width: 1560px) {
.signin-container {
    margin: 50px;

    .body {
      display: flex;
      flex-direction: row;
      .left {
        width: 50%;
        height: auto;
      }
      .right {
        padding: 80px 0;
        height: auto;
        width: 50%;
        .logo {
          img {
            margin: 1rem auto 7rem;
          }
        }
        .r-c {
          margin: 100px 40px;

          form {
            width: 100%;
            div {
              width: 100%;
              button {
                width: 100%;
                max-width: 469px;
              }
            }
          }
        }
      }
    }
  }
}
@include for-phone-only {
  .signin {
    display: block;
    background: $white!important;
    .main {
      display: block;
      background-color: $color-mild-pink;
      .signin-container {
        margin: 0;
        .body {
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
          overflow-x: hidden;
          .left {
            position: relative;
            left: 0px;
            // top: -68px;
            width: 100%;
            // height: 381.39px;
            max-height: 40vh;
            background: url('../../../assets/img/sign_in.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            img {
              display: none;
            }
          }
          .right {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 60vh;
            padding: 20px 20px;
            background-color: $color-mild-pink;
            .logo {
              img {
                margin: 0 auto 18px;
                height: 30px;
              }
            }
            .r-c {
              margin: 0;
              form {
                padding-bottom: 10px;
              }
              p {
                line-height: 22px;
              }
              .button-small {
                width: 100%;
              }
              input {
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
