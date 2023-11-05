<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

import { RhinoCommands } from '../assets/data/rhinoCommands.js'
let search = ref("")
let searchHistory = ref([])
let animateIcon = ref(false);

const images = [
  new URL('../assets/icons/rhino.gif', import.meta.url).href,
  new URL('../assets/icons/Rhinoceros_2_Mirrored.png', import.meta.url).href
];
let commands = ref(RhinoCommands);

const filteredSuggestions = computed(() => {
  if (!search.value) {
    return [];
  }
  return commands.value.filter((cmd) =>
    cmd.toLowerCase().startsWith(search.value.toLowerCase())
  );
});

const addSearchTerm = () => {
  console.log(search.value)
  if (search.value) {
    searchHistory.value.push(search.value)

    try {
      window.anywhere.sendCommand(search.value);
    } catch (e) {
      console.log(e);
    }
    search.value = ""
  }
}

window.anywhere.onMessageReceived = (data) => {
  searchHistory.value.push(data);
}

const handleTab = (event) => {
  if (event.key === "Tab" && filteredSuggestions.value.length > 0) {
    event.preventDefault();
    search.value = filteredSuggestions.value[0];
    console.log(filteredSuggestions.value[0])
    //addSearchTerm(); 
  }
};

const handleEnter = (event) => {
  if (event.key === "Enter" && filteredSuggestions.value.length > 0) {
    event.preventDefault();
    //search.value = filteredSuggestions.value[0];
    console.log(filteredSuggestions.value[0]);
    addSearchTerm();

    animateIcon.value = true;


    setTimeout(() => {
      animateIcon.value = false;
    }, 2000);
  }
};

function updateFromSuggestion(suggestion) {
  search.value = suggestion;
}

onMounted(() => {
  window.addEventListener("keydown", handleTab);
  window.addEventListener("keydown", handleEnter);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleTab);
  window.removeEventListener("keydown", handleEnter);
});
</script>

<template>
  <div class="search-container">
    <div class="search-history">
      <ul>
        <li v-for="(entry, index) in searchHistory" :key="index">
          {{ entry }}
        </li>
      </ul>
    </div>

    <input type="text" placeholder="Type your Rhino command here..." v-model="search" @keyup.enter="addSearchTerm" />


    <ul v-if="filteredSuggestions.length" class="suggestions">
      <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @click="updateFromSuggestion(suggestion)">
        {{ suggestion }}
      </li>
    </ul>

  </div>

  <div class="fly-icon" :class="{ 'animate-fly': animateIcon }">
    <img src='../assets/icons/Rhinoceros_1_Mirrored.png' alt="Flying Icon" />
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  width: 100%;
  /* height: 150px; */
  flex-direction: column;
  align-items: left;
  margin-top: 0px;
  position: relative;
  /* margin-bottom: 50px; */
}

.search-history {
  margin-bottom: 10px;
  height: 120px;
  width: 600px;
  overflow-y: auto;
  display: none;
  flex-direction: column-reverse;
  border: 1px solid #ccc;
  background-color: black;
  backdrop-filter: blur(2px);
  opacity: 0.5;
  text-align: left;
  border-radius: 20px;
}

input[type="text"] {
  padding: 10px 15px;
  font-size: 16px;
  width: 570px;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
}

ul.no-bullets {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul {
  list-style-type: none;
  padding-left: 10px;
  margin-left: 0;
  line-height: 1;
  color: grey;
}

.suggestions {
  margin-top: 10px;
  border-radius: 20px;
  list-style-type: none;
  padding: 0;
  width: 600px;
  position: absolute;
  left: 0;
  top: 100%;
  background-color: #f8f8f8;
  z-index: 10;
  max-height: 100px;
  overflow-y: auto;
  font-size: 0.8rem;
  overflow: hidden;
}

.suggestions li {
  padding: 5px 10px;
  cursor: pointer;
  white-space: nowrap;
}

.suggestions li:hover {
  background-color: #ececec;
}

@keyframes flyAcross {
  0% {
    transform: translateX(0);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 0.1;
  }

  100% {
    transform: translateX(20vw);
    opacity: 0;
  }
}


.animate-fly {
  animation: flyAcross 1s linear forwards;
}

.fly-icon {
  position: fixed;
  top: 4.5%;
  left: 600px;
  z-index: 1000;
  opacity: 0;
}

.fly-icon img {
  height: 50px;
  width: auto;
}
</style>
