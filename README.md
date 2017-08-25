# vue-sell

> vue高仿饿了吗

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 文件说明：

## resource文件夹
> 此文件夹是本次demo的设计稿等
          
## static文件夹下的reset.css文件
> 此文件是CSS样式的初始化样式
          
## data.json文件
> 此文件是模拟后台数据的json文件
          
## src文件夹
> 此文件夹是本次demo主要代码所在

### common文件夹
> 此文件夹是demo公共代码区

#### fonts文件夹
> 自制图标文件

#### js文件夹
> ·bus.js      新的Vue实例
  ·date.js     把时间轴转化为yyyy:MM:dd hh:mm:ss格式
  ·store.js    本地存储读取数据
  ·util.js     解析url参数

#### stylus文件夹
> ·base.styl   公共样式
  ·icon.styl   自制图标样式
  ·mlxin.styl  一像素样式
  ·index.styl  把前三者引入此文件，以方便样式在main.js中引用

### components文件夹
> 此文件夹是demo组件代码区

#### cartcontrol
> 购物小球组件

#### food           
> 商品详情页组件

#### goods          
> 商品组件

#### header         
> 头部组件

#### ratings        
> 评论组件

#### ratingselect   
> 评论类型选择组件

#### seller         
> 商家组件

#### shopcart       
> 底部购物车组件

#### split          
> 分割线组件

#### star          
> 评分星级组件

### router文件夹
> 此文件夹是demo路由代码区
