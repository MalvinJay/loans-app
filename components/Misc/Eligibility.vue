<template>
  <div class="py-20 eligibility px-8 md:px-40 text-white">
    <div class="mb-12">
      <p class="text-center text-4xl text-white font-extrabold">
        About the Programme
      </p>
    </div>
    <div class="">
      <p class="md:text-2xl">
        The COVID-19 pandemic has drastically slowed economic activities for Micro, Small and Medium Enterprises (MSMEs) in many ways including:
      </p>
      <div class="points">
        <div class="text-xl flex py-1">
          <img src="@/assets/img/linkshows.svg" class="w-6 h-6 pr-2" alt="">
          <div>Production and supply chain disruptions, shortages and delays</div>
        </div>
        <div class="text-xl flex py-1">
          <img src="@/assets/img/linkshows.svg" class="w-6 h-6 pr-2" alt="">
          <div>Reduced consumer demand for products and services</div>
        </div>
        <div class="text-xl flex py-1">
          <img src="@/assets/img/linkshows.svg" class="w-6 h-6 pr-2" alt="">
          <div>Reduced capital and investment flows</div>
        </div>
        <div class="text-xl flex py-1">
          <img src="@/assets/img/linkshows.svg" class="w-6 h-6 pr-2" alt="">
          <div>Labor shortages due to social distancing regulations</div>
        </div>
      </div>
    </div>
    <p class="mt-10 md:text-2xl pb-4">
      The NBSSI Mastercard Foundation Recovery and Resilience Program for MSMEs has been set up to provide financial and business advisory support to MSMEs and start-ups weather the economic downturn caused by the COVID-19 pandemic. Particularly, the Programme will focus on:
    </p>
    <div class="points sec">
      <div class="text-xl flex py-1">
        <img src="@/assets/img/linkshows.svg" class="w-6 h-6 pr-2" alt="">
        <div>MSMEs who need support to survive the COVID-19 pandemic</div>
      </div>
      <div class="text-xl flex py-1">
        <img src="@/assets/img/linkshows.svg" class="w-6 h-6 pr-2" alt="">
        <div>Businesses in growth sectors where the employment of young people, especially young women, will be negatively impacted as a result of business operation disruptions, supply chain challenges, liquidity shortages, declining sales and profits, and business closures</div>
      </div>
      <div class="text-xl flex py-1">
        <img src="@/assets/img/linkshows.svg" class="w-6 h-6 pr-2" alt="">
        <div>Businesses providing services that will be in demand during the pandemic and that have the potential to grow and positively impact communities affected by COVID-19</div>
      </div>
      <div class="text-xl flex py-1">
        <img src="@/assets/img/linkshows.svg" class="w-6 h-6 pr-2" alt="">
        <div>Businesses that will focus on digitization to support MSMEs</div>
      </div>
    </div>
  </div>
  <!-- <p class="text-xl font-semibold text-center text-white mb-16">
      All Ghanaian Micro, Small and Medium-sized Enterprises (MSMEs) that qualify
      are encouraged to apply for the Emergency Relief Funding Programme.
    </p> -->
  <!-- <div class="descr flex justify-center">
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
  </div> -->
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.eligibility {
  background: linear-gradient(90deg, #0d247d 0%, #9b51e0 100%);
  // height: 700px;
}

.points {
  margin: 1rem auto;
  text-align: left;
  ol {
    list-style-type: none;
    // list-style-image: url('../../assets/img/linkshows.svg');
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
    // height: auto;
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
