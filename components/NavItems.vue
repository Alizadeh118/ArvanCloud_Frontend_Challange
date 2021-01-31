<template>
  <div>
    <b-nav-item to="/articles" :active="active.index" exact>
      All Articles
    </b-nav-item>
    <b-nav-item to="/articles/create" :active="active.createOrEdit">
      New Article
    </b-nav-item>
  </div>
</template>

<script>
export default {
  name: 'NavItems',
  computed: {
    active () {
      return {
        index: /^\/articles(\/page\/\d+|$)/.test(this.$route.path),
        createOrEdit: /^\/articles\/(create|edit)/.test(this.$route.path)
      }
    }
  }
}
</script>
