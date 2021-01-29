<template>
  <div>
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <b-container fluid class="px-4 mb-4">
        <b-row>
          <b-col cols="12">
            <Nuxt />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>
