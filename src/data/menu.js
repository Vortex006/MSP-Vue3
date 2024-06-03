//导入方法 该方法用于创建一个store
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useMenuStore = defineStore("menus", () => {
  //定义数据
  const menuListData = ref([]);
  //定义异步action（方法）
  async function getMenuList() {
    const { data: res } = await axios.get("/api/menu");
    menuListData.value = res.data;
  }

  async function getIconByName(iconName) {
    const { data: res } = await axios.get(`/api/menu/icon/name/${iconName}`);
    localStorage.setItem(iconName, res.data.iconContent);
    console.log("存了一次");
  }

  return {
    menuListData,
    getMenuList,
    getIconByName,
  };
});
