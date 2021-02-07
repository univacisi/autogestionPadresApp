/* global hola */

var RecuperarPass = function () {
    //variables globales

    //metodos privados
    var inicializacionDeComponentes = function () {
        //var codigo = localStorage.getItem('alumno_codigo');

        $('#botonRecuperar').click(function (e) {
            e.preventDefault();
            var Correo_electronico = $('#emailRec').val();
            var Rol = $('#rolRec').val();
            var Codigo = $('#codigoRec').val();
            if (Rol === null || Correo_electronico === '' || Codigo === '') {
                alert("Verificar que esten todos los campos cargados");

            } else {
                var alumno = {
                    correo_electronico: Correo_electronico,
                    rol: Rol,
                    codigo: Codigo
                };

                Api.setStudentData(alumno, 'VINCULO_CONTRASENIA', RecuperarPass.recuperarOk);

            }
        });

    };

    //metodos publicos
    return {
        //main function to initiate the module
        init: function () {
            inicializacionDeComponentes();
        },
        recuperarOk: function (respuesta) {

            if (respuesta.estado) {
                alert("Se envio un correo para recuperar la contraseña");
                window.location.assign('index.html');
               
            } else {
                alert("Error!");

            }
        },
        setExample: function (g) {
            mostrarExamples(g);
        }
    };


}();


