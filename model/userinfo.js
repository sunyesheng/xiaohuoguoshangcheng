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
    //根据email查询用户信息 返回一个布尔值 判断邮箱是否被注册
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
        db.query(`INSERT INTO USERINFO VALUES ("${userObj.email}","${userObj.username}","${userObj.password}","${userObj.role}")`, (err, result) => {
            if (err) { return 'user is exit'; }
            else return 'suuccess';
        }
        );
    }
}

//导出userinfo模块
module.exports = {
    userinfo
}