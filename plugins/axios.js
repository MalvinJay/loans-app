export default ({ store, $axios }) => {
  $axios.defaults.baseURL = process.env.baseUrl
}
