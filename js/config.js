var application = angular.module('conections', []);

// controlador principal
application.controller('main', function($scope, $window){
	$scope.links = [
		{
			name: "Quiénes Somos",
			slug: "quienes-somos"
		},
		{
			name: "Servicios",
			slug: "servicios"
		},
		{
			name: "Contacto",
			slug: "contacto"
		},
		{
			name: "Cubrimiento",
			slug: "cubrimiento"
		},
		{
			name: "Responsabilidad Social",
			slug: "responsabilidad-social"
		},
	];

	$scope.route = "home";

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
	
	// evento que me cambia la pagina
	$scope.page = function(slug){
		//$scope.route = slug;
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
application.controller('searchGuide', function($scope, $timeout, $http, $window){
	$scope.message = "";
	$scope.valueSearch = "";
	$scope.listStates = [];
	$scope.listGuides = [];
	$scope.listDetailsGuide = [];
	$scope.viewDetails = false;

	$scope.objSearch = {
		dateStart: "",
		dateEnd: "",
		guide: ""
	};

	$scope.search = function(){
		// si la busqueda es vacia
		if($scope.valueSearch == "" || $scope.valueSearch == undefined){
			$('#txtSearchGuide').notify('Ingrese Algo...');
			$('#txtSearchGuide').focus();
			$scope.listStates = [];
		}else{
			$scope.listStates = [];
			$('#txtSearchGuide').notify('Buscando...', 'info');

			// ajax que me consulta las guias
			$http({
			  url: 'index.php?opc=guia&guia='+$scope.valueSearch,
			  method: 'GET'
			}).then(function successCallback(response) {
				var $data = (response.data.seguimientoGuiaIndividualResult);

				if($data.length > 0){
					$scope.listStates = $data;
					$('#txtSearchGuide').notify('Se encontraron '+$scope.listStates.length+' registros', 'success');
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
		$scope.viewDetails = false;
		$scope.listGuides = [];

		$scope.back = function(){
			$scope.viewDetails = false;
		}

		if($scope.objSearch.dateStart == "" || $scope.objSearch.dateStart == undefined){
			$('#dateStart').notify("Ingrese una fecha").focus();
		}else if($scope.objSearch.dateEnd == "" || $scope.objSearch.dateEnd == undefined){
			$('#dateEnd').notify("Ingrese una fecha").focus();
		}else{
			$scope.listStates = [];
			$('.contentLogin.table').notify('Buscando...', 'info');

			if($scope.objSearch.guide == undefined){
				$scope.objSearch.guide = "";
			}

			$scope.datosUsuario = JSON.parse($window.sessionStorage.datosUsuario);

			// ajax que me consulta las guias
			$http({
			  url: 'index.php?opc=guiaEntidad&fechaInicio='+$scope.objSearch.dateStart+'&fechaFinal='+$scope.objSearch.dateEnd+'&client='+$scope.datosUsuario.uid_cli+'&guia='+$scope.objSearch.guide,
			  method: 'POST'
			}).then(function successCallback(response) {
				console.log(response);
				var $data = (response.data.guiasClienteResult);

				if($data.length > 0){
					$scope.listGuides = $data;
					$('.contentLogin.table').notify('Se encontraron '+$scope.listGuides.length+' registros', 'success');
				}else{
					$scope.listGuides = [];
					$('.contentLogin.table').notify('No se encontraron registros', 'info');
				}
		  }, function errorCallback(response) {
				console.warn(response);
		  });
		}
	}

	$scope.details = function(numero){
		$scope.datosUsuario = JSON.parse($window.sessionStorage.datosUsuario);

		// ajax que me consulta las guias
		$http({
		  url: 'index.php?opc=detalleGuiaEntidad&client='+$scope.datosUsuario.uid_cli+'&numero='+numero,
		  method: 'POST'
		}).then(function successCallback(response) {
			console.log(response.data.seguimientoGuiaResult);
			var $data = (response.data.seguimientoGuiaResult);

			if($data.length > 0){
				$scope.listDetailsGuide = $data;
				$('.contentLogin.table').notify('Se encontraron '+$scope.listDetailsGuide.length+' registros', 'success');
				$scope.viewDetails = true;
			}else{
				$scope.listDetailsGuide = [];
				$('.contentLogin.table').notify('No se encontraron los detalles del registro', 'info');
			}
	  }, function errorCallback(response) {
			console.warn(response);
	  });
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

	// evento que vuelve atras de la seccion en el popup
	$scope.backSection = function(option){
		$('.popup .container['+option+']').removeClass('in');

		$timeout(function(){
			$('.popup').removeClass('open');
		}, 400);

		$timeout(function(){
			$('.popup .container').removeClass('out in hide show');
			$('.popup[followGuide]').addClass('open');
		}, 450);

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
			$('#user').notify('Ingrese un usuario').focus();
		}else if($scope.password == "" || $scope.password == undefined){
			$('#password').notify('Ingrese una contraseña').focus();
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