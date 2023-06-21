var account = $('body').attr('data-account');

// Registration
$(document).ready(function(){
    
    $('#registration-form button').click(function(){
        
        var button = $(this);
        var form = $('#registration-form');
        button.addClass(small_light);
        
        var recaptcha = form.find('.g-recaptcha-response');
        
        grecaptcha.ready(function() {
            grecaptcha.execute(recaptcha.attr('data-recaptcha'), {action: 'submit'}).then(function(token) {
            
                recaptcha.val(token);
        
                $.ajax({
                    url: '/api/auth.php?action=registration',
                    type: 'POST',
                    data: form.serialize(),
                    success:function(data){
                        button.removeClass(small_light);
                        if(data.status == 'success') {
                            form[0].reset();
                            if(data.result.user_status == 1) {
                                window.location.href = account;
                            } else {
                                console.log(data);
                                $('#confirm-form input[name=user_id]').val(data.result.user_id);
                                $('.confirm-note').append('<div class="countdown"></div>');
                                countdown(0,60);
                                $('#open-confirm-modal').click();
                            }
                        } else {
                            form.find('.form-result').html(data.error).wrapInner(error_class);
                        }
                    }
                })
            })
        })
    });
    
});


// Login
$(document).ready(function(){
    
    $('#login-form button').click(function(){
        
        var button = $(this);
        var form = $('#login-form');
        button.addClass(small_light);
        
        var recaptcha = form.find('.g-recaptcha-response');
        
        grecaptcha.ready(function() {
            grecaptcha.execute(recaptcha.attr('data-recaptcha'), {action: 'submit'}).then(function(token) {
            
                recaptcha.val(token);
                
                $.ajax({
                    url: '/api/auth.php/?action=login',
                    type: 'POST',
                    data: form.serialize() + '&lang='+lang,
                    success:function(data){
                        button.removeClass(small_light);
                        if(data.status == 'success') {
                            window.location.reload();
                        } else {
                            form.find('.form-result').html(data.error).wrapInner(error_class);
                        }
                    }
                })
            })
        })
    });
    
});


// Form enter event
$("form input").keydown(function(e){
    if(e.which === 13){
        e.preventDefault();
        $(this).closest('form').find('button').click();
    }
});


// Show/hide password
$(document).ready(function() {
	$("#checkbox-login").click(function() {
	    
	    var input = $(this).closest('.form-element-password').find('input');
	    var button = $(this).find('i');
	    var show = $(this).attr('data-show');
	    var hide = $(this).attr('data-hide');
	    
        if (input.attr("type") == "password") {
            input.attr("type", "text");
            button.removeClass(show).addClass(hide);
        } else {
            input.attr("type", "password");
            button.removeClass(hide).addClass(show);
        }
    });
});


// Confirm account
$(document).ready(function(){
    
    $('#confirm-form button').click(function(){
        
        var button = $(this);
        var form = $('#confirm-form');
        button.addClass(small_light);
        
        var recaptcha = form.find('.g-recaptcha-response');
        
        grecaptcha.ready(function() {
            grecaptcha.execute(recaptcha.attr('data-recaptcha'), {action: 'submit'}).then(function(token) {
            
                recaptcha.val(token);
        
                $.ajax({
                    url: '/api/auth.php?action=confirm',
                    type: 'POST',
                    data: form.serialize() + '&lang='+lang,
                    success:function(data){
                        console.log(data);
                        if(data.status == 'success') {
                            window.location.href = account+'?user_status=success';
                        } else {
                            button.removeClass(small_light);
                            form.find('.form-result').html(data.error).wrapInner(error_class);
                        }
                    }
                })
            })
        })
    });
    
});


// Resend code
$(document).ready(function(){
    
    $('.confirm-send-again').click(function(){
        
        var button = $(this);
        var user_id = $('#confirm-form input[name=user_id]').val();
        
        $.ajax({
            url: '/api/auth.php?action=resend',
            type: 'POST',
            data: {"user_id":user_id},
            beforeSend: function() {
                button.addClass(small_dark);
            },
            success:function(data){
                if(data.status == 'success') {
                    $('.countdown').remove();
                    $('.confirm-note').append('<div class="countdown"></div>').show();
                    countdown(0,60);
                    $('.confirm-send-again-block').hide();
                } else {
                    button.removeClass(small_dark);
                    $('#confirm-form').find('.form-result').html(data.error).wrapInner(error_class);
                }
            }
        })
    });
    
});


// Open confirm account modal
$("#open-confirm-modal").fancybox({
   clickSlide: false,
   clickOutside: false
});


// Password reset
$(document).ready(function(){
    
    $('#reset-button').click(function(){
        
        var button = $(this);
        var form = $('#reset-form');
        button.addClass(small_light);
        
        var recaptcha = form.find('.g-recaptcha-response');
        
        grecaptcha.ready(function() {
            grecaptcha.execute(recaptcha.attr('data-recaptcha'), {action: 'submit'}).then(function(token) {
            
                recaptcha.val(token);
        
                $.ajax({
                    url: '/api/auth.php?action=reset',
                    type: 'POST',
                    data: $('#reset-form').serialize(),
                    success:function(data){
                        if(data.status == 'success') {
                            form.remove();
                            $('.after-reset-notification').show();
                            $('.notification-reset').html('');
                        } else {
                            button.removeClass(small_light);
                            form.find('.form-result').html(data.error).wrapInner(error_class);
                        }
                    }
                })
            })
        })
    });
    
});


// Set new password
$(document).ready(function(){
    
    $('#renew-form button').click(function() {
        
        var button = $(this);
        var form = $('#renew-form');
        button.addClass(small_light);
        
        var recaptcha = form.find('.g-recaptcha-response');
        
        grecaptcha.ready(function() {
            grecaptcha.execute(recaptcha.attr('data-recaptcha'), {action: 'submit'}).then(function(token) {
            
                recaptcha.val(token);
        
                $.ajax({
                    url: '/api/auth.php?action=renew',
                    type: 'POST',
                    data: form.serialize() + '&lang='+lang,
                    success:function(data){
                        button.removeClass(small_light);
                        if(data.status == 'success') {
                            form[0].reset();
                            form.find('.form-result').html(data.result).wrapInner(success_class);
                        } else {
                            form.find('.form-result').html(data.error).wrapInner(error_class);
                        }
                    }
                })
            })
        })
    });
    
});


// Renew password
$(document).ready(function(){
    
    $('#change-password-form button').click(function(){
        
        var button = $(this);
        var form = $('#change-password-form');
        
        $.ajax({
            url: '/api/users.php?action=password',
            type: 'POST',
            data: form.serialize()+'&lang='+lang,
            beforeSend: function() {
                button.addClass(small_light);
            },
            success:function(data){
                button.removeClass(small_light);
                if(data.status == 'success') {
                    form[0].reset();
                    form.find('.form-result').html(data.result).wrapInner(success_class);
                } else {
                    form.find('.form-result').html(data.error).wrapInner(error_class);
                }
            }
        })
    });
    
});


$(document).ready(function(){
    
    $('#change-details-button').click(function(){
        
        var button = $(this);
        var form = $('#change-details-form');
        
        $.ajax({
            url: '/api/users.php?action=update',
            type: 'POST',
            data: form.serialize()+'&lang='+lang,
            beforeSend: function() {
                button.addClass(small_light);
            },
            success:function(data){
                button.removeClass(small_light);
                if(data.status == 'success') {
                    form.find('.form-result').html(data.result.message).wrapInner(success_class);
                } else {
                    form.find('.form-result').html(data.error).wrapInner(error_class);
                }
            }
        })
    });
    
});


// Countdown
function countdown(minute, second) {
    
    var zeroMinute = '';
    var zeroSecond = '';
    
    var interval = setInterval(function(){
        if(minute < 10) {
            zeroMinute = 0;
        } else {
            zeroMinute = '';
        }
        if(second < 10) {
            zeroSecond = 0;
        } else {
            zeroSecond = '';
        }
        $('.countdown').html(zeroMinute+""+minute+":"+zeroSecond+""+second);
        second--;
        if(minute == 0 && second == 0) {
            clearInterval(interval);
            $('.confirm-note').hide();
            $('.confirm-send-again-block').show();
        }
        if(second == 0) {
            minute--;
            second = 60;
            if (minute == 0)
            {
                minute = 2;
            }
        }
    }, 1000);
}