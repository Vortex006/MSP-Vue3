<script setup>
import { reactive, ref } from "vue";
import { useRoomStore } from "@/data/room";

const RoomStore = useRoomStore();
const roomCol = ref([
  { prop: "roomId", label: "科室ID", width: "80", align: "center", overflow: false },
  { prop: "roomZhName", label: "科室中文名", width: "100", align: "center", overflow: true },
  { prop: "roomEnName", label: "科室英文名", width: "100", align: "center", overflow: true },
  { prop: "roomMaster", label: "科室主任", width: "80", align: "center", overflow: false },
  { prop: "roomInfo", label: "科室信息", width: "", align: "left", overflow: true },
  { prop: "createTime", label: "创建时间", width: "", align: "left", overflow: true },
  { prop: "createUser", label: "创建人员", width: "", align: "left", overflow: true },
  { prop: "updateTime", label: "更新时间", width: "", align: "left", overflow: true },
  { prop: "updateUser", label: "更新人员", width: "", align: "left", overflow: true },
]);

const RoomPath = reactive({
  savePath: "/Home/SaveRoom",
  updatePath: "/Home/UpdateRoom",
});
</script>
<template>
  <ParadiseTable :store="RoomStore" :columnData="roomCol" :path="RoomPath" />
</template>
