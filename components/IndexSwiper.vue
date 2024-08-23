<template>
 <el-carousel width="100%" height="657px" class="swiper" :interval="5000">
  <el-carousel-item v-for="item in swiperImgsUrl">
   <img :src="item" alt="images in IndexSwiper"/>
  </el-carousel-item>
 </el-carousel>
</template>

<script lang="ts" setup>
// defineOptions({ name: "IndexSwiper" });
const props = defineProps({
 swiperImgsUrl: {
  type: Array<string>,
 },
});
// let swiperHeight = ref();
// const responHeight = function () {
//  if (process.client) {
//   if (window.screenX < 992) {
//    swiperHeight.value = "657px";
//   } else {
//    swiperHeight.value = "400px";
//   }
//  }
// };
// responHeight();
</script>

<style scoped>
.swiper {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 44em; /**轮播图高度 */
 overflow: hidden;
 background-size: contain;
 z-index: 1;
}
.el-carousel__container {
 height: 44em;
}
.el-carousel__item {
 background-color: #99a9bf;
 width: 100%;
 height: 44em;
}

img {
 width: 100%;
 height: 44em;
 object-fit: cover;
}

/**左右箭头样式 */
:deep(.el-carousel__arrow) {
 width: 50px;
 height: 50px;
 z-index: 10;
}
/* :deep(.el-carousel__arrow .el-icon) {
 width: 30px;
 height: 30px;
} */
/**指示灯样式修改 */
:deep(.el-carousel__indicators--horizontal) {
 position: absolute;
 left: auto;
 right: 10px;
 bottom: 10px;
 text-align: right;
}

:deep(.el-carousel__indicator--horizontal button) {
 width: 50px;
 height: 6px;
 background: #ffffff;
 opacity: 0.4;
}

:deep(.el-carousel__indicator--horizontal.is-active button) {
 width: 50px;
 height: 6px;
 background: #ffffff;
 opacity: 1;
}
</style>
