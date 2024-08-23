<template>
 
  <!-- 顶部背景 -->
  <Support :titleCh="titleCh" :titleEn="titleEn" />
  <!-- 联系信息 -->
  <div class="contact-information">
   <div class="ci-email">
    <img src="@/assets/images/coorperation/email.png" alt="合作邮箱" class="ci-icon" />
    <p class="ci-title">合作邮箱</p>
    <p class="ci-content">463211838@qq.com</p>
   </div>
   <div class="border"></div>
   <div class="ci-address">
    <img src="@/assets/images/coorperation/address.png" alt="广州总部地址" class="ci-icon" />
    <p class="ci-title">广州总部地址</p>
    <p class="ci-content">广州市番禺区大学城中环西路206号广州大学商业中心F2</p>
   </div>
   <div class="border"></div>
   <div class="ci-tel">
    <img src="@/assets/images/coorperation/tel.png" alt="全国免费热线" class="ci-icon" />
    <p class="ci-title">全国免费热线</p>
    <p class="ci-content">暂未开通</p>
   </div>
  </div>

  <!-- 交互地图 -->
  <div class="map">
   <el-amap
    v-loading="isloading"
    ref="map"
    :vid="'amapDemo'"
    :center="center"
    :zoom="zoom"
    :events="events"
    class="amap-demo"
   >
    <!-- :plugin="plugin" -->
    <!-- <el-amap-marker v-for="(u,i) in markers" :position="u.position" :key="i">
          </el-amap-marker> -->
    <!-- <el-amap-marker :position="[121.5273285, 31.21515044]"> -->
    <el-amap-marker :position="[113.372635, 23.041615]"> </el-amap-marker>
   </el-amap>
  </div>

  <div>
   <div class="first-bar">
    <div class="content">
     <div class="container">
      <p>了解以伴活动动态</p>
      <p class="space"></p>
      <p>公众号: 以伴新青年</p>
      <div class="text">
       官网网址: yiban.site
       <img src="@/assets/images/coorperation/globe.png" />
      </div>
     </div>
     <img
      class="QRcode"
      src="@/assets/images/coorperation/official_QRcode.jpg"
     />
    </div>
   </div>
   <div class="second-bar">
    <div class="content">
     <img
      class="QRcode"
      src="@/assets/images/coorperation/gw_QRcode.jpg"
     />
     <div class="container">
      <p>公益伴学项目合作</p>
      <p class="space"></p>
      <div class="text">
       <img src="@/assets/images/coorperation/phone.png" />
       负责人龚旺:13727518403
      </div>
     </div>
    </div>
   </div>
   <div class="three-bar">
    <div class="content">
     <div class="container">
      <p>公益伴学服务申请</p>
      <p class="space"></p>
      <div class="text">
       负责人吴清清:15602254305
       <img src="@/assets/images/coorperation/phone.png" />
      </div>
     </div>
     <img
      class="QRcode"
      src="@/assets/images/coorperation/wqq_QRcode.png"
     />
    </div>
   </div>
  </div>
 
</template>
<script setup lang="ts">

useHead({
 title: "合作交流",
 titleTemplate(title) {
  return title ? `以伴-${title}` : "";
 },
 meta: [
  { name: "description", content: "以伴合作交流" },
  { name: "keywords", content: "合作交流, 合作邮箱, 总部地址" },
 ],
});

// 地图参数设置
// const center =  [121.5273285, 31.21515044];
const center = [113.372635, 23.041615];
const zoom = 10;
// const zoom = 20;

// const position =  [121.5273285, 31.21515044];
const position = [113.372635, 23.041615];
const events = {
 init(o: { getCenter: () => any }) {
  console.log(o.getCenter());
 },
 zoomchange: (e: any) => {
  console.log(e);
 },
 zoomend: (e: any) => {
  //获取当前缩放zoom值
  // console.log($refs.map.$$getInstance().getZoom());
  // console.log(e);
 },
 click: (e: any) => {
  alert("map clicked");
 },
};
const markers = [
 {
  position: [121.5273285, 31.21515044],
 },
 {
  position: [121.5174286, 31.21515044],
 },
];

// const plugin: [
//   {
//       pName: 'Scale',
//       events: {
//           init(instance) {
//               console.log(instance)
//           }
//       }
//   },
//   {
//       pName: 'ToolBar',
//       events: {
//           init(instance) {
//               console.log(instance)
//           }
//       }
//   }
// ]


const titleCh = "合作交流";
const titleEn = reactive(["Contact", "Us"]);
let isloading = false;
let timer: NodeJS.Timeout | null = null;

// 地图加载函数
const mapRender = () => {
 timer = setTimeout(() => {
  isloading = true;
  console.log("地图加载完成");
 }, 1000);
};

onMounted(() => {
 mapRender();
});

onBeforeUnmount(() => {
 clearTimeout(timer as NodeJS.Timeout);
 timer = null;
});
</script>

<style lang="scss" scoped>
/**联系信息start */
.contact-information {
 display: flex;
 flex-wrap: wrap;
 margin: 100px 113px 50px;
 justify-content: center;
 font-size: 16px;
 text-align: center;
}

.ci-email,
.ci-tel {
 flex: 1;
 margin: 50px 0;
 box-sizing: border-box;
 text-align: center;
 overflow-wrap: break-word;
}

.ci-address {
 flex: 1;
 margin: 50px 50px;
 box-sizing: border-box;
 text-align: center;;
}
.ci-icon {
 width: 60px;
 height: 60px;
}
.ci-title {
 margin-top: 23px;
 color: rgba(128, 128, 128, 1);
}
.ci-content {
 margin-top: 25px;
 color: rgba(0, 0, 0, 1);
}
.border {
 display: inline-block;
 height: 167px;
 opacity: 1;
 background: rgba(204, 204, 204, 1);
 border: 1px solid rgba(166, 166, 166, 1);
}

/**992px */
@media screen and (max-width: 992px) {
 .ci-email,
 .ci-address,
 .ci-tel {
  width: 45%;
 }
}

/**768px */
@media screen and (max-width: 768px) {
  .contact-information {
    margin: 50px 15%;
  }
 .ci-email,
 .ci-address,
 .ci-tel {
  flex: none;
  margin-bottom: 20px;
  width: 100%;
 }

 .ci-address {
  margin-left: 40px;
  // margin-right: 0;
 }

 .border {
  // opacity: 0;
  display: none;
 }
}

/**交互地图start */
.map {
 margin: 0 auto;
 width: 80%;
 height: 522px;
}

/**合作申请start */
.first-bar,
.second-bar,
.three-bar {
 margin-top: 117px;
 padding: 32px 109px;
 height: 280px;
 justify-content: center;
 text-align: center;
 .container {
  // font-size: 34px;
  font-size: 28px;
  font-weight: 600;
  text-align: left;

  img {
   margin-left: 10px;
   width: 62px;
   height: 62px;
  }
 }
 .QRcode {
  margin: auto 0;
  width: 200px;
  margin-left: auto;
 }
}

/**992px */
@media screen and (max-width: 992px) {
 .first-bar,
 .second-bar,
 .three-bar {
  padding: 30px 50px;
  .content {
   .container {
    font-size: 24px;
   }
  }
 }
}
.first-bar {
 justify-content: center;
 text-align: center;
 background: linear-gradient(270deg, rgba(225, 234, 239, 1) 0%, rgba(230, 193, 193, 0.01) 100%);
 .content {
  display: flex;
 }
}
/**768px */
@media screen and (max-width: 768px) {
 .first-bar {
  height: auto;
  .content {
   display: inline-block;
   text-align: center;
   .container {
    text-align: center;
    img {
     display: none;
    }
   }
   .QRcode {
    margin: 10px;
    width: 150px;
   }
  }
 }
}

.second-bar {
 height: 280px;
 margin: 57px 0;
 background: linear-gradient(270deg, rgba(127, 230, 2, 0.01) 0%, rgba(236, 209, 209, 1) 100%);
 padding: 32px 109px;
 .content {
  display: flex;
  .container {
   text-align: right;
   margin-left: auto;
   img {
    margin-right: 10px;
    width: 62px;
    height: 62px;
   }
  }
  .QRcode {
   margin: auto 0;
  }
 }
}

@media screen and (max-width: 768px) {
 .second-bar {
  height: auto;
  .content {
   display: inline-block;
   text-align: center;
   .container {
    text-align: center;
    img {
     display: none;
    }
   }
   img {
    margin: 10px;
    width: 150px;
   }
  }
 }
}

.three-bar {
 margin: 57px 0;
 background: linear-gradient(270deg, rgba(239, 140, 141, 1) 0%, rgba(165, 214, 63, 0.01) 100%);
 .content {
  display: flex;
  // flex-wrap: wrap;
  padding: 20px;
  .container {
   text-align: left;

   img {
    margin-left: 10px;
    width: 62px;
    height: 62px;
   }
  }
  .QRcode {
   // margin: auto 0;
   margin-left: auto;
   width: 200px;
  }
 }
}
/**768px */
@media screen and (max-width: 768px) {
 .three-bar {
  height: auto;
  .content {
   display: inline-block;
   text-align: center;
   .container {
    text-align: center;
    img {
     display: none;
    }
   }
   .QRcode {
    margin: 10px;
    width: 150px;
   }
  }
 }
}

.space {
 height: 35px;
}
.coor-apply {
 margin-top: 34px;
 width: 100%;
 height: 246px;
}
.coor-apply:last-child {
 padding-bottom: 57px;
}

/**合作申请end */
</style>
