var application = angular.module('conections', []);

// controlador principal
application.controller('main', function($scope, $window){

	// variable que permite mostrar el formulario de login cuando esta verdadera
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
		$.notify("Se cerro la sesión correctamente", "info");
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
	$scope.listGuides = [];

	$scope.objSearch = {
		dateStart: "",
		dateEnd: "",
		guide: ""
	};

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
			  url: 'index.php?opc=guia&guia='+$scope.valueSearch,
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

	$scope.searchEntidad = function(){
		if($scope.objSearch.dateStart == "" || $scope.objSearch.dateStart == undefined){
			$('#dateStart').notify("Ingrese una fecha").focus();
		}else if($scope.objSearch.dateEnd == "" || $scope.objSearch.dateEnd == undefined){
			$('#dateEnd').notify("Ingrese una fecha").focus();
		}else{
			console.log($scope.objSearch);
			console.log($scope.datosUsuario);

			$('.contentLogin.table').notify('Buscando...', 'info');

			if($scope.objSearch.guide == undefined){
				$scope.objSearch.guide = "";
			}

			// ajax que me consulta las guias
			$http({
			  url: 'index.php?opc=guiaEntidad&fechaInicio='+$scope.objSearch.dateStart+'&fechaFinal='+$scope.objSearch.dateEnd+'&client='+$scope.datosUsuario.uid_cli+'&guia='+$scope.objSearch.guide,
			  method: 'POST'
			}).then(function successCallback(response) {
				console.log(response);
				var $data = (response.data.guiasClienteResult);

				if($data.length > 0){
					$scope.listGuides = $data;
				}else{
					$scope.listStates = [];
					$('.contentLogin.table').notify('No se encontraron registros', 'info');
				}
		  }, function errorCallback(response) {
				console.warn(response);
		  });
		}
	}

	$scope.details = function(numero){
		alert(numero);
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
					$scope.$parent.$parent.loginShow = false; // ocultamos el formulario de logueo
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