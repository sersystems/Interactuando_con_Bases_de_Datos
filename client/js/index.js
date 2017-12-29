$(function(){

  $('#formAcceso').submit(function(event){
    var username = $('#formAcceso').find('#username').val();
    var password = $('#formAcceso').find('#password').val();
    event.preventDefault();
    $.ajax({
      url: '../server/login.php',
      dataType: "json",
      cache: false,
      data: {username: username, password: password},
      type: 'POST',
      success: function(php_response){
        if (php_response.conexion=="OK") {
          if (php_response.acceso == 'concedido') {
            window.location.href = 'main.html';
          }else {
            alert(php_response.motivo);
          }
        }else{
          alert(php_response.conexion);
        }
      },
      error: function(php_response){
       alert("error en la comunicación con el servidor");
      }
    });
  });
});