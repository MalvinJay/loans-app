<template>
  <div v-show="show" class="grid docs border-blue-100">
    <div @drop.prevent="addApplicationId" @dragover.prevent>
      <label class="block text-gray-900 text-sm font-bold mb-2 mt-12">Photo ID</label>
      <div class="d-i border border-gray-900 py-12">
        <div class="img">
          <img src="@/assets/img/docs.png" alt>
        </div>
        <div class="my-6">
          <p class="text-center text-sm">
            Drag & Drop file here (max: 5MB)
          </p>
        </div>
        <div class="u-b">
          <label>
            <input type="file" @change="btnAddApplicationId">
            <span>Browse Files</span>
          </label>
        </div>
        <div class="mt-6">
          <p class="text-center text-sm">
            {{ applicatonIdFile }}
          </p>
          <p v-if="loading" class="text-center text-sm">
            Please wait....
          </p>
        </div>
      </div>
    </div>
    <div v-if="businessScale !== '1' && businessScale !== '2' && isStartup === false" @drop.prevent="addProofOfPaye" @dragover.prevent>
      <label class="block text-gray-900 text-sm font-bold mb-2 mt-12">Proof of PAYE Payments (last 3 months)</label>
      <div class="d-i border border-gray-900 py-12">
        <div class="img">
          <img src="@/assets/img/docs.png" alt>
        </div>
        <div class="my-6">
          <p class="text-center text-sm">
            Drag & Drop file here (max: 5MB)
          </p>
        </div>
        <div class="u-b">
          <label>
            <input type="file">
            <span>Browse Files</span>
          </label>
        </div>
        <div class="mt-6">
          <p class="text-center text-sm">
            {{ payePaymentsFile }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="businessScale !== '1' && businessScale !== '2' && isStartup === false" @drop.prevent="ssnitStatement" @dragover.prevent>
      <label class="block text-gray-900 text-sm font-bold mb-2 mt-12">SSNIT Statement (2019)</label>
      <div class="d-i border border-gray-900 py-12">
        <div class="img">
          <img src="@/assets/img/docs.png" alt>
        </div>
        <div class="my-6">
          <p class="text-center text-sm">
            Drag & Drop file here (max: 5MB)
          </p>
        </div>
        <div class="u-b">
          <label>
            <input type="file">
            <span>Browse Files</span>
          </label>
        </div>
        <div class="mt-6">
          <p class="text-center text-sm">
            {{ ssnitStatementFile }}
          </p>
        </div>
      </div>
    </div>
    <div />
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    active: Boolean
  },
  data () {
    return {
      show: this.active,
      applicatonIdFile: null,
      payePaymentsFile: null,
      ssnitStatementFile: null,
      loading: false
    }
  },
  computed: {
    businessScale () {
      return this.$store.getters['pages/businessScale']
    },
    isStartup () {
      return this.$store.getters['pages/isStartup']
    }
  },
  methods: {
    addApplicationId (e) {
      const file = e.dataTransfer.files[0]
      // eslint-disable-next-line no-console
      // console.log(file)
      this.loading = true
      const data = {
        file, name: 'id_file'
      }
      this.$store.commit('api/SET_ID_FILE_NAME', file.name)
      this.$store.dispatch('api/uploadMedia', data)
        .then(() => {
          this.applicatonIdFile = file.name
          this.loading = false
          this.$toasted.show('Image uploaded successfully', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
        .catch(() => {
          this.loading = false
          this.$toasted.error('Could not upload image', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
    },
    btnAddApplicationId (e) {
      const file = e.target.files[0]

      this.applicatonIdFile = file.name
      this.$store.dispatch('api/uploadMedia', file)
    },
    addProofOfPaye (e) {
      const file = e.dataTransfer.files[0]
      this.payePaymentsFile = file.name
      const formData = new FormData()
      formData.file = file
      this.$store.dispatch('api/uploadMedia', formData)
    },
    ssnitStatement (e) {
      const file = e.dataTransfer.files[0]
      this.ssnitStatementFile = file.name
      const formData = new FormData()
      formData.file = file
      this.$store.dispatch('api/uploadMedia', formData)
    }
  }
}
</script>
<style lang="scss" scoped>
.docs {
  grid-template-columns: repeat(3, 1fr);
  width: 95%;
  column-gap: 2rem;
  margin: 0px auto;
  margin-bottom: 5rem;
}
.d-i {
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  img {
    margin: 0 auto;
  }
}
.u-b {
  text-align: center;
  label input[type='file']{ display: none; }
  label span {
    cursor: pointer;
    background-color: white;
    color: $color-secondary;
    border: 1px solid $color-secondary;
    border-radius: 4px;
    padding: 6px 15px;
    font-size: 14px;
  }
}
@include for-phone-only {
  .docs {
    width: 100%;
    grid-template-columns: 100%;
  }
}
@include for-tablet-portrait-only {
  .docs {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
