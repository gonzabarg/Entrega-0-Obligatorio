let userDataArray = [];
const saveDataBtn = document.getElementById("personalDataBtn");

//Función que guarda la información ingresada por el usuario en LocalStorage

function saveUserData () {
    let name = document.getElementById("firstName").value;
    let lastname = document.getElementById("lastName").value;
    let datebirth = document.getElementById("dateBirth").value;
    let email = document.getElementById("email").value
    let phone = document.getElementById("phoneNumber").value;

    if (name && lastname && datebirth && email && phone) {
        userDataArray.push({name:name + ' ' + lastname, datebirth:datebirth, email:email, phone:phone});


        window.localStorage.setItem("userDataArray", JSON.stringify(userDataArray));

        
        name = '';
        lastname = '';
        datebirth = '';
        email = '';
        phone = '';

    } else {
        return "Debe completar todos los campos"
    }
};

// Función que toma como parámetro el objeto guardado en Local Storage y lo muestra en pantalla.

function showUserData (x) {
    

    let storedName = document.getElementById("storedUserName");
    let storedEmail = document.getElementById("storedEmail");
    let storedDateBirth = document.getElementById("storedDateBirth");
    let storedPhone = document.getElementById("storedPhone");

    if (x != null) {

        let userDataArray = x[0];

        storedName.innerHTML = userDataArray.name;
        storedEmail.innerHTML = userDataArray.email;
        storedDateBirth.innerHTML = userDataArray.datebirth;
        storedPhone.innerHTML = userDataArray.phone;
    }
};


document.addEventListener("DOMContentLoaded", function (e) {

    const obj = JSON.parse(localStorage.getItem("userDataArray"));

    saveDataBtn.addEventListener('click', function() {
        saveUserData();

        location.reload();
    })

    showUserData(obj);
});