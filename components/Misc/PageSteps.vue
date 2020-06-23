<template>
  <div class="page">
    <BaseCard :header="false">
      <div class="pb-32 px-8">
        <div class="h-t text-center b-b py-16">
          <p class="text-3xl">
            Funding Application
          </p>
        </div>
        <div class="main p-5">
          <div class="steps py-3 flex justify-evenly">
            <Checks
              v-for="(item, i) in status"
              :key="i"
              :status="item.status"
              :name="item.name"
              :step="i+1"
            />
          </div>
        </div>
        <slot />
      </div>
    </BaseCard>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Checks from './Checks'
import BaseCard from '@/components/Misc/ApplicationCard.vue'
export default {
  components: {
    Checks,
    BaseCard
  },
  props: {
    current: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      status: [
        { name: 'Funding Details', status: 'current', noline: false },
        { name: 'Personal Information', status: 'pending', noline: false },
        { name: 'Business Information', status: 'pending', noline: false },
        { name: 'Documents Upload', status: 'pending', noline: false },
        { name: 'Review', status: 'pending', noline: true }
      ]
    }
  },
  computed: {
    ...mapGetters({
      businessScale: 'pages/businessScale',
      isStartup: 'pages/isStartup'
    })
  },
  watch: {
    current (val) {
      this.status.forEach((item, index) => {
        if (index < val) {
          item.status = 'success'
        } else if (val === index) {
          item.status = 'current'
        } else {
          item.status = 'pending'
        }
      })
    }
  },
  mounted () {
    if (this.businessScale === '1' || this.businessScale === '2' || this.isStartup === false) {
      this.status = this.status.filter(item => item.name !== 'Documents Upload')
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  border-top: 1px solid $color-gray-alt;
  border-bottom: 1px solid $color-gray-alt;
}
.steps {
  width: 100%;
  & > div:last-child {
    flex: 1;
  }
}
</style>
