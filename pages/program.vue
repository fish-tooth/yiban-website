<template>
 
  <div>
   <!-- 顶部背景 -->
   <div class="top-box">
    <div class="left-cube"></div>
    <div class="pre-photo">
     <img src="@/assets/images/program/top_demo.jpg" alt="伴学案例" />
    </div>

    <div class="right-cube">
     <div class="intro">
      <p>覆盖学生100000+</p>
      <p>媒体报道600余次</p>
      <br />
      <p>线上线下教学结合</p>
      <p>助力学生成长成才</p>
      <br />
      <p>与校企政组形成良好合作</p>
      <p>共同营造良好的公益教育生态</p>
     </div>
     <div class="lecture-box">
      <div class="course"><a href="#" class="courseTo">500+精品课堂 </a></div>
      <div class="lecture"><a href="#" class="lectureTo">100+线下成长营 </a></div>
     </div>
    </div>
    <p class="program-title">公益项目</p>
   </div>
   <!-- 伴学案例 -->
   <!-- <div class="mid-box module-margin">
    <div class="left-box">
     <p class="title module-title">云陪伴教育专项</p>
     <p class="text">
      从小缺乏父母陪伴的留守儿童，容易产生心智失衡、学业退步、人生偏航等问题。以伴依托教育部人文社科重大项目成果，通过招募全国优秀高校大学生志愿者，为全国的乡村留守儿童提供精准、专业、长效的系统智慧陪伴、朋辈结对陪伴、课程指导陪伴和营会社交陪伴，让乡村孩子更加健康快乐地成长，让社会变得更加和谐美好。
     </p>
    </div>
    <img class="video" src="/images/program/demo.jpg" />
   </div> -->

   <el-carousel
     class="pragram-carousel"
     :interval="4000"
     :initial-index="initialIndex"
     :show-arrow="showArrow"
     :autoplay="true"
     :autoplay-speed="autoplaySpeed"
     :loop="loop"
    >
    <el-carousel-item v-for="(item, index) of programDemo" :key="index">
      <div class="mid-box module-margin" v-if="isProgramShow">
        <div class="left-box">
          <p class="title module-title">{{ item.schoolName }}</p>
          <p class="text">
             {{ item.content }} <!-- content 尽量不要超过200个字符 -->
          </p>
        </div>
        <img class="video" :src="item.coverImg"/>
      </div>
    </el-carousel-item>
  </el-carousel>

   <!-- 数据展示 -->
   <el-row justify="space-around" class="dataShow">
    <el-col class="data-item" v-for="(item, index) in dataList" :key="index" :lg="6" :md="6" :sm="8" :xs="8">
     <div class="dataNum">
      <!-- <span style="border-bottom: 2px solid rgba(173, 106, 106, 1)">4</span> -->
      <CountTo v-if="isDataShow" :autoplay="autoplay" :start-val="0" :end-val="Number(item.data)" :duration="2000"/>
     </div>
     <div class="dataTitle">{{ item.title }}</div>
    </el-col>
   </el-row>
   <!-- 经典案例 -->
   <div class="botm-box module-margin">
    <div class="case-title module-title">
     <p style="padding-top: 10px">经典案例</p>
     <p class="split" style="font-size: 50px">|</p>
     <p style="padding-top: 10px">CASE</p>
    </div>
    <el-carousel v-if="isCaseShow"
     style="overflow: hidden"
     :interval="4000"
     :initial-index="initialIndex"
     :show-arrow="showArrow"
     :autoplay="false"
     :autoplay-speed="autoplaySpeed"
     :loop="loop"
    >
     <el-carousel-item v-for="(item, index) of programCases" :key="item.id">
      <div class="carousel-item-content">
       <!-- 左边卡片1 -->
       <div class="card-item">
        <NuxtLink class="case" :to="`/subpage/programDetail?id=${item.id}&type=program`" target="_blank">
         <img class="case-photo" :src="item.coverImg" />
         <div class="case-intro">
          <div>{{ item.title }}</div>
         </div>
        </NuxtLink>
        <!-- <div v-html="item.content"></div> -->
       </div>
       <!-- 右边卡片2 -->
       <div class="card-item">
        <NuxtLink class="case" :to="`/subpage/programDetail?id=${nextId(index)}&type=program`" target="_blank">
         <img class="case-photo" :src="getNextItemCoverImg(index)" />
         <div class="case-intro">
          <div class="case-name">{{ getNextItemTitle(index) }}</div>
         </div>
        </NuxtLink>
       </div>
      </div>
     </el-carousel-item>
    </el-carousel>
   </div>
  </div>
  <!-- 志愿者分享 -->
  <div class="blog-box">
   <div class="blog-title module-title">
    <div class="blog-img"></div>
    <div class="blog-intro">
     <div class="ch">志愿分享</div>
     <div class="split" style="font-size: 50px">|</div>
     <div class="en">BLOG</div>
    </div>
   </div>
   <div class="swiperBox">
    <VolunStoriesSwiper/>
   </div>
  </div> 
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getProgramData, getProgramInfo, getClassicCase } from "@/api/index";

useHead({
 title: "公益项目",
 titleTemplate(title) {
  return title ? `以伴-${title}` : "";
 },
 meta: [
  { name: "description", content: "以伴公益项目" },
  { name: "keywords", content: "以伴, 公益项目, 伴学案例, 志愿者故事"  },
 ],
});

// 专项对象数组定义
let programDemo = reactive<
 {
  id: Number,
  schoolName: String,  // 转项名
  coverImg: string,    // 封面图片
  content: String,     // 专项简介
  volunteerNum: Number, // 志愿者数量
  studentNum: Number,  // 学生数量
  courseNum: Number,  // 课程数量
  isShow: Boolean  // 是否展示
 }[]
>([]);
let isProgramShow = ref(false);
/**
* @description 获取专项展示列表
* @return void
*/
const getProgramDemo = async () => {
  // loading.value = true;
  try {
    let params = {
      isShow: true
    }
    const res = await getProgramInfo(params);
    if (res?.code === 0) {
      console.log()
      Object.assign(programDemo, res?.data.list)
      console.log('get:programDemo', programDemo);
      programDemo = programDemo.filter((item) => {
        return item.isShow == true;
      })
      isProgramShow.value = true;
    }
  } catch(error) {
    console.log("post:progamDemo:", error)
  }finally {
    // loading.value = false
  }
};

// 专项数据信息定义
const dataList = reactive([
 {
  title: "专项总数",
  data: 0,
 },
 {
  title: "志愿者总数",
  data: 0,
 },
 {
  title: "学生总数",
  data: 0,
 },
 {
  title: "课堂总量",
  data: 0,
 },
]);

let isDataShow = ref(false);
/**
* @description 获取专项的相关数据信息
* @return void
*/
const getDataList = async () => {  
  try {
    const res = await getProgramData();
    console.log('get:dataList',res);
    if (res?.code == 0) {
      // Object.assign(dataList, res?.data);
      dataList[0].data = res.data.allSchoolNum + 120;
      dataList[1].data = res.data.allVolunteerNum;
      dataList[2].data = res.data.allStudentNum;
      dataList[3].data = res.data.allCourseNum;
      isDataShow.value = true;
    }
  } catch (error) {
    console.log("get:dataList",error);
  }
}

// 伴学案例对象数组定义
let programCases = reactive<
 { 
  id: number, 
  title: string,   // 伴学案例标题
  coverImg: string, // 封面图片
  content: string   // 具体内容 
 }[]>([]);
let isCaseShow = ref(false);

/**
 * @description 获取伴学经典案例
 * @return void
 */
const getCasesList = async() => {
  try {
    const res = await getClassicCase();
    if(res?.code === 0) {
      console.log('classic cases:', res);
      programCases = res?.data;
      isCaseShow.value = true;
    }
  } catch (error) {
    console.log(error)
  }
}

// 志愿者故事对象数组定义
let volunStory = reactive<
 { 
  id: number, 
  title: string,   // 志愿者故事标题
  coverImg: string, // 封面图片
  introduction: string, // 故事简介
  content: string   // 具体内容 
 }[]>([]);

// 伴学案例
// 当前展示的卡片索引
// const currentIndex = 0;

// 初始索引为 1，展示第一个卡片和第二个卡片
const initialIndex = ref(1);

// 是否显示箭头
const showArrow = ref(true);

// 自动播放速度
const autoplaySpeed = ref(5000);

// 是否循环滚动
const loop = ref(true);

// 轮播图高度
const carouselHeight = "800px";

/**
 * @description 获取下一个卡片的真实id
 * @param {number} currentIndex 
 * @return {string} programCases[nextIndex].id
 */
const nextId = (currentIndex: number): number => {
  const nextIndex = currentIndex === programCases.length - 1 ? 0 : currentIndex + 1;
  return programCases[nextIndex].id;
}

/**
 * @description 获取下一个卡片的标题
 * @param {number} currentIndex 
 * @return {string} programCases[nextIndex].title
 */
const getNextItemTitle = (currentIndex: number): string => {
 const nextIndex = currentIndex === programCases.length - 1 ? 0 : currentIndex + 1;
 return programCases[nextIndex].title;
};

/**
 * @description 获取下一个卡片的封面图片
 * @param {number} currentIndex 
 * @return {string} programCases[nextIndex].coverImg
 */
const getNextItemCoverImg = (currentIndex: number): string => {
 const nextIndex = currentIndex === programCases.length - 1 ? 0 : currentIndex + 1;
 return programCases[nextIndex].coverImg;
};

/**
 * @description 获取下一个卡片的跳转链接
 * @param {number} currentIndex 
 * @return {string} programCases[nextIndex].content
 */
const getNextItemContent = (currentIndex: number): string => {
 const nextIndex = currentIndex === programCases.length - 1 ? 0 : currentIndex + 1;
 return programCases[nextIndex].content;
};

const animatedData = ref<NodeListOf<HTMLElement> | null>(null);
const isElementInViewport = (el: HTMLElement) => {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= window.innerHeight
  );
};
let autoplay = ref(false);
// 滚动事件监听：到指定位置计数器开始计数
const handleScroll = function(){
  if (animatedData.value) {
  animatedData.value.forEach((data) => {
      if (isElementInViewport(data)) {
        autoplay.value = true;
      }
    });
  }
}

// 监听依赖更新
watchEffect(() => {
 // getDataList();
 // getCases();
 getDataList();
//  getCasesList();
});

onMounted(() => {
  let isShow: Boolean = true;
  getProgramDemo();
  getCasesList();
  animatedData.value = document.querySelectorAll('.dataNum');
  window.addEventListener('scroll', handleScroll, true);
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
:deep(.el-carousel__container) {
 height: 550px;
}

@media screen and (max-width: 768px) {
  :deep(.el-carousel__container) {
    height: 400px;
  }
}


/**顶部样式 */

/**顶部背景右方块高度 */
$rightCubeHeight: 650px;
.top-box {
 overflow: hidden;
 //  display: flex;
 display: relative;
 width: 100%;
 height: 550px;
 align-items: center;
 clear: both;
}
@keyframes left-slide-in {
 0% {
  opacity: 0;
  transform: translate(-20%, -10%);
 }
 100% {
  opacity: 1;
  transform: translate(0, 0);
 }
}
.left-cube {
 position: absolute;
 overflow: hidden;
 left: 220px;
 top: 80px;
 z-index: 2;
 width: 30%;
 height: 320px;
 background: linear-gradient(-60deg, rgba(237, 157, 157, 1) 70%, rgba(224, 184, 184, 0.01) 100%);
 //  box-shadow: 10px 25px 8px 15px rgb(0 0 0 / 25%);
 box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
 animation: left-slide-in 0.8s forwards;
}
.right-cube {
 position: absolute;
 overflow: hidden;
 right: 200px;
 top: 100px;
 z-index: 1;
 //  width: 56%;
 width: 45%;
 //  height: $rightCubeHeight;
 height: 530px;
 background: rgba(223, 114, 113, 1);
  // box-shadow: 18px 12px 12px 6px rgba(0, 0, 0, 0.25);
//  background: linear-gradient(-80deg, rgba(223, 114, 113, 1) 70%, rgba(224, 184, 184, 0.7) 100%);
 box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
@keyframes btm-slide-in {
 0% {
  opacity: 0;
  transform: translate(-30%, 20%);
 }
 100% {
  opacity: 1;
  transform: translate(0, 0);
 }
}
.pre-photo {
 position: absolute;
 left: 210px;
 top: 330px; 
 z-index: 3;
 /**增  */
 overflow: hidden;
 background-color: beige;
//  width: 400px;
 width: 30%;
 height: 300px;
 animation: btm-slide-in 0.8s forwards;
 img {
  width: 100%;
  height: 100%;
  -webkit-mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0) 85%);
  mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0) 85%);
 }
}

@keyframes title-fade-in {
 from {
  opacity: 0;
 }
 to {
  opacity: 1;
 }
}
.program-title {
 position: absolute;
 top: 180px;
//  left: 500px;
  left: 40%;
 font-family: "Alibaba Sans Black";
 font-size: 60px;
 color: rgba(255, 255, 255, 1);
 z-index: 3;
 animation: title-fade-in 1.5s ease-in-out forwards;
}

/**简介文本样式 */
.intro {
 margin-top: 120px;
 margin-right: 80px;
 font-size: 18px;
 color: rgba(255, 255, 255, 1);
 text-align: right;
 animation: title-fade-in 1.5s ease-in-out forwards;
}
.lecture-box {
  float: right; 
  margin-top: 34px; 
  margin-right: 88px;
}
.course,
.lecture {
 display: flex;
 width: 150px;
 height: 50px;
 line-height: 50px;
 border: 2px solid rgba(255, 255, 255, 1);
 text-align: center;
 justify-content: center;
 align-items: center;
 animation: title-fade-in 1.5s ease-in-out forwards;
}

.lecture {
 border-top: 0;
}

.courseTo,
.lectureTo {
 font-size: 18px;
 line-height: 66px;
 color: rgba(255, 255, 255, 1);
 text-decoration: none;
 animation: title-fade-in 1.5s ease-in-out forwards;
}

// 1200px
@media screen and (max-width: 1200px) {
 .left-cube {
  top: 80px;
  left: 12%;
  width:40%;
  height: 330px;
 }

 .right-cube {
  top: 100px;
  right: 12%;
  height: 530px;
 }

 .intro,
 .courseTo,
 .lectureTo {
  font-size: 18px;
 }
 
 .intro, .lecture-box {
  margin-right: 30px;
 }
  
 .pre-photo {
  left: 10%;
  top: 330px;
  width: 40%;
  height: 300px;
 }

 .program-title {
  top: 170px;
  left: 35%;
  font-size: 60px;
 }
}

// 768px
@media screen and (max-width: 768px) {
 .intro {
  font-size: 16px;
  margin-top: 150px;
 }

 .courseTo,
 .lectureTo {
  font-size: 16px;
 }

 .program-title {
  left: 15%;
 }

 .pre-photo {
  left: 10%;
  top: 330px;
  height: 300px;
 }
}

// 564px
@media screen and (max-width: 564px) {
  .left-cube {
    display: none;
  }
  .right-cube {
    left: 10%;
    width: 80%;
  }
 .pre-photo {
  display: none;
 }
}

// 伴学案例样式
.mid-box {
 display: flex;
 flex-wrap: wrap;
 overflow: hidden;
 margin-top: 200px;
 padding: 0 100px;
 align-items: center;
 .left-box {
  // overflow: hidden;
  flex: 1;
  flex-shrink: 0; /* 防止盒子缩小 */
  .title {
   height: 100px;
   font-family: sans-serif;
   font-size: 35px;
   font-weight: 700;
   color: rgba(0, 0, 0, 1);
   text-align: left;
  }

  .text {
   font-family: sans-serif;
   font-size: 18px;
   line-height: 1.5;
   color: rgba(0, 0, 0, 1);
   text-align: justify;
  }

 }
 .video {
  flex: 0.7;
  flex-shrink: 0; /* 防止盒子缩小 */
  display: inline-block;
  margin-left: 60px;
  height: 300px;
  min-height: 250px;
  border-radius: 13px;
 }
}

/** 1200px */
@media screen and (max-width: 1200px) {
 .mid-box {
  display: block;
  margin-top: 180px;
  text-align: center;
  .video {
    display: none;
   margin-top: 60px;
  }
 }
}
// :deep(.el-carousel) {
//   background: rgba(255, 0, 0, 0.2);
//   height: 200px;

//   .el-carousel__container {
//     padding: 0;
//     height: 200px;
//   }
// }

/** 992px */
@media screen and (max-width: 992px) {
 .mid-box {
  padding: 0 60px;
 .left-box {
  width: 100%;
  height: auto;
  .title {
   font-size: 28px;
  }
 
  .text {
   font-size: 18px;
  }
  $moreToHeight: 51px;
  .more {
   width: 200px;
   height: $moreToHeight;
  }

  .more-to {
   height: $moreToHeight;
   line-height: $moreToHeight;
  }
 }
 .video {
  margin-top: 10px;
  margin-left: 80px;
 }
}
}

/** 564px */
@media screen and (max-width: 564px) {
 .mid-box {
  padding: 0 20px;
 .left-box {
  width: 100%;
  height: auto;
  .title {
   font-size: 25px;
  }
 
  .text {
   font-size: 16px;
  }
  $moreToHeight: 51px;
  .more {
   width: 200px;
   height: $moreToHeight;
  }
 }
 .video {
  margin-top: 10px;
  margin-left: 80px;
 }
}
}

// 数据展示
$dataShowHeight: 171px;
$dataNumHeight: 72px;
$dataTitleHeight: 44px;
@mixin changeFontSize($dataNumFontSize: 50px, $dataTitleFontSize: 25px) {
 .dataNum {
  font-size: $dataNumFontSize;
 }
 .dataTitle {
  font-size: $dataTitleFontSize;
 }
}
@include changeFontSize();
.dataShow {
 display: flex;
 margin: 0 auto;
//  margin-top: 100px;
 width: 100%;
 height: auto;
 min-height: $dataShowHeight;
 opacity: 1;
 background: linear-gradient(
  180deg,
  rgba(223, 114, 113, 0) 0%,
  rgba(222, 115, 113, 0.08) 29%,
  rgba(222, 115, 113, 0.15) 84%
 );
 align-items: center;
}
.data-item {
 width: 25%;
//  height: $dataShowHeight;
 line-height: $dataShowHeight;
}
.dataNum {
 display: flex;
 justify-content: center;
 height: $dataNumHeight;
 line-height: $dataNumHeight;
}

.dataTitle {
 display: flex;
 justify-content: center;
 height: $dataTitleHeight;
 line-height: $dataTitleHeight;
}
/**1200px */
@media screen and (max-width: 1200px) {
 @include changeFontSize(40px, 27px);
}
/**992px */
@media screen and (max-width: 992px) {
 $dataShowHeight: 93px;
 @include changeFontSize(38px, 24px);
}

/**768px */
@media screen and (max-width: 768px) {
 @include changeFontSize(30px, 20px);
}

/**经典案例样式 */
.botm-box {
 overflow: hidden;
 //  overflow-x: hidden;
 margin-left: auto;
 margin-right: auto;
 padding-left: 5%;
 padding-right: 5%;
 width: 100%;
}

.el-carousel-item {
 height: 500px;
}

.carousel-item-content {
 display: flex;
 //  justify-content: space-around;
 justify-content: space-evenly;
}
.card-item {
 width: 580px;
 height: 500px;
 min-height: 500px;
 padding: 70px;
 text-align: center;
 border-radius: 4px;
 cursor: pointer;
}

@media screen and (max-width: 1000px) {
 .card-item:nth-child(1) {
  width: 600px;
 }

 .card-item:nth-child(2) {
  display: none;
 }
 .card-item {
  width: 580px;
  padding: 60px;
  text-align: center;
 }
}

.case-title {
 display: flex;
 font-family: sans-serif;
 font-size: 38px;
 font-weight: 500;
 color: rgba(0, 0, 0, 1);
 justify-content: center;
}

.case {
 display: inline-block;
 width: 100%;
 height: auto;
}

.case-photo {
 width: 100%;
 height: 300px;
 border-radius: 13px;
 object-fit: cover;
}
.case-intro {
//  overflow: hidden;
 margin: 0 auto;
 padding: 10px;
 height: auto;
 line-height: 1.5;
 font-size: 18px;
 text-align: center;
 background: rgba(255, 255, 255, 1);
 box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 1200px) {
 .case-title {
  flex-wrap: wrap;
  margin: 0 auto;
  width: 200px;
  height: auto;
  justify-content: center;
 }

 .split {
  display: none;
 }

 .card-item {
  // width: 500px;
  padding: 30px;
  text-align: center;
 }
 .case-intro {
  width: 100%;
  font-size: 16px;
 }
}

@media screen and (max-width: 768px) {
  .card-item {
    padding: 30px;
  }
}

:deep(.el-carousel__indicators) {
 display: none !important;
}

/** 志愿分享blog */
.blog-box {
 width: 100%;
 background: rgba(223, 114, 113, 0.15);
 padding-bottom: 100px;
}

.blog-title {
 display: flex;
 padding-top: 30px;
 width: 100%;
 height: auto;
 font-size: 38px;
}
.blog-img {
 display: inline-block;
 margin: 0 20px;
 width: 100px;
 height: 130px;
 background: url(@/assets/images/flower.png) no-repeat;
 background-blend-mode: multiply;
 background-size: 100%;
}
.blog-intro {
 display: flex;
 margin: auto 0;
 height: 70px;
 line-height: 70px;
 font-family: sans-serif;
 font-weight: 500;
 .ch,
 .en {
  display: inline-block;
 }
}
.swiperBox {
 margin: 0 auto;
 width: 80%;
}

/**768px */
@media screen and (max-width: 768px) {
 .blog-box {
  margin-top: 20%;
  height: auto;

  .blog-intro {
   flex-wrap: wrap;
   width: 198px;
   height: auto;
   justify-content: left;

   .ch {
    display: block;
    border-right: 0px solid #000;
    font-size: 33px;
   }
   .en {
    margin-top: 10px;
    display: block;
    font-size: 33px;
    border-top: 2px solid #000;
   }
  }
 }
}
</style>
