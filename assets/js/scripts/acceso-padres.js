var AccesoPadres = function () {
    //variables globales

    //metodos privados
    var inicializacionDeComponentes = function () {

        $('#botonIngresar').click(function (e) {
            e.preventDefault();
            var alumno = $('#dniAlumno').val();
            var usuario = $('#dniUsuario').val();
            var rol = $('#selectTutor').val();
            var contrasenia = $('#pass').val();

            if (alumno === '' || usuario === '' || rol === null || contrasenia === '') {

                console.log('AGREGAR ALERTA POR FAVOR');
                swal({
                    icon: "warning",
                    type: 'error',
                    title: 'Falta ingresar algún dato',
                    text: 'Verifique que todos los campos esten cargados',

                });
            } else {
                Api.ingresar(alumno, usuario, rol, contrasenia, AccesoPadres.ingreso);
                //hodooor();
            }
        });


        $('#selectNivel').change(function () {
            Api.getSchoolData(null, 'PARA_SELECT', AccesoPadres.mostrarColegios);
        });

    };
    var obtenerColegios = function (datos) {

        $.each(datos, function (index, value) {
            $('#selectColegios').append($("<option></option>")
                    .attr("value", value.codigo)
                    .text(value.colegio));
        });
    };
//  
    //metodos publicos
    return {
        //main function to initiate the module
        init: function () {

            inicializacionDeComponentes();
        },
        mostrarColegios: function (respuesta) {
            if (respuesta.estado) {
                obtenerColegios(respuesta.objeto);
            } else {

                alert(respuesta.mensaje);
            }

        },

        login: function (respuesta) {

            var done = 0;
            var usuario = document.login.usuario.value;
            var password = document.login.password.value;
            if (usuario == "USUARIO1" && password == "CONTRASEÑA1") {
                window.location = "TU_PAGINA_WEB.HTML";
            }
            if (usuario == "USUARIO2" && password == "CONTRASEÑA2") {
                window.location = "TU_PAGINA_WEB.HTML";
            }
            if (usuario == "" && password == "") {
                window.location = "errorpopup.html";
            }


        },
        ingreso: function (respuesta) {
            //chauHodooor();
            if (respuesta.estado) {
                window.location.assign('cursado.html');
            } else {
                alert(respuesta.mensaje);
            }

        },

        setExample: function (g) {
            mostrarExamples(g);
        },
    };


}();
