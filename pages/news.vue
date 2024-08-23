<template>

  <div class="bg">
   <!-- 顶部背景 -->
   <div class="news-title">
    <div class="ch">新闻中心</div>
    <div class="en">News Center</div>
   </div>
   <div class="top-bg">
   </div>
   <div class="top-right-ball"></div>
   <div class="top-left-ball"></div>
   <div class="btm-right-ball"></div>
   <div class="btm-left-ball"></div>

   <!-- 新闻资讯主体 -->
   <div class="news-center loading">
    <!-- 新闻资讯年份 -->
    <div class="nc-year-box"></div>
    <!-- 新闻资讯列表 -->
    <div class="nc-list" v-if="isShow">
     <el-row :gutter="24" justify="space-between">
      <el-col class="nc-block" :xl="12" :lg="12" :md="24" :sm="24" :xs="24" v-for="item of newsList" :key="item.id">
       <!-- <div v-if="isShow[item.id - 1]" class="nc-year-box">
        <img src="@/assets/images/news_year.png" alt="" />
       </div> -->
       <el-card shadow="hover" class="mb-10px">
        <a :href="item.link" target="_blank" style="display: flex">
         <el-row :gutter="30" justify="space-around">
          <el-col class="cover-img" :lg="11" :md="11" :sm="7">
          <img :src="item.coverImg" />
          </el-col>
          <el-col style="align-items: center;" :lg="13" :md="13" :sm="17">
          <div class="nc-content">
            <p class="nc-title">{{ item.title }}</p>
            <!-- <p class="nc-date">{{ formatDate(item.date) }}</p> -->
            <p class="nc-date">{{ item.timeYear }}-{{ item.monthDay }}</p>
            <p class="nc-intro">
            {{ item.content.length < 60 ? item.content+"。" : item.content.slice(0, 60) + "..." }}
            </p>
          </div>
          </el-col>
        </el-row>
        </a>
       </el-card>
      </el-col>
     </el-row>
    </div>
    <Pagination
     class="pagination"
     :total="total"
     :pageNo="queryParams.pageNo"
     :pageSize="queryParams.pageSize"
     :pagerCount="7"
     @pagination="getNewsList"/>
   </div>
  </div>

</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getNewsArticle } from "@/api";

useHead({
 title: "新闻中心",
 titleTemplate(title) {
  return title ? `以伴-${title}` : "";
 },
 meta: [
  { name: "description", content: "以伴新闻中心" },
  { name: "keywords", content: ["以伴", "新闻中心", "新闻资讯" ] },
 ],
});

const route = useRoute(); // 查询参数
const loading = ref(true); // 列表的加载状态
const total = ref(0); // 列表的总页数

// 新闻列表定义
let newsList = ref<
 {
  id: number;
  timeYear: string;
  monthDay: string;
  title: string;
  content: string;
  desc: string;
  coverImg: string;
  link: string;
 }[]
>([]);

// 查询参数定义
let queryParams = reactive({
 pageNo: 1,
 pageSize: 10,
 // key: route.query.key,
});

let isShow = ref(false);
/**
 * @description 获取新闻列表内容
 * @param params 
 * @return void
 */
const getNewsList = async (params: { pageNo: Number; pageSize: Number }) => {
  try {
    console.log("params:",params);    
    const res = await getNewsArticle(params);
    queryParams.pageNo = Number(params.pageNo);
    if (res?.code === 0) {
      newsList.value = res?.data.list;
      total.value = res?.data.total;
      isShow.value = true;
      console.log("total:", total.value);
      // window.scrollTo({
      //   top: 220,
      //   behavior: 'smooth', // 平滑滚动
      // });
    }
  } catch (error) {
    console.error(error);
  }
};

watchEffect(() => {
  getNewsList(queryParams);
  window.scrollTo({  // 每次更新页面数据自动滑动到顶部
    top: 220,
    behavior: 'smooth', 
  });
})

/**初始化 **/
onMounted(() => {});
</script>

<style lang="scss" scoped>
/**整个页面的背景颜色  */
.bg {
 position: relative;
 overflow: hidden;
 width: 100%;
 background: linear-gradient(90deg, rgba(222, 115, 113, 0.6) 0%, rgba(230, 175, 174, 0) 100%);
}
.top-bg {
 margin: 0 auto;
 width: 100%;
 height: 320px;
}
/**顶部背景start */
@keyframes title-fade-in {
 from {
  opacity: 0;
 }
 to {
  opacity: 1;
 }
}
.news-title {
 position: absolute;
 top: 170px;
 left: 50%;
 transform: translateX(-50%);

 color: rgba(255, 255, 255, 1);
 z-index: 1;
 animation: title-fade-in 1.5s ease-in-out forwards;

 .ch {
  font-family: "Alibaba Sans Black";
  font-size: 60px;
  text-align: center;
 }

 .en {
  font-family: "Alibaba Sans Black";
  font-size: 38px;
  text-align: center;
 }
}
@media screen and (max-width: 1200px) {
 .news-title {
  // top: 23%;

  .ch {
   font-size: 60px;
  }
  .en {
   font-size: 38px;
  }
 }
}

@media screen and (max-width: 992px) {
 .top-bg {
  width: 100%;
  height: 220px;
 }
 .news-title {
  top: 100px;
  .ch {
   font-size: 48px;
  }

  .en {
   font-size: 30px;
  }
 }
}

// .top-bg > img {
//  object-fit: contain;
//  // width: 100%;
//  // height: 100%;
//  width: 1400px;
//  height: 700px;
//  max-width: 100%;
//  max-height: 100%;
// }

@media screen and (max-width: 992px) {
 .top-bg > img {
  // object-fit: contain;
  // width: 100%;
  // height: 100%;
  width: 100%;
  height: 600px;
 }
}
/**定义左边进入动画 */
@keyframes left-slide-in {
 0% {
  opacity: 0;
  transform: translate(-100%, -100%);
 }
 100% {
  opacity: 1;
  transform: translate(0, 0);
 }
}
/**定义右边进入动画 */
@keyframes right-slide-in {
 0% {
  opacity: 0;
  transform: translate(100%, 100%);
 }

 100% {
  opacity: 1;
  transform: translate(0, 0);
 }
}

@keyframes top-left-slide-in {
 0% {
  opacity: 0;
  top: 350px;
  left: 50%;
 }

 100% {
  opacity: 1;
  left: 350px;
  top: 70px;
 }
}

.top-left-ball {
 position: absolute;
 //  left: 370px;
 //  top: 90px;
 width: 200px;
 height: 200px;
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
 //  transform: translate(-100%, -100%);
 animation: top-left-slide-in 1s forwards;
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
  top: -150px;
 }
}
.top-right-ball {
 position: absolute;
 //  right: -200px;
 //  top: -200px;
 width: 400px;
 height: 400px;
 border-radius: 50%;
 transform: rotate(-37deg);
 background: radial-gradient(
  closest-side at 100% 68%,
  rgba(255, 255, 255, 1) 0%,
  rgba(255, 255, 255, 1) 0%,
  rgba(194, 94, 66, 1) 100%
 );
 box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
 backdrop-filter: blur(12px);
 //  transform: translate(100%, 100%);
 animation: top-right-slide-in 1s forwards;
}
/**从中心移动至右下角动画 */
@keyframes bottom-right-slide-in {
 0% {
  opacity: 0;
  top: 200px;
  right: 40%;
 }

 100% {
  opacity: 0.5;
  right: 370px;
  top: 200px;
 }
}
.btm-right-ball {
 position: absolute;
 //  left: 981px;
 //  top: 520px;
 width: 150px;
 height: 150px;
 border-radius: 50%;
 transform: rotate(-15.42deg);
 //  background: radial-gradient(
 //   closest-side at 0% 50%,
 //   rgba(255, 255, 255, 1) 0%,
 //   rgba(161, 73, 48, 1) 100%
 //  );
 background: radial-gradient(
  closest-side at 85% 0%,
  rgba(255, 255, 255, 1) 0%,
  rgba(184, 82, 81, 0.63) 99.95%
 );
 box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
 backdrop-filter: blur(12px);
 //  transform: translate(100%, 100%);
 animation: bottom-right-slide-in 1s forwards;
}
@keyframes bottom-left-slide-in {
 0% {
  opacity: 0;
  top: 300px;
  right: 50%;
 }

 100% {
  opacity: 1;
  right: -150px;
  top: 450px;
 }
}
.btm-left-ball {
 position: absolute;
 //  left: 200px;
 //  top: 300px;
 width: 240px;
 height: 240px;
 border-radius: 50%;
 transform: rotate(12.5deg);
 //  background: radial-gradient(
 //   closest-side at 85% 0%,
 //   rgba(255, 255, 255, 1) 0%,
 //   rgba(184, 82, 81, 0.63) 99.95%
 //  );
 background: radial-gradient(
  closest-side at 100% 68%,
  rgba(255, 255, 255, 1) 0%,
  rgba(255, 255, 255, 1) 0%,
  rgba(194, 94, 66, 1) 100%
 );
 box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
 backdrop-filter: blur(12px);
 //  transform: translate(-100%, -100%);
 animation: bottom-left-slide-in 1s forwards;
}

/**顶部背景end */

/**新闻中心主体start */
.nc-year-box {
 display: block;
 position: relative;
 // margin-top: 50px;
 margin-left: 50px;
 z-index: 10;
}
.news-center {
 position: relative;
}
.loading {
  min-height: 700px;
}
.nc-year {
 position: absolute;
 // top: 8%;
 // left: 18%;
 top: 63px;
 left: 100px;
 z-index: 20;
 font-family: "Alibaba Sans Black";
 font-size: 60px;
 color: rgba(117, 24, 22, 0.8);
}

.news-center {
 margin-top: 80px;
 padding-bottom: 60px;
 height: auto;
}
.nc-list {
 display: block;
//  margin: 0 50px;
 margin: 0 10%;
 height: auto;

 .cover-img {
  // display: flex !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  // width: 240px !important;
  // height: 180px !important;
  min-height: 180px;
  max-height: 180px;
  background: rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
 }
 .nc-date {
  margin-top: 10px;
  // text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  // font-size: 36px;
  // font-weight: 900;
  // color: rgba(255, 255, 255, 1);
  font-size: 16px;
  // font-weight: 700;
  // text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  color: rgba(169, 147, 147, 1);
 }
 .nc-title {
  font-size: 20px;
  font-weight: 700;
  // text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  color: rgba(158, 35, 2, 1);
 }
 .nc-intro {
  font-size: 16px;
  color: rgba(158, 64, 38, 0.78);
 }
}

@media screen and (max-width: 768px) {
 .nc-list {
  .cover-img {
    margin-bottom: 20px;
    height: 250px !important;
  }
 }
}

@media screen and (max-width: 992px) {
 .nc-year-box {
  width: 260px;
  height: auto;
 }
 .nc-year {
  position: absolute;
  top: 60px;
  left: 110px;
  font-size: 45px;
 }
}
.mb-10px {
 min-height: 220px;
 line-height: 1.5;
}

.nc-block {
 padding-top: 60px;
 border-radius: 4px;
}
.nc-block:nth-child(2n + 1) {
 padding-top: 0;
}

@media screen and (max-width: 1200px) {
 .nc-block:nth-child(2n + 1) {
  padding-top: 60px;
 }
 .nc-block:nth-child(2n) {
  padding-top: 60px;
 }
 .nc-block:first-child {
  padding-top: 0;
 }
}

.grid-content {
 min-height: 36px;
 border-radius: 4px;
}

/**element-plus 样式 */
.outer-el-card {
 box-shadow: none !important;
}

.el-card {
 overflow: hidden;
 border: 0 !important;
 background-color: transparent !important;
}

/**新闻中心主体end */
</style>
