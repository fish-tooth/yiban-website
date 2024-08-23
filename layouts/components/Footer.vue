<template>
 <div class="footer">
  <div class="title">
    <!-- <img class="logo" src="/favicon.ico" alt="logo" /> -->
    <!-- <div class="name">以伴青少年<br />发展中心</div> -->
    <img src="@/assets/images/layout/xiaoban.png" class="xiaoban" alt="小伴"/>
   <!-- <img class="logo" src="/favicon.ico" alt="图片加载失败" /> -->
   <!-- <img style="margin-right: -300px;width: 120px;" src="@/assets/images/layout/微信图片_20240209182225(1)(1).png" alt="图片加载失败" /> -->
  </div>

  <div class="QR-code">
    <div class="QR-code"> 
        <img
      src="@/assets/images/layout/official_QRcode.jpg"
      alt="公众号二维码" />
      <div class="donate">
          <div class="button">公众号</div>
          <p>微信扫描二维码</p>
          <p>关注“以伴新青年”</p>
      </div>
    </div>

    <div class="QR-code">
      <img
    src="@/assets/images/layout/enter_QRcode.png"
    alt="小程序二维码" />
      <div class="donate">
          <div class="button">小程序</div>
          <p>微信扫描二维码</p>
          <p>进入“以伴云陪伴”</p>
      </div>
    </div>
  </div>

  <div class="more">
  <div class="right-info">
   <div>更多页面</div>
   <ul>
    <li v-for="(item, index) of showMorePage" :key="index">
      <NuxtLink :to="item.url" class="more-page">{{ item.title }}</NuxtLink>
    </li>
   </ul>
  </div>
   <div class="section">
    <div class="group">
     <div class="contact"><img class="contact-img" src="@/assets/images/layout/email.png" /><p>邮箱 :  463211838@qq.com</p></div>
     <div class="contact"><img class="contact-img" src="@/assets/images/layout/weibo.png" /><p>微博 :  @以伴青少年发展中心</p></div>
     <div class="contact"><img class="contact-img" src="@/assets/images/layout/xiaohongshu.png" /><p>小红书 :  以伴新青年</p></div>
      <div class="contact"><img class="contact-img" src="@/assets/images/layout/douyin.png" /><p>抖音号 :  yibanjiaoyu</p></div>
    </div>
   </div>
  </div>
 </div>
 <div class="website-info">
    <span class="font_1">版权所有：广州市番禺区以伴青少年发展中心版权所有</span>
    <span class="font_1">网站备案：粤ICP备2021121206号</span>
  </div>
</template>

<script setup lang="ts">
const route = useRoute(); // 使用 useRoute 获取当前路由信息

// 页面导航定义
const menu = [
 {
  index: 1,
  title: "首页",
  name: "index",
  url: "/",
 },
 {
  index: 2,
  title:  "新闻中心",
  name: "news",
  url: "/news",
 },
 {
  index: 3,
  title:  "公益项目",
  name: "program",
  url: "/program",
 },
 {
  index: 4,
  title:  "公益视频",
  name: "videos",
  url: "/videos",
 },
  {
  index: 5,
  title:  "关于我们",
  name: "about",
  url: "/about",
 },
 {
  index: 6 - 1,
  title: "加入以伴",
  name: "recruit-join",
  url: "/recruit/join",
  },
  {
  index: 6 - 2,
  title: "志愿者招募",
  name: "recruit-volunteer",
  url: "/recruit/volunteer",
  },
 {
  index: 7,
  title: "合作交流",
  name: "cooperation",
  url: "/cooperation",
 },
];

// 更多页面
let showMorePage = reactive<(
{
  index: number,
  title: string,
  name: string,
  url: string,
  children?: string,
})[]>([]);

/**
 * @description 显示更多页面
 * @return void
 */
const getMorePage = () => {
  console.log('route:', route.name);
    showMorePage = menu.filter((item, index)=> {
    return item.name != route.name
  })
  const shuffled = showMorePage.sort(() => Math.random() - 0.5);
  showMorePage = shuffled.slice(0, 4);
  console.log("showMorePage:",showMorePage)
  nextTick(() => {
    console.log("showMorePage:", showMorePage);
  });
}

watchEffect(() => {
  getMorePage();
})
onMounted(() => {
})


</script>

<style lang="scss" scoped>
%common-flex {
 display: flex;
 align-items: center;
}

.footer {
 @extend %common-flex;
 flex-wrap: wrap;
 justify-content: space-around;
 padding-top: 20px;
 padding-bottom: 10px;
 padding-left: 20px;
 padding-right: 20px;
 margin: 0 auto;
 width: 100%;
 height: auto;
 text-align: center;
 background-color: rgba(47, 46, 52, 1);
 align-items: center;
}

.title {
 @extend %common-flex;
//  margin-left: 37px;
 width: auto;
 min-width: 90px;
//  height: 100%;
}

// .logo {
//  flex-shrink: 0;
//  width: 40px;
//  height: 40px;
//  min-width: 30px;
//  min-height: 30px;
// }

// .name {
//    margin-left: 10px;

//    font-family: sans-serif;
//    font-size: 16px;
//    text-align: left;
//    color: rgb(255, 255, 255);
//   }

.xiaoban {
  flex-shrink: 0;
  width: 110px;
}

.more {
 text-align: left;
 color: rgb(255, 255, 255);
}

ul {
 display: flex;
 margin-top: 10px;
//  margin-left: -40px;
 margin-bottom: 10px;
 text-align: left;
 li {
  width: auto;
  margin-right: 20px;
  height: 1.3vw;
  list-style: none;
  .more-page {
    color: rgb(179, 179, 179);

    &:hover {
    color: rgb(230, 230, 230);

    }
  }
 }
}


// 网站备案start
.section {
//  background-color: #2f2e34;
 text-align: left;
}

.contact {
  display: flex;
  align-items: center;
  line-height: 2;
  .contact-img {
    display: inline-block;
    width: 22px;
    height: 22px;
  }
  p {
    display: inline-block;
    margin-left: 15px;
    font-size: 14px;
  }
}

.website-info {
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 100%;
  justify-content: space-around;
  background-color: rgb(54, 54, 54)

}
.font_1 {
 font-size: 12px;
 font-family: sans-serif;
 line-height: 16px;
 font-weight: 500;
 color: #b3b3b3;
//  color: #000000;
//  text-align: right;
}

// 网站备案end


.QR-code {
 display: flex;
 flex-wrap: wrap;
 padding-left: 15px;
//  padding-top: 20px;
 padding-bottom: 10px;
//  padding-right: 60px;
 align-items: center;
 justify-content: flex-start;
}
.QR-code img {
 margin-right: 30px;
 width: 170px;
 height: 170px;
}
.donate {
 font-family: 'Alibaba Sans Black';
 font-size: 18px;
 line-height: 1.5;
 color: rgb(252, 252, 252);
 text-align: left;
 .button {
   margin-bottom: 10px;
   width: 110px;
   height: 30px;
   line-height: 30px;
   background-color: rgb(245, 171, 171); 
   border-radius: 20px;
   text-align: center;
 }
}

@media screen and (max-width: 992px) {
 .xiaoban {
  display: none;
 }
 .right-info {
  display: none;
 }
 .footer {
  padding-right: 60px;
  align-items: center;
 }

 .QR-code {
    padding-top: 10px;
    margin: 0 auto;
    // text-align: left;
  }
}

@media screen and (max-width: 768px) {
 .footer {
  padding-right: 0;
  justify-content: space-between;
 }
//  .logo {
//   margin-left: 30px;
//  }
  .xiaoban {
    margin-left: 30px;
  }
  .more {
    width: 100%;
  }
 .section {
  width: 100%;
  text-align: center;
  .group {
    display: inline-block;
  }
 }
}

@media screen and (max-width: 564px) {
  .QR-code {
    justify-content: center;
    img {
      margin-bottom: 10px;
    }
  }
}

</style>
