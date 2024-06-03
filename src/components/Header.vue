<script setup>
import { onMounted, ref } from "vue";
import screenfull from "screenfull";

//动态引入图片
const userImg = (name) => {
  return new URL(`../assets/image/${name}.jpg`, import.meta.url).href;
};
const Showtime = ref("");
onMounted(() => {
  setInterval(() => {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    Showtime.value = `${year} 年 ${month} 月 ${day} 日 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
  }, 1000);
});
const fullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  } else {
    ElMessage.error("您的浏览器不支持全屏");
  }
};
</script>
<template>
  <el-header class="home-header">
    <div class="l-content">
      <img src="@/assets/logo.png" alt="" sizes="32x32" />
      <p class="title">医疗服务平台</p>
    </div>

    <div class="r-content">
      <el-icon size="36" color="white" class="fullScreen" @click="fullScreen">
        <FullScreen />
      </el-icon>
      <el-dropdown>
        <div class="el-dropdown-link">
          <el-avatar :size="40" :src="userImg('user')" />
          <p class="username">易烊千玺</p>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #304156;
  padding-left: 0px;
}
.l-content {
  display: flex;
  justify-content: center;
}

.r-content {
}

.el-dropdown,
.el-dropdown * {
  outline: none;
}

.fullScreen {
  padding-right: 20px;
}

.title {
  font-size: 24px;
  font-weight: 500;
  color: white;
  margin: 0px;
  align-content: center;
}

.username {
  margin: 0px;
  margin-left: 10px;
  color: white;
  font-size: 18px;
  align-content: center;
  font-family: "楷体";
}

.el-dropdown-link {
  display: flex;
  justify-content: center;
  justify-self: center;
  align-self: center;
}
</style>
