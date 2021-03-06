/* eslint-disable */
export const state = () => ({
  articles: [],
  article: {},
  count: 0,
  limit: 10
})

export const mutations = {
  SET_ARTICLES (state, articles) {
    state.articles = articles
  },
  SET_ARTICLE (state, article) {
    state.article = article
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
  async show ({ commit }, slug) {
    try {
      const data = await this.$axios.$get('/articles/' + slug)
      commit('SET_ARTICLE', data.article)
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
  },
  async update (ctx, { article, slug }) {
    try {
      await this.$axios.$put('/articles/' + slug, {
        article
      })
      return Promise.resolve()
    } catch ( e ) {
      return Promise.reject(e)
    }
  },
  async destroy (ctx, slug) {
    try {
      await this.$axios.$delete('/articles/' + slug)
      return Promise.resolve()
    } catch ( e ) {
      return Promise.reject(e)
    }
  }
}
