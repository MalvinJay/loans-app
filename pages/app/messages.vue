<template>
  <div>
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
      <div>
        <Accordion />
        <Accordion />
        <Accordion />
      </div>
    </div>
    <!-- Inquiry Modal -->
    <transition name="modal">
      <div v-if="modal" class="modal-mask" @close="modal = false">
        <div class="modal-wrapper">
          <div v-click-outside="closeModal" class="modal-container">
            <div v-scroll-lock="open" class="modal-body">
              <form class="px-6" @submit.prevent="handleInquiry()">
                <div class="relative text-center">
                  <img src="@/assets/img/close.svg" class="absolut left-0 top-0 w-4 h-4 cursor-pointer" alt="" @click="modal = false" >
                  <h1 class="head">
                    Inquiry
                  </h1>
                </div>
                <div class="py-4">
                  <label class="block text-gray-900 text-sm font-normal mb-4 mobile">Reference Number</label>
                  <Input type="text" placeholder="" small />
                </div>
                <div class="py-4">
                  <label class="block text-gray-900 text-sm font-normal mb-4 mobile">Message</label>
                  <textarea name="message" rows="20" placeholder="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Accordion from '@/components/Misc/Accordion.vue'
// import Modal from '@/components/Misc/Modal'
export default {
  layout: 'appLayout',
  // middleware: 'auth',
  components: {
    Accordion
    // Modal
  },
  data () {
    return {
      modal: false,
      open: true
    }
  },
  methods: {
    handleInquiry () {
      // Logic goes here
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
.modal-container {
  width: 35%!important;
  margin: 0 auto;
  margin-top: 5%;
}
form {
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
  // width: -webkit-max-content;
  // width: -moz-max-content;
  // width: max-content;
  width: 90%;
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
  .docs {
    display: flex;
    flex-wrap: wrap;
    .box {
      width: calc(50% - 10px);
      margin: 0px 10px 10px 0px;
    }
  }
  .uploadfiles {
    .box {
      width: 24rem;
      img {
        width: 15%;
      }
    }
  }
  #messaging {
    button {
      width: 120px;
    }
  }
}
</style>
