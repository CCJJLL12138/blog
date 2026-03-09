<template>
  <div class="game-wrapper">
    <div class="game-header">
      <router-link to="/games" class="back-btn">← 返回</router-link>
      <h1>飞翔的小鸟</h1>
      <div class="score">得分: {{ score }}</div>
    </div>
    <canvas
      ref="canvasRef"
      width="400"
      height="560"
      class="game-canvas"
      tabindex="0"
      @click="flap"
      @keydown="onKeydown"
    ></canvas>
    <p v-if="!started && !gameOver" class="hint">点击画面或按空格开始 / 飞翔</p>
    <p v-else-if="gameOver" class="hint">游戏结束，点击画面重新开始</p>
    <p v-else class="hint">点击或按空格键让小鸟飞起</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const score = ref(0)

const W = 400
const H = 560
const BIRD_R = 16
const BIRD_X = 80
const GRAVITY = 0.4
const FLAP_STRENGTH = -8
const PIPE_W = 60
const PIPE_GAP = 160
const PIPE_SPEED = 3
const PIPE_SPAWN_INTERVAL = 90

let ctx
let birdY
let birdVy
let pipes
let frameCount
let started
let gameOver
let animId

function init() {
  birdY = H / 2
  birdVy = 0
  pipes = []
  frameCount = 0
  started = false
  gameOver = false
  score.value = 0
}

function addPipe() {
  const gapY = 120 + Math.random() * (H - 240 - PIPE_GAP)
  pipes.push({
    x: W,
    top: 0,
    topH: gapY,
    bottom: gapY + PIPE_GAP,
    bottomH: H - (gapY + PIPE_GAP),
    passed: false,
  })
}

function draw() {
  if (!ctx) return

  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = '#8B4513'
  ctx.fillRect(0, H - 60, W, 60)

  ctx.fillStyle = '#90EE90'
  ctx.fillRect(0, H - 60, W, 20)

  if (!started && !gameOver) {
    ctx.fillStyle = '#333'
    ctx.font = '20px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('点击或按空格开始', W / 2, H / 2 - 20)
    ctx.fillText('让小鸟穿过管道', W / 2, H / 2 + 10)
    drawBird()
    return
  }

  if (gameOver) {
    updateBird()
    drawPipes()
    drawBird()
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = '#fff'
    ctx.font = '28px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('游戏结束', W / 2, H / 2 - 20)
    ctx.fillText(`得分: ${score.value}`, W / 2, H / 2 + 20)
    ctx.font = '16px sans-serif'
    ctx.fillText('点击重新开始', W / 2, H / 2 + 50)
    return
  }

  frameCount++
  if (frameCount % PIPE_SPAWN_INTERVAL === 0) {
    addPipe()
  }

  updateBird()
  updatePipes()
  drawPipes()
  drawBird()

  ctx.fillStyle = '#fff'
  ctx.font = 'bold 24px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(score.value, W / 2, 50)
}

function updateBird() {
  if (started && !gameOver) {
    birdVy += GRAVITY
    birdY += birdVy
  }
}

function updatePipes() {
  pipes.forEach((p) => {
    p.x -= PIPE_SPEED
    if (!p.passed && p.x + PIPE_W < BIRD_X) {
      p.passed = true
      score.value++
    }
  })
  pipes = pipes.filter((p) => p.x + PIPE_W > 0)
}

function drawBird() {
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.arc(BIRD_X, birdY, BIRD_R, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#B8860B'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = '#333'
  ctx.beginPath()
  ctx.arc(BIRD_X + 6, birdY - 2, 4, 0, Math.PI * 2)
  ctx.fill()
}

function drawPipes() {
  ctx.fillStyle = '#228B22'
  pipes.forEach((p) => {
    ctx.fillRect(p.x, p.top, PIPE_W, p.topH)
    ctx.fillRect(p.x, p.bottom, PIPE_W, p.bottomH)
    ctx.fillStyle = '#2E8B57'
    ctx.fillRect(p.x + 2, p.top, PIPE_W - 4, p.topH)
    ctx.fillRect(p.x + 2, p.bottom, PIPE_W - 4, p.bottomH)
    ctx.fillStyle = '#228B22'
  })
}

function checkCollision() {
  if (birdY - BIRD_R <= 0 || birdY + BIRD_R >= H - 60) return true
  for (const p of pipes) {
    if (BIRD_X + BIRD_R > p.x && BIRD_X - BIRD_R < p.x + PIPE_W) {
      if (birdY - BIRD_R < p.topH || birdY + BIRD_R > p.bottom) return true
    }
  }
  return false
}

function flap() {
  if (gameOver) {
    init()
    gameLoop()
    return
  }
  if (!started) {
    started = true
    birdVy = 0
  }
  birdVy = FLAP_STRENGTH
}

function onKeydown(e) {
  if (e.code === 'Space') {
    e.preventDefault()
    flap()
  }
}

function gameLoop() {
  draw()
  if (started && !gameOver && checkCollision()) {
    gameOver = true
  }
  animId = requestAnimationFrame(gameLoop)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  init()
  gameLoop()
  canvas.focus()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
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
  cursor: pointer;
  outline: none;
  box-shadow: var(--shadow-md);
}

.hint {
  margin-top: 16px;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  text-align: center;
}
</style>
