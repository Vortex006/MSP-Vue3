<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/data/login.js";

const LoginStore = useLoginStore();

onMounted(async () => {
  await getCodeImg();
});
const getCodeImg = async () => {
  await LoginStore.getCodeImg();
  codeUrl.value = LoginStore.codeImgData;
};
const codeUrl = ref("");
const loginForm = reactive({
  userName: "",
  password: "",
  checkCode: "",
  phone: "",
  name: "",
  certNo: "",
});
const router = useRouter();
//阅读协议
const read = ref(false);
const loginRef = ref();
const loginRules = reactive({
  userName: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*4-16位大小写字母数字*/ pattern:
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/,
      message: "账号格式不正确",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*8-16位大小写字母数字*/ pattern:
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
      message: "密码格式不正确",
      trigger: "blur",
    },
  ],
  code: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*4位数字*/ pattern: /^\d{4}$/,
      message: "验证码格式不对",
      trigger: "blur",
    },
  ],
  phone: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*手机号*/ pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请输入真实有效的手机号",
      trigger: "blur",
    },
  ],
  name: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*汉字*/ pattern: /^[\u4e00-\u9fa5]{0,}$/,
      message: "请输入您的真实姓名",
      trigger: "blur",
    },
  ],
  certNo: [
    { required: true, message: "此项为必填项", trigger: "blur" },
    {
      /*4位数字*/ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message: "请输入正确的身份证号码",
      trigger: "blur",
    },
  ],
});
const handleLogin = () => {
  loginRef.value.validate((valid) => {
    if (valid) {
      if (read.value) ElMessage.success("登录成功");
      else ElMessage.error("请查看并勾选用户协议");
    } else ElMessage.error("表单验证失败 请确认数据格式是否正常");
  });
};
const IsEnabledCode = ref(true);
const toLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="login">
    <el-form
      ref="loginRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">医疗服务平台</h3>
      <el-form-item prop="userName">
        <el-input
          v-model="loginForm.userName"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="name">
        <el-input
          v-model="loginForm.name"
          type="text"
          auto-complete="off"
          placeholder="请输入您的真实姓名"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="certNo">
        <el-input
          v-model="loginForm.certNo"
          type="text"
          auto-complete="off"
          placeholder="请输入您的身份证号"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="loginForm.phone"
          type="text"
          auto-complete="off"
          placeholder="请输入绑定手机号"
          max="11"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="IsEnabledCode">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
        <div class="login-code">
          <img
            :src="codeUrl"
            alt="加载失败"
            @click="getCodeImg"
            class="login-code-img"
          />
        </div>
      </el-form-item>
      <el-checkbox v-model="read" style="margin: 0px 0px 25px 0px">
        我已阅读并同意《医疗服务平台用户协议与隐私政策》
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          size="medium"
          type="primary"
          style="width: 100%"
          @click="handleLogin"
        >
          注册
        </el-button>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button plain size="medium" style="width: 100%" @click="toLogin">
          去登录
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2024 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<style scoped>
@import url("@/assets/form.css");
</style>
