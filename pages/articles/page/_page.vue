<template>
  <b-row>
    <b-col cols="12">
      <h1 class="my-3">
        All Posts
      </h1>
    </b-col>
    <b-col>
      <b-table
        responsive
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

        <template #cell(createdAt)="data">
          <div class="d-flex align-items-center justify-content-end">
            <span class="mr-3">{{ data.value }}</span>
            <b-dropdown v-if="data.item.author.username === $auth.user.username" right text="... " variant="info" class="text-white">
              <b-dropdown-item :to="'/articles/edit/' + data.item.slug">
                Edit
              </b-dropdown-item>
              <b-dropdown-divider />
              <b-dropdown-item @click="showDeleteModal(data.item.slug)">
                Delete
              </b-dropdown-item>
            </b-dropdown>
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
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    // show the toast if it comes back from /article/create with successful state
    if (to.params.articleCreatedOrUpdatedMessage) {
      return next(vm => {
        const error = vm.$createElement(
          'span',
          { class: 'text-nowrap' },
          [
            vm.$createElement('b', 'Well done! '),
            to.params.articleCreatedOrUpdatedMessage
          ]
        )
        vm.$bvToast.toast(error, {
          variant: 'success',
          solid: true,
          noCloseButton: true
        })
      })
    }
    next()
  },
  middleware ({ params, redirect }) {
    if (+params.page === 1) {
      return redirect('/articles')
    }
  },
  transition (to, from) {
    // don't use fade transition for browsing between the pages
    if ((from?.name === 'articles-page-page' && to?.name === 'articles') ||
      to?.name === 'articles-page-page') {
      return 'page' // non-existent transition
    }
    return 'fade'
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
  head: {
    title: 'All Articles'
  },
  computed: {
    articles () {
      return this.$store.state.article.articles
    },
    currentPage () {
      return this.$route.params.page || 1
    },
    perPage () {
      return this.$store.state.article.limit
    },
    pages () {
      return this.$store.state.article.count / this.perPage
    }
  },
  created () {
    this.fetchArticles()
  },
  methods: {
    fetchArticles () {
      this.busy = true
      this.$store.dispatch('article/index', this.perPage * this.currentPage)
        .catch(e => {
          this.$bvToast.toast('The articles could not be fetched', {
            title: 'API Error',
            variant: 'danger',
            solid: true
          })
          /* eslint-disable no-console */
          console.log('Error with fetching the articles: ', e)
        })
        .finally(() => {
          this.busy = false
        })
    },
    removeArticle (slug) {
      this.$store.dispatch('article/destroy', slug)
        .then(() => {
          this.$bvToast.toast('Article deleted successfully', {
            title: 'API Error',
            variant: 'danger',
            solid: true,
            noCloseButton: true
          })
          this.fetchArticles()
        })
        .catch(e => {
          const error = e.response?.data?.errors?.article?.[0] || 'The article could not be removed'
          this.$bvToast.toast(error, {
            title: 'API Error',
            variant: 'danger',
            solid: true
          })
          /* eslint-disable no-console */
          console.log('Error with removing the article: ', e)
        })
    },
    showDeleteModal (slug) {
      this.$bvModal.msgBoxConfirm('Are you sure to delete Article?', {
        title: 'Delete Article',
        okVariant: 'danger',
        cancelVariant: 'outline-dark',
        okTitle: 'Yes',
        cancelTitle: 'No',
        footerClass: 'p-2',
        centered: true
      })
        .then(res => {
          if (res) {
            this.removeArticle(slug)
          }
        })
    },
    linkGen (pageNum) {
      return pageNum === 1 ? '/articles' : `/articles/page/${pageNum}`
    }
  }
}
</script>
