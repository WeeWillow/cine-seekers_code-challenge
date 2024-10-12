<script setup>
// import components used on page
import FilmList from '../components/FilmList.vue';
import GenreList from '../components/GenreList.vue';

import { ref, onBeforeUnmount, onMounted } from 'vue';

//import composable - reusable js to avoid duplicate code
import { useFilms } from '../composables/useFilms';

//use composable function
const { films } = useFilms(); // use films returned from composable
const backdropBase = 'https://image.tmdb.org/t/p/original'; //variable storing image url for backdrops at a certain size, to use as base along with api path 
const posterBase = 'https://image.tmdb.org/t/p/w500'; //variable storing image url for posters at a certain size, to use as base along with api path
const isMobile = ref(); //reactive variable to store screensize. if larger than 800 = false and render desktop images

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
});

// remove eventlistener when component unmounted to avoid memory leak
onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
    <!-- v-if checks if films array has any elements (length > 0) and only renders if true -->
    <header class="trending-film-header" v-if="films.length > 0">
        <!-- dynamic path using vue router. replace used to clean up and standardise titles in url -->
         <!-- specifically using the first item from films array in header on landing page -->
        <router-link :to="{path: `/films/${films[0].id}/${films[0].title.replace(/\s+/g, '-').toLowerCase()}`}">
            <!-- checks if isMobile = true to render poster -->
            <img v-if="isMobile" 
            :src="[posterBase + films[0].poster_path]" 
            :alt='["the cover of " + films[0].title]'>
            <!-- if isMobile = false, render backdrop instead -->
            <img v-else 
            :src="[backdropBase+ films[0].backdrop_path]" 
            :alt='["the cover of " + films[0].title]'>
            <!-- gradient overlay used on images -->
            <div class="diagonal-overlay"></div>
            <h1 class="hero">{{films[0].title}}</h1>
        </router-link>
    </header>
    <!-- calling components for trending films and specific genres-->
    <FilmList/>
    <GenreList/>
</template>

<style scoped>
</style>