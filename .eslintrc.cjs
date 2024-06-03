/* eslint-env node */
module.exports = {
  root: true,
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/multi-word-component-names": 0,
  },
  globals: {
    ElMessage: "readonly",
    ElMessageBox: "readonly",
    ElLoading: "readonly",
  },
};
