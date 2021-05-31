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
$('#userM').on('click', function (e) {
    $('#goodsM').removeClass('active');
    $('#addM').removeClass('active');
    $('#goods').hide();
    $('#billM').removeClass('active');
    $('#addgood').hide();
    $('#bill').hide();
    $('#user').show();
    $(this).addClass('active');
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
});

// //阻止表单的默认提交行为
$('#addgood').on('submit', () => {
    //alert('ss')
    return false;
});

//获取表单中的数据
$('#btngood').on('click', () => {

    //找到file文件的组件
    var goodfile = $('#goodfile')[0].files[0];

    //暂时替代方法 将文件名进行传输
    //console.log(goodfile.name);

    //获取表单中的文件
    let formData = new FormData();

    //formData.append("goodimg", goodfile);

    //获取表单数据
    const addGoodInfo = serializeToJson($('#addgood'));
    console.log(addGoodInfo);

    //$.ajax({})
    //console.log(formData);

    //根据判断 必须所有选项均填写 则可以发送ajax请求
    console.log(addGoodInfo.name.trim().length != 0 && addGoodInfo.price.trim().length != 0);
    console.log(addGoodInfo);
    addGoodInfo.imgurl = goodfile.name;

    //对于价格进行判断 价格必须为整数否则提示错误
    //console.log(typeof addGoodInfo.name);

    //对于name进行验证 name必须为2到5个整数
    //最后实现


    if (addGoodInfo.name.trim().length != 0 && addGoodInfo.price.trim().length != 0) {
        //如果均不为空 则可以进行ajax请求的发送

        //发送ajax请求
        $.ajax({
            type: 'POST',
            url: '/admin/addgoods',
            data: addGoodInfo,
            success: function (res) {
                if (res.status == 200) {
                    alert('成功添加商品');
                }
            }
        });
    }
    else {
        alert('请输入完整信息')
    }
});


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/





//分页功能等待实现





/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
