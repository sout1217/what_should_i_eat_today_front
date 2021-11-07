const state = {
  me: {},
  isAuth: false,
  token: sessionStorage.getItem('wteToken') || '',
  admin: {
    categories: [],
    foods: [],
    tags: [],
    countries: [],
  },
}

export default state
