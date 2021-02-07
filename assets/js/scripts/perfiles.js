/* global Api */
var Perfiles = function () {
    //variables globales
    var codigo;
    var nivel;
    var colegio;
    var usuario;
    var rol;


    //metodos privados
    var inicializacionDeComponentes = function () {
        codigo = localStorage.getItem('alumno_codigo');
        nivel = localStorage.getItem('alumno_nivel');
        colegio = localStorage.getItem('colegio');
        usuario = localStorage.getItem('usuario');
        rol = localStorage.getItem('rol');

        var objeto = {
            codigo: codigo,
            nivel: nivel,
            colegio: colegio,
            usuario: usuario,
            rol: rol
        };

        Api.getStudentData(objeto, 'DATOS_GENERALES', Perfiles.cargarDatos);


    };

    var mostrarDatos = function (datos) {
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
        if (rol === 1 || rol === 3) {

            $('#bienvenida').text('Bienvenido');
        } else {
            $('#bienvenida').text('Bienvenida');
        }
        $('#nombreUsuario').text(datos.usuario);
        console.log(datos);
    };





//metodos publicos
return {
    //main function to initiate the module
    init: function () {
        inicializacionDeComponentes();
    },
    setExample: function (g) {
        mostrarExamples(g);
    },
    cargarDatos: function (respuesta) {

        if (respuesta.estado) {
            mostrarDatos(respuesta.objeto);
        } else {
            alert(respuesta.mensaje);
        }

    },
};
    
    
}();

