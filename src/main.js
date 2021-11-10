import { createApp } from "vue";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Playlist from "./views/Playlist.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faSearch,
  faGripLinesVertical,
  faHeart,
  faPlus,
  faChevronLeft,
  faChevronRight,
  faCaretDown,
  faPlay,
  faPause,
  faForward,
  faBackward,
  faRandom,
  faRedo,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

library.add(
  faHome,
  faSearch,
  faGripLinesVertical,
  faHeart,
  faPlus,
  faChevronLeft,
  faChevronRight,
  faCaretDown,
  faPlay,
  faPause,
  faForward,
  faBackward,
  faRandom,
  faRedo,
  faVolumeUp
);

const routes = [
  { path: "/", component: Home },
  { path: "/playlist/:id", component: Playlist },
  // { path: "/home", component: App },
  // { path: "/callback", component: App },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(), // <-- this is a new property and it is mandatory!
  routes, // short for `routes: routes`
});

const store = createStore({
  state() {
    return {
      user: null,
      access_token: null,
      playlists: null,
      currentlyPlaying: null,
      topArtists: null,
    };
  },
  mutations: {
    mutateUser(state, payload) {
      state.user = payload;
    },
    mutateAccessToken(state, payload) {
      state.access_token = payload;
    },
    mutatePlaylists(state, payload) {
      state.playlists = payload;
    },
    mutateCurrentlyPlaying(state, payload) {
      state.currentlyPlaying = payload;
    },
    mutateTopArtists(state, payload) {
      state.topArtists = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getAccessToken(state) {
      return state.access_token;
    },
    getPlaylists(state) {
      return state.playlists;
    },
    getCurrentlyPlaying(state) {
      return state.currentlyPlaying;
    },
    getTopArtists(state) {
      return state.topArtists;
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
