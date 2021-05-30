//用来解构表单的方法
function serializeToJson(form) {
    var result = {};
    var f = $(form).serializeArray();
    f.forEach(function (item) {
        result[item.name] = item.value;
    });
    return result;
}