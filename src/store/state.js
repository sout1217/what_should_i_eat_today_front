const state = {
  me: {},
  token: sessionStorage.getItem('wteToken') || '',
  admin: {
    categories: [],
    foods: [],
    tags: [],
    countries: [],
  },
}

export default state
