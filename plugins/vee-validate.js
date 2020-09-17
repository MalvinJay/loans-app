import { extend } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, alpha, max_value } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('alpha', {
  ...alpha,
  message: 'This field must only contain alphabetic characters'
})

extend('max_value', {
  // eslint-disable-next-line camelcase
  ...max_value,
  message: 'Should be less than total employees'
})

extend('permanentmax', {
  validate (value, { max }) {
    return value <= max
  },
  message: 'Permanent employees should not exceed total employees',
  params: ['max']
})
extend('temporalmax', {
  validate (value, { max }) {
    return value <= max
  },
  message: 'Temporary employees should not exceed total employees',
  params: ['max']
})
extend('femalemax', {
  validate (value, { max }) {
    return value <= max
  },
  message: 'Female employees should not exceed total employees',
  params: ['max']
})
extend('sum', {
  validate ({ first, second, max }) {
    return first + second <= max
  },
  message: 'Addition of permanent and temporary employees should not exceed total employees',
  params: ['first', 'second', 'max']
})
