<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <h1 class="my-3">
          All Posts
        </h1>
      </b-col>
      <b-col>
        <b-table
          hover
          head-variant="light"
          :fields="fields"
          primary-key="slug"
          :items="articles"
          :busy="busy"
          :per-page="perPage"
        >
          <template #cell(#)="data">
            {{ (currentPage - 1) * perPage + data.index + 1 }}
          </template>

          <template #cell(createdAt)="{value}">
            <div class="d-flex align-items-center">
              <span class="mr-3">{{ value }}</span>
              <b-dropdown right text="... " variant="info" class="text-white ml-auto">
                <b-dropdown-item href="#">
                  Edit
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item href="#">
                  Delete
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </template>

          <template #table-busy>
            <div class="text-center text-info my-2">
              <b-spinner class="align-middle" />
              <p class="mt-2">
                Loading...
              </p>
            </div>
          </template>
        </b-table>

        <b-pagination-nav
          v-if="pages"
          :value="currentPage"
          class="my-5"
          align="center"
          hide-goto-end-buttons
          use-router
          :link-gen="linkGen"
          :number-of-pages="pages"
          last-number
          first-number
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable */
  export default {
    middleware ({ params, redirect }) {
      if ( +params.page === 1 ) {
        return redirect('/articles')
      }
    },
    data () {
      return {
        busy: true,
        fields: [
          {
            key: '#',
            tdClass: 'align-middle'
          },
          {
            key: 'title',
            tdClass: 'align-middle text-nowrap'
          },
          {
            key: 'author',
            tdClass: 'align-middle',
            formatter (value) {
              return '@' + value.username
            }
          },
          {
            key: 'tagList',
            label: 'Tags',
            tdClass: 'align-middle',
            formatter (value) {
              return value.join()
            }
          },
          {
            key: 'body',
            label: 'Excerpt',
            tdClass: 'align-middle',
            formatter (value) {
              const array = value.trim().split(' ')
              const ellipsis = array.length > 20 ? '...' : ''
              return array.slice(0, 20).join(' ') + ellipsis
            }
          },
          {
            key: 'createdAt',
            label: 'Created',
            tdClass: 'align-middle text-nowrap',
            thClass: 'text-right',
            formatter (value) {
              const date = new Date(value)
              const month = date.toLocaleString('default', { month: 'long' })
              return `${month} ${date.getDate()} ,${date.getFullYear()}`
            }
          }
        ]
      }
    },
    computed: {
      articles () {
        return this.$store.state.articles.articles
      },
      currentPage () {
        return this.$route.params.page || 1
      },
      perPage () {
        return this.$store.state.articles.limit
      },
      pages () {
        return this.$store.state.articles.count / this.perPage
      }
    },
    methods: {
      linkGen (pageNum) {
        return pageNum === 1 ? '/articles' : `/articles/page/${pageNum}`
      },
    },
    created () {
      this.$store.dispatch('articles/index', this.currentPage - 1)
        .catch((e) => {
          console.log('Error with fetching articles: ', e)
        })
        .finally(() => {
          this.busy = false
        })
    }
  }
</script>
