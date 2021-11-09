<template>
  <div class="player-bar">
    <div class="player-bar-top">
      <div class="current-song">
        <div v-if="currentSong">
          <img
            :src="currentSong?.item.album.images[0].url"
            class="current-song-image"
            alt=""
          />
        </div>
        <div class="song-info">
          <p class="song-name">{{ currentSong?.item.name }}</p>
          <p class="song-artists">{{ artists }}</p>
        </div>
      </div>
      <div class="player-controls">
        <div class="player-controls-buttons">
          <font-awesome-icon icon="random" class="icon" />
          <font-awesome-icon icon="backward" class="icon" />
          <div class="icon-center-container">
            <font-awesome-icon icon="play" class="icon icon-center" />
          </div>
          <font-awesome-icon icon="forward" class="icon" />
          <font-awesome-icon icon="redo" class="icon" />
        </div>
        <div class="player-controls-progress"></div>
      </div>
      <div>volume controls here</div>
    </div>
    <div
      class="currently-playing-bar"
      v-if="currentSong && currentSong.is_playing"
    >
      <div class="currently-playing-bar-container">
        <font-awesome-icon icon="volume-up" class="icon" />
        <p>Listening on {{ currentSong?.device.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentSong: null,
      artists: null,
    };
  },
  computed: {
    accessToken() {
      return this.$store.getters.getAccessToken;
    },
    currentlyPlaying() {
      return this.$store.getters.getCurrentlyPlaying;
    },
  },
  watch: {
    currentlyPlaying(value) {
      // console.log({ value });
      if (value && value !== "") {
        this.currentSong = value;

        this.artists = value.item.album.artists
          .map((artist) => artist.name)
          .join(", ");
      }
    },
  },
  created() {
    // console.log(this.accessToken);
    // console.log(this.currentlyPlaying);
    console.log(this.currentSong);
    if (this.accessToken) {
      axios
        .get(`https://api.spotify.com/v1/me/player`, {
          headers: {
            Authorization: "Bearer " + this.accessToken,
          },
          json: true,
        })
        .then((response) => {
          // console.log("playing", response);
          this.$store.commit("mutateCurrentlyPlaying", response.data);
        });
    }
  },
};
</script>

<style scoped>
.player-bar {
  background: #181818;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  border-top: 1px solid #282828;
}

.player-bar-top {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.current-song {
  display: flex;
  align-items: center;
  margin: 0 8px;
}

.current-song-image {
  height: 56px;
  width: 56px;
}

.song-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
}

.song-name {
  font-size: 14px;
}

.song-artists {
  font-size: 12px;
}

.player-controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
}

.player-controls-buttons {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.icon {
  margin: 0 12px;
  font-size: 12px;
}

.icon-center-container {
  font-size: 14px;
  color: var(--color-black);
  background: var(--color-white);
  /* padding: 12px; */
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}

.icon-center {
  font-size: 14px;
  padding-left: 2px;

  /* margin-right: 1px; */
}

.player-controls-progress {
  height: 4px;
  width: 400px;
  background: #535353;
  border-radius: 50px;
  margin-top: 12px;
}

.currently-playing-bar {
  background: var(--color-green);
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
}

.currently-playing-bar-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: var(--color-black);
  font-size: 12px;
  font-weight: bold;
  padding: 3px 0;
  padding-right: 70px;
}
</style>
