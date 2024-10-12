<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';

//import composable - reusable js to avoid duplicate code
import { useFilmById } from '../composables/useFilmById';

// state
//use composable function
const { film, error } = useFilmById();
const backdropBase = 'https://image.tmdb.org/t/p/original'; //variable storing image url for backdrops at a certain size, to use as base along with api path
const posterBase = 'https://image.tmdb.org/t/p/w500'; //variable storing image url for posters at a certain size, to use as base along with api path
const isMobile = ref(); //reactive variable to store screensize. if larger than 800 = false and render desktop images
const isLoading = ref(true); //loading state to allow API data to populate

// function check if mobile
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 800;
};

// call checkScreenSize on mount
onMounted(() => {
  // set initial screensize
  checkScreenSize();
  // event listener to check screen size
  window.addEventListener('resize', checkScreenSize);

  // once film is loaded, turn off loading state
  isLoading.value = film.value;
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <!-- loading state to avoid blank page while api is being fetched -->
  <div v-if="isLoading">
    <p>Loading film...</p>
  </div>

  <div v-else-if="error">
    <p>Error loading film: {{ error }}</p>
  </div>

  <div v-else>
    <!-- v-if="film" used to check if api data has been received before rendering content to avoid errors and issues-->
    <header class="trending-film-header" v-if="film">
      <!-- check if isMobile = true, and check if poster path exists then renders poster-->
      <img v-if="isMobile && film.poster_path" :src="posterBase + film.poster_path" :alt="`the cover of ${film.title}`">
      <!-- if isMobile = false, render backdrop instead -->
      <img v-else-if="film.backdrop_path" :src="backdropBase + film.backdrop_path" :alt="`the cover of ${film.title}`">
      <!-- gradient overlay used on images -->
      <div class="diagonal-overlay"></div>
      <div class="film-details">
        <h1 v-if="film.title">{{ film.title }}</h1>
        <p class="release-year">Released {{ film.release_date }}</p>
        <img class="poster" :src="posterBase + film.poster_path" :alt="`the poster of ${film.title}`">
      </div>
    </header>
    <!-- v-if="film" used to check if api data has been received before rendering content to avoid errors and issues-->
    <section class="genres-wrapper flex" v-if="film">
      <!-- v-for looping through genres in film array as genre -->
      <p class="genre-bubble" v-for="genre in film.genres">{{ genre.name }}</p> <!-- in concept, these would be links to the genre-->
    </section>
    <!-- adds film tagline and overview/description -->
    <section class="film-overview" v-if="film">
      <h2>Overview</h2>
      <p class="tagline">{{ film.tagline }}</p>
      <p class="overview-text">{{ film.overview }}</p>
    </section>
  </div>
</template>

<style scoped>
header {
  height: 53vh;
  padding: 1.5rem 2rem;
}

.genres-wrapper {
  gap: 1rem;
  margin: 1rem 0;
  width: 100%;


  .genre-bubble {
    background: var(--bubblegum-pink);
    padding: .8rem 1.2rem;
    width: fit-content;
    border-radius: 50px;
    box-shadow: 0px 2px 5px 0px rgba(64, 38, 58, 0.2);

    &:hover {
      cursor: pointer;
      transform: scale(1.03);
      filter: drop-shadow(0 6px 10px var(--bubblegum-pink));
    }
  }
}

.film-details {
  width: 100%;
  position: absolute;
  z-index: 2;

  h1 {
    font-size: 3rem;
    color: var(--white);
  }

  p {
    color: var(--cream-white);
    margin: .4rem 0 0 0;
  }

  .poster {
    border-radius: 4px;
    position: absolute;
    top: 120%;
    left: 0;
    height: 36vh;
    width: 250px;
    filter: drop-shadow(0 6px 10px var(--ice-teal));
  }
}

.film-overview {
  margin: 2rem 0 0 0;

  h2 {
    font-weight: bold;
  }

  .tagline {
    margin: .5rem 0;
    font-style: italic;
    font-weight: 100;
  }

  .overview-text {
    margin: 1.5rem 0 0 0;
    width: 75ch;
    line-height: 1.5;
  }
}

/* styling for mobile */
@media screen and (max-width: 800px) {
  header {
    padding: 1rem;
    height: 130vw;
  }

  .film-overview {
    .tagline {
      margin: .5rem 0;
      font-style: italic !important;
      font-weight: 100;
      width: 100%;
    }

    .overview-text {
      margin: 1.5rem 0 0 0;
      width: 100%;
    }
  }

  .genres-wrapper {
    flex-wrap: wrap;
  }

  .film-details {
    padding-top: 110%;
    left: 1rem;

    .poster {
      opacity: 0;
    }

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: .8rem;
      width: 50%;
      margin: .4rem 0 0 0;
    }
  }
}
</style>