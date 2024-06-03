<!-- eslint-disable no-undef -->
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoomStore } from "@/data/room.js";

//数据源
const RoomStore = useRoomStore();
//路由
const router = useRouter();
//表单域
const updateRef = ref();
//表单内容
const updateForm = ref({});

//初始化
onMounted(async () => {
  await RoomStore.getUpdateData();
  updateForm.value = RoomStore.UpdateData;
  console.log(updateForm.value);
});
//返回按钮
const back = () => {
  router.push("/Home/RoomManage");
  reset();
};
//重置表单
const reset = () => {
  updateRef.value.resetFields();
};

//提交按钮
const submit = async () => {
  console.log(updateForm.value);
  await RoomStore.updateRoom(updateForm.value);
  back();
};
</script>

<template>
  <el-card>
    <template #header>
      <el-button type="primary" icon="Back" @click="back">返回</el-button>
    </template>
    <div class="form">
      <el-form :model="updateForm" ref="updateRef" label-width="100">
        <el-form-item label="用户编号">
          <el-input v-model="updateForm.roomId" maxlength="10" disabled type="number" />
        </el-form-item>

        <el-form-item label="科室中文名" prop="roomZhName">
          <el-input v-model="updateForm.roomZhName" maxlength="16" placeholder="输入科室的中文名" show-word-limit type="text" size="large" />
        </el-form-item>

        <el-form-item label="科室英文名" prop="roomEnName">
          <el-input v-model="updateForm.roomEnName" maxlength="16" placeholder="输入科室的英文名" show-password size="large" />
        </el-form-item>

        <el-form-item label="科室主任" prop="roomMaster">
          <el-input v-model="updateForm.roomMaster" maxlength="10" placeholder="输入科室主任名称" show-word-limit type="text" size="large" />
        </el-form-item>

        <el-form-item label="科室详情" prop="roomInfo">
          <ParadiseEditor v-model:content="updateForm.roomInfo" />
        </el-form-item>

        <el-form-item class="form-button">
          <el-button @click="reset" size="large">重置</el-button>
          <el-button type="primary" @click="submit" size="large"> 提交 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style scoped>
@import "@/assets/form.css";
</style>
