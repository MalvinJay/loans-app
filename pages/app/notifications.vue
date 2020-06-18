<template>
  <div>
    <div class="app">
      <div class="pt-10 mb-5 flex justify-between w-full">
        <p class="text-xl font-semibold">
          Notifications
        </p>
      </div>
      <div class="notifications">
        <h1 class="pb-4">
          00/00/00
        </h1>
        <p class="pb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit,
        </p>
        <p class="pb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit,
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'appLayout',
  middleware: 'auth'
}
</script>
<style lang="scss" scoped>
.app {
  background-color: $color-white-alt;
  padding: 0 73px;
  height: calc(100vh - 100px);
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
}
</style>
