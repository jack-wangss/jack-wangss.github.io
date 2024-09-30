---
layout: post
title: "FOCG5: 2.数学相关 2"
subtitle: "FOCG5: 2 Miscellaneous Math 2"
background: '/img/posts/01.jpg'
---

## 2.7 曲线和曲面 Curves and Surfaces
### 2.7.1 2D隐式曲线 2D Implicit Curves
曲线的一个直观解释：曲线是用笔画在纸上的点的集合（且笔不离开纸）。另一种则是通过隐式函数表达，2D的隐式函数形式如下：

$$ f(x,y)=0. $$

上面的函数会返回一个实数，如果返回值为0，则点xy在曲线上，非0则不在。

> 隐式几何：符合特定关系的点的集合。<br> 显式几何：所有点是已知的，或者可以通过参数映射的方式知道。

比如圆的隐式函数如下：

$$ f(x,y)=(x-x_c)^2+(y-y_c)^2-r^2 $$

这里有个有趣的比喻，我们可以把f函数想象成地形，海平面高程为0，海岸线就是隐式曲线，f的值就是高程。我们可以通过f的值是否大于0，判断出某个点是否在曲线外部。

我们可以用向量表示上面的函数，$c=(x_c,y_c),p=(x,y)$则：

$$(p-c)\cdot (p-c)-r^2=0$$

因为向量点乘自身等于其长度的平方，所以我们也可以写成下面的形式：

$$||p-c||^2-r^2=0$$

进而得到：

$$||p-c||-r=0$$

可以理解为，任意点p到圆心c的距离等于半径r。这种向量形式的函数比x，y更容易理解了，所以我们应该尽可能使用向量形式的表达。这样做还有个好处，在编码的时候可以通过向量处理计算，而避免了x，y，z在代码中的重复。

### 2.7.2 2D梯度 The 2D Gradient

如果我们把$f(x,y)$当作是返回高度的高度场，梯度向量就是最大上坡方向。梯度向量$\nabla f(x,y)$为：

$$\nabla f(x,y)=(\frac{\partial f}{\partial x},\frac{\partial f}{\partial y})$$

>$\frac{\partial f}{\partial x},\frac{\partial f}{\partial y}$分别是函数 $f(x,y)$关于x和y的偏导数，它们分别表示了$f$在x方向和y方向的变化率。
>偏导数的几何意义：偏导数是函数在某一点的切线的斜率，梯度是函数在某一点的法向量。


<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 2/1.png"/>
</div>

梯度向量在隐式曲线$f(x,y)=0$的点，垂直于曲线在该点的切向量。这个垂直向量也被叫做该曲线的法向量。因为梯度点是上坡，所以它是在$f(x,y)>0$的域中。

在高度场的背景下，偏导数和梯度的几何意义比平时更明显。 假设在点(a,b) 附近，f(x,y) 是一个平面（图 2.26）。 有一个特定的上坡和下坡方向。 与该方向成直角的是相对于该平面的水平方向（f(x, y)=0是其中之一）。平面与 f(x, y)=0 面之间的任何交点都将在水平方向上。 因此，上坡/下坡方向将垂直于交线 f(x, y) = 0。要了解偏导数为何与此有关，我们需要将其几何意义可视化。回想一下常规的一维函数导数 $y = g(x)$：

$$ \frac{d_y}{d_x}\equiv \lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}=\lim_{\Delta x \to 0} \frac{g(x+\Delta x)-g(x)}{\Delta x}$$

二维的函数 $f(x,y)$ 在上面的式子中并不适用，因为给定x，f仍然有很多可能的结果。但如果把y变成常量，我们就可以定义出导数的模拟，这就是偏导数：

$$ \frac{\partial f}{\partial x} \equiv\lim_{\Delta x \to 0} \frac{f(x+\Delta x,y)-f(x,y)}{\Delta x}$$

为什么关于x，y的偏导数是梯度向量的分量。这个问题在几何中看可以比代数上更清楚。如图2.29，我们看到向量 a 沿着 f 不变的路径行进，向量$a=(\Delta x,\Delta y)$，因为上坡方向和a垂直，所以他们点乘的结果为0：

$$(\nabla f)\cdot a\equiv(x_\nabla,y_\nabla)\cdot (x_a,y_a)x_\nabla \nabla x+y_\nabla \nabla y =0 \tag{2.11}$$

同时我们知道 f 在$(x_a,y_a)$方向上变化始终为0:

$$ \Delta f= \frac{\partial f}{\partial x}\Delta x+\frac{\partial f}{\partial y}\Delta y \equiv \frac{\partial f}{\partial x}x_a+\frac{\partial f}{\partial y}y_a=0 $$

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 2/2.png"/>
</div>

已知任何向量$(x,y)$和 $(x',y')$垂直，他们的点乘为0，所以$x x'+y y'=0$。知道向量$(x,y)$，很容易算出和它垂直的向量$(y,-x)$和$(-y,x)$。当k不为0，$(x,y)$垂直于$k(y,-x)$，得到：

$$(x_a,y_a)=k(\frac{\partial f}{\partial y},-\frac{\partial f}{\partial x}) \tag{2.12}$$

结合公式（2.11）和（2.12），得到：

$$(x_\nabla,y_\nabla)=k'(\frac{\partial f}{\partial x},\frac{\partial f}{\partial y})$$

$k'$是一个非0的常量。定义上，上坡表示f的正方向，所以我们希望$k'>0$，$k'=1$是最好的。

举一个梯度的例子，比如一个隐式圆$x^2+y^2-1=0$，梯度为$(2x,2y)$，表示圆的外面是正值区域。梯度向量的长度会随隐式方程的乘数变化。例如单位圆可以写成$Ax^2+Ay^2-A=0$，此时的梯度为$(2Ax,2Ay)$，A决定了梯度的值，A大于0，圆的范围就是凹陷的，小于0，则是凸出的。但无论如何，h=0 不会变，最大上坡的方向不会变。所以我们可以认为梯度的方向代表最大上坡方向，长度代表上坡的斜率。

#### 隐式2D直线 Implicit 2D Lines

通用的直线方程：

$$Ax+By+C=0,$$

在我们已知两个点$(x_0,y_0)$ 和$(x_1,y_1)$，没办法从代数角度求出ABC三个未知量。我们可以用梯度的方式去考虑这个问题，$Ax+By+C=0$的梯度向量为$(A,B)$。因为梯度向量和直线垂直，所以$(A,B)$和$(x_1-x_0,y_1-y_0)$也是垂直的。因此，$(A,B)$可以写做$(y_0-y_1,x_1-x_0)$得到以下公式：

$$(y_0-y_1)x+(x_1-x_0)y+C=0$$

由于点$(x_0,y_0)$ 和$(x_1,y_1)$在这个直线上，所以我们可以把任意一点代入方程，求得$C=x_0 y_1-x_1y_0$
得到完整的公式：

$$(y_0-y_1)x+(x_1-x_0)y+x_0 y_1-x_1y_0=0$$

通过移项，可以转换为斜截式：

$$y=\frac{y_0-y_1}{x_1-x_0}x+\frac{x_1y_0-x_0 y_1}{x_1-x_0}$$

隐式直线的一个有趣的特性，可以用来计算点到直线的距离。$Ax+By+C$平行线的距离等于$k\sqrt{A^2+B^2}$，对于点$(x,y)+k(A,B)$，$(x,y)$是直线上的一点,等于：

$$
\begin{align} 
f(x+kA,y+kB) &=Ax+kA^2+By+kB^2+C \\
&=k(A^2+B^2)
\end{align} 
$$

因此点$f(a,b)$到直线的距离为

$$k\sqrt{A^2+B^2}=\frac{f(a,b)}{\sqrt{A^2+B^2}}$$

#### 二次曲线 Quadratic Curves

前面的内容我们讨论了线性隐式直线$f(x,y)=0$。如果f是关于x和y的二次函数，其常见形式：

$$Ax^2+Bxy+Cy^2+Dx+Ey+F=0,$$

那么我们称它二次曲线。二维的二次曲线包括椭圆、双曲线，还有一些特殊形式：抛物线、圆、直线。

### 2.7.3 3D隐式曲面 3D Implicit Surfaces

与2D中定义曲线的隐式方程一样，曲面也可以通过同样的方式定义：

$$f(x,y,z)=0$$

也可以用向量表示，$p=(x,y,z)$,

$$f(p)=0.$$

### 2.7.4 隐式曲面的法向量 Surface Normal to an Implicit Surface

曲面的法向量是垂直于曲面的向量，曲面上的每个点都可能有一个不同的法向量。梯度给2D隐式曲线提供了法向量，曲面上也是一样的。隐式函数的梯度提供的隐式曲面上的一点p的法向量：

$$n=\nabla f(p)=(\frac{\partial f(p)}{\partial x},\frac{\partial f(p)}{\partial y},\frac{\partial f(p)}{\partial z})$$

原理和2D场景下是一样的：梯度指向f增长最快的方向，它与所有使得 f 值保持不变的曲面上的切线都垂直。

>等值面是指函数 f(x,y,z) 取某个常数值 c 的所有点的集合，即满足f(x,y,z)=c 的所有点形成的面。

>梯度与等值面的正交性：在等值面上，函数 f 的值是常数，因此在这个面上任意移动都不会改变 f 的值。由于梯度指向 f 值增加最快的方向，而等值面上 f 的值不变，所以梯度必须垂直于等值面。

### 2.7.5 隐式平面 Implicit Planes

一个无限平面中的一点a，其法向量为n，则该平面的隐式方程如下：

$$(p-a)\cdot n=0$$

这里的a和n是已知量，p是任意一点。有时候我们希望已知三个点a,b,c创建一个隐式平面，此时可以先计算n：

$$n=(b-a)(c-a)$$

结合上面两个公式，得到方程：

$$(p-a)\cdot ((b-a)\times (c-a))=0$$

### 2.7.6 2D参数曲线 2D Parametric Curves

参数曲线是由唯一的参数t控制：

$$
\begin{bmatrix} 
x \\
y
\end{bmatrix}
=
\begin{bmatrix} 
g(t) \\
h(t)
\end{bmatrix}
$$

通过我们用向量形式表示：

$$p=f(t)$$

#### 2D 参数直线 2D Parametric Lines

通过点$p_0=(x_0,y_0)$和$p_1=(x_1,y_1)$的2D参数直线可以写做：

$$
\begin{bmatrix} 
x \\
y
\end{bmatrix}
=
\begin{bmatrix} 
x_0+t(x_1-x_0) \\
y_0+t(y_1-y_0)
\end{bmatrix}
$$

向量形式：

$$p(t)=p_0+t(p_1-p_0)$$

### 2.7.7 3D Parametric Curves

$$
\begin{bmatrix} 
x \\
y \\
z
\end{bmatrix}
= p(t)
$$


#### 3D 参数直线

向量形式：

$$p=o+td$$

### 2.7.8 3D 参数曲面 3D Parametric Surfaces

向量形式：

$$
\begin{bmatrix} 
x \\
y \\
z
\end{bmatrix}
= p(u,v)
$$

举个例子，地球表面的点可以用经度和纬度两个参数描述。如果我们把地球的球心定义为原点，r为半径，就可以构建一个球坐标。得出以下方程：

$$x=r \cos \phi \sin \theta $$

$$y=r \sin \phi \sin \theta $$

$$z=r \cos \theta $$

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 2/3.png"/>
</div>

已知坐标点的情况下，且$\phi \in (-\pi,\pi]$,则

$$\theta =acos(z\sqrt{x^2+y^2+z^2}) $$
$$\phi=atan2(y,x)$$

函数$q(t)=p(t,v_0)$，定义了一个参数曲线。变化u，固定v($v_0$)，这种在曲面上的曲线叫做等参曲线（isoparametric curve）。 q的导数返回了曲线的正切值，由于曲线在曲面上，所以向量q'也在曲面上。因为它的值由变化p的一个参数获取的，所以q'是p关于u的偏导数，记作$p_u$。另一个关于u的偏导数记作$p_v$。

通过p的导数，我们有两个正切向量，从而得到面的法向量：

$$n=p_u \times p_v$$


### 2.7.9 曲面曲线总结 Summary of Curves and Surfaces

2D中的隐式曲线或3D中的隐式曲面，由包含两个或三个参数的标量函数定义：$f:R^2 \rightarrow R$或者$f:R^3 \rightarrow R$，曲面由所有结果为0的点构成：

$$S={\{p|f(p)=0\}}$$

>这个表达式表示隐式曲线或表面 
𝑆 是所有满足 f(p)=0 的点 p 的集合。

2D或3D中的参数曲线，由包含一个参数的向量函数定义：$p:D \subset R \rightarrow R^2$或者$p:D \subset R \rightarrow R^3$，遍历D中的每一个t，得到完整的曲线：

$$S={\{p(t)|t\in D\}}$$

3D中的参数曲面，由包含两个个参数的向量函数定义：$p:D \subset R^2 \rightarrow  R^3$，遍历D中的每一个(u,v)，得到完整的曲面：

$$S={\{p(u,v)|(u,v)\in D\}}$$

对于隐式曲线和曲面，法向量通过f的导数（梯度）得到，切向量可以通过构造基从法向量推导得到。

对于参数曲线和曲面，p的导数给出了切向量，法向量可以通过构造基从切向量推导得到。

## 2.8 线性插值 Linear Interpolation

线性插值可能是图形学中最常用的数学计算。前面我们已经看过了一个例子，两个点a，b和参数t形成直线$p=(1-t)a+tb$。它是线性插值，因为加权项 t 和 1 - t 是 t 的线性多项式。

从数据A到B的时候，我们创建一个0-1的变量t，中间值的函数就是$(1-t)A+tB$。

## 2.9 三角形 Triangles

2D和3D三角形在大多数的图形程序中都是最基本的元素。例如颜色这类属性一般会附在三角形的顶点上，然后通过三角形进行插值。最直接的进行插值的坐标系统叫做重心坐标（barycentric coordinates）。

### 2.9.1 2D Triangles

对于2D三角形，如果我们已知它的顶点a，b，c，可以得出它的面积：

$$
\begin{align}
Area &=\frac{1}{2}
\begin{vmatrix}
    x_b-x_a & x_c-x_a\\
    y_b-y_a & y_c-y_a\\
\end{vmatrix} \\
&=\frac{1}{2}(x_ay_b+x_by_c+x_cy_a-x_ay_c-x_by_a-x_cy_b) \tag{2.27}
\end{align}
$$ 

如果abc是逆时针，面积是正数，顺时针则为负。

三角形的重心坐标可以看作做一个非正交的坐标系统。坐标系统的a是原点，（b-a）和（c-a）是基，该坐标系的一点p可以写做：

$$p=a+\beta(b-a)+\gamma(c-a)\tag{2.28}$$

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 2/4.png"/>
</div>

上面的公式可以转化为：

$$p=(1-\beta-\gamma)a+\beta b+\gamma c.$$

引入新的变量 $\alpha \equiv 1-\beta-\gamma$，得到：

$$p=\alpha a+\beta b+\gamma c. \tag{2.29}$$

且$\alpha +\beta +\gamma = 1. $

重心坐标有一个好的特性，如果点p在三角形abc中，则：

$$ 0<\alpha <1,$$

$$ 0<\beta <1,$$

$$ 0<\gamma <1.$$

如果其中一个值为0，另外两个点在0-1之间，则点在三角形的边上。如果由两个值为0，那么另一个则为1，此时点为三角形的顶点。

重心坐标的另一个很好的特性是以平滑的方式混合了三个顶点的坐标 (公式2.29)。顶点的其他属性也是一样的。

那么已知点p，如何计算它的重心坐标呢？一种方法是通过（2.28）的式子，解出未知数。矩阵形式写做：

$$
\begin{bmatrix}
 x_b-x_a & x_c-x_a\\
 y_b-y_a & y_c-y_a\\
\end{bmatrix}

\begin{bmatrix}
 \beta \\
 \gamma\\
\end{bmatrix}
=
\begin{bmatrix}
 x_p-x_a\\
 y_p-y_a\\
\end{bmatrix}
$$

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 2/5.png"/>
</div>

重心坐标的有一个几何特性，不同的$\beta$之间的间距是正数。在a点处$\beta=0$，点b处$\beta=1$，我们可以算出(x,y)的$\beta$：

$$\beta=\frac{f_{ac}(x,y)}{f_{ac}(x_b,y_b)}$$

我们可以用同样的方式计算$\alpha$和$\gamma$。计算已知两点，求直线方程的ABC的思路得到：

$$f_{ab}(x,y)\equiv (y_a-y_b)x+(x_b-x_a)y +x_ay_b-x_by_a=0$$

再除以$f_{ab}(x_c,y_c)$，得到$\gamma$,

$$\gamma=\frac{(y_a-y_b)x+(x_b-x_a)y +x_ay_b-x_by_a}{(y_a-y_b)x_c+(x_b-x_a)y_c +x_ay_b-x_by_a}$$

$\beta$也是用同样的方式求得，最后算出$\alpha=1-\beta - \gamma$

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 2/6.png"/>
</div>

另一种计算重心坐标的方式是计算三角形$A_a,A_b,A_c$的面积，重心坐标遵守以下规则：

$$\alpha=A_a/A,$$

$$\beta=A_b/A,$$

$$\gamma=A_c/A,$$

### 2.9.2 3D Triangles

重心坐标可以拓展到3D中，对于3D点a，b，c，依然适用：

$$p=(1-\beta-\gamma)a+\beta b+\gamma c.$$

3D三角形的法向量可以通过叉乘求出：

$$n=(b-a)\times(c-a)$$

其面积等于叉乘长度的一半：

$$area=\frac{1}{2}||(b-a)\times(c-a)||$$

需要注意这里的面积不一定是正值，无法直接用来计算重心坐标。但是我们可以通过点乘的结果知道正负。回忆一下点乘的公式，如果向量a和向量b平行，则$\cos \phi = \pm1$。 因此，可以得到下面的公式：

$$ \alpha=\frac{n \cdot n_a}{||a||^2}$$

$$ \beta=\frac{n \cdot n_b}{||a||^2}$$

$$ \gamma=\frac{n \cdot n_c}{||a||^2}$$

n是上面计算的法向量，$n_a$是顶点b、c和p点的叉乘：

$$ n_a=(c-b)\times(p-b),$$

$$ n_b=(a-c)\times(p-c),$$

$$ n_c=(b-a)\times(p-a).$$

## 2.10 离散概率 Discrete probability

概率研究包括随机结果的事物，离散概率是指随机结果数量有限的情况。

随机变量(random variable)是指还未确定结果的变量，经典的例子就是掷骰子，"X=骰子最终的结果"，
写成代码就是：

```c++
int X = rand_from(1,6)
```

随机变量有两个常用的属性：期望值（expected value）和方差（variance）。X的期望值可以表示为 $EX$或$E(X)$，是 X 在“掷骰子”的所有平行宇宙下的平均值。 这可以通过将每个结果乘以其概率并添加：

$$EX=\frac{1}{6}(1)+\frac{1}{6}(2)+\frac{1}{6}(3)+\frac{1}{6}(4)+\frac{1}{6}(5)+\frac{1}{6}(6)=3.5$$

如果我们掷了很多次骰子，我们“期望值”结果在3.5左右。你可能觉得奇怪，因为结果一定会是整数，这只是“期望值”的定义，不用太过纠结。

期望值告诉我们随机变量的趋势，但它并没有告诉我们这种趋势需要多长时间，也没有告诉我们它偏离平均值的幅度有多大。例如，一个有 3 个 1 和 3 个 6 的骰子的预期值仍为 3.5，但“偏离均值”会比传统骰子更大。那么我们如何衡量变化的幅度呢？一个是评估距离 3.5 的偏差，但可能有平均偏差为零的情况，因为值为 1 的 -2.5 抵消了值为 6 的 +2.5 偏差。我们可以取绝对差，但这存在实践问题（包括绝对值的代数具有挑战性）和一些理论问题。在实践中，人们更喜欢平均平方偏差并将其称为方差：

$$V(X)=average((X-EX)^2)$$

平均值也是一个期望值：

$$V(X)=E((X-EX)^2)$$

对于骰子的例子，E(X)=3.5，X-E(X)的值为-2.5、-1.5、-.5、.5、1.5、2.5，$(X-E(X))^2$ 的值为 6.25, 2.25, 0.25, 0.25,2.25, 6.25，因此，X 的方差，通常表示为 17.5/6。方差公式的代数操作更方便的形式：

$$V(X)=E(X^2)-E(X)^2$$

如果随机变量Z=X+Y，则：

$$E(Z)=E(X+Y)=E(X)+E(Y)$$

这里即使X和Y是非独立的，公式依然适用。方差的公式也是一样，但X和Y是独立的：

$$V(Z)=V(X+Y)=V(X)+V(Y)$$

方差的一个缺点是它不是很直观。 所以人们经常用方差的平方根，称为标准
偏差，通常表示为 sigma(X):

$$\sigma(X)=\sqrt{V(X)}$$

## 2.11 连续概率 Continuous probability

图形学中，我们经常采用一个范围的值作为随机变量，叫做连续随机变量。它和离散的最大区别：连续随机变量取特定值的概率为0。这个区别所带来的问题，我们可以使用密度函数去解决。

## 2.12  蒙特卡洛积分 Monte Carlo Integration

前面我们介绍了积分，但如何去实现积分函数？图形学中，我们一般会采用蒙特卡洛积分。观察下面的函数：

```c++
float shade = average(f(), hemisphere)
```

我们的直觉会找到正确的答案。在半球上挑选一堆随机点 $v_i$，并计算 $f(v_i) $并对它们进行平均，例如：

```c++
float sum = 0.0
N = 10000; // or some other big number the user sets
For (int i = 1 to N)
vec3 v = random_point_on_hemisphere()
sum = sum + f(v)
Average = sum / N
```
现在我们需要一个函数计算半球上的随机点，最简单的方法是“剔除法”。首先，通过在一个单位立方体中重复均匀地挑三个随机数，在单位球中均匀地挑点：

```c++
do
    X = random_from(-1,1)
    Y = random_from(-1,1)
    Z = random_from(-1,1)
while (xˆ2 + yˆ2 + zˆ2 > 1)
```

判断切换半球
```c++
If (Z < 0) Z = -Z
```

然后将点投影到单位半球
```c++
v = unit_vector(X, Y, Z).
```


这是一种处理平均值的方法。 但是一般积分呢？我们回顾一下：
```c++
average(f(), domain) = integrate(f(), domain) /
integrate(1, domain)
```
所以
```c++
integrate(f(), domain)) = average(f(), domain)*
integrate(1, domain)
```

在这里例子中，积分$integrate(1, domain)$是半球的面积，也就是$2\pi$。


所以，蒙特卡洛积分通常是随机点的平均值乘以一个常数（域的大小——长度、面积等）

### 2.12.1 重要性采样 Importance Sampling

当我们想要取随机平均值的函数，在高低值有很大变化得时候，我们可以关注某一些区域的采样，并通过权重修正不均匀的数据。概率密度函数（PDF）为我们提供了正确的工具：如果我们知道样本的PDF，那就是该区域“过采样”程度的直接衡量标准。如果我们使用不均匀样本，那么我们可以得到：

```c++
integrate = average_of_nonuniform_samples(f()/p(),domain).
```

这个公式的一个巧妙之处在于，它也适用于均匀的随机样本。在这种情况下，PDF `p()= 1/ integrate(1,domain)` 所以域的大小就在PDF中。
域在 PDF 中编码。

对于任何给定的蒙特卡洛重要性抽样问题，我们都遵循一种非常公式化的方法，至少在开始时：

1. 确定什么是函数 f（） 和积分域（例如在单位球体上或三角形上的点）

2. 选择一种在该域上生成随机样本$x_i$的方法，当然，要确保可以评估每个样本的PDF $p(x_i)$

3. 对$x_i$们的$f(x_i)/p(x_i)$求平均值。

一个好处是可以使用任何 p() 并且收到正确的结果（需要注意的是 f() 非零时， p() 必须非零）。 用哪个 p() 只会影响收集结果得速度。 所以我们通常从一个常量 p() 开始来调试我们的代码。