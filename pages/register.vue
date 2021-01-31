<template>
  <b-row align-h="center" align-v="center" class="vh-100">
    <b-col class="auth-form">
      <b-card bg-variant="light">
        <b-card-title title="Register" title-tag="h1" class="text-center text-dark font-weight-normal" />
        <b-form class="mb-3" novalidate @submit.stop.prevent="onSubmit">
          <b-form-group label="User" label-for="username">
            <b-form-input
              id="username"
              ref="username"
              v-model="form.username"
              required
              :state="validation.username.state"
            />
            <b-form-invalid-feedback>{{ validation.username.error.join(' - ') }}</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label="Email" label-for="email">
            <b-form-input
              id="email"
              ref="email"
              v-model="form.email"
              type="email"
              required
              :state="validation.email.state"
            />
            <b-form-invalid-feedback>{{ validation.email.error.join(' - ') }}</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-form-input
              id="password"
              ref="password"
              v-model="form.password"
              type="password"
              required
              :state="validation.password.state"
            />
            <b-form-invalid-feedback>{{ validation.password.error.join(' - ') }}</b-form-invalid-feedback>
          </b-form-group>

          <b-button type="submit" variant="primary" block :disabled="$nuxt.$loading.show">
            <div class="d-flex align-items-center justify-content-center position-relative">
              <span>Register</span>
              <b-spinner v-show="$nuxt.$loading.show" small class="position-absolute right-0" />
            </div>
          </b-button>
        </b-form>
        <b-card-text class="text-secondary">
          Already Registered?
          <nuxt-link to="/login" class="ml-2">
            <b class="text-nowrap">Login</b>
          </nuxt-link>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      validation: {
        username: {
          rules: ['required'],
          state: null,
          error: []
        },
        email: {
          rules: ['required', 'email'],
          state: null,
          error: []
        },
        password: {
          rules: ['required'],
          state: null,
          error: []
        }
      }
    }
  },
  head: {
    title: 'Register'
  },
  methods: {
    async register () {
      this.$nuxt.$loading.start()
      try {
        const data = await this.$axios.$post('/users', {
          user: this.form
        })
        await this.$auth.setUserToken(data.user.token)
      } catch (e) {
        for (const key in e.response.data.errors) {
          this.validation[key].state = false
          this.validation[key].error = e.response.data.errors[key]
        }
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    onSubmit () {
      if (!this.validateForm()) {
        // focus on the first input has error
        const unvalidated = Object.entries(this.validation).find(item => item[1].state === false)
        this.$refs[unvalidated[0]].focus()
        return
      }
      return this.register()
    },
    validateForm () {
      this.resetValidation()

      const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/

      Object.keys(this.validation).forEach(key => {
        // required validation
        if (this.validation[key].rules.includes('required')) {
          if (!this.form[key].length) {
            this.validation[key].state = false
            this.validation[key].error.push('Required Field')
          }
        }

        // email validation
        if (this.validation[key].rules.includes('email')) {
          if (!emailRegex.test(this.form[key])) {
            this.validation[key].state = false
            this.validation[key].error.push('Invalid Format')
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
