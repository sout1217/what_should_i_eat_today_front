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
}

export default state
