<script setup>
// import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
</script>
<template>
  <el-container class="container">
    <el-header class="header">
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <Menu />
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.container {
  height: 100%;
}
.header {
  padding: 0px;
}
.aside {
  height: 100%;
}
</style>
