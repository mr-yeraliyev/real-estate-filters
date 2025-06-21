<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="flats-list__header">
      <div class="flats-list__header-content">
        <a-button
          type="text"
          shape="circle"
          class="flats-list__burger-btn"
          @click="drawerVisible = true"
          v-show="isMobile"
        >
          ☰
        </a-button>
        <div class="flats-list__header-title">Поиск квартир в Астане</div>
      </div>
    </a-layout-header>

    <a-layout-content style="padding: 24px">
      <a-row :gutter="[16, 16]">
        <!-- Desktop filters -->
        <a-col :xs="0" :md="6">
          <div class="flats-list__sticky-filters">
            <a-card>
              <FlatFilters @update:filters="onFilterChange" />
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
      <a-drawer
        v-model:open="drawerVisible"
        placement="bottom"
        title="Фильтры"
        height="max-content"
        class="flats-list__drawer"
      >
        <FlatFilters @update:filters="onFilterChange" />
      </a-drawer>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FlatCard, FlatFilters, type Flat } from '@/entities/Flats'
import type { FilterValues } from '../model'
import { useMobile } from '../composables'
import { filterFlats } from '../lib'

const flats = ref<Flat[]>([])
const filteredFlats = ref<Flat[]>([])

const filters = ref<FilterValues>({
  areaRange: [20, 150],
  roomRange: [1, 5],
  addressQuery: '',
})
const drawerVisible = ref(false)
const { isMobile } = useMobile()

const onFilterChange = (newFilters: typeof filters.value) => {
  filters.value = newFilters
  applyFilters()

  drawerVisible.value = false
}

const applyFilters = () => {
  filteredFlats.value = filterFlats(flats.value, filters.value)
}

onMounted(async () => {
  const res = await fetch('/flats.json')
  flats.value = await res.json()
  applyFilters()
})
</script>

<style lang="scss" src="../styles/flats-list.scss" />
