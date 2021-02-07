function Response(estado, mensaje) {
    this.estado = estado;
    this.mensaje = mensaje;
    this.objeto;
}

function checkPass() {
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if (pass1.value === pass2.value) {
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Las contraseñas coinciden!";
        $('#botonRegistrar').prop('disabled', false);
    } else {
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Las contraseñas no coinciden";
    }
}

function valida(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla === 8) {
        return true;
    }

    // Patron de entrada, en este caso solo acepta numeros
    patron = /[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
        alert("La dirección de email " + valor + " es correcta!.");
    } else {
        alert("La dirección de email es incorrecta!.");
    }
}


function formato(texto) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
}


function hodooor() {
    var options = {
        theme: "sk-cube-grid",
        //message:'some cool message for your user here ! Or where the logo is ! Your skills are the only limit. ',
        backgroundColor: "#000000",
        //textColor:"white"
    };

    HoldOn.open(options);
};

function chauHodooor() {
    HoldOn.close();
};

function justNumbers(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
        return true;

    return /\d/.test(String.fromCharCode(keynum));
};

$('#cerrarSesion').click(function (e) {
    e.preventDefault();
    localStorage.clear();
    location.href = "index.html";
});


function sesionCerrada(){
    $codigo = localStorage.getItem('alumno_codigo');
    $colegio = localStorage.getItem('colegio');

    if($codigo === "" || $codigo === null || $codigo === undefined || $colegio === "" || $colegio === null || $colegio === undefined){
        localStorage.clear();
        location.href = "index.html";
    }
}


function notaCorrecta(nota){
    if (nota !== null && nota !== 'null' && nota !== '' && nota !== undefined && nota !== 0 ) {
        return nota;
    }else{
        return '--';
    }
}


function isEmpty(data) {
    var r;
    switch (data) {
        case "":
        case undefined:
        case "undefined":
        case null:
        case "null":
            r = true;
            break;

        default:
            r = false;
            break;
    }
    return r;
}
