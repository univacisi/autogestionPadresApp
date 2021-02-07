/* global Api */

var calificaciones = function () {
    //variables globales
    var codigo;
    var Nivel;
    var Colegio;
    var CLectivo; 				  

    //metodos privados
    var inicializacionDeComponentes = function () {
        codigo = localStorage.getItem('alumno_codigo');
        Nivel = localStorage.getItem('alumno_nivel');
        Colegio = localStorage.getItem('colegio');
        CLectivo = localStorage.getItem('cLectivo');													

        var objeto = {
            codigo: codigo,
            nivel: Nivel,
            colegio: Colegio,
            cLectivo: CLectivo,							   

        };

        Api.getStudentData(objeto, 'NOTA', calificaciones.cargarNotas);

        $("#medio").removeClass('hide');


    };



    var mostrarMensajes = function (datos) {

        var contenedor = $('#bodyMensajes');
        var itemPadre = $('#row_0');

        if (datos.length > 0) {
            $.each(datos, function (key, d) {
                var item = itemPadre.clone(true, true);
                item.attr('id', 'row' + (key + 1));
                item.removeClass('hide');
                item.find('.tituloMje').text(d.titulo);
                item.find('.fechaMje').text(d.fecha_hora);
                item.find('.deMje').text(d.escrito_por);
                item.find('.mensajeMje').text(d.texto);
                contenedor.append(item);

            });
        } else {
            contenedor.html('<tr><td>No hay Mensajes</td></tr>');
        }

    };

    var mostrarNotas = function (datos) {
        var contenedor = $("#contenedorNotas");
        var itemPadre = $('#row_0');

        if (datos.length > 0) {
            $.each(datos, function (key, d) {
                var item = itemPadre.clone(true, true);
                item.attr('id', 'row' + (key + 1));
                itemPadre.removeClass('hide');
                item.find('.nombre').text(d.nombre);
                item.find('.e1_1').text(d.e1_1);
                item.find('.e1_2').text(d.e1_2);
                item.find('.e1_3').text(d.e1_3);
                item.find('.e1_4').text(d.e1_4);
                item.find('.e1_5').text(d.e1_5);
                item.find('.e1_6').text(d.e1_6);
                item.find('.e1_5').text(d.e1_5);

                contenedor.append(item);
            });
        } else {
            contenedor.html('<tr><td>No hay notas cargadas</td></tr>')
        }
    };




    //metodos publicos

    return {
        //main function to initiate the module
        init: function () {
            inicializacionDeComponentes();
        },


        //MEDIO
        cargarNotas: function (respuesta) {
            if (respuesta.estado) {
                switch (respuesta.objeto.forma_cursado) {
                    case 'T':
                        mostrarNotas(respuesta.objeto.datos_notas);
                        break;

                    case 'E':
                        mostrarNotas(respuesta.objeto.datos_notas);
                        break;

                    case 'A':
                        mostrarNotas(respuesta.objeto.datos_notas);
                        break;

                    case 'B':
                        mostrarNotas(respuesta.objeto.datos_notas);
                        break;

                    default:
                        break;
                }
                //mostrarNotasMedio(respuesta.objeto.datos_notas);
            } else {
                alert(respuesta.mensaje);
            }
        },




    };




}();

