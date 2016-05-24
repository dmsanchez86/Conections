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

	// cuando solicita si hay alguna imagen
	if($_REQUEST['opc'] == "imagenGuia"){
		$guia = $_REQUEST['guia'];
		$uid = $_REQUEST['uid'];
		
		$base_url = "http://181.143.244.18/conexiones/seguimiento/guias/";

		$url_img_tiff = $base_url."?ruta=$guia";
		$url_img_jpg = $base_url."$uid.jpg";

		
		if (urlValidator($url_img_jpg)){
			echo $url_img_jpg;
		} else if (urlValidator($url_img_tiff)){
			echo $base_url."$guia.jpg";
		}
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

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/traerDestinos?origen=$origin&cliente=CLI000000542";

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

		$url = "http://181.143.244.18/wsconexiones/Servicio.svc/cotizarDespacho?uid_cli=CLI000000542&uid_ciu_origen=$origen&uid_ciu_destino=$destino&unidades=$unidades&peso=$peso&ancho=$ancho&largo=$largo&fondo=$fondo&valor_declarado=$valor";

		$data = file_get_contents($url);

		echo $data;
	}
}

function urlValidator( $url ){
	$ch = curl_init();
	
	// set url
	curl_setopt($ch, CURLOPT_URL, $url);
	
	//return the transfer as a string
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	
	// $output contains the output string
	curl_exec($ch);
	
	$output = curl_getinfo($ch);
	
	// close curl resource to free up system resources
	curl_close($ch);
	
	return 200 === $output['http_code'];
}