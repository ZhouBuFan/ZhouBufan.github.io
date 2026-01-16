---
abbrlink: 46192
title: Go语言切片与数组详解
date: 2025-10-24 10:00:00
tags: 
  - Go
categories: 
  - Go学习笔记
---
# Go语言切片与数组详解

## 概述

在Go语言中，**数组（Array）**和**切片（Slice）**是两个容易混淆但非常重要的概念。理解它们的区别和关系对于编写高效的Go程序至关重要。

## 数组（Array）

### 定义

数组是一个**固定长度**的、由相同类型元素组成的序列。

### 基本语法

```go
// 声明方式1：指定长度
var arr1 [5]int           // [0 0 0 0 0]

// 声明方式2：初始化
var arr2 [5]int = [5]int{1, 2, 3, 4, 5}

// 声明方式3：简短声明
arr3 := [5]int{1, 2, 3, 4, 5}

// 声明方式4：让编译器推断长度
arr4 := [...]int{1, 2, 3, 4, 5}  // 长度自动推断为5
```

### 数组的特点

1. **长度固定**：数组的长度是类型的一部分
2. **值类型**：数组是值类型，赋值会复制整个数组
3. **长度是类型的一部分**：`[5]int` 和 `[10]int` 是不同的类型

### 数组示例

```go
package main

import "fmt"

func main() {
    // 数组是值类型
    arr1 := [3]int{1, 2, 3}
    arr2 := arr1  // 复制整个数组
    
    arr2[0] = 100
    fmt.Println("arr1:", arr1)  // [1 2 3]
    fmt.Println("arr2:", arr2)  // [100 2 3]
    
    // 长度是类型的一部分
    var arr3 [5]int
    var arr4 [10]int
    // arr3 = arr4  // 编译错误：类型不匹配
}
```

## 切片（Slice）

### 定义

切片是对数组的**抽象**，提供了更灵活、更强大的序列操作接口。

### 基本语法

```go
// 声明方式1：nil切片
var s1 []int  // nil切片，长度为0

// 声明方式2：空切片
var s2 []int = []int{}  // 空切片，长度为0

// 声明方式3：使用make
s3 := make([]int, 5)        // 长度为5，容量为5
s4 := make([]int, 5, 10)    // 长度为5，容量为10

// 声明方式4：字面量
s5 := []int{1, 2, 3, 4, 5}

// 声明方式5：从数组创建
arr := [5]int{1, 2, 3, 4, 5}
s6 := arr[:]      // 整个数组
s7 := arr[1:3]    // 索引1到3（不包含3）
s8 := arr[:3]     // 索引0到3
s9 := arr[2:]     // 索引2到末尾
```

### 切片的结构

切片在底层是一个结构体，包含三个字段：

```go
type slice struct {
    ptr *T      // 指向底层数组的指针
    len int     // 切片的长度
    cap int     // 切片的容量
}
```

### 切片的内部结构

```
切片: []int{1, 2, 3, 4, 5}
      ↓
┌─────────────────────────────────┐
│ ptr: 指向底层数组的指针          │
│ len: 5 (当前元素个数)            │
│ cap: 5 (底层数组的容量)          │
└─────────────────────────────────┘
      ↓
┌─────────────────────────────────┐
│ 底层数组: [1, 2, 3, 4, 5]       │
└─────────────────────────────────┘
```

## 数组与切片的关系

### 1. 切片是对数组的引用

切片本身不存储数据，而是**引用**底层数组的一部分。

```go
package main

import "fmt"

func main() {
    // 创建数组
    arr := [5]int{1, 2, 3, 4, 5}
    
    // 从数组创建切片
    s := arr[1:4]  // [2, 3, 4]
    
    fmt.Println("数组:", arr)  // [1 2 3 4 5]
    fmt.Println("切片:", s)    // [2 3 4]
    
    // 修改切片会影响底层数组
    s[0] = 100
    fmt.Println("修改切片后:")
    fmt.Println("数组:", arr)  // [1 100 3 4 5]
    fmt.Println("切片:", s)    // [100 3 4]
}
```

### 2. 多个切片可以共享同一个底层数组

```go
package main

import "fmt"

func main() {
    arr := [5]int{1, 2, 3, 4, 5}
    
    s1 := arr[0:3]  // [1, 2, 3]
    s2 := arr[2:5]  // [3, 4, 5]
    
    // 两个切片共享底层数组
    s1[2] = 300
    s2[0] = 300
    
    fmt.Println("数组:", arr)  // [1 2 300 4 5]
    fmt.Println("切片1:", s1)   // [1 2 300]
    fmt.Println("切片2:", s2)   // [300 4 5]
}
```

### 3. 切片的容量（Capacity）

```go
package main

import "fmt"

func main() {
    arr := [10]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
    
    s := arr[2:5]  // [2, 3, 4]
    
    fmt.Printf("长度: %d\n", len(s))  // 3
    fmt.Printf("容量: %d\n", cap(s))  // 8 (从索引2到数组末尾)
    
    // 可以扩展切片（在容量范围内）
    s = s[:6]  // 扩展到 [2, 3, 4, 5, 6, 7]
    fmt.Println("扩展后:", s)
    fmt.Printf("长度: %d, 容量: %d\n", len(s), cap(s))
}
```

## 关键区别对比

| 特性 | 数组（Array） | 切片（Slice） |
|------|--------------|--------------|
| **长度** | 固定，编译时确定 | 可变，运行时动态 |
| **类型** | 值类型（复制整个数组） | 引用类型（引用底层数组） |
| **长度是类型的一部分** | ✅ 是 | ❌ 不是 |
| **内存分配** | 在栈上分配 | 在堆上分配（通常） |
| **传递方式** | 值传递（复制） | 引用传递（共享底层数组） |
| **性能** | 更快（栈分配） | 稍慢（堆分配） |
| **灵活性** | 低 | 高 |
| **使用场景** | 固定大小集合 | 动态大小集合 |

## 详细示例

### 示例1：数组的值传递

```go
package main

import "fmt"

func modifyArray(arr [5]int) {
    arr[0] = 100  // 只修改副本
}

func main() {
    arr := [5]int{1, 2, 3, 4, 5}
    modifyArray(arr)
    fmt.Println(arr)  // [1 2 3 4 5] - 原数组未改变
}
```

### 示例2：切片的引用传递

```go
package main

import "fmt"

func modifySlice(s []int) {
    s[0] = 100  // 修改底层数组
}

func main() {
    s := []int{1, 2, 3, 4, 5}
    modifySlice(s)
    fmt.Println(s)  // [100 2 3 4 5] - 切片被修改
}
```

### 示例3：切片的扩容

```go
package main

import "fmt"

func main() {
    s := make([]int, 3, 5)  // 长度3，容量5
    s[0], s[1], s[2] = 1, 2, 3
    
    fmt.Printf("长度: %d, 容量: %d\n", len(s), cap(s))
    fmt.Println("切片:", s)
    
    // 追加元素（在容量范围内）
    s = append(s, 4)
    fmt.Printf("追加后 - 长度: %d, 容量: %d\n", len(s), cap(s))
    
    // 超出容量，自动扩容
    s = append(s, 5, 6, 7)
    fmt.Printf("扩容后 - 长度: %d, 容量: %d\n", len(s), cap(s))
    fmt.Println("切片:", s)
}
```

### 示例4：切片的底层数组共享

```go
package main

import "fmt"

func main() {
    arr := [5]int{1, 2, 3, 4, 5}
    
    s1 := arr[0:3]  // [1, 2, 3]
    s2 := arr[2:5]  // [3, 4, 5]
    
    fmt.Println("初始状态:")
    fmt.Printf("数组: %v\n", arr)
    fmt.Printf("切片1: %v (长度:%d, 容量:%d)\n", s1, len(s1), cap(s1))
    fmt.Printf("切片2: %v (长度:%d, 容量:%d)\n", s2, len(s2), cap(s2))
    
    // 修改切片1
    s1[2] = 300
    fmt.Println("\n修改切片1[2] = 300:")
    fmt.Printf("数组: %v\n", arr)
    fmt.Printf("切片1: %v\n", s1)
    fmt.Printf("切片2: %v\n", s2)  // 切片2也受影响
    
    // 修改切片2
    s2[0] = 400
    fmt.Println("\n修改切片2[0] = 400:")
    fmt.Printf("数组: %v\n", arr)
    fmt.Printf("切片1: %v\n", s1)  // 切片1也受影响
    fmt.Printf("切片2: %v\n", s2)
}
```

## 切片的常见操作

### 1. 创建切片

```go
// 从数组创建
arr := [5]int{1, 2, 3, 4, 5}
s1 := arr[:]      // 整个数组
s2 := arr[1:4]    // 索引1到4（不包含4）

// 直接创建
s3 := []int{1, 2, 3, 4, 5}

// 使用make
s4 := make([]int, 5)        // 长度5，容量5
s5 := make([]int, 5, 10)    // 长度5，容量10
```

### 2. 追加元素

```go
s := []int{1, 2, 3}
s = append(s, 4)           // 追加单个元素
s = append(s, 5, 6, 7)     // 追加多个元素
s = append(s, []int{8, 9}...)  // 追加另一个切片
```

### 3. 复制切片

```go
s1 := []int{1, 2, 3, 4, 5}
s2 := make([]int, len(s1))
copy(s2, s1)  // 复制s1到s2

// 或者使用切片表达式
s3 := s1[:]  // 浅拷贝（共享底层数组）
```

### 4. 删除元素

```go
// 删除索引i的元素
func remove(s []int, i int) []int {
    return append(s[:i], s[i+1:]...)
}

// 使用示例
s := []int{1, 2, 3, 4, 5}
s = remove(s, 2)  // 删除索引2的元素（值为3）
```

### 5. 插入元素

```go
// 在索引i处插入元素
func insert(s []int, i int, v int) []int {
    return append(s[:i], append([]int{v}, s[i:]...)...)
}

// 使用示例
s := []int{1, 2, 3, 4, 5}
s = insert(s, 2, 100)  // 在索引2处插入100
```

## 内存模型详解

### 数组的内存布局

```
数组: [5]int{1, 2, 3, 4, 5}

内存地址:  0x1000  0x1008  0x1010  0x1018  0x1020
值:       [  1  ] [  2  ] [  3  ] [  4  ] [  5  ]
```

### 切片的内存布局

```
切片: []int{1, 2, 3, 4, 5}

切片结构体:
┌─────────────┐
│ ptr: 0x1000 │ ──┐
│ len: 5      │   │
│ cap: 5      │   │
└─────────────┘   │
                  │
                  ↓
            ┌─────────────────────────┐
            │ 底层数组: [1, 2, 3, 4, 5] │
            └─────────────────────────┘
```

### 多个切片共享底层数组

```
数组: [10]int{0,1,2,3,4,5,6,7,8,9}

切片1: arr[0:5]
┌─────────────┐
│ ptr: 0x1000 │ ──┐
│ len: 5      │   │
│ cap: 10     │   │
└─────────────┘   │
                  │
切片2: arr[2:7]   │
┌─────────────┐   │
│ ptr: 0x1010 │ ──┤
│ len: 5      │   │
│ cap: 8      │   │
└─────────────┘   │
                  │
                  ↓
        ┌─────────────────────────────────┐
        │ [0,1,2,3,4,5,6,7,8,9]          │
        └─────────────────────────────────┘
```

## 常见陷阱和注意事项

### 1. 切片扩容会创建新的底层数组

```go
package main

import "fmt"

func main() {
    arr := [5]int{1, 2, 3, 4, 5}
    s1 := arr[:]  // [1, 2, 3, 4, 5]
    
    fmt.Println("初始:")
    fmt.Printf("数组: %v\n", arr)
    fmt.Printf("切片: %v\n", s1)
    
    // 追加元素，超出容量，创建新数组
    s1 = append(s1, 6)
    
    fmt.Println("\n追加后:")
    fmt.Printf("数组: %v\n", arr)  // 未改变
    fmt.Printf("切片: %v\n", s1)    // [1, 2, 3, 4, 5, 6]
    
    // 修改切片
    s1[0] = 100
    fmt.Println("\n修改切片后:")
    fmt.Printf("数组: %v\n", arr)  // 未改变（已不共享）
    fmt.Printf("切片: %v\n", s1)    // [100, 2, 3, 4, 5, 6]
}
```

### 2. 空切片 vs nil切片

```go
package main

import "fmt"

func main() {
    var s1 []int           // nil切片
    s2 := []int{}          // 空切片
    s3 := make([]int, 0)   // 空切片
    
    fmt.Println("s1 == nil:", s1 == nil)  // true
    fmt.Println("s2 == nil:", s2 == nil)  // false
    fmt.Println("s3 == nil:", s3 == nil)  // false
    
    fmt.Println("len(s1):", len(s1))  // 0
    fmt.Println("len(s2):", len(s2))  // 0
    fmt.Println("len(s3):", len(s3))  // 0
    
    // 都可以正常使用
    s1 = append(s1, 1)
    s2 = append(s2, 1)
    s3 = append(s3, 1)
}
```

### 3. 切片作为函数参数

```go
package main

import "fmt"

// 错误：不会改变原切片
func appendWrong(s []int, v int) {
    s = append(s, v)  // 只修改局部变量
}

// 正确：返回新切片
func appendCorrect(s []int, v int) []int {
    return append(s, v)
}

func main() {
    s := []int{1, 2, 3}
    
    appendWrong(s, 4)
    fmt.Println(s)  // [1 2 3] - 未改变
    
    s = appendCorrect(s, 4)
    fmt.Println(s)  // [1 2 3 4] - 已改变
}
```

## 性能考虑

### 1. 预分配容量

```go
// 不好：频繁扩容
var s []int
for i := 0; i < 1000; i++ {
    s = append(s, i)  // 可能多次扩容
}

// 好：预分配容量
s := make([]int, 0, 1000)  // 预分配容量
for i := 0; i < 1000; i++ {
    s = append(s, i)  // 不会扩容
}
```

### 2. 避免不必要的复制

```go
// 不好：复制整个切片
func process(s []int) {
    s2 := make([]int, len(s))
    copy(s2, s)
    // 处理s2...
}

// 好：直接使用切片（如果不需要修改）
func process(s []int) {
    // 直接处理s...
}
```

## 实际应用场景

### 1. 数组：固定大小的集合

```go
// 棋盘（8x8）
type ChessBoard [8][8]int

// 颜色（RGB）
type Color [3]uint8

// 坐标点
type Point [2]float64
```

### 2. 切片：动态集合

```go
// 用户列表
users := []User{}

// 日志记录
logs := make([]LogEntry, 0, 100)

// 缓冲区
buffer := make([]byte, 0, 1024)
```

## 总结

### 数组（Array）
- **固定长度**，长度是类型的一部分
- **值类型**，赋值会复制整个数组
- 适用于**固定大小**的集合
- 性能更好（栈分配）

### 切片（Slice）
- **可变长度**，更灵活
- **引用类型**，引用底层数组
- 适用于**动态大小**的集合
- 功能更强大（append、copy等）

### 关系
- 切片是对数组的**抽象和封装**
- 切片**引用**底层数组
- 多个切片可以**共享**同一个底层数组
- 切片**扩容**时会创建新的底层数组

理解数组和切片的关系，有助于编写更高效、更安全的Go程序。在实际开发中，**切片使用更频繁**，因为它提供了更好的灵活性和功能。

## 相关资源

- [Go官方文档 - 数组](https://golang.org/ref/spec#Array_types)
- [Go官方文档 - 切片](https://golang.org/ref/spec#Slice_types)
- [Go语言圣经 - 数组和切片](https://gopl-zh.github.io/ch4/ch4-02.html)
- [Effective Go - 切片](https://golang.org/doc/effective_go.html#slices)
