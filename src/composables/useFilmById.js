import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export function useFilmById() {
  // state
  const film = ref();
  const error = ref();

  // get route object to access route params
  const route = useRoute();

  // functions
  const fetchFilmById = () => {
    const filmId = route.params.id; //access dynamic ID from route
    const bearerToken = import.meta.env.VITE_BEARER_TOKEN; //access local file with bearer token

    //fetch movie with specific ID from api
    fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=en-GB`, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`, //include bearer in header
      }
    })
      .then(response => response.json()) //parse js response into json
      .then(data => {
        //removed console.log for code cleanup
        film.value = data; //store data in reactive film variable
      })
      //should technically be error or err (usually anyway), but whoops is more fun and whimsical
      .catch(whoops => {
        console.error('Whoops - issue fetching film by ID: ', whoops);
        error.value = 'Failed to fetch film data.'; //error used in loading state in case api data fails to load
      });
  };

  //lifecycle hooks
  //call api when component is mounted
  onMounted(() => {
    fetchFilmById();
  });

  //return state and functions
  return {
    film,
    error,
    fetchFilmById
  };
}