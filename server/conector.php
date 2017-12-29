<?php


  class ConectorBD{
    private $host;
    private $user;
    private $password;
    private $conexion;

    function __construct($host, $user, $password){
      $this->host = $host;
      $this->user = $user;
      $this->password = $password;
    }


    function iniciarConexion($nombre_db){
      $this->conexion = new mysqli($this->host, $this->user, $this->password, $nombre_db);
      if ($this->conexion->connect_error) {
        return "Error:".$this->conexion->connect_error;
      }else {
        return "OK";
      }
    }
   

    function consultarDatos($tablas, $campos, $condicion = ""){
      $sqlConsultar = 'SELECT ';

      $indiceUltimoCampo = end(array_keys($campos));
      foreach ($campos as $indice => $value) {
        $sqlConsulta .= $value;
        if ($indice!=$indiceUltimoCampo) {
          $sqlConsulta .= ', ';
        }else{
         $sqlConsulta .=" FROM ";
        }
      }

      $indiceUltimaTabla = end(array_keys($tablas));
      foreach ($tablas as $indice => $value){
        $sqlConsulta .= $value;
        if ($indice!=$indiceUltimaTabla){
          $sqlConsulta .= ', ';
        }else{
          $sqlConsulta .= " ";
        }
      }

      if ($condicion == ""){
        $sqlConsulta .= ";";
      }else{
        $sqlConsulta .= $condicion.";";
      }
      return $sqlConsulta;
      //return $this->conexion->query($sqlConsulta);
    }


    function insertarDatos($tabla, $datos){
      $sqlInsert = 'INSERT INTO '.$tabla;

      $sqlCampo = ' (';
      $sqlValor = ') VALUES (';
      $contador = 1;
      foreach ($datos as $indice => $value) {
        $sqlCampo .= $indice;
        $sqlValor .= $value;
        if ($contador!=count($datos)) {
          $sqlCampo .= ', ';
          $sqlValor .= ', ';
        }else{
         $sqlValor .=');';
        }
        $contador += 1;
      }
      $sqlInsert .= $sqlCampo.$sqlValor;
      return $this->conexion->query($sqlInsert);
    }


    function cerrarConexion(){
      $this->conexion->close();
    }
  }
 ?>
