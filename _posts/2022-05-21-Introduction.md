---
layout: post
title: "FOCG5: 1.图形学介绍"
subtitle: "FOCG5: 1 Introduction"
background: '/img/posts/01.jpg'
---

计算机图形学是一门使用计算机创建和处理图片的学科。这本书介绍的是与之相关的算法及数学工具。

本章定义了一些基本的术语，以及计算机图形学相关的历史背景。

## 1.1 图形学领域 Graphics Areas

计算机图形学是一个广泛的领域，包括了很多不同的子领域，下面是一些主要的子领域：

- 模型 Modeling 

    处理模型形状和显示的数学表示，比如一个杯子可能是用一堆特定规则的3D点表示，而通过反射的数学模型，定义光线如何在杯子表面反射。

- 渲染 Rendering

    从3D模型生成2D的图片。

- 动画 Animation

    通过连续的图片表达运动过程。

其他涉及图形学的相关领域：

- 用户交互 User interaction

    处理输入设备和应用程序之间的交互，以图像的方式反馈给用户。

- 虚拟现实 Virtual reality

    试图让用户沉浸在3D虚拟世界中。

- 可视化 Visualization 

    通过图像的方式给用户传递复杂的信息

- 图像处理 Image processing 
- 3D扫描 Three-dimensionalscanning 
- 计算摄影 Computational photography 

## 1.2 主要应用 Major Applications

- 视频游戏 Video games 
- 卡通 Cartoons
- 电影特效 Visual effects 
- 动画电影 Animated films 

    动画电影和电影特效的区别在于对真实度的要求。

- 计算机辅助设计和制造 CAD/CAM 

    *computer-aided design*/*computer-aided manufacturing*

- 模拟 Simulation
- 医学影像 Medical imaging 
- 数据可视化 Information visualization 

## 1.3 图形接口 Graphics APIs

使用图形库就是调用图形API，图形API就是一组函数，提供基本的图形操作，比如绘制图片和3D面到屏幕上。

常用调用图形API的方式有两种，一种是像Java这样的高级语言，封装了图形部分作为语言的一部分，另一种是用像C++这样的语言，调用OpenGL、Vulkan这样的底层图形API，

## 1.4 图形管线 Graphics Pipeline

如今的每台桌面计算机都具备强大的3D图形管线。3D图形管线是一种特殊的软硬件子系统，用来高效的处理3D基本体的透视图绘制。通常，这些系统针会对共享顶点的三角面进行优化。

管线基本的操作是映射3D顶点的位置到2D屏幕的位置，并在屏幕中渲染这些三角面，使他们在屏幕中看上去更加真实，并以从后往前的顺序显示出来。

从后往前显示图元是计算机图形学中一个重要课题，现在主要使用`z-buffer`去实现。

图形管线中的几何处理可以通过一个3D+齐次坐标（`homogeneous`）的4D坐标空间实现，这些4D坐标通过4x4的矩阵和4维的向量进行处理。图形管线中包含了许多能够高效处理这些矩阵和向量的机制。

图片生成的速度和三角面数量是强相关的，在交互体验比视觉效果更重要的时候，需要用更少的三角面去代表一个模型。此外，如果从远处看一个模型，需要的绘制的三角面比从近处看要少很多。所以会用不同的精度等级`LOD level of detail`去表示一个模型。

## 1.5 数值问题 Numerical Issues

在大多数的图形程序中，数值问题非常重要。在以前，由于不同机器内部表示数字的方式不同，所以很难以可靠且优雅的方式去解决这类问题。幸运的是，现在几乎所有计算机都符合 `IEEE floating-point` 标准（IEEE Standards Association, 1985），方便了编程者对数据的处理。

`IEEE floating-point`标准中有很多好的特性，能够帮助我们处理数值，下面介绍图形领域我们可以利用的特性。首先，也是最重要的，了解三种在`IEEE floating-point`中特殊的实数值。

1. `无穷 Infinity (∞).` 这是一个大于所有其他有效数字的有效数字。
2. `负无穷 Minus infinity (−∞).` 这是一个小于所有其他有效数字的有效数字。
3. `Not a number(NaN).` 这是一个无效数字，来源于未定义结果的操作，比如0除以0。

特殊值的存在，让编程者可以简单的处理很多情况。具体来说，对于任意实数 `a` ，以下规则适用于除以无穷值。

$$+a/(+\infty)=+0,$$

$$-a/(+\infty)=-0,$$

$$+a/(-\infty)=-0,$$

$$-a/(-\infty)=+0.$$

>  `IEEE floating-point`有两种表示0的方式，一种作为正数，一种作为负数。需要区分 `–0` 和 `+0` 场景不多，但需要了解，防止遇到这样的情况。

其他的一些情况:

$$\infty+\infty=\infty,$$

$$\infty-\infty= NaN,$$

$$\infty \times \infty=\infty,$$

$$\infty / \infty=NaN,$$

$$\infty / a=\infty,$$

$$\infty / 0=\infty,$$

$$ 0 / 0=NaN.$$

无穷值在布尔运算中的规则：
1. 所有非无穷的有效数字小于 +∞
2. 所有非无穷的有效数字大于 −∞.
3. −∞ 小于 +∞.

涉及`NaN`值的规则：
1. 所有包含`NaN`的数学表达式，结果为`NaN`
2. 所有包含`NaN`的布尔运算，结果为`false`

除以0的规则（a为正实数）：

$$ +a / +0=+\infty,$$

$$ -a / +0=-\infty.$$


利用好IEEE的标准，可以更简单的处理好数值计算的问题，比如下面这个式子：

$$ a=\frac{1}{\frac{1}{b}+\frac{1}{c}}$$

在没有IEEE标准的时候，我们需要检查 `b` 和 `c` 是否为0，否则程序可能就会崩溃。但在IEEE标准下，如果 `b` 和 `c` 为0，那 `a` 也会为0。

另一种避免特殊情况检查的方式，是利用`NaN`的布尔特性。例如下面的情况：

```
    a = f(x)
    if (a > 0) then
        do something
```

这里的`a`可能会返回`∞`或者`NaN`这样的值，但`if`语句依然会生效：如果 `a=NaN` 或者 `a=-∞`结果就为`false`； 如果  `a=+∞`结果就为`true`。

## 1.6 效率 Efficiency

效率，往往是权衡的结果。架构不同，权衡的内容也不同。当前技术架构下，我们应该更关心内存的访问模式，而非操作的次数。这和二十年前的想法正好相反，主要原因是内存的发展速度没有能跟上处理器的发展。

由于这种趋势仍在继续，所以有限及连续的内存访问对于效率的重要性会一直增加。

提高代码执行效率的方法：

1. 尽可能以最直接的方式编码。根据需要，提前计算过程数据的结果，而不要储存他们。
2. 在优化模式下编译。
3. 使用分析工具去找关键瓶颈。
4. 检查数据结构以实现局部优化。如果可能，让数据单元大小和目标架构上的缓存大小相匹配。
5. 如果分析工具找出了数值计算的瓶颈，检查编译器生成的汇编代码是否存在效率缺失，重新编码解决你发现的问题。

以上最重要的是第一个。大多数的优化常常是让代码更难阅读，而不是提高效率。此外，前期花时间优化代码，通常比后面花时间改bug更好。同时，注意老课本上建议，比如用整数比实数的速度更快，但是在现代CPU架构中整数和浮点的计算速度是一样的。上面这些情况，都需要根据机器和编译器的具体情况进行分析。

## 1.7 设计和编写图形程序 Designing and Coding Graphics Programs

### 1.7.1 类设计 Class Design

任何图形程序的一个关键部分是拥有针对几何实体（例如矢量和矩阵）以及图形实体（例如 RGB 颜色和图像）的类型，这些类型应该尽可能的简单和高效。

- `vector2.` 一个包含x和y分量的二维向量。分量应该保存在一个长度为2的数组中，这样能很好的支持 index 操作符。该类中需要加入加法、减法、点乘、叉乘、标量乘法、标量除法操作
- `vector3.` 类似二维向量的三维向量
- `hvector.`  带四个标量的其次向量（参考第八章）
- `rgb.` 包含代表RGB颜色的三个标量，同样需要包含RGB颜色的加法、减法、乘法、标量乘法、标量除法
- `transform.` 一个 4 × 4 的变换矩阵。应该包含矩阵乘法操作，以及用于位置、方向、面法向的的成员函数。具体内容将会在第七章介绍。
- `image.` 一个包含RGB像素的二维数组，包含输出操作。

> 把Point和Vector分开能提高代码的可读性，也能帮助编译器捕获一些异常。

### 1.7.2 Float vs. Double

现代架构建议中，减少内存使用，保证数据连续是保证效率的关键，即偏向于使用float。但为了考虑到精度问题时，则建议使用double进行运算。具体取决于你的程序。

> 建议在几何运算时采用double，颜色计算时使用float。对于占用大量内存的数据，比如三角面网格，强烈建议使用float，通过成员函数访问的时候再转为double。

> 建议所有的类型都是用float，有明确需要double精度的时候，再改用double。

### 1.7.3 调试图形程序 Debugging Graphics Programs

经验越丰富的编程者，使用传统调试的的频率会越少。其中一个原因是，在复杂的项目中使用传统调试器要比在简单程序中更加困难。另一个原因，最棘手的错误往往是概念性的错误，很容易花费大量时间检查变量值，而找不到问题原因。下面介绍在图形领域比较实用的几个调试策略。

#### 科学法 The Scientific Method

在图形程序中，有一种能够替代传统调试的方法通常很有效。它的缺点是，它和编程者早期被教导的不要去做的事非常相似：创建一张图片，观察图片有什么问题。然后，我们推测导致这个问题的原因，最后验证是否是这个原因。

举个例子，在光线追踪程序中，我们看到了一些暗淡的像素。这是在写光线追踪时，常常会碰到的暗疮（shadow acne）问题。我们可能会注意到暗点的颜色是环境色，所以是缺失了直射光，这时你可能假设这些不是阴影的地方被错误的标记为了阴影。为了验证这个假设，我们可以关闭所有阴影重新编译，验证假设成立。

这种方法的好处是，我们永远不需要找到错误的数据，只需要几次实验就能找出错误的范围，从而跟踪问题。

#### 调试数据输出成图片 Images as Coded Debugging Output

大多数情况下，从图形程序获取调试信息最简单的方式是输出图像。如果你想知道某些应用在每个像素上变量值，你可以复制变量输出图片。

例如，你怀疑某个着色问题是由面法向的问题导致的，你可以复制法向向量输出为图片（x是红色，y是绿色，z是蓝色），生成在实际计算中的彩色编码图。或者，如果你怀疑某个值超出了有效范围，让你的程序在发生这种情况的时候显示鲜亮的红色。

其他常用的技巧包括：为表面的背面输出明显的颜色（背面不可见的情况下）；根据ID着色图片，以得到对象的数量；或者根据工作数量着色图片，以计算工作数量。

#### 使用调试器 Using a Debugger

也有一些只能使用传统调试的情况。问题在于，图形程序常常涉及同样的代码执行多次（每个像素、每个实例、每个三角面），导致了逐步的调试这些代码基本不可能，而往往问题都在这些重复的代码中。

一种方法是设置调试条件。首先确保你的程序在单个线程中运行，所有随机数从固定的种子计算。接着找出存在问题的像素或三角面。比如你找到了像素点（126，247）有问题。
```
    if x = 126 and y = 247 then 
       your code here
```

在程序奔溃的情况下，传统调试能够精确定位奔溃的位置。你可以通过assert找出问题。这些assert应该留在程序中，防止未来潜在的问题。

#### 调试数据可视化 Data Visualization for Debugging

通常我们很难理解程序在做什么，因为在出错前，它计算了大量的中间数据。这种情况类似于科学实验计算了大量的数据，解决方案也是一样的，做好图表和插图帮助你自己理解数据的意义。

比如在光线追踪的程序中，你可能需要编写功能用来可视化光线树，让你看到哪些路径对像素产生了影响，或者在图像重采样的过程中，你可能需要用图表展示所有输入中用到的采样点。花在可视化程序的时间也会在你优化程序理解其行为时得到回报。

> 可以格式化输出 MATLAB 或 Gnuplot 脚本，通过他们绘图。

### Notes

计算机图形学相关的年度会议

- ACM SIGGRAPH
- SIGGRAPH Asia
- Graphics Interface
- the Game DevelopersConference(GDC)
- Eurographics
- Pacific Graphics
- High Perfor-mance Graphics
- the Eurographics Symposium on Rendering
- IEEE VisWeek