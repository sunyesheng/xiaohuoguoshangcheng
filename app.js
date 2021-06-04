//导入express框架
const express = require('express');

//导入morgan模块
const morgan = require('morgan');

//导入模板
const template = require('art-template');

//session模块
const session = require('express-session');

//处理路径拼接 问题
const path = require('path');

//处理post请求 引入body-parser模块
const bodyparser = require('body-parser');

//引入时间处理模块
const dataformat = require('dataformat');

//创建实例
const app = express();

//告诉模板放在那个文件夹中 
app.set('views', path.join(__dirname, 'views'));

//处理post请求
app.use(bodyparser.urlencoded({ extended: false }));

//登录成功后保存用户信息 配置session
app.use(session({
    resave: false, //添加 resave 选项
    saveUninitialized: true, //添加 saveUninitialized 选项
    secret: 'aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60 * 1000 * 60 } //60分钟后过期
}));

//告诉默认模板后缀
app.set('view engine', 'art');

//当渲染后缀为art时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

//托管静态资源 将静态资源开放访问
app.use(express.static(path.join(__dirname, 'public')));

//引入路由模块
const shopping = require('./route/shopping');
const admin = require('./route/admin');

//进行登录拦截 查看是否已经登录 如果没有登录 则进不去页面
app.use('/index', require('./middleware/middle'));
app.use('/404', require('./middleware/middle'));
app.use('/cart', require('./middleware/middle'));
app.use('/myinfo', require('./middleware/middle'));
app.use('/myorder', require('./middleware/middle'));
app.use('/goodinfo', require('./middleware/middle'));
app.use('/allgoods', require('./middleware/middle'));
app.use('/mycart', require('./middleware/middle'));



//拦截请求
app.use('/', shopping);
app.use('/admin', admin);



//进行模块分离操作
// //导入数据库文件 userinfo的模块
// const dba = require('./model/goodsinfo');

//进行测试 数据库功能 可用
/*------------------------------------------------------------------------------------------------------- */
//测试查询全部的数据功能是否好用
// var ss = async function () {
//     var a = await dba.userinfo.selectAllInfo();
//     console.log(a);
// };
// var ss1 = async function () {
//     var a = await dba.userinfo.selectByName('孙业盛');
//     console.log(a);
// };
// var ss2 = async function () {
//     var a = await dba.userinfo.isOnlyEmail('1481633100@qq.com');
//     console.log(a);
// };
// var my = {
//     email: "987654321@qq.com",
//     username: "樊子睿",
//     password: "123456",
//     role: "1"
// }
// dba.userinfo.addUser(my);
// var text = async function () {
//     var a = await dba.goodsinfo.selectAllinfo();
//     console.log(a);
// }
// text();
/*------------------------------------------------------------------------------------------------------- */
//

//监听默认的80端口 后执行回调函数
app.listen(80, function () {
    //本地的端口查看 监听成功后则打印该文字
    console.log('hello world http://127.0.0.1');
});
