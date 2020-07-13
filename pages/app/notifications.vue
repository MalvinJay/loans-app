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
            <div :key="index" class="pb-4">
              <!-- {{ notification }} -->
              <table class="w-full">
                <thead>
                  <tr>
                    <th>
                      Message
                    </th>
                    <th class="pl-2" style="padding-left: 0.5rem;">Sent At</th>
                    <!-- <th>
                      Paid With
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr class="card">
                    <td class="py-4">
                      {{ notification.data.message }}
                    </td>
                    <td class="py-4 px-2">
                      {{ formatDate(notification.created_at) }}
                    </td>
                  </tr>
                </tbody>
                <!-- <div class="table flex flex-col">
                  <div class="flex justify-between w-full">
                    <div class="py-4 w-1/2">
                      {{ notification.data.message }}
                    </div>
                    <div class="py-4 w-1/2">
                      {{ notification.created_at }}
                    </div>
                  </div>
                </div> -->
              </table>
            </div>
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
import Loading from '@/components/Misc/Loading.vue'
export default {
  layout: 'appLayout',
  middleware: 'auth',
  components: {
    Loading
  },
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
  },
  created () {
    if (this.$store.state.loan.loandetails.status !== 'complete') {
      this.$router.push('/app/loanapplication')
    }
    this.$store.dispatch('notifications/getNotifications')
  },
  methods: {
    formatDate (data) {
      const time = data.split('T')
      // const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
      // const [{ value: month },, { value: day },, { value: year }] = dateTimeFormat.formatToParts(time[0])
      return time[0]
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
table {
  table-layout: fixed;
  width: 100%;
  height: 100%;
  thead {
    background-color: white;
    text-align: left;
    height: 4rem;
    padding-left: 2rem;
    th {
      padding: 14px 0;
      &:first-child {
        padding-left: 2rem;
      }
    }
  }
  tbody {
    td {
      padding-top: 1rem;
      padding-bottom: 1rem;
      &:first-child {
        padding-left: 2rem;
      }
    }
  }
}
.card {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
@include for-phone-only {
  table {
    thead {
      background: none;
    }
  }
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
@include for-tablet-portrait-only {
  .app {
    padding: 0 20px!important;
  }
}
</style>
