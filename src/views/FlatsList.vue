<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <div class="header-content">
        <a-button
          type="text"
          shape="circle"
          class="burger-btn"
          @click="drawerVisible = true"
          v-show="isMobile"
        >
          ☰
        </a-button>
        <div class="header-title">Поиск квартир в Астане</div>
      </div>
    </a-layout-header>

    <a-layout-content style="padding: 24px">
      <a-row :gutter="[16, 16]">
        <!-- Desktop filters -->
        <a-col :xs="0" :md="6">
          <div class="sticky-filters">
            <a-card>
              <Filters @update:filters="onFilterChange" />
            </a-card>
          </div>
        </a-col>

        <!-- Flats list -->
        <a-col :xs="24" :md="18">
          <a-row :gutter="[16, 16]">
            <a-col :span="24" v-if="filteredFlats.length === 0">Нет результатов</a-col>
            <a-col :xs="24" :sm="12" :lg="8" v-for="flat in filteredFlats" :key="flat.id">
              <FlatCard :flat="flat" />
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <!-- Drawer for mobile filters -->
      <a-drawer v-model:open="drawerVisible" placement="left" title="Фильтры" :width="300">
        <Filters @update:filters="onFilterChange" />
      </a-drawer>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
const drawerVisible = ref(false)
const isMobile = ref(false)

const onFilterChange = (newFilters: typeof filters.value) => {
  filters.value = newFilters
  applyFilters()

  drawerVisible.value = false
}

const applyFilters = () => {
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
// Watch for screen size
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}
onMounted(async () => {
  const res = await fetch('/flats.json')
  flats.value = await res.json()
  applyFilters()
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style src="../styles/flats-list.css" scoped />
