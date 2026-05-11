---
title: 常用 Linux 命令参考
tags:
  - Linux
  - Shell
  - 命令行
keywords:
  - Linux
  - 命令行
  - Shell
  - 系统管理
  - 进程管理
toc: true
math: false
abbrlink: 12346
date: 2026-05-12 15:00:00
---

# 常用 Linux 命令参考

本文档整理常用的 Linux 命令及其用途说明。

## 文件操作

### 1. 切换目录

```bash
cd /path/to/directory
```

**说明**：切换到指定目录。`cd ..` 返回上级目录，`cd ~` 返回用户主目录。

---

### 2. 列出目录内容

```bash
ls -la
```

**说明**：列出当前目录所有文件及文件夹。`-l` 显示详细信息，`-a` 显示隐藏文件。

---

### 3. 创建目录

```bash
mkdir -p /path/to/newdir
```

**说明**：创建目录。`-p` 参数可自动创建父级目录。

---

### 4. 删除文件或目录

```bash
rm -rf /path/to/file
```

**说明**：强制删除文件或目录。`-r` 递归删除，`-f` 强制执行。

---

### 5. 复制文件或目录

```bash
cp -r /source /destination
```

**说明**：复制文件或目录。`-r` 用于递归复制目录。

---

### 6. 移动或重命名文件

```bash
mv /old/path /new/path
```

**说明**：移动文件或重命名。

---

### 7. 查看文件内容

```bash
cat /path/to/file
```

**说明**：显示文件全部内容。也可使用 `head` 查看开头，`tail` 查看结尾。

---

## 权限管理

### 8. 修改文件权限

```bash
chmod 755 /path/to/file
```

**说明**：改变文件的读、写、执行权限。`755` 表示所有者可读写执行，组和其他可读执行。

---

### 9. 修改文件所有者

```bash
chown user:group /path/to/file
```

**说明**：改变文件的所有者和所属组。

---

## 系统操作

### 10. 查看进程

```bash
ps aux | grep process_name
```

**说明**：查看当前运行的进程。`grep` 用于筛选特定进程。

---

### 11. 实时进程监控

```bash
top
htop
```

**说明**：`top` 实时显示系统运行状态，包括 CPU、内存使用情况。按 `q` 退出。`htop` 是增强版，界面更友好。

---

### 12. 按名称查找进程

```bash
pgrep -a process_name
```

**说明**：通过进程名查找 PID。`-a` 显示完整命令。

---

### 13. 查看进程树

```bash
pstree -p
```

**说明**：以树形结构显示进程及其父子关系。`-p` 显示 PID。

---

### 14. 终止进程

```bash
kill PID
kill -15 PID  # 优雅终止
kill -9 PID   # 强制终止
```

**说明**：根据 PID 终止进程。`-15` 是默认信号，优雅退出；`-9` 强制立即终止。

---

### 15. 按名称终止进程

```bash
killall process_name
pkill process_name
```

**说明**：通过进程名终止进程。`killall` 终止所有同名进程，`pkill` 支持正则匹配。

---

### 16. 查看系统负载

```bash
uptime
w
```

**说明**：`uptime` 显示系统运行时长和 1/5/15 分钟平均负载。`w` 同时显示当前登录用户。

---

### 17. 详细负载监控

```bash
top
```

**说明**：按 `1` 可查看每个 CPU 核心的使用率。按 `M` 按内存排序，按 `P` 按 CPU 排序。按 `q` 退出。

---

### 18. 监控系统资源历史

```bash
sar -u 1 5    # CPU 使用率，每秒采样 5 次
sar -r 1 5    # 内存使用情况
sar -d 1 5    # 磁盘使用情况
```

**说明**：`sar` 系统性能监控工具，可监控 CPU、内存、磁盘等。需要安装 `sysstat` 包。

---

### 13. 查看磁盘使用

```bash
df -h
```

**说明**：显示磁盘空间使用情况。`-h` 以人类可读格式显示。

---

### 14. 查看内存使用

```bash
free -h
```

**说明**：显示内存使用情况。

---

## 网络操作

### 15. 测试网络连接

```bash
ping -c 4 google.com
```

**说明**：测试网络连通性。`-c 4` 表示发送 4 次请求。

---

### 16. 查看网络接口

```bash
ifconfig
```

**说明**：显示网络接口配置信息。

---

### 17. 远程连接

```bash
ssh user@hostname
```

**说明**：通过 SSH 协议远程连接服务器。

---

### 18. 下载文件

```bash
wget https://example.com/file.tar.gz
```

**说明**：从网络下载文件。

---

## 压缩解压

### 19. 压缩文件

```bash
tar -czvf archive.tar.gz /path/to/dir
```

**说明**：将目录压缩为 `.tar.gz` 格式。`-c` 创建，`-z` gzip 压缩，`-v` 显示过程。

---

### 20. 解压文件

```bash
tar -xzvf archive.tar.gz
```

**说明**：解压 `.tar.gz` 文件。`-x` 解压。

---

## 其他常用命令

| 命令 | 用途 |
|------|------|
| `pwd` | 显示当前工作目录 |
| `whoami` | 显示当前用户名 |
| `date` | 显示当前日期时间 |
| `man command` | 查看命令帮助文档 |
| `grep "pattern" file` | 在文件中搜索内容 |
| `find /path -name "*.txt"` | 查找文件 |
| `tail -f /path/to/log` | 实时查看日志 |

---

*最后更新时间：2026年5月11日*