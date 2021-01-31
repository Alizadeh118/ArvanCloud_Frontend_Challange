<template>
  <b-row>
    <b-col cols="12">
      <h1 class="my-3">
        New Article
      </h1>
    </b-col>
    <b-col>
      <article-form />
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
    title: 'New Article'
  }
}
</script>
