---
title: Git 常用命令参考
tags:
  - Git
  - VCS
toc: true
math: false
abbrlink: 12345
date: 2026-05-11 14:00:00
---

# Git 常用命令参考

本文档整理项目中常用的 Git 命令及其用途说明。

## 命令列表

### 1. 推送到远程分支

```bash
git push origin HEAD:refs/for/release
```

**说明**：将当前分支的最新提交推送到远程 `release` 分支，通常用于发起代码评审（CR）。`HEAD:refs/for/release` 表示将本地 HEAD 指向的提交推送到远程的 `release` 引用路径。

---

### 2. 拣选单个提交

```bash
git cherry-pick b6b12d7264b224aac60b9ba54aeab2eb0380c2d0
```

**说明**：将指定提交（通过 commit hash）拣选到当前分支。这不会修改历史，而是创建一个新的提交副本，适用于将某个特定提交合并到其他分支。

---

### 3. 查看提交历史图

```bash
git log --pretty=oneline --decorate --graph
```

**说明**：以紧凑的单行格式显示提交历史，并配合图形化展示分支合并关系。`--decorate` 会显示分支、标签等引用指向哪个提交，方便查看分支结构和提交流向。

---

### 4. 撤销最近一次提交

```bash
git reset --soft HEAD^
```

**说明**：将 HEAD 移动到上一个提交（`HEAD^`），但保留工作区和暂存区的修改。`--soft` 模式会保留更改在暂存区，便于重新提交或修改。常用于修改提交信息或补充文件。

---

## 附：常用变体

| 命令 | 用途 |
|------|------|
| `git reset --hard HEAD^` | 彻底撤销最近一次提交，丢弃所有修改 |
| `git reset --mixed HEAD^` | 撤销提交，保留修改到工作区（默认模式） |
| `git cherry-pick -n <commit>` | 拣选但不自动提交，便于修改 |

---

## 补充常用命令

### 5. 查看文件修改差异

```bash
git diff
```

**说明**：显示工作区与暂存区之间的修改差异。不带参数时显示所有已修改但未暂存的文件。可加文件名限制范围。

---

### 6. 查看 staged 差异

```bash
git diff --cached
```

**说明**：显示已暂存（`git add`）的文件与最新提交之间的差异。即 staged 区域与 HEAD 的对比。

---

### 7. 切换分支

```bash
git checkout <branch-name>
```

**说明**：切换到指定分支。如果有未提交的修改，可加 `-b` 创建新分支：`git checkout -b <new-branch>`。

---

### 8. 创建并切换新分支

```bash
git checkout -b <branch-name>
```

**说明**：基于当前分支创建新分支并立即切换过去。相当于 `git branch <name>` + `git checkout <name>`。

---

### 9. 拉取远程更新

```bash
git pull origin <branch-name>
```

**说明**：从远程获取指定分支的最新代码并合并到本地。等同于 `git fetch` + `git merge`。

---

### 10. 暂存当前修改

```bash
git stash
```

**说明**：将工作区的修改临时保存到栈中，使工作区恢复到干净状态。常用于临时切分支处理其他任务，之后可用 `git stash pop` 恢复。

---

### 11. 恢复暂存的修改

```bash
git stash pop
```

**说明**：将最近一次 `git stash` 保存的修改恢复到工作区，并从 stash 栈中移除。

---

### 12. 查看分支列表

```bash
git branch -a
```

**说明**：列出所有本地和远程分支。`-r` 仅显示远程分支，`-a` 显示全部。

---

### 13. 删除本地分支

```bash
git branch -d <branch-name>
```

**说明**：删除已合并的本地分支。若需强制删除未合并的分支，使用 `-D`。

---

### 14. 设置上游分支

```bash
git branch --set-upstream-to=origin/<branch-name> <local-branch>
```

**说明**：将本地分支与远程分支建立追踪关系，解决 "no upstream configured" 错误。

---

### 15. 查看远程仓库信息

```bash
git remote -v
```

**说明**：显示远程仓库的 URL 和名称（fetch/push）。

---

### 16. 查看提交简略历史

```bash
git log --oneline -n 10
```

**说明**：显示最近 n 条提交历史，格式为 `hash TITLE`。适合快速回顾近期改动。

---

### 17. 查看某个文件的修改历史

```bash
git log -p <file-path>
```

**说明**：显示指定文件的修改历史，包括每次提交的差异。

---

### 18. 撤销单个文件的修改

```bash
git checkout -- <file-path>
```

**说明**：将指定文件恢复到最近一次提交的状态，丢弃本地修改。

---

### 19. 查看某次提交的内容

```bash
git show <commit-hash>
```

**说明**：显示某次提交的完整信息（包括文件差异）。

---

### 20. 合并其他分支

```bash
git merge <branch-name>
```

**说明**：将指定分支的修改合并到当前分支。若有冲突需手动解决后提交。