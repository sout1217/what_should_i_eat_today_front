const PAGE_DATA = () => {
  return {
    boards: [],
    teams: [],
    cards: [],
    members: [],
    filterWord: '',
    teamChats: [],
  }
}

const state = {
  email: '',
  token: '',
  page: PAGE_DATA(),
  admin: {
    categories: [],
    category: {
      name: '',
      description: '',
      visible: null,
      foods: [
        {
          id: 1,
          name: '밥',
          country: '한식',
          categories: [],
          tags: [],
        },
      ],
    },
  },
}

export default state
