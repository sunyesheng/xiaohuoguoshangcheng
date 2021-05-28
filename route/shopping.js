//导入express框架
const express = require('express');

//创建路由
const shopping = express.Router();


shopping.get('/', (req, res) => {
    res.render('shopping/login');
})
shopping.get('/index', (req, res) => {
    res.render('shopping/index');
})
shopping.get('/404', (req, res) => {
    res.render('shopping/404');
})
shopping.get('/cart', (req, res) => {
    res.render('shopping/cart');
})



//导出路由对象
module.exports = shopping;