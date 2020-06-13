<template>
  <div v-show="show">
    <div class="grid form-c py-20">
      <div class="mb-10">
        <Input v-model="general.business_name" type="text" name="Business Name" />
      </div>
      <div class="mb-10">
        <Input
          v-model="general.ssnit_employer_no"
          type="text"
          name="SSNIT Employer Number (Optional)"
          regex="[A-Z]{1}[0-9]{12}$"
          optional
        />
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
          <Input v-model="general.business_address" type="text" placeholder="Address" />
        </div>
        <div>
          <Select v-model="region" first="Region" :items="regions" />
        </div>
      </div>
      <div class="mb-12">
        <div class="mb-6">
          <Input v-model="general.business_town" type="text" placeholder="Town" />
        </div>
        <div>
          <Select v-model="general.business_district" first="District" :items="districts" />
        </div>
      </div>
      <div class="mb-12">
        <Input
          v-model="general.business_phone_number"
          type="text"
          name="Business Phone Number"
          regex="0[2-5]{1}[0-9]{7,8}$"
        />
      </div>
      <div class="mb-12">
        <Input
          v-model="general.business_email"
          type="email"
          name="Business Email Address (Optional)"
          optional
        />
      </div>
      <div class="mb-12 text">
        <label class="block text-gray-900 text-sm font-bold mb-2" :disabled="true">Annual Sales</label>
        <input v-model="annual_sales_display" type="text" :disabled="true" class="text-right">
      </div>
      <div class="mb-12">
        <Input
          v-model="general.tin_number"
          type="text"
          name="Tax Identification Number (TIN)"
          optional
          regex="([A-Z]{1})([0-9]{10})$"
        />
      </div>
      <div class="mb-12">
        <Input
          v-model="general.business_digital_address_code"
          type="text"
          name="Business Digital Address Code (Optional)"
          placeholder="GA-xxx-xxxx"
          regex="[A-Z]{2}-[0-9]{3,4}-[0-9]{4}$"
          optional
        />
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
        <Input
          v-model="general.business_services"
          type="text"
          name="Main Product(s) or Service(s)"
          placeholder="Please type it in"
        />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Business Mission</label>
        <label class="block text-gray-900 text-sm font-normal mb-2">Are you a Social Enterprise?</label>
        <div class="flex mb-3">
          <label class="checkbox">
            Yes
            <input
              id="1"
              v-model="general.social_enterprise"
              type="checkbox"
              true-value="1"
              false-value="0"
            >
            <span class="checkmark" />
          </label>
          <label class="checkbox">
            No
            <input
              id="2"
              v-model="general.social_enterprise"
              type="checkbox"
              false-value="1"
              true-value="0"
            >
            <span class="checkmark" />
          </label>
        </div>
        <label
          class="block text-gray-900 text-sm font-normal mb-2"
        >Do you provide C0VID-19 Product(s) & Service(s)? (e.g PPE manufacturing)</label>
        <div class="flex">
          <label class="checkbox">
            Yes
            <input
              id="1"
              v-model="general.covid_products"
              type="checkbox"
              true-value="1"
              false-value="0"
            >
            <span class="checkmark" />
          </label>
          <label class="checkbox">
            No
            <input
              id="2"
              v-model="general.covid_products"
              type="checkbox"
              false-value="1"
              true-value="0"
            >
            <span class="checkmark" />
          </label>
        </div>
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Business Association</label>
        <Select v-model="general.business_association" :items="businessAssociation" />
        <label v-if="general.business_association === '80'" class="block text-gray-900 text-sm mt-2">
          If other, please provide your Business Association
        </label>
        <Input
          v-if="general.business_association === '80'"
          v-model="general.other_business_association"
          type="text"
        />
      </div>
      <div
        v-if="general.legal_organization == '1' || general.legal_organization == '2'"
        class="mb-12"
      >
        <label class="block text-gray-900 text-sm font-bold mb-2">Business Owner</label>
        <button class="i-t-b" :class="{done: checkOwnerModal}" @click="ownerModal=true">
          Click to Fill in Template
          <span v-if="checkOwnerModal">&#10003;</span>
        </button>
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Employees</label>
        <button class="i-t-b" :class="{done: checkEmployeesModal}" @click="employeesModal=true">
          Click to Fill in Template
          <span v-if="checkEmployeesModal">&#10003;</span>
        </button>
      </div>
      <div v-if="(businessScale === '1' || businessScale === '2') && isStartup === false" class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Income Statement</label>
        <button class="i-t-b" :class="{done: checkMicroIncomeModal}" @click="microIncomeModal=true">
          Click to Fill in Template
          <span v-if="checkMicroIncomeModal">&#10003;</span>
        </button>
      </div>
      <div v-else class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Income Statement</label>
        <button class="i-t-b" :class="{done: checkIncomeModal}" @click="incomeModal=true">
          Click to Fill in Template
          <span v-if="checkIncomeModal">&#10003;</span>
        </button>
      </div>
      <div v-if="(businessScale === '4' || businessScale === '5') && isStartup === false" class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Balance Sheet</label>
        <button class="i-t-b" :class="{done: checkBalanceSheetModal}" @click="balanceSheetModal=true">
          Click to Fill in Template
          <span v-if="checkBalanceSheetModal">&#10003;</span>
        </button>
      </div>
      <div v-if="(businessScale === '4' || businessScale === '5') && isStartup === false" class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Cash Flow</label>
        <button class="i-t-b" :class="{done: checkCashFlowModal}" @click="cashFlowModal=true">
          Click to Fill in Template
          <span v-if="checkCashFlowModal">&#10003;</span>
        </button>
      </div>
      <div
        v-if="general.legal_organization === '3' || general.legal_organization === '4' || general.legal_organization === '5'"
        class="mb-12"
      >
        <label class="block text-gray-900 text-sm font-bold mb-2">Director and Shareholder List</label>
        <button class="i-t-b" :class="{done: checkShareHolderModal}" @click="shareHolderModal=true">
          Click to Fill in Template
          <span v-if="checkShareHolderModal">&#10003;</span>
        </button>
      </div>
    </div>
    <div class="nav-buttons flex">
      <div>
        <button class="button-small next" @click="moveNext">
          Next
        </button>
        <button class="button-small previous" @click="movePrevious">
          Previous
        </button>
        <button class="button-small previous small" @click="save">
          Save
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
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2019 (required)</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >Jan 2020-April 2020</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >2020F (FORECAST)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Revenue</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="income_statement_2017.total_revenue"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="income_statement_2018.total_revenue"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="income_statement_2019.total_revenue"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input
              v-model.number="income_statement_apr_2020.total_revenue"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="income_statement_2020.total_revenue"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount Paid for Raw Materials</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="income_statement_2017.total_raw_materials"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="income_statement_2018.total_raw_materials"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="income_statement_2019.total_raw_materials"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input
              v-model.number="income_statement_apr_2020.total_raw_materials"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="income_statement_2020.total_raw_materials"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Amount Paid for Salaries</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="income_statement_2017.total_salaries"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="income_statement_2018.total_salaries"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="income_statement_2019.total_salaries"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input
              v-model.number="income_statement_apr_2020.total_salaries"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="income_statement_2020.total_salaries"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Other Operating Expenses</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="income_statement_2017.total_expenses"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="income_statement_2018.total_expenses"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="income_statement_2019.total_expenses"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input
              v-model.number="income_statement_apr_2020.total_expenses"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="income_statement_2020.total_expenses"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Interest on Loans</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="income_statement_2017.total_loan_repayment"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="income_statement_2018.total_loan_repayment"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="income_statement_2019.total_loan_repayment"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input
              v-model.number="income_statement_apr_2020.total_loan_repayment"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="income_statement_2020.total_loan_repayment"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Depreciation Charge on Assets</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="income_statement_2017.depreciation_charge_assets"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="income_statement_2018.depreciation_charge_assets"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="income_statement_2019.depreciation_charge_assets"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input
              v-model.number="income_statement_apr_2020.depreciation_charge_assets"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="income_statement_2020.depreciation_charge_assets"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Charge in Taxes</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="income_statement_2017.total_taxes_charge"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="income_statement_2018.total_taxes_charge"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="income_statement_2019.total_taxes_charge"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input
              v-model.number="income_statement_apr_2020.total_taxes_charge"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="income_statement_2020.total_taxes_charge"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Net Profit</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model="total_income_statement.net_profit_17"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="total_income_statement.net_profit_18"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="total_income_statement.net_profit_19"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020-April 2020</label>
            <Input
              v-model.number="total_income_statement.net_profit_apr_20"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="total_income_statement.net_profit_20"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
        </div>
        <div class="mt-3">
          <label
            class="block text-gray-700 text-sm font-normal mb-2"
          >Is the business currently servicing any credit (loan, overdraft, letter of credit, etc)</label>
          <div class="flex">
            <label class="checkbox">
              Yes
              <input
                id="yes"
                v-model="general.has_credit"
                type="checkbox"
                true-value="1"
                false-value="0"
              >
              <span class="checkmark" />
            </label>
            <label class="checkbox">
              No
              <input
                id="no"
                v-model="general.has_credit"
                type="checkbox"
                false-value="1"
                true-value="0"
              >
              <span class="checkmark" />
            </label>
          </div>
        </div>
        <div class="mt-3">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
          >If yes, please provide the details below</label>
          <div class="grid c-f gap-8 mb-8">
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Bank/Loan Company</label>
              <Input v-model="credit_facilities[0].financial_institution" type="text" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Credit Facility Type</label>
              <Input v-model="credit_facilities[0].type" type="text" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Amount</label>
              <Input
                v-model.number="credit_facilities[0].amount"
                type="number"
                placeholder="GHS"
                money
                small
              />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Interest Rate</label>
              <Input v-model="credit_facilities[0].interest_rate" type="number" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Due Date</label>
              <input v-model="credit_facilities[0].maturity_date" type="date" name>
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Current Balance</label>
              <Input
                v-model="credit_facilities[0].current_value"
                type="number"
                placeholder="GHS"
                money
                small
              />
            </div>
          </div>
          <div class="grid c-f gap-8 mb-8">
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Bank/Loan Company</label>
              <Input v-model="credit_facilities[1].financial_institution" type="text" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Credit Facility Type</label>
              <Input v-model="credit_facilities[1].type" type="text" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Amount</label>
              <Input
                v-model.number="credit_facilities[1].amount"
                type="number"
                placeholder="GHS"
                money
                small
              />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Interest Rate</label>
              <Input v-model="credit_facilities[1].interest_rate" type="number" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Due Date</label>
              <input v-model="credit_facilities[1].maturity_date" type="date" name>
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Current Balance</label>
              <Input
                v-model="credit_facilities[1].current_value"
                type="number"
                placeholder="GHS"
                money
                small
              />
            </div>
          </div>
          <div class="grid c-f gap-8 mb-8">
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Bank/Loan Company</label>
              <Input v-model="credit_facilities[2].financial_institution" type="text" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Credit Facility Type</label>
              <Input v-model="credit_facilities[2].type" type="text" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Amount</label>
              <Input
                v-model.number="credit_facilities[2].amount"
                type="number"
                placeholder="GHS"
                money
                small
              />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Interest Rate</label>
              <Input v-model="credit_facilities[2].interest_rate" type="number" small />
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Due Date</label>
              <input v-model="credit_facilities[2].maturity_date" type="date" name>
            </div>
            <div>
              <label class="block text-gray-900 text-sm font-sm mb-2">Current Balance</label>
              <Input
                v-model="credit_facilities[2].current_value"
                type="number"
                placeholder="GHS"
                money
                small
              />
            </div>
          </div>
          <div class="my-20 flex gap-3 buttons">
            <button class="button-small" @click="doneIncomeModal">
              Done
            </button>
            <button class="button-small" @click="incomeModal= false">
              Cancel
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
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2019 (required)</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >2020F (FORECAST)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.total_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.total_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input
              v-model.number="balance_sheet_2019.total_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.total_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Amount of Inventory</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.total_inventory_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.total_inventory_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.total_inventory_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.total_inventory_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount of Receivables (how much is owed by customers)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.total_receivables_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.total_receivables_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.total_receivables_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.total_receivables_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Any Other Short Term Assets</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.other_short_term_assets"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.other_short_term_assets"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.other_short_term_assets"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.other_short_term_assets"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Net Property, Plant and Equipment</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.total_net_property"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.total_net_property"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.total_net_property"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.total_net_property"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount of Payables (how much is owed to suppliers by the company)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.total_payables_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.total_payables_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.total_payables_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.total_payables_amount"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Overdraft Outstanding (yet to be paid to the bank)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.total_overdraft_outstanding"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.total_overdraft_outstanding"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.total_overdraft_outstanding"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.total_overdraft_outstanding"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Any Other Short Term Liabilities</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.other_short_term_liability"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.other_short_term_liability"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.other_short_term_liability"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.other_short_term_liability"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Loans Outstanding</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.total_loan_outstanding"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.total_loan_outstanding"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.total_loan_outstanding"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.total_loan_outstanding"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Value of Equity</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.equity_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.equity_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.equity_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.equity_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Value of Retained Earnings</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.retained_earning_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.retained_earning_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.retained_earning_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.retained_earning_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Any Other Equity</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="balance_sheet_2017.other_equity"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="balance_sheet_2018.other_equity"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="balance_sheet_2019.other_equity"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="balance_sheet_2020.other_equity"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
        </div>
        <div class="my-20 flex gap-3 buttons">
          <button class="button-small" @click="doneBalanceSheetModal">
            Done
          </button>
          <button class="button-small" @click="balanceSheetModal= false">
            Cancel
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
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2019 (required)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2020F</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Profit Before Interest and Tax</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.ebit"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.ebit"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.ebit"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.ebit"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Depreciation</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.depreciation"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.depreciation"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.depreciation"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.depreciation"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Change in Working Capital</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.working_capital_change"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.working_capital_change"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.working_capital_change"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.working_capital_change"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Any Tax Paid in Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.tax_paid_in_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.tax_paid_in_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.tax_paid_in_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.tax_paid_in_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Interest Amount Paid in Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.total_interest_paid_in_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.total_interest_paid_in_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.total_interest_paid_in_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.total_interest_paid_in_cash"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Capital Expenditure (total value of plant and building equipment purchased this year)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.total_capital_expenditure"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.total_capital_expenditure"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.total_capital_expenditure"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.total_capital_expenditure"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Value of Equity Sold (if shares have been issued)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.total_sold_equity_sold"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.total_sold_equity_sold"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.total_sold_equity_sold"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.total_sold_equity_sold"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Value of New Credit Facilities Taken this Year (if shares have been issued)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.total_credit_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.total_credit_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.total_credit_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.total_credit_value"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Value of Outstanding Loan Principal this Year</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.total_principal_paid_loan"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.total_principal_paid_loan"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.total_principal_paid_loan"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.total_principal_paid_loan"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Beginning Cash (ending cash from previous year)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.beginning_cash"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.beginning_cash"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.beginning_cash"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.beginning_cash"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Change in Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.cash_change"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.cash_change"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.cash_change"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.cash_change"
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Ending Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input
              v-model.number="cash_flow_2017.end_cash"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model.number="cash_flow_2018.end_cash"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019 (required)</label>
            <Input
              v-model.number="cash_flow_2019.end_cash"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F (FORECAST)</label>
            <Input
              v-model.number="cash_flow_2020.end_cash"
              grey
              type="number"
              placeholder="GHS"
              money
              small
            />
          </div>
        </div>
        <div class="my-20 flex gap-3 buttons">
          <button class="button-small" @click="doneCashFlowModal">
            Done
          </button>
          <button class="button-small" @click="cashFlowModal= false">
            Cancel
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
            <Input v-model="directors_list[0].name" type="text" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Tax Identification Number(TIN)</label>
            <Input
              v-model.trim="directors_list[0].tin_number"
              regex="([P]{1})([0-9]{10})$"
              type="text"
              small
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model.number="directors_list[0].age" type="text" regex="^[1-9][0-9]?$|^100$" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">
                Male
                <input
                  id="male"
                  v-model="directors_list[0].gender"
                  type="checkbox"
                  true-value="Male"
                  false-value="Female"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Female
                <input
                  id="female"
                  v-model="directors_list[0].gender"
                  type="checkbox"
                  false-value="Male"
                  true-value="Female"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <div>
              <Select v-model="directors_list[0].nationality" first="Country" :items="countries" small />
            </div>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">
                Director
                <input
                  id="director"
                  v-model="directors_list[0].is_director"
                  type="checkbox"
                  true-value="1"
                  false-value="0"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Shareholder
                <input
                  id="shareholder"
                  v-model="directors_list[0].is_shareholder"
                  type="checkbox"
                  false-value="0"
                  true-value="1"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model.number="directors_list[0].share" type="number" small />
          </div>
        </div>
        <div class="grid gap-8 b-d mt-12">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="directors_list[1].name" type="text" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Tax Identification Number(TIN)</label>
            <Input
              v-model="directors_list[1].tin_number"
              type="text"
              small
              regex="([P]{1})([0-9]{10})$"
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model.number="directors_list[1].age" type="text" small regex="^[1-9][0-9]?$|^100$" />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">
                Male
                <input
                  id="male"
                  v-model="directors_list[1].gender"
                  type="checkbox"
                  true-value="Male"
                  false-value="Female"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Female
                <input
                  id="female"
                  v-model="directors_list[1].gender"
                  type="checkbox"
                  false-value="Male"
                  true-value="Female"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <div>
              <Select v-model="directors_list[1].nationality" first="Country" :items="countries" small />
            </div>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">
                Director
                <input
                  id="director"
                  v-model="directors_list[1].is_director"
                  type="checkbox"
                  true-value="1"
                  false-value="0"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Shareholder
                <input
                  id="shareholder"
                  v-model="directors_list[1].is_shareholder"
                  type="checkbox"
                  false-value="0"
                  true-value="1"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model.number="directors_list[1].share" type="number" small />
          </div>
        </div>
        <div class="grid gap-8 b-d mt-12">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="directors_list[2].name" type="text" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Tax Identification Number(TIN)</label>
            <Input
              v-model="directors_list[2].tin_number"
              type="text"
              small
              regex="([P]{1})([0-9]{10})$"
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model.number="directors_list[2].age" type="text" small regex="^[1-9][0-9]?$|^100$" />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">
                Male
                <input
                  id="male"
                  v-model="directors_list[2].gender"
                  type="checkbox"
                  true-value="Male"
                  false-value="Female"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Female
                <input
                  id="female"
                  v-model="directors_list[2].gender"
                  type="checkbox"
                  false-value="Male"
                  true-value="Female"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <div>
              <Select v-model="directors_list[2].nationality" first="Country" :items="countries" small />
            </div>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">
                Director
                <input
                  id="director"
                  v-model="directors_list[2].is_director"
                  type="checkbox"
                  true-value="1"
                  false-value="0"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Shareholder
                <input
                  id="shareholder"
                  v-model="directors_list[2].is_shareholder"
                  type="checkbox"
                  false-value="0"
                  true-value="1"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model.number="directors_list[2].share" type="number" small />
          </div>
        </div>
        <div class="grid gap-8 b-d mt-12">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="directors_list[3].name" type="text" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Tax Identification Number(TIN)</label>
            <Input
              v-model="directors_list[3].tin_number"
              type="text"
              small
              regex="([P]{1})([0-9]{10})$"
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model.number="directors_list[3].age" type="text" small regex="^[1-9][0-9]?$|^100$" />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">
                Male
                <input
                  id="male"
                  v-model="directors_list[3].gender"
                  type="checkbox"
                  true-value="Male"
                  false-value="Female"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Female
                <input
                  id="female"
                  v-model="directors_list[3].gender"
                  type="checkbox"
                  false-value="Male"
                  true-value="Female"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <div>
              <Select v-model="directors_list[3].nationality" first="Country" :items="countries" small />
            </div>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">
                Director
                <input
                  id="director"
                  v-model="directors_list[3].is_director"
                  type="checkbox"
                  true-value="1"
                  false-value="0"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Shareholder
                <input
                  id="shareholder"
                  v-model="directors_list[3].is_shareholder"
                  type="checkbox"
                  false-value="0"
                  true-value="1"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model.number="directors_list[3].share" type="number" small />
          </div>
        </div>
        <div class="grid gap-8 b-d mt-12">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input v-model="directors_list[4].name" type="text" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Tax Identification Number(TIN)</label>
            <Input
              v-model="directors_list[4].tin_number"
              type="text"
              small
              regex="([P]{1})([0-9]{10})$"
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model.number="directors_list[4].age" type="text" small regex="^[1-9][0-9]?$|^100$" />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">
                Male
                <input
                  id="male"
                  v-model="directors_list[4].gender"
                  type="checkbox"
                  true-value="Male"
                  false-value="Female"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Female
                <input
                  id="female"
                  v-model="directors_list[4].gender"
                  type="checkbox"
                  false-value="Male"
                  true-value="Female"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <div>
              <Select v-model="directors_list[4].nationality" first="Country" :items="countries" small />
            </div>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <label class="checkbox mr-5">
                Director
                <input
                  id="director"
                  v-model="directors_list[4].is_director"
                  type="checkbox"
                  true-value="1"
                  false-value="0"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Shareholder
                <input
                  id="shareholder"
                  v-model="directors_list[4].is_shareholder"
                  type="checkbox"
                  false-value="0"
                  true-value="1"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model.number="directors_list[4].share" type="number" small />
          </div>
        </div>
        <div class="my-20 flex gap-3 buttons">
          <button class="button-small" @click="doneShareHolderModal">
            Done
          </button>
          <button class="button-small" @click="shareHolderModal = false">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
    <!-- =============================================================================================================
    ========================================= Micro Income Modal ===================================================-->
    <Modal v-if="microIncomeModal" @close="microIncomeModal=false">
      <div class="d-s">
        <div class="h-d mb-10">
          <p class="text-center text-lg font-bold">
            Income Statement
          </p>
        </div>
        <div class="grid grid-cols-4 gap-8 micro">
          <div />
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2018</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2019</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >Jan 2020 - April 2020</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-left mt-10 not-mobile"
            >Total Revenue</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model.number="income_statement_2018.total_revenue" type="number" placeholder="GHS" money small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model.number="income_statement_2019.total_revenue" type="number" placeholder="GHS" money small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020 - April 2020</label>
            <Input v-model.number="income_statement_2020.total_revenue" type="number" placeholder="GHS" money small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-left mt-10 not-mobile"
            >Total Expenses</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input v-model.number="income_statement_2018.total_expenses" type="number" placeholder="GHS" money small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input v-model.number="income_statement_2019.total_expenses" type="number" placeholder="GHS" money small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020 - April 2020</label>
            <Input v-model.number="income_statement_2020.total_expenses" type="number" placeholder="GHS" money small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold text-left mt-10 not-mobile"
            >Profit Before Tax</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input
              v-model="total_micro_statement.profit_18"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input
              v-model="total_micro_statement.profit_19"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan 2020 - April 2020</label>
            <Input
              v-model="total_micro_statement.profit_20"
              type="text"
              placeholder="GHS"
              money
              small
              disabled
            />
          </div>
          <div class="my-20 flex gap-3 buttons">
            <button class="button-small" @click="doneMicroIncomeModal">
              Done
            </button>
            <button class="button-small" @click="microIncomeModal= false">
              Cancel
            </button>
          </div>
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
            <Input v-model="business_owner[0].name" type="text" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Tax Identification Number(TIN)</label>
            <Input
              v-model="business_owner[0].tin_number"
              type="text"
              small
              regex="([P]{1})([0-9]{10})$"
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model.number="business_owner[0].age" type="text" small regex="^[1-9][0-9]?$|^100$" />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">
                Male
                <input
                  id="male"
                  v-model="business_owner[0].gender"
                  type="checkbox"
                  true-value="Male"
                  false-value="Female"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Female
                <input
                  id="female"
                  v-model="business_owner[0].gender"
                  type="checkbox"
                  false-value="Male"
                  true-value="Female"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <div>
              <Select v-model="business_owner[0].nationality" first="Country" :items="countries" small />
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model.number="business_owner[0].share" type="number" small />
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
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Tax Identification Number(TIN)</label>
            <Input
              v-model="business_owner[1].tin_number"
              small
              regex="([P]{1})([0-9]{10})$"
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="business_owner[1].age" small regex="^[1-9][0-9]?$|^100$" />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">
                Male
                <input
                  id="male"
                  v-model="business_owner[1].gender"
                  type="checkbox"
                  true-value="Male"
                  false-value="Female"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Female
                <input
                  id="female"
                  v-model="business_owner[1].gender"
                  type="checkbox"
                  false-value="Male"
                  true-value="Female"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <div>
              <Select v-model="business_owner[1].nationality" first="Country" :items="countries" small />
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model.number="business_owner[1].share" small />
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
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Tax Identification Number(TIN)</label>
            <Input
              v-model="business_owner[2].tin_number"
              small
              regex="([P]{1})([0-9]{10})$"
            />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input v-model="business_owner[2].age" small regex="^[1-9][0-9]?$|^100$" />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <label class="checkbox">
                Male
                <input
                  id="male"
                  v-model="business_owner[2].gender"
                  type="checkbox"
                  true-value="Male"
                  false-value="Female"
                >
                <span class="checkmark" />
              </label>
              <label class="checkbox">
                Female
                <input
                  id="female"
                  v-model="business_owner[2].gender"
                  type="checkbox"
                  false-value="Male"
                  true-value="Female"
                >
                <span class="checkmark" />
              </label>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <div>
              <Select v-model="business_owner[2].nationality" first="Country" :items="countries" small />
            </div>
            <!-- <Input v-model="business_owner[2].nationality" small /> -->
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input v-model.number="business_owner[2].share" small />
          </div>
        </div>
        <div class="my-20 flex gap-3 buttons">
          <button class="button-small" @click="doneOwnerModal">
            Done
          </button>
          <button class="button-small" @click="ownerModal = false">
            Cancel
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
            <Input v-model.number="general.number_of_employees" type="number" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Permanent Employees</label>
            <Input v-model.number="general.permanent_employees" type="number" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Temporary Employees</label>
            <Input v-model.number="general.temporary_employees" type="number" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Female Employees</label>
            <Input v-model.number="general.female_employees" type="number" small />
          </div>
        </div>
      </div>
      <div class="my-20 flex gap-3 buttons">
        <button class="button-small" @click="doneEmployeesModal">
          Done
        </button>
        <button class="button-small" @click="employeesModal= false">
          Cancel
        </button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
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
      microIncomeModal: false,
      balanceSheetModal: false,
      cashFlowModal: false,
      shareHolderModal: false,
      ownerModal: false,
      employeesModal: false,
      checkIncomeModal: false,
      checkMicroIncomeModal: false,
      checkBalanceSheetModal: false,
      checkCashFlowModal: false,
      checkShareHolderModal: false,
      checkOwnerModal: false,
      checkEmployeesModal: false,
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
      income_statement_apr_2020: {},
      total_micro_statement: {},
      total_income_statement: {},
      tax_clearance: {},
      business_owner: [{}, {}, {}],
      directors_list: [{}, {}, {}, {}, {}],
      credit_facilities: [{}, {}, {}],
      region: null,
      annual_sales_display: null
    }
  },
  computed: {
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
    isStartup () {
      return this.$store.getters['pages/isStartup']
    },
    regions () {
      return this.$store.getters['pages/regions']
    },
    districts () {
      return this.$store.getters['pages/districts']
    },
    countries () {
      return this.$store.getters['pages/countries']
    }
  },
  watch: {
    income_statement_2017: {
      handler (value) {
        const income = this.income_statement_2017
        // eslint-disable-next-line no-console
        const rawMaterials = income.total_raw_materials === undefined ? 0 : income.total_raw_materials
        const totalSalaries = income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge = income.total_taxes_charge === undefined ? 0 : income.total_taxes_charge
        const depreciationChargeAssets = income.depreciation_charge_assets === undefined ? 0 : income.depreciation_charge_assets
        const totalExpenses = income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment = income.total_loan_repayment === undefined ? 0 : income.total_loan_repayment

        const data = (income.total_revenue - rawMaterials -
        totalSalaries - totalExpenses - totalLoanRepayment -
        depreciationChargeAssets - totalTaxesCharge)
        this.total_income_statement.net_profit_17 = this.thousandSeprator(data)
      },
      deep: true
    },
    income_statement_2018: {
      handler (value) {
        const income = this.income_statement_2018
        const rawMaterials = income.total_raw_materials === undefined ? 0 : income.total_raw_materials
        const totalSalaries = income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge = income.total_taxes_charge === undefined ? 0 : income.total_taxes_charge
        const depreciationChargeAssets = income.depreciation_charge_assets === undefined ? 0 : income.depreciation_charge_assets
        const totalExpenses = income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment = income.total_loan_repayment === undefined ? 0 : income.total_loan_repayment

        this.total_micro_statement.profit_18 = this.thousandSeprator(income.total_revenue - totalExpenses)
        const data = (income.total_revenue - rawMaterials -
        totalSalaries - totalExpenses - totalLoanRepayment -
        depreciationChargeAssets - totalTaxesCharge)
        this.total_income_statement.net_profit_18 = this.thousandSeprator(data)
      },
      deep: true
    },
    income_statement_2019: {
      handler (value) {
        const income = this.income_statement_2019
        const rawMaterials = income.total_raw_materials === undefined ? 0 : income.total_raw_materials
        const totalSalaries = income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge = income.total_taxes_charge === undefined ? 0 : income.total_taxes_charge
        const depreciationChargeAssets = income.depreciation_charge_assets === undefined ? 0 : income.depreciation_charge_assets
        const totalExpenses = income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment = income.total_loan_repayment === undefined ? 0 : income.total_loan_repayment

        this.total_micro_statement.profit_19 = this.thousandSeprator(income.total_revenue - totalExpenses)
        const data = (income.total_revenue - rawMaterials -
        totalSalaries - totalExpenses - totalLoanRepayment -
        depreciationChargeAssets - totalTaxesCharge)
        this.total_income_statement.net_profit_19 = this.thousandSeprator(data)
      },
      deep: true
    },
    income_statement_2020: {
      handler (value) {
        const income = this.income_statement_2020
        const rawMaterials = income.total_raw_materials === undefined ? 0 : income.total_raw_materials
        const totalSalaries = income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge = income.total_taxes_charge === undefined ? 0 : income.total_taxes_charge
        const depreciationChargeAssets = income.depreciation_charge_assets === undefined ? 0 : income.depreciation_charge_assets
        const totalExpenses = income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment = income.total_loan_repayment === undefined ? 0 : income.total_loan_repayment

        this.total_micro_statement.profit_20 = this.thousandSeprator(income.total_revenue - totalExpenses)
        const data = (income.total_revenue - rawMaterials -
        totalSalaries - totalExpenses - totalLoanRepayment -
        depreciationChargeAssets - totalTaxesCharge)
        this.total_income_statement.net_profit_20 = this.thousandSeprator(data)
      },
      deep: true
    },
    income_statement_apr_2020: {
      handler (value) {
        const income = this.income_statement_apr_2020
        const rawMaterials = income.total_raw_materials === undefined ? 0 : income.total_raw_materials
        const totalSalaries = income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge = income.total_taxes_charge === undefined ? 0 : income.total_taxes_charge
        const depreciationChargeAssets = income.depreciation_charge_assets === undefined ? 0 : income.depreciation_charge_assets
        const totalExpenses = income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment = income.total_loan_repayment === undefined ? 0 : income.total_loan_repayment

        const data = (income.total_revenue - rawMaterials -
        totalSalaries - totalExpenses - totalLoanRepayment -
        depreciationChargeAssets - totalTaxesCharge)
        this.total_income_statement.net_profit_apr_20 = this.thousandSeprator(data)
      },
      deep: true
    },
    region (value) {
      this.$store.commit('pages/SET_DISTRICTS', value)
    },
    show (value) {
      const data = this.aggregate()
      if (value === false) {
        this.$store.commit('api/SET_GENERAL_DATA', data)
      }
    }
  },
  validations: {
    general: {
      business_address: {
        required
      },
      business_association: {
        required
      },
      business_district: {
        required
      },
      business_name: {
        required
      },
      business_phone_number: {
        required
      },
      business_services: {
        required
      },
      business_town: {
        required
      },
      covid_products: {
        required
      },
      industry: {
        required
      },
      legal_organization: {
        required
      },
      social_enterprise: {
        required
      },
      tin_number: {
        required
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
    this.general.annual_sales = JSON.parse(
      localStorage.getItem('application_object')
    ).annual_sales
    this.annual_sales_display = JSON.parse(
      localStorage.getItem('application_object')
    )
      .annual_sales.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  methods: {
    aggregate () {
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
      const incomeStatementApr2020 = Object.assign({}, this.income_statement_apr_2020)

      // Clone all balance Sheet objects
      const balanceSheet2017 = Object.assign({}, this.balance_sheet_2017)
      const balanceSheet2018 = Object.assign({}, this.balance_sheet_2018)
      const balanceSheet2019 = Object.assign({}, this.balance_sheet_2019)
      const balanceSheet2020 = Object.assign({}, this.balance_sheet_2020)
      // filter out empty directors
      const directorsList = JSON.parse(
        JSON.stringify(this.directors_list)
      ).filter(value => JSON.stringify(value) !== '{}')
      const businessOwner = JSON.parse(
        JSON.stringify(this.business_owner)
      ).filter(value => JSON.stringify(value) !== '{}')
      businessOwner.forEach((item) => {
        item.is_shareholder = '1'
        item.is_director = '0'
      })
      businessOwner.forEach((item) => {
        item.is_shareholder = '1'
        item.is_director = '0'
      })
      directorsList.forEach((item) => {
        if (item.is_shareholder === undefined) {
          item.is_shareholder = '0'
        } else if (item.is_director === undefined) {
          item.is_director = '0'
        }
      })
      const creditFacilities = JSON.parse(
        JSON.stringify(this.credit_facilities)
      ).filter(value => JSON.stringify(value) !== '{}')

      const taxClearance = JSON.parse(JSON.stringify(this.tax_clearance))
      data.income_statement_2017 = incomeStatement2017
      data.income_statement_2018 = incomeStatement2018
      data.income_statement_2019 = incomeStatement2019
      data.income_statement_2020 = incomeStatement2020
      data.income_statement_apr_2020 = incomeStatementApr2020
      data.balance_sheet_2017 = balanceSheet2017
      data.balance_sheet_2018 = balanceSheet2018
      data.balance_sheet_2019 = balanceSheet2019
      data.balance_sheet_2020 = balanceSheet2020
      data.tax_clearance = taxClearance
      data.cash_flow_2017 = cashFlow2017
      data.cash_flow_2018 = cashFlow2018
      data.cash_flow_2019 = cashFlow2019
      data.cash_flow_2020 = cashFlow2020
      data.directors_list =
        data.legal_organization === '1' || data.legal_organization === '2'
          ? businessOwner
          : directorsList
      data.credit_facilities = creditFacilities
      data.business_region = this.region
      return data
    },
    moveNext () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toasted.error('Please fill in all fields', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 5000
        })
      } else {
        this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 3)
      }
    },
    movePrevious () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 1)
    },
    doneIncomeModal () {
      this.checkIncomeModal = true
      this.incomeModal = false
    },
    doneMicroIncomeModal () {
      this.checkMicroIncomeModal = true
      this.microIncomeModal = false
    },
    doneBalanceSheetModal () {
      this.checkBalanceSheetModal = true
      this.balanceSheetModal = false
    },
    doneCashFlowModal () {
      this.checkCashFlowModal = true
      this.cashFlowModal = false
    },
    doneShareHolderModal () {
      // filter out empty directors
      const directorsList = JSON.parse(
        JSON.stringify(this.directors_list)
      ).filter(value => JSON.stringify(value) !== '{}')

      const reducer = (accumulator, currentValue) =>
        accumulator + currentValue.share

      const total = directorsList.reduce(reducer, 0)
      if (total !== 100) {
        this.$toasted.error('Share percentage should equal 100%', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 5000
        })
      } else {
        this.shareHolderModal = false
        this.checkShareHolderModal = true
      }
    },
    doneOwnerModal () {
      const businessOwner = JSON.parse(
        JSON.stringify(this.business_owner)
      ).filter(value => JSON.stringify(value) !== '{}')

      const reducer = (accumulator, currentValue) =>
        accumulator + currentValue.share

      const total = businessOwner.reduce(reducer, 0)
      if (total !== 100) {
        this.$toasted.error('Ownership percentage should equal 100%', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 5000
        })
      } else {
        this.checkOwnerModal = true
        this.ownerModal = false
      }
    },
    doneEmployeesModal () {
      this.checkEmployeesModal = true
      this.employeesModal = false
    },
    async save () {
      this.$toasted.show('Saved', {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 7000
      })
      await (new Promise((resolve, reject) => {
        const data = this.aggregate()
        this.$store.commit('api/SET_GENERAL_DATA', data)
        resolve(data)
      }))
      this.$store.dispatch('api/saveApplication')
        .then(() => {
          this.$toasted.show('Saved', {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 5000
          })
        })
    },
    thousandSeprator (amount) {
      if (amount !== '' || amount !== undefined || amount !== 0 || amount !== '0' || amount !== null) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return amount
      }
    }
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
    &:focus {
      outline: none;
    }
    &.done {
      color: rgb(31, 189, 17);
      border-color: rgb(31, 189, 17);
    }
  }
}
.income-info {
  width: 100%;
}
.c-f {
  grid-template-columns: 18% 18% 12% 12% 12% 12%;
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
  .buttons {
    justify-content: space-between;
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
@include for-tablet-landscape-only {
  .form-c {
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
