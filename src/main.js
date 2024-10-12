// styling import
import './assets/main.css'

// app imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// imports for fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faVideoCamera, faBookmark } from '@fortawesome/free-solid-svg-icons';

// add to library
library.add(faSearch, faVideoCamera, faBookmark);

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
