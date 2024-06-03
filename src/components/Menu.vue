<script setup>
import { onMounted, ref } from "vue";
import { useMenuStore } from "@/data/menu";
import { useRouter } from "vue-router";

const MenuList = ref([]);
const MenuStore = useMenuStore();
const defaultActive = ref("");
const iconStr = ref("");

onMounted(async () => {
  await MenuStore.getMenuList();
  MenuList.value = MenuStore.menuListData;
});

onMounted(() => {
  const router = useRouter();
  defaultActive.value = router.currentRoute.value.fullPath;
});

const checkIcon = (icon) => {
  if (icon.includes("icon")) {
    return false;
  } else {
    return true;
  }
};

const getIcon = (iconName) => {
  MenuStore.getIconByName(iconName);
  return localStorage.getItem(iconName);
};
</script>

<template>
  <el-menu
    router
    :default-active="defaultActive"
    background-color="#304156"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    unique-opened="true"
    class="menu"
  >
    <template v-for="Menu in MenuList" :key="Menu.menuId">
      <el-menu-item v-if="!Menu.menuChild || Menu.menuChild.length <= 0" :index="Menu.menuPath" :route="Menu.menuPath">
        <el-icon>
          <component :is="Menu.menuIcon" v-if="checkIcon(Menu.menuIcon)" />
          <!-- <span :class="Menu.menuIcon" v-else /> -->
          <i v-else v-html="getIcon(Menu.menuIcon)" /> </el-icon
        >&nbsp;&nbsp;
        <span>{{ Menu.menuName }} </span>
      </el-menu-item>

      <el-sub-menu v-else :index="Menu.menuId">
        <template #title>
          <el-icon> <component :is="Menu.menuIcon" /> </el-icon>
          &nbsp;&nbsp;
          <span>{{ Menu.menuName }}</span>
        </template>
        <template v-for="subMenu in Menu.menuChild" :key="subMenu.menuId">
          <el-menu-item :index="subMenu.menuPath" :route="subMenu.menuPath">
            <el-icon> <component :is="subMenu.menuIcon" /> </el-icon>&nbsp;&nbsp;
            <span>{{ subMenu.menuName }}</span>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped>
.menu {
  height: 100%;
}

.icon {
  color: white;
}
</style>
