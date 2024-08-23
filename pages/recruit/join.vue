<template>
  <div>
   <div class="common-layout">
    <el-container>
     <el-header class="header-img">
      <!-- <img class="header-img" src="@/assets/images/demo_join.jpg" alt="" /> -->
      <div class="join-card">
       <p class="join-text-ch">加入以伴</p>
       <div class="join-text-en" ref="targetSection">
        <a href="#target-infos" @click="smoothScroll"
         ><img class="arrow" src="@/assets/images/join/arrow.svg" /></a
        >JOIN US
       </div>
      </div>
     </el-header>
     <el-main id="target-infos" >
      <el-row v-for="(item, index) in recruitInfo" :key="index" :class="styles[index%5]">
       <el-card :class="styles[index%5]">
        <p class="center-name">{{ item.depthName }}</p>
        <div class="detail">
         <p class="center-num"><strong>人数：</strong>{{ item.peopleNum }}</p>
        <p class="center-location"><strong>工作地点：</strong>{{ workPlace(item.place) }}</p>
        <p class="center-duties"><strong>工作职责：</strong><br>{{ item.responsibility }}</p>
        <p><strong>福利：</strong><br>{{ item.welfare }}</p>
        <p v-if="item.contact"><strong>联系邮箱：</strong><br>{{ item.contact }}</p>
        
        </div>
        <!-- 图标 -->
        <!-- <el-icon></el-icon> -->
       </el-card>
      </el-row>
     </el-main>
    </el-container>
   </div>
  </div>
 
</template>

<script lang="ts" setup>

import { getRecruitMemberInfo } from "@/api/index";

useHead({
 title: "加入我们",
 titleTemplate(title) {
  return title ? `以伴-${title}` : "";
 },
 meta: [
  { name: "description", content: "加入以伴" },
  { name: "keywords", content: "以伴, 加入以伴" },
 ],
});

let recruitInfo = reactive<{
  depthName: String,
  peopleNum: number,
  place: String,
  responsibility: String,
  welfare: String,
  contact: String
}[]>([]);

const workPlace = ((place: String) => {
  if(place == "online") 
  return "线上"
  if(place == "offline")
  return "线下"
})

let styles = reactive([
  'card-style1',
  'card-style2',
  'card-style3',
  'card-style4',
  'card-style5',
])


// const recruitInfo = ref([]);
const getRecruitInfos = async () => {
 // loading.value = true;
 try {
  const res = await getRecruitMemberInfo();
  if (res?.code == 0) {
   Object.assign(recruitInfo, res?.data)
   console.log("get:recruitInfo", recruitInfo);
  
  }
 }catch(error) {
  console.log("get:recruitInfo", error);
 } finally {
  // loading.value = false
 }
};

const targetSection = ref<HTMLElement | null>(null);
// 锚点跳转流畅函数
const smoothScroll = () => {
 if (targetSection.value) {
  targetSection.value.scrollIntoView({ behavior: "smooth" });
  console.log(targetSection.value);
 }
};
// 监听依赖更新
watchEffect(() => {
 // getRecruitInfos();
});
onMounted(()=>{
  getRecruitInfos();
})
</script>

<style lang="scss" scoped>
$headerImgOpc: 0.6; /**顶部背景图片透明度 */
/** 顶部背景 */
.el-header {
 position: relative;
 margin: 70px auto 0;
 width: 100%;
 height: 550px;
 border-bottom: 2px solid rgba(204, 204, 204, 1);
 text-align: center;
 //  background: linear-gradient(90deg, rgb(222, 115, 113, 0.6) 0%, rgba(230, 175, 174, 0.2) 100%);
}

.el-header::after {
 content: "We need you！";
 position: absolute;
 right: 0;
 bottom: 5px;
 color: rgba(97, 50, 50, 0.6);
 font-family: "Alibaba Sans Black";
 font-size: 18px;
}
.header-img {
 display: inline-block;
 //  margin-top: 40px;
 width: 85%;
 height: 530px;
 background-image: url("@/assets/images/join/join_bg.jpg");
//  background-size: cover;
 background-size: contain;
 background-repeat: no-repeat;
 
}
/**992px */
@media screen and (max-width: 992px) {
  .header-img {
    height: 350px;    
  }
}
/**564px */
@media screen and (max-width: 564px) {
  .header-img {
    height: 250px;    
  }
}

/**愿景文字渐显动画 */
@keyframes moveFromTopRight {
 0% {
  opacity: 0;
  transform: translate(50%, -50%);
 }
 100% {
  opacity: 1;
  transform: translate(1, 1);
 }
}
.join-card {
 position: absolute;
 right: 50px;
 top: 160px;
 width: 400px;
 height: 270px;
 opacity: 1;
 text-align: right;
 border-radius: 13px;
 background: rgba(245, 169, 142, 0.8);
 box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.25);
 animation: moveFromTopRight 1s ease-in-out forwards;
}
.join-text-ch {
 position: relative;
 right: 12%;
 top: 60px;
 font-family: "Alibaba Sans Black";
 font-size: 60px;
 // font-size: 100px;
}
.join-text-en {
 position: relative;
 right: 12%;
 top: 70px;
 color: rgba(97, 50, 50, 0.9);
 font-family: "Alibaba Sans Black";
 font-size: 38px;
 text-shadow: 0px 2px 9px rgba(0, 0, 0, 0.25);
 .arrow {
  margin-right: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
 }
}
/**992px */
@media screen and (max-width: 992px) {
  .join-card {
    width: 330px;
    height: 220px;
  }
  .join-text-ch {
    font-size: 48px;
  }
  .join-text-en {
    right: 12%;
    // top: 40px;
    font-size: 40px;
  }
}

/**564px */
@media screen and (max-width: 564px) {
  .join-card {
    right: 150px;
    top: 150px;
    width: 180px;
    height: 100px;
  }
  .join-text-ch {
    top: 20px;
    font-size: 32px;
  }
  .join-text-en {
    top: 15px;
    font-size: 26px;
    .arrow {
      margin-right: 10px;
      width: 30px;
      height: 30px;
    }
  }
  
}

/** 招募主体内容 */
.el-main {
 margin: 0 12%;
 margin-bottom: 100px;
 height: auto;
 line-height: 1.5;
}
.el-row {
 margin-top: 50px;
}
.el-card {
 padding: 20px !important;
 width: 100%;
 height: auto;
 min-height: 200px;
}
@media screen and (max-width: 992px) {
  .el-main {
    margin: 0 8%;
  }
  .el-card {
    padding: 10px !important;
  }
  
}
.card-style1 {
 position: relative;
 //  background-color: rgba(217, 126, 126, 1);
 background: linear-gradient(
  270deg,
  rgba(217, 126, 126, 1) 0%,
  rgba(244, 157, 157, 0.8) 34%,
  rgba(217, 126, 126, 0.1) 100%
 );
}
.card-style2 {
 position: relative;
 //  background-color: rgba(130, 109, 109, 0.75);
 background: linear-gradient(
  270deg,
  rgb(136, 123, 123) 0%,
  rgba(142, 120, 120, 0.8) 34%,
  rgba(130, 109, 109, 0.1) 100%
 );
}
.card-style3 {
 position: relative;
 //  background-color: rgba(237, 146, 126, 0.74);
 background: linear-gradient(
  270deg,
  rgba(237, 146, 126, 1) 0%,
  rgba(237, 146, 126, 0.8) 34%,
  rgba(237, 146, 126, 0.1) 100%
 );
}
.card-style4 {
 position: relative;
 //  background-color: rgba(237, 194, 126, 0.74);
 background: linear-gradient(
  270deg,
  rgba(237, 194, 126, 1) 0%,
  rgba(237, 194, 126, 0.8) 34%,
  rgba(237, 194, 126, 0.1) 100%
 );
}
.card-style5 {
 position: relative;
 //  background-color: rgba(227, 114, 34, 0.42);
 background: linear-gradient(
  270deg,
  rgba(255, 196, 153, 1) 0%,
  rgba(255, 196, 153, 0.8) 34%,
  rgba(255, 196, 153, 0.1) 100%
 );
}
.card-style1,
.card-style2,
.card-style3,
.card-style4,
.card-style5 {
 &::after {
  content: "";
  position: absolute;
  top: 30px;
  right: 50px;
  width: 100px;
  height: 100px;
  background-image: url("@/assets/images/join/email.png");
  background-repeat: no-repeat;
  background-size: cover;
 }
}
@media screen and (max-width: 768px) {
  .card-style1,
  .card-style2,
  .card-style3,
  .card-style4,
  .card-style5 {
  &::after {
    top: 20px;
    right: 10px;
    width: 50px;
    height: 50px;
  }
  }
}
/** 招募详情样式 */
.center-name {
 font-family: "Alibaba Sans Black";
 font-size: 32px;
 text-align: left;
}
.detail {
 margin-top: 30px;
 font-family: sans-serif;
 font-size: 20px;
 white-space: pre-line;
 p {
  margin-top: 15px;
 }
}


@media screen and (max-width: 768px) {
 /** 招募详情样式 */
 .center-name {
  font-size: 30px;
  text-align: left;
 }
 .detail {
  margin-top: 30px;
  font-size: 20px;
  p {
   margin-top: 8px;
  }
 }
}

@media screen and (max-width: 564px) {
 /** 招募详情样式 */
 .center-name {
  font-size: 28px;
 }
 .detail {
  margin-top: 30px;
  font-size: 16px;
 }
}
</style>
