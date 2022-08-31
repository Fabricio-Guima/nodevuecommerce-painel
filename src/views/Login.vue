<template>
  <div
    class="d-flex align-items-center bg-auth border-top border-top-2 border-primary"
    style="height: 100vh !important"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">
          <!-- Heading -->
          <h1 class="display-4 text-center mb-3">Sign in</h1>

          <!-- Subheading -->
          <p class="text-muted text-center mb-5">
            Free access to our dashboard.
          </p>
          <!-- Alerta -->
          <div
            v-if="error.message != ''"
            class="alert alert-danger"
            role="alert"
          >
            {{ error.message }}
          </div>

          <!-- Form -->
          <ValidationObserver
            ref="loginForm"
            tag="form"
            @submit.stop.prevent="login"
          >
            <!-- Email address -->
            <div class="form-group">
              <!-- Label -->
              <label class="form-label"> Email Address </label>

              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                name="email"
              >
                <!-- Input -->
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  placeholder="name@address.com"
                />
                <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <!-- Password -->
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <!-- Label -->
                  <label class="form-label"> Password </label>
                </div>
                <div class="col-auto">
                  <!-- Help text -->
                  <a
                    href="password-reset-cover.html"
                    class="form-text small text-muted"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <!-- / .row -->

              <!-- Input group -->
              <div class="">
                <!-- Input -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="password"
                >
                  <input
                    v-model="form.password"
                    class="form-control"
                    type="password"
                    placeholder="Enter your password"
                  />

                  <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <!-- Icon -->
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="btn btn-lg w-100 btn-primary mb-3"
              :disabled="spinner.loading"
            >
              <img
                v-if="spinner.loading"
                src="@/assets/img/spinner.svg"
                alt=""
                width="20"
                height="20"
                class="d-inline-block"
              />
              Sign in
            </button>

            <!-- Link -->
            <div class="text-center">
              <small class="text-muted text-center">
                Don't have an account yet? <a href="sign-up.html">Sign up</a>.
              </small>
            </div>
          </ValidationObserver>
        </div>
      </div>
      <!-- / .row -->
    </div>
    <!-- / .container -->
  </div>
</template>

<script>
import Cookie from '@/service/cookie'
import messages from '@/utils/messages'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Login',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      form: {
        email: 'fsgkof@gmail.com',
        password: '123456',
      },
      spinner: {
        loading: false,
      },

      error: {
        color: '',
        message: '',
      },
    }
  },
  methods: {
    async login() {
      console.log('metodo login')
      //se tiver erro de validação, validator vira false
      const validator = await this.$refs.loginForm.validate()
      if (!validator) {
        return
      }

      this.resetResponse()
      this.spinner.loading = true

      const payload = {
        email: this.form.email,
        password: this.form.password,
      }

      this.$axios
        .post('/api/login', payload)
        .then(response => {
          console.log('login: ', response.data.user)
          console.log('token: ', response.data.token)
          const token = response.data.token

          Cookie.setToken(token)

          this.$store.commit('user/STORE_USER', response.data.user)
          this.$store.commit('user/STORE_USER_LOGGED', true)

          this.$router.push({ name: 'collaborators.index' })
        })
        .catch(error => {
          this.spinner.login = false
          console.log(error)
          // const errorCode = e?.response?.data?.error || 'ServerError'
          this.$toasted.error(messages[error?.response?.data?.name], {
            class: 'toasting',
          })
          // this.error.message = messages[error?.response?.data?.name];
          // this.error.color = 'danger';
        })
        .finally(() => {
          this.spinner.loading = false
        })
    },
    resetResponse() {
      this.error.color = ''
      this.error.message = ''
    },
  },
}
</script>

<style></style>
