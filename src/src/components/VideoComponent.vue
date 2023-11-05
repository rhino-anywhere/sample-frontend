<script setup>
import { onMounted } from 'vue';

function initialize() {
    var viewport = document.getElementById("rhinoViewport")
    window.anywhere.bind(viewport);

  window.onresize = _ =>  window.anywhere.sendResize(viewport.clientWidth, viewport.clientHeight);
  window.onwheel = e => window.anywhere.sendScroll(e.deltaY);
}

onMounted(() => initialize());
</script>

<template>
    <video id="rhinoViewport" autoplay="autoplay" playsinline></video>
</template>

<style>

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}</style>
