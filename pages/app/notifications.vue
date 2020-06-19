<template>
  <div>
    <Loading :show="!state" />
    <div class="app">
      <div class="pt-10 mb-5 flex justify-between w-full">
        <p class="text-xl font-semibold">
          Notifications
        </p>
      </div>
      <div class="notifications">
        <template v-if="notifications.length > 0">
          <template v-for="(notification, index) in notifications">
            <p class="pb-4" :key="index">
              {{notification}}
            </p>
          </template>
        </template>
        <div v-else class="flex items-center justify-center h-64">
            <div class="flex flex-col items-center">
              <img src="@/assets/img/bell.svg" class="w-20 opacity-50" alt="">
              <span class="pt-8">No Notifications</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'appLayout',
  // middleware: 'auth'
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      notifications: 'notifications/notifications',
      nofifState: 'notifications/notificationsState'
    }),
    state () {
      return this.nofifState === 'LOADING'
    }
  }
}
</script>
<style lang="scss" scoped>
.app {
  background-color: $color-white-alt;
  padding: 0 73px;
  height: calc(100vh - 100px);
}
button {
  background: #ffffff;
  border: 1px solid $color-secondary;
  box-sizing: border-box;
  border-radius: 5px;
  color: $color-secondary;
  width: 162px;
  height: 40px;
  font-size: 0.8rem;
}
@include for-phone-only {
  .app {
    padding: 0 20px!important;
    .overview p {
      font-size: 25px;
    }
    div {
      p {
        line-height: 40px;
      }
      .inquiry {
        button {
          width: 100px;
          height: 30px;
        }
      }
    }
  }
}
</style>
