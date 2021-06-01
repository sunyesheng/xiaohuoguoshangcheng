//导入express框架
const express = require('express');

//导入user数据库模块
const userInfo = require('../model/userinfo');

//引入商品数据库模块
const goodsinfo = require('../model/goodsinfo');

//引入文件处理模块
const multer = require('multer');

//创建路由
const admin = express.Router();

//增加商品的表单提交 post
admin.post('/addgoods', async (req, res) => {
    //text
    //console.log(req.body.name);
    //res.send('hello world');
    //console.log(res.body);

    //构造一个对象 将req返回的数据进行包装后 插入到数据库
    const goodObj = {
        goodsname: req.body.name,
        goodprice: req.body.price,
        goodimg: req.body.imgurl,
        goodtype: req.body.goodstype,
        description: req.body.descript
    }
    //console.log(goodObj);

    //调用插入商品信息打方法 并且进行异常捕获
    try {
        const resinfo = await goodsinfo.goodsinfo.insertGood(goodObj);

        //相应请求 告诉客户端插入成功
        return res.send({
            //200 告诉客户端插入成功
            status: 200

        });


    } catch (error) {
        console.log(error);
        return res.send({
            //201 告诉客户端插入失败
            status: 201

        });
    }
    // resinfo.then(() => { }, (e) => {
    //     console.log('wrong');
    // })
    // console.log(resinfo);
});

//当访问的是/admin 跳转到后台界面
admin.get('/', async (req, res) => {

    //console.log(req);

    //解析get字符串的方法
    const transform = function (str) {
        // 创建目标对象
        var $_REQUEST = new Object,
            // 截取数据字符串
            data = str.slice(str.indexOf("?"), str.length),
            // 将数据字符串表现为数组
            aParams = data.substr(1).split("&");
        for (i = 0; i < aParams.length; i++) {
            // 数据属性与数值分离
            var aParam = aParams[i].split("=");
            // 使用属性括号进行属性赋值
            $_REQUEST[aParam[0]] = aParam[1]
        }
        return $_REQUEST;
    };

    //text
    //console.log(req.url);

    // if (req.url != '/') {
    //     console.log(transform(req.url));
    //     console.log(transform(req.url).pages);
    // }

    //从数据库中查询 并渲染到模板中 结果是一个数组
    const infos = await userInfo.selectByPage(1);
    //console.log(infos);

    //获取全部打商品信息数据 并且渲染到页面中
    const allgoodsinfo = await goodsinfo.goodsinfo.selectAllinfo();
    //console.log(allgoodsinfo);

    //获取全部数据 除以每页显示的数据 得到页码
    const allinfo = await userInfo.selectAllInfo();
    const pages = Math.ceil(allinfo.length / 5);
    //console.log(allinfo);

    //text
    //console.log(pages);

    //text
    //return res.send(transform(req.url))

    //从商品数据库中查询所有打信息进行渲染

    res.render('admin/admin', {
        //查询所有打goodsinfo
        allgoodsinfo: allgoodsinfo,
        //查询到的信息
        msg: allinfo,
        //页码数量
        pages: pages
        //当前页码
    })
})

admin.get('/404', (req, res) => {
    res.render('shopping/404')
})

//导出路由对象
module.exports = admin;