<template>
  <div>
    <Navbar />
    <div class="d-flex">
      <aside class="aside d-none d-lg-block">
        <Sidebar />
      </aside>
      <main class="main">
        <b-container fluid class="mb-3">
          <b-row>
            <b-col cols="12">
              <Nuxt />
            </b-col>
          </b-row>
        </b-container>
      </main>
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
