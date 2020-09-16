<template>
  <div v-show="show">
    <ValidationObserver v-slot="{ handleSubmit, valid }">
      <form @submit.prevent="handleSubmit(moveNext)">
        <div class="grid form-c py-20">
          <div class="mb-10">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input v-model="general.business_name" tooltip="Enter the name of the Business for which you requesting funding. " type="text" required name="Business Name" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-10">
            <Input
              v-model="general.ssnit_employer_no"
              tooltip=" Enter the SSNIT Employer Registration number if you have one"
              type="text"
              name="SSNIT Employer Number (Optional)"
              regex="[0-9]$"
              optional
            />
          </div>
          <div>
            <div class="flex">
              <label class="block text-gray-700 text-sm font-normal mb-2 font-bold" for="username">
                Business Address
                <span class="text-red-600">*</span>
              </label>
              <div
                v-tooltip="'Enter your Business location address with your Street Name and not Post-office address. Also select your region and district'"
                class="ml-4 tooltip-btn flex items-center justify-center"
              >
                ?
              </div>
            </div>
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
                tooltip="Enter the phone number for your business. If it is the same as your personal number, enter it again."
                type="text"
                name="Main Phone Number"
                regex="0[2-5]{1}[0-9]{1}[0-9]{6,7}$"
                required
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <Input
              v-model="general.business_email"
              tooltip="Enter the E-mail address you use for business activities"
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
                tooltip="Input the Business Owner TIN if available otherwise input TIN of business owner"
                type="text"
                name="Business Tax Identification Number"
                optional
                required
                regex="([Pp|Cc]{1})(([0-9]|[A-Za-z]){10})$"
              />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <Input
              v-model="general.business_digital_address_code"
              type="text"
              tooltip=" Generate your Digital Address from the Ghana Post GPS app. This will help the programme locate you"
              name="Business Digital Address Code (Optional)"
              placeholder="GA-xxx-xxxx"
              regex="[A-Z]{2}-[0-9]{3,4}-[0-9]{4}$"
              optional
            />
          </div>
          <div class="mb-12">
            <div class="flex">
              <label class="block text-gray-900 text-sm font-bold mb-2">
                Industry
                <span class="text-red-600">*</span>
              </label>

              <div
                v-tooltip="'Enter the Industry your business in operating under, not necessarily registered. E.g. If you are Tailor/Seamstress you under Textiles and Garment Industry'"
                class="ml-4 tooltip-btn flex items-center justify-center"
              >
                ?
              </div>
            </div>

            <ValidationProvider v-slot="{ errors }" rules="required">
              <Select v-model="general.industry" :items="industry" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <div class="flex">
              <label class="block text-gray-900 text-sm font-bold mb-2">
                Legal Organization
                <span class="text-red-600">*</span>
              </label>

              <div
                v-tooltip="'Select how your business should be categorised if you are registered. If you are not registered at the Registrar General’s Department just select unregistered.'"
                class="ml-4 tooltip-btn flex items-center justify-center"
              >
                ?
              </div>
            </div>

            <ValidationProvider v-slot="{ errors }" rules="required">
              <Select v-model="general.legal_organization" :items="legalOrganization" />
              <small class="text-sm text-red-700">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mb-12">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <Input
                v-model="general.business_services"
                tooltip="Enter the specific products and services that your business provides to its customers. E.g. if you are a fruit processor you put in juice"
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

            <div class="flex items-end">
              <label class="block text-gray-900 text-sm font-normal mb-2 text-sm w-11/12">
                An enterprise that has a pre-defined primary social purpose, environmental or other public benefit, and reinvests the majority of its annual profits towards achieving the social purpose
              </label>
              <div
                v-tooltip="'Select YES if your business is a Social Enterprise. Select No if otherwise.'"
                class="ml-4 tooltip-btn flex items-center justify-center"
              >
                ?
              </div>
            </div>

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
            <div class="flex">
              <label class="block text-gray-900 text-sm font-normal mb-2 w-11/12">
                Do you provide C0VID-19 Product(s) & Service(s)? (e.g PPE manufacturing)
              </label>
              <div
                v-tooltip="'Select YES if your business produces COVID 19 related products or not. Select NO if otherwise.'"
                class="ml-4 tooltip-btn flex items-center justify-center"
              >
                ?
              </div>
            </div>

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
            <div class="flex">
              <label class="block text-gray-900 text-sm font-bold mb-2">
                Business Association
                <span class="text-red-600">*</span>
              </label>

              <div
                v-tooltip="'If you belong to a business association, look through the list and select that association. If you cannot find your association in the list provided select “Other” and provide the Name of the Association below. If you do not belong to any association select “None.'"
                class="ml-4 tooltip-btn flex items-center justify-center"
              >
                ?
              </div>
            </div>

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
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input v-model="busOwner" type="text" style="display: none!important">
              <div class="text-sm text-red-700 pt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
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
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input v-model="employeesDone" type="text" style="display: none!important">
              <div class="text-sm text-red-700 pt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
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
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input v-model="microIncomeDone" type="text" style="display: none!important">
              <div class="text-sm text-red-700 pt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
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
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input v-model="incomeDone" type="text" style="display: none!important">
              <div class="text-sm text-red-700 pt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
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
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input v-model="balanceSheetDone" type="text" style="display: none!important">
              <div class="text-sm text-red-700 pt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
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
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input v-model="cashFlowDone" type="text" style="display: none!important">
              <div class="text-sm text-red-700 pt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
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
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input v-model="directorListdone" type="text" style="display: none!important">
              <div class="text-sm text-red-700 pt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="nav-buttons">
          <template v-if="!valid">
            <div class="py-2">
              <span class="text-red-500 ">Complete all * fields to proceed</span>
            </div>
          </template>
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
          <p class="text-red-600 text-sm text-center">
            You are required to only put in your <b>2019</b> information, but you can complete the other years provided. <br> If you don’t have a number for any field put in 0.
          </p>
        </div>
        <ValidationObserver v-slot="{ handleSubmit, valid }">
          <form @submit.prevent="handleSubmit(doneIncomeModal)">
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
                >2019
                </label>
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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-bold mb-2">+ Total Revenue</label>
                  <div
                    v-tooltip="'Enter your total sales or turnover for periods indicated.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2019.total_revenue"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                >- Total Amount Paid for Raw Materials</label>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2019.total_raw_materials"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <label class="block text-gray-900 text-sm font-bold mb-2">- Total Amount Paid for Salaries</label>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2019.total_salaries"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <label class="block text-gray-900 text-sm font-bold mb-2">- Other Operating Expenses</label>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2019.total_expenses"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <label class="block text-gray-900 text-sm font-bold mb-2">- Interest on Loans</label>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2019.total_loan_repayment"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <label class="block text-gray-900 text-sm font-bold mb-2">- Depreciation Charge on Assets</label>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2019.depreciation_charge_assets"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <label class="block text-gray-900 text-sm font-bold mb-2">- Total Charge in Taxes</label>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="income_statement_2019.total_taxes_charge"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <label class="block text-gray-900 text-sm font-bold mb-2">Net Profit =</label>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="total_income_statement.net_profit_19"
                    type="text"
                    placeholder="GHS"
                    money
                    small
                    disabled
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
              <div class="flex">
                <label
                  class="block text-gray-700 text-sm font-normal mb-2"
                >Is the business currently servicing any credit (loan, overdraft, letter of credit, etc)</label>
                <div
                  v-tooltip="'You will be asked if you have a Loan/Overdraft/Letter of credit with your current operations. If your Answer is YES, you are required to input the details. If NO, then you can move ahead.'"
                  class="ml-4 tooltip-btn flex items-center justify-center"
                >
                  ?
                </div>
              </div>

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
            <div v-if="general.has_credit === '1'" class="mt-3">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
              >If yes, please provide the details below</label>
              <div class="grid c-f gap-8 mb-8">
                <div>
                  <label class="block text-gray-900 text-sm font-sm mb-2">Bank/Loan Company</label>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Input v-model="credit_facilities[0].financial_institution" type="text" small />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div>
                  <label class="block text-gray-900 text-sm font-sm mb-2">Credit Facility Type</label>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Input v-model="credit_facilities[0].type" type="text" small />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div>
                  <label class="block text-gray-900 text-sm font-sm mb-2">Amount</label>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Input
                      v-model.number="credit_facilities[0].amount"
                      type="number"
                      placeholder="GHS"
                      money
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div>
                  <label class="block text-gray-900 text-sm font-sm mb-2">Interest Rate</label>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Input v-model="credit_facilities[0].interest_rate" type="number" small />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div>
                  <label class="block text-gray-900 text-sm font-sm mb-2">Due Date</label>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <input v-model="credit_facilities[0].maturity_date" type="date" name>
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div>
                  <label class="block text-gray-900 text-sm font-sm mb-2">Current Balance</label>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <Input
                      v-model="credit_facilities[0].current_value"
                      type="number"
                      placeholder="GHS"
                      money
                      small
                    />
                    <small class="text-sm text-red-700">{{ errors[0] }}</small>
                  </ValidationProvider>
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
            </div>
            <div class="mt-16">
              <template v-if="!valid">
                <div class="py-1">
                  <span class="text-red-500 ">* Complete all 2019 fields to proceed</span>
                </div>
              </template>
            </div>
            <div class="mt-2 mb-20 flex gap-3 buttons">
              <button type="submit" class="button-small">
                Done
              </button>
              <button type="button" class="button-small" @click="incomeModal= false">
                Cancel
              </button>
            </div>
          </form>
        </ValidationObserver>
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
          <p class="text-red-600 text-sm text-center">
            You are required to only put in your <b>2019</b> information, but you can complete the other years provided. <br> If you don’t have a number for any field put in 0.
          </p>
        </div>
        <ValidationObserver v-slot="{ handleSubmit, valid }">
          <form @submit.prevent="handleSubmit(doneBalanceSheetModal)">
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
                >2019</label>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.total_cash"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.total_inventory_amount"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.total_receivables_amount"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.other_short_term_assets"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.total_net_property"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.total_payables_amount"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.total_overdraft_outstanding"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.other_short_term_liability"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.total_loan_outstanding"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.equity_value"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.retained_earning_value"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="balance_sheet_2019.other_equity"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
            <div class="mt-16">
              <template v-if="!valid">
                <div class="py-1">
                  <span class="text-red-500 ">* Complete all 2019 fields to proceed</span>
                </div>
              </template>
            </div>
            <div class="mt-2 mb-20 flex gap-3 buttons">
              <button type="submit" class="button-small">
                Done
              </button>
              <button type="button" class="button-small" @click="balanceSheetModal= false">
                Cancel
              </button>
            </div>
          </form>
        </validationobserver>
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
          <p class="text-red-600 text-sm text-center">
            You are required to only put in your <b>2019</b> information, but you can complete the other years provided. <br> If you don’t have a number for any field put in 0.
          </p>
        </div>
        <ValidationObserver v-slot="{ handleSubmit, valid }">
          <form @submit.prevent="handleSubmit(doneCashFlowModal)">
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
                >2019</label>
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
                <!-- <ValidationProvider v-slot="{ errors }" rules="required"> -->
                <Input
                  v-model.number="cash_flow_2019.ebit"
                  grey
                  type="number"
                  placeholder="CALCULATED"
                  money
                  small
                />
                <!-- <small class="text-sm text-red-700">{{ errors[0] }}</small> -->
                <!-- </validationprovider> -->
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
                <!-- <ValidationProvider v-slot="{ errors }" rules="required"> -->
                <Input
                  v-model.number="cash_flow_2019.depreciation"
                  grey
                  type="number"
                  placeholder="CALCULATED"
                  money
                  small
                />
                <!-- <small class="text-sm text-red-700">{{ errors[0] }}</small> -->
                <!-- </validationprovider> -->
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
                <!-- <ValidationProvider v-slot="{ errors }" rules="required"> -->
                <Input
                  v-model.number="cash_flow_2019.working_capital_change"
                  grey
                  type="number"
                  placeholder="CALCULATED"
                  money
                  small
                />
                <!-- <small class="text-sm text-red-700">{{ errors[0] }}</small> -->
                <!-- </validationprovider> -->
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="cash_flow_2019.tax_paid_in_cash"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="cash_flow_2019.total_interest_paid_in_cash"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="cash_flow_2019.total_capital_expenditure"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="cash_flow_2019.total_sold_equity_sold"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="cash_flow_2019.total_credit_value"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="cash_flow_2019.total_principal_paid_loan"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <!-- <ValidationProvider v-slot="{ errors }" rules="required"> -->
                <Input
                  v-model.number="cash_flow_2019.beginning_cash"
                  grey
                  type="number"
                  placeholder="CALCULATED"
                  money
                  small
                />
                <!-- <small class="text-sm text-red-700">{{ errors[0] }}</small> -->
                <!-- </validationprovider> -->
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
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.number="cash_flow_2019.cash_change"
                    type="number"
                    placeholder="GHS"
                    money
                    small
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </validationprovider>
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
                <!-- <ValidationProvider v-slot="{ errors }" rules="required"> -->
                <Input
                  v-model.number="cash_flow_2019.end_cash"
                  grey
                  type="number"
                  placeholder="CALCULATED"
                  money
                  small
                />
                <!-- <small class="text-sm text-red-700">{{ errors[0] }}</small> -->
                <!-- </validationprovider> -->
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
            <div class="mt-16">
              <template v-if="!valid">
                <div class="py-1">
                  <span class="text-red-500 ">* Complete all 2019 fields to proceed</span>
                </div>
              </template>
            </div>
            <div class="mt-2 mb-20 flex gap-3 buttons">
              <button type="submit" class="button-small">
                Done
              </button>
              <button type="button" class="button-small" @click="cashFlowModal= false">
                Cancel
              </button>
            </div>
          </form>
        </validationobserver>
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
              <p class="text-red-600 text-sm text-center">
                You are required to provide more information on the Directors and Shareholders, their <b>Age</b>, <b>Gender</b>, <b>TIN</b> and <b>% Ownership</b>.
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
                >Business Owner TIN</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model.trim="directors_list[0].tin_number"
                    type="text"
                    small
                    regex="([Pp|Cc]{1})(([0-9]|[A-Za-z]){10})$"
                  />
                  <!-- regex="([A-Z]{1})([0-9]{10})$" -->
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
                >Business Owner TIN</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[1].tin_number"
                    type="text"
                    small
                    regex="([Pp|Cc]{1})(([0-9]|[A-Za-z]){10})$"
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
                >Business Owner TIN</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[2].tin_number"
                    type="text"
                    small
                    regex="([Pp|Cc]{1})(([0-9]|[A-Za-z]){10})$"
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
                >Business Owner TIN</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[3].tin_number"
                    type="text"
                    small
                    regex="([Pp|Cc]{1})(([0-9]|[A-Za-z]){10})$"
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
                >Business Owner TIN</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="directors_list[4].tin_number"
                    type="text"
                    small
                    regex="([Pp|Cc]{1})(([0-9]|[A-Za-z]){10})$"
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
            <div class="flex gap-6 mt-4">
              <small
                class="text-blue-600 cursor-pointer"
                @click="shareHolders +=1"
              >Add another Director/Shareholder</small>
              <small
                v-if="shareHolders > 1"
                class="text-red-600 cursor-pointer"
                @click="removeDirectorList()"
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
                <div class="flex items-baseline">
                  <label class="block text-gray-900 text-sm font-bold text-left mt-10 not-mobile">+ Total Revenue</label>
                  <div
                    v-tooltip="'Enter your total sales or turnover for periods indicated.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
              </div>
              <div class="first">
                <label
                  class="mb-5 block text-gray-900 text-sm font-bold text-center mt-10 mobile"
                >2018</label>
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">+ Total Revenue 2018</label>
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
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">+ Total Revenue 2019</label>
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
                >+ Total Revenue Jan 2020 - April 2020</label>
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
                <div class="flex items-baseline">
                  <label
                    class="block text-gray-900 text-sm font-bold text-left mt-10 not-mobile"
                  >- Total Expenses</label>
                  <div
                    v-tooltip="'Put in your total expenses incurred in operating your business for the same periods indicated.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
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
                <div class="flex items-baseline">
                  <label
                    class="block text-gray-900 text-sm font-bold text-left mt-10 not-mobile"
                  > Profit Before Tax = </label>
                  <div
                    v-tooltip="'The system will calculate this for you.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
              </div>
              <div class="seventh">
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Net Profit 2018 =</label>
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
                <label class="block text-gray-900 text-sm font-normal mb-2 mobile">Net Profit 2019 = </label>
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
                >= Net Profit Jan 2020 - April 2020</label>
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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                  <div
                    v-tooltip="'Put in your Full Name'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
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
                <div class="flex">
                  <label
                    class="block text-gray-900 text-sm font-normal mb-2"
                  >Tax Identification Number(TIN)</label>
                  <div
                    v-tooltip="'Enter your personal TIN that starts with P….'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="business_owner[0].tin_number"
                    type="text"
                    small
                    regex="([Pp|Cc]{1})(([0-9]|[A-Za-z]){10})$"
                  />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <!-- regex="([A-Z]{1})([0-9]{10})$" -->
              <div>
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                  <div
                    v-tooltip="'Indicate how old you are, e.g. if you we born June 1990 you are 30 years'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

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
              <div class="flex flex-col justify-between">
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                  <div
                    v-tooltip="'Select Male if you are a Man and Female if you are Woman.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>

                  <div
                    v-tooltip="'Select your country of primary citizenship'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
                  <div
                    v-tooltip="' What percentage (%) of the Business do you own if you have other people investing. Put 100% if you are a sole proprietor.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                  <div
                    v-tooltip="'Put in your Full Name'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
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
                <div class="flex">
                  <label
                    class="block text-gray-900 text-sm font-normal mb-2"
                  >Tax Identification Number(TIN)</label>
                  <div
                    v-tooltip="'Enter your personal `TIN `that starts with P….'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="business_owner[1].tin_number"
                    type="text"
                    small
                    regex="([Pp|Cc]{1})(([0-9]|[A-Za-z]){10})$"
                  />
                  <!-- regex="([P]{1})([0-9][A-Za-z]{10})$" -->
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                  <div
                    v-tooltip="'Indicate how old you are, e.g. if you we born June 1990 you are 30 years'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                  <div
                    v-tooltip="'Select Male if you are a Man and Female if you are Woman.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                  <div
                    v-tooltip="'Select your country of primary citizenship'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
                  <div
                    v-tooltip="' What percentage (%) of the Business do you own if you have other people investing. Put 100% if you are a sole proprietor.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Name</label>
                  <div
                    v-tooltip="'Put in your Full Name'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

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
                <div class="flex">
                  <label
                    class="block text-gray-900 text-sm font-normal mb-2"
                  >Tax Identification Number(TIN)</label>
                  <div
                    v-tooltip="'Enter your personal TIN that starts with P….'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input
                    v-model="business_owner[2].tin_number"
                    type="text"
                    small
                    regex="([Pp|Cc]{1})(([0-9]|[A-Za-z]){10})$"
                  />
                  <!-- regex="([P]{1})([0-9]{10})$" -->
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Age</label>
                  <div
                    v-tooltip="'Indicate how old you are, e.g. if you we born June 1990 you are 30 years'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Gender</label>
                  <div
                    v-tooltip="'Select Male if you are a Man and Female if you are Woman.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Nationality</label>
                  <div
                    v-tooltip="'Select your country of primary citizenship'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
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
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">% Ownership</label>
                  <div
                    v-tooltip="' What percentage (%) of the Business do you own if you have other people investing. Put 100% if you are a sole proprietor.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <Input v-model.number="business_owner[2].share" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="flex gap-6">
            <small
              v-if="showAddBusOwner"
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
              <p class="text-red-600 text-sm text-center">
                Sum of <b>Permanent</b> and <b>Temporary</b> Employees cannot exceed Total Number of Employees
              </p>
              <p class="text-red-600 text-sm text-center">
                <b>Female</b> Employees Number cannot exceed Total Number of Employees
              </p>
            </div>
          </div>
          <div class="d-s mt-12">
            <div class="grid gap-8 b-d">
              <div>
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Number of Employees</label>
                  <div
                    v-tooltip="'Put in the total number of people who work for you. Include all part-time/casual workers as well.'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

                <ValidationProvider v-slot="{ errors }" ref="totalemployees" rules="required">
                  <Input v-model.number="general.number_of_employees" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Permanent Employees</label>
                  <div
                    v-tooltip="'How many of the people who work with you are permanent staff that is, they do not have a fixed term contract'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

                <ValidationProvider v-slot="{ errors }" ref="permanentemployees" :rules="permanentEmployees">
                  <Input v-model.number="general.permanent_employees" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Temporary Employees</label>
                  <div
                    v-tooltip="'How many of the people who for you come to work for as and when needed for a specific time period or task'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

                <ValidationProvider v-slot="{ errors }" ref="temporalemployees" :rules="temporalEmployees">
                  <Input v-model.number="general.temporary_employees" type="number" small />
                  <small class="text-sm text-red-700">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <div class="flex">
                  <label class="block text-gray-900 text-sm font-normal mb-2">Female Employees</label>
                  <div
                    v-tooltip="'How many of the people working for you are Women? If you do not have employees falling under a particular category, input 0'"
                    class="ml-4 tooltip-btn flex items-center justify-center"
                  >
                    ?
                  </div>
                </div>

                <ValidationProvider v-slot="{ errors }" ref="femalesemployees" :rules="femaleEmployees">
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
      shareHolders: 1,

      incomeDone: null,
      microIncomeDone: null,
      balanceSheetDone: null,
      cashFlowDone: null,
      directorListdone: null,
      busOwner: null,
      employeesDone: null,
      counter: 0
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
    },
    TIN: {
      get () {
        return this.general.tin_number ? this.TINFormatter(this.general.tin_number) : ''
      },
      set (newValue) {
        this.general.tin_number = newValue
      }
    },
    // directorTIN: {
    //   get () {
    //     return this.directors_list[0].tin_number ? this.TINFormatter(this.directors_list[0].tin_number) : ''
    //   },
    //   set (newValue) {
    //     this.directors_list[0].tin_number = newValue
    //   }
    // },
    businessTIN: {
      get () {
        return this.business_owner[0].tin_number ? this.TINFormatter(this.business_owner[0].tin_number) : ''
      },
      set (newValue) {
        this.business_owner[0].tin_number = newValue
      }
    },
    showAddBusOwner () {
      return false
      // return (this.general.legal_organization !== '1') || (this.general.legal_organization !== '2')
    },
    permanentEmployees () {
      return `required|permanentmax:${this.general.number_of_employees | 0}|sum:${this.general.permanent_employees | 0},${this.general.temporary_employees | 0}, ${this.general.number_of_employees | 0}`
    },
    temporalEmployees () {
      return `required|temporalmax:${this.general.number_of_employees | 0}|sum:${this.general.permanent_employees | 0},${this.general.temporary_employees | 0}, ${this.general.number_of_employees | 0}`
    },
    femaleEmployees () {
      return `required|femalemax:${this.general.number_of_employees | 0}`
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
    directors_list: {
      handler (value) {
        if (value) {
          // this.directors_list[0].tin_number
          console.log('what is value now?', value)
          value.map((tin, i) => {
            if (tin.tin_number) {
              tin.tin_number = this.TINFormatter(tin.tin_number)
            }
          })
        }
      },
      deep: true
    },
    prefill: {
      handler (value) {
        if (!this.token && this.applicationObject) {
          this.general = value
        }
      }
    },
    TIN: {
      handler (value) {
        this.general.tin_number = value
      }
    },
    directorTIN: {
      handler (value) {
        this.directors_list[0].tin_number = value
      }
    },
    businessTIN: {
      handler (value) {
        this.business_owner[0].tin_number = value
      }
    }
  },
  mounted () {
    // this.business_owner[0].share = 100
    // if (this.shareHolders === 1) {
    //   this.directors_list[0].share = 100
    // }
    if (!this.token && this.applicationObject) {
      this.general.annual_sales = this.applicationObject.annual_sales
      // this.setDefaultValues()
    }
  },
  methods: {
    removeDirectorList () {
      this.directors_list.map((list, i) => {
        console.log('Keys', Object.keys(list))
        if (Object.keys(list).length > 0) {
          this.counter++
        }
      })

      if (this.counter > 0) {
        // this.directors_list[this.counter - 1] = {}
        Object.keys(this.directors_list[this.counter - 1]).forEach((key) => { delete this.directors_list[this.counter - 1][key] })
        // Object.assign(this.directors_list[this.counter - 1], {})
        this.shareHolders -= 1
        console.log('Directors:', this.directors_list)
      }
      this.counter = 0
    },
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
      // if (this.businessScale !== '1' && this.businessScale !== '2' && this.isStartup === false) {
      //   this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 3)
      // } else {
      //   this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 4)
      // }
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 3)
    },
    movePrevious () {
      this.$store.commit('pages/SET_CURRENT_TAB_NUMBER', 1)
    },
    doneIncomeModal () {
      this.incomeDone = 'Done'
      this.checkIncomeModal = true
      this.incomeModal = false
    },
    doneMicroIncomeModal () {
      this.microIncomeDone = 'Done'
      this.checkMicroIncomeModal = true
      this.microIncomeModal = false
    },
    doneBalanceSheetModal () {
      this.balanceSheetDone = 'done'
      this.checkBalanceSheetModal = true
      this.balanceSheetModal = false
    },
    doneCashFlowModal () {
      this.cashFlowDone = 'Done'
      this.checkCashFlowModal = true
      this.cashFlowModal = false
    },
    doneShareHolderModal () {
      this.directorListdone = 'Done'
      // filter out empty directors
      const directorsList = JSON.parse(
        JSON.stringify(this.directors_list)
      ).filter(value => JSON.stringify(value) !== '{}')

      const reducer = (accumulator, currentValue) =>
        accumulator + currentValue.share

      const total = directorsList.reduce(reducer, 0)
      console.log('Total', total)
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
        this.busOwner = 'Done'
        this.checkOwnerModal = false
        this.ownerModal = true
      } else {
        this.checkOwnerModal = true
        this.ownerModal = false
      }
    },
    doneEmployeesModal () {
      this.employeesDone = 'Done'
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
    },
    setDefaultValues () {
      // Cashflow defaults
      // this.cash_flow_2019.ebit = 0
      // this.cash_flow_2019.depreciation = 0
      // this.cash_flow_2019.working_capital_change = 0
      this.cash_flow_2019.tax_paid_in_cash = 0
      this.cash_flow_2019.total_interest_paid_in_cash = 0
      this.cash_flow_2019.total_capital_expenditure = 0
      this.cash_flow_2019.total_sold_equity_sold = 0
      this.cash_flow_2019.total_credit_value = 0
      this.cash_flow_2019.total_principal_paid_loan = 0
      // this.cash_flow_2019.beginning_cash = 0
      this.cash_flow_2019.cash_change = 0
      // this.cash_flow_2019.end_cash = 0
      // balance sheet defaults
      this.balance_sheet_2019.total_cash = 0
      this.balance_sheet_2019.total_inventory_amount = 0
      this.balance_sheet_2019.total_receivables_amount = 0
      this.balance_sheet_2019.other_short_term_assets = 0
      this.balance_sheet_2019.total_net_property = 0
      this.balance_sheet_2019.total_payables_amount = 0
      this.balance_sheet_2019.total_overdraft_outstanding = 0
      this.balance_sheet_2019.other_short_term_liability = 0
      this.balance_sheet_2019.total_loan_outstanding = 0
      this.balance_sheet_2019.equity_value = 0
      this.balance_sheet_2019.retained_earning_value = 0
      this.balance_sheet_2019.other_equity = 0
    },
    TINFormatter (value) {
      if (
        value !== '' ||
        value !== undefined ||
        value !== 0 ||
        value !== '0' ||
        value !== null
      ) {
        // return value.replace(/^a-z/, chr => chr.toUpperCase())
        return value.toString().toUpperCase()
      } else {
        return value
      }
    },
    validateField (field) {
      const provider = this.$refs[field]

      // Validate the field
      return provider.validate()
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
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: #C49000;
    color: white;
    border-radius: 5px;
    padding: 10px;
    max-width: 300px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #C49000;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 10px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 10px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 10px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 10px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: #C49000;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(#C49000, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
