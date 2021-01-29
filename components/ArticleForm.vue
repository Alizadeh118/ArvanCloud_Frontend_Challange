<template>
  <b-form novalidate @submit.stop.prevent="onSubmit">
    <b-row>
      <b-col cols="10">
        <b-form-group label="Title" label-for="title">
          <b-form-input
            id="title"
            ref="title"
            v-model="form.title"
            type="text"
            placeholder="Title"
            required
            :state="validation.title.state"
          />
          <b-form-invalid-feedback>{{ validation.title.error.join(' - ') }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Description" label-for="description">
          <b-form-input
            id="description"
            ref="description"
            v-model="form.description"
            type="text"
            placeholder="Description"
            required
            :state="validation.description.state"
          />
          <b-form-invalid-feedback>{{ validation.description.error.join(' - ') }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Body" label-for="body">
          <b-form-textarea
            id="body"
            ref="body"
            v-model="form.body"
            rows="10"
            required
            :state="validation.body.state"
          />
          <b-form-invalid-feedback>{{ validation.body.error.join(' - ') }}</b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary" class="px-4" :disabled="$nuxt.$loading.show">
          <b-spinner v-if="$nuxt.$loading.show" small />
          <span v-else>Submit</span>
        </b-button>
      </b-col>
      <b-col cols="2">
        <b-form-group label="Tags" label-for="tag">
          <b-form-input
            id="tag"
            ref="tag"
            v-model="tag"
            type="text"
            placeholder="New tag"
            @keypress.prevent.enter="createTag"
          />
        </b-form-group>
        <b-form-group>
          <div v-if="fetchingTags" class="text-center">
            <b-spinner variant="primary" />
          </div>
          <b-form-checkbox-group
            v-else
            v-model="form.tagList"
            :options="$store.state.tag.tags"
            stacked
            class="border pl-3 py-2 rounded"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      tag: '',
      fetchingTags: true,
      validation: {
        title: {
          rules: ['required'],
          state: null,
          error: []
        },
        description: {
          rules: ['required'],
          state: null,
          error: []
        },
        body: {
          rules: ['required'],
          state: null,
          error: []
        }
      }
    }
  },
  created () {
    this.fetchTags()
  },
  methods: {
    fetchTags () {
      this.fetchingTags = true
      this.$store.dispatch('tag/index')
        .catch(e => {
          this.$bvToast.toast('The tag list could not be fetched', {
            title: 'API Error',
            variant: 'danger',
            solid: true
          })
          /* eslint-disable no-console */
          console.log('Error with fetching the tags: ', e)
        })
        .finally(() => (this.fetchingTags = false))
    },
    async createArticle () {
      this.$nuxt.$loading.start()
      try {
        await this.$store.dispatch('article/store', {
          article: this.form
        })
        return this.$router.push({ name: 'articles', params: { articleCreated: 'articleCreated' } })
      } catch (e) {
        if (e.response?.data?.errors) {
          for (const key in e.response.data.errors) {
            this.validation[key].state = false
            this.validation[key].error = e.response.data.errors[key]
          }
        }
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    createTag () {
      this.$store.dispatch('tag/store', this.tag)
      this.form.tagList.push(this.tag)
      this.tag = ''
    },
    onSubmit () {
      if (!this.validateForm()) {
        // focus on the first input has error
        const unvalidated = Object.entries(this.validation).find(item => item[1].state === false)
        this.$refs[unvalidated[0]].focus()
        return
      }
      return this.createArticle()
    },
    validateForm () {
      this.resetValidation()

      Object.keys(this.validation).forEach(key => {
        // required validation
        if (this.validation[key].rules.includes('required')) {
          if (!this.form[key].length) {
            this.validation[key].state = false
            this.validation[key].error.push('Required Field')
          }
        }
      })

      return !Object.values(this.validation).some(v => v.state === false)
      // == Object.values(this.validation).every(v => v.state === null)
      // but I guess there is a performance advantage with another one in term of using "some"
    },
    resetValidation () {
      Object.keys(this.validation).forEach(key => {
        this.validation[key].state = null
        this.validation[key].error = []
      })
    }
  }
}
</script>
