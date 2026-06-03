---
title: vrtest.py 通用正则批量验证工具
tags:
  - Python
  - 正则表达式
  - 测试
keywords:
  - Python
  - 正则
  - Excel
  - pandas
  - 批量测试
categories:
  - Python
toc: true
math: false
abbrlink: 12347
date: 2026-05-15 14:00:00
---

# `vrtest.py` 代码说明文档

## 1. 文件作用

`vrtest.py` 是一个通用的批量正则验证脚本，用于检测一批文本是否命中预设的正则规则。

它主要完成三件事：

1. 在脚本中定义一组待验证的正则规则。
2. 从 Excel 文件 `test_cmd.xlsx` 的第一个工作表 `Sheet1` 中读取待测试文本。
3. 对每条文本逐条进行正则匹配，并将匹配结果写入新的 Excel 文件 `正则测试结果.xlsx`。

---

## 2. 完整代码

```python
# -*- coding: utf-8 -*-
import re
import pandas as pd  # pyright: ignore[reportMissingImports]

# 你的全部正则规则
patterns = [
  "^(帮我|给我|为我|我想|我想要|我要|请帮我|请给我|请为我)?(把)?(这个|那个|它|她|他|这个东西|这东西|这玩意|这个玩意|那个东西|那东西|那玩意|那个玩意|那个玩意儿)(关闭|关掉|关上)$"
]

def match_cmd(cmd):
    """匹配指令，返回结果+命中规则号"""
    for idx, pat in enumerate(patterns, 1):
        if re.fullmatch(pat, cmd.strip()):
            return "匹配成功", f"规则{idx}"
    return "匹配失败", "无"

if __name__ == "__main__":
    # 1. 读取Excel （A列存测试指令）
    df = pd.read_excel("test_cmd.xlsx", sheet_name="Sheet1")
    col_name = df.columns[0]

    # 2. 批量匹配
    res_list = []
    for cmd in df[col_name]:
        status, rule = match_cmd(str(cmd))
        res_list.append([cmd, status, rule])

    # 3. 写入新Excel结果
    out_df = pd.DataFrame(res_list, columns=["测试指令","匹配状态","命中规则"])
    out_df.to_excel("正则测试结果.xlsx", index=False)
    print("✅ 测试完成，已生成：正则测试结果.xlsx")
```

---

## 3. 代码整体流程

程序执行流程如下：

```text
启动脚本
  ↓
读取 test_cmd.xlsx 中 Sheet1 的第一列
  ↓
逐条取出测试指令
  ↓
调用 match_cmd() 和 patterns 中的正则逐个匹配
  ↓
记录匹配状态和命中规则编号
  ↓
生成 正则测试结果.xlsx
```

---

## 4. 代码逐部分解释

### 4.1 编码声明

```python
# -*- coding: utf-8 -*-
```

表示该 Python 文件使用 `UTF-8` 编码。

因为代码中包含大量中文字符串和中文注释，所以加上编码声明可以避免部分环境下出现中文乱码问题。

---

### 4.2 导入模块

```python
import re
import pandas as pd  # pyright: ignore[reportMissingImports]
```

#### `re`

`re` 是 Python 内置的正则表达式模块，用来判断一条测试指令是否符合某个正则规则。

本脚本中主要使用：

```python
re.fullmatch(pat, cmd.strip())
```

它表示：整条指令必须完整匹配某条正则规则。

#### `pandas`

`pandas` 用来读取和写入 Excel 文件。

本脚本中用到：

```python
pd.read_excel(...)
pd.DataFrame(...)
out_df.to_excel(...)
```

分别用于：

- 读取 Excel 测试数据
- 构造结果表格
- 输出 Excel 测试结果

#### `# pyright: ignore[reportMissingImports]`

这是给 Pyright 类型检查器看的注释。

如果当前编辑器没有识别到 `pandas` 安装环境，Pyright 可能会报 `reportMissingImports`。这行注释用于忽略该提示，不影响 Python 实际运行。

---

## 5. `patterns` 正则规则列表说明

```python
patterns = [
    ...
]
```

`patterns` 是一个列表，里面每个元素都是一条正则表达式字符串。

程序会按列表顺序从第 1 条规则开始匹配，第一条匹配成功的规则就是命中规则。

命中后返回：

```python
"匹配成功", "规则编号"
```

如果所有规则都不匹配，则返回：

```python
"匹配失败", "无"
```

---

## 6. 正则规则编写说明

`patterns` 列表中的每条规则都是一个独立的正则表达式字符串，可根据自身业务需要自由编写。

常见的几类正则用途：

- **完全匹配某固定文本**：例如 `^开始$`，要求整条文本就是 `开始`。
- **多种说法或同义词匹配**：使用 `|` 分支，例如 `^(打开|开启|启动)系统$`。
- **可选词缀匹配**：使用 `?` 让某段内容可有可无，例如 `^(请)?打开系统$`。
- **数值或参数匹配**：使用 `[0-9]+`、`[0-9]+%?` 等表达式匹配数字或百分比。
- **分组捕获**：使用 `( ... )` 将关键参数分组，便于后续提取。

由于脚本使用 `re.fullmatch()` 进行整体匹配，规则必须能够覆盖整条输入文本，而不是其中一部分。

---

## 7. 正则表达式关键符号解释

### 7.1 `^`

表示从字符串开头开始匹配。

例如：

```regex
^开始
```

表示指令必须以 `开始` 开头。

---

### 7.2 `$`

表示匹配到字符串结尾。

例如：

```regex
开始$
```

表示指令必须以 `开始` 结尾。

---

### 7.3 `|`

表示“或者”。

例如：

```regex
(打开|开启|启动)
```

表示可以匹配：

```text
打开
开启
启动
```

---

### 7.4 `?`

表示前面的内容可有可无。

例如：

```regex
(帮我)?开始
```

可以匹配：

```text
帮我开始
开始
```

---

### 7.5 `[0-9]+`

表示一个或多个数字。

例如：

```regex
[0-9]+%
```

可以匹配：

```text
10%
50%
100%
```

---

### 7.6 `%?`

表示百分号可有可无。

例如：

```regex
[0-9]+%?
```

可以匹配：

```text
50
50%
```

---

## 8. `match_cmd` 函数说明

```python
def match_cmd(cmd):
    """匹配指令，返回结果+命中规则号"""
    for idx, pat in enumerate(patterns, 1):
        if re.fullmatch(pat, cmd.strip()):
            return "匹配成功", f"规则{idx}"
    return "匹配失败", "无"
```

这个函数用于匹配单条指令。

### 参数

```python
cmd
```

表示要测试的一条文本。

例如：

```text
开始
请帮我启动系统
```

### 执行逻辑

```python
for idx, pat in enumerate(patterns, 1):
```

这行代码会遍历所有正则规则。

- `idx` 是规则编号，从 `1` 开始。
- `pat` 是当前正在匹配的正则表达式。

```python
if re.fullmatch(pat, cmd.strip()):
```

这行代码表示：

1. 先用 `cmd.strip()` 去掉指令前后的空格。
2. 再用 `re.fullmatch()` 判断整条指令是否完整符合当前规则。

如果匹配成功：

```python
return "匹配成功", f"规则{idx}"
```

例如命中第 18 条规则，则返回：

```text
匹配成功, 规则18
```

如果所有规则都没匹配上：

```python
return "匹配失败", "无"
```

---

## 9. 主程序说明

```python
if __name__ == "__main__":
```

这表示只有直接运行 `vrtest.py` 时，下面的代码才会执行。

如果这个文件被其他 Python 文件导入，则不会自动执行 Excel 读取和结果生成逻辑。

---

## 10. 读取 Excel

```python
df = pd.read_excel("test_cmd.xlsx", sheet_name="Sheet1")
col_name = df.columns[0]
```

### `pd.read_excel(...)`

读取当前目录下的 Excel 文件：

```text
test_cmd.xlsx
```

读取的工作表名称是：

```text
Sheet1
```

### `df.columns[0]`

获取 Excel 中第一列的列名。

也就是说，脚本默认认为测试指令放在 Excel 的第一列，不要求第一列必须叫固定名字。

例如 Excel 内容可以是：

| 待测文本 |
|---|
| 开始 |
| 请帮我启动系统 |
| 输入文本 ABC |

程序会自动使用第一列进行测试。

---

## 11. 批量匹配

```python
res_list = []
for cmd in df[col_name]:
    status, rule = match_cmd(str(cmd))
    res_list.append([cmd, status, rule])
```

### `res_list = []`

创建一个空列表，用来保存每条测试指令的匹配结果。

### `for cmd in df[col_name]:`

逐条读取 Excel 第一列中的指令。

### `status, rule = match_cmd(str(cmd))`

调用 `match_cmd()` 函数进行匹配。

这里使用 `str(cmd)` 是为了确保 Excel 中读取出来的内容都转换成字符串，避免数字、空值等非字符串类型导致匹配报错。

### `res_list.append([cmd, status, rule])`

把每条指令的结果保存成三列：

```text
原始测试指令、匹配状态、命中规则
```

例如：

```text
开始, 匹配成功, 规则1
```

---

## 12. 写入结果 Excel

```python
out_df = pd.DataFrame(res_list, columns=["测试指令","匹配状态","命中规则"])
out_df.to_excel("正则测试结果.xlsx", index=False)
print("✅ 测试完成，已生成：正则测试结果.xlsx")
```

### 创建结果表格

```python
out_df = pd.DataFrame(res_list, columns=["测试指令","匹配状态","命中规则"])
```

把 `res_list` 转换成 pandas 表格，并设置三列列名：

```text
测试指令
匹配状态
命中规则
```

### 输出 Excel 文件

```python
out_df.to_excel("正则测试结果.xlsx", index=False)
```

生成新的 Excel 文件：

```text
正则测试结果.xlsx
```

`index=False` 表示不把 pandas 默认的行号写入 Excel。

### 打印完成提示

```python
print("✅ 测试完成，已生成：正则测试结果.xlsx")
```

运行结束后，在终端显示测试完成提示。

---

## 13. 输入文件要求

脚本要求当前目录下存在：

```text
test_cmd.xlsx
```

并且该文件中存在工作表：

```text
Sheet1
```

测试指令需要放在第一列。

示例：

| 测试文本 |
|---|
| 开始 |
| 请帮我启动系统 |
| 系统进度 50% |
| 模式切换为高 |
| 输入参数 ABC |

---

## 14. 输出文件说明

脚本运行后会生成：

```text
正则测试结果.xlsx
```

输出文件包含三列：

| 列名 | 含义 |
|---|---|
| 测试指令 | Excel 中读取到的原始指令 |
| 匹配状态 | `匹配成功` 或 `匹配失败` |
| 命中规则 | 如果匹配成功，显示规则编号；否则显示 `无` |

示例输出：

| 测试指令 | 匹配状态 | 命中规则 |
|---|---|---|
| 开始 | 匹配成功 | 规则1 |
| 请帮我启动系统 | 匹配成功 | 规则3 |
| 随便一段文本 | 匹配失败 | 无 |

---

## 15. 运行方式

### 15.1 安装依赖

如果还没有安装 `pandas` 和 Excel 读写依赖，可以执行：

```bash
pip install pandas openpyxl
```

### 15.2 准备测试文件

在 `vrtest.py` 同级目录下放置：

```text
test_cmd.xlsx
```

确保里面有 `Sheet1`，并且第一列是测试指令。

### 15.3 运行脚本

```bash
python vrtest.py
```

运行成功后会生成：

```text
正则测试结果.xlsx
```

---

## 16. 注意事项

1. 当前脚本使用 `re.fullmatch()`，所以整条指令必须完整符合正则规则，不能只匹配其中一部分。
2. 规则是按顺序匹配的，如果多条规则都能匹配同一条指令，只会返回第一条命中的规则。
3. 输入 Excel 必须包含 `Sheet1`，否则 `pd.read_excel()` 会报错。
4. 测试指令默认读取第一列，不依赖固定列名。
5. 如果 Excel 中有空单元格，`str(cmd)` 可能会把空值转换成字符串 `nan`，通常会匹配失败。
6. 当前百分比规则只限制是数字加 `%`，没有限制范围，所以 `999%` 这类文本也可能命中。
7. 当前脚本只输出命中规则编号，不会输出具体是哪一类意图。

---

## 17. 可优化方向

后续可以考虑优化：

1. 给每条规则增加规则名称，便于结果中直接看出命中的业务含义。
2. 限制百分比范围为 `0%` 到 `100%` 等更精确的数值约束。
3. 对空值、缺少 Excel、缺少 Sheet 等情况增加异常提示。
4. 将正则规则拆分成配置文件，方便维护。
5. 输出更多字段，例如规则分类、捕获参数等。
6. 将重复的词表提取为变量，减少正则规则中的重复内容。

---

## 18. 总结

这个脚本是一个**通用的批量正则验证工具**。

它通过 `patterns` 中预设的正则表达式，对 Excel 中的待测文本逐条进行完整匹配，最终输出每条文本是否命中以及命中的规则编号。

适合用于任何需要批量验证文本是否符合一组正则规则的场景，例如指令解析、文本分类、关键字校验、表单内容校验等。
