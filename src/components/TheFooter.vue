<script setup>
</script>

<template>
<footer class="flex">
  <p>Frontend development project showcasing API integration, responsive design, and hands-on experience with Vue.js.</p>
  <p>View the source code on <a href="https://github.com/WeeWillow/cine-seekers_code-challenge" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
  <p>&copy; 2024 - By Monica <span>aka</span>
    <a href="https://github.com/WeeWillow" target="_blank" rel="noopener noreferrer">WeeWillow</a>. 
    All rights reserved.</p>
</footer>
</template>

<style scoped>
footer {
  background: var(--active-teal);
  border-radius: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;

  height: 12vh;
  margin: 1rem;
  box-shadow: 0px 2px 5px 0px rgba(64,38,58,0.5);

  p {
    text-align: center;
    font-size: .8rem;
  }
}

span {
  font-style: italic;
  font-size: .7rem;
  padding: 0 .4rem 0 .1rem;
}

@media screen and (max-width: 800px) {
  footer {
    padding: .5rem;
    height: 25vh;
  }
}
</style>