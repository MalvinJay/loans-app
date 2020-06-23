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
  },
  data () {
    return {
      image_url: '/icon.png',
      url: 'https://nbssimastercard-staging.wl.r.appspot.com/apply',
      title: 'Covid-19 Emergency Relief Fund',
      description: 'Welcome to the Mastercard Foundation and National Board for Small Scale Industries (NBSSI) application portal.'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'title', content: 'Covid-19 Emergency Relief Fund' },
        { hid: 'description', name: 'description', content: this.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.url },
        { property: 'og:title', content: 'Covid-19 Emergency Relief Fund' },
        { property: 'og:description', content: 'Welcome to the Mastercard Foundation and National Board for Small Scale Industries (NBSSI) application portal. Thank you for visiting' },
        { property: 'og:image', content: this.image_url },
        { property: 'twitter:url', content: this.url },
        { property: 'twitter:title', content: 'Covid-19 Emergency Relief Fund' },
        { property: 'twitter:description', content: 'Welcome to the Mastercard Foundation and National Board for Small Scale Industries (NBSSI) application portal. Thank you for visiting' },
        { property: 'twitter:image', content: this.image_url }

      ]
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
