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
    // eslint-disable-next-line no-console
    console.log('value:', value)
    // eslint-disable-next-line no-console
    console.log('max:', max)
    return value <= max
  },
  message: 'Female employees should not exceed total employees',
  params: ['max']
})
extend('sum', {
  validate (value, { other, max }) {
    // eslint-disable-next-line no-console
    console.log('value:', value)
    // eslint-disable-next-line no-console
    console.log('other:', other)
    // eslint-disable-next-line no-console
    console.log('max:', max)
    return parseInt(value) + parseInt(other) <= max
  },
  message: 'Addition of permanent and temporary employees should not exceed total employees',
  params: ['other', 'max']
})
