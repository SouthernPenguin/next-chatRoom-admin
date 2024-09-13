<template>
  <el-icon style="cursor: pointer" @click="toFull" v-show="!isFull"><FullScreen /></el-icon>
  <el-icon style="cursor: pointer" @click="toFull" v-show="isFull"><Aim /></el-icon>
</template>

<script setup lang="ts">
import screenfull from 'screenfull';
import { ref } from 'vue';

let isFull = ref<boolean>(false);

const toFull = () => {
  if (!isFull.value) {
    screenfull.request();
  } else {
    screenfull.exit();
  }
  isFull.value = !isFull.value;
};
</script>

<style scoped></style>
