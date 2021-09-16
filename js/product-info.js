let newComments = [];


function showImg(array){
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let img = array[i];

        htmlContentToAppend += `
        <img class="mini" src="`+ img +`" alt="">
      `
    }
    document.getElementById("miniaturesContainer").innerHTML += htmlContentToAppend;
    enlargeSelectedImg();
};

function enlargeSelectedImg(array) {
    let mainImg = document.getElementById("mainImg");
    let imgMini = document.getElementsByClassName("mini");

    imgMini[0].onclick = function(){
        mainImg.src = imgMini[0].src;
    };

    imgMini[1].onclick = function(){
        mainImg.src = imgMini[1].src;
    };

    imgMini[2].onclick = function(){
        mainImg.src = imgMini[2].src;
    };

    imgMini[3].onclick = function(){
        mainImg.src = imgMini[3].src;
    };

    imgMini[4].onclick = function(){
        mainImg.src = imgMini[4].src;
    };

};

function showRelatedProducts(array){
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        if(product === array[1] || product === array[3]) {

        htmlContentToAppend += `
        <div class="relatedProductsContainer">
            <img src="${product.imgSrc}" class="relatedProductsMini" alt="Portada">
            <h5 class="relatedProductsName">
                <a href="product-info.html">${product.name}</a>
            </h5>
        </div>
         `
        }
    }
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
};

function showComments(array){
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        
        let comment = array[i];


        htmlContentToAppend += `
        <div class="container com">
            <h6 class= "user"><b>${comment.user}</b></h6>
            <p>${showStars(comment)}</p>
            <p class="date">${comment.dateTime}</p>
            <p class="comment">${comment.description}</p>
        </div>
        `
    }
    document.getElementById("commentInnerContainer").innerHTML = htmlContentToAppend;
};

function showStars(comment) {
    let htmlContent = "";

    for (let i = 0; i < comment.score; i++) {
        if(comment.score >= 1 && comment.score <= 5) {
            htmlContent += `
        <span class="fa fa-star checked"></span>
        `
        }
    }
    return htmlContent;
};

function addComment(newComments){

    let htmlContent = "";


    let obj = JSON.parse(localStorage.getItem("array"));
    let description = document.getElementById("userComment").value;
    let score = document.getElementById("stars").value;
    let user = obj[0].mail;
    var today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;



   

    
    if (description == "" || score == "") {

         alert('Debe completar los campos "Comentarios" y "Estrellas"');

    } else {

        newComments.push({score: score,description: description,user: user,datetime: dateTime});

        for (let i = 0; i < newComments.length; i++) {

            let array = newComments[i];


            htmlContent = `
            <div class="container com">
                <h6 class= "user"><b>${array.user}</b></h6>
                <p>${showStars(array)}</p>
                <p class="date">${array.datetime}</p>
                <p class="comment">${array.description}</p>
            </div>
            `
        }
    }

    document.getElementById("commentInnerContainer").innerHTML += htmlContent;

};





document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productName  = document.getElementById("productName");
            let productPrice = document.getElementById("productPrice");
            let productDescription = document.getElementById("productDescription");
            let productCategory = document.getElementById("productCategory");
            let productSoldCount = document.getElementById("productSoldCount");
            let mainImg = document.getElementById("mainImg");
        
            productName.innerHTML = product.name;
            productPrice.innerHTML = `${product.currency + product.cost}`;
            productDescription.innerHTML = product.description;
            productCategory.innerHTML = product.category;
            productSoldCount.innerHTML = `${product.soldCount} vendidos`;
            mainImg.src = product.images[0];

            //Muestro las imagenes en forma de galería
            showImg(product.images);
        }
    });



    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") {

            product = resultObj.data;

            showRelatedProducts(product);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") {

            product = resultObj.data;

            showComments(product);

        }
    });

    commentButton.addEventListener("click", function(){

       console.log(addComment(newComments));

       document.getElementById("stars").value = "";
       document.getElementById("userComment").value = "";
       
    })


});