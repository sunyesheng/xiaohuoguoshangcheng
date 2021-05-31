//导入express框架
const express = require('express');

//导入user数据库模块
const userInfo = require('../model/userinfo');

//创建路由
const admin = express.Router();

//当访问的是/admin/userinfo时 跳转到后台界面
admin.get('/', async (req, res) => {

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



    console.log(req.url);

    if (req.url != '/') {
        console.log(transform(req.url));
        console.log(transform(req.url).pages);
    }

    //从数据库中查询 并渲染到模板中 结果是一个数组
    const infos = await userInfo.selectByPage(3);
    //console.log(infos);

    //获取全部数据 除以每页显示的数据 得到页码
    const allinfo = await userInfo.selectAllInfo();
    const pages = Math.ceil(allinfo.length / 5);
    console.log(pages);

    res.render('admin/admin', {
        //查询到的信息
        msg: infos,
        //页码数量
        pages: pages
        //当前页码
    })
})

//导出路由对象
module.exports = admin;