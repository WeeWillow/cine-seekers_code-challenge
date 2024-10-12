import { ref, onMounted } from 'vue';

export function useGenres() {
  // state
  const genres = ref([]); //reactive variable to store genres data
  const filmsFromGenres = ref([]); //reactive variable to store films from specific genres
  const specificGenres = ['Action', 'Comedy', 'Thriller', 'War', 'Romance', 'Drama', 'Crime', 'Documentary', 'Horror']; //array of specific genres
  const genresWithFilmCount = ref([]); //reactive variable to store genres with corresponding film counts



  // functions
  // fetch all genres
  const fetchAllGenres = () => {
    const bearerToken = import.meta.env.VITE_BEARER_TOKEN; //access local file with bearer token

    return fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, {
      headers: { 'Authorization': `Bearer ${bearerToken}`, /*include bearer in header*/ }
    })
      .then(response => response.json()) //parse js response into json
      .then(data => {
        genres.value = data.genres; //update genre array from api data 
        //removed console.log for code cleanup
      })
      //should technically be error or err, but whoops is more fun and whimsical
      .catch(whoops => {
        console.error('Error fetching genres: ', whoops);
      });
  };


  // fetch number of film for each genre
  const fetchFilmByGenre = (genreID) => {
    const bearerToken = import.meta.env.VITE_BEARER_TOKEN; //access local file with bearer token

    return fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreID}&language=en`, {
      headers: { 'Authorization': `Bearer ${bearerToken}`, /*include bearer in header*/ }
    })
      .then(response => response.json()) //parse js response into json
      .then(data => {
        const trendingFilms = data.results;
        const totalResults = data.total_results; //assign total_results value from data to totalResults
        return {trendingFilms, totalResults}; //return number of films in genre and trending films from genres
      })
      //should technically be error or err (usually anyway), but whoops is more fun and whimsical
      .catch(whoops => {
        console.error('Error fetching amount of films for genres: ', whoops);
        return 0; //return 0 if error occurs
      });
  };

  //lifecycle hooks
  // fetch genre and film counts
  onMounted(async () => {
    await fetchAllGenres(); //wait for genres to fetch

    const genrePromises = genres.value
      .filter(genre => specificGenres.includes(genre.name)) //filter to only include specific genres
      .map(async (genre) => {
        const {trendingFilms, totalResults} = await fetchFilmByGenre(genre.id); //fetch nr of films for each genre
        filmsFromGenres.value.push({genre: genre.name, films: trendingFilms}); //store films for each genre
        return { ...genre, filmCount: totalResults, films: trendingFilms }; //return genre with film count and trending films
      });

    genresWithFilmCount.value = await Promise.all(genrePromises); //wait for all promises to resolve
    //removed console.log for code cleanup
  });

  //process each genre object
  filmsFromGenres.value.forEach(genre => {
    //removed console.log for code cleanup
    // previously logged array of trending films
  });

  //return state and functions
  return {
    genres,
    genresWithFilmCount,
    filmsFromGenres,
    fetchFilmByGenre,
    fetchAllGenres
  };
}