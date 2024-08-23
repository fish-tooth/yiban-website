<template>
    <div>
      <!-- 顶部背景 -->
      <Support :titleCh="titleCh" :titleEn="titleEn" />
      <CommonTitle style="margin-top: 100px;" :comTitleCh="'以伴智能伴学系统'" :comTitleEn="'INTELLIGENT SYSTEM'" />
    </div>
    <div class="step-intro">
      <!-- <div class="words1">在这里，<br>你的价值得以最好的体现。</div> -->
      <el-row justify="space-around">
        <!-- 智能教库 -->     
        <el-col :span="8" :lg="24" :md="24" :sm="24" :xs="24" :xl="30">
        <!-- <div class="tech-course-text">智能教库</div> -->
        <div class="tech-course">
          <div class="tech-course-picture">
            <img src="@/assets/images/volunteer/yiban_edu.jpg"/>
          </div>
          <!-- 文案 -->
          <div class="tcourse-box animated-text">
            <p>自研匹配算法实现精准化师生结对</p>
            <p>智能档案实现学生个性化成长建档</p>
            <p>智能测评提供免费的心理健康普查服务</p>
          </div>
        </div>  
        </el-col>

        <el-col :span="8" :lg="24" :md="24" :sm="24" :xs="24" :xl="30">
          <div class="tech-course">
            <div class="tcourse-box animated-text">
            <p>1000名优秀大学生在线交互</p>
            <p>100余名心理咨询师云端关怀</p>
            <p>智能心理咨询机器人实现自动答复</p>
          </div>
          <div class="tech-course-picture">
            <img src="@/assets/images/volunteer/community.jpg"/>
          </div>
          
        </div>
      </el-col>
        <el-col :span="8" :lg="24" :md="24" :sm="24" :xs="24" :xl="30">
          <div class="tech-course">
            
          <div class="tech-course-picture">
            <img src="@/assets/images/volunteer/course.jpg"/>
          </div>
          <div class="tcourse-box animated-text">
            <p>自主研发心理健康教育课程</p>
            <p>自主研发心灵急救包、趣味拓展科普课程等内容</p>
            <p>学情诊断式的个性化自适应教育机制</p>
          </div>
        </div>
      </el-col>
      </el-row>
<!--       
      志愿者形象
      <div class="volunteer-image"><img src="~assets/images/volunteer/volunteer.png"></div> -->
    </div>
      
    <CommonTitle :comTitleCh="'志愿者注册登记操作说明'" :comTitleEn="'REGISTER INFORMATION'" />
    <div class="register-information">

      <div class="ri-box">
        <el-row :gutter="100" justify="space-around">
          <el-col :span="8" :lg="8" :md="8" :sm="11" :xs="24" :xl="24">
            <div class="ri-col">
              <p>扫码查看，快速上手</p>
              <img src="@/assets/images/volunteer/mannual_QRcode.jpg"
                alt="">
              <p class="animated-text" style="margin-top: 20px;color: rgba(145, 49, 28, 1);">小程序指引手册</p>
            </div>
          </el-col>
          <el-col :span="8" :lg="8" :md="8" :sm="11" :xs="24" :xl="24">
            <div class="ri-col">
              <p>小程序入口!</p>
              <img src="@/assets/images/volunteer/enter_QRcode.png"
                alt="">
              <p class="animated-text" style="margin-top: 20px;color: rgba(145, 49, 28, 1);">以伴云陪伴小程序</p>
            </div>
          </el-col>
          <el-col :span="8" :lg="8" :md="8" :sm="11" :xs="24" :xl="24">
            <div class="ri-col">
              <p>志愿咨询，不再错过!</p>
              <img src="@/assets/images/volunteer/official_QRcode.jpg"
                alt="">
              <p class="animated-text" style="margin-top: 20px; color: rgba(145, 49, 28, 1);">微信公众号</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="subscribe">
        <el-row :gutter="24">
          <el-col :lg="12" :xs="24">
            <div class="wechat-subscribe">
              <div class="text-1 animated-text">关注我们，一起成长！</div>
              <div class="text-2 animated-text">视频号：以伴新青年</div>
              <div class="text-2 animated-text">抖音号：以伴新青年</div>
              <div class="text-2 animated-text">小红书：以伴新青年</div>
              <div class="text-2 animated-text">微博号：以伴青少年发展中心</div>
              <div class="text-1">四大平台，资讯不断！</div>

            </div>
          </el-col>
          <el-col :lg="12" :xs="24">
            <div class="redbook-subscribe">
              <!-- <div class="text-3">小红书：以伴新青年</div> -->
              <img 
                src="@/assets/images/volunteer/xhs.jpg"
                alt="小红书号">
              <img 
              src="@/assets/images/volunteer/douyin.jpg"
              alt="抖音号">
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="join">
        <el-row>
          <el-col :lg="8" :xs="24"
            style="display: flex;align-items: center;justify-content: center;">
            <p class="p1">还在等什么？</p>
          </el-col>
          <el-col :lg="8" :xs="24">
            <img class="join-img" src="@/assets/images/volunteer/join.jpg" alt="">
          </el-col>
          <el-col :lg="8" :xs="24"
            style="display: flex;align-items: center;justify-content: center;">
            <p class="p2">加入我们吧！</p>
          </el-col>
        </el-row>
      </div>

    </div>
  
</template>

<script lang="ts" setup>
const titleCh = '志愿者招募'
const titleEn = reactive(['VOLUNTEER', 'RECRUIT']);

const animatedTexts = ref<NodeListOf<HTMLElement> | null>(null);

useHead({
 title: "志愿者招募",
 titleTemplate(title) {
  return title ? `以伴-${title}` : "";
 },
 meta: [
  { name: "description", content: "以伴志愿者招募" },
  { name: "keywords", content: "以伴, 志愿者招募, 志愿者指引" },
 ],
});

onMounted(() => {
  animatedTexts.value = document.querySelectorAll('.animated-text');
  console.log('animatedTexts.value',animatedTexts.value)
  window.addEventListener('scroll', fadeInOnScroll);
});

const fadeInOnScroll = () => {
  if (animatedTexts.value) {
    animatedTexts.value.forEach((text) => {
      if (isElementInViewport(text)) {
        text.classList.add('fade-in');
      }
    });
  }
};

onBeforeUnmount(() => {
  window.removeEventListener('scroll', fadeInOnScroll);
});
const isElementInViewport = (el: HTMLElement) => {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= window.innerHeight
  );
};
</script>


<style scoped lang="scss">

@media screen and (max-width: 992px) {
  .tech-course {
    display: block;
  }
}
.animated-text {
  opacity: 0;
  transform: translateY(40px);
  // transition: opacity 1s, transform 0.8s;
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
}


// @media screen and (max-width: 768px) {
//   .animated-text {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

/**小程序操作介绍 */

.words1 {
  font-size: clamp(5px, 2vw, 20px);
  /* color: rgba(148, 72, 72, 1); */
  background: linear-gradient(to top, rgba(148, 72, 72, 1), rgba(148, 72, 72, 0.8), rgba(148, 72, 72, 0.6), rgba(148, 72, 72, 0.2)) text;
  color: transparent;
  text-align: left;
  padding-left: 10px;
  /* padding-left: clamp(15px, 2vw, 60px); */
  margin-top: -10px;
}

.step-intro {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  z-index: -2;
  // background: conic-gradient(from 90deg at 50% 50%, rgba(246, 184, 184, 1) -1%, rgba(247, 194, 193, 0.72) 9.03%, rgba(247, 197, 195, 0.65) 10.44%, rgba(242, 172, 170, 0.01) 49.63%, rgba(252, 203, 202, 0.72) 82.5%, rgba(246, 184, 184, 1) 100%, rgba(246, 184, 184, 1) 100%);
  background: linear-gradient(204deg,  rgba(255, 216, 214, 0.6) 0%, rgba(254, 215, 214, 0.01) 100%);

}

/* 智能教库 */
.tech-course {
  display: flex;
  justify-content: space-around;
  padding: 10px 16%;
}
.tech-course-picture {
  /* display: flex; */
  text-align: center;
  justify-content: center;
  gap: 300px;
  margin-top: 40px;
  img {
    display: inline-block;
    width: 500px;
  }
  
}


.tech-course-text {
  display: flex;
  justify-content: center;
  font-size: clamp(18px, 3vw, 36px); 
  letter-spacing: 10px;
  color: rgba(0, 0, 0, 1);
  margin-top: 30px;
}
.tcourse-box {
  // display: flex;
  margin-left: 30px;
  margin-top: 10%;
  align-items: center;
  line-height: 2;
  font-size: 20px;
  transition: all 0.8s ease-in-out;
  p {
    // color:rgba(106, 28, 6, 0.6);
    // background: linear-gradient(to top, rgba(148, 72, 72, 1), rgba(148, 72, 72, 0.8), rgba(148, 72, 72, 0.6), rgba(148, 72, 72, 0.2)) text;
    // color: transparent; // 手机端无法显示效果
    color: rgba(145, 49, 28, 0.6);
  }
}

@media screen and (max-width: 1000px) {
  .tcourse-box {
    margin-top: 50px;
    text-align: center;
  }
  .tech-course {
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .tcourse-box {
    font-size: 18px;
  }
  .tech-course-picture {
    img {
      display: inline-block;
      width: 400px;
    }
  }
}

@media screen and (max-width: 500px) {
  .tcourse-box {
    font-size: 16px;
  }
  .tech-course-picture {
    img {
      display: inline-block;
      width: 250px;
    }
  }
}

/* 志愿者形象
.volunteer-image img {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 364px;
  height: 446px;
  margin-top: 20px;
  z-index: -1;

} */

/**志愿者注册登记操作说明 */
.register-information {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  // background: linear-gradient(180deg, rgba(242, 203, 203, 1) 0%, rgba(255, 251, 227, 1) 100%);
  background: linear-gradient(180deg, rgba(254, 250, 227, 0) 0%, rgba(255, 251, 227, 1) 100%);
}

/** 二维码部分 start*/
.ri-box {
  display: flex;
  margin: 0 12%;
  align-items: center;
  text-align: center;
  justify-content: space-around;
}

.ri-col {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 60px;
  margin-right: 30px;
  img {
    margin-top: 30px;
    width: 250px;
  }
  p {
    font-family: 'Alibaba Sans Black';
    font-size: 25px;
  }

}

.ri-col:last-child {
  margin-right: 0;
}

@media screen and (max-width: 500px) {
  .ri-col {
    img {
      margin-top: 30px;
      width: 200px;
    }
    p {
      font-size: 22px;
    }

  }
}

// .handbook-text, .miniprogram-text, .wechat-text {
//   font-family: 'Alibaba Sans Black';
//   // font-size: clamp(16px, 2vw, 31px);
//   font-size: 25px;
//   color: rgba(0, 0, 0, 1);
//   margin-bottom: 20px;
//   img {
//     display: inline-block;
//     width: 250px;
//     height: 250px;
  
//   }
// }

.handbook-name,
.miniprogram-name,
.wechat-name {
  font-family: 'Alibaba Sans Black';
  margin-top: 20px;
  // font-size: clamp(18px, 2vw, 36px);
  font-size: 25px;
  color: rgba(145, 49, 28, 1);
  text-align: center;
  vertical-align: top;
}

/*二维码部分 end*/

/*关注我们部分 start*/
.subscribe {
  display: flex;
  justify-self: center;
  align-items: center;
  // margin-top: ;
  margin: 100px 15%;

}
/*关注微信公众号 start*/

.wechat-subscribe {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // margin: 50px 200px;
}

.wechat-subscribe img {
  width: 670px;
  height: 670px;
}

@media screen and (max-width: 500px) {
  .subscribe {
    margin: 0;
  } 
}

.text-1 {
  font-family: 'Alibaba Sans Black';
  // height: 100px;
  /** 文本1 */
  font-size: clamp(24px, 2.5vw, 48px);
  line-height: 57px;
  color: rgba(0, 0, 0, 1);
  text-align: left;
  // transition: all 0.8s ease-in-out;

}

.text-2 {
  font-family: 'Alibaba Sans Black';
  height: 70px;
  /** 文本1 */
  font-size: clamp(18px, 2vw, 36px);
  font-size: 28px;;
  line-height: 43px;
  color: rgba(145, 49, 28, 1);
  text-align: left;
  transition: all 0.8s ease-in-out;

}

/*关注微信公众号 end*/

/*关注小红书 start*/
.redbook-subscribe {
  display: flex;
  height: auto;
  justify-content: center;
  img {
    // flex: 1;
    padding-right: 30px;
    height: 400px;
  }
}
@media screen and (max-width: 500px) {
  .redbook-subscribe {
    img {
      padding-right: 0;
    }
  }
}

@media (max-width: 1200px) {

  .wechat-subscribe,
  .redbook-subscribe {

    align-items: center;
    img {
      margin-top: 50px;
    }
  }

  .text-1,
  .text-2 {
    text-align: center;
  }

}

@media (max-width: 900px) {

  .wechat-subscribe,
  .redbook-subscribe {
    flex-wrap: wrap;
    align-items: center;
    img {
      margin-top: 50px;
    }
  }

  .text-1,
  .text-2 {
    text-align: center;
  }
}

/**关注小红书 end*/
/**关注我们部分 end*/

/**加入我们部分 */
.join {
  margin-top: 20px;
  margin-bottom: 50px;
}

.p1,
.p2 {
  width: auto;
  font-family: 'Alibaba Sans Black';
  font-size: 30px;
  color: rgba(171, 112, 99, 1);
}

.join-img {
  display: inline-block;
  width: 400px;
  height: 400px;
}

@media screen and (max-width: 500px) {
  .p1,
  .p2 {
    font-size: 25px;
  }

  .join-img {
    width: 280px;
    height: 280px;
  }
}
</style>