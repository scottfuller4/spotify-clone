<template>
  <div class="player-bar">
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
  </div>
</template>

<style scoped>
.player-bar {
  background: #181818;
  height: 80px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  border-top: 1px solid #282828;
  padding: 0 16px;
}

.player-controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
  /* padding: 10px 0; */
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
</style>
