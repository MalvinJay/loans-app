export default {
  present (value) {
    if (!value) {
      return false
    }
    if (typeof value === 'object') {
      if (Object.keys(value).length > 0) {
        return true
      }
      return false
    }
    if (Array.isArray(value) || typeof value === 'string') {
      return value && value.length > 0
    } else {
      return !!value
    }
  },
  empty (value) {
    return !this.present(value)
  },
  sum (arr) {
    if (arr.length === 0) {
      return 0
    } else {
      return arr.reduce((sum, x) => sum + x)
    }
  },
  format (val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  // randomString2 (l) {
  //   let text = ''
  //   let charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  //   for (let i = 0; i < l; i++) {
  //     text += charList.charAt(Math.floor(Math.random() * charList.length))
  //   }
  //   return text
  // },
  returnBool (value) {
    if (value === 'true') {
      return true
    } else {
      return false
    }
  },
  capitalize (value) {
    if (!value) {
      return ''
    }
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }
}
