<template>
  <div>
    <div class="app">
      <div class="md:hidden pt-4 pb-2" @click="goBack">
        <img src="@/assets/img/go_back_b.svg" class="w-6 h-6"  alt="">
      </div>
      <div class="pt-2 pb-4 md:pt-10 mb-5">
        <p class="text-xl block font-semibold">
          Payment History
        </p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                Amount
              </th>
              <th>Paid At</th>
              <th>
                Paid With
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                100
              </td>
              <td>
                11 July 2020
              </td>
              <td>
                Mobile Payment (0203339949))
              </td>
            </tr>
            <tr>
              <td>
                100
              </td>
              <td>
                11 July 2020
              </td>
              <td>
                Mobile Payment (0203339949))
              </td>
            </tr>
            <tr>
              <td>
                100
              </td>
              <td>
                11 July 2020
              </td>
              <td>
                Mobile Payment (0203339949))
              </td>
            </tr>
            <tr>
              <td>
                100
              </td>
              <td>
                11 July 2020
              </td>
              <td>
                Mobile Payment (0203339949))
              </td>
            </tr>
            <tr>
              <td>
                100
              </td>
              <td>
                11 July 2020
              </td>
              <td>
                Mobile Payment (0203339949))
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '../../../event-bus'
export default {
  layout: 'appLayout',
  middleware: 'auth',
  data () {
    return {
    }
  },
  methods: {
    goback () {
      EventBus.$emit('goBack')
    }
  }
}
</script>
<style lang="scss" scoped>
.app {
  background-color: $color-white-alt;
  padding: 0 73px;
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
    th {
      padding: 14px 0;
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
