import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
const clientID = `?client_id=${process.env.VUE_APP_ACCESS_KEY}`

export default new Vuex.Store({
  state: {
    photos: [],
    page: 0,
    query: '',
    loading: false,
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload
    },
    SET_PHOTOS: (state, payload) => {
      state.photos = payload
    },
    SET_QUERY: (state, payload) => {
      state.query = payload
    },
    SET_PAGE: (state, payload) => {
      state.page = payload
    }
  },
  actions: {
    async GET_PHOTOS ({commit, state}) {
      commit('SET_LOADING', true)
      let url
      const urlPage = `&page=${state.page}`
      const urlQuery = `&query=${state.query}`
      console.log(state.query)
      if (state.query) {
        url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
      } else {
        url = `${mainUrl}${clientID}${urlPage}`
      }
      try {
        const response = await fetch(url)
        const data = await response.json()
        if (state.query && state.page === 0) {
          commit('SET_PHOTOS', data.results)   
        } else if (state.query) {
          commit('SET_PHOTOS', [...state.photos, ...data.results])
        } else {
          commit('SET_PHOTOS', [...state.photos, ...data])
        }     
      }
      catch(error) {
        console.log(error)
      }
      finally {
        commit('SET_LOADING', false)
      }
    }
  },
  modules: {
  }
})
