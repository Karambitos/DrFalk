"use strict";
$(document).ready(() => {
    /*
        Download POPup
    */
    $(".preview").click(function () {
        var target = $(this).closest("div[dw-category]");
        target.addClass('active');
        target.find('.action-popup').fadeIn('slow');
        $("body").css('overflow', 'hidden');
    });

    $(".download-popup--close").click(function () {
        var target = $(this).closest("div[dw-category]");
        target.removeClass('active');
        $('.action-popup').fadeOut();
        $("body").css('overflow', '');
    });
});