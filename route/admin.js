//导入express框架
const express = require('express');
//创建路由
const admin = express.Router();

admin.get('/', (req, res) => {
    res.render('admin/admin')
})


//导出路由对象
module.exports = admin;