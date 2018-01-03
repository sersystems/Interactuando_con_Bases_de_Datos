<?php
  
  session_start();
  require_once('conector.php');

	$con = new ConectorBD('localhost','root','');
	$respuesta['msg'] = $con->iniciarConexion('nextu_sergio');

  	if ($respuesta['msg']=='OK') {
      $consulta = $con->consultarDatos(['eventos'], ['eventos.*'], 'INNER JOIN usuarios ON usuarios.id=eventos.user_id AND usuarios.id='.$_SESSION['user_id']);

      if ($consulta->num_rows <= 0) {
      	$respuesta['eventos'] = [];
    	}else{
	  		$eventos = array();
	  		while ($fila = $consulta->fetch_assoc()) {
	  			$evento = array(
            'id'=>$fila['id'],
            'user_id'=>$fila['user_id'],
            'title'=>$fila['titulo'],
            'start'=>$fila['fecha_inicio'].' '.$fila['hora_inicio'],
            'end'=>$fila['fecha_fin'].' '.$fila['hora_fin'],
            'allday'=>$fila['dia_completo']);
	      	array_push($eventos, $evento);
	  		}
	  		$respuesta['eventos'] = $eventos;
    	}
    }else{
      $respuesta['estado'] = "Error PHP-004 en la comunicación con el servidor";
    }

  $con->cerrarConexion();
	echo json_encode($respuesta);
?>