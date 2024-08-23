<template>
 <div class="swiper-container" id="container" v-if="isVolunShow">
  <div class="swiper-wrapper">
   <div
    class="swiper-slide"
    v-for="item in volunStory"
    :key="item.id"
    :class="{ 'swiper-slide-active': item.id === activeSlide }"
   >
    <NuxtLink class="slide-content" :to="`/subpage/programDetail?id=${item.id}&type=volunStory`" target="_blank">
     <h2 class="slide-title">{{ item.title }}</h2>
     <p class="slide-desc">{{ item.introduction }}</p>
     <img :src="item.coverImg" class="slide-image" />
    </NuxtLink>
   </div>
  </div>
  <div class="swiper-pagination"></div>
 </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Swiper, { Navigation, Pagination, EffectCoverflow } from 'swiper';
// import { HORIZONTAL, VERTICAL } from "element-plus/es/components/virtual-list/src/defaults";
import { getVolunteerStory } from "@/api/index";

Swiper.use([Navigation, Pagination, EffectCoverflow]);

const defaultActiveSlide = ref(2); // 默认选择第3张卡片 索引从1开始
const activeSlide = ref(defaultActiveSlide.value);
const isMobile = ref(false);
var isVertical = ref(true);

const handleWindowResize = () => {
 isMobile.value = window.innerWidth < 992;
};

// 志愿者故事对象数组定义
let volunStory = reactive<
 { 
  id: number, 
  title: string,   // 志愿者故事标题
  coverImg: string, // 封面图片
  introduction: string, // 故事简介
  content: string   // 具体内容 
 }[]>([]);
let isVolunShow = ref(false);

/**
 * @description 获取伴学经典案例
 * @return void
 */
const getVolunList = async() => {
  try {
    const res = await getVolunteerStory();
    if(res?.code === 0) {
      console.log('volunteer stories:', res);
      volunStory = res?.data;
      isVolunShow.value = true;
    }
  } catch (error) {
    console.log(error);
  }
}

let stretch = ref(150);
let depth = ref(200);
const initSwiper = () => {
  new Swiper("#container", {
  effect: "coverflow",
  slidesPerView: "auto",
  centeredSlides: true,
  preventOverflow: true, // 是否防止卡片超出容器
  // spaceBetween: 30,
  initialSlide: defaultActiveSlide.value, // 初始显示选中卡片的索引
  coverflowEffect: {
   rotate: 0,
   stretch: stretch.value, // 150
    // stretch: 100,
   depth: depth.value,  // 200
   modifier: 1,
   slideShadows: true,
  },
  navigation: {
   nextEl: ".swiper-button-next",
   prevEl: ".swiper-button-prev",
  },
  pagination: {
   el: ".swiper-pagination",
   clickable: true,
  },
  loop: true,
  direction: "horizontal",
  on: {
   slideChange: (swiper: { realIndex: number; visibleSlides: Element[]; }) => {
    activeSlide.value = swiper.realIndex + 1;
    console.log("activeSlide.value:", activeSlide.value);

    let slides = document.querySelectorAll(".swiper-slide");
    slides.forEach(item => {
     item.style.opacity = 0;
     if (swiper.visibleSlides.includes(item)) {
      // console.log("item:", item, "yes");
      item.style.opacity = 1;
     }
    });

    // console.log("visibleSlides:", swiper.visibleSlides);
    // console.log("swiper:", swiper);
   },

  //  resize: (swiper: { changeDirection: (arg0: string) => void; }) => {
  //   isVertical.value = window.innerWidth > 768;
  //   swiper.changeDirection(isVertical.value ? HORIZONTAL : VERTICAL);
  //  },
  },
 });
}

/**
 * @description 根据屏幕宽度调整样式
 */
 const reactAdjust = () => {
  if(process.client) {
    const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
    console.log('当前浏览器宽度：', screenWidth.value);
    if(screenWidth.value <= 564) {
      stretch.value = 10;
      depth.value = 160;
    }
  }
  
}

watchEffect(() => {
  reactAdjust();
})

onMounted( async () => {
 handleWindowResize();
 window.addEventListener("resize", handleWindowResize);
 await getVolunList();
 initSwiper();
});
</script>

<style lang="scss">
@import "swiper/swiper-bundle.min.css";

.swiper-container {
 position: relative;
 overflow: hidden;
 margin: 30px 0;
 //  width: 100%;
 height: 500px;
}

.swiper-slide {
 margin: 0 auto;
 display: flex;
 //  flex-direction: column;
 //  align-items: center;
 justify-content: center;
 text-align: center;
 width: 500px;
 height: 500px;
 border-radius: 13px;
 background: rgba(255, 255, 255, 1);
}
.slide-content {
 padding: 20px;
 margin-bottom: 15px;
 text-align: center;
}

.slide-title {
 display: inline-block;
 margin-top: 20px;
 width: 100%;
 font-size: 25px;
}

.slide-desc {
 margin: 10px auto 20px;
 width: 80%;
 font-size: 16px;
 line-height: 1.5;
 color: rgba(56, 56, 56, 1);
 white-space: pre-line;
 //  word-wrap: break-word;
}

.slide-image {
 padding-bottom: 20px;
 width: 400px;
 height: 280px;
 object-fit: cover;
 border-radius: 13px;
}

.swiper-pagination {
 // display: flex;
 position: absolute;
 margin-top: 30px;
 // transform: translateX(-50%);
 // left: 70%;
 display: block;
 align-items: center;
 justify-content: center;
}

.swiper-pagination-bullet {
 width: 20px;
 height: 20px;
 background-color: rgba(209, 146, 146, 1);
 opacity: 0.5;
 margin: 0 5px; /**调整指示点之间的间距 */
}

.swiper-pagination-bullet-active {
 opacity: 1;
}

@media screen and (max-width: 564px) {
  .swiper-container {
    height: 430px;
  }
  .slide-image {
    width: 280px;
    height: 210px;
  }
  .swiper-slide {
    width: 380px;
  }
  .slide-title {
    padding: 0 10px;
    font-size: 20px;
  }
  .slide-desc {
    font-size: 12px;
  }
}
</style>
