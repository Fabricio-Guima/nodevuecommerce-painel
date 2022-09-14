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

                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link
                          :to="{ name: 'products.index' }"
                          class="nav-link active"
                        >
                          Todos os produtos
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <router-link :to="{ name: 'products.create' }" class="nav-link">
                          Novo produto
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lista de colaboradores -->
            <div class="row">
              <div class="col-12">
                <!-- Files -->
                <div class="card" data-list='{"valueNames": ["name"]}'>
                  <div class="card-header">
                    <!-- Title -->
                    <h4 class="card-header-title">Produtos</h4>
                  </div>
                  <div class="card-header">
                    <div
                      class="input-group input-group-flush input-group-merge input-group-reverse"
                    >
                      <!-- Input -->
                      <input
                        class="form-control list-search"
                        type="search"
                        placeholder="Pesquisar produto"
                        v-model="filter"
                        @keyup.enter="getAllProducts"
                      />

                      <!-- Prepend -->
                      <div
                        class="input-group-text"
                        style="cursor: pointer"
                        @click="getAllProducts"
                      >
                        <span class="fe fe-search"></span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="card-body"
                    :class="[spinner.loading ? 'd-flex justify-content-center' : '']"
                  >
                    <!-- List -->

                    <Loading :loading="spinner.loading" />
                    <ul
                      id="my-table"
                      class="list-group list-group-lg list-group-flush list my-n4"
                    >
                      <li
                        class="list-group-item"
                        v-for="item in itemForList"
                        v-if="!spinner.loading"
                      >
                        <div class="row align-items-center">
                          <div class="col-auto">
                            <!-- Avatar -->
                            <a href="#!" class="avatar avatar-lg">
                              <img
                                :src="item.image"
                                alt="..."
                                class="avatar-img rounded"
                              />
                            </a>
                          </div>
                          <div class="col ms-n2">
                            <!-- Title -->
                            <h4 class="mb-1 name">
                              <a href="#!">{{ item.name }}</a>
                            </h4>

                            <!-- Text -->
                            <p class="card-text small text-muted mb-1">
                              {{ item.category }} &nbsp;
                              <span
                                v-if="!item.status"
                                class="item-score badge bg-danger-soft"
                                >Desativado</span
                              >
                              <span
                                v-if="item.status"
                                class="item-score badge bg-success-soft"
                                >Ativado</span
                              >
                            </p>

                            <!-- Time -->
                            <p class="card-text small text-muted">
                              Criação
                              <time datetime="2018-01-03">{{
                                convertDate(item.createdAt)
                              }}</time>
                            </p>
                          </div>
                          <div class="col-auto">
                            <span
                              ><b>{{ convertCurrency(item.price) }}</b></span
                            >
                          </div>
                          <div class="col-auto">
                            <!-- Dropdown -->
                            <div class="dropdown">
                              <a
                                href="#"
                                class="dropdown-ellipses dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i class="fe fe-more-vertical"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <router-link
                                  :to="{
                                    name: 'products.edit',
                                    params: { id: item._id },
                                  }"
                                  class="dropdown-item"
                                  >Editar</router-link
                                >

                                <a href="#!" class="dropdown-item"> Another action </a>
                                <a href="#!" class="dropdown-item">
                                  Something else here
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- / .row -->
                      </li>
                    </ul>
                  </div>
                  <div class="card-footer">
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="products.length"
                      :per-page="perPage"
                      aria-controls="my-table"
                    ></b-pagination>
                  </div>
                </div>
              </div>
            </div>

            <br /><br />
          </div>
        </div>
        <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import currency_formatter from 'currency-formatter';
import Loading from '@/components/Loading';
export default {
  components: {
    Loading,
  },
  data() {
    return {
      products: [],
      spinner: {
        loading: false,
      },
      currentPage: 1,
      perPage: 2,
      filter: '',
      get itemForList() {
        return this.products.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
      },
    };
  },
  computed: {
    productstatus() {
      return (status) => (status ? 'Desativar' : 'Ativar');
    },
  },
  methods: {
    async getAllProducts() {
      this.spinner.loading = true;
      this.$axios
        .get(`/api/products-all/${this.filter}`)
        .then((response) => {
          console.log('products', response.data);
          this.products = response.data;
        })
        .catch((error) => {
          this.$toasted.error(error.message, {
            class: 'toasting',
          });
        })
        .finally(() => {
          this.spinner.loading = false;
        });
    },

    convertDate(date) {
      return moment(date).format('YYYY-MM-DD');
    },

    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'USD' });
    },

    onLangsPageChange(toPage, fromPage) {
      this.currentPage = toPage;
    },
    goPrev() {
      if (this.currentPage >= 2) {
        return this.$refs.products.goToPage(--this.currentPage);
      } else {
        return this.$refs.products.goToPage(1);
      }
    },
    goNext() {
      if (this.currentPage <= Math.ceil(this.products.length / this.perPage)) {
        return this.$refs.products.goToPage(++this.currentPage);
      } else {
        return this.$refs.products.goToPage(
          Math.ceil(this.products.length / this.perPage)
        );
      }
    },
    async updateStatusProduct(id, status) {
      this.$axios
        .put(`/api/products/${id}/status`, { status })
        .then(() => {
          this.getAllProducts();
          this.$toasted.error(error.message, {
            class: 'toasting',
          });
        })
        .catch((error) => {
          this.$toasted.success('Status do produto atualizado com sucesso', {
            class: 'toasting',
          });
        })
        .finally(() => {});
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>

<style></style>
