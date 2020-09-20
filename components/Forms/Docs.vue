<template>
  <div v-show="show">
    <ValidationObserver v-slot="{ handleSubmit, valid }">
      <form @submit.prevent="handleSubmit(moveNext)">
        <div class="h-d my-10">
          <p class="text-red-600 text-sm text-center">
            * Attach copy of Business Owner Personal ID
          </p>
          <!-- <p v-if="businessScale !== '1' && businessScale !== '2' && isStartup === false" class="text-red-600 text-sm text-center">
            * You need to upload your most recent <b>3 months proof of PAYE Payments</b> to GRA and your <b>SSNIT Statement for 2019</b>.
          </p> -->
        </div>
        <div class="grid docs border-blue-100">
          <div @drop.prevent="addApplicationId" @dragover.prevent>
            <label class="block text-gray-900 text-sm font-bold mb-2 mt-4">Main business owner ID</label>
            <ValidationProvider ref="provider" v-slot="{ errors }" rules="required">
              <div class="d-i border border-gray-900 py-12">
                <div class="img">
                  <img src="@/assets/img/docs.png" alt>
                </div>
                <div class="my-6">
                  <p class="text-center text-sm">
                    Drag & Drop file here (max: 2MB)
                  </p>
                  <p class="text-center">
                    Please use file type jpeg, png or jpg
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
              <div class="text-sm text-red-700 text-center pt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
          </div>
          <div class="flex items-center">
            <div class="img">
              <p class="text-sm text-center pb-4">
                Dear Applicant, please ensure you upload a valid ID of any of the samples below
              </p>
              <img src="@/assets/img/required_ids.png" class="w-full" alt>
            </div>
          </div>
          <!-- <div v-if="businessScale !== '1' && businessScale !== '2' && isStartup === false" @drop.prevent="addProofOfPaye" @dragover.prevent>
            <label class="block text-gray-900 text-sm font-bold mb-2 mt-4">Proof of PAYE Payments (last 3 months)</label>
            <div class="d-i border border-gray-900 py-12">
              <div class="img">
                <img src="@/assets/img/docs.png" alt>
              </div>
              <div class="my-6">
                <p class="text-center text-sm">
                  Drag & Drop file here (max: 5MB)
                </p>
                <p class="text-center">
                  Please use file type jpeg, png or jpg
                </p>
              </div>
              <div class="u-b">
                <label>
                  <input type="file" @change="btnAddProofOfPaye">
                  <span>Browse Files</span>
                </label>
              </div>
              <div class="mt-6">
                <p class="text-center text-sm">
                  {{ payePaymentsFile }}
                </p>
                <p v-if="payeloading" class="text-center text-sm">
                  Please wait....
                </p>
              </div>
            </div>
          </div> -->
          <!-- <div v-if="businessScale !== '1' && businessScale !== '2' && isStartup === false" @drop.prevent="ssnitStatement" @dragover.prevent>
            <label class="block text-gray-900 text-sm font-bold mb-2 mt-4">SSNIT Statement (2019)</label>
            <div class="d-i border border-gray-900 py-12">
              <div class="img">
                <img src="@/assets/img/docs.png" alt>
              </div>
              <div class="my-6">
                <p class="text-center text-sm">
                  Drag & Drop file here (max: 5MB)
                </p>
                <p class="text-center">
                  Please use file type jpeg, png or jpg
                </p>
              </div>
              <div class="u-b">
                <label>
                  <input type="file" @change="btnAddSsnitStatement">
                  <span>Browse Files</span>
                </label>
              </div>
              <div class="mt-6">
                <p class="text-center text-sm">
                  {{ ssnitStatementFile }}
                </p>
                <p v-if="ssnitloading" class="text-center text-sm">
                  Please wait....
                </p>
              </div>
            </div>
          </div> -->
          <div />
        </div>
        <div class="nav-buttons">
          <template v-if="!valid">
            <div class="py-2">
              <span class="text-red-500 ">Upload at least Business Owner ID to proceed</span>
            </div>
          </template>
          <div>
            <button class="button-small next" type="submit">
              Next
            </button>
            <button class="button-small previous" @click="movePrevious">
              Previous
            </button>
            <button class="button-small previous small" @click="save">
              Save
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    active: Boolean
  },
  data () {
    return {
      show: this.active,
      applicatonIdFile: null,
      payePaymentsFile: null,
      ssnitStatementFile: null,
      loading: false,
      payeloading: false,
      ssnitloading: false
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
    moveNext () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 4)
    },
    movePrevious () {
      // eslint-disable-next-line no-console
      console.log('Go back')
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 2)
    },
    addApplicationId (e) {
      const file = e.dataTransfer.files[0]
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
    async btnAddApplicationId (e) {
      const { valid } = await this.$refs.provider.validate(e)

      if (valid) {
        const file = e.target.files[0]
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
          .catch((err) => {
            this.loading = false
            this.$toasted.error(err.response.data.errors.file[0], {
              theme: 'toasted-primary',
              position: 'top-right',
              duration: 5000
            })
          })
      }
    },
    addProofOfPaye (e) {
      const file = e.dataTransfer.files[0]
      this.payeloading = true
      const data = {
        file, name: 'proof_of_paye'
      }
      this.$store.commit('api/SET_PAYE_FILE_NAME', file.name)
      this.$store.dispatch('api/uploadMedia', data)
        .then(() => {
          this.payePaymentsFile = file.name
          this.payeloading = false
          this.$toasted.show('Image uploaded successfully', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
        .catch((err) => {
          this.payeloading = false
          this.$toasted.error(err.response.data.errors.file[0], {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
    },
    btnAddProofOfPaye (e) {
      const file = e.target.files[0]

      this.payeloading = true
      const data = {
        file, name: 'proof_of_paye'
      }
      this.$store.commit('api/SET_PAYE_FILE_NAME', file.name)
      this.$store.dispatch('api/uploadMedia', data)
        .then(() => {
          this.payePaymentsFile = file.name
          this.payeloading = false
          this.$toasted.show('Image uploaded successfully', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
        .catch((err) => {
          this.payeloading = false
          this.$toasted.error(err.response.data.errors.file[0], {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
    },
    ssnitStatement (e) {
      const file = e.dataTransfer.files[0]
      this.ssnitloading = true
      const data = {
        file, name: 'ssnit_statement'
      }
      this.$store.commit('api/SET_SSNIT_FILE_NAME', file.name)
      this.$store.dispatch('api/uploadMedia', data)
        .then(() => {
          this.ssnitStatementFile = file.name
          this.ssnitloading = false
          this.$toasted.show('Image uploaded successfully', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
        .catch((err) => {
          this.ssnitloading = false
          this.$toasted.error(err.response.data.errors.file[0], {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
    },
    btnAddSsnitStatement (e) {
      const file = e.target.files[0]

      this.ssnitloading = true
      const data = {
        file, name: 'ssnit_statement'
      }
      this.$store.commit('api/SET_SSNIT_FILE_NAME', file.name)
      this.$store.dispatch('api/uploadMedia', data)
        .then(() => {
          this.ssnitStatementFile = file.name
          this.ssnitloading = false
          this.$toasted.show('Image uploaded successfully', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
        .catch((err) => {
          this.ssnitloading = false
          this.$toasted.error(err.response.data.errors.file[0], {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 5000
          })
        })
    },
    save () {
      this.$store.commit('api/SET_GENERAL_DATA', this.aggregate)
      this.$store.commit('pages/SET_SAVE_MODAL', true)
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
