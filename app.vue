<template>
 <div id="app">
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
 </div>
</template>

<script setup lang="ts">
// import { NuxtPage } from '#build/components';

useHead({
 title: "以伴青少年发展中心",
 link: [
  {
   rel: "icon",
   type: "image/x-icon",
   href: "/favicon.ico",
  },
 ],
});

</script>

<style lang="scss" scoped></style>
