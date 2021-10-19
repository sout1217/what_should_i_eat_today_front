const state = {
  me: {},
  token: localStorage.getItem('wteToken') || '',
  admin: {
    categories: [],
    foods: [],
    tags: [],
    countries: [],
  },
}

export default state
