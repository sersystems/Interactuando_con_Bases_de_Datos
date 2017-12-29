<?php
	
  	require_once('conector.php');

    $con = new ConectorBD('localhost','root','');
	$respuesta['conexion'] = $con->iniciarConexion('nextu_sergio');

  	if ($respuesta['conexion'] == 'OK') {
  		$condicion = "id='".$_POST['id']."'";
    	if($con->eliminarRegistro('eventos', $condicion)){
      		$respuesta['estado'] = "exito en la eliminación";
	    }else {
	      	$respuesta['estado'] = "Hubo un error y los datos no han sido borrados";
	    }
  	}else {
    	$respuesta['conexion'] = "No se pudo conectar a la base de datos";
  	}
  	echo json_encode($respuesta);
  	$con->cerrarConexion();
?>