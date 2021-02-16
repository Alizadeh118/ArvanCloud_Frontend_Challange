<template>
  <b-sidebar
    title="Post"
    bg-variant="primary"
    text-variant="white"
    visible
    sidebar-class="position-relative d-none d-lg-flex"
    no-header-close
    no-close-on-route-change
  >
    <b-nav vertical>
      <nav-items />
    </b-nav>
  </b-sidebar>
</template>

<script>
import NavItems from '@/components/NavItems.vue'
export default {
  components: {
    NavItems
  }
}
</script>
