<template>
  <div class="bg">
  <div class="top-right-ball"></div>
  <div class="loading"  v-if="!isCaseShow && !isVolunShow"></div>
  <!-- 伴学案例 -->
  <div class="main" v-if="isCaseShow">
    <div class="title"><p>{{ currentCase[0].title }}</p></div>
    <div class="content" v-html="setContentStyle(currentCase[0].content)"></div>
  </div>

  <!-- 志愿者故事 -->
  <div class="main" v-if="isVolunShow">
    <div class="title"><p>{{ volunStory[0].title }}</p></div>
    <div class="content" v-html="setContentStyle(volunStory[0].content)"></div>
  </div>

  <NuxtLink to="../../program" v-if="isCaseShow || isVolunShow"><div class="back"><p>← 返回公益项目</p></div></NuxtLink>
  <el-backtop :bottom="backtopBottom" :right="backtopRight">
    <div
      style="
        width: 100%;
        height: 100%;
        background-color: #ffcac9;
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #fce4e3;
      ">
    ↑
    </div>
  </el-backtop>

  <!-- 推荐阅读 -->
  <div class="divider" v-if="isRecoShow"></div><span v-if="isRecoShow" class="reco-title">更多阅读</span>
  <div class="reco-main" v-if="isRecoShow">
    <NuxtLink  style="display: flex" class="rm-item" v-for="(item, index) of recoCases" :key="index" :to="`/subpage/programDetail?id=${item.id}&type=${isCaseShow?'program':'volunStory'}`" target="_blank">
      <el-row :gutter="30">
      <!-- <img class="rm-img" :src="item.coverImg" /> -->
      <el-col class="cover-img" :lg="8" :md="11" :sm="7">
        <img :src="item.coverImg" />
      </el-col>
      <!-- <div style="text-align: center;"> -->
      <el-col style="align-items: center;" :lg="26" :md="13" :sm="17">
        <div class="rm-title">{{ item.title }}</div>
        <div class="rm-intro" v-if="isVolunShow">{{ item.introduction }}</div>
      </el-col>
      <!-- </div> -->
    </el-row>
    </NuxtLink>
  </div>
</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getClassicCase,getVolunteerStory } from "@/api/index";

const route = useRoute(); // 使用 useRoute 获取当前路由信息
const loading = ref(true)
// 伴学案例对象数组定义
let programCases = reactive<
 { 
  id: number, 
  title: string,   // 伴学案例标题
  coverImg: string, // 封面图片
  content: string   // 具体内容 
 }[]>([]);

let currentCase = reactive<
 { 
  id: number, 
  title: string,   // 伴学案例标题
  coverImg: string, // 封面图片
  content: string   // 具体内容 
 }[]>([]);

 // 其他推荐阅读文章
let recoCases = reactive<
 { 
  id: number, 
  title: string,   // 标题
  coverImg: string, // 封面图片
  introduction?: string // 简介
  content: string   // 具体内容 
 }[]>([]);

let isCaseShow = ref(false);
let isRecoShow = ref(false);
/**
 * @description 获取伴学经典案例
 * @return void
 */
const getCasesList = async() => {
  try {
    console.log('route:', route);
    const res = await getClassicCase();
    if(res?.code === 0) {
      console.log('classic cases:', res);
      programCases = res?.data;
      currentCase = programCases.filter((item)=> {
        return item.id === Number(route.query.id); // 通过route.query.id获取路由参数中的id
      })
      recoCases = programCases.filter((item)=> {
        return item.id !== Number(route.query.id); 
      }).slice(0,3)
      if(recoCases) {
        isRecoShow.value = true
      }
      console.log("programCases:",programCases);
      console.log("recoCases:",recoCases);
      isCaseShow.value = true;
      loading.value = false;
    }
  } catch (error) {
    console.log(error)
  }
}


// 志愿者故事对象数组定义
let volunStories = reactive<
 { 
  id: number, 
  title: string,   // 志愿者故事标题
  coverImg: string, // 封面图片
  introduction: string, // 故事简介
  content: string   // 具体内容 
 }[]>([]);

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
      volunStories = res?.data;
      volunStory = volunStories.filter((item)=> {
        return item.id === Number(route.query.id); // 通过route.query.id获取路由参数中的id
      })
    recoCases = volunStories.filter((item)=> {
        return item.id !== Number(route.query.id); 
      }).slice(0,3)
      if(recoCases) {
        isRecoShow.value = true
      }
      isVolunShow.value = true
      loading.value = false;
      console.log("volunStories:", volunStories);
      console.log("recoCases:", recoCases);
    }
    
  } catch (error) {
    console.log(error);
  }
}


let backtopBottom = ref(180);
let backtopRight = ref(150);
let reactStyle = ref('');

/**根据浏览器屏幕宽度调整内容样式 */ 
const setContentStyle = (content: string) => {
  if(process.client) {  
  const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
    console.log('当前浏览器宽度：', screenWidth.value);
    const imgStyleRegex = /(<img[^>]+style=")([^"]*)("[^>]*>)/g; // 图片样式正则匹配
    const emptyStyle = (match: string, p1: string, p2: string, p3: string) => { // 清空图片样式
      return p1 + p3; 
    };
    const newContent = content.replace(imgStyleRegex, emptyStyle);
    if(screenWidth.value <= 764 && screenWidth.value >564) {
      // 调整回到顶部按钮的位置
      backtopBottom.value = 150;
      backtopRight.value = 20;
      return reactStyle.value = `
        <style>
        .main {
          padding: 80px 10%;
        }
        .title {
          p {
            font-size: 25px;
          }
        }
        p {
          font-size: 18px;
        }
        img {
          width: 80%;
        }
        </style> ${newContent}`;
    }else if(screenWidth.value <= 564){
      // 调整回到顶部按钮的位置
      backtopRight.value = 3;
      return reactStyle.value = `
        <style>
        .main {
          padding: 80px 8%;
        }
        .title {
          p {
            font-size: 20px;
          }
        }
        p {
          font-size: 14px;
        }
        img {
          width: 90%;
          height: auto;
        }
        </style> ${newContent}`;
    }else {
      return reactStyle.value = `
        <style>
        .main {
          padding: 80px 20%;
          text-align: left;
          line-height: 1.7;  
        }
        .title {
          font-size: 30px;
          font-weight: 700;
          text-align: center;
          p {
            display: inline-block;
          }
        }
        .content {
          font-family: 'Microsoft YaHei';
          font-size: 20px;
        }
        </style> ${newContent}`;
    }
  }
}

watchEffect(() => {
  // reactAdjust();

});
onMounted( ()=> {
  console.log('route',route);
  if(route.query.type == 'program') {
    getCasesList();
  }
  if(route.query.type == 'volunStory') {
    getVolunList();
  }
})
</script>
<style scoped lang="scss">
.example-showcase .el-loading-mask {
  z-index: 9;
}
.loading {
  height: 1200px;
  background: rgba(0, 0, 0, 0.2);
  // background-color: rgba(247, 165, 165, 0.4);
  opacity: inherit;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(8px);
}
.main {
  padding: 80px 20%;
  text-align: left;
  line-height: 1.7;  
}
.bg {
 position: relative;
 overflow: hidden;
 width: 100%;
 height: auto;
 background: linear-gradient(90deg, #ffcac9 0%, rgba(230, 175, 174, 0) 100%);
}
@keyframes top-right-slide-in {
 0% {
  opacity: 0;
  top: 100px;
  right: 20%;
 }

 100% {
  opacity: 1;
  right: -180px;
  top: -170px;
 }
}
.top-right-ball {
 position: absolute;
 width: 400px;
 height: 400px;
 z-index: -1;
 border-radius: 50%;
 transform: rotate(-37deg);
 background: radial-gradient(
  closest-side at 0% 68%,
  rgba(255, 255, 255, 1) 0%,
  rgba(242, 166, 145, 0.61) 61%,
  rgba(235, 111, 77, 0.37) 100%
 );
 box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
 backdrop-filter: blur(12px);
 animation: top-right-slide-in 0.8s forwards;
}
.title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  p {
    display: inline-block;
    // line-height: 2;
  }
}
.content {
  font-family: 'Microsoft YaHei';
  font-size: 20px;
}

@media screen and (max-width: 992px) {
  .main {
    padding: 60px 10%;
  }
  .content {
    font-size: 20px;
    img {
      width: 100px;
    }
  }
}

.back {
  margin-left: 200px;
  margin-bottom: 60px;
  font-size: 20px;
  color: rgba(106, 28, 6, 0.6);
  cursor: pointer;
  
}
.divider {
  display: inline-block;
  text-align: center;
  width: 78%;
  height: 1px;
  background: radial-gradient(
  closest-side at 0% 68%,
  rgba(255, 255, 255, 1) 0%,
  rgba(242, 166, 145, 0.61) 61%,
  rgba(235, 111, 77, 0.37) 100%
 );
}
.reco-title {
  display: inline-block;
  margin-left: 20px;
  font-size: 20px;
  color: rgba(106, 28, 6, 0.8);
}
.reco-main {
 margin: 30px 20% 100px;
 .rm-item {
  display: flex;
  justify-content: space-between;
  // justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px; 
  // padding-right: 80px;
  border-radius: 10px;
  background: linear-gradient(90deg, #fed0d0 0%, rgba(230, 175, 174, 0) 100%);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  cursor: pointer;

 }
 .rm-title {
  display: inline-block;
  font-size: 22px;
  color: rgba(106, 28, 6, 1);
 }
 .rm-img {
  margin-right: 50px;
  // width: 300px;
  // min-width: 300px;
  height: 220px;
  object-fit: cover;
  // overflow: hidden;
 }
 .cover-img {
  display: flex;
  margin-bottom: 10px;
  min-height: 140px;
  max-height: 140px;
  // background: rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
 }

 .rm-intro {
  margin-top: 20px;
  // margin-left: 50px;
  text-align: left;
  line-height: 1.5;
  color: rgba(106, 28, 6, 0.8);
 }
}

@media screen and (max-width: 992px) {
  // p img {
  //   width: 10% !important;
  // }
  .reco-title {
    font-size: 18px;
  }
  .reco-main {
  margin: 30px 18% 100px;
  .rm-item {
    padding-right: 30px;
  }
 .rm-title {
  font-size: 18px;
 }
 .rm-img {
  margin-right: 20px;
  // width: 250px;
  // min-width: 200px;
  // height: 180px;
 }
 .rm-intro {
  margin-top: 20px;
  // margin-left: 20px;
  font-size: 16px;
 }
}
  
}

@media screen and (max-width: 768px) {
  .reco-title {
    font-size: 16px;
  }
  .reco-main {
    margin: 30px 18% 100px;
    .rm-title {
      font-size: 14px;
    }
    .rm-intro {
      font-size: 14px;
    }
  }
  
}

@media screen and (max-width: 564px) {
  .reco-main {
    margin: 20px 18% 80px;
    .rm-title {
    font-size: 14px;
    }
    .rm-intro {
    font-size: 14px;
    }
  }

}

</style>