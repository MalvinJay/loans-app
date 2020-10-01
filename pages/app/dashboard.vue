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
        <!-- <p class="text-2xl md:text-xl block font-semibold pt-2 md:pt-6">
          Payment Method
        </p>
        <div class="my-3">
          <p>
            You can choose to stat repayment anytime. Click Schedule a Payment.
          </p>
        </div> -->

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
          <!-- <div class="box bg-white cursor-pointer">
            <img src="@/assets/img/calender.png" alt srcset>
            <p class="text-center">
              Scheduled
            </p>
          </div> -->
        </div>
      </section>
      <!-- ==============================================================
      ==========================DOCUMENTS SECTION====================
      ==============================================================-->
      <section id="docs" class="my-5">
        <p class="text-2xl md:text-xl font-semibold pt-2 md:pt-6">
          Application and Documents
        </p>
        <div class="docs flex flex-wrap text-white gap-10 my-5">
          <div class="relative box bg-white cursor-pointer" @click="getPDF('details')">
            <span class="tooltip absolute py-1 px-2 bg-black text-white text-xs w-auto rounded-xs hidden"> Click to Dowloand</span>
            <img src="@/assets/img/pdf.png" alt srcset>
            <p class="text-center">
              Loan Details
            </p>
          </div>
          <div class="relative box bg-white cursor-pointer">
            <template v-if="loanDetails.status_number === '1' || loanDetails.status_number === '5' || loanDetails.status_number === '6'" @click="getPDF('agreement')">
              <span class="tooltip absolute py-1 px-2 bg-black text-white text-xs w-auto rounded-xs hidden"> Click to Dowloand</span>
              <img src="@/assets/img/pdf.png" alt srcset>
              <p class="text-center">
                Loan Agreement
              </p>
            </template>
            <template>
              <div class="flex flex-col items-center text-center cursor-not-allowed h-full">
                <!-- <img src="@/assets/img/close-w.svg" class="w-6 h-6" alt=""> -->
                <img src="@/assets/img/pdf.png" alt srcset>
                <span class="px-4">No Loan Agreement Available</span>
              </div>
            </template>
          </div>
          <div v-for="(document, index) in loanDocuments" :key="index" class="relative box bg-white cursor-pointer">
            <a :href="document.assets[0].file_url" target="_blank" download>
              <span class="tooltip absolute py-1 px-2 bg-black text-white text-xs w-auto rounded-xs hidden"> Click to Dowloand</span>
              <template v-if="document.type === 'Primary Identity'">
                <img src="@/assets/img/google-docs.png" alt srcset>
              </template>
              <template v-else>
                <img src="@/assets/img/pdf.png" alt srcset>
              </template>
              <p class="text-center">
                {{ document.type }}
              </p>

            </a>
          </div>
        </div>
        <div>
          <p class="text-2xl md:text-xl block font-semibold pt-2 md:pt-6">
            Documents Upload
          </p>
          <div class="uploadfiles flex flex-wrap gap-10 my-5">
            <template>
              <div v-for="(upload, index) in possibleUploads" :key="index" class="pr-4 sm:pr-6 md:pr-8 py-4">
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
      <section id="messaging" class="my-10 pb-20">
        <div class="flex justify-between w-full">
          <p class="text-xl font-semibold pt-2 md:pt-6">
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
          <Accordion :key="index" :body="message" />
        </template>
      </section>
    </div>
    <Modal v-if="show" :flex="true" :allow="true">
      <div class="flex flex-col relative">
        <div class="absolute right-0 top-0 px-4">
          <img src="@/assets/img/Close.png" class="w-6 cursor-pointer" @click="show = false">
        </div>
        <div class="flex justify-center items-center text-3xl text-center" />
        <div class="flex flex-col pt-4 text-sm">
          <p class="text-sm">
            Sorry for any inconvenience caused.
          </p>
          <p class="text-sm">
            We are experiencing an issue with one of our technology partners.
          </p>
          <p class="text-sm">
            Please Try again a few hours from now.
          </p>
          <p class="text-sm">
            Thank you for your patience.
          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProgressBar from '@/components/Forms/ProgressBar.vue'
import Accordion from '@/components/Misc/Accordion.vue'
import Loading from '@/components/Misc/Loading.vue'
import Modal from '@/components/Misc/Modal.vue'
export default {
  layout: 'appLayout',
  middleware: 'auth',
  components: {
    ProgressBar,
    Accordion,
    Loading,
    Modal
  },
  data () {
    return {
      show: true,
      applicatonIdFile: null,
      loading: false,
      mybool: false,
      possibleUploads: [
        {
          id: 1,
          name: 'Primary Identity',
          period: ''
        }
        // {
        //   id: 2,
        //   name: 'Proof of PAYE Payments',
        //   period: '(last 3 months)'
        // },
        // {
        //   id: 3,
        //   name: 'SSNIT Payment',
        //   period: '(2019)'
        // }
      ],
      defaultDocuments: [
        {
          name: 'Loan Details',
          url: 'details'
        },
        {
          name: 'Loan Agreement',
          url: 'agreement'
        }
      ],
      image_url: '/icon.png',
      url: 'https://nbssi-post-deploy.wl.r.appspot.com/app/dashboard/',
      title: 'Dashboard | Client Portal',
      description: 'Client portal to view loan application status and also to chat directly with backOffice'
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
    getPDF (url) {
      this.$toasted.show('Downloading document ....', {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 3000
      })
      this.$store.dispatch('loan/getPDF', url)
        .then((response) => {
          // this.openModal()
          // const blob = new Blob([response.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = response
          link.target = '_blank'
          link.click()
        })
        .catch((err) => {
          this.$toasted.error(err.error)
        })
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'title', content: this.title },
        { hid: 'description', name: 'description', content: this.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.url },
        { property: 'og:title', content: this.title },
        { property: 'og:description', content: this.description },
        { property: 'og:image', content: this.image_url },
        { property: 'twitter:url', content: this.url },
        { property: 'twitter:title', content: this.title },
        { property: 'twitter:description', content: this.description },
        { property: 'twitter:image', content: this.image_url }

      ]
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
  &:hover {
    .tooltip {
      display: block!important;
    }
  }
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
    margin: 10px 30px 10px 0px;
    background: #394777;
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
    // &:nth-child(3) {
    //   background: #394777;
    // }
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
      img {
        margin: 2rem auto;
        margin-bottom: 15px;
      }
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
@include for-tablet-portrait-only {
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
@include for-tablet-portrait-only {
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
