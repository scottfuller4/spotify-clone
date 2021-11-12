<template>
  <div class="featured-bar">
    <h1>Good afternoon</h1>
    <div class="featured-card-container">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="featured-card"
      >
        <img :src="playlist.images[0].url" class="featured-card-image" alt="" />
        <h3 class="featured-card-title">{{ playlist.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    accessToken() {
      return this.$store.getters.getAccessToken;
    },
    playlists() {
      return this.$store.getters.getPlaylists?.slice(0, 6);
    },
  },
};
</script>

<style scoped>
.featured-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.featured-card-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.featured-card {
  width: calc((100% / 3) - 24px);
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
  margin-right: 24px;
}

.featured-card-image {
  width: 80px;
  height: 80px;
  border-radius: 5px 0 0 5px;
}

.featured-card-title {
  font-size: 14px;
  text-align: left;
  margin-left: 16px;
}
</style>
