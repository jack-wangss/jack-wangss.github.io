---
layout: post
title: "FOCG5: 6.线性代数"
subtitle: "FOCG5: 6 Linear Algebra"
background: '/img/posts/01.jpg'
---

图形程序中最常用的工具可能就是用来变换点或向量的矩阵。下一章，我们会介绍如何用矩阵表示一个向量，并且通过乘以矩阵在不同坐标基中表示。也会介绍如何乘以矩阵，以完成向量的旋转、缩放、移动。本章，我们先从几何的视角复习一下基本的线性代数。

## 6.1 行列式 Determinants

我们通常认为行列式产生于线性方程的解中。但对我们而言，可以认为行列式是另一种乘以向量的方式。对于2D向量a和b，他们的行列式$|ab|$等于ab组成的平行四边形的面积（图6.1）。该面积是带符号的，如果是右手坐标则为正，左手坐标则为负数。也就是$|ab|=-|ba|$。2D中的右手坐标等同于第一个向量逆时针旋转到第二个向量。3D中的行列式需要3个向量。对于3D向量a、b、c的行列式$|abc|$是一个平行六面体（图6.2）。

<div style="text-align: center">
<img src="/img/posts/6 Linear Algebra/1.png"/>
</div>

<div style="text-align: center">
<img src="/img/posts/6 Linear Algebra/2.png"/>
</div>

我们注意到缩放平行四边形的一侧会将其面积缩放相同的比例（图6.3）：

$$|(ka)b|=|a(kb)|=k|ab|$$

<div style="text-align: center">
<img src="/img/posts/6 Linear Algebra/3.png"/>
</div>

同时我们发现切变的平行四边形面积不会改变（图6.4）：

$$|(a+kb)b|=|a(b+ka)|=|ab|$$


<div style="text-align: center">
<img src="/img/posts/6 Linear Algebra/4.png"/>
</div>

最终，可以得到行列式的以下特性（图6.5）：

$$a(b+c) = |ab|+|ac|$$

<div style="text-align: center">
<img src="/img/posts/6 Linear Algebra/5.png"/>
</div>

现在让我们假设用笛卡尔坐标表示ab：

$$ 
\begin{align} 
|ab| &= |(x_a x +y_a y)(x_bx+y_by)| \\
&= x_a x_b|xx|+x_ay_b|xy|+y_ax_b|yx|+y_ay_b|yy| \\
&= x_ax_b(0)+x_ay_b(+1)+y_ax_b(-1)+y_ay_b(0) \\
&= x_ay_b - y_ax_b. 
\end{align} 
$$

上面的简化利用$|vv|=0$的特性，因为如果平行四边形的边都平行于任意向量v，那么它的面积也是0。

3D也可以做类似的简化：

$$ 
\begin{align} 
|abc| &= |(x_a x +y_a y+z_az)(x_bx+y_by+z_bz)+(x_cx+y_cy+z_cz)| \\
&= x_ay_bz_c - x_a z_b y_c- y_ax_b z_c+y_az_bx_c+z_ax_by_c-z_ay_bx_c. 
\end{align} 
$$

如你所见，行列式在维度增加时，计算的公式变得越来越复杂（丑），我们会在6.3部分讨论更不容易出错的方式。

另一个存在行列式的场景，是在我们希望将两个向量合并成一个的时候。例如我们想要用向量c表示向量a和b的结合：

$$c=a_ca+b_cb.$$

从图6.6，我们看到：

$$|(b_cb)a|=|ca|$$

因为它们之间是切变的关系。$b_c$的求解：

$$b_c=\frac{ca}{ba}$$

类似参数的求解：

$$a_c=\frac{bc}{ba}$$

<div style="text-align: center">
<img src="/img/posts/6 Linear Algebra/6.png"/>
</div>

上面就是2D的克莱姆法则（Cramer's rule）。

## 6.2 矩阵

矩阵是一组遵循固定算法的数字元素。一个2行3列的矩阵例子是：

$$
\begin{bmatrix}
 1.7 & -1.2 & 4.2\\
 3.0 & 4.5 & 7.2\\
\end{bmatrix}.
$$

矩阵在计算机图形学中被广泛使用，包括用来表示空间中的变换。针对我们讨论的内容，所有矩阵中的元素都是实数。

### 6.2.1 矩阵运算

一个矩阵乘以一个常量等于这个矩阵内的每个元素都乘以这个常量。

$$
2
\begin{bmatrix}
 1 & -4 \\
 3 & 2 \\
\end{bmatrix}=\begin{bmatrix}
 2 & -8 \\
 6 & 4 \\
\end{bmatrix}.
$$

矩阵相加就是逐个元素相加：

$$
\begin{bmatrix}
 1 & -4 \\
 3 & 2 \\
\end{bmatrix}
+
\begin{bmatrix}
 2 & 2 \\
 3 & 2 \\
\end{bmatrix}

=\begin{bmatrix}
 3 & -2 \\
 5 & 4 \\
\end{bmatrix}.
$$

矩阵相乘，我们用第一个矩阵的行乘以第二个矩阵的列：

<div style="text-align: center">
<img src="/img/posts/6 Linear Algebra/7.png"/>
</div>

因此，要想两个矩阵相乘，需要满足左边矩阵的列数等于右边矩阵的行数。并且如果$AB=AC$，不能确定$B=C$。

矩阵乘法不满足交换律，但是满足结合律和分配律。

### 6.2.2 矩阵操作

实数$x$的逆是$1/x$，逆乘以$x$等于1。我们需要一个矩阵$I$，等于实数“1”的作用，这样的矩阵叫做单位矩阵（identity matrix），单位矩阵只能是方阵。例如一个4*4的单位矩阵：

$$
I=
\begin{bmatrix}
 1 & 0 & 0 & 0 \\
 0 & 1 & 0 & 0 \\
 0 & 0 & 1 & 0 \\
 0 & 0 & 0 & 1 \\
\end{bmatrix}.
$$

矩阵$A$的逆矩阵$A^{-1}$，需要保证$AA^{-1}=I$，例如：

$$
\begin{bmatrix}
 1 & 2 \\
 3 & 4 \\
\end{bmatrix}^{-1}
=
\begin{bmatrix}
 -2.0 & 1.0 \\
 1.5  & -0.5 \\
\end{bmatrix}
\ because
\ 
\begin{bmatrix}
 1 & 2 \\
 3 & 4 \\
\end{bmatrix}
\begin{bmatrix}
 -2.0 & 1.0 \\
 1.5  & -0.5 \\
\end{bmatrix}
=
\begin{bmatrix}
 1 & 0 \\
 0 & 1 \\
\end{bmatrix}
$$

两个矩阵乘积的逆等于它们逆的乘积，但顺序不同：
$$
(AB)^{-1}=B^{-1}A^{-1}.
$$

矩阵A的转置矩阵$A^T$，值是相同的，但行列进行了转换：

$$
\begin{bmatrix}
 1 & 2 \\
 3 & 4 \\
 5 & 6 \\
\end{bmatrix}^{T}
=
\begin{bmatrix}
 1 & 3 & 5 \\
 2 & 4 & 6 \\
\end{bmatrix}
$$

转置矩阵的乘和逆的规则类似：
$$
(AB)^{T}=B^{T}A^{T}.
$$

方阵的行列式就是矩阵列的行列式，可以当成是一组向量。行列式在矩阵运算中有很多不错的性质，例如：

$$
|AB|=|A||B|,\\
|A^{-1}|=\frac{1}{|A|}, \\
|A^T|=|A|.
$$

### 6.2.3  矩阵形式的向量操作

在图形学中，我们用方阵处理矩阵形式的向量的变换。例如，将向量a旋转90°，可以用2x2的矩阵和2x1的矩阵（列向量）相乘：

$$
\begin{bmatrix}
 0 & -1 \\
 1  & 0 \\
\end{bmatrix}
\begin{bmatrix}
 x_a \\
 y_a \\
\end{bmatrix}
=
\begin{bmatrix}
 -y_a \\
 x_a \\
\end{bmatrix}
$$

通过转置矩阵和交换顺序可以得到同样的行向量结果：

$$
\begin{bmatrix}
 x_a &
 y_a \\
\end{bmatrix}
\begin{bmatrix}
 0&1 \\
 -1&0 \\
\end{bmatrix}
=
\begin{bmatrix}
 -y_a & x_a 
\end{bmatrix}
$$

我们也可以使用矩阵形式对向量的运算进行编码。如果我们将点乘的结果视为 1 × 1 矩阵，它可以写成：

$$a\cdot b = a^T b$$

以3D向量为例；
$$
\begin{bmatrix}
 x_a &
 y_a &
 z_a
\end{bmatrix}
\begin{bmatrix}
 x_b \\
 y_b \\
 z_b \\
\end{bmatrix}
=
\begin{bmatrix}
 x_a x_b + y_a y_b+ z_a z_b 
\end{bmatrix}
$$

相关向量积是两个向量之间的外积，可以表示为左边为列向量，右边为行向量的矩阵相乘：$ab^T$。 结果是一个矩阵，由 a 的条目与 b 的条目的所有对的乘积组成。对于3D向量：

$$
\begin{bmatrix}
 x_a \\
 y_a \\
 z_a \\
\end{bmatrix}
\begin{bmatrix}
 x_b &
 y_b &
 z_b
\end{bmatrix}

=
\begin{bmatrix}
 x_a x_b & x_a y_b& x_a z_b \\
 y_a x_b & y_a y_b& y_a z_b \\
 z_a x_b & z_a y_b& z_a z_b \\
\end{bmatrix}
$$

以向量的运算去考虑矩阵相乘，常常很有作用。例如一个3x3的矩阵，我们可以把它的列或者行当作一个向量，把矩阵看作三个向量。例如一个矩阵乘以向量$y=Ax$，可以理解为A的每一行和x做点乘：

$$
\begin{bmatrix}
 | \\
 y \\
 | \\
\end{bmatrix}
\begin{bmatrix}
 - & r_1&- \\
 - & r_2&- \\
 - & r_3&- \\
\end{bmatrix}
=
\begin{bmatrix}
 | \\
 x \\
 | \\
\end{bmatrix};
\\
y_i=r_i \cdot x.

$$
相反，我们也可以把矩阵中的列看作是一个向量，把结果看成是三列向量经x加权后的总和。
$$
\begin{bmatrix}
 | \\
 y \\
 | \\
\end{bmatrix}
\begin{bmatrix}
 |& |&| \\
 c_1 & c_2& c_3 \\
 |& |&| \\
\end{bmatrix}
=
\begin{bmatrix}
 x_1 \\
 x_2 \\
 x_3 \\
\end{bmatrix};
\\
y=x_1 c_1 + x_2c_2+ x_3c_3.

$$

基于这样的思想，可以把AB矩阵相乘的结果看作是所有A的行和B的列的点乘的数组；作为矩阵B所有列与矩阵A乘积的集合，从左向右排列；作为矩阵A所有行乘以矩阵B的集合，从上往下排列；或作为 A 的所有列与 B 的所有行的成对外积的总和。

### 6.2.4 特殊类型的矩阵

单位矩阵是一种对角矩阵（diagonal matrix），所有非0元素都在对角线上。

单位矩阵的另一个特征是它的转置等于自身，这样的矩阵也叫做对称矩阵（symmetric）。

单位矩阵同样也是正交矩阵，因为它的行列向量的长度都是1，且和其他行列向量正交。正交矩阵的行列式等于+1或-1。

正交矩阵有个实用的特性，它们几乎是自己的逆，正交矩阵乘以他的转置等于单位矩阵：

$$R^TR=I=RR^T \ for \ orthogonal \ R$$

这很容易理解，因为$R^TR$的结果就是R的列之间点乘。非对角线上都是正交向量的点乘（等于0），对角线上都是乘以自身（等于1）。

矩阵

$$
\begin{bmatrix}
 8 & 0 & 0 \\
 0 & 2 & 0\\
 0 & 0 & 9\\
\end{bmatrix}
$$

是一个对角矩阵，也是一个对称矩阵，但不是正交矩阵（列正交，但向量长度不是0）。

矩阵

$$
\begin{bmatrix}
 1 & 1 & 2 \\
 1 & 9 & 7\\
 2 & 7 & 1\\
\end{bmatrix}
$$

是对称矩阵，但不是对角和正交。

矩阵

$$
\begin{bmatrix}
 0 & 1 & 0 \\
 0 & 0 & 1\\
 1 & 0 & 0\\
\end{bmatrix}
$$

是正交矩阵，但不是对角和对称。


## 6.3 计算矩阵和行列式

回顾6.1的内容，行列式是n个n维度向量组合成一个有符号的n维的体积。例如，在行列式2D中，就是向量组成的平行四边形的面积。我们可以使用矩阵处理行列式的计算机制。

假设我们有两个坐标(a,b)和(A,B)（图6.7）。行列式可以写作：

$$
\begin{vmatrix}
\begin{bmatrix}
 a  \\
 b  \\
\end{bmatrix}
\begin{bmatrix}
 A \\
 B  \\
\end{bmatrix}
\end{vmatrix}

\equiv

\begin{vmatrix}
 a & A \\
 b & B \\

\end{vmatrix}

= aB-Ab \tag{6.8}
$$

注意，矩阵的行列式和矩阵转置的行列式是一样的（图6.8）。
$$
\begin{vmatrix}
 a & A \\
 b & B \\
\end{vmatrix}
=
\begin{vmatrix}
 a & b \\
 A & B \\
\end{vmatrix}
= aB-Ab \tag{6.8}
$$

<div style="text-align: center">
<img src="/img/posts/6 Linear Algebra/8.png"/>
</div>

<div style="text-align: center">
<img src="/img/posts/6 Linear Algebra/9.png"/>
</div>

3D行列式的几何意义对理解特定公式的意义是有帮助的。例如，通过点集$(x_i,y_i,z_i)$的平面等式如下（$i=0,1,2$）：

$$
\begin{vmatrix}
 x-x_0 & x-x_1 &x-x_2 \\
 y-y_0 & y-y_1 &y-y_2 \\
 z-z_0 & z-z_1 &z-z_2 \\
\end{vmatrix}
=0
$$

矩阵的每列都是一个从点$(x_i,y_i,z_i)$到点$(x,y,z)$的向量。以这些边形成的平行六面体的体积，只有在$(x,y,z)$和其他三个点共面的时候等于0。几乎所有包含行列式的等式都有类似简单的几何逻辑。

像我们前面看到的，我们可以通过蛮力扩展来计算行列式，其中大多数项为零，并且有大量关于加号和减号的簿记。常规的管理计算行列式的代数方式是使用`Laplace's expansion`。这种计算的关键首先是找到不同矩阵元素的`cofactor`。

每个方阵的元素都有一个`cofactor`，也就是少了一行一列的矩阵的行列式，结果
可能需要再乘-1。例如，$10\times 10$的矩阵，$a_{82}$的`cofactor`就是$9\times 9$矩阵的行列式（少了第8行和第2列），如果行号和列号的和是双数则为正，反之`cofactor`为负。通过下面的图更容易记忆：

$$
\begin{bmatrix}
 + & -&+& -&\cdots \\
 - & +&-& +&\cdots \\
 + & -&+& -&\cdots \\
 - & +&-& +&\cdots \\
 \vdots & \vdots&\vdots& \vdots&\ddots \\
\end{bmatrix}.
$$

因此，对一个$4\times 4$矩阵，

$$
\begin{bmatrix}
 a_{11} & a_{12}&a_{13}& a_{14} \\
 a_{21} & a_{22}&a_{23}& a_{24} \\
 a_{31} & a_{32}&a_{33}& a_{34} \\
 a_{41} & a_{42}&a_{43}& a_{44} \\
\end{bmatrix}.
$$

第一行，第一列的`cofactor`为

$$
a_{11}^c=
\begin{bmatrix}
 a_{22}&a_{23}& a_{24} \\
 a_{32}&a_{33}& a_{34} \\
 a_{42}&a_{43}& a_{44} \\
\end{bmatrix}.
$$

矩阵的行列式等于任意一行或一列，每个元素和自身`cofactor`的乘积后的和。

以上面的矩阵为例：

$$
|A|=a_{12}a_{12}^c+a_{22}a_{22}^c+a_{32}a_{32}^c+a_{42}a_{42}^c
$$

任意一行或者一列，其结果都是相等的。

下面是一个完整的例子，通过`cofactor`计算$3\times3$矩阵行列式的例子：

$$
\begin{align}
\begin{vmatrix}
 0 & 1 & 2\\
 3 & 4 & 5\\
 6 & 7 & 8\\
\end{vmatrix}
&= 
0
\begin{vmatrix}
 4 & 5 \\
 7 & 8 \\
\end{vmatrix}
-
1
\begin{vmatrix}
 3 & 5 \\
 6 & 8 \\
\end{vmatrix}
+
2
\begin{vmatrix}
 3 & 4 \\
 6 & 7 \\
\end{vmatrix}\\
&=0(32-35)-1(24-30)+2(21-24)\\
&=0.
\end{align}
$$

我们可以推出由列（或行）向量构成的平行六面体的体积为0，也可以说列（或行）是非线性独立的。注意第一行和第三行的和等于第二行的两倍，这说明是线性相关的。

### 6.3.1 逆计算

行列式给我们提供了一个计算矩阵逆的公式，这个方式在大的矩阵中非常低效，但在图形学中的矩阵一般都不大。开发这个方法的关键是具有两个相同行的矩阵的行列式为零。这很容易理解，因为一个n维度的平行体，如果它的两条边是一样的，那它的体积就是0。假设我们有一个$4\times4$的矩阵A
，想要找到它的逆 $A^{-1}$：

$$
A^{-1} = \frac{1}{|A|}
\begin{bmatrix}
 a_{11} & a_{21}&a_{31}& a_{41} \\
 a_{12} & a_{22}&a_{32}& a_{42} \\
 a_{13} & a_{23}&a_{33}& a_{43} \\
 a_{14} & a_{24}&a_{34}& a_{44} \\
\end{bmatrix}.
$$

注意这只是矩阵的转置，其中 A 的元素被替换为它们各自的`cofactor`乘以（1 或 −1）。 这个矩阵称为 A 的伴随(`adjoint`)矩阵。伴随矩阵就是A的`cofactor`矩阵的转置。我们看一下为什么它是矩阵的逆，首先$AA^{-1}$是单位矩阵，如果我们用伴随矩阵的第一列乘以A的第一行，得到需要的|A|:

$$
\begin{bmatrix}
 a_{11} & a_{12}&a_{13}& a_{14} \\
 . &.&.& .\\
 . &.&.& .\\
 . &.&.& .\\
\end{bmatrix}

\begin{bmatrix}
 a_{11}^c & .&.&. \\
 a_{12}^c & .&.&. \\
 a_{13}^c & .&.&. \\
 a_{14}^c & .&.&. \\
\end{bmatrix}
=
\begin{bmatrix}
 |A| & .&.&. \\
 . &.&.& .\\
 . &.&.& .\\
 . &.&.& .\\
\end{bmatrix}
$$

其他的结果也是成立的，其中0也是类似的原理:

$$
\begin{bmatrix}
 . &.&.& .\\
 a_{21} & a_{22}&a_{23}& a_{24} \\
 . &.&.& .\\
 . &.&.& .\\
\end{bmatrix}

\begin{bmatrix}
 a_{11}^c & .&.&. \\
 a_{12}^c & .&.&. \\
 a_{13}^c & .&.&. \\
 a_{14}^c & .&.&. \\
\end{bmatrix}
=
\begin{bmatrix}
 . & .&.&. \\
 0 &.&.& .\\
 . &.&.& .\\
 . &.&.& .\\
\end{bmatrix}
$$

注意这时乘的是同一个矩阵的行列式：
$$
a_{21}a_{11}^c+a_{22}a_{12}^c+a_{23}a_{13}^c+a_{24}a_{14}^c
$$

实际矩阵为：
$$
\begin{bmatrix}
 a_{21} & a_{22}&a_{23}& a_{24} \\
 a_{21} & a_{22}&a_{23}& a_{24} \\
 a_{31} & a_{32}&a_{33}& a_{34} \\
 a_{41} & a_{42}&a_{43}& a_{44} \\
\end{bmatrix}.
$$

由于前面两行是一样的，所以它的行列式就等于0。

### 6.3.2 线性系统

在图形学中常常会遇到线性系统，类似“n个公式带n个未知量”，n常常是2或者3。例如：

$$
3x+7y+2z=4,\\
2x-4y-3z=-1,\\
5x+2y+z=1.
$$

这里的x、y、z是我们需要求解的未知量。可以写作下面的形式：

$$
\begin{bmatrix}
3&7&2 \\
2&-4&-3 \\
5&2&1 \\
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
z \\
\end{bmatrix}
=\begin{bmatrix}
4 \\
-1 \\
1\\
\end{bmatrix}
$$

$Ax=b$这种形式的一个缺陷就是假定了A是一个方阵。

这类系统的求解有很多方式，主要看A的维度，由于在图形学中常用的维度不超过4，所以我们介绍一个适用于这类情况的方法，叫做Cramer's rule，前面在介绍视点的时候已经看到过了。这里我们看一下求解。

$$
x=
\frac
{
\begin{vmatrix}
4&7&2 \\
-1&-4&-3 \\
1&2&1 \\
\end{vmatrix}
}
{
\begin{vmatrix}
3&7&2 \\
2&-4&-3 \\
5&2&1 \\
\end{vmatrix}
};
\ 
y=
\frac
{
\begin{vmatrix}
3&4&2 \\
2&-1&-3 \\
5&1&1 \\
\end{vmatrix}
}
{
\begin{vmatrix}
3&7&2 \\
2&-4&-3 \\
5&2&1 \\
\end{vmatrix}
};
\ z=
\frac
{
\begin{vmatrix}
3&7&4 \\
2&-4&-1 \\
5&2&1 \\
\end{vmatrix}
}
{
\begin{vmatrix}
3&7&2 \\
2&-4&-3 \\
5&2&1 \\
\end{vmatrix}
};
$$

这里的规则是计算行列式的比，分母是$|A|$，分子是矩阵A的一列被向量b替换后的矩阵的行列式。替换的列对应未知量的位置。注意如果$|A|=0$，则无解。

## 6.4 特征值和矩阵对角化

方阵具有关联的特征值（eigenvalues）和特征向量（eigenvectors）。特征向量指的乘以矩阵后，方向不会改变的非0向量。

如果我们假设一个矩阵至少有一个特征向量，我们可以通过下面的方式找到它。首先，我们同时乘以一个向量a：

$$Aa= \lambda Ia \tag{6.10}$$

I 是一个单位矩阵。上面的公式可以重写成：

$$Aa -  \lambda Ia=0 \tag{6.11}$$

由于矩阵相乘可以是分配法，可以写为：

$$(A - \lambda I)a=0 \tag{6.12}$$

上面的等式只有在$(A - \lambda I)$是单数的时候成立，因此它的行列式等于0。这个矩阵中除对角线上的数都是矩阵A中的值。例如下面这个2维的方阵：

$$
\begin{bmatrix}
a_{11} -\lambda & a_{12} \\
a_{21} & a_{22}-\lambda \\
\end{bmatrix}
=
\lambda^2- (a_{11} - a_{22})\lambda+(a_{11}a_{22}-a_{12}a_{21})=0 \tag{6.13}
$$

因为这是个二次方程，$\lambda$有两个解。这个解可能不唯一，或者非实数。类似的情况，对于n维的方阵将会产生n维的多项式。一般来说，我们无法求解n大于4的多项式的具体解，只能通过分析的方法求解不大于4维的等式。因此，对更大的矩阵来说，该方法只作为一个可选项。

有一个特殊情况，在对称矩阵（$A=A^T$）中可以快速求解特征值和特征向量。实数对称矩阵的特征值一定是实数，且如果他们不同，他们的特征矩阵是正交的。这样的矩阵可以写成对角形式(diagonal form)：

$$
A=QDQ^T, \tag{6.14}
$$

Q是正交矩阵，D是对角矩阵。Q的列是A的特征向量，D的对角线元素是A的特征值。将矩阵A放进这样的形式叫做特征值分解（eigenvalue decomposition）。

已知矩阵：

$$
\begin{bmatrix}
2 & 1 \\
1 & 1 \\
\end{bmatrix}
$$

特征值求解为：

$$\lambda^2-3\lambda+1=0$$

解得近似值为：

$$
\lambda=\frac{3\pm \sqrt{5}}{2},
\approx
\begin{bmatrix}
2.618 \\
0.382 \\
\end{bmatrix}.
$$

接着我们可以找出相关的特征向量。

$$
\begin{bmatrix}
2-2.618 & 1\\
1 & 1-2.618\\
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
\end{bmatrix}=
\begin{bmatrix}
0 \\
0 \\
\end{bmatrix}.
$$

得到近似值$(x,y)=(0.8507,0.5257)$。注意有多个解和2D向量是平行的，我们只取单位向量的解。同样的方法把另一个解带入，得到$(x,y)=(-0.5257，0.8507)$。

对角形式的A求解：

$$
\begin{bmatrix}
2 & 1\\
1 & 1\\
\end{bmatrix}
=
\begin{bmatrix}
0.8507 & -0.5257 \\
0.5257 & 0.8507 \\
\end{bmatrix}
\begin{bmatrix}
2.618 & 0 \\
0 & 0.382 \\
\end{bmatrix}
\begin{bmatrix}
0.8507 & 0.5257 \\
-0.5257 & 0.8507 \\
\end{bmatrix}.
$$


### 6.4.1 奇异值分解

在前面的部分，我们知道了如何计算对称矩阵特征值。这里我们介绍一种可以用在非对称矩阵的方法（包括非方阵），奇异值分解（SVD-singular value decomposition）。

$$ A=USV^T $$

U和V是两个不同的正交矩阵，他们的列被称为A的左右奇异向量，S是对角矩阵，其项被被称为A的奇异值。当A是对称矩阵且所有奇异值为正数，SVD和特征值分解相同。

奇异值和特征值的另一个关系可以用来计算SVD。首先，我们定义$M=AA^T$,在M上应用SVD：

$$ 
M=AA^T=(USV^T)(USV^T)^T=US(V^TV)SU^T=US^2U^T
$$

M是一个对称矩阵，而$US^2U^T$是其特征值分解。