var application = angular.module('conections', []);

application.controller('followGuide', function($scope){
	$scope.showGuide = function(){
		$('.popup[followGuide]').addClass('open');
	}
});

application.controller('popup', function($scope){
	$scope.close = function(){
		$('.popup').removeClass('open');
		$('.popup .container[choose]').removeClass('out');
	}
	$scope.open = function(option){
		$('.popup .container[choose]').addClass('out');
	}
});