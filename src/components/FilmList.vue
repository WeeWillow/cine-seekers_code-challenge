<script setup>
//import composable
import { useFilms } from '../composables/useFilms';

//use composable function
const {films, filmSlice} = useFilms();
const posterBase = 'https://image.tmdb.org/t/p/w342'; //variable storing image url for posters at a certain size, to use as base along with api path
</script>

<template>
  <article>
    <h2 class="trending-header flex">
      Trending films
      <span class="view-all-span"><router-link to="/films">View all films ></router-link></span>
    </h2>
    <section class="film-section base-grid">
      <!-- dynamic path using vue router. replace used to clean up and standardise titles in url -->
      <router-link :to="{path: `/films/${film.id}/${film.title.replace(/\s+/g, '-').toLowerCase()}`}" 
      v-for="film in films.slice(1, filmSlice)" :key="film.id">
        <div class="film-card">
          <h3>{{ film.title }}</h3>
          <div class="diagonal-overlay"></div>
          <img
          :src="[posterBase + film.poster_path]" 
          :alt='["the cover of " + film.title]'>
        </div>
      </router-link>
      </section>
  </article>
</template>

<style scoped>
.film-section {
  gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  a {
    text-decoration: none;
  }
}

.film-card {
  position: relative;
  height: 20vw;
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
    background: linear-gradient(360deg, rgba(0,0,0,.9) 8%, rgba(0,212,255,0) 100%);
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
    position: relative;
    z-index: 2;
    top: 83%;
    right: 0;

    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--cream-white);
    width: 100%;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }
}

h2.trending-header {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: baseline;
}

@media screen and (max-width: 800px) {
  .film-section {
    grid-template-columns: repeat(2, 1fr);
    gap: .8rem;
    width: 100%;
  }

  .film-card {
    height: 60vw;
    width: auto;
    h2 {
      font-size: 1.2rem;
    }
  }

  .view-all-span {
      a {
        color: black;
        text-decoration: none;
        padding: .5rem;
        border-radius: 1rem;
        transition: all 0.15s ease-in-out;
        &:hover {
          border: none;
          background: var(--cream-white);
        }
      }
  }
}
</style>