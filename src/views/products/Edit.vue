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
                    <h1 class="header-title">Editar produto</h1>
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
                          :to="{ name: 'products.edit' }"
                          class="nav-link active"
                        >
                          Editar produto
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
              @submit.stop.prevent="update"
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
                          :src="product.image"
                          alt="..."
                        />
                      </div>
                    </div>
                    <div class="col ms-n2">
                      <!-- Heading -->
                      <h4 class="mb-1">
                        <b>Imagem </b>
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
                        <option :value="product.category" disabled selected>
                          {{ product.category }}
                        </option>
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
                    <label class="form-label"> Variedade </label>

                    <!-- Input -->
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="variedade"
                    >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Variedade"
                        v-model="product.variety"
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
                    <label class="form-label"> Pre??o </label>

                    <!-- Input -->
                    <ValidationProvider v-slot="{ errors }" rules="required" name="pre??o">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Pre??o"
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
                    <label class="form-label"> Descri????o </label>

                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="descri????o"
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
                      <div class="col-auto col-md-6">
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
                              v-model="product.status"
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
              <button type="submit" class="btn btn-primary" :disabled="spinner.loading">
                <img
                  v-if="spinner.loading"
                  src="@/assets/img/spinner.svg"
                  alt=""
                  width="20"
                  height="20"
                  class="d-inline-block"
                />Atualizar produto
              </button>
            </ValidationObserver>

            <br /><br />

            <div class="row justify-content-between align-items-center mb-5">
              <div class="col-12">
                <!-- Heading -->
                <h2 class="mb-2">Variedades do produto</h2>

                <!-- Text -->
                <p class="text-muted mb-xl-0">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolore
                  aspernatur, beatae id quod consequuntur.
                </p>
              </div>
            </div>

            <ValidationObserver
              ref="createVarietyForm"
              tag="form"
              @submit.stop.prevent="createVariety"
              class="row mb-5"
            >
              <div class="col-lg-5">
                <small class="text-muted"> Fornecedor </small>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="fornecedor"
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Fornecedor"
                    v-model="variety.provider"
                  />
                  <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-lg-5">
                <small class="text-muted"> Variedade </small>

                <ValidationProvider v-slot="{ errors }" rules="required" name="variedade">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Tamanho, cores..."
                    v-model="variety.variety"
                  />
                  <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </div>
              <div class="col">
                <small class="text-muted"> A????o* </small> <br />
                <button
                  class="btn btn-primary btn-block"
                  style="width: 100% !important"
                  type="submit"
                >
                  Adicionar
                </button>
              </div>
            </ValidationObserver>

            <div class="card">
              <div class="card-body">
                <!-- List group -->
                <div class="list-group list-group-flush my-n3">
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Heading -->
                        <h4 class="mb-1">Authenticator app</h4>

                        <!-- Text -->
                        <small class="text-muted"> Google auth or 1Password </small>
                      </div>
                      <div class="col-auto">
                        <!-- Button -->
                        <button class="btn btn-sm btn-white">Setup</button>
                      </div>
                    </div>
                    <!-- / .row -->
                  </div>
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Heading -->
                        <h4 class="mb-1">
                          SMS Recovery
                          <i
                            class="fe fe-info text-muted ms-1"
                            data-bs-toggle="tooltip"
                            data-title="We use the the phone number you provide in General"
                            data-bs-original-title=""
                            title=""
                          ></i>
                        </h4>

                        <!-- Text -->
                        <small class="text-muted"> Standard messaging rates apply </small>
                      </div>
                      <div class="col-auto">
                        <!-- Button -->
                        <button class="btn btn-sm btn-danger">Disable</button>
                      </div>
                    </div>
                    <!-- / .row -->
                  </div>
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Heading -->
                        <h4 class="mb-1">
                          Recovery codes
                          <i
                            class="fe fe-info text-muted ms-1"
                            data-bs-toggle="tooltip"
                            data-title="We use the the phone number you provide in General"
                            data-bs-original-title=""
                            title=""
                          ></i>
                        </h4>

                        <!-- Text -->
                        <small class="text-muted"> Standard messaging rates apply </small>
                      </div>
                      <div class="col-auto">
                        <!-- Button -->
                        <button class="btn btn-sm btn-white">Reveal</button>
                      </div>
                    </div>
                    <!-- / .row -->
                  </div>
                </div>
              </div>
            </div>
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
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: {
        name: '',
        category: '',
        status: '',
        discount: '',
        variety: '',
        price: '',
        description: '',
      },
      varieties: [],
      variety: {},
      sku: '',
      image: undefined,
      spinner: {
        loading: false,
      },
    };
  },
  methods: {
    async getProductById() {
      this.$axios
        .get(`/api/products/${this.id}`)
        .then((response) => {
          this.product = response.data;
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
    async update() {
      const validator = await this.$refs.createForm.validate();
      if (!validator) {
        return;
      }
      console.log('uploadImage e refs', this.$refs.uploadImage.files[0]);

      this.spinner.loading = true;

      const form = new FormData();
      form.append('name', this.product.name);
      form.append('category', this.product.category);
      form.append('status', this.product.status);
      form.append('discount', this.product.discount);
      form.append('variety', this.product.variety);
      form.append('price', this.product.price);
      form.append('description', this.product.description);
      form.append('image', this.$refs.uploadImage.files[0]);

      this.$axios
        .put(`/api/products/${this.id}`, form)
        .then((response) => {
          console.log('produto atualizado: ', response.data);
          this.$toasted.success('Produto atualizado com sucesso');

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

      //mostrar imagem (pr??via)
      this.product.image = URL.createObjectURL(this.$refs.uploadImage.files[0]);
    },

    async createVariety() {
      this.variety.product = this.id;
      this.variety.sku = await this.generateSku();

      this.$axios
        .post(`/api/varieties`, this.variety)
        .then((response) => {
          console.log('variedade criada: ', response.data);
          this.$toasted.success('variedade criada com sucesso');
          this.resetFieldsVariety();

          return;
        })
        .catch((error) => {
          this.spinner.login = false;
          console.log(error);
          this.$toasted.error(messages[error?.response?.data?.name], {
            class: 'toasting',
          });
          return;
        });
    },

    async generateSku() {
      let sku =
        this.product.name.substring(0, 3) +
        '' +
        this.product.variety +
        '' +
        this.variety.variety +
        '' +
        this.variety.provider;

      return sku.toUpperCase();
    },

    resetFieldsVariety() {
      this.variety = {};
      this.$refs.createVarietyForm.reset();
    },

    async getVarietiesProduct() {
      this.$axios
        .get(`/api/varieties/${this.id}`)
        .then((response) => {
          this.varieties = response.data;
        })
        .catch((error) => {
          this.spinner.login = false;
          console.log(error);
          this.$toasted.error(messages[error?.response?.data?.name], {
            class: 'toasting',
          });
          return;
        });
    },
  },

  created() {
    this.getProductById();
    this.getVarietiesProduct();
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
