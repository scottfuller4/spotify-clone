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
    <div class="icon-container">
      <font-awesome-icon icon="play" class="play-icon" />
    </div>
    <div v-if="playlist.tracks.items.length > 0">
      <table>
        <th>
          <td>#</td>
          <td>Title</td>
          <td>Album</td>
          <td>Date added</td>
          <td>length</td>
        </th>
        <tr v-for="song, i in playlist.tracks.items" :key="song.track.id">
          <td>{{i + 1}}</td>
          <td class="song-title">
            <img :src="song.track.album.images[0].url" alt="" class="song-cover">
            <div class="song-title-info">
              <p class="song-title-name">{{song.track?.name}}</p>
              <p class="song-title-artists">{{song.track.artists.map((artist) => artist.name).join(", ")}}</p>
            </div>
            
          </td>
          <td>{{song.track.album?.name}}</td>
          <td>{{song.added_at}}</td>
          <td>{{transformTime(song.track.duration_ms)}}</td>
        </tr>
      </table>
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
            this.playlist = response.data;
          });
      }
    },
  },
  created() {
    this.playlistId = this.$route.params.id;
  },
  methods: {
    transformTime(s) {
      function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      }
      const ms = s % 1000;
      s = (s - ms) / 1000;
      const secs = s % 60;
      s = (s - secs) / 60;
      const mins = s % 60;

      return mins + ':' + pad(secs);
    },
  }
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

table {
  width: 100%;
  margin: 30px 0 200px 0;
}

th, tr {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

th {
  text-transform: uppercase;
  font-size: 12px;
  border-bottom: 1px solid rgba(255,255,255,.1);
  padding-bottom: 10px;
}

tr {
  font-size: 14px;
  margin: 10px 0;
  color: #AEAEAE;
}

td {
  width: 20%;
  text-align: left;
  margin: 0 10px;
}

td:first-child {
  width: 2%;
}

td:nth-child(2) {
  width: 50%;
}

td:nth-child(3) {
  width: 30%;
}

td:last-child {
  text-align: right
}

.song-title {
  display: flex;
}

.song-title-name {
  font-size: 14px;
  color: white;
}

.song-title-artists {
  font-size: 12px;
  
}

.song-cover {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}

.icon-container {
  display: flex;
  justify-content: flex-start;
}

.play-icon {
  background: var(--color-green);
  padding: 20px 20px 20px 22px;
  border-radius: 50%;
  margin-top: 30px;
}
</style>
