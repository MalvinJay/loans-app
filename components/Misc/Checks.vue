<template>
  <div
    class="steps py-3"
    :class="{pending: status=='pending',
             success: status=='success', current: status=='current'}"
  >
    <div class="div flex">
      <div class="check mr-2">
        <img src="@/assets/img/check.png" alt>
        <p class="text-white text-sm">
          {{ step }}
        </p>
      </div>
      <div class="flex flex-col justify-center name mr-2">
        <p>{{ name }}</p>
      </div>
      <div v-if="!noline" class="flex flex-col justify-center name mr-2 l-c">
        <div class="line" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    noline: {
      type: Boolean,
      default: false,
      required: false
    },
    status: {
      type: String,
      required: false,
      default: 'pending'
    },
    name: {
      type: String,
      required: true
    },
    step: {
      type: Number,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>

.steps {
  width: 100%;
  .l-c {
    flex: 1;
  }
  .name {
    white-space: nowrap;
    font-size: 0.9rem;
  }
  .check {
      width: 32px;
      height: 32px;
      border-radius: 9999px;
      padding: 10px;
  }
  &.success {
    .line {
      border-bottom: 0.3px solid $color-green
    }
    .check {
      background-color: $color-green;
      img {
        height: 11px;
        width: 14px;
        display: block;
      }
      p {
        display: none;
      }
    }
    .name {
      color: $color-green;
    }
  }
  &.pending {
    .line {
      border-bottom: 0.3px solid $color-gray-alt
    }
    .check {
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: $color-gray-alt;
      img {
        display: none;
      }
      p {
        display: block;
      }
    }
    .name {
      color: $color-gray-alt;
    }
  }
  &.current {
    .line {
      border-bottom: 0.3px solid $color-secondary;
    }
    .check {
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: $color-secondary;
      img {
        display: none;
      }
      p {
        display: block;
      }
    }
    .name {
      color: $color-secondary;
    }
  }
}
@include for-tablet-portrait-only {
  .steps {
    .name {
      p {
        display: none;
      }
    }
    .check {
      margin-right: 0px;
    }
  }
}
@include for-phone-only {
  .steps {
    .name {
      p {
        display: none;
      }
    }
    .check {
      margin-right: 0px;
    }
  }
}
</style>
