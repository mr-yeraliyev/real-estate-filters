<template>
  <a-config-provider :theme="antdThemeConfig">
    <FlatsPage />
  </a-config-provider>
</template>

<script setup lang="ts">
import { antdThemeConfig } from './app'
import { FlatsPage } from './pages/Flats'
</script>
