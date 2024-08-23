<template>
  <div
   class="m-video"
  >
   <video
    :id="videoId"
    ref="video"
    style="object-fit: cover;"
    class="video-js vjs-default-skin"
   :style="`border-radius: ${borderRadius}px`"
   :poster="veoPoster"
   :width="width"
   :height="height"
   :autoplay="autoplay"
   :controls="!originPlay && controls"
   :loop="loop"
   :muted="autoplay || muted"
   :preload="preload"
   >
   <!-- crossorigin="anonymous" -->
   <source :src="src" type="application/x-mpegURL">
    您的浏览器不支持video标签。
   </video>

   <!-- @loadeddata="poster ? () => false : getPoster()"
    @pause="showPlay ? onPause() : () => false"
    @playing="showPlay ? onPlaying() : () => false"
    @click.prevent.once="onPlay" -->

   <!-- <span
    v-show="originPlay || showPlay"
    class="m-icon-play"
    :class="hidden == true ? 'hidden' : 'show'"
   >
    <svg class="u-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
     <path
      d="M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
           C31.913,19.675,31.913,14.325,28.26,11.961z"
     ></path>
    </svg>
   </span> -->
  </div>
 </template>
 
 <script setup lang="ts">
 import videojs from 'video.js'
 import "video.js/dist/video-js.css"
 import { ref, onMounted } from "vue";
 interface Props {
  videoId: string; // 视频id，视频初始化时的标识
  src: string; // 视频文件地址，支持网络地址 https 和相对地址
  poster?: string; // 视频封面地址，支持网络地址 https 和相对地址
  second?: number; // 在未设置封面时，自动截取视频第 second 秒对应帧作为视频封面
  width?: number; // 视频播放器宽度，单位px
  height?: number; // 视频播放器高度，单位px
  autoplay?: boolean; // 视频就绪后是否马上播放，优先级高于preload
  controls?: boolean; // 是否向用户显示控件，比如进度条，全屏等
  loop?: boolean; // 视频播放完成后，是否循环播放
  muted?: boolean; // 是否静音
  preload?: "auto" | "metadata" | "none"; // 是否在页面加载后载入视频，如果设置了autoplay属性，则preload将被忽略
  showPlay?: boolean; // 播放暂停时是否显示播放器中间的暂停图标
  fit?: "none" | "fill" | "contain" | "cover"; // video的poster默认图片和视频内容缩放规则
  borderRadius?: number; // 视频的圆角尺寸，单位px
 }

 const props = withDefaults(defineProps<Props>(), {
  videoId: "",
  src: "",
  poster: "",
  second: 0.5,
  width: 400,
  height: 300,
  autoplay: false,
  controls: true,
  loop: false,
  muted: false,
  preload: "auto",
  showPlay: true,
  fit: "cover",
  borderRadius: 0,
 });
 // 获取 NUXT_PUBLIC_VIDEO_LINK_BASE
 const config = useRuntimeConfig();
 const videoLink = config.public.videoBase;
 const veoPoster = ref('');
 const originPlay = ref(true);
 const hidden = ref(false); // 是否隐藏播放器中间的播放按钮
 const myPlayer = ref();
 // 为模板引用标注类型
 const emit = defineEmits(['initVideo','videoPlay','videoPause','play']);
 const initVideoSource  = () => {
   myPlayer.value = videojs(props.videoId, {
     controls: props.controls, // 是否显示控制条
     preload: props.preload,
     poster: props.poster,
     autoplay: props.autoplay,
     loop: props.loop, // 循环播放
     // fluid: true, // 自适应宽高
     language: 'zh-CN', // 设置语言
     muted: props.muted, // 是否静音
     inactivityTimeout: false,
     // 设置控制条组件
     controlBar: { // 设置控制条组件
       //  设置控制条里面组件的相关属性及显示与否
       currentTimeDisplay: true,
       timeDivider: true,
       durationDisplay: true,
       remainingTimeDisplay: false,
       volumePanel: {
         inline: false,
       },
       pictureInPictureToggle: false,
     },
     sources: [
       {
         src: "https://admin.yiban.site/app-api/site/video/preview?fileUrl=" + props.src,  // 视频链接请求前缀 + 接口返回link
         type: 'application/x-mpegURL',
       },
     ],
     userActions: {
       seek: false,
     },
   })
  //  emit('initVideo');
  // myPlayer.value.defaultPlaybackRate = 2;
    console.log('myPlayer:', myPlayer.value);
    myPlayer.value.on('play', () => {
      emit('videoPlay');
    });

    myPlayer.value.on('pause', () => {
      emit('videoPause');
    });

  }
  

//  function getPoster() {
//   // 在未设置封面时，自动截取视频0.5s对应帧作为视频封面
//   // 由于不少视频第一帧为黑屏，故设置视频开始播放时间为0.5s，即取该时刻帧作为封面图
//   myPlayer.value.currentTime = props.second;
//   // 创建canvas元素
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   // canvas画图
//   canvas.width = veo.value.videoWidth;
//   canvas.height = veo.value.videoHeight;
//   ctx?.drawImage(veo.value, 0, 0, canvas.width, canvas.height);
//   // 把canvas转成base64编码格式
//   veoPoster.value = canvas.toDataURL("image/png");
//  }
 
//  function onPlay() {
//   console.log("originPlay.value:", originPlay.value);
//   if (originPlay.value) {
//    veo.value.currentTime = 0;
//    originPlay.value = false;
//   }
//   if (props.autoplay) {
//    veo.value?.pause();
//   } else {
//    hidden.value = true;
//    veo.value?.play();
//   // myPlayer.value?.play();
//   }
//   console.log("hidden.value:", hidden.value);
//  }
//  function onPause() {
//   hidden.value = false;
//   console.log("hidden.value:", hidden.value);
//  }
//  function onPlaying() {
//   hidden.value = true;
//   console.log("hidden.value:", hidden.value);
//  }

onMounted(() => {
  initVideoSource();
});

onBeforeUnmount(()=>{
  videojs(props.videoId).dispose();
})
// watch(() => props.src, (newValue, oldValue) => {
//   if (newValue !== oldValue) {
//     initVideoSource();
//   }
// });
 </script>
 
 <style lang="scss" scoped>
 .m-video {
  display: inline-block;
  position: relative;
  background: #000;
  overflow: hidden;
  object-fit: cover;
  cursor: pointer;
  .m-icon-play {
   display: inline-block;
   position: absolute;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   margin: auto;
   width: 80px;
   height: 80px;
   border-radius: 50%;
   background: rgba(0, 0, 0, 0.7);
   pointer-events: none;
   transition: opacity 0.3s;
 
   .u-svg {
    display: inline-block;
    fill: #fff;
    width: 29px;
    height: 34px;
    margin-top: 23px;
    margin-left: 27px;
   }
  }
 }

 .hidden {
  opacity: 0;
 }
 .show {
  opacity: 1;
 }
 .u-video-hover {
  &:hover {
   .m-icon-play {
    opacity: 1;
   }
  }
 }
 </style>
 