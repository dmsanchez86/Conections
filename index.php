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

	// cuando solicita un detalle de una guia de una entidad logueada
	if($_REQUEST['opc'] == "detalleGuiaEntidad"){
		$client = $_REQUEST['client'];
		$numero = $_REQUEST['numero'];

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/seguimientoGuia?guia=$numero&cliente=$client";

		$data = file_get_contents($url);

		echo $data;
	}

	// obtiene los destinos de la ciudad
	if($_REQUEST['opc'] == "getDestinos"){
		$origin = $_REQUEST['origin'];

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/traerDestinos?origen=CIU000006852&cliente=CLI000000230";

		$data = file_get_contents($url);

		echo $data;
	}

	// cotizar
	if($_REQUEST['opc'] == "cotizar"){
		$origen = $_REQUEST['origin'];
		$destino = $_REQUEST['destine'];
		$unidades = $_REQUEST['units'];
		$peso = $_REQUEST['weight'];
		$ancho = $_REQUEST['width'];
		$largo = $_REQUEST['height'];
		$fondo = $_REQUEST['fondo'];
		$valor = $_REQUEST['value'];

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/cotizarDespacho?uid_cli=CLI000000230&uid_ciu_origen=$origen&uid_ciu_destino=$destino&unidades=$unidades&peso=$peso&ancho=$ancho&largo=$largo&fondo=$fondo&valor_declarado=$valor";

		$data = file_get_contents($url);

		echo $data;
	}
}