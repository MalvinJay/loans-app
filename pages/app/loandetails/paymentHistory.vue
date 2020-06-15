<template>
  <div>
    <div class="app">
      <div class="pt-10 mb-5">
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
export default {
  layout: 'appLayout'
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
</style>
