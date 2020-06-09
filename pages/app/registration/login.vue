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
            <div v-if="pinSent" class="r-c">
              <div class="mb-3">
                <p class="text-xl mb-16">
                  Sign In with Phone Number
                </p>
              </div>
              <div>
                <p>For security reasons, please enter your mobile number and we will send you a One Time Password</p>
              </div>
              <div class="mb-5">
                <input type="text" placeholder="Phone Number">
              </div>
              <div>
                <button class="button-small">
                  CONTINUE
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
                <input type="password" placeholder="Phone Number">
              </div>
              <div>
                <button class="button-small">
                  SIGNIN
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
      pinSent: false
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
  }
}
</style>
