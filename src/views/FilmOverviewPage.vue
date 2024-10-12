<script setup>
//import composable
import { useFilms } from '../composables/useFilms';

// state
//use composable function
const {films, filmSlice} = useFilms();
const poster = 'https://image.tmdb.org/t/p/w500'; //variable storing image url for posters at a certain size, to use as base along with api path
</script>

<template>
    <h1 class="trending-header">
      Trending films
    </h1>
  <article>
    <section class="film-section base-grid">
      <!-- v-for: vue directive - loop through 'films' array -->
       <!-- dynamic path using vue router. replace used to clean up and standardise titles in url -->
      <router-link :to="{path: `/films/${film.id}/${film.title.replace(/\s+/g, '-').toLowerCase()}`}" v-for="film in films" :key="film.id">
        <div class="film-card" >
          <h3>{{ film.title }}</h3>
          <div class="diagonal-overlay"></div>
          <img
          :src="[poster + film.poster_path]" 
          :alt='["the cover of " + film.title]'>
        </div>
      </router-link>
      </section>
  </article>
    

</template>

<style scoped>
.film-section {
  gap: 1rem;
  grid-template-columns: repeat(5, 1fr);
  a {
    text-decoration: none;
    /* font */
  }
}

.film-card {
  position: relative;
  height: 25vw;
  width: auto;
  border-radius: .25rem;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
  background: var(--white);
  padding: .5rem;
  overflow: hidden;
  transition: all 0.15s ease-in-out;
  &:hover {
    transform: scale(1.03);
    filter: drop-shadow(0 6px 10px var(--bubblegum-pink));
    h3,
    .diagonal-overlay {
      opacity: 100%;
    }
  }

  .diagonal-overlay{
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(360deg, var(--ice-teal) 30%, rgba(0,212,255,0) 100%);
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }

  img {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  h3 {
    font-family: "Poiret One", sans-serif;
    position: relative;
    z-index: 2;
    top: 70%;
    right: 0;

    text-align: center;
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    color: black;
    width: 100%;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
    overflow: hidden;
  }
}

h1.trending-header {
  font-weight: bold;
  font-size: 3rem;
}

@media screen and (max-width: 800px) {

  article {
    margin: 1.5rem 0;
  }

  h1.trending-header {
    font-size: 2rem;
  }
  .film-section {
    grid-template-columns: repeat(2, 1fr);
    gap: .8rem;
    width: 100%;
  }

  .film-card {
    height: 65vw;
    width: auto;
    h2 {
      font-size: 1.2rem;
    }
    h3 {
      font-size: 1rem;
    }
  }
}
</style>