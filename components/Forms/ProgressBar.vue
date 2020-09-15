<template>
  <div class="progress">
    <div class="summary text-white flex">
      <div class="flex mr-16">
        <p class="text-xl table">
          GHS {{ value || '0' }}
          <span class="table-cell text-sm">Repayment Made</span>
        </p>
      </div>
      <div class="flex">
        <p class="text-xl table">
          GHS {{ max - value || '0' }}
          <span class="table-cell text-sm">Repayment Left</span>
        </p>
      </div>
    </div>
    <progress id="file" :value="value" :max="max">
      32%
    </progress>
    <div class="vals text-white">
      <p class="first">
        0
      </p>
      <p class="value" :style="{marginLeft: current + '%'}">
        {{ value }}
      </p>
      <p class="last">
        {{ max || '0' }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
      default: 30000
    },
    max: {
      type: Number,
      required: true,
      default: 50000
    }
  },
  computed: {
    current () {
      return ((this.value / this.max) * 100).toString()
    }
  }
}
</script>
<style lang="scss" scoped>
.progress {
  background: linear-gradient(
    90deg,
    rgba(13, 35, 125, 0.973) 0%,
    rgba(13, 35, 125, 0.773) 100%
  );
  padding: 2rem 1.25rem;
  border-radius: 5px;
}
progress {
  height: 1.75rem;
  width: 100%;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 9999px;
  border: 1px solid white;
}

// chrome
progress::-webkit-progress-bar {
  border-radius: 9999px;
  border: 1px solid white;
  background: rgba(255, 0, 0, 0);
}

// chrome
progress::-webkit-progress-value {
  background-color: white;
  border-radius: 9999px;
}

// firefox
progress::-moz-progress-bar {
  background-color: white;
  border-radius: 9999px;
}
.vals {
  position: relative;
  .first {
    text-align: start;
    display: inline;
  }
  .last {
    text-align: end;
    float: right;
  }
  .value {
    position: absolute;
    left: 0;
    display: inline;
  }
}
.summary {
  p {
    font-size: 2.81rem;
    span {
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
