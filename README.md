# 爱乐助手 (Music-lover)

一个互动式音乐理论教学平台，帮助用户通过课程和工具学习音乐基础知识。

## 功能

- **互动课程**：渐进式学习音乐理论
- **实用工具**：和弦查找器、节拍器、音阶探索器
- **进度追踪**：记录学习完成情况

## 技术栈

- Next.js + React + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Tone.js (音频)

## 开发

```bash
npm install
npm run dev
```

## 环境变量

创建 `.env.local`：

```
DATABASE_URL=your_database_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 部署

支持 Cloudflare Pages、Netlify、Vercel 等平台部署。
