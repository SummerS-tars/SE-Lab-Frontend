# 构建阶段
FROM node:18-alpine AS build
WORKDIR /app

# 优先复制依赖文件以利用缓存
COPY package*.json ./

# 使用clean-install避免权限问题
RUN npm ci --no-audit --no-fund || npm install

# 复制源代码（除了已被.dockerignore排除的文件）
COPY . .

# 构建应用
RUN npm run build

# 运行阶段
FROM nginx:stable-alpine
# 创建非root用户
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 复制构建产物到 Nginx 目录
COPY --from=build /app/dist /usr/share/nginx/html
# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 设置目录权限
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

# 添加健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

USER appuser
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]