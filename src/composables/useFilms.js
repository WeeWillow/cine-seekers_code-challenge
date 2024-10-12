import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useFilms() {
  //state
  const films = ref([]);
  const filmSlice = ref();


  //functions
  //function to fetch films
  const fetchFilms = () => {
    const bearerToken = import.meta.env.VITE_BEARER_TOKEN; //access local file with bearer token

    //fetch discover movie data from api
    fetch(`https://api.themoviedb.org/3/discover/movie?language=en-GB`, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`, //include bearer in header
      }
    }) //api url
      .then(response => response.json()) //parse js response into json
      .then(data => {
        films.value = data.results; //update the film array from api data
        //removed console.log for code cleanup
      })
      .catch(error => {
        console.error('Error fetching films:', error);
      });
  };

  // function to update film slice based on screen size
  //odd numbers due to starting from 1 of array, rather than 0
  const updateFilmSlice = () => {
    if (window.innerWidth < 800) {
      filmSlice.value = 5; // shows 4 films
    } else {
      filmSlice.value = 7; // shows 6 films
    }
  };

  //lifecycle hooks
  //call api when component is mounted
  onMounted(() => {
    fetchFilms();
    updateFilmSlice();
    window.addEventListener('resize', updateFilmSlice);
  });

  // remove eventlistener when component unmounted to avoid memory leak
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateFilmSlice);
  });


  //return state and functions
  return {
    films,
    filmSlice,
    fetchFilms,
    updateFilmSlice
  };
}