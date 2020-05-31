<template>
  <div class="py-32 eligibility px-5">
    <h1 class="text-center text-4xl text-white mb-16 font-extrabold">
      Am I Eligible?
    </h1>
    <div class="descr flex justify-center">
      <div class="l-t flex">
        <img src="@/assets/img/ellipse-check.png" alt="">
        <div class="t-s text-white">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br>
            Reprehenderit nulla impedit distinctio in fugiat! Reprehenderit <br>
            minima, modi omnis, provident sint repellendus maxime neque <br>
            cupiditate atque natus sapiente sunt ea ex.
          </p>
        </div>
      </div>
      <div class="r-t flex">
        <img src="@/assets/img/ellipse-check.png" alt="">
        <div class="t-s text-white">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br>
            Reprehenderit nulla impedit distinctio in fugiat! Reprehenderit <br>
            minima, modi omnis, provident sint repellendus maxime neque <br>
            cupiditate atque natus sapiente sunt ea ex.
          </p>
        </div>
      </div>
    </div>
    <div class="descr flex justify-center mt-16">
      <div class="l-b flex">
        <img src="@/assets/img/ellipse-check.png" alt="">
        <div class="t-s text-white">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br>
            Reprehenderit nulla impedit distinctio in fugiat! Reprehenderit <br>
            minima, modi omnis, provident sint repellendus maxime neque <br>
            cupiditate atque natus sapiente sunt ea ex.
          </p>
        </div>
      </div>
      <div class="r-b flex">
        <img src="@/assets/img/ellipse-check.png" alt="">
        <div class="t-s text-white">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br>
            Reprehenderit nulla impedit distinctio in fugiat! Reprehenderit <br>
            minima, modi omnis, provident sint repellendus maxime neque <br>
            cupiditate atque natus sapiente sunt ea ex.
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
.eligibility {
  background: linear-gradient(90deg, #6A1B9A 0%, #9B51E0 100%);
  height: 700px;
}
.descr {
  width: 100%;
  column-gap: 10%;
  img {
    height: 52px;
    margin-right: 58px;
  }
}
@include for-phone-only {
  .eligibility {
    padding: 2.54rem;
    height: auto;
  }
  .descr {
    flex-direction: column;
    &>div {
      flex-direction: column;
      img {
        height: 52px;
        width: 52px;
        margin: 45px 0 16px 0;
      }
    }
  }
  .descr.mt-16 {
    margin-top: 0px;
  }
}
</style>
