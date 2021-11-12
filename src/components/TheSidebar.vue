<template>
  <div class="side-bar">
    <img src="../assets/Spotify_Logo_RGB_White.png" alt="Spotify logo" />
    <div class="navItems">
      <div v-for="link in navLinks" :key="link.id" class="navItem">
        <font-awesome-icon :icon="link.icon" class="icon" />
        <p class="navTitle">
          <router-link to="/" class="link">
            {{ link.name }}
          </router-link>
        </p>
      </div>
    </div>
    <div class="navActions">
      <ul class="navItems navActionsItems">
        <li>
          <div class="navItem">
            <div class="iconContainer iconContainerWhite">
              <font-awesome-icon
                icon="plus"
                class="actionsIcon actionsIconPlus"
              />
            </div>
            <p class="navTitle">Create Playlist</p>
          </div>
        </li>
        <li>
          <div class="navItem navItemLast">
            <div class="iconContainer iconContainerSongs">
              <font-awesome-icon icon="heart" class="actionsIcon" />
            </div>
            <p class="navTitle">Liked Songs</p>
          </div>
        </li>
      </ul>
    </div>
    <ul className="playlists">
      <li v-for="playlist in playlists" :key="playlist.id" className="playlist">
        <router-link :to="{ path: `/playlist/${playlist.id}` }" class="link">
          {{ playlist.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      navLinks: [
        {
          id: 1,
          name: "Home",
          icon: "home",
        },
        {
          id: 2,
          name: "Search",
          icon: "search",
        },
        {
          id: 3,
          name: "Your Library",
          icon: "grip-lines-vertical",
        },
      ],
    };
  },
  computed: {
    accessToken() {
      return this.$store.getters.getAccessToken;
    },
    playlists() {
      return this.$store.getters.getPlaylists;
    },
  },
  created() {
    // console.log(this.accessToken, this.userId);
    if (this.accessToken && !this.playlists) {
      axios
        .get(`https://api.spotify.com/v1/me/playlists?limit=50`, {
          headers: {
            Authorization: "Bearer " + this.accessToken,
          },
          json: true,
        })
        .then((response) => {
          this.$store.commit("mutatePlaylists", response.data.items);
        });
    }
  },
};
</script>

<style scoped>
.side-bar {
  background: #000000;
  width: 224px;
  max-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px 8px 0 8px;
}

img {
  padding: 0 24px;
  margin-bottom: 18px;
  width: 52%;
}

.navItem {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 40px;
}

.icon {
  margin-right: 10px;
  width: 24px;
}

.navTitle {
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  color: #aeaeae;
}

.navActions {
  margin-top: 24px;
  border-bottom: 2px solid #282828;
}

.navItemLast {
  padding-bottom: 5px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.iconContainer {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
}

.iconContainerWhite {
  background: white;
}

.iconContainerSongs {
  background: linear-gradient(to right bottom, #5222f2, white);
}

.actionsIcon {
  width: 10px;
}

.actionsIconPlus {
  color: var(--color-black);
}

.playlists {
  overflow: scroll;
  list-style: none;
}

.playlist {
  text-align: left;
  padding: 0 16px;
  margin: 16px 0;
  font-size: 14px;
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: #aeaeae;
}
</style>
