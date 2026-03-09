<template>
  <div class="game-wrapper">
    <div class="game-header">
      <router-link to="/games" class="back-btn">← 返回</router-link>
      <h1>贪吃蛇</h1>
      <div class="score">得分: {{ score }}</div>
    </div>
    <canvas ref="canvasRef" width="400" height="400" class="game-canvas" tabindex="0" @keydown="handleKey"></canvas>
    <p class="hint">使用方向键或 WASD 控制方向</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const score = ref(0)

let ctx, snake, food, dir, nextDir, running, timer

function init() {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  snake = [{ x: 10, y: 10 }]
  food = { x: 15, y: 15 }
  dir = 'right'
  nextDir = 'right'
  score.value = 0
  running = true
  canvas.focus()
  gameLoop()
}

function gameLoop() {
  if (!running || !ctx) return
  nextDir = dir
  const head = { ...snake[0] }
  if (dir === 'up') head.y--
  if (dir === 'down') head.y++
  if (dir === 'left') head.x--
  if (dir === 'right') head.x++

  if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
    running = false
    drawGameOver()
    return
  }
  if (snake.some((s) => s.x === head.x && s.y === head.y)) {
    running = false
    drawGameOver()
    return
  }

  snake.unshift(head)
  if (head.x === food.x && head.y === food.y) {
    score.value += 10
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) }
  } else {
    snake.pop()
  }

  ctx.fillStyle = '#2d3436'
  ctx.fillRect(0, 0, 400, 400)

  ctx.fillStyle = '#00b894'
  snake.forEach((s) => {
    ctx.fillRect(s.x * 20 + 1, s.y * 20 + 1, 18, 18)
  })

  ctx.fillStyle = '#e17055'
  ctx.fillRect(food.x * 20 + 1, food.y * 20 + 1, 18, 18)

  timer = setTimeout(gameLoop, 150)
}

function drawGameOver() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)'
  ctx.fillRect(0, 0, 400, 400)
  ctx.fillStyle = '#fff'
  ctx.font = '24px sans-serif'
  ctx.fillText('游戏结束', 150, 200)
}

function handleKey(e) {
  const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' }
  const d = map[e.key]
  if (d) {
    e.preventDefault()
    if ((d === 'up' && dir !== 'down') || (d === 'down' && dir !== 'up') || (d === 'left' && dir !== 'right') || (d === 'right' && dir !== 'left')) {
      dir = d
    }
  }
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  running = false
  clearTimeout(timer)
})
</script>

<style scoped>
.game-wrapper {
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.back-btn {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.game-canvas {
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  outline: none;
}

.hint {
  margin-top: 16px;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  text-align: center;
}
</style>
