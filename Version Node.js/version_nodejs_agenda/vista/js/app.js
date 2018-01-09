class EventManager {

    constructor() {
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = 'eventos/obtener_eventos'
        $.get(url, (response) => {
          if(response == "logout" ){
            this.redireccionarAcceso()
          }else{
            this.inicializarCalendario(response)
          }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2018-01-10',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/delete.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event.id);
                }
            }
        })
    }

    eliminarEvento(evento) {
        let eventId = evento.id
        $.post('eventos/eliminar_evento?_id='+evento._id, {id: eventId}, (response) => {
          if(response == "logout" ){
            this.redireccionarAcceso()
          }else{
            $('.calendario').fullCalendar('removeEvents', eventId)
            alert(response)
          }
        })
        window.location.href = 'main.html';
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
              if($('#start_hour').val() == "" || $('#end_hour').val() == "" || $('#end_date').val() =="" ){
                alert("Complete los campos obligatorios para el evento")
                return
              }
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }

            let url = 'eventos/insertar_evento'
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end
                }
                $.post(url, ev, (response) => {
                    var newEvent = {
                        title: title,
                        start: start,
                        end: end
                    }
                    $('.calendario').fullCalendar('renderEvent', newEvent)
                    alert("Evento insertado correctamente")
                })
                window.location.href = 'main.html';
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    actualizarEvento(evento) {
      if(evento.end === null){
        var start = moment(evento.start).format('YYYY-MM-DD'), 
            url = '/eventos/actualizar_evento?_id='+evento._id
      }else{
        var start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'), 
            end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            url = '/eventos/actualizar_evento?_id='+evento._id
      }

        var  data = {
              _id: evento._id,
              start: start,
              end: end
          }
          $.post(url, data, (response) => {
            alert(response) 
          })
    }

    //Funcion para redireccionar el acceso
    redireccionarAcceso(){
        alert('Debe iniciar sesión para ver este contenido')
        window.location.href = "http://localhost:3000/index.html";
    }
}

const Manager = new EventManager()

//Funcion para cerrar inicio de sesión
function cerrarSesion(){
    var url = "/usuarios/logout";
    $.post(url, (res) => {
        window.location.href = "http://localhost:3000/index.html";
    })
}