/* eslint-disable vue/require-valid-default-prop */
<template>
  <div class="accordion pl-4 md:pl-16 md:px-10 py-6 my-4">
    <div class="flex justify-between cursor-pointer" @click="active = !active">
      <div class="flex items-center">
        <div :class="[ blocked ? 'bg-red-600' : 'chat--active' , 'indicator mr-4']" />
        <div class="title text-xl">
          <span class="capitalize">
            {{ body.messages[0].sender }} - {{ body.identifier }}
          </span>
        </div>
        <div v-if="blocked" class="flex items-center bg-red-600 rounded ml-4">
          <span class="px-2 text-white">Closed Thread</span>
        </div>
      </div>
      <div class="icon inset-y-0 items-center text-gray-700 px-5" :class="{active: active}">
        <svg :class="[{'transform rotate-180': !active}, 'transition transition-transform ease-out duration-300 fill-current h-4 w-4 cursor-pointer']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
    <div class="body w-full mt-3 overflow-y" :class="{ hidden: active }">
      <div class="chat border-t border-gray-400">
        <div v-for="(message, index) in body.messages" :key="index" class="flex flex-col px-2">
          <template v-if="message.sender === 'admin'">
            <div class="flex justify-start py-4 font-semibold">
              <div class="bg-orange-200 rounded-lg p-4">
                {{ message.body }}
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex justify-end py-4 font-semibold">
              <div class="bg-blue-100 rounded-lg p-4">
                {{ message.body }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="response flex flex-col items-end py-4 px-2">
        <template v-if="!blocked">
          <textarea v-model="response" name="Query Response" cols="30" rows="10" class="w-full border border-1 border-gray-600" />
          <div class="my-4">
            <button class="button-small" @click="respondQuery">
              <template v-if="loading">
                <div class="login-spinner flex justify-center w-full">
                  <img src="@/assets/img/refresh.svg" class="w-5 h-full" alt="">
                </div>
              </template>
              <template v-else>
                Reply
              </template>
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Accordion',
  props: {
    body: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      active: true,
      loading: false,
      response: ''
    }
  },
  computed: {
    blocked () {
      if (this.body.status === 2) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-console
    console.log('Body:', this.body)
  },
  methods: {
    respondQuery () {
      this.loading = true
      const data = {
        body: this.response,
        reference: this.body.id
      }
      this.$store.dispatch('queries/respondToInquiry', data)
        .then((res) => {
          this.$toasted.success('Query Sent')
          this.$store.dispatch('queries/fetchQueries')
        })
        .catch((error) => {
          this.$toasted.error(error.error)
        })
        .finally(() => {
          this.loading = false
          this.response = null
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-spinner {
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
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
.button-small {
  width: 100%;
  background-color: $color-secondary;
}
.response {
  textarea {
    width: 100%!important;
    border-color: #d4bcbc;
    padding: 10px 20px;
  }
}
.chat--active {
  background: #6A1B9A;
}
.accordion {
  background-color: white;
  border-radius: 5px;
  position: relative;
  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 100%;
}
  .body {
    height: auto;
    width: 100%;
    &.show {
      height: auto;
      transition: height 0.5s;
    }
    .chat {
      border-top-width: 1px!important;
    }
  }
}
</style>
