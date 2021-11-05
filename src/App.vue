<template>
  <div class="layout">
    <TheSidebar />
    <main>
      <TheHeader />
    </main>
  </div>
  <ThePlayerBar />
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import ThePlayerBar from "./components/ThePlayerBar.vue";
import TheSidebar from "./components/TheSidebar.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    ThePlayerBar,
    TheSidebar,
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
