---
layout: post
title: "2.数学相关 2"
subtitle: "2 Miscellaneous Math 2"
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

<div style="text-align: center">
<img src="/img/posts/2 Miscellaneous Math 2/1.png"/>
</div>

梯度向量在隐式曲线$f(x,y)=0$的点，垂直于曲线在该点的切向量。这个垂直向量也被叫做该曲线的法向量。因为梯度点是上坡，所以它是在$f(x,y)>0$的域中。

在高度场的背景下，偏导数和梯度的几何意义比平时更明显。 假设在点(a,b) 附近，f(x,y) 是一个平面（图 2.26）。 有一个特定的上坡和下坡方向。 与该方向成直角的是相对于该平面的水平方向（f(x, y)=0是其中之一）。平面与 f(x, y)=0 面之间的任何交点都将在水平方向上。 因此，上坡/下坡方向将垂直于交线 f(x, y) = 0。要了解偏导数为何与此有关，我们需要将其几何意义可视化。回想一下常规的一维函数导数 $y = g(x)$：

$$ \frac{d_y}{d_x}\equiv \lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}=\lim_{\Delta x \to 0} \frac{g(x+\Delta x)-g(x)}{\Delta x}$$

二维的函数 $f(x,y)$ 这样的极限在上面的式子中并不适用，因为给定x，f仍然有很多可能的结果。但如果把y变成常量，我们就可以定义出导数的模拟，这就是偏导数：

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

举一个梯度的例子，比如一个隐式圆$x^2+y^2-1=0$，梯度为$(2x,2y)$，表示圆的外面是正值区域。梯度向量的长度会随隐式方程的乘数变化。例如单位圆可以写成$Ax^2+Ay^2-A=0$，此时的梯度为$(2Ax,2Ay)$，A决定了梯度的值，A大于0，圆的范围就是凹陷的，小于0，则是凸出的。但无论如何，h=0 不会变，最大上坡的方向不会变。所以我们可以认为梯度的方向代表最大上坡方向，长度代表上坡的程度。

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

隐式直线的一个有趣的特性，可以用来计算点到直线的距离。$Ax+By+C$平行线的距离等于$k\sqrt{A^2+B^2}$，对于点$(x,y)+k(A,B)$，($(x,y)$是直线上的一点)等于：
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

$$f(x,yz,)=0$$

也可以用向量表示，$p=(x,y,z)$,

$$f(p)=0.$$

### 2.7.4 隐式曲面的法向量 Surface Normal to an Implicit Surface

曲面的法向量是垂直于曲面的向量，曲面上的每个点都可能有一个不同的法向量。梯度给2D隐式曲线提供了法向量，曲面上也是一样的。隐式函数的梯度提供的隐式曲面上的一点p的法向量：

$$n=\nabla f(p)=(\frac{\partial f(p)}{\partial x},\frac{\partial f(p)}{\partial y},\frac{\partial f(p)}{\partial z})$$

原理和2D场景下是一样的：梯度指向f增长最快的方向，它垂直于与表面相切的所有方向，其中f保持不变。

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

通过点$p_0=(x_0,y_0)和$p_1=(x_1,y_1)$的2D参数直线可以写做：

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

本章仅讨论3D参数直线，其他内容会在15章讨论。

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

$$x=r \cos \the \sin \$$

### 2.7.9 Summary of Curves and Surfaces

## 2.8 Linear Interpolation

## 2.9 Triangles

### 2.9.1 2D Triangles

### 2.9.2 3D Triangles

## 2.10 离散概率 Discrete probability

## 2.11 连续概率 Continuous probability

## 2.12  蒙特卡洛积分 Monte Carlo Integration

### 2.12.1 重要性采样 Importance Sampling

# 常见问题 Frequently Asked Questions
- Whyisn’ttherevectordivision?
It turnsoutthatthereisno“nice”analogyofdivisionforvectors.However,it
ispossibletomotivatethequaternionsbyexaminingthisquestionindetail(see
Hoffmann’sbookreferencedinthechapternotes).
- Is theresomethingascleanasbarycentriccoordinatesforpolygonswith
morethanthreesides?
Unfortunately,thereisnot.Evenconvexquadrilateralsaremuchmorecompli-
cated. Thisisonereasontrianglesare suchacommongeometricprimitivein
graphics.
- Is thereanimplicitformfor3Dlines?
No.However,theintersectionoftwo3Dplanesdefinesa3Dline,soa3Dline
can bedescribedbytwosimultaneousimplicit3Dequations.
- Howisquasi–MonteCarlo(QMC)orbluenoisesamplingrelatedto
Monte Carlosampling?
The coreideaofMonteCarloisyoucanaverageabunchof“fair”samplesto
estimateatrueaverage.Here,faircanbeframedinastatisticalsense.Butsome
samplesetscanalsobeshowntobe“fair”eveniftheyarenotrandom.One
suchsetarequasi–MonteCarloandhaveobviousdeterministicstructurewhich
isnotrandom,butisuniforminaformalsensethatisnotstatistical,andthese
setsoftenimproveconvergenceoverrandomones.Bluenoisesamplesetsadd
constraintsonthesamplestoavoidclumping,andlikeQMCsetscanimprove
convergencewithoutbeingfullyrandom.Inpractice,mosttechniquesaredevel-
oped usingMonteCarloformalismsbecause the mathismoretractable,andthen,
QMCorbluenoisepointsareinsertedinthecodewiththeempiricalconfidence
that uniformityisallthatisneededinpractice.

## Notes
Thehistoryofvectoranalysisisparticularlyinteresting.Itwaslargelyinvented
by Grassmanninthemid-1800sbutwasignoredandreinventedlater(Crowe,
1994). Grassmannowhasafollowinginthegraphicsfieldofresearcherswho
are developing GeometricAlgebra basedonsomeofhisideas(Doran&Lasenby,
2003). Readersinterestedinwhytheparticularscalarandvectorproductsare
insomesensetherightones,andwhywedonothaveacommonlyusedvector
division,willfindenlightenmentintheconcise About Vectors (Hoffmann,1975).
Anotherimportantgeometrictoolisthe quaternion inventedbyHamiltoninthe
mid-1800s.Quaternionsareusefulinmanysituations,butespeciallywhereori-
entationsareconcerned(Hanson,2005).