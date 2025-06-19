<template>
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :md="6">
      <Filters @update:filters="onFilterChange" />
    </a-col>
    <a-col :xs="24" :md="18">
      <a-row :gutter="[16, 16]">
        <a-col :span="24" v-if="filteredFlats.length === 0">Нет результатов</a-col>
        <a-col :xs="24" :sm="12" :lg="8" v-for="flat in filteredFlats" :key="flat.id">
          <FlatCard :flat="flat" />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Filters from '@/components/FlatFilters.vue'
import FlatCard from '@/components/FlatCard.vue'
import type { Flat } from '@/model'

const flats = ref<Flat[]>([])
const filteredFlats = ref<Flat[]>([])

const filters = ref({
  areaRange: [20, 150],
  roomRange: [1, 5],
  addressQuery: '',
})

onMounted(async () => {
  const res = await fetch('/flats.json')
  flats.value = await res.json()
  applyFilters()
})

function onFilterChange(newFilters: typeof filters.value) {
  filters.value = newFilters
  applyFilters()
}

function applyFilters() {
  filteredFlats.value = flats.value.filter((flat) => {
    return (
      flat.area >= filters.value.areaRange[0] &&
      flat.area <= filters.value.areaRange[1] &&
      flat.rooms >= filters.value.roomRange[0] &&
      flat.rooms <= filters.value.roomRange[1] &&
      flat.address.toLowerCase().includes(filters.value.addressQuery)
    )
  })
}
</script>
