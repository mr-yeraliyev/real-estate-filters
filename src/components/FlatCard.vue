<template>
  <a-card hoverable style="width: 100%">
    <template #cover>
      <img :src="flat.image" :alt="flat.address" />
    </template>
    <a-card-meta :title="flat.address">
      <template #description>
        <p>Площадь: {{ flat.area }} м²</p>
        <p>Комнат: {{ flat.rooms }}</p>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup lang="ts">
import type { Flat } from '@/model'

defineProps<{
  flat: Flat
}>()
</script>
