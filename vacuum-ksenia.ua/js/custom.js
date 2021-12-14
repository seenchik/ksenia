(function($) {

    "use strict";

    // Parallax Scrolling
    //-------------------------------------------------------------
    var $w = $(window);
    var newsletterSimple = $('.newsletter-simple');
    var productInfo = $('.product-info');

    function move($c) {
        var offset = $c.offset().top;
        var scroll = $w.scrollTop();
        var diff = offset - scroll;
        var pos = 'center ' + (-diff)*0.2 + 'px';
        $c.css({'backgroundPosition':pos});
    }
    $w.bind('scroll', function(e){
        move(newsletterSimple);
        move(productInfo);
    });


    // Preloader
    //-------------------------------------------------------------------------------
    // window.onscroll = function () {
    //     window.scrollTo(0, 0);
    // };

    // $(window).load(function () {
    //     setTimeout(function () {
    //         window.onscroll = function () {};
    //         $('#page-preloader').addClass('slideOutUp');

    //         // Fix for IE 9
    //         setTimeout(function () {
    //             $('#page-preloader').addClass('hidden');
    //         }, 700);

    //     }, 100);

    // });


    // Initialize Tooltip
    //-------------------------------------------------------------
    $('.my-tooltip').tooltip();


    // Scroll To Animation
    //-------------------------------------------------------------------------------
    $('body').scrollspy({target: '#navigation-top-1', offset: 88});

    var scrollTo = $(".scroll-to");

    scrollTo.click(function (event) {
        $('.modal').modal('hide');
        var position = $(document).scrollTop();
        var scrollOffset = 87;

        var marker = $(this).attr('href');
        $('html, body').animate({scrollTop: $(marker).offset().top - scrollOffset}, 'slow');
        return false;
    });


    // Scroll Up Btn
    //-------------------------------------------------------------------------------
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scroll-up-btn').removeClass("animated fadeOutRight");
            $('.scroll-up-btn').fadeIn().addClass("animated fadeInRight");
        } else {
            $('.scroll-up-btn').removeClass("animated fadeInRight");
            $('.scroll-up-btn').fadeOut().addClass("animated fadeOutRight");
        }
    });

const gtagZaiavka = {
    1: 'zaiavka2',
    2: 'zaiavka3',
    3: 'zaiavka4',
    4: 'zaiavka5',
};

    // Show Appointment Modal
    //-------------------------------------------------------------------------------
    $('.show-appointment-modal').on('click', function () {
        var service = $(this).data('service');
        // console.log(service);
        var price = ($(this).parent().siblings(".offer-price").children(".price").html());
        var number = $(this).data('number');

        if (service == "Акция месяца" ) {
            $("#appointment-service").html(service);
            $("#appointment-message h2").html('Скидка 10% + акционная цена на профессиональный уход Styx!');
            $("#appointment-message h3").html('при заказе любого курса от 10 сеансов');
            $("input[name=theme]").val(service);

        } else {

            $("#appointment-service").html(service);
            $("#appointment-message h2").html();
            if (number > 2) {
                $("#appointment-message h3").html('1-й сеанс со скидкой = &#8372 '+price);
            } else {
               $("#appointment-message h3").html('1-й сеанс со скидкой 50% =  &#8372 '+price);
            }

            $("input[name=theme]").val(service);
            $("input[name=order]").val(number);
        }


        $('#appointmentModal').modal('show');
        return false;
    });


    // Navigation Top
    // Activate for apeear navbar after scrolling
    //-------------------------------------------------------------
    // $(document).scroll(function () {
    //     var y = $(this).scrollTop();
    //     if (y >= 300) {
    //         $('.navbar-hidden').fadeIn();
    //     } else {
    //         $('.navbar-hidden').fadeOut();
    //     }
    // });


    // Gallery
    //-------------------------------------------------------------
    $(".gallery .gallery-thumbnail-container").on("click", function () {

        var src = $(this).find("img").data('img');
        var galleryImg = $('<img/>').attr('src', src).addClass('img-responsive');

        var galleryImgWidth;
        galleryImg.load(function () {
            galleryImgWidth = this.width;
        });

        var imgTitle = $(this).find('.gallery-img-title').html();
        var imgSubtitle = $(this).find('.gallery-img-subtitle').html();


        $('#galleryModal').modal();
        $('#galleryModal').on('shown.bs.modal', function () {
            $('#galleryModal .modal-dialog').css('max-width', galleryImgWidth);
            $('#galleryModal .modal-body').html(galleryImg);
            $('#galleryModal .modal-nav .title').html(imgTitle + ' - ' + imgSubtitle);
        });
        $('#galleryModal').on('hidden.bs.modal', function () {
            $('#galleryModal .modal-body').html('');
        });
    });


    /* fix vertical when not overflow
     call fullscreenFix() if .fullscreen content changes */
    function fullscreenFix() {
        var h = $('body').height();
        // set .fullscreen height
        $(".content-b").each(function (i) {
            if ($(this).innerHeight() <= h) {
                $(this).closest(".fullscreen").addClass("not-overflow");
            }
        });
    }

    $(window).resize(fullscreenFix);
    fullscreenFix();


    /* resize background images */
    function backgroundResize() {
        var windowH = $(window).height();
        $(".header-full-screen-img").each(function (i) {
            var path = $(this);
            // variables
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            // overflowing difference
            var diff = parseFloat(path.attr("data-diff"));
            diff = diff ? diff : 0;
            // remaining height to have fullscreen image only on parallax
            var remainingH = 0;
            if (path.hasClass("parallax")) {
                var maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            // set img values depending on cont
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            // fix when too large
            if (contW > imgW) {
                imgW = contW;
                imgH = imgW / ratio;
            }
            //
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
        });
    }

    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize();


    // Contact Form
    //-------------------------------------------------------------
    var zeroTime = new Date();
    var humanInput = false;
    $('#contact-form-gmap input').focus(function() {
        humanInput = true;
    });

    $("#contact-form-gmap").submit(function () {

        let submitTime = new Date();
        $('#contact-form-gmap-msg').addClass('hidden');
        $('#contact-form-gmap-msg').removeClass('alert-success');
        $('#contact-form-gmap-msg').removeClass('alert-danger');

        $('#contact-form-gmap .btn-submit').attr('disabled', 'disabled');

        // console.log('humanInput '+humanInput);
        let fillingTime = (submitTime - zeroTime)/1000;
        // console.log('fillingTime '+fillingTime);
        let realFillingTime = fillingTime > 3 ? true : false;
        // console.log('realFillingTime '+realFillingTime);
        let spam = realFillingTime && humanInput ? 0: 1;
        // console.log('spam '+spam);

        $.ajax({
            type: "POST",
            url: "../php/index.php",
            data: $("#contact-form-gmap").serialize()+'&spam='+spam,
            dataType: "json",
            success: function (data) {
                // console.log(data);
                gtag('event', 'click', {  'event_category': 'button',  'event_label': 'zaiavka7'});
                if ('success' == data.result) {
                    $('#contact-form-gmap-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                    $('#contact-form-gmap-msg').html(data.msg[0]);
                    $('#contact-form-gmap .btn-submit').removeAttr('disabled');
                    $('#contact-form-gmap')[0].reset();
                    fbq('track', 'Lead');
                }

                if ('error' == data.result) {
                    $('#contact-form-gmap-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                    $('#contact-form-gmap-msg').html(data.msg[0]);
                    $('#contact-form-gmap .btn-submit').removeAttr('disabled');
                }
            }
        });

        return false;
    });


// Contact Form with phone and name
    //-------------------------------------------------------------
        // console.log($(".contact-form-phone").serialize());

    $(".contact-form-phone").submit(function () {

        $('.contact-form-phone-msg').addClass('hidden');
        $('.contact-form-phone-msg').removeClass('alert-success');
        $('.contact-form-phone-msg').removeClass('alert-danger');

        $('.contact-form-phone .submit').attr('disabled', 'disabled');
        $.ajax({
            type: "POST",
            url: "../php/index.php",
            data: $(".contact-form-phone").serialize(),
            dataType: "json",
            success: function (data) {
                // console.log(data);
                gtag('event', 'click', {  'event_category': 'button',  'event_label': 'zaiavka1'});
                if ('success' == data.result) {
                    $('.contact-form-phone-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                    $('.contact-form-phone-msg').html(data.msg[0]);
                    $('.contact-form-phone .submit').removeAttr('disabled');
                    $('.contact-form-phone')[0].reset();
                    fbq('track', 'Lead');
                }

                if ('error' == data.result) {
                    $('.contact-form-phone-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                    $('.contact-form-phone-msg').html(data.msg[0]);
                    $('.contact-form-phone .submit').removeAttr('disabled');
                }

            }
        });

        return false;
    });

$(".contact-form-phone-1").submit(function () {

        $('.contact-form-phone-msg-1').addClass('hidden');
        $('.contact-form-phone-msg-1').removeClass('alert-success');
        $('.contact-form-phone-msg-1').removeClass('alert-danger');

        $('.contact-form-phone-1 .submit').attr('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: "../php/index.php",
            data: $(".contact-form-phone-1").serialize(),
            dataType: "json",
            success: function (data) {
                // console.log(data);
                gtag('event', 'click', {  'event_category': 'button',  'event_label': 'zaiavka6'});
                if ('success' == data.result) {
                    $('.contact-form-phone-msg-1').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                    $('.contact-form-phone-msg-1').html(data.msg[0]);
                    $('.contact-form-phone-1 .submit').removeAttr('disabled');
                    $('.contact-form-phone-1')[0].reset();
                    fbq('track', 'Lead');
                }

                if ('error' == data.result) {
                    $('.contact-form-phone-msg-1').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                    $('.contact-form-phone-msg-1').html(data.msg[0]);
                    $('.contact-form-phone-1 .submit').removeAttr('disabled');
                }

            }
        });

        return false;
    });




$(".contact-form-phone-modal").submit(function () {

        $('.contact-form-phone-msg-modal').addClass('hidden');
        $('.contact-form-phone-msg-modal').removeClass('alert-success');
        $('.contact-form-phone-msg-modal').removeClass('alert-danger');

        $('.contact-form-phone-modal .submit').attr('disabled', 'disabled');

        let order = $("input[name=order]").val();
        let zaiavka = gtagZaiavka[order];
        gtag('event', 'click', {  'event_category': 'button',  'event_label': zaiavka});
        $.ajax({
            type: "POST",
            url: "../php/index.php",
            data: $(".contact-form-phone-modal").serialize(),
            dataType: "json",
            success: function (data) {
                // console.log(JSON.parse(data));
                // console.log(data);

                if ('success' == data.result) {
                    $('.contact-form-phone-msg-modal').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                    $('.contact-form-phone-msg-modal').html(data.msg[0]);
                    $('.contact-form-phone-modal .submit').removeAttr('disabled');
                    $('.contact-form-phone-modal')[0].reset();
                    fbq('track', 'Lead');
                }

                if ('error' == data.result) {
                    $('.contact-form-phone-msg-modal').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                    $('.contact-form-phone-msg-modal').html(data.msg[0]);
                    $('.contact-form-phone-modal .submit').removeAttr('disabled');
                }

            }
        });

        return false;
    });



// Phone mask in form
$(".phone").inputmask('+38(999) 999-99-99');

// Collapse menu in mobile version (fix bootstrap bug)
$('#bs-example-navbar-collapse-1 a').on('click', function(){
    $('#bs-example-navbar-collapse-1').removeClass('in');
});


// Перечень услуг - открыть закрыть по клику
$("#services h2").on('click',function(){
    $("#services h2 span").toggleClass("glyphicon-triangle-bottom glyphicon-triangle-top")
    $(".services-list .container").css("background", "#F7F7F7");
    $("#services-price-table").fadeToggle(400);

});


// Доступ к прайсам по промокоду

    $("#but").click(function(){
        var form_data = $("#epil_code").serialize(); // get all data from form

        $.ajax({
            method: "POST",
            type: "POST",
            url: "../php/promocode.php",
            headers: {
            'Accept': 'application/json, text/javascript',
            'Content-Type':'application/x-www-form-urlencoded'},
            data: form_data,
            dataType : "json",
            success: function(data){
                $('#epil').after(data.data); // insert result
                if (data.status == 'success'){ // if success
                    $('#epil ~ p').remove(); // remove error text if exists
                    $("#epil").addClass('hidden'); // hide form fields
                }
            }
        });
    return false;
    });



// Toggle price rows in price table
$(".show-detailed-price").click(function(){
    $(this).closest("table").find("tbody").toggleClass("hidden");
    $(this).find("i").toggleClass("fa-plus fa-minus");
    // var test = $(this).closest("tbody").removeClass("hidden");
    // console.log($(this).closest("table").find("tbody").html());
});


// Count press button "Правила" /terms.html
$("#terms").click(function() {

    let data = {
        browser: navigator.userAgent,
        ip: '',
        city: '',
        uri: '',
        is_mobile: (window.innerWidth < 990) ? 1 : 0
    }

    $.ajax({
        type: 'GET',
        url: 'https://ipinfo.io/json',
        async: false,
        success: function (result) {
           data.ip = result.ip;
           data.city = result.city;
        }

    });

    $.ajax({
        type: 'POST',
        url: '../php/terms.php',
        data: data,
        dataType: 'json',
        success: function (data) {
            // console.log(data);
        }
    });
});

$('.js-phone a').click(function (e) {
    fbq('track', 'AddToCart');
})



// end document ready
})(jQuery);