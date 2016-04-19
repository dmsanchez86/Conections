'use strict';

$().ready(function($) {
	$('.containerMenuMobile span').unbind('click').click(function(event) {
		$("nav ul").toggleClass('open');
	});
});





















