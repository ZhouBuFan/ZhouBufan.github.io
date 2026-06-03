---
title: Codex 接入 DeepSeek、Qwen 等第三方模型保姆级教程
tags:
  - Codex
  - DeepSeek
  - Qwen
  - CC Switch
  - AI
keywords:
  - Codex
  - DeepSeek
  - Qwen
  - GLM
  - CC Switch
  - 第三方模型
  - AI 编程
categories:
  - AI 工具
toc: true
math: false
abbrlink: 12348
date: 2026-06-03 16:00:00
---

# Codex 接入 DeepSeek、Qwen 等第三方模型保姆级教程：几分钟搞定，一键切换模型

> 转载整理自公众号「菜鸟教程」（2026-06-01）
> 原文链接：<https://mp.weixin.qq.com/s/9OpY15o9qGjWrSnKHAdicw>

Codex 现在热度很高，用的人不少，毕竟封号没像另外一家频繁，但对于重度用户来说，额度和成本依然是绕不开的问题。

之前配置接入第三方模型也不方便，现在好了，第三方工具 **CC Switch v3.16.0** 更新后，已经可以很方便地把第三方模型接入 Codex。

CC Switch 是一款免费开源的跨平台桌面工具，它能够在本地接管 Codex 等 AI 编程助手的请求，并将请求转发到你指定的 API 提供商，实现模型自由切换。

通过 CC Switch，你可以让 Codex 直接使用 DeepSeek、Qwen、智谱 GLM 等第三方大模型作为后端服务，在保留 Codex 使用体验的同时，大幅降低使用成本，并获得更多模型选择。

![](/img/codex-cc-switch/img_001.png)

接下来基于 CC Switch v3.16.0，演示如何为 Codex 配置 DeepSeek 作为后端模型，其他兼容模型的配置方式也基本类似。

---

## 一、工作原理

CC Switch 会在本机启动一个轻量级代理服务。

当 Codex 发起请求时，链路如下：

```text
Codex → CC Switch → DeepSeek/Qwen/GLM → CC Switch → Codex
```

![](/img/codex-cc-switch/img_002.png)

整个转发过程完全透明。对于 Codex 来说，它仍然认为自己正在访问 OpenAI 官方接口，而实际上请求已经被 CC Switch 转发到了你指定的第三方模型服务。

这样就实现了：

- 保持原有 Codex 使用体验
- 自由切换模型提供商
- 降低 API 使用成本
- 避免频繁修改配置文件

---

## 二、前置条件

| 条件 | 说明 |
|------|------|
| Codex 已安装 | 下载并安装 Codex CLI |
| DeepSeek API Key | 在 DeepSeek 开放平台注册获取 |
| 操作系统 | Windows 10+、macOS 12+、主流 Linux 发行版 |
| CC Switch | 建议使用 v3.16.0 或更高版本 |

---

## 三、第一步：安装 CC Switch

安装包下载地址：<https://github.com/farion1231/cc-switch/releases/latest>

拉到页面底部，可以看到各个平台的下载链接：

![](/img/codex-cc-switch/img_003.png)

根据操作系统选择对应的安装方式：

| 发行版 | 推荐格式 | 安装方式 |
|--------|----------|----------|
| Ubuntu / Debian / Mint / Pop!_OS | `.deb` | `sudo dpkg -i CC-Switch-*.deb` 或 `sudo apt install ./CC-Switch-*.deb` |
| Fedora / RHEL / CentOS / Rocky | `.rpm` | `sudo rpm -i CC-Switch-*.rpm` 或 `sudo dnf install ./CC-Switch-*.rpm` |
| openSUSE | `.rpm` | `sudo zypper install ./CC-Switch-*.rpm` |
| Arch / Manjaro | `.AppImage` | 添加执行权限后直接运行，或使用 AUR |
| 其他 / 不确定 | `.AppImage` | `chmod +x CC-Switch-*.AppImage && ./CC-Switch-*.AppImage` |

### 1. macOS（推荐）

macOS 版本已通过公证，可直接使用 Homebrew 安装：

```bash
# 使用 Homebrew 安装 CC Switch（已公证版本）
brew install --cask cc-switch
```

### 2. Windows

从 GitHub Releases 下载 `.msi` 安装包，双击运行即可。

![](/img/codex-cc-switch/img_004.png)

### 3. Linux（Ubuntu / Debian）

```bash
# 安装 CC Switch deb 包
sudo dpkg -i CC-Switch-*.deb
```

安装完成后启动 CC Switch，主界面会出现在桌面或系统托盘。

![](/img/codex-cc-switch/img_005.png)

---

## 四、第二步：添加 DeepSeek 提供商

在 CC Switch 中添加 DeepSeek 作为 API 提供商，让 Codex 的请求可以转发到 DeepSeek。

操作步骤：

1. 打开 CC Switch，在顶部应用切换栏选择 **Codex**。
2. 点击左侧「Providers」区域的 **+ Add Provider**。

    ![](/img/codex-cc-switch/img_006.png)

3. 在预设列表中搜索 **DeepSeek**，选择对应的预设（v3.16.0 已内置 DeepSeek V4 flash 和 pro 两个版本）。

    ![](/img/codex-cc-switch/img_007.png)

4. 选中后，在下方表单中填入你的 DeepSeek API Key，其余字段使用默认值即可。

    ![](/img/codex-cc-switch/img_008.png)

5. 记得开启 **本地路由映射**，然后点击 **保存**。

    ![](/img/codex-cc-switch/img_009.png)

---

## 五、第三步：开启路由

切换到 DeepSeek 后，系统会提示开启路由。点击左上角的设置按钮进入设置页面：

![](/img/codex-cc-switch/img_010.png)

点击「路由设置」菜单，开启路由：

![](/img/codex-cc-switch/img_011.png)

然后选择 **Codex**：

![](/img/codex-cc-switch/img_012.png)

重新打开 Codex，就可以看到 DeepSeek 的模型标志了：

![](/img/codex-cc-switch/img_013.png)

---

## 六、小结

通过 CC Switch，可以在不修改 Codex 自身配置的情况下，把后端模型透明地切换到 DeepSeek、Qwen、GLM 等第三方服务。对于希望降低成本、规避额度限制的用户来说，是一种较为优雅的方案。

其他模型（Qwen、GLM 等）的接入流程与 DeepSeek 基本一致：在 Providers 中选择对应预设、填入 API Key、开启路由即可。

---

*整理于 2026 年 6 月 3 日*
