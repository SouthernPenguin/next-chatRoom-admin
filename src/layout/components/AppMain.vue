<template>
  <el-scrollbar>
    <div class="box1">1</div>
    <div class="box2">
      2

      <div class="box3">3</div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
// const calcHeight = () => {
//   return
// };
</script>

<style scoped lang="scss">
.box1 {
  height: 500px;
  // background-color: #991313;
}

.box2 {
  height: 500px;
  // background-color: #2bff00;
  position: relative;
  .box3 {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
