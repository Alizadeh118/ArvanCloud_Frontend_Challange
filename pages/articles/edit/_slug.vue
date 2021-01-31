<template>
  <b-row>
    <b-col cols="12">
      <h1 class="my-3">
        Edit Article
      </h1>
    </b-col>
    <b-col>
      <article-form :article="$store.state.article.article" />
    </b-col>
  </b-row>
</template>

<script>
import ArticleForm from '@/components/ArticleForm'
export default {
  components: {
    ArticleForm
  },
  head: {
    title: 'Edit Article'
  },
  computed: {
    slug () {
      return this.$route.params.slug
    }
  },
  created () {
    this.fetchArticle()
  },
  methods: {
    fetchArticle () {
      this.$store.dispatch('article/show', this.slug)
        .catch(e => {
          this.$bvToast.toast('The article could not be fetched', {
            title: 'API Error',
            variant: 'danger',
            solid: true
          })
          /* eslint-disable no-console */
          console.log('Error with fetching the article: ', e)
        })
    }
  }
}
</script>
