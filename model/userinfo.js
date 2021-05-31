//导入mysql模块
const mysql = require('mysql');

//建立与mysql连接
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'gshop'
});

//建立userinfo
const userinfo = {
    //查询所有的信息 的方法 异步处理方法
    selectAllInfo: function () {
        return new Promise((res, rej) => {
            db.query('SELECT * FROM USERINFO', (err, result) => {
                if (err) { rej(err); }
                res(result);
            })
        })
    },
    //根据姓名查询用户信息 返回的是一个数组 数组中每一项为查询到的对象
    selectByName: function (uname) {
        return new Promise((res, rej) => {
            db.query(`SELECT * FROM USERINFO WHERE USERNAME = "${uname}"`, (err, result) => {
                if (err) { rej(err); }
                res(result);
            })
        })
    },
    //根据邮箱查询用户信息 返回数据
    selectByEmail: function (uemail) {
        return new Promise((res, rej) => {
            db.query(`SELECT * FROM USERINFO WHERE EMAIL = "${uemail}"`, (err, result) => {
                if (err) { rej('0'); }
                res(result);
            })
        })
    },
    //根据email查询用户信息 判断邮箱是否被注册
    isOnlyEmail: function (uemail) {
        return new Promise((res, rej) => {
            db.query(`SELECT * FROM USERINFO WHERE EMAIL = "${uemail}"`, (err, result) => {
                if (err) { rej(err); }
                res(result);
            })
        })
    },
    //注册用户email
    addUser: function (userObj) {
        return new Promise((res, rej) => {
            db.query(`INSERT INTO USERINFO VALUES ("${userObj.email}","${userObj.username}","${userObj.password}","${userObj.role}","${userObj.address}")`, (err, result) => {
                if (err) { return '0' }
                return '1';
            })
        })
    },
    //用来分页的功查询  每5条一分页
    selectByPage: function (pagenum) {
        return new Promise((res, rej) => {
            db.query(`SELECT * FROM USERINFO LIMIT ${pagenum * 5 - 4},${5}`, (err, result) => {
                //text
                //console.log(`SELECT * FROM USERINFO LIMIT ${pagenum * 5 - 4},${pagenum * 5}`);
                if (err) { rej(err) }
                res(result);
            })
        })
    },
}


//导出userinfo模块
module.exports = userinfo;