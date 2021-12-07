import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Faqs from '@/pages/faqs'
import EligibilityCriteria from '@/pages/eligibility-criteria'
import BusinesTips from '@/pages/business-tips.vue'

import Apply from '@/pages/apply'
import Loans from '@/pages/loans/_amount/form'
import Submitted from '@/pages/loans/submitted'

import Registration from '@/pages/app/registration/login'
import Dashboard from '@/pages/app/dashboard'
import LoandetailsIndex from '@/pages/app/loandetails/index'
import PaymentHistory from '@/pages/app/loandetails/paymentHistory'
import Loanapplication from '@/pages/app/loanapplication'
import Messages from '@/pages/app/messages'
import Notifications from '@/pages/app/notifications'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Index
      },
      {
        path: '/faqs',
        component: Faqs
      },
      {
        path: '/eligibility-criteria',
        component: EligibilityCriteria
      },
      {
        path: '/business-tips',
        component: BusinesTips
      },
      // {
      //   path: '/apply',
      //   component: Apply
      // },
      {
        path: '/loans/:id/form',
        component: Loans
      },
      {
        path: '/loans/submitted',
        component: Submitted
      },
      {
        path: '/app/registration/login',
        component: Registration
      },
      {
        path: '/app/dashboard',
        component: Dashboard
      },
      {
        path: '/app/loandetails/index',
        component: LoandetailsIndex
      },
      {
        path: '/app/loandetails/paymentHistory',
        component: PaymentHistory
      },
      {
        path: '/app/loanapplication',
        component: Loanapplication
      },
      {
        path: '/app/messages',
        component: Messages
      },
      {
        path: '/app/notifications',
        component: Notifications
      }
    ]
  })
}
