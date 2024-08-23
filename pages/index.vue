<template>
  
    <div>
      <!-- 顶部背景组件 -->
      <div class="common-top">
        <IndexSwiper :swiperImgsUrl="swiperImgsUrl" />
        <IndexMask :title="title" :intro="intro"/>
      </div>
      <!-- 捐赠入口和数据展示 -->
      <el-row class="wrapper" >
         <!-- 捐赠入口 -->
        <el-col class="donate-entry" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <NuxtLink to="/cooperation">
            <div class="support-us">
              <img class="support-icon" src="@/assets/images/index/support_icon.png"/>
              <p class="support-title">联系我们</p>
              <p class="support-text">缺乏父母陪伴的孩子，容易产生心智失衡、学业退步、人生偏航等问题。依托教育部人文社科项目成果，我们为孩子提供系统智慧陪伴、朋辈结对陪伴、课程指导陪伴和营会社交陪伴。我们相信，当孩子得到我们的陪伴，他们将更加健康快乐地成长，父母将更加放心投大地工作，社会也将会变得更加和谐美好！经过4年坚特，我们培育了6万余名陪伴导师，服务了10万余名孩子，为乡村扶贫振兴和城市社会服务等贡献青春力量。相关事迹被人民日报、央视新闻等媒体广泛报道，多次得到省市主要领导表扬鼓励，获全国向上向善好青年（创始人）、中国国际互联网十创新创业大赛国赛银奖等荣誉百余项。</p>
            </div>
          </NuxtLink>
        </el-col>
          <!-- 数据展示 -->
        <el-col class="serve-data" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <el-row justify="space-around">
            <el-col class="sd-item"
              v-for="(item, index) in dataList" :key="index"
              :xl="24" :lg="24" :md="24" :sm="12" :xs="24">
              <!-- v-if="Count" -->
              <!-- :autoplay="isAutoplay" -->
              <CountTo v-if="isDataShow" 
                :autoplay="autoplay"
                :start-val="0"
                :end-val=item.data
                :duration="2000"
                class="sd-data"
                @mounted="handleScroll"/>
              <p class="sd-title">{{ item.title }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 核心工作 -->
      <div class="core-business module-margin">
        <div class="module-title">我们的核心工作</div>
        <div class="cb-content module-content" @mouseleave="handleMouseLeaveAll($event)">
          <div
            v-for="(list, index) in coreList" :key="index"
            :class="list.id==defaultActive? 'cb-item-active':'cb-item'"
            @mouseenter="handleMouseOver($event)"
            @mouseleave="handleMouseLeave($event)"
            :style="{backgroundImage: `url(${list.coverImg})`}"> 
            <div>
              <div class="num">{{ list.num }}</div>
              <img class="icon" :src="list.icon" alt=""/>
              <div class="title">{{ list.title }}</div>
              <div class="intro">{{ list.intro }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 当前行动 -->
      <div class="current-project module-margin">
        <div class="module-title">我们的行动正在发生</div>
        <el-row class="cp-content module-content">
          <el-col :lg="7" :md="10" :sm="18" :xs="18" class="cp-item" v-for="(list, index) in runningList" :key="index" :style="{backgroundImage: `url(${list.coverImg})`}">
            <a style="color:rgb(255,255,255);">
              <div class="cp-text-card">
                <div class="cp-item-title">{{ list.title }}</div>
                <div class="cp-item-intro">{{ list.intro }}</div>
              </div>
            </a>
          </el-col>
        </el-row>
      </div>
      <!-- 合作伙伴 -->
      <div class="coop-partner module-margin" v-if="isShowPartner">
        <div class="module-title">合作伙伴</div>
        
        <el-carousel height="330px" :interval="5000" arrow="never">
          <el-carousel-item >
            <el-row style="margin: 20px 5%;">
              <el-col v-for="(item, index) in partner" :key="index" :span="4" :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
                <div class="cp-img-box">
                 <img :src=item.icon alt="合作伙伴">
                </div>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <!-- <p class="coop-icon module-content coop-content">
          <p class="p1"></p>
          <p class="p2"></p>
          <p class="p3"></p>
          <p class="p4"></p>
          <p class="p5"></p>
          <p class="p6"></p>
          <p class="p7"></p>
          <p class="p8"></p>
          <p class="p9"></p>
          <p class="p10"></p>
        </p> -->
      </div>
    </div>
  
</template>

<script setup lang="ts">
import { getCooperator, getProgramData } from "@/api/index";

useHead({
  title: "首页",
  titleTemplate(title) {
    return title ? `以伴-${title}` : "";
  },
  meta: [
    { name: "description", content: "以伴青少年发展中心成立于2020年2月，经过不懈努力，累计在全国28省建立258所网校，培育带动了200多所高校的6万余名志愿者导师，服务了10万余名孩子，相关事迹被人民日报等媒体报道逾600次。" },
    { name: "keywords", content: "以伴青少年发展中心, 以伴, 以伴官网, 首页, Yiban" },
  ],
});

// 顶部遮罩文字
const title = ['团队力量大','公益反响大'];
const intro = "让全中国每一位孩子都能享受向上向善的发展陪伴";
// const swiperImgsUrl = ["/images/index/top_bg1.jpg",
//                         "/images/index/top_bg2.jpg",
//                         "/images/index/top_bg3.jpg",
//                         "/images/index/top_bg4.jpg",
//                       ];
const swiperImgsUrl = ["/images/index/top_bg1.jpg",
                        "/images/index/top_bg2.jpg",
                        "/images/index/top_bg3.jpg",
                        "/images/index/top_bg4.jpg",
                        "/images/index/top_bg5.jpg",
                      ];
let defaultActive = ref(1);

/**
 * @description 核心工作-鼠标移入动画
 * @param $event 
 */
const handleMouseOver = function($event: any){
  $event.currentTarget.className = "cb-item-active";
  let parent = $event.currentTarget.parentElement;
  let index = $event.target.childNodes[0].childNodes[0].innerText;
  if(index != 1){
    parent.childNodes[1].className = "cb-item";
  } 
  defaultActive = index;
}

/**
 * @description 核心工作-鼠标移出动画
 * @param $event 
 */
const handleMouseLeave = function($event: any){
  $event.currentTarget.className = "cb-item";
}

/**
 * @description 核心工作-所有都未选中 默认选中1
 * @param $event 
 */
const handleMouseLeaveAll = function($event: any){
  $event.currentTarget.childNodes[1].className = "cb-item-active";
  defaultActive = ref(1);
}

// 用于展示的数据定义
const dataList = reactive([{
  title: "累计陪伴学生人数",
  data: 10087
},
{
  title: "累计参加志愿者人数",
  data: 2023
},
{
  title: "累计开展专项辅导陪伴项目数",
  data: 215
}]);


let isDataShow = ref(false);


// 核心工作
let coreList = [{
  id: 1,
  num: '01',
  coverImg: "/images/index/system_pic.jpg",
  icon: "/images/index/system_icon.svg",
  title: '系统智慧陪伴',
  intro: '106种量表精准匹配，17364名孩子成长建档\n5大维度问题智能答复，陪伴式关爱养成机制',
},
{
  id: 2,
  num: '02',
  coverImg: '/images/index/partner_pic.jpg',
  icon: '/images/index/partner_icon.svg',
  title: '朋辈结对陪伴',
  intro: '朋辈精准测评结对，长期一对一陪伴\n覆盖品德、心理、学业、生涯与生活',
},
{
  id: 3,
  num: '03',
  coverImg: '/images/index/course_pic.jpg',
  icon: '/images/index/course_icon.svg',
  title: '课程指导陪伴',
  intro: '传人文之蕴，授科学之真，成学习之才\n促健康之乐，践责任之行，长实践之能',
},
{
  id: 4,
  num: '04',
  coverImg: '/images/index/social_pic.jpg',
  icon: '/images/index/social_test.svg',
  title: '营会社交陪伴',
  intro: '智慧教室、数字教室、在线教室互动教学\n五大维度全方位护航成长',
},
]

// 当前项目
let runningList = [{
  id: 1,
  title: '留守儿童云陪伴计划',
  coverImg: "/images/index/left_behind.jpg",
  intro: '从小缺乏父母陪伴的留守儿童，容易产生心智失衡、学业退步、人生偏航等问题。以伴依托教育部人文社科重大项目成果，通过招募全国优秀高校大学生志愿者，为全国的乡村留守儿童提供精准、专业、长效的系统智慧陪伴、朋辈结对陪伴、课程指导陪伴和营会社交陪伴，让乡村孩子更加健康快乐地成长，让社会变得更加和谐美好。',
  url: '#'
}, {
  id: 2,
  title: '困难儿童陪伴计划',
  coverImg: "/images/index/under_privileged.jpg",
  intro: '贫穷、残疾、病患、失去双亲，是命运强加给困难儿童的枷锁，纵使他们热爱学习，追求上进，也没有能力改变现实，看不到前方的希望。每个困难儿童都值得被看见和关爱，以伴秉持“以爱之名，伴你成长”的公益服务初心，以心理学家领航、扎根公益与志愿服务的青年为主体，为家境较差的困难儿童提供精准、专业、长效的心理和素质陪伴，为社会输送具有使命感、责任感的优秀青年人才，汇聚青年力量推动教育公平和社会公益事业的发展。',
  url: '#'
}, {
  id: 3,
  title: '阅读云陪伴',
  coverImg: "/images/index/reading.jpg",
  intro: '让人有书看，让书有人看，让书成为一种力量！阅读云陪伴基于以伴“留守儿童云陪伴计划”第一期活动，根据学生年龄段选定书籍，由阅读云陪伴志愿者带领孩子精读一本好书，旨在促进学生阅读兴趣、语言能力和社交能力，培养良好的价值观和建立信任关系，丰富志愿者和学生的云陪伴形式。通过参与本次特色阅读活动，志愿者和学生将交流和理解不同的年龄群体和文化背景，提高学生学习兴趣和能力，克服阅读障碍和困难，培养创新思维方法和技巧。',
  url: '#'
}]

let autoplay = ref(true);
const animatedData = ref<NodeListOf<HTMLElement> | null>(null);
const isElementInViewport = (el: HTMLElement) => {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= window.innerHeight
  );
};

/**
 * @description 滚动事件监听：到指定位置计数器开始计数
 * @return void
 */
const handleScroll = function(){
  if (animatedData.value) {
  animatedData.value.forEach((data) => {
      if (isElementInViewport(data)) {
        autoplay.value = true;
      }
    });
  }
}

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
      dataList[0].data = res.data.allStudentNum;
      dataList[1].data = res.data.allVolunteerNum;
      dataList[2].data = res.data.allSchoolNum + 120;
      isDataShow.value = true;
    }
  } catch (error) {
    console.log("get:dataList",error);
  }
}

let isShowPartner = ref(false);
// 合作伙伴定义
let partner = reactive<
  {
    title: string, // 合作伙伴名称
    icon: string,  // 图标路径
    priority: string,  // 优先级 
    createTime: string  // 创建时间
  }[]>([]);

// partnerUrl = [
//   {
//     imgUrl: "/images/index/partner/byte.png",
//   },
//   {
//     imgUrl: "/images/index/partner/tx.png",
//   },
//   {
//     imgUrl: "/images/index/partner/iflytek.png",
//   },
//   {
//     imgUrl: "/images/index/partner/haoweilai.png",
//   },
//   {
//     imgUrl: "/images/index/partner/xindongfang.png",
//   },
//   {
//     imgUrl: "/images/index/partner/zhongguojiaoyuzaixian.png",
//   },
//   {
//     imgUrl: "/images/index/partner/tianlijiaoyu.png",
//   },
//   {
//     imgUrl: "/images/index/partner/qingshaonianfazhan.png",
//   },
//   {
//     imgUrl: "/images/index/partner/zhongguancun.png",
//   },
//   {
//     imgUrl: "/images/index/partner/zhongguorenkou.png",
//   },

// ];

const getPartners = async() => {
  const res = await getCooperator();
  console.log('合作伙伴：', res.data);
  partner = res.data;
  isShowPartner.value = true;
}


onMounted(() => {
    // 在页面加载时调用的函数逻辑
    // getDataList();
    animatedData.value = document.querySelectorAll('.sd-item');
    window.addEventListener('scroll', handleScroll);
    getDataList();
    getPartners();
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
/**变量声明 */
$indexTopHeight: 44em;

body {
  // scroll-behavior: auto;
  font-size: 16px;
}

/**模块间间距 */
.module-margin {
  margin: 4%;
  margin-top: 70px;
}

/**模块标题统一样式 */
.module-title {
  font-family: 'Alibaba Sans Black';
  font-size: 48px;
  color: rgba(47, 46, 52, 1);
}
@media screen and (max-width: 992px) {
  .module-title {
    font-size: 40px;
  }
}
@media screen and (max-width: 768px) {
  .module-title {
    font-size: 35px;
  }
}

/**模块内容统一样式 */
.module-content {
  margin-top: 50px;
  color: rgba(255, 255, 255, 1);
}

/**顶部 */
.common-top{
  overflow: hidden;
  width: 100%;
  height: $indexTopHeight;
  z-index: -1;
}

/**捐赠入口和数据展示 */
.wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
}

.donate-entry {
  display: flex;
  padding-top: 7%; 
  padding-right: 5%;
  padding-bottom: 7%;
  padding-left: 2%;
  height: auto;
  align-items: center;
  background: rgba(238, 106, 107, 1);
  // border-top: 38px solid rgba(255, 194, 194, 0.8);
  &:hover {
    background: rgb(223, 99, 99);
  }
  .support-us {
    display: flex;
    width: 100%;
    height: auto;
    align-items: center;
    &:hover {
    cursor: pointer;
  }
    .support-icon {
      width: 70px;
      height: auto;
    }
    .support-title {
      margin-left: 15px;
      font-size: 28px;
      color: rgb(255, 255, 255);
    }
    .support-text {
      margin-left: 30px;
      font-size: 16px;
      line-height: 1.7;
      text-align: justify;
      color: rgb(255, 255, 255);
    // color: rgba(245, 245, 220, 1);

    }
  }
  
}

/**数据展示 */
.serve-data {
  flex: 1;
  padding: 50px 0;
  height: auto;
  background-color: beige;
  // border-top: 38px solid rgba(255, 255, 228, 0.8);
}
.sd-item {
  box-sizing: border-box;
  padding: 20px 0;
  width: 100%;
  line-height: 1.6;
  text-align: center;

  .sd-title {
    font-family: sans-serif;
    font-size: 20px;
    color: rgba(166, 166, 166, 1);
  }
  .sd-data {
    display: inline-block;
    width: 100%;
    font-family: 'YouSheBiaoTiYuan'; /**优设标圆体 */
    font-size: 55px;
  }
}

@media screen and (max-width: 564px) {
  .sd-item {
    .sd-data {
      font-size: 48px;
    }
  }

}

/**我们的核心工作 */
/**简介文字渐显效果 */
@keyframes intro-fade-in {
 from {
  opacity: 0;
 }
 to {
  opacity: 1;
 }
}
.core-business {
  .cb-content {
    display: flex;
  }
  .cb-cover-img {
    width: 100%;
    height: 100%;
  }
  .cb-item {
    flex: 1;
    margin-left: 10px;
    padding: 40px;
    width: 108px;
    min-height: 420px;
    // background: rgba(128, 128, 128, 0.6);
    // background: rgba(238, 106, 107, 0.5);
    background: beige !important; /**权重超过行内style */
    color: rgba(0, 0, 0, 0.8);
    font-family: 'AlibabaPuHuiTi';
    font-size: 20px;
    transition: all ease-out 0.4s;
    .icon,.intro {
      display: none;
    }
    .title {
    writing-mode: vertical-rl;
    text-orientation: upright;
    line-height: 1.5;
    }
  }
  .cb-item-active {
    position: relative;
    flex: 4;
    margin-left: 10px;
    box-sizing: border-box;
    padding: 55px 38px 55px 58px;
    width: 575px;
    font-family: 'AlibabaPuHuiTi';
    font-size: 25px;
    background: rgba(238, 106, 107, 1);
    background-size: cover;
    transition: all ease-out 0.4s;
    .icon {
      display: block;
      position: absolute;
      top: 120px;
      width: 50px;
      height: 50px;
      background-repeat: no-repeat;
    }
    .num {
      position: absolute;
      top: 30px;
      right: 30px;
      font-size: 50px;
    }
    .title {
      position: absolute;
      top: 200px;
      font-size: 28px;
    } 
    .intro {
      display: block;
      position: absolute;
      top: 260px;
      left: 60px;
      right: 40px;
      line-height: 1.5;
      font-family: sans-serif;
      font-size: 16px;
      white-space: pre-line;
      animation: intro-fade-in 1.3s ease-in-out forwards;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: rgba(238, 106, 107, 0.7);
    }    
  }
  .item-title-active {
    font-size: 25px;
    color: rgba(255, 255, 255, 1);
  }

}

/**992px */
@media screen and (max-width: 992px) {

  .core-business {
    margin-top: 100px;
    .cb-title {
      font-size: 40px;
    }
    .cb-content {
      display: inline-block;
      padding: 0 5%;
      margin: 0 6%;
      width: 88%;
    }
    .cb-item {
      margin-top: 25px;
      width: 100%;
      min-height: 120px;
      font-size: 20px;
      transition: all ease-out 0.4s;
      .title {
      writing-mode: horizontal-tb;
      text-orientation: upright;
      line-height: 1.5;
      }
    }
    .cb-item-active { 
      margin-top: 25px;
      width: 100%;
      min-height: 380px;
      font-size: 32px;
      transition: all ease-out 0.4s; 
    }
  }
}

@media screen and (max-width: 564px) {
  .core-business {
    .cb-content {
      display: inline-block;
      padding: 0 3%;
      margin: 0 3%;
      width: 92%;
    }
    .cb-item-active { 
      padding: 30px;
      .intro {
        left: 30px;
        right: 20px;
      }
    }
  }
}

.current-project {
  height: auto;

  .cp-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .cp-content>:first-child {
    margin-left: 0;
  }
  .cp-item {
    overflow: hidden;
    // flex: 1;
    position: relative;
    margin-left: 20px !important;
    height: 400px;
    min-height: 400px;
    background-size: cover;
  }
  .cp-text-card {
    position: absolute;
    bottom: -80%;
    opacity: 0.9;
    padding: 30px;
    height: 400px;
    min-height: 280px;
    // background-color: rgb(195, 195, 195, 0.5);
    background-color: rgb(241, 128, 129);
    -webkit-transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
		transition: all 300ms cubic-bezier(.02, .01, .47, 1);
  }
  .cp-item:hover .cp-text-card{
    opacity: 1;    
    transform: translate(0,-80%);
	  transition-delay: 0.1s !important;
  }
  
  .cp-item-title {
    font-family: 'AlibabaPuHuiTi';
    font-size: 24px;
    text-align: center;
  }
  .cp-item-intro {
    margin-top: 15px;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 1.7;
  }
}

/**1200px */
@media screen and (max-width: 1200px) {
  .current-project {
    .cp-content {
      // display: block;
      // padding: 0 6%;
      padding: 0;
      margin: 0 auto;
      width: 100%;
      height: auto;
    }

    .cp-item {
      margin-top: 40px;
      margin-left: 0 !important;
      height: auto;
    }
    .cp-text-card {
      padding: 30px;
    }

    .cp-item-title {
      font-size: 25px;
    }
    .cp-item-intro {
      font-size: 16px;
    }
  }
}

/**564px手机端 */
@media screen and (max-width: 564px) {
  .current-project {

    .cp-text-card {
      padding: 30px;
    }

    .cp-item-title {
      font-size: 20px;
    }
    .cp-item-intro {
      font-size: 14px;
    }
    .cp-text-card {
      bottom: -85%;
    }
    .cp-item:hover .cp-text-card{  
      transform: translate(0,-85%);
    }
  }
}

/**410px */
@media screen and (max-width: 410px) {
  .current-project {

    .cp-text-card {
      padding: 15px;
    }

    .cp-item-title {
      font-size: 20px;
    }
    .cp-item-intro {
      font-size: 14px;
    }
  }
}

/**合作伙伴 */
.coop-partner {
  .coop-title {
    font-size: 48px;
    color: rgba(47, 46, 52, 1);
  }
  .coop-content {
    margin: 1%;
  }
  .cp-img-box {
     
    img {
      width: 180px;
      height: 100px;
      object-fit: cover;
      // background-color: antiquewhite;
    }
  }

}

@media screen and (max-width: 1200px) {
  .cp-img-box {
     
     img {
       width: 100px;
       height: 100px;
       object-fit: cover;
       // background-color: antiquewhite;
     }
   }
}

@media screen and (max-width: 1100px) {
  .coop-partner {
    .coop-icon {
      height: 380px;
    }
  }
}
@media screen and (max-width: 992px) {
  .coop-content {
    margin: 0 8%;
  }
}

@media screen and (max-width: 768px) { 
  .coop-partner {
  .cp-img-box {
     
     img {
       width: 140px;
       height: 80px;
     }
   }
  }
}
/**564px手机端 */
@media screen and (max-width: 564px) {
  .coop-partner {
  .cp-img-box {
     
     img {
       width: 100px;
       height: 60px;
     }
   }
  }

}
</style>
