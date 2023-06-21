var lang = $('body').attr('data-lang');

// Buttons
var big_dark = 'loading big-loading-icon dark-loading-icon';
var big_light = 'loading big-loading-icon light-loading-icon';
var small_dark = 'loading small-loading-icon dark-loading-icon';
var small_light = 'loading small-loading-icon light-loading-icon';

// Result
var error_class = '<div class="alert alert-danger"></div>';
var success_class = '<div class="alert alert-success"></div>';

// Admin bar
$(document).on('click', '.hide-admin-bar', function(){
    var status = $(this).attr('data-status');
    if(status == 'show') {
        $('html').css('margin-top', '0');
        $('.admin-bar').css('display', 'none');
        $(this).attr('data-status', 'hide');
        $(this).css('top', '0');
        $('body').removeClass('active-admin-bar');
    } else {
        $('html').css('margin-top', '35px');
        $('.admin-bar').css('display', 'flex');
        $(this).attr('data-status', 'show');
        $(this).css('top', '32px');
        $('body').addClass('active-admin-bar');
    }
    $.ajax({
        url: '/ms-admin/admin-bar/hide-admin-bar.php',
    })
})


// Menu search
$('#master-menu-search').on('click', function(event){
    event.stopPropagation();
    $('#master-search-area').toggleClass('visible-search');
});
$('body').on('click', function(){
    $('#master-search-area').removeClass('visible-search');
});
$('#header-search').on('click', function(event){
    event.stopPropagation();
});


// Scroll to top
$(document).ready(function() {
    var scrollTop = $("#site-scroll-top");

    $(window).scroll(function() {
        var topPos = $(this).scrollTop();

        if (topPos > 100) {
            $(scrollTop).fadeIn();
        } else {
            $(scrollTop).fadeOut();
        }
    });

    $(scrollTop).click(function() {
        window.scrollTo(0, 0);
    });
});


// Mobile menu
$('.mobil-menu-line-icon').click(function(event){
    event.stopPropagation();
    $('.mobile-menu-area').addClass('active-mobile-menu');
    $('.master-overlay').show();
});
$('.mobile-menu-close-icon').click(function(){
    $('.mobile-menu-area').removeClass('active-mobile-menu');
    $('.master-overlay').hide();
});
$('body').on('click', function(){
    $('.mobile-menu-area').removeClass('active-mobile-menu');
    $('.master-overlay').hide();
});
$('.mobile-menu-area').on('click', function(event){
    event.stopPropagation();
});
$('.mobile-menu-area .menu-item-has-children > a').click(function(e){
	e.preventDefault();
    $(this).parent().children('.sub-menu').slideToggle();
});
$(window).on('resize', function(){
	var win = $(this);
	if (win.width() > 959) { 
		$('.master-overlay').hide();
	}
});


// Social share
function share(link) {
    var parametrs = "width=650px,height=700px,left=20px,top=20px";
    window.open(link, "Google", parametrs);
}


// Master gallery lightbox
$(".gallery-icon a").fancybox().attr('data-fancybox', 'gallery');
$('.gallery').each(function() {
    $(this).find(".gallery-icon a").attr('data-fancybox', 'group-' + $(this).attr('id'));
});


// Accordion
$(document).ready(function() {
    $(".master-accordion-title").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).siblings(".master-accordion-content").slideUp(200);
        } else {
            $(".master-accordion-title").removeClass("active");
            $(this).addClass("active");
            $(".master-accordion-content").slideUp(200);
            $(this).siblings(".master-accordion-content").slideDown(200);
        }
    });
});


// Instagram Album
var instagramSwiper = new Swiper('.instagram-carousel', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.instagram-button-next',
        prevEl: '.instagram-button-prev',
    },
})


// Instagram load more
$(document).on('click', '.next-image-button', function(){
    
    var button  = $(this);
    var next    = button.attr('data-next');
    var text    = button.text();
    
    $.ajax({
        url: '/addons/instagram/feed.php',
        type: 'post',
        data: {"next":next, "text":text},
        beforeSend: function() {
			button.prop('disabled', true);
			button.addClass(small_light);
        },
        success:function(data){
            $('.next-images').remove();
            $('.instagram-images').append(data);
			button.prop('disabled', false);
			button.removeClass(small_light);
        }
    })
});


// Youtube load more
$(document).on('click', '.next-video-button', function(){
    
    var button  = $(this);
    var type    = button.attr('data-type');
    var id      = button.attr('data-id');
    var next    = button.attr('data-next');
    var page    = button.attr('data-page');
    var text    = button.text();
    var max     = button.attr('data-max');
    
    $.ajax({
        url: '/addons/youtube/'+type+'.php',
        type: 'post',
        data: {"type":type, "id":id, "next":next, "page":page, "text":text, "max":max},
        beforeSend: function() {
			button.prop('disabled', true);
			button.addClass(small_light);
        },
        success:function(data){
            $('.next-videos').remove();
            $('.youtube-videos').append(data);
			button.prop('disabled', false);
			button.removeClass(small_light);
        }
    })
});

function video(id) {
    $('.youtube-iframe').html('');
    $('.loading-area').css('opacity','0');
    $('.youtube-icon-area').show();
    $('#youtube-'+id+' .loading-area').css('opacity','1');
    $('#youtube-'+id+' .youtube-iframe').html('<iframe src="https://youtube.com/embed/'+id+'?autoplay=1&rel=0&controls=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>></iframe>');
    $('#youtube-'+id+' .youtube-icon-area').hide();
}


// Contact
$('#contact-form button').click(function(){
    
    var button = $(this);
    var form = $('#contact-form');
    button.addClass(small_light);
    
    var recaptcha = form.find('.g-recaptcha-response');
    
    grecaptcha.ready(function() {
        grecaptcha.execute(recaptcha.attr('data-recaptcha'), {action: 'submit'}).then(function(token) {
        
            recaptcha.val(token);
        
            $.ajax({
                url: '/ajax/contact.php',
                type: 'POST',
                data: form.serialize()+'&lang='+lang,
                success:function(data){
                    form.find('.form-result').html(data);
                    form.find('.form-result').show();
                    button.removeClass(small_light);
                    if (data.indexOf("alert-success") >= 0) {
                        form[0].reset();
                    }
                }
            })
        })
    })
    
});


// Order
$('#order-form button').click(function(){
    
    var button = $(this);
    var form = $('#order-form');
    button.addClass(small_light);
    
    var recaptcha = form.find('.g-recaptcha-response');
    
    grecaptcha.ready(function() {
        grecaptcha.execute(recaptcha.attr('data-recaptcha'), {action: 'submit'}).then(function(token) {
        
            recaptcha.val(token);
        
            $.ajax({
                url: '/ajax/order.php',
                type: 'POST',
                data: form.serialize()+'&lang='+lang,
                success:function(data){
                    form.find('.form-result').html(data);
                    form.find('.form-result').show();
                    button.removeClass(small_light);
                    if (data.indexOf("alert-success") >= 0) {
                        form[0].reset();
                    }
                }
            })
        })
    })
    
});


// Callout
$('#callout button').click(function(){
    
    var form = $('#callout');
    var button = $(this);
    
    $.ajax({
        url: '/ajax/callout.php',
        type: 'POST',
        data: form.serialize()+'&lang='+lang,
        beforeSend: function() {
            button.prop('disabled', true);
            button.addClass(small_light);
        },
        success:function(data){
            if(data.indexOf("alert-success") >= 0) {
                form.remove();
                $('.success-message').show();
            } else {
                form.find('.form-result').html(data);
                button.prop('disabled', false);
                button.removeClass(small_light);
            }
        }
    })
    
});


// Callout Modal
$('#callout-modal button').click(function(){
    
    var form = $('#callout-modal');
    var button = $(this);
    
    $.ajax({
        url: '/ajax/callout.php',
        type: 'POST',
        data: form.serialize()+'&lang='+lang,
        beforeSend: function() {
            button.prop('disabled', true);
            button.addClass(small_light);
        },
        success:function(data){
            if(data.indexOf("alert-success") >= 0) {
                form.remove();
                $('.success-message').show();
            } else {
                form.find('.form-result').html(data);
                button.prop('disabled', false);
                button.removeClass(small_light);
            }
        }
    })
    
});


// Post embed
$('.single-content p').has('iframe').addClass('master-embed');


// Map
(function( $ ) {

/**
 * initMap
 *
 * Renders a Google Map onto the selected jQuery element
 *
 * @date    22/10/19
 * @since   5.8.6
 *
 * @param   jQuery $el The jQuery element.
 * @return  object The map instance.
 */
function initMap( $el ) {

    // Find marker elements within map.
    var $markers = $el.find('.marker');

    // Create gerenic map.
    var mapArgs = {
        zoom        : $el.data('zoom') || 16,
        mapTypeId   : google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map( $el[0], mapArgs );

    // Add markers.
    map.markers = [];
    $markers.each(function(){
        initMarker( $(this), map );
    });

    // Center map based on markers.
    centerMap( map );

    // Return map instance.
    return map;
}

/**
 * initMarker
 *
 * Creates a marker for the given jQuery element and map.
 *
 * @date    22/10/19
 * @since   5.8.6
 *
 * @param   jQuery $el The jQuery element.
 * @param   object The map instance.
 * @return  object The marker instance.
 */
function initMarker( $marker, map ) {

    // Get position from marker.
    var lat = $marker.data('lat');
    var lng = $marker.data('lng');
    var latLng = {
        lat: parseFloat( lat ),
        lng: parseFloat( lng )
    };

    // Create marker instance.
    var marker = new google.maps.Marker({
        position : latLng,
        map: map
    });

    // Append to reference for later use.
    map.markers.push( marker );

    // If marker contains HTML, add it to an infoWindow.
    if( $marker.html() ){

        // Create info window.
        var infowindow = new google.maps.InfoWindow({
            content: $marker.html()
        });

        // Show info window when marker is clicked.
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open( map, marker );
        });
    }
}

/**
 * centerMap
 *
 * Centers the map showing all markers in view.
 *
 * @date    22/10/19
 * @since   5.8.6
 *
 * @param   object The map instance.
 * @return  void
 */
function centerMap( map ) {

    // Create map boundaries from all map markers.
    var bounds = new google.maps.LatLngBounds();
    map.markers.forEach(function( marker ){
        bounds.extend({
            lat: marker.position.lat(),
            lng: marker.position.lng()
        });
    });

    // Case: Single marker.
    if( map.markers.length == 1 ){
        map.setCenter( bounds.getCenter() );

    // Case: Multiple markers.
    } else{
        map.fitBounds( bounds );
    }
}

// Render maps on page load.
$(document).ready(function(){
    $('.acf-map').each(function(){
        var map = initMap( $(this) );
    });
});

})(jQuery);


// Comment reply
$(document).on('click', '.comment-button', function(){
    
    var button = $(this);
    var text = button.text();
    var form = button.closest('form');
    
    $.ajax({
        url: '/ajax/comment.php',
        type: 'POST',
        data: form.serialize()+'&lang='+lang,
        beforeSend: function() {
            button.prop('disabled', true);
			button.addClass(small_light);
        },
        success:function(data){
            button.closest('form').find('.form-result').html(data);
            button.prop('disabled', false);
			button.removeClass(small_light);
            if (data.indexOf("alert-success") >= 0) {
                if (!$('body').hasClass('logged-in')) {
                    grecaptcha.reset();
                }
                form[0].reset();
                $('.comment-rating').removeClass('active-comment-rating');
            }
        }
    })
    
});


// Mailchimp
$('#mailchimp button').click(function(){
    
    var button = $(this);
    var form = $('#mailchimp');
    
    $.ajax({
        url: '/partials/admin/addon-mailchimp/ajax-mailchimp-subscribe.php',
        type: 'POST',
        data: form.serialize(),
        beforeSend: function() {
            button.prop('disabled', true);
			button.addClass(small_light);
        },
        success:function(data){
            button.prop('disabled', false);
            button.removeClass(small_light);
            if(data.indexOf('success') > 0) {
                form.remove();
            }
            $('.mailchimp-result').html(data);
        }
    })
    
});

$('.mailchimp-element input').on('keypress',function(e) {
    if(e.which == 13) {
        e.preventDefault();
        $('#mailchimp button').click();
    }
});


String.prototype.replaceAll = function (searchText, replacementText) {
    return this.split(searchText).join(replacementText);
};


$('.comment-reply').click(function(){
    $('#comments .default-comment-form').remove();
    var parent = $(this).closest('.comment-field').attr('data-parent');
    var form = $('.default-comment-form-area').html();
    var newelement = form.replaceAll('template', parent);
    $(this).closest('.comment').append(newelement);
    $('.comment-reply-area').hide();
})


$(document).on('click', '.comment-reply-cancel', function(){
    $('#comments .default-comment-form').remove();
    $('.comment-reply-area').show();
})



// Load more comments
$(document).on('click', '.load-more-comments-button', function(){
    
    var button = $(this);
    var post_id = button.attr('data-post-id');
    var limit = button.attr('data-limit');
    var offset = button.attr('data-offset');
    
    $.ajax({
        url: '/ajax/load-more-comments.php',
        type: 'POST',
        data: {post_id:post_id, limit:limit, offset:offset},
        beforeSend: function() {
            button.addClass(small_light);
            button.prop('disabled', true);
        },
        success:function(data) {
            button.removeClass(small_light);
            button.prop('disabled', false);
            button.remove();
            $('#comments').append(data);
        }
    })
})


// Comment rating
$('.comment-rating label').click(function(){
    var main = $(this).closest('.form-rating');
    main.find('.comment-rating').removeClass('active-comment-rating');
    $(this).parent().prevAll().addBack().addClass('active-comment-rating');
});


// Tab
$('.tabs li').click(function(){
    var tab = $(this).closest('.tabs');
    var index = $(this).index() + 1;
    tab.find('.tabs-heading li').removeClass('active-tab');
    $(this).addClass('active-tab');
    tab.find('.tabs-body > div').hide();
    tab.find('.tabs-body > div:nth-child('+index+')').css('display', 'flex');
})


// Cookie
function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}


// HasAttr
$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};


// Single post table
$('.single-content table').wrap('<div class="master-table"></div>');


// Swiper demo
var swiper = new Swiper('.home-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    lazy: {
        checkInView: true,
        loadPrevNext: true,
        loadOnTransitionStart: true,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})


// Animations
jQuery(function($) {
    var doAnimations = function() {
        var offset = $(window).scrollTop() + $(window).height() + 250,
        $animatables = $('.animate');
        if ($animatables.length == 0) {
            $(window).off('scroll', doAnimations);
        }
		$animatables.each(function(i) {
            var $animatable = $(this);
			if (($animatable.offset().top + $animatable.height()) < offset) {
			        $animatable.css('transition-delay', $animatable.attr('data-delay')+'s').addClass('animated');
			}
        });
	};
	$(window).on('scroll', doAnimations);
    $(window).trigger('scroll');
});


// Fixed header
$(window).scroll(function(){
    if($(window).width() > 959) {
        if($(window).scrollTop() > 200){
            $('#site-header').addClass('fixed-site-header');
            $('body').css('padding-top', '100px');
        } else {
            $('#site-header').removeClass('fixed-site-header');
            $('body').css('padding-top', 0);
        }
    }
});

// Single post custom image size
$(document).ready(function () {
    $('.single-content').find('img').each(function () {

        var image = $(this);
        
        if(image.css('float') == 'left') {
            image.css('padding-right', '25px');
        }

        image.css({
            'width': image.attr('width')+'px',
            'height': image.attr('height')+'px'
        });
    });
});


// Form simple file
$('.form-simple-file input').change(function(){
    var count = $(this)[0].files.length;
    if(count == 1) {
        var filename = $(this).val().replace(/.*(\/|\\)/, '');
    } else {
        if(lang == 'az') {
            var filename = count+' fayl seçilib';
        } else {
            var filename = count+' files selected';
        }
    }
    $(this).closest('.form-simple-file').find('.fsf-text').html(filename);
});


function reset_form_file(form) {
    form.find('.form-simple-file input').val('');
    form.find('.form-advanced-file input').val('');
    form.find('.form-simple-file .fsf-text').html($('.form-simple-file .fsf-text').attr('data-default'));
    form.find('.faf-preview').remove();
}


// Form advanced file
$('.form-advanced-file input').on('change', function(event) {
    $('.faf-preview').remove();
    var files = event.target.files;
    var input = $(this);
    for(i=0; i<files.length; i++){
        var image = files[i]
        var reader = new FileReader();
        reader.onload = function(file) {
            var img = new Image();
            img.src = file.target.result;
            input.closest('.form-advanced-file').find('img').attr('src', img.src);
            if(img.src != '') {
                $('.profile-header .form-submit').show();
            }
        }
        reader.readAsDataURL(image);
     };
});


// File upload progress
$('#upload-form button').click(function(){
    
    var button = $(this);
    var form = button.closest('form');
    var formData = new FormData(form[0]);
    var file = $('.form-advanced-file input').val();
    
    if(file != '') {
        var fileExtension = ['png', 'gif', 'jpg'];
        if ($.inArray(file.split('.').pop().toLowerCase(), fileExtension) == -1) {
            form.find('.form-result').html('<div class="alert alert-danger">'+$('.selected-file-name').attr('data-required')+'</div>');
        } else {
            form.find('.progress').show();
            
            $.ajax({
                type: "POST",
                url: "/ajax/upload.php",
                data: formData,
                xhr: function() {
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload && file != '') {
                        myXhr.upload.addEventListener('progress', progress, false);
                    }
                    return myXhr;
                },
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function() {
                    button.prop('disabled', true);
                    button.addClass(small_light);
                },
                success: function(data){
                    button.prop('disabled', false);
                    button.removeClass(small_light);
                    form.find('.progress').hide();
                    form.find('.form-result').html(data);
                    form.find('.progress-bar').css('width', 0+'%').attr('aria-valueno', 0);
                    reset_form_file(form);
                    $('.selected-file-name').text($('.selected-file-name').attr('data-text'));
                    grecaptcha.reset();
                    if (data.indexOf("alert-success") >= 0) {
                        form[0].reset();
                    }
                }
            })
        }
    }
})

function progress(e) {
    if(e.lengthComputable) {
        var max = e.total;
        var current = e.loaded;
        var percentage = (current * 100) / max;
        $('.progress-bar').css('width', percentage+'%').attr('aria-valueno', percentage);
        $('.progress-percent').text(Math.round(percentage)+'%').attr('aria-valueno', percentage);
    }
}

/* Comments */
$('.comment-reply-button').click(function(){
    $('.comment-form').slideToggle();
});


// Milestone
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


function milestone() {
    if(isScrolledIntoView($(".master-milestone")) && !milestoneViewed) {
      milestoneViewed = true;
      $('.master-milestone-number').each(function() {
              $(this).prop('Counter',0).animate({
                  Counter: $(this).attr('data-count')
              }, {
                  duration: 1000,
                  easing: 'swing',
                  step: function (now) {
                      $(this).text(Math.ceil(now));
                  }
            });
        });
    }
}

if($('div').hasClass('master-milestone')) {
    var milestoneViewed = false;
    $(window).scroll(milestone);
}


// Skill bar
if($('div').hasClass('cool-skills-bar')) {
    var skillsViewed = false;
    $(window).scroll(skillsbar);
}

function skillsbar() {
    if (isScrolledIntoView($(".cool-bar")) && !skillsViewed) {
        skillsViewed = true;
        $('.cool-bar-percent').each(function() {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
        $(".cool-bar").each(function(){
            $(this).find(".cool-bar-inner").animate({
                width: $(this).attr("data-width")+'%'
            }, 2000)
        });
    }
}



// Canvas sidebar
$('.topbar-text').click(function(e){
    e.preventDefault();
    $('.canvas-sidebar').addClass('active-canvas-sidebar');
    $('.canvas-overlay').addClass('active-canvas-overlay');
});

$('.csh-close, .canvas-overlay').click(function(){
    $('.canvas-sidebar').removeClass('active-canvas-sidebar');
    $('.canvas-overlay').removeClass('active-canvas-overlay');
});



// Reviews
var swiper = new Swiper('.reviews-slider', {
    slidesPerView: 1.3,
    spaceBetween: 15,
    loop: true,
    lazy: {
        checkInView: true,
        loadPrevNext: true,
        loadOnTransitionStart: true,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        650: {
            slidesPerView: 2.3,
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
})

$(document).ready(function(){
    var getHeight = [];

    $('.review-slide').each(function(){
        getHeight.push($(this).height());
    });
    
    var newHeight = Math.max.apply(Math, getHeight);
    
    $('.review-slide').css('height', newHeight + 210);
})


// Partners
var swiper = new Swiper('.partners-slider', {
    slidesPerView: 1.5,
    spaceBetween: 40,
    loop: true,
    autoplay: {
        delay: 3000,
    },
    lazy: {
        checkInView: true,
        loadPrevNext: true,
        loadOnTransitionStart: true,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        360: {
            slidesPerView: 2.5,
        },
        650: {
            slidesPerView: 3.5,
        },
        850: {
            slidesPerView: 4.5,
        },
        1000: {
            slidesPerView: 5.5,
        },
        1200: {
            slidesPerView: 6,
        }
    }
})


// Partners
var swiper = new Swiper('.adv-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 4000
    },
    lazy: {
        checkInView: true,
        loadPrevNext: true,
        loadOnTransitionStart: true,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        360: {
            slidesPerView: 2,
        },
        650: {
            slidesPerView: 3,
        },
        850: {
            slidesPerView: 4,
        },
        1000: {
            slidesPerView: 5,
        },
        1200: {
            slidesPerView: 6,
            autoplay: {
                delay: 40000
            }
        }
    }
})



// Profile
$(document).on('click', '#profile-form button', function(){
    
    var button = $(this);
    var form = $('#profile-form')
    
    $.ajax({
        url: '/ajax/profile.php',
        type: 'POST',
        data: form.serialize()+'&lang='+lang,
        beforeSend: function() {
            button.addClass(small_light);
        },
        success:function(data) {
            button.removeClass(small_light);
            form.find('.form-result').html(data);
        }
    })
});

$(document).ready(function() {
    $("#phone, #whatsapp").mask("(999) 999 99 99", {autoclear: false});
});

$('.product-button').click(function(){
    var name = $(this).attr('data-name');
    $('select[name=service]').val(name);
})