<template>
  <div class="header-bar">
    <div class="buttonContainer">
      <button class="buttonLeft">
        <font-awesome-icon icon="chevron-left" class="icon" />
      </button>
      <button>
        <font-awesome-icon icon="chevron-right" class="icon" />
      </button>
    </div>
    <div class="navDropdown">
      <!-- <div class="userPhoto"></div> -->
      <img :src="user.images[0].url" alt="" class="userPhoto" />
      <p class="userName">{{ user.display_name }}</p>
      <font-awesome-icon icon="caret-down" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
};
</script>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 60px;
  padding: 10px 30px;
  position: sticky;
}

.buttonContainer {
  display: flex;
}

button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.7);
}

.icon {
  color: var(--color-white);
  opacity: 50%;
}

.buttonLeft {
  margin-right: 16px;
}

.navDropdown {
  border-radius: 50px;
  border: none;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  padding: 3px;
  padding-right: 8px;
}

.userPhoto {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.userName {
  font-size: 14px;
  font-weight: bold;
  margin: 0 8px;
}
</style>
