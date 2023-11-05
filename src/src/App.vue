<script setup>
import { ref } from 'vue';
import SearchComponent from './components/SearchComponent.vue'
import VideoComponent from './components/VideoComponent.vue';
import EditToolsComponent from './components/EditToolsComponent.vue';
import WelcomePageComponent from './components/WelcomePageComponent.vue';

let showWelcomePage = ref(true);

function start(link) {
  showWelcomePage.value = false;
  window.anywhere.connect(link);
}

const gif =  new URL('../assets/icons/Rhinoceros_1.png', import.meta.url).href;

</script>

<template>
  <WelcomePageComponent v-show="showWelcomePage" @start="start" />
  <div class="container" v-show="!showWelcomePage">
    <div class="search-area">
      <SearchComponent />
    </div>

    <div class="content-area">
      <div class="sidebar">
        <img src="../src/assets/icons/Rhino_Logo_White.gif" class="logo" />
        <div class="edit-tools">
        <EditToolsComponent />
      </div>
      </div>      
      <div class="video-component">
        <VideoComponent />
      </div>
    </div>
  </div>
</template>

<style scoped>

#rhinoViewport {
  width: 100%;
  height: 100%;
}

.sidebar {
  width: 50px;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
}

.logo {
  width: 100%;
  max-width: 50px;
}

.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
}

.search-area {
  /* align-self: flex-start; */
  align-items: left;
   /* display: none; */
  position: absolute;
  top: 40px;
  left: 100px;
  /* background-color: red; */
  z-index: 1;

}

.content-area {
  display: flex;
  margin-top: 0px;
  height: 100%;
}

.edit-tools {
  width: 20%;
  width: 50px;
  border: 1px solid #ccc;
  border-radius: 30px;
  flex: 1;
  margin-top: 15px;
}

.video-component {
  flex-grow: 1;
  margin-left: 20px;
  border: 1px solid #ccc;
  text-align: right;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  /* max-height: calc(100vh - 50px); */
  height: 100%;
}

@media (max-width: 600px) {
  .content-area {
    flex-direction: column;
  }
}

</style>