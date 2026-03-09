<template>
  <div class="articles-page">
    <h1 class="page-title">文章</h1>
    <p class="page-desc">技术分享、生活随笔、读书笔记</p>

    <div class="articles-list">
      <article
        v-for="article in articles"
        :key="article.id"
        class="article-card"
        @click="$router.push(`/articles/${article.id}`)"
      >
        <div class="article-cover">
          <img :src="article.cover" :alt="article.title" />
        </div>
        <div class="article-content">
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-meta">
            <!-- <span>{{ article.date }}</span> -->
            <span>{{ article.category }}</span>
            <!-- <span>{{ article.readTime }}</span> -->
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { articles } from "../data/articles";
</script>

<style scoped>
.articles-page {
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

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.article-card {
  display: flex;
  gap: 24px;
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.article-card:hover {
  box-shadow: var(--shadow-md);
}

.article-cover {
  width: 280px;
  min-width: 280px;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--color-text);
}

.article-excerpt {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .article-card {
    flex-direction: column;
  }

  .article-cover {
    width: 100%;
    min-width: unset;
  }
}
</style>
