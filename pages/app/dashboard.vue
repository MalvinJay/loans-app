<template>
  <div>
    <Loading :show="!state" />
    <div class="app">
      <div class="overview pt-10 pb-5">
        <p class="text-xl block font-semibold">
          Overview
        </p>
      </div>
      <!-- ==============================================================
      ==========================PAYMENTS SECTION====================
      ==============================================================-->
      <section id="payment">
        <p class="text-xl font-semibold">
          Loan # {{ loanDetails.loan_identifier }}
        </p>
        <div class="my-5">
          <ProgressBar :max="0" :value="0" />
        </div>
        <p class="text-2xl md:text-xl block font-semibold">
          Payment Method
        </p>
        <div class="my-3">
          <p>
            Repayment isn't due until 13-11-2020 but you can choose to start repaying at anytime
          </p>
        </div>

        <div class="payment-structure flex">
          <!-- <div class="box bg-white cursor-pointer">
            <img src="@/assets/img/onetime.png" alt srcset>
            <p class="text-center">
              One Time
            </p>
          </div>
          <div class="flex justify-center flex-col px-2 md:px-10">
            <div class="text-xl font-semibold">
              OR
            </div>
          </div> -->
          <div class="box bg-white cursor-pointer">
            <img src="@/assets/img/calender.png" alt srcset>
            <p class="text-center">
              Scheduled
            </p>
          </div>
        </div>
      </section>
      <!-- ==============================================================
      ==========================DOCUMENTS SECTION====================
      ==============================================================-->
      <section id="docs" class="my-5">
        <p class="text-2xl md:text-xl">
          Application and Documents
        </p>
        <div class="docs flex flex-wrap text-white gap-10 my-5">
          <div v-for="(document, index) in loanDocuments" :key="index" class="box bg-white cursor-pointer" @click="getPDF()">
            <template v-if="document.type === 'Primary Identity'">
              <img src="@/assets/img/google-docs.png" alt srcset>
            </template>
            <template v-else>
              <img src="@/assets/img/pdf.png" alt srcset>
            </template>
            <p class="text-center">
              {{ document.type }}
            </p>
          </div>
        </div>
        <div>
          <p class="text-2xl md:text-xl block font-semibold">
            Documents Upload
          </p>
          <div class="uploadfiles md:flex gap-10 my-5">
            <template>
              <div v-for="(upload, index) in possibleUploads" :key="index" class="md:pr-10 py-4">
                <label class="block text-gray-900 mb-5 h-10 text-lg sentence">
                  {{ upload.name }}
                  <br v-if="upload.period">{{ upload.period }}
                </label>
                <div class="box d-i border border-gray-900 py-5 bg-white">
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
                      <input :id="upload.id" :name="upload.name" type="file" @change="handleFile">
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
            </template>
            <!-- <template v-else>
              <div class="md:pr-10 py-4">
                <p class="text-2xl md:text-xl block">
                  All Documents Uploaded!
                </p>
              </div>
            </template> -->
          </div>
        </div>
      </section>
      <!-- ==============================================================
      ==========================MESSAGING SECTION====================
      ==============================================================-->
      <section id="messaging" class="my-10">
        <div class="flex justify-between w-full">
          <p class="text-xl">
            Messages
          </p>
          <div class="flex gap-3">
            <!-- <button>Submit an inquiry</button> -->
            <div class="table h-full">
              <p class="table-cell font-semibold text-sm pl-8">
                <nuxt-link to="messages">
                  View All
                </nuxt-link>
              </p>
            </div>
          </div>
        </div>
        <template v-for="(message, index) in messages.slice(0,2)">
          <Accordion :key="index" :head="message.messages[0].sender" :identifier="message.identifier" :id-prop="message.id" :body="message.messages" />
        </template>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProgressBar from '@/components/Forms/ProgressBar.vue'
import Accordion from '@/components/Misc/Accordion.vue'
import Loading from '@/components/Misc/Loading.vue'
export default {
  layout: 'appLayout',
  middleware: 'auth',
  components: {
    ProgressBar,
    Accordion,
    Loading
  },
  data () {
    return {
      applicatonIdFile: null,
      loading: false,
      mybool: false,
      possibleUploads: [
        {
          id: 1,
          name: 'Primary Identity',
          period: ''
        },
        {
          id: 2,
          name: 'Proof of PAYE Payments',
          period: '(last 3 months)'
        },
        {
          id: 3,
          name: 'SSNIT Payment',
          period: '(2019)'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      loanDetails: 'loan/loanDetails',
      loansState: 'loan/loanDetailState',
      messages: 'queries/queries',
      loanDocuments: 'loan/loanDocuments'
    }),
    state () {
      return this.loansState === 'LOADING'
    },
    availableUpload () {
      const notUploaded = []
      this.loanDocuments.map((document, index) => {
        this.possibleUploads.filter((upload) => {
          if (document.type.toLowerCase().indexOf(upload.name.toLowerCase() === -1)) {
            notUploaded.push(upload)
          }
        })
      })
      return notUploaded
    }
  },
  mounted () {
    if (this.$store.state.loan.loandetails.status !== 'complete') {
      this.$router.push('/app/loanapplication')
    }
  },
  created () {
    this.$store.dispatch('loan/fetchLoanDetails')
      .then(() => {
        if (this.$store.state.loan.loandetails.status !== 'complete') {
          this.$router.push('/app/loanapplication')
        }
      })
      .catch((error) => {
        this.$toasted.error(error.error)
        if (error.error.includes('Token')) {
          this.$router.push('/app/registration/login')
        }
        if (error.error.includes('unfinished')) {
          this.$router.push('/app/loanapplication')
        }
      })
  },
  methods: {
    handleFile (e) {
      const type = parseInt(e.target.id)
      const name = e.target.name
      const file = e.target.files[0]
      const data = {
        loanID: this.loanDetails.id,
        file,
        file_type: type
      }
      this.$store.dispatch('loan/uploadDocument', data)
        .then((response) => {
          this.$toasted.show(`${name} upload successfully`, {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 5000
          })
        })
        .catch((error) => {
          this.$toasted.error(error.error)
        })
    },
    getPDF () {
      // this.$store.dispatch('dashboard/getPDF')
      //   .then((response) => {
      //     // this.openModal()
      //     // const blob = new Blob([response.data], { type: 'application/pdf' })
      //     // const link = document.createElement('a')
      //     // link.href = window.URL.createObjectURL(blob)
      //     // link.download = 'currentApplication.pdf'
      //     // link.click()
      //     // this.closeModal()
      //   })
      //   .catch((err) => {
      //     // eslint-disable-next-line no-console
      //     this.$toasted.error(err.response.data)
      //   })
      this.$toasted.show('Downloading document ....', {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 5000
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.hidden {
  display: none!important;
}
.app {
  background-color: $color-white-alt;
  padding: 0 73px;
}
.box {
  width: 16rem;
  height: 12.65rem;
  border-radius: 5px;
  img {
    margin: 2rem auto;
  }
}
.payment-structure {
  color: $color-secondary;
}
.docs {
  // grid-template-columns: 16rem 16rem 16rem 16rem;
  .box {
    margin: 10px 40px 10px 0px;
    img {
      margin-bottom: 3rem;
    }
    &:first-child {
      background: linear-gradient(
        90deg,
        rgba(255, 58, 45, 0.8) 0%,
        rgba(255, 69, 48, 0.8) 100%
      );
    }
    &:nth-child(2) {
      background: #5a8ff2;
    }
    &:nth-child(3) {
      background: #394777;
    }
  }
}
.d-i {
  border: 1px solid #848484;
  border-radius: 5px;
  img {
    margin: 0 auto;
  }
}
.u-b {
  text-align: center;
  label input[type="file"] {
    display: none;
  }
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
#messaging {
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
  .table-cell {
    vertical-align: middle;
    color: $color-secondary;
  }
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
