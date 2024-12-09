---
layout: post
title: "FOCG5: 7.变换矩阵"
subtitle: "FOCG5: 7 Transformation Matrices"
background: '/img/posts/01.jpg'
---



## 7.1 2D 线性变换
我们可以用一个 2x2 的矩阵，对一个二维的向量进行变换，这种通过二维向量乘以一个矩阵得到另一个二维向量的操作，就叫线性变换。

### 7.1.1 缩放

最常见的一种变换就是缩放：

$$
scale(s_x,s_y)=

\begin{bmatrix}
s_x & 0\\
0 & s_y\\
\end{bmatrix}
$$

可以用来缩放一个向量：

$$
\begin{bmatrix}
s_x & 0\\
0 & s_y\\
\end{bmatrix}
\begin{bmatrix}
x \\
y\\
\end{bmatrix}
=
\begin{bmatrix}
s_x x\\
s_y y\\
\end{bmatrix}
$$

### 7.1.2 切变 Shearing

切变就像是你推一堆卡片，越往上的卡片被推的越多，水平和垂直切变的矩阵分别如下：

$$
shear\_x(s)=

\begin{bmatrix}
1 & s\\
0 & 1\\
\end{bmatrix}
\
,
\
shear\_y(s)=

\begin{bmatrix}
1 & 0\\
s & 1\\
\end{bmatrix}
$$

另一种思路去看切变，就是把它当作是某个轴旋转了一定角度。例如x方向的切变，就是y顺时针旋转了$\phi$：

$$
\begin{bmatrix}
1 & tan \phi\\
0 & 1\\
\end{bmatrix}
\ 
$$

同样的，x逆时针旋转了$\phi$：

$$
\begin{bmatrix}
1 & 0\\
tan \phi & 1\\
\end{bmatrix}
\ 
$$


### 7.1.3 旋转

假设我们想要逆时针旋转一个向量a，得到新的向量b（图7.5）。如果a和x轴的夹角为$\alpha$，则长度$r=\sqrt{x_a^2+y_a^2}$，因此：

$$
x_a = r \cos \alpha,\\
y_a = r \sin \alpha.
$$

<div style="text-align: center">
<img src="/img/posts/7 Transformation Matrices/1.png"/>
</div>

由于b是a旋转而来，所以它的长度也是r。b和a的夹角为$\phi$，所以b和x轴的角度就是$(\alpha+\phi)$，所以(2.3.3)：

$$
x_b = r \cos (\alpha+\phi)=r \cos \alpha \cos \phi - r \sin \alpha \sin \phi, \\
y_b = r \sin (\alpha+\phi)=r \sin \alpha \cos \phi + r \cos \alpha \sin \phi.
$$

替换 $x_a = r \cos \alpha , y_a= r\sin \alpha$，得到：

$$
x_b = x_a \cos \phi - y_a  \sin \phi, \\
y_b = y_a  \cos \phi +x_a  \sin \phi.
$$

写成矩阵形式：

$$
rotate(\phi)=
\begin{bmatrix}
\cos\phi & -\sin \phi\\
\sin \phi & \cos \phi\\
\end{bmatrix}

$$

### 7.1.4 镜像 Reflection

我们可以用缩放的矩阵实现镜像：

$$
reflect\_y=

\begin{bmatrix}
-1 & 0\\
0 & 1\\
\end{bmatrix}
\ 
,
\
reflect\_x=

\begin{bmatrix}
1 & 0\\
0 & -1\\
\end{bmatrix}
$$

### 7.1.5 变换的组合和分解

图形程序中常常会对一个对象应用多个变换。例如，我们可能需要先缩放，再旋转一个向量 $v_1$：

$$
v_3 = R(S v_1)
$$

也可以写做：

$$
v_3 = (RS)v_1.
$$

换言之，我们可以通过矩阵乘得到具有多种变换的矩阵，需要注意的是矩阵乘在应用变换的时候是从右边开始的。

### 7.1.6 变换的分解

我们经常需要分解组合的变换，例如我们需要向用户展示变换的旋转和缩放，但是在内部它们可能只是一个矩阵。

## 7.2 3D 线性变换

### 7.2.1 任意3D旋转
### 7.2.2 变换法向量


## 7.3 移动和仿射变换


## 7.4 逆变换矩阵

## 7.5 坐标变换