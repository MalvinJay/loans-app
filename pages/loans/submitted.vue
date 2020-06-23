<template>
  <div>
    <NavBar alt />
    <BaseCard
      :header="false"
      small
    >
      <div class="main text-center pt-24">
        <div class="check mb-5">
          <img src="@/assets/img/ellipse-check.png" alt="">
        </div>
        <div class="mt-10">
          <p class="text-4xl text-white">
            Your Application is on its way!
          </p>
        </div>
        <div class="mt-10">
          <p class="text-white text-2xl ">
            We will verify your documents and get back to you within 2 weeks
          </p>
        </div>
        <div class="mt-10">
          <img src="@/assets/img/doodle 4.png" alt="">
        </div>
      </div>
    </BaseCard>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar/NavBarDefault.vue'
import BaseCard from '@/components/Misc/ApplicationCard.vue'
export default {
  layout: 'homeLayout',
  components: {
    NavBar,
    BaseCard
  }
}
</script>
<style lang="scss" scoped>
.main {
  height: 732px;
  background: linear-gradient(90deg, #6A1B9A 0%, #9B51E0 100%);
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.15);
  img {
    margin: 0 auto;
  }
  .check {
    img {
      height: 100px;
    }
  }
}
@include for-phone-only {
  .main {
    img {
      max-width: 15rem;
    }
  }
  .check {
    img {
      height: 4rem !important;
    }
  }
}
</style>
