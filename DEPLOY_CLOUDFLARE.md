# 部署到 Cloudflare Pages（国内访问优化版）

## 📋 部署前准备

### 1. 创建 Cloudflare 账号
- 访问：https://dash.cloudflare.com/sign-up
- 使用邮箱免费注册账号
- 验证邮箱完成注册

### 2. 准备 GitHub 仓库
确保您的代码已经推送到 GitHub：
- 仓库地址：https://github.com/keithwq/music.git

---

## 🚀 部署步骤

### 方法一：通过 Cloudflare Dashboard 部署（推荐）

#### 步骤 1：登录 Cloudflare
1. 访问 https://dash.cloudflare.com
2. 使用注册的账号登录

#### 步骤 2：创建 Pages 项目
1. 在左侧菜单点击 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Pages** 标签
4. 点击 **Connect to Git**

#### 步骤 3：连接 GitHub
1. 点击 **Authorize Cloudflare Pages** 授权访问 GitHub
2. 选择您的仓库：`keithwq/music`
3. 点击 **Begin setup**

#### 步骤 4：配置构建设置
填写以下配置：

```
Project name: music-theory-assistant
Production branch: main
Build command: npm run build
Build output directory: .next
Root directory: /
```

#### 步骤 5：设置环境变量
在 **Environment variables** 部分添加以下变量：

| Variable name | Value |
|--------------|-------|
| `NODE_VERSION` | `20` |
| `NPM_VERSION` | `10` |

#### 步骤 6：开始部署
1. 点击 **Save and Deploy**
2. 等待构建完成（约 3-5 分钟）
3. 部署成功后会获得一个域名：`music-theory-assistant.pages.dev`

---

### 方法二：通过 Wrangler CLI 部署（高级）

#### 安装 Wrangler
```bash
npm install -g wrangler
```

#### 登录 Cloudflare
```bash
wrangler login
```

#### 创建项目
```bash
wrangler pages project create music-theory-assistant
```

#### 部署
```bash
npm run build
wrangler pages deploy .next --project-name=music-theory-assistant
```

---

## 🌐 访问优化（重要！）

### Cloudflare Pages 域名在国内的访问情况

Cloudflare 分配的默认域名 `xxx.pages.dev` 在国内访问速度可能不稳定。

#### 优化方案：使用自定义域名（可选）

如果您以后想获得更好的国内访问速度：

1. **购买域名**（可选）
   - 阿里云域名：约 ¥55/年（.cn 域名）
   - Namecheap：约 $8/年（.com 域名）

2. **绑定自定义域名**
   - 在 Cloudflare Pages 项目设置中
   - 点击 **Custom domains**
   - 添加您的域名
   - 按照提示配置 DNS

3. **配置 CNAME 优选**（加速国内访问）
   - 使用第三方维护的优选 CNAME 地址
   - 参考：https://www.01mvp.com/docs/tools/cloudflare-cdn-acceleration

---

## 📊 免费额度说明

Cloudflare Pages 免费计划包含：

- ✅ **无限带宽**
- ✅ **无限请求数**
- ✅ **500 次构建/月**
- ✅ **免费 SSL 证书**
- ✅ **全球 CDN 加速**
- ✅ **免费域名** `xxx.pages.dev`

**适合小范围测试**：
- 500 次构建 ≈ 每天 16 次代码推送
- 无限带宽 ≈ 可以服务数千用户
- 完全免费，无需绑定信用卡

---

## 🔧 数据库配置（重要！）

您的项目使用了 Supabase，需要确保：

### 1. 检查 Supabase 配置
确保 `.env.local` 或环境变量中包含：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 在 Cloudflare 设置环境变量
1. 进入项目设置
2. 点击 **Environment variables**
3. 添加上述两个环境变量
4. 点击 **Save**

### 3. 重新部署
环境变量修改后需要重新部署才能生效

---

## ⚠️ 注意事项

### 1. 国内访问速度
- Cloudflare Pages 在国内访问速度**优于 Vercel 和 Netlify**
- 但偶尔可能出现波动（取决于当地网络状况）
- 如果追求极致稳定，建议购买备案域名 + 国内 CDN

### 2. 构建失败处理
如果构建失败，检查：
- Node.js 版本是否设置为 20
- 依赖是否正确安装
- 构建命令是否正确

### 3. 白屏或加载失败
- 检查 Supabase 环境变量是否正确
- 检查浏览器控制台错误信息
- 尝试清除缓存后重新访问

---

## 📱 访问测试

部署完成后，在以下地区测试访问：

- ✅ 北京、上海、广州、深圳
- ✅ 成都、武汉、西安
- ✅ 使用不同网络（电信、联通、移动）

---

## 🎯 预期效果

- **访问速度**：国内主要城市 1-3 秒加载完成
- **稳定性**：99% 以上可用性
- **成本**：¥0/年（完全免费）

---

## 📞 遇到问题？

### 常见问题解决

**Q: 构建失败，提示 Node.js 版本错误**
A: 在环境变量中添加 `NODE_VERSION=20`

**Q: 国内访问速度慢**
A: 这是正常现象，可以考虑：
   - 使用自定义域名 + CNAME 优选
   - 或迁移到腾讯云 CloudBase（国内更快）

**Q: Supabase 连接失败**
A: 检查环境变量是否正确设置，确保 Supabase 项目正常运行

---

## 🔄 自动部署

配置完成后，每次推送到 GitHub：

```bash
git push origin main
```

Cloudflare Pages 会自动检测并重新部署，无需手动操作！

---

**祝您部署成功！** 🎉
