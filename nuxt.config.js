import { name } from './package.json'
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: `/${name.startsWith('@byu-oit/') ? name.substring(9) : name}/`
        }
      }
    : {}

module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_description,
    title: process.env.npm_package_description || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#002E5D' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#002E5D',
          secondary: '#666666',
          accent: '#0062B8',
          error: '#A3082A',
          info: '#006073',
          success: '#10A170',
          warning: '#FFB700',
          light: '#FAFAFA'
        }
      }
    }
  },
  /*
   ** Generate the docs directory for the demo on GitHub Pages
   ** https://nuxtjs.or/faq/github-pages/
   */
  generate: {
    dir: 'docs'
  },
  /*
   ** Address incompatibilities with GitHub pages and running local dev server
   */
  ...routerBase,
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  }
}
