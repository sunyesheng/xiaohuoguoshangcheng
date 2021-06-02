/*use for a link animation */
$('#ayue').click(function () {
    $('html,body').animate({
        scrollTop: $('#yue').offset().top
    }, 800);
});
$('#achuan').click(function () {
    $('html,body').animate({
        scrollTop: $('#chuan').offset().top
    }, 800);
});
$('#ahan').click(function () {
    $('html,body').animate({
        scrollTop: $('#han').offset().top
    }, 800);
});
$('#adong').click(function () {
    $('html,body').animate({
        scrollTop: $('#dong').offset().top
    }, 800);
});

//当点击li时候 进行页面跳转到 购物车界面
$('.main ul li').on('click', function () {
    //alert('sb');
    location.href = '/cart';
})

//当点击退出登录打时候 退出登录功能实现
$('#loginout').on('click', () => {
    //alert('0');
    //向服务器发送请求 请求删除session 并重定向到登录界面
    $.ajax({
        type: "GET",
        url: "/loginout",
        data: {
            loginout: '1'
        },
        success: function (res) {
            //console.log(res);
            if (res.status == 200) {
                location.href = '/'
            }
        }
    });
})