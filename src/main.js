import { createApp } from "vue";
import App from "./App.vue";
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
  faRedo
);

const routes = [
  { path: "/", component: App },
  { path: "/home", component: App },
  { path: "/callback", component: App },
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
      refresh_token: null,
    };
  },
  mutations: {
    mutateUser(state, payload) {
      state.user = payload;
    },
    mutateAccessToken(state, payload) {
      state.access_token = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getAccessToken(state) {
      return state.access_token;
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
