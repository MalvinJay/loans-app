<template>
  <div class="signin">
    <div class="main">
      <div class="signin-container">
        <div class="body flex justify-center">
          <div class="left">
            <img src="@/assets/img/signin-image.png" alt="">
          </div>
          <div class="right">
            <div class="logo">
              <img src="@/assets/img/logo.png" alt="" srcset="">
            </div>
            <div v-if="!pinSent" class="r-c">
              <div class="mb-3">
                <p class="text-xl mb-16">
                  Sign In with Phone Number
                </p>
              </div>
              <div>
                <p>For security reasons, please enter your mobile number and we will send you a One Time Password</p>
              </div>
              <div class="mb-5">
                <input v-model="phone" type="text" placeholder="Phone Number">
              </div>
              <div>
                <button class="button-small" @click="getOTP">
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
            </div>
            <div v-else class="r-c">
              <div class="mb-3">
                <p class="text-xl mb-16">
                  One Time Password
                </p>
              </div>
              <div>
                <p>Please enter the password that was sent to your number</p>
              </div>
              <div class="mb-5">
                <input v-model="OTP" type="password" class="text-xl" placeholder="OTP">
              </div>
              <div>
                <button class="button-small" @click="login">
                  <template v-if="loading">
                    <div class="login-spinner flex justify-center w-full">
                      <img src="@/assets/img/refresh.svg" class="w-6 h-full" alt="">
                    </div>
                  </template>
                  <template v-else>
                    SIGNIN
                  </template>
                </button>
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
      phone: null
    }
  },
  methods: {
    login () {
      this.loading = true
      const data = {
        phone_number: this.phone,
        otp: this.OTP
      }
      this.$store.dispatch('auth/login', data)
        .then((res) => {
          // console.log('OTP Verification', res)
          // this.$toast.success(res.success)
          this.$toasted.show('Login Success', {
            theme: 'outline',
            position: 'top-right',
            duration: 5000
          })
          // Perform extra checks to confirm validity of client before redirecting him/her
          this.$router.push('/app/dashboard')
        })
        .catch((error) => {
          // console.log('Error:', error.response.data.error)
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
    },
    getOTP () {
      this.loading = true
      this.$store.dispatch('auth/verifyOTP', this.phone)
        .then((res) => {
          // console.log('OTP Verification', res)
          // this.$toast.success(res.success)
          this.$toasted.show(res.success, {
            theme: 'outline',
            position: 'top-right',
            duration: 5000
          })
          this.pinSent = true
        })
        .catch((error) => {
          // this.$toasted.error('Phone Number is Incorrect')
          // this.$toasted.show('Phone Number is Incorrect', {
          //   theme: 'bubble',
          //   position: 'top-right',
          //   duration: 5000
          // })
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
  }
}
</script>
<style lang="scss" scoped>
.signin {
  background: linear-gradient(90deg, #5E1B9A 0%, #C49000 100%);
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
  // height: 80%;
  // background-color: honeydew;
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
}
.right {
  height: 1000px;
  background-color: $color-mild-pink;
  width: 700px;
  height: 800px;
}
.logo {
  img {
    margin: 32px auto;
    max-width: 15rem;
    height: 40px;
  }
}
.r-c {
  margin: 230px 88px 0 88px;
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
</style>
