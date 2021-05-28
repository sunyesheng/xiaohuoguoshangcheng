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
        db.query('SELECT * from orderinfo', (err, result) => {
            if (err) { return console.log(err.message); }
            console.log(result);
        });
    }
}

//导出userinfo模块
module.exports = {
    orderinfo
}