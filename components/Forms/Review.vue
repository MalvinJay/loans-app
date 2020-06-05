<template>
  <div v-show="show">
    <div class="grid review grid-cols-2 gap-10 pt-5">
      <div class="card">
        <div class="mb-5">
          <p class="text-lg">
            Fund Details
          </p>
        </div>
        <div class="grid grid-cols-2 gap-5 text-sm">
          <p class="font-bold">
            Fund Amount
          </p>
          <p>GHC {{ general.requested_loan_amount }}</p>
          <p class="font-bold">
            Purpose of Fund
          </p>
          <p>{{ purpose }}</p>
          <p class="font-bold">
            Term
          </p>
          <p>N/A</p>
          <p class="font-bold">
            Fixing Period
          </p>
          <p>N/A</p>
        </div>
        <div class="mt-10">
          <p class="uppercase mt-5 edit cursor-pointer">
            EDIT
          </p>
        </div>
      </div>
      <div class="card">
        <div class="mb-5">
          <p class="text-lg">
            Personal Information
          </p>
        </div>
        <div class="grid grid-cols-2 gap-5 text-sm">
          <p class="font-bold">
            Full Name
          </p>
          <p>{{ general.first_name + " " + general.last_name }}</p>
          <p class="font-bold">
            Present Address
          </p>
          <p>{{ general.residential_address }}</p>
          <p class="font-bold">
            Phone Number
          </p>
          <p>{{ general.phone_number }}</p>
          <p class="font-bold">
            Email Address
          </p>
          <p>{{ general.primary_email }}</p>
        </div>
        <div class="mt-10">
          <p class="uppercase mt-5 edit cursor-pointer">
            EDIT
          </p>
        </div>
      </div>
      <div class="card">
        <div class="mb-5">
          <p class="text-lg">
            Business Information
          </p>
        </div>
        <div class="grid grid-cols-2 gap-5 text-sm">
          <p class="font-bold">
            Business Name
          </p>
          <p>{{ general.business_name }}</p>
          <p class="font-bold">
            Business Address
          </p>
          <p>{{ general.business_address }}</p>
          <p class="font-bold">
            Business Email
          </p>
          <p>{{ general.business_email }}</p>
          <p class="font-bold">
            Business Number
          </p>
          <p>{{ general.business_phone_number }}</p>
          <p class="font-bold">
            Years in Operation
          </p>
          <p>{{ general.years_in_business }}</p>
        </div>
        <div class="mt-10">
          <p class="uppercase mt-5 edit cursor-pointer">
            EDIT
          </p>
        </div>
      </div>
      <div class="card">
        <div class="mb-5">
          <p class="text-lg">
            Document Upload
          </p>
        </div>
        <div class="grid grid-cols-2 gap-5 text-sm">
          <p class="font-bold">
            Identity
          </p>
          <p>{{ general.id_file_name }}</p>
          <p class="font-bold">
            Income
          </p>
          <p>N/A</p>
          <p class="font-bold">
            Business Ownership
          </p>
          <p>N/A</p>
        </div>
        <div class="mt-10">
          <p class="uppercase mt-5 edit cursor-pointer">
            EDIT
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    active: Boolean
  },
  data () {
    return {
      show: this.active,
      // fundPurpose: null
      purpose: null
    }
  },
  computed: {
    general () {
      return this.$store.state.api.general
    },
    fundRoles () {
      return this.$store.getters['pages/fundRoles']
    }
  },
  watch: {
    show () {
      if (this.general !== null && this.fundRoles !== undefined) {
        const purpose = this.fundRoles.filter(item => item.val === parseInt(this.general.fund_purpose_id))[0]
        this.purpose = purpose.name
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.review {
  grid-template-columns: repeat(2, 1fr);
  width: 70%;
}
.card {
  padding: 20px;
  background-color: #fbfbfb;
}
.edit {
  color: $color-secondary;
  width: 50%;
}
@include for-phone-only {
  .review {
    grid-template-columns: 100%;
    width: 100%;
  }
}
@include for-tablet-portrait-only {
  .review {
    width: 100%;
  }
}
@include for-tablet-landscape-only {
  .review {
    width: 80%;
  }
}
</style>
