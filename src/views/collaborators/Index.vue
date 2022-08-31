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
                <a href="./account-general.html" class="dropdown-item"
                  >Settings</a
                >
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

                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link
                          :to="{ name: 'collaborators.index' }"
                          class="nav-link active"
                        >
                          Todos os colaboradores
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          :to="{ name: 'collaborators.create' }"
                          class="nav-link"
                        >
                          Novo colaborador
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lista de colaboradores -->
            <div class="tab-content">
              <div
                class="tab-pane fade show active"
                id="contactsListPane"
                role="tabpanel"
                aria-labelledby="contactsListTab"
              >
                <!-- Card -->
                <div
                  class="card"
                  data-list='{"valueNames": ["item-name", "item-title", "item-email", "item-phone", "item-score", "item-company"], "page": 10, "pagination": {"paginationClass": "list-pagination"}}'
                  id="contactsList"
                >
                  <div class="card-header">
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Form -->
                        <form>
                          <div
                            class="input-group input-group-flush input-group-merge input-group-reverse"
                          >
                            <input
                              class="form-control list-search"
                              type="text"
                              placeholder="Buscar colaborador"
                              v-model="filter"
                            />

                            <span class="input-group-text">
                              <i class="fe fe-search"></i>
                            </span>
                          </div>
                        </form>
                      </div>

                      <div class="col-auto">
                        <!-- Dropdown -->
                        <button
                          @click.stop.prevent="getAllUsers"
                          class="btn btn-sm btn-white"
                          type="button"
                        >
                          <i class="fe fe-sliders me-1"></i> Pesquisar
                          <span class="badge bg-primary ms-1 d-none">0</span>
                        </button>
                      </div>
                    </div>
                    <!-- / .row -->
                  </div>
                  <div class="table-responsive">
                    <table
                      class="table table-sm table-hover table-nowrap card-table"
                    >
                      <thead>
                        <tr>
                          <th>
                            <a
                              class="list-sort text-muted"
                              data-sort="item-name"
                              href="#"
                              >Nomes</a
                            >
                          </th>
                          <th>
                            <a class="list-sort text-muted">Cargo</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Email</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Status</a>
                          </th>
                          <th colspan="2">
                            <a class="list-sort text-muted">Ações</a>
                          </th>
                        </tr>
                      </thead>
                      <!-- Pagination -->
                      <paginate
                        ref="users"
                        tag="tbody"
                        name="users"
                        :list="users"
                        :per="perPage"
                        class="list fs-base"
                      >
                        <tr
                          v-if="!spinner.loading"
                          v-for="(user, index) in paginated('users')"
                          :key="index"
                        >
                          <td>
                            <!-- Avatar -->
                            <div class="avatar avatar-xs align-middle me-2">
                              <img
                                class="avatar-img rounded-circle"
                                src="assets/img/avatars/profiles/avatar-1.jpg"
                                alt="..."
                              />
                            </div>
                            <a
                              class="item-name text-reset"
                              href="profile-posts.html"
                              >{{ user.name }} {{ user.nickname }}</a
                            >
                          </td>
                          <td>
                            <!-- Text -->
                            <span class="item-title">{{ user.role }}</span>
                          </td>
                          <td>
                            <!-- Email -->
                            <a class="item-email text-reset">{{
                              user.email
                            }}</a>
                          </td>

                          <td>
                            <!-- status -->
                            <span
                              v-if="!user.status"
                              class="item-score badge bg-danger-soft"
                              >Desativado</span
                            >
                            <span
                              v-if="user.status"
                              class="item-score badge bg-success-soft"
                              >Ativado</span
                            >
                          </td>

                          <td class="text-end">
                            <!-- Dropdown -->
                            <div class="dropdown">
                              <a
                                class="dropdown-ellipses dropdown-toggle"
                                href="#"
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
                                    name: 'collaborators.edit',
                                    params: { id: user._id },
                                  }"
                                  class="dropdown-item"
                                >
                                  Editar
                                </router-link>

                                <!-- Modal criar colaborador/user -->
                                <a
                                  style="cursor-pointer"
                                  class="dropdown-item"
                                  v-b-modal="'user-' + user._id"
                                >
                                  {{ userStatus(user.status) }}
                                </a>
                              </div>

                              <div>
                                <!-- Modal criar colaborador/user -->
                                <b-modal
                                  @ok="updateStatusUser(user._id, user.status)"
                                  centered
                                  :id="'user-' + user._id"
                                  title="Criar colaborador"
                                  title-html=" <h4 class='card-header-title'><b>Criar colaborador</b></h4>"
                                >
                                  <p class="my-4">{{ user._id }}</p>
                                </b-modal>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </paginate>
                      <tr v-if="spinner.loading">
                        <td colspan="5" class="text-center">
                          <div
                            class="spinner-border text-primary my-5"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <!-- Pagination (prev) -->
                    <ul
                      class="list-pagination-prev pagination pagination-tabs card-pagination"
                    >
                      <li class="page-item">
                        <button
                          class="page-link ps-0 pe-4 border-end"
                          @click="goPrev"
                          style="cursor: pointer"
                        >
                          <i class="fe fe-arrow-left me-1"></i> Prev
                        </button>
                      </li>
                    </ul>

                    <!-- Pagination -->

                    <paginate-links
                      @change="onLangsPageChange"
                      for="users"
                      :classes="{
                        ul: [
                          'list-pagination',
                          'pagination',
                          'pagination-tabs',
                          'card-pagination',
                        ],
                        a: ['page'],
                      }"
                    ></paginate-links>

                    <!-- Pagination (next) -->
                    <ul
                      class="list-pagination-next pagination pagination-tabs card-pagination"
                    >
                      <li class="page-item">
                        <button
                          @click.stop="goNext"
                          class="page-link ps-4 pe-0 border-start"
                          style="cursor: pointer"
                        >
                          Next <i class="fe fe-arrow-right ms-1"></i>
                        </button>
                      </li>
                    </ul>
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
export default {
  data() {
    return {
      users: [],

      spinner: {
        loading: false,
      },
      paginate: ['users'],
      currentPage: 1,
      perPage: 15,
      filter: '',
    }
  },
  computed: {
    userStatus() {
      return status => (status ? 'Desativar' : 'Ativar')
    },
  },
  methods: {
    async getAllUsers() {
      this.spinner.loading = true
      this.$axios
        .get(`/api/users-all/${this.filter}`)
        .then(response => {
          console.log('users', response.data)
          this.users = response.data
        })
        .catch(error => {
          this.$toasted.error(error.message, {
            class: 'toasting',
          })
        })
        .finally(() => {
          this.spinner.loading = false
        })
    },

    onLangsPageChange(toPage, fromPage) {
      this.currentPage = toPage
    },
    goPrev() {
      if (this.currentPage >= 2) {
        return this.$refs.users.goToPage(--this.currentPage)
      } else {
        return this.$refs.users.goToPage(1)
      }
    },
    goNext() {
      if (this.currentPage <= Math.ceil(this.users.length / this.perPage)) {
        return this.$refs.users.goToPage(++this.currentPage)
      } else {
        return this.$refs.users.goToPage(
          Math.ceil(this.users.length / this.perPage)
        )
      }
    },
    async updateStatusUser(id, status) {
      this.$axios
        .put(`/api/users/${id}/status`, { status })
        .then(() => {
          this.getAllUsers()
          this.$toasted.error(error.message, {
            class: 'toasting',
          })
        })
        .catch(error => {
          this.$toasted.success(
            'Status do colaborador atualizado com sucesso',
            {
              class: 'toasting',
            }
          )
        })
        .finally(() => {})
    },
  },
  created() {
    this.getAllUsers()
  },
}
</script>

<style></style>
