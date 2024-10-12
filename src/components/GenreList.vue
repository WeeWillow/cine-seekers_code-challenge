<script setup>
//import composable
import { useGenres } from '../composables/useGenres';

//use composable function
const {genresWithFilmCount} = useGenres();
const backdropBase = 'https://image.tmdb.org/t/p/w500'; //variable storing image url for backdrops at a certain size, to use as base along with api path
 
</script>

<template>
      <!-- v-for: vue directive - loop through 'genre' array -->
  <article class="genre-article" v-for="genre in genresWithFilmCount" :key="genre.id">
    <h2 class="trending-header flex">
      Trending in {{genre.name}} <span class="view-all-span"><router-link to="/films">All {{genre.name}} ({{ genre.filmCount }}) ></router-link></span></h2>

    <section class="genreFilm-section base-grid">
      <!-- dynamic path using vue router. replace used to clean up and standardise titles in url -->
      <router-link 
      :to="{path: `/films/${film.id}/${film.title.replace(/\s+/g, '-').toLowerCase()}`}"
      v-for="film in genre.films.slice(0, 6)" :key="film.id">
        <div class="genreFilm-card flex-center">
          <h3>{{ film.title }}</h3>
          <div class="diagonal-overlay"></div>
          <img v-if="film.backdrop_path"
          :src="backdropBase + film.backdrop_path" 
          :alt="`the cover of ${film.title}`">
        </div>
      </router-link>
    </section>
  </article>
</template>

<style scoped>

.trending-header {
  justify-content: space-between;
}

.genreFilm-section {
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  a {
    color: var(--white);
    text-decoration: none;
  }
}

.genreFilm-card {
  position: relative;
  height: 10vw;
  width: auto;
  border-radius: .25rem;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
  background: var(--white);
  padding: 1rem;
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

  img {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .diagonal-overlay{
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(360deg, rgba(0,0,0,.9) 10%, rgba(0,212,255,0) 100%);
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }

  h3 {
    position: relative;
    z-index: 2;
    top: 0;
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



@media screen and (max-width: 800px) {
  .genreFilm-section {
    grid-template-columns: repeat(2, 1fr);
    gap: .8rem;
    width: 100%;
  }

  .genreFilm-card {
    height: 20vw;
    width: auto;
    h2 {
      font-size: 1.2rem;
    }
    h3 {
      font-size: .9rem;
    }

    &.flex-center {
      justify-content: start;
    }
  }

}
</style>