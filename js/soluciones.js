$("#btn-menu-mobile").click(function(){
	if ($("#menu-mobile").hasClass("open")) {
		$("#menu-mobile").removeClass("open");
	}else{
		$("#menu-mobile").addClass("open");
	}
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

$("#sis_gestion").click(function() {
	if ($("#perolero").hasClass('open-info')) {
		$("#perolero").removeClass('open-info');
	} else {
		$("#perolero").addClass('open-info');
	}
});


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