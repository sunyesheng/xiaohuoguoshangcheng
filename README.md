```
service
├─ app.js                      项目的入口文件
├─ middleware                  中间件
│  └─ middle.js                进行session认证的中间件
├─ model                       数据层
│  ├─ cartinfo.js              购物车数据
│  ├─ goodsinfo.js             商品数据
│  ├─ orderinfo.js             订单数据
│  └─ userinfo.js              用户数据
├─ package-lock.json           项目配置文件
├─ package.json                项目依赖的包配置文件
├─ public                      开放的静态资源
│  ├─ admin                    后台页面文件夹
│  │  ├─ css                   样式表
│  │  ├─ img                   图片存放
│  │  └─ js                    前端js代码 进行动态交互与ajax请求
│  ├─ commin.js                后台管理与用户页面公共部分抽离js代码
│  ├─ shopping                 用户页面文件夹
│  │  ├─ css                   CSS样式表
│  │  ├─ fonts                 字体文件夹
│  │  ├─ img                   图片存放
│  │  └─ js                    前端js代码 进行动态交互与ajax请求
│  └─ upload                   进行文件上传 文件的存放路径
├─ route                       路由管理模块
│  ├─ admin.js                 后台管理路由
│  └─ shopping.js              用户页面路由
└─ views                       渲染模板所在的文件夹
   ├─ admin                    后台渲染模板
   └─ shopping                 用户页面模板
```