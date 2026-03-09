<template>
  <div class="article-detail" v-if="article">
    <router-link to="/articles" class="back-link">← 返回文章列表</router-link>
    <article class="article">
      <header class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <!-- <span>{{ article.date }}</span> -->
          <span>{{ article.category }}</span>
          <!-- <span>{{ article.readTime }}</span> -->
        </div>
      </header>
      <div class="article-body" v-html="article.content"></div>
    </article>
  </div>
  <div v-else class="not-found">
    <p>文章不存在</p>
    <router-link to="/articles">返回文章列表</router-link>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { articleDetails } from "../data/articles";

const route = useRoute();
const article = computed(() => articleDetails[Number(route.params.id)]);
</script>

<style scoped>
.article-detail {
  max-width: 720px;
  margin: 0 auto;
  padding-bottom: 48px;
}

.back-link {
  display: inline-block;
  margin-bottom: 24px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.back-link:hover {
  color: var(--color-accent);
}

.article {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.article-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
}

.article-title {
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 16px;
}

.article-meta {
  display: flex;
  gap: 16px;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.article-body {
  font-size: 1rem;
  line-height: 1.8;
}

.article-body :deep(p) {
  margin-bottom: 16px;
}

.article-body :deep(h3) {
  font-size: 1.2rem;
  margin: 24px 0 12px;
  color: var(--color-text);
}

.article-body :deep(a) {
  color: var(--color-accent);
}

.not-found {
  text-align: center;
  padding: 48px;
  color: var(--color-text-secondary);
}
</style>
