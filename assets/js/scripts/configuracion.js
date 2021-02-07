/* global Api */

var Configuracion = function () {
    //variables globales
    var codigo;
    var rol;

    //metodos privados
    var inicializacionDeComponentes = function () {
        codigo = localStorage.getItem('alumno_codigo');
        rol = localStorage.getItem('rol');

        var objeto = {
            codigo: codigo,
            rol: rol
        };

        Api.getStudentData(objeto, 'OBTENER_CONFIGURACION', Configuracion.cargarConfiguracion);

    };

    var mostrarConfiguracion = function (datos) {
        $('.cNombre').text(datos.nombre);
        $('.cDni').text(datos.dni);
        $('.cTelefono').text(datos.telefono);
        $('.cDireccion').text(datos.direccion);
        $('.cCorreo').text(datos.correo);
        console.log(datos);
    };

    $('.btnContrasenia').click(function () {
        var contrasenia1 = $('#pass1').val();
        var contrasenia2 = $('#pass2').val();
        var contrasenia = $('#pass3').val();
        var codigo = localStorage.getItem('alumno_codigo');
        var rol = localStorage.getItem('rol');
        var usuario =  localStorage.getItem('usuario');
        var colegio = localStorage.getItem('colegio')

        if (contrasenia1 === contrasenia2) {
            if (contrasenia1.length >= 6 && contrasenia1.length <= 10) {
                var objeto = {
                    colegio : colegio,
                    codigo: codigo, 
                    usuario : usuario,
                    rol: rol,
                    contrasenia: contrasenia,
                    contraseniaNueva: contrasenia1                   
                };
                Api.setStudentData(objeto, 'MODIFICAR_CONTRASENIA', Configuracion.contraseniaOk);
                hodooor();
            } else {
                swal("la cotraseña debe tener de 6  a 10 caracteres");
            }
        } else {
            swal('Las contraseñas no coinciden');
        }

    });

    //metodos publicos
    return {
        //main function to initiate the module
        init: function () {
            inicializacionDeComponentes();
        },
        cargarConfiguracion: function (respuesta) {
            if (respuesta.estado) {
                mostrarConfiguracion(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },
        contraseniaOk: function (respuesta) {
            chauHodooor()
            if (respuesta.estado) {
                swal(respuesta.mensaje);
                swal('','Se camio correctamente la contraseña','success');
               

               
                // location.reload();
            } else {
                swal("Atención!", {
                    icon: "error",
                });
            }
        },
        setExample: function (g) {
            mostrarExamples(g);
        }
    };
}();