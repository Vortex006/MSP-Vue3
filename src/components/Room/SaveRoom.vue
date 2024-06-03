<!-- eslint-disable no-undef -->
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoomStore } from "@/data/room.js";

//数据源
const RoomStore = useRoomStore();
//路由
const router = useRouter();
//表单域
const saveRef = ref();
//表单内容
const saveForm = reactive({
  roomZhName: "",
  roomEnName: "",
  roomMaster: "",
  roomInfo: "",
});


//返回按钮
const back = () => {
  router.push("/Home/RoomManage");
  reset();
};
//重置表单
const reset = () => {
  saveRef.value.resetFields();
};

//提交按钮
const submit = () => {
  saveRef.value.validate(async (valid) => {
    if (valid) {
      await RoomStore.saveRoom(saveForm);
      back();
    } else {
      ElMessage.error("表单验证失败 请确认数据格式是否正常");
      reset();
    }
  });
};

//表单校验
const rules = reactive({
  roomZhName: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*匹配中文*/ pattern: /^[\u4e00-\u9fa5]+$/,
      message: "只能输入中文名哦",
      trigger: "blur",
    },
  ],
  roomEnName: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*匹配英文*/ pattern: /^[A-Za-z\s]+$/,
      message: "只能输入英文名哦",
      trigger: "blur",
    },
  ],
  roomMaster: [{ required: true, message: "此项为必填项", trigger: "blur" }],
});
</script>

<template>
  <el-card>
    <template #header>
      <el-button type="primary" icon="Back" @click="back">返回</el-button>
    </template>
    <div class="form">
      <el-form :model="saveForm" ref="saveRef" label-width="100" :rules="rules">
        <el-form-item label="科室中文名" prop="roomZhName">
          <el-input v-model="saveForm.roomZhName" maxlength="50" placeholder="输入科室的中文名" show-word-limit type="text" size="large" />
        </el-form-item>

        <el-form-item label="科室英文名" prop="roomEnName">
          <el-input v-model="saveForm.roomEnName" maxlength="255" placeholder="输入科室的英文名" show-word-limit size="large" />
        </el-form-item>

        <el-form-item label="科室主任" prop="roomMaster">
          <el-input v-model="saveForm.roomMaster" maxlength="50" placeholder="输入科室主任名称" show-word-limit type="text" size="large" />
        </el-form-item>

        <el-form-item label="科室详情" prop="roomInfo">
          <ParadiseEditor v-model:content="saveForm.roomInfo" />
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
