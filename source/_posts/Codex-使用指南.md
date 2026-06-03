---
title: Codex 使用指南
tags:
  - Codex
  - AI
  - CLI
  - 开发工具
keywords:
  - Codex
  - OpenAI Codex
  - Codex CLI
  - AI 编程
  - 代码生成
categories:
  - AI 工具
toc: true
math: false
abbrlink: 12347
date: 2026-06-03 15:00:00
---

# Codex 使用指南

Codex 是 OpenAI 推出的 AI 编程助手，支持通过自然语言描述生成代码、解释代码、修复 Bug、重构等。本文整理 Codex CLI 的常用安装方式与使用技巧。

## 一、什么是 Codex

Codex 主要有两种形态：

- **Codex CLI**：在终端运行的命令行工具，直接读写本地代码仓库
- **Codex Web / IDE 插件**：在网页或 VS Code 等编辑器中使用

本文以 **Codex CLI** 为主。

---

## 二、安装

### 1. 通过 npm 安装

```bash
npm install -g @openai/codex
```

**说明**：需要 Node.js >= 18。安装后可直接执行 `codex` 命令。

### 2. 通过 Homebrew 安装（macOS）

```bash
brew install codex
```

### 3. 验证安装

```bash
codex --version
```

---

## 三、配置

### 1. 设置 API Key

```bash
export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxx"
```

建议写入 `~/.zshrc` 或 `~/.bashrc` 持久化。

### 2. 登录（推荐方式）

```bash
codex login
```

**说明**：通过浏览器完成 OAuth 登录，无需手动管理 API Key。

### 3. 查看配置

```bash
codex config
```

配置文件默认位置：`~/.codex/config.toml`

---

## 四、基础使用

### 1. 启动交互式会话

```bash
codex
```

**说明**：在当前目录启动一个交互式终端，可以用自然语言提问。

### 2. 单次任务执行

```bash
codex "帮我把 utils.js 里的 var 全部改成 const"
```

**说明**：执行单条指令后退出，适合脚本化调用。

### 3. 指定工作目录

```bash
codex --cd /path/to/project "添加单元测试"
```

---

## 五、常用场景

### 1. 代码生成

```text
> 写一个 Go 函数，读取 CSV 并返回 map[string]string
```

### 2. 代码解释

```text
> 解释一下 src/parser.ts 中的 tokenize 函数
```

### 3. Bug 修复

```text
> 运行 npm test，把失败的用例修好
```

Codex 会自动执行测试、读取报错、定位代码并修改。

### 4. 重构

```text
> 把 services/ 下所有同步 fs 调用改成异步版本
```

### 5. 文档生成

```text
> 给 api/ 目录下的导出函数补充 JSDoc 注释
```

---

## 六、权限与安全模式

Codex CLI 支持几种执行权限模式：

| 模式 | 说明 |
|------|------|
| `suggest` | 仅给出建议，不执行任何修改 |
| `auto-edit` | 自动修改文件，但执行命令需确认 |
| `full-auto` | 文件修改与命令执行全部自动放行 |

切换模式：

```bash
codex --approval-mode auto-edit
```

**建议**：在生产仓库使用 `suggest` 或 `auto-edit`，不要轻易开启 `full-auto`。

---

## 七、高级技巧

### 1. 使用 `.codexignore` 排除文件

类似 `.gitignore`，避免 Codex 读取敏感或无关文件。

```text
node_modules/
dist/
.env*
secrets/
```

### 2. 自定义系统提示词

在项目根目录创建 `AGENTS.md` 或 `CODEX.md`，写入项目背景、编码规范、常用命令，Codex 启动时会自动加载。

### 3. 与 Git 协作

```bash
codex "把当前未提交的改动按功能拆成多个 commit"
```

Codex 可以读 diff、生成 commit message、分批 stage。

### 4. 结合管道使用

```bash
cat error.log | codex "分析这段日志，找出根因"
```

---

## 八、常见问题

### Q1: 提示 `OPENAI_API_KEY not set`

执行 `codex login` 或导出环境变量后重试。

### Q2: 模型响应慢或超时

可在 `~/.codex/config.toml` 中切换更快的模型：

```toml
model = "gpt-5-codex"
```

### Q3: 修改了不该改的文件怎么办

Codex 默认会在修改前显示 diff，且所有改动都可通过 `git checkout` 回滚。建议在干净的工作树上使用。

---

## 九、参考资源

- 官方文档：<https://platform.openai.com/docs/codex>
- GitHub 仓库：<https://github.com/openai/codex>
- 配置说明：`~/.codex/config.toml`

---

*最后更新时间：2026年6月3日*
