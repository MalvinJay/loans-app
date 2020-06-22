<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <!-- v-click-outside="closeModal" -->
        <div class="modal-container" :class="{flex}">
          <div v-scroll-lock="open" class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    flex: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      open: true
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
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
  width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  &.flex {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    // width: 50rem;
  }
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
  .modal-container {
    &.flex {
      width: 90%;
    }
  }
}

</style>
