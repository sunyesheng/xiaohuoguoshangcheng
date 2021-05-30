//导入express框架
const express = require('express');

//创建路由
const admin = express.Router();

//当访问的是/admin时 跳转到后台界面
admin.get('/', (req, res) => {
    res.render('admin/admin')
})


//导出路由对象
module.exports = admin;