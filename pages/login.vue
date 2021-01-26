<template>
  <b-container>
    <b-row align-h="center" align-v="center" class="vh-100">
      <b-col cols="11" sm="9" md="7" lg="5">
        <b-card bg-variant="light">
          <b-card-title title="LOGIN" title-tag="h1" class="text-center text-dark font-weight-normal" />
          <b-form class="mb-3" novalidate @submit.stop.prevent="onSubmit">
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

            <b-button type="submit" variant="primary" block>
              Login
            </b-button>
          </b-form>
          <b-card-text class="text-secondary">
            Don't have account?
            <nuxt-link to="/register" class="ml-2">
              <b class="text-nowrap">Register Now</b>
            </nuxt-link>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  layout: 'guest',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      validation: {
        email: {
          state: null,
          error: []
        },
        password: {
          state: null,
          error: []
        }
      }
    }
  },
  methods: {
    onSubmit () {
      if (!this.validateForm()) {
        // focus on the first input has error
        const unvalidated = Object.entries(this.validation).find(item => item[1].state === false)
        this.$refs[unvalidated[0]].focus()
        return
      }
      alert(JSON.stringify(this.form))
    },
    validateForm () {
      this.resetValidation()

      if (!this.form.email.length) {
        this.validation.email.state = false
        this.validation.email.error.push('Required Field')
      }

      const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
      if (!emailRegex.test(this.form.email)) {
        this.validation.email.state = false
        this.validation.email.error.push('Invalid Format')
      }

      if (!this.form.password.length) {
        this.validation.password.state = false
        this.validation.password.error.push('Required Field')
      }

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
