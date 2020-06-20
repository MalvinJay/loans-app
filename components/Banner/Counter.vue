<template>
  <div class="counter grid justify-center">
    <div class="l-s">
      <p class="text-md">
        Funding Ranging From
      </p>
      <p class="text-center font-normal text-xl">
        GHC250-GHC5,000,000
      </p>
    </div>
    <div class="m-s">
      <p class="text-md">
        Apply Online In
      </p>
      <p class="text-center font-normal text-xl">
        20 Minutes
      </p>
    </div>
    <div class="r-s">
      <p class="text-md">
        Get Funds Approved In
      </p>
      <p class="text-center font-normal text-xl">
        2 weeks
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.counter {
  background-color: $color-mild-pink;
  padding: 37px 10%;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
}
.m-s {
  border-right: 1px solid $color-primary;
  border-left: 1px solid $color-primary;
}
p {
  &:last-child {
    color: $color-secondary;
    font-weight: 600;
  }
}
@include for-phone-only {
  .counter {
    grid-template-columns: 100%;
    grid-gap: 3rem;
  }
  .m-s {
    border: none;
  }
}
</style>
