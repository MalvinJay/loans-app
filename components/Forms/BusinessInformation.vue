<template>
  <div v-show="show">
    <div class="grid form-c py-20">
      <div class="mb-10">
        <Input name="Business Name" />
      </div>
      <div class="mb-10">
        <Input name="SSNIT Employer Number (Optional)" />
      </div>
      <!-- <div>
        <label class="block text-gray-700 text-sm font-normal mb-2 font-bold" for="username">Gender</label>
        <div class="flex justify-start">
          <Checkbox>Male</Checkbox>
          <Checkbox>Female</Checkbox>
        </div>
      </div>
      <div class="mb-12">
        <Input name="Email Address" />
      </div>-->
      <div>
        <label
          class="block text-gray-700 text-sm font-normal mb-2 font-bold"
          for="username"
        >Business Address</label>
      </div>
      <div />
      <div class="mb-12">
        <div class="mb-6">
          <Input placeholder="Street" />
        </div>
        <div>
          <Select />
        </div>
      </div>
      <div class="mb-12">
        <div class="mb-6">
          <Input placeholder="Town" />
        </div>
        <div>
          <Select />
        </div>
      </div>
      <div class="mb-12">
        <Input name="Business Number" />
      </div>
      <div class="mb-12">
        <Input name="Business Email Address" />
      </div>
      <div class="mb-12">
        <Input name="Years in Operation" />
      </div>
      <div class="mb-12">
        <Input name="Annual Sales" />
      </div>
      <div class="mb-12">
        <Input name="TIN" />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Legal Organization</label>
        <Select />
      </div>
      <div class="mb-12">
        <Input name="Business Digital Address Code" placeholder="GA-xxx-xxxx" />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Industry</label>
        <Select />
      </div>
      <div class="mb-12">
        <Input name="Main Product or Services" />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Business Mission</label>
        <Select />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Business Association</label>
        <Select />
      </div>
      <div class="mb-12">
        <label class="block text-gray-900 text-sm font-bold mb-2">Business Owner</label>
        <button class="i-t-b" @click="ownerModal=true">
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
      <div class="mb-12">
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
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2020F</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">Jan-April</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Revenue</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount Paid for Raw Materials</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Amount Paid for Salaries</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Expenses (excluding raw materials and salaries)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount Charged on Loan Interest Payments</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Depreciation Charge on Assets</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Charge in Taxes</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Net Profit</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
        </div>
        <div class="mt-3">
          <label
            class="block text-gray-700 text-sm font-normal mb-2"
          >Is the business currently servicing any credit (loan, overdraft, letter or credit, etc)</label>
          <div class="flex">
            <Checkbox>Yes</Checkbox>
            <Checkbox>No</Checkbox>
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
          <div class="mt-10">
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
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2020F</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">Jan-April</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount of Receivable (how much is owed by customers)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Net Property, Plant and Equipment</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Any Other Short Term Assets</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Amount of Payables (how much is owed to suppliers by the company)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Overdraft Outstanding (yet to be paid to the bank)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Any Other Short Term Liabilities</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Value of Equity (if shares have been issued)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Value of retained earnings (sum of net profit from previous years + net profit from this year)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
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
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">2020F</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold text-center mt-10 not-mobile">Jan-April</label>
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >EBIT (calculated from income statement)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Depreciation (taken from income statement)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Change in Working Capital (calculated from balance sheet)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Any Tax Paid in Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Interest Amount Paid in Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Capital Expenditure (total value of plant and building equipment purchased this year)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Total Value of Equity Sold</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Value of New Credit Facilities Taken this Year (if shares have been issued)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Total Value of Outstanding Loan Principal this Year</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-bold mb-2"
            >Beginning Cash (ending cash from previous year)</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Change in Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-bold mb-2">Ending Cash</label>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2017</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2018</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2019</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">2020F</label>
            <Input placeholder="GHC" small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Jan-April</label>
            <Input placeholder="GHC" small />
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
            Director and Shareholder
          </p>
        </div>
        <div class="grid gap-8 b-d">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <Checkbox>Male</Checkbox>
              <Checkbox>Female</Checkbox>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input small />
          </div>
          <div>
            <label
              class="block text-gray-900 text-sm font-normal mb-2"
            >Status (select all that's applicable)</label>
            <div class="flex">
              <Checkbox class="mr-5">
                Director
              </Checkbox>
              <Checkbox>Shareholder</Checkbox>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input small />
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
            Business Owner
          </p>
        </div>
        <div class="grid gap-8 b-d">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
            <Input small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">TIN</label>
            <Input small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
            <Input small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
            <div class="flex">
              <Checkbox>Male</Checkbox>
              <Checkbox>Female</Checkbox>
            </div>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
            <Input small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
            <Input small />
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
    ========================================= TaxClearance ===================================================-->
    <Modal v-if="taxModal" @close="taxModal=false">
      <div>
        <div class="h-d mb-10">
          <p class="text-center text-lg font-bold">
            Tax Clearance Certificate
          </p>
        </div>
        <div class="grid grid-cols-4 gap-8 b-d">
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Number</label>
            <Input small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2" for="username">TIN</label>
            <input type="date" name>
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">GRA Issue Offic</label>
            <Input small />
          </div>
          <div>
            <label class="block text-gray-900 text-sm font-normal mb-2">Date Valid Up To</label>
            <input type="date">
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
import Checkbox from './Checkbox'
import Select from './Select'
export default {
  components: {
    Input,
    Checkbox,
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
      taxModal: false,
      micro: false,
      general: {}
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
    }
  },
  created () {
    // eslint-disable-next-line no-console
    if (this.$route.params.amount < 145000) {
      this.micro = true
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
