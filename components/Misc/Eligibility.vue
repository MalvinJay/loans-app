<template>
  <div class="py-20 eligibility px-5">
    <h1 class="text-center text-4xl text-white font-extrabold">
      Am I Eligible?
    </h1>
    <p class="text-xl font-semibold text-center text-white mb-16">
      All Ghanaian Micro, Small and Medium-sized Enterprises (MSMEs) that qualify
      are encouraged to apply for the Emergency Relief Funding Programme.
    </p>
    <div class="descr flex justify-center">
      <div class="l-t flex">
        <img src="@/assets/img/ellipse-check.png" alt>
        <div class="t-s text-white">
          <p>You are a Ghanaian Business or Enterprise.</p>
        </div>
      </div>
      <div class="r-t flex">
        <img src="@/assets/img/ellipse-check.png" alt>
        <div class="t-s text-white">
          <p>
            You are a Female, a Young Person between the ages of
            18 – 35 and a Person with Disabilities
          </p>
        </div>
      </div>
    </div>
    <div class="descr flex justify-center mt-16">
      <div class="l-b flex">
        <img src="@/assets/img/ellipse-check.png" alt>
        <div class="t-s text-white">
          <p>
            You operate in these industries below, Agri and Agro-Businesses
            Healthcare and Pharmaceuticals, Textile and Garments, Commerce
            and Trade, Manufacturing, Tourism and Hospitality, Education,
            Services, Water and Sanitation and PPEs, Food and Beverages,
            Technology and the Creative Industry.
          </p>
        </div>
      </div>
      <div class="r-b flex">
        <img src="@/assets/img/ellipse-check.png" alt>
        <div class="t-s text-white">
          <p>You are a Start-up with less than 2 years of operation.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.eligibility {
  background: linear-gradient(90deg, #6a1b9a 0%, #9b51e0 100%);
  height: 700px;
}
.descr {
  width: 100%;
  column-gap: 10%;
  & > div {
    width: 30%;
  }
  img {
    height: 52px;
    margin-right: 58px;
  }
}
@include for-tablet-portrait-only {
  .descr {
    & > div {
      width: 45%;
      img {
        height: 35px;
        width: 35px;
        margin-right: 1rem;
      }
    }
  }
}
@include for-tablet-landscape-only {
  .descr {
    & > div {
      width: 40%;
    }
  }
}
@include for-phone-only {
  .eligibility {
    padding: 2.54rem;
    height: auto;
  }
  .descr {
    flex-direction: column;
    & > div {
      flex-direction: column;
      width: 100%;
      img {
        height: 30px;
        width: 30px;
        margin: 45px 0 16px 0;
      }
    }
  }
  .descr.mt-16 {
    margin-top: 0px;
  }
}
</style>
