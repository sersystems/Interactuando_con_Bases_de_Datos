<?php

	require_once('conector.php');

	//Usuario restringido para consultar unicamente el email y clave para acceder al sistema
	//REVOKE ALL PRIVILEGES ON nextu_sergio FROM 'login_user'@'localhost';
	//GRANT SELECT (emai, clave) ON nextu_sergio.usuarios TO 'login_user'@'localhost';

	$con = new ConectorBD('localhost','login_user','UyCtyJKJDfYEaTFH');
	$respuesta['conexion'] = $con->iniciarConexion('nextu_sergio');

  	if ($respuesta['conexion']=='OK') {
      	$consulta = $con->consultarDatos(['usuarios'], ['id', 'email', 'clave'], 'WHERE email="'.$_POST['username'].'"');
      	if ($consulta->num_rows != 0) {
        	$fila = $consulta->fetch_assoc();
        	if (password_verify($_POST['password'], $fila['clave'])) {
       			$respuesta['acceso'] = 'concedido';
          		session_start();
              $_SESSION['user_id'] = $fila['id'];
          		$_SESSION['username'] = $fila['email'];
        	}else{
		        $respuesta['motivo'] = 'Contraseña incorrecta';
		        $respuesta['acceso'] = 'rechazado';
	      	}
    	}else{
      		$respuesta['motivo'] = 'Email incorrecto';
      		$respuesta['acceso'] = 'rechazado';
    	}
  	}
  	echo json_encode($respuesta);
  	$con->cerrarConexion();
?>
