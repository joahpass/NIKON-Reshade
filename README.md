# DCS 喷气式战斗机大赏

一个基于 React + Vite 的 DCS 喷气机专题页面，用更硬核的“战术档案 / briefing board”视角组织机型内容，帮助玩家浏览、筛选、比较并判断哪架飞机更适合作为自己的第一条飞行主线。

## 现在包含什么

- 任务档案式 Hero 与焦点机型摘要
- 三条重点入场路线的编辑精选条带
- 可搜索、可筛选、可选中联动的主机库
- “如何选择首架 DCS 喷气机”导览区
- 从冷战到现代多用途的时代演进区
- 围绕选中机型实时变化的 briefing board

## 本地运行

如果你的系统已安装 Node.js / npm：

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

这个项目把 `vite` 的脚本入口写成了显式 `node` 调用，以避免某些 Windows 环境下 `.cmd` 包装脚本的执行问题。

## 部署

`vite.config.ts` 使用了 `base: "./"`，默认适合静态托管和 GitHub Pages 子路径部署。
