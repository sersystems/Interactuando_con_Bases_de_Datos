<?php
	
	session_start();
  	require_once('conector.php');

	$datos['id_usuario'] = "'".$_SESSION['user_id']."'";
  	$datos['titulo'] = "'".$_POST['titulo']."'";
  	$datos['fecha_ini'] = "'".$_POST['start_date']."'";
  	$datos['horario_ini'] = "'".$_POST['start_hour']."'";
  	$datos['fecha_fin'] = "'".$_POST['end_date']."'";
  	$datos['horario_fin'] = "'".$_POST['end_hour']."'";
  	$datos['dia_entero'] = "'".$_POST['allDay']."'";

    $con = new ConectorBD('localhost','root','');
	$respuesta['conexion'] = $con->iniciarConexion('nextu_sergio');

  	if ($respuesta['conexion'] == 'OK') {
    	if($con->insertarRegistro('eventos', $datos)){
      		$respuesta['estado'] = "exito en la inserción";
	    }else {
	      	$respuesta['estado'] = "Hubo un error y los datos no han sido cargados";
	    }
  	}else {
    	$respuesta['conexion'] = "No se pudo conectar a la base de datos";
  	}
  	echo json_encode($respuesta);
  	$con->cerrarConexion();
?>
