<template>
  <!-- 顶部视频模块 -->
  <div class="top-box">
   <div class="about-title">
    <div class="ch">关于我们</div>
    <div class="en">About Us</div>
   </div>
   <div class="tb-top-ball"></div>
   <div class="tb-btm-ball"></div>
   <!-- 取消注释后更新 -->
   <!-- <VideoPlayer v-if="isVideoShow" :video-id="videoId" :src="videoSrc" :poster="videoPoster" :borderRadius="15" class="video-box" :width="videoWidth" :height="videoHeight"  @initVideo="getVideo"/> -->
  </div>
  <!-- 组织特点模块 -->
  <div class="organization-charac">
   <div class="oc-banner">
    <div class="oc-text">
     <p class="oc-title">组织使命</p>
     <p class="oc-intro">让全中国每一位孩子</p>
     <p class="oc-intro">都能享受向上向善的发展陪伴</p>
    </div>
    <div class="oc-banner-flash"></div>
    <!--鼠标悬浮闪光效果-->
   </div>
   <div class="oc-banner">
    <div class="oc-text">
     <p class="oc-title">组织愿景</p>
     <p class="oc-intro">成为一个帮助无数学生，</p>
     <p class="oc-intro">让成员得到快速成长的公益创业团队</p>
    </div>
    <div class="oc-banner-flash"></div>
   </div>
   <div class="oc-banner">
    <div class="oc-text">
     <p class="oc-title">组织核心竞争力</p>
     <p class="oc-intro">团队力量大，公益反响大</p>
     <p class="oc-intro">服务时效好，合作力量强</p>
    </div>
    <div class="oc-banner-flash"></div>
   </div>
   <div class="oc-banner">
    <div class="oc-text">
     <p class="oc-title">组织价值观</p>
     <p class="oc-intro">绝不拖延，绝不敷衍</p>
     <p class="oc-intro">绝不推脱，对标复盘sop</p>
    </div>
    <div class="oc-banner-flash"></div>
   </div>
  </div>
  <!-- 组织负责人介绍 -->
  <CommonTitle :comTitleCh="'组织负责人 龚旺'" :comTitleEn="'LEADER PROFILE'" />
  <div class="leader-profile">
   <div class="lp-photo">
    <img src="@/assets/images/about/gw_profile.png" />
   </div>
   <div class="lp-intro-bg">
    <!-- 调用接口获取数据 -->
    <div class="lp-intro-text" v-for="(item, index) in leaderIntro" :key="index">
     <p>{{ item }}</p>
    </div>
   </div>
  </div>
  <!-- 组织核心成员介绍 -->
  <CommonTitle :comTitleCh="'组织核心成员'" :comTitleEn="'CORE PROFILE'" />
  <div class="core-profile">
   <div class="cp-profile">
    <div class="cp-profile-img">
     <img src="@/assets/images/about/mgt_profile.jpg" />
    </div>
    <div class="cp-profile-name">麦艮廷</div>
    <p class="cp-intro-text" v-for="(item, index) in mgtIntros" :key="index">{{ item }}</p>
   </div>
   <div class="cp-profile">
    <div class="cp-profile-img">
     <img src="@/assets/images/about/wqq_profile.jpg" />
    </div>
    <div class="cp-profile-name">吴清清</div>
    <p class="cp-intro-text" v-for="(item, index) in wqqIntros" :key="index">{{ item }}</p>
   </div>
   <div class="cp-profile">
    <div class="cp-profile-img">
     <img src="@/assets/images/about/zxx_profile.jpg" />
    </div>
    <div class="cp-profile-name">郑筱星</div>
    <div class="cp-intro-text" v-for="(item, index) in zxxIntros" :key="index">
     <p>{{ item }}</p>
    </div>
   </div>
  </div>

  <!-- 组织发展历程 -->
  <div style="position: relative">
   <CommonTitle :comTitleCh="'组织发展历程'" :comTitleEn="'DEVELOPMENT PROCESS'" />
   <EventHistory />
   <div class="dp-left-ball"></div>
  </div>
  <!-- 组织环境 -->
  <CommonTitle :comTitleCh="'组织工作环境'" :comTitleEn="'WORKING ENVIRONMENT'" />
  <div class="env"><img src="@/assets/images/about/working_enviroment.jpg" /></div>
  
</template>

<script setup lang="ts">
import { getVideoByID } from "@/api";

useHead({
 title: "关于我们",
 titleTemplate(title) {
  return title ? `以伴${title}` : "";
 },
 meta: [
  { name: "description", content: "以伴关于我们" },
  { name: "keywords", content: "关于我们, 组织历程, 初心愿景" },
 ],
});

let isVideoShow = ref(false);
let videoSrc: string;
let videoPoster: string;
let videoId: string;
/**
 * @description 获取视频接口
 * @return void 
 */
const getVideo = async()=>{
  try {
    let params = { id: 169 };
    const res = await getVideoByID(params);
    let video = res.data;
    console.log("video:", video);
    console.log("video res:", res);
    videoSrc = res.data.link;
    videoPoster = video.coverImg;
    videoId = "video"+video.id;
    isVideoShow.value = true;
    console.log('videoSrc:', videoSrc);
  } catch (error) {
    console.log('get:video',error);
  }
}

// 龚旺
let leaderIntro = [
 "共青团中央中国青年志愿者优秀个人奖",
 "广州市番禺区以伴青少年发展中心理事长",
 "荣获“互联网+”国赛金奖、银奖等荣誉奖项近百项",
 "央视《对话2020》特邀嘉宾",
 "广东卫视《众创英雄汇》特邀评委",
 "广东省优秀共青团员",
 "广东优秀战疫志愿服务典型组织创始人",
 "广东公益创业优秀组织创始人",
 "广东大学生志愿服务社区行动示范项目创始人",
 "广州市优秀青年创新创业人才志愿时长1000余小时",
 "广州市番禺区以伴青少年发展中心外联负责人",
 "共青团中央全国向上向善好青年",
 "共青团中央中国青年志愿者优秀个人",
 "粤港澳大湾区青年创业人才榜样",
 "2022年第四季度广州好人",
];
//麦艮廷
const mgtIntros = [
 "广州市番禺区以伴青少年发展中心技术负责人",
 "中山大学计算机硕士、中级软件工程师",
 "负责机构以伴智能志愿服务系统和官网的开发与维护",
 "广州市总工会“最美志愿者”",
 "2项发明专利、5项软件著作权",
 "连续两届“互联网+”创新创业大赛国奖获得者",
 "国家奖学金等荣誉百余项",
];
//吴清清
const wqqIntros = [
 "广州市番禺区以伴青少年发展中心项目负责人",
 " 华南师范大学金融学硕士、广州市优秀青年创新创业人才",
 "统筹云陪伴项目的运营",
 "负责机构对外联系与组织宣推工作",
 "主持机构会务及重大活动的组织工作",
 "落实会议决定的重要事项",
 "连续四届“互联网+”创新创业大赛国奖获得者",
 "广州市奋斗青年代表、广州市总工会“最美志愿者",
 "连续两届“互联网+”创新创业大赛国奖获得者",
 "“青创杯”第九届创新创业大赛第一名等荣誉百余项",
];
//郑筱星
const zxxIntros = [
 "广州市番禺区以伴青少年发展中心课研负责人",
 "2022年关爱外派干部“最美志愿者”",
 "发展与教育心理学硕士",
 "以伴课程研发中心督导",
 "以伴智能心理测评开发与修订",
 "落地云陪伴、云伴课志愿项目10+场",
 "统筹志愿者培训3000+人次",
 "辐射受助学生2000+人次",
 "荣获“互联网+”创新创业国赛银奖",
 "广州市奋斗青年代表、广州市总工会“最美志愿者",
 "“青创杯”第八届广州青年创新创业大赛优胜奖",
];

let videoWidth = ref(480);
let videoHeight = ref(300);
/**
 * @description 根据屏幕宽度调整样式
 */
 const reactAdjust = () => {
  if(process.client) {
    const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
    console.log('当前浏览器宽度：', screenWidth.value);
    if(screenWidth.value <= 1200 && screenWidth.value > 992) {
      // videoWidth.value = 700;
      // videoHeight.value = 400;
    }else if(screenWidth.value <= 992 && screenWidth.value > 764) {
      // videoWidth.value = 760;
      // videoHeight.value = 400;
    }else if(screenWidth.value <= 764 && screenWidth.value > 564) {
      // videoWidth.value = 560;
      // videoHeight.value = 340;
    }else if(screenWidth.value <= 564) {
      videoWidth.value = 350;
      videoHeight.value = 220;
    }
  }
  
}

watchEffect(() => {
  reactAdjust();
})

/**初始化 **/
onMounted(async () => {
  await getVideo();
});
</script>

<style lang="scss" scoped>
html,
body {
 background-color: rgb(255, 255, 255);
}

/**顶部视频模块start */
.top-box {
 position: relative;
 overflow: hidden;
 width: 100%;
 height: auto;
 min-height: 400px;
 background: linear-gradient(230deg, rgba(237, 107, 109, 0.7) 0%, rgba(255, 255, 255, 0.85) 100%);
}

.yiban-bg {
 position: absolute;
 top: 0;
 width: 100%;
 height: 670px;
}

.yiban-bg .img {
 width: 100%;
 height: 100%;
}

.about-title {
 position: absolute;
 top: 170px;
 right: 200px;
 z-index: 10;
 color: rgba(255, 255, 255, 1);

 .ch {
  font-family: "Alibaba Sans Black";
  font-size: 60px;
 }

 .en {
  text-align: right;
  font-family: "Alibaba Sans Black";
  font-size: 38px;
 }
}

.video-box {
 position: absolute;
 left: 100px;
 top: 180px;
 //  width: 450px;
 //  height: 281px;
 border-radius: 15px;
 background-color: rgba(239, 107, 112, 0.1);
 box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
@keyframes top-left-slide-in {
 0% {
  opacity: 0;
  transform: translate(-100%, -100%);
 }
 100% {
  opacity: 1;
  transform: translate(0, 0);
 }
}
.tb-top-ball {
 position: absolute;
 left: -300px;
 top: -250px;
 overflow: hidden;
 z-index: -1;
 width: 600px;
 height: 600px;
 border-radius: 50%;
 background-color: #f3999b;
 transform: translate(-100%, -100%);
 animation: top-left-slide-in 0.8s forwards;
}
@keyframes btm-right-slide-in {
 0% {
  opacity: 0;
  transform: translate(100%, 100%);
 }
 100% {
  opacity: 1;
  transform: translate(0, 0);
 }
}
.tb-btm-ball {
 position: absolute;
 right: -470px;
 top: 100px;
 overflow: hidden;
 z-index: -1;
 width: 940px;
 height: 940px;
 border-radius: 50%;
 background: linear-gradient(200deg, rgb(239 107 112) 0%, rgba(255, 255, 255, 0.85) 100%);
 transform: translate(100%, 100%);
 animation: btm-right-slide-in 0.8s forwards;
}
@media screen and (max-width: 1000px) {
 .top-box {
  /**使子项目水平居中*/
  position: relative;
  overflow: hidden;
  width: 100%;
  // height: 580px;  // 有视频时设置的高度
  min-height: 300px;  // 没有视频时设置的高度
  background: linear-gradient(192deg, rgba(237, 107, 109, 0.69) 0%, rgba(255, 255, 255, 0.85) 100%);
 }

 .yiban-bg {
  height: 600px;
 }

 .about-title {
  top: 100px;
  right: 0;
  left: 50%;
  transform: translateX(-50%);

  .ch {
   text-align: center;
   font-size: 48px;
  }

  .en {
   text-align: center;
   font-size: 30px;
  }
 }

 .video-box {
  top: 220px;
  left: 50%;
  border-radius: 15px;
  transform: translateX(-50%);
 }
}

@media screen and (max-width: 564px) {
  .top-box {
    // height: 480px;  // 有视频时设置的高度
    min-height: 250px;  // 没有视频时设置的高度
  }
}
/**顶部视频模块end */

/**组织特点start */
.organization-charac {
 display: flex;
 flex-wrap: wrap;
 height: 400px;
 //  background-color: antiquewhite;
}

.oc-banner {
 overflow: hidden;
 .oc-banner-flash {
  position: absolute;
  left: -110%;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
   90deg,
   rgba(255, 255, 255, 0),
   rgba(255, 255, 255, 0.5),
   rgba(255, 255, 255, 0)
  );
  transform: skew(-30deg);
 }
 &:hover {
  transform: translateY(-20px);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  left: 110%;
  transition: all 0.3s;
 }
 &:hover .oc-banner-flash {
  left: 120%;
  transition: all 0.3s;
 }
 &:nth-child(odd) {
  flex: 1;
  display: flex;
  justify-content: center; // 子元素水平居中
  align-items: center; // 子元素垂直居中
  background: rgba(239, 107, 112, 1);
  border-top: 38px solid rgb(245, 166, 169);
 }
 &:nth-child(even) {
  flex: 1;
  display: flex;
  justify-content: center; // 子元素水平居中
  align-items: center; // 子元素垂直居中
  background: rgba(227, 154, 118, 0.9);
  border-top: 38px solid rgb(239, 200, 181);
 }

 .oc-text {
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  //  font-weight: 700;
 }
 .oc-title {
  margin-bottom: 20px;
  font-weight: 700;
 }
 .oc-intro {
  margin-top: 8px;
  text-align: center;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
 }
}

 @media screen and (max-width: 992px) {
  // 实现2x2排列
  // .oc-banner-flash {
  //  display: none;
  // }
  .organization-charac {
   display: flex;
   flex-wrap: wrap;
   height: 596px;
  }
  .oc-banner {
    &:hover {
      transform: translateY(0);
    }
    &:nth-child(1) {
    flex: 0 0 calc(50%);
    display: flex;
    justify-content: center; // 子元素水平居中
    align-items: center; // 子元素垂直居中
    background: rgba(239, 107, 112, 1);
    border-top: 38px solid rgb(245, 166, 169);
  }

  &:nth-child(2) {
    flex: 0 0 calc(50%);
    display: flex;
    background: rgba(227, 154, 118, 0.9);
    border-top: 38px solid rgb(239, 200, 181);
  }
  &:nth-child(3) {
    flex: 0 0 calc(50%);
    display: flex;
    background: rgba(227, 154, 118, 0.9);
    border-top: 38px solid rgb(239, 200, 181);
  }

  &:nth-child(4) {
    flex: 0 0 calc(50%);
    display: flex;
    background: rgba(239, 107, 112, 1);
    border-top: 38px solid rgb(245, 166, 169);
  }
  }
 

 }


 
 .oc-text {
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  padding: 10px;
  font-size: 30px;
  font-weight: 900;
 }

 .oc-intro {
  text-align: center;
  font-size: 22px;
  color: rgba(255, 255, 255, 1);
 }


@media screen and (max-width: 666px) {
 .oc-text {
  //margin: 240px 0 60px 0;
  //text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  padding: 10px;
  font-size: 28px;
  font-weight: 900;
 }

 .oc-intro {
  /**display: flex; */
  text-align: center;
  font-size: 18px;
  color: rgba(255, 255, 255, 1);
 }
}

@media screen and (max-width: 564px) {
  .oc-banner {
    .oc-title {
      font-size: 22px;
    }

    .oc-intro {
      font-size: 14px;
    }
  }
 
}
/**组织特点end */

/**组织负责人start */
.leader-profile {
 margin: 0 10%;
 display: flex;
 flex-wrap: wrap;
 justify-content: space-around;
 align-items: center;
}
.leader-profile > * {
 margin-bottom: 50px; /* 设置上下间隙的大小 */
}

.lp-photo {
 overflow: hidden;
 width: 430px;
 height: 400px;
 border-radius: 15px;
 img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.5s;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-delay: 0s;
  transition-property: transform;
  &:hover {
   transform: scale(1.1, 1.1);
  }
 }
}

.lp-intro-bg {
 position: relative;
 padding: 10px;
 width: 448px;
 height: auto;
 border-radius: 10px;
 background: rgba(204, 235, 211, 1);
 &::after {
  content: "";
  position: absolute;
  top: -15px;
  right: -15px;
  width: 50px;
  height: 50px;
  background-image: url("@/assets/images/about/pin_icon.svg");
  background-size: cover;
 }
}

.lp-intro-text {
 text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
 /** 文本1 */
 font-size: 18px;
 line-height: 1.5;
 color: rgba(38, 25, 13, 1);
 text-align: center;
}

@media screen and (max-width: 564px) {
  .lp-photo {
    height: 300px;
  }
  .lp-intro-bg {
    padding: 15px;
  }
  .lp-intro-text {
    text-align: left;
    font-size: 16px;
  }
}

/**组织负责人end */

/**组织核心成员start */
$cpImgWidth: 240px; /**肖像图高度 */
.core-profile {
 display: flex;
 flex-wrap: wrap;
 justify-content: space-around;
//  padding-left: 5%;
//  padding-right: 5%;
 padding-left: 60px;
 padding-right: 60px;
}

.cp-profile {
 align-items: center;
}

.cp-profile-img {
 position: relative;
 overflow: hidden;
 margin: auto;
 width: $cpImgWidth;
 height: $cpImgWidth;
 border-radius: 50%;
 border: 1px solid rgba(192, 192, 192, 1);
 img {
  height: $cpImgWidth;
  transition: transform 0.5s;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-delay: 0s;
  transition-property: transform;
  cursor: pointer;
 }
 img:hover {
  transform: scale(1.1, 1.1);
 }
}

.cp-profile-name {
 margin-top: 30px;
 margin-bottom: 20px;
 font-size: 25px;
 font-weight: 700;
 text-align: center;
}
.cp-intro-text {
 font-size: 14px;
 line-height: 1.7;
 text-align: center;
}

/**<1100px */
@media screen and (max-width: 1100px) {
 .core-profile {
  // justify-content: center;
  justify-content: space-around;

 }
 .cp-profile {
  padding: 30px 0;
 }
}
/**<800px */
@media screen and (max-width: 800px) {
 .core-profile {
  justify-content: center;
  padding: 0;
 }
 .cp-profile-img {
  width: 300px;
  height: 300px;
  img {
   height: 300px;
  }
 }
}
/**<765px */
@media screen and (max-width: 765px) {
  .core-profile {
  padding-left: 0;
  padding-right: 0;
  }
}
/**<564px */
@media screen and (max-width: 564px) {
 .cp-profile-img {
  width: 220px;
  height: 220px;
  img {
   height: 220px;
  }
 }
 .cp-profile {
  padding: 10px 0;
 }
}

/**组织核心成员end */

/**组织工作环境start */

.env {
 margin: 30px 10% 100px;
 height: auto;
 text-align: center;
 //  background: url(@/assets/images/about/working_enviroment.png) no-repeat;
 //  background-size: contain;
 img {
  display: inline-block;
  width: 85%;
  height: auto;
 }
}
/**<1100px */
@media screen and (max-width: 1100px) {
 .env {
  height: 400px;
 }
}
/**<992px */
@media screen and (max-width: 992px) {
 .env {
  height: 300px;
 }
}

/**<564px */
@media screen and (max-width: 564px) {
 .env {
  margin: 20px 2% 20px;
  height: 180px;
 }
}
/**组织工作环境end */

/**组织发展历程start */
// .dp-intro {
//  width: 895px;
//  height: 619px;
//  opacity: 1;
//  border: 35px solid rgba(255, 204, 138, 1);
//  margin-left: auto;
//  margin-right: auto;
//  margin-bottom: 30px;
// }

// @media screen and (max-width: 768px) {
//  .dp-intro {
//   width: 80%;
//  }
// }
/**组织发展历程start */
.dp-left-ball {
 position: absolute;
 left: -470px;
 top: -600px;
 overflow: hidden;
 z-index: -1;
 width: 840px;
 height: 840px;
 border-radius: 50%;
 background: linear-gradient(230deg, rgb(204, 235, 211) 0%, rgba(255, 255, 255, 0.85) 100%);
 transform: translate(100%, 100%);
 animation: btm-right-slide-in 0.8s forwards;
}
.dp-intro {
 width: 895px;
 height: 619px;
 opacity: 1;
 //border: 35px solid rgba(255, 204, 138, 1);
 margin-left: auto;
 margin-right: auto;
 margin-bottom: 30px;
}

@media screen and (max-width: 768px) {
 .dp-intro {
  width: 80%;
 }
}

// .dp-container {
//  position: relative;
// }

// .dp-title {
//  position: absolute;
//  top: -3em;
//  width: 100%;
//  margin: 0 auto;
//  //  z-index: 100;
// }

/**组织发展历程end */

/**组织发展历程end */
</style>
