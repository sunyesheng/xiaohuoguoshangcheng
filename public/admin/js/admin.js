$(function () {
    $('#bill').hide();
    $('#user').hide();
    $('#goods').show();
    $('#goodsM').addClass('active');
    $('#addgood').hide();
});
$('#goodsM').on('click', function () {
    $('#billM').removeClass('active');
    $('#addM').removeClass('active');
    $('#bill').hide();

    $('#addgood').hide();
    $('#userM').removeClass('active');
    $('#user').hide();
    $('#goods').show();
    $(this).addClass('active');
});
$('#billM').on('click', function () {
    $('#goodsM').removeClass('active');
    $('#addM').removeClass('active');
    $('#goods').hide();
    $('#userM').removeClass('active');
    $('#addgood').hide();
    $('#user').hide();
    $('#bill').show();
    $(this).addClass('active');
});
$('#userM').on('click', function () {
    $('#goodsM').removeClass('active');
    $('#addM').removeClass('active');
    $('#goods').hide();
    $('#billM').removeClass('active');
    $('#addgood').hide();
    $('#bill').hide();
    $('#user').show();
    $(this).addClass('active');
    //  当点击页码时候 将页码信息传递到服务器端
    $('#pager').children('li').on('cilck', function () {
        alert('12131231')
    });

});
$('#addM').on('click', function () {
    $('#goodsM').removeClass('active');
    $('#goods').hide();
    $('#billM').removeClass('active');
    $('#userM').removeClass('active');
    $('#bill').hide();
    $('#user').hide();
    $('#addgood').show();
    $(this).addClass('active');
    alert('111')
});

//阻止表单的默认提交行为
$('#addgood').on('submit', () => {
    alert('ss')
    return false;
});

//获取表单中的数据
$('#btngood').on('click', () => {
    var s = serializeToJson($('#addgood'));
    console.log(s);
})