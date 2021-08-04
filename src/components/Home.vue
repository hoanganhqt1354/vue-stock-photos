<template>
  <main>
    <section class="search">
        <form class="search-form" @submit.prevent="handleSearch">
            <input
            type='text'
            class='form-input'
            v-model="query"
          />
          <button type='submit' class='submit-btn'>
            Search
          </button>
        </form>
    </section>
    <section class="photos">
      <div class="photos-center">
        <article v-for="(photo, key) in photos" :key="key" class='photo'>
          <img :src="photo.urls.regular" :alt="photo.alt_description" />
          <div class='photo-info'>
            <div>
              <h4>{{photo.user.name}}</h4>
              <p>{{photo.likes}} likes</p>
            </div>
            <a :href="photo.user.portfolio_url">
              <img :src="photo.user.profile_image.medium" alt='' class='user-img' />
            </a>
          </div>
        </article>
      </div>
      <h2 v-if="loading" className='loading'>Loading...</h2>  
    </section>  
  </main>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return{

    }
  },
  methods: {
    handleSearch() {
      this.$store.commit('SET_PAGE', 0)
      this.$store.dispatch('GET_PHOTOS')
    }
  },

  created() {
    this.$store.dispatch('GET_PHOTOS')
    
  },
  mounted() {
    const event = window.addEventListener('scroll', () => {
      if (
        (!this.loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 10
      ) {
        this.$store.commit('SET_PAGE', this.page + 1)       
      }
    })
    return () => window.removeEventListener('scroll', event)
  },


  computed: {
    ...mapState({
    photos: state => state.photos,
    loading: state => state.loading,
    page: state => state.page,
    }),
    query: {
      get() {
        return this.$store.state.query
      },
      set(value) {
        this.$store.commit('SET_QUERY', value)
      }
    }
  },

  watch: {
    page() {
      this.$store.dispatch('GET_PHOTOS')
    }
  },
}
</script>

<style>
</style>
