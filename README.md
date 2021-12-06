# elvin

## 介绍

elvin 是 web 系统监控。

它可以监控 页面性能,http 请求耗时，资源加载错误，JS 错误捕获等……

## 使用

elvin 分为 elvin-js 数据上报，elvin-api 消费上报的数据，elvin-web 管理后端

```typescript
//启动后端:

git clone https://github.com/galaxy-softwares/elvin-api

go run main.go

//启动管理端：

git clone https://github.com/galaxy-softwares/elvin-web.git

yarn && yarn dev

```

登录进后台, 注册完成后进入后台, 点击+号创建项目。

![img](https://s3.bmp.ovh/imgs/2021/12/67ddbb97aa5b4459.png)

![img](https://s3.bmp.ovh/imgs/2021/12/d969edcca6d74066.png)

![img](https://s3.bmp.ovh/imgs/2021/12/550513703b626950.png)

```js

//数据上报：
git clone https://github.com/galaxy-softwares/elvin-js.git

yarn && yarn build

// 编译成功后打开 lib 文件，复制 index.js 文件到vue项目得public下, 并输入

<script>
    !(function(sdk, monitorId) {
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = sdk
      script.onload = function() {
        window['elvin-js'] && window['elvin-js'].init({
          monitorId: monitorId,
        })
      };
      head.appendChild(script);
    })("./index.js", "monitor_id1638788404");
  </script>

// 开启vue bug 捕获
// 在vue main.js 下， 即可触发js时，elvin-js 可以抓取到vue 报错。
Vue.use(window["elvin-js"].RportVue)
```

[![osxylT.png](https://s4.ax1x.com/2021/12/06/osxylT.png)](https://imgtu.com/i/osxylT)

## 项目预览

[![oyp9eg.png](https://s4.ax1x.com/2021/12/06/oyp9eg.png)](https://imgtu.com/i/oyp9eg)

[![osz1HJ.png](https://s4.ax1x.com/2021/12/06/osz1HJ.png)](https://imgtu.com/i/osz1HJ)

[![oySIsO.png](https://s4.ax1x.com/2021/12/06/oySIsO.png)](https://imgtu.com/i/oySIsO)

[![oySoLD.png](https://s4.ax1x.com/2021/12/06/oySoLD.png)](https://imgtu.com/i/oySoLD)
