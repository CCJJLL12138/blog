import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/ArticlesView.vue'),
    meta: { title: '文章' },
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetail',
    component: () => import('../views/ArticleDetailView.vue'),
    meta: { title: '文章详情' },
  },
  {
    path: '/photos',
    name: 'Photos',
    component: () => import('../views/PhotosView.vue'),
    meta: { title: '摄影作品' },
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('../views/GamesView.vue'),
    meta: { title: '小游戏' },
  },
  {
    path: '/games/snake',
    name: 'Snake',
    component: () => import('../views/games/SnakeGame.vue'),
    meta: { title: '贪吃蛇' },
  },
  {
    path: '/games/flappy-bird',
    name: 'FlappyBird',
    component: () => import('../views/games/FlappyBird.vue'),
    meta: { title: '飞翔的小鸟' },
  },
  {
    path: '/treasures',
    name: 'Treasures',
    component: () => import('../views/TreasuresView.vue'),
    meta: { title: '藏宝阁' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 个人博客` : '个人博客'
  next()
})

export default router
