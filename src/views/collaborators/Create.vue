<template>
  <div>
    <div class="main-content">
      <nav class="navbar navbar-expand-md navbar-light d-md-flex">
        <div class="container-fluid">
          <!-- Form -->
          <form class="form-inline me-4 d-none d-md-flex"></form>

          <!-- User -->
          <div class="navbar-user">
            <!-- Dropdown -->
            <div class="dropdown">
              <!-- Toggle -->
              <a
                href="#"
                class="avatar avatar-sm avatar-online dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="/assets/img/avatar-1.jpg"
                  alt="..."
                  class="avatar-img rounded-circle"
                  style="webkit-mask-image: none"
                />
              </a>

              <!-- Menu -->
              <div class="dropdown-menu dropdown-menu-end">
                <a href="./profile-posts.html" class="dropdown-item">Profile</a>
                <a href="./account-general.html" class="dropdown-item">Settings</a>
                <hr class="dropdown-divider" />
                <a href="./sign-in.html" class="dropdown-item">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">
            <!-- Header -->
            <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Pretitle -->
                    <h6 class="header-pretitle">Colaboradores</h6>

                    <!-- Title -->
                    <h1 class="header-title">Novo colaborador</h1>
                  </div>
                </div>
                <!-- / .row -->

                <!-- Alerta -->
                <!-- <div v-if="response.message != ''" :class="response.color" role="alert">
                  {{ response.message }}
                </div> -->

                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link
                          :to="{ name: 'collaborators.index' }"
                          class="nav-link"
                        >
                          Todos os colaboradores
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          :to="{ name: 'collaborators.create' }"
                          class="nav-link active"
                        >
                          Novo colaborador
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form -->
            <ValidationObserver ref="createForm" tag="form" @submit.stop.prevent="create">
              <div class="row">
                <div class="col-12 col-md-6">
                  <!-- First name -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Nome </label>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="nome">
                      <!-- Input -->
                      <input
                        v-model="collaborator.name"
                        type="text"
                        class="form-control"
                      />
                      <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <!-- Last name -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Apelido </label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="apelido"
                    >
                      <!-- Input -->
                      <input
                        type="text"
                        class="form-control"
                        v-model="collaborator.nickname"
                      />
                      <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="col-12">
                  <!-- Email address -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="mb-1"> E-mail </label>

                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|email"
                      name="email"
                    >
                      <!-- Input -->
                      <input
                        type="email"
                        class="form-control"
                        v-model="collaborator.email"
                      />
                      <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <!-- Birthday -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Cargo </label>

                    <ValidationProvider v-slot="{ errors }" rules="required" name="cargo">
                      <!-- Input -->
                      <select
                        name=""
                        class="form-select"
                        id=""
                        v-model="collaborator.role"
                      >
                        <option value="" disabled selected>Seleciono um cargo</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Inventariado">Inventariado</option>
                      </select>
                      <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <!-- / .row -->

              <!-- Divider -->

              <hr class="my-5" />

              <!-- Button -->
              <button
                class="btn btn-primary"
                type="button"
                @click="create"
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
                Criar colaborador
              </button>
            </ValidationObserver>

            <br /><br />
          </div>
        </div>
        <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import messages from '@/utils/messages';
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      collaborator: {
        name: '',
        nickname: '',
        email: '',
        role: '',
      },
      spinner: {
        loading: false,
      },

      // response: {
      //   color: '',
      //   message: '',
      // },
    };
  },
  methods: {
    async create() {
      const validator = await this.$refs.createForm.validate();
      if (!validator) {
        return;
      }

      this.resetResponse();
      this.spinner.loading = true;

      const payload = {
        name: this.collaborator.name,
        nickname: this.collaborator.nickname,
        email: this.collaborator.email,
        role: this.collaborator.role,
      };

      this.$axios
        .post('/api/users', payload)
        .then((response) => {
          console.log('collaborador criado: ', response.data);
          this.$toasted.success('Colaborador criado com sucesso');

          this.clearInputs();
          return;
        })
        .catch((error) => {
          this.spinner.login = false;
          console.log(error);
          this.$toasted.error(messages[error?.response?.data?.name], {
            class: 'toasting',
          });
          return;
        })
        .finally(() => {
          this.spinner.loading = false;
        });
    },
    resetResponse() {},

    clearInputs() {
      this.collaborator.name = '';
      this.collaborator.nickname = '';
      this.collaborator.email = '';
      this.collaborator.role = '';
      this.$refs.createForm.reset();
    },
  },
};
</script>

<style>
.toasting {
  color: yellow !important;
  font-size: 4rem !important;
  background-color: pink !important;
}
</style>
