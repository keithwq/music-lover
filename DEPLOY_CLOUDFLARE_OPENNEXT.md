# Cloudflare Pages 部署指南（OpenNext 方案）

## 📋 已完成的配置

### 1. 已安装的依赖
- ✅ `@opennextjs/cloudflare` - Cloudflare OpenNext 适配器
- ✅ `wrangler` - Cloudflare CLI 工具

### 2. 已创建的配置文件
- ✅ `wrangler.jsonc` - Cloudflare Workers 配置
- ✅ `open-next.config.ts` - OpenNext 配置
- ✅ `.dev.vars` - 本地开发环境变量
- ✅ `.gitignore` - 已添加 `.open-next` 忽略规则

### 3. 已修改的 package.json
- ✅ 添加了 `cf-build` 脚本
- ✅ 添加了 `cf-deploy` 脚本

---

## 🚀 部署步骤

### 方法一：通过 CLI 直接部署（推荐）

#### 步骤 1：登录 Cloudflare

```bash
npx wrangler login
```

这会打开浏览器，请使用您的 Cloudflare 账号登录并授权。

#### 步骤 2：配置环境变量

在 Cloudflare Dashboard 中设置环境变量：

1. 访问 https://dash.cloudflare.com
2. 进入 **Workers & Pages** → 您的项目
3. 点击 **Settings** → **Environment variables**
4. 添加以下变量：
   - `NEXT_PUBLIC_SUPABASE_URL` = 您的 Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = 您的 Supabase Anon Key
   - `DATABASE_URL` = PostgreSQL 连接字符串（如果需要）
   - `JWT_SECRET` = JWT 密钥（长随机字符串）

#### 步骤 3：部署

```bash
npm run cf-deploy
```

这会：
1. 使用 OpenNext 构建项目
2. 自动部署到 Cloudflare Workers

#### 步骤 4：访问

部署成功后，您会获得一个域名：
```
https://music-lover.<your-subdomain>.workers.dev
```

---

### 方法二：通过 GitHub 集成到 Cloudflare Pages

#### 步骤 1：推送代码到 GitHub

```bash
git add .
git commit -m "Add Cloudflare OpenNext configuration"
git push
```

#### 步骤 2：在 Cloudflare Pages 创建项目

1. 访问 https://dash.cloudflare.com
2. 点击 **Workers & Pages** → **Create application**
3. 选择 **Pages** → **Connect to Git**
4. 授权 Cloudflare 访问 GitHub
5. 选择仓库：`keithwq/Music-Lover`

#### 步骤 3：配置构建设置

- **Project name**: `music-lover`
- **Production branch**: `main`
- **Build command**: `npm run cf-build`
- **Build output directory**: `.open-next`

#### 步骤 4：设置环境变量

在 **Environment variables** 中添加：

| Variable name | Value |
|--------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | 您的 Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 您的 Supabase Anon Key |
| `NODE_VERSION` | `20` |
| `NPM_VERSION` | `10` |

#### 步骤 5：开始部署

点击 **Save and Deploy**

---

## 🧪 本地测试

### 测试 Cloudflare 构建

```bash
npm run cf-build
```

这会生成 `.open-next` 目录，但不会部署。

### 本地预览（需要配置）

```bash
npx wrangler dev
```

---

## ⚠️ 重要注意事项

### 1. Worker 大小限制
- **免费版**: 3MB（压缩后）
- **付费版**: 10MB

如果超过限制，可以：
- 检查 bundle 大小：`npx @opennextjs/cloudflare build`
- 使用 ESBuild Bundle Analyzer 分析

### 2. 环境变量
部署前必须在 Cloudflare Dashboard 设置：
- Supabase URL 和 Key
- 数据库连接字符串（如果使用）
- JWT 密钥

### 3. 兼容性
- `compatibility_date`: `2026-04-25`
- `compatibility_flags`: `nodejs_compat`

这确保了 Node.js API（bcrypt、jsonwebtoken、Prisma）的兼容性。

### 4. 国内访问
- Cloudflare 在中国有 CDN 节点
- 访问速度：1-3 秒
- 稳定性：较好（偶尔有波动）

---

## 🔧 故障排查

### 构建失败

**错误**: `Cannot find module '@opennextjs/cloudflare'`

**解决**:
```bash
npm install -D @opennextjs/cloudflare wrangler
```

### 部署失败

**错误**: `Worker exceeded the size limit of 3 MiB`

**解决**:
1. 检查依赖包大小
2. 移除非必要的依赖
3. 或升级到付费计划

### 500 错误

**可能原因**: 环境变量未设置

**解决**:
1. 检查 Cloudflare Dashboard 的环境变量
2. 确保 `.dev.vars` 文件存在（本地测试）

---

## 📊 免费额度

Cloudflare Pages 免费计划：
- ✅ 无限带宽
- ✅ 无限请求数
- ✅ 500 次构建/月
- ✅ 免费 SSL
- ✅ 全球 CDN

---

## 🎯 成功标准

部署成功的标志：
- ✅ 网站可以访问
- ✅ 登录/注册功能正常
- ✅ 课程页面加载正常
- ✅ 工具页面正常工作
- ✅ 国内访问速度可接受

---

**祝您部署成功！** 🎉
