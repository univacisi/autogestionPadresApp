/* global Api */

var VerAlumno = function () {
    //variables globales
    var codigo;
    var Nivel;
    var Colegio;
    var Curso;
    var CLectivo; 				  

    //metodos privados
    var inicializacionDeComponentes = function () {
        codigo = localStorage.getItem('alumno_codigo');
        Nivel = localStorage.getItem('alumno_nivel');
        Colegio = localStorage.getItem('colegio');
        Clave = localStorage.getItem('clave');
        Curso = Clave.substring(1, 2);
        CLectivo = localStorage.getItem('cLectivo');													

        
        var objeto = {
            codigo: codigo,
            nivel: Nivel,
            colegio: Colegio,
            curso: Curso,
            cLectivo : CLectivo
        };
        //console.log(objeto); 
        /*Api.getStudentData(objeto, 'DATOS_GENERALES', VerAlumno.cargarDatos);*/


        switch (objeto.nivel) {
            case 'I':
                Api.getStudentData(objeto, 'NOTA', VerAlumno.cargarNotasInicial);
                Api.getStudentData(objeto, 'INASISTENCIAS', VerAlumno.cargarListadoInasistencias);
                $("#inicial").removeClass('hide');
                hodooor();
                break;
            case 'P':
                Api.getStudentData(objeto, 'NOTA', VerAlumno.cargarNotasPrimario);
                Api.getStudentData(objeto, 'NOTA_CUALITATIVA', VerAlumno.cargarNotasCualitativaMedio);                
                Api.getStudentData(objeto, 'OBSERVACION_CUALITATIVA', VerAlumno.cargarObservacionCuarentena);
                Api.getStudentData(objeto, 'INASISTENCIAS', VerAlumno.cargarListadoInasistencias);
                $('.nav-item-sanciones').addClass('hide');
                $("#primario").removeClass('hide');
                $("#medio").removeClass('hide');
                hodooor();
                break;
            case 'M':
                
                if (Curso == 6) {
                    Api.getStudentData(objeto, 'NOTA', VerAlumno.cargarNotasMedio);      
                }else {
                    Api.getStudentData(objeto, 'NOTA_MEDIO_CUARENTENA', VerAlumno.cargarNotasMedioCuarentena);}
                         
                Api.getStudentData(objeto, 'NOTA_CUALITATIVA', VerAlumno.cargarNotasCualitativaMedio);
                Api.getStudentData(objeto, 'OBSERVACION_CUALITATIVA', VerAlumno.cargarObservacionCuarentena);


                Api.getStudentData(objeto, 'INASISTENCIAS', VerAlumno.cargarListadoInasistencias);
                Api.getStudentData(objeto, 'SANCIONES', VerAlumno.cargarListadoSanciones);
                $("#medio").removeClass('hide');
                hodooor();
                break;
            case 'T':
                Api.getStudentData(objeto, 'NOTA', VerAlumno.cargarNotasTerciario);
                $("#terciario").removeClass('hide');
                hodooor();
                break;
            default:
                return [];
        }

    };

    /* var mostrarDatos = function (datos) {
         $('#alumnoNombre').text(datos.nombre);
         $('#alumnoDni').text(datos.codigo);
         $('#alumnoGrado').text(datos.grado);
         $('#alumnoDivision').text(datos.division);
         var turno;
         if (datos.turno === "M") {
             turno = "Mañana";
         } else {
             turno = "Tarde";
         }
         $('#alumnoTurno').text(turno);
         $('#colegioNombre').text(datos.colegio);
         console.log(datos);
     };*/

    $('.seccionSanciones').click(function (e) {
        e.preventDefault();
        $(".cargarSanciones").removeClass('hide');
    });

    $('.seccionInasistencias').click(function (e) {
        e.preventDefault();
        $("#cargarInasistencias").removeClass('hide');

    });

    $('.boton-notas').click(function (e) {
        e.preventDefault();
        switch (Nivel) {
            case 'I':
                $("#cargarNotasI").removeClass('hide');

                break;
            case 'P':
                $("#cargarNotasP").removeClass('hide');

                break;
            case 'M':
                $("#cargarNotasM").removeClass('hide');

                break;

            default:
                break;
        }

    });


    $('#cerrarSesion').click(function (e) {
        e.preventDefault();
        localStorage.clear();
        location.href = "index.html";
    });




    var mostrarListadoSanciones = function (datos) {
        if (datos.length === 0) {
            //swal('El alumno no tiene sanciones/observaciones ');
            $('#seccionSanciones').change();
        } else {

            var fecha;

            var d = '<tr>' +
                '<th>fecha</th>' +
                '<th>motivo</th>' +
                '</tr>';


            for (var i = 0; i < datos.length; i++) {
                fecha = formato(datos[i].fecha);
                d += '<tr>' +
                    '<td>' + fecha + '</td>' +
                    '<td>' + datos[i].motivo + '</td>' +
                    '</tr>';

            }
            $("#tablaSanciones-" + Nivel).append(d);

        }
    };

    var mostrarListadoInasistencias = function (datos) {
        if (datos.length === 0) {
            //swal('El alumno no tiene inasistencias ');
        } else {
            var fecha;
            var justi;

            var d = '<tr>' +
                '<th>Fecha</th>' +
                '<th>Cant</th>' +
                '<th>Justifica</th>' +
                '<th>Tipo</th>' +
                '</tr>';


            for (var i = 0; i < datos.length; i++) {
                var motivo;
                if (datos[i].motivo === null) {
                    motivo = '--';
                } else {
                    motivo = datos[i].motivo;
                }
                if (datos[i].justifica === 1) {
                    justi = 'Si'
                } else {
                    justi = 'No'
                }
                fecha = formato(datos[i].fecha);

                d += '<tr>' +
                    '<td>' + fecha + '</td>' +
                    '<td>' + datos[i].cantidad + '</td>' +
                    '<td>' + justi + '</td>' +
                    '<td>' + datos[i].tipoFalta + '</td>' +
                    '</tr>';

            }
            $("#tablaInasistencia-" + Nivel).append(d);

        }

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



    var mostrarMensajes1 = function (datos) {

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



    //INICIAL
    var mostrarNotasInicial = function (datos) {

        //PRIMER CUATRIMESTRE 
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th> </th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].a_1 + '</td>' +
                '</tr>';

        }
        $("#tablaNotasInicialPrimero").append(d);
        //SEGUNDO CUATRIMETRE
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th> </th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].a_2 + '</td>' +
                '</tr>';

        }

        $("#tablaNotasInicialSegundo").append(d);



    };

    //PRIMARIO
    var mostrarNotasPrimario = function (datos) {
        //console.log(datos); 
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th class="text-center"><small>Primer Trimestre</small></th>' +
            '<th class="text-center"><small>Segundo Trimestre</small></th>' +
            '<th class="text-center"><small>Tercer Trimestre</small></th>' +
            '</tr>';


        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td class="">' + notaCorrecta(datos[i].nombre) + '</td>' +
                '<td class="text-center">' + notaCorrecta(datos[i].e_1) + '</td>' +
                '<td class="text-center">' + notaCorrecta(datos[i].e_2) + '</td>' +
                '<td lass="text-center">' + notaCorrecta(datos[i].e_3) + '</td>' +
                '</tr>';

        }
        $("#tablaNotasPrimario").append(d);


    };

    //---------NIVEL MEDIO------------

    //MEDIO TRIMESTRAL
    var promedio = function (datos, trimestreActual) {
        var sum = 0;
        var cont = 0;
        var atributos = Object.keys(datos);

        $.each(atributos, function (i, atributo) {
            if (atributo.includes('e' + trimestreActual + '_')) {
                if (datos[atributo] !== 0 && !isNaN(parseFloat(datos[atributo]))) {
                    sum = sum + datos[atributo];
                    cont++;
                }
            }
        });

        if (cont !== 0) {
            var promedio = sum / cont;
            Math.trunc(4);
            return promedio.toFixed(2);
        } else {
            return ("--")
        }


    };

    var mostrarNotasMedio = function (datos) {
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '<th>Pr</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e1_1 + '</td>' +
                '<td>' + datos[i].e1_2 + '</td>' +
                '<td>' + datos[i].e1_3 + '</td>' +
                '<td>' + datos[i].e1_4 + '</td>' +
                '<td>' + datos[i].e1_5 + '</td>' +
                '<td>' + datos[i].e1_6 + '</td>' +
                '<td>' + datos[i].conduc_1 + '</td>' +
                '<td>' + promedio(datos[i], 1) + '</td>' +
                '</tr>';
        }
        $("#tablaPrimerTrimestreM").append(d);


        '<h1>Segundo Trimestre</h1>'
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '<th>Pr</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e2_1 + '</td>' +
                '<td>' + datos[i].e2_2 + '</td>' +
                '<td>' + datos[i].e2_3 + '</td>' +
                '<td>' + datos[i].e2_4 + '</td>' +
                '<td>' + datos[i].e2_5 + '</td>' +
                '<td>' + datos[i].e2_6 + '</td>' +
                '<td>' + datos[i].conduc_2 + '</td>' +
                '<td>' + promedio(datos[i], 2) + '</td>' +
                '</tr>';

        }
        $("#tablaSegundoTrimestreM").append(d);


        '<h1>Tercer Trimestre</h1>'
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '<th>Pr</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e3_1 + '</td>' +
                '<td>' + datos[i].e3_2 + '</td>' +
                '<td>' + datos[i].e3_3 + '</td>' +
                '<td>' + datos[i].e3_4 + '</td>' +
                '<td>' + datos[i].e3_5 + '</td>' +
                '<td>' + datos[i].e3_6 + '</td>' +
                '<td>' + datos[i].conduc_3 + '</td>' +
                '<td>' + promedio(datos[i], 3) + '</td>' +
                '</tr>';
        }
        $("#tablaTercerTrimestreM").append(d);
        $("#cargarNotasTrimestralM").removeClass('hide');
    };

    
    var mostrarNotasMedioCuarentena = function (datos) {
        var d = '<tr>' +
                    '<th>Materia</th>' +
                    '<th>c1</th>' +
                    '<th>c2</th>' +
                    '<th>Definitiva</th>' +
                '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                    '<td>' + datos[i].nombre + '</td>' +
                    '<td>' + notaCorrecta(datos[i].r343_1) + '</td>' +
                    '<td>' + notaCorrecta(datos[i].r343_2) + '</td>' +
                    '<td>' + notaCorrecta(datos[i].definitiva) + '</td>' +
                '</tr>';
        }
        $("#tablaNotasMedioCuarentena").append(d);

        $("#mostrarNotasMedioCuarentena").removeClass('hide');
    };

    //MEDIO NOCTURNO 
    var mostrarNotasMedioNocturno = function (datos) {
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>R1</th>' +
            '<th>c2</th>' +
            '<th>R2</th>' +
            '<th>c3</th>' +
            '<th>R3</th>' +
            '<th>c4</th>' +
            '<th>R4</th>' +
            '<th>c5</th>' +
            '<th>R5</th>' +
            '<th>c6</th>' +
            '<th>R6</th>' +
            '<th>c7</th>' +
            '<th>R7</th>' +
            '<th>c8</th>' +
            '<th>R8</th>' +
            '<th>IA</th>' +
            '<th>Promedio</th>' +
            '</tr>';

        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].c1 + '</td>' +
                '<td>' + datos[i].r1 + '</td>' +
                '<td>' + datos[i].c2 + '</td>' +
                '<td>' + datos[i].r2 + '</td>' +
                '<td>' + datos[i].c3 + '</td>' +
                '<td>' + datos[i].r3 + '</td>' +
                '<td>' + datos[i].c4 + '</td>' +
                '<td>' + datos[i].r4 + '</td>' +
                '<td>' + datos[i].c5 + '</td>' +
                '<td>' + datos[i].r5 + '</td>' +
                '<td>' + datos[i].c6 + '</td>' +
                '<td>' + datos[i].r6 + '</td>' +
                '<td>' + datos[i].c7 + '</td>' +
                '<td>' + datos[i].r7 + '</td>' +
                '<td>' + datos[i].c8 + '</td>' +
                '<td>' + datos[i].r8 + '</td>' +
                '<td>' + datos[i].ia + '</td>' +
                '<td>' + datos[i].promedio + '</td>' +
                '</tr>';
        }
        $("#tablaNocturnoM").append(d);
        $("#mostrarNotasMedioNocturno").removeClass('hide');
    };

    //MEDIO ADAPTACION  - CUATRIMESTRAL
    var mostrarNotasMedioAdaptacion = function (datos) {
        '<h1>Primer Cuatrimestre</h1>'
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e1_1 + '</td>' +
                '<td>' + datos[i].e1_2 + '</td>' +
                '<td>' + datos[i].e1_3 + '</td>' +
                '<td>' + datos[i].e1_4 + '</td>' +
                '<td>' + datos[i].e1_5 + '</td>' +
                '<td>' + datos[i].e1_6 + '</td>' +
                '<td>' + datos[i].conduc_1 + '</td>' +
                '</tr>';
        }
        $("#tablaPrimerCuatrimestreM").append(d);

        '<h1>Segundo Cuatrimestre</h1>'
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e2_1 + '</td>' +
                '<td>' + datos[i].e2_2 + '</td>' +
                '<td>' + datos[i].e2_3 + '</td>' +
                '<td>' + datos[i].e2_4 + '</td>' +
                '<td>' + datos[i].e2_5 + '</td>' +
                '<td>' + datos[i].e2_6 + '</td>' +
                '<td>' + datos[i].conduc_2 + '</td>' +
                '</tr>';

        }
        $("#tablaSegundoCuatrimestreM").append(d);
        $("#mostrarNotasMedioAdaptacion").removeClass('hide');
    };

    //MEDIO BIMESTRAL
    var mostrarNotasMedioBimestral = function (datos) {

        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>1 Bimestre</th>' +
            '<th>2 Bimestre</th>' +
            '<th>3 Bimestre</th>' +
            '<th>4 Bimestre</th>' +
            '<th>Calificación Final</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            var n1 = (datos[i].e1_1) / 10;
            var n2 = (datos[i].e1_2) / 10;
            var n3 = (datos[i].e1_3) / 10;
            var n4 = (datos[i].e1_4) / 10;
            var numero = (datos[i].definitiva) / 10;
            var final = Number(numero.toFixed(2));


            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + n1 + '</td>' +
                '<td>' + n2 + '</td>' +
                '<td>' + n3 + '</td>' +
                '<td>' + n4 + '</td>' +
                '<td>' + final + '</td>' +
                '</tr>';
        }
        $("#tablaBimestralM").append(d);

        $("#mostrarNotasBimestral").removeClass('hide');
    };
    // PRIMARIO CUALITATIVA
    /*var mostrarNotasCualitativa = function (datos) {


        console.log(datos);

        $('#notasCualitativas').removeClass('hide');
        $('#contenedorMaterias').removeClass('hide');

        if (datos.datos_notas.length > 0) {
            if (datos.forma_cursado == "T") {
                $('.titulo1').removeClass('hide');
                $('.titulo2').removeClass('hide');
                $('.titulo3').removeClass('hide');
                $('.titulo1').text("Primer Trimestre");
                $('.titulo2').text("Segundo Trimestre");
                $('.titulo3').text("Tercer Trimestre");


                if (datos.datos_notas[0].obs_1 == null || datos.datos_notas[0].obs_1 == "" || datos.datos_notas[0].obs_1 == undefined) {

                    $('.observacionPrimero').text("");
                    $('.observacionPrimero').removeClass('hide');

                } else {
                    $('.observacionPrimero').text(datos.datos_notas[0].obs_1);
                    $('.observacionPrimero').removeClass('hide');
                }
                if (datos.datos_notas[0].obs_2 == null || datos.datos_notas[0].obs_2 == "" || datos.datos_notas[0].obs_2 == undefined) {
                    $('.observacionSegundo').text("");
                    $('.observacionSegundo').removeClass('hide');
                } else {
                    $('.observacionSegundo').text(datos.datos_notas[0].obs_2);
                    $('.observacionSegundo').removeClass('hide');


                }
                if (datos.datos_notas[0].obs_3 != null || datos.datos_notas[0].obs_3 != "" || datos.datos_notas[0].obs_3 != undefined) {
                    $('.observacionTercero').text("");
                    $('.observacionTercero').removeClass('hide');
                } else {

                    $('.observacionTercero').text(datos.datos_notas[0].obs_3);
                    $('.observacionTercero').removeClass('hide');

                }

            }
            if (datos.forma_cursado == "E") {

                $('.titulo1').removeClass('hide');
                $('.titulo2').removeClass('hide');
                $('.titulo1').text("Primer Cuatrimestre");
                $('.titulo2').text("Segundo Cuatrimestre");



                if (datos.datos_notas[0].obs_1 != null || datos.datos_notas[0].obs_1 != "" || datos.datos_notas[0].obs_1 != undefined) {
                    $('.observacionPrimero').text("");
                    $('.observacionPrimero').removeClass('hide');
                } else {

                    $('.observacionPrimero').text(datos.datos_notas[0].obs_1);
                    $('.observacionPrimero').removeClass('hide');
                }
                if (datos.datos_notas[0].obs_2 != null || datos.datos_notas[0].obs_2 != "" || datos.datos_notas[0].obs_2 != undefined) {
                    $('.observacionSegundo').text("");
                    $('.observacionSegundo').removeClass('hide');
                } else {
                    $('.observacionSegundo').text(datos.datos_notas[0].obs_2);
                    $('.observacionSegundo').removeClass('hide');

                }


            }
        } else {
            $('.error').text('No hay ninguna nota cargada');

        }
    };*/

    //MEDIO CUALITATIVA
    var mostrarNotasMedioCualitativa = function (datos) {
        $('#notas_cualitativas_medio').removeClass('hide');

        var contenedor1 = $('#contenedor_materias_cualitativa_medio1');
        var itemPadre1 = $('#card_medio_cualitativo1');

        var contenedor2 = $('#contenedor_materias_cualitativa_medio2');
        var itemPadre2 = $('#card_medio_cualitativo2');

        var contenedor3 = $('#contenedor_materias_cualitativa_medio3');
        var itemPadre3 = $('#card_medio_cualitativo3');

		var contenedor4 = $('#contenedor_materias_cualitativa_medio4');
        var itemPadre4 = $('#card_medio_cualitativo4');															   

        if (datos.datos_notas.length > 0) {

            $('#tabla_medio_cualitativo1').removeClass('hide');
            $('#tabla_medio_cualitativo2').removeClass('hide');
            $('#tabla_medio_cualitativo3').removeClass('hide');
            $('#tabla_medio_cualitativo4').removeClass('hide');
			var data = datos.datos_notas;

            $('#titulo1').removeClass('hide');
            $('#titulo1').text('1° PERIODO ');

            $('#titulo2').removeClass('hide');
            $('#titulo2').text('2° PERIODO ');

            $('#titulo3').removeClass('hide');
            $('#titulo3').text('3° PERIODO ');
			$('#titulo4').removeClass('hide');
            $('#titulo4').text('VALORACION FINAL');								   
            //console.table(data);

            $.each(data, function (ind, elem) {
                let item = itemPadre1.clone(true, true);
                item.attr('id', 'row' + (ind));
                item.removeClass('hide');

                item.find('.nombreMateriaCualitativo1').text(elem.materia);
                if (elem.o1 === null || elem.o1 === undefined || elem.o1 === "") {
                    item.find('.observacionMateriaCualitativo1').text("");
                } else {
                    item.find('.observacionMateriaCualitativo1').text(elem.o1);
                }
                contenedor1.append(item);
            });

            $.each(data, function (ind, elem2) {
                let item2 = itemPadre2.clone(true, true);
                //item2.attr('id', 'row' + (ind));
                item2.removeClass('hide');

                item2.find('.nombreMateriaCualitativo2').text(elem2.materia);
                if (elem2.o2 === null || elem2.o2 === undefined || elem2.o2 === "") {
                    item2.find('.observacionMateriaCualitativo2').text("");
                } else {
                    item2.find('.observacionMateriaCualitativo2').text(elem2.o2);
                }
                contenedor2.append(item2);
            });

            $.each(data, function (ind, elem3) {
                let item3 = itemPadre3.clone(true, true);
                //item3.attr('id', 'row' + (ind));
                item3.removeClass('hide');

                item3.find('.nombreMateriaCualitativo3').text(elem3.materia);
                if (elem3.o3 === null || elem3.o3 === undefined || elem3.o3 === "") {
                    item3.find('.observacionMateriaCualitativo3').text("");
                } else {
                    item3.find('.observacionMateriaCualitativo3').text(elem3.o3);
                }
                contenedor3.append(item3);
            });

			$.each(data, function (ind, elem4) {
                let item4 = itemPadre4.clone(true, true);
                //item3.attr('id', 'row' + (ind));
                item4.removeClass('hide');

                item4.find('.nombreMateriaCualitativo4').text(elem4.materia);
                if (elem4.o4 === null || elem4.o4 === undefined || elem4.o4 === "") {
                    item4.find('.observacionMateriaCualitativo4').text("");
                } else {
                    item4.find('.observacionMateriaCualitativo4').text(elem4.o4);
                }
                contenedor4.append(item4);
            });									
        } else {
            $('#mensaje').removeClass('hide')
            $('#mensaje').html('<tr><td>No hay notas cargadas </td></tr>');
        }

    };

    //OBSERVACIONES CUARENTENA 
    var mostrarObservacionCuarentena = function (datos) {
        
        if (!isEmpty(datos[0].obs_1)) {
            $('#observacion1').removeClass('hide');
            $('#mensajeObservacion1').text(datos[0].obs_1);
        }

        if (!isEmpty(datos[0].obs_2)) {
            $('#observacion2').removeClass('hide');
            $('#mensajeObservacion2').text(datos[0].obs_2);
        }
       
        if(!isEmpty(datos[0].obs_3)){
            $('#observacion3').removeClass('hide');
            $('#mensajeObservacion3').text(datos[0].obs_3);
        }

    };
    //metodos publicos

    return {
        //main function to initiate the module
        init: function () {
            inicializacionDeComponentes();
        },
        cargarTotalSanciones: function (respuesta) {

            if (respuesta.estado) {
                mostrarSanciones(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }

        },
        /*cargarDatos: function (respuesta) {

            if (respuesta.estado) {
                mostrarDatos(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }

        },*/
        cargarListadoSanciones: function (respuesta) {

            if (respuesta.estado) {
                mostrarListadoSanciones(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarListadoInasistencias: function (respuesta) {

            if (respuesta.estado) {
                mostrarListadoInasistencias(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarMensajes: function (respuesta) {
            if (respuesta.estado) {
                mostrarMensajes(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },
        //NOTA CUALITATIVA
        /*cargarNotasCualitativa: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasCualitativa(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },*/
        cargarNotasCualitativaMedio: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                if (respuesta.objeto.forma_cursado !== 'B') {
					$('.boton-notas-cualitativa').removeClass('hide');
					var alumno_nivel = localStorage.getItem('alumno_nivel');
                    var colegio = localStorage.getItem('colegio');
                    //if (alumno_nivel !== 'P' && colegio !== '0032') {
                        /*console.log(alumno_nivel + ' lalals ' + colegio);
                        if (respuesta.objeto.datos_notas.length > 0) {*/
                        mostrarNotasMedioCualitativa(respuesta.objeto);
                    //}
                }
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarObservacionCuarentena: function (respuesta) {
            chauHodooor();

            //console.log(respuesta.objeto[0].obs_1);
            //console.table(respuesta.objeto);
            if (respuesta.objeto.length > 0) {
                //console.log('muestro observacion');
                mostrarObservacionCuarentena(respuesta.objeto);
            } else {
                console.log('no muestro observacion');
            }
        },

        //INICIAL
        cargarNotasInicial: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasInicial(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        //PRIMARIO
        cargarNotasPrimario: function (respuesta) {
            //console.log(respuesta.objeto.datos_notas);
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasPrimario(respuesta.objeto.datos_notas);
            } else {
                alert(respuesta.mensaje);
            }
        },

        //MEDIO


        /****ELIMINAR ESTE FRAGMENTO POST CUARENTENA********* */
        cargarNotasMedioCualitativo : function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {

                if (respuesta.objeto.forma_cursado == 'B') {
                    mostrarNotasMedioBimestral(respuesta.objeto.datos_notas);
                    mostrarNotasMedioCualitativo(respuesta.objeto.datos_notas);

                } else {

                }    
            } else {
                alert(respuesta.mensaje);
            }
        },

        //MEDIO CUARENTENA (eliminar cuando pase todo esto )
        cargarNotasMedioCuarentena: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {                
				 console.log(respuesta)   ;    
                if (respuesta.objeto.datosCursado.forma_calificacion == 'B') {
                    mostrarNotasMedioBimestral(respuesta.objeto.notas);
                } else {
                    mostrarNotasMedioCuarentena(respuesta.objeto.notas);
                }
            } else {
                alert(respuesta.mensaje);
            }
        },

        /**************************************************** */

        cargarNotasMedio: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                switch (respuesta.objeto.forma_cursado) {  ///////DESCOMENTAR ESTO POST CUARENTENA
                    case 'T':
                        mostrarNotasMedio(respuesta.objeto.datos_notas);
                        mostrarNotasMedioCualitativo(respuesta.objeto.datos_notas);
                        break;

                    case 'E':
                        mostrarNotasMedioAdaptacion(respuesta.objeto.datos_notas);
                        break;

                    case 'A':
                        mostrarNotasMedioNocturno(respuesta.objeto.datos_notas);
                        break;

                    case 'B':
                        mostrarNotasMedioBimestral(respuesta.objeto.datos_notas);
                        mostrarNotasMedioCualitativo(respuesta.objeto.datos_notas);
                        break;

                    case 'C':
                        mostrarNotasMedioCualitativo(respuesta.objeto.datos_notas);
                        break;


                    default:
                        break;
                }
                //mostrarNotasMedio(respuesta.objeto.datos_notas);
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarNotasMedioNocturno: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasMedioNocturno(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarNotasMedioAdaptacion: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasMedioAdaptacion(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },
        cargarNotasMedioBimestral: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasMedioBimestral(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        //TERCIARIO
        cargarNotasTerciario: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasTerciario(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },
        
    };


    function formato(texto) {
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    };
}();

