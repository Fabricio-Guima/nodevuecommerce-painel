import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout1 from '../layouts/Layout1.vue'

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

        component: function () {
          return import(
            /* webpackChunkName: "collaborators.index" */ '../views/collaborators/Index.vue'
          )
        },
      },

      {
        path: '/collaborators/edit/:id',
        name: 'collaborators.edit',
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

        component: function () {
          return import(
            /* webpackChunkName: "collaborators.create" */ '../views/collaborators/Create.vue'
          )
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
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
