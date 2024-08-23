<template>
 <!-- 水平方向 width>992px -->
 <div class="header hidden-sm-and-down" v-show="isHeaderVisible">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
   <div class="title">
    <img class="logo" src="/favicon.ico" alt="logo" />
    <div class="name">以伴青少年发展中心</div>
   </div>

   <div class="flex-grow" />
   <div v-for="(list, index) in menu">
    <el-sub-menu v-if="list.children" :key="list.index" :index="list.index + ''">
     <template #title>{{ list.name }}</template>
     <NuxtLink v-for="child in list.children" :to="child.url" class="sub-item" >
      <el-menu-item :key="child.index" :index="child.url">
        {{ child.name }}
      </el-menu-item>
     </NuxtLink>

    </el-sub-menu>

    <NuxtLink v-else :to="list.url">
     <el-menu-item :key="list.url" :index="list.url">
       {{ list.name }}
     </el-menu-item>
    </NuxtLink>

   </div>
  </el-menu>
 </div>
 <!-- 垂直方向 width<992px -->
 <div class="header hidden-md-and-up">
  <div class="title">
   <img class="logo" src="/favicon.ico" alt="logo" />
   <div class="name">以伴青少年发展中心</div>
  </div>
  <!-- 点击按钮 显示导航 -->
  <button class="switch-button" @click="isShow = !isShow">
   <img class="nav-select" src="@/assets/images/layout/nav_select.svg" alt="点击" />
  </button>
 </div>
 <el-row id="tac" class="tac hidden-md-and-up" :class="isShow == true ? 'tac-slide-in' : 'tac-slide-out'">
  <el-col :span="24">
   <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="vertical"
    :ellipsis="false"
   >
    <!-- <div class="flex-grow" /> -->
    <div v-for="(list, index) in menu" :key="index">
     <el-sub-menu v-if="list.children" :key="list.index" :index="list.index + ''">
      <template #title>{{ list.name }}</template>

      <NuxtLink v-for="child in list.children" :to="child.url" class="sub-item" >
       <el-menu-item :key="child.index" :index="child.url">
        {{ child.name }}
       </el-menu-item>
      </NuxtLink>
     </el-sub-menu>

     <NuxtLink v-else :to="list.url" style="display: block;">
      <el-menu-item :key="list.url" :index="list.url">
        {{ list.name }}
      </el-menu-item>
     </NuxtLink>
    </div>
   </el-menu>
  </el-col>
 </el-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "element-plus/theme-chalk/display.css";

const activeIndex = ref("1");
const menu = reactive([
 {
  index: 1,
  name: "首页",
  url: "/",
 },
 {
  index: 2,
  name: "关于我们",
  url: "/about",
 },
 {
  index: 3,
  name: "新闻中心",
  url: "/news",
 },
 {
  index: 4,
  name: "公益项目",
  url: "/program",
 },
 {
  index: 5,
  name: "公益视频",
  url: "/videos",
 },
 {
  index: 6,
  name: "人员招募",
  children: [
   {
    index: 6 - 1,
    name: "日常实习生招募",
    url: "/recruit/join",
   },
   {
    index: 6 - 2,
    name: "志愿者招募",
    url: "/recruit/volunteer",
   },
  ],
 },
 //  {
 //   index: 7,
 //   name: "支持我们",
 //   children: [
 //    {
 //     index: 7 - 1,
 //     name: "合作交流",
 //     url: "/support/cooperation",
 //    },
 //    {
 //     index: 7 - 2,
 //     name: "捐赠支持",
 //     url: "/support/donate",
 //    },
 //   ],
 //  },
 {
  index: 7,
  name: "合作交流",
  url: "/cooperation",
 },
//  {
//   index: 8,
//   name: "信息公开",
//   url: "/report",
//  },
]);

const isShow = ref(false);

const isHeaderVisible = ref(true);
let lastScrollY = 0;

// 鼠标向下滚动：导航栏隐藏 向上滚动：导航栏出现
const handleScroll = () => {
  if (window.scrollY > lastScrollY && isHeaderVisible.value) {
    isHeaderVisible.value = false; // 向下滚动时隐藏 header
  } else if (window.scrollY < lastScrollY && !isHeaderVisible.value) {
    isHeaderVisible.value = true; 
  }
  lastScrollY = window.scrollY;
};

const router = useRouter();
// 路由守卫
router.beforeEach((to, from, next) => {
  isShow.value = false;
  next();
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
%common-flex {
 display: flex;
 justify-content: center;
 align-items: center;
}

$tacToTop: 50px; /**垂直导航距离页面顶部高度 */
$hoverColor: #ffe4e4; /* 鼠标悬停的颜色样式 */
// $buttonColor: #f2f2f2;
$buttonColor: rgba(255, 255, 255, 0); /**按钮背景颜色 */
$commonBgColor: rgba(255, 255, 255, 0.9);

.flex-grow {
 flex-grow: 1;
}
.el-menu {
 background-color: rgba(255, 255, 255, 0); /**去掉 el-menu 组件本来的颜色*/
}
.el-menu-demo {
 width: 100%;
 align-items: center;
 border-bottom: none;
}
.el-menu-item {
 &:hover {
  background-color: rgba(255, 255, 255, 0);
 }
}
// li .el-menu-item .is-active {
//  color: rgba(255, 255, 255, 0.1);
// }
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu-item:hover {
 background-color: $hoverColor;
}

.el-sub-menu {
 --el-menu-hover-bg-color: rgb(253, 233, 233); /**注意：此处使用 $hoverColor 无效 */
 
}
.el-menu-item, .el-sub-menu__title {
  justify-content: center;
}

// :deep(.sub-item) {
//   // display: block;
//   // width: 100%;\
//   flex-direction: column;
//   text-align: center;
//   a {
//     display: block;
//   }
// }
.el-sub-menu__title:focus,
.el-sub-menu__title:hover,
.sub-item:hover {
 background-color: $hoverColor;
}
:deep(.el-sub-menu .el-sub-menu__title) {
  justify-content: center;
}
/**定义 sideIn 动画 */
@keyframes slideIn {
 0% {
  left: 100%;
 }
 100% {
  left: 0;
 }
}
/**定义 sideOut 动画 */
@keyframes slideOut {
 0% {
  left: 0;
 }
 100% {
  left: 100%;
 }
}

/**垂直导航最外层盒子 */
.tac {
 position: fixed;
 top: $tacToTop;
 right: 0;
 z-index: 100;
 overflow: auto;
 height: 700px;
 background-color: $commonBgColor;
 box-shadow: 0px 10px 18px -6px rgba(0, 0, 0, 0.6);
}
.tac-slide-in {
 animation: slideIn 0.8s ease-in-out forwards;
}
 .tac-slide-out {
  animation: slideOut 0.5s ease-out forwards;
 }
.header {
 @extend %common-flex;

 position: fixed;
 top: 0;
 z-index: 100;

 box-sizing: border-box;
 padding: 0 20px;
 width: 100%;
 min-height: $tacToTop;
 justify-content: space-between;

 color: black;
 background-color: $commonBgColor;
 -webkit-user-select: none;
 user-select: none;
}

.header {
 @extend %common-flex;

 .title {
  @extend %common-flex;

  .logo {
   flex-shrink: 0;
   width: 40px;
   height: 40px;
   min-width: 30px;
   min-height: 30px;
  }

  .name {
   margin-left: 10px;

   font-family: sans-serif;
   font-size: 16px;
   text-align: left;
  }
 }
}

/**992px */
// @media screen and (max-width: 992px) {
//  .header {
//   height: $tacToTop;
//   min-height: $tacToTop;
//   .title {
//    .logo {
//     width: 30px;
//     height: 30px;
//    }
//    .name {
//     font-size: 14px;
//    }
//   }
//  }
//  .tac {
//   top: $tacToTop;
//  }
// }

.switch-button {
 position: relative;
 margin-right: 20px;
 width: 60px;
 height: auto;

 border: 2px solid $buttonColor;
 border-radius: 5px;
 background-color: $buttonColor;

 cursor: pointer;

 .nav-select {
  width: 80%;
  height: 80%;
 }
}

/**992px */
@media screen and (max-width: 992px) {
 .switch-button {
  .nav-select {
   width: 60%;
   height: 60%;
  }
 }
}

/**768px */
@media screen and (max-width: 768px) {
 .tac {
  height: 90%;
 }
}
</style>
