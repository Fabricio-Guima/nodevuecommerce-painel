import Cookie from '@/service/cookie'
import axios from 'axios'
import store from '@/store'

export default {
  async redirectIfNotAuthenticated(to, from, next) {
    const token = Cookie.getToken()
    if (!token) {
      next({ name: 'login' })
      return
    }

    //nao basta o token exister, tem que verificar se ele tá válido la na rota /me do backend
    //se o token estiver inválido, vou deletá-lo
    // e volto para a tela de login, pois nao tem token

    await axios
      .get('/api/me')
      .then(response => {
        console.log('me front', response.data.user)
        if (!store?.state?.user?.id) {
          store.commit('user/STORE_USER', response.data.user)
          store.commit('user/STORE_USER_LOGGED', true)
        }
      })
      .catch(() => {
        Cookie.deleteToken()
        next({
          name: 'login',
        })
      })

    next()
  },

  redirectIfAutheticated(to, from, next) {
    const token = Cookie.getToken()
    let n
    if (token) {
      n = { name: 'collaborators.index' }
    }

    //se n for vazio, ele vai seguir a rotina dele normalmente
    next(n)
  },
}
