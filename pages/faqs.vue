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
          Non-Ghanaians are not qualified to apply. However, if your company has a Ghanaianshareholder with over 50% ownership of the company, it may apply.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          3. Can I apply if I have no audited financial statements?
        </template>
        <template v-slot:body>
          Yes. You will be required to provide basic information on your business such as total revenue/sales and total expenses, but do not need to have documents prepared by an accountant
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          4. When can businesses apply?
        </template>
        <template v-slot:body>
          Businesses can start applying now. Applications were opened to the public in the 1stweek of July 2020 and will continue for 2 months or until the funds run out
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          5. When will the programme application window be closed?
        </template>
        <template v-slot:body>
          The application closing date will depend on the number of applicants and amounts requested, but we expect all financing requests to be disbursed, and the application process to be closed by the end of September 2020
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
          Yes. Businesses must have a Tax Identification Number (TIN) as mandated by law. Visit <a href="https://gra.gov.gh/tin/get-a-in/">https://gra.gov.gh/tin/get-a-in/</a> to apply for a TIN or visit the nearest Ghana Revenue Authority office, if you do not already have a TIN          <div class="w-full text-left" />
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          9. How can I apply for the fund?
        </template>
        <template v-slot:body>
          There are several avenues to apply for the fund: visit our website: www.mcfrelief.nbssi.gov.gh; or call the NBSSI Helpline on 030 274 7777; or visit the nearest NBSSI district office (Business Advisory Centre) for help.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          10. Which documents do I need to provide with my application?
        </template>
        <template v-slot:body>
          The only document required during the application process is a copy of your ID. However, you will also need a Tax Payer Identification Number (TIN). If your businessis a small or medium sized enterprise you may also be asked to provide a SSNIT Employer Registration Number, and additional financial information on your business.
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
                  Revenue Range <br>
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
            </tbody>
          </table>
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          12. Can applicants stop and resume application at any time?
        </template>
        <template v-slot:body>
          Yes. You can save your application and resume at any time you are ready to continue by visiting <a href="https://www.mcfrelief.nbssi.gov.gh">https://www.mcfrelief.nbssi.gov.gh</a> and clicking on SIGN IN. You will need to use the phone number you used when  you started the application process to sign in.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          13. How do I check my application status?
        </template>
        <template v-slot:body>
          The application system has a secure Client Portal that allows applicants to view the status of their applications. Access to the Client Portal is via <a href="https://www.mcfrelief.nbssi.gov.gh">https://www.mcfrelief.nbssi.gov.gh</a>
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          14. How long does the approval & disbursement process take?
        </template>
        <template v-slot:body>
          The approval and disbursement process should take two weeks but may extend further if there are any irregularities with an application.
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
          No. NBSSI does not charge any fees for this program.
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
          No. This fund seeks to provide relief to business that have been in operation for at least 6 months before date of application.
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
          Yes. A beneficiary of the Government of Ghana CAP Business Support Scheme can apply for funding from the NBSSI Mastercard Foundation COVID-19 Resilience and Recovery Program.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          21. Can I apply twice?
        </template>
        <template v-slot:body>
          No. You cannot apply twice.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          22. How do I make an official complaint about my problem?
        </template>
        <template v-slot:body>
          If you have any issue with the system or process, please visit the Client Portal via this website -  https://www.mcfrelief.nbssi.gov.gh
          and Sign In into your account. Once you sign into your account you can send a message to the Customer Support team by clicking on Messages button. You can also call the Helpline at 0302 747 777 if you would like to speak to someone.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          23. Can I apply for funding if I am not a part of an association?
        </template>
        <template v-slot:body>
          Yes. You do not have to be a member of an association to apply.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          24. Can associations apply on behalf of their members?
        </template>
        <template v-slot:body>
          No. However, we encourage associations to inform their members about this fund.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          25. Where can I register as a client of NBSSI?
        </template>
        <template v-slot:body>
          You can register as a client of NBSSI at our Business Advisory Centres (BACs) located within the districts across Ghana.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          26. How much do I need to pay for the NBSSI Client registration?
        </template>
        <template v-slot:body>
          Note, effective 24th May 2020, all NBSSI client registration fees have been waived until 31st July, 2020 to help lessen the burden on MSMEs affected by the COVID-19 Pandemic. For more enquiries, visit the Help Desk at https://nbssi.crisp.help/en/ or call the Call Centre Helpline on 0302 747 777 or visit the nearest NBSSI Business Advisory Centre.
        </template>
      </Accordion>
      <Accordion>
        <template v-slot:header>
          27. How can I contact NBSSI for further details?
        </template>
        <template v-slot:body>
          Applicants seeking further clarification can call the NBSSI Call Centre on 0302 747 777.
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
