document.addEventListener("DOMContentLoaded", function(e){
  const obj =JSON.parse(localStorage.getItem("array"));  

    

    if (obj == null) {
      window.location = "login.html";
     }
      
  });