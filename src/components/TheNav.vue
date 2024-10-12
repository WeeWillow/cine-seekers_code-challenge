<script setup>
import { ref } from 'vue'; 
const showTooltipSearch = ref(false); //tooltip for search icon
const showTooltipWishlist = ref(false); //tooltip for wishlist icon
const showTooltipHome = ref(false); //tooltip for "logo" and home navigation point
</script>

<template>  
<!-- using vue router to create dynamic paths in global nav -->
 <!-- tooltips for items without text, to help accessibility  -->
  <nav class="navbar flex">
    <div id="logo" @mouseover="showTooltipHome=true" @mouseleave="showTooltipHome=false">
      <span><router-link to="/">Cine Seekers</router-link></span>
      <span class="tooltip" v-if="showTooltipHome">Home</span>
    </div>
    
    <ul class="nav-points flex">
      <li><router-link to="/films">Films</router-link></li>
      <li><a href="#">Shows</a></li>

      <div class="nav-icon flex" @mouseover="showTooltipSearch=true" @mouseleave="showTooltipSearch=false">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        <span class="tooltip" v-if="showTooltipSearch">Search</span>
      </div>

    </ul>

    <div id="wishlistIcon" class="nav-icon flex" 
    @mouseover="showTooltipWishlist=true" 
    @mouseleave="showTooltipWishlist=false">
      <a href="#"><font-awesome-icon :icon="['fas', 'bookmark']"/></a>
      <span class="tooltip" v-if="showTooltipWishlist">Wishlist</span>
    </div>

  </nav>
</template>

<style scoped>
/* Basic styling for navbar */
.router-link-active {
  background: var(--active-teal);
}

nav.navbar {
  margin: 0 1rem;
  border-radius: 0 0 30px 30px;
  background-color: var(--bubblegum-pink);
  align-items: center;
  padding: .6rem 1rem;
  justify-content: space-between;

  box-shadow: 0px 2px 5px 0px rgba(64,38,58,0.5);
}

#logo a {
  font-family: 'Poiret One', sans-serif;
  text-transform: uppercase;
  font-weight: 600;
}

.nav-points {
  list-style-type: none;
  padding: 0;
  align-items: center;
  gap: 0.5rem;

  a {
    font-size: .9rem;
  }
}

.nav-icon {
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  border-radius: 100%;

  &:hover {
    border: 1px solid var(--ice-teal);
    background: var(--cream-white);
  }
  /* flex */
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
  color: black;
  padding: .5rem .7rem;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0);

  &:hover {
    border: 1px solid var(--ice-teal);
    background: var(--cream-white);
  }
}

@media screen and (max-width: 800px) {
  nav.navbar {
    margin: 0 .5rem;
    padding: .7rem 1rem;
  }

  .nav-points {
    a {
    font-size: .7rem;
    }
  }
}
</style>
