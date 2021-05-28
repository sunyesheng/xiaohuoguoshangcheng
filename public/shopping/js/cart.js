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
    $('#incartbtn').css('display', 'block');
    $('#delcartbtn').css('display', 'none');
});
$('#diliao').on('click', function () {
    changeColor(b, a, c, d, e, f);
    $('#incartbtn').css('display', 'block');
    $('#delcartbtn').css('display', 'none');
})
$('#sucai').on('click', function () {
    changeColor(c, b, a, d, e, f);
    $('#incartbtn').css('display', 'block');
    $('#delcartbtn').css('display', 'none');
})
$('#huncai').on('click', function () {
    changeColor(d, b, c, a, e, f);
    $('#incartbtn').css('display', 'block');
    $('#delcartbtn').css('display', 'none');
})
$('#zhushi').on('click', function () {
    changeColor(e, b, c, d, a, f);
    $('#incartbtn').css('display', 'block');
    $('#delcartbtn').css('display', 'none');
})
$('#dingdan').on('click', function () {
    changeColor(f, a, b, c, d, e);
    $('#incartbtn').css('display', 'none');
    $('#delcartbtn').css('display', 'block');
})