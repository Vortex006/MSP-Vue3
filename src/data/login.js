import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/api/Http";

export const useLoginStore = defineStore("login", () => {
  const codeImgData = ref("");

  async function getCodeImg() {
    const { data: res } = await http.get("/api/login/codeImg");
    codeImgData.value = res.data;
  }

  return { getCodeImg, codeImgData };
});
