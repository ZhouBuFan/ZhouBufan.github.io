---
title: Go 函数作为值和参数
tags:
  - Go
categories:
  - Go学习笔记
keywords:
  - Go学习笔记
abbrlink: 46190
date: 2025-10-11 10:30:19
---
# Go 函数作为值和参数 - 代码分析

## 概述

本文档分析了一个展示Go语言中**函数作为值**和**函数作为参数**特性的示例代码。

## 代码

```go
package main

import (
	"fmt"
	"math"
)

func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func main() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))

	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))
}
```

## 运行结果

```
13
5
81
```

## 详细分析

### 1. `compute` 函数

```go
func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}
```

**功能说明：**
- 接受一个函数作为参数 `fn`
- 函数类型：`func(float64, float64) float64`
- 固定调用 `fn(3, 4)` 并返回结果

**关键概念：**
- 函数作为**第一类值**（first-class values）
- 函数可以作为参数传递给其他函数

### 2. 匿名函数 `hypot`

```go
hypot := func(x, y float64) float64 {
	return math.Sqrt(x*x + y*y)
}
```

**功能说明：**
- 计算直角三角形的斜边长度（勾股定理）
- 公式：√(x² + y²)
- 这是一个**匿名函数**，赋值给变量 `hypot`

### 3. 函数调用分析

#### 调用 1：`hypot(5, 12)`
```go
fmt.Println(hypot(5, 12))
```
- **计算过程：** √(5² + 12²) = √(25 + 144) = √169 = **13**
- **结果：** 13

#### 调用 2：`compute(hypot)`
```go
fmt.Println(compute(hypot))
```
- **传递过程：** 将 `hypot` 函数作为参数传给 `compute`
- **内部调用：** `compute` 内部执行 `hypot(3, 4)`
- **计算过程：** √(3² + 4²) = √(9 + 16) = √25 = **5**
- **结果：** 5

#### 调用 3：`compute(math.Pow)`
```go
fmt.Println(compute(math.Pow))
```
- **传递过程：** 将 `math.Pow` 函数作为参数传给 `compute`
- **内部调用：** `compute` 内部执行 `math.Pow(3, 4)`
- **计算过程：** 3⁴ = **81**
- **结果：** 81

## 核心概念

### 1. 函数作为值
在Go中，函数可以像其他值一样被赋值给变量、作为参数传递、作为返回值等。

### 2. 函数类型
```go
func(float64, float64) float64
```
这表示一个接受两个 `float64` 参数并返回 `float64` 的函数类型。

### 3. 匿名函数
```go
func(x, y float64) float64 {
    return math.Sqrt(x*x + y*y)
}
```
没有函数名的函数，可以直接赋值给变量或作为参数传递。

### 4. 高阶函数
`compute` 函数接受其他函数作为参数，是一个**高阶函数**的例子。

## 实际应用场景

1. **回调函数**：在事件处理、异步编程中
2. **函数式编程**：map、filter、reduce 等操作
3. **中间件模式**：在Web框架中处理请求
4. **策略模式**：根据不同的策略执行不同的算法

## 总结

这个示例展示了Go语言中函数作为第一类值的重要特性，为编写更灵活、可复用的代码提供了强大的工具。通过将函数作为参数传递，我们可以实现高度解耦和可扩展的程序设计。
