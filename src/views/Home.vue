<template>
  <div>
    <TheFeatured />
    <TheRecommended />
  </div>
</template>

<script>
import TheFeatured from "../components/TheFeatured.vue";
import TheRecommended from "../components/TheRecommended.vue";

export default {
  name: "App",
  components: {
    TheFeatured,
    TheRecommended,
  },
};
</script>
