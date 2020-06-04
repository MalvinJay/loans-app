<template>
  <div>
    <slot />
    <div class="buttons flex">
      <div>
        <button v-if="count < items.length-1" class="button-small next" @click="count ++">
          Next
        </button>
        <button v-else class="button-small next" @click="confirmModal=true">
          Submit
        </button>
        <button v-if="count>=1" class="button-small previous" @click="count --">
          Previous
        </button>
        <!-- <button class="button-small previous small">
          Save
        </button> -->
      </div>
      <div>
        <button class="save button-small previous">
          Save
        </button>
      </div>
    </div>
    <Modal v-if="confirmModal" @close="confirmModal=false">
      <div>
        <div class="h-d mb-10">
          <p class="text-center text-lg font-bold">
            Declaration Section of Application
          </p>
        </div>
        <div>
          <div>
            <p class="text-center text-sm">
              1. Is any shareholder of the applicant organization who owns 20% or
              more of the organisation a subject to criminal investigation or is
              presently incarcerated, or on probation or parole? (Y/N)
            </p>
          </div>
          <div class="flex justify-center mt-5">
            <label class="checkbox">
              Yes
              <input id="yes" v-model="crime" type="checkbox" true-value="true" false-value="false">
              <span class="checkmark" />
            </label>
            <label class="checkbox">
              No
              <input id="no" v-model="crime" type="checkbox" false-value="true" true-value="false">
              <span class="checkmark" />
            </label>
          </div>
          <div class="mt-10">
            <p
              class="text-center text-sm"
            >
              2. Was the applicant organization in a liquidation process on or before March 1, 2020?
            </p>
          </div>
          <div class="flex checks justify-center mt-5">
            <label class="checkbox">
              Yes
              <input id="yes" v-model="liquidation" type="checkbox" true-value="true" false-value="false">
              <span class="checkmark" />
            </label>
            <label class="checkbox">
              No
              <input id="no" v-model="liquidation" type="checkbox" false-value="true" true-value="false">
              <span class="checkmark" />
            </label>
          </div>
        </div>
        <div class="mt-16">
          <p
            class="text-center text-sm"
          >
            I hereby declare that all the information submitted by me in this form is correct, true and valid. I also declare that I have read thoroughly and understood the terms and conditions of this application and have given my consent by virtue of my signature on this form.
          </p>
        </div>
        <div class="sig">
          <label class="block text-gray-900 text-sm font-bold mb-2">Input your initials here</label>
          <div>
            <Input v-model="signature" small />
          </div>
        </div>
        <div class="buttons c-b flex gap-5">
          <button v-if="signature !== null && signature !== '' && liquidation=='false' && crime=='false'" class="button-small next" @click="submitAll">
            Finish
          </button>
          <button class="button-small previous" @click="confirmModal=false">
            Return
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from '../Misc/Modal'
import Input from '../Forms/Input'
export default {
  components: {
    Modal,
    Input
  },
  data () {
    return {
      items: [],
      count: 0,
      confirmModal: false,
      signature: null,
      liquidation: null,
      crime: null
    }
  },
  watch: {
    count (value) {
      this.items.forEach((item, i) => {
        if (i === this.count) {
          item.show = true
        } else {
          item.show = false
        }
      })
      this.$emit('current', value)
    }
  },
  mounted () {
    this.items = this.$children
  },
  methods: {
    submitAll () {
      this.$emit('submitted', true)
      this.$store.dispatch('api/submitApplication')
        .then((result) => {
          window.location = '/loans/submitted'
          // eslint-disable-next-line no-console
          // console.log(result)
          // window.location = '/loans/submitted'
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.buttons {
  button {
    width: 279px;
    height: 50px;
    margin: 10px;
    &.previous {
      border: 1px solid $color-primary;
      color: $color-primary;
      background-color: white;
    }
    &:first-child {
      margin-bottom: 10px;
    }
  }
  &.c-b {
    width: 40%;
    margin: 0 auto;
    button {
      width: 100%;
    }
  }
}
.sig {
  width: 20%;
  margin: 3rem auto;
  text-align: center;
}
@include for-phone-only {
  .sig {
    width: 100%;
  }
  .buttons {
    flex-direction: column;
    button {
      width: 100%;
    }
    &.c-b {
      width: 100%;
    }
  }
}
@include for-tablet-landscape-up {
  .save {
    margin-left: rem;
  }
}
</style>
