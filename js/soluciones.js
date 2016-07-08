$("#btn-menu-mobile").click(function(){if ($("#menu-mobile").hasClass("open")) {$("#menu-mobile").removeClass("open");}else{$("#menu-mobile").addClass("open");}
});
$("#btn-menu-desktop").click(function(){
	if ($("#nav-bar-desktop").hasClass("open")) {
		$("#nav-bar-desktop").removeClass("open");
	}else{
		$("#nav-bar-desktop").addClass("open");
	}
});
$(".menu-mobile-content li a").click(function(){
	$("#menu-mobile").removeClass("open");
	$("#btn-menu-mobile").removeClass("active");
});
$("#navegacion li a").click(function(){
	$("#nav-bar-desktop").removeClass("open");
	$("#btn-menu-desktop").removeClass("active");
});
document.querySelector( "#btn-menu-desktop" ).addEventListener( "click", function() {
	this.classList.toggle( "active" );
});
document.querySelector( "#btn-menu-mobile" ).addEventListener( "click", function() {
	this.classList.toggle( "active" );
});

/*$("#sis_gestion").click(function() {
	if ($("#perolero").hasClass('open-info')) {
		$("#perolero").removeClass('open-info');
	} else {
		$("#perolero").addClass('open-info');
	}
});*/

window.onload = function(){$("#div-logo").addClass("loaded");setTimeout(function(){$('body').addClass("loaded")},7000)}
// Detectando SCROLL

/*var sv = $("#serv_admin").scroll(function(){
	// console.log(sv.outerHeight());
	console.log(sv.scrollTop());
	// console.log(sv);
});

$(document).ready(function(){

	$("#serv_admin").scroll(function(event) {
		var y = $(this).scrollTop();
		if (y == 100) {
			$("#perolero").addClass('open-info');
			
		}else if (y == 300) {
			$("#pote").addClass('open-info');
		}
	});

})*/
$('#contact-form').submit(function (event) {
	event.preventDefault()
});

var validateForm;
var Name = true;
var Email = true;
var Phone = true;
var Consulta = true;
var Comment = true;
var httpC;
validateForm = function () {

	$('input').each(function () {
            var inputName = $(this).attr('id');
            switch (inputName) {
                case 'name':
                    if (!$(this).val().match(/[A-Za-z0-9 .áéíóúñ]{10,50}/) || $(this).val() == '') {
                        $(this).addClass('fail');
                        Name = false;
                    } else {
                        $(this).removeClass('fail');
                        Name = true;
                    }
                    break;
                case 'email':
                    if (!$(this).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/) || $(this).val() == '') {
                        $(this).addClass('fail');
                        Email = false;
                    } else {
                        $(this).removeClass('fail');
                        Email = true;
                    }
                    break;
                case 'phone':
                    if (!$(this).val().match(/^[0-9-()+]{7,20}/) || $(this).val() == '') {
                        $(this).addClass('fail');
                        Phone = false;
                    } else {
                        $(this).removeClass('fail');
                        Phone = true;
                    }
					break;
				default:
					$(this).addClass('fail');
			}
	});
    if ($("#consulta").val()==""){
        $("#consulta").addClass('fail');
        Consulta = false;
    }else {
        $("#consulta").removeClass('fail');
        Consulta = true;
    }
    if ($("#comment").val() == "" || !$("#comment").val().match(/^[A-Za-z 0-9.,&?!\*\n\+\/-]{10,350}/)) {
        $("#comment").addClass('fail');
        Comment = false;
    } else {
        $("#comment").removeClass('fail');
        Comment = true;
    }

    if (Name == true && Email == true && Phone == true && Consulta == true && Comment == true){
        $.ajax({
            type: 'POST',
            url: $('#contact-form').attr('action'),
            data: 'name='+$('#name').val()+'&email='+$('#email').val()+'&phone='+$('#phone').val()+'&consulta='+$('#consulta').val()+'&comment='+$('#comment').val()+"&g-recaptcha-response=" + grecaptcha.getResponse(),
            dataType: "json",
            beforeSend: function(datax){
                if(httpC){
                    // Si habia alguna conexion anterior, la cancelamos
                    httpC.abort();
                }
                httpC = datax;
            },
            success: function(data) {
                if (data.error) {
                    $("#div_alerts").append(data.error);
                }
                else{
                    $('input').each(function () {
                        $(this).val('');
                    });
                    $('#consulta').val('');
                    $('#comment').val('');
                }
            }
        })
    }

};

/*var divError = $('#message-error');
var formData = $('input').each(function(){$(this).val();});

$('#send').click(function () {
    $.ajax({
        type: 'POST',
        url: $('#contact-form').attr('action'),
        data: formData
    }).done(function (response) {
        divError.removeClass('error');
        divError.addClass('success');

        divError.text(response);

        $('#name').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#comment').val('');
        $('#type_cons').val('');

    }).fail(function (data) {
        divError.removeClass('success');
        divError.addClass('error');

        if (data.responseText !== ''){
            divError.text(data.responseText);
        }else{
            divError.text('Oops! Parece que algo ha salido muy mal');
        }
    });
});*/