<template>
  <main id="app-main">
    <div id="sidebar-box">
      <Sidebar />
    </div>
    <div id="main-content">
      <Navbar />
      <AppMain class="content" />
      <footer>2333333333</footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';
import AppMain from './components/AppMain.vue';
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

#app-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;

  #sidebar-box {
    height: 100%;
  }
  .sidebar-box-show {
    width: #{$sideBarWidth};
  }

  #main-content {
    z-index: 10;
    height: 100%;
    min-width: calc(100vw - #{$sideBarWidth});
    // background-color: brown;
    box-sizing: border-box;
    .content {
      box-sizing: border-box;
      padding: 5px 5px 33px 5px;
      height: calc(100vh - 85px);
    }
    footer {
      border-top: 1px solid #ccc;
      position: fixed;
      bottom: 0;
      width: 100%;
      // background: red;
      padding-left: 5px;
      height: 33px;
    }
  }
}
</style>
