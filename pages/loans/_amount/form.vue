<template>
  <div>
    <NavBar alt />
    <Steps :current="current">
      <Content @current="viewCurrent">
        <LoanDetails :active="true" />
        <Info />
        <BusinessInfo />
        <Docs />
        <Review />
      </Content>
    </Steps>
    <Footer />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar/NavBarDefault.vue'
// import BaseCard from '@/components/Misc/ApplicationCard.vue'
import Steps from '@/components/Misc/PageSteps.vue'
import Content from '@/components/Misc/Content.vue'
import LoanDetails from '@/components/Forms/LoanDetails.vue'
import Info from '@/components/Forms/PersonalInformation.vue'
import BusinessInfo from '@/components/Forms/BusinessInformation.vue'
import Docs from '@/components/Forms/Docs.vue'
import Review from '@/components/Forms/Review.vue'
import Footer from '@/components/Footer/FooterAlt.vue'
export default {
  layout: 'homeLayout',
  components: {
    NavBar,
    // BaseCard,
    Steps,
    LoanDetails,
    Content,
    Info,
    BusinessInfo,
    Docs,
    Review,
    Footer
  },
  data () {
    return {
      current: 0,
      micro: false
    }
  },
  created () {
    // eslint-disable-next-line no-console
    if (this.$route.params.amount < 145000) {
      this.micro = true
    }
  },
  methods: {
    viewCurrent (value) {
      this.current = value
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
