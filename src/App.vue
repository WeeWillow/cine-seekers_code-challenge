<script setup>
// import components
import TheNav from './components/TheNav.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<template>
  <TheNav />
  <main>
    <router-view></router-view>
  </main>
  <TheFooter/>
</template>

<style scoped></style>
