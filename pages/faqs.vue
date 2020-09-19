<template>
  <section class="py-40 px-32">
    <p class="text-center text-2xl">
      Mastercard Foundation / National Board for Small Scale Industries: COVID-19 Relief Fund
    </p>
    <p class="text-center text-4xl font-medium mt-5">
      Frequently Asked Questions
    </p>
    <div class="mt-20">
      <Accordion>
        <template v-slot:header>
          1. Who is eligible to apply for funding?
        </template>
        <template v-slot:body>
          All Ghanaian-owned businesses, registered or unregistered are eligible to apply for funding.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          2. Can I apply if I am not Ghanaian?
        </template>
        <template v-slot:body>
          Non-Ghanaians are not qualified to apply. However, if your company has a Ghanaian shareholder with over 50% ownership of the company, it may apply.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          3. Can I apply if I have no audited financial statements?
        </template>
        <template v-slot:body>
          Yes. You will be required to provide basic information on your business such as total revenue/sales and total expenses, but do not need to have documents prepared by an accountant.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          4. When can businesses apply?
        </template>
        <template v-slot:body>
          Businesses can start applying from September 16th 2020 and will continue for 1 month or until the funds run out.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          5. When will the programme application window be closed?
        </template>
        <template v-slot:body>
          The final application closing date will depend on the number of applicants and amounts requested. We expect all financing requests to be disbursed, and the application process to be closed by the end of October 2020 or when the funds run out.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          6. Can I apply for funding twice?
        </template>
        <template v-slot:body>
          No. You cannot apply twice.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          7. Do I need collateral/security to apply?
        </template>
        <template v-slot:body>
          No. You do not need any collateral to apply.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          8. Must I have a TIN to apply?
        </template>
        <template v-slot:body>
          Businesses and Individuals must have a Tax Identification Number (TIN) as mandated by law. Visit<a href="https://gra.gov.gh/tin" target="_blank" class="text-blue-600 hover:underline"> https://gra.gov.gh/tin </a>to apply for a TIN or visit the nearest Ghana Revenue Authority office, if you do not already have a TIN.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          9. How can I apply for the fund?
        </template>
        <template v-slot:body>
          There are several avenues to apply for the fund: visit our website: <a href="https://nbssi.gov.gh/recoveryprogram" target="_blank" class="text-blue-600 hover:underline">nbssi.gov.gh/recoveryprogram</a>; or call the NBSSI Helpline on <b>030 274 7777</b> ; or visit the nearest NBSSI district office (Business Advisory Centre) for help.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          10. Which documents do I need to provide with my application?
        </template>
        <template v-slot:body>
          The only document required during the application process is a copy of your ID. However, you will also need a Taxpayer Identification Number (<b>TIN</b>). If your business is a small or medium sized enterprise you may also be asked to provide a SSNIT Employer Registration Number, and additional financial information on your business.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          11. How much (amount) am I eligible to apply for?
        </template>
        <template v-slot:body>
          The amount for which a business is eligible will depend on its size and how much revenue it generates. Businesses will be categorized as Micro, Small, Medium Enterprise or a Start-Up.
          <table class="w-full">
            <thead>
              <tr class="text-left">
                <th>
                  Entity
                </th>
                <th>Number of Employees</th>
                <th>
                  Annual Revenue Range <br>
                  <span>
                    (GHS)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  LOWER MICRO
                </td>
                <td>
                  1-5
                </td>
                <td>
                  0 – 20,000
                </td>
              </tr>
              <tr>
                <td>
                  UPPER MICRO
                </td>
                <td>
                  1-5
                </td>
                <td>
                  25,001 - 135,000
                </td>
              </tr>
              <tr>
                <td>
                  LOWER SMALL
                </td>
                <td>
                  6-16
                </td>
                <td>
                  135,001 – 1,500,000
                </td>
              </tr>
              <tr>
                <td>
                  UPPER SMALL
                </td>
                <td>
                  17-29
                </td>
                <td>
                  1,500,001 – 3,000,000
                </td>
              </tr>
              <tr>
                <td>
                  MEDIUM
                </td>
                <td>
                  30 - 99
                </td>
                <td>
                  3,000,001 – 5,000,000
                </td>
              </tr>
              <tr>
                <td><div class="pt-4" /></td>
                <td>
                  <div class="pt-4 font-bold">
                    Years in Business
                  </div>
                </td>
                <td><div class="pt-4" /></td>
                <td><div class="pt-4 " /></td>
              </tr>
              <tr class="font-medium">
                <td>
                  START-UPS
                </td>
                <td>
                  0 - 2
                </td>
                <td>
                  0 – 500,000
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          12. Can applicants stop and resume application at any time?
        </template>
        <template v-slot:body>
          You can only SAVE an application after you enter in your Personal Information and are on the Business Information page. This is so we can capture your phone number to use as verification of your identity. <b>Note: Please use a Genuine Phone Number. As doing so will allow you to log into the <nuxt-link to="/app/registration/login" class="text-blue-600 hover:underline">Client Portal</nuxt-link></b>.
          You can save your application and resume at any time you are ready to continue by visiting<a href="https://nbssi.gov.gh/recoveryprogram" target="_blank" class="text-blue-600 hover:underline"> https://nbssi.gov.gh/recoveryprogram </a> and clicking on SIGN IN. You will need to use the phone number you used when you started the application process to sign in.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          13. How do I check my application status?
        </template>
        <template v-slot:body>
          The application system has a secure Client Portal that allows applicants to view the status of their applications. Access to the Client Portal is via <a href="https://ghrecoveryprogram.com/app/registration/login" target="_blank" class="text-blue-600 hover:underline">https://ghrecoveryprogram.com/app/registration/login</a>
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          14. How long does the approval & disbursement process take?
        </template>
        <template v-slot:body>
          The approval and disbursement process should take four weeks but may extend if further procedures are needed to process the application.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          15. How will I be notified if my application is approved?
        </template>
        <template v-slot:body>
          Applicants will be notified via SMS, email or a phone call. Please don’t pay money to anyone while you wait to hear from us.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          16. Do I have to pay any money for NBSSI/Mastercard Foundation COVID-19 Resilience and Recovery Program?
        </template>
        <template v-slot:body>
          No. NBSSI does not charge any application fees for this Program. However, if your loan request is approved, you will pay interest and repay the principal amount according to the terms of the loan agreement.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          17. Can two or more businesses with the same owner apply for funding from this fund?
        </template>
        <template v-slot:body>
          No. If two or more businesses have the same owner only one of those businesses may apply under this fund.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          18. Can I access a loan to start a new business venture?
        </template>
        <template v-slot:body>
          No. This fund seeks to provide relief to businesses that have been in operation for at least 6 months before date of application.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          19. Is this fund the same as the Government of Ghana CAP Business Support Scheme?
        </template>
        <template v-slot:body>
          No. This program is funded by the Mastercard Foundation.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          20. Will a business be eligible for this fund if they have already accessed funding from the Government of Ghana CAP Business Support Scheme?
        </template>
        <template v-slot:body>
          No, a beneficiary to the Government of Ghana CAP Business Support Scheme (i.e. a business that has received funds from that program) cannot apply to for funding from the NBSSI Mastercard Foundation COVID-19 Resilience and Recovery Program.
        </template>
      </Accordion>
      <!-- <Accordion>
        <template v-slot:header>
          21. Can I apply twice?
        </template>
        <template v-slot:body>
          No. You cannot apply twice.
        </template>
      </Accordion> -->
      <Accordion>
        <template v-slot:header>
          21. How do I make an official complaint about my problem?
        </template>
        <template v-slot:body>
          If you have any issue with the system or process, please visit the Client Portal via this website -  <a href="https://ghrecoveryprogram.com/app/registration/login" target="_blank" class="text-blue-600 hover:underline">https://ghrecoveryprogram.com/app/registration/login</a>
          and Sign In into your account. Once you sign into your account you can send a message to the Customer Support team by clicking on Messages button. You can also call the Helpline at <b>0302 747 775</b> if you would like to speak to someone.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          22. Can I apply for funding if I am not a part of an association?
        </template>
        <template v-slot:body>
          Yes. You do not have to be a member of an association to apply.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          23. Can associations apply on behalf of their members?
        </template>
        <template v-slot:body>
          No. However, we encourage associations to inform their members about this fund.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          24. Where can I register as a client of NBSSI?
        </template>
        <template v-slot:body>
          You can register as a client of NBSSI at our Business Advisory Centres (BACs) located within the districts across Ghana.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          25. How much do I need to pay for the NBSSI Client registration?
        </template>
        <template v-slot:body>
          Note, effective 24th May 2020, all NBSSI client registration fees have been waived to help lessen the burden on MSMEs affected by the COVID-19 Pandemic. For more enquiries, visit the Help Desk at <a href="https://nbssi.gov.gh/become-nbssi-client/" target="_blank" class="text-blue-600 hover:underline">https://nbssi.gov.gh/become-nbssi-client/</a> or call the Call Centre Helpline on 0302 747 775 or visit the nearest NBSSI Business Advisory Centre.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          26. How can I contact NBSSI for further details?
        </template>
        <template v-slot:body>
          Applicants seeking further clarification can call the NBSSI Call Centre on <b>0302 747 775</b>.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          27. Do I need to have a bank account or an account with the Program's financial partners before I can apply?
        </template>
        <template v-slot:body>
          No, you do not need to have a bank account or an account with the Program's financial partners to apply for funds.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          28. Do I need to open an account with Opportunity International or the rural/community banks before I submit my application?
        </template>
        <template v-slot:body>
          No you do not need to have an account with a partner institution to submit an application.
        </template>
      </Accordion>
    </div>
    <div class="mt-24 font-semibold">
      CAUTION: APPLICATION FOR THE MASTERCARD FOUNDATION COVID-19 RESILIENCE AND RECOVERY PROGRAM SUPPORT SCHEME IS FREE. APPLICANTS ARE TO BE MINDFUL OF FRAUDSTERS PURPORTING TO ASSIST APPLICANTS FOR A FEE.
    </div>
  </section>
</template>
<script>
import Accordion from '@/components/Misc/Accordion-alt.vue'
export default {
  layout: 'default',
  components: {
    Accordion
  },
  data () {
    return {
      image_url: '/icon.png',
      url: 'https://nbssi-post-deploy.wl.r.appspot.com/apply',
      title: 'FAQs',
      description: 'Frequently Asked Questions'
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
        { property: 'twitter:title', content: 'Covid-19 Emergency Relief Fund' },
        { property: 'twitter:description', content: this.description },
        { property: 'twitter:image', content: this.image_url }

      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.text-blue-600 {
    --text-opacity: 1;
    color: #3182ce!important;
    color: rgba(49, 130, 206, var(--text-opacity));
}
section {
  background-color: $color-white-alt;
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
}
@include for-phone-only {
  section {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
