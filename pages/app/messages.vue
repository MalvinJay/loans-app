<template>
  <div>
    <Loading :show="!state" />
    <div class="app">
      <div class="pt-10 mb-5 flex justify-between w-full">
        <p class="text-2xl md:text-xl font-semibold">
          Messages
        </p>
        <div class="inquiry flex gap-3">
          <button @click="modal = true">
            Submit an inquiry
          </button>
        </div>
      </div>
      <div v-if="messages.length > 0">
        <template v-for="(message, index) in messages">
          <Accordion :key="index" :body="message" />
        </template>
      </div>
      <div v-else class="flex items-center justify-center w-full pt-6 md:pt-56">
        <div class="font-bold text-2xl">
          No Messages Found
        </div>
      </div>
    </div>
    <!-- Inquiry Modal -->
    <transition name="modal">
      <div v-if="modal" class="modal-mask">
        <div class="modal-wrapper">
          <div v-click-outside="closeModal" class="modal-container flex justify-center">
            <div v-scroll-lock="open" class="modal-body w-full">
              <div class="form px-2">
                <div class="relative text-center">
                  <img src="@/assets/img/close.svg" class="absolute top-0 left-0 w-4 h-4 cursor-pointer" alt="" @click="modal = false">
                  <h1 class="head">
                    Inquiry
                  </h1>
                </div>
                <!-- <div class="py-4">
                  <label class="block text-gray-900 text-sm font-semibold mb-4 mobile">Reference Number</label>
                  <Input v-model="inquiry.reference" type="text" placeholder="" small />
                </div> -->
                <div class="py-4 ">
                  <label class="block text-gray-900 text-sm font-semibold mb-4 mobile">Message</label>
                  <textarea v-model="inquiry.body" name="message" class="p-4" rows="20" placeholder="" />
                </div>
                <div class="py-4">
                  <button class="button-small query" @click="handleInquiry">
                    <template v-if="loading">
                      <div class="login-spinner flex justify-center w-full">
                        <img src="@/assets/img/refresh.svg" class="w-5 h-full" alt="">
                      </div>
                    </template>
                    <template v-else>
                      Submit Inquiry
                    </template>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Accordion from '@/components/Misc/Accordion.vue'
import Loading from '@/components/Misc/Loading.vue'
export default {
  layout: 'appLayout',
  middleware: 'auth',
  components: {
    Accordion,
    Loading
  },
  data () {
    return {
      modal: false,
      open: true,
      loading: false,
      inquiry: {
        reference: null,
        body: null
      }
    }
  },
  computed: {
    ...mapGetters({
      messages: 'queries/queries',
      messagesState: 'queries/queriestate'
    }),
    state () {
      return this.messagesState === 'LOADING'
    }
  },
  mounted () {
    this.$store.dispatch('queries/fetchQueries')
  },
  methods: {
    handleInquiry () {
      this.loading = true
      this.$store.dispatch('queries/makeInquiry', this.inquiry.body)
        .then((res) => {
          this.$toasted.success('Query Sent')
          this.$store.dispatch('queries/fetchQueries')
          this.modal = false
        })
        .catch((error) => {
          this.$toasted.error(error.error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.app {
  background-color: $color-white-alt;
  padding: 0 73px;
  height: calc(100vh - 70px);
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
.modal-container {
  width: 30%;
  margin: 0 auto;
  margin-top: 5%;
}
.form {
  input, textarea {
    width: 100%!important;
    padding: 10px!important;
  }
  textarea {
    height: 10rem;
  }
  .head {
    margin-bottom: 3rem;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 41px;
  }
}
.modal-mask {
  background-attachment: fixed;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  // width: 30%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
  max-height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
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
  .accordion {
    .indicator {
      top: 2%;
    }
  }
  .modal-container {
    width: 95%;
    padding: 10px;
  }
}
@include for-tablet-portrait-only {
  .app {
    padding: 0 20px!important;
  }
}
@include for-tablet-portrait-only {
  .app {
    padding: 0 20px!important;
  }
}
.modal-container {
  width: 90%!important;
}
</style>
