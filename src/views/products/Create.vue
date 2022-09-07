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
                    <h6 class="header-pretitle">Produtos</h6>

                    <!-- Title -->
                    <h1 class="header-title">Novo produto</h1>
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
                        <router-link :to="{ name: 'products.index' }" class="nav-link">
                          Todos os produtos
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          :to="{ name: 'products.create' }"
                          class="nav-link active"
                        >
                          Novo produto
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Form -->
            <ValidationObserver
              ref="createForm"
              tag="form"
              @submit.stop.prevent="create"
              class="position-relative"
              enctype="multipart/form-data"
            >
              <div class="row justify-content-between align-items-center">
                <div class="col">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <!-- Avatar -->
                      <div class="avatar">
                        <img
                          class="avatar-img rounded-circle"
                          :src="str_image"
                          alt="..."
                        />
                      </div>
                    </div>
                    <div class="col ms-n2">
                      <!-- Heading -->
                      <h4 class="mb-1">
                        <b>Imagem</b>
                      </h4>

                      <!-- Text -->
                      <small class="text-muted"> PNG ou JPG menor que 1024kbs. </small>
                    </div>
                  </div>
                  <!-- / .row -->
                </div>
                <div class="col-auto">
                  <!-- Button -->

                  <label for="file-upload" class="btn btn-sm btn-primary"> Upload </label>
                  <ValidationProvider
                    v-slot="{ errors, validate }"
                    rules="required|ext:jpg,png|mimes:image/jpeg,image/png|size:1050"
                    name="imagem"
                  >
                    <input
                      style="display: none"
                      id="file-upload"
                      type="file"
                      ref="uploadImage"
                      @change="validate"
                      @input="uploadImagePreview"
                    />
                    <div
                      v-if="!!errors[0]"
                      class="text-danger text-sm custom-error-validation"
                    >
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
              </div>
              <!-- / .row -->

              <!-- Divider -->
              <hr class="my-5" />

              <div class="row">
                <div class="col-12">
                  <!-- Email address -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="mb-1"> Nome do produto </label>

                    <!-- Form text -->
                    <!-- <small class="form-text text-muted">
                      This contact will be shown to others publicly, so choose
                      it carefully.
                    </small> -->

                    <!-- Input -->
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="produto"
                    >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nome do produto"
                        v-model="product.name"
                      />
                      <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <!-- First name -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Categoria </label>

                    <!-- Input -->
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="categoria"
                    >
                      <select name="" class="form-select" v-model="product.category">
                        <option value="" disabled selected>Selecionar</option>
                        <option value="Categoria 1">Categoria 1</option>
                        <option value="Categoria 2">Categoria 2</option>
                        <option value="Categoria 3">Categoria 3</option>
                      </select>
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
                    <label class="form-label"> Preço </label>

                    <!-- Input -->
                    <ValidationProvider v-slot="{ errors }" rules="required" name="preço">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Precio"
                        v-model="product.price"
                      />
                      <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="col-12 col-md-12">
                  <!-- Phone -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Descrição </label>

                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="descrição"
                    >
                      <!-- Input -->
                      <textarea
                        class="form-control"
                        id=""
                        rows="3"
                        placeholder="Extrato"
                        v-model="product.description"
                      ></textarea>
                      <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <!-- / .row -->

              <div class="row">
                <div class="col-12 col-md-6">
                  <!-- Public profile -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="mb-1"> Produto publicado </label>

                    <!-- Form text -->
                    <small class="form-text text-muted">
                      Making your profile public means that anyone on the Dashkit network
                      will be able to find you.
                    </small>

                    <div class="row">
                      <div class="col-auto">
                        <!-- Switch -->
                        <div class="form-check form-switch">
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required"
                            name="produto publicado"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="switchOne"
                              v-model="product.state"
                            />

                            <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                              {{ errors[0] }}
                            </div>
                          </ValidationProvider>
                          <label class="form-check-label" for="switchOne"></label>
                        </div>
                      </div>
                      <div class="col ms-n2">
                        <!-- Help text -->
                        <small class="text-muted"> apagar ativado </small>
                      </div>
                    </div>
                    <!-- / .row -->
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <!-- Allow for additional Bookings -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="mb-1"> Em desconto </label>

                    <!-- Form text -->
                    <small class="form-text text-muted">
                      If you are available for hire outside of the current situation, you
                      can encourage others to hire you.
                    </small>

                    <div class="row">
                      <div class="col-auto">
                        <!-- Switch -->
                        <div class="form-check form-switch">
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required"
                            name="desconto"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="switchTwo"
                              v-model="product.discount"
                            />

                            <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                              {{ errors[0] }}
                            </div>
                          </ValidationProvider>
                          <label class="form-check-label" for="switchTwo"></label>
                        </div>
                      </div>
                      <div class="col ms-n2">
                        <!-- Help text -->
                        <small class="text-muted"> Desconto desativado </small>
                      </div>
                    </div>
                    <!-- / .row -->
                  </div>
                </div>
              </div>
              <!-- / .row -->

              <!-- Divider -->
              <hr class="mt-4 mb-5" />

              <!-- Button -->
              <button type="submit" class="btn btn-primary">Criar produto</button>
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
      product: {
        name: 'a',
        category: 'Categoria 1',
        state: 'true',
        discount: 'true',
        price: '100',
        description: 'adffgd',
      },
      image: undefined,
      spinner: {
        loading: false,
      },

      str_image: '/assets/img/default.jpg',
    };
  },
  methods: {
    async create() {
      const validator = await this.$refs.createForm.validate();
      if (!validator) {
        return;
      }

      console.log('imagem indo subir para o back');
      console.log('uploadImage e refs', this.$refs.uploadImage.files[0]);

      this.spinner.loading = true;

      const form = new FormData();
      form.append('name', this.product.name);
      form.append('category', this.product.category);
      form.append('state', this.product.state);
      form.append('discount', this.product.discount);
      form.append('price', this.product.price);
      form.append('description', this.product.description);
      form.append('image', this.$refs.uploadImage.files[0]);

      // const payload = {
      //   name: this.collaborator.name,
      //   nickname: this.collaborator.nickname,
      //   email: this.collaborator.email,
      //   role: this.collaborator.role,
      // }

      this.$axios
        .post('/api/products', form)
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
    async uploadImagePreview($event) {
      console.log('uploadImage e refs', $event.target.files[0]);

      //mostrar imagem (prévia)
      this.str_image = URL.createObjectURL(this.$refs.uploadImage.files[0]);
    },

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
.custom-error-validation {
  position: absolute;
  top: 85px;
  left: 0;
}
</style>
