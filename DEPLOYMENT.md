# NIKON Reshade 小规模上线指南

当前网页已经支持两种模式：

- 本地模式：没有配置 Supabase 时，数据保存在每个访问者自己的浏览器里。
- 云端模式：配置 Supabase 后，所有访问者共享同一个公共滤镜库。

## 1. 开启 GitHub Pages

仓库地址：

https://github.com/joahpass/NIKON-Reshade

进入 `Settings -> Pages`：

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/root`

保存后，访问：

https://joahpass.github.io/NIKON-Reshade/

## 2. 创建 Supabase 项目

1. 打开 https://supabase.com
2. 创建一个新项目
3. 进入 `SQL Editor`
4. 复制 `supabase-schema.sql` 的全部内容并运行

## 3. 填写云端配置

在 Supabase 项目里找到：

- Project URL
- anon public key

打开 `config.js`，填入：

```js
window.NIKON_RESHARE_CONFIG = {
  supabase: {
    url: "https://你的项目.supabase.co",
    anonKey: "你的 anon public key"
  }
};
```

提交并推送后，GitHub Pages 会自动更新。页面底部会从“本地模式”变成“云端模式”。

## 4. 小规模运营建议

现在的数据库策略适合可信小范围试用：任何访问者都可以新增、编辑、删除滤镜。这样最省事，也最容易开始。

如果要公开给陌生人使用，下一步应该加登录和管理员审核。到那时建议把策略改成：

- 所有人可浏览
- 登录用户可投稿
- 管理员可编辑、删除、置顶

## 5. 备份

上线初期建议每周在 Supabase 表格里导出一次 CSV，或者使用网页里的导出 JSON 功能做备份。
