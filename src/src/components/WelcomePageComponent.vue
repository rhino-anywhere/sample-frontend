<template>
  <div class="welcome-page">
    <div class="image-container">
      <!-- <img :src="currentImage" class="background-image" /> -->
      <img :src="gif" class="background-image"/>

    </div>

    <div class="link-input-container">
      <input type="text" v-model="link" placeholder="Enter link here..." class="link-input" />
    </div>
    <div class="content">
      <button :disabled="!link" @click="startSomething">Start Rhino Anywhere...</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
const link = ref('ws://10.1.15.15:2337/');
const images = [
  new URL('../assets/icons/Rhinoceros_1.png', import.meta.url).href,
  new URL('../assets/icons/Rhinoceros_2.png', import.meta.url).href
];

const gif =  new URL('../assets/img/mirrored.gif', import.meta.url).href;
const currentImageIndex = ref(0);

// const currentImage = computed(() => images[currentImageIndex.value]);

// let timer = null;

// const rotateImages = () => {
//   timer = setInterval(() => {
//     currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
//   }, 200);
// };

const emit = defineEmits(['start']);

const startSomething = () => {
  emit('start', link.value);
};

// onMounted(() => {
//   rotateImages();
// });

// onBeforeUnmount(() => {
//   clearInterval(timer);
// });
</script>

<style scoped>
.welcome-page {
  text-align: center;
  padding-top: 50px;
}

.image-container {
  display: inline-block;
  width: 500px;
  margin-bottom: 20px;
}

.background-image {
  width: 100%;
  height: auto;
}

.content {
  display: flex;
  justify-content: center;
}

button {
  font-size: 20px;
  padding: 20px 40px;

  color: #007bff;
  border: 2px solid #007bff;
  cursor: pointer;
  border-radius: 40px;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #007bff;
  color: #fff;
}

button:disabled {
  background-color: darkgray;
  color: #666;
  border-color: darkgray;
  cursor: not-allowed;
}


link-input-container {
  margin: 20px 0;
}

.link-input {
  font-size: 18px;
  padding: 15px;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 20px;
  display: block;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 25px;
  background-color: transparent;
  color: #007bff;
}
</style>
