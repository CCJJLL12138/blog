<template>
  <div class="treasures-page">
    <h1 class="page-title">藏宝阁</h1>
    <p class="page-desc">收藏的网站、工具与资源，方便随时取用</p>

    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat"
        class="category-btn"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div class="treasures-grid">
      <a
        v-for="treasure in filteredTreasures"
        :key="treasure.id"
        :href="treasure.url"
        target="_blank"
        rel="noopener noreferrer"
        class="treasure-card"
      >
        <div class="treasure-icon">{{ treasure.icon }}</div>
        <div class="treasure-content">
          <h3 class="treasure-title">{{ treasure.title }}</h3>
          <p class="treasure-desc">{{ treasure.description }}</p>
          <div class="treasure-tags">
            <span v-for="tag in treasure.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <span class="treasure-arrow">→</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { treasures } from '../data/treasures'

const categories = ['全部', ...new Set(treasures.map((t) => t.category))]
const activeCategory = ref('全部')

const filteredTreasures = computed(() => {
  if (activeCategory.value === '全部') return treasures
  return treasures.filter((t) => t.category === activeCategory.value)
})
</script>

<style scoped>
.treasures-page {
  padding-bottom: 48px;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-desc {
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.categories {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  border-radius: var(--radius);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.category-btn:hover,
.category-btn.active {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(44, 95, 124, 0.06);
}

.treasures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.treasure-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  text-decoration: none !important;
  color: inherit;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.treasure-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.treasure-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.treasure-content {
  flex: 1;
  min-width: 0;
}

.treasure-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--color-text);
}

.treasure-desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 10px;
}

.treasure-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.treasure-card .tag {
  font-size: 0.7rem;
  padding: 2px 8px;
  background: var(--color-bg);
  border-radius: 4px;
  color: var(--color-text-muted);
}

.treasure-arrow {
  color: var(--color-text-muted);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.treasure-card:hover .treasure-arrow {
  color: var(--color-accent);
}
</style>
