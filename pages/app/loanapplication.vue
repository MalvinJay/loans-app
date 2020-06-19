<template>
  <div>
    <Loading :show="!state" />
    <div class="app">
      <div class="pt-10 mb-5">
        <p class="text-xl block font-semibold">
          Loan Application
        </p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>Start Date</th>
              <th>
                Status
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{ loanDetails.first_name || 'N/A' }} {{ loanDetails.last_name || 'N/A' }}
              </td>
              <td>
                11 July 2020
              </td>
              <td class="text blue">
                {{ loanDetails.status }}
              </td>
              <td>
                <button class="button-small">
                  {{ loanStatus }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div :class="[{hidden: status}, 'overlay']">
          <div class="redirect py-28 rounded-sm">
            <div class="h-12 flex flex-col md:items-center">
              <div class="text-3xl font-bold">
                LOAN APPLICATION NOT COMPLETE
              </div>
              <span class="py-2">
                KINDLY GO BACK AND FINISH THE PROCESS
              </span>
              <div class="shadow-2xl p-4 cursor-pointer flex justify-center">
                <a href="/apply">
                  <img src="@/assets/img/go-back_resigtration.svg" class="w-10" alt="">
                </a>
              </div>
            </div>
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
  components: {
    Loading
  },
  computed: {
    ...mapGetters({
      loanDetails: 'loan/loanDetails',
      loansState: 'loan/loanDetailState',
      loanStatus: 'loan/loanStatus'
    }),
    state () {
      return this.loansState === 'LOADING'
    },
    status () {
      return this.loanStatus === 'complete'
    }
  },
  mounted () {
    this.$store.dispatch('loan/fetchLoanDetails')
  }
}
</script>
<style lang="scss" scoped>
.blue {
  color: #1A49DD;
}
.hidden {
  display: none!important;
}
.overlay {
  background-attachment: fixed;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  .redirect {
    position: relative;
    background: white;
    padding: 20px 30px;
    height: 25vh;
    h1 {
      font-size: 20px;
    }
    p {
      font-weight: 400;
    }
  }
}
.app {
  background-color: $color-white-alt;
  padding: 0 73px;
  height: calc(100vh - 70px);
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
    tr {
      th {
        padding: 10px 0;
      }
    }
    th {
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
.button-small {
  background-color: $color-secondary;
}
@include for-phone-only {
  .app {
    padding: 0 20px;
    .app {
      padding: 0!important;
    }
    .overview p {
      font-size: 25px;
    }

    table {
      thead {
        background: none;
        tr {
          th {
            padding-left: 0px!important;
          }
        }
      }
      tbody {
        tr {
          td {
            padding-left: 0px!important;
            button {
              width: 70px;
              padding: 5px;
              height: 25px;
            }
          }
        }
      }
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
  .box {
    padding: 12px;
    .button-sec {
      width: 100%;
      height: 34px;
      font-size: 10px;
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  #agreement {
    .c-grid {
      grid-template-columns: 1fr 1fr!important;
      grid-template: "file_area buttons_area"
      "info_area info_area";
    }
    .box {
      width: 100%;
    }
    .buttons_area {
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;

      button {
        margin: 0;
        width: 80%;
      }
    }
    .info_area {
      div {
        padding-top: 5px;
        p {
          &:nth-child(1) {
            width: 60%;
          }
          &:nth-child(2) {
            width: auto;
          }
        }
      }
    }
  }
}
</style>
