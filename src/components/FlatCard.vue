<template>
  <a-card :title="flat.address" style="width: 100%">
    <template #cover>
      <img :src="flat.image" :alt="flat.address" />
    </template>
    <p>Площадь: {{ flat.area }} м²</p>
    <p>Комнат: {{ flat.rooms }}</p>
  </a-card>
</template>

<script setup lang="ts">
defineProps<{
  flat: {
    id: number
    area: number
    rooms: number
    address: string
    image: string
  }
}>()
</script>
