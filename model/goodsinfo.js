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
const goodsinfo = {
    //用来测试的方法 查询所有的信息
    selectAllinfo: function () {
        return new Promise((res, rej) => {
            db.query('SELECT * FROM GOODSINFO', (err, result) => {
                if (err) { rej(err); }
                res(result);
            })
        })
    },
    //用来向数据库中插入数据的方法
    insertGood: function (goodObj) {
        return new Promise((res, rej) => {
            db.query(`INSERT INTO GOODSINFO VALUES ("${goodObj.goodsname}","${goodObj.goodprice}","${goodObj.goodimg}","${goodObj.goodtype}","${goodObj.description}")`, (err, result) => {
                if (err) { rej('insert goodsinfo wrong') }
                res(result);
            })
        })
    },
}

//导出userinfo模块
module.exports = {
    goodsinfo
}