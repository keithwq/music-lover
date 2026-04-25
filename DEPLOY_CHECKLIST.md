# 📋 Cloudflare Pages 部署检查清单

## ✅ 部署前检查

### 1. GitHub 仓库
- [x] 代码已推送到 GitHub
- [x] 仓库地址：https://github.com/keithwq/music.git
- [x] 分支：main

### 2. Cloudflare 账号
- [ ] 注册 Cloudflare 账号（https://dash.cloudflare.com/sign-up）
- [ ] 验证邮箱
- [ ] 登录 Cloudflare Dashboard

### 3. Supabase 配置
- [ ] 获取 Supabase URL
- [ ] 获取 Supabase Anon Key
- [ ] 确认 Supabase 数据库正常运行

---

## 🚀 部署步骤（按顺序执行）

### 步骤 1：创建 Pages 项目
- [ ] 访问 https://dash.cloudflare.com
- [ ] 点击 **Workers & Pages** → **Create application**
- [ ] 选择 **Pages** → **Connect to Git**
- [ ] 授权 Cloudflare 访问 GitHub

### 步骤 2：选择仓库
- [ ] 选择仓库：`keithwq/Music-Lover`
- [ ] 点击 **Begin setup**

### 步骤 3：配置项目
- [ ] Project name: `music-lover`
- [ ] Production branch: `main`
- [ ] Build command: `npm run build`
- [ ] Build output directory: `.next`
- [ ] Root directory: `/`

### 步骤 4：设置环境变量
**必须设置以下环境变量：**

- [ ] `NEXT_PUBLIC_SUPABASE_URL` = (您的 Supabase URL)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (您的 Supabase Anon Key)
- [ ] `NODE_VERSION` = `20`
- [ ] `NPM_VERSION` = `10`

**可选（如果使用数据库 API）：**

- [ ] `DATABASE_URL` = (PostgreSQL 连接字符串)
- [ ] `JWT_SECRET` = (随机长字符串)

### 步骤 5：开始部署
- [ ] 点击 **Save and Deploy**
- [ ] 等待构建完成（3-5 分钟）
- [ ] 查看部署日志，确认无错误

### 步骤 6：测试访问
- [ ] 访问获得的域名：`music-lover.pages.dev`
- [ ] 测试页面加载速度
- [ ] 测试登录/注册功能
- [ ] 测试数据库连接
- [ ] 测试各个工具页面

---

## 🧪 功能测试清单

### 基础功能
- [ ] 首页正常显示
- [ ] 导航栏正常
- [ ] 页面跳转正常

### 用户功能
- [ ] 用户注册
- [ ] 用户登录
- [ ] 登出功能

### 学习功能
- [ ] 课程列表
- [ ] 课程详情
- [ ] 进度跟踪

### 工具功能
- [ ] 和弦查找器
- [ ] 音阶浏览器
- [ ] 节拍器
- [ ] 听力训练

---

## ⚠️ 常见问题排查

### 构建失败
**问题：** 构建超时或失败

**解决方案：**
1. 检查 `package.json` 中的脚本是否正确
2. 确认 Node.js 版本设置为 20
3. 查看构建日志，找到具体错误信息

### 白屏/无法访问
**问题：** 部署成功但访问白屏

**解决方案：**
1. 检查浏览器控制台错误
2. 确认 Supabase 环境变量正确
3. 清除缓存后重试

### 国内访问慢
**问题：** 国内用户反映访问速度慢

**解决方案：**
1. 这是正常现象（使用免费 CDN）
2. 考虑使用自定义域名 + CNAME 优选
3. 或迁移到腾讯云 CloudBase（国内更快）

### 数据库连接失败
**问题：** 无法连接 Supabase

**解决方案：**
1. 检查环境变量名称是否正确
2. 确认 Supabase 项目状态正常
3. 检查 Supabase URL 和 Key 是否复制完整

---

## 📊 部署后监控

### 访问统计
- [ ] 在 Cloudflare Dashboard 查看访问数据
- [ ] 监控带宽使用（免费无限）
- [ ] 监控构建次数（免费 500 次/月）

### 性能优化
- [ ] 使用 PageSpeed Insights 测试性能
- [ ] 优化图片加载
- [ ] 启用缓存策略

---

## 🎯 成功标准

部署成功的标志：

✅ 国内用户可以正常访问  
✅ 页面加载时间 < 3 秒  
✅ 所有功能正常工作  
✅ 每月成本 = ¥0  

---

## 📞 需要帮助？

查看详细部署教程：
- [DEPLOY_CLOUDFLARE.md](./DEPLOY_CLOUDFLARE.md) - 完整部署指南
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

---

**最后更新：** 2026-04-25
