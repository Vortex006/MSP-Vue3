import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/layout/Home.vue";
import Login from "@/layout/Login2.vue";
import Register from "@/layout/Register.vue";

import HomePage from "@/views/HomePage.vue";
import UserManage from "@/views/UserManage.vue";
import RoomManage from "@/views/RoomManage.vue";

import SaveUser from "@/components/User/SaveUser.vue";
import UpdateUser from "@/components/User/UpdateUser.vue";

import SaveRoom from "@/components/Room/SaveRoom.vue";
import UpdateRoom from "@/components/Room/UpdateRoom.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/register" },
    {
      path: "/Home",
      component: Home,
      children: [
        {
          path: "/Home/HomePage",
          component: HomePage,
        },
        {
          path: "/Home/UserManage",
          component: UserManage,
        },
        {
          path: "/Home/SaveUser",
          component: SaveUser,
        },
        {
          path: "/Home/UpdateUser",
          component: UpdateUser,
        },
        {
          path: "/Home/RoomManage",
          component: RoomManage,
        },
        {
          path: "/Home/SaveRoom",
          component: SaveRoom,
        },
        {
          path: "/Home/UpdateRoom",
          component: UpdateRoom,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
  ],
});

export default router;
