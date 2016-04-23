<?php 

if(isset($_REQUEST['opc'])){
	if($_REQUEST['opc'] == "guia"){

		$param = $_REQUEST['param'];

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/seguimientoGuiaIndividual?guia=".$param;

		$data = file_get_contents($url);

		echo $data;
	}

	if($_REQUEST['opc'] == "login"){
		$user = $_REQUEST['user'];
		$password = $_REQUEST['password'];

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/webLoginEmpresa?usuario=$user&password=$password";

		$data = file_get_contents($url);

		echo $data;
	}
}