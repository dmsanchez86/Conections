<?php 

// si existe la opcion hacemos las consultas
if(isset($_REQUEST['opc'])){
	// cuando consulta solo una guia
	if($_REQUEST['opc'] == "guia"){

		$guia = $_REQUEST['guia'];

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/seguimientoGuiaIndividual?guia=$guia";

		$data = file_get_contents($url);

		echo $data;
	}

	// cuando solicita loguearse
	if($_REQUEST['opc'] == "login"){
		$user = $_REQUEST['user'];
		$password = $_REQUEST['password'];

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/webLoginEmpresa?usuario=$user&password=$password";

		$data = file_get_contents($url);

		echo $data;
	}

	// cuando solicita una guia de una entidad logueada
	if($_REQUEST['opc'] == "guiaEntidad"){
		$fechaInicio = $_REQUEST['fechaInicio'];
		$fechaFinal = $_REQUEST['fechaFinal'];
		$client = $_REQUEST['client'];
		$guia = $_REQUEST['guia'];

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/guiasCliente?cliente=$client&fini=$fechaInicio&ffin=$fechaFinal&guia=$guia";

		$data = file_get_contents($url);

		echo $data;
	}
}