function PicScroll(element, opt) {
    var _this = this
    this.element = element
    // 上滚速度
    this.speedUp = opt.speedUp || 800
    // 下滚速度
    this.speedDown = opt.speedDown || 300
    $(this.element).hover(function () {
        var $img = $(this).find('img')
        var eleH = $(this).height()
        var imgH = $img.height()
        var H = imgH - eleH
        if (imgH <= eleH) {
            return
        }
        $img.stop().animate({ top: -H / 2 + 'px' }, _this.speedUp);
    }, function () {
        $(this).find('img').stop().animate({ top: 0 }, _this.speedDown);
    });

}
//click to change color left
var a = '#tuijian';
var b = '#diliao';
var c = '#sucai';
var d = '#huncai';
var e = '#zhushi';
var f = '#dingdan';
var changeColor = function (a, b, c, d, e, f) {
    $(a).addClass('active');
    $(b).removeClass('active');
    $(c).removeClass('active');
    $(d).removeClass('active');
    $(e).removeClass('active');
    $(f).removeClass('active');
};
$('#tuijian').on('click', function () {
    changeColor(a, b, c, d, e, f);
    // $('.incartbtn').css('display', 'block');
    // $('.delcartbtn').css('display', 'none');
    location.href = '/cart'
});
$('#diliao').on('click', function () {
    changeColor(b, a, c, d, e, f);
    // $('.incartbtn').css('display', 'block');
    // $('.delcartbtn').css('display', 'none');
    location.href = '/diliao'
})
$('#sucai').on('click', function () {
    changeColor(c, b, a, d, e, f);
    // $('.incartbtn').css('display', 'block');
    // $('.delcartbtn').css('display', 'none');
    location.href = '/sucai'

})
$('#huncai').on('click', function () {
    changeColor(d, b, c, a, e, f);
    // $('.incartbtn').css('display', 'block');
    // $('.delcartbtn').css('display', 'none');
    location.href = '/huncai'
})
$('#zhushi').on('click', function () {
    changeColor(e, b, c, d, a, f);
    // $('.incartbtn').css('display', 'block');
    // $('.delcartbtn').css('display', 'none');
    location.href = '/zhushi'
})
$('#dingdan').on('click', function () {
    changeColor(f, a, b, c, d, e);
    // $('.incartbtn').css('display', 'none');
    // $('.delcartbtn').css('display', 'block');
    location.href = '/mycart';

});

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

//搜索框设置 <input type="text" placeholder="搜索" id="serchgood">


$('#serchgood').next().on('click', () => {
    var keywords = document.getElementById('serchgood').value.trim();
    //将搜索框中打内容进行 去除空格后发送给服务器
    //进行页面跳转get氢气
    //进行判断 如果为空 则提示输入内容
    if (keywords.length != 0) {
        location.href = `/serch/?keywords=${keywords}`;
    }
    else {
        alert('请输入查询关键字')
    }

    // console.log('====================================');
    // console.log(keywords);
    // console.log('====================================');

    //发送ajax请求
    // $.ajax({
    //     type: "GET",
    //     url: "/serch/?keywords=154",
    //     data: {
    //         keywords: keywords
    //     },
    //     success: function (res) {
    //         if (res.status == 201) {
    //             return console.log('hello');

    //         }
    //         // location.href = '/serch'
    //         console.log('1212');
    //     }
    // });

})

//当点击我的信息按钮 跳转到/myinfo界面



//当点击确认支付按钮 跳转弹出信息
$('#paygoods').on('click', () => {
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时 
            "H+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var time = new Date().format("yyyy-MM-dd HH:mm:ss");
    //发送post请求 告诉服务器 将购物车中订单转移到订单中
    $.ajax({
        type: "POST",
        url: "/carttoorder",
        data: {
            time: time
        },
        //dataType: "dataType",
        success: function (res) {
            if (res.status == 200) {
                alert('支付中.....支付成功');
                location.href = '/mycart';
                return;
            }
            if (res.status == 201) {
                return alert('支付失败，请稍后重新支付')
            }
        }
    });
    //alert('支付中.....支付成功');
    //location.href = '/mycart'
})


//当点击加入购物车按钮时候  获取当前商品打价格和名称
$('.incartbtn').on('click', (e) => {
    //console.log('====================================');
    //console.log(e.target.id);
    //console.log(e.target.id);
    var s = e.target.id.split('&');
    //console.log(s);
    //console.log('====================================');
    //根据获取打商品信息发送请求
    $.ajax({
        type: "POST",
        url: "/addgoodmycart",
        data: {
            goodname: s[1],
            goodprice: s[0]
        },
        //dataType: "dataType",
        success: function (res) {
            if (res.status == 200) {
                return alert('加入购物车成功');
            }
            alert('加入购物车失败');
        }
    });
})

//点击删除按钮 删除购物车的一条数据
$('.delcartbtn').on('click', (e) => {
    //alert('00')
    var goodname = e.target.id;
    $.ajax({
        type: "POST",
        url: "/delcatgood",
        data: {
            goodname: goodname
        },
        //dataType: "dataType",
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert('删除成功')
                location.href = '/mycart'
            }
        }
    });
})