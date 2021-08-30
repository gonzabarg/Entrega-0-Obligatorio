//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let precioMinimo = undefined;
let precioMaximo = undefined;

let productsArray = [];

function showProductList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((precioMinimo == undefined) || (precioMinimo != undefined && parseInt(product.cost) >= precioMinimo)) &&
        ((precioMaximo == undefined) || (precioMaximo != undefined && parseInt(product.cost) <= precioMaximo))){

        htmlContentToAppend += `
        
        <div class="list-group" id = "cat-list-container">

            <a href="product-info.html" class = "list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted">${product.currency} ${product.cost}</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </a>
        </div>
        `
        }
    }

    let contenedor = document.getElementsByClassName("container")[4];
    contenedor.id = "contenedorProductos";
    document.getElementById("contenedorProductos").innerHTML = htmlContentToAppend;
    
};


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function(result){
        if (result.status === "ok")
       {
            productsArray = result.data;
            //Muestro las categorías ordenadas
            showProductList(productsArray);
       }
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        precioMinimo = document.getElementById("rangeFilterCountMin").value;
        precioMaximo = document.getElementById("rangeFilterCountMax").value;

        if ((precioMinimo != undefined) && (precioMinimo != "") && (parseInt(precioMinimo)) >= 0){
            precioMinimo = parseInt(precioMinimo);
        }
        else{
            precioMinimo = undefined;
        }

        if ((precioMaximo != undefined) && (precioMaximo != "") && (parseInt(precioMaximo)) >= 0){
            precioMaximo = parseInt(precioMaximo);
        }
        else{
            precioMaximo = undefined;
        }

        showProductList(productsArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        precioMinimo = undefined;
        precioMaximo = undefined;

        showProductList(productsArray);
    });
});
