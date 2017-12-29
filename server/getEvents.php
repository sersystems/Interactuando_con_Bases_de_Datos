<?php

	require_once('conector.php');

	$con = new ConectorBD('localhost','root','');
	$respuesta['conexion'] = $con->iniciarConexion('nextu_sergio');

  	if ($respuesta['conexion']=='OK') {
      	$consulta = $con->consultarDatos(['eventos'], ['eventos.id'], 'INNER JOIN usuarios ON usuarios.id=eventos.id_usuario AND usuarios.id=1');
      	if ($consulta->num_rows != 0) {
      		$resultado = [];
          	while ($fila = $consulta->fetch_assoc()) {
          		array_push($resultado, $fila['id']);
      		}
       		$respuesta['eventos'] = $resultado;     		
    	}else{
      		$respuesta['eventos'] = [];
    	}
  	}
  	echo json_encode($respuesta);
  	$con->cerrarConexion();
 ?>