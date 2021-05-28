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