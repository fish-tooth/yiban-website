<template>

  <div class="pagination-box">
      <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          background
          v-model:total="total"
          :pager-count="pagerCount"
          layout="prev, pager, next"
          class="mt-4"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          hide-on-single-page/>
  </div>
  <!-- @size-change="handleSizeChange" -->
  <!-- :page-sizes="[10, 20, 30, 50, 100]" -->
</template>
<script lang="ts" setup>
import { computed } from 'vue'

// defineOptions({ name: 'Pagination' })

const props = defineProps({
  // 总条目数
  total: {
    required: true,
    type: Number,
    default: 10
  },
  // 当前页数：pageNo
  pageNo: {
    type: Number,
    default: 1
  },
  // 每页显示条目个数：pageSize
  pageSize: {
    type: Number,
    default: 10
  },
  // 设置最大页码按钮数 页码按钮的数量，当总页数超过该值时会折叠
  // 移动端页码按钮的数量端默认值 7
  pagerCount: {
    type: Number,
    default: 7
    // default: document.body.clientWidth < 992 ? 5 : 7   // 2023/08/20 删 此处编写浏览器端执行的代码会报错
  }
})

const emit = defineEmits(['update:pageNo', 'update:pageSize','update:total', 'pagination'])

const pageNo = computed({
  get() {
    return props.pageNo
  },
  set(val) {
    // 触发 update:page 事件，更新 limit 属性，从而更新 pageNo
    // console.log('pageNo',val)
    emit('update:pageNo', val)
  }
})

const pageSize = computed({
  get() {
    return props.pageSize
  },
  set(val) {
    // 触发 update:limit 事件，更新 limit 属性，从而更新 pageSize
    // console.log('pageSize',val)
    emit('update:pageSize', val)
  }
})

const total = computed({
  get() {
    return props.total
  },
  set(val) {
    // 触发 update:total 事件，更新 total 属性
    console.log('total',val)
    emit('update:total', val)
  }
})

const handleSizeChange = (val: any) => {
  // 如果修改后超过最大页面，强制跳转到第 1 页
  if (pageNo.value * val > props.total) {
    pageNo.value = 1
  }
  emit('pagination', { page: pageNo.value, pageSize: val }) //  触发 pagination 事件 重新加载列表
}
const handleCurrentChange = (val: Number) => {
  //  触发 pagination 事件 重新加载列表
  console.log('pageNo:',val);
  emit('pagination', { pageNo: val, pageSize: pageSize.value });
  
}
</script>

<style scoped>
/** 分页按钮 */
.pagination-box {
    margin: 70px 0 !important;
    width: 100%;
    height: auto;
}
.el-pagination.is-background .btn-next.is-active, .el-pagination .is-background .btn-prev .is-active, .el-pagination .is-background .el-pager li.is-active {
    --el-pagination-bg-color: rgba(238, 106, 107, 1);
}
.el-pagination {
    --el-pagination-hover-color: rgba(238, 106, 107, 1);
    --el-pagination-bg-color:  #D9D9D9;
    align-items: center;
    justify-content: center; 
}
/* 修改默认的背景色 */
:deep(.el-pagination.is-background .el-pager li) {
  background-color: rgb(255, 227, 227); 
  --el-pagination-button-width: 35px;
}
 /* 修改默认的背景色 */
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: rgba(238, 106, 107, 1);
  --el-pagination-button-width: 50px;
}
</style>
