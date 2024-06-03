<script setup>
import router from "@/router";
import { reactive, ref } from "vue";

const form = reactive({
  Username: "",
  Password: "",
  CheckCode: "",
});

const code = ref(99999999);
const btn_text = ref("获取验证码");
const flag = ref(true);
// const loading = ref(false);

const loginSubmit = () => {
  alert("登录");
};

//获取验证码
const getCode = () => {
  flag.value = false;
  let time = 10;
  code.value = Math.random() * 1000000;
  code.value = parseInt(code.value).toString();
  if (code.value.length < 6) {
    for (var k = 6 - code.value.length; k > 0; k--) {
      code.value = code.value + "0";
    }
  } else if (code.value.length > 6) {
    code.value = code.value.subString(0, 5);
  }

  alert("验证码为:  " + code.value);

  const timer = setInterval(function () {
    time = time - 1;
    btn_text.value = time + " 秒后重试";

    if (time === 0) {
      clearInterval(timer);
      flag.value = true;
      btn_text.value = "获取验证码";
    }
  }, 1000);
};

const login_rules = reactive({
  username: [
    {
      required: true,
      /*4-16位字母数字*/
      pattern: /^[a-zA-Z0-9]{4,16}$/,
      message: "请输入正确的用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      /*8-16位 至少一个大写字母，一个小写字母和一个数字*/
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
      message: "请输入正确的密码",
      trigger: "blur",
    },
  ],
  checkcode: [
    {
      required: true,
      /*6位数字*/
      pattern: /^\d{6}$/,
      message: "请输入正确的验证码",
      trigger: "blur",
    },
  ],
});

const toRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="bg">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>Login</h1>
        </div>
      </template>

      <el-form :model="form" class="form" :rules="login_rules" ref="login_form">
        <!-- UserName -->
        <el-form-item prop="username" label="用户名:">
          <el-input
            v-model="form.Username"
            maxlength="16"
            minlength="4"
            placeholder="4-16位 字母数字"
            class="input"
          />
        </el-form-item>

        <!-- Password -->
        <el-form-item prop="password" label="密&nbsp;&nbsp;&nbsp;&nbsp;码:">
          <el-input
            v-model="form.Password"
            maxlength="16"
            minlength="8"
            placeholder="8-16位 至少包含大小写和数字"
            show-password
          />
        </el-form-item>

        <!-- CheckCode -->
        <el-form-item prop="checkcode" label="验证码:">
          <el-input
            v-model="form.CheckCode"
            minlength="6"
            placeholder="请输入验证码"
            class="code-input"
          />
          <el-button type="primary" plain v-if="flag" @click="getCode">
            {{ btn_text }}
          </el-button>
          <el-button type="info" plain disabled v-else>
            {{ btn_text }}
          </el-button>
        </el-form-item>

        <!-- Button -->
        <el-form-item>
          <el-button
            type="primary"
            @click="loginSubmit"
            size="large"
            class="btn"
          >
            登录
          </el-button>
          <el-button
            type="success"
            size="large"
            class="btn"
            @click="toRegister"
          >
            去注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.bg {
  height: 100vh;
  background-size: 100%;
}

.box-card {
  width: 45vw;
  margin: 0 auto;
  user-select: none;
}

.card-header {
  text-align: center;
}

.card-header h1 {
  font-size: 48px;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.code-input {
  width: 70%;
  margin-right: 30px;
}

.btn {
  width: 120px;
  height: 50px;
  border-radius: 10px;
  margin-left: 140px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
