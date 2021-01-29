/* eslint-disable */
export const state = () => ({
  articles: [],
  count: 0,
  limit: 10
})

export const mutations = {
  SET_ARTICLES (state, articles) {
    state.articles = articles
  },
  SET_COUNT (state, count) {
    state.count = count
  }
}

export const actions = {
  async index ({ state: { limit }, commit }, offset) {
    try {
      const data = await this.$axios.$get('/articles', {
        params: {
          offset,
          limit
        }
      })
      commit('SET_ARTICLES', data.articles)
      commit('SET_COUNT', data.articlesCount)
      return Promise.resolve()
    } catch ( e ) {
      return Promise.reject(e)
    }
  },
  async store (ctx, article) {
    try {
      await this.$axios.$post('/articles', article)
      return Promise.resolve()
    } catch ( e ) {
      return Promise.reject(e)
    }
  }
}
