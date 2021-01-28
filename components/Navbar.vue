<template>
  <b-navbar toggleable="md" type="dark" variant="secondary">
    <b-navbar-brand>
      Arvan Challenge
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-text>Welcome Hassan</b-nav-text>
    </b-navbar-nav>

    <b-button variant="outline-info ml-auto">
      Logout
    </b-button>

    <b-navbar-toggle target="nav-collapse" class="ml-2" />
    <div class="d-md-none w-100">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/articles">
            All Articles
          </b-nav-item>
          <b-nav-item href="#">
            New Article
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>
