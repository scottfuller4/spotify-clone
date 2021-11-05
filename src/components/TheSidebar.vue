<template>
  <div class="side-bar">
    <img src="../assets/Spotify_Logo_RGB_White.png" alt="Spotify logo" />
    <div class="navItems">
      <!-- TODO: this should be an <a> tag when I figure out routing -->
      <div v-for="link in navLinks" :key="link.id" class="navItem">
        <!-- TODO: add icons -->
        <!-- <img src="" alt=""> -->
        <font-awesome-icon :icon="link.icon" class="icon" />
        <p class="navTitle">{{ link.name }}</p>
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
  </div>
</template>

<script>
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
};
</script>

<style scoped>
.side-bar {
  background: #000000;
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 24px;
}

img {
  padding: 0 24px;
  margin-bottom: 18px;
  width: 52%;
}

.navItems {
  padding: 0 8px;
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
}

.navActions {
  margin-top: 24px;
}

.navItemLast {
  border-bottom: 2px solid #282828;
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
</style>
