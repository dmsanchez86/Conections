var application = angular.module('conections', []);

// controlador principal
application.controller('main', function($scope, $window){

	$scope.loginShow = true;

	// validamos si ya inicio session
	if($window.sessionStorage.datosUsuario != null){
		$scope.datosUsuario = JSON.parse($window.sessionStorage.datosUsuario);
		$scope.loginShow = false;
		$('.contentUser').addClass('active');
	}

	// evento que cierra la session
	$scope.logout = function(){
		$window.sessionStorage.removeItem('datosUsuario');
		$('.contentUser').removeClass('active');
		$scope.loginShow = true;
		$.notify("Se cerro la sesión correctamente", "success");
	}
});

// controlador de la guía
application.controller('followGuide', function($scope){
	$scope.showGuide = function(){
		$('.popup[followGuide]').addClass('open');
		$('.popup .container').removeClass('out in hide show');
	}
});

// controlador de la busqueda de la guia
application.controller('searchGuide', function($scope, $timeout, $http){
	$scope.message = "";
	$scope.valueSearch = "";
	$scope.listStates = [];

	$scope.search = function(){
		// si la busqueda es vacia
		if($scope.valueSearch == "" || $scope.valueSearch == undefined){
			$('#txtSearchGuide').notify('Ingrese Algo...', 'warning');
			$('#txtSearchGuide').focus();
			$scope.listStates = [];
		}else{
			$('#txtSearchGuide').notify('Buscando...', 'info');

			// ajax que me consulta las guias
			$http({
			  url: 'index.php?opc=guia&param='+$scope.valueSearch,
			  method: 'GET'
			}).then(function successCallback(response) {
				var $data = (response.data.seguimientoGuiaIndividualResult);

				if($data.length > 0){
					$scope.listStates = $data;
				}else{
					$scope.listStates = [];
					$('#txtSearchGuide').notify('No se encontraron registros', 'info');
				}
		  }, function errorCallback(response) {
				console.warn(response);
		  });
		}
	}
});

// controlador del poup
application.controller('popup', function($scope, $timeout){
	// evento que cierra lel popup
	$scope.close = function(){
		$('.popup').removeClass('open');
		$('.popup .container').removeClass('out in hide show');
		$('.popup .container[choose]').removeClass('out');
	}

	// evento que abre segun la seccion que escoja en el popup
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

// controlador del login
application.controller('login', function($scope, $http, $window){
	$scope.user = "";
	$scope.password = "";
	$scope.datosUsuario = [];

	// evento del login
	$scope.login = function(){
		if($scope.user == "" || $scope.user == undefined){
			$('#user').notify('Ingrese un usuario', 'warning').focus();
		}else if($scope.password == "" || $scope.password == undefined){
			$('#password').notify('Ingrese una contraseña', 'warning').focus();
		}else{

			// ajax que valida el inicio de sesion
			$http({
			  url: 'index.php?opc=login&user='+$scope.user+'&password='+$scope.password,
			  method: 'POST'
			}).then(function successCallback(response) {
				var $data = (response.data.webLoginEmpresaResult);

				if($data.nombre != ""){
					// cerramos el popup
					$('.popup').removeClass('open');
					$('.popup .container').removeClass('out in hide show');
					$('.popup .container[choose]').removeClass('out');
					$.notify("Inicio de Sesión Correcto", "success");

					// guardamos los datos en el session storage
					$window.sessionStorage.setItem("datosUsuario", JSON.stringify($data));
					$scope.$parent.loginShow = false;
					$('.contentUser').addClass('active'); // mostramos el menu para cerrar sesion
				}else{
					$scope.listStates = [];
					$('#txtSearchGuide').notify('No se encontraron registros', 'info');
				}
		  }, function errorCallback(response) {
				console.warn(response);
		  });
		}
	}
});