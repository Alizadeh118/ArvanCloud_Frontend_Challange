export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  loading: {
    color: '#1c7cd5',
    height: '5px'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ArvanCloud_Frontend_Challange',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/app.scss'
  ],

  router: {
    middleware: ['auth'],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    extendRoutes (routes, resolve) {
      routes.push(
        {
          name: 'articles',
          path: '/articles',
          component: resolve(__dirname, 'pages/articles/page/_page.vue')
        },
        {
          path: '/',
          redirect: '/articles'
        })
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next'
  ],

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://conduit.productionready.io/api'
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/articles'
    },
    strategies: {
      local: {
        token: {
          property: 'user.token',
          type: 'Token'
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: {
            url: '/users/login',
            method: 'post'
          },
          user: {
            url: '/user',
            method: 'get'
          }
        }
      }
    }
  },

  eslint: {
    cache: false,
    fix: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
