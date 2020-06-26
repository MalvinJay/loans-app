<template>
  <div v-show="show">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(moveNext)">
        <div class="grid form-c py-20">
          <div class="mb-10">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input v-model="general.business_name" type="text" required name="Business Name" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
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
            <label class="block text-gray-700 text-sm font-normal mb-2 font-bold" for="username">
              Business Address
              <span class="text-red-600">*</span>
            </label>
          </div>
          <div />
          <div class="mb-12">
            <div class="mb-6">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Input v-model="general.business_address" type="text" placeholder="Address" />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Select v-model="region" first="Region" :items="regions" />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
          </div>
          <div class="mb-12">
            <div class="mb-6">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Input v-model="general.business_town" type="text" placeholder="Town" />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <Select v-model="general.business_district" first="District" :items="districts" />
                <small class="text-sm text-red-700">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
          </div>
          <div class="mb-12">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input
                v-model="general.business_phone_number"
                type="text"
                name="Business Phone Number"
                regex="0[2-5]{1}[0-9]{1}[0-9]{6,7}$"
                required
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
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
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input
                v-model="general.tin_number"
                type="text"
                name="Tax Identification Number (TIN)"
                optional
                regex="([A-Z]{1})([0-9]{10})$"
                required
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
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
            <label class="block text-gray-900 text-sm font-bold mb-2">
              Industry
              <span class="text-red-600">*</span>
            </label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Select v-model="general.industry" :items="industry" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <label class="block text-gray-900 text-sm font-bold mb-2">
              Legal Organization
              <span class="text-red-600">*</span>
            </label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Select v-model="general.legal_organization" :items="legalOrganization" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input
                v-model="general.business_services"
                type="text"
                name="Main Product(s) or Service(s)"
                placeholder="Please type it in"
                required
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <label class="block text-gray-900 text-sm font-bold mb-2">
              Business Mission
              <span class="text-red-600">*</span>
            </label>
            <label class="block text-gray-900 text-sm font-normal mb-2">Are you a Social Enterprise?</label>
            <label class="block text-gray-900 text-sm font-normal mb-2 text-sm">
              An enterprise that has a pre-defined primary social purpose, environmental or other public benefit, and reinvests the majority of its annual profits towards achieving the social purpose
            </label>
            <ValidationProvider v-slot="{ errors }" rules="required">
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
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Do you provide C0VID-19 Product(s) & Service(s)? (e.g PPE manufacturing)</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
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
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <label class="block text-gray-900 text-sm font-bold mb-2">
              Business Association
              <span class="text-red-600">*</span>
            </label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Select v-model="general.business_association" :items="businessAssociation" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
            <label
              v-if="general.business_association === '80'"
              class="block text-gray-900 text-sm mt-2"
            >If other, please provide your Business Association</label>
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
            <button
              type="button"
              class="i-t-b"
              :class="{done: checkOwnerModal}"
              @click="ownerModal=true"
            >
              Click to Fill in Template
              <span v-if="checkOwnerModal">&#10003;</span>
            </button>
          </div>
          <div class="mb-12">
            <label class="block text-gray-900 text-sm font-bold mb-2">Employees</label>
            <button
              type="button"
              class="i-t-b"
              :class="{done: checkEmployeesModal}"
              @click="employeesModal=true"
            >
              Click to Fill in Template
              <span v-if="checkEmployeesModal">&#10003;</span>
            </button>
          </div>
          <div
            v-if="(businessScale === '1' || businessScale === '2') && isStartup === false"
            class="mb-12"
          >
            <label class="block text-gray-900 text-sm font-bold mb-2">Income Statement</label>
            <button
              type="button"
              class="i-t-b"
              :class="{done: checkMicroIncomeModal}"
              @click="microIncomeModal=true"
            >
              Click to Fill in Template
              <span v-if="checkMicroIncomeModal">&#10003;</span>
            </button>
          </div>
          <div v-else class="mb-12">
            <label class="block text-gray-900 text-sm font-bold mb-2">Income Statement</label>
            <button
              type="button"
              class="i-t-b"
              :class="{done: checkIncomeModal}"
              @click="incomeModal=true"
            >
              Click to Fill in Template
              <span v-if="checkIncomeModal">&#10003;</span>
            </button>
          </div>
          <div
            v-if="(businessScale === '4' || businessScale === '5') && isStartup === false"
            class="mb-12"
          >
            <label class="block text-gray-900 text-sm font-bold mb-2">Balance Sheet</label>
            <button
              type="button"
              class="i-t-b"
              :class="{done: checkBalanceSheetModal}"
              @click="balanceSheetModal=true"
            >
              Click to Fill in Template
              <span v-if="checkBalanceSheetModal">&#10003;</span>
            </button>
          </div>
          <div
            v-if="(businessScale === '4' || businessScale === '5') && isStartup === false"
            class="mb-12"
          >
            <label class="block text-gray-900 text-sm font-bold mb-2">Cash Flow</label>
            <button
              type="button"
              class="i-t-b"
              :class="{done: checkCashFlowModal}"
              @click="cashFlowModal=true"
            >
              Click to Fill in Template
              <span v-if="checkCashFlowModal">&#10003;</span>
            </button>
          </div>
          <div
            v-if="general.legal_organization === '3' || general.legal_organization === '4' || general.legal_organization === '5'"
            class="mb-12"
          >
            <label class="block text-gray-900 text-sm font-bold mb-2">Director and Shareholder List</label>
            <button
              type="button"
              class="i-t-b"
              :class="{done: checkShareHolderModal}"
              @click="shareHolderModal=true"
            >
              Click to Fill in Template
              <span v-if="checkShareHolderModal">&#10003;</span>
            </button>
          </div>
        </div>
        <div class="nav-buttons">
          <div class="flex flex-wrap gap-8">
            <button class="next" type="submit">
              Next
            </button>
            <button class="previous" type="button" @click="movePrevious">
              Previous
            </button>
            <button class="previous small" type="button" @click="save">
              Save
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
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
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >2019 (required)</label>
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
            <button type="submit" class="button-small" @click="doneIncomeModal">
              Done
            </button>
            <button type="button" class="button-small" @click="incomeModal= false">
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
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >2019 (required)</label>
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
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Loans Outstanding</label>
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
            <label class="block text-gray-900 text-sm font-bold mb-2">Value of Equity</label>
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
            <label class="block text-gray-900 text-sm font-bold mb-2">Any Other Equity</label>
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
          <button type="submit" class="button-small" @click="doneBalanceSheetModal">
            Done
          </button>
          <button type="button" class="button-small" @click="balanceSheetModal= false">
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
            <label
              class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
            >2019 (required)</label>
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Value of Equity Sold (if shares have been issued)</label>
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
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
              placeholder="CALCULATED"
              money
              small
            />
          </div>
        </div>
        <div class="my-20 flex gap-3 buttons">
          <button type="submit" class="button-small" @click="doneCashFlowModal">
            Done
          </button>
          <button type="button" class="button-small" @click="cashFlowModal= false">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
    <!-- =============================================================================================================
    ========================================= DIRECTOR AND SHAREHOLDER MODAL ===================================================-->
    <Modal v-if="shareHolderModal" @close="shareHolderModal=false">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(doneShareHolderModal)">
          <div class="d-s">
            <div class="h-d mb-10">
              <p class="text-center text-lg font-bold">
                Director and Shareholder List
              </p>
            </div>
            <div v-if="shareHolders >= 1" class="grid gap-8 b-d">
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[0].name"
                    regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                    type="text"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-normal mb-2"
                >Tax Identification Number(TIN)</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.trim="directors_list[0].tin_number"
                    regex="([P]{1})([0-9]{10})$"
                    type="text"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="directors_list[0].age"
                    type="text"
                    regex="^[1-9][0-9]?$|^100$"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
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
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Select
                      v-model="directors_list[0].nationality"
                      first="Country"
                      :items="countries"
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="directors_list[0].share" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
            <div v-if="shareHolders >= 2" class="grid gap-8 b-d mt-12">
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[1].name"
                    regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                    type="text"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-normal mb-2"
                >Tax Identification Number(TIN)</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[1].tin_number"
                    type="text"
                    small
                    regex="([P]{1})([0-9]{10})$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="directors_list[1].age"
                    type="text"
                    small
                    regex="^[1-9][0-9]?$|^100$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
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
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Select
                      v-model="directors_list[1].nationality"
                      first="Country"
                      :items="countries"
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="directors_list[1].share" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
            <div v-if="shareHolders >= 3" class="grid gap-8 b-d mt-12">
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[2].name"
                    regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                    type="text"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-normal mb-2"
                >Tax Identification Number(TIN)</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[2].tin_number"
                    type="text"
                    small
                    regex="([P]{1})([0-9]{10})$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="directors_list[2].age"
                    type="text"
                    small
                    regex="^[1-9][0-9]?$|^100$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
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
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Select
                      v-model="directors_list[2].nationality"
                      first="Country"
                      :items="countries"
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="directors_list[2].share" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
            <div v-if="shareHolders >= 4" class="grid gap-8 b-d mt-12">
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[3].name"
                    regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                    type="text"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-normal mb-2"
                >Tax Identification Number(TIN)</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[3].tin_number"
                    type="text"
                    small
                    regex="([P]{1})([0-9]{10})$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="directors_list[3].age"
                    type="text"
                    small
                    regex="^[1-9][0-9]?$|^100$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
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
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Select
                      v-model="directors_list[3].nationality"
                      first="Country"
                      :items="countries"
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="directors_list[3].share" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
            <div v-if="shareHolders >= 5" class="grid gap-8 b-d mt-12">
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[4].name"
                    regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                    type="text"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-normal mb-2"
                >Tax Identification Number(TIN)</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[4].tin_number"
                    type="text"
                    small
                    regex="([P]{1})([0-9]{10})$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="directors_list[4].age"
                    type="text"
                    small
                    regex="^[1-9][0-9]?$|^100$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
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
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Select
                      v-model="directors_list[4].nationality"
                      first="Country"
                      :items="countries"
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="directors_list[4].share" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
            <div class="flex gap-6">
              <small
                class="text-blue-600 cursor-pointer"
                @click="shareHolders +=1"
              >Add another Director/Shareholder</small>
              <small
                v-if="shareHolders > 1"
                class="text-red-600 cursor-pointer"
                @click="shareHolders -=1"
              >Remove Director/Shareholder</small>
            </div>
            <div class="my-20 flex gap-3 buttons">
              <button type="submit" class="button-small">
                Done
              </button>
              <button type="button" class="button-small" @click="shareHolderModal = false">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </Modal>
    <!-- =============================================================================================================
    ========================================= Micro Income Modal ===================================================-->
    <Modal v-if="microIncomeModal" @close="microIncomeModal=false">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(doneMicroIncomeModal)">
          <div class="d-s micro">
            <div class="h-d mb-10">
              <p class="text-center text-lg font-bold">
                Income Statement
              </p>
            </div>
            <div class="grid grid-cols-4 gap-8 micro">
              <div />
              <div>
                <label
                  class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
                >2018</label>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile"
                >2019</label>
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
              <div class="first">
                <label
                  class="mb-5 block text-gray-900 text-sm font-bold text-center mt-10 mobile"
                >2018</label>
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total Revenue 2018</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2018.total_revenue"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="second">
                <label
                  class="mb-5 block text-gray-900 text-sm font-bold text-center mt-10 mobile"
                >2019</label>
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Total Revenue 2019</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2019.total_revenue"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="third">
                <label
                  class="mb-5 block text-gray-900 text-sm font-bold text-center mt-10 mobile"
                >Jan 2020 - April 2020</label>
                <label
                  class="block text-gray-900 text-sm font-normal mb-2 mobile"
                >Total Revenue Jan 2020 - April 2020</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2020.total_revenue"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-bold text-left mt-10 not-mobile"
                >Total Expenses</label>
              </div>
              <div class="fourth">
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Income Statement 2018</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2018.total_expenses"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="fifth">
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Income Statement 2019</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2019.total_expenses"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="sixth">
                <label
                  class="block text-gray-900 text-sm font-normal mb-2 mobile"
                >Income Statement Jan 2020 - April 2020</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2020.total_expenses"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-bold text-left mt-10 not-mobile"
                >Profit Before Tax</label>
              </div>
              <div class="seventh">
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Net Profit 2018</label>
                <Input
                  v-model="total_micro_statement.profit_18"
                  type="text"
                  placeholder="GHS"
                  money
                  small
                  disabled
                />
              </div>
              <div class="eighth">
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Net Profit 2019</label>
                <Input
                  v-model="total_micro_statement.profit_19"
                  type="text"
                  placeholder="GHS"
                  money
                  small
                  disabled
                />
              </div>
              <div class="ninth">
                <label
                  class="block text-gray-900 text-sm font-normal mb-2 mobile"
                >Net Profit Jan 2020 - April 2020</label>
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
                <button class="button-small" type="submit">
                  Done
                </button>
                <button type="button" class="button-small" @click="microIncomeModal= false">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </Modal>
    <!-- =============================================================================================================
    ========================================= Business Owner ===================================================-->
    <Modal v-if="ownerModal" @close="ownerModal=false">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(doneOwnerModal)">
          <div v-if="businessOwners >= 1" class="d-s">
            <div class="grid gap-8 b-d">
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="business_owner[0].name"
                    regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                    type="text"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-normal mb-2"
                >Tax Identification Number(TIN)</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="business_owner[0].tin_number"
                    type="text"
                    small
                    regex="([P]{1})([0-9]{10})$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="business_owner[0].age"
                    type="text"
                    small
                    regex="^[1-9][0-9]?$|^100$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
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
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Select
                      v-model="business_owner[0].nationality"
                      first="Country"
                      :items="countries"
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="business_owner[0].share" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div v-if="businessOwners >= 2" class="d-s">
            <div class="grid gap-8 b-d mt-12">
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="business_owner[1].name"
                    regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                    type="text"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-normal mb-2"
                >Tax Identification Number(TIN)</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="business_owner[1].tin_number"
                    type="text"
                    small
                    regex="([P]{1})([0-9]{10})$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="business_owner[1].age"
                    type="text"
                    small
                    regex="^[1-9][0-9]?$|^100$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
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
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Select
                      v-model="business_owner[1].nationality"
                      first="Country"
                      :items="countries"
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="business_owner[1].share" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div v-if="businessOwners >= 3" class="d-s">
            <div class="grid gap-8 b-d mt-12">
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="business_owner[2].name"
                    regex="^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$"
                    type="text"
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label
                  class="block text-gray-900 text-sm font-normal mb-2"
                >Tax Identification Number(TIN)</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="business_owner[2].tin_number"
                    type="text"
                    small
                    regex="([P]{1})([0-9]{10})$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="business_owner[2].age"
                    type="text"
                    small
                    regex="^[1-9][0-9]?$|^100$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
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
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Select
                      v-model="business_owner[2].nationality"
                      first="Country"
                      :items="countries"
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="business_owner[2].share" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="flex gap-6">
            <small
              class="text-blue-600 cursor-pointer"
              @click="businessOwners +=1"
            >Add another Owner</small>
            <small
              v-if="businessOwners > 1"
              class="text-red-600 cursor-pointer"
              @click="businessOwners -=1"
            >Remove Owner</small>
          </div>
          <div class="my-20 flex gap-3 buttons">
            <button type="submit" class="button-small">
              Done
            </button>
            <button type="button" class="button-small" @click="ownerModal = false">
              Cancel
            </button>
          </div>
        </form>
      </ValidationObserver>
    </Modal>
    <!-- =============================================================================================================
    ========================================= Employees Modal ===================================================-->
    <Modal v-if="employeesModal" @close="employeesModal=false">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(doneEmployeesModal)">
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="general.number_of_employees" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Permanent Employees</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="general.permanent_employees" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Temporary Employees</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="general.temporary_employees" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label class="block text-gray-900 text-sm font-normal mb-2">Female Employees</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="general.female_employees" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="my-20 flex gap-3 buttons">
            <button class="button-small" type="submit">
              Done
            </button>
            <button type="button" class="button-small" @click="employeesModal= false">
              Cancel
            </button>
          </div>
        </form>
      </ValidationObserver>
    </Modal>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Modal from '../Misc/Modal'
import Input from './Input'
import Select from './Select'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
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
      // annual_sales_display: null,
      businessOwners: 1,
      shareHolders: 1
    }
  },
  computed: {
    ...mapGetters({
      businessAssociation: 'pages/businessAssociation',
      legalOrganization: 'pages/legalOrganization',
      industry: 'pages/industry',
      businessScale: 'pages/businessScale',
      isStartup: 'pages/isStartup',
      regions: 'pages/regions',
      districts: 'pages/businessDistricts',
      countries: 'pages/countries',
      token: 'local/token'
    }),
    ...mapState({
      pendingApplication: state => state.api.pendingApplication,
      applicationObject: state => state.pages.application_object,
      generalStoreGeneral: state => state.api.general
    }),
    details: {
      get () {
        if (this.pendingApplication) {
          return Object.assign({}, this.pendingApplication.loan_application)
        } else {
          return {}
        }
      }
    },
    prefill: {
      get () {
        if (this.generalStoreGeneral) {
          return Object.assign({}, this.generalStoreGeneral)
        } else {
          return {}
        }
      }
    },
    annual_sales_display () {
      if (!this.token && this.applicationObject) {
        const amount = this.applicationObject.annual_sales
        return this.thousandSeprator(amount)
      } else {
        // eslint-disable-next-line no-debugger
        return this.details.annual_sales ? this.thousandSeprator(this.details.annual_sales) : ''
      }
    }
  },
  watch: {
    details: {
      handler (value) {
        this.general = value
        this.region = value.business_region
        if (value.directors_list.length !== 0 && this.show === true) {
          if (value.legal_organization === '3' || value.legal_organization === '4' || value.legal_organization === '5') {
            this.directors_list = JSON.parse(JSON.stringify([...value.directors_list, ...this.directors_list]))
            this.shareHolders = value.directors_list.length
          } else {
            this.business_owner = JSON.parse(JSON.stringify([...value.directors_list, ...this.business_owner]))
            this.businessOwners = value.directors_list.length
          }
        }
        this.income_statement_2017 = { ...this.income_statement_2017, ...value.income_statement_2017 }
        this.income_statement_2018 = { ...this.income_statement_2018, ...value.income_statement_2018 }
        this.income_statement_2019 = { ...this.income_statement_2019, ...value.income_statement_2019 }
        this.income_statement_2020 = { ...this.income_statement_2020, ...value.income_statement_2020 }
        this.income_statement_apr_2020 = { ...this.income_statement_apr_2020, ...value.income_statement_apr_2020 }
        this.cash_flow_2017 = { ...this.cash_flow_2017, ...value.cash_flow_2017 }
        this.cash_flow_2018 = { ...this.cash_flow_2018, ...value.cash_flow_2018 }
        this.cash_flow_2019 = { ...this.cash_flow_2019, ...value.cash_flow_2019 }
        this.cash_flow_2020 = { ...this.cash_flow_2020, ...value.cash_flow_2020 }
        this.balance_sheet_2017 = { ...this.balance_sheet_2017, ...value.balance_sheet_2017 }
        this.balance_sheet_2018 = { ...this.balance_sheet_2018, ...value.balance_sheet_2018 }
        this.balance_sheet_2019 = { ...this.balance_sheet_2019, ...value.balance_sheet_2019 }
        this.balance_sheet_2020 = { ...this.balance_sheet_2020, ...value.balance_sheet_2020 }
        if (this.show === true) {
          this.credit_facilities = JSON.parse(JSON.stringify([...value.credit_facilities, ...this.credit_facilities]))
        }
      },
      deep: true
    },
    businessOwners (value) {
      this.business_owner.forEach((item, key) => {
        if (key > value - 1) {
          this.business_owner[key] = {}
        }
      })
    },
    shareHolders (value) {
      this.business_owner.forEach((item, key) => {
        if (key > value - 1) {
          this.business_owner[key] = {}
        }
      })
    },
    income_statement_2017: {
      handler (value) {
        const income = this.income_statement_2017
        // eslint-disable-next-line no-console
        const rawMaterials =
          income.total_raw_materials === undefined
            ? 0
            : income.total_raw_materials
        const totalSalaries =
          income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge =
          income.total_taxes_charge === undefined
            ? 0
            : income.total_taxes_charge
        const depreciationChargeAssets =
          income.depreciation_charge_assets === undefined
            ? 0
            : income.depreciation_charge_assets
        const totalExpenses =
          income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment =
          income.total_loan_repayment === undefined
            ? 0
            : income.total_loan_repayment

        const data =
          income.total_revenue -
          rawMaterials -
          totalSalaries -
          totalExpenses -
          totalLoanRepayment -
          depreciationChargeAssets -
          totalTaxesCharge
        this.total_income_statement.net_profit_17 = this.thousandSeprator(data)
      },
      deep: true
    },
    income_statement_2018: {
      handler (value) {
        const income = this.income_statement_2018
        const rawMaterials =
          income.total_raw_materials === undefined
            ? 0
            : income.total_raw_materials
        const totalSalaries =
          income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge =
          income.total_taxes_charge === undefined
            ? 0
            : income.total_taxes_charge
        const depreciationChargeAssets =
          income.depreciation_charge_assets === undefined
            ? 0
            : income.depreciation_charge_assets
        const totalExpenses =
          income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment =
          income.total_loan_repayment === undefined
            ? 0
            : income.total_loan_repayment

        this.total_micro_statement.profit_18 = this.thousandSeprator(
          income.total_revenue - totalExpenses
        )
        const data =
          income.total_revenue -
          rawMaterials -
          totalSalaries -
          totalExpenses -
          totalLoanRepayment -
          depreciationChargeAssets -
          totalTaxesCharge
        this.total_income_statement.net_profit_18 = this.thousandSeprator(data)
      },
      deep: true
    },
    income_statement_2019: {
      handler (value) {
        const income = this.income_statement_2019
        const rawMaterials =
          income.total_raw_materials === undefined
            ? 0
            : income.total_raw_materials
        const totalSalaries =
          income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge =
          income.total_taxes_charge === undefined
            ? 0
            : income.total_taxes_charge
        const depreciationChargeAssets =
          income.depreciation_charge_assets === undefined
            ? 0
            : income.depreciation_charge_assets
        const totalExpenses =
          income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment =
          income.total_loan_repayment === undefined
            ? 0
            : income.total_loan_repayment

        this.total_micro_statement.profit_19 = this.thousandSeprator(
          income.total_revenue - totalExpenses
        )
        const data =
          income.total_revenue -
          rawMaterials -
          totalSalaries -
          totalExpenses -
          totalLoanRepayment -
          depreciationChargeAssets -
          totalTaxesCharge
        this.total_income_statement.net_profit_19 = this.thousandSeprator(data)
      },
      deep: true
    },
    income_statement_2020: {
      handler (value) {
        const income = this.income_statement_2020
        const rawMaterials =
          income.total_raw_materials === undefined
            ? 0
            : income.total_raw_materials
        const totalSalaries =
          income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge =
          income.total_taxes_charge === undefined
            ? 0
            : income.total_taxes_charge
        const depreciationChargeAssets =
          income.depreciation_charge_assets === undefined
            ? 0
            : income.depreciation_charge_assets
        const totalExpenses =
          income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment =
          income.total_loan_repayment === undefined
            ? 0
            : income.total_loan_repayment

        this.total_micro_statement.profit_20 = this.thousandSeprator(
          income.total_revenue - totalExpenses
        )
        const data =
          income.total_revenue -
          rawMaterials -
          totalSalaries -
          totalExpenses -
          totalLoanRepayment -
          depreciationChargeAssets -
          totalTaxesCharge
        this.total_income_statement.net_profit_20 = this.thousandSeprator(data)
      },
      deep: true
    },
    income_statement_apr_2020: {
      handler (value) {
        const income = this.income_statement_apr_2020
        const rawMaterials =
          income.total_raw_materials === undefined
            ? 0
            : income.total_raw_materials
        const totalSalaries =
          income.total_salaries === undefined ? 0 : income.total_salaries
        const totalTaxesCharge =
          income.total_taxes_charge === undefined
            ? 0
            : income.total_taxes_charge
        const depreciationChargeAssets =
          income.depreciation_charge_assets === undefined
            ? 0
            : income.depreciation_charge_assets
        const totalExpenses =
          income.total_expenses === undefined ? 0 : income.total_expenses
        const totalLoanRepayment =
          income.total_loan_repayment === undefined
            ? 0
            : income.total_loan_repayment

        const data =
          income.total_revenue -
          rawMaterials -
          totalSalaries -
          totalExpenses -
          totalLoanRepayment -
          depreciationChargeAssets -
          totalTaxesCharge
        this.total_income_statement.net_profit_apr_20 = this.thousandSeprator(
          data
        )
      },
      deep: true
    },
    region (value) {
      this.$store.commit('pages/SET_BUSINESS_DISTRICTS', value)
    },
    regions (value) {
      // for continuing applications: if region exists get districts
      if (this.region) {
        this.$store.commit('pages/SET_BUSINESS_DISTRICTS', this.region)
      }
    },
    show (value) {
      const data = this.aggregate()
      if (value === false) {
        this.$store.commit('api/SET_GENERAL_DATA', data)
        // Update existing application
        if (this.pendingApplication !== null) {
          this.$store.commit('api/MERGE_DATA', data)
        }
      }
    },
    prefill: {
      handler (value) {
        this.general = value
      }
    }
  },
  mounted () {
    if (!this.token && this.applicationObject) {
      this.general.annual_sales = this.applicationObject.annual_sales
    }
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
      const incomeStatementApr2020 = Object.assign(
        {},
        this.income_statement_apr_2020
      )

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
      data.income_statement_2017 = incomeStatement2017
      data.income_statement_2018 = incomeStatement2018
      data.income_statement_2019 = incomeStatement2019
      data.income_statement_2020 = incomeStatement2020
      data.income_statement_apr_2020 = incomeStatementApr2020
      data.balance_sheet_2017 = balanceSheet2017
      data.balance_sheet_2018 = balanceSheet2018
      data.balance_sheet_2019 = balanceSheet2019
      data.balance_sheet_2020 = balanceSheet2020
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
      if (this.businessScale !== '1' && this.businessScale !== '2' && this.isStartup === false) {
        this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 3)
      } else {
        this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 4)
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
    save () {
      this.$store.commit('api/SET_GENERAL_DATA', this.aggregate())
      this.$store.commit('pages/SET_SAVE_MODAL', true)
    },
    thousandSeprator (amount) {
      if (
        amount !== '' ||
        amount !== undefined ||
        amount !== 0 ||
        amount !== '0' ||
        amount !== null
      ) {
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
 .d-s {
    .grid {
      grid-template-columns: 100%;
    }
  // move nav buttons up after grid rearrangement
    .button-small {
      margin-top: -17rem;
    }
  }
  .first {
    order: -99999;
  }
  .fourth {
    order: -88888;
  }
  .seventh {
    order: -77777;
  }
  .second {
    margin-top: 3rem;
    order: -66666;
  }
  .fifth {
    order: -55555;
  }
  .eighth {
    order: -44444;
  }
  .third {
    margin-top: 3rem;
    order: -33333;
  }
  .sixth {
    order: -22222;
  }
  .ninth {
    order: -11111
  }
}
input[type="date"] {
  width: 100%;
  padding-right: 0px;
}
@include for-tablet-portrait-only {
  .d-s {
    &.micro {
      .grid {
        grid-template-columns: 20% 20% 20% 20%;
      }
    }
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
</style>
