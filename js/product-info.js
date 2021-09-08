var informacionProducto = {};

function mostrarImagenes(array){
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imagen = array[i];

        htmlContentToAppend += `
        <img class="mini" src="`+ imagen +`" alt="">
      `
    }
    document.getElementById("contenedorMiniaturas").innerHTML += htmlContentToAppend;
    agrandarImgSeleccionada();
};

function agrandarImgSeleccionada(array) {
    let imgPrincipal = document.getElementById("imagenPrincipal");
    let imgMiniatura = document.getElementsByClassName("mini");

    imgMiniatura[0].onclick = function(){
        imgPrincipal.src = imgMiniatura[0].src;
    };

    imgMiniatura[1].onclick = function(){
        imgPrincipal.src = imgMiniatura[1].src;
    };

    imgMiniatura[2].onclick = function(){
        imgPrincipal.src = imgMiniatura[2].src;
    };

    imgMiniatura[3].onclick = function(){
        imgPrincipal.src = imgMiniatura[3].src;
    };

    imgMiniatura[4].onclick = function(){
        imgPrincipal.src = imgMiniatura[4].src;
    };

};

function mostrarProductosRelacionados(array){
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let producto = array[i];
        if(producto === array[1] || producto === array[3]) {

        htmlContentToAppend += `
        <div class="contenedorRelacionados">
            <img src="${producto.imgSrc}" class="miniaturaRelacionados" alt="Portada">
            <h5 class="nombreRelacionados">
                <a href="product-info.html">${producto.name}</a>
            </h5>
        </div>
         `
        }
    }
    document.getElementById("productosRelacionados").innerHTML = htmlContentToAppend;
};



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            producto = resultObj.data;

            let nombreProducto  = document.getElementById("nombreProducto");
            let precioProducto = document.getElementById("precioProducto");
            let descripcionProducto = document.getElementById("descripcionProducto");
            let categoriaProducto = document.getElementById("categoriaProducto");
            let vendidosProducto = document.getElementById("vendidosProducto");
            let imagenPrincipal = document.getElementById("imagenPrincipal");
        
            nombreProducto.innerHTML = producto.name;
            precioProducto.innerHTML = `${producto.currency + producto.cost}`;
            descripcionProducto.innerHTML = producto.description;
            categoriaProducto.innerHTML = producto.category;
            vendidosProducto.innerHTML = `${producto.soldCount} vendidos`;
            imagenPrincipal.src = producto.images[0];

            //Muestro las imagenes en forma de galería
            mostrarImagenes(producto.images);
        }
    });



    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") {

            producto = resultObj.data;

            mostrarProductosRelacionados(producto);
        }
    })
});