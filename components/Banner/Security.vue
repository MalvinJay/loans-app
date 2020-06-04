<template>
  <div class="py-32 px-5 main">
    <h1 class="text-center text-4xl mb-16 font-extrabold">
      Secure Access
    </h1>
    <div class="security flex justify-center text-center">
      <div class="s-l-s">
        <div class="img">
          <img src="@/assets/img/lock.png" alt="" srcset="">
        </div>
        <div>
          <p class="text-3xl font-extrabold">
            Security
          </p>
          <p>
            Your security is paramount to us. We have taken all necessary
            steps to ensure that all your data is encrypted. Mechanisms are
            all in place to prevent unauthorized access at any point in time
          </p>
        </div>
      </div>
      <div class="s-r-s ">
        <div class="img">
          <img src="@/assets/img/privacy.png" alt="" srcset="">
        </div>
        <div>
          <p class="text-3xl font-extrabold">
            Privacy
          </p>
          <p>
            We care about your privacy. All information that you provide is stored
            securely in our databases. We also have put in place controls to prevent
            your data from being accessed.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.main {
  height: 856px;
}
.security {
  column-gap: 10%;
  &>div {
    width: 500px;
  }
}
img {
  margin: 0 auto;
}
@include for-phone-only {
  .security {
    flex-direction: column;
    text-align: left;
    padding: 2rem;
    &>div {
      width: 100%;
      display: flex;
      column-gap: 2rem;
    }
    p {
      &:first-child {
        font-size: 1.5rem;
      }
    }
    .img {
      width: 50%;
      margin-top: 5px;
    }
  }
  .s-r-s {
    margin-top: 2.5rem;
  }
}
@include for-tablet-portrait-only {
  .img {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
