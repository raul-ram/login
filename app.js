//Login instancia del proveedor
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            //usuario logueado
            console.log(result.user);
            guardaDatos(result.user);
            $('#login').hide();
            $('#root').append("<img src='" + result.user.photoURL + "'/>");
        });
});

//esta funcion guarda datos automaticamente
function guardaDatos(user){
    var usuario = {
        uid:user.uid,
        nomnbre:user.displayName,
        email:user.email,
        foto:user.photoURL
    }
    firebase.database().ref("persona/"+user.uid)
    .set(usuario) 
}

//Escribir en la base de datos
$('#guardar').click(function () {
    firebase.database().ref("persona")
        .set({
            nombre: "juan",
            ap: "perez",
            am: "arce"
        })
});

//lectura de datos de la BD
firebase.database().ref("persona")
.on("child_added", function(s){
    var user = s.val();
    $('#root').append("<img width='100px' src='" + user.foto + "'/>");
})``