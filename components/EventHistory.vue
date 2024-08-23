<template>
 <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css" />
 <div class="container" v-if="isShowEvents">
  <div class="list-main">
   <button :style="{ opacity: showPrevious }" class="prev custom-button" @click="previous">
    <i class="fa fa-angle-double-left"></i>
   </button>
   <ul class="ul">
    <li class="list-item" v-for="card in filteredCards" :key="card.id">
     <div class="img-title-box">
     <client-only>
      <div class="img-box">
       <!-- <img v-bind:src="card.src" alt="" :id="'image-' + card.id" :style="setOpacity(card.id)"/> -->
       <img :src="card.coverImg" alt="image" :id="'image-' + card.id" />
       <!--毛玻璃效果-->
       <div class="intro-mask">
        <!--简介文案-->
        <div class="intro-text">{{ card.content }}</div>
       </div>
      </div>
     </client-only>
     <p class="title">{{ card.title }}</p>
    </div>
     <div class="date">
      <p>{{ (card.time).slice(0, 4) }}</p>
     </div>
    </li>
   </ul>
   <button :style="{ opacity: showNext }" class="next custom-button" @click="next">
    <i class="fa fa-angle-double-right"></i>
   </button>
  </div>

  <!-- <div class="axis"></div> -->
 </div>
</template>

<script setup lang="ts">
import { getDevelopEvent } from "@/api";
import { ref, onMounted } from "vue";
let id: number = 0;

interface Card {
 id: number;
 src: string;
 date: number;
 title: string;
 intro: string;
}

let developEvent = reactive<
 {
  id: number,
  title: String,
  content: String,
  coverImg: string,
  time: String,
 }[]
>([]);
let isShowEvents = ref(false);

/**
 * @description 获取组织发展大事记
 * @return void
 */
 const getEvents = async()=>{
  try {
    const res = await getDevelopEvent();
    if(res?.code == 0) {
      developEvent = res?.data;
      console.log("developEven:", developEvent);
    }
    isShowEvents.value = true;
  } catch (error) {
    console.log('get:video',error);
  }
}

const startIndex = ref(0); // 默认显示的起始索引
// const defaultIndex = ref(2); // 默认显示的起始索引
const visibleCount = ref(3); // 默认显示的图片数量

let isHover = ref(false);  // 大事记是否有鼠标悬浮
const filteredCards = computed(() => {
 //筛选卡片
 return developEvent.slice(startIndex.value, startIndex.value + visibleCount.value);
});

function setOpacity(id: number) {
  console.log("id:", id);
  let midId = startIndex.value + visibleCount.value-2;
  console.log('filter:',filteredCards.value[1]);
  console.log("isHover:",isHover.value);
  if(id == midId) {
    return { fontSize: 40 }
  }
  return { opacity: 0 }
  // return {}
}

const showPrevious = computed(() => {
 //当起始索引不为0时，显示上一张箭头
 return startIndex.value > 0 ? "1" : "0";
});

const showNext = computed(() => {
//  console.log("startId:", startIndex.value);
 //展示完最后一张后，不显示下一张箭头
 return startIndex.value + visibleCount.value < developEvent.length ? "1" : "0";
});

/**始终显示最中间的卡片 */
// const showCurCardPrevious = () => {
//  let list = document.querySelectorAll(".list-item"); /**大事记图像+简介 */
//  let listItems = ref([]);
//  listItems.value = Array.from(list);
//  listItems.value.forEach((item, index) => {
//   item.querySelector(".img-box").style.opacity = 0;
//   item.querySelector(".title").style.opacity = 0;
//  });
//  listItems.value[0].querySelector(".img-box").style.opacity = 1;
//  listItems.value[0].querySelector(".title").style.opacity = 1;
// };

const previous = () => {
 if (startIndex.value > 0) {
  // showCurCardPrevious();
  startIndex.value--; // 点击上一张箭头，起始索引减一
 }
};

const next = () => {
 if (startIndex.value + visibleCount.value < developEvent.length) {
  // showCurCardNext();
  startIndex.value++; // 点击下一张箭头，起始索引加一
  let slideItems = document.querySelectorAll(".list-item");
  slideItems.forEach((item, index) => {
    item.classList.toggle("smooth-transition"); // 每次滑动 200px
  //  item.style.transform = `translateX(${(cards.value.length - startIndex.value + 1) * -100}px)`;
  });
 }
};

/**浏览器屏幕宽度 */ 
const reactAdjust = () => {
  if(process.client) {  
  const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
  // console.log("screenWidth:",screenWidth.value)
  // var browserWidth = getBrowserWidth();
    console.log('当前浏览器宽度：', screenWidth.value);
    if(screenWidth.value <= 764 && screenWidth.value >564) {
      visibleCount.value = 2;
    }else if(screenWidth.value <= 564){
      visibleCount.value = 1;
    }else {
      visibleCount.value = 3;
    }
  }
}

/**实现悬浮停留效果 */
// const hoverEffect = () => {
//  let list = document.querySelectorAll(".list-item"); /**大事记图像+简介 */
//  let listItems = ref([]);
//  listItems.value = Array.from(list);
//  listItems.value.forEach((item, index) => {
//   item.querySelector(".img-box").style.opacity = 0;
//   item.querySelector(".title").style.opacity = 0;
//  });
//  listItems.value.forEach((item, index) => {
//   item.addEventListener("mouseover", function (event) {
//    event.target.querySelector(".img-box").style.opacity = 1;
//    event.target.querySelector(".title").style.opacity = 1;
//   });
//  });
// };
// hoverEffect();

// 获取浏览器窗口的实时宽度
// const getBrowserWidth = () => {
//     return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// }

// 监听窗口大小变化，并在变化时获取新的宽度
// window.addEventListener('resize', function() {
//     var browserWidth = getBrowserWidth();
//     console.log('当前浏览器宽度：', browserWidth);
//     if(browserWidth <= 764 && browserWidth >564) {
//       visibleCount.value = 2;
//     }else if(browserWidth <= 564){
//       visibleCount.value = 1;
//     }else {
//       visibleCount.value = 3;
//     }
// });
watchEffect(() => {
//  hoverEffect();
 reactAdjust();
//  getBrowserWidth();

});
/**初始化 **/

onMounted(async () => {
  await getEvents();
});
</script>

<style lang="scss" scoped>
.container {
 display: flex;
 width: 100%;
 justify-content: space-around;
 align-items: center;

}
.prev,
.next {
 display: inline-block;
 margin-top: 200px;
 width: 50px;
 height: 50px;
 z-index: 5;
}
.prev {
  margin-right: 30px;
}
.next {
  margin-left: 30px;
}
/**默认样式 鼠标未选中时 */
.list-main {
 overflow: hidden;
 display: flex;
//  height: 400px;
}
.list-main ul {
 overflow: hidden;
 display: flex;
 list-style: none;
}
.list-main ul li {
 flex: 1;
}
.smooth-transition {
 transition: width 0.3s ease, background-color 0.5s linear;
}
.list-item {
 overflow: hidden;
 position: relative;
 text-align: center;
 transition: transform 0.3s ease;
 .img-title-box {
  margin-right: 20px;
 }
 &:last-of-type {
    margin-right: 0;
  }
 
 .img-box {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
   rgba(17, 17, 26, 0.1) 0px 3px 3px;
  // opacity: 0;
  img {
   transition: 0.3s forwards;
   margin-bottom: 20px;
   width: 300px;
   height: 200px;
   border-radius: 10px;
   box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 48px;
   opacity: inherit;
   object-fit: cover;
   transition: all 0.7s ease;
  }
 }
 .intro-mask {
  position: absolute;
  bottom: 0;
  padding: 10px;
  width: 100%;
  height: 80px;
  // opacity: 0;
  background: rgba(255, 255, 255, 0.8);
  // background-color: rgba(247, 165, 165, 1);
  opacity: inherit;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(8px);
 }
 .intro-text {
  position: absolute;
  width: 90%;
  height: 100%;
  opacity: inherit; /**绝对定位opacity需要设置inherit才能继承父元素 */
  font-size: 13px;
  text-align: center;
 }
 .title {
  transition: 0.5s forwards;
  margin-top: 10px;
  margin-bottom: 20px;
  // opacity: 0;
 }
 .date {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 50px;
  z-index: 3;
  text-align: center;

  p {
   position: relative;
   display: inline-block;
   width: 50px;
   height: 50px;
   z-index: 10;
   line-height: 50px;
   border-radius: 50%;
   background-color: rgba(204, 235, 211, 1);
   transition: all ease-out 0.3s;
  }
  &::before {
   /**时间线 */
   content: "";
   position: absolute;
   left: 0;
   right: 0;
   top: 50%;
   z-index: 1;
   border-top: 3px solid #999;
  }
 }
}

//保留 hover 的状态，具体参考https://juejin.cn/post/7147874468587634702

//清空所有选中的
// .list-main ul:hover li {
//  img,
//  title {
//   transition: none;
//   opacity: 0;
//  }
// }

//默认的样式（鼠标未选中时）
// @keyframes slide-left {
//  0% {
//   transform: translateX(0);
//  }
//  100% {
//   transform: translateX(-100%);
//  }
// }

/**简介逐渐显示动画 */
@keyframes intro-fade-in {
 from {
  opacity: 0;
 }
 to {
  opacity: 1;
 }
}
//鼠标选中时的样式
.list-item:hover {
 .img-box {
  opacity: 1;
  img {
   transform: scale(1.1, 1.1);
  }
  .intro-text {
   animation: intro-fade-in 0.6s ease-in-out forwards;
  }
 }
 .title {
  transition: 0.3s;
  opacity: 1;
 }
 .date p {
  transform: scale(1.1);
 }
}

//中等大小宽度时的响应式


//移动端时的效果，增大左边距，只显示一张图片
@media screen and (max-width: 992px) {
 .list-main ul {
  display: flex;
  // justify-content: space-around;
  // position: absolute;
  // top: 9.5em;
  // margin-left: -0.5em;
  // z-index: 1;
 }

 .list-main ul li {
  width: 15em;
  // margin: 0 0 0 2em;
  position: relative;
 }
}

//两边按钮的样式
.custom-button {
 //  padding: 0.4em 0.5em;
 background-color: #99a4b3;
 /* 按钮背景颜色 */
 color: #fff;
 /* 按钮文本颜色 */
 border: none;
 /* 去掉按钮边框 */
 border-radius: 50%;
 /* 圆角边框 */
 cursor: pointer;
 /* 鼠标悬停指针样式 */
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
 /* 按钮阴影效果 */
 transition: all ease-out 0.4s;
}

.custom-button:hover {
 background-color: #597091;
 /* 鼠标悬停时的按钮背景颜色 */
 transition: all ease-out 0.4s;
}

.custom-button:focus {
 outline: none;
 /* 去掉按钮聚焦时的边框 */
}

.custom-button i {
 font-size: 1.5em;
 margin: 0px 3px;
 /* 图标和按钮文本之间的间距 */
}

//时间轴
.axis {
 position: absolute;
 top: 29.8em;
 width: 100%;
 height: 2em;
 background: url(../assets/images/time/time_line1.png) center;
 //  background-color: #ee6e6f;
 opacity: 0.5;
}
</style>
