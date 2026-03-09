<template>
  <header class="header">
    <div class="header-inner">
      
      <nav class="nav">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">首页</router-link>
        <router-link to="/articles" class="nav-link" :class="{ active: $route.path.startsWith('/articles') }">文章</router-link>
        <router-link to="/photos" class="nav-link" :class="{ active: $route.path === '/photos' }">摄影</router-link>
        <router-link to="/games" class="nav-link" :class="{ active: $route.path.startsWith('/games') }">小游戏</router-link>
        <router-link to="/treasures" class="nav-link" :class="{ active: $route.path === '/treasures' }">藏宝阁</router-link>
        <router-link title="音乐播放器正在赶来的路上">🎵</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background: linear-gradient(160deg, #fef9f7 0%, #fdf6f2 35%, #faf5f1 70%, #f8f2ed 100%);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items:center;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text) !important;
}

.logo:hover {
  color: var(--color-accent) !important;
}

.nav {
  display: flex;
  align-items:center;
  gap: 8px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: var(--radius);
  color: var(--color-text-secondary) !important;
  font-size: 0.95rem;
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-accent) !important;
  background: rgba(44, 95, 124, 0.08);
}
</style>
