<template>
  <div>
    <section id="business-tips" class="py-40 px-40">
      <p class="text-center text-4xl font-medium mt-5">
        COVID-19 Business Tips
      </p>
      <div class="w-full grid grid-cols-2 gap-24 mt-32 tips">
        <div>
          <div class="icon">
            <img src="@/assets/img/delivery.png" alt="">
          </div>
          <div class="mt-5">
            <p class="text-2xl font-medium">
              Create and Offer a delivery service
            </p>
            <p>
              Ask employees to provide delivery services as part of their function. Offer a mode of transport to them if the distance is great
            </p>
          </div>
        </div>
        <div>
          <div class="icon">
            <img src="@/assets/img/credit-card.png" alt="">
          </div>
          <div class="mt-5">
            <p class="text-2xl font-medium">
              Accept all forms of payments to boost sales
            </p>
            <p>
              Register for mobile money and other forms of electronic and online payments
            </p>
          </div>
        </div>
        <div>
          <div class="icon">
            <img src="@/assets/img/digital.png" alt="">
          </div>
          <div class="mt-5">
            <p class="text-2xl font-medium">
              Go digital with your business and accept online payments
            </p>
            <p>
              Your clients may already be online, either on Facebook, Instagram or Twitter or Pinterest. It’s essential to increase visibility by selecting a channel where you can attract new clients. One way to start this process is to do a quick survey among your top 5 clients. Get interactive with customers virtually using tools such as Wechat to drive sales.
            </p>
          </div>
        </div>
        <div>
          <div class="icon">
            <img src="@/assets/img/messaging.png" alt="">
          </div>
          <div class="mt-5">
            <p class="text-2xl font-medium">
              Communicate with your clients, staff  and suppliers
            </p>
            <p>
              Prepare a communication plan: you will need to regularly communicate with your clients about how you are prioritizing and serving them safely. Include a message reassuring them of the safety measure you are taking for your employees and business. You can post this message on your website and social media pages. If you have employees, you may want to prepare a separate internal message to share with them
            </p>
          </div>
        </div>
        <div>
          <div class="icon">
            <img src="@/assets/img/fast_selling.png" alt="">
          </div>
          <div class="mt-5">
            <p class="text-2xl font-medium">
              Focus on fast selling products
            </p>
            <p>
              Identify products and services within multiple lines that generate the most cash and channel more resources to selected products or services.
            </p>
          </div>
        </div>
        <div>
          <div class="icon">
            <img src="@/assets/img/lev_infrastructure.png" alt="">
          </div>
          <div class="mt-5">
            <p class="text-2xl font-medium">
              Leveraging on existing infrastructure but offering different products and services.
            </p>
            <p>
              Consider business opportunities that allow your business to deploy existing infrastructure to produce different products or offer new services.
            </p>
          </div>
        </div>
        <div>
          <div class="icon">
            <img src="@/assets/img/networking.png" alt="">
          </div>
          <div class="mt-5">
            <p class="text-2xl font-medium">
              Networking opportunities
            </p>
            <p>
              Search for opportunities to join business or trade groups for increased visibility and use webinars and email marketing to reach your clients.
            </p>
          </div>
        </div>
        <div>
          <div class="icon">
            <img src="@/assets/img/job_security.png" alt="">
          </div>
          <div class="mt-5">
            <p class="text-2xl font-medium">
              Ensure job security and boost employee morale
            </p>
            <p>
              Digitization should augment not replace people. Determine ways of integrating technological tools into work systems to improve productivity. Explore non-monetary motivational strategies for employees.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-32 px-40">
      <p class="text-center text-4xl font-medium mt-5">
        Curated Resources
      </p>
      <div class="grid col-gap-12 row-gap-24 grid-cols-2 mt-32 curated">
        <div class="flex gap-5">
          <div class="lettering">
            <div class="rounded-full h-10 w-10 flex items-center justify-center">
              1
            </div>
          </div>
          <div class="links">
            <p class="text-2xl font-medium">
              Facebook Resources
            </p>
            <a href="https://www.facebook.com/business/resource" class="text-blue-600">
              https://www.facebook.com/business/resource
            </a>
          </div>
        </div>
        <div class="flex gap-5">
          <div class="lettering">
            <div class="rounded-full h-10 w-10 flex items-center justify-center">
              2
            </div>
          </div>
          <div class="links">
            <p class="text-2xl font-medium">
              Entrepreneurship: Mental Health, the Key to Founder Success
            </p>
            <a href="https://medium.com/the-gps/entrepreneurship-mental-health-the-key-to-founder-success-923b5769ddad" class="text-blue-600">
              https://medium.com/the-gps/entrepreneurship-...
            </a>
          </div>
        </div>
        <div class="flex gap-5">
          <div class="lettering">
            <div class="rounded-full h-10 w-10 flex items-center justify-center">
              3
            </div>
          </div>
          <div class="links">
            <p class="text-2xl font-medium">
              Google quick help videos
            </p>
            <a href="https://www.youtube.com/playlist?list=PLioTR_jPKuQ4ijJKksNBOYqDxYViI4CV9" class="text-blue-600">
              https://www.youtube.com/playlist?list=PLioTR_...
            </a>
          </div>
        </div>
        <div class="flex gap-5">
          <div class="lettering">
            <div class="rounded-full h-10 w-10 flex items-center justify-center">
              4
            </div>
          </div>
          <div class="links">
            <p class="text-2xl font-medium">
              Digital skills with Google
            </p>
            <a href="https://www.youtube.com/playlist?list=PLioTR_jPKuQ4ijJKksNBOYqDxYViI4CV9" class="text-blue-600">
              https://applieddigitalskills.withgoogle.com/en/dig..
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  layout: 'default',
  data () {
    return {
      image_url: '/icon.png',
      url: 'https://nbssimastercard-staging.wl.r.appspot.com/apply',
      title: 'Business Tips',
      description: 'Business Tips to help you through and adapt to the our new environment'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'title', content: this.title },
        { hid: 'description', name: 'description', content: this.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.url },
        { property: 'og:title', content: this.title },
        { property: 'og:description', content: this.description },
        { property: 'og:image', content: this.image_url },
        { property: 'twitter:url', content: this.url },
        { property: 'twitter:title', content: this.title },
        { property: 'twitter:description', content: this.description },
        { property: 'twitter:image', content: this.image_url }

      ]
    }
  }
}
</script>
<style lang="scss" scoped>
#business-tips {
  background-color: $color-white-alt;
}
.lettering {
  width: 3rem;
  &>div {
    border: 1px solid;
  }
}
.links {
  word-break: break-word;
  a {
    color: $color-blue;
  }
}

@include for-tablet-landscape-only {
  section {
    padding-left: 5rem;
    padding-right: 5rem;
  }
}
@include for-tablet-portrait-only {
  section {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  img {
    width:2rem;
  }
  .curated {
    column-gap: 1rem;
  }
}
@include for-phone-only {
  section {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .tips {
    grid-template-columns: repeat(1, 1fr);
  }
  img {
    width:2rem;
  }
  .curated {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
