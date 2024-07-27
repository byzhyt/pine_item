import { RouteEntity } from "pine-utils";

export const routes: Array<RouteEntity> = [
  {
    name: "pine-web",
    path: "/",
    redirect: "/home",
    component: () => import("@/views/layout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "首页",
          icon: "",
          className: ""
        }
      },
      {
        path: "/list",
        name: "list",
        component: () => import("@/views/list.vue"),
        meta: {
          title: "列表",
          icon: "",
          className: ""
        }
      }
    ],
    meta: {
      title: "pine-web框架",
      icon: "",
      className: ""
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
    meta: {
      isMenuShow: false,
      title: "登录",
      visible: false
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/notfound.vue"),
    meta: {
      isMenuShow: false,
      title: "未找到页面",
      visible: false
    }
  }
];
