<template>
  <b-sidebar
    title="Post"
    bg-variant="primary"
    text-variant="white"
    visible
    sidebar-class="position-relative d-none d-md-flex"
    no-header-close
  >
    <b-nav vertical>
      <b-nav-item to="/articles" :active="active" exact>
        All Articles
      </b-nav-item>
      <b-nav-item to="/articles/create">
        New Article
      </b-nav-item>
    </b-nav>
  </b-sidebar>
</template>

<script>
export default {
  computed: {
    active () {
      return /^\/articles(\/page\/\d+|$)/.test(this.$route.path)
    }
  }
}
</script>
