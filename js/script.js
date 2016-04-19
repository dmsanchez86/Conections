'use strict';

$().ready(function($) {
	$('.containerMenuMobile span').unbind('click').click(function(event) {
		$("nav ul").addClass('open');

		$("nav ul li a").unbind('click').click(function(event) {
			$("nav ul").removeClass('open');
		});
	});
});





















