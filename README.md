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


文件说明：<br><br>
    一、resource文件夹<br>
          此文件夹是本次demo的设计稿等<br>
          <br>
    二、static文件夹下的reset.css文件<br>
          此文件是CSS样式的初始化样式<br>
          <br>
    三、data.json文件<br>
          此文件是模拟后台数据的json文件<br>
          <br>
    四、src文件夹<br>
          此文件夹是本次demo主要代码所在<br>
          1.common文件夹<br>
              此文件夹是demo公共代码区<br>
              （1）fonts文件夹<br>
                    自制图标文件<br>
              （2）js文件夹<br>
                    ·bus.js      新的Vue实例<br>
                    ·date.js     把时间轴转化为yyyy:MM:dd hh:mm:ss格式<br>
                    ·store.js    本地存储读取数据<br>
                    ·util.js     解析url参数<br>
              （3）stylus文件夹<br>
                    ·base.styl   公共样式<br>
                    ·icon.styl   自制图标样式<br>
                    ·mlxin.styl  一像素样式<br>
                    ·index.styl  把前三者引入此文件，以方便样式在main.js中引用<br>
          2.components文件夹<br>
              此文件夹是demo组件代码区<br>
              （1）cartcontrol    购物小球组件<br>
              （2）food           商品详情页组件<br>
              （3）goods          商品组件<br>
              （4）header         头部组件<br>
              （5）ratings        评论组件<br>
              （6）ratingselect   评论类型选择组件<br>
              （7）seller         商家组件<br>
              （8）shopcart       底部购物车组件<br>
              （9）split          分割线组件<br>
              （10）star          评分星级组件<br>
          3.router文件夹<br>
              此文件夹是demo路由代码区<br>
