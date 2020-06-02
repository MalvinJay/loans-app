<template>
  <div v-show="show">
    <div class="grid form-c py-20">
      <div class="mb-10">
        <Input v-model="general.business_name" name="Business Name" />
      </div>
      <div class="mb-10">
        <Input v-model="general.ssnit_employer_no" name="SSNIT Employer Number (Optional)" />
      </div>
      <div>
        <label
          class="block text-gray-700 text-sm font-normal mb-2 font-bold"
          for="username"
        >Business Address</label>
      </div>
      <div />
      <div class="mb-12">
        <div class="mb-6">
          <Input v-model="general.business_address" placeholder="Address" />
        </div>
        <div>
          <Select v-model="region" first="Region" :items="regions" />
        </div>
      </div>
      <div class="mb-12">
        <div class="mb-6">
          <Input v-model="general.business_town" placeholder="Town" />
        </div>
        <div>
          <Select v-model="general.business_district" first="District" :items="districts" />
        </div>
      </div>
      <div class="mb-12">
        <Input v-model="general.business_phone_number" name="Business Phone Number" />
      </div>
      <div class="mb-12">
        <Input v-model="general.business_email" name="Business Email Address" />
      </div>
      <!-- <div class="mb-12">
        <Input v-model="general.years_in_business" name="Years in Operation" />
      </div> -->
      <div class="mb-12">
        <Input v-model="general.annual_sales" name="Annual Sales" />
      </div>
      <div class="mb-12">
        <Input v-model="general.tin_number" name="Tax Identification Number (TIN)" />
      </div>

      <div class="mb-12">
        <Input v-model="general.business_digital_address_code" name="Business Digital Address Code" placeholder="GA-xxx-xxxx" />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Industry</label>
        <Select v-model="general.industry" :items="industry" />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Legal Organization</label>
        <Select v-model="general.legal_organization" :items="legalOrganization" />
      </div>
      <div class="mb-12">
        <Input v-model="general.business_services" name="Main Product or Services" placeholder="Please type it in" />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Business Mission</label>
        <Select v-model="general.business_scale" :items="businessScale" />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Business Association</label>
        <Select v-model="general.business_association" :items="businessAssociation" />
      </div>
      <div v-if="general.legal_organization == '1' || general.legal_organization == '2'" class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Business Owner</label>
        <button class="i-t-b" @click="ownerModal=true">
          Click to Fill in Template
        </button>
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Employees</label>
        <button class="i-t-b" @click="employeesModal=true">
          Click to Fill in Template
        </button>
      </div>
      <div v-if="!microGrant && !startupGrant" class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Tax Clearance Certificate (TCC)</label>
        <button class="i-t-b" @click="taxModal=true">
          Click to Fill in Template
        </button>
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Income Statement</label>
        <button class="i-t-b" @click="incomeModal=true">
          Click to Fill in Template
        </button>
      </div>
      <div v-if="!microGrant && !microLoan && !startupGrant && !startupLoan" class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Balance Sheet</label>
        <button class="i-t-b" @click="balanceSheetModal=true">
          Click to Fill in Template
        </button>
      </div>
      <div v-if="!microGrant && !microLoan && !startupGrant && !startupLoan" class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Cash Flow</label>
        <button class="i-t-b" @click="cashFlowModal=true">
          Click to Fill in Template
        </button>
      </div>
      <div v-if="general.legal_organization === '3' || general.legal_organization === '4' || general.legal_organization === '5'" class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Director and Shareholder List</label>
        <button class="i-t-b" @click="shareHolderModal=true">
          Click to Fill in Template
        </button>
      </div>
    </div>
    <!-- =============================================================================================================
    ========================================= INCOME MODAL ===================================================-->

    <Modal v-if="incomeModal" @close="incomeModal=false">
      <div class="income-info">
        <div class="h-d">
          <p class="text-center text-lg">
            Income Statement
          </p>
        </div>
        <div class="grid grid-cols-6 gap-8 b-d">
          <div />
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2017</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2018</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2019</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">Jan 2020-April 2020</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2020F (FORECAST)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Revenue</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="income_statement_2017.total_revenue" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="income_statement_2018.total_revenue" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="income_statement_2019.total_revenue" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input v-model="income_statement_2020.total_revenue_jan_april" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="income_statement_2020.total_revenue" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount Paid for Raw Materials</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="income_statement_2017.total_raw_materials" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="income_statement_2018.total_raw_materials" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="income_statement_2019.total_raw_materials" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input v-model="income_statement_2020.total_raw_materials_jan_april" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="income_statement_2020.total_raw_materials" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Amount Paid for Salaries</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="income_statement_2017.total_salaries" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="income_statement_2018.total_salaries" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="income_statement_2019.total_salaries" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input v-model="income_statement_2020.total_salaries_jan_april" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="income_statement_2020.total_salaries" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Expenses (excluding raw materials and salaries)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="income_statement_2017.total_expenses" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="income_statement_2018.total_expenses" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="income_statement_2019.total_expenses" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input v-model="income_statement_2020.total_expenses_jan_april" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="income_statement_2020.total_expenses" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount Charged on Loan Interest Payments</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="income_statement_2017.total_loan_interest" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="income_statement_2018.total_loan_interest" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="income_statement_2019.total_loan_interest" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input v-model="income_statement_2020.total_loan_interest_jan_april" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="income_statement_2020.total_loan_interest" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Depreciation Charge on Assets</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="income_statement_2017.depreciation_charge_assets" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="income_statement_2018.depreciation_charge_assets" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="income_statement_2019.depreciation_charge_assets" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input v-model="income_statement_2020.depreciation_charge_assets_jan_april" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="income_statement_2020.depreciation_charge_assets" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Charge in Taxes</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="income_statement_2017.total_taxes_charge" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="income_statement_2018.total_taxes_charge" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="income_statement_2019.total_taxes_charge" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input v-model="income_statement_2020.total_taxes_charge_jan_april" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="income_statement_2020.total_taxes_charge" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Net Profit</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="income_statement_2017.net_profit" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="income_statement_2018.net_profit" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="income_statement_2019.net_profit" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input v-model="income_statement_2020.net_profit_jan_april" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="income_statement_2020.net_profit" placeholder="GHC" small />
          </div>
        </div>
        <div class="mt-3">
          <label
            class="block text-gray-700 text-sm font-normal mb-2"
          >Is the business currently servicing any credit (loan, overdraft, letter or credit, etc)</label>
          <div class="flex">
            <label class="checkbox">Yes
              <input id="yes" type="checkbox" true-value="true" false-value="false">
              <span class="checkmark" />
            </label>
            <label class="checkbox">No
              <input id="no" type="checkbox" false-value="true" true-value="false">
              <span class="checkmark" />
            </label>
          </div>
        </div>
        <div class="mt-3">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
          >If yes, please provide the details below</label>
          <div class="grid c-f gap-8">
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Bank/Loan Company</label>
              <Input small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Credit Facility Type</label>
              <Input small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Amount</label>
              <Input placeholder="GHC" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Interest Rate</label>
              <Input small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Due Date</label>
              <Input small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Current Balance</label>
              <Input placeholder="GHC" small />
            </div>
          </div>
          <div class="my-20">
            <button class="button-small" @click="incomeModal= false">
              Done
            </button>
          </div>
        </div>
      </div>
    </Modal>
    <!-- =============================================================================================================
    ========================================= BALANCE SHEET MODAL ===================================================-->

    <Modal v-if="balanceSheetModal" @close="balanceSheetModal=false">
      <div class="income-info">
        <div class="h-d">
          <p class="text-center text-lg">
            Balance Sheet
          </p>
        </div>
        <div class="grid grid-cols-5 gap-8 b-d">
          <div />
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2017</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2018</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2019</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2020F (FORECAST)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="balance_sheet_2017.total_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="balance_sheet_2018.total_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="balance_sheet_2019.total_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="balance_sheet_2020.total_cash" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount of Receivable (how much is owed by customers)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="balance_sheet_2017.total_receivables_amount" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="balance_sheet_2018.total_receivables_amount" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="balance_sheet_2019.total_receivables_amount" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="balance_sheet_2020.total_receivables_amount" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Net Property, Plant and Equipment</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="balance_sheet_2017.total_net_property" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="balance_sheet_2018.total_net_property" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="balance_sheet_2019.total_net_property" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="balance_sheet_2020.total_net_property" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Any Other Short Term Assets</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="balance_sheet_2017.other_short_term_assets" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="balance_sheet_2018.other_short_term_assets" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="balance_sheet_2019.other_short_term_assets" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="balance_sheet_2020.other_short_term_assets" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount of Payables (how much is owed to suppliers by the company)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="balance_sheet_2017.total_amount_payables" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="balance_sheet_2018.total_amount_payables" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="balance_sheet_2019.total_amount_payables" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="balance_sheet_2020.total_amount_payables" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Overdraft Outstanding (yet to be paid to the bank)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="balance_sheet_2017.total_overdraft_outstanding" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="balance_sheet_2018.total_overdraft_outstanding" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="balance_sheet_2019.total_overdraft_outstanding" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="balance_sheet_2020.total_overdraft_outstanding" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Any Other Short Term Liabilities</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="balance_sheet_2017.other_short_term_liability" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="balance_sheet_2018.other_short_term_liability" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="balance_sheet_2019.other_short_term_liability" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="balance_sheet_2020.other_short_term_liability" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Value of Equity (if shares have been issued)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="balance_sheet_2017.equity_value" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="balance_sheet_2018.equity_value" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="balance_sheet_2019.equity_value" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="balance_sheet_2020.equity_value" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Value of retained earnings</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="balance_sheet_2017.retrained_earning_value" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="balance_sheet_2018.retrained_earning_value" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="balance_sheet_2019.retrained_earning_value" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="balance_sheet_2020.retrained_earning_value" placeholder="GHC" small />
          </div>
        </div>
        <div class="my-20">
          <button class="button-small" @click="balanceSheetModal= false">
            Done
          </button>
        </div>
      </div>
    </Modal>

    <!-- =============================================================================================================
    ========================================= CASH FLOW MODAL ===================================================-->
    <Modal v-if="cashFlowModal" @close="cashFlowModal=false">
      <div class="income-info">
        <div class="h-d">
          <p class="text-center text-lg">
            Cash Flow
          </p>
        </div>
        <div class="grid grid-cols-5 gap-8 b-d">
          <div />
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2017</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2018</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2019</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2020F</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >EBIT </label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.ebit" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.ebit" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.ebit" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.ebit" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Depreciation</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.depreciation" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.depreciation" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.depreciation" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.depreciation" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Change in Working Capital</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.working_capital_change" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.working_capital_change" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.working_capital_change" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.working_capital_change" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Any Tax Paid in Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.tax_paid_in_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.tax_paid_in_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.tax_paid_in_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.tax_paid_in_cash" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Interest Amount Paid in Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.total_amount_paid_in_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.total_amount_paid_in_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.total_amount_paid_in_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.total_amount_paid_in_cash" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Capital Expenditure (total value of plant and building equipment purchased this year)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.total_capital_expenditure" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.total_capital_expenditure" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.total_capital_expenditure" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.total_capital_expenditure" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Value of Equity Sold</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.total_sold_equity_sold" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.total_sold_equity_sold" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.total_sold_equity_sold" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.total_sold_equity_sold" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Value of New Credit Facilities Taken this Year (if shares have been issued)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.total_credit_value" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.total_credit_value" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.total_credit_value" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.total_credit_value" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Value of Outstanding Loan Principal this Year</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.total_principal_paid_loan" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.total_principal_paid_loan" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.total_principal_paid_loan" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.total_principal_paid_loan" placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Beginning Cash (ending cash from previous year)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.beginning_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.beginning_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.beginning_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.beginning_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Change in Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.cash_change" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.cash_change" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.cash_change" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.cash_change" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Ending Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input v-model="cash_flow_2017.end_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model="cash_flow_2018.end_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model="cash_flow_2019.end_cash" placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input v-model="cash_flow_2020.end_cash" placeholder="GHC" small />
          </div>
        </div>
        <div class="my-20">
          <button class="button-small" @click="cashFlowModal= false">
            Done
          </button>
        </div>
      </div>
    </Modal>
    <!-- =============================================================================================================
    ========================================= DIRECTOR AND SHAREHOLDER MODAL ===================================================-->
    <Modal v-if="shareHolderModal" @close="shareHolderModal=false">
      <div class="d-s">
        <div class="h-d mb-10">
          <p class="text-center text-lg font-bold">
            Director and Shareholder List
          </p>
        </div>
        <div class="grid gap-8 b-d">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="directors_list[0].name" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input v-model="directors_list[0].TIN" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="directors_list[0].age" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">Male
                <input id="male" v-model="directors_list[0].gender" type="checkbox" true-value="Male" false-value="Female">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Female
                <input id="female" v-model="directors_list[0].gender" type="checkbox" false-value="Male" true-value="Female">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input v-model="directors_list[0].nationality" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">Director
                <input id="director" v-model="directors_list[0].is_director" type="checkbox" true-value="1" false-value="0">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Shareholder
                <input id="shareholder" v-model="directors_list[0].is_shareholder" type="checkbox" false-value="0" true-value="1">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model="directors_list[0].share" small />
          </div>
        </div>
        <div class="grid gap-8 b-d mt-12">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="directors_list[1].name" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input v-model="directors_list[1].TIN" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="directors_list[1].age" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">Male
                <input id="male" v-model="directors_list[1].gender" type="checkbox" true-value="Male" false-value="Female">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Female
                <input id="female" v-model="directors_list[1].gender" type="checkbox" false-value="Male" true-value="Female">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input v-model="directors_list[1].nationality" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">Director
                <input id="director" v-model="directors_list[1].is_director" type="checkbox" true-value="1" false-value="0">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Shareholder
                <input id="shareholder" v-model="directors_list[1].is_shareholder" type="checkbox" false-value="0" true-value="1">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model="directors_list[1].share" small />
          </div>
        </div>
        <div class="grid gap-8 b-d mt-12">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="directors_list[2].name" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input v-model="directors_list[2].TIN" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="directors_list[2].age" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">Male
                <input id="male" v-model="directors_list[2].gender" type="checkbox" true-value="Male" false-value="Female">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Female
                <input id="female" v-model="directors_list[2].gender" type="checkbox" false-value="Male" true-value="Female">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input v-model="directors_list[2].nationality" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">Director
                <input id="director" v-model="directors_list[2].is_director" type="checkbox" true-value="1" false-value="0">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Shareholder
                <input id="shareholder" v-model="directors_list[2].is_shareholder" type="checkbox" false-value="0" true-value="1">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model="directors_list[2].share" small />
          </div>
        </div>
        <div class="grid gap-8 b-d mt-12">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="directors_list[3].name" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input v-model="directors_list[3].TIN" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="directors_list[3].age" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">Male
                <input id="male" v-model="directors_list[3].gender" type="checkbox" true-value="Male" false-value="Female">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Female
                <input id="female" v-model="directors_list[3].gender" type="checkbox" false-value="Male" true-value="Female">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input v-model="directors_list[3].nationality" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">Director
                <input id="director" v-model="directors_list[3].is_director" type="checkbox" true-value="1" false-value="0">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Shareholder
                <input id="shareholder" v-model="directors_list[3].is_shareholder" type="checkbox" false-value="0" true-value="1">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model="directors_list[3].share" small />
          </div>
        </div>
        <div class="grid gap-8 b-d mt-12">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="directors_list[4].name" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input v-model="directors_list[4].TIN" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="directors_list[4].age" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">Male
                <input id="male" v-model="directors_list[4].gender" type="checkbox" true-value="Male" false-value="Female">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Female
                <input id="female" v-model="directors_list[4].gender" type="checkbox" false-value="Male" true-value="Female">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input v-model="directors_list[4].nationality" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">Director
                <input id="director" v-model="directors_list[4].is_director" type="checkbox" true-value="1" false-value="0">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Shareholder
                <input id="shareholder" v-model="directors_list[4].is_shareholder" type="checkbox" false-value="0" true-value="1">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model="directors_list[4].share" small />
          </div>
        </div>
        <div class="my-20">
          <button class="button-small" @click="shareHolderModal= false">
            Done
          </button>
        </div>
      </div>
    </Modal>
    <!-- =============================================================================================================
    ========================================= Business Owner ===================================================-->
    <Modal v-if="ownerModal" @close="ownerModal=false">
      <div class="d-s">
        <div class="h-d mb-10">
          <p class="text-center text-lg font-bold">
            Business Owner(s)
          </p>
        </div>
        <div class="grid gap-8 b-d">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="business_owner[0].name" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input v-model="business_owner[0].TIN" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="business_owner[0].Age" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">Male
                <input id="male" v-model="business_owner[0].gender" type="checkbox" true-value="Male" false-value="Female">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Female
                <input id="female" v-model="business_owner[0].gender" type="checkbox" false-value="Male" true-value="Female">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input v-model="business_owner[0].nationality" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model="business_owner[0].ownership" small />
          </div>
        </div>
      </div>

      <div class="d-s mt-12">
        <div class="grid gap-8 b-d">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="business_owner[1].name" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input v-model="business_owner[1].TIN" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="business_owner[1].Age" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">Male
                <input id="male" v-model="business_owner[1].gender" type="checkbox" true-value="Male" false-value="Female">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Female
                <input id="female" v-model="business_owner[1].gender" type="checkbox" false-value="Male" true-value="Female">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input v-model="business_owner[1].nationality" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model="business_owner[1].ownership" small />
          </div>
        </div>
      </div>
      <div class="d-s mt-12">
        <div class="grid gap-8 b-d">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="business_owner[2].name" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input v-model="business_owner[2].TIN" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="business_owner[2].Age" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">Male
                <input id="male" v-model="business_owner[2].gender" type="checkbox" true-value="Male" false-value="Female">
                <span class="checkmark" />
              </label>
              <label class="checkbox">Female
                <input id="female" v-model="business_owner[2].gender" type="checkbox" false-value="Male" true-value="Female">
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input v-model="business_owner[2].nationality" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model="business_owner[2].ownership" small />
          </div>
        </div>
        <div class="my-20">
          <button class="button-small" @click="ownerModal= false">
            Done
          </button>
        </div>
      </div>
    </Modal>
    <!-- =============================================================================================================
    ========================================= Employees Modal ===================================================-->
    <Modal v-if="employeesModal" @close="employeesModal=false">
      <div class="d-s">
        <div class="h-d mb-10">
          <p class="text-center text-lg font-bold">
            Employees
          </p>
        </div>
      </div>
      <div class="d-s mt-12">
        <div class="grid gap-8 b-d">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Number of Employees</label>
            <Input v-model="general.number_of_employees" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Full Time Employees</label>
            <Input v-model="general.full_time_employees" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Part Time Employees</label>
            <Input v-model="general.part_time_employees" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Female Employees</label>
            <Input v-model="general.female_employees" small />
          </div>
        </div>
      </div>
      <div class="my-20">
        <button class="button-small" @click="employeesModal= false">
          Done
        </button>
      </div>
    </Modal>
    <!-- =============================================================================================================
    ========================================= TaxClearance ===================================================-->
    <Modal v-if="taxModal" @close="taxModal=false">
      <div>
        <div class="h-d mb-10">
          <p class="text-center text-lg font-bold">
            Tax Clearance Certificate
          </p>
          <p class="text-center text-sm">
            (Please provide details of your most recent tax clearance)
          </p>
        </div>
        <div class="grid grid-cols-4 gap-8 b-d">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Number</label>
            <Input v-model="tax_clearance.certificate_no" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2" for="username">Tax Identification Number</label>
            <Input v-model="tax_clearance.TIN" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">GRA Issue Office</label>
            <Input v-model="tax_clearance.gra_issuing_office" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Date Valid Up To</label>
            <input v-model="tax_clearance.validity" type="date">
          </div>
        </div>
        <div class="my-20">
          <button class="button-small" @click="taxModal= false">
            Done
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from '../Misc/Modal'
import Input from './Input'
import Select from './Select'
export default {
  components: {
    Input,
    Select,
    Modal
  },
  props: {
    active: Boolean
  },
  data () {
    return {
      show: this.active,
      incomeModal: false,
      balanceSheetModal: false,
      cashFlowModal: false,
      shareHolderModal: false,
      ownerModal: false,
      employeesModal: false,
      taxModal: false,
      micro: false,
      general: {},
      cash_flow_2017: {},
      cash_flow_2018: {},
      cash_flow_2019: {},
      cash_flow_2020: {},
      balance_sheet_2017: {},
      balance_sheet_2018: {},
      balance_sheet_2019: {},
      balance_sheet_2020: {},
      income_statement_2017: {},
      income_statement_2018: {},
      income_statement_2019: {},
      income_statement_2020: {},
      tax_clearance: {},
      business_owner: [{}, {}, {}],
      directors_list: [
        {
          is_director: '0',
          is_shareholder: '0'
        }, {
          is_director: '0',
          is_shareholder: '0'
        }, {
          is_director: '0',
          is_shareholder: '0'
        }, {
          is_director: '0',
          is_shareholder: '0'
        }, {
          is_director: '0',
          is_shareholder: '0'
        }
      ],
      region: null
    }
  },
  computed: {
    fundAmount () {
      return this.$store.state.pages.loanAmount
    },
    years () {
      return this.$store.state.pages.years
    },
    sales () {
      // Get sales from route params
      return parseFloat(this.$route.params.amount)
    },
    startup () {
      return this.$store.state.pages.startup
    },
    // Caculate Funding type based years, loanAmount and sales
    microGrant () {
      return this.sales <= 145000 && this.fundAmount <= 2000 && this.years > 2
    },
    microLoan () {
      return this.sales <= 145000 && this.fundAmount > 2000 && this.years > 2
    },
    lseLoan () {
      return (
        this.sales > 145000 &&
        this.sales < 250000 &&
        this.fundAmount > 2000 &&
        this.years > 2
      )
    },
    mseLoan () {
      return (
        this.sales > 250000 &&
        this.sales < 5000000 &&
        this.fundAmount > 2000 &&
        this.years > 2
      )
    },
    startupGrant () {
      return this.startup && this.fundAmount <= 50000 && this.years < 2
    },
    startupLoan () {
      return this.startup && this.fundAmount > 50000 && this.years < 2
    },
    businessAssociation () {
      return this.$store.getters['pages/businessAssociation']
    },
    legalOrganization () {
      return this.$store.getters['pages/legalOrganization']
    },
    industry () {
      return this.$store.getters['pages/industry']
    },
    businessScale () {
      return this.$store.getters['pages/businessScale']
    },
    regions () {
      return this.$store.getters['pages/regions']
    },
    districts () {
      return this.$store.getters['pages/districts']
    }
  },
  watch: {
    region (value) {
      this.$store.commit('pages/SET_DISTRICTS', value)
    },
    show (value) {
      const data = Object.assign({}, this.general)

      // TODO: refactor deep cloning using lodash

      // Clone all cashflow objects
      const cashFlow2017 = Object.assign({}, this.cash_flow_2017)
      const cashFlow2018 = Object.assign({}, this.cash_flow_2018)
      const cashFlow2019 = Object.assign({}, this.cash_flow_2019)
      const cashFlow2020 = Object.assign({}, this.cash_flow_2020)

      // Clone all income statement objects
      const incomeStatement2017 = Object.assign({}, this.income_statement_2017)
      const incomeStatement2018 = Object.assign({}, this.income_statement_2018)
      const incomeStatement2019 = Object.assign({}, this.income_statement_2019)
      const incomeStatement2020 = Object.assign({}, this.income_statement_2020)

      // Clone all balance Sheet objects
      const balanceSheet2017 = Object.assign({}, this.balance_sheet_2017)
      const balanceSheet2018 = Object.assign({}, this.balance_sheet_2018)
      const balanceSheet2019 = Object.assign({}, this.balance_sheet_2019)
      const balanceSheet2020 = Object.assign({}, this.balance_sheet_2020)
      const directorsList = JSON.parse(JSON.stringify(this.directors_list))
      const businessOwner = JSON.parse(JSON.stringify(this.business_owner))

      data.income_statement_2017 = incomeStatement2017
      data.income_statement_2018 = incomeStatement2018
      data.income_statement_2019 = incomeStatement2019
      data.income_statement_2020 = incomeStatement2020
      data.balance_sheet_2017 = balanceSheet2017
      data.balance_sheet_2018 = balanceSheet2018
      data.balance_sheet_2019 = balanceSheet2019
      data.balance_sheet_2020 = balanceSheet2020
      data.tax_clearance = this.tax_clearance
      data.cash_flow_2017 = cashFlow2017
      data.cash_flow_2018 = cashFlow2018
      data.cash_flow_2020 = cashFlow2019
      data.cash_flow_2019 = cashFlow2020
      data.directors_list = directorsList
      data.business_owner = businessOwner
      data.business_region = this.region
      if (value === false) {
        this.$store.commit('api/SET_GENERAL_DATA', data)
      }
    }
  },
  created () {
    // eslint-disable-next-line no-console
    if (this.$route.params.amount < 145000) {
      this.micro = true
    }
  },
  mounted () {
    this.general.annual_sales = this.$route.params.amount
    // this.general.years_in_business = this.years
  }
}
</script>
<style lang="scss" scoped>
.form-c {
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
.income-info {
  width: 100%;
}
.c-f {
  grid-template-columns: 22% 22% 10% 10% 10% 10%;
  width: 100%;
}
label.mobile {
  display: none;
}
.d-s {
  .grid {
    grid-template-columns: 24% 24% 20% 20%;
  }
}

@include for-phone-only {
  label.mobile {
    display: block;
  }
  .b-d {
    grid-template-columns: 100%;
  }
  .not-mobile {
    display: none;
  }
  .c-f {
    grid-template-columns: 100%;
    div {
      &:last-child {
        white-space: nowrap;
      }
    }
  }
  .form-c {
    grid-template-columns: 100%;
    width: 100%;
    .i-t-b {
      width: 100%;
    }
  }
  .button-small {
    margin-bottom: 70px;
  }
}
input[type="date"] {
  width: 100%;
  padding-right: 0px;
}
@include for-tablet-portrait-only {
  .d-s {
    .grid {
      grid-template-columns: 40% 40%;
    }
  }
  .form-c {
    width: 100%;
    .i-t-b {
      width: 100%;
    }
  }
}
@include for-phone-only {
  .d-s {
    .grid {
      grid-template-columns: 100%;
    }
  }
}
</style>
