/* global moment, URL */

var Api = function () {
    //variables globales

    var urlBase = 'https://www.univac.com.ar/api'; //servidor

    //var token = "";
    //metodos privados

    var expiroSesion = function (data, callback) {
        if (data.mensaje.toUpperCase() === 'Wrong number of segments'.toUpperCase() || data.mensaje.toUpperCase() === 'Expired token'.toUpperCase()) {
            var setView = function (data) {
                window.location.assign(data);
            };
            var data = '../index.php';
            var title = 'Lo sentimos!';
            var type = 'warning';
            var mensaje = 'No se pudo completar la transacción, dado que la sesión expiro. Debe ingresar nuevamente.';
            MensajeConFuncion(title, mensaje, type, setView, data);
            return true;
        } else {
            var respuesta = new Response(false, data.mensaje);
            callback(respuesta);
        }
    };

    var login = function (alumno, usuario, rol, contrasenia, callback) {

        var respuesta;
        var url = urlBase + '/alumno/login';
        $.ajax({
            url: url,
            headers: {
                "codigo": alumno,
                "usuario": usuario,
                "rol": rol,
                "contrasenia": contrasenia
            },

            dataType: 'json',
            async: true,
            crossDomain: true,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            method: 'POST',

            success: function (data) {

                if (!data.error) {
                    console.log(data);
                    console.log(data.datos.codigo);

                    respuesta = new Response(!data.error, "Login");

                    localStorage.setItem('usuario', data.datos.doc);
                    localStorage.setItem('alumno_codigo', data.datos.codigo);
                    localStorage.setItem('alumno_nivel', data.datos.nivel);
                    localStorage.setItem('codigo', data.datos.codigo);
                    localStorage.setItem('colegio', data.datos.colegio);
                    localStorage.setItem('rol', rol);
                    localStorage.setItem('clave', data.datos.clave);
                    localStorage.setItem('cLectivo', data.datos.cLectivo);																		  

                    callback(respuesta);
                } else {
                    respuesta = new Response(!data.error, data.mensaje);
                    callback(respuesta);
                }

            },
            error: function (xhr, status) {

                console.log(status);
                respuesta = new Response(false, "Ocurrio un problema en el server.");
                callback(respuesta);
            }//,

        });
    };







    var recuperarContrasenia = function (email, callback) {
        var respuesta;
        var url = urlBase + '/usuario/vinculoContrasenia';
        var formData = new FormData();
        formData.append('correo_electronico', email);
        $.ajax({
            url: url,
            "async": true,
            "crossDomain": true,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (data) {
                if (!data.error) {
                    //se envio el mensaje
                    respuesta = new Response(true, data.mensaje);
                    callback(respuesta);
                } else {
                    //no se envio
                    respuesta = new Response(false, data.mensaje);
                    callback(respuesta);
                }
            },
            error: function (xhr, status) {
                console.log(status);
                respuesta = new Response(false, "Ocurrio un problema en el server.");
                callback(respuesta);
            }//,

        });
    };

    var resetContrasenia = function (email, contrasenia, codigo, callback) {
        var respuesta;
        var url = urlBase + '/usuario/restablecerContrasenia';
        var formData = new FormData();
        formData.append('correo_electronico', email);
        formData.append('codigo', codigo);
        formData.append('contrasenia', contrasenia);
        $.ajax({
            url: url,
            "async": true,
            "crossDomain": true,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (data) {
                if (!data.error) {
                    //se envio el mensaje
                    respuesta = new Response(true, data.mensaje);
                    callback(respuesta);
                } else {
                    //no se envio
                    respuesta = new Response(false, data.mensaje);
                    callback(respuesta);
                }

            },
            error: function (xhr, status) {
                console.log(status);
                respuesta = new Response(false, "Ocurrio un problema en el server.");
                callback(respuesta);
            }//,

        });
    };
    var obtenerToken = function () {
        if (token !== "") {
            return token;
        } else {
            var localToken = localStorage.getItem("token");
            if (localToken !== "bearer undefined" && localToken !== null) {
                return localToken;
            } else {
                return "";
            }
        }
    };
    var validarUnicoEmail = function (email, callback) {
        var respuesta;
        var url = urlBase + '/usuario/verificarDuplicado?correo_electronico=' + email;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            contentType: 'multipart/form-data',
            success: function (data) {
                if (!data.duplicado) {
                    respuesta = new Response(true, "El email no existe en la base de datos");
                    callback(respuesta);
                } else {
                    respuesta = new Response(false, "Ya existe un usuario con el email " + email);
                    callback(respuesta);
                }
            },
            error: function (data) {
                respuesta = new Response(false, "Ocurrio un problema en el servidor. Intente nuevamente.");
                callback(respuesta);
            }
        });
    };



    //METODOS GENERICOS PARA MINIMIZAR LA CANTIDAD DE METODOS
    //GUARDAR IMAGEN 

    var obtenerDatos = function (path_ws, callback) {
        var respuesta;
        var url = urlBase + path_ws;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/x-www-form-urlencoded',
            //            headers: {
            //                Authorization: getToken()
            //            },
            success: function (data) {
                respuesta = new Response(true, "");
                respuesta.objeto = data.datos;
                callback(respuesta);
            },
            error: function (data) {
                console.log(data);
                respuesta = new Response(false, 'Ocurrio un problema en el servidor.');
                callback(respuesta);
            }
        });
    };

    var guardarDatos = function (objetoPorGuardar, fd, ws, callback) {
        var respuestaJson;
        var url = urlBase + ws;

        for (var pair of fd.entries()) {
            if (typeof pair[1] === 'object') {
                console.log(pair[0] + ', ' + JSON.stringify(pair[1]));
            } else {
                console.log(pair[0] + ', ' + pair[1]);
            }
        }

        $.ajax({
            url: url,
            "async": true,
            "crossDomain": true,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            data: fd,
            dataType: 'json',

            success: function (data) {
                if (!data.error) {
                    //se gaurdo la data
                    respuestaJson = new Response(true, data.mensaje);
                    if (data.hasOwnProperty('datos')) {
                        respuestaJson.objeto = data.datos;
                    } else {
                        if (data.hasOwnProperty('id')) {
                            respuestaJson.objeto = data.id;
                        } else {
                            respuestaJson.objeto = objetoPorGuardar;
                        }
                    }
                    callback(respuestaJson);
                } else {
                    //no se guardo
                    respuestaJson = new Response(true, data.mensaje);
                    callback(respuestaJson);
                }

            },
            error: function (xhr, status) {
                console.log(status);
                respuestaJson = new Response(false, "Ocurrio un problema en el server.");
                callback(respuestaJson);
            }

        });
    };

    var guardarDatosJSON = function (objetoPorGuardar, ws, callback) {
        var respuestaJson;
        var url = urlBase + ws;
        console.log(objetoPorGuardar);
        objetoPorGuardar = JSON.stringify(objetoPorGuardar);

        $.ajax({
            url: url,
            async: true,
            crossDomain: true,
            cache: false,
            contentType: 'application/x-www-form-urlencoded',
            processData: false,
            method: 'POST',
            type: 'POST',
            data: objetoPorGuardar,

            //            headers: {
            //                Authorization: getToken()
            //            },
            success: function (data) {
                console.log(data);
                data = JSON.parse(data);
                if (!data.error) {
                    //se gaurdo la data
                    respuestaJson = new Response(true, data.mensaje);
                    if (data.hasOwnProperty('datos')) {
                        respuestaJson.objeto = data.datos;
                    }
                    if (data.hasOwnProperty('id')) {
                        respuestaJson.objeto = data.id;
                    }
                    callback(respuestaJson);
                } else {
                    //no se guardo
                    respuestaJson = new Response(false, data.mensaje);
                    callback(respuestaJson);
                }

            },
            error: function (xhr, status) {

                console.log(status);
                respuestaJson = new Response(false, "Ocurrio un problema en el server.");
                callback(respuestaJson);
            }

        });
    };

    //FIN METODOS GENERICOS

    //metodos publicos
    return {
        init: function () {

        },
        ingresar: function (alumno, usuario, rol, contrasenia, callback) {
            login(alumno, usuario, rol, contrasenia, callback);
        },

        setClinical: function (objeto, tipo, callback) {
            var ws;
            var formData = new FormData();
            var isFormData = false;
            switch (tipo) {

                case 'ACTIVAR-CUENTA':
                    ws = 'alumno/activar-cuenta';

                    formData.append('cita_id', objeto.id);
                    formData.append('status', objeto.estado);
                    isFormData = true;
                    break;
            }
            if (isFormData) {
                guardarDatos(objeto, formData, ws, callback);
            } else {
                guardarDatosJSON(objeto, ws, callback);
            }

        },
        //paginas en las que implementar profile/data-clinic profile/data-account profile/general-data


        getUrlApi: function (tipo) {
            if (tipo === 'TESTING') {
                return urlTesting;
            }
            if (tipo === 'PRODUCCION') {
                return urlProduccion;
            }
            if (tipo === 'ELABORACION') {
                return urlElaboracion;
            }
            if (tipo === 'ACTUAL') {
                return urlBase;
            }
        },

        getStudentData: function (objeto, tipo, callback) {
            var ws;
            switch (tipo) {
                case 'DATOS_GENERALES':
                    ws = '/alumno/obtenerDatos' +
                        '?codigo=' + objeto.codigo +
                        '&nivel=' + objeto.nivel +
                        '&rol=' + objeto.rol;
                    break;

                case 'SANCION_TOTAL':
                    ws = '/sancion/obtenerTotalSanciones' +
                        '?codigo=' + objeto.codigo;
                    break;
                case 'MENSAJES':
                    ws = '/mensaje/obtener-mensaje' + '?codigo=' + objeto.codigo + '&colegio=' + objeto.colegio + '&clave=' + objeto.clave;
                    break;

                case 'SANCIONES':
                    ws = '/sancion/obtenerListadoSanciones' +
                        '?codigo=' + objeto.codigo;
                    break;
                case 'INASISTENCIAS':
                    ws = '/inasistencia/obtenerListadoInasistencia' +
                        '?codigo=' + objeto.codigo;
                    break;

                case 'NOMBRE_ALUMNO':
                    ws = '/alumno/obtenerNombreConDni' +
                        '?codigo=' + objeto.codigo +
                        '&nivel=' + objeto.nivel;
                    break;
                case 'ROL_TUTOR':
                    ws = '/alumono/obtenerTipoTutor';
                    break;

                case 'NOMBRE_TUTOR':
                    ws = '/alumno/obtenerNombreTutorConDni' +
                        '?codigo=' + objeto.codigo +
                        '&dni=' + objeto.dni +
                        '&rol=' + objeto.rol +
                        '&nivel=' + objeto.nivel;
                    break;

                case 'NOTA_PRIMER_TRIMESTRE':
                    ws = '/nota/obtener-notas-primer-trimestre' +
                        '?codigo=' + objeto.codigo;
                    break;

                case 'NOTA_SEGUNDO_TRIMESTRE':
                    ws = '/nota/obtener-notas-segundo-trimestre' +
                        '?codigo=' + objeto.codigo;
                    break;

                case 'NOTA_TERCER_TRIMESTRE':
                    ws = '/nota/obtener-notas-tercer-trimestre' +
                        '?codigo=' + objeto.codigo;
                    break;
                case 'NOTA':
                    ws = '/nota/obtener-notas' +
                        '?codigo=' + objeto.codigo +
                        '&nivel=' + objeto.nivel+
                        '&cLectivo=' + objeto.cLectivo;
                    break;
                
                case 'NOTA_MEDIO_CUARENTENA':
                    ws = '/nota/obtener-notas-medio-cuarentena' +
                        '?codigo=' + objeto.codigo+
                        '&cLectivo=' + objeto.cLectivo;   		  
                    break;

                case 'NOTA_CUALITATIVA':
                    ws = '/nota/obtener-notas-cuarentena' +
                        '?codigo=' + objeto.codigo +
                        '&nivel=' + objeto.nivel+
                        '&cLectivo=' + objeto.cLectivo;  
                    break;

                case 'OBSERVACION_CUALITATIVA':
                    ws = '/nota/obtener-observacion-cuarentena' +
                        '?codigo=' + objeto.codigo;
                    break;

                case 'OBTENER_CONFIGURACION':
                    ws = '/alumno/verConfiguraciones' +
                        '?codigo=' + objeto.codigo +
                        '&rol=' + objeto.rol;
                    break;

                default:
                    alert('No existe ws');
                    break;
            }
            obtenerDatos(ws, callback);
        },

        getSchoolData: function (objeto, tipo, callback) {
            var ws;
            switch (tipo) {
                case 'PARA_SELECT_INI':
                    ws = '/colegio/obtenerColegioInicialParaSelect';
                    break;
                case 'PARA_SELECT_PRI':
                    ws = '/colegio/obtenerColegioPrimarioParaSelect';
                    break;
                case 'PARA_SELECT_MED':
                    ws = '/colegio/obtenerColegioMedioParaSelect';
                    break;
                case 'PARA_SELECT_TER':
                    ws = '/colegio/obtenerColegioTerciarioParaSelect';
                    break;
                case 'PARA_SELECT':
                    ws = '/colegio/obtenerColegiosParaSelect' +
                        '?nivel=' + objeto.nivel;
                    break;


                default:
                    alert('No existe ws');
                    break;
            }
            obtenerDatos(ws, callback);
        },

        setStudentData: function (objeto, tipo, callback) {
            var ws;
            var formData = new FormData();
            var isFormData = false;
            switch (tipo) {

                //case 'CREAR_USUARIO':
                //    ws = '/alumno/nuevoUsuario';
                //    isFormData = false;
                //    break;

                case 'CREAR_USUARIO':
                    ws = '/alumno/nuevoUsuario';
                    formData.append('codigo', objeto.codigo);
                    formData.append('nivel', objeto.nivel);
                    formData.append('password', objeto.password);
                    formData.append('rol', objeto.rol);
                    formData.append('correo', objeto.correo);
                    isFormData = true;
                    break;

                case 'VINCULO_CONTRASENIA':
                    ws = '/alumno/vinculoContrasenia';
                    formData.append('correo_electronico', objeto.correo_electronico);
                    formData.append('codigo', objeto.codigo);
                    formData.append('rol', objeto.rol);
                    isFormData = true;
                    break;

                case 'RESTABLECER_CONTRASENIA':
                    ws = '/alumno/restablecerContrasenia';
                    isFormData = true;
                    formData.append('correo_electronico', objeto.correo_electronico);
                    formData.append('codigo', objeto.codigo);
                    formData.append('contrasenia', objeto.contrasenia);
                    formData.append('id', objeto.id);
                    formData.append('rol', objeto.rol);
                    break;

                case 'MODIFICAR_CONTRASENIA':
                    ws = '/alumno/modificar-contrasenia';
                    isFormData = true;
                    formData.append('colegio', objeto.colegio);
                    formData.append('codigo', objeto.codigo);
                    formData.append('usuario', objeto.usuario);
                    formData.append('rol', objeto.rol);
                    formData.append('contrasenia', objeto.contrasenia);
                    formData.append('contraseniaNueva', objeto.contraseniaNueva);
                    break;

                default:
                    MensajeAdvertencia('FALTA WS');
                    return;
            }
            if (isFormData) {
                guardarDatos(objeto, formData, ws, callback);
            } else {
                guardarDatosJSON(objeto, ws, callback);
            }

        }

    };
}();

