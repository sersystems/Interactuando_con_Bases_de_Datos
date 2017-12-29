<?php

  	require('conector.php');

  	$datos['nombre'] = "'luis Sebastian Vargas'";
  	$datos['email'] = "'luis20@gmail.com'";
  	$datos['clave'] = "'".password_hash("luis20", PASSWORD_DEFAULT)."'";
  	$datos['nacimiento'] = "'1975-10-20'";

    $con = new ConectorBD('localhost','root','');
  	$respuesta = $con->iniciarConexion('nextu_sergio');

  	if ($respuesta == 'OK') {
    	if($con->insertarDatos('usuarios', $datos)){
      		$respuesta = "exito en la inserción";
	    }else {
	      	$respuesta = "Hubo un error y los datos no han sido cargados";
	    }
  	}else {
    	$respuesta = "No se pudo conectar a la base de datos";
  	}
    $con->cerrarConexion();
    echo $respuesta;
?>
