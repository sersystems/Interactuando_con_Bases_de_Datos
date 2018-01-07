<?php

  	require_once('conector.php');

  	$datos = array(
      'nombre' => 'Maria Gomez',
      'email' => 'mary2018@gmail.com',
      'clave' => password_hash("mar2018", PASSWORD_DEFAULT),
      'nacimiento' => '1999-09-21');

    $con = new ConectorBD('localhost','root','');
  	$respuesta = $con->iniciarConexion('nextu_sergio');

  	if ($respuesta == 'OK') {
    	if($con->insertarRegistro('usuarios', $datos)){
      		$respuesta = "exito en la inserción";
	    }else {
	      	$respuesta = "Hubo un error y los datos no han sido cargados";
	    }
  	}else {
    	$respuesta = "No se pudo conectar a la base de datos";
  	}
    $con->cerrarConexion();
?>
