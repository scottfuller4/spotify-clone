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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faHome,
  faSearch,
  faGripLinesVertical,
  faHeart,
  faPlus,
  faChevronLeft,
  faChevronRight,
  faCaretDown
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
