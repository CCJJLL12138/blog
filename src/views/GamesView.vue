<template>
  <div class="games-page">
    <div class="games-grid">
      <div
        v-for="game in games"
        :key="game.id"
        class="game-card"
        @click="$router.push(game.path)"
      >
        <div class="game-cover">
          <img :src="game.cover" :alt="game.name" />
        </div>
        <div class="game-info">
          <h3 class="game-name">{{ game.name }}</h3>
          <p class="game-desc">{{ game.description }}</p>
          <span class="play-btn">开始游戏 →</span>
        </div>
      </div>

      <div class="game-card game-card-soon" aria-disabled="true">
        <div class="soon-inner">
          <div class="soon-icon">✨</div>
          <h3 class="soon-title">更多游戏</h3>
          <p class="soon-desc">敬请期待</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { games } from '../data/games'
</script>

<style scoped>
.games-page {
  padding-bottom: 48px;
}

.page-desc {
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

.games-grid {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 2px 12px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  margin-top: 52px;
}

.game-card {
  flex: 0 0 240px;
  height: 420px;
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.game-cover {
  height: 56%;
  overflow: hidden;
  flex-shrink: 0;
}

.game-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.game-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.game-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.play-btn {
  margin-top: auto;
  font-size: 0.9rem;
  color: var(--color-accent);
  font-weight: 500;
}

.games-grid::-webkit-scrollbar {
  height: 10px;
}

.games-grid::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.18);
  border-radius: 999px;
}

.games-grid::-webkit-scrollbar-track {
  background: transparent;
}

.game-card-soon {
  cursor: default;
  border-style: dashed;
  background: linear-gradient(180deg, rgba(44, 95, 124, 0.06), rgba(255, 255, 255, 0));
}

.game-card-soon:hover {
  transform: none;
  box-shadow: var(--shadow-sm);
}

.soon-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  gap: 10px;
}

.soon-icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: rgba(44, 95, 124, 0.1);
  font-size: 1.6rem;
}

.soon-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
}

.soon-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}
</style>
