<template>
  <a-form id="flat-filter-form" layout="vertical">
    <a-form-item name="areaRange" label="Площадь (м²)">
      <a-slider range :min="20" :max="150" v-model:value="areaRange" />
    </a-form-item>

    <a-form-item name="roomRange" label="Комнаты">
      <a-slider range :min="1" :max="5" v-model:value="roomRange" />
    </a-form-item>

    <a-form-item name="addressQuery" label="Адрес">
      <a-input v-model:value="addressQuery" placeholder="Введите адрес" />
    </a-form-item>

    <a-button type="primary" size="large" block @click="emitFilters"> Применить фильтры </a-button>
  </a-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const areaRange = ref<[number, number]>([20, 150])
const roomRange = ref<[number, number]>([1, 5])
const addressQuery = ref('')

const emit = defineEmits(['update:filters'])
function emitFilters() {
  emit('update:filters', {
    areaRange: areaRange.value,
    roomRange: roomRange.value,
    addressQuery: addressQuery.value.trim().toLowerCase(),
  })
}
</script>
