<script setup>
import { onMounted, ref } from "vue";
// import { useNoticeStore } from "@/data/notice.js";

// const NoticeStore = useNoticeStore();
const NoticeShowList = ref([]);

// onMounted(async () => {
//   await NoticeStore.getNoticeShowList();
//   NoticeShowList.value = NoticeStore.noticeShowListData;
// });
</script>
<template>
  <el-scrollbar max-height="650px">
    <el-card v-for="notice in NoticeShowList" :key="notice.noticeId">
      <template #header>
        <p class="notice-title">{{ notice.noticeTitle }}</p>
        <p class="notice-date">{{ notice.noticeCreateDate }}</p>
      </template>
      <div v-html="notice.noticeContent" />
    </el-card>
  </el-scrollbar>
</template>
<style scoped>
.notice-title {
  font-weight: 600;
  font-size: 40px;
  color: red;
  text-align: center;
  margin: 0;
}
.notice-date {
  font-size: 20px;
  color: blue;
  text-align: right;
  margin: 0;
  font-weight: 400;
}
</style>
