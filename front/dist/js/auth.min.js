// 点击登录注册，弹出对话框
$(function () {
    $('#btn').click(function () {
        $('.mask-wrapper').show();
        console.log('fuck')
    });
    $('.close-btn').click(function () {
        $('.mask-wrapper').hide()
    })
});

$(function () {
    $('.switch').click(function () {
        var scroll_wrapper = $('.auth-scroll-group');
        var current_left = scroll_wrapper.css('left');
        current_left = parseInt(current_left); // 字符串转整型 400px
        if (current_left < 0) {
            scroll_wrapper.animate({'left': '0'})
        } else {
            scroll_wrapper.animate({'left': '-400px'})
        }

    })
})