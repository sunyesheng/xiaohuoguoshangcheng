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
const orderinfo = {
    //用来测试的方法
    selectByone: function () {
        return new Promise((res, rej) => {
            db.query('SELECT * FROM ORDERINFO', (err, result) => {
                if (err) { rej(err); }
                res(result);
            });
        })
    },
    //插入订单的方法
    insertInfo: function (orderObj) {
        return new Promise((res, rej) => {
            db.query(`INSERT INTO ORDERINFO VALUES ("${orderObj.uemail}","${orderObj.goodname}","${orderObj.goodprice}","${orderObj.orderid}")`, (err, result) => {
                if (err) { rej(err); }
                res(result);
            });
        })
    },
    //根据邮箱查询
    selectByemail: function (uemail) {
        return new Promise((res, rej) => {
            db.query(`SELECT * FROM ORDERINFO WHERE UEMAIL="${uemail}"`, (err, result) => {
                if (err) { rej(err); }
                res(result);
            })
        })
    }

}

//导出userinfo模块
module.exports = {
    orderinfo
}