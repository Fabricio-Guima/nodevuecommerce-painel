import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout1 from '../layouts/Layout1.vue'
import Guard from '@/service/middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout1,
    children: [
      {
        path: '',
        name: 'home.index',

        component: function () {
          return import(/* webpackChunkName: "home" */ '../views/Home.vue')
        },
      },
      {
        path: '/collaborators',
        name: 'collaborators.index',
        beforeEnter: Guard.redirectIfNotAuthenticated,

        component: function () {
          return import(
            /* webpackChunkName: "collaborators.index" */ '../views/collaborators/Index.vue'
          )
        },
      },

      {
        path: '/collaborators/edit/:id',
        name: 'collaborators.edit',
        beforeEnter: Guard.redirectIfNotAuthenticated,
        props: true,

        component: function () {
          return import(
            /* webpackChunkName: "collaborators.edit" */ '../views/collaborators/Edit.vue'
          )
        },
      },

      {
        path: '/collaborators/create',
        name: 'collaborators.create',
        beforeEnter: Guard.redirectIfNotAuthenticated,

        component: function () {
          return import(
            /* webpackChunkName: "collaborators.create" */ '../views/collaborators/Create.vue'
          )
        },
      },
      {
        path: '/products',
        name: 'products.index',
        beforeEnter: Guard.redirectIfNotAuthenticated,

        component: function () {
          return import(
            /* webpackChunkName: "products.index" */ '../views/products/Index.vue'
          )
        },
      },

      {
        path: '/products/create',
        name: 'products.create',
        beforeEnter: Guard.redirectIfNotAuthenticated,

        component: function () {
          return import(
            /* webpackChunkName: "products.create" */ '../views/products/Create.vue'
          )
        },
      },

      {
        path: '/products/edit/:id',
        name: 'products.edit',
        props: true,
        beforeEnter: Guard.redirectIfNotAuthenticated,

        component: function () {
          return import(
            /* webpackChunkName: "products.edit" */ '../views/products/Edit.vue'
          )
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: Guard.redirectIfAutheticated,
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
