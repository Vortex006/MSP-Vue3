//导入方法 该方法用于创建一个store
import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/api/Http";

export const useRoomStore = defineStore("rooms", () => {
  //定义数据
  const ListData = ref([]);
  const CountData = ref(0);
  const UpdateId = ref(0);
  const UpdateData = ref({});
  const DeleteList = ref([]);
  //定义异步action（方法）
  async function getDataList(pageSize, currentPage) {
    // const aa = await http.get(`/api/room/limit/${pageSize}/${currentPage}`);
    // console.log(aa);
    const { data: res } = await http.get(
      `/api/room/limit/${pageSize}/${currentPage}`
    );
    ListData.value = res.data;
  }

  async function getDataCount() {
    const { data: res } = await http.get("/api/room/count");
    CountData.value = res.data;
  }

  //删除单个数据
  async function deleteData(row) {
    await http.delete(`/api/room/${row.roomId}`);
  }

  //批量删除数据
  async function deleteMultiData(rows) {
    rows.forEach((element) => {
      DeleteList.value.push(element.roomId);
    });
    await http.delete(`/api/room/list?roomIds=${DeleteList.value.toString()}`);
  }

  async function saveRoom(roomForm) {
    await http.post("/api/room", roomForm);
  }

  function setUpdateId(row) {
    UpdateId.value = row.roomId;
    localStorage.setItem("update_roomId", UpdateId.value);
  }

  async function getUpdateData() {
    UpdateId.value = localStorage.getItem("update_roomId");
    const { data: res } = await http.get(`/api/room/${UpdateId.value}`);
    UpdateData.value = res.data;
  }

  async function updateRoom(roomForm) {
    await http.put("/api/room", roomForm);
  }

  return {
    ListData,
    CountData,
    UpdateData,
    deleteMultiData,
    saveRoom,
    updateRoom,
    getUpdateData,
    setUpdateId,
    deleteData,
    getDataList,
    getDataCount,
  };
});
