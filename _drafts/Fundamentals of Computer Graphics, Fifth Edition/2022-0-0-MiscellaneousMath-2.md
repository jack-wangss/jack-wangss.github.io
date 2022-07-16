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



### 2.7.2 2D梯度 The 2D Gradient

### 2.7.3 3D隐式曲面 3D Implicit Surfaces

### 2.7.4 隐式曲面的法向量 Surface Normal to an Implicit Surface

### 2.7.5 隐式平面 Implicit Planes

### 2.7.6 2D参数曲线 2D Parametric Curves

### 2.7.7 3D Parametric Curves

### 2.7.8 3D Parametric Surfaces

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