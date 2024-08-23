<template>
 
  <div>
   <!-- 顶部背景 -->
   <!-- <div class="top-box"></div> -->
   <!-- 顶部背景组件 -->
   <Support style="text-align: right" :titleCh="titleCh" :titleEn="titleEn" />
   <!-- 导航栏 -->
   <div class="tabbar">
    <li
     v-for="(list, index) in tabbar"
     :key="index"
     @click="active = list.id"
     :class="['tab-item', list.id === active ? 'tab-active' : '']"
    >
     <div @click="switchTab(list.id)">
      {{ list.name }}
     </div>
     <div class="border"></div>
    </li>
   </div>
   <!-- 项目展示列表 -->

   <!-- 项目推广 -->
   <div class="program-list loading" v-if="isShow[0]">
    <div v-for="(program, id) of allPrograms" :key="id" v-if="isProgramVdoShow">
      <div class="program-title">
      <p>{{ program.programName }}</p>
      <a :href="program.moreVideo" class="more-program" target="_blank">查看更多 ></a>
      </div>
      <div>
      <el-row justify="space-between" class="program-content">
        <el-col
        :lg="7"
        :md="7"
        :sm="11"
        :xs="24"
        :xl="30"
        class="program-block"
        v-for="(item, index) of program.videoList"
        :key="index"
        >
        <a :href="item.link" target="_blank">
        <img class="program-cover-img" :src="item.coverImg" />
        <div>
          <p class="item-title">{{ item.title }}</p>
          <!-- <p class="item-intro">项目简介{{ item.introduction }}</p> -->
        </div>
        </a>
        </el-col>
      </el-row>
      </div>
    </div>
   </div>

   <!-- 创始人采访 -->
   <div class="interview-content" v-if="isShow[1]">
    <div class="ic-block">
     <!-- <el-col :span="7" :lg="7" :md="7" :sm="11" :xl="11" :xs="24" class="program-block"> -->
     <!-- <video class="interview-video" src="" poster="@/assets/images/interview_coverImg.png"></video> -->
     <!-- <VideoPlayer v-if="isVideoShow" :src="videoSrc" :poster="videoPoster"  :borderRadius="15" class="video-box" :width=680 :height=380 /> -->

     <el-carousel v-if="isVideoShow" :autoplay="false" indicator-position="outside" style=" text-align: center;" :initial-index="initialIndex">
        <el-carousel-item v-for="(item, index) of founderVideoList" :key="index">
          <!-- <VideoPlayer ref="videoPlayers" id="video" class="video-box" :video-id="'video'+item.id" :src="item.link" :poster="item.coverImg" :width="videoWidth" :height="videoHeight" @play="videoPlay(item.id+'')" @video-play="handleVideoPlay(item.id+'')" @video-pause="handleVideoPause(item.id+'')"/>  -->
          <VideoPlayer ref="videoPlayers" id="video" class="video-box" :video-id="'video'+item.id" :src="item.link" :poster="item.coverImg" :width="videoWidth" :height="videoHeight"/> 
        </el-carousel-item>
      </el-carousel>
      <!-- <VideoPlayer v-if="isVideoShow" :video-id="'video'+founderVideoList[0].id" :src="founderVideoList[0].link" :poster="founderVideoList[0].coverImg"  :borderRadius="15" class="video-box" :width=680 :height=380 /> 
      <VideoPlayer v-if="isVideoShow" :video-id="'video'+founderVideoList[1].id" :src="founderVideoList[1].link" :poster="founderVideoList[1].coverImg"  :borderRadius="15" class="video-box" :width=680 :height=380 />  -->

     <div class="intro-cover">
      <p class="ic-name">龚旺</p>
      <p class="ic-title">以伴青少年发展中心理事长</p>
      <p class="ic-text">
       2022年第四季度广州好人 <br />
       广东公益创业优秀组织创始人 <br />
       共青团中央全国向上向善好青年
      </p>
     </div>
     <!-- </el-col> -->
    </div>
   </div>

   <!-- 自研课程 -->
   <div class="program-list" v-if="isShow[2]">
    <!-- <div class="program-title">
     <p>自研课程</p>
     <div class="more-program" @click="open">查看更多 ></div>
    </div> -->
    <div v-for="(course, id) of allCourses" :key="id" v-if="isCourseVdoShow">
      <div class="program-title">
      <p>{{ course.courseTag }}</p>
      <div class="more-program" @click="open">查看更多 ></div>
      </div>
      <div>
      <el-row justify="space-between" class="program-content">
        <el-col
        :span="7"
        :lg="7"
        :md="7"
        :sm="11"
        :xs="24"
        :xl="30"
        class="course-block"
        v-for="(item, index) of course.courseVideoList"
        :key="index"
        >
        <!-- <a :href="item.link" target="_blank"> -->
        <NuxtLink :to="`/subpage/videosDetail?id=${item.id}&tag=${item.tag}`" target="_blank">
          <img class="program-cover-img" :src="item.coverImg" />
          <div style="padding: 20px">
            <p class="item-title">{{ item.title }}</p>
            <!-- <p class="item-intro">项目简介{{ item.introduction }}</p> -->
          </div>
        <!-- </a> -->
        </NuxtLink>
        </el-col>
      </el-row>
      </div>
    </div>

    <!-- <div>
     <el-row justify="space-around" class="program-content">
      <el-col
       :span="7"
       :lg="7"
       :md="7"
       :sm="11"
       :xs="24"
       :xl="30"
       class="course-block"
       v-for="(item, index) of courseVideoList"
       :key="index"
      >
        <a :href="item.link" target="_blank">
        <img class="program-cover-img" :src="item.coverImg" />
       <div style="padding: 30px">
        <p class="course-item-title">{{ item.title }}</p>
       </div>
      </a>
      </el-col>
     </el-row>
    </div> -->
   </div>
  </div>
</template>

<script setup lang="ts">
import { getVideoByID, getVideoPage } from '@/api';

useHead({
 title: "公益视频",
 titleTemplate(title) {
  return title ? `以伴-${title}` : "";
 },
 meta: [
  { name: "description", content: "以伴公益视频" },
  { name: "keywords", content: "公益视频, 创始人视频, 课程" },
 ],
});

const titleCh = "公益视频";
const titleEn = reactive(["Public Welfare", "Videos"]);

// 导航栏定义
const tabbar = reactive([
 {
  id: 0,
  name: "项目推广",
 },
 {
  id: 1,
  name: "创始人采访",
 },
 {
  id: 2,
  name: "自研课程",
 },
]);

let isShow = [true, false, false];
const switchTab = function (id: number) {
 // 切换选项 显示对应内容
 isShow.forEach((item, index, arr) => {
  arr[index] = false;
  // console.log('item:',item)
 });
 isShow[id] = true;
 console.log("curId:", id);
 console.log("isShow:", isShow);
};

// 定义视频类型
type Video = {
  id: number,
  title: string,    // 标题
  coverImg: string,  // 视频封面
  introduction?: string,  // 视频简介
  link: string,  // 视频链接
  tag: string,  // 视频所属项目标签 【项目推广】difficult: 困难项目  left-behind: 留守项目 cover: 云陪伴项目
};

// 全部项目
let allPrograms = reactive<{
  programName: string,
  videoList: Video[], // 
  moreVideo: string  // 更多视频
}[]>([]);

let isProgramVdoShow = ref(false);

// 项目推广视频（抖音）
let programVideo = reactive<Video[]>([]);
let program1 = reactive<Video[]>([]);
let program2 = reactive<Video[]>([]);

/**
 * @description 初始化视频内容
 * @return void
 */
const initVideoSource = () => {

  programVideo = [{
    id: 1,
    title: '困难儿童陪伴计划项目点征集',
    coverImg: '/images/videos/kunnan1.jpg',
    introduction: '',
    link: 'https://www.douyin.com/user/MS4wLjABAAAAv46n1aVR2Haa3jWfA4-rGw2wUKZ3nuSKJ3ePNUjl9V0?modal_id=7291575893997260073',
    tag: 'difficult',
  },{
    id: 2,
    title: '让爱来，让碍走',
    coverImg: '/images/videos/kunnan2.jpg',
    introduction: '',
    link: 'https://www.douyin.com/user/MS4wLjABAAAAv46n1aVR2Haa3jWfA4-rGw2wUKZ3nuSKJ3ePNUjl9V0?modal_id=7276435011757215036',
    tag: 'difficult',
  },{
    id: 3,
    title: '努力让每个孩子都有美好的童年',
    coverImg: '/images/videos/kunnan3.jpg',
    introduction: '',
    link: 'https://www.douyin.com/user/MS4wLjABAAAAv46n1aVR2Haa3jWfA4-rGw2wUKZ3nuSKJ3ePNUjl9V0?modal_id=7239945993955921191',
    tag: 'difficult',
  },{
    id: 4,
    title: '留守儿童的认知危机更需要关注',
    coverImg: '/images/videos/liushou2.jpg',
    introduction: '',
    link: 'https://www.douyin.com/user/MS4wLjABAAAA9v-ve_UHoqbKFNoBtQaFzRqRnel0LO5iagq6Azskot8?modal_id=7275286982127799615',
    tag: 'left-behind',
  },{
    id: 5,
    title: '佛山电翰和卢卡斯携手以伴，点亮乡村孩子成才梦',
    coverImg: '/images/videos/liushou1.jpg',
    introduction: '',
    link: 'https://www.douyin.com/user/MS4wLjABAAAAv46n1aVR2Haa3jWfA4-rGw2wUKZ3nuSKJ3ePNUjl9V0?modal_id=7318674524248083750',
    tag: 'left-behind',
  },{
    id: 6,
    title: '2023倒计时虽已开始，但时间的脚步不停，我们的陪伴不止',
    coverImg: '/images/videos/liushou3.jpg',
    introduction: '',
    link: 'https://www.douyin.com/user/MS4wLjABAAAAv46n1aVR2Haa3jWfA4-rGw2wUKZ3nuSKJ3ePNUjl9V0?modal_id=7318763913913404706',
    tag: 'left-behind',
  },]
  program1 = programVideo.filter((item) => {
    return item.tag == 'difficult'
  })
  program2 = programVideo.filter((item) => {
    return item.tag == 'left-behind'
  })
  allPrograms = [{
    programName: '困难儿童陪伴计划',
    videoList: program1,
    moreVideo: 'https://www.douyin.com/search/%23%E5%9B%B0%E9%9A%BE%E5%84%BF%E7%AB%A5%E9%99%AA%E4%BC%B4%E8%AE%A1%E5%88%92?aid=a4d30c5c-b778-4628-87be-a655064dea7c&enter_from=discover&source=normal_search',
  },{
    programName: '留守儿童云陪伴计划',
    videoList: program2,
    moreVideo: 'https://www.douyin.com/search/%23%E7%95%99%E5%AE%88%E5%84%BF%E7%AB%A5%E4%BA%91%E9%99%AA%E4%BC%B4%E8%AE%A1%E5%88%92?aid=7a23a0d4-0286-4943-bc6b-1d4ef4df7127&publish_time=0&sort_type=0&source=normal_search&type=general',
  },
  // {
  //   programName: '以伴云陪伴计划',
  //   videoList: programVideo
  // }
  ]
  console.log('all', allPrograms);
  isProgramVdoShow.value = true;
}


const active = ref(0);
let isVideoShow = ref(false);
let founderVideoList =  reactive<Video[]>([]);
let videoSrc: string;
// 初始索引为 1，展示第一个卡片和第二个卡片
const initialIndex = ref(1);
/**
 * @description 获取创始人简介视频
 * @return void
 */
const getFounderVideo = async() => {
  try {
    let params = { pageNo: 1, pageSize: 10, tag: 'founder_intro' };
    
    let res = await getVideoPage(params);
    founderVideoList = res.data.list   // 创始人视频
    isVideoShow.value = true;
    console.log('founderVideoList:', founderVideoList);
  } catch (error) {
    console.log('post:video',error);
  }
}


let videoWidth = ref(800);
let videoHeight = ref(450);
// let carouselWidth = ref('800px');
// let carouselHeight = ref('580px');
/**
 * @description 根据屏幕宽度调整样式
 */
 const reactAdjust = () => {
  if(process.client) {
    const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
    console.log('当前浏览器宽度：', screenWidth.value);
    if(screenWidth.value <= 1200 && screenWidth.value > 992) {
      videoWidth.value = 800;
      videoHeight.value = 500;
    }else if(screenWidth.value <= 992 && screenWidth.value > 764) {
      videoWidth.value = 760;
      videoHeight.value = 400;
    }else if(screenWidth.value <= 764 && screenWidth.value > 564) {
      videoWidth.value = 560;
      videoHeight.value = 360;
    }else if(screenWidth.value <= 564) {
      // carouselWidth.value = '400px';
      // carouselHeight.value = '250px';
      videoWidth.value = 370;
      videoHeight.value = 220;
    }
  }
  
}

watchEffect(() => {
  reactAdjust();
})

// 控制视频播放和暂停
// const videoPlayers = ref<any>([]);
// const videoPlayStatus: Record<string, boolean> = reactive({});
// const videoPlay = (videoId: string) => {
//   for (const id in videoPlayStatus) {
//     console.log("videoPlayStatus id:",id);
//     if (id !== videoId && videoPlayStatus[id]) {
//       videoPlayers.value[id].pause();
//       videoPlayStatus[id] = false;
//     }
//   }
//   videoPlayStatus[videoId] = true;
// };

// const handleVideoPause = (videoId: string) => {
//   videoPlayStatus[videoId] = false;
// };

// const handleVideoPlay = (videoId: string) => {
//   console.log('video ref:', videoPlayers.value)
//   // videoPlayStatus[videoId] = true;
//   for (const id in videoPlayStatus) {
//     console.log("videoPlayStatus id:",id);
//     if (id !== videoId && videoPlayStatus[id]) {
//       videoPlayers.value[id].pause();
//       videoPlayStatus[id] = false;
//     }
//   }
//   videoPlayStatus[videoId] = true;
// };
//

// 定义课程类型
type courseVideo = {
  id: string,         // 视频id
  title: string,      // 视频标题
  content: string,    // 视频简介
  coverImg: string,   // 视频封面
  createTime: string, // 创建时间
  duration: string,   // 视频时长
  link: string,       // 视频链接
  tag: string;       // 视频标签
}
// 全部课程
let allCourses = reactive<{
  courseTag: string,  // 课程标签
  courseVideoList: courseVideo[], // 
  // moreVideo: string  // 更多视频
}[]>([]);

let courseVideoList = reactive<courseVideo[]>([]);
let course1 = reactive<courseVideo[]>([]);
let course2 = reactive<courseVideo[]>([]);
let isCourseVdoShow = ref(false);

/**
 * @description 初始化课程视频
 * @return void
 */
const initCourseVideo = () => {
  course1 = courseVideoList.filter((item) => {
    return item.tag == 'psy_course'
  })
  course2 = courseVideoList.filter((item) => {
    return item.tag == 'science_course'
  })
  allCourses = [{
    courseTag: '心理课程',
    courseVideoList: course1,
  },{
    courseTag: '科普课程',
    courseVideoList: course2,
  },]
}

// 查看更多 弹窗
const open = () => {
  ElMessage({
    showClose: true,
    message: "请前往 “以伴云陪伴”微信小程序 查看更多课程",
    type: "error",
    // customClass: "elmessage",
    icon: 'none', 
  })
}

/**
 * @description 分页获取视频
 * @return void
 */
const getCourseVideo = async()=>{
  try {
    let params = {
      pageNo:1,
      pageSize: 9,
    }
    const res = await getVideoPage(params);
    courseVideoList = res.data.list   // 自研课程
    initCourseVideo();
    isCourseVdoShow.value = true;
  } catch (error) {
    console.log('get:video',error);
  }
}

onMounted(async() => {
  initVideoSource();
  getFounderVideo();
  await getCourseVideo();
})

</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
body {
 font-family: "Alibaba Sans Black";
}

/**导航栏 */

.tabbar {
 display: flex;
 width: 100%;
 height: 80px;
 border: 1px solid rgba(224, 224, 224, 1);
 -webkit-user-select: none;
 user-select: none;
}

.tabbar > li {
 flex: 1;
}

.tab-item {
 padding-left: 50px;
 padding-right: 50px;
 width: 180px;
 height: 100%;
 line-height: 75px;
 font-size: 28px;
 text-align: center;
 list-style-type: none;
}
/**992px */
@media screen and (max-width: 992px) {
 .tab-item {
  font-size: 26px;
 }
}
/**768px */
@media screen and (max-width: 768px) {
 .tab-item {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 20px;
 }
}
/**564px */
@media screen and (max-width: 564px) {
 .tab-item {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 18px;
 }
}

.tab-active {
 .border {
  margin: 0 10%;
  height: 4px;
  background-color: rgba(222, 114, 111, 1);
  animation-duration: 0.3s;
  animation-timing-function: ease;
  animation-name: slide;
  transition: left ease-out 0.3s;
 }

 @keyframes slide {
  from {
   transform: translateX(7%);
  }

  to {
   transform: translateX(0%);
  }
 }
}

/**项目展示列表 */
.program-list {
 margin: 60px 13%;
}
.loading {
  min-height: 700px;
}
.program-title {
 display: flex;
 align-items: center;
 justify-content: space-between;

 p {
  font-size: 28px;
 }
}

.more-program {
 display: inline-block;
 font-size: 20px;
 cursor: pointer;
}

@media screen and (max-width: 750px) {
 .program-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
   font-size: 25px;
  }
 }

 .more-program {
  display: inline-block;
  font-size: 16px;
 }
}

@media screen and (max-width: 564px) {
 .program-title {
  display: block;
  p {
    font-size: 18px;
  }
 }

 .more-program {
  
  float: right;
 }
}

// .el-row {
//   display: flex !important;
//   margin-bottom: 20px !important;
// }
// .el-row:last-child {
//   margin-bottom: 0;
// }
// .el-col {
//   display: flex !important;
//   margin-top: 40px !important;

// }

// .grid-content {
//   border-radius: 4px;
//   min-height: 36px;
// }

// .el-card, .el-card__body {
//     display: flex !important;
//     padding: 0 !important;
//     width: 100% !important;
//     height: auto !important;
//     min-height: 433px !important;
//     background-color: rgba(238, 106, 107, 1) !important;
// }

/**项目图片 */
.program-content {
 display: flex;
 flex-wrap: wrap;
 text-align: center;
//  margin: 0 10%;
 margin-top: 40px;

 .program-block {
  overflow: hidden;
  width: 300px !important;
  height: auto;
  min-height: 280px;
  margin-left: 1%;
  margin-bottom: 100px;
  border-radius: 10px;
  background: rgb(233, 233, 233);
  background: rgb(255, 255, 255);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  transition: all 0.4s ease;
  &:hover {
    // background: rgb(248, 248, 248);
    background: rgb(238, 238, 238);
  }
  .program-cover-img {
   width: 100%;
   height: 200px;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;  
   object-fit: cover;
  //  transition: all 0.4s ease;
  //  &:hover {
  //   transform: scale(1.1);
  //  }

  }

  .item-title {
    padding: 20px;
   text-align: left;
   font-size: 16px;
  //  color: rgb(143, 135, 135);
   color: rgb(98, 93, 93);
  }

  .item-intro {
   margin-top: 15px;
  }
 }
}

@media screen and (max-width: 768px) {
  .program-content {
    .program-block {
      min-height: 380px;
      .program-cover-img {
        height: 300px;
        }
    }
  }
}
/**创始人采访 */
.interview-content {
 position: relative;
 display: flex;
 margin-top: 50px;
 margin-bottom: 80px;
 justify-content: center;
 .ic-block {
  width: 80%;
  margin: 0 auto;
 }
}

:deep(.el-carousel__container) {
 height: 480px;
}

/* 当屏幕宽度小于768px时，高度设置为400px */
@media screen and (max-width: 768px) {
  :deep(.el-carousel__container) {
    height: 400px;
  }
}

/* 当屏幕宽度小于564px时，高度设置为400px */
@media screen and (max-width: 564px) {

  .interview-content {
    margin-bottom: 40px;
    .ic-block {
      width: 90%;
    }
  }
  :deep(.el-carousel__container) {
    height: 250px;
  }
}

.video-box {
 display: inline-block;
//  border-radius: 15px;
 object-fit: cover;
 background-color: rgba(239, 107, 112, 1);
}
@keyframes left-slide-in {
 0% {
  opacity: 0;
  transform: translate(-20%, -10%);
 }
}
.intro-cover {
 overflow: hidden;
 position: absolute;
 top: 60px;
 left: 80px;
 padding: 40px;
 padding-top: 30px;
 width: 350px;
 height: 300px;
 border-top: 8px solid rgba(222, 114, 111, 1);
 box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
 text-align: left;
//  font-family: "Alibaba Sans Black";
 line-height: 1.5;
 color: rgba(41, 41, 41, 0.8);
//  background: rgba(255, 255, 255, 0.7);
//  background-image: url("@/assets/images/videos/gw_bg.jpg");
 background-size: contain;
 background-position: 170px 0;
 background-repeat: no-repeat;
 animation: left-slide-in 1s forwards;
 &::before {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
 }
 .ic-name {
  position: relative;
  font-size: 30px;
  // color: rgba(255,255,255,1);
 }
 .ic-title {
  position: relative;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 18px;
  // color: rgba(255,255,255,1);
 }
 .ic-text {
  position: relative;
  margin-top: 30px;
  font-size: 18px;
  line-height: 1.7;
  // color: rgba(255,255,255,1);
 }
}
/** <1200px */
@media screen and (max-width: 1200px) {
 .intro-cover {
  position: absolute;
  top: 100px;
  left: 40px;
  // width: 280px;
  height: auto;
  line-height: 1.2;
  .ic-name {
   font-size: 28px;
  }
  .ic-text {
   font-size: 16px;
  }
 }
}
/** <768px */
@media screen and (max-width: 768px) {
 .intro-cover {
  top: 0px;
  left: 20px;
  padding: 20px;
  width: 280px;
  height: auto;
  .ic-name {
   font-size: 28px;
  }
  .ic-text {
   font-size: 16px;
  }
 }
}
@media screen and (max-width: 564px) {
  .intro-cover {
    display: none;
  }
}

/**指示灯样式修改 */
// :deep(.el-carousel__indicators--horizontal) {
//  position: absolute;
//  left: auto;
//  right: 10px;
//  bottom: 10px;
//  text-align: center;
// }

:deep(.el-carousel__indicator--horizontal button) {
 width: 50px;
 height: 6px;
//  background: #ffffff;
 opacity: 0.4;
}

:deep(.el-carousel__indicator--horizontal.is-active button) {
 width: 50px;
 height: 6px;
 background: rgba(238, 106, 107, 0.8);
 opacity: 1;
}
/**自研课程 */
.course-block {
  overflow: hidden;
  width: 300px !important;
  height: 280px;
  margin-left: 1%;
  margin-bottom: 100px;
  border-radius: 10px;
  // background: rgb(238, 238, 238);
  background: rgb(255, 255, 255);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  transition: all 0.4s ease;
  &:hover {
    background: rgb(238, 238, 238);
  }
  .program-cover-img {
   width: 100%;
   height: 200px;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;  
   object-fit: cover;
  }
}
.course-item-title {
  text-align: center;
  color: rgb(98, 93, 93);
}

@media screen and (max-width: 768px) {
  .course-block {
    min-height: 380px;
    .program-cover-img {
      height: 300px;
      }
  }  
}

/**分页按钮 */
.pagination-box {
 margin: 56px 0 !important;
 width: 100%;
 height: auto;
}

.el-pagination.is-background .btn-next.is-active,
.el-pagination .is-background .btn-prev .is-active,
.el-pagination .is-background .el-pager li.is-active {
 --el-pagination-bg-color: rgba(238, 106, 107, 1) !important;
}

.el-pagination {
 --el-pagination-hover-color: rgba(238, 106, 107, 1);
 --el-pagination-bg-color: #d9d9d9;
 align-items: center;
 justify-content: center;
}

// .el-pagination.is-background .el-pager li:not(.disabled).active {
//         background-color: #67c23a;
//         color: #FFF !important;
//     }
//     .el-pager li:hover {
//         color: #67c23a !important;
//     }
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
 background-color: rgba(238, 106, 107, 1) !important; //修改默认的背景色
 --el-pagination-button-width: 50px;
}
</style>
