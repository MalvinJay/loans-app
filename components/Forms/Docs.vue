<template>
  <div v-show="show" class="grid docs border-blue-100">
    <div @drop.prevent="addFile" @dragover.prevent>
      <label class="block text-gray-900 text-sm font-bold mb-2 mt-12">Application ID</label>
      <div class="d-i border border-gray-900 py-12">
        <div class="img">
          <img src="@/assets/img/docs.png" alt>
        </div>
        <div class="my-6">
          <p class="text-center text-sm">
            Drag & Drop file here
          </p>
        </div>
        <div class="u-b">
          <label>
            <input type="file">
            <span>Browse Files</span>
          </label>
        </div>
      </div>
    </div>
    <div>
      <label class="block text-gray-900 text-sm font-bold mb-2 mt-12">Proof of PAYE Payments (last 3 months)</label>
      <div class="d-i border border-gray-900 py-12">
        <div class="img">
          <img src="@/assets/img/docs.png" alt>
        </div>
        <div class="my-6">
          <p class="text-center text-sm">
            Drag & Drop file here
          </p>
        </div>
        <div class="u-b">
          <label>
            <input type="file">
            <span>Browse Files</span>
          </label>
        </div>
      </div>
    </div>
    <div>
      <label class="block text-gray-900 text-sm font-bold mb-2 mt-12">SSNIT Statement (2019)</label>
      <div class="d-i border border-gray-900 py-12">
        <div class="img">
          <img src="@/assets/img/docs.png" alt>
        </div>
        <div class="my-6">
          <p class="text-center text-sm">
            Drag & Drop file here
          </p>
        </div>
        <div class="u-b">
          <label>
            <input type="file">
            <span>Browse Files</span>
          </label>
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
      file: null
    }
  },
  methods: {
    addFile (e) {
      this.file = e.dataTransfer.files[0]
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
