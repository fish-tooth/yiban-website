<template>
 <div>
  <div class="coorperation-bg">
  <div class="coorperation-title">
   <div class="en">{{ titleEn[0] }}</div>
   <div class="ch">{{ titleCh }}</div>
   <div class="en">{{ titleEn[1] }}</div>
  </div>
 </div>
</div>
</template>

<script lang="ts" setup>
const props = defineProps({
 titleCh: {
  type: String,
  required: true,
 },
 titleEn: {
  type: Array,
  required: true,
 },
});
</script>

<style lang="scss" scoped>
/**顶部背景 */
.coorperation-bg {
 padding: 30px 50px;
 margin-top: 74px;
 width: 100%;
 height: auto;
 min-height: 200px;
 background: linear-gradient(-20deg, rgba(237, 157, 157, 0.8) 60%, rgba(224, 184, 184, 0.1) 100%);
}

/**大标题 */
.coorperation-title {
 font-family: "Alibaba Sans Black";
 text-align: right;
 color: rgba(255, 255, 255, 1);

 .ch {
  font-size: 60px;
 }

 .en {
  font-size: 38px;
 }
}
/**1200px */
@media screen and (max-width: 1200px) {
 /**大标题 */
 .coorperation-title {
  .ch {
   font-size: 60px;
  }
  .en {
   font-size: 40px;
  }
 }
}

/**768px */
@media screen and (max-width: 768px) {
 /**大标题 */
 .coorperation-title {
  .ch {
   font-size: 50px;
  }
  .en {
   font-size: 32px;
  }
 }
}

/**768px */
// @media screen and (max-width: 768px) {
//  /**大标题 */
//  .coorperation-title {
//   top: 9%;
//   .ch {
//    font-size: 40px;
//   }
//   .en {
//    font-size: 30px;
//   }
//  }
// }
</style>
