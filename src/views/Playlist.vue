<template>
  <div v-if="playlist">
    <div class="header-container">
      <img :src="playlist.images[0].url" alt="" class="header-image" />
      <div class="title-container">
        <p class="page-type">Playlist</p>
        <h1 class="playlist-title">{{ playlist.name }}</h1>
        <div class="title-info-container">
          <p class="playlist-owner">
            {{ playlist.owner.display_name }}
          </p>
          <p class="tracks">{{ playlist.tracks.items.length }} songs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      playlist: null,
      playlistId: null,
    };
  },
  name: "Playlist",
  computed: {
    accessToken() {
      return this.$store.getters.getAccessToken;
    },
  },
  watch: {
    $route(to) {
      this.playlistId = to.params.id;
    },
    playlistId(value) {
      if (this.accessToken && value) {
        axios
          .get(`https://api.spotify.com/v1/playlists/${value}`, {
            headers: {
              Authorization: "Bearer " + this.accessToken,
            },
            json: true,
          })
          .then((response) => {
            console.log({ response });
            this.playlist = response.data;
          });
      }
    },
  },
  created() {
    this.playlistId = this.$route.params.id;
  },
};
</script>

<style scoped>
p {
  text-align: left;
}

.header-container {
  display: flex;
  align-items: flex-end;
}

.header-image {
  width: 232px;
  height: 232px;
}

.title-container {
  margin-left: 24px;
}

.title-info-container {
  display: flex;
  font-size: 14px;
}

.playlist-title {
  font-size: 96px;
  margin: 0;
  line-height: 1.2;
  text-align: left;
}

.page-type {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
}

.playlist-owner {
  font-weight: bold;
}

.tracks {
  opacity: 80%;
}

.tracks::before {
  content: "•";
  margin: 0 4px;
  font-size: 12px;
}
</style>
