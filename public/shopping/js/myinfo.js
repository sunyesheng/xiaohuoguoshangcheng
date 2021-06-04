$('#addresschangebtn').on('click', () => {
    const newpw = $('#pwchange').val().trim();
    const newname = $('#namechange').val().trim();
    const newadress = $('#adresschange').val().trim();
    // console.log('====================================');
    // console.log(newpw);
    // console.log(newname);
    // console.log(newadress);
    // console.log('====================================');
    $.ajax({
        type: "POST",
        url: "/changemyinfo",
        data: {
            newpw: newpw,
            newname: newname,
            newadress: newadress,
        },
        //dataType: "dataType",
        success: function (res) {
            //console.log(res);
            alert('信息修改成功，请重新登录');
            location.href = '/';
            return;
        }
    });

})