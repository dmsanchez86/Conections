'use strict';

$().ready(function($) {
	$('.containerMenuMobile span').unbind('click').click(function(event) {
		$("nav ul").addClass('open');

		$("nav ul li a").unbind('click').click(function(event) {
			$("nav ul").removeClass('open');
		});
	});
  
  // evento cuando los input de texto pierden el foco
  $('.form-group input[type=text],.form-group input[type=password]').focusout(function(){
      $(this).parent().removeClass('active');
      
      if($(this).val().length > 0)
          $(this).parent().addClass('with-data');
      else
          $(this).parent().removeClass('with-data');
  });
});





















