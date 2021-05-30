//导入express框架
const express = require('express');

//创建路由
const shopping = express.Router();

//导入模型sql模块
const userInfo = require('../model/userinfo')

//实现登录的功能 当点击登录后 进行的一系列过程
//包括 数据比对 页面跳转 错误跳转404
shopping.post('/login', async (req, res) => {
    //测试
    // console.log(req.body.email.trim().length);
    // console.log(req.body.password.trim().length);

    //对账号密码进行二次验证 如果账号或者密码为空 则返回对象
    if (req.body.email.trim().length == 0 || req.body.password.trim().length == 0) {
        return res.send({ status: 300 })
    };

    //对于接受回来的数据 与数据库的进行匹配 如果能匹配上 则返回status=200 否则返回300
    const userObj = await userInfo.selectByEmail(req.body.email.trim());

    //根据邮箱查询 如果为空 则返回202 表示邮箱没有注册
    if (userObj.length == 0) {
        return res.send({ status: 202 })
    }
    else {
        //测试
        // console.log(req.body.email.trim());
        // console.log(userObj[0].password);

        //进行判断 如果role的值为0 证明其为管理员 发送status的值为203
        if (userObj[0].role == 0) {
            return res.send({ status: 203 });
        }
        //如果密码和数据库中的密码能对的上 则返回200 可以进行登录
        if (userObj[0].password && userObj[0].password == req.body.password.trim()) {
            //存储session信息 不用下次登录
            req.session.email = req.body.email;
            return res.send({ status: 200 });
        }

        //如果账号和密码对不上 则返回 201
        if (!userObj[0].password || userObj[0].password != req.body.password.trim()) {
            return res.send({ status: 201 });
        }

    }
});

//实现注册功能的路由
shopping.post('/register', async (req, res) => {
    //console.log(req.body);
    //向数据库中插入注册的新用户


    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //对于数据进行二次判断 先略过 最后再写

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //将请求的数据包装成一个对象
    const userObj = {
        email: req.body.email,
        username: req.body.name,
        password: req.body.password,
        //此处默认所有的注册用户均不是管理员
        role: "1",
        address: req.body.adress
    }
    //console.log(`INSERT INTO USERINFO VALUES ("${userObj.email}","${userObj.username}","${userObj.password}","${userObj.role}","${userObj.address}")`);
    //再次 如果返回值为1 则证明添加成功 否则失败 失败原因为 主键冲突

    //根据邮箱进行查询 若能查询到值 则返回主键冲突
    const isonly = await userInfo.isOnlyEmail(req.body.email);
    //console.log(isonly.length != 0);
    if (isonly.length != 0) {
        return res.send({ status: 201 });
    }
    //异步等待进行数据库插入 此处异步出现问题 需要两步发送状态码 以确认成功发送
    //完成全部后 需进行优化
    res.send({ status: 200 });
    await userInfo.addUser(userObj);
    return res.send({ status: 200 });
})

shopping.get('/', (req, res) => {
    res.render('shopping/login');
})
shopping.get('/index', (req, res) => {
    //判断session中是否存储了 email信息 如果存储了改信息 则不用登录可以进入 若未存储 则需要登录进入
    //console.log(!!req.session.email);
    // if (!!req.session.email) {
    //     res.render('shopping/index');
    // }
    // else {
    //     //res.render('shopping/login');
    //     res.redirect('/')
    // }
    res.render('shopping/index')
})
shopping.get('/404', (req, res) => {
    res.render('shopping/404');
})
shopping.get('/cart', (req, res) => {
    res.render('shopping/cart');
})



//导出路由对象
module.exports = shopping;