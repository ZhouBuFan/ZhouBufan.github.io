# ZhouBufan's Blog

> 个人技术博客 - 分享技术心得，记录学习历程

[![Hexo](https://img.shields.io/badge/Hexo-7.3.0-blue.svg)](https://hexo.io/)
[![Butterfly Theme](https://img.shields.io/badge/Theme-Butterfly-orange.svg)](https://butterfly.js.org/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-green.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## 📖 关于博客

这是一个基于 [Hexo](https://hexo.io/) 静态博客框架和 [Butterfly](https://butterfly.js.org/) 主题构建的个人技术博客。在这里，我分享编程经验、技术学习笔记、项目开发心得以及生活感悟。

### ✨ 博客特色

- 🎨 **现代化设计** - 使用 Butterfly 主题，界面美观简洁
- 📱 **响应式布局** - 完美适配各种设备屏幕
- 🌙 **暗黑模式** - 支持自动切换和手动切换
- 🔍 **搜索功能** - 本地搜索，快速找到内容
- 📊 **数据统计** - 访问量统计和文章阅读量
- 🏷️ **标签分类** - 完善的标签和分类系统
- 💬 **评论系统** - 支持多种评论插件
- 📈 **SEO 优化** - 搜索引擎友好

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0
- Git

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
# 启动本地服务器
npm run server

# 或者使用 hexo 命令
hexo server
```

访问 `http://localhost:4000` 查看博客。

### 构建部署

```bash
# 清理缓存
npm run clean

# 生成静态文件
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 📁 项目结构

```
ZhouBufan.github.io/
├── _config.yml              # Hexo 主配置文件
├── _config.butterfly.yml    # Butterfly 主题配置文件
├── package.json             # 项目依赖配置
├── source/                  # 源文件目录
│   ├── _posts/             # 文章目录
│   │   └── hello-world.md  # 示例文章
│   └── img/                # 图片资源
│       └── head.svg        # 自定义头像
├── themes/                  # 主题目录
│   └── butterfly/          # Butterfly 主题
├── scaffolds/               # 模板文件
├── public/                  # 生成的静态文件
└── README.md               # 项目说明文档
```

## ⚙️ 配置说明

### 主要配置

- **网站信息**: 在 `_config.yml` 中配置网站基本信息
- **主题配置**: 在 `_config.butterfly.yml` 中配置主题相关设置
- **部署设置**: 配置 GitHub Pages 自动部署

### 主题特性

- **导航菜单**: 支持多级菜单和图标
- **社交链接**: GitHub、邮箱、Twitter、LinkedIn 等
- **侧边栏**: 作者信息、最新文章、标签云等
- **文章功能**: 目录、版权声明、相关文章推荐
- **视觉效果**: 代码高亮、图片灯箱、动画效果

## 📝 写作指南

### 创建新文章

```bash
hexo new "文章标题"
```

### 文章 Front-matter

```yaml
---
title: 文章标题
date: 2025-01-05 10:30:00
updated: 2025-01-05 10:30:00
tags: [标签1, 标签2]
categories: [分类]
keywords: [关键词1, 关键词2]
description: 文章描述
top_img: /img/文章顶部图片.jpg
cover: /img/文章缩略图.jpg
comments: true
toc: true
toc_number: true
copyright: true
copyright_author: ZhouBufan
copyright_info: 本文采用 CC BY-NC-SA 4.0 协议，转载请注明出处。
---
```

## 🎨 自定义配置

### 头像设置

博客使用自定义 SVG 头像，文件位于 `source/img/head.svg`。

### 背景图片

- 首页横幅: `themes/butterfly/source/img/index.jpg`
- 默认顶部图片: 配置在 `_config.butterfly.yml` 中

### 主题颜色

主题使用蓝色系配色方案：
- 主色调: #49B1F5
- 强调色: #00c4b6
- 悬停色: #FF7242

## 📊 功能特性

### 已启用功能

- ✅ 暗黑模式自动切换
- ✅ 文章美化效果
- ✅ 代码高亮和复制
- ✅ 图片懒加载
- ✅ 搜索功能
- ✅ 访问统计
- ✅ 文章目录
- ✅ 版权声明
- ✅ 相关文章推荐

### 可配置功能

- 🔧 评论系统 (Disqus/Gitalk/Valine 等)
- 🔧 聊天服务 (Chatra/Tidio/Crisp)
- 🔧 分析统计 (Google Analytics/Baidu Analytics)
- 🔧 广告系统 (Google AdSense)
- 🔧 PWA 支持

## 🛠️ 技术栈

- **框架**: Hexo 7.3.0
- **主题**: Butterfly (最新版)
- **渲染器**: 
  - hexo-renderer-pug (Pug 模板)
  - hexo-renderer-stylus (Stylus 样式)
  - hexo-renderer-marked (Markdown 渲染)
- **部署**: GitHub Pages
- **CDN**: jsDelivr

## 📄 许可证

本博客内容采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个博客！

## 📞 联系方式

- **GitHub**: [@ZhouBuFan](https://github.com/ZhouBuFan)
- **邮箱**: zhoubufan@example.com
- **博客**: [https://zhoubufan.github.io](https://zhoubufan.github.io)

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
