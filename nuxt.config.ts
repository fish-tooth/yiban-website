// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,  // api请求前缀
    },
  },
  components: [
    {
      path: '@/components',
      extensions: ['.vue']
    }
  ],
  modules: ["@element-plus/nuxt"],
  elementPlus: {
    // options
  },
  alias: {
    "@": resolve(__dirname, "./"),
  },
  plugins: [
    "@/plugins/vue-amap",
  ],
  css: [
    "element-plus/dist/index.css", 
    "@/assets/styles/global.scss",
    "@/assets/styles/global.module.scss",
    "@/assets/styles/variables.scss",
  ],
  postcss: {
    // plugins: {
    //   "postcss-px-to-viewport-8-plugin": {
    //     unitToConvert: "px", // 需要转换的单位，默认为"px"
    //     viewportWidth: 1366, // 设计稿的视口宽度
    //     unitPrecision: 5, // 单位转换后保留的精度
    //     propList: ["*", "!font-size"], // 能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换
    //     viewportUnit: "vw", // 希望使用的视口单位
    //     fontViewportUnit: "vw", // 字体使用的视口单位
    //     // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
    //     // 下面配置表示类名中含有'keep-px'都不会被转换
    //     selectorBlackList: ["keep-px"],
    //     minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
    //     mediaQuery: false, // 媒体查询里的单位是否需要转换单位
    //     replace: true, //  是否直接更换属性值，而不添加备用属性
    //     exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
    //     include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
    //     landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
    //     landscapeUnit: "vw", // 横屏时使用的单位
    //     landscapeWidth: 1920, // 横屏时使用的视口宽度
    //   },
    // },
  },
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          // content: "width=device-width, initial-scale=1, maximum-scale=1",  23/08/18 删
          content: "width=device-width, initial-scale=1",

        },
        {
          name: 'keywords', content: '以伴青少年发展中心, 以伴, 以伴教育，以伴官网, Yiban，龚旺'
        },
        {
           name: 'description', content: '以伴青少年发展中心成立于2020年2月，经过不懈努力，累计在全国28省建立258所网校，培育带动了200多所高校的6万余名志愿者导师，服务了10万余名孩子，相关事迹被人民日报等媒体报道逾600次。' 
        }
      ],
    },
  },
});
