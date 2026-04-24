# 部署指南

## 1. 数据库配置

### 选项 A：Vercel Postgres（推荐）

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 创建新项目，导入 GitHub 仓库
3. 在 Storage 标签页创建 Postgres 数据库
4. 连接数据库到项目
5. 复制数据库连接字符串

### 选项 B：Neon（免费）

1. 注册 [Neon](https://neon.tech)
2. 创建新项目
3. 获取连接字符串

## 2. 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
DATABASE_URL="postgresql://用户名:密码@主机:端口/数据库名?sslmode=require"
JWT_SECRET="你的JWT密钥（随机字符串）"
NEXT_PUBLIC_APP_URL="https://你的域名.vercel.app"
```

## 3. 数据库迁移

部署后，在 Vercel 的函数日志中运行迁移，或在本地运行：

```bash
# 使用生产数据库URL运行迁移
DATABASE_URL="你的生产数据库URL" npx prisma migrate deploy
```

## 4. 初始化数据

```bash
# 导入初始课程数据
DATABASE_URL="你的生产数据库URL" npx prisma db seed
```

## 5. 微信访问注意事项

部署后，确保：
- 域名已备案（如果使用国内服务器）
- 开启 HTTPS（Vercel 自动提供）
- 如果需要微信登录，需配置微信开放平台

## 快速部署命令

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```
