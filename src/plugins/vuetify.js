import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ko from 'vuetify/lib/locale/ko'

Vue.use(Vuetify)

const opts = {
  /** 한글 설정 https://vuetifyjs.com/en/features/internationalization/#getting-started */
  lang: {
    locales: { ko },
    current: 'ko',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#2284f5',
        secondary: '#6c757d',
        accent: '#FB8C00',
        error: '#BB002F',
        background: '#FAFAFA',
      },
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
