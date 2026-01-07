# 2025 Fudan Software Project Frontend

一个基于 Vue 3 + Vite 的现代化问答社区前端应用，类似于知乎的功能设计，提供问题发布、回答、评论、点赞、关注等完整的社区互动功能。

## 项目简介

本项目是复旦大学软件工程实验课程的前端部分，实现了一个功能完善的问答社区平台。用户可以提问、回答、评论、点赞，并关注感兴趣的用户。系统还提供了管理员后台用于内容管理和用户管理。

### 主要功能

- **用户系统**
  - 用户注册与登录
  - 个人主页展示
  - 用户关注/取消关注
  - 查看关注者和关注列表
  
- **问答功能**
  - 问题发布与编辑（支持 Markdown 编辑器）
  - 问题浏览与搜索
  - 回答发布与编辑
  - 评论功能
  
- **互动功能**
  - 点赞/取消点赞
  - 评论回复
  - 问题邀请回答
  
- **通知系统**
  - 点赞通知
  - 评论通知
  - 邀请通知
  - WebSocket 实时消息推送
  
- **管理后台**
  - 问题管理
  - 回答管理
  - 用户权限控制

## 技术栈

### 核心框架
- **[Vue 3](https://vuejs.org/)** - 渐进式 JavaScript 框架
- **[Vite](https://vitejs.dev/)** - 新一代前端构建工具
- **[Vue Router](https://router.vuejs.org/)** - 官方路由管理器
- **[Pinia](https://pinia.vuejs.org/)** - Vue 状态管理库

### UI 组件库
- **[Element Plus](https://element-plus.org/)** - 基于 Vue 3 的组件库
- **[Cherry Markdown](https://github.com/Tencent/cherry-markdown)** - Markdown 编辑器

### 其他依赖
- **[Axios](https://axios-http.com/)** - HTTP 客户端
- **[Clipboard.js](https://clipboardjs.com/)** - 剪贴板操作
- **[Vue3-Emoji](https://github.com/enpitsuLin/vue3-emoji)** - Emoji 选择器

### 开发工具
- **[Vitest](https://vitest.dev/)** - 单元测试框架
- **[JSDOM](https://github.com/jsdom/jsdom)** - JavaScript DOM 实现
- **[Sass](https://sass-lang.com/)** - CSS 预处理器

## 环境要求

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Docker** (可选，用于容器化部署)

## 快速开始

### 本地开发

1. **克隆项目**
```sh
# 请替换为实际的仓库地址
git clone https://github.com/SummerS-tars/SE-Lab-Frontend.git
cd SE-Lab-Frontend
```

2. **安装依赖**
```sh
npm install
```

3. **启动开发服务器**
```sh
npm run dev
```

开发服务器将在 http://localhost:5173 启动（默认端口）

4. **构建生产版本**
```sh
npm run build
```

构建产物将输出到 `dist` 目录

5. **预览生产构建**
```sh
npm run preview
```

### Docker 部署

项目提供了完整的 Docker 支持，使用多阶段构建优化镜像大小。

1. **构建 Docker 镜像**
```sh
docker build -t se-lab-frontend .
```

2. **运行容器**
```sh
docker run -d -p 80:80 --name frontend se-lab-frontend
```

3. **使用 Docker Compose（推荐）**
```sh
docker-compose up -d
```

Docker 镜像特性：
- 基于 Alpine Linux 的轻量级镜像
- Nginx 作为 Web 服务器
- 内置健康检查
- 支持 API 代理转发
- 支持 WebSocket 连接
- 启用 Gzip 压缩
- 静态资源缓存优化

## 项目结构

```
SE-Lab-Frontend/
├── public/              # 静态资源
├── src/
│   ├── assets/         # 资源文件（图片、样式等）
│   ├── components/     # 通用组件
│   ├── config/         # 配置文件
│   ├── hooks/          # Vue 组合式 API hooks
│   ├── request/        # API 请求封装
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia 状态管理
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   │   ├── Admin/      # 管理后台页面
│   │   ├── Home/       # 首页
│   │   ├── Login/      # 登录注册
│   │   ├── Notifications/ # 通知中心
│   │   ├── Question/   # 问题详情页
│   │   └── User/       # 用户个人页面
│   ├── App.vue         # 根组件
│   └── main.js         # 应用入口
├── Dockerfile          # Docker 构建文件
├── nginx.conf          # Nginx 配置
├── vite.config.js      # Vite 配置
├── vitest.config.js    # Vitest 配置
└── package.json        # 项目依赖配置
```

## 开发指南

### 推荐的 IDE 配置

- **[VSCode](https://code.visualstudio.com/)** + **[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)** 
  - 禁用 Vetur 以避免冲突
  - 安装 ESLint 和 Prettier 扩展以获得更好的开发体验

### 运行测试

```sh
# 运行单元测试
npm run test:unit

# 监听模式运行测试
npm run test:unit -- --watch
```

### 代码规范

本项目遵循 Vue 3 官方风格指南和 JavaScript 标准代码风格。

### API 集成

后端 API 通过 `/api/` 路径访问，Nginx 配置会自动代理到后端服务（`backend:8080`）。

**主要 API 端点：**
- `/api/auth/*` - 需要认证的接口
- `/api/public/*` - 公开接口
- `/notify/*` - WebSocket 通知服务

**注意**：
- 在 Docker Compose 部署时，`backend:8080` 是 Docker 服务名称，会自动解析到后端容器
- 在本地开发时，需要根据实际后端服务地址配置 Vite 代理或直接修改 API 基础 URL

详细的 API 文档请参考后端项目说明。

### 环境变量配置

可以创建 `.env.local` 文件来配置本地环境变量：

```env
# 示例配置，请根据实际后端服务地址修改
VITE_API_BASE_URL=http://localhost:8080
VITE_WEBSOCKET_URL=ws://localhost:8080/notify
```

**注意**：以上端口和地址仅为示例，请根据实际后端服务配置进行调整。

## 部署说明

### 生产环境部署

1. 确保后端服务已部署并可访问
2. 修改 `nginx.conf` 中的 `proxy_pass` 地址为实际后端地址
3. 构建并部署 Docker 镜像

```sh
docker build -t se-lab-frontend .
docker run -d -p 80:80 se-lab-frontend
```

### 配置说明

- **Nginx 配置**：`nginx.conf` 文件包含了 API 代理、WebSocket 支持、静态资源缓存等配置
- **健康检查**：容器提供 `/health` 端点用于健康检查
- **CORS 支持**：已在 Nginx 配置中启用跨域资源共享

## 常见问题

### 1. 开发环境 API 请求 CORS 错误
- 确保后端服务已启动并配置了 CORS
- 检查 Vite 代理配置是否正确

### 2. WebSocket 连接失败
- 检查后端 WebSocket 服务是否正常运行
- 确认环境变量 `VITE_WEBSOCKET_URL` 配置正确

### 3. Docker 构建失败
- 检查 Node.js 镜像源是否可访问
- 尝试清理 Docker 缓存：`docker builder prune`

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

本项目为教育目的开发，仅供学习交流使用。

## 相关链接

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Element Plus 文档](https://element-plus.org/)
- [Pinia 文档](https://pinia.vuejs.org/)

## 致谢

感谢复旦大学软件工程课程组提供的项目指导和支持。
