document.querySelector('.img_btn').addEventListener('click', function () {
    document.querySelector('.container').classList.toggle('s--signup')
});
$('#login').on('click', () => {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1",
        data: {
            bookname: '孙业盛'
        },
        dataType: "dataType",
        success: function (res) {
            console.log(res);
        }
    });
});

//当点击两个input时 提示的错误信息消失
$('input').on('click', () => {
    $('#wrongep').css('visibility', 'hidden');
    $('#msginfo').css('visibility', 'hidden');
});

//取消登录表单的默认跳转 改为通过ajax发送请求
$('#loginform').on('submit', function () {
    // //发送post请求 必须设置name
    // var result = serializeToJson($(this));
    // if (result.email.trim().length == 0) {
    //     //阻止程序向下执行
    //     return false;
    // }
    // //
    // if (result.password.trim().length == 0) {
    //     return false;
    // }
    return false;
});

//取消注册表单的默认跳转
$('#zhuceform').on('submit', function () {
    // var result = serializeToJson($(this));
    return false;
});

//发送登录的请求
$('#loginbtn').on('click', () => {
    $.ajax({
        type: 'POST',
        url: '/login',
        data: serializeToJson($('#loginform')),
        success: function (res) {
            // console.log(res.status);
            //如果返回的信息是200 则进行页面跳转到 index页面
            if (res.status == 200) {
                location.href = '/index';
            }
            //如果是300 则应是浏览器进制了js 无法通过客户端验证
            if (res.status == 300) {
                //弹出警告框
                $('#wrongep').text('请输入账号密码').css('visibility', 'visible');
            }
            //201 表示账号或者密码错误
            if (res.status == 201) {

                $('#wrongep').text('账号或者密码有误，请重新输入').css('visibility', 'visible');
            }
            //202表示不存在改邮箱 该邮箱未注册 请先注册
            if (res.status == 202) {
                $('#wrongep').text('邮箱未注册，请先注册').css('visibility', 'visible');
            }
            //203表示管理员身份被认可 跳转到管理员管理界面
            if (res.status == 203) {
                location.href = '/admin';
            }
        }
    });
});

//发送注册的请求
$('#zhucebtn').on('click', () => {

    //获取表单元素 返回值是一个对象
    var formdata = serializeToJson($('#zhuceform'));

    //客户端进行验证
    //console.log(formdata.name);

    //定义一个用来验证用户名的正则表达式 只能匹配2-5个汉字
    const regUname = new RegExp("^[\\u4E00-\\u9FFF]{2,5}$", "g");

    //定义一个用来验证密码的正则表达式 只能为6-20位数字
    const regUpwd = /^[0-9]\d{5,20}$/;

    //定义一个用来验证地址的正则表达式 规则为只能包含数字 字母 汉字 不能包含空格 特殊符号
    const regAdress = /[a-zA-Z0-9\u4E00-\u9FA5]{2,26}$/;

    // console.log(formdata.adress);
    // console.log(regAdress.test(formdata.adress));

    // console.log(formdata.password);
    // console.log(regUpwd.test(formdata.password));

    //console.log(regUname.test(formdata.name));

    //进行用户名正则匹配 如果匹配失败 则进行提示
    if (!regUname.test(formdata.name)) {
        return $('#msginfo').text('用户名为2-5位汉字组成').css('visibility', 'visible');
    }
    //邮箱的正则匹配有浏览器form的默认input属性 email进行验证 不用再验证
    if (formdata.email.trim().length == 0) {
        return $('#msginfo').text('请输入邮箱地址').css('visibility', 'visible');
    }

    //进行密码正则匹配 如果匹配失败则进行提示
    if (!regUpwd.test(formdata.password)) {
        return $('#msginfo').text('密码为6-20位纯数字').css('visibility', 'visible');
    }

    //进行地址的验证 地址验证规则数字 字母 汉字 不能有字符
    if (!regAdress.test(formdata.adress)) {
        return $('#msginfo').text('地址格式输入错误').css('visibility', 'visible');
    }

    //如果以上验证均通过 则发送ajax请求到/register进行
    //将表单数据解析 发送ajax请求
    $.ajax({
        type: 'POST',
        url: '/register',
        data: formdata,
        success: function (res) {
            //如果返回的是200 则证明注册成功 提示注册成功
            if (res.status == 200) {
                location.href = '/';
                alert('注册成功!请登录');
                return;
            }
            if (res.status == 201) {
                return $('#msginfo').text('邮箱已被注册').css('visibility', 'visible');
            }
        }
    });
});
