<template>
  <div class="recommended">
    <div class="recommended-container">
      <div class="recommended-title">
        <h2>Top Artists</h2>
        <p class="see-all-button">SEE ALL</p>
      </div>
      <div class="recommended-card-container">
        <div
          v-for="artist in topArtists"
          :key="artist.id"
          class="recommended-card"
        >
          <img
            :src="artist.images[0].url"
            alt=""
            class="recommended-card-img"
          />
          <h4 class="recommended-card-title">{{ artist.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    accessToken() {
      return this.$store.getters.getAccessToken;
    },
    topArtists() {
      return this.$store.getters.getTopArtists?.items.slice(0, 5);
    },
  },
  created() {
    if (this.accessToken) {
      axios
        .get(`https://api.spotify.com/v1/me/top/artists`, {
          headers: {
            Authorization: "Bearer " + this.accessToken,
          },
          json: true,
        })
        .then((response) => {
          this.$store.commit("mutateTopArtists", response.data);
        });
    }
  },
};
</script>

<style scoped>
.recommended {
  display: flex;
  flex-direction: column;
}

.recommended-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.recommended-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.see-all-button {
  font-weight: bold;
  margin-right: 24px;
  font-size: 12px;
}

.recommended-card-container {
  display: flex;
  width: 100%;
  flex-wrap: no-wrap;
}

.recommended-card {
  width: calc(100% / 5);
  margin-right: 24px;
  background: #181818;
  padding: 16px;
  border-radius: 3px;
}

.recommended-card-img {
  max-width: 100%;
  border-radius: 10px;
}

.recommended-card-title {
  font-size: 14px;
  text-align: left;
  margin: 10px 0 0 0;
}
</style>
