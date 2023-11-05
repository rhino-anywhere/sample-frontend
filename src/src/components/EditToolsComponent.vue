<script setup>
import { ref } from 'vue';
import Add from './svgs/Icon.vue'

import Draw_01 from './svgs/Draw_01.vue'
import Draw_02 from './svgs/Draw_02.vue'
import Draw_03 from './svgs/Draw_03.vue'
import Draw_04 from './svgs/Draw_04.vue'
import Draw_05 from './svgs/Draw_05.vue'
import Draw_06 from './svgs/Draw_06.vue'
import Draw_07 from './svgs/Draw_07.vue'
import Draw_08 from './svgs/Draw_08.vue'
import Draw_09 from './svgs/Draw_09.vue'
import Draw_10 from './svgs/Draw_10.vue'
import Draw_11 from './svgs/Draw_11.vue'
import Draw_12 from './svgs/Draw_12.vue'
import Draw_13 from './svgs/Draw_13.vue'
import Draw_14 from './svgs/Draw_14.vue'
import Draw_15 from './svgs/Draw_15.vue'

const iconStates = ref([false, false, false, false, false]);

const toggleIcon = (index) => {
  iconStates.value[index] = !iconStates.value[index];
};

function sendCommand(command){
  window.anywhere.sendCommand(command);
  console.log(command)
}

const hover = ref(false);
const clicked = ref(false);

const handleClick = () => {
  clicked.value = true;

  setTimeout(() => {
    clicked.value = false;
  }, 1000);
};
</script>

<template>
  <div class="icon-stack">

    
    <button class="transparent-button" @click="sendCommand('Point')">
      <Draw_01 class="svg-size" ></Draw_01>
    </button>

    <button class="transparent-button" @click="sendCommand('Polyline')">
      <Draw_02 class="svg-size"></Draw_02>
    </button> 

    <button class="transparent-button" @click="sendCommand('Fillet')">
      <Draw_03 class="svg-size"></Draw_03>
    </button>

    <button class="transparent-button" @click="sendCommand('InterpCrv')">
      <Draw_04 class="svg-size"></Draw_04>
    </button>

    <button class="transparent-button" @click="sendCommand('Rectangle')">
      <Draw_05 class="svg-size"></Draw_05>
    </button>

     <button class="transparent-button" @click="sendCommand('Polygon')">
      <Draw_06 class="svg-size"></Draw_06>
    </button>

    <button class="transparent-button" @click="sendCommand('Arc')">
      <Draw_07 class="svg-size"></Draw_07>
    </button>

    <button class="transparent-button" @click="sendCommand('Box')">
      <Draw_08 class="svg-size"></Draw_08>
    </button>

    <button class="transparent-button" @click="sendCommand('Make2D')">
      <Draw_09 class="svg-size"></Draw_09>
    </button>

    <button class="transparent-button" @click="sendCommand('Split')">
      <Draw_10 class="svg-size"></Draw_10>
    </button>

    <button class="transparent-button" @click="sendCommand('Trim')">
      <Draw_11 class="svg-size"></Draw_11>
    </button>

    <button class="transparent-button" @click="sendCommand('Join')">
      <Draw_12 class="svg-size"></Draw_12>
    </button>

    <button class="transparent-button" @click="sendCommand('Explode')">
      <Draw_13 class="svg-size"></Draw_13>
    </button>

        <button class="transparent-button" @click="sendCommand('BooleanUnion')">
      <Draw_14 class="svg-size"></Draw_14>
    </button>

        <button class="transparent-button" @click="sendCommand('BooleanDifference')">
      <Draw_15 class="svg-size"></Draw_15>
    </button>


  </div>
</template>

<style>
.icon-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  width:50px;
  padding-top:5px;
  padding-bottom: 15px;
  /* padding: 0 10px 0 10px; */
  height:fit-content;
  height: 100%;
  justify-content: space-evenly;
}

.transparent-button {
  background-color: transparent;
  border: none;
  padding: 3px;
  margin-top:5px;
  cursor: pointer;
  border-radius: 19px;
  border-style: solid;
  border-color:transparent;
}

.transparent-button:hover {
  padding: 3px;
  cursor: pointer;
  border-radius: 19px;
  border-color:yellow;
  border-style: solid;
}


.transparent-button:active  {
  padding: 3px;
  cursor: pointer;
  border-radius: 18px;
  border-color:green;
  border-style: solid;
}


.transparent-button svg {
  display: block; 
}

.icon-container {
  margin: 2px;
  cursor: pointer;
}

.icon {
    width:30px;
    height:30px;
}
.svg-size {
  width: 30px;
  height: 30px;
}
</style>