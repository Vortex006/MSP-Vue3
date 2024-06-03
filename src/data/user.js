import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";
import http from "@/api/Http";

export const useUserStore = defineStore("users", () => {
  const ListData = ref([]);
  const CountData = ref(0);
  const SexListData = ref([]);
  const HomeListData = ref([]);
  const EmailSerListData = ref([]);
  const PhoneSerListData = ref([]);
  const ResultData = reactive({
    code: 0,
    message: "",
  });
  const DeleteList = ref([]);
  const UpdateId = ref(0);
  const UpdateData = ref({});

  async function getDataList(pageSize, currentPage) {
    const { data: res } = await http.get(`/api/limitUsers?pageSize=${pageSize}&&currentPage=${currentPage}`);
    ListData.value = res.data;
  }

  async function getDataCount() {
    const { data: res } = await axios.get("/api/countUser");
    CountData.value = res.data;
  }

  //删除单个数据
  async function deleteData(row) {
    const { data: res } = await axios.get(`/api/deleteUser?userId=${row.userId}`);
    ResultData.code = res.code;
    ResultData.message = res.message;
  }

  //批量删除数据
  async function deleteMultiData(rows) {
    rows.forEach((element) => {
      DeleteList.value.push(element.userId);
    });
    const { data: res } = await axios.post("/api/deleteMultiUser", DeleteList.value);
    ResultData.code = res.code;
    ResultData.message = res.message;
  }

  async function saveUser(userForm) {
    const { data: res } = await axios.post("/api/saveUser", userForm);
    ResultData.code = res.code;
    ResultData.message = res.message;
  }

  function setUpdateId(row) {
    UpdateId.value = row.userId;
    localStorage.setItem("update_userId", UpdateId.value);
  }

  async function getUpdateData() {
    UpdateId.value = localStorage.getItem("update_userId");
    const { data: res } = await axios.get(`/api/getUserById?userId=${UpdateId.value}`);
    UpdateData.value = res.data;
  }

  async function updateUser(userForm) {
    const { data: res } = await axios.post("/api/updateUser", userForm);
    ResultData.code = res.code;
    ResultData.message = res.message;
  }

  return {
    getDataList,
    getDataCount,
    getSexData,
    getHomeData,
    getEmailSerData,
    getPhoneSerData,
    saveUser,
    deleteData,
    deleteMultiData,
    setUpdateId,
    getUpdateData,
    updateUser,
    ListData,
    CountData,
    SexListData,
    HomeListData,
    EmailSerListData,
    PhoneSerListData,
    ResultData,
    DeleteList,
    UpdateId,
    UpdateData,
  };
});
