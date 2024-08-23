<template>
 <div class="mask">
  <div class="title">
   <div v-for="item in title">{{ item }}</div>
  </div>
  <div class="intro">{{ intro }}</div>
  <a class="more" href="#">组织使命</a>
 </div>
</template>

<script lang="ts" setup>
// defineOptions({ name: "IndexMask" });
const props = defineProps({
 title: {
  type: Array,
  // required: true
 },
 intro: {
  type: String,
  require: true,
 },
});
</script>

<style lang="scss" scoped>
.common-top {
 overflow: hidden;
 width: 100%;
 height: 657px;
 z-index: -1;
}

.mask {
 position: relative;
 // margin: 16% 10%;
 //  margin: 6% 0;
 //  padding-top: 3%;
 margin: 0 6%;
 padding-top: 100px;
 padding-left: 4%;
 padding-right: 5%;
 padding-bottom: 50px;
 width: 370px; // 550px
 height: auto; // 360px
 color: rgba(255, 255, 255, 1);
 border-bottom-right-radius: 200px;
 background: rgba(18, 18, 18, 0.45);
 z-index: 2;
}

.title {
 font-family: "Alibaba Sans Black";
 font-size: 40px;
 text-align: left;
}

.intro {
 margin-top: 2%;
 max-width: 400px;
 font-family: "AlibabaPuHuiTi";
 font-size: 16px;
 text-align: left;
}

.more {
 display: inline-block;
 margin-top: 4%;
 width: 139px;
 height: 45px;
 font-family: "AlibabaPuHuiTi";
 font-size: 16px;
 text-align: center;
 line-height: 45px;
 color: rgba(255, 255, 255, 1);
 background: rgba(238, 106, 107, 1);
}
/**992px */
@media screen and (max-width: 950px) {
 .mask {
  margin: 0;
  width: 260px;
  border-bottom-right-radius: 150px;
 }
 .title {
  font-size: 30px;
 }
}

/**768px */
@media screen and (max-width: 768px) {
 .mask {
  padding-top: 70px;
  padding-bottom: 30px;
  width: 200px;
  border-bottom-right-radius: 120px;
 }
 .title {
  font-size: 20px;
 }
 .intro {
  margin-top: 10px;
  font-size: 12px;
 }
 .more {
  margin-top: 15px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
 }
}

/**590px */
@media screen and (max-width: 590px) {
 //  .slider-wrapper {
 //   height: 1000px;
 //  }
 .title {
  font-size: 26px;
 }

 .intro {
  max-width: 200px;
 }
}
</style>
