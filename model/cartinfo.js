//导入mysql模块
const mysql = require('mysql');
//建立与mysql连接
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'gshop'
});

//建立cartinfo
const cartinfo = {
    //查询所有打购物车信息
    selectAllInfo: function () {
        return new Promise((res, rej) => {
            db.query('SELECT * FROM CARTINFO', (err, result) => {
                if (err) { rej(err); }
                res(result);
            })
        })
    },
}
//导出userinfo模块
module.exports = cartinfo;