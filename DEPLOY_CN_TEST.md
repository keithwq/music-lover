# 国内测试部署建议

这个项目是 `Next.js + API Routes + Prisma + PostgreSQL`，不是纯静态站。

如果目标是：

- 国内用户能打开
- 免费或接近免费
- 先跑起来做测试

我建议优先用这套组合：

- 网站与服务端：腾讯云 CloudBase HTTP 云函数
- 数据库：Supabase Free（选新加坡区域）

原因很简单：

- CloudBase 在国内访问体验通常比 `Vercel`、`Netlify` 更稳。
- CloudBase 现在有长期免费体验环境，适合测试。
- 这个项目已经是标准 Next.js 服务端应用，不需要重写成静态站。
- Supabase Free 能直接给你 PostgreSQL，和 Prisma 兼容。

## 这套方案适合当前项目的原因

项目里已经确认有这些特征：

- `src/app/api/**` 下有服务端接口
- `prisma/schema.prisma` 使用 `postgresql`
- `next.config.js` 已经启用了 `output: 'standalone'`
- 项目可以本地通过 `npm run build` 成功构建

所以最省事的路线不是“导出静态 HTML”，而是部署一个能跑 Node 服务端的环境。

## 最推荐的部署路径

### 1. 先建数据库

推荐用 Supabase Free。

建议：

- Region 选 `Singapore`
- 新建项目后，记下数据库连接串
- 把连接串中的密码替换成你创建项目时设置的数据库密码

本项目至少需要这两个环境变量：

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres?sslmode=require"
JWT_SECRET="一串足够长的随机字符串"
```

如果你后面还打算启用 Supabase 客户端登录流，再补这两个：

```env
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

### 2. 把数据库结构推上去

在本地 PowerShell 里执行：

```powershell
$env:DATABASE_URL="你的生产数据库连接串"
npx prisma migrate deploy
npx prisma db seed
```

如果只是想验证能不能用，也可以先只执行：

```powershell
$env:DATABASE_URL="你的生产数据库连接串"
npx prisma migrate deploy
```

说明：

- `migrate deploy` 会建表
- `db seed` 会导入初始课程数据和默认账号

`prisma/seed.ts` 里当前会创建一个默认账号：

- 邮箱：`admin@example.com`
- 密码：`123456`

正式对外前建议改掉。

### 3. 在 CloudBase 创建免费测试环境

建议选上海区，离国内用户更近。

你要创建的是：

- 一个 CloudBase 免费体验环境
- 然后在里面创建 `HTTP 云函数`

### 4. 上传这个项目

在 CloudBase 控制台里创建 `HTTP 云函数` 时，建议这样填：

- 运行环境：`Node.js 20`
- 提交方式：本地上传文件夹
- 上传目录：当前项目根目录
- 自动安装依赖：开启
- 内存：先用 `512MB`

仓库里我已经加了 CloudBase 需要的启动脚本文件：

- [scf_bootstrap](D:/DB/20_PROJECTS/music-theory-assistant/scf_bootstrap)

它会按 CloudBase 的约定把端口设成 `9000`，然后执行 `npm start`。

### 5. 在 CloudBase 配环境变量

把这些变量填到云函数环境变量里：

```env
DATABASE_URL=你的 Supabase 连接串
JWT_SECRET=你自己的随机密钥
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_IS_ELECTRON=false
```

如果暂时不用 Supabase 客户端登录，后面三个可以先留空。

### 6. 发布后先用默认域名测试

先直接用 CloudBase 自动给你的默认 HTTPS 域名测试即可。

这一步适合：

- 自己测
- 发给少量测试用户
- 验证页面、登录、课程 API 是否可用

如果你后面要绑自己的域名：

- 需要做域名解析
- 国内正式域名通常还需要 ICP 备案

## 我对你当前项目的判断

当前项目已经能构建，但有几个部署时要注意的点：

- 这是动态应用，不适合只扔到静态托管。
- 登录接口依赖 `JWT_SECRET`，线上一定要单独配置，不能用默认值。
- 数据库是 PostgreSQL，所以最省事的是接 Supabase，不建议测试阶段自己再买云服务器装库。
- 项目里有一些和 Supabase 相关的前端代码，但主登录流程目前走的是你自己的 `/api/auth/*` 接口，所以即使不启用 Supabase Auth，也能先跑起来。

## 不推荐作为首选的方案

### 方案 A：Vercel Hobby

优点：

- 免费
- 部署 Next.js 最省心

缺点：

- 国内访问稳定性不如腾讯云路线
- 免费额度更适合个人测试，不太适合作为国内分享测试主链路

### 方案 B：Railway Free

优点：

- 部署全栈项目方便

缺点：

- 现在免费层只有很少额度
- 对“给国内用户访问”这件事并不占优

### 方案 C：Zeabur Free

优点：

- 上手很快
- 免费计划可直接开始

缺点：

- 免费计划会自动休眠
- 休眠后首个请求会有冷启动
- 更适合个人演示，不如腾讯云路线适合发给国内测试用户

## 最短执行清单

如果你想用最短路径上线，按这个顺序做：

1. 在 Supabase 建一个新加坡区免费库
2. 本地执行 `npx prisma migrate deploy`
3. 需要课程初始数据时，再执行 `npx prisma db seed`
4. 在腾讯云 CloudBase 建免费环境
5. 创建 `HTTP 云函数`，上传当前项目根目录
6. 配置 `DATABASE_URL` 和 `JWT_SECRET`
7. 用 CloudBase 默认域名测试登录、课程列表、课程详情

## 你现在仓库里我补的文件

- 环境变量模板：[.env.example](D:/DB/20_PROJECTS/music-theory-assistant/.env.example)
- CloudBase 启动脚本：[scf_bootstrap](D:/DB/20_PROJECTS/music-theory-assistant/scf_bootstrap)

## 参考资料

- CloudBase Next.js on HTTP 云函数文档：
  https://docs.cloudbase.net/cloud-function/frameworks-examples/next
- CloudBase Webify 概述：
  https://docs.cloudbase.net/webify/introduction
- CloudBase 价格文档：
  https://cloud.tencent.com/document/product/876/75213
- CloudBase 自定义域名：
  https://docs.cloudbase.net/service/custom-domain
- Supabase 计费说明：
  https://supabase.com/docs/guides/platform/billing-on-supabase
- Vercel Hobby：
  https://vercel.com/docs/plans/hobby
- Railway Pricing：
  https://docs.railway.com/pricing
- Zeabur Free Plan：
  https://zeabur.com/docs/en-US/pricing/free-plan
