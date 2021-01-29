/* eslint-disable */
export const state = () => ({
  tags: []
})

export const mutations = {
  SET_TAGS (state, tags) {
    state.tags = tags
      .filter(tag => /^[a-zA-Z0-9]+$/.test(tag)) // just to remove dummy tags of our fake API
      .sort((a, b) => {
        const c = a.localeCompare(b)
        return c === 0 ? c : c > 0 ? 1 : -1
      })
  },
  ADD_TAG (state, tag) {
    state.tags.unshift(tag)
  }
}

export const actions = {
  async index ({ commit }) {
    try {
      const data = await this.$axios.$get('/tags')
      commit('SET_TAGS', data.tags)
      return Promise.resolve()
    } catch ( e ) {
      return Promise.reject(e)
    }
  },
  store ({ commit }, tag) {
    commit('ADD_TAG', tag)
    return tag
  }
}
