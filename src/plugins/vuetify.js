import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: '#2284f5',
        secondary: '#6c757d',
        accent: '#FB8C00',
        error: '#BB002F',
        background: '#171717',
      },
    },
    dark: true,
  },
}

export default new Vuetify(opts)
