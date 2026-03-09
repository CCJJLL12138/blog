<template>
  <div class="photos-page">
    <h1 class="page-title">我的作品</h1>
    <p class="page-desc">照片是唯一锁住时间的公式</p>

    <div class="photos-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-card">
        <div class="photo-image">
          <img :src="photo.src" :alt="photo.title" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { photos } from '../data/photos'
</script>

<style scoped>
.photos-page {
  padding-bottom: 48px;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-desc {
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.photo-card {
  background: var(--color-bg-card);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: box-shadow 0.2s;
}

.photo-card:hover {
  box-shadow: var(--shadow-md);
}

.photo-image {
  overflow: hidden;
}

.photo-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}
</style>
