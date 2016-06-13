'use strict';

$().ready(function($) {
	$('.containerMenuMobile span').unbind('click').click(function(event) {
		$("nav ul").addClass('open');

		$("nav ul li a").unbind('click').click(function(event) {
			$("nav ul").removeClass('open');
		});
	});
  
  // evento cuando los input de texto pierden el foco
  $('.form-group input[type=text],.form-group input[type=password],.form-group input[type=tel],.form-group input[type=email],.form-group textarea,.form-group input[type=number]').focusout(function(){
      $(this).parent().removeClass('active');
      
      if($(this).val().length > 0)
          $(this).parent().addClass('with-data');
      else
          $(this).parent().removeClass('with-data');
  });

  $('#value').focus(function(event) {
    $(this).notify("El valor minimo es $450.000", "info");
  });
});


$(document).unbind('scroll').scroll(function(e){
  var attrs = document.body.getBoundingClientRect();

  var height = window.innerHeight;
  var width = window.innerWidth;

  if(height < 660 || width > 1400){
    if(attrs.top == 0){
        $('nav ul').css('padding-bottom', '8rem');
    }else{
        $('nav ul').css('padding-bottom', '3rem');
    }
  }

});





















