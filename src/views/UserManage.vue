<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "@/data/user";

const UserStore = useUserStore();
const userCol = ref([
  { prop: "userId", label: "用户ID", width: "80", align: "center", overflow: false },
  { prop: "userAccount", label: "用户账号", width: "150", align: "center", overflow: true },
  { prop: "userName", label: "用户姓名", width: "", align: "center", overflow: false },
  { prop: "userSex", label: "用户性别", width: "80", align: "center", overflow: false },
  { prop: "userHome", label: "用户籍贯", width: "", align: "center", overflow: false },
  { prop: "userCreateDate", label: "用户创建时间", width: "130", align: "center", overflow: false },
  { prop: "userUpdateDate", label: "最后登录时间", width: "130", align: "center", overflow: false },
  { prop: "userMerit", label: "用户功德", width: "", align: "center", overflow: false },
  { prop: "userEmail", label: "邮箱", width: "", align: "center", overflow: true },
  { prop: "userPhone", label: "手机号", width: "", align: "center", overflow: true },
]);

const UserPath = reactive({
  savePath: "/Home/SaveUser",
  updatePath: "/Home/UpdateUser",
});
</script>
<template>
  <ParadiseTable :store="UserStore" :columnData="userCol" :path="UserPath" />
</template>
