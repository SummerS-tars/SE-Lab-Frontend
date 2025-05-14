# 构建阶段
FROM 257b67e62b5944fc8bacf101088ebaee.mirror.swr.myhuaweicloud.com/library/node:18-alpine AS build
WORKDIR /app

# 复制包管理文件
COPY package*.json ./
RUN npm install

# 复制源代码
COPY . .

# 明确设置生产环境标志
ENV NODE_ENV=production
ENV VITE_WEBSOCKET_URL=

# 构建应用
RUN npm run build

# 生产阶段
FROM 257b67e62b5944fc8bacf101088ebaee.mirror.swr.myhuaweicloud.com/library/nginx:alpine
WORKDIR /usr/share/nginx/html

# 复制构建文件
COPY --from=build /app/dist .
# 复制自定义nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://localhost/health || exit 1

# 启动nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]