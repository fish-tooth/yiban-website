<template>
  <div class="bg">
  <!-- <div class="top-right-ball"></div> -->
  <div class="loading">
  <!-- <el-row justify="space-between" v-if="isVideoShow"> -->
  <div class="main" v-if="isVideoShow">
    <div class="video-box-block">
      <VideoPlayer :video-id="videoId" :src="videoSrc" :poster="videoPoster" :autoplay="true" class="video-box" :width="videoWidth" :height="videoHeight" />  <!-- width=1000  height=560 -->
    </div>
    <div class="course-info">
      <div class="ci-title">{{ title }}</div>
      <div class="ci-content">{{ content }}</div>
      <div class="nv-text">继续观看</div>
      <div class="next-video" v-if="isNextVideoShow">
        <NuxtLink :to="`/subpage/videosDetail?id=${nextVideoID}&tag=${nextVideoTag}`" target="_blank">
          <img class="nv-img" :src="nextVideoPoster" />
          <div>
            <div class="nv-title">{{ nextVideoTitle }}</div>
          </div>
        </NuxtLink>
      </div>
      <div class="ci-create-time">上传时间：{{ createTime }}</div>
      <!-- <span class="xiaoban-tip">小伴来陪你听课啦~</span> -->
      <img src="@/assets/images/subpage/xiaoban.png" class="xiaoban" alt="">
    </div>
  </div>
  </div>
</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getVideoByID, getVideoPage } from '@/api'
import type { LocationQueryValue } from "vue-router";

const route = useRoute(); // 使用 useRoute 获取当前路由信息

// 定义课程视频类型
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

// 当前视频
let videoWidth = ref(1000);
let videoHeight = ref(560);
let videoSrc: string;
let videoPoster: string;
let isVideoShow = ref(false);
let title: string;
let content: string;
let createTime: string;
let tag: string;
let duration: string;
let videoId: string;

// 其他视频
let isNextVideoShow = ref(false);
let courseVideoList = reactive<courseVideo[]>([]);
let nextVideoID: string;
let nextVideoPoster: string;
let nextVideoTag: string;
let nextVideoTitle: string;
/**
 * @description 按id获取视频
 * @return void
 */
 const getVideo = async()=>{
  try {
    let params = { id: route.query.id };
    const res = await getVideoByID(params);
    let video = res.data;  
    title = video.title;
    content = video.content;   // content 最好不要超过152个字符 否则会影响排版
    let tempDate = new Date(video.createTime);
    createTime = `${tempDate.getFullYear()}年${tempDate.getMonth() + 1}月${tempDate.getDate()}日`;
    tag = video.tag;
    duration = video.duration;
    videoSrc = video.link;
    videoPoster = video.coverImg;
    videoId = "video"+video.id;
    isVideoShow.value = true;
    console.log('videoSrc:', videoSrc);
  } catch (error) {
    console.log('get:video',error);
  }
}

/**
 * @description 获取全部课程视频
 * @return void
 */
const getAllVideo = async() => {
  let params = {
    pageNo: 1,
    pageSize: 9,
    tag: tag
  }
  const res = await getVideoPage(params);
  courseVideoList = res.data.list.filter((item: {
[x: string]: any; id: LocationQueryValue | LocationQueryValue[]; 
}) => {
    return item.id !== route.query.id && item.tag.includes('course');
  });
  courseVideoList = courseVideoList.sort(() => Math.random() - 0.5).slice(0, 1);
  nextVideoID = courseVideoList[0].id;
  nextVideoPoster = courseVideoList[0].coverImg;
  nextVideoTag = courseVideoList[0].tag
  nextVideoTitle = courseVideoList[0].title;
  isNextVideoShow.value = true;
}

/**
 * @description 根据屏幕宽度调整样式
 */
const reactAdjust = () => {
  if(process.client) {
    const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
    console.log('当前浏览器宽度：', screenWidth.value);
    if(screenWidth.value <= 1200 && screenWidth.value > 992) {
      videoWidth.value = 700;
      videoHeight.value = 400;
    }else if(screenWidth.value <= 992 && screenWidth.value > 764) {
      videoWidth.value = 760;
      videoHeight.value = 400;
    }else if(screenWidth.value <= 764 && screenWidth.value > 564) {
      videoWidth.value = 560;
      videoHeight.value = 340;
    }else if(screenWidth.value <= 564) {
      videoWidth.value = 350;
      videoHeight.value = 200;
    }
  }
  
}

watch(() => route.query.id, (newID, oldID) => {
  console.log('ID changed, new ID:', newID);
  getVideo();
  getAllVideo();
});

watchEffect(() => {
  reactAdjust();
})

onMounted( ()=> {
  console.log('route',route);
  getVideo();
  getAllVideo();
})
</script>
<style scoped lang="scss">
.bg {
 position: relative;
 overflow: hidden;
 width: 100%;
 height: auto;
 background:  #2f2e34;
 border-bottom: 1px solid #545151;
}
.loading {
  padding: 90px 40px;
  min-height: 700px;
}
.main {
  display: flex;
  justify-content: space-around;
}
.video-box {
  background-color: rgba(133, 133, 133, 0.8);
}
@media screen and (max-width: 1200px) {
  .loading {
    padding: 90px 0;
    min-height: 700px;
  }
  .video-box {
    width: 700px;
    height: 400px;
  }
}

@media screen and (max-width: 992px) {
  .loading {
    padding: 90px 0;
  }
  .video-box-block {
    text-align: center;
  }
  .video-box {
    margin-bottom: 20px;
    width: 760px;
    height: 400px;
  }
}

@media screen and (max-width: 764px) {
  .loading {
    padding: 70px 0;
  }
  .video-box {
    width: 560px;
    height: 340px;
  }
}

@media screen and (max-width: 564px) {
  .loading {
    padding: 70px 0;
  }
  .video-box {
    width: 350px;
    height: 200px;
  }
}
.course-info {
  flex: 1;
  position: relative;
  background-color: rgba(133, 133, 133, 0.2);
  margin-left: 30px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  
  .ci-title {
    padding: 20px 20px 10px;
    font-size: 25px;
    text-align: center;
    color: rgb(255, 255, 255);
    white-space: pre-line;
  }
  .ci-content {
    font-size: 16px;
    line-height: 1.7;
    color: rgb(198, 198, 198);
  }
  .nv-text {
    margin-top: 20px;
    margin-bottom: 10px;
    color: rgb(165, 165, 165)
  }
  .next-video {
    height: 180px;
    // background-color: rgb(255, 255, 255); 
    margin-bottom: 120px;
    padding: 10px;
    // border-radius: 10px;
    text-align: center;
    .nv-img {
      display: inline-block;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
    .nv-title {
      display: inline-block;
      font-size: 14px;
      color: rgb(220, 220, 220);
    }
  }
  .ci-create-time {
    position: absolute;
    bottom: 10px;
    margin-top: 40px;
    font-size: 14px;
    color: rgb(147, 147, 147);
  }
}

// .xiaoban-tip {
//   position: absolute; 
//   left: 20px; 
//   bottom: 20px; 
//   color: rgb(166, 178, 189);
// }
.xiaoban {
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 20px;
  width: 100px;
}
@media screen and (max-width: 1200px) {
  .course-info {
    margin-left: 20px;
    padding-left: 20px;
    padding-right: 20px;
    .ci-title {
      padding: 15px 15px 5px;
      font-size: 22px;
    }
    .ci-content {
      font-size: 14px;
    }
    .nv-text {
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .next-video {
      height: 140px;
      margin-bottom: 80px;
      padding: 6px;
      .nv-title {
        font-size: 14px;
      }
    }
    .ci-create-time {
      bottom: 6px;
      margin-top: 20px;
      font-size: 14px;
    }
  }
  .xiaoban {
    width: 63px;
  }
}

@media screen and (max-width: 992px) {
  .main {
    display: inline-block;
    margin: 0 auto;
  }
  .course-info {
    display: inline-block;
    margin-left: 10%;
    margin-right: 10%;
    padding-left: 20px;
    padding-right: 20px;
    width: 80%;
    .ci-title {
      padding: 30px 30px 20px;
      font-size: 22px;
    }
    .ci-content {
      font-size: 16px;
    }
    .nv-text {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .next-video {
      height: 200px;
      margin-bottom: 80px;
      .nv-title {
        font-size: 16px;
      }
    }
    .ci-create-time {
      bottom: 10px;
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .xiaoban {
    width: 100px;
  }
}

@media screen and (max-width: 764px) {
  .course-info {
    padding-left: 30px;
    padding-right: 30px;
    .ci-title {
      font-size: 20px;
    }
    .ci-content {
      font-size: 16px;
    }
    .nv-text {
      margin-top: 18px;
    }
    .next-video {
      height: 180px;
      margin-bottom: 100px;
    }
  }
  .xiaoban {
    width: 90px;
  }
}

@media screen and (max-width: 564px) {
  .course-info {
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
    .ci-title {
      padding: 30px 30px 20px;
      font-size: 18px;
    }
    .ci-content {
      font-size: 14px;
    }
    .nv-text {
      margin-top: 15px;
      margin-bottom: 10px;
    }
    .next-video {
      height: 150px;
      margin-bottom: 80px;
      .nv-title {
        font-size: 14px;
      }
    }
    .ci-create-time {
      font-size: 14px;
    }
  }
  .xiaoban {
    width: 60px;
  }
}
</style>