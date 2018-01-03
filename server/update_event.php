<?php
	
  	require_once('conector.php');

    $datos = array(
    'fecha_inicio' => $_POST['start_date'],
    'hora_inicio' => $_POST['start_hour'],
    'fecha_fin' => $_POST['end_date'],
    'hora_fin' => $_POST['end_hour']);

    $con = new ConectorBD('localhost','root','');
	  $respuesta['msg'] = $con->iniciarConexion('nextu_sergio');

  	if ($respuesta['msg'] == 'OK') {
      $condicion = 'id="'.$_POST['id'].'"';
      if($con->actualizarRegistro('eventos', $datos, $condicion)){
          $respuesta['estado'] = "El evento se ha actualizado exitosamente";
      }else {
          $respuesta['estado'] = "Hubo un error y los datos no se han actualizado";
      }
   	}
    $con->cerrarConexion();
  	echo json_encode($respuesta);
?>