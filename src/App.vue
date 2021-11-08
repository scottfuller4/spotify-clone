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
      // return null;
    },
  },
  watch: {
    $route(to) {
      // react to route changes...
      const token = to.query.access_token;
      if (token) {
        axios
          .get("https://api.spotify.com/v1/me", {
            // method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          })
          .then((response) => {
            // console.log({ response });
            this.$store.commit("mutateUser", response.data);
            console.log("Response from server: ");
            console.log(this.$store.state.user);
          });
      }
    },
  },
  // created() {
  //   console.log(this.$route);
  //   console.log(this.$route.query.token);

  //   if (this.$route.query.token) {
  //     fetch("https://api.spotify.com/v1/users/12167869788", {
  //       headers: {
  //         Authorization: this.$route.query.token,
  //       },
  //     }).then((response) => {
  //       console.log({ response });
  //       this.$store.commit("mutateUser", response.data);
  //       console.log("Response from server: ");
  //       console.log(this.$store.state.user);
  //     });
  //   }
  // },
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
