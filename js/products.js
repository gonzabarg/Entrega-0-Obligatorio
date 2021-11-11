
const ORDEN_ASC_PRECIO = document.getElementById("sortAsc");
const ORDEN_DESC_PRECIO = document.getElementById("sortDesc");
const ORDEN_POR_REL = document.getElementById("sortByCount");
let precioMinimo = undefined;
let precioMaximo = undefined;
const searchBar =  document.getElementById("searchBar");
let productsArray = [];

// Función que recorre el array proporcionado, chequea si hay un filtro de precio establecido y muestra los resultados al usuario.

function showProductList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((precioMinimo == undefined) || (precioMinimo != undefined && parseInt(product.cost) >= precioMinimo)) &&
        ((precioMaximo == undefined) || (precioMaximo != undefined && parseInt(product.cost) <= precioMaximo))){

        htmlContentToAppend += `
        
        <div class="col-md-6">

            <div class="card" id="productCard">
                <a href= "product-info.html">
                    <img id="productCardImg" src="${product.imgSrc}" alt= "${product.description}">
                </a>

                <div class="card-body" id="userDataBody">
                    <a href= "product-info.html">
                        <h4 class="userDataItem">${product.name}</h4>
                    </a>
                    <p class="userDataItem"><b>${product.currency} ${product.cost}</b></p>
                    <p class="userDataItem">${product.description}</p>


                </div>
            </div>
        </div>
        `
        }
    }

    let contenedor = document.getElementById("productsAlbumContainer");
    contenedor.innerHTML = htmlContentToAppend;
    
};

// Función que ordena la lista de productos de acuerdo al criterio de ordenamiento.

function ordenar(criterio, array) {
    let result = [];
    if(criterio === ORDEN_ASC_PRECIO){
        result = array.sort(function(a,b){
            return a.cost - b.cost;
        });
    } else if (criterio === ORDEN_DESC_PRECIO){
        result = array.sort(function(a,b){
            return b.cost - a.cost;
        });
    } else if (criterio === ORDEN_POR_REL){
        result = array.sort(function(a,b){
            return b.soldCount - a.soldCount;
        });
    }
    return result;
};

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function(result){
        if (result.status === "ok")
       {
            productsArray = result.data;

            showProductList(productsArray);
       }
    });

    // Funciones para ordenar según los diferentes criterios

    document.getElementById("sortAsc").addEventListener("click", function(){
        showProductList(ordenar(ORDEN_ASC_PRECIO,productsArray));
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        showProductList(ordenar(ORDEN_DESC_PRECIO,productsArray));
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        showProductList(ordenar(ORDEN_POR_REL,productsArray));
    });

    // Función de filtrado por precio
    document.getElementById("rangeFilterCount").addEventListener("click", function(){

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

    // Función para limpiar filtro
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        precioMinimo = undefined;
        precioMaximo = undefined;

        showProductList(productsArray);
    });

    searchBar.addEventListener("keyup", function(e){
        const searchString = e.target.value.toLowerCase();
        const productosFiltrados = productsArray.filter(product => {
           return product.name.toLowerCase().includes(searchString) || product.description.toLowerCase().includes(searchString);
        });
        //console.log(searchString);
        showProductList(productosFiltrados);
    });
});
