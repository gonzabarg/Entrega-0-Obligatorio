//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let array = [];
let botonLogin = document.getElementsByTagName("button")[0];
botonLogin.id = "botonLogin";


var loginUsuario = () => {

  const mail = document.getElementById("inputEmail").value;
  const contraseña = document.getElementById("inputPassword").value;
  if (mail && contraseña) {

    

    array.push({mail:mail,contraseña:btoa(contraseña)});
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPassword").value = "";
    
    
    window.localStorage.setItem("array", JSON.stringify(array));
    window.location = "index.html";

  } else {
    alert("Correo electrónico y contraseña no deben ser vacíos");
  }
  
};



document.addEventListener("DOMContentLoaded",() => {
    document.getElementById("botonLogin").addEventListener("click", loginUsuario);
});