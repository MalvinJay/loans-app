
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
      // { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/node_modules/vue-multiselect/dist/vue-multiselect.min.css',
    '~assets/scss/__layouts.scss',
    '~assets/scss/__spacers.scss',
    '~assets/scss/__variables.scss',
    '~assets/scss/__components.scss',
    '~assets/scss/__colors.scss'
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/v-scroll-lock.js',
    '~/plugins/v-click-outside.js',
    '~/plugins/vue-multiselect.js',
    '~/plugins/Vuelidate.js',
    '~/plugins/vee-validate.js',
    '~/plugins/directives.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */

  toast: {
    position: 'top-right',
    theme: 'toasted-primary',
    duration: 5000,
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  axios: {
    baseURL: 'https://mcftest.plendifyloans.com/api'
  },
  auth: {
    localStorage: false,
    cookie: {
      options: {
        expires: 1
      }
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/applicant-details', method: 'get', propertyName: false }
        }
      }
    },
    redirect: {
      callback: '/app/dashboard',
      login: '/app/registration/login',
      logout: '/app/registration/login',
      home: '/app/dashboard'
    },
    plugins: ['~/plugins/axios.js', { src: '~/plugins/auth.js', mode: 'client' }]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://mcftest.plendifyloans.com/api'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vee-validate/dist/rules', '@nuxtjs/auth'],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },
  generate: {
    fallback: true
  }
}
