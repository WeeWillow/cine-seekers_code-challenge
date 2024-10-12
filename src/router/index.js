import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/TheHomePage.vue";
import FilmPage from "@/views/FilmPage.vue";
import FilmOverviewPage from "@/views/FilmOverviewPage.vue";

const routes = [
  {
    //url for the route
    path: '/',
    // name for the route
    name: 'Home',
    // component to load when visiting "/"
    component: HomePage
  },
  {
    //url for the route
    path: '/films',
    // name for the route
    name: 'Films',
    // component to load when visiting "/"
    component: FilmOverviewPage
  },
  {
    // dynamic route using film ID
    path: '/films/:id/:title',
    name: 'Film',
    // component to load
    component: FilmPage,
    // pass route params as props to the component
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

