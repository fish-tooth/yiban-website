// import Vue from 'vue';
import VueAMap from '@vuemap/vue-amap';
import {initAMapApiLoader} from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';
export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // 在浏览器中执行的代码
    // 使用 window 对象
    initAMapApiLoader({
      key: '0220a0add390ca39ec97afc509991fb0',
      securityJsCode: '4d424d9b043c2358c3e3c1e1e4ef7ad2',
      // plugin: [
      //   'AMap.Autocomplete',
      //   'AMap.Marker',
      //   'AMap.ToolBar',
      //   'AMap.Circle',
      //   'AMap.PolyLine',
      // ],
      // v: '1.4.8'
    })
  }
    
    nuxtApp.vueApp.use(VueAMap);
});

