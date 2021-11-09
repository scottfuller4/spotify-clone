<template>
  <div>
    <template v-if="this.user">
      <div class="layout">
        <TheSidebar />
        <main>
          <TheHeader :user="this.user" />
        </main>
      </div>
      <ThePlayerBar />
    </template>
    <template v-else>
      <h1>Log in to Spotify using Authorization Code flow</h1>
      <a href="http://localhost:8888/login" class="btn btn-primary"
        >Log in with Spotify</a
      ><br />
    </template>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import ThePlayerBar from "./components/ThePlayerBar.vue";
import TheSidebar from "./components/TheSidebar.vue";

import axios from "axios";
export default {
  name: "App",
  components: {
    TheHeader,
    ThePlayerBar,
    TheSidebar,
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    accessToken() {
      return this.$store.getters.getAccessToken;
    },
  },
  watch: {
    $route(to) {
      // react to route changes...
      const token = to.query.access_token;
      if (token && !this.accessToken) {
        this.$store.commit("mutateAccessToken", token);
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          })
          .then((response) => {
            this.$store.commit("mutateUser", response.data);
          });
      }
    },
  },
};
</script>

<style>
@import "./assets/variables.css";
#app {
  background: linear-gradient(#4f202d, #121212);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-white);
  height: 100vh;
  max-height: 100vh;
}

body {
  margin: 0;
}

.layout {
  display: flex;
  justify-content: space-between;
}

main {
  width: calc(100% - 240px);
}

p {
  margin: 0;
}
</style>
