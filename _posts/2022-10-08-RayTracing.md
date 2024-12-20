---
layout: post
title: "FOCG5: 4.光线追踪"
subtitle: "FOCG5: 4 Ray Tracing"
background: '/img/posts/01.jpg'
---

简单地说，渲染就是把输入的几何对象集合，输出成一组像素的过程，一般有两种方式。第一种是基于对象顺序渲染，依次考虑每个对象，找到对象影响的所有像素并更新。第二种是基于图像顺序渲染，依次考虑每个像素，找到影响像素的所有对象并计算像素值。

光线追踪就是基于图片顺序的算法。

## 4.1 基础光线追踪算法

光线追踪每次计算一个像素，主要任务就是找到从像素位置看到的对象，任何被看到的对象都应该和视线（viewing ray）是相交的，视线是视点到像素方向的射线。我们要找的是和视线相交，且距离最近的对象。找到对象后，在根据交点、对象面法向量等信息进行着色计算，得到像素的颜色。

基础的光线追踪包含三个部分：

1. 光线生成：根据相机信息计算每个像素的光线
2. 管线求交：找到距离最近的相交对象
3. 着色：根据求交结果计算像素点的颜色

## 4.2 透视

将3D场景投影成2D图片，最简单的投影方式是平行投影，通过投影方向将3D点映射到2D的图像平面上。如果图像平面和视线垂直，就叫做正交投影（orthographic）；反之，则叫斜投影（oblique）。

平行投影的优点是会保留模型的尺寸与形状，但这也是它的缺点，因为在真实世界中，我们看物体有近大远小的特点，所以平行投影显得不够真实。

更加真实的投影可以用透视投影实现，我们可以从视点投射非平行射线，这样距离视点越远的物体自然显得更小。和平行投影一样，透视投影也有正透视和斜透视两种，正投影的投影方向在图片中心。

## 4.3 视线计算

为了生成射线，我们首先需要用数学来表示射线。射线包含一个原点和一个方向，可以用3D参数直线来表示：

$$p(t)=e+t(s-e)$$

$p(0)=e,p(1)=s$,并且当$0< t_1< t_2$ 时，说明 $t_1$ 距离我们的视点更近。

<div style="text-align: center">
<img src="/img/posts/4 Ray Tracing/1.png"/>
</div>

在面向对象编程中，我们可以这样封装射线：

```c++
class Ray
{
    Vec3 o // ray origin
    Vec3 d // ray direction
    Vec3 t
}
```

<div style="text-align: center">
<img src="/img/posts/4 Ray Tracing/2.png"/>
</div>

创建一根射线，我们需要知道视线原点e（已知），和终点s。直接找到s似乎比较困难，但这个问题在右手坐标系中会很直观。

所有的射线生成方法都是从一个叫做相机框架（camera frame）的正交坐标系开始，我们称它为视点。其中u、v、w是它的三个基向量。u朝右（相机视角），v朝上，w朝后。构建一个相机框架最常见的方式，是通过视线方向，也就是-w，和向上的向量v。通过这两个向量求出u，构建出相机框架。

<div style="text-align: center">
<img src="/img/posts/4 Ray Tracing/3.png"/>
</div>

### 4.3.1 正交视图

对于正交视图，所有的射线的方向都是-w。虽然平行视图不需要视点，但我们还是可以用相机框架作为原点，定义平面，这样就能判断哪些对象实在相机的后面。

此外，我们需要四个参数定义图像平面的位置：l（左边）、r（右边）、t（上边）、b（下边）。

<div style="text-align: center">
<img src="/img/posts/4 Ray Tracing/4.png"/>
</div>

为了将$n_x \times n_y$的像素放到$(r-l)\times (t-b)$的矩形，像素的水平间距应该等于$(r-l)/n_x$，垂直间距等于$(t-b)/n_y$。由于需要半像素空间沿着边缘，让像素网格居中，所以光栅图中的位置$(i,j)$，在矩形中的位置为：

$$ u=l+(r-l)(i+0.5)/n_x \\
  v=b+(t-b)(j+0.5)/n_y$$

在正交视图中，我们可以直接使用像素的图片平面中的位置作为光线起点，同时也知道了光线的方向是视线方向，因此正交视图的射线如下：

$$
ray.o \gets \mathrm{e} + u\mathrm{u} + v\mathrm{v} \\
ray.d \gets -\mathrm{w}
$$

想要创建斜投影视图也很简单，只要分开定义图片平面向量w和视线方向d。

### 4.3.2 透视视图

对于透视视图，所有的射线都是相同的原点，但每个像素的方向都不一样。图片平面不再放置在e的位置，而是在e前面的一段距离d，d被叫做图像面距离，经常也被叫做焦距，因为d的承担和真实的相机中和焦距一样的角色。透视试图的射线也和正交视图类似：

$$
ray.o \gets \mathrm{e}  \\
ray.d \gets -d\mathrm{w}+u\mathrm{u}+v\mathrm{v}
$$

## 4.4 射线和对象求交

生成了射线$e+td$后，下一步需要找到第一个和对象的交点。我们需要解决的问题是，在区间$[t_0,t_1]$，找到射线和曲面的第一个交点位置t。射线相交一般$t_0=0, t_1= +\infty$。

### 4.4.1 射线和球求交

已知射线 $p(t)=e+td$ 和隐式曲面$f(p)=0$。交点需要满足，射线的点在隐式曲面上：

$$f(p(t))=0 \ \mathrm{or} \   f(e+td)=0.$$

一个球心为$c=(x_c,y_c,z_c)$半径为R的隐式方程可以写作：

$$(x-x_c)^2+(y-y_c)^2+(z-z_c)^2-R^2=0.$$

可以写作向量形式：

$$(p-c)\cdot(p-c)-R^2=0.$$

将射线$p(t)=e+td$ 代入到方程中，得到：

$$(e+td-c)\cdot(e+td-c)-R^2=0.$$

整理后得到：

$$(d \cdot d)t^2 + 2d \cdot (e − c)t + (e − c) \cdot (e − c) − R^2 = 0.$$

上面的公式中，只有t是未知的，所以这是一个典型的二元一次方程：

$$At^2+Bt+C=0.$$

二元一次方程的判别式为0，则射线和球体有一个交点；判别式大于0，则有入射出射两个交点；判别式小于0，则无交点。将实际方程带入求根公式,：

$$t=\frac{-d \cdot (e-c) \pm \sqrt{(d \cdot (e-c))^2 -(d \cdot d)((e-c)\cdot(e-c)-R^2)}}{(d\cdot d)}$$

在实际的实现时，需要首先计算根的判别式。要在区间$[t_0,t_1]$找到正确的找到最近的交点，有下面三种情况：

- 两个结果中更小的值在区间内，则其为最近交点；
- 否则，如果更大的值在区间内，则其为最近交点；
- 其他情况无交点。


### 4.4.2 射线和三角形求交

三角形和射线相交的算法有很多。这里我们用重心坐标的方式表示三角形，比起顶点定义，这种方式不需要长期的储存。

首先，我们定义射线和参数曲面相交的等式：

$$e+td=f(u,v)$$

表面是参数曲面的情况下，参数方程可以写成向量形式（2.9.2）。如果三角形的顶点是a，b，c，等式如下：

$$e+td=a+\beta(b-a)+\gamma(c-a)$$

解出等式可以得到射线和平面的交点t，和相对于三角形的中心坐标$(\beta,\gamma)$。我们可以用2.9.2提到的重心坐标再去判断交点是否在三角形内。如果没有结果，可能是退化三角形（面积为0），或者三角形所在面和射线平行。

为了求解等式，我们把上面的等式写成坐标的形式：

$$
x_e+tx_d=x_a+\beta(x_b-x_a)+\gamma(x_c-x_a), \\
y_e+ty_d=y_a+\beta(y_b-y_a)+\gamma(y_c-y_a), \\
z_e+tz_d=z_a+\beta(z_b-z_a)+\gamma(z_c-z_a).
$$

写成矩阵形式：

$$

\begin{bmatrix} 
x_a-x_b & x_a-x_c & x_d \\
y_a-y_b & y_a-y_c & y_d \\
z_a-z_b & z_a-z_c & z_d 
\end{bmatrix}

\begin{bmatrix} 
\beta \\
\gamma \\
t
\end{bmatrix}
=
\begin{bmatrix} 
x_a-x_e \\
y_a-y_e \\
z_a-z_e 
\end{bmatrix}

$$

解决上面这个3x3线性系统的一个典型的方法就是克莱姆法则（Cramer's rule），它提供了下面的方法：


$$
\beta= \frac{

\begin{vmatrix} 
x_a-x_e & x_a-x_c & x_d \\
y_a-y_e & y_a-y_c & y_d \\
z_a-z_e & z_a-z_c & z_d 
\end{vmatrix}

}{|A|},
$$

$$
\gamma= \frac{

\begin{vmatrix} 
x_a-x_b & x_a-x_e & x_d \\
y_a-y_b & y_a-y_e & y_d \\
z_a-z_b & z_a-z_e & z_d 
\end{vmatrix}

}{|A|},
$$

$$
t = \frac{

\begin{vmatrix} 
x_a-x_b & x_a-x_c & x_a-x_e \\
y_a-y_b & y_a-y_c & y_a-y_e \\
z_a-z_b & z_a-z_c & z_a-z_e 
\end{vmatrix}

}{|A|},
$$

矩阵A为：

$$

\begin{bmatrix} 
x_a-x_b & x_a-x_c & x_d \\
y_a-y_b & y_a-y_c & y_d \\
z_a-z_b & z_a-z_c & z_d 
\end{bmatrix}

$$

3 × 3 行列式有共同的子术语可用于提高执行效率。下面是带虚拟变量的线性系统：

$$

\begin{bmatrix} 
a & d & g \\
b & e & h \\
c & f & i 
\end{bmatrix}

\begin{bmatrix} 
\beta \\
\gamma \\
t
\end{bmatrix}
=
\begin{bmatrix} 
j \\
k \\
l 
\end{bmatrix}

$$

克莱姆法则给我们提供了：

$$
\beta= \frac{
j(ei-hf)+k(gf-di)+l(dh-eg)

}{M},
$$

$$
\gamma= \frac{
i(ak-jb)+h(jc-al)+g(bl-kc)

}{M},
$$

$$
t = \frac{
f(ak-jb)+e(jc-al)+d(bl-kc)


}{M},
$$

M为：

$$
M=a(ei-hf)+b(gf-di)+c(dh-eg).

$$

我们可以重用一些数据，以减少数据操作，例如上面的"$ei-hf$"

线性的射线三角形交点的算法可以有一些提前终止的条件。因此，函数应该
看起来像：

```C++
boolean raytri (Ray r, vector3 a, vector3 b, vector3 c, interval [t0, t1])
{
  compute t
  if (t < t0) or (t > t1) then
    return false

  compute γ
  if (γ < 0) or (γ > 1) then
    return false

  compute β
  if (β < 0) or (β > 1 − γ) then
    return false

  return true
}

```

### 4.4.3 软件中的光线追踪

在光线追踪程序中，很适合用面向对象的方式设计。创建一个类似Surface这样的类，然后由Triangle，Sphere等继承。任何射线可以相交的对象都应该派生自Surface，包括成组的surfaces或efficiency structures（12.3）。这样光线追踪程序就会有整个模型表面的参照，可以透明的添加新的模型或结构。

Surface类主要接口是一个和射线求交的函数。

```c++
class Surface
{
  HitRecord hit(Ray r,real t0,real t1)
}

```

$(t_0,t_1)$是返回相交的区间，HitRecord是包含所有表面相交数据的类：

```c++
class HitRecord
{
  Surface s; // surface that was hit
  real t; // coordinate of hit poing along the ray
  Vec3 n // surface normal at the hit point
  ...
}
```

当相交发生时，t和向量n是必要的参数，其他的数据例如材质坐标或正切向量也可以存进来。考虑到不同语言，HitRecord可以通过引用传进来。如果没有相交，可以令$t=\infty$。

### 4.4.4 对象组合相交

大多数的相交场景不止一个对象，当我们计算射线与场景中的交点时，需要找到沿着射线距离相机最近的那个点。一个简单的实现是把一组对象当成是一个对象。和这组对象求交点，可以计算射线和每个对象的交点t，然后返回最小的t值。下面的测试代码计算区间$t\in[t_0,t_1]$的交点：

```c++
class Group : public Surface
{
  HitRecord hit(Ray ray,real t0,real t1)
  {
     HitRecord closest_hit(Infinite);
      for(auto surf:surfaces)
      {
         auto rec = surf.hit(ray,t0,t1);
         if(rec.t < Infinite)
         {
           closest_hit = rec;
           t1=t;
         }
      }
      return closest_hit;
  }

}
```

上面的代码中缩小的区间$[t_0,t_1]$，这样hit只会对更近的点进行计算。

完成了上面的工作，我们就可以见渲染出一张简单的图片。但是想图片的效果更好，还需要一些其他的工作。

## 4.5 Shading

知道了哪些像素可见以后，像素的值可以通过着色模型进行计算（shading model）。如何实现完全取决于应用程序，着色模型的实现方法从简单的启发式到精致的物理模型，有很多选择。完全一样的着色模型可以用在光线追踪，也能用在基于对象顺序的渲染。

第五章讲了一个简单的着色模型，适用于基本的光线追踪，本章也会用它实现渲染。更多复杂真实的模型会在十四章讨论，这里我们仅讨论如何从光线追踪到着色。

### 4.5.1 光源

为了支持着色，一个光线追踪程序会支持一系列的点光源。在第五章的着色模型介绍，我们有三种光源：点光源，平行光源（从同一个方向发光），环境光（Ambient lights）。从点光源或者平行光源计算着色需要固定的几何信息，在光线追踪中，我们需要确定下面四个向量：

- 着色点x可以通过射线在交点的t值计算。
- 面法向量n取决于表面的类型（球，三角形等），每个表面需要在射线与其相交的时候计算法向量。
- 光源方向l从光源位置或方向计算。
- 观测方向v就是射线取反的单位向量。

计算一个场景内多个光源着色，只需要将多个光源相加即可。

### 4.5.2 软件中的着色

光线追踪软件中一般都会包含光源和材质。光源可以是继承自Light的派生类对象，需要包含足够数据描述光源。材质封装了需要计算着色模型的所有数据。

不同的系统对光源和材质的着色模型的计算方法也不同。一个和本章前面内容一致的方法是：光源负责整体的照明计算，材质负责BRDF的值计算，类的接口类似下面这样：

```C++
class Light
{
  Color illuminate(Ray ray,HitRecord hrec);

}

class Material
{
  Color evaluate(Vec3 l, Vec3 v, Vec3 n);
}
```

每个面都会存一个材质的引用，按照这样的思路，点光源的照明实现类似下面这样：

```C++
class PointLight::Light
{
  Color I;
  Vec3 p;
  Color illuminate(Ray ray, HitRecord hrec)
  {
    Vec3 x = ray.evaluate(hrec.t);
    real r = ||p − x||;
    Vec3 l = (p − x)/r;
    Vec3 n = hrec.normal;
    Color E = max(0, n · l) I/r2;
    Color k = hrec.surface.material.evaluate(l, v, n);
    return kE;
  }
}

```

上面的计算基于Color类是通过RGB分量定义的情况，且支持分量的乘法计算。通过使环境系数成为材料的属性，这种布置还可以将环境光视为光源：

```c++

class AmbientLight::Light
{
  Color Ia;
  Color illuminate(Ray ray, HitRecord hrec)
  {
    Color Ka = hrec.surface.material.ka;
    return ka Ia;
  }
}

```

对光线着色完整的计算如下，包括交点和多灯光处理：

```c++

Color ShadeRay(Ray ray,real t0,real t1)
{
  HitRecord rec = scene.hit(ray,t0,t1);
  if(rec.t < ∞)
  {
    Color c = 0;
    for(auto light: scene.lights )
    {
      c = c + light.illuminate(ray,rec);
    }

    return c;
  }
  else
  {
    return backgroundColor;
  }
}

```

### 4.5.3 阴影

光线追踪处理了基本的着色后，继而可以轻松添加阴影。我们想象自己在表面的一点x上，如果从这一点看向光源，发现有其他对象挡在中间，那么这个点就是在阴影处。

看向光源的方向可以写作射线$x+tl$,为了和观测的射线区分，我们称它为阴影射线（shadow rays）。

在着色算法中，我们需要先判断一下着色点是不是在阴影中。原生实现中，阴影射线需要判断$t \in [0,r]$，考虑到数字的精度，可能会把点所在的表面计算出与之相交，为了避免这个问题，可以判断$t \in [\epsilon,r]$。 $\epsilon$是一个很小的常量正值。

阴影的判断可以加在点光源照明的计算中：

```
HitRecord srec = scene.hit(Ray(x,l),ε,r)
if srec.t < ∞ then
  proceed with normal illumination calculation
else
  return 0 // shading point is in shadow

```

直接光源的计算也是类似的，只需要用$t_1=\infty$取代$r$。需要注意每个光线的照明计算需要不同阴影射线，并且没有阴影判断能计算环境光着色。

### 镜面反射

为一个光线追踪程序添加镜面反射很容易，如图4.16，我们从观测方向e看到从表面上方向r反射的光线。向量r是向量-d基于法向量n的镜像，可以通过表面法向量计算出来：

$$ r= d-2(d\cdot n)n$$

<div style="text-align: center">
<img src="/img/posts/4 Ray Tracing/5.png"/>
</div>

在真实世界中，能量一般在反射时会有一定的损失，而这些损失可能会因颜色不同而不同。比如金属反射黄色的损失比蓝色更少。我们可以通过实现一个shade_ray递归算法，在光线计算后调用：

```c++
color c= c+ Km * shade_ray(Ray(p,r),ε,∞)

```

Km是镜面反射的RGB颜色。上面这个算法的问题是，它可能不会停止。我们可以通过添加一个最大递归深度解决这个问题。

用一个固定的镜面反射系数Km提供简单的镜面效果；在真实世界中，这个系数会根据入射角度变化。更好的模型，可以参考第十四章。