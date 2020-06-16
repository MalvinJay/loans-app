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
          All Ghanaian businesses, registered or unregistered are eligible to apply for funding
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          2. When does the period of application commence?
        </template>
        <template v-slot:body>
          The period of application commences in 1st week of July 2020
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          3. When will the programme application window be closed?
        </template>
        <template v-slot:body>
          The programme closing will depend on the number of applicants and amounts requested, but we expect all financing requests to be disbursed, and the application process to be closed by the end of September 2020
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          4. Can applicants stop and resume application at any time?
        </template>
        <template v-slot:body>
          YES! You can save your application and resume at any time you areready to continue.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          5. Is the online platform the sole means of application?
        </template>
        <template v-slot:body>
          YES! It is the only place you can apply at the moment.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          6. How long does the approval & disbursement process take?
        </template>
        <template v-slot:body>
          The approval and disbursement process should take two weeks but may extend further if there are any irregularities with an application
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          7. I am not Ghanaian; do I qualify to apply?
        </template>
        <template v-slot:body>
          Non-Ghanaian sole proprietors and unregistered companies are notqualified to apply. However, if your company has a Ghanaian shareholder with a 51% share of the company, the company may apply
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          8. How much (amount) am I eligible to apply for?
        </template>
        <template v-slot:body>
          Amount eligibility will depend on the size of your business and how much revenue it generates. Businesses can be categorized as Micro, Small, Medium Enterprise or a Start-Up
          <div class="w-full text-left">
            <table class="w-full">
              <thead>
                <tr>
                  <th>
                    Entity
                  </th>
                  <th>Number of Employees</th>
                  <th>
                    Revenue Range
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Micro
                  </td>
                  <td>
                    1-5
                  </td>
                  <td>
                    0 – 145,000
                  </td>
                </tr>
                <tr>
                  <td>
                    LOWER SMALL
                  </td>
                  <td>
                    6-29
                  </td>
                  <td>
                    145,001 – 250,000
                  </td>
                </tr>
                <tr>
                  <td>
                    UPPER SMALL
                  </td>
                  <td>
                    6-29
                  </td>
                  <td>
                    250,001 – 1,000,000
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
                    1,000,001 – 5,000,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          9. What interest rates will be charged for the funds disbursed?
        </template>
        <template v-slot:body>
          Interest rates for this fund will not exceed 5% p.a.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          10. What is the loan repayment period?
        </template>
        <template v-slot:body>
          A borrower can have up to 1-year holiday during which they do not have to make repayments of the loan, but interest will be charged. The loan repayment period is 24 months, starting from the 13th month after disbursement. Early repayment is encouraged, provided business operations can support it.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          11. Does this fund give grants?
        </template>
        <template v-slot:body>
          Yes
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          12. Who is eligible for grant funding?
        </template>
        <template v-slot:body>
          All businesses in the micro and start-up categories are eligible for grants
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          13. Which documents do I need to provide in my application process?
        </template>
        <template v-slot:body>
          The only document required during the application process is a copy of your identification.  However, you will be required to provide  a Tax Payer Identification Number (TIN) for your business (corporate TIN starts with a C) or a personal TIN of the owner of the business if your business is a sole proprietorship or unregistered. If your business is a small or medium sized enterprise you may also be
          asked to provide a SSNIT Employer registration Number, and additional financial information on your business.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          14. Do I need collateral security to apply?
        </template>
        <template v-slot:body>
          NO!
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          15. Is this fund the same as the Government of Ghana CAP fund?
        </template>
        <template v-slot:body>
          NO!
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          16. Will a business be eligible for this fund if they have already accessed funding from the Government of Ghana (GoG) CAP fund?
        </template>
        <template v-slot:body>
          YES!
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          17. Which sectors are covered under this fund?
        </template>
        <template v-slot:body>
          All sectors, as outlined by the Government of Ghana, are covered under this fund. A full list can be found <a href="">HERE</a>
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          18. Can I apply if I have no formal system of record-keeping?
        </template>
        <template v-slot:body>
          YES! You will be required to provide basic information on your business such as total revenue/sales and total expenses but do not need to have documents prepared by an accountant
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          19. Can I apply if I do not have some of the required documents?
        </template>
        <template v-slot:body>
          YES!
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          20. Can I apply for funding from this fund twice?
        </template>
        <template v-slot:body>
          YES!
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          21. Can two or more businesses with the same owner apply for funding from this fund?
        </template>
        <template v-slot:body>
          NO! If two or more businesses have the same owner only one of those businesses can apply under this fund
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          22. Can I access a loan to start a new business venture?
        </template>
        <template v-slot:body>
          NO. This fund seeks to provide relief to business that have been in operation for at least 6 months before date of application.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          23. Can I apply for funding if I am not a part of my sector association?
        </template>
        <template v-slot:body>
          YES! You do not have to be a member of an association to apply.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          24. Can sector associations apply on behalf of their members?
        </template>
        <template v-slot:body>
          NO! However, we encourage sector associations to inform their members about this fund.
        </template>
      </Accordion>
    </div>
  </section>
</template>
<script>
import Accordion from '@/components/Misc/Accordion-alt.vue'
export default {
  layout: 'default',
  components: {
    Accordion
  }
}
</script>
<style lang="scss" scoped>
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
