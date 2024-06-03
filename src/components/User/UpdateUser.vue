<!-- eslint-disable no-undef -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/data/user.js";

//数据源
const UserStore = useUserStore();
//路由
const router = useRouter();
//表单域
const updateRef = ref();
//表单内容
const updateForm = ref({});
//返回内容
const Result = reactive({
  code: 0,
  message: "",
});

const sexList = ref([]);
const homeList = ref([]);

//初始化
onMounted(async () => {
  await UserStore.getSexData();
  sexList.value = UserStore.SexListData;
  await UserStore.getHomeData();
  homeList.value = UserStore.HomeListData;

  await UserStore.getUpdateData();
  updateForm.value = UserStore.UpdateData;
});
//返回按钮
const back = () => {
  router.push("/Home/UserManage");
  reset();
};
//重置表单
const reset = () => {
  updateRef.value.resetFields();
  updateForm.value.userSex = sexList.value[0].dictValue;
};
//显示反馈
const resultMessage = (ok, error) => {
  if (Result.code === ok) {
    ElMessage.success(Result.message);
  } else if (Result.code === error) {
    ElMessage.error(Result.message);
  } else {
    ElMessage.error("数据异常 请稍后重试");
  }
};
//提交按钮
const submit = async () => {
  //   saveRef.value.validate(async (valid) => {
  //     if (valid) {

  //     } else {
  //       ElMessage.error("表单验证失败 请确认数据格式是否正常");
  //       reset();
  //     }
  //   });
  await UserStore.updateUser(updateForm.value);
  Result.code = UserStore.ResultData.code;
  Result.message = UserStore.ResultData.message;
  back();
  resultMessage(30030, 30031);
};
//表单校验
// const rules = reactive({
//   userAccount: [
//     { required: true, message: "此项为必填项", trigger: "blur" },
//     {
//       /*4-16位大小写字母数字*/ pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/,
//       message: "账号格式不正确",
//       trigger: "blur",
//     },
//   ],
// });
</script>

<template>
  <el-card>
    <template #header>
      <el-button type="primary" icon="Back" @click="back">返回</el-button>
    </template>
    <div class="form">
      <el-form :model="updateForm" ref="updateRef" label-width="100">

        <el-form-item label="用户编号" prop="userId">
          <el-input v-model="updateForm.userId" maxlength="10" disabled type="number" />
        </el-form-item>

        <el-form-item label="用户账号" prop="userAccount">
          <el-input v-model="updateForm.userAccount" maxlength="16" placeholder="4-16位 大小写字母数字" show-word-limit type="text" size="large" />
        </el-form-item>

        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="updateForm.userName" maxlength="10" placeholder="输入用户姓名" show-word-limit type="text" size="large" />
        </el-form-item>

        <el-form-item label="用户性别" prop="userSex">
          <el-radio-group v-model="updateForm.userSex">
            <el-radio v-for="sex in sexList" :key="sex.dictKey" :label="sex.dictValue" size="large">{{ sex.dictKey }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用户籍贯" prop="userHome">
          <el-select v-model="updateForm.userHome" placeholder="选择用户籍贯" size="large">
            <el-option v-for="home in homeList" :key="home.dictKey" :label="home.dictKey" :value="home.dictValue" />
          </el-select>
        </el-form-item>

        <el-form-item label="用户功德" prop="userMerit">
          <el-input-number v-model="updateForm.userMerit" :min="0" :max="9999" size="large" />
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
