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
    //查询所有的购物车信息
    selectAllInfo: function () {
        return new Promise((res, rej) => {
            db.query('SELECT * FROM CARTINFO', (err, result) => {
                if (err) { rej(err); }
                res(result);
            })
        })
    },
    //根据email查询信息
    selectInfoByEmail: function (uemail) {
        return new Promise((res, rej) => {
            db.query(`SELECT * FROM CARTINFO WHERE UEMAIL="${uemail}"`, (err, result) => {
                //console.log(`SELECT * FROM CARTINFO WHERE UEMAIL='${{ uemail }}'`);
                if (err) { rej(err); }
                res(result);
            })
        })
    },
    //插入购物车商品
    insertOneGoodInfo: function (goodObj) {
        return new Promise((res, rej) => {
            db.query(`INSERT INTO CARTINFO VALUES ("${goodObj.uemail}","${goodObj.goodname}","${goodObj.goodprice}")`, (err, result) => {
                if (err) { rej(err); }
                res(result);
            })
        })
    },
    //删除购物车中打商品
    deleteGoodInfoByname: function (gname) {
        return new Promise((res, rej) => {
            db.query(`DELETE FROM CARTINFO WHERE GOODNAME="${gname}" LIMIT 1`, (err, result) => {
                if (err) { rej(err); }
                res(result);
            })
        })

    }
}
//导出userinfo模块
module.exports = cartinfo;