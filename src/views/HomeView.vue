<template>
  <div class="home">
    <div class="sakura-fall" aria-hidden="true">
      <div
        v-for="(p, i) in petals"
        :key="i"
        class="petal"
        :style="{
          left: p.left + '%',
          animationDelay: p.delay + 's',
          animationDuration: p.duration + 's',
        }"
      ></div>
    </div>
    <div class="home-content">
      <!-- <section class="hero">
        <h1 class="hero-title">欢迎来到我的小站</h1>
        <h1 style="color: orange">橙橙乐的个人博客</h1>
        <p class="hero-desc">记录生活、分享思考、收藏美好</p>
      </section> -->
      <section class="hero">
        <p style="font-size: 24px">你好，我是</p>
        <p class="hero-name">陈 镓 乐</p>
        <p style="font-size: 24px">一名前端开发工程师</p>
        <div style="display: flex; font-size: 26px">
          <p>喜欢</p>
          <P style="color: #00d9ff">Vue</P>、
          <P style="color: #00a6ff">TypeScript</P>和
          <p style="color: #00d9ff">Node.js</p>
        </div>
        <P style="font-size: 16px; color: gray"
          >我在这个网站记录我的成长，分享我的生活</P
        >
      </section>

      <section class="modules">
        <div class="module-card" @click="$router.push('/articles')">
          <div class="title-box">
            <div>
              <h2 class="module-title">📝 文章</h2>
              <p class="module-desc">技术分享、生活随笔、读书笔记</p>
            </div>
            <span class="module-link">→</span>
          </div>
          <div class="module-preview">
            <div
              v-for="article in recentArticles"
              :key="article.id"
              class="preview-item"
            >
              <router-link :to="`/articles/${article.id}`" @click.stop>{{
                article.title
              }}</router-link>
            </div>
          </div>
        </div>

        <div class="module-card" @click="$router.push('/photos')">
          <div class="title-box">
            <div>
              <h2 class="module-title">📷 摄影作品</h2>
              <p class="module-desc">用镜头记录眼中的世界</p>
            </div>
            <span class="module-link">→</span>
          </div>
          <div class="module-preview photos-preview">
            <div
              v-for="photo in recentPhotos"
              :key="photo.id"
              class="photo-thumb"
            >
              <img :src="photo.src" :alt="photo.title" />
            </div>
          </div>
        </div>

        <div class="module-card" @click="$router.push('/games')">
          <div class="title-box">
            <div>
              <h2 class="module-title">🎮 小游戏</h2>
              <p class="module-desc">休闲娱乐，放松一下</p>
            </div>
            <span class="module-link">→</span>
          </div>
          <div class="module-preview games-preview">
            <div
              v-for="game in recentGames"
              :key="game.id"
              class="game-thumb"
              @click.stop="$router.push(game.path)"
            >
              <img :src="game.cover" :alt="game.name" />
              <span class="game-name">{{ game.name }}</span>
            </div>
          </div>
        </div>

        <div class="module-card" @click="$router.push('/treasures')">
          <div class="title-box">
            <div>
              <h2 class="module-title">📦 藏宝阁</h2>
              <p class="module-desc">收藏的网站、工具与资源</p>
            </div>
            <span class="module-link">→</span>
          </div>
          <div class="module-preview treasures-preview">
            <div
              v-for="treasure in recentTreasures"
              :key="treasure.id"
              class="treasure-item"
            >
              <span class="treasure-icon">{{ treasure.icon }}</span>
              <span class="treasure-title">{{ treasure.title }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { articles } from "../data/articles";
import { photos } from "../data/photos";
import { games } from "../data/games";
import { treasures } from "../data/treasures";

const recentArticles = articles.slice(0, 3);
const recentPhotos = photos.slice(0, 4);
const recentGames = games.slice(0, 4);
const recentTreasures = treasures.slice(0, 4);

// 生成更多花瓣，让樱花雨更密集
const petals = Array.from({ length: 36 }, () => ({
  // 水平位置 0% ~ 100% 之间随机
  left: Math.random() * 100,
  // 延迟 0 ~ 15 秒之间随机，错开下落时间
  delay: Math.random() * 15,
  // 下落时长 16 ~ 26 秒之间随机，避免动作太一致
  duration: 16 + Math.random() * 10,
}));
</script>

<style scoped>
.home {
  padding-bottom: 0;
  position: relative;
}

.sakura-fall {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.home-content {
  position: relative;
  z-index: 1;
}

.petal {
  position: absolute;
  top: -20px;
  width: 10px;
  height: 12px;
  background: radial-gradient(ellipse 60% 70% at 50% 50%, #ffb7c5, #ff9eb0);
  border-radius: 50% 50% 50% 0;
  transform: rotate(0deg);
  opacity: 0.75;
  animation: sakura-fall linear infinite;
}

@keyframes sakura-fall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.8;
  }
  25% {
    transform: translateY(25vh) translateX(15px) rotate(90deg);
    opacity: 0.75;
  }
  50% {
    transform: translateY(50vh) translateX(-10px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(75vh) translateX(12px) rotate(270deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(100vh) translateX(-8px) rotate(360deg);
    opacity: 0.6;
  }
}

.petal:nth-child(odd) {
  background: radial-gradient(ellipse 70% 60% at 50% 50%, #ffc0cb, #ffb7c5);
  animation-name: sakura-fall-alt;
}

@keyframes sakura-fall-alt {
  0% {
    transform: translateY(0) translateX(0) rotate(45deg);
    opacity: 0.75;
  }
  25% {
    transform: translateY(25vh) translateX(-12px) rotate(135deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(50vh) translateX(8px) rotate(225deg);
    opacity: 0.7;
  }
  75% {
    transform: translateY(75vh) translateX(-15px) rotate(315deg);
    opacity: 0.75;
  }
  100% {
    transform: translateY(100vh) translateX(5px) rotate(405deg);
    opacity: 0.65;
  }
}

.hero {
  /* text-align: center; */
  padding: 48px 0 56px;
}

/* .hero-title {
  font-size: 4rem;
  font-weight: 600;
  color: #ff4500;
  margin-bottom: 12px;
} */

.hero-name {
  font-size: 3rem;
  font-weight: 600;
  color: #00ffff;
}

.hero-desc {
  margin-top: 12px;
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

.modules {
  display: grid;
  gap: 24px;
}

.module-card {
  background: #fefcf9;
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(235, 229, 225, 0.8);
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}

.module-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.module-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text);
}

.title-box {
  display: flex;
  justify-content: space-between;
}

.module-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.module-preview {
  padding: 16px 0;
  border-top: 1px solid var(--color-border);
}

.preview-item {
  padding: 6px 0;
}

.preview-item a {
  font-size: 0.95rem;
}

.photos-preview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.photo-thumb {
  aspect-ratio: 4/3;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--color-bg);
}

.photo-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.games-preview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.game-thumb {
  aspect-ratio: 4/3;
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  background: var(--color-bg);
}

.game-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-thumb .game-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 0.8rem;
  text-align: center;
}

.treasures-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.treasure-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--color-bg);
  border-radius: var(--radius);
  font-size: 0.9rem;
}

.treasure-icon {
  font-size: 1.2rem;
}

.treasure-title {
  color: var(--color-text-secondary);
}

.module-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 0.9rem;
  color: var(--color-accent);
  font-weight: 500;
}
</style>
