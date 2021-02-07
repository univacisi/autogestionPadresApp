/* global Api */

var CrearCuenta = function () {
    //variables globales

    //metodos privados
    var inicializacionDeComponentes = function () {


        $('#selectNivel').change(function () {
            var nivel = $('#selectNivel').val();
            if ($('#selectNivel').val() !== "") {
                var objeto = {
                    nivel: nivel
                };
                Api.getSchoolData(objeto, 'PARA_SELECT', CrearCuenta.mostrarColegios);
                hodooor();
            }
        });

        $('#selectColegios').change(function () {
            $('#contenedorDatosAlumno').removeClass('hide');
        });

        $('#botonBuscarAlumno').click(function (e) {
            e.preventDefault();
            //niivel = parseInt($('#selectNivel').val());
            niivel = $('#selectNivel').val();
            if (niivel !== "") {

                if ($('#codigoAlumno').val() !== "") {
                    var alumno = {
                        codigo: $('#codigoAlumno').val(),
                        nivel: niivel
                    }
                    Api.getStudentData(alumno, 'NOMBRE_ALUMNO', CrearCuenta.mostrarNombreAlumno);
                    hodooor();

                } else {
                    swal("Debe ingresar un DNI");
                }
            } else {
                swal("Seleccione el nivel y colegio");
            }

        });

        $('#botonBuscarTutor').click(function (e) {
            e.preventDefault();
            var rol = parseInt($('#selectTutor').val());
            var niivel = $('#selectNivel').val();
            var codigo = $('#codigoAlumno').val();
            var dni = $('#codigoTutor').val();

            if (dni !== "") {
                if (rol !== "") {
                   
                    var alumno = {
                        codigo: codigo,
                        dni: dni,
                        rol: rol,
                        nivel: niivel
                    };

                    Api.getStudentData(alumno, 'NOMBRE_TUTOR', CrearCuenta.mostrarNombreTutor);
                    hodooor();
                } else {
                    swal("Debe seleccionar un rol");
                }
            } else {
                swal("Debe ingresar un DNI");
            }

        });

        $('#botonRegistrar').click(function (e) {
            e.preventDefault();
            var nivel = $('#selectNivel').val();
            var codigo = $('#codigoAlumno').val();
            var rol = $('#selectTutor').val();
            var correo = $('#correoTutor').val();
            var password = $('#pass1').val();

            if (correo === null || correo.length === 0) {

                alert('Debe ingresar un correo  electronico');

            } else {

                if (password === null || password.length === 0) {
                    alert('Debe ingresar una contraseña');
                } else {
                    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correo)) {

                        var alumno = {
                            codigo: codigo,
                            nivel: nivel,
                            password: password,
                            rol: rol,
                            correo: correo
                        };

                        Api.setStudentData(alumno, 'CREAR_USUARIO', CrearCuenta.usuarioOk);
                        hodooor();

                    } else {
                        swal("La dirección de email es incorrecta!.");
                    }

                }
            }

        });

        $('#botonRecuperar').click(function () {
            var Correo_electronico = $('#emailRec').val();
            var Rol = $('#rolRec').val();
            var Codigo = $('#codigoRec').val();
            if (Rol !== "") {

                var alumno = {
                    correo_electronico: Correo_electronico,
                    rol: Rol,
                    codigo: Codigo
                };
                alert(JSON.stringify(alumno))
                Api.setStudentData(alumno, 'VINCULO_CONTRASENIA', CrearCuenta.usuarioOk);
                //Api.setStudentData({json_usuario: JSON.stringify(alumno)}, 'VINCULO_CONTRASENIA', CrearCuenta.usuarioOk);

            }
        });
    };

    var obtenerColegios = function (datos) {
        $('#selectColegios').append($("<option>  </option>")
            .attr("value", ' '));
        $.each(datos, function (index, value) {
            $('#selectColegios').append($("<option></option>")
                .attr("value", value.codigo)
                .text(value.colegio));
        });
    };

    var obtenerNombreAlumno = function (datos) {
        if (datos.length === 0) {
            swal('EL dni o nivel ingresado no corresponde');
        } else {
            if (datos.password === "        " || datos.password === null) {
                $('#nombreAlumno').val(datos.nombre);
                $('#contenedorDatosTutor').removeClass('hide');
            } else {
                $('#nombreAlumno').val(datos.nombre);
                swal("El alumno ya tiene una cuenta creada. Quiere recuperar contraseña? ingrese aqui")
                swal({
                    title: "El alumno ya tiene una cuenta creada",
                    text: "Quiere recuperar contraseña? ",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        //codigo para ir a index
                        if (willDelete) {
                            window.location.assign('https://autogestionpadres.elcolegioencasa.edu.ar/recuperar-pass.html');
                            swal("nos vamos a recuperar contraseña!", {

                            });
                        } else {
                            window.location.assign('index.html');

                        }
                    });
            }

        }
    };

    var obtenerNombreTutor = function (datos) {
        if (datos.length === 0) {
            swal('EL dni o rol ingresado no corresponde');
        } else {
            if (datos.password === "        " || datos.password === null || datos.password === "undefined") {
                $('#contenedorDatosTutor1').removeClass();
                $('#nombreTutor').val(datos.nombre);
                $('#correoTutor').val(datos.correo);
            } else {
                $('#nombreAlumno').val(datos.nombre);
                swal("Ya tienes una cuenta creada. Quieres recuperar la contraseña? ingrese aquí")
                swal({
                    title: "Ya tienes una cuenta creada",
                    text: "Quieres recuperar la contraseña? ",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        //codigo para ir a index
                        if (willDelete) {
                            window.location.assign('https://autogestionpadres.elcolegioencasa.edu.ar/recuperar-pass.html');

                        } else {
                            window.location.assign('index.html');

                        }
                    });
            }

        }
    };

    //metodos publicos
    return {
        //main function to initiate the module
        init: function () {
            inicializacionDeComponentes();
        },

        mostrarColegios: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                obtenerColegios(respuesta.objeto);

            } else {
                swal(respuesta.mensaje);
            }

        },

        mostrarNombreAlumno: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                obtenerNombreAlumno(respuesta.objeto);
            } else {
                swal(respuesta.mensaje);
            }
        },

        mostrarNombreTutor: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                obtenerNombreTutor(respuesta.objeto);
            } else {
                swal(respuesta.mensaje);
            }
        },

        usuarioOk: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                swal("Registro con exito!")
                    .then((value) => {
                        window.location.assign('index.html');
                    });
            } else {
                swal("Atención!");

            }
        },

        setExample: function (g) {
            mostrarExamples(g);
        }
    };


}();


