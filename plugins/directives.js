import Vue from 'vue'
Vue.filter('money', function (value, currency, options) {
  try {
    value = parseFloat(Math.round(value * 100) / 100).toFixed(2)
  } catch (error) {
    return null
  }
  let symbol = ''
  options = options || {}
  currency = currency || 'GHS'
  if (currency === 'GHS') {
    // symbol = '\u20B5'
    symbol = 'GHS'
  }
  if (options.symbol === 'text') {
    symbol = 'GHS'
  }
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${symbol} ${value}`
})
Vue.filter('capitalize', function (value) {
  if (!value) {
    return ''
  }
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
})
