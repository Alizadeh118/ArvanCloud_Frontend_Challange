<template>
  <b-navbar toggleable="lg" type="dark" variant="secondary">
    <b-navbar-brand>
      Arvan Challenge
    </b-navbar-brand>

    <b-navbar-nav class="d-none d-sm-flex">
      <b-nav-text>Welcome {{ this.$auth.user.username }}</b-nav-text>
    </b-navbar-nav>

    <b-button variant="outline-info ml-auto" @click="$auth.logout()">
      Logout
    </b-button>

    <b-navbar-toggle target="nav-collapse" class="ml-2" />
    <div class="d-lg-none w-100">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mt-4">
          <nav-items />
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import NavItems from '@/components/NavItems.vue'

export default {
  components: {
    NavItems
  }
}
</script>
