---
layout: post
title: "FOCG5: 9.图形管线"
subtitle: "FOCG5: 9 The Graphics Pipeline"
background: '/img/posts/01.jpg'
---

<div style="text-align: center">
<img src="/img/posts/9 The Graphics Pipeline/1.png"/>
</div>

在前面的章节中，我们已经建立了数学基础，现在需要进入渲染的第二步：在屏幕上逐个绘制对象。和光线追踪不同，光线追踪会依次计算每个像素，再去找影响这个像素的对象，而图形管线则是依次计算每个对象，再去找影响这个对象的像素。通过基本几何元素找到图像中所有像素的过程称为光栅化，光栅化的过程是连续性的，从几何对象开始，到像素结束，这个过程称为图形管线。

本章目标就是讨论下图中图形管线的四个阶段：顶点处理、光栅化、像素处理和像素混合。

<div style="text-align: center">
<img src="/img/posts/4 Ray Tracing/1.png"/>
</div>


## 9.1 光栅化

光栅化是图形管线的重点，对于每个基本几何元素，光栅化都会计算出它覆盖的像素，并通过插值计算出每个像素的属性。光栅化的输出叫做片段（`fragments`），片段是一个像素的属性集合，包括位置、颜色、法线、纹理坐标等。

本章我们将通过一个光栅化渲染一个三维场景，同样的方法也能用来渲染二维场景。

### 9.1.1 直线绘制

### 9.1.2 三角形绘制
### 9.1.3 透视矫正插值 Perspective Correct Interpolation
### 9.1.4 裁剪 Clipping 
