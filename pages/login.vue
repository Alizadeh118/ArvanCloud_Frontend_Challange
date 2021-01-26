<template>
  <b-container>
    <b-row>
      <b-col cols="11" md="4" class="mx-auto">
        <b-card bg-variant="light" class="mt-4">
          <b-card-title title="LOGIN" title-tag="h1" class="text-center text-secondary" />
          <b-form class="mb-3" novalidate @submit.stop.prevent="onSubmit">
            <b-form-group label="Email" label-for="email">
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                required
                :state="validationState.email"
              />
              <b-form-invalid-feedback>Required Field</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                v-model="form.password"
                type="password"
                required
                :state="validationState.password"
              />
              <b-form-invalid-feedback>Required Field</b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary" block>
              Login
            </b-button>
          </b-form>
          <b-card-text>
            Don't have account?
            <nuxt-link to="/register">
              Register Now
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
      validationState: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    onSubmit () {
      if (!this.validateForm()) { return }
      alert(JSON.stringify(this.form))
    },
    validateForm () {
      this.validationState.email = null
      this.validationState.password = null

      if (!this.form.email.length) {
        this.validationState.email = false
      }

      if (!this.form.password.length) {
        this.validationState.password = false
      }

      return !Object.values(this.validationState).some(state => state === false)
      // == Object.values(this.validationState).every(state => state === null)
      // but I guess there is a performance advantage with another one in term of using "some"
    }
  }
}
</script>
