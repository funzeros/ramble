import Vue from "vue";
import VueRouter from "vue-router";
import boot from "@/views/boot/index.vue";
// import store from "@/store";
import storage from "@/assets/storage.js";
import { get_info_by_token } from "@/api/user.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/boot",
    meta: {
      title: "闲侃",
      permit: true,
    },
  },
  {
    path: "/boot",
    name: "boot",
    component: boot,
    meta: {
      title: "闲侃 - 启动",
      permit: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login&reg/index.vue"),
    meta: {
      title: "闲侃 - 登录",
      permit: true,
    },
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import("@/views/login&reg/reg.vue"),
    meta: {
      title: "闲侃 - 注册",
      permit: true,
    },
  },
  {
    path: "/forget",
    name: "forget",
    component: () => import("@/views/login&reg/forget.vue"),
    meta: {
      title: "闲侃 - 忘记密码",
      permit: true,
    },
  },
  {
    path: "/main/setting/:id",
    name: "setting",
    component: () => import("@/components/my/setting.vue"),
    meta: {
      title: "闲侃 - 设置",
      permit: true,
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("@/views/detail/index.vue"),
    meta: {
      title: "闲侃 - 帖子",
      permit: true,
    },
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main"),
    meta: {
      title: "闲侃 - 主页",
      permit: false,
    },
    children: [
      {
        path: "/main/post",
        name: "post",
        component: () => import("@/components/post"),
        meta: {
          title: "闲侃 - 帖屋",
          permit: false,
        },
        children: [
          {
            path: "/main/post/newPost",
            name: "newPost",
            component: () => import("@/components/post/newPost.vue"),
            meta: {
              title: "闲侃 - 最新",
              permit: false,
            },
          },
          {
            path: "/main/post/recPost",
            name: "recPost",
            component: () => import("@/components/post/recPost.vue"),
            meta: {
              title: "闲侃 - 热门",
              permit: false,
            },
          },
        ],
      },
      {
        path: "/main/chat",
        name: "chat",
        component: () => import("@/components/chat"),
        meta: {
          title: "闲侃 - 聊天",
          permit: false,
        },
      },
      {
        path: "/main/my",
        name: "my",
        component: () => import("@/components/my"),
        meta: {
          title: "闲侃 - 我的",
          permit: false,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.permit) {
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  } else if (storage.get("TOKEN")) {
    let result = await get_info_by_token();
    if (result.data.code === 0) {
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next();
    } else {
      next("/login");
    }
  } else {
    next("/login");
  }
});

export default router;
