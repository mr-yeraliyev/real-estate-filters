<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header style="color: white; font-size: 20px">
      Поиск квартир в Астане
    </a-layout-header>
    <a-layout-content style="padding: 24px">
      <HomeView />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import HomeView from './views/HomeView.vue'
</script>
