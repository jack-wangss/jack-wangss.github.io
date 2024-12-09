---
layout: post
title: "FOCG5: 2.数学相关 1"
subtitle: "FOCG5: 2 Miscellaneous Math 1"
background: '/img/posts/01.jpg'
---
很多图形处理操作，是把数学公式翻译成代码的工作，公式越清晰，代码越简洁。本章主要是介绍和回顾图形学中基础的数学工具。

## 2.1 集和映射 Sets and Mappings

映射（Mappings） 也叫函数（functions）,是基础的数学和编程概念。像程序中的函数一样，数学中的一个 `mapping`通过一个类型的参数映射（return）一个特定类型的对象。在编程领域我们叫类型（type），数学中我们叫 `set`。当某个对象属于一个set，使用 `∈`符号表示。 例如：

$$
a \in S
$$

两个任意的set A和B，可以通过笛卡尔积（Cartesian product）得到第三个集合 `A X B`。这个集合包含所有有序的pair（a,b）。

> set A，set B可以理解成表格的行和列。

为了方便，我们用 `A²`来表示 `A X B`。同样的，我们可以用笛卡尔乘的概念来表示多个集合的元素pair。

常见的集合包括：

- $R$：实数；
- $R^+$：包括0的正实数；
- $R^2$：实数2D平面pair集合；
- $R^n$：n维笛卡尔空间点；
- $Z$：整数；
- $S^2$：单位球面上的3D点的集合；

需要注意虽然$S^2$内嵌了3D集合（$R^3$），但仍然是通过两个变量表示的2D 集合。

映射符号使用箭头和冒号，例如：

$$
f:R\rightarrow Z
$$

表示有一个函数f，其输入集合是实数，映射结果是整数。箭头之前的集合叫 `域（domain）`，箭头后的叫 `目标集（target）`

$f(a)$叫做 `a`的 `像（image）`。集合 `A`（域的子集）的像，是包含 `A`中所有点的像的目标子集。整个域的像叫做函数的 `值域（range）`。

> $f(a)$叫做 `a`的 `image`：$a$ 是函数定义域中的一个元素，$a$ 通过 $f$ 映射后的结果就是$f(a)$，也叫做 `a`的 `image`

> 集合 `A`（域的子集）的 `image`，是包含 `A`中所有点的 `image`的目标子集：A 是函数定义域中的一个子集，A的 `image`$f(A)$包含A中每个元素$x$的 `image`$f(x)$

> `目标集（target）`也叫 `codomain`，是函数定义时指定的集合。和 `range` 是不同的，`range`是函数实际产生的所有输出值的集合

## 2.1.1 逆映射 Inverse Mapping

函数 $f:A\rightarrow B$ 可能存在一个逆函数$f^{-1}:B\rightarrow A$。即$f^{-1}(b)=a，f(a)=b$。这种情况会在ab是一对一关系时出现，这样的函数叫做 `双射(bijection)`

## 2.1.2 区间 Intervals

我们常常需要指定函数处理的数的范围，其中一个方式就是区间。

- 开放区间 open interval

  例 `(0,1)` : 表示0-1之间的数，不包含0和1
- 闭合区间 close interval

  例 `[0,1]` : 表示0-1之间的数，包含0和1

笛卡尔乘在区间中经常会被使用，例如，点 `x`在单位矩体中可表示为：$x\in[0,1]^3$

区间在结合集合操作时，常常非常有效。交集(intersection $\cap$)、并集(union $\cup$)和差集(difference $-$)。

examples：

$$
[3,5) \cap [4,6]=[4,5)
\\
[3,5) \cup [4,6]=[3,6]
\\
[3,5) - [4,6]=[3,4)
$$

## 2.1.3 对数 Logarithms

每个对数都有 `底数（base）`a，a为底数的$x$的对数写做$\log _a x$。

$$
y=\log _a x  \Leftrightarrow a^y=x
$$

常用的等式：

$$
a^{\log _a (x)}=x;
\\
\log _a (a^x)=x;
\\
\log _a (xy)=\log _a x+\log _a y;
\\
\log _a (x/y)=\log _a x-\log _a y;
\\
\log _a x=\log _a b \log _b x;
$$

当我们计算对数时，会看到一个特殊的数 `e=2.718...`。底为 `e`的对数被称为自然对数（natural logarithm），用以下缩写表示：

$$
\ln x \equiv \log _e x.
$$

$\equiv$表示定义上相等。

为什么自然对数是 `自然的`：

对数函数 $\log_a(x)$的导数

$$
\frac{d}{dx} \log _a x= \frac{1}{x\ln a} ;
$$

指数函数 $a^x$的导数

$$
\frac{d}{dx} a^x= a^x\ln a ;
$$

> $a=e$ 时，常数乘数为1。对数的导数等于$\frac{1}{x}$，指数的导数等于$e^x$

## 2.2 求解二次函数 Solving Quadratic Equations

二次函数的形式：

$$
Ax^2+Bx+C=0,
$$

由于二次函数是抛物线，所以x的值有下图中三种情况：

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 1/1.png"/>
</div>

公式：

$$
x= \frac{-B \pm \sqrt{B^2 - 4AC} }{2A} ;
$$

令$D=B^2-4AC$，我们可以通过D来判断上图的三种情况。$D>0$，x有两个实数解；$D=0$，x有一个实数解；$D<0$，x没有实数解。

## 2.3 三角学 Trigonometry

### 2.3.1 角 Angles

在单位圆中，被两个从圆心射出的向量（按一定顺序），切割出的长度叫做角。单位圆的周长为$2\pi$，所以被切割的弧长范围为$[-\pi,\pi]$，其单位为弧度（radians）。另一种表示单位是角度（Degrees），把单位圆周长表示为360°，那对应的$\pi$就是180°。

弧度和角度的转换公式如下：

$$
Degrees=\frac{180}{\pi}radians;
$$

$$
Radians=\frac{\pi}{180}degrees.
$$

### 2.3.2 三角函数 Trigonometric Functions

基于下图，我们可以得到$(a+o)^2=h^2+2ao$，从而得到三角形的斜边定理：

$$
a^2+o^2=h^2
$$

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 1/2.png"/>
</div>

我们定义$\phi$ 的正弦（sine）和余弦（cosine），以及其他基于比率的表达式:

$$
\sin \phi \equiv o/h;
\\
\csc \phi \equiv h/o;
\\
\cos \phi \equiv a/h;
\\
\sec \phi \equiv h/a;
\\
\tan \phi \equiv o/a;
\\
\cot \phi \equiv a/o;
$$

这些定义让我们可以设置一个极坐标（polar coordinates），用距离和角度表示一个点，角度$\phi \in (-\pi,\pi]$

三角函数是周期性的，可以用任意角度作为参数,例如$\sin(A)=\sin(A+2\pi)$,这也意味着函数域为R时，是不可逆的。为了避免这样的情况，现代数学库定义了域和范围:

$$
asin:[-1,1] \rightarrow [-\pi/2,\pi/2];
$$

$$
acos:[-1,1] \rightarrow [0,\pi];
$$

$$
atan:R \rightarrow [-\pi/2,\pi/2];
$$

$$
atan2:R^2 \rightarrow [-\pi,\pi];
$$

最后的$atan2(s,c)$非常有用。它的 `s`参数与 `sin A`成比例关系，参数 `c`和 `cos A`有同样的比例。返回 `A`，也可以看作是，返回2D点（s,c）在极坐标中的角度。

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 1/3.png"/>
</div>

### 2.3.3 常用的特性 Useful Identities

- 交换特性 Shifting identities

$$
\sin(-A)=-\sin A
$$

$$
\cos(-A)=\cos A
$$

$$
\tan(-A)=-\tan A
$$

$$
\sin(-A)=-\sin A
$$

$$
\cos(-A)=\cos A
$$

$$
\tan(-A)=-\tan A
$$

- Pythagorean特性 Pythagorean identities

> 勾股定理（Pythagorean theorem）的拓展

$$
\sin^2 A+ \cos^2 A=1
$$

$$
\sec^2 A- \tan^2 A=1
$$

$$
\csc^2 A- \cot^2 A=1
$$

- 加减特性 Addition and subtraction identities

$$
\sin(A+B)=\sin A \cos B+\sin B \cos A
$$

$$
\sin(A-B)=\sin A \cos B-\sin B \cos A
$$

$$
\sin(2A)=2\sin A \cos A
$$

$$
\cos(A+B)=\cos A \cos B-\sin A \sin B
$$

$$
\cos(A-B)=\cos A \cos B+\sin A \sin B
$$

$$
\cos(2A)=\cos^2 A- \sin^2 A
$$

$$
\tan(A+B)=\frac{\tan A +\tan B}{1-\tan A\tan B}
$$

$$
\tan(A-B)=\frac{\tan A -\tan B}{1+\tan A\tan B}
$$

$$
\tan(2A)=\frac{2\tan A}{1-\tan^2 A}
$$

- 半角特性 Half-angle identities

$$
\sin^2 (A/2)=(1- \cos A)/2
$$

$$
\cos^2 (A/2)=(1+ \cos A)/2
$$

- 乘积特性 Product identities

$$
\sin A \sin B=-(\cos(A+B)-\cos(A-B))/2
$$

$$
\sin A \cos B=(\sin(A+B)-\cos(A-B))/2
$$

$$
\cos A \cos B=(\cos(A+B)+\cos(A-B))/2
$$

以下公式适用于任意三角形，其边为a、b、c，对应的角度为A、B、C：

$$
\frac{\sin A}{a}=\frac{\sin B}{b}=\frac{\sin C}{c}   \  (Law\ of\ sines)
$$

$$
c^2=a^2+b^2-2ab\cos C  \ (Law\ of\ cosines)
$$

$$
\frac{a+b}{a-b}=\frac{\tan (\frac{A+B}{2})}{\tan (\frac{A-B}{2})} \ (Law\ of\ tangents)
$$

三角形的面积同样可以通过边长计算得出：

$$
\text{Triangle area}=\frac{1}{4}\sqrt{(a+b+c)(-a+b+c)(a-b+c)(a+b-c)}
$$

### 2.3.4 立体角和球面三角 Solid Angles and Spherical Trigonometry

传统三角学处理平面上的三角形，但三角形也可以被定义在非平面的表面。例如把三角形定义在单位球上，三角形的边是球面上的弧线，这种叫做球面三角。球面三角在图形应用中不多见，但也很重要。

图形学中另外一种重要的三角叫做立体角。角度让我们可以量化视线中两点之间的分离程度，立体角则告诉我们物体在我们视野中的占据了多少部分。角度是单位圆内的弧长，单位是弧度（radians），最大值为$2\pi$（单位圆周长）；立体角是单位球内的区域面积，单位是球面度（steradian）最大值为$4\pi$（单位球面积）。

## 2.4 向量 Vectors

向量是描述长度和方向的量，可以用一个箭头来表示。如果两个向量有同样的长度和方向，则两个向量相等（即使他们在不同的位置）。一个向量$a$的长度为$||a||$，单位向量是长度为1的向量，零向量（zero vector）是长度为0的向量，0向量的方向无定义。

向量可以表示很多内容。例如，可以用向量来表示偏移（offset），也叫做位移（displacement）。向量也可以用来保存位置（location）。

### 2.4.1 向量运算 Vector Operations

向量加法遵循平行四边形法则（parallelogram rule），即两个向量之和为两个向量首尾相连后的结果，向量加法遵循交换律（commutative）：

$$
a+b=b+a
$$

向量也可以进行乘法运算。向量有几种不同的乘法运算，我们先介绍缩放的计算，向量乘以一个实数可以缩放一个向量，缩放改变向量的长度，而不会改变方向。后面我们还会讨论向量的点乘（dot product）和叉乘（cross product）运算。

### 2.4.2 向量的笛卡尔坐标 Cartesian Coordinates of Vector

2D向量可以写成任意两个非零且不平行的向量的组合。这两个向量线性独立（linear independence）。两个线性独立的向量来自2D基（basis），因此称为基向量（basis vectors）。例如向量$c$可以表示为两个a、b两个基向量的组合：
>两个向量线性独立，意味着这两个向量不平行

$$
c=a_ca+b_cb
$$

注意这里的权重$a_c$ 和$b_c$ 是唯一的。在两个基向量垂直的时候非常有用，尤其当他们都是单位向量的时候。我们假设这两个基向量分别是x、y，我们可以用这两个向量表示笛卡尔坐标中所有的点。

$$
a=x_a X+y_b Y
$$

我们可以方便的计算a的长度：

$$
||a||=\sqrt{x_a^2+y_a^2}
$$

为了方便计算，可以把a写成矩阵形式：

$$
a=
\begin{bmatrix} 
x_a \\
y_a
\end{bmatrix}
$$

为了排版方便，我们也会写成行矩阵的形式：

$$
a^T=
\begin{bmatrix} 
x_a & y_a
\end{bmatrix}
$$

### 2.4.3 点乘 Dot Product

向量a和b的点乘写做$a \cdot b$，由于点乘的结果是标量，点乘(`dot product`)也被称作`scalar product`。点乘的结果和他们的长度与角度相关：

$$
a \cdot b=||a|| \ ||b|| \cos \phi
$$

点乘在图形程序中，常常用来计算两个向量的cos角度。
点乘也可以用来计算一个向量在另一个向量上的投影长度，向量a在b上的投影$a \rightarrow b$：

$$
a \rightarrow b=||a|| \cos \phi = \frac{a \cdot b}{||b||}
$$

点乘遵循交换律和结合律：

$$
a \cdot b=b \cdot a
$$

$$
a\cdot(b+c)=a \cdot b+ a \cdot c
$$

$$
(ka) \cdot b=a \cdot(kv)=ka \cdot b
$$

如果2D向量a、b在笛卡尔坐标系中，我们可以利用$x \cdot x =y \cdot y =1$和$x \cdot y=0$推出下面的公式：

$$
\begin{align} 
a\cdot b &=(x_ax+y_ay) \cdot (x_bx+y_by) \\
&=x_ax_b(x\cdot x)+x_ay_b(x\cdot y)+x_by_a(y\cdot x)+y_ay_b(y\cdot y)\\
&=x_ax_b+y_ay_b
\end{align}
$$

3D向量同理：

$$
a\cdot b=x_ax_b+y_ay_b+z_az_b
$$

### 2.4.4 叉乘 Cross Product

向量a和b的叉乘写做$a\times b$，叉乘通常用在3D向量。叉乘的结果是与a、b垂直的3D向量，向量长度与a、b的角度相关:

$$
||a \times b||=||a||\ ||b|| \sin\phi
$$

角度为90度时，叉乘结果的向量长度为a、b所形成平行四边形的面积。

$x\times y$的结果可能是z，也可能是-z。惯例一般采用z的定义则：

$$
z=x\times y
$$

其他笛卡尔坐标系中的组合如下：

$$
x\times y = +z
\\
y\times x = -z
\\
y\times z = +x
\\
z\times y = -x
\\
z\times x = +y
\\
x\times z = -y
$$

由于$\sin\phi$的存在，向量叉乘其自身为0。以上的描述，不足以在笛卡尔坐标系创建无歧义的坐标系。想象如果我们构建一个坐标系，x朝向东方，y朝向北方，z与它们保持垂直。那么z有上下两种可能，通常我们会采用朝上的定义，也叫做“右手坐标系”。

叉乘遵循以下定律：

$$
a\times(b+c)=a \times b+ a \times c
$$

$$
a \times(kb)=k(a \times b)
$$

$$
a \times b=-(b \times a)
$$

在笛卡尔坐标系中，我们可以用显式的拓展计算叉乘：

$$
a \times b=(y_az_b-z_ay_b,z_ax_b-x_az_b,x_ay_b-y_ax_b).
$$

### 2.4.5 正交基和坐标系 Orthonormal Base and Coordinate Frames

管理坐标系是大多数图形程序的核心工作之一，其中的关键就是管理正交基（Orthonormal Base）。2D向量u、v可以组成一个正交基，u、v垂直，且长度为1。因此：

$$
||u||=||v||=1,
$$

$$
u\cdot v=0.
$$

3D中，由u、v、w三个向量组成：

$$
||u||=||v||=||w||=1,
$$

$$
u\cdot v=v\cdot w=w\cdot u=0.
$$

右手坐标系的正交坐标系如下：

$$
w=u\times v
$$

笛卡尔标准正交基只是无数正交基中的一个，使它有意义的是在程序中，它所包含的隐式的原点位置。所以它的x、y、z向量和原点o的位置不需要显式保存。全局模型通常存储在标准坐标系统中，因此它通常被称为全局坐标系。但要是我们想使用另一个坐标系统，我们就需要保存这些信息，这个额外的系统叫做参照系（frame of reference）或坐标系（coordinate frame）。

例如在一个飞行场景中，以飞机头的位置为原点创建了一个参照系，同时飞机也在标准坐标系统中。这种基于特定对象的坐标系叫做局部坐标系（local coordinate system）。

局部坐标系会存在标准坐标系中，比如u的坐标:
$(x_u+y_u+z_u)$

$$

U=x_uX+y_uY+z_uZ
$$

如果已知一个局部坐标系的坐标a，可以通过局部坐标系在标准坐标系中的位置，求出其在标准坐标系中的位置:

$$
a=u_aU+v_aV+w_aW
$$

>局部坐标系的UVW向量本身也是世界坐标系的向量，因此可以直接转换，此时的转换是坐标系的转换，实际坐标要加上局部坐标系的原点p

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 1/4.png"/>
</div>

如果已知标准坐标系中的向量b，可以通过点乘的方式得到局部坐标系的值：

$$
u_b=u\cdot b;
\\
v_b=v\cdot b;
\\
w_b=w\cdot b.
$$

推理如下：

$$
u_bU+v_bV+w_bW=b
$$

$$
u\cdot b=u_b(u\cdot u)+v_b(u\cdot v)+w_b(u\cdot w)=u_b.
$$

>$u\cdot u$ 等于1，另外两个都是0

### 2.4.6 从一个向量构造基 Constructing a Basis from a Single Vector

我们常常需要构造一个基与某个向量对齐，例如已知向量a，需要和基的w对齐，首先可以计算w：

$$
w=\frac{a}{||a||}
$$

选择任意不和w重合的向量t，计算u：

$$
u=\frac{t\times w}{||t\times w||}
$$

找t的时候为了保证不和w重合，可以把w最小的分量改成1。例如$w=(1/\sqrt{2},-1/\sqrt{2},0)$,则$t=(1/\sqrt{2},-1/\sqrt{2},1)$。

最后，根据w、u求得v：

$$
v=w\times u.
$$

使用此构造的一个示例是表面着色，其中需要与表面法线对齐的基。
对于生产代码，最近皮克斯的研究人员开发了一个从两个向量构造向量的相当出色的方法，其紧凑性和效率令人印象深刻（Duff et al., 2017）。 他们提供经过实战测试的代码，并鼓励读者使用它，因为在行业中使用它时没有“坑”。

### 2.4.7 从两个向量构造基 Constructing a Basis from Two Vectors

已知两个向量构造基是比较简单的，主要是要确保最后的结果是正交的，下面是一种推荐的做法：

$$
w=\frac{a}{||a||},
$$

$$
u=\frac{b\times w}{||b\times w||},
$$

$$
v=w\times u.
$$

### 2.4.8 标准化一个基 Squaring Up a Basis

有时候你会遇到一个基非正交的情况，可能是计算或保存时的精度问题导致。可以采用上面的方式重新构造基。

这种方法适用于许多应用程序，但不是最好的。它确实产生了准确的正交向量，并且对于几乎正交的起始基，结果不会偏离起点太远。 然而，它是不对称的：它“偏向” w 胜过 v ， v 胜过 u。
它选择一个接近起始基的基，但不能保证选择
最接近的标准正交基。 这种方式不能满足需求时，SVD（第 6.4.1 节）可用于计算保证最接近原始基的正交基。

## 2.5 积分 Integration

关于图形，一个可能误导的想法是因为它充满了积分（integrals），所以我们必须擅长通过代数解决积分问题。但实际上，即使你从未使用代数方式处理过积分问题，也能做好大多数的图形工作。

虽然我们不需要能够以代数方式处理积分，但还是需要能够读积分，以便用数字方式去处理。一维积分通常非常易读，比如：

$$
\int_{\pi}^{2\pi}\sin (x)dx
$$

可以读作“计算函数$\sin(x)$在$x=\pi$和$x=2\pi$之间的面积”

计算机工作者可能会这样理解这部分：

$$
\int_{\pi}^{2\pi}dx
$$

把它当成一个函数调用，我们可以叫做“integrate()”，它包含了两个对象：一个函数和一个域(区间)：

```c++
float area = integrate(sin(),[pi,2pi]);
```

在更高级的积分计算中，我们可能开始在球面上取积分，对图形来说，我们同样可以借鉴这样的思路：

```c++
float area = integrate(cos(),unit-sphere);
```

函数中的处理可能是不同的，但所有的积分都包含了两个对象：

1. 积分函数
2. 积分域

### 2.5.1 平均值和加权平均值 Averages and weighted averages

积分用于计算事物的总量。长度、面积、体积等等。但它们经常被用来计算平均值。例如，我们可以通过对一个区域（如一个国家）的高程进行积分，来计算该区域的总体积。

```c++
float volume = integrate(elevation(),country);
```

也可以计算平均高程：

```c++
float averageElevation = integrate(elevation(),country)/integrate(1,country);
```

上面的计算就是简单的用体积除以面积，也可以写成：

```c++
float averageElevation = average(elevation,country);
```

我们也可以引入加权平均值。在这个例子中，我们添加一个加权函数，强调平均值中的某些点。比如根据温度强调某些地区：

```c++
float weightedAverageElevation = integrate(temperature()*elevation(),
country) /integrate(temperature(),country)；
```

### 2.5.2 立体角积分 Integrals over solid angle

下面是我们常见的一种积分类型的例子：

```c++
float shader = integrate(cos()*f*(),unit-hemisphere)；
```

>表示在一个单位半球面上对指定的函数进行积分,这里的 cos() 函数通常指的是光线方向向量 v 与表面法线向量 n 之间的夹角的余弦值，即 v⋅n（向量点积）。

>将两个函数相乘，实际上是在计算每个方向上的光线对最终颜色的贡献。这个乘积反映了光线在特定方向上的强度（由 cos() 决定）以及该方向上的材料反射特性（由 f() 决定）

因为 `integrate(cos(),unit-hemisphere)=pi`，加全平均值的写法如下：

```c++
float shader = integrate((1/pi)cos()*f*(),unit-hemisphere)；
```

传统的积分写法如下：

$$
S=\int_{v\in H}\frac{1}{\pi}(v\cdot n)f(v)(v\cdot n)d\sigma(v)
$$

>H 表示单位半球面。
v 是单位半球面上的一个方向向量。
n 是表面的法线向量。
f(v) 是BRDF函数。
dσ(v) 是单位半球面上的微小面积元。

或者用球坐标，我们可以用代数来求解这样的积分：

$$
S=\int_{\phi =0}^{2\pi}\int_{\theta =0}^{\pi}\frac{1}{\pi}(v\cdot n)f(\theta,\phi)\cos \theta \sin \theta d \theta d \phi)
$$

上面的余弦项是一个面积修正因子，用于球坐标系。

在图形学中，我们很少需要把这些都写出来，代数求解这些积分时，一般都会用不带显式坐标的简单形式。

上面的积分的是漫反射表面的着色，也是所有入射颜色的加权平均值。这种结构可以很直观；表面的颜色通常与入射颜色的加权平均值有关。

上面是实心角的积分几乎都是相同的，但使用范围很广。关键是要认识到这只是符号，并将你看到的符号映射到你最熟悉的符号。这个过程就像是在阅读伪代码。

## 2.6 密度函数 Density Functions

密度函数是返回密度的函数。密度是一个单位里物质的数量，专业的表达叫做强度量（intensive quantity）。比如你的体重不是密度，它是一个广延量（extensive quantity），是一个事物的总量，不表示事物在一个单位上的数量。比如一个人在一年里增长的体重是一个广延量，这个人每小时或每天增长的体重是一个强度量。

举个例子，在某一天太阳能板产生的能量是120。这些能量足够我们电脑去工作吗？要计算这个问题，我们需要把能量转化成能量率。我们可以把一天的能量划分成更短的时间，比如一个小时，我们可以看到一天中每小时能量的变化。

当我们把这个时间不断细化，我们就可以从中得到更多的信息。但随着划分后能量越来越小，我们什么也看不到，所以我们可以基于box的宽度缩放他们的长度。随着过程的继续，最终我们会得到一条平滑的曲线。

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 1/5.png"/>
</div>

这个曲线就是密度函数的一个例子，可以叫它能量密度函数。由于这个特殊的密度常常被用到，所以它有自己的名字：“power”，我们也不会说是“焦耳每小时”，而是“Watts”。需要注意，为了方便，“Watts”一般是焦耳每秒钟，而不是每小时。

总结一下：

1. 密度总是一种比例，比如“每X有多少Y”。
2. 密度函数是一个返回密度函数。

密度函数可以用来比较两个不同点的相对密度。比如，我们的密度函数随时间定义，我们可以说，“下午2点的能量是上午9点的两倍。但另一种方式是，我们可以直接用它计算一段域内总量。比如，计算下午两点到四点的能量：

$$
E=\int_{2pm}^{4pm}P(t)dt
$$

许多积分都是这种“积分密度函数”的形式，但这一点往往没有明确指出。有时，如果你能区分积分是否在处理某个区间或区域内的密度函数的“量”，会使问题变得更加清晰。