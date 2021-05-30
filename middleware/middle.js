const middle = (req, res, next) => {
    //判断是否已经登录 没有登录则跳转到登录界面 登录了则可以访问
    if (req.rul != '/' && !req.session.email) {
        res.redirect('/')
    }
    else {
        next();
    }
}


module.exports = middle;