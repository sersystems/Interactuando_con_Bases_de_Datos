<?php
	
	session_start();
  require_once('conector.php');

	  $datos = array(
      'user_id' => $_SESSION['user_id'],
  	  'titulo' => $_POST['titulo'],
  	  'fecha_inicio' => $_POST['start_date'],
      'hora_inicio' => $_POST['start_hour'],
      'fecha_fin' => $_POST['end_date'],
      'hora_fin' => $_POST['end_hour'],
      'dia_completo' => $_POST['allDay']);

    $con = new ConectorBD('localhost','root','');
	  $respuesta['msg'] = $con->iniciarConexion('nextu_sergio');

  	if ($respuesta['msg'] == 'OK') {
    	if($con->insertarRegistro('eventos', $datos)){
        $respuesta['estado'] = "El evento se ha agregado exitosamente";
	    }else {
	      $respuesta['estado'] = "Hubo un error y los datos no han sido cargados";
	    }
  	}else {
      $respuesta['estado'] = "Error PHP-001 en la comunicación con el servidor";
    }

    $con->cerrarConexion();
  	echo json_encode($respuesta);
?>
