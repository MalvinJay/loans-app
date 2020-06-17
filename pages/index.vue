<template>
  <div>
    <NavBarDefault />
    <Banner />
    <Counter />
    <About />
    <div id="about-the-programme">
      <Info />
    </div>
    <SecurityBanner />
    <Footer />
  </div>
</template>
<script>
import Banner from '@/components/Banner/BannerDefault.vue'
import NavBarDefault from '@/components/NavBar/NavBarDefault.vue'
import Counter from '@/components/Banner/Counter.vue'
import About from '@/components/Banner/About.vue'
import SecurityBanner from '@/components/Banner/Security.vue'
import Info from '@/components/Misc/Eligibility.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  layout: 'homeLayout',
  components: {
    NavBarDefault,
    Banner,
    About,
    Info,
    SecurityBanner,
    Footer,
    Counter
  }
}
</script>
<style lang="scss" scoped>

</style>
