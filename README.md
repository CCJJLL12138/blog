# 个人博客

基于 Vite + Vue 3 + Pinia + Vue Router 的纯前端个人博客项目。

## 技术栈

- **Vite** - 构建工具
- **Vue 3** - 前端框架
- **Vue Router** - 路由
- **Pinia** - 状态管理
- **JavaScript** - 开发语言

## 项目结构

```
src/
├── data/           # 数据文件（后续添加内容直接修改此处）
│   ├── articles.js  # 文章数据
│   ├── photos.js   # 摄影作品数据
│   ├── games.js    # 小游戏数据
│   └── treasures.js # 藏宝阁收藏数据
├── views/          # 页面组件
├── components/     # 公共组件
├── router/         # 路由配置
└── main.js
```

## 模块说明

- **首页** - 展示各模块预览，可跳转至对应模块
- **文章** - 长列表展示文章，点击进入详情页
- **摄影作品** - 网格布局展示照片
- **小游戏** - 网格展示游戏入口，点击进入游玩
- **藏宝阁** - 收藏的网站与资源，支持分类筛选

## 如何添加新数据

### 添加新文章
1. 在 `src/data/articles.js` 的 `articles` 数组末尾添加新对象
2. 在 `articleDetails` 对象中添加对应的详情内容（key 为文章 id）

### 添加新照片
在 `src/data/photos.js` 的 `photos` 数组末尾添加新对象

### 添加新游戏
1. 在 `src/data/games.js` 的 `games` 数组末尾添加新对象
2. 在 `src/views/games/` 下创建游戏组件
3. 在 `src/router/index.js` 中添加对应路由

### 添加新收藏
在 `src/data/treasures.js` 的 `treasures` 数组末尾添加新对象

## 运行项目

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```
