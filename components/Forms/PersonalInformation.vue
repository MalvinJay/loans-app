<template>
  <div v-show="show">
    <div class="grid form-b py-20">
      <div class="mb-10">
        <Input name="First Name" />
      </div>
      <div class="mb-10">
        <Input name="Last Name" />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold" for="username">Gender</label>
        <div class="flex justify-start">
          <Checkbox>Male</Checkbox>
          <Checkbox>Female</Checkbox>
        </div>
      </div>
      <div class="mb-12">
        <Input name="Email Address" />
      </div>
      <div>
        <label
          class="block text-gray-700 text-sm font-normal mb-2 font-bold"
          for="username"
        >Present Address</label>
      </div>
      <div />
      <div class="mb-12">
        <div class="mb-6">
          <Input placeholder="Street" />
        </div>
        <div>
          <Select />
        </div>
      </div>
      <div class="mb-12">
        <div class="mb-6">
          <Input placeholder="Town" />
        </div>
        <div>
          <Select />
        </div>
      </div>
      <div class="mb-12">
        <Input name="Phone Number" />
      </div>
      <div class="mb-12">
        <Input name="Nearest Digital Address Code" placeholder="GA-xxx-xxxx" />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2" for="username">Date of Birth</label>
        <input type="date" name>
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2" for="username">Residence Status</label>
        <Select />
      </div>
      <div class="mb-12">
        <Input name="Applicant's ID (passport, driver's license, Voters Id)" />
      </div>
    </div>
  </div>
</template>
<script>
import Input from './Input'
import Checkbox from './Checkbox'
import Select from './Select'
export default {
  components: {
    Input,
    Checkbox,
    Select
  },
  props: {
    active: Boolean
  },
  data () {
    return {
      show: this.active
    }
  }
}
</script>
<style lang="scss" scoped>
.form-b {
  grid-template-columns: repeat(2, 1fr);
  width: 73%;
  column-gap: 3rem;
  .ac-dc {
    > label {
      margin-right: 30px;
    }
  }
  .i-t-b {
    width: 469px;
    border-radius: 5px;
    border: 1px solid $color-secondary;
    color: $color-secondary;
    height: 50px;
    column-gap: 35px;
  }
}
@include for-phone-only {
  .grid {
    grid-template-columns: 100%;
  }
  .form-b {
    width: 100%;
  }
  input[type=date] {
    width: 100%;
  }
}
@include for-tablet-portrait-only {
  .form-b {
    width: 100%;
  }
  input[type=date] {
    width: 100%;
  }
}
@include for-tablet-landscape-only {
  .form-b {
    width: 100%;
  }
  input[type=date] {
    width: 100%;
  }
}
</style>
