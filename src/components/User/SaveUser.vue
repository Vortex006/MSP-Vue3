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
const saveRef = ref();
//表单内容
const saveForm = reactive({
  userAccount: "",
  userPassword: "",
  userName: "",
  userSex: 0,
  userMerit: 0,
  userHome: 0,
  userEmail: "",
  userPhone: "",
});
const Server = reactive({
  EmailServer: "",
  PhoneServer: "",
});
//返回内容
const Result = reactive({
  code: 0,
  message: "",
});

const sexList = ref([]);
const homeList = ref([]);
const emailSerList = ref([]);
const phoneSerList = ref([]);

//初始化
onMounted(async () => {
  await UserStore.getSexData();
  sexList.value = UserStore.SexListData;
  await UserStore.getHomeData();
  homeList.value = UserStore.HomeListData;
  await UserStore.getEmailSerData();
  emailSerList.value = UserStore.EmailSerListData;
  await UserStore.getPhoneSerData();
  phoneSerList.value = UserStore.PhoneSerListData;
  saveForm.userSex = sexList.value[0].dictValue;
  saveForm.userHome = homeList.value[0].dictValue;
  Server.EmailServer = emailSerList.value[0].dictKey;
  Server.PhoneServer = phoneSerList.value[0].dictKey;
});
//返回按钮
const back = () => {
  router.push("/Home/UserManage");
  reset();
};
//重置表单
const reset = () => {
  saveRef.value.resetFields();
  saveForm.userSex = sexList.value[0].dictValue;
  Server.EmailServer = emailSerList.value[0].dictKey;
  Server.PhoneServer = phoneSerList.value[0].dictKey;
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
const submit = () => {
  saveRef.value.validate(async (valid) => {
    if (valid) {
      saveForm.userEmail = `${saveForm.userEmail}${Server.EmailServer}`;
      saveForm.userPhone = `${Server.PhoneServer}-${saveForm.userPhone}`;
      await UserStore.saveUser(saveForm);
      Result.code = UserStore.ResultData.code;
      Result.message = UserStore.ResultData.message;
      back(); 
      resultMessage(30000, 30001);
    } else {
      ElMessage.error("表单验证失败 请确认数据格式是否正常");
      reset();
    }
  });
};
//表单校验
const rules = reactive({
  userAccount: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*4-16位大小写字母数字*/ pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/,
      message: "账号格式不正确",
      trigger: "blur",
    },
  ],
  userPassword: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*8-16位大小写字母数字*/ pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
      message: "密码格式不正确",
      trigger: "blur",
    },
  ],
  userEmail: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*5-18位大小写字母数字*/ pattern: /^[a-zA-Z0-9]{5,18}$/,
      message: "邮箱格式不正确",
      trigger: "blur",
    },
  ],
  userPhone: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*9位数字*/ pattern: /^\d{9}$/,
      message: "手机号格式不正确",
      trigger: "blur",
    },
  ],
});
</script>

<template>
  <el-card>
    <template #header>
      <el-button type="primary" icon="Back" @click="back">返回</el-button>
    </template>
    <div class="form">
      <el-form :model="saveForm" ref="saveRef" label-width="100" :rules="rules">
        <el-form-item label="用户账号" prop="userAccount">
          <el-input v-model="saveForm.userAccount" maxlength="16" placeholder="4-16位 大小写字母数字" show-word-limit type="text" size="large" />
        </el-form-item>

        <el-form-item label="用户密码" prop="userPassword">
          <el-input v-model="saveForm.userPassword" maxlength="16" placeholder="8-16位 大小写字母数字" show-password size="large" />
        </el-form-item>

        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="saveForm.userName" maxlength="10" placeholder="输入用户姓名" show-word-limit type="text" size="large" />
        </el-form-item>

        <el-form-item label="用户性别" prop="userSex">
          <el-radio-group v-model="saveForm.userSex">
            <el-radio v-for="sex in sexList" :key="sex.dictKey" :label="sex.dictValue" size="large">{{ sex.dictKey }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用户籍贯" prop="userHome">
          <el-select v-model="saveForm.userHome" placeholder="选择用户籍贯" size="large">
            <el-option v-for="home in homeList" :key="home.dictKey" :label="home.dictKey" :value="home.dictValue" />
          </el-select>
        </el-form-item>

        <el-form-item label="用户功德" prop="userMerit">
          <el-input-number v-model="saveForm.userMerit" :min="0" :max="9999" size="large" />
        </el-form-item>

        <el-form-item label="用户邮箱" prop="userEmail">
          <el-input v-model="saveForm.userEmail" maxlength="18" placeholder="5-18位 字母数字" show-word-limit type="text" size="large">
            <template #append>
              <el-select v-model="Server.EmailServer" size="large" placeholder="选择服务器" class="form-select">
                <el-option v-for="eamilSer in emailSerList" :key="eamilSer.dictKey" :label="eamilSer.dictKey" :value="eamilSer.dictKey" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="saveForm.userPhone" maxlength="9" placeholder="输入9位手机号码" show-word-limit type="text" size="large">
            <template #prepend>
              <el-select v-model="Server.PhoneServer" size="large" placeholder="选择服务器" class="form-select">
                <el-option v-for="phoneSer in phoneSerList" :key="phoneSer.dictKey" :label="phoneSer.dictKey" :value="phoneSer.dictKey" />
              </el-select>
            </template>
          </el-input>
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
