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
});
$('#addM').on('click', function () {
    $('#goodsM').removeClass('active');
    $('#goods').hide();
    $('#billM').removeClass('active');
    $('#userM').removeClass('active');
    $('#bill').hide();
    $('userM').hide();
    $('#addgood').show();
    $(this).addClass('active');
});
