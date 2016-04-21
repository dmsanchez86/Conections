var application = angular.module('conections', []);

application.controller('followGuide', function($scope){
	$scope.showGuide = function(){
		$('.popup[followGuide]').addClass('open');
		$('.popup .container').removeClass('out in hide show');
	}
});

application.controller('searchGuide', function($scope, $timeout, $http){
	$scope.message = "";
	$scope.valueSearch = "";

	$scope.search = function(){

		if($scope.valueSearch == "" || $scope.valueSearch == undefined){
			$scope.message = "Ingrese Algo!";
			$('#txtSearchGuide').focus();

			$timeout(function(){
				$scope.message = "";
			},5000);
		}else{

			$http({
			  url: 'index.php?param='+$scope.valueSearch,
			  method: 'GET'
			}).then(function successCallback(response) {
				console.log(response.data.seguimientoGuiaIndividualResult);
				var $data = (response.data.seguimientoGuiaIndividualResult);

				if($data.length > 0){

				}else{
					$scope.message = "No se encontraron registros";

					$timeout(function(){
						$scope.message = "";
					},5000);
				}
		  }, function errorCallback(response) {
				console.warn(response);
		  });
		}
	}
});

application.controller('popup', function($scope, $timeout){
	$scope.close = function(){
		$('.popup').removeClass('open');
		$('.popup .container').removeClass('out in hide show');
		$('.popup .container[choose]').removeClass('out');
	}
	$scope.open = function(option){
		$('.popup .container[choose]').addClass('out');

		$timeout(function(){
			$('.popup .container[choose]').removeClass('out').addClass('hide');
			$('.popup .container['+option+']').addClass('show');

			$timeout(function(){
				$('.popup .container['+option+']').addClass('in');
			},100);
		},500);
	}
});