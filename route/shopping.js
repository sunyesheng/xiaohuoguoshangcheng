//导入express框架
const express = require('express');

//创建路由
const shopping = express.Router();

//导入模型sql模块
const userInfo = require('../model/userinfo');
const goodsinfo = require('../model/goodsinfo');

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
            /**
             * 将用户信息保存到session中
             */
            const userinfobyemail = await userInfo.isOnlyEmail(req.session.email);

            //将用户信息保存到session中打uname属性
            req.session.uname = userinfobyemail[0].username;
            //console.log(req.session.uname);
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
    return;
})
//渲染登录界面 首页打
shopping.get('/', (req, res) => {
    res.render('shopping/login');
})
shopping.get('/index', async (req, res) => {
    //判断session中是否存储了 email信息 如果存储了改信息 则不用登录可以进入 若未存储 则需要登录进入
    //console.log(!!req.session.email);
    // if (!!req.session.email) {
    //     res.render('shopping/index');
    // }
    // else {
    //     //res.render('shopping/login');
    //     res.redirect('/')
    const allgoods = await goodsinfo.goodsinfo.selectAllinfo();
    //console.log(allgoods);
    //分类进行渲染
    const onegoods = allgoods.slice(1, 4);
    const twogoods = allgoods.slice(4, 7);
    const threegoods = allgoods.slice(7, 10);
    const forgoods = allgoods.slice(10, 13);
    //console.log(onegoods);
    // }
    res.render('shopping/index', {
        //将session中打uname渲染
        myuinfo: req.session.uname,

        //将3*4中商品进行渲染
        onegoods: onegoods,
        twogoods: twogoods,
        threegoods: threegoods,
        forgoods: forgoods,

    })
})
shopping.get('/404', (req, res) => {
    res.render('shopping/404');
})

//查询框子
shopping.get('/serch', async (req, res) => {

    //进行判断 
    if (!!req.query.keywords) {
        //根据请求打关键字进行查询
        const keygoods = await goodsinfo.goodsinfo.selectInfoByTypeMohu(req.query.keywords);
        //相应
        return res.render('shopping/cart/serch', {
            allgoodsinfo: keygoods,
            myuinfo: req.session.uname
        })
    }
    if (!req.query.keygoods) {
        return res.send({ status: 201 });
    }


    // console.log(req.query.keywords);
    // //根据关键字进行查询
    // const keygoods = await goodsinfo.goodsinfo.selectInfoByTypeMohu(req.query.keywords);
    // //console.log(keygoods);
    // //渲染模板

    // if (!!keygoods) {
    //     return res.render('shopping/cart/serch', {
    //         allgoodsinfo: keygoods,
    //         myuinfo: req.session.uname
    //     })
    // }
    // return res.send({ status: 201 });
})

//分类渲染商品
shopping.get('/diliao', async (req, res) => {

    const allgoodsinfo = await goodsinfo.goodsinfo.selectInfoByType('火锅底料');
    res.render('shopping/cart/diliao', {
        allgoodsinfo: allgoodsinfo,
        //将用户信息传递到客户端
        myuinfo: req.session.uname

    });
})


//跳转到我的购物车页面
shopping.get('/mycart', async (req, res) => {
    const allgoodsinfo = await goodsinfo.goodsinfo.selectInfoByType('素菜');
    //console.log(allgoodsinfo);
    res.render('shopping/mycart', {
        allgoodsinfo: allgoodsinfo,
        //将用户信息传递到客户端
        myuinfo: req.session.uname

    });
});



shopping.get('/sucai', async (req, res) => {
    const allgoodsinfo = await goodsinfo.goodsinfo.selectInfoByType('素菜');
    //console.log(allgoodsinfo);
    res.render('shopping/cart/sucai', {
        allgoodsinfo: allgoodsinfo,
        //将用户信息传递到客户端
        myuinfo: req.session.uname

    });
})
shopping.get('/huncai', async (req, res) => {

    const huncaigood = await goodsinfo.goodsinfo.selectInfoByType('荤菜');
    //console.log(huncaigood);
    res.render('shopping/cart/huncai', {
        allgoodsinfo: huncaigood,
        //将用户信息传递到客户端
        myuinfo: req.session.uname

    });
})
shopping.get('/zhushi', async (req, res) => {

    const allgoodsinfo = await goodsinfo.goodsinfo.selectInfoByType('主食');
    //console.log(allgoodsinfo);
    res.render('shopping/cart/zhushi', {
        allgoodsinfo: allgoodsinfo,
        //将用户信息传递到客户端
        myuinfo: req.session.uname

    });
})

//退出登录功能路由
shopping.get('/loginout', (req, res) => {
    //console.log(req.query.loginout);
    //重新定向到登录界面 删除cookie
    res.clearCookie('connect.sid');
    //res.render('shopping/login');
    //res.send('hell')
    //res.send('/');
    //向客户端发送 成功通知
    res.send({ status: 200 });
})

//对于商品分类渲染打路由
shopping.get('/cart', async (req, res) => {
    //进行全部数据打渲染数据打渲染
    //console.log('====================================');
    //console.log(req.session.uname);
    //console.log('====================================');
    //console.log(req.query);
    const allgoodsinfo = await goodsinfo.goodsinfo.selectAllinfo();
    res.render('shopping/cart', {
        //所有打商品数据
        allgoodsinfo: allgoodsinfo,
        //将用户信息传递到客户端
        myuinfo: req.session.uname
    });
})



//导出路由对象
module.exports = shopping;