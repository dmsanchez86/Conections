<?php 

$param = $_REQUEST['param'];

$url = "http://181.143.244.18/wsconexiones/Servicio.svc/seguimientoGuiaIndividual?guia=".$param;

$data = file_get_contents($url);

echo $data;